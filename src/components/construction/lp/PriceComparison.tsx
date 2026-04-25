import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { ArrowIcon } from "./icons";

type Row = {
  label: string;
  type: string;
  price: string;
  lawCompliant: boolean;
  highlight?: boolean;
};

const rows: Row[] = [
  {
    label: "他社 A（建設業向け）",
    type: "業務管理フル装備",
    price: "¥21,000〜 / 月",
    lawCompliant: true,
  },
  {
    label: "他社 B（建設業向け）",
    type: "業務管理フル装備",
    price: "¥18,000〜 / 月",
    lawCompliant: true,
  },
  {
    label: "他社 C（建設業向け）",
    type: "見積中心",
    price: "¥9,800〜 / 月",
    lawCompliant: true,
  },
  {
    label: "他社 D（汎用）",
    type: "見積書のみ",
    price: "無料〜",
    lawCompliant: false,
  },
  {
    label: "ケンミツ Solo",
    type: "見積特化（中小建設業者向け）",
    price: "¥980 / 月",
    lawCompliant: true,
    highlight: true,
  },
];

export default function PriceComparison() {
  return (
    <section className="bg-kenmitsu-paper/40 py-[clamp(56px,8vw,100px)]">
      <div className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Pricing Position"
            title="改正法対応サービス × 月¥1,000 台 — ケンミツだけ"
            lead="改正建設業法に対応した既存サービスは、月¥9,800 から数万円の価格帯が中心です。"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-kenmitsu-line bg-white">
          <table className="w-full border-collapse text-[13px] md:text-[14px]">
            <thead>
              <tr className="border-b border-kenmitsu-line bg-kenmitsu-paper/70 text-[12px] md:text-[13px]">
                <th className="py-3 px-4 text-left font-bold text-kenmitsu-muted">
                  サービス
                </th>
                <th className="hidden py-3 px-4 text-left font-bold text-kenmitsu-muted sm:table-cell">
                  タイプ
                </th>
                <th className="py-3 px-4 text-right font-bold text-kenmitsu-muted">
                  月額
                </th>
                <th className="py-3 px-4 text-center font-bold text-kenmitsu-muted">
                  改正法対応
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.label}
                  className={`border-b border-kenmitsu-line/60 ${
                    r.highlight ? "bg-kenmitsu-orange/10" : ""
                  }`}
                >
                  <td
                    className={`py-3 px-4 ${
                      r.highlight
                        ? "font-black text-kenmitsu-orange600"
                        : "font-bold text-kenmitsu-ink"
                    }`}
                  >
                    {r.label}
                  </td>
                  <td
                    className={`hidden py-3 px-4 sm:table-cell ${
                      r.highlight ? "font-bold text-kenmitsu-ink" : "text-kenmitsu-muted"
                    }`}
                  >
                    {r.type}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-mono ${
                      r.highlight
                        ? "font-black text-kenmitsu-orange600"
                        : "text-kenmitsu-ink"
                    }`}
                  >
                    {r.price}
                  </td>
                  <td
                    className={`py-3 px-4 text-center ${
                      r.lawCompliant ? "text-kenmitsu-ok" : "text-kenmitsu-muted"
                    } ${r.highlight ? "font-black" : "font-bold"}`}
                  >
                    {r.lawCompliant ? "○" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[10.5px] leading-relaxed text-kenmitsu-muted md:text-[11px]">
          ※ 各社公式サイト掲載価格・機能に基づく（2026 年 4 月時点）。プラン構成・対応範囲は各社公式情報をご確認ください。
        </p>

        <div className="mt-10 text-center">
          <Link
            href="#solo-upgrade"
            className="inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-b from-[#FBB43C] to-kenmitsu-orange px-7 py-4 text-[15px] font-bold text-[#1A1200] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_10px_24px_-10px_rgba(245,158,11,0.55)] transition-transform hover:-translate-y-px md:px-8 md:py-4 md:text-[16px]"
          >
            Solo プランの詳細を見る
            <ArrowIcon color="#1A1200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
