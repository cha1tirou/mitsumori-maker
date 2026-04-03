import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書Excelテンプレート｜無料ダウンロード | 見積書メーカー",
  description:
    "見積書のExcel・CSVテンプレートを無料でダウンロード。シンプル版・標準ビジネス版・インボイス対応版の3種類。UTF-8対応でExcelでそのまま使えます。",
  openGraph: {
    title: "見積書Excelテンプレート｜無料ダウンロード | 見積書メーカー",
    description:
      "見積書のExcel・CSVテンプレートを無料ダウンロード。シンプル版・標準版・インボイス対応版の3種類。",
    url: "https://mitsumori-maker.com/tools/excel-template",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8Excel%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%EF%BD%9C%E7%84%A1%E6%96%99%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89",
        width: 1200,
        height: 630,
        alt: "見積書Excelテンプレート｜無料ダウンロード",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/tools/excel-template",
  },
};

const templates = [
  {
    name: "シンプル版",
    badge: "初心者向け",
    badgeColor: "bg-green-100 text-green-800",
    description:
      "必要最低限の項目だけを備えたシンプルな見積書テンプレートです。初めて見積書を作成する方や、少ない品目の見積もりに最適です。",
    features: [
      "品名・数量・単価・金額の基本項目",
      "発行日・宛名・差出人の記載欄",
      "合計金額の自動計算（数式設定済み）",
    ],
    downloadUrl: "/templates/estimate-simple.csv",
  },
  {
    name: "標準版",
    badge: "ビジネス向け",
    badgeColor: "bg-blue-100 text-blue-800",
    description:
      "消費税計算や小計・合計の自動算出に対応した、ビジネス利用に適した見積書テンプレートです。法人間の取引にも安心して使えます。",
    features: [
      "小計・消費税・合計の自動計算",
      "備考欄・有効期限・支払条件の記載欄",
      "会社ロゴ・印影の挿入スペース付き",
    ],
    downloadUrl: "/templates/estimate-standard.csv",
  },
  {
    name: "インボイス対応版",
    badge: "適格請求書対応",
    badgeColor: "bg-purple-100 text-purple-800",
    description:
      "2023年10月開始のインボイス制度（適格請求書等保存方式）に対応したテンプレートです。登録番号の記載欄や税率ごとの消費税額表示に対応しています。",
    features: [
      "適格請求書発行事業者の登録番号欄",
      "税率ごと（10%・8%）の消費税額を自動計算",
      "インボイス制度の必須記載事項をすべて網羅",
    ],
    downloadUrl: "/templates/estimate-invoice.csv",
  },
];

export default function ExcelTemplatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-gray-800">Excelテンプレート</span>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* タイトル・説明 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          見積書Excelテンプレート｜無料ダウンロード
        </h1>
        <p className="text-gray-500 text-sm mb-2">更新日: 2026年4月2日</p>
        <p className="text-gray-700 leading-relaxed mb-10">
          見積書のCSVテンプレートを無料でダウンロードできます。シンプル版・標準ビジネス版・インボイス対応版の3種類をご用意。UTF-8
          BOM付きCSVなので、Excelで開いても文字化けしません。ダウンロード後、Excelやスプレッドシートで自由に編集してご利用ください。
        </p>

        {/* テンプレートカード */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            テンプレート一覧
          </h2>
          <div className="space-y-6">
            {templates.map((tpl) => (
              <div
                key={tpl.name}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {tpl.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tpl.badgeColor}`}
                  >
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tpl.description}
                </p>
                <ul className="space-y-1.5 mb-5">
                  {tpl.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-green-600 mt-0.5 shrink-0">
                        &#10003;
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tpl.downloadUrl}
                  download
                  className="inline-block bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  ダウンロード（CSV）
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 使い方の説明 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            テンプレートの使い方
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="bg-gray-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                上のボタンからCSVファイルをダウンロードします
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-gray-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                Excel・Googleスプレッドシート・Numbersなどで開きます
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-gray-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                必要な項目を入力・編集します（品目名・数量・単価など）
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-gray-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                完成したらExcel形式（.xlsx）やPDFで保存・印刷してください
              </li>
            </ol>
          </div>
        </section>

        {/* オンラインツール CTA */}
        <section className="mb-14">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              もっと簡単に作りたい方はこちら
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Excelテンプレートよりも簡単に、ブラウザ上で見積書を作成できます。
              <br className="hidden sm:block" />
              登録不要・無料でPDF出力まで完了します。
            </p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              見積書メーカーを使う →
            </Link>
          </div>
        </section>

        {/* 比較表 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Excelテンプレートとオンラインツールの比較
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                    項目
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                    Excelテンプレート
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">
                    見積書メーカー
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["登録", "不要", "不要"],
                  ["費用", "無料", "無料"],
                  ["計算", "手動（数式設定済み）", "自動"],
                  ["PDF出力", "Excel→PDF変換が必要", "ワンクリック"],
                  ["カスタマイズ", "自由度が高い", "テンプレート選択式"],
                  [
                    "おすすめ",
                    "Excelに慣れている方",
                    "すぐに作りたい方",
                  ],
                ].map(([label, excel, online]) => (
                  <tr key={label}>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {label}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{excel}</td>
                    <td className="px-4 py-3 text-gray-600">{online}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 関連ガイドリンク */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            関連ガイド記事
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/guide/template-excel"
                className="text-blue-700 hover:text-blue-900 hover:underline text-sm"
              >
                見積書テンプレート（Excel・PDF）の選び方 →
              </Link>
            </li>
            <li>
              <Link
                href="/guide/how-to-write"
                className="text-blue-700 hover:text-blue-900 hover:underline text-sm"
              >
                見積書の書き方・必要項目をわかりやすく解説 →
              </Link>
            </li>
            <li>
              <Link
                href="/guide/pdf"
                className="text-blue-700 hover:text-blue-900 hover:underline text-sm"
              >
                見積書のPDF化ガイド →
              </Link>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            見積書を今すぐ無料で作成
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・PDF出力対応
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            見積書メーカーを使う →
          </Link>
        </div>
      </main>
    </div>
  );
}
