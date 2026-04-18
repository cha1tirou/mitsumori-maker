"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConstructionQuoteData } from "@/types/construction";
import { Download, Loader2, Crown, X, Lock } from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import {
  validateQuote,
  hasBlockingIssues,
  formatIssuesForConfirm,
} from "@/lib/constructionValidation";

// フォントを事前キャッシュ（PDF生成時のブロッキングを軽減）
const FONT_URLS = [
  "/fonts/noto-sans-jp-400.woff",
  "/fonts/noto-sans-jp-700.woff",
];

// <link rel=preload> だけだとブラウザ実装によっては PDF 生成エンジンに届かないので、
// fetch で HTTP キャッシュに乗せ、さらに ArrayBuffer まで展開してメモリにも載せる。
async function warmFontCache() {
  try {
    await Promise.all(
      FONT_URLS.map(async (url) => {
        const res = await fetch(url, { credentials: "same-origin" });
        if (res.ok) await res.arrayBuffer();
      }),
    );
  } catch {
    // ignore: 失敗しても PDF 生成自体は試みる
  }
}

function preloadFonts() {
  FONT_URLS.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = url;
    link.as = "font";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
  // HTTP キャッシュにも載せる（fire-and-forget）
  void warmFontCache();
}

// メインスレッドを一瞬解放してUIを更新させる
const yieldToMain = () => new Promise<void>((r) => setTimeout(r, 0));

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
  const [loading, setLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  // マウント時にフォントをプリフェッチ
  useEffect(() => { preloadFonts(); }, []);

  // 有料プラン以外は透かし付き
  const withWatermark = plan !== "solo" && plan !== "team";

  const handleDownload = async () => {
    const issues = validateQuote(data);
    if (hasBlockingIssues(issues)) {
      alert(
        `PDF出力前に以下をご確認ください:\n\n${formatIssuesForConfirm(issues)}`
      );
      return;
    }
    // warning（推奨項目）はブロックせずそのまま出力する
    setLoading(true);
    const t0 = performance.now();
    console.log("[pdf] start");
    try {
      // モジュール読み込み後、UIを更新させてからPDF生成に入る
      const tImport = performance.now();
      const { generateConstructionPdf } = await import(
        "@/lib/constructionPdfGenerator"
      );
      console.log(
        `[pdf] module import: ${(performance.now() - tImport).toFixed(0)}ms`,
      );

      // フォント fetch を先に完了させておく（初回クリック時の大半のブロッキング要因）
      const tWarm = performance.now();
      await warmFontCache();
      console.log(
        `[pdf] warm font cache: ${(performance.now() - tWarm).toFixed(0)}ms`,
      );

      await yieldToMain();
      const tGen = performance.now();
      const blob = await generateConstructionPdf(data, {
        watermark: withWatermark,
      });
      const genMs = performance.now() - tGen;
      console.log(
        `[pdf] generate blob: ${genMs.toFixed(0)}ms (size=${(blob.size / 1024).toFixed(1)}KB)`,
      );
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

      // 匿名ユーザーのダウンロード数をカウント → 閾値で登録促し
      if (!isAuthenticated) {
        const count = incrementAnonCount();
        if (count >= ANON_NUDGE_THRESHOLD) {
          setShowNudge(true);
        }
      }
    } catch (e) {
      console.error("PDF generation failed:", e);
      alert("PDFの生成に失敗しました。もう一度お試しください。");
    } finally {
      console.log(
        `[pdf] total: ${(performance.now() - t0).toFixed(0)}ms`,
      );
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors ${className}`}
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
            {withWatermark && (
              <span className="text-[10px] font-normal opacity-75">（透かしあり）</span>
            )}
          </>
        )}
      </button>

      {/* PDF生成中の全画面オーバーレイ: 日本語フォント埋め込みでブラウザが一時的に応答停止するため事前に説明 */}
      {loading && (
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
              日本語フォントの埋め込みで <strong>10〜30秒</strong> ほどかかります。
              <br />
              ブラウザが「応答しません」と表示した場合は <strong>「待機」</strong>
              を選択してそのままお待ちください。
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
                <strong>見積履歴の保存</strong>＋<strong>自動メール送信</strong>が使える
                Soloプラン（月¥980）がおすすめです。
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
                      "/construction/login?redirect=/construction/new"
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
