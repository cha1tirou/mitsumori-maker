import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Email 確認リンク用の token_hash フロー。
 * Supabase Email Template で以下のリンクを使う:
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/construction/mypage
 *
 * PKCE (`/auth/callback` with `code`) と違い、PC で登録してスマホでメール開く等の
 * クロスデバイス確認が成立する。
 *
 * 既存の /auth/callback ルートは OAuth / magic link 用途で残している。削除しない。
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  // 既定は /construction/setup-password。
  // - 新規 OTP ユーザー: setup-password で PW 入力（user_metadata.password_set=false）
  // - 既存ユーザー（PW 既設定）: setup-password 内で自動的に /mypage にリダイレクト
  // メールテンプレに next パラメータが含まれない場合のフォールバックとして安全側に倒す。
  const next = searchParams.get("next") ?? "/construction/setup-password";

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      `${origin}/construction/login?error=not_configured`,
    );
  }

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      // セッション確立後、user_metadata.password_set が未設定なら
      // Supabase テンプレ側の next（/construction/mypage 等）を無視して
      // /setup-password に強制ガード。OTP 経由の新規登録ではここで PW を設定させる。
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const passwordSet = (
        user?.user_metadata as { password_set?: boolean } | null
      )?.password_set;
      if (user && passwordSet !== true) {
        return NextResponse.redirect(
          `${origin}/construction/setup-password`,
        );
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("auth/confirm verifyOtp error:", error);
  }

  return NextResponse.redirect(
    `${origin}/construction/login?error=confirmation_failed`,
  );
}
