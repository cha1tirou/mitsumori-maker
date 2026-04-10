import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ArticleDisclosure from "@/components/ArticleDisclosure";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "見積書の内訳（明細）の書き方・記載例まとめ | 見積書メーカー",
  description:
    "見積書の内訳・明細の書き方を記載例付きで解説。品名・数量・単価の書き方、内訳を詳しく書くメリット、一式との使い分けなど実践的なポイントをまとめました。",
  openGraph: {
    title: "見積書の内訳（明細）の書き方・記載例まとめ | 見積書メーカー",
    description:
      "見積書の内訳・明細の書き方を記載例付きで解説。品名・数量・単価の書き方、一式との使い分けなど。",
    url: "https://mitsumori-maker.com/guide/breakdown",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/breakdown",
  },
};

export default function BreakdownGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の内訳（明細）の書き方・記載例まとめ"
        description="見積書の内訳・明細の書き方を記載例付きで解説。"
        slug="breakdown"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書の内訳の書き方</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の内訳（明細）の書き方・記載例まとめ
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月7日</p>
          <ArticleDisclosure />

          <p className="text-gray-700 leading-relaxed mb-8">
            見積書の内訳（明細）は、取引先に対して費用の根拠を示す重要な部分です。「何にいくらかかるのか」が明確な見積書は、取引先の意思決定を後押しし、受注率の向上にもつながります。この記事では、見積書の内訳の書き方を業種別の記載例とともに詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の内訳とは？明細を詳しく書くメリット
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の内訳とは、合計金額の根拠となる項目を一覧にまとめた明細部分のことです。「品名（サービス名）・数量・単位・単価・金額」の列で構成されるのが一般的で、この明細をいかに丁寧に書けるかが、プロフェッショナルな見積書と粗雑な見積書を分ける大きなポイントになります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            内訳を詳しく書くことには、次のようなメリットがあります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>取引先が内容を理解しやすくなる</strong>：何にいくら費用がかかるのかが一目でわかるため、取引先が社内稟議を通しやすくなります。
            </li>
            <li>
              <strong>値引き交渉への対応が楽になる</strong>：明細が細かく書いてあれば、「この項目だけ削る」「数量を減らす」といった調整が可能になり、値引き一辺倒にならなくて済みます。
            </li>
            <li>
              <strong>後からのトラブルを防げる</strong>：「見積もりにこの作業は含まれているのか？」という追加費用のトラブルを事前に防ぎ、認識齟齬を最小化できます。
            </li>
            <li>
              <strong>自社の価値が伝わる</strong>：作業内容が可視化されることで、「なぜこの金額なのか」が伝わり、価格競争ではなく価値で勝負できます。
            </li>
            <li>
              <strong>比較検討で選ばれやすくなる</strong>：複数社から見積もりを取る発注者は、内訳のわかりやすい見積書を好みます。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            内訳の基本構成（品名・数量・単位・単価・金額）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の内訳は、以下の列で構成するのが標準的です。それぞれの項目について書き方のポイントを押さえておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">品名（サービス名・商品名）</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先が見たときに何を指しているか一目でわかる名称を記載します。「作業費」「デザイン」といった抽象的な名称ではなく、「トップページデザイン」「ヒアリング・要件定義（3時間）」のように具体的に書きましょう。長くなる場合は品名欄に収めきれない補足を備考欄に記載するとスッキリします。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">数量・単位</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            数量はその仕事や商品の量を表す数値です。単位は「式（しき）」「ページ」「時間」「個」「m²」など、品名に合った単位を選びます。たとえばコンサルティングなら「時間」や「回」、建設工事なら「m」「㎡」「式」などが使われます。単位を省略すると数量の意味が伝わりにくくなるため、必ず記載しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">単価</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1単位あたりの価格です。単価が「税込」か「税抜」かを明確にしておくことが重要です。インボイス制度対応の観点からも、単価は税抜で記載し、明細の下部でまとめて消費税を計算する形式が一般的です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">金額（小計）</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「数量 × 単価」で算出した行ごとの金額です。合計欄に直接合計額だけを書くのではなく、行ごとに金額を記載することで透明性が高まります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">小計・消費税・合計</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            明細の下に、税抜小計・消費税額（8%と10%が混在する場合は税率ごとに分けて記載）・税込合計の3段構成で記載します。インボイス（適格請求書）として発行する場合は、登録番号（T+13桁）を合わせて記載する必要があります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            業種別の内訳記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            業種によって内訳の書き方は大きく異なります。自分の業種に近い例を参考にしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Web制作の内訳例</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Web制作では、デザイン・コーディング・CMS構築といった工程を項目ごとに分けて記載するのが基本です。ページ数や画面数を数量に反映させることで、金額の根拠が明確になります。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line overflow-x-auto">
{`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No  品名                         数量  単位  単価      金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1   トップページデザイン            1   式   ¥200,000  ¥200,000
2   下層ページデザイン              5   ページ ¥ 60,000  ¥300,000
3   バナー・アイコン制作            1   式   ¥ 50,000  ¥ 50,000
4   HTML/CSSコーディング            1   式   ¥250,000  ¥250,000
5   CMS構築（WordPress）           1   式   ¥150,000  ¥150,000
6   プラグイン設定・動作確認         1   式   ¥ 30,000  ¥ 30,000
7   納品・修正対応（2回まで）        1   式   ¥ 20,000  ¥ 20,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                  小計（税抜）   ¥1,000,000
                                  消費税（10%）   ¥100,000
                                  合計（税込）  ¥1,100,000`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">建設業の内訳例</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業の見積書は「材料費・労務費・外注費・諸経費」の4区分で整理するのが業界の慣例です。工事種別ごとに分けて小計を設けると、複数の工事をまとめて見積もる際に見やすくなります。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line overflow-x-auto">
{`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No  品名                         数量  単位  単価      金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【内装リフォーム工事】
1   材料費（フローリング材）       50   m²   ¥  4,500  ¥225,000
2   材料費（接着剤・釘等）         1   式   ¥ 20,000  ¥ 20,000
3   労務費（床張り工事）          50   m²   ¥  3,000  ¥150,000
4   外注費（電気工事）             1   式   ¥ 80,000  ¥ 80,000
5   諸経費（廃材処分・養生費）     1   式   ¥ 25,000  ¥ 25,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                  小計（税抜）    ¥500,000
                                  消費税（10%）    ¥50,000
                                  合計（税込）    ¥550,000

※材料費は仕入れ時点の価格です。価格変動があった場合は再見積りとなります。`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">コンサルティングの内訳例</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            コンサルティングは成果物がわかりにくいため、フェーズや作業内容を細かく分けて記載することが特に重要です。時間単価×作業時間で積み上げる方法と、フェーズごとに固定金額を設定する方法があります。交通費・通信費などの実費は別途明示しましょう。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line overflow-x-auto">
{`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No  品名                         数量  単位  単価      金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【業務改善コンサルティング（3ヶ月）】
1   初期ヒアリング・現状分析        8   時間  ¥30,000  ¥240,000
2   課題整理・提案書作成            6   時間  ¥30,000  ¥180,000
3   プレゼンテーション（2回）        2   回   ¥50,000  ¥100,000
4   月次進捗報告・アドバイス        3   回   ¥40,000  ¥120,000
5   最終レポート作成・提出          1   式   ¥80,000  ¥ 80,000
6   交通費（実費）                  -   式       実費    ¥15,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                  小計（税抜）    ¥735,000
                                  消費税（10%）    ¥73,500
                                  合計（税込）    ¥808,500

※交通費は都度精算。交通費のみ非課税（実費）となります。`}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            内訳を上手に書くためのポイント5選
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント1：「一式」は補足説明を添える
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「一式」という表現は便利ですが、何が含まれているのかわかりません。使う場合は品名欄に含まれる内容を括弧書きで補足するか、備考欄に詳細を記載しましょう。たとえば「諸経費一式（廃材処分・養生・現場管理費を含む）」のように書くと親切です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント2：費目を階層化してまとめる
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            項目が多い場合は「デザイン費」「開発費」「保守費」のように大カテゴリで分類し、その下に細目を記載する階層構造にすると見やすくなります。カテゴリごとに小計行を設けると、どこにいくら使われるのかが一層明確になります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント3：スコープ外を明示する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「この見積もりに含まれていないもの」を備考欄に明記すると、後からの追加費用トラブルを防げます。たとえば「ドメイン・サーバー費用は別途」「コンテンツ（テキスト・写真）はお客様ご用意」のように書いておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント4：単価は税抜きで統一する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度対応の観点から、単価は税抜きで統一し、明細の末尾で消費税を一括計算する方式が推奨されます。軽減税率（8%）が適用される品目がある場合は、税率ごとに区分けして消費税額を記載する必要があります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント5：変動費・オプションは別枠にする
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「追加ページが発生した場合の単価」「修正回数超過時の費用」など、状況によって変わる費用は本体の明細とは分けて、「別途オプション」「追加費用目安」として明示しておくと、後からの費用増加を事前に合意しやすくなります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の内訳（明細）は、単なる金額の羅列ではなく、あなたの仕事の価値を伝える営業ツールです。品名を具体的に書き、数量・単価を明確にし、スコープ外を明示することで、取引先にとって「わかりやすく信頼できる見積書」になります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            特に意識すべき3つのポイントは次の通りです。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>品名は「何を」「どれくらい」が伝わるように具体的に書く</li>
            <li>単価は税抜きで統一し、消費税は末尾に一括記載する</li>
            <li>「一式」を使う場合は必ず内容の補足説明を添える</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            これらを実践するだけで、取引先からの信頼が高まり、スムーズな受注につながります。見積書メーカーを活用すれば、このような内訳を含む見積書を無料でかんたんに作成・PDF出力できます。
          </p>
        </article>

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            見積書・請求書の管理を会計ソフトで効率化
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            内訳の細かい見積書を毎回一から作るのは大変です。会計ソフトを使えば、過去の見積書を流用・修正する機能や、見積書から請求書へのワンクリック変換機能が使えるため、書類作成の時間を大幅に削減できます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>やよいの青色申告オンライン</strong>は、個人事業主・フリーランスに人気No.1の会計ソフトです。初年度無料で使えるプランがあり、インボイス制度にも完全対応しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JDCT6+35XE+5YJRM"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
            >
              やよいの青色申告オンラインを見る →
            </a>
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JDCT6+35XE+601S2"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors text-center text-sm"
            >
              やよいの白色申告オンラインを見る →
            </a>
          </div>
          <div className="pt-4 border-t border-blue-200">
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              <strong>freee会計</strong>はクラウド会計シェアNo.1。スマホアプリでレシート撮影や経費入力ができ、質問に答えるだけで確定申告書類が完成します。
            </p>
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JU+3SPO+9FDAJ6"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors text-center text-sm"
            >
              freee会計を無料で試す →
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/lump-sum" className="text-blue-600 hover:underline text-sm">
                見積書の「一式」の書き方・使い方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/construction" className="text-blue-600 hover:underline text-sm">
                建設業の見積書の書き方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/it-web" className="text-blue-600 hover:underline text-sm">
                IT・Web業界の見積書の書き方ガイド
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
