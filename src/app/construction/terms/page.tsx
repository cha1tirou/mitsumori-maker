import type { Metadata } from "next";
import Link from "next/link";
import { HardHat } from "lucide-react";

export const metadata: Metadata = {
  title: "利用規約（建設業向け有料プラン）| ケンミツ",
  description:
    "ケンミツ（建設業向け有料プラン）の利用規約。Soloプラン・Teamプランの契約・料金・解約・返金・責任範囲について定めています。",
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/terms",
  },
  robots: { index: true, follow: true },
};

export default function ConstructionTermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">利用規約</span>
          </nav>
          <Link
            href="/construction"
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5"
          >
            <HardHat className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            ← ケンミツトップに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            利用規約（建設業向け有料プラン）
          </h1>
          <p className="text-xs text-gray-500 mb-8">最終改定日: 2026年4月14日</p>

          <p className="text-sm text-gray-700 leading-relaxed mb-8">
            本規約（以下「本規約」）は、ケンミツ（以下「本サービス」）の利用条件を定めるものです。本サービスをご利用いただくにあたり、本規約のほか、別途定める
            <Link href="/terms" className="text-kenmitsu-navy hover:underline">
              共通利用規約
            </Link>
            および
            <Link href="/construction/privacy" className="text-kenmitsu-navy hover:underline">
              プライバシーポリシー
            </Link>
            も適用されます。
          </p>

          <Section title="第1条（定義）">
            <p>本規約において使用する用語の定義は以下のとおりとします。</p>
            <ol>
              <li>「運営者」とは、本サービスを提供する事業者をいいます。</li>
              <li>「利用者」とは、本サービスに登録し、利用する個人または法人をいいます。</li>
              <li>「有料プラン」とは、Soloプラン・Teamプラン等、月額または年額の対価を伴う利用形態をいいます。</li>
              <li>「無料プラン」とは、登録なしで利用できる、機能制限付きの利用形態をいいます。</li>
            </ol>
          </Section>

          <Section title="第2条（契約の成立）">
            <ol>
              <li>
                有料プランの契約は、利用者が決済情報を入力しStripe Checkoutを通じて支払いを完了した時点で成立します。
              </li>
              <li>
                契約期間は、月額プランの場合は課金日から起算して1ヶ月、年額プランの場合は12ヶ月とし、解約の申出がない限り自動更新されます。
              </li>
            </ol>
          </Section>

          <Section title="第3条（料金および支払方法）">
            <ol>
              <li>
                本サービスの料金は以下のとおりとします（すべて税込）。
                <ul>
                  <li>Solo プラン: 月額 ¥1,980 / 年額 ¥19,800</li>
                  <li>Team プラン: 月額 ¥2,980 / 年額 ¥29,800</li>
                </ul>
              </li>
              <li>
                料金は、Stripe を通じてクレジットカードで自動課金されます。決済情報は当社ではなく Stripe 社のサーバーで管理されます。
              </li>
              <li>
                料金は変更される場合があります。変更の場合は、次回更新日の30日前までに本サービス内の通知または登録メールアドレスへの通知により周知します。
              </li>
            </ol>
          </Section>

          <Section title="第4条（解約・自動更新停止）">
            <ol>
              <li>
                利用者は、マイページの解約導線より、いつでも自動更新を停止することができます。電話・メールによる解約手続きは必要ありません。
              </li>
              <li>
                自動更新を停止した場合、当該課金サイクルの末日まで有料プランを利用でき、翌サイクル以降は無料プランへ移行します。
              </li>
              <li>
                日割り返金は原則として行いません（次条に定める場合を除く）。
              </li>
            </ol>
          </Section>

          <Section title="第5条（返金）">
            <ol>
              <li>
                特定商取引法に定める書面到達前のキャンセルなど、法令により認められる場合を除き、原則として返金は行いません。
              </li>
              <li>
                本サービスの重大な不具合により利用者が実質的に利用できなかった場合、利用者からの申請により個別に対応します。
              </li>
            </ol>
          </Section>

          <Section title="第6条（利用者の責任）">
            <ol>
              <li>
                本サービスで作成される見積書の内容・金額・法令適合性については、最終的に利用者の責任において確認するものとします。
              </li>
              <li>
                本サービスの「建設業法チェッカー」は、改正建設業法（2025年12月全面施行）の観点からの一般的な注意喚起を行うものであり、法的助言ではありません。具体的な法令適合性については、所属団体・専門家への確認を推奨します。
              </li>
              <li>
                自社情報・顧客情報・取引条件等の機密情報は、利用者の責任で管理してください。
              </li>
            </ol>
          </Section>

          <Section title="第7条（禁止事項）">
            <p>利用者は、本サービスの利用にあたり以下の行為を行ってはなりません。</p>
            <ol>
              <li>法令または公序良俗に違反する行為</li>
              <li>他者の権利を侵害する行為</li>
              <li>本サービスの運営を妨害する行為（大量リクエスト・不正なアクセスを含む）</li>
              <li>本サービスをリバースエンジニアリング、複製、再販売する行為</li>
              <li>他者にアカウント情報を譲渡または貸与する行為（Teamプランの正規の共有を除く）</li>
            </ol>
          </Section>

          <Section title="第8条（免責）">
            <ol>
              <li>
                本サービスは現状有姿で提供され、運営者は特定の目的への適合性を保証しません。
              </li>
              <li>
                本サービスの利用に起因して利用者に生じた損害について、運営者の故意または重過失による場合を除き、運営者の賠償責任は当該利用者が直近12ヶ月間に支払った料金総額を上限とします。
              </li>
              <li>
                利用者が作成した見積書の内容に起因して第三者との間で紛争が生じた場合、利用者が自己の責任と費用で解決するものとします。
              </li>
            </ol>
          </Section>

          <Section title="第9条（サービスの変更・終了）">
            <ol>
              <li>
                運営者は、本サービスの内容を利用者への事前通知なく変更・追加・終了できるものとします。ただし、料金および重要な機能の変更については、前条に定める方法で事前通知します。
              </li>
              <li>
                本サービスを終了する場合、運営者は残存する有料契約期間相当分を日割で返金します。
              </li>
            </ol>
          </Section>

          <Section title="第10条（個人情報の取扱い）">
            <p>
              個人情報の取扱いは
              <Link href="/construction/privacy" className="text-kenmitsu-navy hover:underline">
                プライバシーポリシー
              </Link>
              に定めるとおりとします。
            </p>
          </Section>

          <Section title="第11条（アカウント削除）">
            <ol>
              <li>
                利用者は、マイページのアカウント設定からアカウントを削除することができます。
              </li>
              <li>
                アカウント削除を行った場合、保存された見積書データ・自社情報・マスタデータ・送信履歴等のすべてのデータが即時かつ不可逆的に削除されます。
              </li>
              <li>
                有料プランの利用期間中にアカウント削除を行った場合、サブスクリプションは自動的にキャンセルされます。日割り返金は行いません。
              </li>
            </ol>
          </Section>

          <Section title="第12条（メール配信）">
            <ol>
              <li>
                本サービスは、利用者への重要な通知（アカウント確認・パスワードリセット等）および利用促進に関するメールを配信します。
              </li>
              <li>
                利用促進メールの配信停止を希望する場合は、お問い合わせフォームよりご連絡ください。
              </li>
            </ol>
          </Section>

          <Section title="第13条（準拠法・管轄）">
            <ol>
              <li>本規約は日本法に準拠します。</li>
              <li>
                本サービスに関する紛争については、運営者所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
              </li>
            </ol>
          </Section>

          <Section title="第14条（改定）">
            <p>
              運営者は、必要に応じて本規約を改定できます。重要な改定の場合、次回課金日の30日前までに本サービス内の通知または登録メールアドレスへの通知により周知します。改定後の規約は、通知された効力発生日から適用されます。
            </p>
          </Section>

          <p className="text-xs text-gray-500 mt-10 pt-6 border-t border-gray-200">
            最終改定日: 2026年4月14日
            <br />
            事業者情報は
            <Link href="/construction/tokushoho" className="text-kenmitsu-navy hover:underline">
              特定商取引法に基づく表記
            </Link>
            をご参照ください。
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
