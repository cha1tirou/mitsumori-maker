import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "塗装業・外壁塗装業者の見積書の書き方ガイド【記載例・テンプレ付き】 | 見積書メーカー",
  description:
    "塗装業・外壁塗装業者向けの見積書の書き方を記載例付きで解説。足場費・塗料費・工賃など必須項目、塗料の種類と単価目安、よくあるトラブル対策まで網羅。",
  openGraph: {
    title: "塗装業・外壁塗装業者の見積書の書き方ガイド【記載例・テンプレ付き】 | 見積書メーカー",
    description:
      "塗装業・外壁塗装業者向けの見積書の書き方を記載例付きで解説。足場費・塗料費・工賃など必須項目、塗料の種類と単価目安、よくあるトラブル対策まで網羅。",
    url: "https://mitsumori-maker.com/guide/painting",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E5%A1%97%E8%A3%85%E6%A5%AD%E3%83%BB%E5%A4%96%E5%A3%81%E5%A1%97%E8%A3%85%E6%A5%AD%E8%80%85%E3%81%AE%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "塗装業・外壁塗装業者の見積書の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/painting",
  },
};

export default function GuidePaintingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="塗装業・外壁塗装業者の見積書の書き方ガイド【記載例・テンプレ付き】"
        description="塗装業・外壁塗装業者向けの見積書の書き方を記載例付きで解説。足場費・塗料費・工賃など必須項目、塗料の種類と単価目安、よくあるトラブル対策まで網羅。"
        slug="painting"
        datePublished="2026-04-19"
        dateModified="2026-04-19"
        faqs={[
          {
            question: "外壁塗装の見積書に足場費は必ず記載すべきですか？",
            answer:
              "はい、足場費は必ず独立した項目として記載することを強く推奨します。足場費を「一式」に含めると発注者が費用の内訳を把握しにくくなるうえ、後からトラブルになるケースがあります。足場の種類（単管・くさび緊結など）、架面積（㎡）、単価を明記しましょう。",
          },
          {
            question: "塗装業の見積書で「一式」表記は使ってよいですか？",
            answer:
              "高圧洗浄費・養生費・廃材処分費など、数量を㎡や本数で示しにくいものについては「一式」表記を使うことがあります。ただし、一式表記が多すぎると発注者の不信感を招くため、主要な工程（塗料費・塗装工賃・足場費）は必ず数量と単価を分けて記載してください。",
          },
          {
            question: "外壁塗装の見積書の有効期限はどのくらいが一般的ですか？",
            answer:
              "塗料価格は石油製品の市況に連動して変動するため、外壁塗装の見積書の有効期限は1〜3ヶ月に設定するのが一般的です。見積書には有効期限を明記し、期限超過の場合は再見積もりとなる旨を条件書に記載しておきましょう。",
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
            <span className="text-gray-800">塗装業・外壁塗装業者の見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            塗装業・外壁塗装業者の見積書の書き方ガイド【記載例・テンプレ付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月19日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            外壁塗装の見積書は、足場・高圧洗浄・下地処理・塗装工賃・材料費・管理費など、
            一般的な見積書と比べて記載項目が多く、発注者との価格交渉や信頼構築に直結する重要書類です。
            「見積書の書き方が分からない」「何を書けばいいのか迷う」という塗装業者・外壁塗装業者向けに、
            必須項目から塗料の種類別単価目安、外壁120㎡の具体的な記載例まで詳しく解説します。
            見積もりトラブルを防ぐポイントも合わせて押さえておきましょう。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            塗装業・外壁塗装見積書の特徴
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            外壁塗装の見積書は、住宅リフォームの中でも特に「比較見積もり」が行われやすいカテゴリです。
            発注者が複数社から見積もりを取得して金額を比較するため、内訳が不明瞭だと不信感を持たれます。
            逆に、項目ごとに数量・単価を明示した見積書は「丁寧な業者」という印象を与え、成約率の向上につながります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            塗装業の見積書には以下のような特徴があります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>工程が多く段階的</strong>：足場設置 → 高圧洗浄 → 下地処理 → 養生 →
              下塗り → 中塗り → 上塗り → 後片付けと、各工程を順序立てて記載するのが基本です。
            </li>
            <li>
              <strong>材料費と施工費を分けて計上</strong>：塗料費（材料費）と塗装工賃（施工費・人件費）を
              分けることで、発注者が原価構造を理解しやすくなります。
            </li>
            <li>
              <strong>面積（㎡）が基準単位</strong>：外壁・屋根・付帯部の面積を正確に計測し、
              ㎡あたりの単価で計算するのが一般的です。面積の算出根拠を示すことで信頼性が高まります。
            </li>
            <li>
              <strong>塗料のグレードで金額が大きく変わる</strong>：ウレタン・シリコン・フッ素・無機と
              塗料のグレードによって耐久年数と単価が異なります。複数プランを提示して選択肢を与えると
              成約につながりやすくなります。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の基本的な書き方については
            <Link href="/guide/how-to-write" className="text-blue-600 hover:underline">
              見積書の書き方・必要項目をわかりやすく解説
            </Link>
            も参考にしてください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            外壁塗装見積書の必須項目一覧
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            塗装業・外壁塗装の見積書に記載すべき項目を整理します。
            漏れがあると後から追加請求が発生しトラブルになるため、チェックリストとして活用してください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 足場費（仮設工事）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            外壁塗装において足場費は全体費用の15〜20%を占める大きな項目です。
            「くさび緊結足場」「単管ブラケット足場」などの種類と、架面積（㎡）、単価を明記します。
            足場の架面積は「建物の外周 × 足場の高さ」で算出し、見積書に計算根拠を記載しておくと
            発注者の納得感が高まります。足場費を意図的に低く見せて塗料費に上乗せする悪質業者との
            差別化にもなります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 高圧洗浄費
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            塗装前に外壁・屋根の汚れ・旧塗膜・コケ・カビを高圧洗浄で除去する工程です。
            洗浄面積（㎡）と単価（100〜300円/㎡が目安）を記載します。
            高圧洗浄を省くと塗料の密着不良が起こり、剥がれや早期劣化の原因になるため、
            必須工程として明示することが品質の証明にもなります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 下地処理費（ケレン・補修）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            旧塗膜の除去（ケレン）、ひび割れ（クラック）補修、シーリング（コーキング）打ち替えなどを
            記載します。シーリングは「打ち替え」（既存を撤去して新規施工）と「増し打ち」（既存の上から
            追加施工）で単価が異なるため、どちらの施工か明記することが重要です。
            下地処理を丁寧に行うかどうかが塗装の耐久性を左右するため、この項目の内容が業者の
            技術力・誠実さを示すバロメーターになります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 養生費
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            塗装しない部分（窓・ドア・エアコン室外機・植栽など）を保護するための養生シート・
            テープの費用です。養生の質が仕上がりの美観を左右します。
            養生面積または一式で計上するのが一般的で、外壁面積の10〜20%程度の費用が目安です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            5. 塗料費（材料費）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            使用する塗料のメーカー・商品名・色番号、塗布面積（㎡）、単価（円/㎡）を記載します。
            下塗り・中塗り・上塗りで塗料が異なる場合はそれぞれ分けて記載しましょう。
            「塗料代一式」とまとめると発注者が不信感を持つため、塗料名まで明記するのが信頼を得る基本です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            6. 塗装工賃（施工費・人件費）
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            職人の人件費・施工費です。下塗り工賃・中塗り工賃・上塗り工賃を分けて記載するか、
            「外壁塗装工賃（3回塗り）×㎡数」として面積単価で計上します。
            人工（にんく）単位で計算する場合は、職種・人工数・日当単価を明記します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            7. 付帯部塗装費
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            雨樋・破風板・軒天・帯板・木部・鉄部などの付帯部位の塗装費用です。
            部位ごとに「延長（m）または面積（㎡）× 単価」の形で記載します。
            付帯部を見積もりに含めているかどうかで後からのトラブルが起きやすいため、
            「本見積もりに含む付帯部位」を明示しておくことが重要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            8. 諸経費・現場管理費
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            材料の廃棄処理費、交通費・駐車場代、保険費用、現場管理・品質管理のための費用です。
            直接工事費の5〜10%程度を計上するのが一般的です。
            諸経費の内訳については
            <Link href="/guide/misc-expenses" className="text-blue-600 hover:underline">
              見積書の諸経費の書き方と相場
            </Link>
            も参照ください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            塗料の種類と単価目安
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            外壁塗装の費用は使用する塗料のグレードによって大きく変わります。
            発注者に選択肢を提示するためにも、各グレードの特徴と単価を把握しておきましょう。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse bg-white rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left py-3 px-3 text-gray-700">塗料の種類</th>
                  <th className="text-right py-3 px-3 text-gray-700">施工単価目安</th>
                  <th className="text-right py-3 px-3 text-gray-700">耐用年数目安</th>
                  <th className="text-left py-3 px-3 text-gray-700">特徴</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-3 font-medium">ウレタン塗料</td>
                  <td className="py-3 px-3 text-right">1,200〜1,800円/㎡</td>
                  <td className="py-3 px-3 text-right">8〜10年</td>
                  <td className="py-3 px-3">コストを抑えたい場合に適する。密着性が高く木部・鉄部にも使用可</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-3 font-medium">シリコン塗料</td>
                  <td className="py-3 px-3 text-right">1,800〜2,800円/㎡</td>
                  <td className="py-3 px-3 text-right">10〜15年</td>
                  <td className="py-3 px-3">現在の外壁塗装の主流。コストパフォーマンスに優れる</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-3 font-medium">フッ素塗料</td>
                  <td className="py-3 px-3 text-right">2,800〜4,500円/㎡</td>
                  <td className="py-3 px-3 text-right">15〜20年</td>
                  <td className="py-3 px-3">耐候性・耐久性が高くメンテナンスサイクルを延ばせる</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-3 font-medium">無機塗料</td>
                  <td className="py-3 px-3 text-right">3,500〜5,500円/㎡</td>
                  <td className="py-3 px-3 text-right">20〜25年</td>
                  <td className="py-3 px-3">最高グレード。汚れにくく超耐久性。初期費用は高めだが長期的なコストは低い</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium">光触媒塗料</td>
                  <td className="py-3 px-3 text-right">3,000〜5,000円/㎡</td>
                  <td className="py-3 px-3 text-right">15〜20年</td>
                  <td className="py-3 px-3">日光で汚れを分解する自浄効果。都市部・海岸近くで効果的</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            上記の単価は材料費と塗装工賃を含む施工単価の目安です。足場費・高圧洗浄費・下地処理費は
            別途加算されます。同じシリコン塗料でも1液型と2液型、一般品と高耐候グレードでは耐久年数と
            単価が異なるため、メーカー・商品名まで見積書に明記することが重要です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注者に複数プランを提示する際は、10年後・15年後の累計コストを試算して提示すると、
            高グレード塗料の長期的なコストメリットを理解してもらいやすくなります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            外壁120㎡の見積書 記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            外壁面積120㎡（延床面積30坪程度の一般的な戸建て）を例に、外壁塗装見積書の具体的な
            記載例を紹介します。塗料はシリコン塗料（2液型）を使用したケースです。
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 overflow-x-auto">
            <p className="text-sm font-bold text-gray-800 mb-1">工事名称：外壁・付帯部塗装工事</p>
            <p className="text-sm text-gray-600 mb-1">工事場所：神奈川県横浜市〇〇 △△様邸</p>
            <p className="text-sm text-gray-600 mb-4">有効期限：2026年7月19日まで</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 pr-2 text-gray-700 min-w-[140px]">項目</th>
                  <th className="text-left py-2 pr-2 text-gray-700">仕様・規格</th>
                  <th className="text-right py-2 pr-2 text-gray-700">数量</th>
                  <th className="text-left py-2 pr-2 text-gray-700">単位</th>
                  <th className="text-right py-2 pr-2 text-gray-700">単価</th>
                  <th className="text-right py-2 text-gray-700">金額</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={5}>【仮設工事】</td>
                  <td className="py-2 text-right font-semibold">126,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">足場設置・解体</td>
                  <td className="py-1.5 pr-2">くさび緊結足場 メッシュシート付</td>
                  <td className="py-1.5 pr-2 text-right">180</td>
                  <td className="py-1.5 pr-2">㎡</td>
                  <td className="py-1.5 pr-2 text-right">700</td>
                  <td className="py-1.5 text-right">126,000</td>
                </tr>

                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={5}>【下地処理工事】</td>
                  <td className="py-2 text-right font-semibold">96,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">高圧洗浄</td>
                  <td className="py-1.5 pr-2">外壁・付帯部一式（150bar）</td>
                  <td className="py-1.5 pr-2 text-right">120</td>
                  <td className="py-1.5 pr-2">㎡</td>
                  <td className="py-1.5 pr-2 text-right">250</td>
                  <td className="py-1.5 text-right">30,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">ひび割れ補修（クラック処理）</td>
                  <td className="py-1.5 pr-2">微細クラック シーリング充填</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 pr-2 text-right">18,000</td>
                  <td className="py-1.5 text-right">18,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">シーリング打ち替え</td>
                  <td className="py-1.5 pr-2">オートンイクシード 既存撤去・新規施工</td>
                  <td className="py-1.5 pr-2 text-right">48</td>
                  <td className="py-1.5 pr-2">m</td>
                  <td className="py-1.5 pr-2 text-right">1,000</td>
                  <td className="py-1.5 text-right">48,000</td>
                </tr>

                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={5}>【外壁塗装工事】</td>
                  <td className="py-2 text-right font-semibold">264,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">下塗り（シーラー）</td>
                  <td className="py-1.5 pr-2">日本ペイント ファインパーフェクトシーラー 1回</td>
                  <td className="py-1.5 pr-2 text-right">120</td>
                  <td className="py-1.5 pr-2">㎡</td>
                  <td className="py-1.5 pr-2 text-right">600</td>
                  <td className="py-1.5 text-right">72,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">中塗り</td>
                  <td className="py-1.5 pr-2">日本ペイント パーフェクトトップ シリコン N-90 1回</td>
                  <td className="py-1.5 pr-2 text-right">120</td>
                  <td className="py-1.5 pr-2">㎡</td>
                  <td className="py-1.5 pr-2 text-right">800</td>
                  <td className="py-1.5 text-right">96,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">上塗り</td>
                  <td className="py-1.5 pr-2">日本ペイント パーフェクトトップ シリコン N-90 1回</td>
                  <td className="py-1.5 pr-2 text-right">120</td>
                  <td className="py-1.5 pr-2">㎡</td>
                  <td className="py-1.5 pr-2 text-right">800</td>
                  <td className="py-1.5 text-right">96,000</td>
                </tr>

                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={5}>【付帯部塗装工事】</td>
                  <td className="py-2 text-right font-semibold">98,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">雨樋塗装</td>
                  <td className="py-1.5 pr-2">ファインシリコンフレッシュ 2回塗り</td>
                  <td className="py-1.5 pr-2 text-right">30</td>
                  <td className="py-1.5 pr-2">m</td>
                  <td className="py-1.5 pr-2 text-right">600</td>
                  <td className="py-1.5 text-right">18,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">破風板・鼻隠し塗装</td>
                  <td className="py-1.5 pr-2">ファインシリコンフレッシュ 2回塗り</td>
                  <td className="py-1.5 pr-2 text-right">24</td>
                  <td className="py-1.5 pr-2">m</td>
                  <td className="py-1.5 pr-2 text-right">1,000</td>
                  <td className="py-1.5 text-right">24,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">軒天塗装</td>
                  <td className="py-1.5 pr-2">日本ペイント ケンエースG-II 2回塗り</td>
                  <td className="py-1.5 pr-2 text-right">20</td>
                  <td className="py-1.5 pr-2">㎡</td>
                  <td className="py-1.5 pr-2 text-right">1,500</td>
                  <td className="py-1.5 text-right">30,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">水切り・帯板塗装</td>
                  <td className="py-1.5 pr-2">錆止め下塗り + 仕上げ 2回塗り</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 pr-2 text-right">26,000</td>
                  <td className="py-1.5 text-right">26,000</td>
                </tr>

                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={5}>【養生・後片付け】</td>
                  <td className="py-2 text-right font-semibold">36,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">養生</td>
                  <td className="py-1.5 pr-2">窓・ドア・エアコン室外機等</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 pr-2 text-right">24,000</td>
                  <td className="py-1.5 text-right">24,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2 pl-4">廃材処分・清掃</td>
                  <td className="py-1.5 pr-2">産廃処理・現場清掃一式</td>
                  <td className="py-1.5 pr-2 text-right">1</td>
                  <td className="py-1.5 pr-2">式</td>
                  <td className="py-1.5 pr-2 text-right">12,000</td>
                  <td className="py-1.5 text-right">12,000</td>
                </tr>

                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-2 pr-2 font-semibold" colSpan={5}>直接工事費 小計</td>
                  <td className="py-2 text-right font-semibold">620,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2">諸経費・現場管理費</td>
                  <td className="py-1.5 pr-2" colSpan={4}>直接工事費の8%（交通費・保険・管理費含む）</td>
                  <td className="py-1.5 text-right">49,600</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-2 pr-2 font-bold" colSpan={5}>工事価格 合計（税抜）</td>
                  <td className="py-2 text-right font-bold">669,600</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 pr-2" colSpan={5}>消費税（10%）</td>
                  <td className="py-1.5 text-right">66,960</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="py-2 pr-2 font-bold" colSpan={5}>見積金額 合計（税込）</td>
                  <td className="py-2 text-right font-bold">736,560</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-3">
              ※ 上記は一般的な戸建住宅（外壁120㎡）のシリコン塗料使用時の参考例です。現地調査の結果によって変動します。
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            このように、塗料のメーカー・商品名・色番号（または色系統）、各工程の回数まで明記することで、
            発注者が他社の見積書と正確に比較できるようになります。「3回塗り」の工程を明示することも
            品質の証明として有効です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の内訳の書き方についての詳細は
            <Link href="/guide/breakdown" className="text-blue-600 hover:underline">
              見積書の内訳の書き方と項目の整理方法
            </Link>
            もご参照ください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            よくある見積もりトラブルと注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            外壁塗装は高額な工事であるため、発注者との認識のズレがトラブルに発展しやすい業種です。
            業者側・発注者側それぞれの視点からよくあるトラブルとその対策を確認しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル1：足場費の扱いが不透明
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「足場費込みで安くします」という口約束で受注し、工事後に足場費を追加請求するケースがあります。
            発注者から見ると悪質業者と同じに映るため、足場費は必ず見積書の段階で独立した項目として
            明記することが信頼構築の基本です。足場の架面積（㎡）の計算根拠も示せるよう準備しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル2：「一式」表記による内容の不明確さ
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「外壁塗装一式 30万円」のような記載は、発注者に不信感を与えるだけでなく、
            後から「そのつもりではなかった」というトラブルの原因になります。
            主要項目は必ず数量・単価を分けて記載し、「一式」表記は養生や廃材処分など
            数量化しにくい補助的な工程に限定しましょう。
            「一式」の書き方については
            <Link href="/guide/lump-sum" className="text-blue-600 hover:underline">
              見積書の「一式」の正しい書き方と注意点
            </Link>
            も参考になります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル3：付帯部の範囲が曖昧
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            外壁の本体塗装のみで見積もりを提出し、雨樋・破風板・軒天などが含まれていないと
            工事後に「なぜ塗装されていないのか」というクレームにつながります。
            見積書には「本見積もりに含む付帯部」を列挙するか、「含まない部位」を
            明示することでトラブルを未然に防げます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル4：塗料の品質を過大に説明する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「20年保証」「永久防水」など根拠のない品質保証を口頭で伝えることは、
            後から保証問題に発展するリスクがあります。見積書の備考欄には塗料メーカーの
            公式耐用年数（製品保証）と自社施工保証の期間・内容を正確に記載しましょう。
            保証の範囲（施工ミスによる剥がれのみ対象など）も明記することが重要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            トラブル5：資材価格変動による追加請求
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            塗料は石油系原材料の価格に連動するため、見積もり提出から数ヶ月後に材料費が
            上昇するケースがあります。見積書には必ず有効期限（1〜3ヶ月が目安）を記載し、
            期限超過後は価格が変動する可能性がある旨を条件書に明記しておきましょう。
            有効期限の設定方法は
            <Link href="/guide/valid-period" className="text-blue-600 hover:underline">
              見積書の有効期限の設定方法と書き方
            </Link>
            で詳しく解説しています。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            外壁塗装業者の見積書で押さえるべきポイントをまとめます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>足場費・高圧洗浄費・下地処理費・養生費は独立した項目で数量と単価を明記する</li>
            <li>塗料はメーカー・商品名・色番号・回数まで記載し「塗料代一式」を避ける</li>
            <li>付帯部（雨樋・破風板・軒天など）の対象範囲を明示する</li>
            <li>諸経費は内訳の根拠（直接工事費の○%など）を示す</li>
            <li>有効期限（1〜3ヶ月）を必ず設定し、条件書を整備する</li>
            <li>複数の塗料グレードプランを提示し、発注者の選択肢を広げる</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            丁寧で透明性の高い見積書は、比較検討される外壁塗装業界において競合との差別化に直結します。
            見積書メーカーを使えば、ブラウザ上で項目を入力するだけで整った見積書をPDF出力できます。
            ぜひご活用ください。
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
              <Link href="/guide/construction" className="text-blue-600 hover:underline text-sm">
                建設業の見積書の書き方【工事見積書の記載例・テンプレ付き】
              </Link>
            </li>
            <li>
              <Link href="/guide/misc-expenses" className="text-blue-600 hover:underline text-sm">
                見積書の諸経費の書き方と相場
              </Link>
            </li>
            <li>
              <Link href="/guide/breakdown" className="text-blue-600 hover:underline text-sm">
                見積書の内訳の書き方と項目の整理方法
              </Link>
            </li>
            <li>
              <Link href="/guide/lump-sum" className="text-blue-600 hover:underline text-sm">
                見積書の「一式」の正しい書き方と注意点
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">
                見積書の有効期限の設定方法と書き方
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
