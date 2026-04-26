"use client";

import { useState } from "react";
import Link from "next/link";
import { ConstructionQuoteData } from "@/types/construction";
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { trackConversion, trackEvent } from "@/lib/analytics";
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
  className?: string;
}

type Status = "idle" | "generating" | "done";

const DL_COUNT_KEY = "kenmitsu-pdf-dl-count";

function readDlCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = window.localStorage.getItem(DL_COUNT_KEY);
    if (!v) return 0;
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

function incrementDlCount(): number {
  const current = readDlCount();
  const next = current + 1;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(DL_COUNT_KEY, String(next));
    } catch {
      // localStorage 不可（プライベートブラウジング等）の場合は無視
    }
  }
  return next;
}

export default function ConstructionPdfDownloadButton({
  data,
  plan = "free",
  className = "",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [filename, setFilename] = useState("");
  const [dlCount, setDlCount] = useState(0);

  const isLawCompliant = plan === "solo" || plan === "team";
  const isFree = plan === "free";
  // 完了モーダル内の「有料プランの誘導」表示モード:
  //   - first: 初回 DL のみ目立つフルバージョン（特典リスト付き）
  //   - subtle: 2 回目以降は穏やかな差し色のヒント
  const ctaMode: "first" | "subtle" | "none" = !isFree
    ? "none"
    : dlCount === 1
      ? "first"
      : "subtle";

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
        quoteNumber: data.quoteNumber,
        lawCompliantBadge: isLawCompliant,
      });

      const sanitize = (s: string) => s.replace(/[/\\?%*:|"<>]/g, "_").trim();
      const safeClient = sanitize(data.clientName || "");
      const safeTitle = sanitize(data.clientTitle || "");
      const clientPart = safeClient
        ? safeTitle
          ? `${safeClient}${safeTitle}`
          : safeClient
        : "未設定";
      const safeDate = data.quoteDate || "未設定";
      const name = `工事見積書_${clientPart}_${safeDate}.pdf`;
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

      // DL 回数をインクリメントして state に反映（モーダルの分岐に使う）
      const newCount = incrementDlCount();
      setDlCount(newCount);

      trackConversion("construction_pdf_download");
      setStatus("done");

      // 自動 dismiss は廃止：完了モーダルで有料誘導 CTA を出すため、ユーザーの
      // 操作（閉じる or プラン詳細を見る）でのみ dismiss。
    } catch (e) {
      console.error("PDF generation failed:", e);
      setStatus("idle");
      const photoCount = (data.sitePhotos ?? []).length;
      const lines = ["PDFの生成に失敗しました。"];
      if (photoCount >= 3) {
        lines.push(
          "",
          `工事写真が ${photoCount} 枚添付されています。`,
          "写真が多い場合はメモリ不足が原因の可能性があります。",
          "写真を数枚減らしてから、もう一度お試しください。",
        );
      } else {
        lines.push(
          "",
          "ページを再読み込みしてから、もう一度お試しください。",
        );
      }
      lines.push(
        "",
        "解消しない場合は以下のフォームよりお問い合わせください:",
        "https://mitsumori-maker.com/construction/contact",
      );
      alert(lines.join("\n"));
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
        <span className="text-[10px] font-normal opacity-75">
          （{isLawCompliant ? "改正法対応版" : "通常フォーマット"}）
        </span>
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
              className={`bg-white rounded-2xl shadow-xl w-full overflow-hidden ${ctaMode === "first" ? "max-w-md" : "max-w-sm"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 text-center">
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
                <button
                  onClick={() => setStatus("idle")}
                  className="w-full bg-kenmitsu-navy50 hover:bg-kenmitsu-navy100 text-kenmitsu-navy text-sm font-bold py-2.5 rounded-lg transition-colors"
                >
                  閉じる
                </button>
              </div>

              {/* 初回 DL: 大きく目立つアップグレード CTA（Free のみ） */}
              {ctaMode === "first" && (
                <div className="border-t border-amber-200 bg-gradient-to-b from-amber-50 to-white px-6 py-6">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertTriangle
                      className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
                      strokeWidth={2.25}
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-black text-amber-900 leading-tight mb-1">
                        この PDF は通常フォーマットです
                      </p>
                      <p className="text-[11px] text-amber-900/85 leading-relaxed">
                        改正建設業法 2025 のルールに沿った見積書（労務費・法定福利費の内訳明示）を出力するには有料プランが必要です。
                      </p>
                    </div>
                  </div>

                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4 text-[11px] text-gray-800 leading-snug">
                    <li className="flex items-start gap-1">
                      <span className="text-kenmitsu-ok shrink-0">✓</span>
                      改正法対応版 PDF
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-kenmitsu-ok shrink-0">✓</span>
                      労務費・法定福利費の内訳
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-kenmitsu-ok shrink-0">✓</span>
                      法令チェッカー（リアルタイム）
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-kenmitsu-ok shrink-0">✓</span>
                      取引先・単価マスタ
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-kenmitsu-ok shrink-0">✓</span>
                      原価・粗利分析
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-kenmitsu-ok shrink-0">✓</span>
                      工事写真の添付
                    </li>
                  </ul>

                  <Link
                    href="/construction#solo-upgrade"
                    onClick={() => trackEvent("construction_pdf_done_upgrade_click_first")}
                    className="flex items-center justify-center gap-1.5 w-full bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-black py-3 rounded-lg transition-colors"
                  >
                    有料プランを見る（月¥1,980〜）
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </Link>
                  <p className="text-[10px] text-gray-500 text-center mt-2">
                    年払いで 2 ヶ月分お得・いつでもワンクリック解約
                  </p>
                </div>
              )}

              {/* 2 回目以降: 穏やかなヒント（Free のみ） */}
              {ctaMode === "subtle" && (
                <div className="border-t border-gray-100 bg-gray-50/60 px-6 py-3.5 text-center">
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    💡 通常フォーマットで出力しました。改正法対応版が必要なら{" "}
                    <Link
                      href="/construction#solo-upgrade"
                      onClick={() => trackEvent("construction_pdf_done_upgrade_click_subtle")}
                      className="text-kenmitsu-orange600 hover:text-kenmitsu-orange font-bold underline"
                    >
                      有料プランを見る →
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
