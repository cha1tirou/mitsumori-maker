"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  Loader2,
  X,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Crown,
} from "lucide-react";
import {
  ConstructionQuoteData,
  ConstructionSection,
  ConstructionItem,
  CostCategory,
} from "@/types/construction";

interface Props {
  open: boolean;
  onClose: () => void;
  currentData: ConstructionQuoteData;
  onApply: (data: ConstructionQuoteData) => void;
}

interface ExtractedData {
  subject?: string;
  siteAddress?: string;
  notes?: string;
  sections?: {
    name: string;
    items: {
      name: string;
      quantity: number;
      unit: string;
      unitPrice: number;
      category: CostCategory;
    }[];
  }[];
  confidence?: "high" | "medium" | "low";
  notes_for_user?: string;
}

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AiTakeoffDialog({
  open,
  onClose,
  currentData,
  onApply,
}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error" | "paywall" | "limit"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [extracted, setExtracted] = useState<ExtractedData | null>(null);
  const [mergeMode, setMergeMode] = useState<"append" | "replace">("append");

  if (!open) return null;

  const handleFile = (f: File | null) => {
    setFile(f);
    setExtracted(null);
    setStatus("idle");
  };

  const submit = async () => {
    if (!file) return;
    setStatus("uploading");
    setErrorMessage("");
    setExtracted(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (note) fd.append("note", note);
      const res = await fetch("/api/ai-takeoff", {
        method: "POST",
        body: fd,
      });
      if (res.status === 401) {
        setStatus("error");
        setErrorMessage("ログインが必要です。");
        setTimeout(() => {
          router.push("/construction/login?redirect=/construction/new");
        }, 1500);
        return;
      }
      if (res.status === 402) {
        const json = await res.json();
        setStatus(json.plan === "free" ? "paywall" : "limit");
        setErrorMessage(json.message || "利用上限に達しました。");
        return;
      }
      if (res.status === 503) {
        setStatus("error");
        setErrorMessage("AI積算機能は現在準備中です。");
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error || "処理に失敗しました。");
        return;
      }
      setExtracted(json.data);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("通信エラーが発生しました。");
    }
  };

  const apply = () => {
    if (!extracted || !extracted.sections) return;
    const newSections: ConstructionSection[] = extracted.sections.map((s) => ({
      id: newId("section"),
      name: s.name,
      items: s.items.map<ConstructionItem>((it) => ({
        id: newId("item"),
        name: it.name,
        quantity: Number(it.quantity) || 0,
        unit: it.unit || "式",
        unitPrice: Number(it.unitPrice) || 0,
        category: ["labor", "material", "outsourcing", "other"].includes(
          it.category
        )
          ? it.category
          : "other",
      })),
    }));

    const next: ConstructionQuoteData = {
      ...currentData,
      subject: extracted.subject || currentData.subject,
      siteAddress: extracted.siteAddress || currentData.siteAddress,
      notes:
        extracted.notes && extracted.notes.length > 0
          ? `${currentData.notes}${currentData.notes ? "\n\n" : ""}${extracted.notes}`
          : currentData.notes,
      sections:
        mergeMode === "replace"
          ? newSections
          : [
              ...(currentData.sections[0]?.items[0]?.name ||
              currentData.sections[0]?.items[0]?.unitPrice
                ? currentData.sections
                : []),
              ...newSections,
            ],
    };
    onApply(next);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" strokeWidth={2.25} />
              <div>
                <h3 className="text-sm font-bold">AI積算（β）</h3>
                <p className="text-[11px] opacity-90">
                  図面PDF・見積書画像から明細を自動抽出
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {status !== "success" && (
            <div className="p-5 space-y-4">
              {status === "paywall" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
                  <div className="flex items-start gap-2">
                    <Crown className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" strokeWidth={2.25} />
                    <div>
                      <p className="font-bold mb-1">無料枠を使い切りました</p>
                      <p className="text-xs mb-2">{errorMessage}</p>
                      <Link
                        href="/construction#pricing"
                        className="inline-block bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-4 py-2 rounded-md"
                      >
                        Soloプランを見る →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {status === "limit" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
                  <p className="font-bold mb-1">今月の利用上限に達しました</p>
                  <p className="text-xs">{errorMessage}</p>
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2.25} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  PDF（図面・既存の見積書） / 画像（JPG・PNG・GIF・WebP）をアップロード。10MB以下。
                </p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-xl py-8 px-4 flex flex-col items-center justify-center gap-2 transition-colors ${
                    file
                      ? "border-kenmitsu-ok bg-kenmitsu-okBg/50"
                      : "border-gray-300 hover:border-purple-500 hover:bg-purple-50/40"
                  }`}
                >
                  {file ? (
                    <>
                      <FileText className="w-8 h-8 text-kenmitsu-ok" strokeWidth={2} />
                      <p className="text-sm font-bold text-gray-900">{file.name}</p>
                      <p className="text-[11px] text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-[11px] text-kenmitsu-navy underline">
                        別のファイルを選ぶ
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400" strokeWidth={2} />
                      <p className="text-sm font-bold text-gray-700">
                        ファイルを選択
                      </p>
                      <p className="text-[11px] text-gray-500">
                        PDF / JPG / PNG / GIF / WebP
                      </p>
                    </>
                  )}
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>

              <div>
                <label className="block">
                  <span className="text-xs text-gray-600 mb-1 block">
                    補足情報（任意）
                  </span>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    placeholder="例：電気工事のみ抽出 / 2階部分のみ / 単価は抽出不要"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </label>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-[11px] text-gray-600 leading-relaxed">
                <p className="font-bold mb-1">⚠️ 重要な注意事項</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>AIの抽出結果は必ず目視でご確認ください</li>
                  <li>単価は業界標準値の推定であり、実勢価格と乖離する可能性があります</li>
                  <li>数量の拾い漏れ・重複がある場合があります</li>
                  <li>無料プランは月1回、Soloプラン以上で月10回まで利用可</li>
                </ul>
              </div>
            </div>
          )}

          {status === "success" && extracted && (
            <div className="p-5 space-y-4">
              <div className="bg-kenmitsu-okBg border border-kenmitsu-ok/30 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-kenmitsu-ok shrink-0 mt-0.5" strokeWidth={2.25} />
                <div className="text-sm text-kenmitsu-ok">
                  <p className="font-bold mb-1">抽出完了</p>
                  {extracted.confidence && (
                    <p className="text-xs">
                      抽出信頼度:{" "}
                      <span className="font-bold">
                        {extracted.confidence === "high"
                          ? "高"
                          : extracted.confidence === "medium"
                          ? "中"
                          : "低（要確認）"}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {extracted.notes_for_user && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                  <p className="font-bold mb-1">AIからの補足：</p>
                  <p className="whitespace-pre-wrap">{extracted.notes_for_user}</p>
                </div>
              )}

              {/* 抽出結果プレビュー */}
              <div className="space-y-3">
                {extracted.subject && (
                  <InfoRow label="工事名" value={extracted.subject} />
                )}
                {extracted.siteAddress && (
                  <InfoRow label="工事場所" value={extracted.siteAddress} />
                )}
                {extracted.sections?.map((s, i) => {
                  let subtotal = 0;
                  s.items.forEach((it) => {
                    subtotal += (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0);
                  });
                  return (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-gray-900">
                          ■ {s.name}
                        </p>
                        <p className="text-xs font-bold text-kenmitsu-navy">
                          ¥{subtotal.toLocaleString()}
                        </p>
                      </div>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {s.items.map((it, j) => (
                          <li key={j} className="flex justify-between gap-2">
                            <span className="truncate">
                              {it.name}{" "}
                              <span className="text-gray-400">
                                ({it.quantity} {it.unit} × ¥{Number(it.unitPrice).toLocaleString()})
                              </span>
                            </span>
                            <span className="font-medium shrink-0">
                              ¥
                              {(
                                (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0)
                              ).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* 適用方法 */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-700 mb-2">
                  既存の明細とどう合成しますか？
                </p>
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="mergeMode"
                      value="append"
                      checked={mergeMode === "append"}
                      onChange={() => setMergeMode("append")}
                      className="peer sr-only"
                    />
                    <div className="text-center border-2 border-gray-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 rounded-lg py-2 text-xs font-bold text-gray-700">
                      セクションとして追加
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="mergeMode"
                      value="replace"
                      checked={mergeMode === "replace"}
                      onChange={() => setMergeMode("replace")}
                      className="peer sr-only"
                    />
                    <div className="text-center border-2 border-gray-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 rounded-lg py-2 text-xs font-bold text-gray-700">
                      既存を全て置換
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-white"
          >
            キャンセル
          </button>
          {status !== "success" ? (
            <button
              onClick={submit}
              disabled={!file || status === "uploading"}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white text-sm font-bold py-2.5 rounded-lg"
            >
              {status === "uploading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                  AI解析中... (最大60秒)
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                  AIで解析する
                </>
              )}
            </button>
          ) : (
            <button
              onClick={apply}
              className="flex-1 flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold py-2.5 rounded-lg"
            >
              <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
              この内容で明細を反映
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 text-xs">
      <span className="text-gray-500 w-16 shrink-0">{label}</span>
      <span className="text-gray-900 flex-1">{value}</span>
    </div>
  );
}
