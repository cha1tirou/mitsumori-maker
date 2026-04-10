import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import AuthorProfile from "@/components/AuthorProfile";
import ToolCallout from "@/components/ToolCallout";

export const metadata: Metadata = {
  title: "見積書を英語で作成｜英語テンプレート・Quotationの書き方と例文集 | 見積書メーカー",
  description:
    "英語の見積書（Quotation）の書き方を徹底解説。英語見積書テンプレート、必要項目の英語表記一覧、コピペで使える例文・フレーズ集、業種別の英語見積書サンプル付き。",
  openGraph: {
    title: "見積書を英語で作成｜英語テンプレート・Quotationの書き方と例文集",
    description:
      "英語の見積書（Quotation）の書き方を解説。英語テンプレート、必要項目一覧、例文集付き。",
    url: "https://mitsumori-maker.com/guide/english",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%82%92%E8%8B%B1%E8%AA%9E%E3%81%A7%E4%BD%9C%E6%88%90",
        width: 1200,
        height: 630,
        alt: "見積書を英語で作成",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/english",
  },
};

export default function EnglishQuotationGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書を英語で作成｜英語テンプレート・Quotationの書き方と例文集"
        description="英語の見積書（Quotation）の書き方を徹底解説。英語テンプレート、必要項目の英語表記一覧、例文集付き。"
        slug="english"
        datePublished="2026-04-02"
        dateModified="2026-04-08"
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
            見積書を英語で作成｜英語テンプレート・Quotationの書き方と例文集
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月8日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            海外の取引先やグローバル企業とビジネスをする際、英語の見積書（Quotation）を求められることがあります。「見積書を英語でどう書けばいいかわからない」「英語の見積書テンプレートがほしい」という方に向けて、英語見積書の基本構成から、そのまま使えるテンプレート、コピペで使えるフレーズ集、作成時の注意点までを網羅的に解説します。
          </p>

          {/* H2-1 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語の見積書（Quotation）とは？日本語の見積書との違い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語の見積書は一般的に「Quotation」と呼ばれます。ほかにも「Estimate」や「Proposal」という表現がありますが、それぞれニュアンスが異なるため、使い分けを理解しておきましょう。
          </p>
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li><strong>Quotation（クォーテーション）</strong>：正式な見積書。記載された金額や条件に一定の拘束力を持つ。最も一般的な見積書の英語表現。</li>
              <li><strong>Estimate（エスティメイト）</strong>：概算見積り。最終金額が変動する可能性がある場合に使う。修理・リフォーム系で多用される。</li>
              <li><strong>Proposal（プロポーザル）</strong>：提案書に近い。見積りだけでなく提案内容や進め方、スケジュールを含む。コンサル・IT系で多い。</li>
              <li><strong>Proforma Invoice（プロフォーマインボイス）</strong>：仮請求書。国際貿易で使われ、通関手続きに必要な見積書的書類。</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            日本語の見積書との主な違い
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">日本語の見積書</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">英語の見積書</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100"><td className="px-4 py-3">押印</td><td className="px-4 py-3">社印（角印）が一般的</td><td className="px-4 py-3">不要。サインまたはレターヘッド</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">日付形式</td><td className="px-4 py-3">年/月/日（2026年4月8日）</td><td className="px-4 py-3">月/日/年（米）or 日/月/年（英）</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">敬称</td><td className="px-4 py-3">御中・様</td><td className="px-4 py-3">Attn: / Dear Mr./Ms.</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">通貨</td><td className="px-4 py-3">¥（日本円）</td><td className="px-4 py-3">取引先に合わせた通貨（USD、EUR等）</td></tr>
                <tr><td className="px-4 py-3">支払条件</td><td className="px-4 py-3">月末締め翌月末払い等</td><td className="px-4 py-3">Net 30、Due on receipt等</td></tr>
              </tbody>
            </table>
          </div>

          {/* H2-2 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書に必要な項目と英語表記一覧
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語の見積書に記載すべき項目は、基本的に日本語の見積書と共通していますが、英語特有の表記ルールがあります。以下が主要な項目と英語表記の対照表です。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">日本語</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">英語表記</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-800 border-b">記載例</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100"><td className="px-4 py-3">見積書</td><td className="px-4 py-3">Quotation / Quote</td><td className="px-4 py-3">QUOTATION</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">見積書番号</td><td className="px-4 py-3">Quotation Number / Quote No.</td><td className="px-4 py-3">QT-2026-0042</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">発行日</td><td className="px-4 py-3">Date / Issue Date</td><td className="px-4 py-3">April 8, 2026</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">有効期限</td><td className="px-4 py-3">Valid Until / Expiry Date</td><td className="px-4 py-3">May 8, 2026</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">宛先</td><td className="px-4 py-3">Bill To / Customer / Attn:</td><td className="px-4 py-3">ABC Corporation</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">発行者</td><td className="px-4 py-3">From / Supplier / Issued By</td><td className="px-4 py-3">XYZ Ltd.</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">件名</td><td className="px-4 py-3">Subject / Re:</td><td className="px-4 py-3">Website Redesign Project</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">品名・内容</td><td className="px-4 py-3">Description / Item</td><td className="px-4 py-3">Web Design Service</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">数量</td><td className="px-4 py-3">Quantity / Qty</td><td className="px-4 py-3">1</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">単位</td><td className="px-4 py-3">Unit</td><td className="px-4 py-3">set / pcs / hrs</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">単価</td><td className="px-4 py-3">Unit Price / Rate</td><td className="px-4 py-3">$3,000.00</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">小計</td><td className="px-4 py-3">Subtotal</td><td className="px-4 py-3">$4,500.00</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">消費税</td><td className="px-4 py-3">Tax / VAT / GST</td><td className="px-4 py-3">$450.00</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">値引き</td><td className="px-4 py-3">Discount</td><td className="px-4 py-3">-$200.00</td></tr>
                <tr className="border-b border-gray-100"><td className="px-4 py-3">合計金額</td><td className="px-4 py-3">Total / Grand Total</td><td className="px-4 py-3">$4,950.00</td></tr>
                <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-3">支払条件</td><td className="px-4 py-3">Payment Terms</td><td className="px-4 py-3">Net 30</td></tr>
                <tr><td className="px-4 py-3">備考</td><td className="px-4 py-3">Notes / Remarks / Terms</td><td className="px-4 py-3">-</td></tr>
              </tbody>
            </table>
          </div>

          {/* H2-3: テンプレート */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書テンプレート｜コピペで使える3パターン
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            以下に、業種別にそのまま使える英語見積書のテンプレートを用意しました。取引先や案件に合わせてカスタマイズしてください。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            テンプレート1：IT・Web制作業向け
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 font-mono text-sm text-gray-800 leading-relaxed">
            <p className="font-bold text-base mb-4">QUOTATION</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
              <p>Quotation No.: QT-2026-0058</p>
              <p>Date: April 8, 2026</p>
              <p>Valid Until: May 8, 2026</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold mb-1">From:</p>
                <p>XYZ Design Inc.</p>
                <p>1-2-3 Shibuya, Shibuya-ku</p>
                <p>Tokyo 150-0002, Japan</p>
                <p>Tel: +81-3-1234-5678</p>
                <p>Email: info@xyz-design.co.jp</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Bill To:</p>
                <p>ABC Corporation</p>
                <p>Attn: Mr. John Smith</p>
                <p>123 Main Street, Suite 400</p>
                <p>New York, NY 10001, USA</p>
              </div>
            </div>
            <p className="font-semibold mb-2">Subject: Corporate Website Redesign</p>
            <div className="border-t border-gray-300 pt-3 mb-3">
              <div className="grid grid-cols-4 gap-2 font-semibold border-b border-gray-200 pb-2 mb-2">
                <p>Description</p>
                <p className="text-right">Qty</p>
                <p className="text-right">Unit Price</p>
                <p className="text-right">Amount</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>UI/UX Design (Top + 5 pages)</p>
                <p className="text-right">1</p>
                <p className="text-right">$5,000.00</p>
                <p className="text-right">$5,000.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>Front-end Development</p>
                <p className="text-right">1</p>
                <p className="text-right">$4,000.00</p>
                <p className="text-right">$4,000.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>CMS Integration (WordPress)</p>
                <p className="text-right">1</p>
                <p className="text-right">$2,000.00</p>
                <p className="text-right">$2,000.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>QA Testing &amp; Bug Fixes</p>
                <p className="text-right">1</p>
                <p className="text-right">$1,000.00</p>
                <p className="text-right">$1,000.00</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-3 text-right space-y-1">
              <p>Subtotal: $12,000.00</p>
              <p>Tax (10%): $1,200.00</p>
              <p className="font-bold text-base">Total: $13,200.00</p>
            </div>
            <div className="border-t border-gray-300 pt-3 mt-3">
              <p className="font-semibold mb-1">Payment Terms:</p>
              <p>50% deposit upon acceptance, 50% upon delivery.</p>
            </div>
            <div className="mt-3">
              <p className="font-semibold mb-1">Notes:</p>
              <p>This quotation is valid for 30 days from the date of issue.</p>
              <p>All prices are in USD.</p>
              <p>Up to 2 rounds of design revisions are included.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            テンプレート2：製品販売・貿易向け
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 font-mono text-sm text-gray-800 leading-relaxed">
            <p className="font-bold text-base mb-4">QUOTATION</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
              <p>Quote No.: QT-2026-0112</p>
              <p>Date: 08-Apr-2026</p>
              <p>Valid Until: 08-May-2026</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold mb-1">Supplier:</p>
                <p>Sakura Trading Co., Ltd.</p>
                <p>Tokyo, Japan</p>
                <p>Email: export@sakura-trading.co.jp</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Customer:</p>
                <p>Global Imports Pty Ltd</p>
                <p>Sydney, Australia</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-3 mb-3">
              <div className="grid grid-cols-5 gap-2 font-semibold border-b border-gray-200 pb-2 mb-2 text-xs">
                <p>Item</p>
                <p className="text-right">Qty</p>
                <p className="text-right">Unit</p>
                <p className="text-right">Unit Price</p>
                <p className="text-right">Amount</p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-1 text-xs">
                <p>Ceramic Bowl (Model A)</p>
                <p className="text-right">200</p>
                <p className="text-right">pcs</p>
                <p className="text-right">$8.50</p>
                <p className="text-right">$1,700.00</p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-1 text-xs">
                <p>Ceramic Plate (Model B)</p>
                <p className="text-right">300</p>
                <p className="text-right">pcs</p>
                <p className="text-right">$12.00</p>
                <p className="text-right">$3,600.00</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-3 text-right space-y-1">
              <p>Subtotal: $5,300.00</p>
              <p>Shipping (FOB Tokyo): $350.00</p>
              <p>Tax: N/A (Export)</p>
              <p className="font-bold text-base">Total: $5,650.00</p>
            </div>
            <div className="border-t border-gray-300 pt-3 mt-3">
              <p className="font-semibold mb-1">Terms:</p>
              <p>FOB Tokyo / Payment: T/T in advance</p>
              <p>Lead time: 3-4 weeks after order confirmation</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            テンプレート3：コンサルティング・サービス業向け
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 font-mono text-sm text-gray-800 leading-relaxed">
            <p className="font-bold text-base mb-4">QUOTATION</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
              <p>Ref: QT-CON-2026-003</p>
              <p>Date: April 8, 2026</p>
              <p>Valid for: 14 days</p>
              <p></p>
            </div>
            <div className="border-t border-gray-300 pt-3 mb-3">
              <div className="grid grid-cols-4 gap-2 font-semibold border-b border-gray-200 pb-2 mb-2">
                <p>Service</p>
                <p className="text-right">Hours</p>
                <p className="text-right">Rate/hr</p>
                <p className="text-right">Amount</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>Market Research &amp; Analysis</p>
                <p className="text-right">20</p>
                <p className="text-right">$150.00</p>
                <p className="text-right">$3,000.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>Strategy Workshop (2 days)</p>
                <p className="text-right">16</p>
                <p className="text-right">$200.00</p>
                <p className="text-right">$3,200.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-1">
                <p>Final Report &amp; Presentation</p>
                <p className="text-right">10</p>
                <p className="text-right">$150.00</p>
                <p className="text-right">$1,500.00</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-3 text-right space-y-1">
              <p>Subtotal: $7,700.00</p>
              <p>Tax (10%): $770.00</p>
              <p className="font-bold text-base">Total: $8,470.00</p>
            </div>
            <div className="border-t border-gray-300 pt-3 mt-3">
              <p className="font-semibold mb-1">Payment Terms:</p>
              <p>Net 30 — Payment due within 30 days of invoice.</p>
              <p>Travel expenses, if any, will be billed separately.</p>
            </div>
          </div>

          {/* H2-4: フレーズ集 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書でよく使う表現・フレーズ集
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語の見積書やカバーレター（送付メール）で頻繁に使われるフレーズをまとめました。そのままコピーして使えます。
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
              <p className="text-gray-800 text-sm font-medium">「以下の通りお見積りいたします」</p>
              <p className="text-gray-600 text-sm italic">We would like to quote as follows:</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「本見積りの有効期限は30日間です」</p>
              <p className="text-gray-600 text-sm italic">This quotation is valid for 30 days from the date of issue.</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「ご検討のほどよろしくお願いいたします」</p>
              <p className="text-gray-600 text-sm italic">We look forward to your favorable consideration.</p>
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
              <p className="text-gray-800 text-sm font-medium">「受領後即日支払い」</p>
              <p className="text-gray-600 text-sm italic">Payment is due upon receipt. (Due on receipt)</p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">「着手時50%、納品時50%」</p>
              <p className="text-gray-600 text-sm italic">50% deposit upon acceptance, 50% balance upon delivery.</p>
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
              <p className="text-gray-800 text-sm font-medium">「全ての価格は米ドル建てです」</p>
              <p className="text-gray-600 text-sm italic">All prices are quoted in US Dollars (USD).</p>
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
            <div>
              <p className="text-gray-800 text-sm font-medium">「年間契約の場合、15%の割引を適用可能です」</p>
              <p className="text-gray-600 text-sm italic">A 15% discount is available for annual contracts.</p>
            </div>
          </div>

          {/* H2-5: 送付メールテンプレート */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書の送付メールテンプレート
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語の見積書をメールで送付する際のテンプレートです。件名と本文の例をそのまま使えます。
          </p>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 font-mono text-sm text-gray-800 leading-relaxed">
            <p className="font-semibold mb-2">Subject: Quotation for Website Redesign Project - QT-2026-0058</p>
            <p className="mt-3">Dear Mr. Smith,</p>
            <p className="mt-2">Thank you for your inquiry regarding the website redesign project. Please find attached our quotation (QT-2026-0058) for your review.</p>
            <p className="mt-2">The quotation includes a detailed breakdown of all services and associated costs. Please note that this quotation is valid for 30 days from the date of issue.</p>
            <p className="mt-2">Should you have any questions or require any modifications, please do not hesitate to contact us. We look forward to the opportunity to work with you.</p>
            <p className="mt-3">Best regards,</p>
            <p>Taro Yamada</p>
            <p>XYZ Design Inc.</p>
            <p>Email: taro@xyz-design.co.jp</p>
            <p>Tel: +81-3-1234-5678</p>
          </div>

          {/* H2-6: 注意点 */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            英語見積書を作成する際の注意点
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 日付の書式に注意する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語圏では、日付の書式が国によって異なります。誤解を防ぐために「08-Apr-2026」のように月を英字3文字で書くのが最も安全です。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <ul className="text-gray-700 text-sm space-y-1">
              <li><strong>アメリカ式</strong>：April 8, 2026（MM/DD/YYYY）</li>
              <li><strong>イギリス式</strong>：8 April 2026（DD/MM/YYYY）</li>
              <li><strong>国際標準（推奨）</strong>：08-Apr-2026 または 2026-04-08</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 通貨を明確に記載する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            金額の前に通貨記号を付けるか、通貨コード（USD、JPY、EUR）を明記しましょう。見積書の目立つ位置に「All prices are in USD」などと記載するのがおすすめです。日本円で見積もる場合は「JPY」または「¥」を使用します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 数字のカンマとピリオドの使い方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            英語圏（アメリカ・イギリスなど）では、桁区切りにカンマ「,」、小数点にピリオド「.」を使います（例: $1,500.00）。ヨーロッパの一部の国ではこれが逆になるため、取引先の慣習に合わせて表記しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 税金（VAT/GST）の取り扱いを明確にする
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            海外取引では、消費税（VAT / GST）の適用有無が国によって異なります。以下のような表記で税金の取り扱いを明確にしてください。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <ul className="text-gray-700 text-sm space-y-1">
              <li><strong>税抜価格の場合</strong>：Prices are exclusive of VAT.</li>
              <li><strong>税込価格の場合</strong>：Prices include 10% consumption tax.</li>
              <li><strong>輸出免税の場合</strong>：Tax: N/A (Export transaction)</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            5. 有効期限と条件変更を明記する
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8">
            見積書の有効期限（Validity Period）は必ず記載しましょう。為替変動や原材料費の変動がある場合は15日~30日が一般的です。「This quotation is subject to change without notice after the expiry date.」（有効期限後は予告なく変更する場合があります）と但し書きを加えておくと安心です。
          </p>

          {/* H2-7: FAQ */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            よくある質問（FAQ）
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 見積書は英語で何と言いますか？</p>
              <p className="text-gray-700 text-sm">
                A. 最も一般的な表現は「Quotation」です。略して「Quote」とも言います。概算見積りの場合は「Estimate」、提案を含む場合は「Proposal」を使い分けます。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. QuotationとEstimateの違いは？</p>
              <p className="text-gray-700 text-sm">
                A. Quotationは正式な見積書で、記載金額に拘束力があります。Estimateは概算見積りで、最終金額が変動する可能性があるニュアンスを含みます。正式な取引にはQuotationを使うのが一般的です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 英語の見積書に印鑑は必要ですか？</p>
              <p className="text-gray-700 text-sm">
                A. いいえ、英語の見積書に印鑑（社印）は不要です。代わりに、会社のレターヘッド（ロゴ入り用紙）を使用するか、担当者のサインを入れるのが一般的です。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 日本から海外へ見積もる場合、消費税はどうなりますか？</p>
              <p className="text-gray-700 text-sm">
                A. 日本からの輸出取引の場合、消費税は免税（0%）となるケースが多いです。見積書には「Tax: N/A (Export)」と記載するか、税額を0と表示します。サービスの輸出についても同様に免税となる場合がありますが、取引形態により異なるため税理士に確認することをおすすめします。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-800 mb-2">Q. 「Net 30」とはどういう意味ですか？</p>
              <p className="text-gray-700 text-sm">
                A. 「Net 30」は、請求書発行日から30日以内に支払うという支払条件です。同様に「Net 15」は15日以内、「Net 60」は60日以内を意味します。「Due on receipt」は受領後即日支払いです。
              </p>
            </div>
          </div>

          <ToolCallout steps={[
            "見積書メーカーを開き、各項目を英語で入力（フリーテキスト対応）",
            "品目：英語の商品名やサービス名をそのまま入力可能",
            "宛先・差出人も英語表記で入力OK",
            "備考欄にPayment Terms・Validityなどを英語で記入",
            "PDFダウンロードしてメール添付で送付"
          ]} />

          {/* 関連記事リンク */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-3">関連ガイド</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guide/how-to-write" className="text-blue-600 hover:text-blue-800 hover:underline">
                  見積書の書き方・必要項目をわかりやすく解説
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
                <Link href="/guide/email" className="text-blue-600 hover:text-blue-800 hover:underline">
                  見積書のメール送付マナー・例文テンプレート
                </Link>
              </li>
              <li>
                <Link href="/guide/freelance" className="text-blue-600 hover:text-blue-800 hover:underline">
                  フリーランス・個人事業主のための見積書ガイド
                </Link>
              </li>
              <li>
                <Link href="/guide/consumption-tax" className="text-blue-600 hover:text-blue-800 hover:underline">
                  見積書の消費税の書き方・インボイス対応ガイド
                </Link>
              </li>
            </ul>
          </div>
        </article>

        <AuthorProfile />

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
