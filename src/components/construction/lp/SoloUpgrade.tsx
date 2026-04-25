import Link from "next/link";
import PlanCheckoutButton from "@/components/construction/PlanCheckoutButton";
import SectionHeading from "./SectionHeading";
import { CheckIcon, HelmetIcon } from "./icons";

const benefits = [
  "改正建設業法のルールに沿った見積書を作成できる",
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
      <div className="mx-auto max-w-[760px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Upgrade"
            title="有料プランで改正法対応版を出力"
            lead="月契約と年契約から選べます。いつでもワンクリック解約可能。"
          />
        </div>

        <article className="relative overflow-hidden rounded-3xl border-[2.5px] border-kenmitsu-orange bg-white p-7 shadow-[0_40px_80px_-30px_rgba(245,158,11,0.35)] md:p-10">
          <div className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-kenmitsu-orange px-4 py-2 text-[11px] font-black tracking-[0.1em] text-[#1A1200] shadow-[0_6px_16px_-6px_rgba(245,158,11,0.5)] md:text-[12px]">
            <HelmetIcon color="#1A1200" />
            個人事業主に人気
          </div>

          <div className="mb-2 text-center text-[12px] font-black tracking-[0.22em] text-kenmitsu-orange600 md:text-[13px]">
            有料プラン
          </div>

          <ul className="mb-8 mt-6 space-y-3">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* 月契約 */}
              <div className="rounded-2xl border border-kenmitsu-line bg-white p-5">
                <p className="mb-1 text-[11px] font-black tracking-[0.16em] text-kenmitsu-muted md:text-[12px]">
                  月契約
                </p>
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="font-mono text-[32px] font-black leading-none tracking-[-0.02em] text-kenmitsu-ink md:text-[40px]">
                    ¥980
                  </span>
                  <span className="text-[12px] font-bold text-kenmitsu-muted md:text-[14px]">
                    /月
                  </span>
                </div>
                <p className="mb-4 text-[11px] text-kenmitsu-muted md:text-[12px]">
                  毎月自動更新
                </p>
                <PlanCheckoutButton
                  plan="solo"
                  billing="monthly"
                  label={isPaid ? "月契約に変更" : "月契約で始める"}
                  variant="kenmitsu"
                />
              </div>

              {/* 年契約 */}
              <div className="relative rounded-2xl border-[1.5px] border-kenmitsu-orange bg-kenmitsu-orange/5 p-5">
                <span className="absolute -top-2.5 right-4 inline-block rounded-full bg-kenmitsu-orange px-2.5 py-0.5 text-[10px] font-black tracking-[0.08em] text-white md:text-[11px]">
                  2 ヶ月分お得
                </span>
                <p className="mb-1 text-[11px] font-black tracking-[0.16em] text-kenmitsu-orange600 md:text-[12px]">
                  年契約
                </p>
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="font-mono text-[32px] font-black leading-none tracking-[-0.02em] text-kenmitsu-ink md:text-[40px]">
                    ¥9,800
                  </span>
                  <span className="text-[12px] font-bold text-kenmitsu-muted md:text-[14px]">
                    /年
                  </span>
                </div>
                <p className="mb-4 text-[11px] text-kenmitsu-muted md:text-[12px]">
                  月換算 ¥816（約 17% お得）
                </p>
                <PlanCheckoutButton
                  plan="solo"
                  billing="yearly"
                  label={isPaid ? "年契約に変更" : "年契約で始める"}
                  variant="kenmitsu"
                />
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-[11px] text-kenmitsu-muted md:text-[12px]">
            いつでもワンクリック解約可能・解約後 180 日間データ保持
          </p>
        </article>
      </div>
    </section>
  );
}
