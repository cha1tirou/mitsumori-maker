"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/construction/Toast";
import {
  Lock,
  Mail,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";

interface Props {
  email: string;
  /**
   * 有料プラン契約中かつ Stripe サブスクが課金状態か。
   * true の時はアカウント削除をブロックして Stripe Customer Portal 経由の解約を促す。
   */
  hasActiveSubscription: boolean;
}

export default function AccountSettings({ email, hasActiveSubscription }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white rounded-2xl border border-gray-100">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6"
      >
        <h2 className="text-base font-bold text-gray-900">アカウント設定</h2>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-gray-100 pt-6">
          <ChangePassword />
          <hr className="border-gray-100" />
          <ChangeEmail currentEmail={email} />
          <hr className="border-gray-100" />
          <DeleteAccount hasActiveSubscription={hasActiveSubscription} />
        </div>
      )}
    </section>
  );
}

/* ─── パスワード変更 ─── */

function ChangePassword() {
  const toast = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("パスワードは6文字以上で設定してください。");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("パスワードを変更しました。");
      setNewPassword("");
    } catch {
      toast.error("パスワードの変更に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4 text-gray-500" strokeWidth={2} />
        <h3 className="text-sm font-bold text-gray-900">パスワード変更</h3>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={showPw ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="新しいパスワード（6文字以上）"
            minLength={6}
            required
            disabled={loading}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPw ? (
              <EyeOff className="w-4 h-4" strokeWidth={2} />
            ) : (
              <Eye className="w-4 h-4" strokeWidth={2} />
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-bold text-white bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
          ) : (
            "変更"
          )}
        </button>
      </div>
    </form>
  );
}

/* ─── メールアドレス変更 ─── */

function ChangeEmail({ currentEmail }: { currentEmail: string }) {
  const toast = useToast();
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || newEmail === currentEmail) {
      toast.error("現在と異なるメールアドレスを入力してください。");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(
        "確認メールを送信しました。新しいアドレスのメールを確認してください。"
      );
      setNewEmail("");
    } catch {
      toast.error("メールアドレスの変更に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-4 h-4 text-gray-500" strokeWidth={2} />
        <h3 className="text-sm font-bold text-gray-900">
          メールアドレス変更
        </h3>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        現在: {currentEmail}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="新しいメールアドレス"
          required
          disabled={loading}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-bold text-white bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
          ) : (
            "変更"
          )}
        </button>
      </div>
    </form>
  );
}

/* ─── アカウント削除 ─── */

function DeleteAccount({
  hasActiveSubscription,
}: {
  hasActiveSubscription: boolean;
}) {
  const router = useRouter();
  const toast = useToast();
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== "削除する") return;
    setLoading(true);
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        toast.error(json.message || json.error || "削除に失敗しました。");
        setLoading(false);
        return;
      }
      // ログアウト状態にしてトップに戻す
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/construction");
    } catch {
      toast.error("通信エラーが発生しました。");
      setLoading(false);
    }
  };

  // 有料サブスク契約中はアカウント削除をブロック（Stripe で先に解約する必要がある）
  if (hasActiveSubscription) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Trash2 className="w-4 h-4 text-red-500" strokeWidth={2} />
          <h3 className="text-sm font-bold text-gray-900">アカウント削除</h3>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-xs text-amber-900 mb-3 leading-relaxed">
            <strong className="block mb-1">
              有料プランをご契約中のため、アカウントを削除できません。
            </strong>
            アカウント削除前に、プラン管理画面から有料プランを解約してください。解約後にこのページに戻ると、削除ボタンが表示されます。
          </p>
          <a
            href="/construction/mypage#plan-management"
            className="inline-flex items-center gap-1.5 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            プラン管理画面へ →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Trash2 className="w-4 h-4 text-red-500" strokeWidth={2} />
        <h3 className="text-sm font-bold text-gray-900">アカウント削除</h3>
      </div>

      {!showConfirm ? (
        <>
          <p className="text-xs text-gray-500 mb-3">
            アカウントを削除すると、保存した見積書・設定データがすべて削除されます。この操作は取り消せません。
          </p>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
          >
            アカウントを削除する…
          </button>
        </>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-xs text-red-800 mb-3 font-bold">
            本当に削除しますか？確認のため「削除する」と入力してください。
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="削除する"
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm border border-red-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
            />
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || confirmText !== "削除する"}
              className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap"
            >
              {loading ? (
                <Loader2
                  className="w-4 h-4 animate-spin"
                  strokeWidth={2.5}
                />
              ) : (
                "削除"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowConfirm(false);
                setConfirmText("");
              }}
              disabled={loading}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              やめる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
