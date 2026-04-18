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

// PDF 出力はブラウザの印刷機能で一本化。
// 1. ユーザーが「PDFダウンロード」を押す
// 2. 事前案内モーダルで「印刷ダイアログが開いたら『PDFとして保存』を選んでください」と説明
// 3. window.print() を呼び、印刷CSS (ConstructionEditor.tsx の <style jsx global>) が
//    編集UIを隠しプレビューのみ A4 に印刷する
//
// @react-pdf/renderer を使わないため、日本語フォント 3MB をメインスレッドで解析する
// ことによるブラウザ応答停止が発生しない。

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
  const [showHowTo, setShowHowTo] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  // 有料プラン以外は透かし付き
  const withWatermark = plan !== "solo" && plan !== "team";

  const handleClick = () => {
    const issues = validateQuote(data);
    if (hasBlockingIssues(issues)) {
      alert(
        `PDF出力前に以下をご確認ください:\n\n${formatIssuesForConfirm(issues)}`,
      );
      return;
    }
    setShowHowTo(true);
  };

  const startPrint = () => {
    setShowHowTo(false);
    // モーダル閉じて DOM が落ち着いてから印刷ダイアログを開く
    setTimeout(() => {
      window.print();
      trackConversion("construction_pdf_download");
      if (!isAuthenticated) {
        const count = incrementAnonCount();
        if (count >= ANON_NUDGE_THRESHOLD) {
          setShowNudge(true);
        }
      }
    }, 100);
  };

  return (
    <>
      <button
        onClick={handleClick}
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

      {/* 事前案内: 印刷ダイアログでの保存方法 */}
      {showHowTo && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHowTo(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-base font-bold text-gray-900 mb-2">
                PDF として保存する方法
              </h3>
              <ol className="text-sm text-gray-700 leading-relaxed space-y-2 list-decimal pl-5 mb-4">
                <li>次の画面で「印刷」ダイアログが開きます</li>
                <li>
                  送信先（プリンタ）欄で <strong>「PDFとして保存」</strong> または
                  <strong>「PDFに保存」</strong> を選択
                </li>
                <li>右下の「保存」をクリックして PDF ファイルを保存</li>
              </ol>
              <div className="bg-kenmitsu-navy50 border border-kenmitsu-navy100 rounded-lg p-3 text-xs text-kenmitsu-navy leading-relaxed">
                💡 「プリンタに印刷」ではなく必ず{" "}
                <strong>「PDFとして保存」</strong> を選んでください。
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-2">
              <button
                onClick={() => setShowHowTo(false)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-2.5 rounded-lg"
              >
                キャンセル
              </button>
              <button
                onClick={startPrint}
                className="flex-1 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-2.5 rounded-lg"
              >
                印刷ダイアログを開く
              </button>
            </div>
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
