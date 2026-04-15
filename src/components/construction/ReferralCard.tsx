"use client";

import { useEffect, useState } from "react";
import { Gift, Copy, Check, Users, Mail, Share2 } from "lucide-react";

export default function ReferralCard() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [invitedCount, setInvitedCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/referral");
        if (res.ok) {
          const json = await res.json();
          setReferralCode(json.referralCode);
          setInvitedCount(json.invitedCount || 0);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;
  if (!referralCode) return null;

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://mitsumori-maker.com";
  const referralUrl = `${origin}/construction/login?ref=${referralCode}`;

  const tweetText = encodeURIComponent(
    `建設業の見積書、改正建設業法2025対応・月¥980で作れるツール見つけた。登録不要で試せます。\n${referralUrl}`
  );
  const mailSubject = encodeURIComponent("建設業向けの見積書ツールのご紹介");
  const mailBody = encodeURIComponent(
    `改正建設業法2025に対応した見積書メーカーをご紹介します。\n一人親方・小規模工務店向けで、登録不要・月¥980から使えます。\n\n${referralUrl}`
  );

  const rewards = [
    { count: 3, reward: "Solo 1ヶ月無料", achieved: invitedCount >= 3 },
    { count: 5, reward: "Solo 3ヶ月無料", achieved: invitedCount >= 5 },
    { count: 10, reward: "Solo 1年無料", achieved: invitedCount >= 10 },
  ];

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
          <Gift className="w-5 h-5 text-amber-700" strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">紹介プログラム</h2>
          <p className="text-[11px] text-gray-500">
            同業の方にシェアすると、あなたに特典が付与されます
          </p>
        </div>
      </div>

      {/* 招待リンク */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
        <p className="text-[10px] text-gray-500 mb-1 font-bold tracking-wider">
          あなたの招待リンク
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-2 text-xs font-mono text-gray-700"
            onFocus={(e) => e.target.select()}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="shrink-0 flex items-center gap-1 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3 py-2 rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                コピー済
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" strokeWidth={2.5} />
                コピー
              </>
            )}
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-md"
          >
            <Share2 className="w-3 h-3" strokeWidth={2.25} />
            X で共有
          </a>
          <a
            href={`mailto:?subject=${mailSubject}&body=${mailBody}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-md"
          >
            <Mail className="w-3 h-3" strokeWidth={2.25} />
            メールで共有
          </a>
        </div>
      </div>

      {/* 招待数 */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-green-700" strokeWidth={2.25} />
          <p className="text-sm text-gray-900">
            現在の招待登録数：<strong className="text-green-800">{invitedCount}名</strong>
          </p>
        </div>
      </div>

      {/* 特典 */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-gray-500 tracking-wider mb-2">
          達成特典（自動付与は準備中・達成時にお知らせします）
        </p>
        {rewards.map((r, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${
              r.achieved
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                r.achieved
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {r.achieved ? (
                <Check className="w-4 h-4" strokeWidth={2.5} />
              ) : (
                <span className="text-[10px] font-bold">{r.count}名</span>
              )}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${
                  r.achieved ? "text-green-800" : "text-gray-700"
                }`}
              >
                {r.reward}
              </p>
              <p className="text-[10px] text-gray-500">
                {r.achieved
                  ? "達成済み（特典の付与時期はお知らせします）"
                  : `あと ${Math.max(0, r.count - invitedCount)} 名`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
        ※ 紹介プログラムは現在β運用中。招待数は自動カウントされますが、特典付与は運営から個別にご連絡します。不正利用（自己招待・複数アカウント等）が確認された場合、特典は無効となります。
      </p>
    </section>
  );
}
