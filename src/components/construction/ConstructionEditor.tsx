"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ConstructionQuoteData,
  defaultConstructionQuoteData,
} from "@/types/construction";
import { runConstructionLawChecks } from "@/lib/constructionLawChecker";
import { trackConversion, trackEvent } from "@/lib/analytics";
import { useDraftSave } from "@/hooks/useDraftSave";
import { useMasterSync } from "@/hooks/useMasterSync";
import ConstructionForm from "@/components/construction/ConstructionForm";
import ConstructionPreview from "@/components/construction/ConstructionPreview";
import LawCheckPanel from "@/components/construction/LawCheckPanel";
import DraftBanner from "@/components/DraftBanner";
import OnboardingModal from "@/components/construction/OnboardingModal";
import {
  HardHat,
  Eye,
  FileEdit,
  User,
  LogIn,
  CircleUser,
  AlertTriangle,
  Shield,
} from "lucide-react";

const ConstructionPdfDownloadButton = dynamic(
  () => import("@/components/construction/ConstructionPdfDownloadButton"),
  { ssr: false }
);
const SaveQuoteButton = dynamic(
  () => import("@/components/construction/SaveQuoteButton"),
  { ssr: false }
);

interface Props {
  initialData?: ConstructionQuoteData;
  quoteId?: string;
  userEmail?: string | null;
  plan?: "free" | "solo" | "team";
}

const DRAFT_KEY_NEW = "mitsumori-construction-draft-v1";

export default function ConstructionEditor({
  initialData,
  quoteId,
  userEmail,
  plan = "free",
}: Props) {
  const router = useRouter();
  const isEdit = Boolean(quoteId);
  const hasStartedRef = useRef(false);
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  // 未保存変更フラグ。保存成功 / 下書きクリア時に false に戻す。
  // beforeunload 警告のために使う（QAバグ #11）
  const [isDirty, setIsDirty] = useState(false);

  // Solo / Team 限定: 改正建設業法 対応版の労務費比率（PDF 内訳サマリーに反映）。
  // セッション内のみ保持。既定 60%（一人親方の標準的な比率）。
  const [laborCostRatio, setLaborCostRatio] = useState(0.6);
  const isLawCompliant = plan === "solo" || plan === "team";

  // 新規作成時のみ下書き保存を有効化。編集モードではサーバーのデータを正とする
  const draft = useDraftSave<ConstructionQuoteData>({
    key: DRAFT_KEY_NEW,
    version: 2,
    defaultData: initialData ?? defaultConstructionQuoteData,
  });

  const [editData, setEditData] = useState<ConstructionQuoteData>(
    initialData ?? defaultConstructionQuoteData
  );

  const data = isEdit ? editData : draft.data;
  const setData = isEdit ? setEditData : draft.setData;

  const lawChecks = useMemo(() => runConstructionLawChecks(data), [data]);

  // ログインユーザーの自社情報・マスタをサーバーと自動同期
  useMasterSync(Boolean(userEmail));

  const handleDataChange = (next: ConstructionQuoteData) => {
    if (!hasStartedRef.current && !isEdit) {
      const hasInput =
        next.clientName ||
        next.subject ||
        next.companyName ||
        next.sections.some((s) =>
          s.items.some((i) => i.name || i.unitPrice > 0)
        );
      if (hasInput) {
        hasStartedRef.current = true;
        trackConversion("construction_tool_start");
      }
    }
    setData(next);
    setIsDirty(true);
  };

  // beforeunload: 未保存変更がある時はブラウザの離脱確認ダイアログを出す（QAバグ #11）
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Chrome は returnValue が truthy なら確認ダイアログを出す（文言は現代ブラウザ固定）
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  useEffect(() => {
    // 編集モードでは initialData を state に反映
    if (isEdit && initialData) {
      setEditData(initialData);
    }
  }, [isEdit, initialData]);

  const handleSaved = () => {
    if (!isEdit) {
      // 新規作成後は下書きクリア
      draft.clearDraft();
    }
    setIsDirty(false);
  };

  const planLabel =
    plan === "solo" ? "Solo" : plan === "team" ? "Team" : "Free";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 印刷CSS は globals.css の @media print 参照 */}
      {/* 初回オンボーディング */}
      {!isEdit && <OnboardingModal />}
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={userEmail ? "/construction/mypage" : "/construction"}
            className="flex items-center gap-2 text-sm font-bold text-gray-900"
          >
            <HardHat className="w-5 h-5 text-kenmitsu-navy" strokeWidth={2.25} />
            <span className="hidden sm:inline">
              ケンミツ <span className="text-kenmitsu-navy">| 建設業の見積書</span>
            </span>
            <span className="sm:hidden">建設業見積</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="lg:hidden flex items-center bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setMobileView("form")}
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-md transition-colors ${
                  mobileView === "form"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" strokeWidth={2.25} />
                入力
              </button>
              <button
                onClick={() => setMobileView("preview")}
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-md transition-colors ${
                  mobileView === "preview"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <Eye className="w-3.5 h-3.5" strokeWidth={2.25} />
                プレビュー
              </button>
            </div>
            {userEmail ? (
              <Link
                href="/construction/mypage"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 px-2.5 py-1.5 rounded-lg hover:bg-gray-100"
                title={userEmail}
              >
                <CircleUser className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2} />
                <span className="font-bold">{planLabel}</span>
                <span className="text-gray-400">プラン</span>
              </Link>
            ) : (
              <Link
                href={`/construction/login?redirect=${encodeURIComponent(
                  isEdit ? `/construction/quotes/${quoteId}` : "/construction/new"
                )}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-kenmitsu-navy px-2.5 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <LogIn className="w-4 h-4" strokeWidth={2.25} />
                ログイン
              </Link>
            )}
          </div>
        </div>
      </header>


      {/* Free プラン: 改正建設業法対応バナー（Solo 課金導線） */}
      {plan === "free" && (
        <div className="bg-amber-50 border-b border-amber-200">
          <Link
            href="/construction"
            onClick={() => trackEvent("construction_law_banner_click")}
            className="block hover:bg-amber-100/60 transition-colors"
          >
            <div className="max-w-7xl mx-auto px-4 py-2.5 text-[12px] text-amber-900 flex items-center gap-2">
              <AlertTriangle
                className="w-4 h-4 shrink-0 text-amber-700"
                strokeWidth={2.25}
              />
              <span className="flex-1 font-bold leading-snug">
                改正建設業法 2025、対応しなくて大丈夫ですか？
                <span className="ml-2 font-normal text-amber-800">
                  この見積書を改正法対応版にする →
                </span>
              </span>
            </div>
          </Link>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex gap-6">
          <div
            className={`w-full lg:w-[460px] lg:flex-shrink-0 ${
              mobileView === "preview" ? "hidden lg:block" : ""
            }`}
          >
            <div className="lg:sticky lg:top-[80px] lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto lg:pr-2">
              {!isEdit && draft.hasDraft && (
                <DraftBanner
                  onRestore={draft.restoreDraft}
                  onDiscard={draft.discardDraft}
                />
              )}
              {isEdit && (
                <div className="mb-4 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                  <FileEdit
                    className="w-4 h-4 text-blue-700 shrink-0 mt-0.5"
                    strokeWidth={2.25}
                  />
                  <span>
                    保存済みの見積書を編集中です。「見積書を保存」で上書きされます。
                  </span>
                </div>
              )}
              <ConstructionForm
                data={data}
                onChange={handleDataChange}
                plan={plan}
              />

              <div className="mt-5 space-y-2">
                {/*
                  ボタン配列の順序ポリシー:
                  1. PDF ダウンロード（Primary CTA・全員）
                  2. 課金/登録誘導カード（Free/未ログインのみ。PDFを撮った直後の熱量を逃さない）
                  3. 見積書を保存（ログイン済み）
                  4. Solo 以上機能（CSV・メール）
                  5. マイページ
                */}

                {/* 1. PDF出力: 全ユーザー */}
                <ConstructionPdfDownloadButton
                  data={data}
                  plan={plan}
                  className="w-full"
                />

                {/* 2a. 未ログイン: 登録誘導カード（PDFダウンロード直後に露出） */}
                {!userEmail && (
                  <Link
                    href={`/construction/start?redirect=${encodeURIComponent(
                      isEdit
                        ? `/construction/quotes/${quoteId}`
                        : "/construction/new",
                    )}`}
                    className="relative block w-full rounded-xl border-2 border-kenmitsu-navy bg-gradient-to-br from-kenmitsu-navy50 to-white p-4 hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-kenmitsu-navy text-white text-[10px] font-bold px-2 py-0.5">
                          無料登録
                        </span>
                        <span className="text-[10px] text-kenmitsu-navy font-bold">
                          所要30秒・カード不要
                        </span>
                      </div>
                      <p className="text-sm font-black text-kenmitsu-navy mb-1 leading-tight">
                        見積書をクラウドに保存して、いつでも編集・再出力
                      </p>
                      <p className="text-[11px] text-kenmitsu-muted leading-relaxed">
                        無料登録で見積書は無制限に保存・編集・複製可能。顧客別の履歴管理や Excel インポートにも対応。
                      </p>
                    </div>
                  </Link>
                )}

                {/* 2b. Free プラン: Solo アップグレード誘導カード（PDFダウンロード直後に露出） */}
                {userEmail && plan === "free" && (
                  <Link
                    href="/construction#pricing"
                    className="relative block w-full rounded-xl border-2 border-kenmitsu-orange bg-gradient-to-br from-kenmitsu-orange50 to-white p-4 hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-kenmitsu-orange text-white text-[10px] font-bold px-2 py-0.5">
                          Solo
                        </span>
                        <span className="font-mono text-lg font-black text-kenmitsu-orange600 leading-none">
                          ¥980
                        </span>
                        <span className="text-[11px] text-kenmitsu-muted">
                          /月
                        </span>
                        <span className="text-[10px] text-kenmitsu-muted ml-auto">
                          年払いで2ヶ月分お得
                        </span>
                      </div>
                      <p className="text-sm font-black text-gray-900 mb-1.5 leading-tight">
                        改正建設業法 2025 対応版で出力できるように
                      </p>
                      <p className="text-[10px] text-kenmitsu-muted mb-2 leading-relaxed">
                        ¥1,000 台で改正法対応の見積書を出せるのはケンミツだけ。
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10.5px] text-gray-700 leading-relaxed">
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          改正法対応 PDF
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          労務費・法定福利費の内訳明示
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          顧客・単価マスタ
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          原価・粗利分析
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          工事写真の添付
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* 3. 見積書を保存: ログイン済みのみ（全プラン無制限） */}
                {userEmail && (
                  <SaveQuoteButton
                    data={data}
                    quoteId={quoteId}
                    className="w-full"
                    onSaved={handleSaved}
                  />
                )}

                {/* マイページ: ログイン済みのみ */}
                {userEmail && (
                  <Link
                    href="/construction/mypage"
                    className="flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-gray-700 py-1"
                  >
                    <User className="w-3.5 h-3.5" strokeWidth={2.25} />
                    マイページを開く
                  </Link>
                )}
{!isEdit && data.sections.some((s) => s.items.some((i) => i.name)) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("現在の入力内容を破棄して新しい見積書を作成しますか？")) {
                        draft.discardDraft();
                        draft.setData(defaultConstructionQuoteData);
                        router.refresh();
                      }
                    }}
                    className="w-full text-xs text-gray-400 hover:text-gray-600 py-1"
                  >
                    新しい見積書に切り替える
                  </button>
                )}
              </div>
            </div>
          </div>

          <div
            className={`flex-1 min-w-0 ${
              mobileView === "form" ? "hidden lg:block" : ""
            }`}
          >
            <div className="lg:sticky lg:top-[80px] space-y-4">
              {/* 改正建設業法チェッカーは Solo / Team 限定機能 */}
              {isLawCompliant && <LawCheckPanel results={lawChecks} />}
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Preview
                </p>
                <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  A4サイズ
                </span>
              </div>
              {/* Solo / Team 限定: 改正法対応 PDF の労務費比率コントロール */}
              {isLawCompliant && (
                <div className="bg-kenmitsu-navy50 border border-kenmitsu-navy/20 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Shield
                        className="w-4 h-4 text-kenmitsu-navy"
                        strokeWidth={2.25}
                      />
                      <span className="text-xs font-bold text-kenmitsu-navy">
                        改正建設業法 2025 対応版
                      </span>
                    </div>
                    <label className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="whitespace-nowrap">労務費比率</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={Math.round(laborCostRatio * 100)}
                        onChange={(e) =>
                          setLaborCostRatio(Number(e.target.value) / 100)
                        }
                        className="w-24 accent-kenmitsu-navy"
                        aria-label="労務費比率"
                      />
                      <span className="font-mono font-bold text-kenmitsu-navy w-10 text-right">
                        {Math.round(laborCostRatio * 100)}%
                      </span>
                    </label>
                  </div>
                  <p className="text-[10px] text-gray-600 mt-1.5 leading-relaxed">
                    工事原価のうち労務費が占める割合。法定福利費（労務費 × 14.6%）の自動算出に使用し、PDF 末尾に内訳明示として印字されます。
                  </p>
                </div>
              )}

              <div className="printable-root">
                <ConstructionPreview
                  data={data}
                  lawCompliantSummary={isLawCompliant ? laborCostRatio : null}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
