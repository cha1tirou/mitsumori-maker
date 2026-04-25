import Link from "next/link";
import PlanCheckoutButton from "@/components/construction/PlanCheckoutButton";
import SectionHeading from "./SectionHeading";
import PricingSectionTracker from "./PricingSectionTracker";
import { AlertIcon, CheckIcon, ClockIcon, HelmetIcon } from "./icons";

type Kind = "ok" | "hl" | "note" | "dev";

type Plan = {
  id: "free" | "solo" | "team";
  name: string;
  tag?: string;
  price: string;
  period: string;
  subprice?: string;
  features: [Kind, string][];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "FREE",
    price: "¥0",
    period: "ずっと無料",
    features: [
      ["ok", "メアド登録だけで利用開始"],
      ["ok", "見積書作成・PDF出力（無制限）"],
      ["ok", "クラウド保存・再編集（無制限）"],
      ["ok", "工種プリセット・諸経費自動計算"],
      ["note", "PDF は通常フォーマット（改正法対応版は有料プラン）"],
    ],
  },
  {
    id: "solo",
    name: "SOLO",
    price: "¥1,980",
    period: "/月",
    subprice: "年払い ¥19,800（2ヶ月分お得）",
    features: [
      ["hl", "改正建設業法のルールに沿った見積書を作成"],
      ["hl", "労務費・法定福利費の内訳明示"],
      ["hl", "改正建設業法チェッカー（リアルタイム）"],
      ["ok", "顧客・単価マスタで入力時間を短縮"],
      ["ok", "原価・粗利分析、工事写真の添付"],
    ],
    featured: true,
  },
];

type Props = {
  currentPlan: "free" | "solo" | "team";
  isPaid: boolean;
};

function Mark({ kind }: { kind: Kind }) {
  switch (kind) {
    case "ok":
      return <CheckIcon color="#0E7A52" />;
    case "hl":
      return <CheckIcon color="#E08A00" />;
    case "note":
      return <AlertIcon color="#8B95AB" />;
    case "dev":
      return <ClockIcon color="#8B95AB" />;
  }
}

export default function Pricing({ currentPlan, isPaid }: Props) {
  return (
    <section
      id="pricing"
      className="bg-white py-[clamp(64px,9vw,120px)]"
    >
      <PricingSectionTracker />
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Pricing"
            title="料金プラン"
            lead="いつでも解約できます。自動更新停止もワンクリック。"
          />
        </div>

        {/* featured SOLO gets -translate-y-2 on lg+ ONLY to avoid clipping on mobile */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2">
          {plans.map((p) => {
            const featured = p.featured;
            return (
              <article
                key={p.id}
                className={[
                  "relative flex flex-col rounded-3xl bg-white",
                  featured
                    ? "border-[2.5px] border-kenmitsu-orange p-7 shadow-[0_40px_80px_-30px_rgba(245,158,11,0.35)] lg:-translate-y-2 md:p-8"
                    : "border-[1.5px] border-kenmitsu-line p-6 md:p-7",
                ].join(" ")}
              >
                {featured && p.tag && (
                  <div className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-kenmitsu-orange px-4 py-2 text-[11px] font-black tracking-[0.1em] text-[#1A1200] shadow-[0_6px_16px_-6px_rgba(245,158,11,0.5)] md:text-[12px]">
                    <HelmetIcon color="#1A1200" />
                    {p.tag}
                  </div>
                )}
                {!featured && p.tag && (
                  <div className="absolute right-4 top-4 rounded-full bg-kenmitsu-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-kenmitsu-muted md:right-5 md:top-5 md:text-[11px]">
                    {p.tag}
                  </div>
                )}

                <div
                  className={`mb-2 text-[12px] font-black tracking-[0.22em] md:text-[13px] ${
                    featured ? "text-kenmitsu-orange600" : "text-kenmitsu-muted"
                  }`}
                >
                  {p.name}
                </div>

                <div className="mb-1 flex items-baseline gap-1">
                  <span
                    className={`font-mono font-black leading-none tracking-[-0.02em] text-kenmitsu-ink ${
                      featured
                        ? "text-[44px] md:text-[52px]"
                        : "text-[38px] md:text-[48px]"
                    }`}
                  >
                    {p.price}
                  </span>
                  <span className="text-[14px] font-bold text-kenmitsu-muted md:text-[16px]">
                    {p.period}
                  </span>
                </div>
                <div className="mb-6 min-h-[16px] text-[11px] text-kenmitsu-muted md:text-[12px]">
                  {p.subprice ?? "\u00A0"}
                </div>

                <ul className="mb-7 flex flex-1 flex-col gap-3 p-0 text-[13px] md:text-[14px]">
                  {p.features.map(([kind, label]) => (
                    <li
                      key={label}
                      className={`flex items-start gap-2.5 leading-[1.6] ${
                        kind === "note" || kind === "dev"
                          ? "text-kenmitsu-muted"
                          : "text-kenmitsu-ink"
                      } ${kind === "hl" ? "font-bold" : "font-medium"}`}
                    >
                      <span className="mt-0.5 shrink-0">
                        <Mark kind={kind} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {p.id === "free" && (
                  <Link
                    href="/construction/start"
                    className="block w-full rounded-[12px] border-[1.5px] border-kenmitsu-line bg-white px-5 py-3.5 text-center text-[14px] font-bold text-kenmitsu-ink hover:border-kenmitsu-ink md:text-[15px]"
                  >
                    無料で始める
                  </Link>
                )}
                {p.id === "solo" &&
                  (currentPlan === "solo" ? (
                    <Link
                      href="/construction/mypage"
                      className="block w-full rounded-[12px] bg-kenmitsu-paper px-5 py-3.5 text-center text-[14px] font-bold text-kenmitsu-ink md:text-[15px]"
                    >
                      契約中・マイページへ →
                    </Link>
                  ) : (
                    <PlanCheckoutButton
                      plan="solo"
                      billing="monthly"
                      label={isPaid ? "有料プランに変更" : "有料プランで始める"}
                      variant="kenmitsu"
                    />
                  ))}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
