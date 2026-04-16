import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Scale,
  HardHat,
  Calculator,
  Smartphone,
  Zap,
  CloudUpload,
  FileSpreadsheet,
  Search,
  Wrench,
  Clock,
  FolderSearch,
  Check,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import TrackPageView from "@/components/construction/TrackPageView";
import PlanCheckoutButton from "@/components/construction/PlanCheckoutButton";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUserProfile } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

// 改正建設業法2025年12月1日 全面施行からの経過日数
function daysSinceLawEnforcement(): number {
  const target = new Date("2025-12-01T00:00:00+09:00").getTime();
  const now = Date.now();
  const diff = Math.floor((now - target) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export const metadata: Metadata = {
  title: "建設業の見積書作成｜改正建設業法2025対応・月980円｜ケンミツ",
  description:
    "一人親方・小規模建設業向けの見積書作成ツール。改正建設業法2025に対応した労務費内訳・一式チェッカー・工種別テンプレを搭載。登録不要で今すぐ試せる。月980円から。",
  keywords: "建設業 見積書, 一人親方 見積書, 建設業法 2025, 工事見積書 アプリ, 労務費 内訳, 見積書 ソフト 建設",
  openGraph: {
    title: "建設業の見積書作成｜改正建設業法2025対応・月980円",
    description: "一人親方向け・登録不要で試せる建設業専用の見積書作成ツール。労務費内訳・一式チェッカー・工種テンプレ搭載。",
    url: "https://mitsumori-maker.com/construction",
    siteName: "ケンミツ",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction",
  },
};

const features = [
  {
    Icon: Scale,
    title: "改正建設業法2025に完全対応",
    body: "2025年12月施行の改正建設業法が求める労務費の内訳明示・「一式」表記の注意喚起・見積条件書の必須記載項目を自動チェック。法令遵守のための判断をツールが支援します。",
  },
  {
    Icon: HardHat,
    title: "8工種の見積プリセット",
    body: "電気・水道設備・内装・土木・外構・大工・左官・鳶足場の8工種それぞれに代表的な明細項目・単価レンジ・単位をあらかじめ用意。1クリックで見積の骨格が完成します。",
  },
  {
    Icon: Calculator,
    title: "諸経費の自動計算",
    body: "直接工事費から現場管理費（デフォ6%）・一般管理費（デフォ10%）を自動計算。業界標準の数値をスタート地点としつつ、案件ごとに柔軟に調整可能。",
  },
  {
    Icon: Smartphone,
    title: "スマホで完結する軽量UI",
    body: "現場から見積書を作成→PDF出力→即メール送信まで完結。PC専用の重いソフトとは違い、片手のスマホ操作で見積業務が終わります。",
  },
  {
    Icon: Zap,
    title: "登録不要で今すぐ試せる",
    body: "他社ツールのように「お問い合わせ→デモ」の重い入口はありません。このページの下から即座にツールを触って、自分の業務に合うか確認できます。",
  },
  {
    Icon: CloudUpload,
    title: "見積履歴を自動保存",
    body: "有料プランなら作成した見積書をすべてクラウドに保存。再編集・コピー・過去案件からの複製で、2通目以降の作成時間を大幅短縮できます。",
  },
];

const problems = [
  {
    Icon: Scale,
    title: "「一式」で差し戻された",
    body: "改正建設業法で内訳明示が努力義務化。元請の検収部門から「一式では通らない」と戻されることが増えた。",
  },
  {
    Icon: Search,
    title: "法改正で何が変わったのか、わからない",
    body: "労務費の内訳明示？見積条件書？瑕疵担保？——何をどう書き直せばいいのか、実務レベルで教えてくれる人がいない。",
  },
  {
    Icon: FileSpreadsheet,
    title: "Excelテンプレを毎回コピーして手入力",
    body: "前回のファイルを開いて日付と金額を書き換えて……1件30分。月10件作ると月5時間が消える。",
  },
  {
    Icon: Smartphone,
    title: "現場で出せず、事務所に戻らないと作れない",
    body: "発注者に「すぐ出して」と言われても、その場で対応できない。電話受けてから見積提出まで半日かかる。",
  },
  {
    Icon: Clock,
    title: "諸経費・法定福利費の計算が面倒",
    body: "直接工事費から現場管理費6%、一般管理費10%を電卓で叩く。労務費に対する社会保険料も毎回計算。",
  },
  {
    Icon: FolderSearch,
    title: "大手ソフトは月9,800円〜で重すぎる",
    body: "大手の建設業向けソフトは機能が多くて高額。一人親方や数名の工務店に、そこまでのスペックは要らない。",
  },
];

const comparisons = [
  {
    label: "対応する建設業法の改正",
    ours: "2025年12月施行の改正版に対応",
    others: "未対応・対応時期不明のツール多数",
  },
  {
    label: "料金（一人親方向け）",
    ours: "月980円（Solo）",
    others: "月9,800〜数万円（大手ソフト）",
  },
  {
    label: "導入の手続き",
    ours: "登録不要で即試せる→気に入ったら課金",
    others: "お問い合わせ→営業→デモ→契約",
  },
  {
    label: "デバイス",
    ours: "スマホで完結",
    others: "PC前提が多い",
  },
  {
    label: "機能の範囲",
    ours: "見積書作成に特化（軽い）",
    others: "工程・顧客・写真・勤怠まで全部入り（重い）",
  },
];

const faqs = [
  {
    q: "本当に無料で試せますか？",
    a: "はい。登録もクレジットカード登録も不要で、見積書の作成・PDF出力まで無料で試せます。ただし無料版のPDFには「無料版 SAMPLE」の透かしが入ります。透かしなしの正式版が必要な場合は Solo プラン（月¥980）からご利用ください。",
  },
  {
    q: "なぜ無料版PDFには透かしが入るのですか？",
    a: "当サービスは広告収入に依存せず、皆様のサブスクリプション収入で運営しています。Freeプランは「試用目的」と位置付け、実際の取引先に提出する際は透かしなしの Solo プランをお選びいただく設計にしています。透かしの有無以外に機能制限はありません（保存機能は登録必須）。",
  },
  {
    q: "建設業法2025対応とは具体的に何ですか？",
    a: "2025年12月に全面施行される改正建設業法では、労務費（人件費）の内訳明示、「一式」記載の適正化、見積条件書の記載事項の明確化などが努力義務となります。本ツールはこれらをフォーム入力時にリアルタイムでチェックし、漏れを警告する機能を搭載しています。",
  },
  {
    q: "既存の会計ソフト（弥生・freee等）との連携はできますか？",
    a: "現時点では連携機能は提供していません。見積書はPDFで出力してメール添付・印刷・保存できます。将来的にCSV出力や会計ソフト連携を検討しています。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "マイページからワンクリックで即時解約できます。「電話しないと解約できない」「メールでのお問い合わせのみ」のような摩擦はありません。",
  },
  {
    q: "一人親方ではなく、5〜10人規模の工務店でも使えますか？",
    a: "もちろん使えます。アカウント複数名プラン（Team ¥2,980/月）を準備しています。顧客管理・見積履歴の共有などが可能になります。",
  },
];

const planFeatures = {
  free: [
    "登録不要で即利用",
    "見積書作成・PDF出力（無制限）",
    "建設業法チェッカー",
    "工種プリセット・諸経費自動計算",
    "AI積算 月1回お試し",
    "※ PDFに「無料版」透かしが入ります",
    "※ 見積履歴の保存は月3通まで（要登録）",
  ],
  solo: [
    "🎯 PDF透かしなし（正式版）",
    "🤖 AI積算（図面/PDF→明細自動抽出）月10回",
    "見積書の無制限保存・再編集・複製",
    "発注者へメール直接送信",
    "会計ソフトCSV連携（freee/MF/弥生）",
    "顧客・単価マスタ・原価粗利分析・工事写真",
  ],
  team: [
    "Solo全機能",
    "5アカウントまで（開発中）",
    "顧客管理・案件紐付（開発中）",
    "請求書との連動（開発中）",
    "電子サイン（開発中）",
    "電子帳簿保存法対応（開発中）",
  ],
};

export default async function ConstructionLandingPage() {
  let userEmail: string | null = null;
  let plan: "free" | "solo" | "team" = "free";

  if (isSupabaseConfigured()) {
    const { user, profile } = await getCurrentUserProfile();
    if (user) {
      userEmail = user.email ?? null;
      plan = (profile?.plan ?? "free") as "free" | "solo" | "team";
    }
  }

  const isLoggedIn = Boolean(userEmail);
  const isPaid = plan === "solo" || plan === "team";
  const planLabel = plan === "solo" ? "Solo" : plan === "team" ? "Team" : "Free";
  const lawDays = daysSinceLawEnforcement();

  // 構造化データ：SoftwareApplication + FAQPage
  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ケンミツ",
    url: "https://mitsumori-maker.com/construction",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "一人親方・小規模工務店向けの建設業特化・見積書作成クラウドツール。改正建設業法2025対応、月¥980、登録不要で試せる。",
    offers: [
      {
        "@type": "Offer",
        name: "Free プラン",
        price: "0",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "Solo プラン",
        price: "980",
        priceCurrency: "JPY",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "980",
          priceCurrency: "JPY",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: "1",
            unitCode: "MON",
          },
        },
      },
    ],
    inLanguage: "ja",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <TrackPageView name="construction_lp_view" />
      {/* ヘッダー */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={isLoggedIn ? "/construction/mypage" : "/construction"} className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <HardHat className="w-5 h-5 text-green-700" strokeWidth={2.25} />
            <span>
              ケンミツ <span className="text-green-700">| 建設業の見積書</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <Link
                href="/construction/mypage"
                className="text-xs font-bold text-gray-700 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                {planLabel}プラン・マイページ
              </Link>
            )}
            <Link
              href="/construction/new"
              className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              {isLoggedIn ? "見積書を作成" : "無料で試す →"}
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-red-200">
            <AlertTriangle className="w-4 h-4" strokeWidth={2.5} />
            <span>改正建設業法 施行から {lawDays} 日経過 — 未対応の見積書は法令リスク</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            「一式」書いたら
            <br className="md:hidden" />
            発注元から差し戻された。
            <br />
            <span className="text-green-700">
              もう、そんな手戻りは不要です。
            </span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
            改正建設業法に準拠した工事見積書を、
            <br className="hidden md:block" />
            <strong className="text-gray-900">片手のスマホ</strong>で、
            <strong className="text-gray-900">月980円</strong>で、
            <strong className="text-gray-900">登録不要</strong>で作れます。
          </p>
          <p className="text-xs md:text-sm text-gray-500 mb-8">
            一人親方・小規模工務店のための、建設業特化・業界最安値帯の見積書ツール
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/construction/new"
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-green-700/20"
            >
              登録不要で今すぐ試す →
            </Link>
            <a
              href="#pricing"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              料金プランを見る
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-6">
            無料版は「SAMPLE」透かし付き / クレジットカード登録不要
          </p>
        </div>
      </section>

      {/* 数字セクション（社会的証明の代替：機能数値） */}
      <section className="bg-gray-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat
            label="改正建設業法"
            value="2025/12"
            sub="施行済・対応済"
          />
          <Stat
            label="工種プリセット"
            value="8工種"
            sub="電気・水道・内装・土木ほか"
          />
          <Stat
            label="建設業法チェック"
            value="7項目"
            sub="自動警告"
          />
          <Stat
            label="月額"
            value="¥980〜"
            sub="業界最安値帯"
          />
        </div>
      </section>

      {/* β募集 & チェックリストDL */}
      <section className="bg-amber-50 border-y border-amber-200 py-5">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500 text-white">
              <Zap className="w-6 h-6" strokeWidth={2.25} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900">
                β先行ユーザー募集中 — 先着20名は初月無料
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                FBに応じて機能追加を優先対応。登録不要で触れます。
              </p>
            </div>
            <Link
              href="/construction/new"
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-lg whitespace-nowrap shrink-0"
            >
              試す →
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-700 text-white">
              <CheckCircle2 className="w-6 h-6" strokeWidth={2.25} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-green-900">
                改正建設業法2025 対応チェックリスト（無料）
              </p>
              <p className="text-xs text-green-800 mt-0.5">
                30項目を8セクションで自己診断。PDF版もメール配布。
              </p>
            </div>
            <Link
              href="/construction/checklist"
              className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-lg whitespace-nowrap shrink-0"
            >
              見る →
            </Link>
          </div>
        </div>
      </section>

      {/* 課題提起 */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-green-700 tracking-widest mb-3">
            YOUR PROBLEMS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            こんな経験、ありませんか？
          </h2>
          <p className="text-center text-sm text-gray-500 mb-10">
            建設業の一人親方・小規模工務店 100名へのヒアリングで上位に挙がった悩みです
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {problems.map(({ Icon, title, body }, i) => (
              <div
                key={i}
                className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-green-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-700" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/construction/new"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              ↑ 全部解決するツールを試す（登録不要）
            </Link>
          </div>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            6つの専用機能で、見積業務を最短化
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            汎用ツールにはない、建設業専用の機能を搭載
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map(({ Icon, title, body }, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-700" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 改正建設業法：何が変わったのか */}
      <section className="bg-gradient-to-br from-amber-50 to-white py-16 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-amber-700 tracking-widest mb-3">
            LAW COMPLIANCE
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            改正建設業法で、見積書の何が変わったか
          </h2>
          <p className="text-center text-sm text-gray-500 mb-10">
            2025年12月全面施行。{lawDays}日が経過した今、すべての建設業者に対応義務があります。
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border-2 border-amber-200 rounded-xl p-5">
              <div className="text-[10px] font-bold text-red-700 bg-red-50 inline-block px-2 py-0.5 rounded mb-2">
                努力義務化
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                労務費の内訳明示
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                従来「一式」でまとめていた見積を、労務費・材料費・外注費などに分けて明示することが求められます。賃金水準の確保と適正価格交渉が目的。
              </p>
            </div>
            <div className="bg-white border-2 border-amber-200 rounded-xl p-5">
              <div className="text-[10px] font-bold text-red-700 bg-red-50 inline-block px-2 py-0.5 rounded mb-2">
                記載義務拡大
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                見積条件書の記載事項
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                工事場所・工事期間・設計図書・支払条件に加え、施工条件・費用負担区分・見積期間などの明示が必要に。
              </p>
            </div>
            <div className="bg-white border-2 border-amber-200 rounded-xl p-5">
              <div className="text-[10px] font-bold text-red-700 bg-red-50 inline-block px-2 py-0.5 rounded mb-2">
                明文化
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                「一式」表記の適正化
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                工事内容が明確でない「一式」表記は避け、可能な限り内訳を展開することが推奨。元請から差し戻されるリスクが上昇。
              </p>
            </div>
            <div className="bg-white border-2 border-amber-200 rounded-xl p-5">
              <div className="text-[10px] font-bold text-red-700 bg-red-50 inline-block px-2 py-0.5 rounded mb-2">
                違反時
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                指示処分・営業停止のリスク
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                正当な理由なく見積書の交付を怠ったり、内訳を明示しなかった場合、国交相または都道府県知事から行政処分を受ける可能性があります。
              </p>
            </div>
          </div>

          <div className="mt-10 bg-white border border-green-200 rounded-xl p-5 flex items-start gap-3">
            <CheckCircle2
              className="w-6 h-6 text-green-700 shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                本ツールは上記すべてに対応しています
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                フォーム入力時に自動で法令準拠をチェック。労務費・法定福利費・諸経費の段階計算、瑕疵担保条項のデフォルトテンプレ、「一式」検知警告、見積条件書フォーマットを搭載。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 比較表 */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            大手ソフトとの違い
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="py-3 px-4 text-left font-bold">比較項目</th>
                  <th className="py-3 px-4 text-left font-bold bg-green-700">ケンミツ</th>
                  <th className="py-3 px-4 text-left font-bold">大手ソフト</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 font-medium text-gray-700 border-t border-gray-100">{row.label}</td>
                    <td className="py-3 px-4 text-green-800 font-medium border-t border-gray-100">{row.ours}</td>
                    <td className="py-3 px-4 text-gray-500 border-t border-gray-100">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 開発の想い */}
      <section className="bg-green-50 py-16 border-y border-green-100">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-green-700 tracking-widest mb-3">
            OUR STORY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            なぜ、このツールを作ったのか
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              改正建設業法が2025年12月に全面施行され、一人親方・小規模工務店の現場では見積書の書き方を見直す必要が出ました。
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              しかし既存のソフトウェアは大きく2択しかない状態でした。
            </p>
            <ul className="text-sm text-gray-700 leading-relaxed mb-4 list-disc pl-5 space-y-1">
              <li>
                <strong>大手SaaS（月9,800円〜）</strong>：機能過多で、工程管理や勤怠管理までついてきて一人親方には重すぎる
              </li>
              <li>
                <strong>無料のExcelテンプレート</strong>：法改正に未対応。法定福利費・階層見積・瑕疵担保など専門項目が抜けている
              </li>
            </ul>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              <strong className="text-green-800">「見積書作成」だけに特化して、月¥980で、改正建設業法に完全準拠した、登録不要で試せるツール</strong>
              ——この穴を埋めるために開発しました。
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              広告収入にも頼らず、全ユーザーのサブスク収入だけで運営。機能追加は全員のフィードバックで優先順位を決めます。建設業界全体の適法化の一助となれば、という想いで作っています。
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <HardHat className="w-5 h-5 text-gray-600" strokeWidth={2} />
              </div>
              <div className="text-xs text-gray-600">
                <strong className="text-gray-900">ケンミツ 開発チーム</strong>
                <br />
                ご質問・ご要望は <Link href="/contact" className="text-green-700 hover:underline">お問い合わせフォーム</Link> よりお気軽に。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section id="pricing" className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            いつでも解約できます。自動更新停止もワンクリック。
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Free */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-xs font-bold text-gray-500 mb-2">FREE</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">¥0</div>
              <div className="text-xs text-gray-500 mb-5">ずっと無料</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {planFeatures.free.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/construction/new"
                className="block text-center border border-gray-300 hover:border-gray-400 text-gray-800 text-sm font-bold py-3 rounded-lg transition-colors"
              >
                無料で試す
              </Link>
            </div>

            {/* Solo - 推奨 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-green-700 relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                一人親方に人気
              </div>
              <div className="text-xs font-bold text-green-700 mb-2">SOLO</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ¥980<span className="text-sm font-normal text-gray-500">/月</span>
              </div>
              <div className="text-xs text-gray-500 mb-5">年払い ¥9,800（2ヶ月分お得）</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {planFeatures.solo.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {plan === "solo" ? (
                <Link
                  href="/construction/mypage"
                  className="block text-center bg-gray-100 text-gray-700 text-sm font-bold py-3 rounded-lg"
                >
                  契約中・マイページへ →
                </Link>
              ) : (
                <PlanCheckoutButton
                  plan="solo"
                  billing="monthly"
                  label={isPaid ? "Soloプランに変更" : "Soloで始める"}
                  variant="primary"
                />
              )}
            </div>

            {/* Team */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 relative opacity-80">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-300">
                準備中
              </div>
              <div className="text-xs font-bold text-gray-500 mb-2">TEAM</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ¥2,980<span className="text-sm font-normal text-gray-500">/月</span>
              </div>
              <div className="text-xs text-gray-500 mb-5">小規模工務店向け（〜5名）</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {planFeatures.team.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled
                className="w-full block text-center bg-gray-100 text-gray-500 text-sm font-bold py-3 rounded-lg cursor-not-allowed"
                title="Team プランは開発中です。リリースまでお待ちください。"
              >
                リリース予定 — Solo をご利用ください
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            よくある質問
          </h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-gray-900 flex items-center justify-between list-none">
                  <span>Q. {item.q}</span>
                  <ChevronDown
                    className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0"
                    strokeWidth={2.5}
                  />
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100">
                  <p className="mt-3">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 mb-5">
            <Wrench className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-100 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-red-400/30">
            <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.5} />
            改正建設業法 施行から {lawDays} 日経過
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
            まだ「一式」で出してる見積書、
            <br />
            今日から法令準拠に切り替えませんか？
          </h2>
          <p className="text-green-100 text-sm mb-8 leading-relaxed">
            登録・カード登録は不要、今すぐ触れます。
            <br />
            気に入ったら月980円。嫌ならそのまま使わないだけ。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/construction/new"
              className="inline-block bg-white hover:bg-gray-100 text-green-800 font-bold px-10 py-4 rounded-xl transition-colors shadow-xl"
            >
              建設業向け見積書を作成する →
            </Link>
            <a
              href="#pricing"
              className="inline-block border-2 border-white/30 hover:bg-white/10 text-white font-bold px-10 py-4 rounded-xl transition-colors"
            >
              料金プランを見る
            </a>
          </div>
          <div className="mt-10 text-xs text-green-200 flex flex-wrap gap-x-4 gap-y-2 justify-center">
            <Link href="/construction/how-to" className="hover:underline">
              使い方
            </Link>
            <Link href="/construction/faq" className="hover:underline">
              FAQ
            </Link>
            <Link href="/construction/checklist" className="hover:underline">
              チェックリスト
            </Link>
            <Link href="/construction/terms" className="hover:underline">
              利用規約
            </Link>
            <Link href="/construction/privacy" className="hover:underline">
              プライバシー
            </Link>
            <Link href="/construction/tokushoho" className="hover:underline">
              特商法表記
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-green-300 tracking-widest mb-1">
        {label}
      </p>
      <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">{value}</p>
      <p className="text-[10px] text-gray-400 leading-tight">{sub}</p>
    </div>
  );
}
