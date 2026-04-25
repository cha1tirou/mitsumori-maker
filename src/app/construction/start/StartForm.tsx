"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HardHat,
  Mail,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Save,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { trackConversion } from "@/lib/analytics";

interface Props {
  redirectTo: string;
}

export default function StartForm({ redirectTo }: Props) {
  // 旧設計の名残: redirectTo パラメータを残しているが、OTP フローでは
  // パスワード設定後に必ず /construction/mypage に着地する設計に統一。
  void redirectTo;

  // /start ページの到達を計測（広告ランディング）
  useEffect(() => {
    trackConversion("construction_start_view");
  }, []);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    if (!isSupabaseConfigured()) {
      setError("認証機能は現在準備中です。");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      // OTP（マジックリンク）送信。新規メアドはアカウント自動作成、
      // 既存メアドはログインリンクとして送信。
      // クリック後 → /auth/confirm → /construction/setup-password でパスワード設定。
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(
            "/construction/setup-password",
          )}`,
          shouldCreateUser: true,
        },
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      trackConversion("construction_signup");
      setSent(true);
    } catch {
      setError("送信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return <SentScreen email={email} onChangeEmail={() => setSent(false)} />;
  }

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
            href="/construction/login"
            className="text-xs text-white/70 hover:text-white"
          >
            ログイン
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start lg:items-center">
          {/* Hero */}
          <div>
            {/* ブランドマーク */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-kenmitsu-orange flex items-center justify-center shadow-lg">
                <HardHat
                  className="w-7 h-7 text-white"
                  strokeWidth={2.25}
                />
              </div>
              <div>
                <p className="text-2xl font-black tracking-wide leading-none">
                  ケンミツ
                </p>
                <p className="text-[11px] text-white/70 mt-1 font-medium">
                  建設業の見積書ツール
                </p>
              </div>
            </div>

            <span className="inline-block bg-kenmitsu-orange text-white text-[11px] font-bold px-3 py-1.5 rounded-full mb-4">
              完全無料・カード登録不要
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black leading-tight mb-4">
              建築見積書を、
              <br />
              <span className="text-kenmitsu-orange">
                ブラウザでサッと。PC でもスマホでも。
              </span>
            </h1>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
              メアド登録だけで、何枚でも見積書が作れます。
              <br />
              PDF ダウンロード・クラウド保存もすべて無料。
            </p>

            <div className="space-y-2.5 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  className="w-4 h-4 text-kenmitsu-orange shrink-0"
                  strokeWidth={2.5}
                />
                <span>メアド登録だけ・カード登録不要</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  className="w-4 h-4 text-kenmitsu-orange shrink-0"
                  strokeWidth={2.5}
                />
                <span>何枚でも作成・PDF ダウンロード</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2
                  className="w-4 h-4 text-kenmitsu-orange shrink-0"
                  strokeWidth={2.5}
                />
                <span>クラウド保存で再編集・複製も自由</span>
              </div>
            </div>

            {/* 見積書イメージ（こんな見積書が作れます） */}
            <div className="mb-8">
              <p className="text-[11px] text-white/70 mb-3 font-medium tracking-wide">
                ↓ こんな見積書が作れます
              </p>
              <QuoteMockup />
            </div>

            {/* 信頼バッジ */}
            <div className="hidden lg:grid grid-cols-3 gap-4">
              <div>
                <Zap
                  className="w-5 h-5 mb-1.5 text-kenmitsu-orange"
                  strokeWidth={2}
                />
                <p className="text-[11px] font-bold">すぐに作成</p>
                <p className="text-[10px] text-white/60">PC・スマホ両対応</p>
              </div>
              <div>
                <FileText
                  className="w-5 h-5 mb-1.5 text-kenmitsu-orange"
                  strokeWidth={2}
                />
                <p className="text-[11px] font-bold">PDF 出力</p>
                <p className="text-[10px] text-white/60">無制限ダウンロード</p>
              </div>
              <div>
                <Save
                  className="w-5 h-5 mb-1.5 text-kenmitsu-orange"
                  strokeWidth={2}
                />
                <p className="text-[11px] font-bold">クラウド保存</p>
                <p className="text-[10px] text-white/60">再編集・複製自由</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-2xl text-gray-900 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <HardHat
                className="w-4 h-4 text-kenmitsu-orange"
                strokeWidth={2.25}
              />
              <span className="text-[11px] font-bold tracking-wider text-kenmitsu-navy uppercase">
                Kenmitsu / ケンミツ
              </span>
            </div>
            <h2 className="text-lg font-bold mb-1">無料アカウント登録</h2>
            <p className="text-xs text-gray-500 mb-5">
              メールアドレスを入力してください。届いたリンクからパスワード設定 → 利用開始です。
            </p>

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
                    autoComplete="email"
                    inputMode="email"
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
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      strokeWidth={2.5}
                    />
                    送信中...
                  </>
                ) : (
                  "確認メールを送る →"
                )}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500 mb-2">
                既にアカウントをお持ちの方
              </p>
              <Link
                href="/construction/login"
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
            <p className="text-[11px] font-bold">すぐに作成</p>
          </div>
          <div className="text-white/85">
            <FileText
              className="w-5 h-5 mx-auto mb-1.5 text-kenmitsu-orange"
              strokeWidth={2}
            />
            <p className="text-[11px] font-bold">PDF 出力</p>
          </div>
          <div className="text-white/85">
            <Save
              className="w-5 h-5 mx-auto mb-1.5 text-kenmitsu-orange"
              strokeWidth={2}
            />
            <p className="text-[11px] font-bold">クラウド保存</p>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * 見積書サンプルのインライン Mockup。
 * 実 PDF をスクショではなく Tailwind で軽量に描画して
 * 「こんな見積書が作れる」を一目で伝える。
 */
function QuoteMockup() {
  return (
    <div className="bg-white text-gray-900 rounded-lg shadow-2xl p-4 sm:p-5 max-w-sm">
      <div className="text-center mb-3 pb-2 border-b-2 border-kenmitsu-navy">
        <h3 className="text-[15px] font-bold tracking-[0.18em] text-kenmitsu-navy">
          工事見積書
        </h3>
      </div>
      <div className="text-[10px] mb-3 leading-relaxed">
        <p className="font-bold text-[12px] border-b border-kenmitsu-navy pb-0.5 inline-block">
          山田建設 御中
        </p>
        <p className="text-gray-500 mt-1.5">件名：内装リフォーム工事</p>
        <p className="text-gray-500">工期：2026/04/01 〜 2026/05/15</p>
      </div>
      <table className="w-full text-[10px] mb-3 border-collapse">
        <thead>
          <tr className="border-y border-gray-300 text-gray-600 bg-gray-50">
            <th className="text-left py-1 px-1.5 font-medium">品名</th>
            <th className="text-right py-1 px-1.5 font-medium">数量</th>
            <th className="text-right py-1 px-1.5 font-medium">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-1 px-1.5">内装解体工事</td>
            <td className="text-right py-1 px-1.5">1 式</td>
            <td className="text-right py-1 px-1.5 font-mono">¥120,000</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-1 px-1.5">大工工事</td>
            <td className="text-right py-1 px-1.5">1 式</td>
            <td className="text-right py-1 px-1.5 font-mono">¥350,000</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-1 px-1.5">内装仕上げ</td>
            <td className="text-right py-1 px-1.5">1 式</td>
            <td className="text-right py-1 px-1.5 font-mono">¥98,000</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-1 px-1.5 text-gray-500">諸経費</td>
            <td className="text-right py-1 px-1.5">1 式</td>
            <td className="text-right py-1 px-1.5 font-mono text-gray-500">
              ¥45,000
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between items-end pt-2 border-t-2 border-kenmitsu-navy">
        <span className="text-[10px] text-gray-500">合計（税込）</span>
        <span className="font-mono font-bold text-[15px] text-kenmitsu-navy">
          ¥674,300
        </span>
      </div>
    </div>
  );
}

function SentScreen({
  email,
  onChangeEmail,
}: {
  email: string;
  onChangeEmail: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kenmitsu-navy to-kenmitsu-navy900 text-white flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <HardHat
            className="w-4 h-4 text-kenmitsu-orange"
            strokeWidth={2.25}
          />
          <span className="text-[11px] font-bold tracking-wider text-kenmitsu-navy uppercase">
            Kenmitsu / ケンミツ
          </span>
        </div>
        <CheckCircle2
          className="w-12 h-12 text-kenmitsu-ok mx-auto mb-4"
          strokeWidth={1.75}
        />
        <h2 className="text-lg font-bold mb-2">確認メールを送信しました</h2>
        <p className="text-xs text-gray-600 leading-relaxed mb-2">
          <strong className="text-gray-900 break-all">{email}</strong>{" "}
          宛にメールをお送りしました。
        </p>
        <p className="text-xs text-gray-600 leading-relaxed mb-5">
          メール内のリンクをクリックして、パスワード設定に進んでください。
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900 leading-relaxed mb-5">
          <strong>メールが届かない場合:</strong>
          <br />
          ・迷惑メールフォルダをご確認ください
          <br />
          ・数分待ってからもう一度お試しください
        </div>
        <button
          type="button"
          onClick={onChangeEmail}
          className="text-xs text-kenmitsu-navy font-bold hover:underline"
        >
          メールアドレスを変更する
        </button>
      </div>
    </div>
  );
}
