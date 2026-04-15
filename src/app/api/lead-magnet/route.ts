import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createServerClient } from "@supabase/ssr";
import { isResendConfigured, getResendConfig } from "@/lib/email";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

export const runtime = "nodejs";

function isValidEmail(s: unknown): s is string {
  return (
    typeof s === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) &&
    s.length <= 320
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !isValidEmail(body.email)) {
    return NextResponse.json(
      { error: "メールアドレスが不正です。" },
      { status: 400 }
    );
  }
  const source = typeof body.source === "string" ? body.source : "unknown";
  const email = body.email.trim().toLowerCase();

  // Supabase に subscriber として登録（未設定時はスキップ）
  if (isSupabaseConfigured()) {
    try {
      const { url } = getSupabaseEnv();
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (serviceKey) {
        const supabase = createServerClient(url, serviceKey, {
          cookies: { getAll: () => [], setAll: () => {} },
        });
        await supabase
          .from("newsletter_subscribers")
          .upsert(
            { email, source },
            { onConflict: "email", ignoreDuplicates: true }
          );
      }
    } catch {
      // ログ登録失敗は致命傷ではない
    }
  }

  const downloadUrl = `${new URL(request.url).origin}/construction/checklist?download=1`;

  // メール送信（未設定時は DL URL だけ返す）
  if (isResendConfigured()) {
    try {
      const { apiKey, from } = getResendConfig();
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: email,
        subject: "【建設業法2025対応チェックリスト】PDFダウンロードのご案内",
        html: `
<p>改正建設業法2025対応チェックリストのダウンロードリンクをお送りします。</p>
<p><a href="${downloadUrl}">${downloadUrl}</a></p>
<hr />
<p>本チェックリストは、<a href="${new URL(request.url).origin}/construction">建設業向け見積書メーカー</a>の編集部が作成したものです。一人親方・小規模工務店向けに、改正建設業法2025で対応が必要な項目を網羅しました。</p>
<p>ご質問やご要望がございましたら、このメールにご返信ください。</p>
<p>— 見積書メーカー 建設業版 編集部</p>
        `,
        text: `改正建設業法2025対応チェックリストのダウンロードリンクをお送りします。\n${downloadUrl}\n\n— 見積書メーカー 建設業版 編集部`,
      });
    } catch {
      // 送信失敗でも登録自体は成功させる
    }
  }

  return NextResponse.json({ ok: true, downloadUrl });
}
