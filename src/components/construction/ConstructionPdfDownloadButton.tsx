"use client";

import { useState } from "react";
import { ConstructionQuoteData } from "@/types/construction";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
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
  className?: string;
}

type Status = "idle" | "generating" | "done";

const AUTO_DISMISS_MS = 3000;

export default function ConstructionPdfDownloadButton({
  data,
  plan = "free",
  className = "",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [filename, setFilename] = useState("");

  const isLawCompliant = plan === "solo" || plan === "team";

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

      trackConversion("construction_pdf_download");
      setStatus("done");

      setTimeout(() => {
        setStatus("idle");
      }, AUTO_DISMISS_MS);
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
        "解消しない場合はお問い合わせください:",
        "kenmitsu.support@gmail.com",
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
        {isLawCompliant && (
          <span className="text-[10px] font-normal opacity-75">
            （改正法対応版）
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
    </>
  );
}
