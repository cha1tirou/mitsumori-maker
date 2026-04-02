import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "見積書の宛名の書き方・「御中」「様」の使い分け | 見積書メーカー",
  description:
    "見積書の宛名の正しい書き方を解説。「御中」「様」「殿」の使い分け、部署名・担当者名が分からない場合の対処法、宛名ミスの修正方法をまとめました。",
  openGraph: {
    title: "見積書の宛名の書き方・「御中」「様」の使い分け",
    description: "見積書の宛名の正しい書き方を解説。敬称の使い分けを紹介。",
    url: "https://mitsumori-maker.com/guide/addressing",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [{
      url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E5%AE%9B%E5%90%8D%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
      width: 1200, height: 630, alt: "見積書の宛名の書き方",
    }],
  },
  alternates: { canonical: "https://mitsumori-maker.com/guide/addressing" },
};

export default function GuideAddressingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd title="見積書の宛名の書き方・「御中」「様」の使い分け" description="見積書の宛名の正しい書き方と敬称の使い分けを解説。" slug="addressing" datePublished="2026-04-02" dateModified="2026-04-02" />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">見積書メーカー</Link><span className="mx-1">/</span><span>ガイド</span><span className="mx-1">/</span><span className="text-gray-700">宛名の書き方</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">&larr; 見積書メーカーに戻る</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">見積書の宛名の書き方・「御中」「様」の使い分け</h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月2日</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">見積書の宛名の基本ルール</h2>
          <p className="text-gray-700 leading-relaxed mb-4">見積書の宛名は、取引先に対する敬意を示す重要な部分です。書き方を間違えると、ビジネスマナーを知らないと思われてしまいます。</p>
          <p className="text-gray-700 leading-relaxed mb-4">基本的な書き方のパターンは以下の通りです。</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">宛先</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">書き方</th>
                  <th className="text-left px-4 py-2 font-semibold text-gray-800">例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-2 text-gray-700">会社宛</td><td className="px-4 py-2 text-gray-700">会社名 + 御中</td><td className="px-4 py-2 text-gray-700">株式会社〇〇 御中</td></tr>
                <tr><td className="px-4 py-2 text-gray-700">部署宛</td><td className="px-4 py-2 text-gray-700">会社名 + 部署名 + 御中</td><td className="px-4 py-2 text-gray-700">株式会社〇〇 総務部 御中</td></tr>
                <tr><td className="px-4 py-2 text-gray-700">個人宛</td><td className="px-4 py-2 text-gray-700">会社名 + 部署名 + 氏名 + 様</td><td className="px-4 py-2 text-gray-700">株式会社〇〇 総務部 山田太郎 様</td></tr>
                <tr><td className="px-4 py-2 text-gray-700">個人事業主宛</td><td className="px-4 py-2 text-gray-700">屋号 + 氏名 + 様</td><td className="px-4 py-2 text-gray-700">〇〇デザイン事務所 山田太郎 様</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">「御中」「様」「殿」の使い分け</h2>
          <div className="space-y-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">御中（おんちゅう）</p>
              <p className="text-gray-600 text-sm">会社名や部署名など、<strong>組織に対して</strong>使う敬称です。特定の個人を指定しない場合に使います。</p>
              <p className="text-gray-500 text-xs mt-1">例：株式会社〇〇 御中 / 〇〇株式会社 営業部 御中</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">様（さま）</p>
              <p className="text-gray-600 text-sm"><strong>個人に対して</strong>使う敬称です。担当者名が分かっている場合はこちらを使います。最も丁寧で汎用的な敬称です。</p>
              <p className="text-gray-500 text-xs mt-1">例：山田太郎 様 / ご担当者 様</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">殿（どの）</p>
              <p className="text-gray-600 text-sm">目上から目下に対して使う敬称とされており、<strong>ビジネスの見積書では使わないのが無難</strong>です。社内文書では使われることもあります。</p>
              <p className="text-gray-500 text-xs mt-1">見積書では「様」を使いましょう</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>最も重要なルール：「御中」と「様」は併用しない。</strong>「株式会社〇〇 御中 山田太郎 様」は間違いです。個人名を書く場合は「様」だけを使い、「御中」は省きます。</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">部署名・担当者名がわからない場合の対処法</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>会社名だけ分かる場合</strong>：「株式会社〇〇 御中」で問題ありません</li>
            <li><strong>部署は分かるが担当者名が不明</strong>：「株式会社〇〇 営業部 ご担当者 様」とします</li>
            <li><strong>担当者の漢字が不確か</strong>：事前にメールの署名や名刺で確認しましょう。間違った漢字は非常に失礼です</li>
            <li><strong>個人か法人か不明</strong>：相手が個人事業主かどうか分からない場合は、「〇〇 様」が最も無難です</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">宛名を間違えた場合の修正方法</h2>
          <p className="text-gray-700 leading-relaxed mb-4">見積書の宛名を間違えた場合は、修正テープや二重線での訂正は避け、<strong>正しい内容で新しい見積書を作成し直す</strong>のが原則です。</p>
          <p className="text-gray-700 leading-relaxed mb-4">見積書は正式なビジネス文書であり、修正の跡がある書類は信頼性が低下します。オンラインツールを使えば、入力内容を修正して再度PDFを出力するだけなので、手間なく正しい見積書を再作成できます。</p>
          <p className="text-gray-700 leading-relaxed mb-4">既に送付済みの見積書に誤りが見つかった場合は、お詫びのメールとともに正しい見積書を再送しましょう。</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">関連ガイド</h2>
          <ul className="space-y-2 mb-4">
            <li><Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">見積書の書き方・必要項目を解説</Link></li>
            <li><Link href="/guide/email" className="text-blue-600 hover:underline text-sm">見積書のメール送付マナー・例文</Link></li>
            <li><Link href="/guide/reissue" className="text-blue-600 hover:underline text-sm">見積書の再発行の方法・対応マニュアル</Link></li>
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
