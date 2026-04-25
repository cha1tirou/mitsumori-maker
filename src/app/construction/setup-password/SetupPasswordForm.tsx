"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HardHat,
  Lock,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

interface Props {
  email: string;
}

export default function SetupPasswordForm({ email }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (password.length < 6) {
      setError("パスワードは6文字以上で設定してください。");
      return;
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("認証機能は現在準備中です。");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
        data: { password_set: true },
      });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setDone(true);
      // 2秒後にマイページへ自動遷移
      setTimeout(() => {
        router.push("/construction/mypage");
      }, 2000);
    } catch {
      setError("パスワード設定に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Shell>
        <div className="text-center py-6">
          <CheckCircle2
            className="w-14 h-14 text-kenmitsu-ok mx-auto mb-4"
            strokeWidth={1.75}
          />
          <h2 className="text-base font-bold mb-2 text-gray-900">
            アカウント作成完了！
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            マイページに移動します...
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <h2 className="text-base font-bold text-gray-900 mb-1">
        パスワードを設定
      </h2>
      <p className="text-xs text-gray-500 mb-1">
        次回以降のログインで使用します。
      </p>
      {email && (
        <p className="text-[11px] text-gray-500 mb-5 break-all">
          アカウント: <strong className="text-gray-700">{email}</strong>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs text-gray-600 font-medium mb-1 block">
            パスワード <span className="text-gray-400">（6文字以上）</span>
          </span>
          <div className="relative">
            <Lock
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={2.25}
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
              className="w-full pl-9 pr-10 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={
                showPassword ? "パスワードを隠す" : "パスワードを表示"
              }
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" strokeWidth={2} />
              ) : (
                <Eye className="w-4 h-4" strokeWidth={2} />
              )}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="text-xs text-gray-600 font-medium mb-1 block">
            パスワード（確認用）
          </span>
          <div className="relative">
            <Lock
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={2.25}
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
              className="w-full pl-9 pr-3 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
            />
          </div>
        </label>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle
              className="w-4 h-4 shrink-0 mt-0.5"
              strokeWidth={2.25}
            />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
              設定中...
            </>
          ) : (
            "パスワードを設定する →"
          )}
        </button>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kenmitsu-navy to-kenmitsu-navy900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <HardHat
            className="w-5 h-5 text-kenmitsu-navy"
            strokeWidth={2.25}
          />
          <span className="text-sm font-bold text-gray-900">ケンミツ</span>
        </div>
        {children}
      </div>
    </div>
  );
}
