/**
 * Stripe が有効か判定するヘルパー。
 * キーが未設定の場合、課金機能は無効化されて「準備中」UIで対応する。
 */
export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
}

export function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY が未設定です。");
  return key;
}

export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET が未設定です。");
  return secret;
}

export interface PlanConfig {
  plan: "solo" | "team";
  label: string;
  priceMonthly: number;
  priceYearly: number;
  stripeMonthlyPriceId: string | undefined;
  stripeYearlyPriceId: string | undefined;
}

export const planConfigs: PlanConfig[] = [
  {
    plan: "solo",
    label: "Solo",
    priceMonthly: 1980,
    priceYearly: 19800,
    stripeMonthlyPriceId: process.env.STRIPE_PRICE_SOLO_MONTHLY,
    stripeYearlyPriceId: process.env.STRIPE_PRICE_SOLO_YEARLY,
  },
  {
    plan: "team",
    label: "Team",
    priceMonthly: 2980,
    priceYearly: 29800,
    stripeMonthlyPriceId: process.env.STRIPE_PRICE_TEAM_MONTHLY,
    stripeYearlyPriceId: process.env.STRIPE_PRICE_TEAM_YEARLY,
  },
];

export function findPlanByPriceId(
  priceId: string
): { plan: "solo" | "team" } | null {
  for (const cfg of planConfigs) {
    if (
      cfg.stripeMonthlyPriceId === priceId ||
      cfg.stripeYearlyPriceId === priceId
    ) {
      return { plan: cfg.plan };
    }
  }
  return null;
}
