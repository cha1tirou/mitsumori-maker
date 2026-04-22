import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, Mail, AlertTriangle } from "lucide-react";
import { verifyUnsubscribeToken } from "@/lib/email";
import UnsubscribeForm from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "配信停止 | ケンミツ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const email = typeof params.email === "string" ? params.email : "";
  const token = typeof params.token === "string" ? params.token : "";

  const valid = email.length > 0 && verifyUnsubscribeToken(email, token);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/construction"
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5"
          >
            <HardHat
              className="w-4 h-4 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
            ← ケンミツトップに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center">
              <Mail
                className="w-5 h-5 text-kenmitsu-navy"
                strokeWidth={2.25}
              />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">
                メール配信の停止
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5">
                ケンミツからのお知らせメールの配信を停止します
              </p>
            </div>
          </div>

          <div className="p-6">
            {!valid ? (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-2">
                  <AlertTriangle
                    className="w-4 h-4 text-amber-700 shrink-0 mt-0.5"
                    strokeWidth={2.25}
                  />
                  <div className="text-sm text-amber-900">
                    <p className="font-bold mb-1">
                      配信停止リンクが無効です
                    </p>
                    <p className="text-xs leading-relaxed">
                      お手元のメールから「配信停止」リンクを再度クリックしていただくか、
                      下記までご連絡いただければ手動で停止対応いたします。
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  お問い合わせ先:{" "}
                  <a
                    href="mailto:kenmitsu.support@gmail.com"
                    className="text-kenmitsu-navy underline"
                  >
                    kenmitsu.support@gmail.com
                  </a>
                </p>
              </div>
            ) : (
              <UnsubscribeForm email={email} token={token} />
            )}
          </div>
        </div>

        <p className="text-[11px] text-gray-500 mt-6 text-center leading-relaxed">
          ※ 決済関連の通知（領収書・請求・Stripe からのメール等）は、
          <br />
          法的義務に基づく通知のため配信停止の対象外となります。
        </p>
      </main>
    </div>
  );
}
