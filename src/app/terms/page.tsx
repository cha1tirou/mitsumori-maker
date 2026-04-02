import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | 見積書メーカー",
  description:
    "見積書メーカーの利用規約です。サービスのご利用条件・免責事項・禁止事項などについて定めています。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">
              見積書メーカー
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">利用規約</span>
          </nav>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            ← 見積書メーカーに戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">利用規約</h1>
        <p className="text-gray-500 text-sm mb-8">最終更新日: 2026年4月2日</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <p>
            この利用規約（以下「本規約」）は、見積書メーカー（以下「当サービス」）の利用条件を定めるものです。ユーザーの皆さまには、本規約に同意のうえ当サービスをご利用いただきます。
          </p>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              第1条（適用範囲）
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                本規約は、当サービスが提供するすべての機能・コンテンツに適用されます。
              </li>
              <li>
                当サービスが別途定める個別規定やガイドラインは、本規約の一部を構成するものとします。
              </li>
              <li>
                本規約と個別規定が矛盾する場合は、個別規定が優先されるものとします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              第2条（サービス内容）
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                当サービスは、見積書・請求書・納品書・発注書などの帳票をブラウザ上で作成し、PDFとしてダウンロードできる無料のWebサービスです。
              </li>
              <li>
                会員登録は不要です。すべての機能を登録なしでご利用いただけます。
              </li>
              <li>
                当サービスはブラウザ上で完結しており、ユーザーが入力した情報はサーバーに送信・保存されません（ブラウザのローカルストレージに一部情報を保存する場合があります）。
              </li>
              <li>
                当サービスは予告なく機能の追加・変更・廃止を行う場合があります。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              第3条（禁止事項）
            </h2>
            <p className="mb-3">
              ユーザーは、当サービスの利用にあたり以下の行為を行ってはなりません。
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>
                当サービスのサーバーまたはネットワークに過度な負荷をかける行為
              </li>
              <li>当サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーまたは第三者に不利益・損害を与える行為</li>
              <li>
                当サービスを利用して虚偽の帳票を作成し、第三者を欺く行為
              </li>
              <li>
                当サービスのコンテンツを無断で複製・転載・再配布する行為
              </li>
              <li>
                その他、当サービスの運営者が不適切と判断する行為
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              第4条（免責事項）
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                当サービスは、帳票の作成を支援するツールを提供するものであり、作成された帳票の内容の正確性・妥当性・法的有効性を保証するものではありません。
              </li>
              <li>
                計算結果の正確性について万全を期しておりますが、計算の誤りや不具合により損害が生じた場合でも、当サービスは一切の責任を負いません。
              </li>
              <li>
                税率の適用・消費税の計算・インボイス制度への対応等の税務判断については、ユーザーご自身の責任で行ってください。必要に応じて税理士等の専門家にご相談ください。
              </li>
              <li>
                当サービスの利用により生じたいかなる損害（直接的・間接的を問わず）についても、当サービスの運営者は一切の責任を負いません。
              </li>
              <li>
                当サービスは、サービスの中断・停止・終了について事前に通知する義務を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              第5条（知的財産権）
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                当サービスに含まれるテキスト・デザイン・ロゴ・プログラム等の知的財産権は、当サービスの運営者に帰属します。
              </li>
              <li>
                ユーザーが当サービスを利用して作成した帳票の内容に関する権利は、ユーザーに帰属します。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              第6条（規約の変更）
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                当サービスは、必要に応じて本規約を変更することができるものとします。
              </li>
              <li>
                規約の変更は、当ページに掲載した時点で効力を生じるものとします。
              </li>
              <li>
                変更後に当サービスを利用した場合、変更後の規約に同意したものとみなします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              第7条（準拠法・管轄）
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>本規約の解釈は、日本法に準拠するものとします。</li>
              <li>
                当サービスに関して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              関連ページ
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:underline"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  運営者情報
                </Link>
              </li>
              <li>
                <Link
                  href="/ads-policy"
                  className="text-blue-600 hover:underline"
                >
                  広告掲載ポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-600 hover:underline">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
