import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import AuthorProfile from "@/components/AuthorProfile";
import ToolCallout from "@/components/ToolCallout";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "見積書の振込先・口座情報の正しい書き方【記載例・テンプレ付き】 | 見積書メーカー",
  description:
    "見積書に振込先・口座情報を記載する方法を解説。個人事業主・法人の記載例、複数口座の書き方、振込手数料の表記、請求書との使い分けまで網羅。すぐ使えるテンプレート付き。",
  openGraph: {
    title: "見積書の振込先・口座情報の正しい書き方 | 見積書メーカー",
    description: "見積書に振込先・口座情報を記載する方法を解説。個人事業主・法人の記載例、すぐ使えるテンプレート付き。",
    url: "https://mitsumori-maker.com/guide/bank-info",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%8C%AF%E8%BE%BC%E5%85%88%E3%83%BB%E5%8F%A3%E5%BA%A7%E6%83%85%E5%A0%B1%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "見積書の振込先・口座情報の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/bank-info",
  },
};

export default function GuideBankInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の振込先・口座情報の正しい書き方【記載例・テンプレ付き】"
        description="見積書に振込先・口座情報を記載する方法を解説。個人事業主・法人の記載例、すぐ使えるテンプレート付き。"
        slug="bank-info"
        datePublished="2026-04-02"
        dateModified="2026-04-10"
        faqs={[
          { question: "見積書に振込先口座を記載するのは必須ですか？", answer: "法的な必須事項ではありませんが、取引の流れをスムーズにするために記載しておくと便利です。特にフリーランスや個人事業主の場合、見積書の段階から口座情報を記載しておくと請求時の二度手間を省けます。" },
          { question: "振込手数料は見積書に記載すべきですか？", answer: "振込手数料の負担について明記しておくことをお勧めします。「振込手数料はご負担ください」または「振込手数料は弊社負担」のように備考欄や前提条件に記載することで、後々のトラブルを防ぐことができます。" },
          { question: "インボイス制度で振込先の記載に変更はありますか？", answer: "インボイス制度（適格請求書）では、銀行口座情報の記載方法自体に変更はありません。ただし、請求書として使用する場合は適格請求書発行事業者の登録番号を記載する必要があります。見積書と請求書を兼用する場合は登録番号も記載しましょう。" }
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">見積書メーカー</Link>
            <span className="mx-1">/</span>
            <span>ガイド</span>
            <span className="mx-1">/</span>
            <span className="text-gray-700">振込先の書き方</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            &larr; 見積書メーカーに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の振込先・口座情報の正しい書き方【記載例・テンプレ付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月10日</p>

          <p className="text-gray-700 leading-relaxed mb-6">
            見積書を作成する際、「振込先を書くべきか？」「どのように記載すればよいか？」と迷う方は少なくありません。振込先の記載は取引をスムーズに進めるために重要なポイントです。この記事では、見積書における振込先・口座情報の正しい書き方を、具体的な記載例とともに解説します。
          </p>

          {/* --- H2: 1 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書に振込先を記載すべきか？
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            結論から言うと、見積書への振込先記載は「任意」です。見積書は取引前に金額や条件を提示するための書類であり、法的に振込先の記載が義務付けられているわけではありません。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            ただし、以下のようなケースでは見積書に振込先を記載しておくと、取引先とのやり取りがスムーズになります。
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>見積書がそのまま発注書として使われる場合</li>
            <li>取引先から「見積書に振込先を入れてほしい」と依頼された場合</li>
            <li>小規模な取引で、見積書と請求書を兼用する場合</li>
            <li>初めての取引先で、事前に口座情報を共有しておきたい場合</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            一方、正式な請求書を別途発行する場合は、見積書には振込先を記載せず、請求書に記載するのが一般的です。取引の流れや取引先の要望に合わせて判断しましょう。
          </p>

          {/* --- H2: 2 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            振込先の正しい書き方・記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に振込先を記載する場合、以下の項目を正確に記載することが大切です。誤った情報を記載すると、振込エラーや入金遅延の原因になります。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            必要な記載項目
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">
                    項目
                  </th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">
                    内容・注意点
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-gray-700">金融機関名</td>
                  <td className="px-4 py-2 text-gray-700">
                    正式名称で記載（例: 三菱UFJ銀行）
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">支店名</td>
                  <td className="px-4 py-2 text-gray-700">
                    正式な支店名を記載（例: 渋谷支店）
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">口座種別</td>
                  <td className="px-4 py-2 text-gray-700">
                    普通・当座のいずれかを明記
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">口座番号</td>
                  <td className="px-4 py-2 text-gray-700">7桁の数字を正確に記載</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">口座名義</td>
                  <td className="px-4 py-2 text-gray-700">
                    カタカナで記載するのが一般的
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            記載例（個人事業主の場合）
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
            <p className="text-gray-700 text-sm leading-loose">
              <strong>お振込先</strong>
              <br />
              三菱UFJ銀行 渋谷支店
              <br />
              普通 1234567
              <br />
              口座名義: ヤマダ タロウ
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            記載例（法人の場合）
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-gray-700 text-sm leading-loose">
              <strong>お振込先</strong>
              <br />
              みずほ銀行 新宿支店
              <br />
              普通 7654321
              <br />
              口座名義: カ）ヤマダショウジ
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            法人の場合、口座名義は「カ）」（株式会社）や「ユ）」（有限会社）のように略称を使うのが一般的です。通帳に記載されている名義をそのまま転記するのが確実です。
          </p>

          {/* --- H2: 3 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            複数の振込先がある場合の対応
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            事業の規模や取引先に応じて、複数の銀行口座を使い分けているケースもあります。見積書に複数の振込先を記載する場合は、以下の点に注意しましょう。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            複数口座を記載する場合のポイント
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>
              取引先が振込しやすい口座を優先して記載する（同一銀行だと手数料が安い場合がある）
            </li>
            <li>
              「いずれかの口座にお振込みください」と一言添えると親切
            </li>
            <li>
              口座が3つ以上になる場合は、見積書が煩雑になるため2つ程度に絞るのがおすすめ
            </li>
          </ul>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            記載例
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-gray-700 text-sm leading-loose">
              <strong>お振込先（いずれかにお振込みください）</strong>
              <br />
              <br />
              【口座1】三菱UFJ銀行 渋谷支店 / 普通 1234567 / ヤマダ タロウ
              <br />
              【口座2】ゆうちょ銀行 / 記号 10000 / 番号 12345678 / ヤマダ タロウ
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            ゆうちょ銀行の場合は「記号・番号」で記載するのが通例ですが、他行から振込を受ける場合は「店名・口座番号」の形式も併記しておくと親切です。ゆうちょ銀行のWebサイトで振込用の店名・口座番号を確認できます。
          </p>

          {/* --- H2: 4 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            振込手数料の負担についての記載方法
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            振込手数料の負担先は、トラブルを防ぐために見積書の段階で明記しておくことをおすすめします。民法第485条では「弁済の費用は債務者（支払う側）の負担」と定められていますが、実務では取引先との関係性によって異なるケースもあります。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            振込手数料の記載パターン
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">
                    パターン
                  </th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">
                    記載例
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-gray-700">
                    取引先負担（一般的）
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    「振込手数料はお客様のご負担にてお願いいたします」
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">自社負担</td>
                  <td className="px-4 py-2 text-gray-700">
                    「振込手数料は弊社にて負担いたします」
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">折半</td>
                  <td className="px-4 py-2 text-gray-700">
                    「振込手数料は各自ご負担ください」
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書のフッター部分や備考欄に、振込手数料の負担について一文を添えるのが一般的です。特に初めての取引先の場合は、事前に手数料負担の取り決めを確認しておくとスムーズです。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            振込手数料の相場と節約のポイント
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            振込手数料は金融機関や振込方法によって異なります。一般的にはインターネットバンキング経由で同一銀行宛てなら無料、他行宛てでも220〜440円程度で済みます。一方、窓口での振込は660〜880円程度かかるケースもあります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            取引先と同じ銀行に口座を持っている場合は「同行宛て振込手数料無料」の恩恵を受けられるため、見積書に同行の口座を優先的に記載しておくと、取引先からの印象も良くなります。複数の金融機関の口座を記載し、「同行口座がある場合はそちらをご利用ください」と一言添える方法も効果的です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            また、フリーランスや個人事業主の場合、手数料負担の記載が曖昧だと入金額が想定より少なくなるトラブルが起きがちです。見積書の段階で「振込手数料はお客様のご負担にてお願いいたします」と明記しておけば、後から請求書で揉めることを防げます。
          </p>

          {/* --- H2: 5 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            振込先記載時の注意点・セキュリティ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            口座情報は個人情報・機密情報に該当するため、取り扱いには十分な注意が必要です。以下のポイントを押さえておきましょう。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            メール送信時の注意
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>
              見積書をメールで送る場合は、PDFファイルにパスワードを設定するか、パスワードを別メールで送る方法が安全です
            </li>
            <li>
              宛先の入力ミスによる情報漏洩に注意する
            </li>
            <li>
              CCやBCCで不必要な関係者に口座情報が共有されないよう確認する
            </li>
          </ul>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            Web上での取り扱い
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>
              クラウドサービスで見積書を共有する場合は、アクセス権限を適切に設定する
            </li>
            <li>
              URLで誰でもアクセスできる状態にしない
            </li>
            <li>
              取引終了後は共有リンクを無効化する
            </li>
          </ul>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            口座情報の正確性
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>
              口座番号や名義に誤りがあると振込エラーになるため、通帳やオンラインバンキングの情報と照合して正確に記載する
            </li>
            <li>
              銀行の合併・支店統合で情報が変わっている場合があるため、定期的に最新情報を確認する
            </li>
            <li>
              テンプレートに口座情報を保存しておくと、毎回入力する手間を省けて入力ミスも防げる
            </li>
          </ul>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            ネットバンク口座の記載方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            楽天銀行・PayPay銀行・住信SBIネット銀行などのネットバンクを利用している場合は、支店名が独特な名称になっていることがあります（例：楽天銀行 ジャズ支店）。取引先が混乱しないよう、以下の点に気をつけましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>
              支店名だけでなく支店番号（3桁）も併記すると、振込時の検索がスムーズになる
            </li>
            <li>
              口座名義はオンラインバンキングの「振込先口座情報」画面で確認できる正式なカタカナ表記を使う
            </li>
            <li>
              取引先がネットバンクに馴染みがない場合は、従来の都市銀行・地方銀行の口座も選択肢として併記しておくと親切
            </li>
          </ul>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-gray-500 text-xs mb-2">記載例（ネットバンクの場合）</p>
            <p className="text-gray-700 text-sm leading-loose">
              <strong>【お振込先】</strong><br />
              楽天銀行 ジャズ支店（支店番号221）<br />
              普通 1234567<br />
              口座名義: ヤマダ タロウ
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">
            フィッシング詐欺・なりすましへの対策
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            近年、取引先を装って偽の口座情報を記載したメールを送り、振込金をだまし取る「ビジネスメール詐欺（BEC）」が増加しています。見積書の送付・受領の両方で以下の対策を意識しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>
              口座情報を変更した場合は、メールだけでなく電話でも変更の事実を取引先に確認してもらう
            </li>
            <li>
              見積書の送付元メールアドレスが正規のものか、受領側も必ず確認する
            </li>
            <li>
              見積書のPDFには電子署名やタイムスタンプを付与すると、改ざんの検知が可能になる
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            特に高額な取引では、口座情報の真正性を複数の手段で確認することが重要です。見積書をPDFでダウンロードして送付することで、文書の改ざんリスクを軽減できます。
          </p>

          {/* --- H2: 6 見積書と請求書の振込先の使い分け --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書と請求書で振込先の書き方は変えるべき？
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「振込先は見積書と請求書のどちらに書くのが正しいのか」という疑問を持つ方は多くいます。結論として、振込先の記載ルールは明確に決まっておらず、取引の慣習や相手先の要望に合わせるのが基本です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            一般的な使い分けの目安は以下のとおりです。
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">書類</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">振込先の記載</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">理由</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-gray-700">見積書</td>
                  <td className="px-4 py-2 text-gray-700">任意（記載しなくてもよい）</td>
                  <td className="px-4 py-2 text-gray-700">取引条件の提示が主目的のため</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">請求書</td>
                  <td className="px-4 py-2 text-gray-700">記載するのが一般的</td>
                  <td className="px-4 py-2 text-gray-700">入金を依頼する書類であるため</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-700">見積書兼請求書</td>
                  <td className="px-4 py-2 text-gray-700">必ず記載する</td>
                  <td className="px-4 py-2 text-gray-700">請求の役割を兼ねるため</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            小規模な取引やフリーランスの場合、見積書がそのまま請求書の役割を果たすケースもあるため、見積書の段階から振込先を入れておくと二度手間を省けます。請求書の書き方については<Link href="/guide/invoice-bank-info" className="text-blue-600 hover:text-blue-800 underline">請求書の振込先・口座情報の書き方</Link>で詳しく解説しています。
          </p>

          {/* --- H2: 7 口座情報のテンプレート --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            すぐ使える振込先のテンプレート（コピペ用）
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に振込先を記載する際、毎回手入力するとミスの原因になります。以下のテンプレートをコピーして、自社の情報に書き換えてお使いください。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
            <p className="text-gray-500 text-xs mb-2">テンプレート1：銀行口座（個人事業主向け）</p>
            <p className="text-gray-700 text-sm leading-loose">
              <strong>【お振込先】</strong><br />
              ○○銀行 ○○支店<br />
              普通 ○○○○○○○<br />
              口座名義: ○○○○（カタカナ）<br />
              ※振込手数料はお客様のご負担にてお願いいたします
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
            <p className="text-gray-500 text-xs mb-2">テンプレート2：銀行口座（法人向け）</p>
            <p className="text-gray-700 text-sm leading-loose">
              <strong>【お振込先】</strong><br />
              ○○銀行 ○○支店<br />
              普通 ○○○○○○○<br />
              口座名義: カ）○○○○<br />
              ※振込手数料はお客様のご負担にてお願いいたします<br />
              ※お支払期限: 請求書発行月の翌月末日
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-gray-500 text-xs mb-2">テンプレート3：ゆうちょ銀行</p>
            <p className="text-gray-700 text-sm leading-loose">
              <strong>【お振込先】</strong><br />
              ゆうちょ銀行<br />
              記号: ○○○○○ / 番号: ○○○○○○○○<br />
              （他行からの振込の場合）○○八店（店番○○○）普通 ○○○○○○○<br />
              口座名義: ○○○○（カタカナ）
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書メーカーでは、備考欄に振込先情報を入力するだけで、PDF出力にそのまま反映されます。テンプレートを保存しておけば、次回以降の見積書作成も効率的に行えます。
          </p>

          {/* --- まとめ --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書に振込先を記載するかどうかは取引の状況によりますが、記載する場合は金融機関名・支店名・口座種別・口座番号・口座名義の5項目を正確に記載することが大切です。振込手数料の負担についても備考欄に明記しておくと、取引先との認識のズレを防げます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            口座情報は機密性が高いため、メール送信やクラウド共有の際にはセキュリティにも配慮しましょう。見積書メーカーなら、口座情報を含めた見積書をブラウザ上で簡単に作成し、PDFで安全にダウンロードできます。
          </p>

          {/* --- 関連記事リンク --- */}
          <div className="mt-10 bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              関連ガイド
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/guide/how-to-write"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  見積書の書き方・必要な記載項目を解説
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/remarks"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  見積書の備考欄の書き方・例文まとめ
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/invoice-bank-info"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  請求書の振込先の書き方ガイド
                </Link>
              </li>
            </ul>
          </div>

          <ToolCallout steps={[
            "トップページの「備考欄」に振込先情報を入力",
            "銀行名・支店名・口座種別・口座番号・口座名義を記載",
            "振込手数料の負担先（「振込手数料はご負担ください」等）も記入",
            "テンプレートを選んでPDFダウンロード — 備考欄が自動でレイアウトされます"
          ]} />
        </article>

        <AuthorProfile />

        <ShareButtons
          url="https://mitsumori-maker.com/guide/bank-info"
          title="見積書の振込先・口座情報の正しい書き方【記載例・テンプレ付き】"
        />

        {/* CTA */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・完全無料・PDF出力対応
          </p>
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
