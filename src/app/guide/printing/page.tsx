import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書の印刷方法・印刷設定ガイド【PDF・Excel・Wordごとに解説】 | 見積書メーカー",
  description: "見積書の印刷方法を解説。PDF・Excel・Word別の印刷設定、A4用紙への収め方、カラーか白黒か、コンビニ印刷の方法まで詳しく説明します。",
  openGraph: {
    title: "見積書の印刷方法・印刷設定ガイド【PDF・Excel・Wordごとに解説】",
    description: "見積書の印刷方法を解説。PDF・Excel・Word別の印刷設定、A4用紙への収め方、カラーか白黒か、コンビニ印刷の方法まで詳しく説明します。",
    url: "https://mitsumori-maker.com/guide/printing",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/printing",
  },
};

export default function PrintingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "見積書の印刷方法・印刷設定ガイド【PDF・Excel・Wordごとに解説】",
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
            <span className="text-gray-800">見積書の印刷方法・印刷設定ガイド</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の印刷方法・印刷設定ガイド【PDF・Excel・Wordごとに解説】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月19日</p>

          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を紙で提出する際、印刷設定を間違えると内容が切れてしまったり、複数ページに分かれて見づらくなることがあります。本記事では、PDF・Excel・Word形式それぞれの見積書を正しくA4用紙に印刷するための設定方法を詳しく解説します。コンビニでの印刷方法や、カラー・白黒の使い分けについても説明します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の印刷の基本設定
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を印刷する際には、まず以下の基本設定を確認しましょう。これはPDF・Excel・Wordどの形式でも共通して重要な項目です。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    設定項目
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    推奨値
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    注意点
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">用紙サイズ</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">A4（210×297mm）</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    ビジネス文書の標準。B5やA3は避ける
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">印刷方向</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">縦（ポートレート）</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    明細が多い場合は横向きも検討
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">余白</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">上下左右 15〜20mm</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    狭すぎるとプリンターで欠ける場合あり
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">カラー設定</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">カラーまたは白黒</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    社外提出はカラー推奨。コスト重視は白黒
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">印刷品質</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">標準（300dpi以上）</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    社外提出は「高品質」を選ぶと綺麗に仕上がる
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            PDF形式の見積書を印刷する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            PDF形式の見積書はレイアウトが崩れにくく、印刷に最も適した形式です。見積書メーカーのように、Webツールで作成してPDF出力するケースが増えています。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Adobe Acrobat Reader での印刷手順
          </h3>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>PDFファイルをAdobe Acrobat Readerで開く</li>
            <li>「ファイル」→「印刷」（またはCtrl+P）を選択</li>
            <li>プリンターを選択し、用紙サイズを「A4」に設定</li>
            <li>ページのサイズ調整で「実際のサイズ」または「用紙に合わせる」を選択</li>
            <li>プレビューで確認後、「印刷」をクリック</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            ブラウザからPDFを印刷する場合
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ChromeやEdgeのブラウザでPDFを開いた場合も基本的な手順は同じです。印刷ダイアログで「用紙サイズ」をA4に、「スケール」を100%（または「用紙に合わせる」）に設定してください。「背景のグラフィックを印刷する」にチェックを入れると、背景色や罫線も正しく印刷されます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Excel形式の見積書を印刷する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Excelの見積書テンプレートは、印刷設定を正しく行わないとページが分かれてしまったり、列が切れてしまうことがあります。以下の手順で設定を確認しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            印刷範囲の設定
          </h3>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>印刷したいセル範囲を選択する</li>
            <li>「ページレイアウト」タブ→「印刷範囲」→「印刷範囲の設定」をクリック</li>
            <li>「表示」タブ→「改ページプレビュー」で印刷範囲を視覚的に確認する</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            1ページに収める方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の内容が1ページに収まらない場合は、「ページレイアウト」→「拡大縮小印刷」の設定を使います。「1ページに印刷」を選ぶと自動的に縮小されますが、文字が小さくなりすぎないよう注意しましょう。縮小率が80%以上であれば実用上問題ありません。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            それでも収まらない場合は、余白を狭くする（「ページ設定」→「余白」タブで各余白を10〜15mmに設定）か、列幅・行高を調整することで対応します。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            罫線・枠線の印刷設定
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Excelの罫線は、実際に罫線を引いている場合は印刷されますが、画面上のグリッド線は印刷されません。「ファイル」→「印刷」→「ページ設定」→「シート」タブで「枠線」にチェックを入れることで、グリッド線を印刷することもできます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Word形式の見積書を印刷する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wordで作成した見積書は、文書の設定によっては印刷時にレイアウトが変わることがあります。以下の点を確認しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Wordの印刷設定チェックリスト
          </h3>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>「レイアウト」タブで用紙サイズをA4に設定されているか確認</li>
            <li>余白は「標準」（上下25.4mm、左右31.7mm）か「狭い」（12.7mm）を選択</li>
            <li>表のセルが次ページに分かれないよう「表のプロパティ」→「行の改ページを許可しない」を設定</li>
            <li>印刷プレビュー（Ctrl+P）で全体を確認してから印刷する</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            コンビニで見積書を印刷する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            自宅にプリンターがない場合や外出先での急な印刷には、コンビニのマルチコピー機が便利です。セブン-イレブン・ファミリーマート・ローソンなど主要チェーンで利用できます。
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            USBメモリ・スマートフォンから印刷する方法
          </h3>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>見積書をPDF形式に変換し、USBメモリに保存またはスマートフォンに転送する</li>
            <li>コンビニのマルチコピー機で「プリント」を選択</li>
            <li>「USBメモリ」または「スマートフォン・タブレット」を選択</li>
            <li>ファイルを選択し、A4・白黒（モノクロ）またはカラーを指定する</li>
            <li>料金を支払って印刷（白黒A4：1枚10〜20円、カラーA4：1枚50〜60円が目安）</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            ネットプリントを使う方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            セブン-イレブンの「ネットプリント」やファミリーマートの「ネットワークプリント」を使えば、自宅のパソコンからファイルをアップロードし、プリント番号を取得してコンビニで印刷することもできます。PDFファイルであれば高品質な印刷が可能です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            カラー印刷と白黒印刷の使い分け
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書をカラーで印刷するか白黒で印刷するかは、提出先や状況によって判断しましょう。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    場面
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    推奨
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                    理由
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    重要な新規顧客への提出
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">カラー</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    視認性が高く、信頼感・丁寧さが伝わる
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    既存の取引先への通常提出
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">白黒でも可</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    内容が読めれば問題なし。コスト削減になる
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    社内確認用の控え
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">白黒</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    コスト・資源の節約。内容が確認できれば十分
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    FAX送信
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">白黒前提で作成</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    FAXはモノクロ。カラーの罫線は薄くなる場合あり
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            近年はメールやクラウドでのPDF送付が主流になっていますが、建設業・不動産・製造業など業界によっては紙での提出が今でも一般的です。相手先の慣習に合わせて対応しましょう。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm leading-relaxed">
              <span className="font-semibold">関連記事：</span>
              見積書をPDFで作成・送付する方法については
              <Link
                href="/guide/electronic"
                className="underline hover:text-blue-600 ml-1"
              >
                見積書を電子化・PDF化するメリット
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
