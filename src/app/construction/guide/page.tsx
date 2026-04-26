import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, ArrowRight } from "lucide-react";
import BackLink from "@/components/construction/BackLink";

export const metadata: Metadata = {
  title: "建設業向けガイド一覧 | ケンミツ",
  description:
    "改正建設業法 2025・法定福利費・労務費・一式表記・フリーランス新法など、建設業の見積書作成に役立つ実務ガイドの一覧。",
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/guide",
  },
  robots: { index: true, follow: true },
};

const guides = [
  {
    href: "/construction/guide/kaisei-kensetsu-2025",
    title: "改正建設業法2025【完全ガイド】",
    body: "2025 年 12 月施行の改正建設業法。労務費内訳・一式表記・見積条件書・罰則まで実務レベルで解説。",
  },
  {
    href: "/construction/guide/legal-welfare",
    title: "法定福利費の計算方法と業界標準料率",
    body: "建設業の法定福利費（労務費 × 約 20%）の計算方法・内訳・見積書への明示方法。",
  },
  {
    href: "/construction/guide/labor-cost",
    title: "見積書の人件費（労務費）の書き方",
    body: "建設業の労務費の工数計算・単価設定・職種別の記載例・改正法対応まで。",
  },
  {
    href: "/construction/guide/lump-sum",
    title: "見積書・請求書の「一式」の書き方・使い方",
    body: "「一式」を使うべき場面・避けるべき場面、改正建設業法 2025 との関係、内訳要求への対応方法。",
  },
  {
    href: "/construction/guide/freelance-law-construction",
    title: "フリーランス新法と建設業一人親方",
    body: "2024 年 11 月施行のフリーランス新法が建設業一人親方に与える影響と、見積書での対応。",
  },
];

export default function GuideIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2" aria-label="パンくずリスト">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">ガイド</span>
          </nav>
          <BackLink className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5">
            <HardHat
              className="w-4 h-4 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
            ← 前のページに戻る
          </BackLink>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          建設業向けガイド
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          改正建設業法 2025・労務費の内訳・法定福利費・一式表記など、建設業の見積書作成に役立つ実務ガイドをまとめています。
        </p>

        <div className="space-y-3">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-kenmitsu-navy transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-gray-900 mb-1.5">
                    {g.title}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {g.body}
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-gray-400 shrink-0 mt-1"
                  strokeWidth={2.25}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-kenmitsu-navy900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            改正建設業法 2025 対応の見積書を、ケンミツで
          </h2>
          <p className="text-white/70 mb-4 text-sm">
            メアド登録だけで利用開始 / 有料プラン月¥1,980〜
          </p>
          <Link
            href="/construction/start"
            className="inline-block bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            ケンミツを無料で試す →
          </Link>
        </div>
      </main>
    </div>
  );
}
