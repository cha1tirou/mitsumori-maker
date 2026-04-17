import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書ガイド一覧｜書き方・テンプレート・業種別まとめ | 見積書メーカー",
  description:
    "見積書の書き方・必須項目・消費税・有効期限・宛名・振込先など、実務ですぐ使えるガイド記事を25本掲載。フリーランス・個人事業主・業種別の記載例も網羅。",
  openGraph: {
    title: "見積書ガイド一覧｜書き方・テンプレート・業種別まとめ",
    description: "見積書の書き方・必須項目・消費税・有効期限・宛名・振込先など実務ですぐ使えるガイド記事を25本掲載。",
    url: "https://mitsumori-maker.com/guide",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide",
  },
};

const guides = [
  {
    category: "基礎・書き方",
    articles: [
      {
        slug: "how-to-write",
        title: "見積書の書き方【完全ガイド】必須項目・記載例・テンプレ付き",
        description: "見積書に必要な全項目を基礎から解説。品名・数量・単価・消費税の書き方から、よくある失敗例まで網羅。",
        badge: "人気",
      },
      {
        slug: "consumption-tax",
        title: "見積書の消費税の書き方【税込・税抜・別途表記】記載例付き",
        description: "税込・税抜・消費税別途の記載例をわかりやすく解説。インボイス対応の端数処理・軽減税率の書き方も。",
      },
      {
        slug: "valid-period",
        title: "見積書の有効期限の設定方法と適切な期間の決め方",
        description: "有効期限の記載方法・業種別の目安期間・期限切れ時の対応方法まで。30日が目安の理由も解説。",
      },
      {
        slug: "addressing",
        title: "見積書の宛名の書き方・「御中」「様」の使い分け",
        description: "会社名は御中・個人名は様など、敬称の使い分けを記載例付きで解説。よくある間違いも紹介。",
      },
      {
        slug: "remarks",
        title: "見積書の備考欄の書き方・例文集【コピペOK】業種別テンプレ付き",
        description: "送料・納期・支払条件・修正回数などの備考欄の書き方をコピペできる例文付きで解説。",
      },
      {
        slug: "lump-sum",
        title: "見積書・請求書の「一式」の書き方・使い方ガイド",
        description: "「一式」の意味・使っていい場面・使ってはいけない場面を解説。内訳明細の書き方も紹介。",
      },
      {
        slug: "discount",
        title: "見積書の値引き・割引の書き方【記載例付き】調整値引きも解説",
        description: "値引き額・割引率の記載方法、調整値引きの使い方、消費税との関係をわかりやすく解説。",
      },
    ],
  },
  {
    category: "項目・条件別",
    articles: [
      {
        slug: "bank-info",
        title: "見積書の振込先・口座情報の正しい書き方【記載例・テンプレ付き】",
        description: "銀行名・支店名・口座種別・口座名義の書き方と、振込手数料の扱いについて解説。",
      },
      {
        slug: "prerequisites",
        title: "見積書の前提条件の書き方【記載例・テンプレ付き】",
        description: "「前提条件」「適用外」「別途費用」などの記載方法を業種別の例付きで解説。",
      },
      {
        slug: "reissue",
        title: "見積書の再発行の方法・依頼メール例文付き",
        description: "見積書の再発行が必要なケースと手順、再発行を依頼するメール・返信メールの例文を紹介。",
      },
      {
        slug: "invoice-bank-info",
        title: "請求書の振込先・口座情報の書き方",
        description: "請求書への口座情報の記載方法。インボイス制度下での注意点と、振込手数料の扱いも解説。",
      },
    ],
  },
  {
    category: "業種・用途別",
    articles: [
      {
        slug: "restaurant",
        title: "飲食店・レストランの見積書の書き方ガイド",
        description: "仕出し・ケータリング・宴会など飲食業特有の見積書の書き方を記載例付きで解説。",
      },
      {
        slug: "consulting",
        title: "コンサルタント見積書の書き方ガイド【料金相場・記載例付き】",
        description: "コンサルティング業の人日・成果物・月額顧問料など、業態別の見積書記載例を紹介。",
      },
      {
        slug: "english",
        title: "見積書を英語で作成｜英語テンプレート・Quotationの書き方",
        description: "英語の見積書（Quotation）の書き方・必須英語表現・日英対照テンプレートを紹介。",
        badge: "英語対応",
      },
      {
        slug: "transportation",
        title: "運送業・物流業の見積書の書き方ガイド【記載例・テンプレ付き】",
        description: "運送業・物流業特有の見積書の書き方を記載例付きで解説。距離・重量・高速代・積替料の記載方法も。",
      },
      {
        slug: "welfare",
        title: "介護・福祉サービスの見積書の書き方ガイド【記載例付き】",
        description: "介護・福祉事業者向けの見積書の書き方。サービス内容・単位数・自己負担額の記載方法を解説。",
      },
      {
        slug: "education",
        title: "塾・教育サービスの見積書の書き方ガイド【記載例付き】",
        description: "学習塾・家庭教師・オンライン教育の見積書の書き方。月謝・教材費・体験授業の記載例も紹介。",
      },
      {
        slug: "medical",
        title: "医療・クリニックの見積書の書き方ガイド【記載例付き】",
        description: "クリニック・医療機関が作成する見積書の書き方。自由診療・医療機器・設備工事の記載例を解説。",
      },
      {
        slug: "manufacturing",
        title: "製造業の見積書の書き方ガイド【記載例・テンプレ付き】",
        description: "製造業特有の見積書の書き方。材料費・加工費・管理費・外注費の記載例と単価計算方法を解説。",
      },
      {
        slug: "real-estate",
        title: "不動産業の見積書の書き方ガイド【記載例付き】",
        description: "不動産売買・賃貸・管理・仲介の見積書の書き方。仲介手数料・管理費・修繕費の記載例を解説。",
      },
      {
        slug: "cleaning",
        title: "清掃業・ハウスクリーニングの見積書の書き方ガイド【記載例付き】",
        description: "清掃業・ハウスクリーニング特有の見積書の書き方。作業内容・清掃箇所・料金体系の記載例を解説。",
      },
      {
        slug: "photographer",
        title: "カメラマン・写真業の見積書の書き方ガイド【記載例・料金相場付き】",
        description: "カメラマン・写真業の見積書の書き方。撮影種別・カット数・使用権・料金相場を記載例付きで解説。",
      },
    ],
  },
  {
    category: "建設業・法令対応",
    articles: [
      {
        slug: "kaisei-kensetsu-2025",
        title: "改正建設業法2025【完全ガイド】見積書の書き方・対応事項・罰則",
        description:
          "2025年12月施行の改正建設業法への実務対応。労務費内訳・「一式」表記・見積条件書・罰則まで。",
        badge: "法令",
      },
      {
        slug: "legal-welfare",
        title: "法定福利費の計算方法と業界標準料率【建設業向け】",
        description:
          "建設業の法定福利費の計算方法と業界標準20%の内訳。見積書への明示方法、一人親方の対応まで。",
      },
      {
        slug: "freelance-law-construction",
        title: "フリーランス新法と建設業一人親方への影響【2026年版】",
        description:
          "フリーランス新法が建設業一人親方に与える影響。発注者の義務・書面交付・60日支払い・7つの禁止行為。",
        badge: "新法",
      },
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "見積書メーカー",
                item: "https://mitsumori-maker.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "見積書ガイド",
                item: "https://mitsumori-maker.com/guide",
              },
            ],
          }),
        }}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書ガイド</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          見積書ガイド一覧
        </h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          見積書の書き方・必須項目・消費税・有効期限・宛名など、実務で即使えるガイドを25本掲載しています。
          フリーランス・個人事業主から法人担当者まで、すべて無料でご覧いただけます。
        </p>

        <div className="space-y-10">
          {guides.map((group) => (
            <section key={group.category}>
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {group.category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/guide/${article.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 leading-snug flex-1">
                        {article.title}
                      </h3>
                      {article.badge && (
                        <span className="shrink-0 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {article.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 bg-gray-900 rounded-xl p-8 text-center text-white">
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
