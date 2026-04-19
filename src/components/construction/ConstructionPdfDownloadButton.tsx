"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConstructionQuoteData } from "@/types/construction";
import {
  Download,
  Loader2,
  CheckCircle2,
  Crown,
  X,
  Lock,
} from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import {
  validateQuote,
  hasBlockingIssues,
  formatIssuesForConfirm,
} from "@/lib/constructionValidation";
import { Portal } from "./Portal";

// PDF 生成: ConstructionPreview（.printable-root）を html2canvas でラスタライズし
// jsPDF に埋め込んで Blob を受け取り、<a download> で通常ダウンロードする。
// メインスレッドのブロックは 1〜2秒程度、ブラウザ応答停止は起きない。

interface Props {
  data: ConstructionQuoteData;
  plan?: "free" | "solo" | "team";
  isAuthenticated?: boolean;
  className?: string;
}

type Status = "idle" | "generating" | "done";

const ANON_DOWNLOAD_KEY = "mitsumori-construction-anon-pdf-count-v1";
const ANON_NUDGE_THRESHOLD = 3;
const AUTO_DISMISS_MS = 3000;

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
  const [status, setStatus] = useState<Status>("idle");
  const [filename, setFilename] = useState("");
  const [showNudge, setShowNudge] = useState(false);

  // 有料プラン以外は透かし付き（プレビューで既に視覚反映されているので、
  // html2canvas はそのキャプチャを取るだけで OK）
  const withWatermark = plan !== "solo" && plan !== "team";

  const handleClick = async () => {
    const issues = validateQuote(data);
    if (hasBlockingIssues(issues)) {
      alert(
        `PDF出力前に以下をご確認ください:\n\n${formatIssuesForConfirm(issues)}`,
      );
      return;
    }

    const element = document.querySelector(
      ".printable-root",
    ) as HTMLElement | null;
    if (!element) {
      alert(
        "プレビューが見つかりませんでした。ページを再読み込みしてお試しください。",
      );
      return;
    }

    setStatus("generating");

    try {
      // モーダルが描画される間を 1フレーム待つ
      await new Promise((r) => setTimeout(r, 50));

      const { generatePdfBlobFromElement } = await import(
        "@/lib/constructionPdfFromPreview"
      );
      const blob = await generatePdfBlobFromElement(element, {
        watermark: withWatermark,
      });

      const safeClient = (data.clientName || "未設定").replace(
        /[/\\?%*:|"<>]/g,
        "_",
      );
      const safeDate = data.quoteDate || "未設定";
      const name = `工事見積書_${safeClient}_${safeDate}.pdf`;
      setFilename(name);

      // ブラウザ通常のダウンロードを発火
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      trackConversion("construction_pdf_download");
      setStatus("done");

      // 3秒後に自動で閉じ、登録促しがあれば表示
      setTimeout(() => {
        setStatus("idle");
        if (!isAuthenticated) {
          const count = incrementAnonCount();
          if (count >= ANON_NUDGE_THRESHOLD) {
            setShowNudge(true);
          }
        }
      }, AUTO_DISMISS_MS);
    } catch (e) {
      console.error("PDF generation failed:", e);
      setStatus("idle");
      alert("PDFの生成に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={status === "generating"}
        className={`flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors ${className}`}
      >
        <Download className="w-4 h-4" strokeWidth={2.5} />
        PDFダウンロード
        {withWatermark && (
          <span className="text-[10px] font-normal opacity-75">
            （透かしあり）
          </span>
        )}
      </button>

      {/* 生成中モーダル */}
      {status === "generating" && (
        <Portal>
        <div
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
            <Loader2
              className="w-12 h-12 text-kenmitsu-orange mx-auto mb-4 animate-spin"
              strokeWidth={2}
            />
            <p className="text-base font-bold text-gray-900 mb-1">
              PDFを生成しています
            </p>
            <p className="text-xs text-gray-500">
              数秒でダウンロードが始まります
            </p>
          </div>
        </div>
        </Portal>
      )}

      {/* 完了モーダル */}
      {status === "done" && (
        <Portal>
        <div
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setStatus("idle")}
          role="dialog"
          aria-live="polite"
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckCircle2
              className="w-14 h-14 text-kenmitsu-ok mx-auto mb-4"
              strokeWidth={2}
            />
            <p className="text-base font-bold text-gray-900 mb-1">
              PDFを保存しました
            </p>
            <p
              className="text-[11px] text-gray-500 mb-4 break-all"
              title={filename}
            >
              {filename}
            </p>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              ダウンロードフォルダをご確認ください。
            </p>
            {!isAuthenticated && (
              <Link
                href="/construction/login?redirect=/construction/new"
                onClick={() => setStatus("idle")}
                className="block w-full bg-kenmitsu-navy hover:bg-kenmitsu-navy700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors mb-2"
              >
                無料登録で見積書を保存する →
              </Link>
            )}
            <button
              onClick={() => setStatus("idle")}
              className="w-full bg-kenmitsu-navy50 hover:bg-kenmitsu-navy100 text-kenmitsu-navy text-sm font-bold py-2.5 rounded-lg transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
        </Portal>
      )}

      {showNudge && (
        <Portal>
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
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
        </Portal>
      )}
    </>
  );
}
