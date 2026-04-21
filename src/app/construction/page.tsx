import type { Metadata } from "next";
import TrackPageView from "@/components/construction/TrackPageView";
import LpHeader from "@/components/construction/lp/LpHeader";
import Hero from "@/components/construction/lp/Hero";
import StatsBar from "@/components/construction/lp/StatsBar";
import LeadMagnets from "@/components/construction/lp/LeadMagnets";
import Problems from "@/components/construction/lp/Problems";
import Features from "@/components/construction/lp/Features";
import LawCompliance from "@/components/construction/lp/LawCompliance";
import Comparison from "@/components/construction/lp/Comparison";
import OurStory from "@/components/construction/lp/OurStory";
import Pricing from "@/components/construction/lp/Pricing";
import Faq from "@/components/construction/lp/Faq";
import FinalCta from "@/components/construction/lp/FinalCta";
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
  keywords:
    "建設業 見積書, 一人親方 見積書, 建設業法 2025, 工事見積書 アプリ, 労務費 内訳, 見積書 ソフト 建設",
  openGraph: {
    title: "建設業の見積書作成｜改正建設業法2025対応・月980円",
    description:
      "一人親方向け・登録不要で試せる建設業専用の見積書作成ツール。労務費内訳・一式チェッカー・工種テンプレ搭載。",
    url: "https://mitsumori-maker.com/construction",
    siteName: "ケンミツ",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://mitsumori-maker.com/construction/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ケンミツ — 建設業の見積書を月980円で、スマホで、3分で。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "建設業の見積書作成｜改正建設業法2025対応・月980円｜ケンミツ",
    description:
      "一人親方向け・登録不要で試せる建設業専用の見積書作成ツール。",
    images: ["https://mitsumori-maker.com/construction/opengraph-image"],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction",
  },
};

const faqsForLd = [
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
    q: "解約はいつでもできますか？",
    a: "マイページからワンクリックで即時解約できます。「電話しないと解約できない」「メールでのお問い合わせのみ」のような摩擦はありません。",
  },
  {
    q: "一人親方ではなく、5〜10人規模の工務店でも使えますか？",
    a: "もちろん使えます。アカウント複数名プラン（Team ¥2,980/月）を準備しています。顧客管理・見積履歴の共有などが可能になります。",
  },
];

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
    mainEntity: faqsForLd.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white font-sans text-kenmitsu-ink antialiased [font-feature-settings:'palt']">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <TrackPageView name="construction_lp_view" />

      <LpHeader isLoggedIn={isLoggedIn} planLabel={planLabel} />
      <Hero lawDays={lawDays} />
      <StatsBar />
      <LeadMagnets />
      <Problems />
      <Features />
      <LawCompliance lawDays={lawDays} />
      <Comparison />
      <OurStory />
      <Pricing currentPlan={plan} isPaid={isPaid} />
      <Faq />
      <FinalCta lawDays={lawDays} />
    </div>
  );
}
