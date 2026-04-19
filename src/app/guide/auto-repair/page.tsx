import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "自動車整備・カーショップの見積書の書き方ガイド【記載例付き】 | 見積書メーカー",
  description:
    "自動車整備・修理業の見積書の書き方を解説。車検・修理・カスタムの料金記載、技術料・部品代・油脂類の内訳、お客様への説明書類としての活用方法まで。",
  openGraph: {
    title: "自動車整備・カーショップの見積書の書き方ガイド【記載例付き】 | 見積書メーカー",
    description:
      "自動車整備・修理業の見積書の書き方を解説。車検・修理・カスタムの料金記載、技術料・部品代・油脂類の内訳、お客様への説明書類としての活用方法まで。",
    url: "https://mitsumori-maker.com/guide/auto-repair",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%87%AA%E5%8B%95%E8%BB%8A%E6%95%B4%E5%82%99%E3%83%BB%E3%82%AB%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%83%E3%83%97%E3%81%AE%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "自動車整備・カーショップの見積書の書き方ガイド",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/auto-repair",
  },
};

export default function GuideAutoRepairPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="自動車整備・カーショップの見積書の書き方ガイド【記載例付き】"
        description="自動車整備・修理業の見積書の書き方を解説。車検・修理・カスタムの料金記載、技術料・部品代・油脂類の内訳、お客様への説明書類としての活用方法まで。"
        slug="auto-repair"
        datePublished="2026-04-19"
        dateModified="2026-04-19"
        faqs={[
          {
            question: "車検の見積書に法定費用（自賠責保険・重量税・検査手数料）は含めて記載すべきですか？",
            answer:
              "法定費用は整備費用と明確に分けて記載することが重要です。法定費用（自賠責保険料・自動車重量税・検査手数料）は車種・年式・重量によって金額が国で定められており、整備工場の利益にはなりません。見積書では「法定費用（実費）」として小計を別立てにし、整備費用と合算した「総費用」を最後に記載する形式が一般的です。",
          },
          {
            question: "自動車修理の見積書で「作業工賃」と「部品代」は分けて記載する必要がありますか？",
            answer:
              "法的な義務はありませんが、分けて記載することを強く推奨します。技術料（作業工賃）と部品代を分けることで、お客様が「どの部品が必要で、どの作業にいくらかかるか」を把握しやすくなります。また、お客様が部品を持ち込む場合や、一部の作業のみ依頼する場合の交渉もスムーズになります。",
          },
          {
            question: "保険修理（任意保険・共済）の見積書は一般の修理見積書と何が違いますか？",
            answer:
              "保険修理の場合、見積書は保険会社への提出書類として使用されるため、損傷箇所の写真・損傷内容の詳細説明・作業方法（修理か交換か）・部品の品番・工賃の根拠（塗装係数・塗装費含む）を詳細に記載する必要があります。また、保険会社指定の書式（アジャスター査定シート等）に合わせた形式での作成が求められる場合があります。",
          },
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">
              見積書ガイド
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">自動車整備・カーショップの見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            自動車整備・カーショップの見積書の書き方ガイド【記載例付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月19日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            自動車整備・修理業の見積書は、技術料（作業工賃）・部品代・油脂類・消耗品・廃棄物処理費など
            複数の費用要素を分かりやすく整理して提示することが求められます。また、車検の場合は
            法定費用（自賠責保険・重量税・検査手数料）と整備費用を分けて記載するのがルールです。
            お客様が整備内容を理解して承認印を押せるよう、見積書は「説明書類」としての役割も担います。
            本記事では自動車整備業・カーショップ向けに、見積書の必須項目から記載例、
            保険修理への対応まで詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            自動車整備見積書の費用項目と内訳
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            自動車整備・修理の見積書には、以下の費用項目が含まれます。
            それぞれの項目の内容と記載方法を理解しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 技術料（作業工賃）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            整備士が行う作業の人件費です。一般的に「作業項目名 × 工数（h） × 工賃単価（円/h）」で計算します。
            工賃単価は整備工場ごとに設定が異なり、普通車・軽自動車・輸入車でも異なる場合があります。
            エンジン診断・定期点検・オイル交換・タイヤ交換・ブレーキパッド交換など作業ごとに分けて記載します。
            特殊工具が必要な作業（エアコンガス補充・4輪アライメント調整等）は別途工賃を計上します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 部品代（交換部品）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            交換が必要な部品の費用です。部品名・品番・数量・単価を明記します。
            純正部品・社外品（OEM部品）・リビルト部品（再生部品）のいずれを使用するかを明示することで、
            お客様が部品の品質と価格のバランスを判断できます。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse bg-white rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left py-3 px-3 text-gray-700">部品の種類</th>
                  <th className="text-left py-3 px-3 text-gray-700">特徴</th>
                  <th className="text-left py-3 px-3 text-gray-700">価格目安</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-3 font-medium">純正部品（OEM）</td>
                  <td className="py-3 px-3">メーカー製。品質・適合性が最高水準。保証対応可</td>
                  <td className="py-3 px-3">高め</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-3 font-medium">社外品（アフターパーツ）</td>
                  <td className="py-3 px-3">サードパーティ製。純正より安価。品質に幅あり</td>
                  <td className="py-3 px-3">中〜低</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium">リビルト品（再生部品）</td>
                  <td className="py-3 px-3">使用済み部品を再生。エンジン・オルタネーター等。環境対応</td>
                  <td className="py-3 px-3">低め</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 油脂類・液剤
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            エンジンオイル・ATF（オートマフルード）・ブレーキフルード・クーラント（ LLC）・
            パワーステアリングフルード・ウォッシャー液・グリスなどの油脂類です。
            油脂類は「品名・規格（粘度・グレード等）・数量（L）・単価」の形式で記載します。
            エンジンオイルは銘柄・粘度（0W-20、5W-30等）を明記することで品質が伝わりやすくなります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 消耗品・副資材
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ガスケット・クリップ・ボルト・ナット・接着剤・シール材など、
            作業時に使用する消耗品・副資材です。
            「消耗品費 一式」としてまとめて計上することが多いですが、
            高額な消耗品は個別に品名と金額を記載します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            5. 廃棄物処理費・環境費用
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            廃油・廃液・廃タイヤ・廃バッテリーなどの産業廃棄物処理費用です。
            「廃油処理費」「廃タイヤ処理費（○本）」として個別に計上するか、
            「廃棄物処理費 一式」としてまとめる方法があります。
            廃棄物処理費は実費相当額を計上し、環境対応の取り組みとしてお客様に説明することで
            理解と信頼を得やすくなります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            車検見積書の書き方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            車検の見積書は、法定費用と整備費用（点検・整備・部品交換）を明確に分けて記載することが
            最大のポイントです。お客様が「何に費用がかかっているのか」を一目で理解できる見積書が求められます。
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 overflow-x-auto">
            <p className="text-sm font-bold text-gray-800 mb-1">車検見積書 記載例（普通乗用車 1,500cc・車重1t超）</p>
            <p className="text-sm text-gray-600 mb-4">車両：〇〇 △△様　年式：2020年　走行距離：52,000km</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 pr-2 text-gray-700 min-w-[180px]">項目</th>
                  <th className="text-left py-2 pr-2 text-gray-700">内容</th>
                  <th className="text-right py-2 pr-2 text-gray-700">数量</th>
                  <th className="text-left py-2 pr-2 text-gray-700">単位</th>
                  <th className="text-right py-2 text-gray-700">金額</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={4}>【法定費用（実費）】</td>
                  <td className="py-2 text-right font-semibold">61,820</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">自動車重量税</td>
                  <td className="py-1.5 pr-2">普通乗用車 1,500cc〜2,000cc</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">32,800</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">自賠責保険料</td>
                  <td className="py-1.5 pr-2">2年（24ヶ月）</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">17,650</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">印紙・証紙代（検査手数料）</td>
                  <td className="py-1.5 pr-2">継続検査（持込）</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">1,800</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">自動車税 納税確認</td>
                  <td className="py-1.5 pr-2">電子納税証明取得費用</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">9,570</td>
                </tr>

                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={4}>【検査・整備費用（税抜）】</td>
                  <td className="py-2 text-right font-semibold">58,500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">継続検査料</td>
                  <td className="py-1.5 pr-2">検査代行・書類作成</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">12,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">24ヶ月定期点検料</td>
                  <td className="py-1.5 pr-2">56項目点検</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">15,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">エンジンオイル交換</td>
                  <td className="py-1.5 pr-2">全合成油 0W-20 4L + 工賃</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">8,500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">エアフィルター交換</td>
                  <td className="py-1.5 pr-2">純正品 品番：○○○ + 工賃</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">個</td>
                  <td className="py-1.5 text-right">4,800</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">ワイパーゴム交換</td>
                  <td className="py-1.5 pr-2">前2本 + 工賃</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">3,200</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">廃油・廃液処理費</td>
                  <td className="py-1.5 pr-2">廃油・廃液処理一式</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">1,500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">消耗品費</td>
                  <td className="py-1.5 pr-2">ガスケット・クリップ等一式</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 text-right">3,500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">代車費用</td>
                  <td className="py-1.5 pr-2">1日（無料サービス）</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">日</td>
                  <td className="py-1.5 text-right">0</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={4}>整備費用 消費税（10%）</td>
                  <td className="py-2 text-right font-semibold">5,850</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="py-2 pr-2 font-bold" colSpan={4}>お見積もり総額</td>
                  <td className="py-2 text-right font-bold">126,170</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-3">
              ※ 法定費用（自賠責保険・重量税・検査手数料）は非課税です。整備費用のみ消費税が課税されます。<br />
              ※ 上記は参考例です。実際の金額は車種・年式・走行距離・整備内容によって異なります。
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            修理依頼書との連動とお客様承認の取り方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            自動車整備業では、見積書と修理依頼書（作業指示書）を連動させて管理することが重要です。
            特に、想定外の追加修理が発生した場合は、必ずお客様の承認を得てから作業を進めることが
            トラブル防止の基本です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            修理依頼書と見積書の関係
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            入庫時にお客様から修理依頼（不具合内容・希望作業）を書面で受け取り（修理依頼書）、
            整備士が点検・診断した後に見積書を作成して提示します。
            見積書にはお客様の承認印（または署名）を受けてから作業を開始します。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>入庫前見積もり</strong>：事前に車種・症状を聞いて概算見積もりを提示する方式。
              来店前の電話・Web問い合わせで活用。
            </li>
            <li>
              <strong>点検後見積もり</strong>：入庫後の診断・点検結果をもとに正確な見積書を作成する方式。
              実態に即した金額を提示できる。
            </li>
            <li>
              <strong>追加見積もり</strong>：作業中に想定外の不具合が発見された場合、
              必ず追加の見積書を提示してお客様の承認を得てから追加作業を行う。
              無断での追加作業はトラブルの元になるため絶対に避ける。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            承認印・サインの取得方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書へのお客様の承認は、以下の方法で取得します。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>紙の見積書：「上記見積内容に同意します」欄への署名・押印</li>
            <li>電話による口頭承認：日時・担当者・承認内容を記録し、「口頭承認確認書」として自社保管</li>
            <li>メール・LINEでの承認：返信メッセージの内容を保存して記録として残す</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            特に高額修理の場合は、書面による承認を徹底することで後のトラブルを防げます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            保険修理（任意保険・共済）の見積書
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            事故修理で任意保険・共済を使用する場合、見積書は保険会社のアジャスター（損害査定員）が
            査定の根拠として使用する公式書類となります。通常の修理見積書よりも詳細な記載が必要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            保険修理見積書の追加記載事項
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>損傷部位の詳細</strong>：損傷した部位名（フロントバンパー・右フェンダー等）と
              損傷の種類（凹み・破損・擦り傷等）を具体的に記載する
            </li>
            <li>
              <strong>作業方法の明示</strong>：「修理」か「交換」かを明記する。
              修理の場合はどの程度の損傷まで修理対応可能かを説明する
            </li>
            <li>
              <strong>部品の品番・定価</strong>：純正部品の品番と定価を記載する（保険会社が照合する）
            </li>
            <li>
              <strong>塗装工賃の根拠</strong>：塗装係数・塗装時間・塗装単価を記載する
            </li>
            <li>
              <strong>損傷写真</strong>：見積書と合わせて損傷箇所の写真（複数枚）を提出する
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            自動車整備・カーショップの見積書作成で押さえるべきポイントをまとめます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>技術料（作業工賃）・部品代・油脂類・廃棄物処理費を分けて記載する</li>
            <li>車検見積書では法定費用と整備費用を明確に分離して記載する</li>
            <li>部品は純正品・社外品・リビルト品の区別を明示する</li>
            <li>追加修理が必要な場合は必ず追加見積書でお客様の承認を得る</li>
            <li>保険修理では損傷部位・作業方法・部品品番・塗装根拠を詳細に記載する</li>
            <li>承認印・署名を必ず取得してから作業を開始する</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            お客様に分かりやすい見積書は、整備内容への理解と納得を促し、
            信頼関係の構築につながります。見積書メーカーを使えば、
            項目ごとの明細を自由に設定してPDF出力が可能です。ぜひご活用ください。
          </p>
        </article>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連記事</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/lump-sum" className="text-blue-600 hover:underline text-sm">
                見積書の「一式」の正しい書き方と注意点
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方【税込・税抜・別途表記】
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">
                見積書の有効期限の設定方法と適切な期間の決め方
              </Link>
            </li>
            <li>
              <Link href="/guide/breakdown" className="text-blue-600 hover:underline text-sm">
                見積書の内訳の書き方と項目の整理方法
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
            見積書メーカーを使う &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
