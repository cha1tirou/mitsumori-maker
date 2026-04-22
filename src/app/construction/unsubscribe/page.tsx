import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, Mail, AlertTriangle, Send } from "lucide-react";
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
              <div className="space-y-5">
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
                      リンクの期限が切れているか、URL が正しくコピーされていない可能性があります。以下のいずれかの方法でご対応ください。
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center shrink-0">
                      <Mail
                        className="w-4 h-4 text-kenmitsu-navy"
                        strokeWidth={2.25}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        方法 1. 最新のメールから開き直す
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        お手元の最新のケンミツからのメールを開き、本文下部の「配信停止」リンクをクリックしてください。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center shrink-0">
                      <Send
                        className="w-4 h-4 text-kenmitsu-navy"
                        strokeWidth={2.25}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        方法 2. 運営に直接連絡
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        下のボタンからメールを送信してください。件名・本文に停止したいメールアドレスをそのまま入れて送るだけで、運営側で手動停止対応します。
                      </p>
                      <a
                        href="mailto:kenmitsu.support@gmail.com?subject=配信停止希望&body=配信停止を希望するメールアドレス%3A%20%0A%0A理由（任意）%3A%20%0A"
                        className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
                        メールを作成する
                      </a>
                    </div>
                  </div>
                </div>
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
