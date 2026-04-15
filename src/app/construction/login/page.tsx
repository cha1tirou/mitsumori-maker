"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { HardHat, Mail, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

function LoginForm() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/construction/mypage";
  const refCode = params.get("ref") || "";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!isSupabaseConfigured()) {
      setStatus("error");
      setMessage(
        "認証機能は現在準備中です。しばらくお待ちください（Supabase連携設定前）。"
      );
      return;
    }

    setStatus("sending");
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
            redirectTo
          )}`,
          data: refCode ? { referral_code: refCode } : undefined,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "送信に失敗しました。もう一度お試しください。"
      );
    }
  };

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
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            ログイン / アカウント登録
          </h1>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            メールアドレスを入力してください。ログイン用のリンクをお送りします。パスワードは不要です。
          </p>
          {refCode && (
            <div className="mb-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
              <p className="font-bold mb-0.5">🎁 紹介コード適用中: {refCode}</p>
              <p>
                紹介者経由での登録が記録されます。紹介プログラムの特典は今後のお知らせでご案内します。
              </p>
            </div>
          )}

          {status === "sent" ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
              <CheckCircle2
                className="w-10 h-10 text-green-600 mx-auto mb-3"
                strokeWidth={1.75}
              />
              <p className="text-sm font-bold text-gray-900 mb-1">
                ログインリンクを送信しました
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {email} にメールを送信しました。メール内のリンクをクリックしてログインを完了してください。
                <br />
                メールが届かない場合は、迷惑メールフォルダをご確認ください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={status === "sending"}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20"
                  />
                </div>
              </label>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2.25} />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                    送信中...
                  </>
                ) : (
                  "ログインリンクを送信"
                )}
              </button>
            </form>
          )}

          <p className="text-[11px] text-gray-500 mt-6 leading-relaxed">
            登録により
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
