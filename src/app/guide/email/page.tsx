import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "見積書のメール送付マナー・例文テンプレート | 見積書メーカー",
  description:
    "見積書をメールで送る際の基本マナー・件名の書き方・送付メールの例文を紹介。PDF添付の注意点やよくある失敗も解説します。",
};

export default function GuideEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="見積書のメール送付マナー・例文テンプレート"
        description="見積書をメールで送る際の基本マナー・件名の書き方・送付メールの例文を紹介。"
        slug="email"
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
            <span className="text-gray-700">メール送付マナー</span>
          </nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            &larr; 見積書メーカーに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            見積書のメール送付マナー・例文テンプレート
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月2日</p>

          {/* --- 1 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書をメールで送る際の基本マナー
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書をメールで送付することは、ビジネスにおいて一般的な方法です。ただし、いくつかのマナーを守らないと、相手に不信感を与えたり、トラブルにつながることがあります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            まず、見積書は必ず<strong>PDF形式</strong>で添付しましょう。WordやExcelのまま送ると、相手の環境でレイアウトが崩れたり、意図せず内容が書き換えられるリスクがあります。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            次に、メール本文には見積書の概要（件名・合計金額・有効期限）を簡潔に記載します。添付ファイルだけを送り、本文が空のメールはマナー違反です。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            また、送信前に以下の点を必ず確認してください。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>宛先（To / CC）が正しいか</li>
            <li>添付ファイルが正しいPDFか（別の顧客の見積書を添付するミスは多い）</li>
            <li>金額・消費税・有効期限に誤りがないか</li>
            <li>ファイル名が分かりやすいか（例：「御見積書_株式会社〇〇様_20260402.pdf」）</li>
          </ul>

          {/* --- 2 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書送付メールの例文
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            新規顧客への送付メール
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {`件名：【御見積書送付】〇〇のご提案について（株式会社△△）

株式会社〇〇
□□部 ◇◇様

お世話になっております。
株式会社△△の□□でございます。

先日はお打ち合わせのお時間をいただき、
誠にありがとうございました。

ご依頼いただきました〇〇につきまして、
お見積書を作成いたしましたので送付いたします。

【お見積概要】
・件名：〇〇制作一式
・合計金額：¥550,000（税込）
・有効期限：2026年5月2日

ご不明な点やご要望がございましたら、
お気軽にお申し付けください。

何卒よろしくお願いいたします。`}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            既存顧客への送付メール
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {`件名：【御見積書】〇〇の追加対応について（株式会社△△）

〇〇株式会社
□□様

いつも大変お世話になっております。
株式会社△△の□□です。

ご相談いただいた〇〇の追加対応について、
お見積書を添付にてお送りいたします。

・合計金額：¥220,000（税込）
・有効期限：2026年4月30日

前回のお取引内容をベースに算出しております。
ご確認のうえ、ご検討いただけますと幸いです。

よろしくお願いいたします。`}
          </div>

          {/* --- 3 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            件名の書き方のポイント
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            メールの件名は、相手が受信トレイで一目で内容を把握できるように書くことが大切です。以下のポイントを意識しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>
              <strong>【御見積書】を冒頭に付ける</strong>
              ：件名の最初に角括弧で書類種別を明記すると、相手が見積書だとすぐに分かります
            </li>
            <li>
              <strong>案件名を含める</strong>
              ：「〇〇のご提案について」のように具体的な内容を記載します
            </li>
            <li>
              <strong>自社名を入れる</strong>
              ：相手が複数社から見積もりを取っている場合、どの会社からのメールか分かるようにします
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            悪い例：「見積書をお送りします」「添付ご確認ください」
            <br />
            良い例：「【御見積書送付】Webサイトリニューアルのご提案（株式会社△△）」
          </p>

          {/* --- 4 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            PDFで送るべき理由と注意点
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書をメールで送る際は、PDF形式が最も推奨されます。その理由は以下の通りです。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>
              <strong>レイアウトが崩れない</strong>
              ：ExcelやWordはPC環境によってフォントやセル幅が変わりますが、PDFなら常に同じ見た目で表示されます
            </li>
            <li>
              <strong>改ざん防止</strong>
              ：PDFは編集が難しいため、金額や条件が意図せず書き換えられるリスクを減らせます
            </li>
            <li>
              <strong>印刷しやすい</strong>
              ：取引先がそのまま印刷・保管する際にも、きれいに出力されます
            </li>
            <li>
              <strong>電子帳簿保存法への対応</strong>
              ：PDF形式で保存しておくと、電子取引データとしての保存要件を満たしやすくなります
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            注意点として、PDFのファイルサイズが大きすぎると相手のメールサーバーで弾かれることがあります。画像を多用する見積書の場合は、ファイルサイズが2MB以下に収まるよう気をつけましょう。
          </p>

          {/* --- 5 --- */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            よくある失敗と対処法
          </h2>
          <div className="space-y-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                別の顧客の見積書を添付してしまった
              </p>
              <p className="text-gray-600 text-sm">
                最も多いミスです。送信前に必ずPDFを開いて宛名を確認しましょう。ファイル名に顧客名を入れておくと防止しやすくなります。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                添付ファイルを付け忘れた
              </p>
              <p className="text-gray-600 text-sm">
                本文に「添付いたします」と書いたのに添付がないケースです。メールソフトの添付忘れ警告機能を有効にしておくか、先にファイルを添付してから本文を書く習慣をつけましょう。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                消費税や合計金額が間違っていた
              </p>
              <p className="text-gray-600 text-sm">
                手計算で見積書を作成すると計算ミスが起きやすくなります。見積書作成ツールを使えば、消費税や合計金額を自動計算できるため、ミスを大幅に減らせます。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800 mb-1">
                有効期限を設定していなかった
              </p>
              <p className="text-gray-600 text-sm">
                有効期限がない見積書は、何ヶ月も後に「この金額でお願いします」と言われるリスクがあります。必ず有効期限を明記しましょう。
              </p>
            </div>
          </div>

          {/* 関連ガイド */}
          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            関連ガイド
          </h2>
          <ul className="space-y-2 mb-4">
            <li>
              <Link
                href="/guide/how-to-write"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書の書き方・必要項目を解説
              </Link>
            </li>
            <li>
              <Link
                href="/guide/pdf"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書をPDFで作成・出力する方法
              </Link>
            </li>
            <li>
              <Link
                href="/guide/valid-period"
                className="text-blue-600 hover:underline text-sm"
              >
                見積書の有効期限の設定方法
              </Link>
            </li>
          </ul>
        </article>

        {/* CTA */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            見積書を今すぐ無料で作成
          </h2>
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
