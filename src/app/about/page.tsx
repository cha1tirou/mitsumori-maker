import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報 | 見積書メーカー",
  description:
    "見積書メーカーの運営者情報ページです。サービス概要・提供機能・連絡先についてご案内します。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">
              見積書メーカー
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">運営者情報</span>
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">運営者情報</h1>
        <p className="text-gray-500 text-sm mb-8">最終更新日: 2026年4月10日</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              見積書メーカーを作った理由
            </h2>
            <p className="mb-4">
              中小企業の経理業務に携わる中で、「見積書を1枚作るためだけに有料ソフトを契約するのは負担が大きい」という声を数多く耳にしました。Excelテンプレートは計算ミスが起きやすく、フォーマットの統一も難しい。かといって、既存のクラウドサービスは会員登録が必須で、無料プランには制限がある。
            </p>
            <p className="mb-4">
              「登録不要・完全無料で、ブラウザだけで見積書が完成するツールがあれば」——その思いから、2026年3月に見積書メーカーを公開しました。入力データはサーバーに保存せず、すべてブラウザ上で処理する設計にすることで、セキュリティ面の不安なく安心してご利用いただけます。
            </p>
            <p>
              開発者自身が経理実務で感じた不便を解消するために作ったツールだからこそ、実務で本当に必要な機能を優先的に実装しています。ガイド記事も、現場でよくある疑問や失敗例をもとに執筆しています。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              運営者プロフィール
            </h2>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">見積書メーカー 編集部</p>
                <p className="text-sm text-gray-600 mt-1">
                  中小企業の経理・バックオフィス業務の経験をもとに、帳票作成の効率化ツールとノウハウを提供しています。
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>中小企業の経理実務経験（見積書・請求書・納品書の作成・管理）</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>Webアプリケーション開発（Next.js / TypeScript）</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>インボイス制度・電子帳簿保存法の実務対応経験</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              サービス概要
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 font-medium text-gray-900 whitespace-nowrap w-1/3">
                      サービス名
                    </th>
                    <td className="py-3">見積書メーカー</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 font-medium text-gray-900 whitespace-nowrap w-1/3">
                      URL
                    </th>
                    <td className="py-3">
                      <a
                        href="https://mitsumori-maker.com"
                        className="text-blue-600 hover:underline"
                      >
                        https://mitsumori-maker.com
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 font-medium text-gray-900 whitespace-nowrap w-1/3">
                      運営者
                    </th>
                    <td className="py-3">
                      個人運営（詳細は
                      <Link
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        お問い合わせフォーム
                      </Link>
                      よりご連絡ください）
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 font-medium text-gray-900 whitespace-nowrap w-1/3">
                      サービス開始
                    </th>
                    <td className="py-3">2026年3月</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 pr-4 font-medium text-gray-900 whitespace-nowrap w-1/3">
                      連絡先
                    </th>
                    <td className="py-3">
                      <Link
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        お問い合わせフォーム
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              提供機能
            </h2>
            <p className="mb-4">
              見積書メーカーは、ビジネスに必要な帳票を無料で作成できるWebサービスです。すべての機能を登録不要・完全無料でご利用いただけます。
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  <span className="font-medium text-gray-900">
                    見積書作成ツール
                  </span>
                  : 複数テンプレートから選べる見積書作成・PDF出力
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  <span className="font-medium text-gray-900">
                    請求書作成ツール
                  </span>
                  : インボイス制度対応の請求書作成・PDF出力
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  <span className="font-medium text-gray-900">
                    納品書作成ツール
                  </span>
                  : 納品書の作成・PDF出力
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  <span className="font-medium text-gray-900">
                    発注書作成ツール
                  </span>
                  : 発注書の作成・PDF出力
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  <span className="font-medium text-gray-900">
                    インボイス計算機
                  </span>
                  : 消費税額の自動計算ツール
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  <span className="font-medium text-gray-900">ガイド記事</span>
                  :
                  見積書の書き方・テンプレート・業種別ガイドなどの解説コンテンツ
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              サービスの特徴
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  会員登録不要 ―
                  アクセスしてすぐにご利用いただけます
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  完全無料 ―
                  すべての機能を無料でお使いいただけます
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  ブラウザ完結 ―
                  入力データはサーバーに送信・保存されません
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>
                  PDF出力対応 ―
                  作成した帳票をPDFファイルとしてダウンロードできます
                </span>
              </li>
            </ul>
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
