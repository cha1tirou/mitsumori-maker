import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ConstructionPromoBanner from "@/components/construction/ConstructionPromoBanner";

export const metadata: Metadata = {
  title: "フリーランス新法と建設業一人親方への影響【2026年版】見積書・契約書の対応 | 見積書メーカー",
  description:
    "2024年11月施行のフリーランス新法（特定受託事業者法）が建設業の一人親方に与える影響を解説。発注者の義務・書面交付・報酬支払・禁止行為・見積書での対応まで。",
  keywords: "フリーランス新法, 特定受託事業者法, 一人親方, 建設業, 下請法, 書面交付義務",
  openGraph: {
    title: "フリーランス新法と建設業一人親方への影響【2026年版】",
    description:
      "フリーランス新法が建設業一人親方に与える影響を解説。発注者の義務・書面交付・報酬支払・禁止行為・見積書での対応まで。",
    url: "https://mitsumori-maker.com/guide/freelance-law-construction",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/freelance-law-construction",
  },
};

export default function FreelanceLawPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="フリーランス新法と建設業一人親方への影響【2026年版】"
        description="フリーランス新法が建設業一人親方に与える影響を解説。発注者の義務・書面交付・報酬支払・禁止行為・見積書での対応まで。"
        slug="freelance-law-construction"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">ガイド</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">フリーランス新法と建設業</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            フリーランス新法と建設業一人親方への影響【2026年版】見積書・契約書の対応
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月15日</p>

          <ConstructionPromoBanner />

          <p className="text-gray-700 leading-relaxed mb-8">
            2024年11月1日、フリーランス新法（正式名称：特定受託事業者に係る取引の適正化等に関する法律）が施行されました。この法律は建設業の一人親方も適用対象となり、発注者との取引に新しいルールが加わっています。全建総連をはじめとする建設業界団体も注意喚起を行っており、見積書・請求書の書き方にも影響が出ています。本記事では、建設業一人親方が知っておくべきフリーランス新法のポイントを実務レベルで解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">フリーランス新法とは</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            フリーランス新法（特定受託事業者法）は、フリーランスや一人親方のような「個人で業務を受ける事業者」と、法人の発注者との取引を適正化するための法律です。2024年11月1日施行。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            従来の下請法は資本金基準があり、小規模事業者間の取引は保護対象外でした。フリーランス新法は資本金の制限なく、以下のような関係すべてに適用されます：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-1">
            <li>法人 → 一人親方（個人）</li>
            <li>大規模個人事業主 → 一人親方（個人）</li>
            <li>継続的な業務委託関係のすべて</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            建設業の一人親方も対象になる
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業では従来、元請けと一人親方の関係は「請負契約」として扱われ、労働基準法や下請法の枠外に置かれるケースがありました。しかしフリーランス新法では、以下の条件を満たせば建設業の一人親方も保護対象となります：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-1">
            <li>従業員を雇用していない（一人で事業を営んでいる）</li>
            <li>法人または大規模事業者から業務を受注している</li>
            <li>継続的・反復的な業務委託関係にある</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            全建総連（全国建設労働組合総連合）も2024年に「建築大工技能者等検討会 フリーランス新法チラシ」を公開し、建設業一人親方への適用を明確にしています。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">発注者に課される3つの主な義務</h2>
          <h3 className="text-base font-bold text-gray-900 mt-6 mb-2">1. 取引条件の書面交付義務</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注者は、業務委託時に以下の事項を書面（またはメール等の電磁的方法）で明示しなければなりません：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>業務の内容</li>
            <li>報酬額</li>
            <li>支払期日</li>
            <li>発注者の名称</li>
            <li>業務の完了日・納期</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書でこれらを明示しておけば、そのまま書面交付義務の一部を満たすことができます。
          </p>

          <h3 className="text-base font-bold text-gray-900 mt-6 mb-2">2. 60日以内の報酬支払義務</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注者は、給付を受領した日から原則60日以内（可能な限り短期）に報酬を支払わなければなりません。建設業でありがちな「完工後3ヶ月後に支払い」は違法になる可能性があります。
          </p>

          <h3 className="text-base font-bold text-gray-900 mt-6 mb-2">3. 7つの禁止行為</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            継続的業務委託では、発注者が以下の行為を行うことは禁止されます：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-1">
            <li>受領拒否</li>
            <li>報酬の減額</li>
            <li>返品</li>
            <li>買いたたき</li>
            <li>物の購入強制・役務の利用強制</li>
            <li>不当な経済上の利益の提供要請</li>
            <li>不当な給付内容の変更・やり直し</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            一人親方が取るべき対応
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            建設業の一人親方がフリーランス新法を活用して自身を守るためには、以下の対応が重要です。
          </p>

          <h3 className="text-base font-bold text-gray-900 mt-6 mb-2">1. 見積書・契約書で取引条件を明文化</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            曖昧な口頭合意ではなく、以下をすべて書面で記録：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>工事内容・仕様</li>
            <li>工期・納期</li>
            <li>報酬額（労務費・材料費・諸経費の内訳）</li>
            <li>支払条件（支払期日・振込先）</li>
            <li>追加工事発生時の取扱い</li>
            <li>瑕疵担保責任の範囲</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            これらを見積書・見積条件書に盛り込んでおくことで、受注時点で発注者と合意形成できます。
          </p>

          <h3 className="text-base font-bold text-gray-900 mt-6 mb-2">2. 支払期日の60日ルール明示</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の支払条件欄に「完工・検収後 ◯日以内にお振込」と明記し、60日を超える条件は拒否する姿勢を示します。
          </p>

          <h3 className="text-base font-bold text-gray-900 mt-6 mb-2">3. 違反時の通報先を把握</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注者が法律違反の行為をした場合、公正取引委員会・中小企業庁・厚生労働省が相談窓口となります。建設業の場合は国土交通省にも相談可能です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            建設業法との関係
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            改正建設業法2025とフリーランス新法は、どちらも建設業一人親方を保護する方向で動いています。両方を踏まえた見積書の作り方として：
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-1">
            <li>労務費を明示する（改正建設業法・フリーランス新法の両方）</li>
            <li>法定福利費相当額を計上する（賃金水準確保）</li>
            <li>支払期日を60日以内に設定（フリーランス新法）</li>
            <li>追加工事・設計変更の取扱いを明示（両法）</li>
            <li>瑕疵担保責任の範囲を明記（改正建設業法）</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            ツールで両法を自動でクリアする
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            弊社の
            <Link href="/construction" className="text-green-700 hover:underline font-bold">
              建設業向け見積書メーカー
            </Link>
            は、改正建設業法2025とフリーランス新法の両方を意識したフォーマットを標準で採用しています。見積条件書・労務費内訳・支払条件・瑕疵担保のすべてを漏れなく記載できるため、中小建設業者でも法令準拠の見積書を簡単に作成できます。
          </p>

          <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">
              フリーランス新法・改正建設業法に対応した見積書ツール
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              月¥1,980 から / 中小建設業者のための、法令対応の見積書メーカー
            </p>
            <Link
              href="/construction"
              className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              建設業向け見積書メーカーを見る →
            </Link>
          </div>

          <div className="mt-10 text-sm text-gray-600 border-t border-gray-200 pt-6">
            <p className="font-bold mb-2">関連ガイド</p>
            <ul className="space-y-1">
              <li><Link href="/guide/kaisei-kensetsu-2025" className="text-green-700 hover:underline">改正建設業法2025【完全ガイド】</Link></li>
              <li><Link href="/guide/legal-welfare" className="text-green-700 hover:underline">法定福利費の計算方法と業界標準料率</Link></li>
              <li><Link href="/guide/construction" className="text-green-700 hover:underline">建設業の見積書の書き方</Link></li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
}
