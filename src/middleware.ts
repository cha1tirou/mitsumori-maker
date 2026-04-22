import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 管理画面 (/construction/admin) に対する多層認証レイヤー。
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
 *   - 同一 IP から 10 回連続でベーシック認証に失敗した場合、15 分間ロック
 *     （#1-3 アカウントロック要件）
 *   - 両方未設定の場合はベーシック認証をスキップ（開発環境向け）
 */

const MAX_FAILED_ATTEMPTS = 10;
const LOCK_DURATION_MS = 15 * 60 * 1000;

type FailureRecord = { count: number; lockedUntil: number };

// モジュールスコープの in-memory カウンタ。
// Vercel Edge の同一インスタンス内で有効（インスタンス跨ぎは best-effort）。
// Magic Link 2FA が背後にあるため best-effort で十分。
const failureMap = new Map<string, FailureRecord>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function recordFailure(ip: string): FailureRecord {
  const now = Date.now();
  const prev = failureMap.get(ip);
  const record: FailureRecord =
    prev && prev.lockedUntil > now
      ? prev
      : { count: (prev?.count ?? 0) + 1, lockedUntil: 0 };
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCK_DURATION_MS;
  }
  failureMap.set(ip, record);
  return record;
}

function clearFailures(ip: string) {
  failureMap.delete(ip);
}

function isLocked(ip: string): boolean {
  const rec = failureMap.get(ip);
  if (!rec) return false;
  if (rec.lockedUntil > Date.now()) return true;
  if (rec.lockedUntil > 0 && rec.lockedUntil <= Date.now()) {
    failureMap.delete(ip);
  }
  return false;
}

function requireBasicAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const pass = process.env.ADMIN_BASIC_AUTH_PASS;
  if (!user || !pass) {
    // 本番では環境変数未設定は fail-closed。管理画面が丸裸でスルーすることを
    // 防ぐため 503 を返す（設定ミスを即検知）。開発環境では認証スキップ。
    if (process.env.NODE_ENV === "production") {
      return new NextResponse(
        "Admin Basic Auth is misconfigured: set ADMIN_BASIC_AUTH_USER and ADMIN_BASIC_AUTH_PASS in Vercel environment variables.",
        { status: 503 },
      );
    }
    return null;
  }

  const ip = getClientIp(request);

  if (isLocked(ip)) {
    return new NextResponse(
      "Too many failed attempts. Access locked for 15 minutes.",
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(LOCK_DURATION_MS / 1000)),
        },
      },
    );
  }

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
          clearFailures(ip);
          return null;
        }
      }
    } catch {
      // fall through to 401
    }
  }

  // 認証ヘッダあり（≒試行）または初回要求時のプロンプト。
  // authorization ヘッダが付いていた場合のみ失敗カウントを増やす。
  if (header) {
    recordFailure(ip);
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Kenmitsu Admin", charset="UTF-8"',
    },
  });
}

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/construction/admin") ||
    request.nextUrl.pathname.startsWith("/api/admin/")
  ) {
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
