import type { Metadata } from "next";
import TrackPageView from "@/components/construction/TrackPageView";
import LpHeader from "@/components/construction/lp/LpHeader";
import Hero from "@/components/construction/lp/Hero";
import LawObligations from "@/components/construction/lp/LawObligations";
import LawRisks from "@/components/construction/lp/LawRisks";
import KenmitsuFeatures from "@/components/construction/lp/KenmitsuFeatures";
import PriceComparison from "@/components/construction/lp/PriceComparison";
import SoloUpgrade from "@/components/construction/lp/SoloUpgrade";
import Faq from "@/components/construction/lp/Faq";
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
  title: "建設業の見積書作成｜改正建設業法2025対応・月1,980円｜ケンミツ",
  description:
    "中小建設業者向けの見積書作成ツール。改正建設業法のルールに沿った見積書を月¥1,980 で作成できるサービスはケンミツだけ。無料登録で見積書は何枚でも作成・PDF ダウンロード可。",
  keywords:
    "建設業 見積書, 改正建設業法 2025, 建設業法 改正, 工事見積書 アプリ, 労務費 内訳, 見積書 ソフト 建設, 中小建設業者",
  openGraph: {
    title: "建設業の見積書作成｜改正建設業法2025対応・月1,980円",
    description:
      "改正建設業法 2025 対応の見積書を月¥1,980 で出せるサービスはケンミツだけ。無料登録で何枚でも作成・PDF 可。",
    url: "https://mitsumori-maker.com/construction",
    siteName: "ケンミツ",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://mitsumori-maker.com/construction/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ケンミツ — 改正建設業法2025対応・月¥1,980 から。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "建設業の見積書作成｜改正建設業法2025対応・月1,980円｜ケンミツ",
    description:
      "改正建設業法 2025 対応の見積書を月¥1,980 で出せるサービスはケンミツだけ。",
    images: ["https://mitsumori-maker.com/construction/opengraph-image"],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction",
  },
};

const faqsForLd = [
  {
    q: "改正建設業法 2025 で何が変わったのですか？",
    a: "2025 年 12 月 12 日に全面施行されました。労務費（人件費）の内訳明示、「一式」記載の適正化、法定福利費（労務費 × 14.6%）の独立計上が義務化されました。中央建設業審議会が勧告する標準労務費を著しく下回る見積りも禁止されています。",
  },
  {
    q: "違反するとどうなりますか？",
    a: "監督官庁から段階的に処分が下されます。指導 → 勧告 → 企業名公表 → 業務改善命令 → 営業停止 → 建設業許可の取消。経営事項審査評点も下がり公共工事入札で不利に。元請けからの見積書差し戻し・取引縮小のリスクもあります。",
  },
  {
    q: "なぜケンミツは月¥1,980 で改正法対応にできるのですか？",
    a: "建設業向けの業務管理 SaaS は顧客・案件・工程・原価・帳票をフル装備した月¥9,800〜¥30,000 のプロダクトが中心です。ケンミツは「中小建設業者の見積書作成」に機能を絞り込むことで、改正建設業法のルールに沿った見積書を月¥1,980 で提供できます。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "マイページからワンクリックで即時解約できます。「電話しないと解約できない」「メールでのお問い合わせのみ」のような摩擦はありません。解約後も 180 日間はデータ保持されます。",
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
  const planLabel =
    plan === "solo" ? "Solo" : plan === "team" ? "Team" : "Free";
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
      "中小建設業者向けの建設業特化・見積書作成クラウドツール。改正建設業法のルールに沿った見積書を月¥1,980 で作成可能。",
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
        price: "1980",
        priceCurrency: "JPY",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1980",
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
      <LawObligations />
      <LawRisks />
      <KenmitsuFeatures />
      <PriceComparison />
      <SoloUpgrade currentPlan={plan} isPaid={isPaid} />
      <Faq />
    </div>
  );
}
