import Link from "next/link";
import PlanCheckoutButton from "@/components/construction/PlanCheckoutButton";
import SectionHeading from "./SectionHeading";
import { CheckIcon, HelmetIcon } from "./icons";

const benefits = [
  "改正建設業法 2025 対応 PDF を出力",
  "労務費・法定福利費の内訳明示（自動計算）",
  "リアルタイム法令チェッカー",
  "取引先マスタ・単価マスタで入力時間短縮",
  "原価・粗利分析、工事写真の添付",
  "クラウド保存・履歴管理（無制限）",
];

type Props = {
  currentPlan: "free" | "solo" | "team";
  isPaid: boolean;
};

export default function SoloUpgrade({ currentPlan, isPaid }: Props) {
  const isCurrentSolo = currentPlan === "solo";

  return (
    <section
      id="solo-upgrade"
      className="bg-white py-[clamp(56px,8vw,100px)]"
    >
      <div className="mx-auto max-w-[720px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Upgrade"
            title="Solo プランで改正法対応版を出力"
            lead="月¥980（年払いなら月換算 ¥816）。いつでもワンクリック解約可能。"
          />
        </div>

        <article className="relative overflow-hidden rounded-3xl border-[2.5px] border-kenmitsu-orange bg-white p-7 shadow-[0_40px_80px_-30px_rgba(245,158,11,0.35)] md:p-10">
          <div className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-kenmitsu-orange px-4 py-2 text-[11px] font-black tracking-[0.1em] text-[#1A1200] shadow-[0_6px_16px_-6px_rgba(245,158,11,0.5)] md:text-[12px]">
            <HelmetIcon color="#1A1200" />
            個人事業主に人気
          </div>

          <div className="mb-2 text-center text-[12px] font-black tracking-[0.22em] text-kenmitsu-orange600 md:text-[13px]">
            SOLO
          </div>

          <div className="mb-1 flex items-baseline justify-center gap-1">
            <span className="font-mono text-[44px] font-black leading-none tracking-[-0.02em] text-kenmitsu-ink md:text-[56px]">
              ¥980
            </span>
            <span className="text-[14px] font-bold text-kenmitsu-muted md:text-[16px]">
              /月
            </span>
          </div>
          <p className="mb-7 text-center text-[12px] text-kenmitsu-muted md:text-[13px]">
            年払い ¥9,800（2 ヶ月分お得・月換算 ¥816）
          </p>

          <ul className="mb-8 space-y-3">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[14px] leading-[1.7] text-kenmitsu-ink md:text-[15px]"
              >
                <span className="mt-1 shrink-0">
                  <CheckIcon color="#0E7A52" />
                </span>
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>

          {isCurrentSolo ? (
            <Link
              href="/construction/mypage"
              className="block w-full rounded-[12px] bg-kenmitsu-paper px-5 py-4 text-center text-[14px] font-bold text-kenmitsu-ink md:text-[15px]"
            >
              契約中・マイページへ →
            </Link>
          ) : (
            <PlanCheckoutButton
              plan="solo"
              billing="monthly"
              label={isPaid ? "Solo プランに変更" : "Solo プランを開始"}
              variant="kenmitsu"
            />
          )}

          <p className="mt-4 text-center text-[11px] text-kenmitsu-muted md:text-[12px]">
            いつでもワンクリック解約可能・解約後 180 日間データ保持
          </p>
        </article>
      </div>
    </section>
  );
}
