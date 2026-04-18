"use client";

import Link from "next/link";
import { HardHat } from "lucide-react";

export default function ConstructionError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kenmitsu-navy50 mb-6">
          <HardHat className="w-8 h-8 text-kenmitsu-navy" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          エラーが発生しました
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          申し訳ございません。処理中に問題が発生しました。
          <br />
          しばらく経ってからもう一度お試しください。
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full bg-kenmitsu-orange text-white font-bold py-3 rounded-lg hover:bg-kenmitsu-orange600 transition-colors"
          >
            もう一度試す
          </button>
          <Link
            href="/construction"
            className="w-full inline-block text-gray-600 hover:text-gray-900 text-sm py-2 transition-colors"
          >
            ← トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
