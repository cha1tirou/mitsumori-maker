import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書ガイド一覧｜書き方・テンプレート・業種別まとめ | 見積書メーカー",
  description:
    "見積書の書き方・必須項目・消費税・有効期限・宛名・振込先など、実務ですぐ使えるガイド記事を69本掲載。フリーランス・個人事業主・業種別の記載例も網羅。",
  openGraph: {
    title: "見積書ガイド一覧｜書き方・テンプレート・業種別まとめ",
    description: "見積書の書き方・必須項目・消費税・有効期限・宛名・振込先など実務ですぐ使えるガイド記事を69本掲載。",
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
      {
        slug: "seal",
        title: "見積書の印鑑・社印・角印の押し方・位置ガイド",
        description: "見積書に印鑑は必要か？角印・代表印の使い分け、押す位置、電子印鑑の使い方まで解説。",
      },
      {
        slug: "format",
        title: "見積書のフォーマット・書式の選び方ガイド",
        description: "見積書のフォーマット・書式の選び方を解説。業種別フォーマットの違い、必須項目と任意項目、Excel・PDF・Webツールの比較など。",
      },
      {
        slug: "numbering",
        title: "見積書番号のつけ方・採番ルールを解説【業種別の例付き】",
        description: "見積書番号のつけ方・採番ルールを解説。業種別のナンバリング方法、管理のコツを紹介。",
      },
      {
        slug: "rejection",
        title: "見積書の断り方・お断りメールの例文テンプレート",
        description: "見積書を断る際のマナーとお断りメールの例文を状況別に紹介。",
      },
    ],
  },
  {
    category: "添付・送付",
    articles: [
      {
        slug: "cover-letter",
        title: "見積書の送付状の書き方・テンプレート【例文付き】",
        description: "見積書に添える送付状の書き方を例文テンプレート付きで解説。",
      },
      {
        slug: "envelope",
        title: "見積書の封筒の書き方・郵送マナー",
        description: "見積書を郵送する際の封筒の書き方・マナーを解説。封筒サイズの選び方、宛名の書き方、「見積書在中」の記載方法など。",
      },
      {
        slug: "email",
        title: "見積書のメール送付マナー・例文テンプレート",
        description: "見積書をメールで送る際の基本マナー・件名の書き方・送付メールの例文を紹介。",
      },
    ],
  },
  {
    category: "項目・条件別",
    articles: [
      {
        slug: "payment-terms",
        title: "見積書の支払い条件・支払期限の書き方【例文・テンプレ付き】",
        description: "月末締め翌月払い・前払い・分割払いなど支払い条件の書き方を例文付きで解説。備考欄のコピペ文例も。",
      },
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
      {
        slug: "revision",
        title: "見積書の修正・訂正・再提出の方法と書き直しルール",
        description: "見積書の修正・訂正方法を解説。金額変更・品名変更の書き方、再提出メール例文、修正版と旧版の管理方法まで網羅。",
      },
      {
        slug: "travel-expense",
        title: "見積書に交通費を書く方法｜記載例・計算方法を解説",
        description: "見積書に交通費を記載する方法を解説。実費精算・定額・距離計算の違い、消費税の扱い、記載例まで。",
      },
      {
        slug: "rounding",
        title: "見積書の端数処理の方法｜切り捨て・切り上げ・四捨五入のルール",
        description: "見積書の端数処理（切り捨て・切り上げ・四捨五入）の方法を解説。消費税計算時のルール、インボイス対応の端数処理まで。",
      },
      {
        slug: "prepayment",
        title: "見積書に前払い・着手金を記載する方法｜書き方と注意点",
        description: "見積書への前払い・着手金の書き方を解説。着手金・内金・手付金の違い、記載例文、トラブルを防ぐ注意点まで。",
      },
      {
        slug: "price-increase",
        title: "見積書の値上げ・価格改定の書き方｜文例・注意点を解説",
        description: "見積書で価格を値上げ・改定する際の書き方を解説。取引先への伝え方、値上げ理由の記載方法、文例テンプレートまで。",
      },
      {
        slug: "labor-cost",
        title: "見積書の人件費の書き方｜工数・単価の記載例",
        description: "見積書における人件費の書き方を解説。人日・人月の工数計算、単価の設定方法、IT業界・建設業での具体的な記載例を紹介。",
      },
      {
        slug: "misc-expenses",
        title: "見積書の諸経費の書き方・計上方法を解説",
        description: "見積書における諸経費の書き方・計上方法を解説。諸経費の相場（3〜10%）、内訳の書き方、建設業・IT業でよく使われる記載例。",
      },
      {
        slug: "breakdown",
        title: "見積書の内訳（明細）の書き方・記載例まとめ",
        description: "見積書の内訳・明細の書き方を記載例付きで解説。品名・数量・単価の書き方、内訳を詳しく書くメリット、一式との使い分け。",
      },
    ],
  },
  {
    category: "テンプレート・ツール別",
    articles: [
      {
        slug: "template-excel",
        title: "見積書テンプレート（Excel・PDF）の選び方と活用法",
        description: "見積書テンプレートの選び方をExcel・PDF・オンラインツール別に解説。業種や用途に合った選び方を紹介。",
      },
      {
        slug: "spreadsheet",
        title: "見積書のスプレッドシートテンプレート｜Googleスプレッドシートで無料作成",
        description: "見積書をGoogleスプレッドシートで作成する方法を解説。無料テンプレートの活用法、数式の設定、PDF出力まで。",
      },
      {
        slug: "word-template",
        title: "見積書のWordテンプレートの作り方・使い方｜無料で簡単作成",
        description: "見積書をWordで作成する方法を解説。Wordテンプレートの設定方法、表の使い方、PDF保存まで。",
      },
      {
        slug: "numbers-template",
        title: "見積書をNumbersで作る方法｜Mac・iPhoneで使えるテンプレート",
        description: "MacのNumbersで見積書を作る方法をテンプレート付きで解説。Apple標準の表計算ソフトで本格的な見積書を作成するコツを紹介。",
      },
    ],
  },
  {
    category: "電子化・PDF",
    articles: [
      {
        slug: "electronic",
        title: "見積書を電子化・PDF化するメリットと方法",
        description: "見積書の電子化・PDF化のメリットと方法を解説。電子帳簿保存法への対応、導入手順をまとめました。",
      },
      {
        slug: "pdf",
        title: "見積書PDFの作り方｜無料で作成・出力する3つの方法",
        description: "見積書をPDFで作る方法を3つ紹介。無料オンラインツールで即PDF出力、ExcelからPDF変換、WordからPDF保存。",
      },
    ],
  },
  {
    category: "関連書類",
    articles: [
      {
        slug: "difference",
        title: "見積書・請求書・納品書の違いをわかりやすく解説",
        description: "見積書・請求書・納品書の違いと役割を解説。発行タイミング、記載項目の違い、使い分け方をまとめました。",
      },
      {
        slug: "invoice-howto",
        title: "請求書の書き方ガイド・必要な記載項目を解説",
        description: "請求書の書き方を初心者向けに解説。必要な記載項目、インボイス制度対応のポイントをまとめました。",
      },
      {
        slug: "delivery-howto",
        title: "納品書の書き方ガイド・必要な記載項目を解説",
        description: "納品書の書き方を初心者向けに解説。必要な記載項目、発行タイミングをまとめました。",
      },
      {
        slug: "purchase-order-howto",
        title: "発注書の書き方ガイド・必要な記載項目を解説",
        description: "発注書の書き方を解説。記載項目、発行タイミング、見積書との違い、発注書がない場合のリスクまで網羅。",
      },
    ],
  },
  {
    category: "業種・用途別",
    articles: [
      {
        slug: "freelance",
        title: "フリーランス・個人事業主のための見積書ガイド",
        description: "フリーランス・個人事業主向けに見積書の作り方を解説。記載すべき項目、単価の決め方、インボイス対応まで。",
        badge: "人気",
      },
      {
        slug: "it-web",
        title: "IT・Web業界の見積書の書き方・テンプレートガイド",
        description: "IT・Web業界向けの見積書の書き方を解説。システム開発・Web制作に必要な項目、工数・単価の記載方法をまとめました。",
      },
      {
        slug: "design",
        title: "デザイン業の見積書の書き方ガイド",
        description: "デザイン業の見積書の書き方を解説。デザイン費の料金体系・相場、修正回数・著作権の扱い、トラブル防止策をまとめました。",
      },
      {
        slug: "video",
        title: "動画制作・映像制作の見積書の書き方ガイド",
        description: "動画制作・映像制作の見積書の書き方を解説。企画・撮影・編集の内訳と相場、修正回数・著作権の扱い、トラブル防止策。",
      },
      {
        slug: "beauty",
        title: "美容院・エステ・ネイルサロンの見積書の書き方ガイド",
        description: "美容院・エステ・ネイルサロン向けに見積書の書き方を解説。施術メニューの明細化やキャンセルポリシーの書き方まで。",
      },
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
      {
        slug: "event",
        title: "イベント・ウェディング業の見積書の書き方ガイド【記載例付き】",
        description: "イベント会社・ウェディングプランナー向けの見積書の書き方。会場費・装飾・ケータリング・キャンセルポリシーの記載例を解説。",
      },
      {
        slug: "architecture",
        title: "建築設計・設計事務所の見積書の書き方ガイド【記載例・テンプレ付き】",
        description: "建築士・設計事務所の見積書の書き方。設計料・監理料・確認申請費の算出方法と記載例、業態別テンプレートを解説。",
      },
      {
        slug: "painting",
        title: "塗装業・外壁塗装業者の見積書の書き方ガイド【記載例・テンプレ付き】",
        description: "塗装業・外壁塗装業者向けの見積書の書き方。足場費・塗料費・工賃など必須項目、塗料の種類と単価目安まで解説。",
      },
      {
        slug: "professional-service",
        title: "士業（税理士・社労士・行政書士）の見積書・報酬見積書の書き方ガイド",
        description: "税理士・社労士・行政書士の見積書（報酬見積書）の書き方。業種別の記載例・料金テーブル・インボイス対応まで解説。",
      },
      {
        slug: "writer",
        title: "ライター・コピーライターの見積書の書き方ガイド【記載例・料金相場付き】",
        description: "フリーランスライター・コピーライターの見積書の書き方。料金体系（文字単価・記事単価）・修正回数・著作権の記載方法を解説。",
      },
      {
        slug: "electrical",
        title: "電気工事業の見積書の書き方ガイド【記載例・テンプレ付き】",
        description: "電気工事業の見積書の書き方を記載例付きで解説。材工費・材料費・労務費・諸経費の記載方法、工種別の書き方も網羅。",
      },
      {
        slug: "auto-repair",
        title: "自動車整備・カーショップの見積書の書き方ガイド【記載例付き】",
        description: "自動車整備・修理業の見積書の書き方を解説。技術料・部品代・油脂類の内訳、車検・修理・保険修理の記載例も紹介。",
      },
      {
        slug: "plumbing",
        title: "水道工事・設備工事業の見積書の書き方ガイド【記載例・テンプレ付き】",
        description: "水道工事・給排水工事・空調設備業者向けの見積書の書き方。材料費・工賃・諸経費の記載例と、工事種別ごとのテンプレートを解説。",
      },
      {
        slug: "garden",
        title: "造園・外構工事業の見積書の書き方ガイド【記載例・テンプレ付き】",
        description: "造園業・外構工事・エクステリア業者向けの見積書の書き方。植栽・舗装・構造物工事の記載例と料金相場、工事後の保証の書き方を解説。",
      },
      {
        slug: "music",
        title: "音楽教室・演奏業の見積書の書き方ガイド【記載例・料金相場付き】",
        description: "音楽教室・楽器講師・フリーランスミュージシャンの見積書の書き方。レッスン料・出演料・音楽制作費の記載例と料金相場を解説。",
      },
    ],
  },
  {
    category: "見積もり実務",
    articles: [
      {
        slug: "competitive-quote",
        title: "相見積もり（複数見積もり）の取り方・頼み方と断り方マナー",
        description: "相見積もりの取り方・頼み方を解説。何社に依頼すべきか、比較ポイント、断り方の例文まで発注者・受注者それぞれの視点でまとめました。",
      },
      {
        slug: "printing",
        title: "見積書の印刷方法・印刷設定ガイド【PDF・Excel・Wordごとに解説】",
        description: "見積書の印刷方法を解説。PDF・Excel・Word別の印刷設定、A4用紙への収め方、カラーか白黒か、コンビニ印刷の方法まで。",
      },
      {
        slug: "quote-management",
        title: "見積書の管理方法・保存方法ガイド【フリーランス・中小企業向け】",
        description: "見積書の管理方法を解説。ファイル命名規則・フォルダ整理・電子保存・法令上の保存期間まで、フリーランス・中小企業向けにわかりやすくまとめました。",
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
          見積書の書き方・必須項目・消費税・有効期限・宛名など、実務で即使えるガイドを69本掲載しています。
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
