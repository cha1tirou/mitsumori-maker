import Link from "next/link";
import { Building2, Users, JapaneseYen, ArrowRight, Lock } from "lucide-react";

interface Props {
  isPaid: boolean;
  companyRegistered: boolean;
  customerCount: number;
  priceCount: number;
}

export default function MasterHubCard({
  isPaid,
  companyRegistered,
  customerCount,
  priceCount,
}: Props) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-kenmitsu-navy" strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">マスタ管理</h2>
          <p className="text-[11px] text-gray-500">
            見積書で使う自社情報・取引先・単価を事前に登録できます
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MasterTile
          href="/construction/mypage/company"
          icon={<Building2 className="w-5 h-5" strokeWidth={2.25} />}
          title="自社情報"
          status={companyRegistered ? "登録済" : "未登録"}
          description="見積書の発行者欄に自動入力"
          locked={false}
        />
        <MasterTile
          href="/construction/mypage/customers"
          icon={<Users className="w-5 h-5" strokeWidth={2.25} />}
          title="取引先マスタ"
          status={
            isPaid
              ? `${customerCount} 社登録済`
              : "Solo プランで利用可"
          }
          description="発注者情報をワンクリックで呼び出し"
          locked={!isPaid}
        />
        <MasterTile
          href="/construction/mypage/price-master"
          icon={<JapaneseYen className="w-5 h-5" strokeWidth={2.25} />}
          title="単価マスタ"
          status={
            isPaid
              ? `${priceCount} 品目登録済`
              : "Solo プランで利用可"
          }
          description="よく使う品目を明細行へ即挿入"
          locked={!isPaid}
        />
      </div>
    </section>
  );
}

function MasterTile({
  href,
  icon,
  title,
  status,
  description,
  locked,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  status: string;
  description: string;
  locked: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-2 p-4 border border-gray-200 rounded-xl hover:border-kenmitsu-navy hover:bg-kenmitsu-navy50/40 transition-colors"
    >
      {locked && (
        <span className="absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full bg-kenmitsu-orange50 text-kenmitsu-orange600 text-[9px] font-bold px-1.5 py-0.5 leading-none">
          <Lock className="w-2.5 h-2.5" strokeWidth={3} />
          Solo
        </span>
      )}
      <div className="flex items-center gap-2 text-kenmitsu-navy">
        {icon}
        <span className="text-sm font-bold">{title}</span>
      </div>
      <p className="text-xs font-bold text-gray-900">{status}</p>
      <p className="text-[11px] text-gray-500 leading-relaxed">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-bold text-kenmitsu-navy group-hover:gap-1.5 transition-all">
        {locked ? "詳細を見る" : "編集する"}
        <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
      </span>
    </Link>
  );
}
