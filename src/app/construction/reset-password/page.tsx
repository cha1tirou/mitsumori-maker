"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import BackLink from "@/components/construction/BackLink";
import {
  HardHat,
  Lock,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    if (password.length < 6) {
      setError("パスワードは6文字以上で設定してください。");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.updateUser({
        password,
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      setDone(true);
    } catch {
      setError("パスワードの更新に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Shell>
        <div className="bg-kenmitsu-okBg border border-kenmitsu-ok/30 rounded-lg p-5 text-center">
          <CheckCircle2
            className="w-10 h-10 text-kenmitsu-ok mx-auto mb-3"
            strokeWidth={1.75}
          />
          <p className="text-sm font-bold text-gray-900 mb-1">
            パスワードを変更しました
          </p>
          <p className="text-xs text-gray-600 mb-4">
            新しいパスワードでログインできます。
          </p>
          <Link
            href="/construction/mypage"
            className="inline-block bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            マイページへ →
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <h2 className="text-base font-bold text-gray-900 mb-1">
        新しいパスワードを設定
      </h2>
      <p className="text-xs text-gray-500 mb-6">
        6文字以上のパスワードを入力してください。
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs text-gray-600 font-medium mb-1 block">
            新しいパスワード（6文字以上）
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
              disabled={loading}
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" strokeWidth={2} />
              ) : (
                <Eye className="w-4 h-4" strokeWidth={2} />
              )}
            </button>
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
          className="w-full flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
              更新中...
            </>
          ) : (
            "パスワードを変更する"
          )}
        </button>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kenmitsu-navy50 to-white">
      <div className="max-w-md mx-auto px-4 py-12">
        <BackLink className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8">
          <HardHat className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
          ← 前のページに戻る
        </BackLink>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-6">
            <HardHat className="w-6 h-6 text-kenmitsu-navy" strokeWidth={2} />
            <span className="text-lg font-bold text-gray-900">ケンミツ</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
