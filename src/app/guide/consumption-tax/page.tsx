import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ArticleDisclosure from "@/components/ArticleDisclosure";
import GuideCta from "@/components/GuideCta";

export const metadata: Metadata = {
  title: "見積書の消費税の書き方|税抜・税込・インボイス対応を具体例で解説 | 見積書メーカー",
  description:
    "見積書の消費税の書き方を具体例付きで解説。税抜・税込の正しい表記方法、消費税別途の記載例、インボイス制度対応の見積書の書き方、軽減税率8%の扱いまで網羅。",
  openGraph: {
    title: "見積書の消費税の書き方|税抜・税込・インボイス対応を具体例で解説",
    description: "見積書の消費税の正しい書き方を具体例で解説。税抜・税込表記、消費税別途の記載方法、インボイス対応まで。",
    url: "https://mitsumori-maker.com/guide/consumption-tax",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%B6%88%E8%B2%BB%E7%A8%8E%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "見積書の消費税の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/consumption-tax",
  },
};

export default function ConsumptionTaxGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の消費税の書き方|税抜・税込・インボイス対応を具体例で解説"
        description="見積書の消費税の正しい書き方を具体例付きで解説。税抜・税込表記、消費税別途の記載方法、インボイス制度対応まで網羅。"
        slug="consumption-tax"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書の消費税の書き方</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の消費税の書き方｜税抜・税込・インボイス対応を具体例で解説
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月8日</p>
          <ArticleDisclosure />

          <p className="text-gray-700 leading-relaxed mb-8">
            見積書を作成するとき、「消費税はどう書けばいいのか」「税抜と税込どちらで記載すべきか」「消費税別途と書く場合はどうすればよいか」と迷う方は多いのではないでしょうか。特に2023年10月に始まったインボイス制度（適格請求書等保存方式）以降、消費税に関する記載ルールへの関心が高まっています。この記事では、見積書における消費税の正しい書き方を、具体的な記載例を交えてわかりやすく解説します。
          </p>

          {/* --- H2-1 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書に消費税を記載する基本ルール
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書には法的に決まった書式はありませんが、消費税に関しては取引先との認識違いを防ぐために、次の3つのポイントを押さえて記載することが重要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 税込・税抜を必ず明記する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の金額が税込なのか税抜なのかを必ず明記しましょう。これが曖昧だと、最終的な支払額で認識のズレが生じ、トラブルの原因になります。一般的には以下のような記載方法があります。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
            <p className="text-gray-700 text-sm mb-3 font-semibold">記載例（税込表示の場合）</p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>御見積金額：<strong>¥1,100,000-（税込）</strong></li>
            </ul>
            <p className="text-gray-700 text-sm mb-3 mt-4 font-semibold">記載例（税抜表示の場合）</p>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>御見積金額：<strong>¥1,000,000-（税抜）</strong></li>
              <li className="text-gray-500">※上記金額に消費税（10%）が加算されます</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            明細の単価についても、税込単価なのか税抜単価なのかを統一して表記することが大切です。単価は税抜で表示し、合計欄で消費税を加算する方式が最も一般的です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 小計・消費税額・合計の3段階表示
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の明細下部には、以下の3つを分けて記載するのが標準的です。この3段階表示により、取引先が経理処理を行う際にスムーズに仕入税額控除を計算できます。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
            <ul className="space-y-2 text-gray-700">
              <li><strong>小計（税抜金額）</strong>：¥1,000,000</li>
              <li><strong>消費税（10%）</strong>：¥100,000</li>
              <li><strong>合計（税込金額）</strong>：¥1,100,000</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 軽減税率（8%）と標準税率（10%）の区別
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            飲食料品や定期購読の新聞など、軽減税率（8%）が適用される商品を含む見積書では、税率ごとに金額を分けて記載する必要があります。明細に「※」などの印をつけ、「※は軽減税率8%対象」と注記する方法が一般的です。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 text-sm mb-3 font-semibold">軽減税率を含む記載例</p>
            <div className="text-gray-700 text-sm font-mono space-y-1">
              <p>飲料水（500ml x 24本）※  ¥2,400</p>
              <p>会議室備品レンタル      ¥50,000</p>
              <p className="mt-2">小計（10%対象）：¥50,000</p>
              <p>消費税（10%）：¥5,000</p>
              <p>小計（8%対象）：¥2,400 ※</p>
              <p>消費税（8%）：¥192</p>
              <p className="font-bold mt-2">合計（税込）：¥57,592</p>
              <p className="text-gray-500 mt-2">※は軽減税率8%対象商品</p>
            </div>
          </div>

          {/* --- H2-2 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            「消費税別途」の書き方と記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書で「消費税別途」と記載するケースは多くあります。特に建設業やIT業界のように金額が大きい取引では、税抜金額を明示した上で「消費税は別途申し受けます」と注記するのが一般的です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            「消費税別途」の記載パターン
          </h3>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 text-sm mb-2">パターン1：合計欄に注記</p>
              <p className="text-gray-700 text-sm font-mono">御見積金額：¥1,000,000-（税抜）</p>
              <p className="text-gray-500 text-sm font-mono">※別途消費税（10%）を申し受けます</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 text-sm mb-2">パターン2：備考欄に記載</p>
              <p className="text-gray-700 text-sm font-mono">【備考】</p>
              <p className="text-gray-700 text-sm font-mono">・上記金額は全て税抜価格です</p>
              <p className="text-gray-700 text-sm font-mono">・消費税は別途頂戴いたします</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 text-sm mb-2">パターン3：消費税額を明示した上で別途記載</p>
              <p className="text-gray-700 text-sm font-mono">小計：¥1,000,000（税抜）</p>
              <p className="text-gray-700 text-sm font-mono">消費税（10%）：¥100,000</p>
              <p className="text-gray-700 text-sm font-mono font-bold">合計：¥1,100,000（税込）</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先との信頼関係を保つためには、パターン3のように消費税額を具体的に計算して明示するのが最も丁寧で、トラブルを防ぎやすい方法です。「消費税別途」とだけ書いて具体的な税額を記載しないと、取引先が総額を把握しにくくなるため注意しましょう。
          </p>

          {/* --- H2-3 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            インボイス制度と見積書の関係｜見積書に必要な記載事項
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度（適格請求書等保存方式）は、消費税の仕入税額控除を受けるために「適格請求書（インボイス）」の保存を求める制度です。2023年10月に開始され、現在はすべての課税事業者に適用されています。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            見積書はインボイスに該当するか？
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            結論から言うと、見積書はインボイス（適格請求書）には該当しません。インボイスとして認められるのは、実際の取引が完了した後に発行される請求書や領収書です。見積書は取引前に発行する書類であるため、インボイスの法的要件を満たす必要はありません。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            ただし、見積書の段階からインボイスに準じた記載をしておくと、以下のメリットがあります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>請求書を作成する際にそのまま転記でき、作業効率が上がる</li>
            <li>取引先が見積もり段階で仕入税額控除の見通しを立てやすくなる</li>
            <li>適格請求書発行事業者であることをアピールでき、取引先の安心感につながる</li>
            <li>社内稟議時に経理部門が消費税額を正確に把握できる</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            インボイス対応の見積書の書き方｜記載すべき6項目
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度に対応した見積書を作成する場合、以下の6項目を記載しておくとスムーズです。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <ol className="space-y-3 text-gray-700 text-sm">
              <li><strong>1. 適格請求書発行事業者の登録番号</strong>（T+13桁の番号）</li>
              <li><strong>2. 発行者の氏名または名称</strong></li>
              <li><strong>3. 取引の内容</strong>（軽減税率対象品目がある場合はその旨）</li>
              <li><strong>4. 税率ごとに区分した対価の額</strong>（10%対象、8%対象を分けて表示）</li>
              <li><strong>5. 税率ごとの消費税額</strong></li>
              <li><strong>6. 見積書の発行日・有効期限</strong></li>
            </ol>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            適格請求書発行事業者の登録番号の記載方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            適格請求書発行事業者として登録している場合は、見積書にも「T+13桁」の登録番号を記載しましょう。記載場所は、発行者情報（社名・住所の近く）に入れるのが一般的です。
          </p>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700 text-sm">
              <strong>記載例</strong>：<br />
              株式会社〇〇<br />
              東京都渋谷区〇〇1-2-3<br />
              登録番号: T1234567890123
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            登録番号は国税庁の「適格請求書発行事業者公表サイト」で検索・確認できます。取引先から番号の確認を求められることもあるため、あらかじめ記載しておくと対応がスムーズです。
          </p>

          {/* --- H2-4: 具体的な記載例 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の消費税の記載例｜業種別テンプレート
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            実際に見積書の消費税をどう書けばよいか、業種別の具体例を紹介します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            IT・Web制作業の見積書例
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`御見積書

見積番号: MTS-2026-058
見積日:   2026年4月8日
有効期限: 2026年5月8日
登録番号: T1234567890123

【宛先】
株式会社〇〇 御中

【件名】
Webサイトリニューアル

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No  品目                     数量  単価        金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1   デザイン制作（トップ+5P） 1式  ¥400,000   ¥400,000
2   コーディング              1式  ¥300,000   ¥300,000
3   CMS構築                   1式  ¥200,000   ¥200,000
4   テスト・修正              1式  ¥100,000   ¥100,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        小計（税抜）¥1,000,000
                      消費税（10%）    ¥100,000
                      合計（税込）  ¥1,100,000

【備考】
・上記金額は全て税抜価格です
・消費税率は10%で計算しております`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            建設・リフォーム業の見積書例
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`御見積書

見積番号: KEN-2026-112
登録番号: T9876543210987

【件名】
キッチンリフォーム工事

━━━━━━━━━━━━━━━━━━━━━━━━━━
No  品目                数量  単価        金額
━━━━━━━━━━━━━━━━━━━━━━━━━━
1   システムキッチン本体  1台  ¥350,000   ¥350,000
2   取付工事費            1式  ¥120,000   ¥120,000
3   配管工事              1式  ¥80,000    ¥80,000
4   廃材処理費            1式  ¥30,000    ¥30,000
5   諸経費                1式  ¥20,000    ¥20,000
━━━━━━━━━━━━━━━━━━━━━━━━━━
                     小計（税抜） ¥600,000
                   消費税（10%）   ¥60,000
                   合計（税込）   ¥660,000

※上記金額には消費税10%が含まれています
※別途費用が発生する場合は事前にご連絡いたします`}
          </div>

          {/* --- H2-5 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            消費税の端数処理のルール
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            消費税の計算で端数（1円未満の端数）が生じた場合の処理方法は、インボイス制度で明確にルールが定められています。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">インボイス制度での端数処理ルール</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>端数処理は税率ごとに1回のみ</strong>：明細の各行ごとに消費税を計算して端数処理するのではなく、同じ税率の合計額に対して1回だけ端数処理を行います。
              </li>
              <li>
                <strong>処理方法は自由</strong>：切り捨て・切り上げ・四捨五入のいずれでもOKですが、一度決めたら一貫して同じ方法を使いましょう。
              </li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
            <p className="text-gray-700 text-sm mb-2"><strong>正しい例（税率ごとに1回の端数処理）</strong></p>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>商品A：¥1,234</li>
              <li>商品B：¥5,678</li>
              <li>小計：¥6,912</li>
              <li>消費税（10%）：¥6,912 x 10% = ¥691.2 → <strong>¥691</strong>（切り捨て）</li>
              <li className="font-bold">合計：¥7,603</li>
            </ul>
            <p className="text-red-600 text-xs mt-3">NG例：商品Aの税=¥123、商品Bの税=¥567で合計¥690とするのは不可</p>
          </div>

          {/* --- H2-6 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            免税事業者の見積書と消費税の扱い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            課税売上高が1,000万円以下の免税事業者は、適格請求書発行事業者に登録していないケースが多いです。免税事業者の見積書における消費税の扱いについて理解しておきましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>消費税を請求すること自体は可能</strong>：免税事業者でも、取引において消費税を上乗せして請求することは法律上認められています。
            </li>
            <li>
              <strong>取引先の仕入税額控除に影響</strong>：免税事業者からの仕入れについては、取引先が仕入税額控除を全額受けることができません。このため、取引先から値下げ交渉を受ける可能性があります。
            </li>
            <li>
              <strong>経過措置の活用</strong>：2026年9月末までは仕入税額の80%、2029年9月末までは50%が控除可能という経過措置があります。
            </li>
          </ul>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-6">
            <p className="text-gray-800 text-sm font-semibold mb-2">免税事業者の見積書の書き方のポイント</p>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>・登録番号の欄は空欄または記載なしとする</li>
              <li>・備考欄に「当社は免税事業者です」と明記するとトラブルを防げる</li>
              <li>・税込価格で表示し、内税として扱うのが一般的</li>
              <li>・「消費税相当額」と表記する方法もある</li>
            </ul>
          </div>

          {/* --- H2-7: FAQ --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            よくある質問（FAQ）
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 見積書の消費税は税込・税抜どちらで書くべきですか？</p>
              <p className="text-gray-700 text-sm">
                A. どちらでも問題ありませんが、BtoB取引では税抜表示が主流です。税抜金額を明細に記載し、消費税額を別途表示した上で、税込の合計金額を記載する3段階方式が最も一般的です。BtoC取引の場合は総額表示（税込表示）が義務付けられているため注意が必要です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 「消費税別途」と書くだけで大丈夫ですか？</p>
              <p className="text-gray-700 text-sm">
                A. 法的には問題ありませんが、取引先の利便性を考えると消費税額を具体的に計算して記載するのがベストです。「消費税別途」だけでは合計金額が不明確になり、取引先が社内稟議や予算管理を行いにくくなります。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. インボイス制度に対応した見積書を作る必要はありますか？</p>
              <p className="text-gray-700 text-sm">
                A. 見積書はインボイス（適格請求書）には該当しないため、法的な義務はありません。ただし、請求書作成時の転記ミス防止や取引先への信頼感向上のため、登録番号や税率ごとの消費税額を見積書にも記載しておくことを推奨します。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 消費税の端数はどう処理すればよいですか？</p>
              <p className="text-gray-700 text-sm">
                A. 切り捨て・切り上げ・四捨五入のいずれでも構いませんが、インボイス制度では「税率ごとに1回」の端数処理がルールです。明細の各行ごとに端数処理するのではなく、同じ税率の合計額に対して1回だけ行いましょう。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 免税事業者は消費税を請求してもよいですか？</p>
              <p className="text-gray-700 text-sm">
                A. はい、免税事業者でも消費税を上乗せして請求すること自体は法律上認められています。ただし、取引先はインボイスを発行できない事業者からの仕入れについて仕入税額控除を全額受けられないため、取引条件の交渉が発生する可能性があります。
              </p>
            </div>
          </div>

          {/* --- まとめ --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書における消費税の記載は、取引先との信頼関係とスムーズな経理処理のために非常に重要です。以下のポイントを押さえて、正確な見積書を作成しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>税込・税抜を必ず明記する</li>
            <li>小計・消費税額・合計の3段階で表示する</li>
            <li>「消費税別途」の場合も消費税額を具体的に記載する</li>
            <li>軽減税率対象品がある場合は税率ごとに分ける</li>
            <li>適格請求書発行事業者の登録番号を記載する</li>
            <li>端数処理は税率ごとに1回、方法を統一する</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書メーカーでは、消費税の自動計算・税率ごとの表示・インボイス対応の登録番号欄を標準装備しています。面倒な消費税の計算をツールに任せて、正確な見積書を作成しましょう。
          </p>
        </article>

        <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            インボイス対応の会計ソフトで消費税管理をカンタンに
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度への対応は、適格請求書の発行だけでなく、消費税の計算・端数処理・税率ごとの集計など経理業務の負担が大きくなります。会計ソフトを使えば、これらの複雑な処理を自動化できます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>やよいの青色申告オンライン</strong>は、インボイス制度に完全対応。適格請求書の作成・発行はもちろん、税率ごとの自動仕訳、消費税申告書の作成まで一括で対応できます。初年度は無料で利用でき、フリーランスから法人まで幅広く使われています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JDCT6+35XE+5YJRM"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center text-sm"
            >
              やよいの青色申告オンラインを見る →
            </a>
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JDCT6+35XE+601S2"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-lg border border-green-300 hover:bg-green-50 transition-colors text-center text-sm"
            >
              やよいの白色申告オンラインを見る →
            </a>
          </div>
          <div className="mt-6 pt-5 border-t border-green-200">
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              他の会計ソフトも比較してみましょう。<strong>freee会計</strong>はクラウド会計ソフトシェアNo.1で、インボイス制度にも完全対応。税率ごとの自動仕訳や消費税申告書の作成はもちろん、質問に答えるだけで確定申告書類が完成する「ステップ入力」で初心者にも使いやすいと評判です。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JU+3SPO+9FDAJ6"
                rel="nofollow"
                target="_blank"
                className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-lg border border-green-300 hover:bg-green-50 transition-colors text-center text-sm"
              >
                freee会計を見る →
              </a>
              <a
                href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JU+3SPO+9FL80Y"
                rel="nofollow"
                target="_blank"
                className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-lg border border-green-300 hover:bg-green-50 transition-colors text-center text-sm"
              >
                freee会計を無料でお試し →
              </a>
            </div>
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
              <Link href="/guide/freelance" className="text-blue-600 hover:underline text-sm">
                フリーランス・個人事業主のための見積書ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/difference" className="text-blue-600 hover:underline text-sm">
                見積書・請求書・納品書の違いをわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/invoice-howto" className="text-blue-600 hover:underline text-sm">
                請求書の書き方ガイド・必要な記載項目を解説
              </Link>
            </li>
            <li>
              <Link href="/guide/misc-expenses" className="text-blue-600 hover:underline text-sm">
                見積書の諸経費の書き方・計算方法
              </Link>
            </li>
            <li>
              <Link href="/guide/breakdown" className="text-blue-600 hover:underline text-sm">
                見積書の内訳の書き方・明細の作成ポイント
              </Link>
            </li>
          </ul>
        </div>

        <GuideCta type="tax-calc" />
      </main>
    </div>
  );
}
