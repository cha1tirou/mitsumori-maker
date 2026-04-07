import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";
import ArticleDisclosure from "@/components/ArticleDisclosure";

export const metadata: Metadata = {
  title: "美容院・エステ・ネイルサロンの見積書の書き方ガイド | 見積書メーカー",
  description:
    "美容院・エステ・ネイルサロン向けに見積書の書き方を解説。施術メニューの明細化、カウンセリング料・材料費の記載方法、キャンセルポリシーの書き方まで実践的にまとめました。",
  openGraph: {
    title: "美容院・エステ・ネイルサロンの見積書の書き方ガイド | 見積書メーカー",
    description:
      "美容院・エステ・ネイルサロン向けに見積書の書き方を解説。施術メニューの明細化やキャンセルポリシーの書き方まで。",
    url: "https://mitsumori-maker.com/guide/beauty",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E7%BE%8E%E5%AE%B9%E9%99%A2%E3%83%BB%E3%82%A8%E3%82%B9%E3%83%86%E3%83%BB%E3%83%8D%E3%82%A4%E3%83%AB%E3%82%B5%E3%83%AD%E3%83%B3%E3%81%AE%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%82%AC%E3%82%A4%E3%83%89",
        width: 1200,
        height: 630,
        alt: "美容院・エステ・ネイルサロンの見積書ガイド",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/beauty",
  },
};

export default function BeautyGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="美容院・エステ・ネイルサロンの見積書の書き方ガイド"
        description="美容院・エステ・ネイルサロン向けに見積書の書き方を解説。施術メニューの明細化やキャンセルポリシーの書き方まで。"
        slug="beauty"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">美容・サロンの見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            美容院・エステ・ネイルサロンの見積書の書き方ガイド
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月7日</p>
          <ArticleDisclosure />

          <p className="text-gray-700 leading-relaxed mb-8">
            美容院・エステサロン・ネイルサロンなどの美容業では、ブライダルパッケージや出張施術、法人向けの定期契約など、複数のメニューをまとめた見積書が必要になる場面があります。この記事では、美容・サロン業特有の見積書の書き方ポイントを実践的に解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            美容・サロン業で見積書が必要になる場面
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            個人のお客様を対象とした単発施術では見積書は必要ありませんが、以下のようなケースでは事前の見積書提出が重要です。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>ブライダルヘアメイク・ネイル</strong>：挙式当日のヘアセット、メイク、ネイルアートなど複数サービスをパッケージで提供する場合。当日の追加施術や出張費も含めて明細化することで、料金トラブルを防ぎます。
            </li>
            <li>
              <strong>出張サービス・ロケ撮影対応</strong>：ホテルやスタジオへの出張施術では、交通費・駐車場代・早朝割増料金などが加わります。これらを見積書に明記しておくことが大切です。
            </li>
            <li>
              <strong>法人・イベント向けの一括施術</strong>：企業の撮影会や式典、ブライダルフェア向けに複数名を施術する場合。人数×単価で計算するため、見積書で全体金額を事前確認します。
            </li>
            <li>
              <strong>月額定期コース・まとめ払い</strong>：エステの月額コースや回数券を法人契約する場合は、契約書と合わせて見積書を発行するのが一般的です。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            美容・サロン業の見積書に記載すべき項目
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            基本的な見積書の項目に加え、美容・サロン業ならではの記載事項があります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            基本項目（全業種共通）
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>タイトル（「御見積書」）</li>
            <li>見積書番号・発行日・有効期限</li>
            <li>宛先（お客様名または企業名）</li>
            <li>サロン名・住所・電話番号・担当者名</li>
            <li>明細（施術内容・数量・単価・金額）</li>
            <li>小計・消費税・合計</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            美容・サロン業で追加すべき項目
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>施術所要時間の目安</strong>：ブライダル対応など時間が重要な場面では、各施術の所要時間を明細に含めると親切です。
            </li>
            <li>
              <strong>使用材料・商材の費用</strong>：特殊なカラー剤、まつ毛エクステのグルー、ネイルのジェル材料など、施術に使う材料費が別途かかる場合は明記します。
            </li>
            <li>
              <strong>出張費・交通費</strong>：出張サービスの場合、交通費の実費や出張料金を別行で記載します。「交通費：実費」と明記するか、概算金額を記載するかを決めておきましょう。
            </li>
            <li>
              <strong>キャンセルポリシー</strong>：備考欄に「〇日前からのキャンセルは〇%のキャンセル料が発生します」と記載しておくと、後のトラブルを防げます。
            </li>
            <li>
              <strong>カウンセリング料・デザイン料</strong>：ネイルアートの事前デザイン確認やブライダルのリハーサルカウンセリングがある場合は、別途費用として明示します。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            美容・サロン業の見積書の記載例
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            以下は、ブライダルヘアメイクの見積書例です。
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm text-gray-700 leading-relaxed mb-6 font-mono whitespace-pre-line">
{`御見積書

見積番号: BEA-2026-008
見積日:   2026年4月7日
有効期限: 2026年5月7日

【宛先】
山田 花子 様

【件名】
挙式当日 ブライダルヘアメイク一式

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No  施術内容                    数量  単価        金額
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1   ブライダルヘアセット           1   ¥40,000   ¥40,000
2   ブライダルメイク               1   ¥30,000   ¥30,000
3   お色直しヘアチェンジ           1   ¥15,000   ¥15,000
4   リハーサルカウンセリング        1   ¥10,000   ¥10,000
5   出張費（式場往復）             1   ¥ 5,000   ¥ 5,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                           小計  ¥100,000
                     消費税(10%)   ¥10,000
                     合計(税込)  ¥110,000

【備考】
・挙式日7日前以降のキャンセルは50%のキャンセル料が発生します
・当日の早朝（6時以前）スタートの場合は早朝料金¥5,000が別途加算されます
・リハーサルは式の2〜4週間前を推奨しています`}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            消費税と軽減税率の扱い
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            美容サービスは原則として消費税10%が適用されます。ただし、施術と合わせて化粧品や美容商品を販売する場合、販売形態によって税率が異なることはありません（美容商品の小売販売も10%）。一方、飲食物を提供するカフェ併設型のサロンでは、飲食部分のみ軽減税率8%の対象となる可能性があるため注意が必要です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            インボイス制度への対応として、適格請求書発行事業者として登録している場合は、見積書にも登録番号（T+13桁）を記載することを推奨します。法人や事業者向けの施術では、インボイス対応の有無を確認されることが増えています。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            フリーランス美容師・業務委託の場合
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            サロンに所属せず、フリーランスとして活動する美容師やネイリスト、エステティシャンの場合、見積書はより重要な書類となります。特に以下の点に注意しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>屋号または氏名の明記</strong>：「フリーランスヘアメイクアーティスト 〇〇」のように、個人事業主として活動していることがわかるよう記載します。
            </li>
            <li>
              <strong>源泉徴収の確認</strong>：芸能人・モデルのヘアメイクなど、特定の業種向けの報酬は源泉徴収の対象となる場合があります。クライアントが法人の場合は事前に確認しましょう。
            </li>
            <li>
              <strong>修正・変更対応のルールを明記</strong>：ブライダルのデザイン変更や追加施術の費用を備考欄に記載しておくと、当日のトラブルを防げます。
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            美容・サロン業の見積書は、施術内容を明細化することで料金トラブルを防ぎ、お客様との信頼関係を築く大切なツールです。特にブライダルや出張サービスでは、キャンセルポリシーや交通費の扱いを事前に明文化することが重要です。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>施術内容を「一式」でまとめず、品目ごとに記載する</li>
            <li>出張費・材料費・早朝料金は別行で明示する</li>
            <li>キャンセルポリシーを備考欄に必ず記載する</li>
            <li>インボイス登録番号がある場合は記載する</li>
          </ul>
        </article>

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            確定申告・帳簿管理を会計ソフトで効率化
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            フリーランスの美容師・ネイリスト・エステティシャンは、確定申告も自分で行う必要があります。会計ソフトを使えば、見積書・請求書の発行から売上管理、経費入力、確定申告書類の作成まで一元管理できます。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>やよいの青色申告オンライン</strong>は初年度無料で使えるプランがあり、簿記の知識がなくても確定申告書類を作成できます。インボイス制度にも対応済みです。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4B1ATI+1JDCT6+35XE+5YJRM"
              rel="nofollow"
              target="_blank"
              className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
            >
              やよいの青色申告オンラインを見る →
            </a>
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
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/freelance" className="text-blue-600 hover:underline text-sm">
                フリーランス・個人事業主のための見積書ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/consumption-tax" className="text-blue-600 hover:underline text-sm">
                見積書の消費税の書き方・インボイス対応ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">
                見積書の有効期限の設定方法と適切な期間の決め方
              </Link>
            </li>
            <li>
              <Link href="/guide/remarks" className="text-blue-600 hover:underline text-sm">
                見積書の備考欄の書き方・記載例まとめ
              </Link>
            </li>
          </ul>
        </div>

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
