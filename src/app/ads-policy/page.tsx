import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "広告掲載ポリシー | 見積書メーカー",
  description:
    "見積書メーカーの広告掲載ポリシーです。Google AdSense・アフィリエイト広告の取り扱い、Cookieの利用について説明します。",
};

export default function AdsPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">
              見積書メーカー
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">広告掲載ポリシー</span>
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          広告掲載ポリシー
        </h1>
        <p className="text-gray-500 text-sm mb-8">最終更新日: 2026年4月2日</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              広告配信について
            </h2>
            <p className="mb-3">
              当サイト「見積書メーカー」（以下「当サイト」）では、サービスの運営・改善のため、第三者配信の広告サービスを利用しています。
            </p>
            <p>
              現在、以下の広告サービスを利用しています。
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  <span className="font-medium text-gray-900">
                    Google AdSense
                  </span>
                  （Google LLC 提供）
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Google AdSenseについて
            </h2>
            <p className="mb-3">
              Google AdSenseは、Googleが提供する広告配信サービスです。Google
              AdSenseでは、ユーザーの興味に応じた広告を表示するために、Cookie（クッキー）を使用することがあります。
            </p>
            <p className="mb-3">
              Cookieを使用することで、GoogleはユーザーのWebサイトへのアクセス情報に基づいて適切な広告を配信します。なお、Cookieにより個人を特定できる情報は収集されません。
            </p>
            <p>
              Google AdSenseの詳細については、
              <a
                href="https://policies.google.com/technologies/ads?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Googleの広告に関するポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              アフィリエイト広告について
            </h2>
            <p className="mb-3">
              当サイトの一部の記事には、アフィリエイトプログラムを利用した広告リンクを掲載する場合があります。
            </p>
            <p className="mb-3">
              アフィリエイトリンクを経由してユーザーが商品・サービスを購入された場合、当サイトが紹介料を受け取ることがあります。なお、アフィリエイトリンクの利用によりユーザーに追加の費用が発生することはありません。
            </p>
            <p>
              現在利用しているアフィリエイトサービスプロバイダ（ASP）:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  A8.net（株式会社ファンコミュニケーションズ）
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              広告収益の用途
            </h2>
            <p>
              広告から得られる収益は、すべて当サイトの運営・改善に使用しています。具体的には、サーバー費用・ドメイン維持費・新機能の開発・コンテンツの充実などに充てています。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Cookieの管理について
            </h2>
            <p className="mb-3">
              広告の表示にあたり、Cookie（クッキー）が使用される場合があります。Cookieはユーザーのブラウザに保存される小さなテキストファイルで、ウェブサイトの利用状況の分析や広告の最適化に使用されます。
            </p>
            <p className="mb-3">
              ユーザーは、ブラウザの設定によりCookieの受け入れを拒否することができます。ただし、Cookieを無効にした場合、当サイトの一部機能（ローカルストレージによるデータ保存など）が正常に動作しない場合があります。
            </p>
            <p>
              また、Googleが提供する
              <a
                href="https://adssettings.google.com/authenticated"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                広告設定ページ
              </a>
              から、パーソナライズ広告の設定を変更することも可能です。
            </p>
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
                <Link href="/terms" className="text-blue-600 hover:underline">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  運営者情報
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
