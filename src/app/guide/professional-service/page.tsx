import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import AuthorProfile from "@/components/AuthorProfile";
import ToolCallout from "@/components/ToolCallout";

export const metadata: Metadata = {
  title: "士業（税理士・社労士・行政書士）の見積書・報酬見積書の書き方ガイド | 見積書メーカー",
  description:
    "税理士・社労士・行政書士など士業の報酬見積書の書き方を解説。顧問料・スポット報酬の記載例、消費税・インボイス対応、見積書と業務委託契約書の違いまで網羅。",
  openGraph: {
    title: "士業（税理士・社労士・行政書士）の見積書・報酬見積書の書き方ガイド | 見積書メーカー",
    description:
      "税理士・社労士・行政書士など士業の報酬見積書の書き方を解説。顧問料・スポット報酬の記載例、インボイス対応まで網羅。",
    url: "https://mitsumori-maker.com/guide/professional-service",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E5%A3%AB%E6%A5%AD%E3%81%AE%E5%A0%B1%E9%85%AC%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "士業の報酬見積書の書き方ガイド",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/professional-service",
  },
};

export default function GuideProfessionalServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="士業（税理士・社労士・行政書士）の見積書・報酬見積書の書き方ガイド"
        description="税理士・社労士・行政書士など士業の報酬見積書の書き方を解説。顧問料・スポット報酬の記載例、インボイス対応まで網羅。"
        slug="professional-service"
        datePublished="2026-04-19"
        dateModified="2026-04-19"
        faqs={[
          {
            question: "税理士の見積書に登録番号（T番号）は必要ですか？",
            answer:
              "インボイス制度（適格請求書等保存方式）に対応している税理士は、見積書・請求書に適格請求書発行事業者登録番号（T＋13桁）を記載しましょう。依頼者（事業者）が仕入税額控除を受けるためには、登録番号の記載された適格請求書が必要です。課税売上高1,000万円以下の免税事業者は登録不要ですが、登録しない場合は依頼者が消費税を控除できないことを事前に説明するのが望ましいです。",
          },
          {
            question: "社労士の顧問料と手続き代行料は分けて記載すべきですか？",
            answer:
              "はい、分けて記載することを強くお勧めします。顧問料（月額固定）と手続き代行料（都度発生）を一本化すると、依頼者が「顧問料に含まれている」と誤解しやすくなります。明細を分けることで、月々の固定費と変動費が明確になり、後のトラブルを防げます。",
          },
          {
            question: "行政書士の見積書で源泉徴収は必要ですか？",
            answer:
              "行政書士への報酬は所得税法上の源泉徴収対象外です（税理士・社労士・弁護士・司法書士などは源泉徴収対象）。ただし、税理士や弁護士など源泉徴収対象の士業は、依頼者が法人や個人事業主の場合、支払報酬から10.21%（100万円超は20.42%）の源泉所得税を差し引いて支払う義務があります。見積書の備考欄に「源泉徴収後の振込金額をお願いいたします」と明記しておくと混乱を防げます。",
          },
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">/</span>
            <span>ガイド</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800">士業の報酬見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            士業（税理士・社労士・行政書士）の見積書・報酬見積書の書き方ガイド
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月19日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            税理士・社労士（社会保険労務士）・行政書士などの士業は、専門的な知識やライセンスを活かして報酬を受け取ります。しかし、無形のサービスが多い士業では「何にいくら払うのか」が不透明になりがちで、見積書（報酬見積書）を適切に作成することがトラブル防止と信頼構築の両面で欠かせません。本記事では、士業特有の見積書の書き方、業種ごとの記載項目と記載例、消費税・インボイス対応、見積書と業務委託契約書の違いまで詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            士業の見積書・報酬見積書の特徴と重要性
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            士業の見積書が一般的な物品販売やIT制作業と異なる点は、主に以下の3つです。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>業務の種類が多岐にわたる</strong>：顧問契約（月額固定）・スポット業務（単発）・手続き代行（都度発生）が混在します。見積書で整理しないと依頼者が費用を把握できません。
            </li>
            <li>
              <strong>源泉徴収の扱いがある</strong>：税理士・社労士・弁護士・司法書士などへの報酬は所得税の源泉徴収対象です。見積書に税込金額と源泉税額の扱いを明記しなければ、受取金額をめぐるトラブルになります。
            </li>
            <li>
              <strong>インボイス対応が取引先に直結する</strong>：依頼者が消費税を仕入税額控除するには、適格請求書発行事業者登録番号（T番号）の記載が必要です。見積書の段階から登録番号を記載することで、後の請求書とも一貫した対応になります。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を発行する習慣がない士業事務所も多いですが、特に新規クライアントへの提案や複数業務の組み合わせ受注では、事前に見積書を提出することが依頼者の意思決定を促し、契約率の向上にもつながります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            業種別の見積書項目と記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            税理士・社労士・行政書士では、それぞれ扱う業務領域が異なるため、見積書の品目構成も変わってきます。業種ごとの代表的な品目と料金の目安を整理します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            税理士の見積書（年間顧問契約の記載例）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            税理士業務で最も多いのが法人・個人事業主との顧問契約です。月次業務と年次業務を分けて記載すると依頼者が費用構造を理解しやすくなります。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">品目</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">数量</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">単位</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">単価（税抜）</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">金額（税抜）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">月次顧問料</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">12</td>
                  <td className="border border-gray-200 px-3 py-2">ヶ月</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">30,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">360,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">記帳代行（月次）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">12</td>
                  <td className="border border-gray-200 px-3 py-2">ヶ月</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">15,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">180,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">決算申告料（法人税・消費税）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1</td>
                  <td className="border border-gray-200 px-3 py-2">式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">法人事業概況説明書作成</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1</td>
                  <td className="border border-gray-200 px-3 py-2">式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">20,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">20,000</td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border border-gray-200 px-3 py-2" colSpan={4}>
                    小計（税抜）
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right">710,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2" colSpan={4}>
                    消費税（10%）
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right">71,000</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="border border-gray-200 px-3 py-2" colSpan={4}>
                    合計（税込）
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right">781,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            決算申告料はスポット料金として年1回発生します。月次顧問料と混在させず、年次費用として別行に記載するのが明瞭です。また、法人規模（売上・仕訳数）によって料金が変わる場合は、備考欄に「売上高3,000万円以下・月次仕訳100件以内の場合の料金です」と条件を明示しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            社会保険労務士（社労士）の見積書
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            社労士業務は「顧問業務（相談・アドバイス）」と「手続き代行（行政機関への申請）」に大別されます。手続き代行は件数に応じて発生するため、顧問料と手続き料を分けて記載することが重要です。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">品目</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">数量</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">単位</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">単価（税抜）</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">金額（税抜）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">労務顧問料（月額）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">12</td>
                  <td className="border border-gray-200 px-3 py-2">ヶ月</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">25,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">300,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">給与計算代行（月額）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">12</td>
                  <td className="border border-gray-200 px-3 py-2">ヶ月</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">20,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">240,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">社会保険・労働保険年次更新手続き</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1</td>
                  <td className="border border-gray-200 px-3 py-2">式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">30,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">30,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">就業規則作成・見直し（スポット）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1</td>
                  <td className="border border-gray-200 px-3 py-2">式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            給与計算代行は従業員数によって単価が変わるケースが多いため、「従業員10名以下の場合」などの条件を備考欄に記載します。スポット業務（就業規則作成・助成金申請など）は月額顧問料とは別に発生することを明示しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            行政書士の見積書
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            行政書士業務はほぼすべてスポット（1件ごとの手続き代行）です。許認可申請・外国人ビザ申請・各種書類作成など業務の種類が多いため、品目を具体的に記載することが大切です。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">品目</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">数量</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">単位</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">単価（税抜）</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">金額（税抜）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">建設業許可申請（新規・知事許可）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1</td>
                  <td className="border border-gray-200 px-3 py-2">件</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">書類収集・取得代行（法務局・市役所等）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1</td>
                  <td className="border border-gray-200 px-3 py-2">式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">20,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">20,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">実費（証明書取得・登録免許税等）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1</td>
                  <td className="border border-gray-200 px-3 py-2">式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">90,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">90,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            行政書士の見積書では、報酬部分と実費（申請手数料・収入印紙・証明書取得費用など）を必ず分けて記載してください。実費に消費税はかかりませんが、報酬部分には10%の消費税が課税されます。また、行政書士への報酬は源泉徴収の対象外です（税理士・社労士は対象）。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            業務委託料・顧問料・スポット料の記載方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            士業の報酬体系は大きく3種類に分かれます。依頼内容に応じて適切な料金区分を選び、見積書で明確に示しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 顧問料（月額固定）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            毎月一定の業務を継続的に行う対価として設定します。「月額○万円 × 12ヶ月」のように記載し、顧問料に含まれる業務範囲を備考欄に明示します。含まれない業務（スポット手続きなど）は必ず除外事項として書いておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. スポット報酬（単発業務）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            1件ごとの申請・作成業務などに適用します。「○○申請代行 1件 ○○,○○○円」のように、業務名・件数・単価を明記します。同種の業務でも難易度によって料金が異なる場合は、見積書内の備考欄か別紙で条件を説明しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 成功報酬・インセンティブ報酬
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            助成金申請（受給額の○%）や補助金申請支援などで用いられます。見積書には「着手金○万円 + 採択時の成功報酬（補助金受給額の○%）」のように、固定部分と成果連動部分を分けて記載します。成果の定義（採択・受給決定・入金など）を明確にしないとトラブルになります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            消費税の扱いとインボイス対応
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            士業の報酬見積書における消費税とインボイス制度の対応は、依頼者との取引において重要なポイントです。<Link href="/guide/consumption-tax" className="text-blue-600 hover:text-blue-800 underline">見積書の消費税の書き方・インボイス対応ガイド</Link>も参考にしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            消費税の記載ルール
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>税抜表示が基本</strong>：「小計（税抜）＋消費税10%＝合計（税込）」の形式で明示します。税込金額のみの記載は、依頼者が消費税額を把握できず、経理処理に支障をきたします。
            </li>
            <li>
              <strong>実費は消費税の扱いに注意</strong>：行政手続きの実費（収入印紙・登録免許税・印鑑証明書取得費用など）は、原則として立替払いとして取り扱い、消費税を課さないのが一般的です。「実費相当額（消費税不課税）」と明記しましょう。
            </li>
            <li>
              <strong>源泉所得税の記載</strong>：税理士・社労士・弁護士・司法書士など源泉徴収対象の士業は、見積書の備考欄に「源泉所得税（10.21%）差引後の金額をお振込みください」と明示します。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            インボイス（適格請求書）への対応
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            2023年10月から始まったインボイス制度では、依頼者（課税事業者）が仕入税額控除を受けるために、受け取った請求書・見積書に適格請求書発行事業者登録番号（T＋13桁）の記載が必要です。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-blue-800 mb-2">インボイス対応チェックリスト</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ 適格請求書発行事業者登録番号（T番号）を見積書に記載する</li>
              <li>✓ 税率ごとに区分した税抜金額・消費税額を明示する</li>
              <li>✓ 免税事業者の場合は依頼者に事前に説明し、書面で確認を取る</li>
              <li>✓ 見積書の登録番号と請求書の登録番号を一致させる</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            なお、課税売上高1,000万円以下の小規模事務所で適格請求書発行事業者に登録していない場合、依頼者側で80%（2026年9月まで）または50%（2029年9月まで）の仕入税額控除しか受けられません。登録の有無は、見積書の段階で依頼者に明示しておきましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書と業務委託契約書の違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            士業と依頼者の間では、見積書のほかに業務委託契約書（顧問契約書）を締結するケースがほとんどです。両者の役割の違いを理解し、適切に使い分けましょう。
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">項目</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">見積書</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">業務委託契約書</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">目的</td>
                  <td className="border border-gray-200 px-3 py-2">業務内容と費用の提案・確認</td>
                  <td className="border border-gray-200 px-3 py-2">権利義務関係の法的確定</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">法的効力</td>
                  <td className="border border-gray-200 px-3 py-2">契約そのものではない（提案書）</td>
                  <td className="border border-gray-200 px-3 py-2">双方署名・捺印で契約成立</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">記載内容</td>
                  <td className="border border-gray-200 px-3 py-2">品目・数量・単価・合計・有効期限</td>
                  <td className="border border-gray-200 px-3 py-2">業務範囲・報酬・守秘義務・解除条件・損害賠償</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">発行タイミング</td>
                  <td className="border border-gray-200 px-3 py-2">契約前（提案・交渉段階）</td>
                  <td className="border border-gray-200 px-3 py-2">受注決定後（着手前）</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">有効期限</td>
                  <td className="border border-gray-200 px-3 py-2">通常30日（価格の有効期間）</td>
                  <td className="border border-gray-200 px-3 py-2">契約期間（例：1年・自動更新）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            士業の実務では、見積書を提出して依頼者の承認を得た後、業務委託契約書（顧問契約書）を締結するという流れが一般的です。見積書の内容が契約書の業務範囲・報酬条件と一致するよう、見積書の段階から正確な記載を心がけましょう。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の有効期限の設定については、<Link href="/guide/valid-period" className="text-blue-600 hover:text-blue-800 underline">見積書の有効期限の設定方法ガイド</Link>もあわせてご覧ください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            士業の見積書作成で注意すべきポイント
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント1：業務範囲の除外事項を明記する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「顧問料に含まれない業務」を明示することがトラブル防止の鍵です。例えば税理士の場合、「月次顧問料には確定申告・決算業務は含みません（別途申告料が発生します）」と記載しないと、依頼者が勘違いするケースがあります。社労士の顧問料に含まれない「社会保険の新規適用手続き」「労働保険の新規加入手続き」なども同様です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント2：見積書番号と発行日を必ず記載する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            複数の見積書を管理するために、見積書番号（例：EST-2026-001）と発行日は必須です。有効期限（通常は発行日から30日）も記載し、期限後は改めて見積もりを取り直す旨を明記しましょう。<Link href="/guide/how-to-write" className="text-blue-600 hover:text-blue-800 underline">見積書の基本的な書き方・必須項目</Link>も参考にしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ポイント3：フリーランス士業の場合は屋号と資格登録番号も記載する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            個人で開業している士業は、見積書の発行者欄に屋号（または氏名）・住所・連絡先に加えて、各士業の資格登録番号（税理士登録番号・社労士登録番号など）を記載すると信頼性が高まります。フリーランスの見積書の書き方全般については、<Link href="/guide/freelance" className="text-blue-600 hover:text-blue-800 underline">フリーランス・個人事業主のための見積書ガイド</Link>もご参照ください。
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">備考欄の記載例（税理士・顧問契約の場合）</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>・本見積もりの有効期限：2026年5月19日</li>
              <li>・月次顧問料には記帳代行・税務相談（月2回まで）を含みます</li>
              <li>・決算申告料・修正申告・税務調査対応は別途お見積もりいたします</li>
              <li>・適格請求書発行事業者登録番号：T1234567890123</li>
              <li>・源泉所得税（10.21%）差引後の金額をお振込みください</li>
              <li>・お支払条件：毎月末日締め、翌月末日払い（銀行振込）</li>
            </ul>
          </div>

          <ToolCallout
            steps={[
              "発行者欄に事務所名・住所・資格登録番号・T番号を入力",
              "品目欄に「月次顧問料」「決算申告料」「○○申請代行」等を入力",
              "単位を「ヶ月」「件」「式」など業務形態に合わせて設定",
              "数量・単価を入力すると消費税込みの合計が自動計算",
              "備考欄に業務範囲・除外事項・源泉徴収・支払条件を記入してPDF出力",
            ]}
          />
        </article>

        <AuthorProfile />

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方・インボイス対応
              </Link>
            </li>
            <li>
              <Link href="/guide/freelance" className="text-blue-600 hover:underline text-sm">
                フリーランス・個人事業主のための見積書ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">
                見積書の有効期限の設定方法
              </Link>
            </li>
            <li>
              <Link href="/guide/remarks" className="text-blue-600 hover:underline text-sm">
                見積書の備考欄の書き方・例文集
              </Link>
            </li>
            <li>
              <Link href="/guide/consulting" className="text-blue-600 hover:underline text-sm">
                コンサルタント見積書の書き方ガイド
              </Link>
            </li>
          </ul>
        </div>

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
