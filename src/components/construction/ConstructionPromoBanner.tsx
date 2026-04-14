import Link from "next/link";
import { HardHat, ArrowRight, AlertTriangle } from "lucide-react";

export default function ConstructionPromoBanner() {
  return (
    <aside className="my-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white overflow-hidden">
      <div className="px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-700 flex items-center justify-center flex-shrink-0">
            <HardHat className="w-5 h-5 text-white" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
              <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
              2025年12月・改正建設業法 全面施行
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              建設業専用・月980円の見積書ツールがあります
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              階層見積・法定福利費・労務費内訳・瑕疵担保条項 ― 改正建設業法2025対応の工事見積書を、登録不要で試せます。
            </p>
            <Link
              href="/construction"
              className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              建設業向けツールを見る
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
