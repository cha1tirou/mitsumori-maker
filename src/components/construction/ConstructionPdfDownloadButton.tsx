"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConstructionQuoteData } from "@/types/construction";
import { Download, Crown, X, Lock } from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import {
  validateQuote,
  hasBlockingIssues,
  formatIssuesForConfirm,
} from "@/lib/constructionValidation";

// PDF 出力はブラウザ印刷方式で一本化。
// sessionStorage に見積データを退避 → /construction/print を新タブで開く →
// そのページが自動で window.print() → ユーザーが「PDFとして保存」を選ぶ。
//
// @react-pdf/renderer を使う旧方式は重くブラウザが応答停止するため外した。
// UI から呼び出す経路はないが、API や将来の再利用のため
// src/lib/constructionPdfGenerator.tsx は保持している。

const PRINT_STORAGE_KEY = "kenmitsu-print-data-v1";

interface Props {
  data: ConstructionQuoteData;
  plan?: "free" | "solo" | "team";
  isAuthenticated?: boolean;
  className?: string;
}

const ANON_DOWNLOAD_KEY = "mitsumori-construction-anon-pdf-count-v1";
const ANON_NUDGE_THRESHOLD = 3;

function getAnonCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(localStorage.getItem(ANON_DOWNLOAD_KEY) || "0", 10) || 0;
  } catch {
    return 0;
  }
}

function incrementAnonCount(): number {
  const next = getAnonCount() + 1;
  try {
    localStorage.setItem(ANON_DOWNLOAD_KEY, String(next));
  } catch {
    // ignore
  }
  return next;
}

export default function ConstructionPdfDownloadButton({
  data,
  plan = "free",
  isAuthenticated = false,
  className = "",
}: Props) {
  const router = useRouter();
  const [showNudge, setShowNudge] = useState(false);

  // 有料プラン以外は透かし付き
  const withWatermark = plan !== "solo" && plan !== "team";

  const handlePrintPdf = () => {
    const issues = validateQuote(data);
    if (hasBlockingIssues(issues)) {
      alert(
        `PDF出力前に以下をご確認ください:\n\n${formatIssuesForConfirm(issues)}`,
      );
      return;
    }
    try {
      sessionStorage.setItem(
        PRINT_STORAGE_KEY,
        JSON.stringify({ data, watermark: withWatermark }),
      );
    } catch (e) {
      console.error("sessionStorage write failed:", e);
      alert(
        "ブラウザのストレージに一時保存できませんでした。シークレットモードの場合は通常モードでお試しください。",
      );
      return;
    }
    const win = window.open("/construction/print", "_blank");
    if (!win) {
      alert(
        "ポップアップブロッカーで新しいタブを開けませんでした。ブラウザ設定から本サイトのポップアップを許可してください。",
      );
      return;
    }
    trackConversion("construction_pdf_download");
    if (!isAuthenticated) {
      const count = incrementAnonCount();
      if (count >= ANON_NUDGE_THRESHOLD) {
        setShowNudge(true);
      }
    }
  };

  return (
    <>
      <button
        onClick={handlePrintPdf}
        className={`flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-3 rounded-lg transition-colors ${className}`}
      >
        <Download className="w-4 h-4" strokeWidth={2.5} />
        PDFダウンロード
        {withWatermark && (
          <span className="text-[10px] font-normal opacity-75">
            （透かしあり）
          </span>
        )}
      </button>

      {showNudge && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowNudge(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative px-6 py-5 bg-gradient-to-br from-kenmitsu-navy to-kenmitsu-navy700 text-white">
              <button
                onClick={() => setShowNudge(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <Crown className="w-8 h-8 mb-2" strokeWidth={2} />
              <h3 className="text-base font-bold mb-1">
                3通目の見積書ありがとうございます！
              </h3>
              <p className="text-xs text-kenmitsu-navy100 leading-relaxed">
                本格的にご利用いただくなら、<strong>透かしなしの正式版</strong>＋
                <strong>見積履歴の保存</strong>＋<strong>自動メール送信</strong>
                が使える Soloプラン（月¥980）がおすすめです。
              </p>
            </div>
            <div className="p-5 space-y-3">
              <div className="text-xs text-gray-600 space-y-1.5">
                <p className="flex items-center gap-2">
                  <span className="text-kenmitsu-ok font-bold">✓</span>
                  PDF透かし 完全消去
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-kenmitsu-ok font-bold">✓</span>
                  見積書の無制限保存・再編集・複製
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-kenmitsu-ok font-bold">✓</span>
                  発注者へメール直接送信
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-kenmitsu-ok font-bold">✓</span>
                  いつでもワンクリック解約
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/construction#pricing"
                  onClick={() => setShowNudge(false)}
                  className="flex items-center justify-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-3 rounded-lg"
                >
                  <Crown className="w-4 h-4" strokeWidth={2.25} />
                  Soloプラン（月¥980）を見る
                </Link>
                <button
                  onClick={() => {
                    router.push(
                      "/construction/login?redirect=/construction/new",
                    );
                    setShowNudge(false);
                  }}
                  className="text-xs text-gray-600 hover:text-gray-900 py-2 flex items-center justify-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5" strokeWidth={2.25} />
                  まずは無料登録（月3通まで透かし入りで保存可）
                </button>
                <button
                  onClick={() => setShowNudge(false)}
                  className="text-[11px] text-gray-400 hover:text-gray-600 py-1"
                >
                  あとで
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
