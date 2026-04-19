import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "見積書の修正・訂正・再提出の方法と書き直しルール | 見積書メーカー",
  description:
    "見積書の修正・訂正方法を解説。金額変更・品名変更・日付変更の書き方、再提出時のメール例文、修正版と旧版の管理方法まで網羅。",
  openGraph: {
    title: "見積書の修正・訂正・再提出の方法と書き直しルール | 見積書メーカー",
    description:
      "見積書の修正・訂正方法を解説。金額変更・品名変更・日付変更の書き方、再提出時のメール例文、修正版と旧版の管理方法まで網羅。",
    url: "https://mitsumori-maker.com/guide/revision",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E4%BF%AE%E6%AD%A3%E3%83%BB%E8%A8%82%E6%AD%A3%E3%83%BB%E5%86%8D%E6%8F%90%E5%87%BA%E3%81%AE%E6%96%B9%E6%B3%95",
        width: 1200,
        height: 630,
        alt: "見積書の修正・訂正・再提出の方法",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/revision",
  },
};

export default function GuideRevisionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書の修正・訂正・再提出の方法と書き直しルール"
        description="見積書の修正・訂正方法を解説。金額変更・品名変更・日付変更の書き方、再提出時のメール例文、修正版と旧版の管理方法まで網羅。"
        slug="revision"
        datePublished="2026-04-19"
        dateModified="2026-04-19"
        faqs={[
          {
            question: "見積書を修正した場合、旧版はどう処理すればよいですか？",
            answer:
              "紙の見積書の場合、受け取った旧版を相手先に「無効」と朱書きして返却してもらうか、シュレッダー処理を依頼するのが望ましい対応です。電子メールで送付した場合は、修正版を送付する際に「前回送付の見積書（〇月〇日付）は無効となります」と本文に明記しましょう。自社側でも旧版ファイルは「rev0_旧版」のように名称変更してアーカイブし、誤って使用しないよう管理します。",
          },
          {
            question: "金額を修正した見積書は「訂正印」が必要ですか？",
            answer:
              "紙の見積書を手書きで修正する場合、修正した箇所に訂正印（認印）を押すのがマナーです。ただし、現代のビジネス実務では「修正版として新たに発行し直す」方法が一般的で、訂正印よりも明確に内容が伝わります。電子化された見積書（PDFメール送付）では、旧版を無効化する旨を添え状に記載したうえで新しいPDFを再送する方法が標準的です。",
          },
          {
            question: "見積書の修正・再提出は何回まで対応すべきですか？",
            answer:
              "法的な制限はありませんが、見積書の修正回数についてのルールを備考欄に明記しておくことを推奨します。特にフリーランス・個人事業主の場合、「見積もり条件の変更に伴う再見積もりは2回まで無償対応、3回目以降は○○円/回」などの条件を事前に提示しておくことで、過度な修正依頼を防ぐことができます。",
          },
        ]}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">
              見積書メーカー
            </Link>
            <span className="mx-2">›</span>
            <Link href="/guide" className="hover:text-gray-900">
              見積書ガイド
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">見積書の修正・訂正・再提出</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書の修正・訂正・再提出の方法と書き直しルール
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月19日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            見積書を提出した後に「金額を間違えた」「品名・数量を変更してほしい」「有効期限を延ばしたい」
            といった修正依頼が発生することは珍しくありません。見積書の修正・訂正にはビジネスマナーとして
            守るべき手順があり、誤った対応はトラブルのもとになります。本記事では、見積書の修正が必要な
            ケース別の対処法、訂正版の作り方と管理方法、再提出時のメール例文まで詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書の修正が必要な主なケース
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の修正が必要になる場面は大きく分けて以下のパターンがあります。
            それぞれのケースで対応方法が異なるため、状況に応じた対処法を把握しておきましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1. 金額・単価の誤り
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            計算ミス・入力ミスによる金額の誤りは、発見次第すみやかに修正版を発行して再提出します。
            相手がすでに見積書を確認している場合は、口頭またはメールで謝罪とともに
            訂正の旨を伝えることがマナーです。金額が増額になる場合は特に慎重に対応し、
            なぜ増額になったのか理由を明確に説明した上で修正版を送付します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            2. 品名・仕様・数量の変更
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            発注者からの要件変更（仕様変更・数量追加・品名の書き直し依頼）に対応する場合です。
            変更箇所を明確にするため、修正版の備考欄に「Rev.1：〇〇を△△に変更」と変更内容を記載します。
            大幅な変更の場合は変更前後の比較表を添付すると発注者が確認しやすくなります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3. 発行日・有効期限の変更
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            発行日を間違えた場合や、有効期限を延長してほしいという依頼があった場合です。
            有効期限の延長は、原材料・労務費の相場が変動していないことを確認した上で対応します。
            延長が難しい場合は、現時点の市場価格に基づく新しい見積書として再発行する旨を伝えましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            4. 宛名・会社名・担当者名の誤り
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            宛名の誤り（御中・様の使い間違い、会社名の表記ミス、担当者名の誤り）は、
            相手に対して失礼にあたるため、発見次第すみやかに修正版を再送します。
            特に法人名の誤りは印象が悪くなるため、初回提出前に必ず確認する習慣をつけましょう。
            宛名の書き方については
            <Link href="/guide/addressing" className="text-blue-600 hover:underline">
              見積書の宛名の書き方・「御中」「様」の使い分け
            </Link>
            も参考にしてください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            修正版（訂正版）の作り方と表記ルール
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の修正版を発行する際は、旧版と区別できるよう以下のルールに従って作成します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            発行日の更新
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            修正版を発行する日付を新しい発行日として記載します。
            旧版の発行日を使い回すと、どちらが最新版か分からなくなるため必ず更新してください。
            有効期限も新しい発行日を基準に設定し直します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            「訂正版」または「Rev.番号」の表記
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            修正版であることを一目で分かるよう、見積書の件名部分または備考欄に以下のような表記を入れます。
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-sm font-bold text-gray-700 mb-3">修正版の表記例</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>・件名：「御見積書（訂正版）」「御見積書 Rev.1」「御見積書 第2版」</li>
              <li>・備考欄：「2026年4月15日付見積書の訂正版です。金額を修正しました。」</li>
              <li>・備考欄：「Rev.1：品名を『A商品』から『B商品』に変更しました。」</li>
              <li>・ファイル名：「御見積書_20260419_Rev1.pdf」のように版番号を含める</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            変更内容の明示
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            備考欄に「変更箇所：○○を△△に変更（3ページ目・5行目）」のように、
            何をどう変更したかを具体的に記載します。
            修正箇所が多い場合は、修正対照表（変更前・変更後を並べた表）を別紙として添付することも有効です。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            再提出メールの書き方と例文
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の修正版を再送する際のメールの書き方を解説します。
            簡潔かつ丁寧に、変更内容と旧版の無効化を明記することがポイントです。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            金額誤りを訂正する場合のメール例文
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-sm text-gray-600 mb-1">件名：【訂正版】御見積書のご送付（〇〇工事）</p>
            <div className="text-sm text-gray-700 leading-relaxed space-y-3 mt-3">
              <p>〇〇株式会社<br />△△部 □□様</p>
              <p>
                平素より大変お世話になっております。株式会社〇〇の◇◇でございます。
              </p>
              <p>
                先日（2026年4月15日）ご送付いたしました御見積書につきまして、
                誠に申し訳ございませんが、〇〇の金額に誤りがございました。
              </p>
              <p>
                <strong>【訂正内容】</strong><br />
                誤：〇〇工事 単価 50,000円 → 正：〇〇工事 単価 55,000円<br />
                （合計金額 誤：550,000円 → 正：605,000円）
              </p>
              <p>
                改めて訂正版の御見積書をご添付いたします。
                前回ご送付の見積書（2026年4月15日付）は無効となりますので、
                お手数ですが破棄いただきますようお願い申し上げます。
              </p>
              <p>
                ご迷惑をおかけして誠に申し訳ございません。何卒よろしくお願い申し上げます。
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            発注者からの変更依頼に対応する場合のメール例文
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-sm text-gray-600 mb-1">件名：【Rev.1】御見積書のご送付（〇〇プロジェクト）</p>
            <div className="text-sm text-gray-700 leading-relaxed space-y-3 mt-3">
              <p>〇〇株式会社<br />△△部 □□様</p>
              <p>
                平素より大変お世話になっております。〇〇の◇◇でございます。
              </p>
              <p>
                先日ご依頼いただきました仕様変更に対応した修正版の御見積書をお送りいたします。
              </p>
              <p>
                <strong>【変更内容（Rev.1）】</strong><br />
                ・商品A（10個）→ 商品B（15個）に変更<br />
                ・これに伴い合計金額が変更となっております
              </p>
              <p>
                ご確認のほどよろしくお願いいたします。<br />
                ご不明な点がございましたらお気軽にお問い合わせください。
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            旧版の無効化と版管理のルール
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書を修正・再発行した場合、旧版が有効な状態のまま残っていると発注者が混乱し、
            古い見積書に基づいて発注が行われるリスクがあります。旧版の適切な無効化と版管理が重要です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            相手先への旧版の無効化依頼
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>
              メール添付のPDFの場合：修正版送付メールに「前回ご送付の見積書（〇月〇日付）は無効となります」と明記する
            </li>
            <li>
              郵送した紙の見積書の場合：「無効」と朱書きした旧版を返却してもらうか、破棄の依頼をメールまたは電話で行う
            </li>
            <li>
              クラウドサービスで共有した場合：旧版ファイルを削除または閲覧不可にした上で修正版を共有する
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            自社でのファイル管理ルール
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            修正版を発行した際、自社のファイル管理でも旧版と修正版を明確に区別します。
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-sm font-bold text-gray-700 mb-3">ファイル命名規則の例</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>・初版：「御見積書_〇〇様_20260415_v1.pdf」</li>
              <li>・修正版：「御見積書_〇〇様_20260419_v2.pdf」</li>
              <li>・旧版アーカイブ：「【旧版_無効】御見積書_〇〇様_20260415_v1.pdf」</li>
            </ul>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            旧版を削除してしまうと後から見積もりの経緯が確認できなくなるため、
            「旧版」フォルダに移動してアーカイブとして保管することを推奨します。
            商取引に関する書類は7年間の保存が推奨されています。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            よくある修正ミスと防止策
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の修正作業でよく発生するミスと、その防止策を紹介します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ミス1：修正したつもりで旧版を送ってしまう
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            修正版を作成したが、メール添付時に旧版のファイルを誤って送付してしまうケースです。
            防止策として、修正版ファイルを必ずファイル名に「Rev.1」「v2」などの版番号を含め、
            送付前にファイル名と内容の両方を確認する習慣をつけましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ミス2：修正箇所が複数あるのに一部だけ直す
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            金額のみ修正したつもりが、関連する小計・合計・消費税の計算が更新されていないケースです。
            見積書の修正を行う際は、変更箇所に連動するすべての金額（小計・合計・消費税・税込合計）が
            正しく更新されているか確認してから送付します。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            ミス3：発行日と有効期限を更新し忘れる
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            修正版を発行したが、発行日が旧版のままになっている、あるいはすでに有効期限が切れた
            日付のままになっているケースです。修正版の発行時は、発行日・有効期限・文書番号（採番している場合）
            の更新を必ずチェックリストに含めてください。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            まとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の修正・訂正・再提出で押さえるべきポイントをまとめます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>修正版は必ず新しい発行日を記載し、「訂正版」「Rev.1」などの版表示を入れる</li>
            <li>備考欄に変更内容（何をどう変更したか）を具体的に明記する</li>
            <li>再送メールには旧版の無効化の旨を必ず記載する</li>
            <li>金額・小計・合計・消費税が連動して正しく更新されているか確認する</li>
            <li>旧版ファイルは削除せず「旧版」フォルダにアーカイブして保管する</li>
            <li>修正回数のルールを事前に備考欄に明記しておくとトラブル防止になる</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書の修正は「ミスを素直に認めて迅速に対応する」姿勢が信頼維持の鍵です。
            見積書メーカーを使えば、金額を修正すると合計・消費税が自動計算され、
            PDFで即座に再提出できます。ぜひご活用ください。
          </p>
        </article>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連記事</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/reissue" className="text-blue-600 hover:underline text-sm">
                見積書の再発行の方法・依頼メール例文付き
              </Link>
            </li>
            <li>
              <Link href="/guide/addressing" className="text-blue-600 hover:underline text-sm">
                見積書の宛名の書き方・「御中」「様」の使い分け
              </Link>
            </li>
            <li>
              <Link href="/guide/valid-period" className="text-blue-600 hover:underline text-sm">
                見積書の有効期限の設定方法と適切な期間の決め方
              </Link>
            </li>
            <li>
              <Link href="/guide/remarks" className="text-blue-600 hover:underline text-sm">
                見積書の備考欄の書き方・例文集【コピペOK】
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">登録不要・完全無料・PDF出力対応</p>
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
