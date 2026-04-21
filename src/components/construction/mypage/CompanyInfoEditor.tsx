"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Save,
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
};

export default function CompanyInfoEditor() {
  const toast = useToast();
  const [info, setInfo] = useState<ConstructionCompanyInfo>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const onSyncError = useCallback(
    (msg: string) => toast.error(msg),
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
