import type { Metadata } from "next";
import Link from "next/link";
import { HardHat } from "lucide-react";

export const metadata: Metadata = {
  title: "プライバシーポリシー（建設業向け有料プラン）| ケンミツ",
  description:
    "ケンミツ（建設業向け有料プラン）のプライバシーポリシー。個人情報・見積データ・決済情報の取扱い、Supabase・Stripe等の外部サービス利用について記載しています。",
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/privacy",
  },
  robots: { index: true, follow: true },
};

export default function ConstructionPrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">プライバシーポリシー</span>
          </nav>
          <Link
            href="/construction"
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5"
          >
            <HardHat className="w-4 h-4 text-green-700" strokeWidth={2.25} />
            ← ケンミツトップに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            プライバシーポリシー（建設業向け有料プラン）
          </h1>
          <p className="text-xs text-gray-500 mb-8">最終改定日: 2026年4月14日</p>

          <p className="text-sm text-gray-700 leading-relaxed mb-8">
            本ポリシーは、ケンミツ（以下「本サービス」）における、利用者の個人情報および関連情報の取扱いについて定めるものです。
          </p>

          <Section title="1. 取得する情報">
            <p>本サービスは、以下の情報を取得します。</p>
            <ul>
              <li>
                <strong>アカウント情報</strong>: メールアドレス、認証に用いるパスワードハッシュ
              </li>
              <li>
                <strong>見積データ</strong>: 利用者が本サービスに入力した発注者情報・施工者情報・明細・金額・見積条件
              </li>
              <li>
                <strong>決済情報</strong>: クレジットカード番号等は Stripe が直接取得・保管し、本サービスでは保持しません。本サービスには決済結果・課金履歴・顧客IDのみが連携されます
              </li>
              <li>
                <strong>利用ログ</strong>: IPアドレス、ブラウザ情報、アクセス日時、機能利用状況
              </li>
            </ul>
          </Section>

          <Section title="2. 利用目的">
            <ol>
              <li>本サービスの提供・運営・改善</li>
              <li>課金処理・請求・解約等の取引管理</li>
              <li>重要なお知らせ・アップデート情報の送信</li>
              <li>不正利用・セキュリティインシデントの検知と対応</li>
              <li>サービス品質改善のための統計的分析（個人を特定できない形で）</li>
            </ol>
          </Section>

          <Section title="3. 第三者提供">
            <p>
              利用者の同意なく個人情報を第三者に提供しません。ただし、以下の場合を除きます。
            </p>
            <ol>
              <li>法令に基づく場合</li>
              <li>人の生命・身体・財産の保護に必要な場合</li>
              <li>
                以下に定める業務委託先への提供（個人情報保護法第27条第5項に基づく）
              </li>
            </ol>
          </Section>

          <Section title="4. 利用する外部サービス">
            <p>本サービスは、以下の外部サービスを利用しています。</p>
            <ul>
              <li>
                <strong>Vercel</strong> — サイトのホスティング。アクセスログが一時的に保管されます
              </li>
              <li>
                <strong>Supabase</strong> — アカウント情報・見積データの保管。EU/US リージョンで暗号化の上保管されます
              </li>
              <li>
                <strong>Stripe</strong> — 決済処理。クレジットカード情報は Stripe 社のサーバーに直接送信され、本サービスには渡されません
              </li>
              <li>
                <strong>Google Analytics 4</strong> — 匿名化された利用状況の計測
              </li>
              <li>
                <strong>Google Ads / Meta Pixel</strong> — 広告配信・効果計測（Cookie ベース、個人を特定しない）
              </li>
              <li>
                <strong>Google Fonts (Noto Sans JP)</strong> — フォント配信
              </li>
            </ul>
            <p>
              各サービスのプライバシーポリシーは、それぞれの提供元のサイトをご確認ください。
            </p>
          </Section>

          <Section title="5. Cookie の利用">
            <p>
              本サービスは、ログイン維持・利用状況の分析・広告配信のために Cookie を使用します。ブラウザの設定により Cookie を拒否することもできますが、その場合一部機能が正常に動作しない可能性があります。
            </p>
          </Section>

          <Section title="6. データの保管期間">
            <ol>
              <li>
                見積データ・アカウント情報は、有料プラン継続中および解約後 180 日間保管します。
              </li>
              <li>
                利用者からの削除請求を受けた場合、またはマイページからアカウント削除を行った場合、法令上の保管義務がある情報を除き、速やかに削除します。
              </li>
              <li>
                課金履歴は税法・会計帳簿保存義務に基づき、7年間保管します。
              </li>
            </ol>
          </Section>

          <Section title="7. メール配信">
            <ol>
              <li>
                本サービスは、登録されたメールアドレスに対し、以下の種類のメールを配信します。
                <ul>
                  <li>アカウント確認・ログイン・パスワードリセットなどの認証メール</li>
                  <li>サービスの利用方法・機能紹介に関するガイドメール（登録後7日間に段階的に配信）</li>
                  <li>プラン更新・変更に関する通知メール</li>
                </ul>
              </li>
              <li>
                ガイドメールの配信停止を希望する場合は、お問い合わせフォームよりご連絡ください。認証メール・プラン通知メールは配信停止できません。
              </li>
            </ol>
          </Section>

          <Section title="8. 利用者の権利">
            <p>利用者は、以下の権利を有します。</p>
            <ol>
              <li>
                自身の個人情報の開示・訂正・削除・利用停止を求める権利
              </li>
              <li>第三者提供の停止を求める権利</li>
              <li>
                データポータビリティ（自身の見積データのエクスポート）の権利
              </li>
            </ol>
            <p>
              行使をご希望の場合は、
              <Link href="/construction/contact" className="text-green-700 hover:underline">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </Section>

          <Section title="9. セキュリティ">
            <ol>
              <li>通信はすべて TLS（HTTPS）で暗号化します。</li>
              <li>保管データは各外部サービスの暗号化機能を用いて保護します。</li>
              <li>
                本サービス運営者による不正アクセスを防ぐため、最小権限の原則に基づきアクセス管理を行います。
              </li>
              <li>
                重大なセキュリティインシデントが発生した場合、関連法令に従い速やかに利用者へ通知します。
              </li>
            </ol>
          </Section>

          <Section title="10. ポリシーの改定">
            <p>
              本ポリシーは、必要に応じて改定されます。重要な変更の場合は、本サービス内の通知または登録メールアドレスへの通知により周知します。
            </p>
          </Section>

          <Section title="11. お問い合わせ先">
            <p>
              本ポリシーに関するお問い合わせは、
              <Link href="/construction/contact" className="text-green-700 hover:underline">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </Section>

          <p className="text-xs text-gray-500 mt-10 pt-6 border-t border-gray-200">
            最終改定日: 2026年4月14日
          </p>
        </article>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed">
        {children}
      </div>
    </section>
  );
}
