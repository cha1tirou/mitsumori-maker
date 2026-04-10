import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書のスプレッドシートテンプレート｜Googleスプレッドシートで無料作成 | 見積書メーカー",
  description: "見積書をGoogleスプレッドシートで作成する方法を解説。無料テンプレートの活用法、数式の設定、PDF出力まで、フリーランス・個人事業主向けにわかりやすく説明します。",
  openGraph: {
    title: "見積書のスプレッドシートテンプレート｜Googleスプレッドシートで無料作成",
    description: "見積書をGoogleスプレッドシートで作成する方法を解説。無料テンプレートの活用法、数式の設定、PDF出力まで、フリーランス・個人事業主向けにわかりやすく説明します。",
    url: "https://mitsumori-maker.com/guide/spreadsheet",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
};

export default function SpreadsheetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "見積書のスプレッドシートテンプレート｜Googleスプレッドシートで無料作成",
    description:
      "見積書をGoogleスプレッドシートで作成する方法を解説。無料テンプレートの活用法、数式の設定、PDF出力まで、フリーランス・個人事業主向けにわかりやすく説明します。",
    url: "https://mitsumori-maker.com/guide/spreadsheet",
    dateModified: "2026-04-10",
    publisher: {
      "@type": "Organization",
      name: "見積書メーカー",
      url: "https://mitsumori-maker.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: "https://mitsumori-maker.com" },
        { "@type": "ListItem", position: 2, name: "ガイド", item: "https://mitsumori-maker.com/guide/how-to-write" },
        { "@type": "ListItem", position: 3, name: "見積書のスプレッドシートテンプレート", item: "https://mitsumori-maker.com/guide/spreadsheet" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-gray-700">ホーム</Link></li>
              <li className="before:content-['/'] before:mx-2"><Link href="/guide/how-to-write" className="hover:text-gray-700">ガイド</Link></li>
              <li className="before:content-['/'] before:mx-2 text-gray-700">見積書スプレッドシートテンプレート</li>
            </ol>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書のスプレッドシートテンプレート｜Googleスプレッドシートで無料作成
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月10日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            Googleスプレッドシートは無料で使えるクラウド型の表計算ツールで、見積書の作成に広く活用されています。Excelと互換性が高く、テンプレートを使えばすぐに実務レベルの見積書が作れます。本記事では、Googleスプレッドシートで見積書を作成する方法とポイントを解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            Googleスプレッドシートで見積書を作るメリット・デメリット
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Googleスプレッドシートはブラウザ上で動作するため、PCやスマートフォンからいつでもアクセスできます。作成した見積書をリンクで共有したり、チームで同時編集したりと、クラウドならではの利便性が魅力です。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg border border-green-200 p-4">
              <p className="font-semibold text-green-800 mb-2 text-sm">メリット</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>・完全無料で利用できる</li>
                <li>・Googleアカウントがあればすぐ使える</li>
                <li>・クラウド保存でデータ紛失リスクが低い</li>
                <li>・Excelファイル（.xlsx）に書き出し可能</li>
                <li>・PDF出力が簡単（印刷→PDFで保存）</li>
                <li>・URLリンクで取引先に共有できる</li>
                <li>・複数人での同時編集に対応</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg border border-red-200 p-4">
              <p className="font-semibold text-red-800 mb-2 text-sm">デメリット</p>
              <ul className="text-sm text-red-800 space-y-1">
                <li>・インターネット接続が必要</li>
                <li>・レイアウトの自由度がExcelより低い</li>
                <li>・印刷設定に慣れが必要</li>
                <li>・複雑なマクロはExcelと互換性問題あり</li>
                <li>・Googleアカウントが必要</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            特にフリーランスや小規模事業者にとっては、コストゼロで始められる点が最大のメリットです。ただし印刷レイアウトの調整に手間がかかる場合があるため、専用ツールとの使い分けも検討しましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            スプレッドシートで見積書テンプレートを作る手順
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Googleスプレッドシートで見積書テンプレートをゼロから作成する場合、以下の手順で進めます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">1. 基本レイアウトを設定する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A4サイズ（縦向き）を想定してレイアウトを組みます。列幅を調整し、印刷範囲をA1〜H50程度に設定します。「表示」→「グリッド線」をオフにすると、より書類らしい見た目になります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の基本構成は以下の通りです。
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-6 pl-2 text-sm">
            <li>タイトル（見積書・御見積書）</li>
            <li>自社情報（会社名・住所・電話番号・担当者名）</li>
            <li>宛先（取引先会社名・担当者名）</li>
            <li>見積番号・見積日・有効期限</li>
            <li>合計金額（大きめのフォントで目立たせる）</li>
            <li>明細テーブル（品目・数量・単価・小計）</li>
            <li>小計・消費税・合計</li>
            <li>支払条件・備考欄</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">2. 自動計算の数式を設定する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            明細の小計・合計・消費税を自動計算するために数式を設定します。以下の数式を参考にしてください。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm text-gray-700 font-mono">
            <p className="font-semibold mb-2 font-sans">主な数式</p>
            <p className="mb-1">小計 = 単価 × 数量　→　<span className="text-blue-700">=D5*E5</span></p>
            <p className="mb-1">小計合計 = SUM(小計列)　→　<span className="text-blue-700">=SUM(F5:F20)</span></p>
            <p className="mb-1">消費税（10%）= 小計合計 × 0.1　→　<span className="text-blue-700">=ROUND(F22*0.1,0)</span></p>
            <p className="mb-1">合計金額 = 小計 + 消費税　→　<span className="text-blue-700">=F22+F23</span></p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            消費税の計算には<code className="bg-gray-100 px-1 rounded">ROUND</code>関数で端数処理を行うのが一般的です。切り捨ての場合は<code className="bg-gray-100 px-1 rounded">ROUNDDOWN</code>、切り上げは<code className="bg-gray-100 px-1 rounded">ROUNDUP</code>を使います。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3. テンプレートとして保存・複製する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            完成したスプレッドシートを「テンプレート用」として保存し、案件ごとにコピーして使い回すと効率的です。「ファイル」→「コピーを作成」でシートを複製できます。テンプレートファイルはフォルダを分けて管理すると整理しやすくなります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            「Googleドライブ」でテンプレートフォルダを作り、「2026年_○○株式会社_見積書v1」のような命名規則でファイル管理すると、後から探しやすくなります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            スプレッドシートからPDFに書き出す方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先にPDFで送付する場合は、Googleスプレッドシートのメニューから直接PDFに変換できます。
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6 pl-2">
            <li>「ファイル」→「ダウンロード」→「PDF（.pdf）」を選択</li>
            <li>用紙サイズ（A4）・向き（縦）を設定</li>
            <li>「エクスポート」ボタンをクリック</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-4">
            印刷範囲の設定が重要です。余分な空白が入らないよう、あらかじめ「表示」→「印刷プレビュー」で確認し、「印刷範囲を設定」で出力範囲を指定しておきましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            スプレッドシートと専用ツールの使い分け
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Googleスプレッドシートは自由度が高い反面、毎回のレイアウト調整や印刷設定に手間がかかることがあります。見積書の作成頻度が高い場合や、素早くプロフェッショナルな書類を作りたい場合は、専用の見積書作成ツールを使う方が効率的です。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">比較項目</th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">スプレッドシート</th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">専用ツール</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">初期設定の手間</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">かかる</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">すぐ使える</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">レイアウトの自由度</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">高い</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">テンプレートから選択</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">PDF出力</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">やや手間</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">ワンクリック</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">費用</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">無料</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">無料〜有料</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">作成時間</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">慣れれば短縮可</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">数分で完成</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            定期的に同じクライアントに同じ形式で送る場合はスプレッドシートが向いています。一方、案件ごとに異なるフォーマットが必要だったり、PDF品質を重視する場合は専用ツールが便利です。
          </p>

          <div className="mt-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-blue-800 mb-2">関連ガイド</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/guide/template-excel" className="text-blue-600 hover:underline">
                  見積書テンプレート（Excel・PDF）の選び方
                </Link>
              </li>
              <li>
                <Link href="/guide/word-template" className="text-blue-600 hover:underline">
                  見積書のWordテンプレートの作り方・使い方
                </Link>
              </li>
              <li>
                <Link href="/guide/how-to-write" className="text-blue-600 hover:underline">
                  見積書の書き方・必要項目を徹底解説
                </Link>
              </li>
              <li>
                <Link href="/guide/electronic" className="text-blue-600 hover:underline">
                  見積書を電子化・PDF化するメリット
                </Link>
              </li>
              <li>
                <Link href="/guide/rounding" className="text-blue-600 hover:underline">
                  見積書の端数処理の方法（切り捨て・切り上げ・四捨五入）
                </Link>
              </li>
            </ul>
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
