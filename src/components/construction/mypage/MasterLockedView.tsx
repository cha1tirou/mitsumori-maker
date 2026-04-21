import Link from "next/link";
import { Crown, Lock, ArrowLeft, Check } from "lucide-react";

interface Props {
  featureTitle: string;
  featureDescription: string;
  benefits: string[];
}

export default function MasterLockedView({
  featureTitle,
  featureDescription,
  benefits,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="relative px-6 py-8 bg-gradient-to-br from-kenmitsu-navy to-kenmitsu-navy700 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-kenmitsu-orange" strokeWidth={2.5} />
          <span className="text-xs font-bold tracking-wider uppercase text-kenmitsu-orange">
            Solo プラン限定機能
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2">{featureTitle}</h2>
        <p className="text-sm text-kenmitsu-navy100 leading-relaxed">
          {featureDescription}
        </p>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <p className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-3">
            Solo プランの特典
          </p>
          <ul className="space-y-2">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <Check
                  className="w-4 h-4 text-kenmitsu-ok shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-kenmitsu-navy50 rounded-xl p-4 flex items-baseline gap-2">
          <span className="text-xs text-kenmitsu-navy font-bold">月額</span>
          <span className="text-2xl font-bold text-gray-900">¥980</span>
          <span className="text-xs text-gray-500">
            / 年払い ¥9,800（2ヶ月分お得）
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/construction#pricing"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-3 rounded-lg transition-colors"
          >
            <Crown className="w-4 h-4" strokeWidth={2.25} />
            Solo プランの詳細を見る
          </Link>
          <Link
            href="/construction/mypage"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.25} />
            マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
