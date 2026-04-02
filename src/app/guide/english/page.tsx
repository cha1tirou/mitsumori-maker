import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "見積書を英語で作成する方法・英語テンプレートと頻出フレーズ集 | 見積書メーカー",
  description:
    "見積書を英語で作成する方法を解説。Quotationの書き方、英語見積書に必要な項目、よく使うフレーズ、テンプレート例、注意点をまとめました。",
  openGraph: {
    title: "見積書を英語で作成する方法・英語テンプレートと頻出フレーズ集",
    description:
      "英語の見積書（Quotation）の書き方、必要項目、頻出フレーズ、テンプレート例を解説。海外取引にも対応。",
    url: "https://mitsumori-maker.com/guide/english",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/english",
  },
};

export default function EnglishQuotationGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書を英語で作成する方法・英語テンプレートと頻出フレーズ集"
        description="英語の見積書（Quotation）の書き方、必要項目、頻出フレーズ、テンプレート例を解説。"
        slug="english"
        datePublished="2026-04-02"
        dateModified="2026-04-02"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">英語の見積書の書き方</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書を英語で作成する方法・英語テンプレートと頻出フレーズ集
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月2日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            海外の取引先とビジネスをする際、英語の見積書（Quotation）を求められることがあります。日本語の見積書とは書式やルールが異なる部分も多く、初めて作成する場合は戸惑うことも少なくありません。この記事では、英語見積書の基本構成から、実際に使えるフレーズ・テンプレート、作成時の注意点までをわかりやすく解説します。
          </p>

          {/* H2-1 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語の見積書（Quotation）とは？日本語との違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語の見積書は一般的に「Quotation」と呼ばれます。ほかにも「Estimate」や「Proposal」という表現がありますが、それぞれニュアンスが異なります。
          </p>
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Quotation</strong>：正式な見積書。記載された金額や条件に一定の拘束力を持つ</li>
              <li><strong>Estimate</strong>：概算見積り。最終金額が変動する可能性がある場合に使う</li>
              <li><strong>Proposal</strong>：提案書に近い。見積りだけでなく提案内容や進め方を含む</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            日本語の見積書との主な違いとして、英語の見積書には印鑑（社印）が不要であることが挙げられます。代わりに、担当者のサインや会社のレターヘッドを使用するのが一般的です。また、日付の書式も「月/日/年」（アメリカ式）または「日/月/年」（イギリス式）となり、日本の「年/月/日」とは異なります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            さらに、英語の見積書では支払条件（Payment Terms）を明記することが重視されます。「Net 30」（30日以内に支払い）や「Due on receipt」（受領後即日支払い）など、取引先との認識のズレを防ぐために具体的な表現が使われます。
          </p>

          {/* H2-2 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書に必要な項目と記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語の見積書に記載すべき項目は、基本的に日本語の見積書と共通していますが、英語特有の表記ルールがあります。以下が主要な項目です。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">英語表記</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">日本語の対応項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">記載例</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">Quotation Number</td>
                  <td className="px-4 py-3">見積書番号</td>
                  <td className="px-4 py-3">QT-2026-0042</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3">Date</td>
                  <td className="px-4 py-3">発行日</td>
                  <td className="px-4 py-3">April 2, 2026</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">Valid Until / Expiry Date</td>
                  <td className="px-4 py-3">有効期限</td>
                  <td className="px-4 py-3">May 2, 2026</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3">Bill To / Customer</td>
                  <td className="px-4 py-3">宛先</td>
                  <td className="px-4 py-3">ABC Corporation</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">From / Supplier</td>
                  <td className="px-4 py-3">発行者</td>
                  <td className="px-4 py-3">XYZ Ltd.</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3">Description</td>
                  <td className="px-4 py-3">品名・内容</td>
                  <td className="px-4 py-3">Web Design Service</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">Quantity (Qty)</td>
                  <td className="px-4 py-3">数量</td>
                  <td className="px-4 py-3">1</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3">Unit Price</td>
                  <td className="px-4 py-3">単価</td>
                  <td className="px-4 py-3">$3,000.00</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3">Subtotal</td>
                  <td className="px-4 py-3">小計</td>
                  <td className="px-4 py-3">$3,000.00</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3">Tax</td>
                  <td className="px-4 py-3">税額</td>
                  <td className="px-4 py-3">$300.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3">合計金額</td>
                  <td className="px-4 py-3">$3,300.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            上記に加えて、Payment Terms（支払条件）やNotes / Remarks（備考）を記載するのが一般的です。日本の見積書では「御中」を使いますが、英語では「Attn:（Attention）」や「Dear Mr./Ms.」を使って宛先を明示します。
          </p>

          {/* H2-3 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書でよく使う表現・フレーズ集
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語の見積書やそのカバーレター（送付状）で頻繁に使われるフレーズをまとめました。そのままコピーして使えます。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            見積書の送付時に使うフレーズ
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4 space-y-3">
            <div>
              <p className="text-gray-800 text-sm font-medium">「見積書を添付いたします」</p>
              <p className="text-gray-600 text-sm italic">Please find attached our quotation for your review.</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「ご依頼いただいた件の見積書をお送りします」</p>
              <p className="text-gray-600 text-sm italic">We are pleased to submit the following quotation as requested.</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「本見積りの有効期限は30日間です」</p>
              <p className="text-gray-600 text-sm italic">This quotation is valid for 30 days from the date of issue.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            支払条件・備考でよく使うフレーズ
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4 space-y-3">
            <div>
              <p className="text-gray-800 text-sm font-medium">「請求書発行後30日以内にお支払いください」</p>
              <p className="text-gray-600 text-sm italic">Payment is due within 30 days of invoice date. (Net 30)</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「価格には消費税が含まれていません」</p>
              <p className="text-gray-600 text-sm italic">Prices quoted are exclusive of tax.</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「送料は別途となります」</p>
              <p className="text-gray-600 text-sm italic">Shipping costs are not included in this quotation.</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「ご不明な点がございましたらお気軽にご連絡ください」</p>
              <p className="text-gray-600 text-sm italic">Please do not hesitate to contact us if you have any questions.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            値引き・特別条件に使うフレーズ
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 space-y-3">
            <div>
              <p className="text-gray-800 text-sm font-medium">「10個以上のご注文で10%の割引を適用します」</p>
              <p className="text-gray-600 text-sm italic">A 10% discount will be applied for orders of 10 units or more.</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「初回取引のため特別価格でご提供します」</p>
              <p className="text-gray-600 text-sm italic">As this is our first transaction, we are offering a special introductory price.</p>
            </div>
          </div>

          {/* H2-4 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書のテンプレート例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            以下は、英語見積書の基本的な構成例です。実際のビジネスではレターヘッド付きの用紙やPDFテンプレートに当てはめて使用します。
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 font-mono text-sm text-gray-800 leading-relaxed">
            <p className="font-bold text-base mb-4">QUOTATION</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
              <p>Quotation No.: QT-2026-0042</p>
              <p>Date: April 2, 2026</p>
              <p>Valid Until: May 2, 2026</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold mb-1">From:</p>
                <p>XYZ Ltd.</p>
                <p>1-2-3 Shibuya, Tokyo 150-0002</p>
                <p>Japan</p>
                <p>Tel: +81-3-1234-5678</p>
                <p>Email: info@xyz.co.jp</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Bill To:</p>
                <p>ABC Corporation</p>
                <p>123 Main Street, Suite 400</p>
                <p>New York, NY 10001, USA</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-3 mb-3">
              <div className="grid grid-cols-4 gap-2 font-semibold border-b border-gray-200 pb-2 mb-2">
                <p>Description</p>
                <p className="text-right">Qty</p>
                <p className="text-right">Unit Price</p>
                <p className="text-right">Amount</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>Web Design</p>
                <p className="text-right">1</p>
                <p className="text-right">$3,000.00</p>
                <p className="text-right">$3,000.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>Logo Design</p>
                <p className="text-right">1</p>
                <p className="text-right">$500.00</p>
                <p className="text-right">$500.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>Content Writing</p>
                <p className="text-right">5</p>
                <p className="text-right">$200.00</p>
                <p className="text-right">$1,000.00</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-3 text-right space-y-1">
              <p>Subtotal: $4,500.00</p>
              <p>Tax (10%): $450.00</p>
              <p className="font-bold text-base">Total: $4,950.00</p>
            </div>
            <div className="border-t border-gray-300 pt-3 mt-3">
              <p className="font-semibold mb-1">Payment Terms:</p>
              <p>Net 30 — Payment due within 30 days of invoice.</p>
            </div>
            <div className="mt-3">
              <p className="font-semibold mb-1">Notes:</p>
              <p>This quotation is valid for 30 days.</p>
              <p>Prices are exclusive of shipping.</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            このテンプレートをベースに、取引先や業種に合わせて項目を追加・削除して使用してください。通貨は取引先の国に合わせて「USD（$）」「EUR」「GBP（£）」などを使い分けましょう。
          </p>

          {/* H2-5 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書を作成する際の注意点
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 日付の書式に注意する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語圏では、日付の書式が国によって異なります。アメリカ式は「Month Day, Year（April 2, 2026）」、イギリス式は「Day Month Year（2 April 2026）」です。取引先の国に合わせるか、誤解を防ぐために「02-Apr-2026」のように月を英字3文字で書くのが安全です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 通貨を明記する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            金額の前に通貨記号（$、£、&euro;）を付けるか、通貨コード（USD、JPY、EUR）を明記しましょう。日本円で見積もる場合は「JPY」や「&yen;」を使用します。通貨の認識違いはトラブルの原因になるため、見積書の目立つ位置に「All prices are in USD」などと記載するのがおすすめです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 数字のカンマとピリオドの使い方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語圏（アメリカ・イギリスなど）では、桁区切りにカンマ「,」、小数点にピリオド「.」を使います（例: $1,500.00）。一方、ヨーロッパの一部の国ではこれが逆になるため、取引先の慣習に合わせて表記しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 税金の取り扱いを明確にする
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            海外取引では、消費税（VAT / GST）の適用有無が国によって異なります。「Prices are exclusive of VAT」（税抜価格）や「Tax included」（税込価格）など、税金の取り扱いを明確に記載してください。日本から海外への輸出取引の場合は消費税が免税（0%）になるケースが多いため、「Tax: N/A (Export)」などと記載します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            5. 有効期限と条件を明記する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8">
            見積書の有効期限（Validity Period）は必ず記載しましょう。為替変動や原材料費の変動がある場合、有効期限を短く設定（15日〜30日）するのが一般的です。また、「This quotation is subject to change without notice after the expiry date.」（有効期限後は予告なく変更する場合があります）と但し書きを加えておくと安心です。
          </p>

          {/* 関連記事リンク */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-3">関連ガイド</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guide/how-to-write" className="text-blue-600 hover:text-blue-800 hover:underline">
                  見積書の書き方・必要項目を解説
                </Link>
              </li>
              <li>
                <Link href="/guide/valid-period" className="text-blue-600 hover:text-blue-800 hover:underline">
                  見積書の有効期限の設定方法
                </Link>
              </li>
              <li>
                <Link href="/guide/pdf" className="text-blue-600 hover:text-blue-800 hover:underline">
                  見積書をPDFで作成・出力する方法
                </Link>
              </li>
              <li>
                <Link href="/guide/freelance" className="text-blue-600 hover:text-blue-800 hover:underline">
                  フリーランス・個人事業主のための見積書ガイド
                </Link>
              </li>
            </ul>
          </div>
        </article>

        {/* CTA */}
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
