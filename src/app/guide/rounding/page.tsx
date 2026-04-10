import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "見積書の端数処理の方法｜切り捨て・切り上げ・四捨五入のルール | 見積書メーカー",
  description: "見積書の端数処理（切り捨て・切り上げ・四捨五入）の方法を解説。消費税計算時のルール、取引先との合意方法、インボイス対応の端数処理まで詳しく説明します。",
};

export default function RoundingPage() {
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
            見積書の端数処理の方法｜切り捨て・切り上げ・四捨五入のルール
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月8日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            見積書を作成する際、消費税の計算や単価の掛け算で端数（小数点以下の金額）が生じることがあります。「切り捨て」「切り上げ」「四捨五入」のどれを使うべきか、悩んだことはないでしょうか。本記事では、見積書における端数処理の3つの方法、消費税計算時のルール、取引先との合意方法、そして具体的な記載例を解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            見積書で端数が発生するケース
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書で端数が発生する主なケースは以下の通りです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">消費税の計算</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            消費税率10%をかけると端数が出るケースは多くあります。たとえば税抜き13,333円の場合、消費税は1,333.3円となり、小数点以下をどう処理するかが問題になります。軽減税率8%の場合も同様に端数が生じやすいです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">単価に数量を掛けた場合</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            単価が割り切れない数値の場合、数量を掛けると端数が発生します。たとえば時間単価3,000円で2.5時間分の作業費は7,500円と割り切れますが、月額費用を日割り計算した場合などは端数が出やすいです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">割引率を適用した場合</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            15%割引や5%割引など、割り切れない割引率を適用すると端数が発生します。たとえば150,000円の15%割引は22,500円と割り切れますが、133,000円の15%割引は19,950円となります。さらに端数が出るケースも多いです。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            これらの端数をどう処理するかを事前に決めておくことで、見積書・請求書間の金額の不一致を防ぎ、取引先との信頼関係を守ることができます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            端数処理の3つの方法（切り捨て・切り上げ・四捨五入）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            端数処理には「切り捨て」「切り上げ」「四捨五入」の3つの方法があります。それぞれの特徴と使いどころを理解しましょう。
          </p>

          <div className="space-y-5 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">切り捨て</span>
                <p className="font-semibold text-gray-900">小数点以下を切り捨て（端数分だけ受取金額が減る）</p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                小数点以下の端数を0にする方法です。請求金額が若干少なくなるため、取引先（発注側）にとって有利な処理です。国税庁のガイドラインでは、消費税の端数処理として「切り捨て」を採用するケースが多く、インボイス制度においても「切り捨て」が基本とされています。
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                <p>例：消費税額 1,333.3円 → <strong>1,333円</strong>（0.3円を切り捨て）</p>
                <p>例：小計 9,876.5円 → <strong>9,876円</strong>（0.5円を切り捨て）</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded">切り上げ</span>
                <p className="font-semibold text-gray-900">小数点以下を切り上げ（端数分だけ受取金額が増える）</p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                小数点以下が0より大きければ、整数部分を1増やす方法です。請求金額が若干多くなるため、受注者（請求側）にとって有利な処理です。少額の端数で損をしたくない場合に使われますが、取引先との合意がなければトラブルになる可能性があります。
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                <p>例：消費税額 1,333.3円 → <strong>1,334円</strong>（0.3円を切り上げ）</p>
                <p>例：小計 9,876.1円 → <strong>9,877円</strong>（0.1円を切り上げ）</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-1 rounded">四捨五入</span>
                <p className="font-semibold text-gray-900">小数点以下を四捨五入（最も公平な処理）</p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                小数点以下が0.5未満なら切り捨て、0.5以上なら切り上げる最も一般的な方法です。受注者・発注者の双方にとって公平な処理とされ、日本の多くのビジネスでは四捨五入が標準的に使われています。
              </p>
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                <p>例：消費税額 1,333.3円 → <strong>1,333円</strong>（0.3は0.5未満なので切り捨て）</p>
                <p>例：消費税額 1,333.6円 → <strong>1,334円</strong>（0.6は0.5以上なので切り上げ）</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">方法</th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">有利な立場</th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">インボイス対応</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">使いどころ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700 font-medium">切り捨て</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">発注者</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">推奨</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">消費税計算・大企業との取引</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700 font-medium">切り上げ</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">受注者</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">可</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">少額取引・合意がある場合</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700 font-medium">四捨五入</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">中立</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-700">可</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">一般的な商取引・SMB同士</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            消費税計算時の端数処理ルール
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            消費税の端数処理については、2023年10月から始まったインボイス制度（適格請求書等保存方式）により、一定のルールが定められています。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">インボイス制度における端数処理ルール</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス（適格請求書）では、消費税額の端数処理は<strong>請求書全体で1回のみ</strong>行うことが原則です。明細行ごとに端数処理をして、それを合計するやり方は認められていません。
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm font-semibold mb-2">注意：インボイス制度でNGな処理</p>
            <p className="text-red-700 text-sm">各明細行の税額を個別に計算・端数処理して合算する方法は、インボイス制度のルールに違反する可能性があります。消費税額は「税抜き合計に税率をかけて1回だけ端数処理」が原則です。</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">正しい消費税の計算例</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">品目</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">税抜金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">デザイン制作費</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">80,000円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">コーディング作業費</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">53,333円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">打ち合わせ費用</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">10,000円</td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">税抜合計</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">143,333円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">消費税（10%）143,333×0.1=14,333.3→切り捨て</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">14,333円</td>
                </tr>
                <tr className="bg-gray-900 text-white font-bold">
                  <td className="border border-gray-700 px-3 py-2">税込合計</td>
                  <td className="border border-gray-700 px-3 py-2 text-right">157,666円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            消費税の端数処理は「切り捨て」「四捨五入」「切り上げ」のいずれでも法律上は問題ありませんが、インボイスの運用では「切り捨て」が最も広く採用されています。詳しくは
            <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline">
              見積書の消費税・インボイス対応ガイド
            </Link>
            もご参照ください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            取引先との端数処理の合意方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            端数処理の方法は法律で「これを使え」と強制されているわけではありません（消費税の端数処理は除く）。ただし、取引先との間で方針を統一しておかないと、見積書と請求書の金額が合わないトラブルが発生します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">見積書の備考欄に明記する</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            最も簡単な方法は、見積書の備考欄または注意書きに端数処理の方針を記載することです。
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-sm text-gray-700 space-y-2">
            <p className="font-semibold text-gray-800">備考欄への記載例</p>
            <p>・消費税の端数は切り捨てにて計算しております。</p>
            <p>・金額は税抜合計に対して10%の消費税を加算し、1円未満は四捨五入しております。</p>
            <p>・単価の計算における端数は切り上げにて対応しております。</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">継続取引は契約書に盛り込む</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            長期契約や継続的な取引の場合は、業務委託契約書や取引基本契約書に端数処理の方針を明記しておきましょう。「消費税等の端数処理は切り捨てとする」などの一文を加えるだけで、毎回の見積書・請求書での説明が不要になります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">取引先の指定に従う</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            大企業や官公庁を取引先とする場合、先方の購買・経理規定で端数処理の方法が定められていることがあります。発注前に確認し、指定された方法に従いましょう。「弊社では切り捨て処理となります」などと言われることがよくあります。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
            端数処理の記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            以下に、異なる端数処理を適用した場合の見積書の記載例を示します。同じ案件でも処理方法により最終金額が変わる点に注目してください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">例：税抜合計 243,567円の場合</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">端数処理</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">消費税額（10%）</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">税込合計</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">切り捨て（243,567×0.1=24,356.7→24,356円）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">24,356円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">267,923円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">四捨五入（243,567×0.1=24,356.7→24,357円）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">24,357円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">267,924円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">切り上げ（243,567×0.1=24,356.7→24,357円）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">24,357円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">267,924円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            この例では、切り捨てと四捨五入・切り上げで1円の差が生じています。少額に見えますが、毎月請求する継続案件では年間12円の差となり、複数の取引が積み重なると無視できない差になることもあります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">時間単価の端数処理例</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">品目</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">単価</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">数量</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-700">小計（切り捨て）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">システム開発（時給5,000円）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">5,000円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">23.5h</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">117,500円</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">コンサルティング（時給8,000円）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">8,000円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">7.3h</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">58,400円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">会議・打ち合わせ（時給3,500円）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">3,500円</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">4.0h</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">14,000円</td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700" colSpan={3}>税抜合計</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">189,900円</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700" colSpan={3}>消費税（10%・切り捨て）</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-gray-700">18,990円</td>
                </tr>
                <tr className="bg-gray-900 text-white font-bold">
                  <td className="border border-gray-700 px-3 py-2" colSpan={3}>税込合計</td>
                  <td className="border border-gray-700 px-3 py-2 text-right">208,890円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            時間単価×時間数の計算では端数が出にくいよう、単価設定を工夫することも一つの方法です。また、時間の記録は30分単位・15分単位など、端数が出にくいルールを設けておくとスムーズです。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書全体の書き方については
            <Link href="/guide/how-to-write" className="text-blue-600 hover:underline">
              見積書の書き方・必要項目ガイド
            </Link>
            を、前払いの記載方法は
            <Link href="/guide/prepayment" className="text-blue-600 hover:underline">
              見積書に前払い・着手金を記載する方法
            </Link>
            もあわせてご覧ください。
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
                <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline">
                  見積書の消費税・インボイス対応ガイド
                </Link>
              </li>
              <li>
                <Link href="/guide/prepayment" className="text-blue-600 hover:underline">
                  見積書に前払い・着手金を記載する方法
                </Link>
              </li>
              <li>
                <Link href="/guide/travel-expense" className="text-blue-600 hover:underline">
                  見積書に交通費を書く方法
                </Link>
              </li>
              <li>
                <Link href="/guide/misc-expenses" className="text-blue-600 hover:underline">
                  見積書の諸経費・雑費の書き方
                </Link>
              </li>
              <li>
                <Link href="/guide/discount" className="text-blue-600 hover:underline">
                  見積書の値引き・割引の書き方
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
