"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Save,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  getSavedConstructionCompanyInfo,
  saveConstructionCompanyInfo,
  ConstructionCompanyInfo,
} from "@/hooks/useConstructionCompanyInfo";
import { useMasterSync } from "@/hooks/useMasterSync";
import { useToast } from "@/components/construction/Toast";

const EMPTY: ConstructionCompanyInfo = {
  companyName: "",
  companyContact: "",
  companyZip: "",
  companyAddress: "",
  companyTel: "",
  companyEmail: "",
  companyRegistrationNumber: "",
  constructionLicenseNumber: "",
  logoDataUrl: "",
  sealDataUrl: "",
};

// 入力ファイルの許容上限。リサイズ前のチェック用（大きすぎる画像の取り込みを抑える）
const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// リサイズ後の最大長辺（見積書 PDF 上で十分な解像度）
const LOGO_MAX_SIDE = 600;
const SEAL_MAX_SIDE = 300;

/**
 * 画像を canvas で縮小して data URL に変換する。
 * 透明背景 PNG 入力時は PNG で維持、それ以外は JPEG に変換して容量削減。
 */
async function resizeImageToDataUrl(
  file: File,
  maxSide: number
): Promise<string> {
  const srcUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("ファイル読み込み失敗"));
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("画像のデコードに失敗"));
    i.src = srcUrl;
  });

  const longest = Math.max(img.width, img.height);
  const scale = longest > maxSide ? maxSide / longest : 1;
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas コンテキストが取得できません");
  ctx.drawImage(img, 0, 0, w, h);

  // 透明背景維持のため PNG 入力は PNG で出力、それ以外は JPEG 0.85
  const isPng = file.type === "image/png";
  return canvas.toDataURL(
    isPng ? "image/png" : "image/jpeg",
    isPng ? undefined : 0.85
  );
}

export default function CompanyInfoEditor() {
  const toast = useToast();
  const [info, setInfo] = useState<ConstructionCompanyInfo>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);

  const onSyncError = useCallback(
    (msg: string) => toast.error(`同期エラー: ${msg}`),
    [toast]
  );
  useMasterSync(true, onSyncError);

  useEffect(() => {
    const saved = getSavedConstructionCompanyInfo();
    if (saved) setInfo({ ...EMPTY, ...saved });
    setLoaded(true);
  }, []);

  const update = <K extends keyof ConstructionCompanyInfo>(
    key: K,
    value: ConstructionCompanyInfo[K]
  ) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (
    key: "logoDataUrl" | "sealDataUrl",
    file: File | null
  ) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("画像ファイルを選択してください");
      return;
    }
    if (file.size > MAX_UPLOAD_FILE_SIZE) {
      toast.error(
        `画像サイズは ${MAX_UPLOAD_FILE_SIZE / 1024 / 1024}MB 以下にしてください`
      );
      return;
    }
    try {
      const maxSide = key === "logoDataUrl" ? LOGO_MAX_SIDE : SEAL_MAX_SIDE;
      const dataUrl = await resizeImageToDataUrl(file, maxSide);
      update(key, dataUrl);
    } catch {
      toast.error("画像の処理に失敗しました。別の画像でお試しください。");
    }
  };

  const save = async () => {
    if (!info.companyName.trim()) {
      toast.error("会社名・屋号を入力してください");
      return;
    }
    setSaving(true);
    try {
      saveConstructionCompanyInfo(info);
      setLastSavedAt(Date.now());
      toast.success("自社情報を保存しました");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link
        href="/construction/mypage"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.25} />
        マイページに戻る
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-kenmitsu-navy50 flex items-center justify-center">
            <Building2
              className="w-5 h-5 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">自社情報</h1>
            <p className="text-[11px] text-gray-500 mt-0.5">
              見積書の「発行者」欄に自動入力されます
            </p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <Field
            label="会社名・屋号"
            required
            value={info.companyName}
            onChange={(v) => update("companyName", v)}
            placeholder="例: 山田建設"
          />
          <Field
            label="部署・担当者名"
            value={info.companyContact}
            onChange={(v) => update("companyContact", v)}
            placeholder="例: 代表取締役 山田 太郎"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              label="郵便番号"
              value={info.companyZip}
              onChange={(v) => update("companyZip", v)}
              placeholder="123-4567"
            />
            <div className="sm:col-span-2">
              <Field
                label="住所"
                value={info.companyAddress}
                onChange={(v) => update("companyAddress", v)}
                placeholder="東京都千代田区..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="電話番号"
              value={info.companyTel}
              onChange={(v) => update("companyTel", v)}
              placeholder="03-1234-5678"
              type="tel"
            />
            <Field
              label="メール"
              value={info.companyEmail}
              onChange={(v) => update("companyEmail", v)}
              placeholder="info@example.com"
              type="email"
            />
          </div>

          <Field
            label="適格請求書発行事業者登録番号"
            value={info.companyRegistrationNumber}
            onChange={(v) => update("companyRegistrationNumber", v)}
            placeholder="T1234567890123"
            hint="インボイス対応の場合のみ入力"
          />

          <Field
            label="建設業許可番号"
            value={info.constructionLicenseNumber}
            onChange={(v) => update("constructionLicenseNumber", v)}
            placeholder="例: 東京都知事許可（般-XX）第XXXXXX号"
            hint="許可を受けている場合のみ入力"
          />

          <ImageField
            label="ロゴ画像"
            hint="PNG / JPEG・5MB まで。選択後に自動で縮小・圧縮されます"
            dataUrl={info.logoDataUrl}
            inputRef={logoInputRef}
            onSelect={(f) => handleImageUpload("logoDataUrl", f)}
            onRemove={() => update("logoDataUrl", "")}
          />
          <ImageField
            label="印影画像"
            hint="背景透過 PNG 推奨・5MB まで。選択後に自動で縮小されます"
            dataUrl={info.sealDataUrl}
            inputRef={sealInputRef}
            onSelect={(f) => handleImageUpload("sealDataUrl", f)}
            onRemove={() => update("sealDataUrl", "")}
          />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500">
            {lastSavedAt ? (
              <span className="inline-flex items-center gap-1 text-kenmitsu-ok">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                保存しました
              </span>
            ) : (
              "変更はサーバーに自動同期されます（3秒）"
            )}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
            ) : (
              <Save className="w-4 h-4" strokeWidth={2.25} />
            )}
            保存する
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
      />
      {hint && <p className="text-[11px] text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function ImageField({
  label,
  hint,
  dataUrl,
  inputRef,
  onSelect,
  onRemove,
}: {
  label: string;
  hint?: string;
  dataUrl: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onSelect: (file: File | null) => void;
  onRemove: () => void;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 rounded-lg border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt={label}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <ImageIcon
              className="w-6 h-6 text-gray-300"
              strokeWidth={2}
            />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              {dataUrl ? "画像を差し替える" : "画像を選択"}
            </button>
            {dataUrl && (
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center gap-1 text-xs text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-md"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                削除
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              onSelect(e.target.files?.[0] ?? null);
              e.target.value = "";
            }}
          />
          {hint && <p className="text-[11px] text-gray-500">{hint}</p>}
        </div>
      </div>
    </div>
  );
}
