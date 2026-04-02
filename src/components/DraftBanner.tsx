"use client";

interface DraftBannerProps {
  onRestore: () => void;
  onDiscard: () => void;
}

export default function DraftBanner({ onRestore, onDiscard }: DraftBannerProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-amber-800">
            前回の下書きが見つかりました
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            この端末にのみ保存されています。サーバーには送信されません。
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onRestore}
            className="bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            復元する
          </button>
          <button
            onClick={onDiscard}
            className="bg-white text-amber-700 border border-amber-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
          >
            新規作成する
          </button>
        </div>
      </div>
    </div>
  );
}
