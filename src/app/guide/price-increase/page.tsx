import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "見積書の値上げ・価格改定の書き方｜文例・注意点を解説 | 見積書メーカー",
  description: "見積書で価格を値上げ・改定する際の書き方を解説。取引先への伝え方、値上げ理由の記載方法、文例テンプレートまでフリーランス・個人事業主向けにわかりやすく説明します。",
  openGraph: {
    title: "見積書の値上げ・価格改定の書き方｜文例・注意点を解説",
    description: "見積書で価格を値上げ・改定する際の書き方を解説。取引先への伝え方、値上げ理由の記載方法、文例テンプレートまでフリーランス・個人事業主向けにわかりやすく説明します。",
    url: "https://mitsumori-maker.com/guide/price-increase",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
};

export default function PriceIncreasePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "見積書の値上げ・価格改定の書き方｜文例・注意点を解説",
    description:
      "見積書で価格を値上げ・改定する際の書き方を解説。取引先への伝え方、値上げ理由の記載方法、文例テンプレートまでフリーランス・個人事業主向けにわかりやすく説明します。",
    url: "https://mitsumori-maker.com/guide/price-increase",
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
        { "@type": "ListItem", position: 3, name: "見積書の値上げ・価格改定の書き方", item: "https://mitsumori-maker.com/guide/price-increase" },
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
              <li className="before:content-['/'] before:mx-2 text-gray-700">見積書の値上げ・価格改定</li>
            </ol>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の値上げ・価格改定の書き方｜文例・注意点を解説
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月10日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            物価上昇・原材料費の高騰・スキルアップなどを理由に、取引先への料金を値上げしなければならない場面はフリーランス・個人事業主にとって避けられません。しかし「どう伝えればいいのか」「見積書にどう書けばいいのか」と悩む方も多いでしょう。本記事では、見積書での値上げ・価格改定の書き方を、具体的な文例とともに解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            値上げを伝えるタイミングと準備
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            値上げを成功させるには、見積書を渡す前の段階での準備が重要です。突然見積書に新単価を記載して送るだけでは、取引先が驚いてしまい、関係悪化につながることがあります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            理想的な流れは以下の通りです。
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6 pl-2">
            <li>値上げの1〜2ヶ月前に口頭またはメールで事前予告する</li>
            <li>値上げの理由を明確に伝える（物価高騰・人件費増加・スキル向上など）</li>
            <li>値上げ後の単価を明記した新しい見積書を提出する</li>
            <li>取引先の承諾を得た上で契約・発注に進む</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-4">
            「値上げのお願い」メールや書面を先に送り、その後に見積書を提出する流れが最も丁寧です。新規案件や更新タイミングで自然に値上げを切り出せるよう、契約更新の時期に合わせて準備しておくとよいでしょう。
          </p>
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 mb-6">
            <p className="text-sm font-semibold text-yellow-800 mb-1">ポイント</p>
            <p className="text-sm text-yellow-800">
              長期取引先には特に丁寧な事前コミュニケーションが重要です。突然の値上げは信頼関係を損なう可能性があります。
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            見積書への値上げの書き方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            値上げを反映した見積書は、通常の見積書と同じ形式で問題ありません。ただし、以下の点を意識して記載するとトラブルを防げます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">新単価を明記する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の明細欄に新しい単価を明記します。旧単価との比較を記載する必要はありませんが、備考欄に「2026年4月より改定後単価を適用しております」と一言添えると、取引先が価格変更を認識しやすくなります。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">品目・摘要</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">単価</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">数量</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">Webコンテンツ制作（記事1本）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">15,000円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">5本</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">75,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">ディレクション費</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">20,000円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">1式</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">20,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            備考欄には「※2026年4月より単価改定済み。詳細は別途ご案内のとおりです。」のように記載します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">値上げ理由を備考欄に記載する方法</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の備考欄に値上げの背景を簡潔に記載することで、取引先への説明責任を果たすことができます。長々と書く必要はなく、1〜2文で要点を伝えるのが適切です。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">備考欄の記載例</p>
            <p className="mb-2">・「原材料費・光熱費の高騰に伴い、2026年4月より単価を改定いたしました。」</p>
            <p className="mb-2">・「物価上昇および人件費の増加を受け、料金を見直しております。ご理解のほどよろしくお願い申し上げます。」</p>
            <p>・「スキルアップおよびサービス品質向上のため、2026年4月より料金を改定いたしました。」</p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            値上げ通知メール・書面の文例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を送る前に、値上げを事前に知らせるメールや書面を準備しておきましょう。以下の文例を参考にしてください。
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
            <p className="font-semibold text-gray-900 mb-3 text-sm">【値上げ通知メールの文例】</p>
            <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
              <p>件名：料金改定のお知らせ（2026年4月〜）</p>
              <p>○○株式会社 △△様</p>
              <p>いつもお世話になっております。[氏名・屋号]です。</p>
              <p>
                昨今の物価上昇や原材料費の高騰を受け、誠に恐れながら、2026年4月1日受注分より
                料金を改定させていただくこととなりました。
              </p>
              <p>
                改定後の料金は添付の料金表をご参照ください。現行料金は2026年3月末受注分まで
                適用いたします。
              </p>
              <p>
                長期にわたりご愛顧いただいているにもかかわらず、このようなお願いをすることを
                深くお詫び申し上げます。引き続きご支援賜りますよう、何卒よろしくお願い申し上げます。
              </p>
              <p>[氏名・屋号・連絡先]</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            メールや書面で事前告知した後、新しい単価を反映した見積書を提出します。取引先から承諾の返信をもらうか、見積書に署名・捺印をもらうことで合意が成立します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            値上げ交渉でよくある疑問・Q&A
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-2">Q. 既存の継続案件でも値上げできますか？</p>
              <p className="text-gray-700 leading-relaxed">
                A. 契約更新のタイミングや、新しいフェーズに入る際に値上げを提案するのが自然です。契約期間中の一方的な値上げは契約違反になる場合もあるため、契約内容を確認した上で更新時に正式に提案しましょう。
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-2">Q. 値上げを断られた場合はどうすればよいですか？</p>
              <p className="text-gray-700 leading-relaxed">
                A. 値上げが難しい場合は、作業範囲の縮小・サービス内容の変更・段階的な値上げなどを提案することも一つの方法です。どうしても折り合いがつかない場合は、契約終了も選択肢として視野に入れましょう。無理な低価格での継続は長期的に持続できません。
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-2">Q. 値上げの幅はどのくらいが適切ですか？</p>
              <p className="text-gray-700 leading-relaxed">
                A. 業界や取引関係によって異なりますが、一般的には10〜30%程度が受け入れられやすいとされています。一度に大幅な値上げをするより、毎年少しずつ見直す方が取引先も受け入れやすい傾向があります。物価上昇率や自分の市場価値を参考に設定しましょう。
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-2">Q. 値上げした場合、消費税の計算は変わりますか？</p>
              <p className="text-gray-700 leading-relaxed">
                A. 消費税の計算方式は変わりません。新しい単価（税抜）に対して10%（軽減税率対象は8%）の消費税を加算するだけです。インボイス登録事業者の場合は、適格請求書の要件を満たした形式で見積書・請求書を発行してください。
              </p>
            </div>
          </div>

          <div className="mt-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-blue-800 mb-2">関連ガイド</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/guide/how-to-write" className="text-blue-600 hover:underline">
                  見積書の書き方・必要項目を徹底解説
                </Link>
              </li>
              <li>
                <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline">
                  見積書の消費税・インボイス対応ガイド
                </Link>
              </li>
              <li>
                <Link href="/guide/freelance" className="text-blue-600 hover:underline">
                  フリーランス・個人事業主のための見積書ガイド
                </Link>
              </li>
              <li>
                <Link href="/guide/valid-period" className="text-blue-600 hover:underline">
                  見積書の有効期限の設定方法
                </Link>
              </li>
              <li>
                <Link href="/guide/remarks" className="text-blue-600 hover:underline">
                  見積書の備考欄・特記事項の書き方
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
