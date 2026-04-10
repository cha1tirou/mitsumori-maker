import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "見積書の再発行の方法・依頼メール例文付き【そのまま使える】 | 見積書メーカー",
  description:
    "見積書の再発行が必要になったら？再発行の手順・書き方ルール・依頼メールの例文をそのまま使える形で紹介。有効期限切れの対応方法や再発行を防ぐ管理のコツも解説。",
  openGraph: {
    title: "見積書の再発行の方法・依頼メール例文付き | 見積書メーカー",
    description: "見積書の再発行の手順・依頼メール例文をそのまま使える形で紹介。",
    url: "https://mitsumori-maker.com/guide/reissue",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [{
      url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E5%86%8D%E7%99%BA%E8%A1%8C%E3%81%AE%E6%96%B9%E6%B3%95",
      width: 1200, height: 630, alt: "見積書の再発行の方法",
    }],
  },
  alternates: { canonical: "https://mitsumori-maker.com/guide/reissue" },
};

export default function GuideReissuePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd title="見積書の再発行の方法・対応マニュアル" description="見積書の再発行が必要になるケースと対応方法を解説。" slug="reissue" datePublished="2026-04-02" dateModified="2026-04-02" />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">見積書メーカー</Link><span className="mx-1">/</span><span>ガイド</span><span className="mx-1">/</span><span className="text-gray-700">再発行</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">&larr; 見積書メーカーに戻る</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">見積書の再発行の方法・対応マニュアル</h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月2日</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">見積書の再発行が必要になるケース</h2>
          <p className="text-gray-700 leading-relaxed mb-4">ビジネスの現場では、以下のような理由で見積書の再発行を求められることがあります。</p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li><strong>記載内容に誤りがあった</strong>：金額・品目・宛名などのミスが発覚した場合</li>
            <li><strong>条件が変更になった</strong>：仕様変更や追加要望により、金額や項目が変わった場合</li>
            <li><strong>有効期限が切れた</strong>：検討に時間がかかり、期限切れとなった場合</li>
            <li><strong>取引先が紛失した</strong>：先方が見積書を紛失し、再送を依頼された場合</li>
            <li><strong>税率変更</strong>：消費税率が変更になった場合</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">再発行時の書き方・記載ルール</h2>
          <p className="text-gray-700 leading-relaxed mb-4">再発行する際は、以下のルールを守りましょう。</p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>見積番号を新しくする</strong>：元の見積書と区別するため、新しい番号を振ります。例：元が「Q-2026-001」なら「Q-2026-001-R1」（R1 = 再発行1回目）</li>
            <li><strong>発行日を更新する</strong>：再発行日を記載します。元の日付のままにしないでください</li>
            <li><strong>有効期限を設定し直す</strong>：再発行日から起算して新しい有効期限を設定します</li>
            <li><strong>「再発行」と明記する</strong>：タイトルを「見積書（再発行）」とするか、備考欄に「本見積書は〇年〇月〇日付見積書（No.Q-2026-001）の再発行です」と記載します</li>
            <li><strong>元の見積書は無効にする</strong>：二重に有効な見積書が存在しないよう、元の見積書が無効であることを先方に伝えます</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">再発行依頼メールの例文</h2>
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">自社が再発行する場合（送付メール）</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
{`件名：【再発行】お見積書の件（株式会社△△）

株式会社〇〇
□□様

お世話になっております。
株式会社△△の□□です。

先日お送りした見積書（No.Q-2026-001）について、
内容を更新のうえ再発行いたしましたので
添付にてお送りいたします。

なお、先日の見積書は無効となりますので、
お手元の書類は破棄いただけますと幸いです。

ご不明な点がございましたらお気軽にお問い合わせください。`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">取引先に再発行を依頼する場合</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
{`件名：お見積書の再発行のお願い

株式会社〇〇
□□様

いつもお世話になっております。
株式会社△△の□□です。

先日いただいたお見積書（No.Q-2026-045）につきまして、
社内の承認手続きに時間を要し、
有効期限が過ぎてしまいました。

大変恐縮ですが、同条件にて
お見積書を再発行いただけないでしょうか。

お忙しいところ恐れ入りますが、
ご対応いただけますと幸いです。`}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">再発行を防ぐための管理のコツ</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li><strong>見積番号を体系的に管理する</strong>：連番や日付ベースの採番ルールを決めておくと、検索・追跡が容易になります</li>
            <li><strong>PDFで保管する</strong>：Excelファイルは誤って上書きされるリスクがあります。確定した見積書はPDFで保存しましょう</li>
            <li><strong>送付前にダブルチェックする</strong>：金額・宛名・有効期限を送信前に必ず確認します。特に宛名の間違いは致命的です</li>
            <li><strong>有効期限を適切に設定する</strong>：短すぎると再発行が頻発し、長すぎるとリスクが増えます。業種に合った期間を設定しましょう</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">関連ガイド</h2>
          <ul className="space-y-2 mb-4">
            <li><Link href="/guide/numbering" className="text-blue-600 hover:underline text-sm">見積書番号のつけ方・採番ルール</Link></li>
            <li><Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">見積書の有効期限の設定方法</Link></li>
            <li><Link href="/guide/email" className="text-blue-600 hover:underline text-sm">見積書のメール送付マナー・例文</Link></li>
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
