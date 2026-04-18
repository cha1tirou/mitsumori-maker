import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "建築設計・設計事務所の見積書の書き方ガイド【記載例・テンプレ付き】 | 見積書メーカー",
  description: "建築設計・設計事務所の見積書の書き方を解説。設計料・監理料の算出方法、住宅・商業・インテリア別の記載例、設計変更・法令申請費用の扱い方まで実務的に紹介。",
  openGraph: {
    title: "建築設計・設計事務所の見積書の書き方ガイド【記載例・テンプレ付き】",
    description: "建築設計・設計事務所の見積書の書き方を解説。設計料・監理料の算出方法、住宅・商業・インテリア別の記載例、設計変更・法令申請費用の扱い方まで実務的に紹介。",
    url: "https://mitsumori-maker.com/guide/architecture",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/architecture",
  },
};

export default function ArchitectureGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="建築設計・設計事務所の見積書の書き方ガイド【記載例・テンプレ付き】"
        description="建築設計・設計事務所の見積書の書き方を解説。設計料・監理料の算出方法、住宅・商業・インテリア別の記載例、設計変更・法令申請費用の扱い方まで実務的に紹介。"
        slug="architecture"
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
            <span className="text-gray-800">建築設計・設計事務所の見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            建築設計・設計事務所の見積書の書き方ガイド【記載例・テンプレ付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月18日</p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            建築設計・設計事務所の業務は、基本設計・実施設計・工事監理など複数のフェーズにまたがり、費用の構成が複雑になりやすい業種です。クライアントが「設計料としていくら支払うのか」を明確に把握できる見積書を作成することは、業務受注後のトラブル防止と信頼関係構築の両面で非常に重要です。
          </p>
          <p className="text-gray-700 mb-8 leading-relaxed">
            この記事では、建築士・設計事務所・インテリアデザイナーが実務で使える見積書の書き方を、必要項目の解説から業態別の記載例、設計料の算出方法、設計変更時の対処法まで詳しく説明します。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
            <p className="text-blue-800 text-sm font-semibold mb-2">建築設計見積書で特に重要な3点</p>
            <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
              <li>設計料・監理料・申請費などをフェーズ別に分けて記載する</li>
              <li>設計変更が生じた場合の追加費用の扱いを明示する</li>
              <li>業務範囲（どこまでが設計料に含まれるか）を明確にする</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">建築設計見積書に必要な項目</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            建築設計の見積書には、一般的な見積書の基本項目（見積番号・発行日・有効期限・発注者情報・発行者情報・合計金額・消費税）に加えて、設計業務に特有の項目を記載する必要があります。業務を「設計フェーズ」と「費用の種類」の2軸で整理すると、クライアントに分かりやすい見積書になります。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-600 px-4 py-2 text-left">項目</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">記載内容の例</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">必須度</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">業務名称・対象物件</td>
                  <td className="border border-gray-300 px-4 py-2">〇〇邸新築設計業務 / ◯◯ビル改修設計</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">建物概要</td>
                  <td className="border border-gray-300 px-4 py-2">木造2階建・延床面積120m²・専用住宅</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">基本設計料</td>
                  <td className="border border-gray-300 px-4 py-2">プランニング・スペーススタディ・概算工事費算出</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">実施設計料</td>
                  <td className="border border-gray-300 px-4 py-2">施工図・仕様書・各種申請図書の作成</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">工事監理料</td>
                  <td className="border border-gray-300 px-4 py-2">定期現場確認・施工者との調整・竣工検査</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">確認申請費用</td>
                  <td className="border border-gray-300 px-4 py-2">建築確認申請・長期優良住宅申請・その他法令申請</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">必須</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">構造設計費</td>
                  <td className="border border-gray-300 px-4 py-2">構造計算・構造図（外注の場合は実費）</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">設備設計費</td>
                  <td className="border border-gray-300 px-4 py-2">電気・給排水・空調設備の設計（外注の場合は実費）</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">調査・測量費</td>
                  <td className="border border-gray-300 px-4 py-2">敷地測量・地盤調査・現況確認（外注実費含む）</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">交通費・経費</td>
                  <td className="border border-gray-300 px-4 py-2">現場往復交通費（実費）・印刷製本費</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">業務スケジュール</td>
                  <td className="border border-gray-300 px-4 py-2">基本設計2ヶ月・実施設計3ヶ月・監理期間12ヶ月</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-600 font-semibold">推奨</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            特に「確認申請費用」は設計事務所が立替払いをするケースも多いため、「実費精算」か「見積書に含む」かを明確に区分することが重要です。申請手数料は物件の規模・用途によって変わるため、概算額と「確定後に精算する」旨を記載する方法も有効です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">業態別の記載例</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            建築設計は住宅・商業施設・インテリアデザインなど業態によって業務内容が異なります。それぞれの代表的な記載例を紹介します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">住宅設計（木造戸建・新築）</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            個人クライアントが多い住宅設計では、費用の内訳をわかりやすく記載することが信頼獲得につながります。設計・監理・申請のフェーズを分けて記載し、合計金額を明示します。工事費に対する料率も備考欄に添えると、クライアントが金額の妥当性を判断しやすくなります。
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
                  <td className="border border-gray-300 px-4 py-2">基本設計料（プランニング・スペーススタディ・模型）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">400,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">400,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">実施設計料（施工図・仕様書・確認申請図書）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">600,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">600,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">工事監理料（定期現場確認・施工者調整・竣工検査）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">400,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">400,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">建築確認申請費（申請代行・手数料含む）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">150,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">150,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">地盤調査費（外注実費）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">70,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">70,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">交通費・経費（現場往復・印刷製本）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">実費</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">実費</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-8 italic">
            ※想定工事費2,000万円に対する設計・監理料率：約7%（設計料1,000,000円 + 監理料400,000円）。構造計算は別途費用が発生する場合があります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">商業施設設計（店舗・オフィス・テナント）</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            商業施設・テナント設計は、施主とテナントオーナー・管理会社との三者が関わるケースが多く、承認フローの記載も重要です。内装・設備・サインのそれぞれの設計範囲を明示し、施工会社との役割分担（設計のみか設計施工かどうか）も見積書に記載しておくとトラブルを防げます。
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
                  <td className="border border-gray-300 px-4 py-2">基本設計料（コンセプト立案・ゾーニング・パース制作）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">350,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">350,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">実施設計料（施工図・仕上げ表・設備図）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">450,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">450,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">工事監理料（現場確認・施工者調整）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">250,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">250,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">確認申請・消防届出（代行・手数料含む）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">120,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">120,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">3DCGパース・プレゼンテーション資料作成</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">3カット</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">30,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">90,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">交通費（実費精算・上限30,000円）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">実費</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">実費</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-8 italic">
            ※本見積は設計・監理業務のみ。内装施工費は別途施工会社よりご提示します。サイン・家具・照明器具の購入代理は対象外です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">インテリアデザイン（住宅リノベーション・内装）</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            インテリアデザインはスペースの規模が小さい分、設計料の絶対額が抑えられる一方で、素材選定・家具コーディネート・照明計画など細かな項目が多いのが特徴です。時間制料金（時給制・日当制）を採用する場合は単価と想定時間数を明記します。
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
                  <td className="border border-gray-300 px-4 py-2">インテリアデザイン料（コンセプト・ゾーニング・素材選定）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">250,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">250,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">施工図作成（平面・展開・天井・建具図）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">180,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">180,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">家具・照明コーディネート（選定・発注代行）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">1式</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">80,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">現場監修（施工確認・仕上げ指示）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">3回</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">20,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">60,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">3DCGパース（リビング・ダイニング）</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">2カット</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">25,000円</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">50,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mb-8 italic">
            ※家具・照明・建材の購入費用は含みません。発注代行に伴うコーディネート手数料は商品価格の10%を別途申し受けます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">設計料の算出方法と記載方法</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            建築設計料の算出方法は主に3つあります。それぞれに特徴があり、プロジェクトの性質やクライアントとの関係性に応じて使い分けることが一般的です。
          </p>

          <div className="space-y-5 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">1. 工事費に対する料率（パーセンテージ）方式</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                最も一般的な算出方法です。想定工事費に対して設計料率（一般的に5〜15%）を掛けて算出します。国土交通省の「業務報酬基準（告示15号）」を参考にする事務所も多く、設計の難易度・規模・構造種別によって料率が変わります。
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 font-mono">
                <p>例：想定工事費 2,000万円 × 設計・監理料率 8% = 設計・監理料 160万円</p>
                <p className="mt-1">　　（設計料 100万円 + 監理料 60万円 として分けて記載）</p>
              </div>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                注意点として、概算工事費を基に見積書を作成した場合、工事費確定後に設計料を精算する旨を備考欄に記載しておくことが重要です。
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">2. 面積単価方式</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                建物の床面積（m²）に単価を掛けて算出する方法です。「1m²あたり◯◯円」という形で記載します。住宅設計では5,000〜15,000円/m²が目安とされることが多いですが、構造・仕様・立地によって変動します。
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 font-mono">
                <p>例：延床面積 120m² × 設計監理単価 10,000円/m² = 設計・監理料 120万円</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">3. 時間制（タイムチャージ）方式</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                1時間あたりの業務単価と想定工数を掛けて算出する方法です。インテリアデザインや小規模なコンサルティング業務で採用されることが多く、業務内容が事前に確定しにくい案件に向いています。見積書には「想定工数◯時間・単価◯◯円/時間」と記載し、超過した場合は追加請求となる旨も明示します。
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 font-mono">
                <p>例：設計コンサルティング 20時間 × 15,000円/時間 = 300,000円</p>
                <p className="mt-1">　　（想定超過分は都度ご相談・追加見積となります）</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-600 px-4 py-2 text-left">算出方法</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">向いている案件</th>
                  <th className="border border-gray-600 px-4 py-2 text-left">注意点</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">工事費料率方式</td>
                  <td className="border border-gray-300 px-4 py-2">新築・増改築・大規模改修</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">工事費変動時の精算ルールを明記</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">面積単価方式</td>
                  <td className="border border-gray-300 px-4 py-2">住宅・マンション・規模が明確な案件</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">面積確定前は概算であることを明示</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium">時間制方式</td>
                  <td className="border border-gray-300 px-4 py-2">インテリア・コンサル・部分的業務</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">超過時の追加請求ルールを明示</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">建築設計見積書作成時の注意点</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            建築設計の業務では、設計変更・追加業務・法令対応など、当初の見積書の範囲を超えた費用が発生するケースが頻繁にあります。以下の点を事前に見積書または業務委託契約書に記載しておくことで、後のトラブルを防ぐことができます。
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">1. 設計変更・追加業務の費用の扱い</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                実施設計着手後のプラン変更（間取り変更・仕様変更・面積変更）は、追加設計料が発生することを見積書の備考欄に明記します。「基本設計完了後の大幅な変更については、変更規模に応じた追加費用を別途申し受けます」という一文を入れておくだけで、クライアントへの説明が格段に容易になります。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">2. 法令申請費用の取り扱い</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                建築確認申請の手数料は物件規模・構造・用途によって異なります。見積書には「概算◯◯円（確定後精算）」と記載し、実費精算であることを明示します。長期優良住宅・フラット35適合・省エネ適判など追加申請が必要な場合は、それぞれ別項目として記載します。確認申請の申請先（民間確認検査機関か特定行政庁か）によっても手数料が異なるため、確定後に改めて通知する旨を記載しておくと安心です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">3. 外注費の記載方法</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                構造設計・設備設計・測量・地盤調査などを外部の専門家に委託する場合は、「外注費（実費）」として明確に記載します。設計事務所がマークアップ（手数料）を加算する場合はその旨と料率も記載しておきましょう。外注費は概算の場合も多いため、「確定見積取得後に精算」という記載が適切なケースが多いです。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">4. 業務範囲の明確化</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                見積書には「本見積に含まれる業務の範囲」と「含まれない業務」を明示することが重要です。例えば、「インテリアコーディネート・家具選定は対象外」「解体工事の設計・監理は対象外」「竣工後のアフターサービスは対象外」などを記載しておくと、クライアントが追加で依頼を行う際に事前交渉しやすくなります。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">5. 工事費変動時の設計料精算ルール</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                工事費料率方式で設計料を算出した場合、工事費の増減に伴い設計料も変動します。「概算工事費を基に算出した設計料であり、実際の工事費確定後に差額を精算する」旨を記載します。特に資材価格の変動が大きい現在の建設市場では、この一文が重要なトラブル防止策となります。
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">建築設計見積書の備考欄記載例</h3>
            <div className="bg-white rounded p-4 text-sm text-gray-700 font-mono leading-relaxed">
              <p>・本見積書の有効期限は発行日より60日間です。</p>
              <p>・確認申請手数料は概算であり、確定後に精算いたします。</p>
              <p>・基本設計完了後の大幅な変更（面積・構造・仕様の変更）は追加費用が発生します。</p>
              <p>・構造設計・設備設計は外注費（実費）として別途精算いたします。</p>
              <p>・工事費料率方式のため、工事費確定後に設計監理料を精算いたします。</p>
              <p>・交通費は実費にて月次精算（領収書添付）いたします。</p>
              <p>・本見積は設計・監理業務のみで、施工費・材料費は含みません。</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            建築設計の見積書は、単なる料金表ではなく、業務範囲・スケジュール・費用の算出根拠をクライアントと共有するための重要なコミュニケーションツールです。項目を丁寧に整理した見積書は、クライアントの信頼獲得にもつながり、受注率の向上にも寄与します。見積書メーカーを使えば、これらの項目を漏れなく記載したプロフェッショナルな見積書をPDF形式で無料作成できます。
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
