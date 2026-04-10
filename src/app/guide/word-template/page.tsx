import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書のWordテンプレートの作り方・使い方｜無料で簡単作成 | 見積書メーカー",
  description: "見積書をWordで作成する方法を解説。Wordテンプレートの設定方法、表の使い方、PDF保存まで、フリーランス・個人事業主向けにわかりやすく説明します。",
  openGraph: {
    title: "見積書のWordテンプレートの作り方・使い方｜無料で簡単作成",
    description: "見積書をWordで作成する方法を解説。Wordテンプレートの設定方法、表の使い方、PDF保存まで、フリーランス・個人事業主向けにわかりやすく説明します。",
    url: "https://mitsumori-maker.com/guide/word-template",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
};

export default function WordTemplatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "見積書のWordテンプレートの作り方・使い方｜無料で簡単作成",
    description:
      "見積書をWordで作成する方法を解説。Wordテンプレートの設定方法、表の使い方、PDF保存まで、フリーランス・個人事業主向けにわかりやすく説明します。",
    url: "https://mitsumori-maker.com/guide/word-template",
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
        { "@type": "ListItem", position: 3, name: "見積書のWordテンプレート", item: "https://mitsumori-maker.com/guide/word-template" },
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
              <li className="before:content-['/'] before:mx-2 text-gray-700">見積書WordテンプレートA</li>
            </ol>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書のWordテンプレートの作り方・使い方｜無料で簡単作成
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月10日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            Microsoft Wordは多くのビジネスパーソンが日常的に使っているソフトです。ExcelやGoogleスプレッドシートと比べてレイアウトの自由度が高く、文字デザインにこだわった見積書を作りやすいのが特徴です。本記事では、Wordで見積書テンプレートを作成する方法と注意点を解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            WordとExcelで見積書を作る場合の違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を作成するツールとして、WordよりもExcelやGoogleスプレッドシートの方が一般的です。その主な理由は、Excelの方が数式による自動計算が容易なためです。Wordの表は手動で金額を入力する必要があり、計算ミスが起こりやすいというデメリットがあります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            ただし、以下のようなケースではWordが適している場合もあります。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 pl-2">
            <li>見積書に説明文や条件を詳しく記載したい場合</li>
            <li>レターヘッドや会社ロゴを細かくデザインしたい場合</li>
            <li>Excelが手元にない環境（無料のWord互換ソフトを使う場合）</li>
            <li>シンプルな品目で計算が複雑でない場合</li>
          </ul>
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 mb-6">
            <p className="text-sm font-semibold text-yellow-800 mb-1">注意</p>
            <p className="text-sm text-yellow-800">
              Wordの表は自動計算に対応していないため、金額の変更のたびに合計を手動で修正する必要があります。ミスを防ぐためにも、計算が多い場合はExcelやGoogleスプレッドシートをおすすめします。
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            WordでA4縦型の見積書テンプレートを作る手順
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wordで見積書を作成する基本的な手順を解説します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">1. ページ設定をA4縦向きにする</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「レイアウト」→「ページ設定」→用紙サイズを「A4」、余白を上下25mm・左右20mm程度に設定します。フォントは「游明朝」や「BIZ UDゴシック」などの日本語フォントが見やすいです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">2. ヘッダー部分を作成する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ページ上部に以下の情報を配置します。Wordでは「テキストボックス」や「表」を使って左右に情報を並べるレイアウトが作りやすいです。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">左側（宛先・タイトル）</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">右側（自社情報）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700 align-top">
                    <p>御見積書（大きめフォント）</p>
                    <p>〇〇株式会社 御中</p>
                    <p>見積番号：No.2026-001</p>
                    <p>見積日：2026年4月10日</p>
                    <p>有効期限：2026年5月10日</p>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700 align-top">
                    <p>（会社名・屋号）</p>
                    <p>〒000-0000</p>
                    <p>住所</p>
                    <p>TEL: 000-0000-0000</p>
                    <p>担当者名</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            合計金額は中央または左側に大きく表示し、「合計金額：￥000,000（税込）」のように強調します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3. 明細テーブルを挿入する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「挿入」→「表」から明細用のテーブルを作成します。列構成の例は「品目・摘要」「数量」「単位」「単価」「小計」の5列が標準的です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            各セルの幅は列ごとに調整します。「品目・摘要」列は幅広に、数値列は幅を揃えると整理された印象になります。表のスタイルは「デザイン」タブのテーブルスタイルから選択できます。シンプルなグリッドスタイルが見積書らしい外観です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            合計行の下に「小計」「消費税（10%）」「合計金額」の行を追加し、右揃えで金額を入力します。Wordでは数式が使えないため、金額は手計算して入力してください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">4. フッター（備考・支払条件）を追加する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            明細テーブルの下に「備考」「支払条件」「振込先」などを記載するエリアを設けます。枠線のない段落形式か、ボーダー付きのテキストボックスで視覚的に区分するとスッキリします。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            WordファイルをPDFとして保存する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            完成した見積書をPDFで保存するには、以下の手順を使います。
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6 pl-2">
            <li>「ファイル」→「名前を付けて保存」を選択</li>
            <li>ファイル形式の「PDF (*.pdf)」を選択</li>
            <li>「保存」ボタンをクリック</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-4">
            または「ファイル」→「エクスポート」→「PDF/XPSの作成」からも同様にPDFを作成できます。保存前に「印刷プレビュー」でレイアウトを確認し、余分な改ページや文字の切れがないかチェックしましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            Wordを使わずに簡単に見積書を作る方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            WordやExcelを使った見積書作成は、レイアウト調整や計算の手間がかかります。頻繁に見積書を作成するフリーランスや個人事業主の方には、ブラウザで動く無料の見積書作成ツールが便利です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>見積書メーカー</strong>はインストール不要・登録不要で、必要項目を入力するだけでプロフェッショナルな見積書がPDFで出力できます。消費税の自動計算、複数テンプレートの切り替え、インボイス対応など、実務で必要な機能を網羅しています。
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
            <p className="font-semibold text-gray-900 mb-3 text-sm">見積書メーカーの主な特徴</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ ブラウザだけで完結、インストール・登録不要</li>
              <li>✓ 消費税（10%・8%）の自動計算</li>
              <li>✓ スタンダード・ミニマル・プレミアムの3テンプレート</li>
              <li>✓ インボイス（適格請求書）対応</li>
              <li>✓ PDFワンクリックダウンロード</li>
              <li>✓ 完全無料</li>
            </ul>
          </div>

          <div className="mt-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-blue-800 mb-2">関連ガイド</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/guide/template-excel" className="text-blue-600 hover:underline">
                  見積書テンプレート（Excel・PDF）の選び方
                </Link>
              </li>
              <li>
                <Link href="/guide/spreadsheet" className="text-blue-600 hover:underline">
                  見積書のスプレッドシートテンプレートの使い方
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
                <Link href="/guide/format" className="text-blue-600 hover:underline">
                  見積書のフォーマット・形式の基本
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
