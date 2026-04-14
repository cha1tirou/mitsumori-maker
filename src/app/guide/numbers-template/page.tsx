import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ArticleDisclosure from "@/components/ArticleDisclosure";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "見積書をNumbersで作る方法｜Mac・iPhoneで使えるテンプレート | 見積書メーカー",
  description:
    "MacのNumbersで見積書を作る方法をテンプレート付きで解説。Apple標準の表計算ソフトで本格的な見積書を作成するコツ、Excelとの違い、PDF出力方法まで紹介します。",
  openGraph: {
    title: "見積書をNumbersで作る方法｜Mac・iPhoneで使えるテンプレート | 見積書メーカー",
    description:
      "MacのNumbersで見積書を作る方法をテンプレート付きで解説。Apple標準の表計算ソフトで本格的な見積書を作成するコツを紹介します。",
    url: "https://mitsumori-maker.com/guide/numbers-template",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/numbers-template",
  },
};

export default function NumbersTemplateGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書をNumbersで作る方法｜Mac・iPhoneで使えるテンプレート"
        description="MacのNumbersで見積書を作る方法をテンプレート付きで解説。"
        slug="numbers-template"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">ガイド一覧</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">Numbersで見積書を作る方法</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書をNumbersで作る方法｜Mac・iPhoneで使えるテンプレート
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月14日</p>
          <ArticleDisclosure />

          <p className="text-gray-700 leading-relaxed mb-8">
            MacユーザーやiPhoneユーザーなら、Apple純正の表計算ソフト「Numbers」を使って見積書を作成できます。Numbersは無料で使え、洗練されたデザインのテンプレートが豊富に用意されています。この記事では、Numbersで見積書を作る手順、Excel版との違い、PDF出力の方法について詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Numbersとは？見積書作成に向いている理由
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Numbersは、Appleが提供する無料の表計算アプリです。Mac・iPhone・iPadで利用でき、iCloud連携によりどのデバイスからでも同じファイルにアクセスできます。Microsoft Excelに似た機能を持ちながら、洗練されたデザインテンプレートとシンプルな操作性が特徴です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書作成においてNumbersが選ばれる主な理由は次の通りです。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>完全無料</strong>：App StoreからダウンロードするだけでMac・iPhone・iPadで無料利用できる
            </li>
            <li>
              <strong>デザインが美しい</strong>：Appleらしいシンプルで洗練されたレイアウトで、見た目の良い見積書が作りやすい
            </li>
            <li>
              <strong>iCloud同期</strong>：Macで作った見積書をiPhoneから確認・編集できる
            </li>
            <li>
              <strong>PDF出力が簡単</strong>：「書き出し→PDF」の操作で高品質なPDFが出力できる
            </li>
            <li>
              <strong>Excel形式で保存可能</strong>：取引先がWindowsユーザーの場合でも、xlsx形式に変換して送付できる
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Numbersで見積書を作る手順
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Numbersで見積書を作成する基本的な手順を説明します。Macでの操作を例に取りますが、iPhoneやiPadでもほぼ同様の手順で作成できます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">手順1：Numbersを起動してテンプレートを選ぶ</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Numbersを起動すると「テンプレートを選択」画面が表示されます。「ビジネス」カテゴリを開くと、請求書・見積書に使えるテンプレートがあります。「請求書」テンプレートをベースに見積書に編集するのが最も手軽な方法です。テンプレートを選んだら「作成」をクリックします。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">手順2：自社情報と宛先を入力する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            テンプレートを開いたら、まず会社名・住所・電話番号・メールアドレスなどの自社情報を入力します。次に宛先（取引先）の情報を記入しましょう。タイトル部分の「INVOICE（請求書）」を「見積書」や「御見積書」に変更することも忘れずに。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">手順3：見積番号・作成日・有効期限を設定する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書には必ず見積番号・作成日・有効期限を記載しましょう。見積番号は「EST-2026-001」のように連番で管理すると、後から検索・整理がしやすくなります。有効期限は「作成日から30日間」が一般的です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">手順4：明細（品名・数量・単価・金額）を入力する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            テンプレートの明細行に、品名（サービス名・商品名）・数量・単価を入力します。Numbersでは「金額 = 数量 × 単価」の計算式があらかじめ設定されているため、数量と単価を入れるだけで自動的に金額が計算されます。行が足りない場合は、既存の行を選択してコピー＆ペーストで追加できます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">手順5：消費税・合計を確認する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            小計・消費税・合計の欄を確認します。消費税率が自動で計算されない場合は、「=小計セル×0.1」のような数式を入力しましょう。インボイス対応の場合は、登録番号（T+13桁の法人番号）も記載します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">手順6：PDFとして書き出す</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書が完成したら、メニューバーの「ファイル→書き出す→PDF...」を選択します。PDFの品質や向きを設定して「次へ」をクリックし、保存先を選んで「書き出す」を押せば完成です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Numbersの見積書テンプレート：必須項目チェックリスト
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Numbersで見積書を作成する際は、以下の項目がすべて含まれているか確認しましょう。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>表題</strong>：「御見積書」「見積書」など</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>宛名</strong>：取引先の会社名・部署名・担当者名（○○御中）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>作成日</strong>：見積書を作成した日付</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>有効期限</strong>：見積書が有効な期間（例：〇年〇月〇日まで）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>見積番号</strong>：管理用の番号</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>発行者情報</strong>：会社名・住所・電話番号・メールアドレス</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>明細</strong>：品名・数量・単位・単価・金額</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>小計・消費税・合計</strong>：税率ごとに分けて記載</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span><strong>備考</strong>：支払条件・納期・スコープ外事項など</span>
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Numbers vs Excel：見積書作成の違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書作成においてNumbersとExcelにはいくつかの違いがあります。どちらを選ぶかは、主に使用環境と相手方の環境によって決まります。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">項目</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Numbers</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Excel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">価格</td>
                  <td className="border border-gray-200 px-4 py-2">無料</td>
                  <td className="border border-gray-200 px-4 py-2">Microsoft 365（月払い）</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">対応OS</td>
                  <td className="border border-gray-200 px-4 py-2">Mac・iPhone・iPad</td>
                  <td className="border border-gray-200 px-4 py-2">Windows・Mac・モバイル</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">デザイン</td>
                  <td className="border border-gray-200 px-4 py-2">洗練されたテンプレート多数</td>
                  <td className="border border-gray-200 px-4 py-2">ビジネス向け実用テンプレート多数</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">互換性</td>
                  <td className="border border-gray-200 px-4 py-2">xlsx変換可能（完全ではない）</td>
                  <td className="border border-gray-200 px-4 py-2">ビジネス標準・高い互換性</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">PDF出力</td>
                  <td className="border border-gray-200 px-4 py-2">標準機能で簡単出力</td>
                  <td className="border border-gray-200 px-4 py-2">標準機能で出力可能</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">クラウド</td>
                  <td className="border border-gray-200 px-4 py-2">iCloud（Apple純正）</td>
                  <td className="border border-gray-200 px-4 py-2">OneDrive・SharePoint</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先がWindowsユーザーが多い場合や、複数人で編集することが多い場合はExcelが安全です。一方、Mac・iPhone環境で完結させたい個人事業主やフリーランスにはNumbersが使いやすい選択肢です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Numbersで見積書を作る際の注意点
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">xlsx形式で保存する際はレイアウト崩れに注意</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            NumbersファイルをExcel形式（.xlsx）に変換すると、フォント・レイアウト・計算式が崩れることがあります。取引先に送付する場合は、必ずPDF形式に変換してから送ることをおすすめします。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">インボイス制度への対応を確認する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            2023年10月から始まったインボイス制度（適格請求書等保存方式）に対応するため、見積書にインボイス登録番号（T+13桁）を記載する項目を追加しましょう。Numbersのテンプレートはこの項目がない場合があるため、テキストボックスを追加して対応してください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">数式エラーに注意する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            行を追加・削除したときに合計や小計の数式が正しい範囲を参照しているか確認しましょう。特に「SUM」関数で範囲を指定している場合、行を追加した際に範囲が自動更新されないことがあります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            もっと手軽に見積書を作りたい場合はWebツールがおすすめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Numbersで見積書を一から作るのは少し手間がかかります。テンプレートのカスタマイズ・数式の設定・PDF出力など、慣れるまでに時間が必要です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            「もっと手軽に見積書を作りたい」という方には、ブラウザ上で完結する見積書メーカーがおすすめです。フォームに入力するだけでリアルタイムにプレビューが表示され、ワンクリックでPDFが出力できます。Mac・Windows・iPhone・Androidどの環境でも動作し、ソフトのインストールも不要です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            NumbersはMacユーザーにとって無料で使える便利な見積書作成ツールです。洗練されたテンプレートを活用すれば、見た目の良い見積書を短時間で作成できます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            ただし、取引先との互換性やインボイス制度への対応など、気をつけるべき点もあります。特に頻繁に見積書を作成する場合や、複数のテンプレートを使い分けたい場合は、専用の見積書作成ツールの利用も検討してみてください。
          </p>
        </article>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/template-excel" className="text-blue-600 hover:underline text-sm">
                見積書テンプレート（Excel・PDF）の選び方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/spreadsheet" className="text-blue-600 hover:underline text-sm">
                Googleスプレッドシートで見積書を作る方法
              </Link>
            </li>
            <li>
              <Link href="/guide/word-template" className="text-blue-600 hover:underline text-sm">
                Wordで見積書を作る方法・テンプレートの使い方
              </Link>
            </li>
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
          </ul>
        </div>

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
