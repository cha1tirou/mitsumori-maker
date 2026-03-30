import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 見積書メーカー",
  description: "見積書メーカーのプライバシーポリシーページです。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← 見積書メーカーに戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <p>見積書メーカー（以下「当サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. 収集する情報について</h2>
            <p>当サービスは、見積書の作成はすべてブラウザ上で行われます。入力された情報はサーバーには送信・保存されません。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. アクセス解析について</h2>
            <p>当サービスでは、サービス改善のためにGoogle Analyticsを利用する場合があります。クッキーを使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. 広告について</h2>
            <p>当サービスでは、Google AdSenseによる広告を掲載する場合があります。広告配信のためにクッキーが使用されることがありますが、個人を特定する情報は収集しません。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. クッキーについて</h2>
            <p>当サービスではアクセス解析・広告配信の目的でクッキーを使用することがあります。ブラウザの設定によりクッキーを無効にすることが可能です。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. 免責事項</h2>
            <p>当サービスの利用により生じた損害について、当サービスは一切の責任を負いません。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. プライバシーポリシーの変更</h2>
            <p>本ポリシーは必要に応じて改訂することがあります。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. お問い合わせ</h2>
            <p>プライバシーポリシーに関するお問い合わせは、<Link href="/contact" className="text-blue-600 hover:underline">お問い合わせページ</Link>よりご連絡ください。</p>
          </section>
          <p className="text-sm text-gray-500 pt-4 border-t border-gray-100">制定日：2026年3月30日</p>
        </div>
      </main>
    </div>
  );
}
