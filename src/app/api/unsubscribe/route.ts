import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { verifyUnsubscribeToken } from "@/lib/email";
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
  const email = body?.email;
  const token = body?.token;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "メールアドレスが不正です。" },
      { status: 400 },
    );
  }
  if (!verifyUnsubscribeToken(email, token)) {
    return NextResponse.json(
      {
        error:
          "配信停止リンクが無効です。お手元のメールから再度リンクを開くか、お問い合わせフォーム（https://mitsumori-maker.com/construction/contact）よりご連絡ください。",
      },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  const { url } = getSupabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return NextResponse.json({ error: "Service role missing" }, { status: 503 });
  }

  const supabase = createServerClient(url, serviceKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });

  const normalized = email.trim().toLowerCase();

  // 1. newsletter_subscribers から該当アドレスを削除（リードマグネット経由の登録）
  await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("email", normalized);

  // 2. profiles.drip_sent に __unsubscribed__ フラグを立てて以降のドリップを停止
  //    （対応する profiles が無ければ何もせず成功扱い）
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, drip_sent")
    .eq("email", normalized)
    .maybeSingle<{ id: string; drip_sent: Record<string, boolean> | null }>();

  if (profile) {
    const dripSent = profile.drip_sent ?? {};
    dripSent.__unsubscribed__ = true;
    dripSent.welcome = true;
    dripSent.tips = true;
    dripSent.upgrade = true;
    await supabase
      .from("profiles")
      .update({ drip_sent: dripSent })
      .eq("id", profile.id);
  }

  return NextResponse.json({ ok: true });
}
