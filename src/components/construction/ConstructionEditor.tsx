"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import SendEmailDialog from "@/components/construction/SendEmailDialog";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ConstructionQuoteData,
  defaultConstructionQuoteData,
} from "@/types/construction";
import { runConstructionLawChecks } from "@/lib/constructionLawChecker";
import { trackConversion } from "@/lib/analytics";
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
  Lock,
  User,
  LogIn,
  CircleUser,
  AlertCircle,
  Mail,
} from "lucide-react";

const ConstructionPdfDownloadButton = dynamic(
  () => import("@/components/construction/ConstructionPdfDownloadButton"),
  { ssr: false }
);
const SaveQuoteButton = dynamic(
  () => import("@/components/construction/SaveQuoteButton"),
  { ssr: false }
);
const ConvertButtons = dynamic(
  () => import("@/components/construction/ConvertButtons"),
  { ssr: false }
);
const AccountingCsvButton = dynamic(
  () => import("@/components/construction/AccountingCsvButton"),
  { ssr: false }
);

interface Props {
  initialData?: ConstructionQuoteData;
  quoteId?: string;
  userEmail?: string | null;
  plan?: "free" | "solo" | "team";
  remainingFree?: number | null;
  trialDaysRemaining?: number | null;
}

const DRAFT_KEY_NEW = "mitsumori-construction-draft-v1";

export default function ConstructionEditor({
  initialData,
  quoteId,
  userEmail,
  plan = "free",
  trialDaysRemaining: trialDays,
  remainingFree,
}: Props) {
  const router = useRouter();
  const isEdit = Boolean(quoteId);
  const hasStartedRef = useRef(false);
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

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
  };

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
            <ConstructionPdfDownloadButton
              data={data}
              plan={plan}
              isAuthenticated={Boolean(userEmail)}
              className="!py-2 !px-3 !text-xs"
            />
          </div>
        </div>
      </header>

      {/* トライアルバナー */}
      {typeof trialDays === "number" && trialDays > 0 && (
        <div className="bg-kenmitsu-navy text-white">
          <div className="max-w-7xl mx-auto px-4 py-2 text-xs font-medium flex items-center justify-between">
            <span>
              Solo全機能を無料体験中 — 残り{trialDays}日（透かしなしPDF・無制限保存・メール送信）
            </span>
            <Link
              href="/construction#pricing"
              className="shrink-0 bg-white text-kenmitsu-navy font-bold px-3 py-1 rounded text-xs hover:bg-kenmitsu-navy50 transition-colors"
            >
              Soloプランに切り替え
            </Link>
          </div>
        </div>
      )}

      {/* 使用量アラート（無料・残少ない時のみ） */}
      {userEmail && plan === "free" && typeof remainingFree === "number" && (
        <UsageAlert remaining={remainingFree} />
      )}

      {/* 未ログイン or Freeプラン：透かし案内バナー */}
      {(plan === "free") && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 py-2 text-[11px] text-amber-900 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
            <span className="flex-1">
              無料版：PDFに「SAMPLE」透かしが入ります。取引先に提出する正式版は
              <Link
                href="/construction#pricing"
                className="mx-1 font-bold underline hover:text-amber-700"
              >
                Soloプラン（月¥980）
              </Link>
              で透かしを削除できます。
            </span>
          </div>
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
              <ConstructionForm data={data} onChange={handleDataChange} />

              <div className="mt-5 space-y-2">
                {/* PDF出力: 全ユーザー */}
                <ConstructionPdfDownloadButton
                  data={data}
                  plan={plan}
                  isAuthenticated={Boolean(userEmail)}
                  className="w-full"
                />

                {/* 見積書を保存: ログイン済みのみ（Free は月3通制限、Solo/Team は無制限） */}
                {userEmail && (
                  <SaveQuoteButton
                    data={data}
                    quoteId={quoteId}
                    className="w-full"
                    onSaved={handleSaved}
                  />
                )}

                {/* 以下は Solo / Team のみ。Free・未ログインでは非表示にして UI をシンプルに */}
                {(plan === "solo" || plan === "team") && (
                  <>
                    <ConvertButtons data={data} />
                    <AccountingCsvButton data={data} />
                    <button
                      onClick={() => setEmailDialogOpen(true)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" strokeWidth={2.5} />
                      メールで送信
                    </button>
                  </>
                )}

                {/* 未ログイン: 登録誘導（Free プランへの小さな入口） */}
                {!userEmail && (
                  <Link
                    href={`/construction/login?redirect=${encodeURIComponent(
                      isEdit
                        ? `/construction/quotes/${quoteId}`
                        : "/construction/new",
                    )}`}
                    className="block w-full rounded-lg border-2 border-dashed border-kenmitsu-navy100 bg-white hover:bg-kenmitsu-navy50 p-3 text-center transition-colors"
                  >
                    <p className="text-xs font-bold text-kenmitsu-navy mb-0.5">
                      無料登録で見積書を保存できます
                    </p>
                    <p className="text-[10px] text-kenmitsu-muted">
                      月3通までクラウド保存・履歴から再編集OK
                    </p>
                  </Link>
                )}

                {/* Free プラン: Solo アップグレード誘導 */}
                {userEmail && plan === "free" && (
                  <Link
                    href="/construction#pricing"
                    className="block w-full rounded-lg border-2 border-dashed border-kenmitsu-orange/60 bg-white hover:bg-kenmitsu-orange50 p-3 text-center transition-colors"
                  >
                    <p className="text-xs font-bold text-kenmitsu-orange600 mb-0.5">
                      Soloプラン（月¥980）で全機能を解放
                    </p>
                    <p className="text-[10px] text-kenmitsu-muted leading-relaxed">
                      透かしなしPDF・書類変換・CSV出力・メール送信・無制限保存
                    </p>
                  </Link>
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
              <LawCheckPanel results={lawChecks} />
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Preview
                </p>
                <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  A4サイズ
                </span>
              </div>
              <div className="printable-root">
                <ConstructionPreview
                  data={data}
                  watermark={plan !== "solo" && plan !== "team"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <SendEmailDialog
        open={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        data={data}
      />
    </div>
  );
}

function UsageAlert({ remaining }: { remaining: number }) {
  if (remaining > 1) {
    return (
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-2 text-[11px] text-blue-900 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
          <span>
            無料プラン: 今月の保存残り <strong>{remaining} 通</strong>
            です。Soloプラン（月¥980）で無制限＋履歴保存が可能。
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-amber-100 border-b border-amber-300">
      <div className="max-w-7xl mx-auto px-4 py-2 text-[11px] text-amber-900 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
        <span className="flex-1">
          {remaining === 0
            ? "無料プランの月間保存上限に達しました。"
            : "無料プランの月間保存残り 1 通です。"}
          <Link
            href="/construction#pricing"
            className="ml-1 font-bold underline hover:text-amber-700"
          >
            Soloプランで無制限に解除 →
          </Link>
        </span>
      </div>
    </div>
  );
}
