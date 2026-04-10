import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "見積書の断り方・お断りメールの例文テンプレート | 見積書メーカー",
  description:
    "見積書を断る際のマナーとお断りメールの例文を紹介。金額が合わない場合・他社に決めた場合など、状況別の文例と注意点を解説します。",
  openGraph: {
    title: "見積書の断り方・お断りメールの例文テンプレート",
    description: "見積書を断る際のマナーとお断りメールの例文を状況別に紹介。",
    url: "https://mitsumori-maker.com/guide/rejection",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [{
      url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%96%AD%E3%82%8A%E6%96%B9%E3%83%BB%E3%81%8A%E6%96%AD%E3%82%8A%E3%83%A1%E3%83%BC%E3%83%AB%E4%BE%8B%E6%96%87",
      width: 1200, height: 630, alt: "見積書の断り方・お断りメール例文",
    }],
  },
  alternates: { canonical: "https://mitsumori-maker.com/guide/rejection" },
};

export default function GuideRejectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の断り方・お断りメールの例文テンプレート"
        description="見積書を断る際のマナーとお断りメールの例文を紹介。"
        slug="rejection"
        datePublished="2026-04-02"
        dateModified="2026-04-02"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">見積書メーカー</Link>
            <span className="mx-1">/</span>
            <span>ガイド</span>
            <span className="mx-1">/</span>
            <span className="text-gray-700">見積書の断り方</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">&larr; 見積書メーカーに戻る</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">見積書の断り方・お断りメールの例文テンプレート</h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月2日</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">見積書を断る際の基本マナー</h2>
          <p className="text-gray-700 leading-relaxed mb-4">見積書を受け取ったものの、金額や条件が合わずお断りしなければならないケースは少なくありません。断り方を間違えると、相手に失礼な印象を与えたり、今後の取引関係に悪影響を及ぼすことがあります。</p>
          <p className="text-gray-700 leading-relaxed mb-4">お断りの際は以下のポイントを意識しましょう。</p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li><strong>できるだけ早く連絡する</strong>：検討に時間がかかっても、結論が出たらすぐに伝えましょう。放置は最も失礼です</li>
            <li><strong>感謝の気持ちを伝える</strong>：見積書を作成してくれたことへのお礼を必ず述べます</li>
            <li><strong>理由を簡潔に述べる</strong>：詳細な理由は不要ですが、「予算の都合」「他社に決定」など一言添えると誠実です</li>
            <li><strong>今後の可能性を残す</strong>：「また機会がありましたら」と添えることで、将来の取引の余地を残せます</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">お断りメールの例文</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">金額が合わない場合</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
{`件名：お見積りの件について（お礼とご連絡）

株式会社〇〇
□□様

お世話になっております。
株式会社△△の□□でございます。

先日はお見積書をお送りいただき、
誠にありがとうございました。

社内にて慎重に検討いたしましたが、
今回は予算の都合により、
お見受けを見送らせていただくことになりました。

せっかくお時間を割いてご対応いただいたにもかかわらず、
大変申し訳ございません。

また別の案件でご相談させていただくこともあるかと
存じますので、その際はどうぞよろしくお願いいたします。`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">他社に決めた場合</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
{`件名：お見積りの件（ご報告）

株式会社〇〇
□□様

いつもお世話になっております。
株式会社△△の□□です。

先日ご提出いただいたお見積りにつきまして、
社内で検討を重ねた結果、今回は他社にお願いする
運びとなりました。

ご提案内容は大変魅力的でしたが、
総合的な判断により今回は見送りとなりました。

丁寧にご対応いただきましたことに感謝申し上げます。
また機会がございましたら、ぜひご相談させてください。`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">時期が合わない場合</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
{`件名：お見積りの件について

株式会社〇〇
□□様

お世話になっております。
株式会社△△の□□です。

お見積書をご送付いただき、ありがとうございました。

検討の結果、今回はスケジュールの都合により
見送らせていただくこととなりました。

時期を改めて再度ご相談させていただく可能性がございますので、
その際はどうぞよろしくお願いいたします。`}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">断る際にやってはいけないNG行動</h2>
          <div className="space-y-3 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">返事をしない・放置する</p>
              <p className="text-gray-600 text-sm">最も避けるべき行動です。相手はいつまでも結果を待ち続けることになり、信頼関係が損なわれます。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">他社の見積金額を伝える</p>
              <p className="text-gray-600 text-sm">「A社の方が安かった」と具体的な金額を伝えるのはマナー違反です。値下げを強要しているように受け取られます。</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">曖昧な表現で引き延ばす</p>
              <p className="text-gray-600 text-sm">「検討中です」と言い続けるのは相手の時間を奪います。断ることが決まったら速やかに伝えましょう。</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">今後の関係を維持するための伝え方</h2>
          <p className="text-gray-700 leading-relaxed mb-4">ビジネスでは、今回は断っても将来的に取引する可能性があります。断り方ひとつで、その後の関係性が大きく変わります。</p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>具体的なフィードバックを添える</strong>：「ご提案の〇〇は非常に参考になりました」と具体的に触れると、相手の努力を認めていることが伝わります</li>
            <li><strong>次回の可能性に言及する</strong>：「次回の〇〇の際はぜひご相談させてください」と具体的な場面を示すと、社交辞令ではない印象を与えます</li>
            <li><strong>電話でフォローする</strong>：重要な取引先の場合、メールだけでなく電話で一言お礼を伝えると、より丁寧な印象になります</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">関連ガイド</h2>
          <ul className="space-y-2 mb-4">
            <li><Link href="/guide/email" className="text-blue-600 hover:underline text-sm">見積書のメール送付マナー・例文テンプレート</Link></li>
            <li><Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">見積書の書き方・必要項目を解説</Link></li>
            <li><Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">見積書の有効期限の設定方法</Link></li>
          </ul>
        </article>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">登録不要・完全無料・PDF出力対応</p>
          <Link href="/" className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">見積書メーカーを使う &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
