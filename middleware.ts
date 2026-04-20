import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 管理画面 (/construction/admin) に対する二重認証レイヤー。
 *
 * 目的: クレジット取引セキュリティ対策協議会「セキュリティ・チェックリスト」
 *   #1「管理者画面のアクセス制限と管理者の ID / PW 管理」に対応。
 *
 * 実装:
 *   - Vercel Edge middleware レイヤーでベーシック認証を要求
 *   - 通過後に従来の Supabase Auth (Magic Link) + ADMIN_EMAILS allowlist で
 *     二重ガード
 *   - ベーシック認証用の資格情報は環境変数
 *     (ADMIN_BASIC_AUTH_USER / ADMIN_BASIC_AUTH_PASS) に保管
 *   - 両方未設定の場合はベーシック認証をスキップ（開発環境向け）
 */
function requireBasicAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const pass = process.env.ADMIN_BASIC_AUTH_PASS;
  if (!user || !pass) return null;

  const header = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    try {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      if (sep > 0) {
        const providedUser = decoded.slice(0, sep);
        const providedPass = decoded.slice(sep + 1);
        if (providedUser === user && providedPass === pass) {
          return null;
        }
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kenmitsu Admin", charset="UTF-8"',
    },
  });
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/construction/admin")) {
    const unauthorized = requireBasicAuth(request);
    if (unauthorized) return unauthorized;
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    // 静的アセット・画像最適化・faviconを除外
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
