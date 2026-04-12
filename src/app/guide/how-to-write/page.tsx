import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ArticleDisclosure from "@/components/ArticleDisclosure";
import AuthorProfile from "@/components/AuthorProfile";
import ToolCallout from "@/components/ToolCallout";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "見積書の書き方【完全ガイド】必須項目・記載例・テンプレ付き | 見積書メーカー",
  description:
    "見積書の書き方を初心者向けに完全解説。必須項目の一覧、正しい記載例、よくある間違いまで。個人事業主・フリーランスにも対応。すぐ使える無料テンプレート付き。",
  openGraph: {
    title: "見積書の書き方【完全ガイド】必須項目・記載例・テンプレ付き",
    description: "見積書の書き方を初心者向けに完全解説。必須項目の一覧、正しい記載例、よくある間違いまで。個人事業主・フリーランスにも対応。",
    url: "https://mitsumori-maker.com/guide/how-to-write",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "見積書の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/how-to-write",
  },
};

export default function HowToWriteGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の書き方【完全ガイド】必須項目・記載例・テンプレ付き"
        description="見積書の書き方を初心者向けに完全解説。必須項目の一覧、正しい記載例、よくある間違いまで。個人事業主・フリーランスにも対応。"
        slug="how-to-write"
        faqs={[
          {
            question: "見積書に法的な書式の決まりはありますか？",
            answer: "いいえ、見積書には法律で定められた書式はありません。ただし、取引先との認識違いを防ぐために、発行日・宛先・品名・数量・単価・消費税・合計金額などを記載するのが商慣習として定着しています。",
          },
          {
            question: "見積書に印鑑（社印）は必要ですか？",
            answer: "法的には不要ですが、ビジネス慣習として押印するのが一般的です。電子見積書の場合は電子印鑑を使用するか、押印なしでも受け付けてもらえることが増えています。",
          },
          {
            question: "見積書の有効期限はどのくらいが適切ですか？",
            answer: "一般的には2週間〜1ヶ月が目安です。原材料費や為替の変動リスクがある場合は短めに設定し、大型案件で検討期間が長い場合は長めに設定するなど、状況に応じて調整しましょう。",
          },
          {
            question: "見積書と請求書の違いは何ですか？",
            answer: "見積書は「取引前」に金額・条件を提示する書類、請求書は「取引後」に代金の支払いを求める書類です。記載項目は似ていますが、役割が異なります。",
          },
          {
            question: "見積書は何年間保管する必要がありますか？",
            answer: "法人は7年間、個人事業主は5年間（青色申告の場合は7年間）の保管が義務付けられています。電子データでの保管も可能ですが、電子帳簿保存法の要件を満たす必要があります。",
          },
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書の書き方</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の書き方【完全ガイド】必須項目・記載例・テンプレ付き
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月10日</p>
          <ArticleDisclosure />

          <p className="text-gray-700 leading-relaxed mb-8">
            「見積書を作りたいけど、何を書けばいいかわからない」「見積書の正しい書き方を知りたい」という方に向けて、見積書の書き方を基礎から完全解説します。見積書に必要な記載項目（発行日・見積番号・宛名・差出人・品目・数量・単価・合計・消費税・振込先・有効期限・備考）の一つひとつの書き方ポイント、業種別の記載例、初心者がやりがちな間違い、見積書の送り方まで、この1記事で見積書作成に必要な知識がすべてわかります。
          </p>

          {/* --- H2-1 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書とは？役割と作成が必要な理由
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書とは、取引の前段階で「この仕事をいくらで請け負います」「この商品をいくらで販売します」という金額と条件を書面で提示する書類です。法律上の作成義務はありませんが、ビジネスにおいては以下の理由から欠かせない存在です。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>取引条件の明確化</strong>：金額・納期・支払い条件などを書面で共有することで、認識のズレを防ぎます。
            </li>
            <li>
              <strong>トラブル防止</strong>：口頭での約束だけでは「言った・言わない」のトラブルになりがちです。見積書があれば証拠として機能します。
            </li>
            <li>
              <strong>比較検討の材料</strong>：発注側は複数社の見積書を比較して発注先を決定します。内容がわかりやすい見積書ほど選ばれやすくなります。
            </li>
            <li>
              <strong>社内稟議の添付資料</strong>：企業では発注に社内承認が必要なケースが多く、見積書は稟議書に添付する必須書類です。
            </li>
            <li>
              <strong>予算管理の根拠</strong>：発注側が予算を確保する際の根拠資料となります。正確な見積書は経理・経営判断を助けます。
            </li>
          </ul>

          {/* --- H2-2 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書に必要な記載項目一覧
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書には決まったフォーマットはありませんが、以下の項目を記載するのが一般的です。漏れがないようチェックしましょう。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">項目</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">内容</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">必須度</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2">タイトル</td><td className="border border-gray-300 px-4 py-2">「御見積書」または「見積書」</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">見積書番号</td><td className="border border-gray-300 px-4 py-2">管理用の連番（例：MTS-2026-001）</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">発行日</td><td className="border border-gray-300 px-4 py-2">見積書を作成した日付</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">宛先</td><td className="border border-gray-300 px-4 py-2">取引先の会社名・部署名・担当者名</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">発行者情報</td><td className="border border-gray-300 px-4 py-2">自社の会社名・住所・連絡先</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">件名</td><td className="border border-gray-300 px-4 py-2">見積もりの対象となる案件名</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">合計金額</td><td className="border border-gray-300 px-4 py-2">税込・税抜を明記した合計額</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">明細</td><td className="border border-gray-300 px-4 py-2">品名・数量・単価・金額の一覧</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">小計・消費税・合計</td><td className="border border-gray-300 px-4 py-2">税抜小計、消費税額、税込合計</td><td className="border border-gray-300 px-4 py-2 font-semibold">必須</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">有効期限</td><td className="border border-gray-300 px-4 py-2">見積もりの有効期間</td><td className="border border-gray-300 px-4 py-2">推奨</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">納期</td><td className="border border-gray-300 px-4 py-2">納品予定日</td><td className="border border-gray-300 px-4 py-2">推奨</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">支払条件</td><td className="border border-gray-300 px-4 py-2">支払い方法・期日</td><td className="border border-gray-300 px-4 py-2">推奨</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2">備考欄</td><td className="border border-gray-300 px-4 py-2">補足事項・注意事項</td><td className="border border-gray-300 px-4 py-2">任意</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 px-4 py-2">登録番号</td><td className="border border-gray-300 px-4 py-2">適格請求書発行事業者の番号（T+13桁）</td><td className="border border-gray-300 px-4 py-2">推奨</td></tr>
              </tbody>
            </table>
          </div>

          {/* --- H2-3: 各項目の詳しい書き方 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の各項目の書き方｜具体的な記載方法
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            タイトル（「御見積書」）の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            書類の上部中央に「御見積書」または「見積書」と大きく記載します。一目でどのような書類かわかるようにしましょう。「御見積書」の方がより丁寧な印象を与えます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            見積書番号の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書番号は管理のために振る連番です。「MTS-2026-001」のように年度や種別がわかる形式にすると、後から検索しやすくなります。取引先ごとにプレフィックスを変えるのも効果的です。番号は一度発行したら変更せず、修正が必要な場合は新しい番号で再発行するのが原則です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            発行日の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            発行日は見積書を作成・提出した日付を「2026年4月10日」のように和暦または西暦で記載します。取引先との間で「いつ時点の見積もりか」を明確にする重要な項目です。見積書の有効期限の起算日にもなるため、正確に記載しましょう。日付を空欄のまま渡すのはNGです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            宛先（取引先情報）の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先の会社名・部署名・担当者名を記載します。敬称のルールは以下の通りです。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>会社名宛て</strong>：株式会社〇〇 <strong>御中</strong></li>
              <li><strong>部署名宛て</strong>：株式会社〇〇 営業部 <strong>御中</strong></li>
              <li><strong>個人名宛て</strong>：株式会社〇〇 営業部 山田太郎 <strong>様</strong></li>
              <li className="text-red-600">NG：株式会社〇〇 御中 山田太郎 様（「御中」と「様」の併用は不可）</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            発行者情報（差出人）の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            自社の会社名・住所・電話番号・メールアドレス・担当者名を記載します。社印（角印）を押すのが一般的です。電子見積書の場合は電子印鑑でも問題ありません。個人事業主の場合は屋号と氏名の両方を記載し、連絡先として電話番号またはメールアドレスを必ず入れましょう。インボイス制度に対応する場合は、ここに適格請求書発行事業者の登録番号（T+13桁）も記載します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            合計金額の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            明細の上部に合計金額を大きく表示するのが一般的です。税込・税抜を必ず明記しましょう。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
            <ul className="space-y-1 text-gray-700 text-sm">
              <li><strong>記載例</strong>：御見積金額：<strong>¥1,100,000-（税込）</strong></li>
              <li><strong>記載例</strong>：御見積金額：<strong>¥1,000,000-（税抜）</strong></li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            明細（品名・数量・単価・金額）の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の中心となる部分です。品名（サービス名）・数量・単位・単価・金額を一覧表形式で記載します。品名は具体的に書くことが最も重要なポイントです。
          </p>
          <div className="space-y-3 mb-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm font-semibold mb-1">NG例</p>
              <p className="text-gray-700 text-sm">作業費一式 ¥500,000</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-sm font-semibold mb-1">OK例</p>
              <p className="text-gray-700 text-sm">Webサイトデザイン（トップページ+下層5ページ） ¥500,000</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            小計・消費税・合計の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            明細の下部に小計（税抜金額）、消費税額、合計（税込金額）を記載します。インボイス制度に対応する場合は、税率ごとの消費税額を記載し、端数処理は税率ごとに1回行います。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            有効期限・納期・支払条件の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積もりの有効期限は必ず設定しましょう。一般的には「発行日より2週間」「発行日より30日間」が目安です。原材料費の変動リスクがある業種では短めに設定するのが安全です。有効期限を書かないと、何ヶ月も後に古い金額で発注される恐れがあります。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
            <ul className="space-y-1 text-gray-700 text-sm">
              <li><strong>有効期限</strong>：発行日より30日間（2026年5月10日まで）</li>
              <li><strong>納期</strong>：ご発注から約4週間</li>
              <li><strong>支払条件</strong>：納品月末締め翌月末払い</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            振込先（支払先口座）の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の段階で振込先を記載するかは取引先や業界の慣習によりますが、記載しておくとスムーズに支払いに移行できます。銀行名・支店名・口座種別（普通/当座）・口座番号・口座名義を正確に記載しましょう。口座名義はカタカナ表記にするのが一般的です。振込手数料の負担についても「振込手数料はご負担ください」など明記しておくとトラブルを防げます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            備考欄の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            備考欄は、明細や条件欄に書ききれない補足事項を記載するスペースです。送料の扱い（「送料別途」「送料込み」）、追加費用が発生する条件、修正回数の上限、キャンセルポリシーなど、後からトラブルになりやすい項目を明記しておくと安心です。ただし、長文になりすぎると読まれなくなるため、箇条書きで簡潔にまとめましょう。
          </p>

          {/* --- H2-4: 記載例 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の記載例｜業種別テンプレート
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            具体的な見積書の記載例を業種別に紹介します。自分の業種に近いものを参考にしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            Web制作業の見積書例
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`御見積書

見積番号: MTS-2026-042
見積日:   2026年4月8日
有効期限: 2026年5月8日

【宛先】
株式会社〇〇 営業部 山田太郎 様

【件名】
コーポレートサイト リニューアル

御見積金額：¥1,210,000-（税込）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No  品目                    数量  単価        金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1   トップページデザイン      1   ¥200,000   ¥200,000
2   下層ページデザイン(5P)    5   ¥ 80,000   ¥400,000
3   コーディング             1   ¥300,000   ¥300,000
4   CMS構築(WordPress)       1   ¥150,000   ¥150,000
5   動作テスト・修正          1   ¥ 50,000   ¥ 50,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                           小計  ¥1,100,000
                     消費税(10%)    ¥110,000
                     合計(税込)  ¥1,210,000

【備考】
・納期：ご発注から約6週間
・支払条件：納品月末締め翌月末払い
・修正回数：デザイン修正は各ページ2回まで
・有効期限を過ぎた場合は再見積りとなります`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            コンサルティング業の見積書例
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`御見積書

見積番号: CON-2026-015
見積日:   2026年4月8日

【宛先】
株式会社△△ 経営企画部 御中

【件名】
業務改善コンサルティング

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No  品目                    数量    単価      金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1   現状分析・ヒアリング     2日   ¥100,000  ¥200,000
2   改善提案書作成          1式   ¥150,000  ¥150,000
3   定例ミーティング         6回   ¥ 50,000  ¥300,000
4   報告書作成              1式   ¥100,000  ¥100,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                          小計    ¥750,000
                    消費税(10%)     ¥75,000
                    合計(税込)    ¥825,000`}
          </div>

          {/* --- H2-5: 作り方の手順 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の作り方｜5ステップで完成
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を初めて作る方のために、作成手順を5ステップで解説します。
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">ステップ1：取引先の情報を確認する</p>
              <p className="text-gray-700 text-sm">
                宛先となる会社名・部署名・担当者名を正確に確認します。正式名称を使い、略称は避けましょう。名刺やメールの署名を確認するのが確実です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">ステップ2：見積もり内容を整理する</p>
              <p className="text-gray-700 text-sm">
                提供するサービスや商品を洗い出し、品名・数量・単価を決定します。取引先から要件を聞き取り、漏れがないように確認しましょう。不明確な部分は「別途見積」として備考に記載します。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">ステップ3：明細を作成する</p>
              <p className="text-gray-700 text-sm">
                品名は具体的に記載し、数量・単位・単価・金額を一覧表にします。「一式」はできるだけ避け、内訳がわかるように分けて記載するのがポイントです。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">ステップ4：消費税・合計を計算する</p>
              <p className="text-gray-700 text-sm">
                小計（税抜）を算出し、消費税額を計算して合計（税込）を記載します。消費税の端数処理は税率ごとに1回行いましょう。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">ステップ5：条件・備考を記載して完成</p>
              <p className="text-gray-700 text-sm">
                有効期限・納期・支払条件を記載し、補足事項があれば備考欄に追記します。最後に全体を見直して、金額の計算ミスや誤字脱字がないか確認しましょう。
              </p>
            </div>
          </div>

          {/* --- H2-6 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書でよくある失敗例と対策
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">品名が曖昧すぎる</p>
              <p className="text-gray-600 text-sm mb-2">NG：「作業費一式 ¥500,000」</p>
              <p className="text-gray-600 text-sm">OK：「Webサイトデザイン（トップページ+下層5ページ）¥500,000」</p>
              <p className="text-gray-500 text-xs mt-1">→ 何に対する費用か分からないと、後で「思っていた内容と違う」とトラブルになります</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">有効期限を設定していない</p>
              <p className="text-gray-600 text-sm">半年後に「この見積もりでお願いします」と言われても、原材料費や人件費が変わっている可能性があります。必ず有効期限を明記しましょう。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">税込・税抜が不明確</p>
              <p className="text-gray-600 text-sm">金額が税込なのか税抜なのか曖昧だと、最終的な支払額で認識のズレが生じます。インボイス制度導入後は、税率ごとの消費税額を正確に記載する必要があります。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">宛名の敬称を間違える</p>
              <p className="text-gray-600 text-sm">会社名には「御中」、個人名には「様」が基本です。「御中」と「様」を併用するのはNGです。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">見積書番号を振っていない</p>
              <p className="text-gray-600 text-sm">番号がないと、後から「あの見積書」と特定するのが困難になります。必ず一意の番号を振り、発行した見積書は控えを保管しましょう。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">発行日を空欄にしている</p>
              <p className="text-gray-600 text-sm">発行日が空欄だと有効期限の起算日が不明になり、いつ時点の金額なのかも分かりません。作成日を必ず記入しましょう。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">数量や単位が曖昧</p>
              <p className="text-gray-600 text-sm">「デザイン費 ¥300,000」だけでは何ページ分なのか不明です。「トップページデザイン 1ページ ¥300,000」のように数量と単位を明記しましょう。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">合計金額の計算ミス</p>
              <p className="text-gray-600 text-sm">手入力で作成すると単価×数量の掛け算や消費税の計算で間違いが起こりがちです。見積書メーカーなどのツールを使えば自動計算されるためミスを防げます。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">振込先の口座名義が間違っている</p>
              <p className="text-gray-600 text-sm">口座名義のカタカナ表記を間違えると、取引先が振り込めないトラブルになります。通帳やネットバンキングで正確な口座名義を確認してから記載しましょう。</p>
            </div>
          </div>

          {/* --- H2-7: 見積書を書くときのポイント --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書を書くときの7つのポイント
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 品名は具体的にわかりやすく
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「作業費」「その他」といった曖昧な項目名は、取引先を不安にさせます。何に対する費用なのかが一目でわかるように、具体的な品名を心がけましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 税込・税抜を必ず明記する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            金額が税込なのか税抜なのかが曖昧だと、後々トラブルの原因になります。合計額だけでなく、単価レベルでも税込・税抜を統一して明記するのがベストです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 有効期限を設定する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に有効期限を設けないと、数ヶ月後に「この金額でお願いします」と言われた場合に対応が困難です。一般的には発行日から2週間~1ヶ月程度が目安です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 見積書番号で管理する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に連番を振ることで、過去の見積もりを素早く検索・参照できるようになります。取引先ごとや案件ごとにプレフィックスを付けるとさらに管理しやすくなります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            5. 条件変更時は再見積もりとする
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先から内容の変更を求められた場合は、新しい見積書番号で再発行しましょう。旧版と新版が混在すると混乱の原因になります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            6. 備考欄を有効活用する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            送料の扱い、追加費用が発生する条件、修正回数の上限など、後でトラブルになりやすい項目は備考欄に明記しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            7. 発行後は必ず控えを保管する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書は税務調査の際に提出を求められることがあります。発行した見積書のPDFデータや紙の控えは、最低でも7年間保管しておきましょう。電子データでの保管は、電子帳簿保存法の要件を満たす形で行うのが安心です。
          </p>

          {/* --- H2-8: 作成方法の比較 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の作成方法を比較
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を作成する方法はいくつかあります。それぞれの特徴を比較してみましょう。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">作成方法</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">メリット</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">デメリット</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">おすすめの人</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Excel</td>
                  <td className="border border-gray-300 px-4 py-2">自由度が高い、計算式が使える</td>
                  <td className="border border-gray-300 px-4 py-2">テンプレート作成に手間、デザインが崩れやすい</td>
                  <td className="border border-gray-300 px-4 py-2">Excel操作に慣れている人</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Word</td>
                  <td className="border border-gray-300 px-4 py-2">レイアウトの自由度が高い</td>
                  <td className="border border-gray-300 px-4 py-2">計算が手動、入力ミスが起きやすい</td>
                  <td className="border border-gray-300 px-4 py-2">文書作成に慣れている人</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">会計ソフト</td>
                  <td className="border border-gray-300 px-4 py-2">請求書連携、データ管理が簡単</td>
                  <td className="border border-gray-300 px-4 py-2">月額費用がかかる</td>
                  <td className="border border-gray-300 px-4 py-2">継続的に大量に発行する人</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">オンラインツール</td>
                  <td className="border border-gray-300 px-4 py-2">無料、登録不要、すぐ使える</td>
                  <td className="border border-gray-300 px-4 py-2">機能が限定的な場合がある</td>
                  <td className="border border-gray-300 px-4 py-2">初めて作る人、手軽に作りたい人</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            初めて見積書を作成する方や、テンプレートを用意する手間を省きたい方には、ブラウザ上で簡単に作成できるオンラインツールがおすすめです。見積書メーカーなら、必要な項目を入力するだけで整ったデザインの見積書がすぐに完成し、PDFでダウンロードできます。
          </p>

          {/* --- H2-9: 見積書の送り方 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の送り方｜メール・郵送・PDFの使い分け
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書が完成したら、取引先に送付します。送り方は主に3つあり、それぞれ注意点が異なります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            メール（PDF添付）で送る場合
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            最も一般的な送付方法です。見積書をPDFに変換してメールに添付します。件名は「【見積書送付】〇〇の件（株式会社△△）」のように案件名と社名を入れると、相手が見つけやすくなります。本文には挨拶と見積書の概要（合計金額・有効期限）を簡潔に書き添えましょう。ファイル名は「御見積書_株式会社△△_20260410.pdf」のように相手先名と日付を含めると親切です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            郵送で送る場合
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            紙の見積書を郵送する場合は、送付状（カバーレター）を同封するのがビジネスマナーです。送付状には送付書類の一覧と簡単な挨拶文を記載します。封筒の表面左下に「見積書在中」と朱書きすると、相手の担当者に確実に届きやすくなります。重要な見積書の場合は簡易書留での送付も検討しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            クラウドツール・チャットで共有する場合
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            最近ではSlackやChatworkなどのビジネスチャットでPDFを直接共有するケースも増えています。手軽ですが、重要な書類がチャットの会話に埋もれやすいため、メールでも正式に送付することをおすすめします。見積書メーカーならブラウザ上で作成してすぐにPDFをダウンロードできるので、どの送付方法にも対応できます。
          </p>

          {/* --- H2-10: FAQ --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            よくある質問（FAQ）
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 見積書に法的な書式の決まりはありますか？</p>
              <p className="text-gray-700 text-sm">
                A. いいえ、見積書には法律で定められた書式はありません。ただし、取引先との認識違いを防ぐために、上記で紹介した項目を記載するのが商慣習として定着しています。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 見積書に印鑑（社印）は必要ですか？</p>
              <p className="text-gray-700 text-sm">
                A. 法的には不要ですが、ビジネス慣習として押印するのが一般的です。電子見積書の場合は電子印鑑を使用するか、押印なしでも受け付けてもらえることが増えています。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 見積書の有効期限はどのくらいが適切ですか？</p>
              <p className="text-gray-700 text-sm">
                A. 一般的には2週間~1ヶ月が目安です。原材料費や為替の変動リスクがある場合は短めに設定し、大型案件で検討期間が長い場合は長めに設定するなど、状況に応じて調整しましょう。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 見積書と請求書の違いは何ですか？</p>
              <p className="text-gray-700 text-sm">
                A. 見積書は「取引前」に金額・条件を提示する書類、請求書は「取引後」に代金の支払いを求める書類です。記載項目は似ていますが、役割が異なります。詳しくは<Link href="/guide/difference" className="text-blue-600 hover:underline">見積書・請求書・納品書の違い</Link>をご覧ください。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 見積書は何年間保管する必要がありますか？</p>
              <p className="text-gray-700 text-sm">
                A. 法人は7年間、個人事業主は5年間（青色申告の場合は7年間）の保管が義務付けられています。電子データでの保管も可能ですが、電子帳簿保存法の要件を満たす必要があります。
              </p>
            </div>
          </div>

          {/* --- まとめ --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書は、ビジネスの第一歩となる大切な書類です。必要な項目を漏れなく記載し、相手にとってわかりやすい内容にすることが、信頼獲得と円滑な取引につながります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            特に重要なのは以下の3点です。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>品名を具体的に書くこと</li>
            <li>税込・税抜を明確にすること</li>
            <li>有効期限を必ず設定すること</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            これらを押さえておけば、初めてでもプロフェッショナルな見積書を作成できます。見積書メーカーを使えば、上記の項目をフォームに入力するだけで、整った見積書がPDFで完成します。
          </p>

          <ToolCallout steps={[
            "トップページを開き、「発行日」「見積番号」を入力",
            "「宛先」に取引先名を入力（「御中」は自動付与）",
            "品目・数量・単価を入力すると小計・消費税・合計が自動計算",
            "「備考欄」に有効期限・支払い条件を記入",
            "テンプレートを選んでPDFダウンロード"
          ]} />
        </article>

        <AuthorProfile />

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            見積書・請求書の管理を会計ソフトで効率化
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の作成に慣れてきたら、会計ソフトの導入も検討してみましょう。見積書から請求書への変換、売上管理、確定申告まで一元化できるため、書類作成にかかる時間を大幅に削減できます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>やよいの青色申告オンライン</strong>は、個人事業主・フリーランスに人気No.1の会計ソフトです。初年度無料で使えるプランがあり、インボイス制度にも完全対応しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JDCT6+35XE+5YJRM"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
            >
              やよいの青色申告オンラインを見る →
            </a>
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JDCT6+35XE+601S2"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors text-center text-sm"
            >
              やよいの白色申告オンラインを見る →
            </a>
          </div>
          <div className="pt-4 border-t border-blue-200">
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              <strong>freee会計</strong>はクラウド会計シェアNo.1。スマホアプリでレシート撮影や経費入力ができ、質問に答えるだけで確定申告書類が完成します。
            </p>
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JU+3SPO+9FDAJ6"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors text-center text-sm"
            >
              freee会計を無料で試す →
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方・インボイス対応ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/remarks" className="text-blue-600 hover:underline text-sm">
                見積書の備考欄の書き方・記載例まとめ
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">
                見積書の有効期限の設定方法・書き方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/addressing" className="text-blue-600 hover:underline text-sm">
                見積書の宛名の書き方・敬称の使い分け
              </Link>
            </li>
            <li>
              <Link href="/guide/bank-info" className="text-blue-600 hover:underline text-sm">
                見積書の振込先の書き方・記載例
              </Link>
            </li>
            <li>
              <Link href="/guide/template-excel" className="text-blue-600 hover:underline text-sm">
                見積書テンプレート（Excel・PDF）の選び方と活用法
              </Link>
            </li>
            <li>
              <Link href="/guide/freelance" className="text-blue-600 hover:underline text-sm">
                フリーランス・個人事業主のための見積書ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/email" className="text-blue-600 hover:underline text-sm">
                見積書のメール送付マナー・例文テンプレート
              </Link>
            </li>
            <li>
              <Link href="/guide/lump-sum" className="text-blue-600 hover:underline text-sm">
                見積書の「一式」の書き方・使い方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/difference" className="text-blue-600 hover:underline text-sm">
                見積書・請求書・納品書の違いをわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/english" className="text-blue-600 hover:underline text-sm">
                英語の見積書（Quotation）の書き方・テンプレート
              </Link>
            </li>
          </ul>
        </div>

        <ShareButtons
          url="https://mitsumori-maker.com/guide/how-to-write"
          title="見積書の書き方【完全ガイド】必須項目・記載例・テンプレ付き"
        />

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・PDF出力対応
          </p>
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
