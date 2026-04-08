import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "見積書に前払い・着手金を記載する方法｜書き方と注意点 | 見積書メーカー",
  description: "見積書への前払い・着手金の書き方を解説。着手金・内金・手付金の違い、記載例文、トラブルを防ぐ注意点、請求書・領収書との連携まで詳しく説明します。",
};

export default function PrepaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← 見積書メーカーに戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書に前払い・着手金を記載する方法｜書き方と注意点
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月8日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            フリーランスや中小企業が大型案件を受注する際、着手前に費用の一部を受け取る「前払い・着手金」は資金繰りの面で非常に重要です。しかし、見積書への記載方法を誤るとトラブルの原因になることもあります。本記事では、前払い・着手金の見積書への書き方、着手金と内金・手付金の違い、そしてトラブルを防ぐための注意点を解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            見積書に前払い・着手金を記載するケース
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            前払いや着手金を要求するのは、以下のようなケースが代表的です。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 pl-2">
            <li>制作物・成果物の納品まで数ヶ月かかる大規模プロジェクト</li>
            <li>材料費・外注費など先行して費用が発生する案件</li>
            <li>新規の取引先で与信（信用）が未確認の場合</li>
            <li>キャンセルリスクが高い案件（イベント・撮影など）</li>
            <li>受注後すぐに専門スタッフを確保・手配する必要がある業務</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            着手金の相場は案件総額の30〜50%程度が一般的です。残金は納品時・検収完了時・検収後〇日以内など、マイルストーンに合わせて分割請求するケースもあります。見積書に支払スケジュールを明記することで、取引先との合意形成がスムーズになります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            前払い条件の書き方・記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に前払い条件を記載する方法は主に2つあります。「支払条件欄」に記載する方法と、「備考欄」に記載する方法です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">支払条件欄への記載例</h3>
          <div className="bg-gray-100 rounded-lg p-5 mb-6 text-sm text-gray-700 space-y-2">
            <p className="font-semibold text-gray-800">記載例 1：着手金あり・残金は納品時</p>
            <p>お支払条件：着手金（総額の50%）をご発注後14日以内にお支払いください。残金は納品後30日以内にお支払いください。</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-5 mb-6 text-sm text-gray-700 space-y-2">
            <p className="font-semibold text-gray-800">記載例 2：3段階分割払い</p>
            <p>お支払条件：</p>
            <p>・第1回（着手金）：受注時 ／ 総額の30%</p>
            <p>・第2回（中間金）：デザイン確定時 ／ 総額の40%</p>
            <p>・第3回（残金）：納品完了後30日以内 ／ 総額の30%</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-5 mb-6 text-sm text-gray-700 space-y-2">
            <p className="font-semibold text-gray-800">記載例 3：前払い全額</p>
            <p>お支払条件：作業開始前に全額前払いとなります。ご入金確認後に業務を開始いたします。</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">明細行に着手金を表示する方法</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の明細欄に着手金の金額を別行で表示する方法もあります。合計金額と着手金額の両方を示すことで、取引先が最初に支払う金額を一目で把握できます。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">品目・摘要</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">ECサイト構築一式</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">500,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">小計</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">500,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">消費税（10%）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">50,000円</td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">合計金額</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-900">550,000円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">うち着手金（50%・ご発注後14日以内）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">275,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">残金（納品後30日以内）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">275,000円</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            着手金と内金・手付金の違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「着手金」「内金」「手付金」は似たような言葉ですが、法律上・商慣習上の意味が異なります。見積書や契約書に正確な用語を使用することが重要です。
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-2">着手金（ちゃくしゅきん）</p>
              <p className="text-gray-700 leading-relaxed text-sm">
                業務に着手するために受け取る前払い金です。原則として、キャンセルが発生しても返還しない性質を持ちます。弁護士・税理士・コンサルタントなどの士業や、制作会社・フリーランスが広く使用します。業務が完了した後は合計金額に充当されます。
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-2">内金（うちきん）</p>
              <p className="text-gray-700 leading-relaxed text-sm">
                代金の一部を前払いするもので、最終的な代金に充当されます。着手金と似た意味合いで使われることが多いですが、内金はキャンセル時に返還される可能性が高い点で異なります。建設業や製造業の受注時に多く使われます。
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-2">手付金（てつけきん）</p>
              <p className="text-gray-700 leading-relaxed text-sm">
                民法上、契約の成立・履行の担保として交わすお金です。買主（発注者）が解除する場合は手付金を放棄し、売主（受注者）が解除する場合は手付金の倍額を返還するのが原則です（手付解除）。不動産取引や高額商品の売買で一般的に使われます。フリーランスの業務委託では通常「着手金」を使う方が適切です。
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            フリーランスや個人事業主が業務委託を受ける場合、見積書・契約書には「着手金」を使用するのが最も一般的で適切です。「手付金」と記載すると、キャンセル時に倍返しを求められるリスクがあるため注意が必要です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            前払いのトラブルを防ぐ注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            前払いを伴う取引では、金銭のやり取りが発生するため、特に慎重な対応が求められます。以下の点を必ず確認・対策しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">1. キャンセル時の返金ルールを明記する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            着手金の返金条件を見積書または契約書に明記します。「着手後のキャンセルは着手金を返還しません」「着手前のキャンセルは全額返還します」など、状況別に定めておきましょう。口頭での約束は証拠にならないため、必ず書面で残すことが重要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">2. 着手金専用の請求書を発行する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に加えて、着手金専用の請求書を別途発行しましょう。「着手金請求書（第1回）」として発行することで、入金管理がしやすくなり、取引先にも明確な支払い指示を与えられます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">3. 入金確認後に業務を開始する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            着手金が入金されたことを確認してから業務を開始するルールを設けましょう。見積書の備考欄に「ご入金確認後に業務を開始いたします」と明記することで、取引先にも伝わります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">4. 支払期日を具体的に設定する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            「なるべく早く」という曖昧な表現は避け、「ご発注後14日以内」「○月○日まで」など具体的な期日を設定します。期日を明確にすることで、取引先も支払い準備ができ、資金繰りの計画も立てやすくなります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">5. 見積書・契約書・請求書を一貫させる</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の金額・条件と、後から発行する契約書・請求書の内容が一致しているかを必ず確認します。金額や支払条件が異なると、取引先が混乱しトラブルの原因になります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            請求書・領収書との連携方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            前払いのある取引では、複数の書類を連携させて管理することが重要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">着手金の請求フロー</h3>
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <span><strong>見積書の発行</strong>：着手金条件・支払スケジュールを明記した見積書を提出</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <span><strong>発注書の受領</strong>：取引先から発注書（注文書）を受け取る</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <span><strong>着手金請求書の発行</strong>：「着手金 ○○円（合計の50%）」と記載した請求書を発行</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">4</span>
                <span><strong>入金確認・業務開始</strong>：入金確認後に業務を開始</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">5</span>
                <span><strong>着手金の領収書発行</strong>：希望に応じて領収書を発行（電子でも可）</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">6</span>
                <span><strong>残金請求書の発行</strong>：納品後に残金請求書を発行。「既払い着手金 ○○円を差し引いた残金」を記載</span>
              </li>
            </ol>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">残金請求書の記載例</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">項目</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">ECサイト構築一式（税込合計）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">550,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">着手金（受領済・○月○日入金）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">△275,000円</td>
                </tr>
                <tr className="font-semibold">
                  <td className="border border-gray-300 px-3 py-2 text-gray-900">今回ご請求金額（残金）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-900">275,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            残金請求書には「既に受領済みの着手金○○円を差し引いた残金」と明示することで、取引先が重複して支払うリスクを防げます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の書き方の基本については
            <Link href="/guide/how-to-write" className="text-blue-600 hover:underline">
              見積書の書き方・必要項目ガイド
            </Link>
            もあわせてご覧ください。また、支払条件の記載方法の詳細は
            <Link href="/guide/freelance" className="text-blue-600 hover:underline">
              フリーランス向け見積書ガイド
            </Link>
            でも解説しています。
          </p>

          <div className="mt-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-blue-800 mb-2">関連ガイド</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/guide/how-to-write" className="text-blue-600 hover:underline">
                  見積書の書き方・必要項目を徹底解説
                </Link>
              </li>
              <li>
                <Link href="/guide/freelance" className="text-blue-600 hover:underline">
                  フリーランス・個人事業主のための見積書ガイド
                </Link>
              </li>
              <li>
                <Link href="/guide/difference" className="text-blue-600 hover:underline">
                  見積書・請求書・納品書の違い
                </Link>
              </li>
              <li>
                <Link href="/guide/valid-period" className="text-blue-600 hover:underline">
                  見積書の有効期限の設定方法
                </Link>
              </li>
              <li>
                <Link href="/guide/travel-expense" className="text-blue-600 hover:underline">
                  見積書に交通費を書く方法
                </Link>
              </li>
              <li>
                <Link href="/guide/rounding" className="text-blue-600 hover:underline">
                  見積書の端数処理の方法（切り捨て・切り上げ・四捨五入）
                </Link>
              </li>
            </ul>
          </div>
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
