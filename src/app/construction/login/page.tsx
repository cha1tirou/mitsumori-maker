"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  HardHat,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";

type Mode = "login" | "signup" | "forgot" | "sent" | "signup-sent";

function LoginForm() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/construction/mypage";
  const refCode = params.get("ref") || "";
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (!isSupabaseConfigured()) {
      setError("認証機能は現在準備中です。しばらくお待ちください。");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        if (authError.message === "Invalid login credentials") {
          setError("メールアドレスまたはパスワードが正しくありません。");
        } else if (authError.message === "Email not confirmed") {
          setError(
            "メールアドレスが未確認です。受信トレイの確認メールをクリックしてください。"
          );
        } else {
          setError(authError.message);
        }
        return;
      }
      // ログイン成功 → リダイレクト
      window.location.href = redirectTo;
    } catch {
      setError("ログインに失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (password.length < 6) {
      setError("パスワードは6文字以上で設定してください。");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("認証機能は現在準備中です。しばらくお待ちください。");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
            redirectTo
          )}`,
          data: refCode ? { referral_code: refCode } : undefined,
        },
      });
      if (authError) {
        if (authError.message.includes("already registered")) {
          setError(
            "このメールアドレスは既に登録済みです。ログインしてください。"
          );
          setMode("login");
        } else {
          setError(authError.message);
        }
        return;
      }
      setMode("signup-sent");
    } catch {
      setError("登録に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!isSupabaseConfigured()) {
      setError("認証機能は現在準備中です。しばらくお待ちください。");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: authError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
            "/construction/reset-password"
          )}`,
        }
      );
      if (authError) {
        setError(authError.message);
        return;
      }
      setMode("sent");
    } catch {
      setError("送信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  // 確認メール送信完了画面
  if (mode === "signup-sent") {
    return (
      <Shell>
        <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
          <CheckCircle2
            className="w-10 h-10 text-green-600 mx-auto mb-3"
            strokeWidth={1.75}
          />
          <p className="text-sm font-bold text-gray-900 mb-1">
            確認メールを送信しました
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            {email} に確認メールを送信しました。
            <br />
            メール内のリンクをクリックして登録を完了してください。
            <br />
            完了後、メールアドレスとパスワードでログインできます。
          </p>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className="mt-4 text-xs text-green-700 font-bold hover:underline"
          >
            ログイン画面に戻る
          </button>
        </div>
      </Shell>
    );
  }

  // パスワードリセットメール送信完了画面
  if (mode === "sent") {
    return (
      <Shell>
        <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
          <CheckCircle2
            className="w-10 h-10 text-green-600 mx-auto mb-3"
            strokeWidth={1.75}
          />
          <p className="text-sm font-bold text-gray-900 mb-1">
            リセットメールを送信しました
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            {email} にパスワードリセット用のメールを送信しました。
            <br />
            メール内のリンクから新しいパスワードを設定してください。
          </p>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className="mt-4 text-xs text-green-700 font-bold hover:underline"
          >
            ログイン画面に戻る
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {refCode && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
          <p className="font-bold mb-0.5">紹介コード適用中: {refCode}</p>
          <p>
            紹介者経由での登録が記録されます。紹介プログラムの特典は今後のお知らせでご案内します。
          </p>
        </div>
      )}

      {/* タブ切り替え */}
      {mode !== "forgot" && (
        <div className="flex mb-6 border-b border-gray-200">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 pb-2.5 text-sm font-bold text-center border-b-2 transition-colors ${
              mode === "login"
                ? "border-green-700 text-green-700"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            ログイン
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            className={`flex-1 pb-2.5 text-sm font-bold text-center border-b-2 transition-colors ${
              mode === "signup"
                ? "border-green-700 text-green-700"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            新規登録
          </button>
        </div>
      )}

      {mode === "forgot" && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            ← ログインに戻る
          </button>
          <h2 className="text-base font-bold text-gray-900 mt-2">
            パスワードをお忘れの方
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            登録済みのメールアドレスを入力してください。パスワードリセット用のメールをお送りします。
          </p>
        </div>
      )}

      <form
        onSubmit={
          mode === "login"
            ? handleLogin
            : mode === "signup"
            ? handleSignup
            : handleForgot
        }
        className="space-y-4"
      >
        <label className="block">
          <span className="text-xs text-gray-600 font-medium mb-1 block">
            メールアドレス
          </span>
          <div className="relative">
            <Mail
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={2.25}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20"
            />
          </div>
        </label>

        {mode !== "forgot" && (
          <label className="block">
            <span className="text-xs text-gray-600 font-medium mb-1 block">
              パスワード
              {mode === "signup" && (
                <span className="text-gray-400 ml-1">（6文字以上）</span>
              )}
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
                className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20"
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
        )}

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
          className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
              {mode === "login"
                ? "ログイン中..."
                : mode === "signup"
                ? "登録中..."
                : "送信中..."}
            </>
          ) : mode === "login" ? (
            "ログイン"
          ) : mode === "signup" ? (
            "アカウントを作成"
          ) : (
            "リセットメールを送信"
          )}
        </button>
      </form>

      {mode === "login" && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setMode("forgot");
              setError("");
            }}
            className="text-xs text-gray-500 hover:text-green-700 hover:underline"
          >
            パスワードをお忘れの方
          </button>
        </div>
      )}

      <p className="text-[11px] text-gray-500 mt-6 leading-relaxed">
        {mode === "signup" ? "登録" : "ログイン"}により
        <Link
          href="/construction/terms"
          className="text-green-700 hover:underline"
        >
          利用規約
        </Link>
        と
        <Link
          href="/construction/privacy"
          className="text-green-700 hover:underline"
        >
          プライバシーポリシー
        </Link>
        に同意したものとみなします。
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto px-4 py-12">
        <Link
          href="/construction"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <HardHat className="w-4 h-4 text-green-700" strokeWidth={2.25} />
          ← 建設業向けトップへ
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-6">
            <HardHat className="w-6 h-6 text-green-700" strokeWidth={2} />
            <h1 className="text-lg font-bold text-gray-900">ケンミツ</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <LoginForm />
    </Suspense>
  );
}
