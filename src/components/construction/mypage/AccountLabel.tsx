import type { Plan } from "@/lib/supabase/types";

interface Props {
  email: string;
  plan: Plan;
  companyInfo: Record<string, unknown> | null | undefined;
}

/**
 * ヘッダーに表示するアカウント識別ラベル。
 * - 社名が登録されていれば社名を主表示、メールは title 属性にフォールバック
 * - Team プランで担当者名も登録されていれば「社名 / 担当者名」の形
 * - 社名未登録なら email を表示（下位互換）
 */
export default function AccountLabel({ email, plan, companyInfo }: Props) {
  const companyName =
    typeof companyInfo?.companyName === "string"
      ? companyInfo.companyName.trim()
      : "";
  const companyContact =
    typeof companyInfo?.companyContact === "string"
      ? companyInfo.companyContact.trim()
      : "";

  const showContact = plan === "team" && companyContact.length > 0;
  const primary = companyName || email;

  return (
    <span
      className="hidden sm:inline text-xs text-gray-600 truncate max-w-[260px]"
      title={email}
    >
      <span className="font-medium">{primary}</span>
      {showContact && (
        <span className="text-gray-400"> / {companyContact}</span>
      )}
    </span>
  );
}
