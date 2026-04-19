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
}

const DRAFT_KEY_NEW = "mitsumori-construction-draft-v1";

export default function ConstructionEditor({
  initialData,
  quoteId,
  userEmail,
  plan = "free",
  remainingFree,
}: Props) {
  const router = useRouter();
  const isEdit = Boolean(quoteId);
  const hasStartedRef = useRef(false);
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  // 未保存変更フラグ。保存成功 / 下書きクリア時に false に戻す。
  // beforeunload 警告のために使う（QAバグ #11）
  const [isDirty, setIsDirty] = useState(false);

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
            <ConstructionPdfDownloadButton
              data={data}
              plan={plan}
              isAuthenticated={Boolean(userEmail)}
              className="!py-2 !px-3 !text-xs"
            />
          </div>
        </div>
      </header>


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
                  isAuthenticated={Boolean(userEmail)}
                  className="w-full"
                />

                {/* 2a. 未ログイン: 登録誘導カード（PDFダウンロード直後に露出） */}
                {!userEmail && (
                  <Link
                    href={`/construction/login?redirect=${encodeURIComponent(
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
                        見積書を保存して、いつでも編集・再出力
                      </p>
                      <p className="text-[11px] text-kenmitsu-muted leading-relaxed">
                        月3通まで無料でクラウド保存。顧客別の履歴管理・Excelインポート・過去見積の複製も利用可。
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
                        透かしを消して、取引先に出せる正式版にする
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10.5px] text-gray-700 leading-relaxed">
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          透かしなし PDF
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          会計ソフトCSV連携
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          顧客・単価マスタ
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          メール直接送信
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          原価・粗利分析
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-kenmitsu-ok">✓</span>
                          見積書の無制限保存
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* 3. 見積書を保存: ログイン済みのみ（Free は月3通制限、Solo/Team は無制限） */}
                {userEmail && (
                  <SaveQuoteButton
                    data={data}
                    quoteId={quoteId}
                    className="w-full"
                    onSaved={handleSaved}
                  />
                )}

                {/* 4. Solo / Team 専用: CSV出力・メール送信 */}
                {(plan === "solo" || plan === "team") && (
                  <>
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
