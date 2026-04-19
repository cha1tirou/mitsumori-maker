import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書の管理方法・保存方法ガイド【フリーランス・中小企業向け】 | 見積書メーカー",
  description: "見積書の管理方法を解説。ファイル命名規則・フォルダ整理・電子保存・法令上の保存期間まで、フリーランス・中小企業向けにわかりやすくまとめました。",
  openGraph: {
    title: "見積書の管理方法・保存方法ガイド【フリーランス・中小企業向け】",
    description: "見積書の管理方法を解説。ファイル命名規則・フォルダ整理・電子保存・法令上の保存期間まで、フリーランス・中小企業向けにわかりやすくまとめました。",
    url: "https://mitsumori-maker.com/guide/quote-management",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/quote-management",
  },
};

export default function QuoteManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "見積書の管理方法・保存方法ガイド【フリーランス・中小企業向け】",
            datePublished: "2026-04-19",
            dateModified: "2026-04-19",
            author: { "@type": "Organization", name: "見積書メーカー" },
            publisher: {
              "@type": "Organization",
              name: "見積書メーカー",
              url: "https://mitsumori-maker.com",
            },
          }),
        }}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">
              見積書ガイド
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書の管理方法・保存方法ガイド</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の管理方法・保存方法ガイド【フリーランス・中小企業向け】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月19日</p>

          <p className="text-gray-700 leading-relaxed mb-4">
            見積書は受注・発注の根拠となる重要な書類です。しかし、フリーランスや小規模事業者の多くが「どこに保存したか分からなくなった」「古い見積書と最新版を混同してしまった」という悩みを抱えています。本記事では、見積書の管理方法・ファイルの命名規則・フォルダ構成の設計から、法令上の保存期間まで、実践的な方法をまとめました。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書を管理する目的と重要性
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の管理が重要な理由は、単なる書類整理にとどまりません。適切に管理することで以下のメリットが得られます。
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <span className="font-medium">トラブル防止：</span>
              価格や条件について顧客とのやり取りに齟齬が生じた際、過去の見積書をすぐに確認できる
            </li>
            <li>
              <span className="font-medium">受注率の分析：</span>
              提出した見積もりのうち何件が受注につながったかを把握し、営業改善につなげる
            </li>
            <li>
              <span className="font-medium">価格の一貫性確保：</span>
              同じ顧客に異なる価格を提示してしまうミスを防ぐ
            </li>
            <li>
              <span className="font-medium">税務・法令対応：</span>
              税務調査や法令上の保存義務を満たすための記録として機能する
            </li>
            <li>
              <span className="font-medium">次回見積もりの効率化：</span>
              過去の見積書を参照することで、類似案件の見積もり作成時間を短縮できる
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            ファイル命名規則・フォルダ構成の設計
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を効率よく管理するには、ファイル名とフォルダ構成のルールを最初に決めておくことが重要です。後から整理しようとしても、件数が増えると作業量が膨大になります。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            推奨ファイル命名規則
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ファイル名には「日付」「顧客名」「案件名」「バージョン」を含めると、検索・並べ替えが容易になります。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm font-mono text-gray-700">
            <p className="mb-1">形式：YYYYMMDD_顧客名_案件名_v番号.pdf</p>
            <p className="mb-1">例1：20260419_株式会社ABC_Webサイト制作_v1.pdf</p>
            <p className="mb-1">例2：20260419_田中商事_オフィス改装工事_v2.pdf</p>
            <p className="mb-0">例3：20260419_個人山田様_ロゴデザイン_v1.pdf</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            日付をファイル名の先頭に「YYYYMMDD」形式で入れると、フォルダ内でファイルが時系列順に自動的に並び、目的のファイルを見つけやすくなります。バージョン番号（v1、v2…）を付けることで、修正前・修正後のファイルを混同せずに保管できます。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            推奨フォルダ構成（フリーランス・個人事業主向け）
          </h3>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm font-mono text-gray-700 leading-relaxed">
            <p className="mb-1">見積書/</p>
            <p className="mb-1 pl-4">├── 2026年/</p>
            <p className="mb-1 pl-8">├── 01_1月/</p>
            <p className="mb-1 pl-8">├── 02_2月/</p>
            <p className="mb-1 pl-8">└── 04_4月/</p>
            <p className="mb-1 pl-8 pl-12">├── 受注済み/</p>
            <p className="mb-1 pl-8 pl-12">├── 提案中/</p>
            <p className="mb-0 pl-8 pl-12">└── 失注・キャンセル/</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            案件数が少ない場合は月別フォルダだけで十分です。件数が増えてきたら「受注済み」「提案中」「失注」の3つに分けることで、フォローアップが必要な案件を一目で把握できます。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            推奨フォルダ構成（中小企業・複数担当者向け）
          </h3>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm font-mono text-gray-700 leading-relaxed">
            <p className="mb-1">見積書管理/</p>
            <p className="mb-1 pl-4">├── 顧客別/</p>
            <p className="mb-1 pl-8">├── 株式会社ABC/</p>
            <p className="mb-1 pl-8">└── 田中商事/</p>
            <p className="mb-1 pl-4">├── 年度別/</p>
            <p className="mb-1 pl-8">├── 2025年度/</p>
            <p className="mb-0 pl-8">└── 2026年度/</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            複数の担当者が管理する場合は、顧客別フォルダと年度別フォルダの両方を用意し、ショートカットやリンクで連携させる方法が有効です。クラウドストレージ（Google Drive・OneDriveなど）を使えば複数人でのリアルタイム共有も容易になります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            電子保存・クラウド管理のメリットと注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            紙の見積書をファイリングキャビネットで保管する従来の方法に対し、電子データでの管理には多くのメリットがあります。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    比較項目
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    紙保管
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    電子保管（クラウド）
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">検索性</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">低い（目視で探す）</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">高い（キーワード検索可）</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">保管コスト</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">用紙・キャビネット費用</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    ストレージ費用（少額〜無料）
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">紛失リスク</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    火災・水害・紛失のリスクあり
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    バックアップで低リスク
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">共有・リモートアクセス</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">難しい</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    どこからでもアクセス可能
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">法令対応</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">そのまま保存可</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    電子帳簿保存法の要件を満たす必要あり
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            電子帳簿保存法への対応（2024年以降）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            2024年1月より電子帳簿保存法の改正により、電子取引（メールやクラウドでやり取りした書類）については電子データのままの保存が義務化されました。見積書もメールに添付してやり取りした場合は、PDFデータとして保存する必要があります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            電子データで保存する際は「日付・金額・取引先」で検索できる状態にしておく必要があります。ファイル名に日付・顧客名を含めるか、Excelの管理台帳で一覧化しておくことで対応できます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の法令上の保存期間
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の保存期間は、法人か個人事業主か、また適用される法令によって異なります。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    区分
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    根拠法令
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    保存期間
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">法人（一般）</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">法人税法</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">7年間</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">個人事業主</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">所得税法</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">5年間（青色申告は7年）</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">建設業</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">建設業法</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">5年間（元請負は10年）</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">消費税課税事業者</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">消費税法</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">7年間</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            安全策として、すべての見積書を7年間保存しておくことを推奨します。電子データであればストレージコストもわずかなため、不要になった書類でも一定期間は保存フォルダに移すだけで対応できます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書管理ソフト・ツールの選び方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            件数が増えてきたら、専用の見積書管理ソフトや会計ソフトの活用も検討しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            規模別おすすめの管理方法
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-3">
            <li>
              <span className="font-medium">フリーランス・副業（月1〜10件程度）：</span>
              Webツール（見積書メーカーなど）でPDF作成 → Google DriveやDropboxにフォルダ保存。管理コスト最小で始められます
            </li>
            <li>
              <span className="font-medium">個人事業主・小規模法人（月10〜50件）：</span>
              Excelの管理台帳（番号・日付・顧客名・金額・状況を一覧化）とPDFファイルの併用。台帳から書類を検索しやすくなります
            </li>
            <li>
              <span className="font-medium">中小企業（月50件以上）：</span>
              freee・マネーフォワード・弥生などの会計・販売管理ソフトの見積書機能を活用。請求書・納品書との連動管理が可能になります
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Excel管理台帳の項目例
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">見積番号</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">発行日</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">顧客名</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">案件名</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">金額（税込）</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">有効期限</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">状況</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Q2026-001</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">2026/4/1</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">株式会社ABC</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">HP制作</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">330,000円</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">2026/4/30</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">受注済み</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Q2026-002</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">2026/4/5</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">田中商事</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">オフィス改装</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">1,100,000円</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">2026/5/5</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">提案中</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            見積番号は「Q（年）-（連番）」のような形式にしておくと、書類間の照合が容易になります。有効期限の列を設けることで、フォローアップが必要な提案中の案件を一覧で把握できます。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm leading-relaxed">
              <span className="font-semibold">関連記事：</span>
              見積書の電子化・PDF保存については
              <Link
                href="/guide/electronic"
                className="underline hover:text-blue-600 ml-1"
              >
                見積書を電子化・PDF化するメリット
              </Link>
              、有効期限の設定については
              <Link
                href="/guide/valid-period"
                className="underline hover:text-blue-600 ml-1"
              >
                見積書の有効期限の設定方法
              </Link>
              もご覧ください。
            </p>
          </div>
        </article>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">登録不要・完全無料・PDF出力対応</p>
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
