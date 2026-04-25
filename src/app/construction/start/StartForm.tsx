"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HardHat,
  Mail,
  Lock,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { trackConversion } from "@/lib/analytics";

interface Props {
  redirectTo: string;
}

export default function StartForm({ redirectTo }: Props) {
  // /start ページの到達を計測（広告ランディング）
  useEffect(() => {
    trackConversion("construction_start_view");
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (password.length < 6) {
      setError("パスワードは6文字以上で設定してください。");
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
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) {
        if (authError.message.includes("already registered")) {
          setError(
            "このメールアドレスは既に登録済みです。下記のリンクからログインしてください。",
          );
        } else if (
          authError.message.includes("Password should be at least") ||
          authError.message.includes("password")
        ) {
          setError("パスワードは6文字以上で設定してください。");
        } else {
          setError(authError.message);
        }
        return;
      }
      // Supabase は既登録メアドの再登録でも成功ステータスを返すが、
      // identities が空配列なら既存ユーザー（セキュリティ上の仕様）。
      if (data.user && (data.user.identities?.length ?? 0) === 0) {
        setError(
          "このメールアドレスは既に登録されています。ログイン画面からログインまたはパスワードリセットをお試しください。",
        );
        return;
      }
      // Email Confirmation OFF 前提なので signUp 成功 = session 即時発行。
      // window.location.href でリダイレクトすると middleware を通って Cookie が反映される。
      trackConversion("construction_signup");
      window.location.href = redirectTo;
    } catch {
      setError("登録に失敗しました。もう一度お試しください。");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kenmitsu-navy to-kenmitsu-navy900 text-white">
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/construction"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <HardHat
              className="w-5 h-5 text-kenmitsu-orange"
              strokeWidth={2.25}
            />
            <span className="text-sm font-bold">ケンミツ</span>
          </Link>
          <Link
            href={`/construction/login?redirect=${encodeURIComponent(redirectTo)}`}
            className="text-xs text-white/70 hover:text-white"
          >
            ログイン
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start lg:items-center">
          {/* Hero */}
          <div className="order-2 lg:order-1">
            <span className="inline-block bg-kenmitsu-orange text-white text-[11px] font-bold px-3 py-1.5 rounded-full mb-4">
              改正建設業法 2025 対応
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black leading-tight mb-4">
              建築見積書を、
              <br />
              <span className="text-kenmitsu-orange">
                30秒で。スマホで。無料で。
              </span>
            </h1>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
              改正建設業法 2025 対応の見積書を月¥980 で出せるサービスはケンミツだけ。
              まずは無料で何枚でも作成・PDF ダウンロード。
            </p>

            <div className="space-y-2.5 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  className="w-4 h-4 text-kenmitsu-orange shrink-0"
                  strokeWidth={2.5}
                />
                <span>登録 30 秒・カード登録不要</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  className="w-4 h-4 text-kenmitsu-orange shrink-0"
                  strokeWidth={2.5}
                />
                <span>無料で何枚でも作成・PDF ダウンロード</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  className="w-4 h-4 text-kenmitsu-orange shrink-0"
                  strokeWidth={2.5}
                />
                <span>改正建設業法 2025 対応版は Solo（月¥980）で</span>
              </div>
            </div>

            {/* 信頼バッジ */}
            <div className="hidden lg:grid grid-cols-3 gap-4">
              <div>
                <Zap
                  className="w-5 h-5 mb-1.5 text-kenmitsu-orange"
                  strokeWidth={2}
                />
                <p className="text-[11px] font-bold">30秒で完成</p>
                <p className="text-[10px] text-white/60">スマホ対応</p>
              </div>
              <div>
                <Shield
                  className="w-5 h-5 mb-1.5 text-kenmitsu-orange"
                  strokeWidth={2}
                />
                <p className="text-[11px] font-bold">改正法対応</p>
                <p className="text-[10px] text-white/60">2025年12月施行</p>
              </div>
              <div>
                <Smartphone
                  className="w-5 h-5 mb-1.5 text-kenmitsu-orange"
                  strokeWidth={2}
                />
                <p className="text-[11px] font-bold">月¥980 から</p>
                <p className="text-[10px] text-white/60">いつでも解約可</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2 bg-white rounded-2xl shadow-2xl text-gray-900 p-6 sm:p-8">
            <h2 className="text-lg font-bold mb-1">無料アカウント登録</h2>
            <p className="text-xs text-gray-500 mb-5">
              メールアドレスとパスワードだけで、すぐに使い始められます。
            </p>

            <form onSubmit={handleSignup} className="space-y-4">
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
                    autoComplete="email"
                    inputMode="email"
                    disabled={loading}
                    className="w-full pl-9 pr-3 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-kenmitsu-navy focus:ring-1 focus:ring-kenmitsu-navy/20"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs text-gray-600 font-medium mb-1 block">
                  パスワード{" "}
                  <span className="text-gray-400">（6文字以上）</span>
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
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      strokeWidth={2.5}
                    />
                    登録中...
                  </>
                ) : (
                  "無料で始める →"
                )}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500 mb-2">
                既にアカウントをお持ちの方
              </p>
              <Link
                href={`/construction/login?redirect=${encodeURIComponent(redirectTo)}`}
                className="text-xs text-kenmitsu-navy font-bold hover:underline"
              >
                ログインはこちら
              </Link>
            </div>

            <p className="text-[10px] text-gray-400 mt-4 leading-relaxed text-center">
              登録により{" "}
              <Link
                href="/construction/terms"
                className="underline hover:text-gray-600"
              >
                利用規約
              </Link>
              と{" "}
              <Link
                href="/construction/privacy"
                className="underline hover:text-gray-600"
              >
                プライバシーポリシー
              </Link>
              に同意したものとみなします。
            </p>
          </div>
        </div>

        {/* Mobile 信頼バッジ */}
        <div className="lg:hidden grid grid-cols-3 gap-3 mt-10 text-center">
          <div className="text-white/85">
            <Zap
              className="w-5 h-5 mx-auto mb-1.5 text-kenmitsu-orange"
              strokeWidth={2}
            />
            <p className="text-[11px] font-bold">30秒で完成</p>
          </div>
          <div className="text-white/85">
            <Shield
              className="w-5 h-5 mx-auto mb-1.5 text-kenmitsu-orange"
              strokeWidth={2}
            />
            <p className="text-[11px] font-bold">改正法対応</p>
          </div>
          <div className="text-white/85">
            <Smartphone
              className="w-5 h-5 mx-auto mb-1.5 text-kenmitsu-orange"
              strokeWidth={2}
            />
            <p className="text-[11px] font-bold">月¥980 から</p>
          </div>
        </div>
      </main>
    </div>
  );
}
