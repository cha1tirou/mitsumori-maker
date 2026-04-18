import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, CheckSquare, Download } from "lucide-react";
import LeadMagnetButton from "@/components/construction/LeadMagnetButton";

export const metadata: Metadata = {
  title: "改正建設業法2025対応チェックリスト【無料DL】見積書の実務対応 | ケンミツ",
  description:
    "改正建設業法2025（2025年12月全面施行）への対応状況を自社でチェックできる無料チェックリスト。見積書の労務費内訳・法定福利費・見積条件書・瑕疵担保など30項目を網羅。一人親方・工務店向け。",
  keywords: "改正建設業法 チェックリスト, 建設業法 2025, 見積書, 対応, 無料, ダウンロード",
  openGraph: {
    title: "改正建設業法2025対応チェックリスト【無料】",
    description:
      "改正建設業法2025への対応を自社でチェックできるリスト。見積書の実務対応項目を網羅。",
    url: "https://mitsumori-maker.com/construction/checklist",
    siteName: "ケンミツ",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/checklist",
  },
};

const sections = [
  {
    title: "Section 1: 労務費の内訳明示",
    items: [
      "労務費を「一式」ではなく、工種別・人工単位で明示している",
      "労務費の単価（人日・人月）を明記している",
      "元請から労務費の分離を求められた場合、すぐに対応できる",
      "元請との請負契約書に労務費が明示されている",
    ],
  },
  {
    title: "Section 2: 法定福利費の計上",
    items: [
      "見積書に法定福利費を独立行で計上している",
      "法定福利費の料率（労務費×約20%）が適切",
      "法定福利費の計算根拠を社内で統一している",
      "（法人のみ）社会保険加入状況が台帳で管理されている",
    ],
  },
  {
    title: "Section 3: 諸経費（現場管理費・一般管理費）",
    items: [
      "現場管理費を業界標準率（5〜10%）で計算している",
      "一般管理費を業界標準率（8〜15%）で計算している",
      "諸経費の根拠を発注者に説明できる",
    ],
  },
  {
    title: "Section 4: 見積条件書の記載",
    items: [
      "工事名称・工事場所を明記している",
      "工事期間（着工日・完成予定日）を明記している",
      "設計図書・仕様書を特定して記載している",
      "見積の有効期限を明記している（業界標準30日）",
      "支払条件（契約時・中間金・完成時の配分）が明確",
      "費用負担区分（仮設電気・水道・廃材等）を明記している",
    ],
  },
  {
    title: "Section 5: 追加工事・変更の取扱い",
    items: [
      "追加工事発生時の取扱いルールを見積書に記載している",
      "天候・現場状況悪化による工期延長の合意事項がある",
      "設計変更時の価格再協議の手順を明記している",
    ],
  },
  {
    title: "Section 6: 瑕疵担保責任・アフターサービス",
    items: [
      "保証期間を明記している（引渡日より◯年間）",
      "保証範囲（構造耐力・雨水浸入等）を具体化している",
      "設備機器の保証は各メーカー保証に準じる旨を記載",
      "住宅工事の場合、住宅品確法の10年保証を明記している",
    ],
  },
  {
    title: "Section 7: 建設業許可・事業者情報",
    items: [
      "建設業許可番号を見積書に記載している",
      "インボイス登録番号（適格請求書発行事業者）を記載",
      "施工者の住所・電話・担当者を明記している",
      "（一人親方）労災特別加入の状況を把握している",
    ],
  },
  {
    title: "Section 8: 業務フロー・実務対応",
    items: [
      "見積作成に30分以上かかっていない",
      "過去の類似案件から見積を流用できる仕組みがある",
      "現場でスマホから見積書を作成・送信できる",
      "改正建設業法の最新情報を定期的にチェックしている",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/construction"
            className="flex items-center gap-2 text-sm font-bold text-gray-900"
          >
            <HardHat className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            ケンミツ <span className="text-kenmitsu-navy">| 建設業の見積書</span>
          </Link>
          <button
            onClick={undefined}
            data-action="print"
            className="hidden"
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <CheckSquare className="w-4 h-4" strokeWidth={2.5} />
            <span>無料ダウンロード可・印刷可</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            改正建設業法2025 対応チェックリスト
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            2025年12月1日全面施行の改正建設業法について、
            <br className="hidden md:block" />
            一人親方・工務店が対応すべき実務項目を8セクション・30項目に整理しました。
          </p>
        </div>

        {/* CTA */}
        <div className="bg-white border-2 border-kenmitsu-navy100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4 no-print">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-kenmitsu-orange flex items-center justify-center">
            <Download className="w-6 h-6 text-white" strokeWidth={2.25} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-bold text-gray-900">
              メールでPDFリンクを受け取る
            </p>
            <p className="text-xs text-gray-500">
              あとでじっくり読みたい方・社内で共有したい方向け
            </p>
          </div>
          <LeadMagnetButton source="checklist_download" />
        </div>

        {/* チェックリスト本体 */}
        <article className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 print:p-0 print:border-0">
          <h2 className="print:block hidden text-2xl font-bold mb-6">
            改正建設業法2025 対応チェックリスト
          </h2>
          {sections.map((section, i) => (
            <section key={i} className="mb-8 last:mb-0">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-kenmitsu-navy">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item, j) => (
                  <label
                    key={j}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 border-2 border-gray-300 rounded group-hover:border-kenmitsu-navy transition-colors"></span>
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-2">
              © 2026 ケンミツ 編集部 / mitsumori-maker.com
            </p>
            <p className="text-[11px] text-gray-400">
              本チェックリストは情報提供を目的としています。法令の最終的な解釈は所属団体・専門家にご確認ください。
            </p>
          </div>
        </article>

        {/* 最終CTA */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white no-print">
          <h2 className="text-xl font-bold mb-2">
            このチェックを自動化するツールがあります
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・月¥980 / 労務費内訳・法定福利費・見積条件書を自動フォーマット
          </p>
          <Link
            href="/construction"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ケンミツを見る →
          </Link>
        </div>
      </main>
    </div>
  );
}
