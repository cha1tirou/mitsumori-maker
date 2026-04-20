import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "造園・外構工事業の見積書の書き方ガイド【記載例・テンプレ付き】 | 見積書メーカー",
  description: "造園業・外構工事・エクステリア業者向けの見積書の書き方。植栽・舗装・構造物工事の記載例と料金相場、工事後の保証の書き方を解説。",
};

export default function GardenGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "造園・外構工事業の見積書の書き方ガイド【記載例・テンプレ付き】",
    description:
      "造園業・外構工事・エクステリア業者向けの見積書の書き方。植栽・舗装・構造物工事の記載例と料金相場、工事後の保証の書き方を解説。",
    datePublished: "2026-04-20",
    dateModified: "2026-04-20",
    author: {
      "@type": "Organization",
      name: "見積書メーカー",
      url: "https://mitsumori-maker.com",
    },
    publisher: {
      "@type": "Organization",
      name: "見積書メーカー",
      url: "https://mitsumori-maker.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://mitsumori-maker.com/guide/garden",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "見積書メーカー",
        item: "https://mitsumori-maker.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "見積書ガイド",
        item: "https://mitsumori-maker.com/guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "造園・外構工事業の見積書の書き方ガイド",
        item: "https://mitsumori-maker.com/guide/garden",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/guide" className="text-gray-600 hover:text-gray-900 text-sm">
            ← 見積書ガイド一覧に戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            造園・外構工事業の見積書の書き方ガイド【記載例・テンプレ付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月20日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            造園・外構工事（エクステリア工事）の見積書は、植栽・土工・舗装・構造物工事など多岐にわたる工種を一枚の書類にまとめる必要があります。工事内容が複雑なため、顧客が内容を把握しやすい構成にすることが受注率アップのカギです。本記事では、造園業・外構工事業者が作成する見積書の必須項目・工種別の記載例・植栽の価格表示・アフターケアの書き方まで、実務に沿って解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            造園・外構工事の見積書に必要な基本項目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            外構・造園工事の見積書には、一般的な見積書の基本情報に加えて、工事特有の項目を盛り込む必要があります。以下が必須の記載事項です。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 pl-2">
            <li>見積書番号・作成日・有効期限（通常30〜60日）</li>
            <li>発注者（施主）の氏名・住所</li>
            <li>施工場所の住所（発注者と異なる場合）</li>
            <li>工事名称（例：「○○邸 外構・造園工事」）</li>
            <li>工事期間の目安</li>
            <li>業者の名称・住所・電話番号・担当者名</li>
            <li>保有資格・許可番号（建設業許可、造園施工管理技士など）</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            工事内容は以下の工種に分類して記載するのが一般的です。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">工種</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">主な内容</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-gray-700 font-medium">植栽工</td>
                  <td className="px-4 py-3 text-gray-600">樹木・生垣・芝張り・地被植物の植え付け</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700 font-medium">土工</td>
                  <td className="px-4 py-3 text-gray-600">掘削・盛土・整地・残土処分</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700 font-medium">舗装工</td>
                  <td className="px-4 py-3 text-gray-600">アスファルト・コンクリート・インターロッキング・砂利敷き</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700 font-medium">構造物工</td>
                  <td className="px-4 py-3 text-gray-600">擁壁・ブロック塀・フェンス・カーポート・門扉</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700 font-medium">給排水工</td>
                  <td className="px-4 py-3 text-gray-600">散水栓・排水溝・雨水枡の設置</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700 font-medium">照明工</td>
                  <td className="px-4 py-3 text-gray-600">ガーデンライト・アプローチ照明の設置</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700 font-medium">諸経費</td>
                  <td className="px-4 py-3 text-gray-600">現場管理費・交通費・廃材処分費</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            諸経費は工事費の合計に対して10〜15%程度を目安に設定することが多く、「現場管理費として工事費合計の10%」のように明記しておくと顧客の納得感が高まります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            工事種別ごとの記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の明細は、工種ごとに品名・規格・数量・単位・単価・金額の形式で記載します。以下に代表的な工事の記載例を示します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">庭園工事・植栽</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 text-sm">
            <p className="font-semibold text-gray-700 mb-3">【植栽工 記載例】</p>
            <div className="space-y-2 text-gray-600">
              <div className="grid grid-cols-5 gap-2 font-medium text-gray-700 border-b border-gray-100 pb-2">
                <span className="col-span-2">品名・規格</span>
                <span className="text-right">数量</span>
                <span className="text-right">単価</span>
                <span className="text-right">金額</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">シマトネリコ H=2.0m C=6cm</span>
                <span className="text-right">3本</span>
                <span className="text-right">¥18,000</span>
                <span className="text-right">¥54,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">オリーブ H=1.5m W=0.8m</span>
                <span className="text-right">2本</span>
                <span className="text-right">¥22,000</span>
                <span className="text-right">¥44,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">コニファー類 H=0.6m</span>
                <span className="text-right">10本</span>
                <span className="text-right">¥3,500</span>
                <span className="text-right">¥35,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">高麗芝張り</span>
                <span className="text-right">30m²</span>
                <span className="text-right">¥2,800</span>
                <span className="text-right">¥84,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">植栽工事費（掘削・植え付け・支柱）</span>
                <span className="text-right">一式</span>
                <span className="text-right">¥45,000</span>
                <span className="text-right">¥45,000</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">ブロック塀・フェンス工事</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 text-sm">
            <p className="font-semibold text-gray-700 mb-3">【構造物工 記載例】</p>
            <div className="space-y-2 text-gray-600">
              <div className="grid grid-cols-5 gap-2 font-medium text-gray-700 border-b border-gray-100 pb-2">
                <span className="col-span-2">品名・規格</span>
                <span className="text-right">数量</span>
                <span className="text-right">単価</span>
                <span className="text-right">金額</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">CBブロック積み（H=1.2m）</span>
                <span className="text-right">12m</span>
                <span className="text-right">¥12,000</span>
                <span className="text-right">¥144,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">アルミフェンス（H=0.8m）</span>
                <span className="text-right">8m</span>
                <span className="text-right">¥8,500</span>
                <span className="text-right">¥68,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">アルミ門扉（両開き W=2.4m）</span>
                <span className="text-right">1式</span>
                <span className="text-right">¥85,000</span>
                <span className="text-right">¥85,000</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">カーポート・舗装工事</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 text-sm">
            <p className="font-semibold text-gray-700 mb-3">【舗装工・構造物工 記載例】</p>
            <div className="space-y-2 text-gray-600">
              <div className="grid grid-cols-5 gap-2 font-medium text-gray-700 border-b border-gray-100 pb-2">
                <span className="col-span-2">品名・規格</span>
                <span className="text-right">数量</span>
                <span className="text-right">単価</span>
                <span className="text-right">金額</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">カーポート（2台用）設置工事</span>
                <span className="text-right">1式</span>
                <span className="text-right">¥280,000</span>
                <span className="text-right">¥280,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">コンクリート舗装（t=15cm）</span>
                <span className="text-right">40m²</span>
                <span className="text-right">¥9,000</span>
                <span className="text-right">¥360,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">インターロッキング舗装</span>
                <span className="text-right">15m²</span>
                <span className="text-right">¥12,000</span>
                <span className="text-right">¥180,000</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2">砂利敷き（防草シート込み）</span>
                <span className="text-right">20m²</span>
                <span className="text-right">¥3,500</span>
                <span className="text-right">¥70,000</span>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            植栽の価格の書き方とポイント
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            植栽は樹種・サイズ・品質によって価格が大きく異なるため、見積書での記載方法が顧客の信頼感に直結します。以下のポイントを押さえた記載を心がけましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">樹木のサイズ表記</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            樹木の価格は主に以下の規格で表示します。単価には樹木本体価格のみを示し、植え付け工賃は別途「植栽工事費」として計上するのが一般的です。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 pl-2">
            <li><span className="font-medium">H（樹高）</span>: 地面から樹冠頂部までの高さ（例：H=2.0m）</li>
            <li><span className="font-medium">C（幹周）</span>: 地上1.2mの位置の幹の周囲（例：C=6cm）</li>
            <li><span className="font-medium">W（枝張り）</span>: 樹冠の最大幅（例：W=1.5m）</li>
            <li><span className="font-medium">株立ち</span>: 幹の本数（例：3株立ち）</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            例として「ヤマボウシ H=2.5m W=1.2m 株立ち3本 ¥35,000/本」のように記載すると、顧客がサイズを確認しやすくなります。見積書には樹木本体価格・運搬費・植え付け工賃・支柱費用を分けて記載することで、価格内訳が明確になり値引き交渉のリスクも軽減できます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">芝張りの単価設定</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            芝張り工事は一般的に1m²あたりの単価制で見積もります。芝の種類（高麗芝・野芝・TM9など）・地盤改良の有無・目土の厚みによって変動します。下地整地が必要な場合は「整地工事費」として別途計上します。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
            <p className="font-semibold text-blue-800 mb-2">芝張り料金の目安（材工込）</p>
            <ul className="text-blue-700 space-y-1">
              <li>高麗芝: 2,500〜3,500円/m²</li>
              <li>野芝: 2,000〜3,000円/m²</li>
              <li>TM9（省管理型）: 3,500〜5,000円/m²</li>
              <li>人工芝: 5,000〜10,000円/m²</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            工事後のアフターケア・保証の記載方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            造園・外構工事の見積書には、施工後の保証内容を明記することが受注率と顧客満足度の向上につながります。特に高額工事では保証条件が契約の決め手になることも少なくありません。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">植栽の活着保証</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            植栽工事では「活着保証」を設けることが一般的です。植え付け後に樹木が枯れた場合の対応方針を見積書または特記事項に記載します。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">記載例（特記事項）</p>
            <p>植栽工事完了後6ヶ月以内に活着不良が生じた場合、無償にて補植いたします。ただし、天候不良・施主様による管理上の問題（水枯れ・過剰施肥等）に起因する枯損は保証対象外となります。</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">構造物・舗装の施工保証</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ブロック塀・カーポート・コンクリート舗装などの構造物工事には、施工不良に対する保証期間を設定します。一般的に1〜3年の保証期間を設けることが多く、以下の文言を見積書の備考欄や特記事項に記載します。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">記載例（特記事項）</p>
            <p>構造物工事（ブロック積み・舗装・フェンス設置等）については、引き渡し後2年間の施工保証を提供いたします。経年劣化・自然災害・施主様の改変に起因する不具合は保証対象外です。</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">定期メンテナンスの提案</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の末尾や備考欄に、年間管理契約（剪定・草刈り・施肥）のオプションを案内することで、継続的な取引につながります。「年間管理プランのご相談も承ります（別途お見積り）」と一文添えるだけでも効果的です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書に記載すべき免許・資格・許可情報
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            造園・外構工事業者は、保有する資格・許可を見積書に明記することで、顧客からの信頼性を高めることができます。特に個人施主向けの工事では、資格の有無が業者選定の重要な判断基準となります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">記載すべき資格・許可の種類</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 pl-2">
            <li>
              <span className="font-medium">建設業許可（造園工事業）</span>: 500万円以上の工事受注には必須。許可番号・知事許可・大臣許可の区別を記載（例：「○○県知事許可（般-〇〇）第○○号」）
            </li>
            <li>
              <span className="font-medium">1級・2級造園施工管理技士</span>: 公共工事や大規模工事の主任技術者・監理技術者要件。資格者氏名と級を明記
            </li>
            <li>
              <span className="font-medium">1級・2級土木施工管理技士</span>: 土工・舗装・給排水工事を伴う場合に関連する資格
            </li>
            <li>
              <span className="font-medium">古物商許可・産業廃棄物収集運搬許可</span>: 抜根・残土処分を行う場合に必要
            </li>
            <li>
              <span className="font-medium">樹木医・グリーンアドバイザー</span>: 植栽管理の専門性をアピールできる民間資格
            </li>
          </ul>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-sm text-gray-700">
            <p className="font-semibold mb-2">見積書への記載例</p>
            <p>
              【資格・許可情報】<br />
              建設業許可: ○○県知事許可（般-06）第○○号（造園工事業）<br />
              担当技術者: 山田太郎（2級造園施工管理技士）<br />
              産業廃棄物収集運搬許可: 第○○号（○○県）
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">見積書の有効期限と注意事項</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            植栽や資材の価格は季節・市場動向によって変動するため、見積書の有効期限を明確に設定することが重要です。一般的に30〜60日以内とし、「本見積書の有効期限は発行日より30日間とさせていただきます。植栽材料の価格変動により再見積が必要となる場合がございます」と記載します。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            また、現地調査の前提条件（地盤状況・既存樹木・埋設物の有無など）による金額変動の可能性を特記事項に記載しておくことで、後のトラブルを防ぐことができます。
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
