import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "イベント・ウェディング業の見積書の書き方ガイド【記載例付き】 | 見積書メーカー",
  description: "イベント・ウェディング業の見積書の書き方を解説。会場費・装飾・音響・ケータリング・スタッフ費の記載方法、業態別の記載例、キャンセルポリシーの書き方まで網羅。",
  openGraph: {
    title: "イベント・ウェディング業の見積書の書き方ガイド【記載例付き】",
    description: "イベント・ウェディング業の見積書の書き方を解説。会場費・装飾・音響・ケータリング・スタッフ費の記載方法、業態別の記載例、キャンセルポリシーの書き方まで網羅。",
    url: "https://mitsumori-maker.com/guide/event",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/event",
  },
};

export default function EventGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="イベント・ウェディング業の見積書の書き方ガイド【記載例付き】"
        description="イベント・ウェディング業の見積書の書き方を解説。会場費・装飾・音響・ケータリング・スタッフ費の記載方法、業態別の記載例、キャンセルポリシーの書き方まで網羅。"
        slug="event"
        datePublished="2026-04-18"
        dateModified="2026-04-18"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">見積書ガイド</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">イベント・ウェディング業の見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            イベント・ウェディング業の見積書の書き方ガイド【記載例付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月18日</p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            イベント・ウェディング業の見積書は、他の業種と比べて構成要素が非常に多く、かつ金額規模も大きいため、一つひとつの項目を正確に記載することが特に重要です。会場費・装飾・音響・映像・ケータリング・スタッフ費・交通費・管理費など、複数の費用区分が絡み合うため、見積書が曖昧だとクライアントとの認識齟齬やトラブルの原因になります。
          </p>
          <p className="text-gray-700 mb-8 leading-relaxed">
            また、イベント・ウェディング業特有の課題として「日程変更・キャンセル」があります。準備段階から多くのリソースを投入するため、直前キャンセルは大きな損失につながります。見積書にキャンセルポリシー・変更条件・前払い金の扱いを明記しておくことは、ビジネスを守る上で欠かせません。この記事では、イベント会社・ウェディングプランナー・婚礼会場の担当者向けに、見積書の書き方を記載例とともに詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">イベント・ウェディング見積書に必要な項目</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            一般的な見積書の基本項目（見積番号・発行日・有効期限・発注者情報・発行者情報・合計金額）に加えて、イベント・ウェディング業では以下の項目を必ず記載する必要があります。費用の内訳を細かく分けることで、クライアントが何に費用がかかっているかを把握しやすくなり、受注率の向上にもつながります。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-600 px-4 py-2 text-left">費用区分</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">主な内訳項目</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">必須度</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">会場費</td>
                  <td className="border border-gray-300 px-4 py-2">会場使用料・控室・駐車場・クローク</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">装飾・花卉</td>
                  <td className="border border-gray-300 px-4 py-2">フラワーアレンジメント・テーブルコーディネート・バルーン・照明装飾</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">音響・映像</td>
                  <td className="border border-gray-300 px-4 py-2">PA機材・マイク・プロジェクター・スクリーン・映像制作・ライブ配信</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">ケータリング・飲食</td>
                  <td className="border border-gray-300 px-4 py-2">料理・飲み物・ウエディングケーキ・サービス料</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">スタッフ費</td>
                  <td className="border border-gray-300 px-4 py-2">プランナー・MC・司会者・スタッフ人件費・派遣費</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">撮影・記録</td>
                  <td className="border border-gray-300 px-4 py-2">スチール撮影・動画撮影・アルバム・DVD制作</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">交通費・搬入費</td>
                  <td className="border border-gray-300 px-4 py-2">機材搬入・設営・撤去・スタッフ交通費</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">管理費・企画費</td>
                  <td className="border border-gray-300 px-4 py-2">イベント企画・進行管理・リハーサル・打ち合わせ費</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">印刷物</td>
                  <td className="border border-gray-300 px-4 py-2">席次表・招待状・プログラム・横断幕・看板</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">状況に応じて</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">その他諸経費</td>
                  <td className="border border-gray-300 px-4 py-2">保険料・廃棄物処理・許可申請費用など</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">状況に応じて</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
            <p className="text-blue-800 text-sm font-semibold mb-2">見積書作成のポイント</p>
            <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
              <li>各費用区分をグループ化して小計を記載すると全体像がわかりやすい</li>
              <li>人数・時間・個数など数量の根拠を明記することで追加請求の根拠になる</li>
              <li>「込み」表記は避け、できる限り個別項目として分けて記載する</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">業態別の記載例</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            イベント・ウェディング業は業態によって見積書の構成が大きく異なります。ここでは代表的な3つの業態別に記載例を紹介します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">イベント会社（企業パーティー・懇親会 150名）</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            企業向けイベントは「企画・演出」と「運営・スタッフ」の両面が求められます。会場手配から当日運営まで一括で対応する場合は、各費用を明確に分けて記載することが重要です。管理費・企画費を別立てにしておくと、クライアントに対して付加価値を明示できます。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">品目</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">イベント企画・演出費</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">150,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">150,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">会場使用料（4時間）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">200,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">200,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">音響・PA機材一式（マイク4本含む）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">映像機材（プロジェクター・スクリーン）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">50,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">50,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">会場装飾（テーブル・受付・ステージ）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">120,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">120,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">ケータリング（立食・飲み物込み）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">150名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">4,500円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">675,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">司会者費用</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">60,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">60,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">スタッフ（当日運営・受付・誘導）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">5名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">25,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">125,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">機材搬入・搬出費</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">管理費（合計額の10%）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">149,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">149,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-8 italic">
            ※上記は税抜き金額です。別途消費税10%が加算されます。当日の人数増減については最終確定人数を2週間前にご連絡ください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">ウェディングプランナー（結婚式 80名・挙式＋披露宴）</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            ウェディングプランナーが手がける見積書は、「プランナーとしての役務」と「外注する各サービス」を明確に分けることがポイントです。新郎新婦が費用の流れを理解できるよう、外注先の名称や内容も記載するとより信頼感が高まります。前払い金（内金）の金額と支払いタイミングも必ず明記しましょう。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">品目</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">ウェディングプランニング費（打ち合わせ・手配一切）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">200,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">200,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">会場費（挙式・披露宴会場）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">350,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">350,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">ウェディングケーキ（3段・デコレーション）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1台</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">フラワーコーディネート（会場装花一式）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">250,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">250,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">料理（コース）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">18,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1,440,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">フリードリンク</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">3,500円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">280,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">音響・照明（披露宴演出）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">120,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">120,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">スチール撮影（データ300カット）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">100,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">100,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">席次表・メニュー印刷</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80部</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">800円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">64,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">司会者費用</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-8 italic">
            ※内金として契約時に合計金額の30%（税込）をお支払いください。残金は挙式3週間前までにお振込みください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">婚礼会場（ホテル・レストランウェディング）</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            婚礼会場が直接見積書を発行する場合、「会場内サービス」と「オプション」を明確に区別するのが一般的です。料理・ドリンクのグレードや、装飾の基本仕様とオプションアップグレードの金額差を一覧化すると、新郎新婦が比較検討しやすくなります。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">品目</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">数量</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">単価</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">金額</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">備考</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">会場使用料（チャペル＋披露宴会場）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">300,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">300,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">基本装飾込み</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">料理（スタンダードコース）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">60名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">20,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1,200,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">子供料理別途</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">フリードリンク（2時間）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">60名</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">4,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">240,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600"></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">サービス料</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">—</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">174,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">料理・飲物の15%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">【オプション】テーブル装花アップグレード</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">6卓</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">15,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">90,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">オプション</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">【オプション】ムービー制作（オープニング）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1本</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">70,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">70,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">オプション</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-8 italic">
            ※オプション項目は選択制です。最終確定はお申し込み後1ヶ月以内にご連絡ください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">見積書を作成する際の注意点</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            イベント・ウェディング業の見積書では、金額の記載に加えて「条件の明示」が特に重要です。以下の4つの注意点を必ず見積書に盛り込んでください。
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">1. キャンセルポリシーを必ず明記する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                イベント・ウェディング業は準備期間が長く、直前キャンセルは大きな損失につながります。「契約後のキャンセル料」「日程変更の扱い」「天災・疾病などの不可抗力時の対応」を見積書または添付の約款で明示しましょう。一般的な目安は「挙式・開催3ヶ月前まで無料、2ヶ月前から20%、1ヶ月前から50%、2週間前から80%、1週間以内100%」です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">2. 人数変更の条件と締め切りを記載する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                ウェディングやイベントは最終参加人数が変わることが多いため、「人数確定の締め切り日」と「変更可能な範囲」を明記することが必須です。たとえば「最終人数は2週間前までにご連絡ください。確定後の人数増加は1名単位で追加費用が発生します。人数減少の場合も確定人数での請求となります」のような記載が有効です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">3. 消費税の記載方法を統一する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                見積書全体で「税抜き表記」か「税込み表記」かを統一し、消費税額を別途明記します。ケータリングや飲食は軽減税率（8%）が適用される場合もあるため、品目によって税率が異なる場合は各行に適用税率を記載します。また、インボイス制度への対応として、登録番号を見積書に記載しておくことで取引先の仕入税額控除に対応できます。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">4. 前払い金（内金・手付金）の条件を明示する</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                高額になりがちなイベント・ウェディングの見積書では、前払い金の設定が一般的です。見積書に「内金：契約時に合計金額の30%」「残金：開催2週間前までに支払い」のように支払いスケジュールを明記します。手付金はキャンセル時に返金しない旨も合わせて記載しておくことでトラブルを防げます。
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">備考欄の文例（ウェディング向け）</h3>
            <div className="bg-white rounded p-4 text-sm text-gray-700 font-mono leading-relaxed">
              <p>・本見積書の有効期限は発行日より14日間です。</p>
              <p>・ご契約時に合計金額（税込）の30%を内金としてお支払いください。</p>
              <p>・最終確定人数は挙式2週間前までにご連絡ください。</p>
              <p>・確定後の人数増減はお1人様単価にて追加・減額いたします（人数減少の場合も確定人数での請求）。</p>
              <p>・キャンセルの場合は当社所定のキャンセル料を申し受けます。</p>
              <p>・天災・疫病等やむを得ない事由による中止の場合は実費のみ請求いたします。</p>
              <p>・価格はすべて税抜き表示です。別途消費税10%が加算されます。</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">見積書の有効期限と改訂の管理</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            イベント・ウェディング業では、仕入れ価格の変動・会場の空き状況・スタッフの確保状況など、見積もり時点の条件が短期間で変わることがあります。そのため、有効期限の設定と改訂管理が他の業種以上に重要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">有効期限は2週間以内が基本</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            一般的なビジネス見積書の有効期限は30日間が標準ですが、イベント・ウェディング業では会場の予約状況やシーズン需要によって価格が変動するため、有効期限を2週間（14日間）程度に設定するのが一般的です。特に繁忙期（春・秋・年末）は会場の空きが早く埋まるため、「本見積書の有効期限は〇〇年〇月〇日まで。期限後は改めてご確認ください」と明記します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">改訂版の管理方法</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            打ち合わせを重ねるごとに内容が変わるイベント・ウェディングでは、見積書の改訂版が複数発生します。トラブルを防ぐために以下の管理ルールを徹底してください。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li className="leading-relaxed"><span className="font-semibold">版番号を見積書番号に付ける：</span>「MITSUMORi-2026-001-v1」「-v2」のように改訂のたびに版番号を更新し、どのバージョンが最新かを明確にする。</li>
            <li className="leading-relaxed"><span className="font-semibold">前回からの変更箇所をメモする：</span>改訂理由（追加・削除・人数変更など）を備考欄または添付メモに記載し、クライアントと認識を合わせる。</li>
            <li className="leading-relaxed"><span className="font-semibold">最終確定版は必ず書面で確認を取る：</span>口頭やメッセージでの合意だけでなく、最終見積書に対するクライアントの承認（署名・メール返信）を記録として残す。</li>
            <li className="leading-relaxed"><span className="font-semibold">古いバージョンはアーカイブとして保管する：</span>万が一の時に「いつ、どのような見積もりを提示したか」の履歴として活用できる。</li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-8">
            <p className="text-yellow-800 text-sm font-semibold mb-2">イベント業特有の注意：「口頭発注」に注意する</p>
            <p className="text-yellow-700 text-sm leading-relaxed">
              イベント業では「急ぎで動いてほしい」という要請から、見積書の承認を待たずに準備を開始してしまうケースがあります。しかし、費用の合意なしに作業を進めると、後から「そんな金額は聞いていない」というトラブルになりやすいです。緊急対応が必要な場合でも、簡易版の見積書（メール添付でも可）に対するクライアントの承認を必ず取ってから着手する習慣をつけましょう。
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            イベント・ウェディング業の見積書は、金額の正確さだけでなく「条件の明示」と「バージョン管理」が成功の鍵です。詳細な見積書を作成することはクライアントの信頼獲得にも直結し、受注率の向上につながります。見積書メーカーを使えば、各項目を整理した見積書をすばやくPDF形式で無料作成できます。ぜひ活用してください。
          </p>
        </article>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">登録不要・完全無料・PDF出力対応</p>
          <Link
            href="/"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            見積書メーカーを使う →
          </Link>
        </div>
      </main>
    </div>
  );
}
