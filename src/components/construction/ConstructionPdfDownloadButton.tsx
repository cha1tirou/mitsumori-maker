"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConstructionQuoteData } from "@/types/construction";
import { Download, Loader2, Crown, X, Lock, Printer } from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import {
  validateQuote,
  hasBlockingIssues,
  formatIssuesForConfirm,
} from "@/lib/constructionValidation";

// PDF 生成方式はブラウザ印刷（高速）を既定とし、@react-pdf/renderer は重いので
// 上級者向けのフォールバックとして残す。
//
// 実装メモ:
// - ブラウザ印刷方式: sessionStorage に見積データを退避 → /construction/print を新タブで開く →
//   そのページが自動で window.print() → ユーザーが「PDFとして保存」を選ぶ
// - レガシー方式: @react-pdf/renderer を import して blob 生成。日本語フォント 3MB を
//   メインスレッドで解析するため 10〜30秒ブロックする

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
  const [legacyLoading, setLegacyLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  // 有料プラン以外は透かし付き
  const withWatermark = plan !== "solo" && plan !== "team";

  // 共通: 出力前のバリデーション + ダウンロード数カウント
  const preflightCheck = (): boolean => {
    const issues = validateQuote(data);
    if (hasBlockingIssues(issues)) {
      alert(
        `PDF出力前に以下をご確認ください:\n\n${formatIssuesForConfirm(issues)}`,
      );
      return false;
    }
    return true;
  };

  const afterDownloadHook = () => {
    trackConversion("construction_pdf_download");
    if (!isAuthenticated) {
      const count = incrementAnonCount();
      if (count >= ANON_NUDGE_THRESHOLD) {
        setShowNudge(true);
      }
    }
  };

  // === ブラウザ印刷方式（既定・高速） ===
  const handlePrintPdf = () => {
    if (!preflightCheck()) return;
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
    afterDownloadHook();
  };

  // === レガシー: @react-pdf/renderer 方式（重い・保険） ===
  const handleLegacyDownload = async () => {
    if (!preflightCheck()) return;
    setLegacyLoading(true);
    try {
      const { generateConstructionPdf } = await import(
        "@/lib/constructionPdfGenerator"
      );
      const blob = await generateConstructionPdf(data, {
        watermark: withWatermark,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeClient = (data.clientName || "未設定").replace(
        /[/\\?%*:|"<>]/g,
        "_",
      );
      a.download = `工事見積書_${safeClient}_${data.quoteDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      afterDownloadHook();
    } catch (e) {
      console.error("PDF generation failed:", e);
      alert("PDFの生成に失敗しました。もう一度お試しください。");
    } finally {
      setLegacyLoading(false);
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

      {/* 予備: 旧 @react-pdf レイアウト。ブラウザ印刷で困った時のみ使う */}
      <button
        onClick={handleLegacyDownload}
        disabled={legacyLoading}
        className="mt-1 w-full text-[10px] text-gray-400 hover:text-gray-700 disabled:opacity-60 flex items-center justify-center gap-1.5"
        title="ブラウザ印刷が使えない場合の代替（10〜30秒ブラウザが応答停止する場合があります）"
      >
        {legacyLoading ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" strokeWidth={2.5} />
            生成中…
          </>
        ) : (
          <>
            <Printer className="w-3 h-3" strokeWidth={2.25} />
            旧PDFレイアウト（直接ダウンロード・重い）
          </>
        )}
      </button>

      {/* レガシー方式は @react-pdf が重いため、実行中はメインスレッドがブロックされる */}
      {legacyLoading && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <Loader2
              className="w-10 h-10 text-kenmitsu-orange mx-auto mb-3 animate-spin"
              strokeWidth={2}
            />
            <p className="text-base font-bold text-gray-900 mb-1">
              PDFを生成しています
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              旧方式のため <strong>10〜30秒</strong> かかります。
              <br />
              ブラウザが「応答しません」と出た場合は{" "}
              <strong>「待機」</strong> を選んでお待ちください。
            </p>
          </div>
        </div>
      )}

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
