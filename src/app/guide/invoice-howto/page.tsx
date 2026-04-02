import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "請求書の書き方ガイド・必要な記載項目を解説 | 見積書メーカー",
  description:
    "請求書の書き方を初心者向けに解説。必要な記載項目、インボイス制度対応のポイント、発行タイミング、無料で作成する方法をまとめました。",
};

export default function GuideInvoiceHowtoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="請求書の書き方ガイド・必要な記載項目を解説"
        description="請求書の書き方を初心者向けに解説。必要な記載項目、インボイス制度対応のポイントをまとめました。"
        slug="invoice-howto"
        datePublished="2026-04-02"
        dateModified="2026-04-02"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">見積書メーカー</Link>
            <span className="mx-1">/</span>
            <span>ガイド</span>
            <span className="mx-1">/</span>
            <span className="text-gray-700">請求書の書き方</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            &larr; 見積書メーカーに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            請求書の書き方ガイド・必要な記載項目を解説
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月2日</p>

          {/* --- 1 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            請求書とは？見積書・納品書との違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書は、商品やサービスを提供した後に代金の支払いを求めるための書類です。見積書・納品書と合わせて「取引の三点セット」と呼ばれ、それぞれ以下の役割があります。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">書類</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">タイミング</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">役割</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-gray-700">見積書</td>
                  <td className="px-4 py-2 text-gray-700">取引前</td>
                  <td className="px-4 py-2 text-gray-700">金額・条件の提示</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">納品書</td>
                  <td className="px-4 py-2 text-gray-700">納品時</td>
                  <td className="px-4 py-2 text-gray-700">納品内容の確認</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">請求書</td>
                  <td className="px-4 py-2 text-gray-700">納品後</td>
                  <td className="px-4 py-2 text-gray-700">代金の請求</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書は「いくらかかるか」を事前に伝える書類であるのに対し、請求書は「この金額を支払ってください」と確定した金額を通知する書類です。見積書の段階では金額が変わる可能性がありますが、請求書は確定額を記載します。
          </p>

          {/* --- 2 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            請求書に必要な記載項目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            法的に有効な請求書には、以下の項目を記載する必要があります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>請求書番号</strong>
              ：管理のために一意の番号を振ります（例：INV-2026-001）
            </li>
            <li>
              <strong>発行日</strong>
              ：請求書を発行した日付
            </li>
            <li>
              <strong>宛先</strong>
              ：取引先の会社名・担当者名・住所
            </li>
            <li>
              <strong>発行者情報</strong>
              ：自社の会社名・住所・電話番号・メールアドレス
            </li>
            <li>
              <strong>品目・サービス内容</strong>
              ：提供した商品やサービスの詳細
            </li>
            <li>
              <strong>数量・単価・金額</strong>
              ：各品目の数量と単価、小計
            </li>
            <li>
              <strong>消費税額</strong>
              ：税率ごとの消費税額を明記（インボイス制度対応）
            </li>
            <li>
              <strong>合計金額</strong>
              ：税込の合計金額
            </li>
            <li>
              <strong>支払期限</strong>
              ：「〇年〇月〇日までにお支払いください」と明記
            </li>
            <li>
              <strong>振込先口座情報</strong>
              ：銀行名・支店名・口座種別・口座番号・口座名義
            </li>
          </ul>

          {/* --- 3 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            インボイス制度対応の請求書の書き方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            2023年10月に開始されたインボイス制度（適格請求書等保存方式）により、仕入税額控除を受けるためには「適格請求書（インボイス）」の発行が必要になりました。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス対応の請求書では、通常の記載項目に加えて以下が必須です。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>適格請求書発行事業者の登録番号</strong>
              ：「T」＋13桁の数字（例：T1234567890123）
            </li>
            <li>
              <strong>税率ごとに区分した消費税額</strong>
              ：標準税率（10%）と軽減税率（8%）を分けて記載
            </li>
            <li>
              <strong>税率ごとに区分した対象金額</strong>
              ：それぞれの税率に対応する取引金額の合計
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            登録番号を持っていない場合（免税事業者の場合）は、インボイスを発行できません。取引先が仕入税額控除を受けられなくなるため、フリーランスや個人事業主は登録の要否を検討する必要があります。
          </p>

          {/* --- 4 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            請求書の発行タイミングと送付方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書の発行タイミングは、取引先との取り決めによって異なります。一般的なパターンは以下の通りです。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>
              <strong>都度請求</strong>
              ：納品の都度、請求書を発行。単発案件やプロジェクト型の取引に多い
            </li>
            <li>
              <strong>月末締め翌月請求</strong>
              ：毎月末で締めて翌月に請求書を発行。継続取引やサブスクリプションに多い
            </li>
            <li>
              <strong>検収後請求</strong>
              ：取引先が検収（内容確認）を完了した後に発行。大型プロジェクトに多い
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            送付方法は、近年ではメールでのPDF送付が主流です。郵送の場合は到着までの日数を考慮して、支払期限の2週間前には発送しましょう。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            電子帳簿保存法により、メールで受け取った請求書データは電子データのまま保存する義務があります。PDF形式で送付・保存するのが最もシンプルな方法です。
          </p>

          {/* --- 5 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            無料で請求書を作成する方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            請求書を作成する方法はいくつかあります。
          </p>
          <div className="space-y-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                1. オンラインツールを使う（おすすめ）
              </p>
              <p className="text-gray-600 text-sm">
                ブラウザ上でフォームに入力するだけで、インボイス対応の請求書をPDF出力できます。計算ミスが起きにくく、最も手軽な方法です。当サイトの「請求書メーカー」なら登録不要・無料で使えます。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                2. Excelテンプレートを使う
              </p>
              <p className="text-gray-600 text-sm">
                Excel用の請求書テンプレートをダウンロードして使う方法です。カスタマイズの自由度は高いですが、計算式の設定ミスや、PDF変換時のレイアウト崩れに注意が必要です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                3. 会計ソフトから発行する
              </p>
              <p className="text-gray-600 text-sm">
                freeeやマネーフォワードなどの会計ソフトには請求書発行機能があります。売上管理と連動できるメリットがありますが、有料プランが必要な場合があります。
              </p>
            </div>
          </div>

          {/* 関連ガイド */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            関連ガイド
          </h2>
          <ul className="space-y-2 mb-4">
            <li>
              <Link
                href="/guide/difference"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書・請求書・納品書の違い
              </Link>
            </li>
            <li>
              <Link
                href="/guide/consumption-tax"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書の消費税の書き方・インボイス対応
              </Link>
            </li>
            <li>
              <Link
                href="/guide/email"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書のメール送付マナー・例文
              </Link>
            </li>
          </ul>
        </article>

        {/* CTA — 請求書メーカーへの導線 */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            請求書を今すぐ無料で作成
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・インボイス対応・PDF出力
          </p>
          <Link
            href="/tools/invoice"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            請求書メーカーを使う &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
