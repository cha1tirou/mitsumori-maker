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
              「見積書を1枚作るためだけに有料ソフトを契約するのは負担が大きい」「Excelテンプレートは計算ミスが起きやすい」「既存のクラウドサービスは会員登録が必須で無料プランに制限がある」——こうした課題を解決する、登録不要・完全無料で使えるブラウザ完結型のツールがあれば便利だと考え、2026年3月に見積書メーカーを公開しました。
            </p>
            <p className="mb-4">
              入力データはサーバーに保存せず、すべてブラウザ上で処理する設計にすることで、セキュリティ面の不安なくご利用いただけます。
            </p>
            <p>
              ガイド記事は、ツール開発の過程で調査した内容と、国税庁・中小企業庁・国土交通省などが公開する一次情報をもとに執筆しています。記載内容は一般的な情報提供を目的としており、業界での実務経験に基づくものではありません。実際の業務上の判断は、税理士・会計士・行政書士など各分野の専門家にご確認ください。
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
                <p className="font-semibold text-gray-900">見積書メーカー（個人運営）</p>
                <p className="text-sm text-gray-600 mt-1">
                  Webアプリケーション開発を主業務とする個人開発者が運営しています。業界での実務経験はありません。
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>Webアプリケーション開発（Next.js / TypeScript）</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>記事は公的機関（国税庁・中小企業庁・国土交通省など）の公開情報を参照して執筆</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 mt-0.5">-</span>
                <span>業界実務経験はなく、本サイトの記事は一般的な情報提供を目的としています</span>
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
