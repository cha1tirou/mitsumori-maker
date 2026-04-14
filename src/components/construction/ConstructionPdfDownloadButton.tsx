"use client";

import { useState } from "react";
import { ConstructionQuoteData } from "@/types/construction";
import { Download, Loader2 } from "lucide-react";
import { trackConversion } from "@/lib/analytics";

interface Props {
  data: ConstructionQuoteData;
  className?: string;
}

export default function ConstructionPdfDownloadButton({ data, className = "" }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { generateConstructionPdf } = await import(
        "@/lib/constructionPdfGenerator"
      );
      const blob = await generateConstructionPdf(data);
      trackConversion("construction_pdf_download");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeClient = (data.clientName || "未設定").replace(/[/\\?%*:|"<>]/g, "_");
      a.download = `工事見積書_${safeClient}_${data.quoteDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed:", e);
      alert("PDFの生成に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
          PDF生成中...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" strokeWidth={2.5} />
          PDFダウンロード
        </>
      )}
    </button>
  );
}
