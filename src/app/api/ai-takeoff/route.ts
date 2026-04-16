import { NextResponse, type NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const FREE_MONTHLY_LIMIT = 1;
const SOLO_MONTHLY_LIMIT = 10;

// Anthropic対応の MIME タイプ
const SUPPORTED_IMAGE_MIME = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const SUPPORTED_PDF_MIME = ["application/pdf"];

const SYSTEM_PROMPT = `あなたは建設業の積算のプロです。送られてきたPDFまたは図面・写真から、工事見積書の明細を抽出します。

【抽出ルール】
- 図面や仕様書から建材・作業項目を読み取り、見積の骨格を作る
- 単価が書かれていない項目は、業界標準的な水準で妥当な単価を推定。推定できない場合は 0
- 数量は図面の寸法・個数から積算。不明な場合は 1
- 費目を必ず分類：
  - labor (労務費) — 人件費・工賃・施工費
  - material (材料費) — 資材・建材・部品
  - outsourcing (外注費) — 下請・委託
  - other (その他経費) — 運搬・処分・養生など
- 改正建設業法準拠のため「一式」は避け、可能な限り内訳展開
- 工種ごとにセクションを分ける（電気・水道・内装など）

【必ずJSON形式で返す】
返却は以下の構造のJSONのみ。前後に説明や Markdown は一切不要。

{
  "subject": "工事名（推定、見つからなければ空文字）",
  "siteAddress": "工事場所（見つからなければ空文字）",
  "notes": "備考・読み取りの補足（特記事項があれば）",
  "sections": [
    {
      "name": "セクション名（工種名）",
      "items": [
        {
          "name": "品目名",
          "quantity": 数量（数値）,
          "unit": "単位（式/㎡/m/個/台 等）",
          "unitPrice": 単価（数値、税抜）,
          "category": "labor|material|outsourcing|other"
        }
      ]
    }
  ],
  "confidence": "high|medium|low",
  "notes_for_user": "ユーザーへの注意事項（読み取れなかった項目、推定値が含まれる旨）"
}

読み取れない場合も必ず上記構造で、sections:[] を返すこと。`;

async function getUserUsage(
  userId: string
): Promise<{ count: number; limit: number; plan: string }> {
  if (!isSupabaseConfigured()) {
    return { count: 0, limit: FREE_MONTHLY_LIMIT, plan: "free" };
  }
  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return { count: 0, limit: FREE_MONTHLY_LIMIT, plan: "free" };
  const supabase = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
  const [{ data: profile }, { data: usage }] = await Promise.all([
    supabase
      .from("profiles")
      .select("plan, subscription_status")
      .eq("id", userId)
      .maybeSingle<{ plan: string; subscription_status: string | null }>(),
    supabase
      .from("current_month_ai_takeoff_counts")
      .select("count")
      .eq("user_id", userId)
      .maybeSingle<{ count: number }>(),
  ]);
  const plan = profile?.plan ?? "free";
  const statusOk =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";
  const limit =
    (plan === "solo" || plan === "team") && statusOk
      ? SOLO_MONTHLY_LIMIT
      : FREE_MONTHLY_LIMIT;
  return { count: usage?.count ?? 0, limit, plan };
}

async function logUsage(
  userId: string,
  sourceType: "pdf" | "image",
  success: boolean
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return;
  const supabase = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
  await supabase
    .from("ai_takeoff_logs")
    .insert({ user_id: userId, source_type: sourceType, success });
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI積算機能は現在準備中です。" },
      { status: 503 }
    );
  }

  // 認証（Supabase必須）
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "AI積算はアカウント登録後にご利用いただけます。" },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  // 利用制限チェック
  const usage = await getUserUsage(user.id);
  if (usage.count >= usage.limit) {
    return NextResponse.json(
      {
        error: "monthly_limit_exceeded",
        plan: usage.plan,
        limit: usage.limit,
        message:
          usage.plan === "free"
            ? `無料プランでは月${FREE_MONTHLY_LIMIT}回まで。Soloプランにアップグレードで月${SOLO_MONTHLY_LIMIT}回まで拡張されます。`
            : `今月の利用上限（${SOLO_MONTHLY_LIMIT}回）に達しました。来月1日にリセットされます。`,
      },
      { status: 402 }
    );
  }

  // ファイル受信
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "ファイルが不正です" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const userNote = (formData.get("note") as string) || "";

  if (!file) {
    return NextResponse.json({ error: "ファイルが必要です" }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `ファイルサイズは ${MAX_FILE_SIZE / 1024 / 1024}MB 以下にしてください` },
      { status: 413 }
    );
  }
  const mime = file.type;
  const isPdf = SUPPORTED_PDF_MIME.includes(mime);
  const isImage = SUPPORTED_IMAGE_MIME.includes(mime);
  if (!isPdf && !isImage) {
    return NextResponse.json(
      {
        error: "対応形式は PDF / JPEG / PNG / GIF / WebP のみです",
      },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const userPrompt = userNote
      ? `添付ファイルから見積明細を抽出してください。\n\n【ユーザーからの補足】${userNote}`
      : "添付ファイルから見積明細を抽出してください。";

    const content: Anthropic.MessageParam["content"] = isPdf
      ? [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: base64,
            },
          },
          { type: "text", text: userPrompt },
        ]
      : [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mime as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: base64,
            },
          },
          { type: "text", text: userPrompt },
        ];

    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    const textContent = response.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("Claude から空のレスポンス");
    }

    // JSON部分だけ抽出
    const match = textContent.text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("JSONを抽出できませんでした");
    }

    const parsed = JSON.parse(match[0]);
    await logUsage(user.id, isPdf ? "pdf" : "image", true);

    return NextResponse.json({
      ok: true,
      data: parsed,
      usage: { used: usage.count + 1, limit: usage.limit, plan: usage.plan },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "不明なエラー";
    await logUsage(user.id, isPdf ? "pdf" : "image", false);
    return NextResponse.json(
      { error: "AI積算に失敗しました", detail: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // 現在の利用状況確認用
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ count: 0, limit: 0, plan: "free" });
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }
  const usage = await getUserUsage(user.id);
  return NextResponse.json(usage);
}
