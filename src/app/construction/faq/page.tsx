import type { Metadata } from "next";
import Link from "next/link";
import { HardHat, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）| ケンミツ",
  description:
    "ケンミツのよくある質問。料金・機能・改正建設業法対応・解約・返金・データ保存・トラブル対応まで20項目を網羅。",
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/faq",
  },
  robots: { index: true, follow: true },
};

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: "料金・プラン",
    items: [
      {
        q: "無料で使えますか？",
        a: "はい、登録・カード登録なしで見積書作成とPDF出力まで無料でお使いいただけます。ただし無料版のPDFには「無料版 SAMPLE」の透かしが入ります。取引先に提出する正式版が必要な場合は、Soloプラン（月¥980）以上をご利用ください。",
      },
      {
        q: "Soloプランでできるようになることは何ですか？",
        a: "PDF透かしの完全削除、見積書の無制限クラウド保存、再編集・複製、発注者へのメール直接送信、単価マスタ・取引先マスタのサーバー同期、工事写真の埋込など。無料版との主な違いは『透かし』と『保存数』です。",
      },
      {
        q: "年払いは割引がありますか？",
        a: "はい。Solo 年額 ¥9,800（月額換算 ¥816、約2ヶ月分お得）、Team 年額 ¥29,800 となっています。Stripe Checkout の画面で月額/年額を選択できます。",
      },
      {
        q: "Teamプランは使えますか？",
        a: "Teamプランは現在開発中のため新規受付を一時停止しています。Soloプランで当面ご対応ください。Team機能（複数アカウント・顧客管理・請求書連動・電子サイン）のリリース時に優先的にご案内します。",
      },
    ],
  },
  {
    title: "機能・使い方",
    items: [
      {
        q: "改正建設業法2025に対応していますか？",
        a: "はい。2025年12月全面施行の改正建設業法に完全対応しています。労務費の内訳明示・「一式」表記の警告・見積条件書の必須記載事項・瑕疵担保責任のデフォルト文言を標準で搭載。リアルタイムで法令準拠状況をチェックする建設業法チェッカー機能も付いています。",
      },
      {
        q: "どんな工種に対応していますか？",
        a: "電気・水道設備・内装・土木・外構・大工・左官・鳶足場の8工種に特化したプリセットを用意。各工種に代表的な5項目が登録されており、ワンクリックで見積の骨格が完成します。複数工種を組み合わせた見積書も作成可能です（階層見積）。",
      },
      {
        q: "法定福利費は自動計算されますか？",
        a: "はい。労務費を入力すると、法定福利費（デフォルト20%）が自動で独立行として計上されます。料率は工事や規模に応じて編集可能。国交省・建設業振興基金のガイドラインに沿った計算方法です。",
      },
      {
        q: "諸経費の計算はどうなりますか？",
        a: "現場管理費（業界標準6%・編集可）と一般管理費（業界標準10%・編集可）を段階計算で自動算出。直接工事費 → 法定福利費 → 現場管理費 → 一般管理費の順で重ね合わせる業界標準の計算順序に対応しています。",
      },
      {
        q: "Excelの見積書を取り込めますか？",
        a: "対応しています。階層見積セクションの先頭にある「Excel / CSV を取り込む」ボタンから、既存の Excel ファイルをアップロードすると、列名（品名・数量・単位・単価・費目など）を自動検出して明細に展開します。複数シートも取り込めます。",
      },
      {
        q: "会社ロゴや印影はPDFに入れられますか？",
        a: "はい。施工者情報セクションから画像（PNG / JPEG / GIF / WebP、各500KB以下）をアップロードすると、プレビューとPDFの両方に自動で埋め込まれます。",
      },
      {
        q: "見積書を請求書や納品書に変換できますか？",
        a: "Soloプラン以上で、作成した見積書を請求書・納品書・発注書にワンクリックで変換できます。法定福利費・現場管理費・一般管理費もそのまま明細として引き継がれます。",
      },
    ],
  },
  {
    title: "決済・解約",
    items: [
      {
        q: "解約はどうやりますか？",
        a: "マイページの「プラン管理・解約」から Stripe Customer Portal にアクセスし、ワンクリックで解約できます。電話・メールでの解約手続きは不要です。解約後は当該課金サイクル末日まで有料プランを継続利用でき、翌サイクルから自動で無料プランに移行します。",
      },
      {
        q: "日割り返金はありますか？",
        a: "途中解約による日割り返金は原則として行いません。ただし、本サービスの重大な不具合により実質的に利用できなかった場合は個別対応いたしますので、お問い合わせフォームよりご連絡ください。",
      },
      {
        q: "プラン変更はできますか？",
        a: "Stripe Customer Portal から月額⇔年額の切替、プランのダウングレードが可能です。アップグレードは即時反映、ダウングレードは次回更新日から反映されます。",
      },
      {
        q: "決済はどの方法が使えますか？",
        a: "クレジットカード（Visa / Mastercard / JCB / AMEX / Diners）に対応しています。Stripeが決済処理を行うため、カード情報は当社のサーバーには保存されません。",
      },
    ],
  },
  {
    title: "データ・セキュリティ",
    items: [
      {
        q: "作成したデータはどこに保存されますか？",
        a: "未ログイン時はブラウザのローカルストレージのみ（サーバーに送信されません）。ログイン時は Supabase のクラウドデータベース（暗号化保管）に保存されます。解約後も180日間は保管、その後削除されます。",
      },
      {
        q: "他の人に見積書データが漏れることはありますか？",
        a: "Supabase の Row Level Security（RLS）により、ユーザーは自分のデータのみアクセス可能です。別のユーザーが URL を推測しても他人の見積書は一切見られません。",
      },
      {
        q: "データのエクスポートはできますか？",
        a: "PDF出力は標準機能としてあります。それ以外のデータエクスポート（JSON / CSV）は現在準備中です。お問い合わせフォームからご要望いただければ、個別対応を検討します。",
      },
    ],
  },
  {
    title: "技術・トラブル",
    items: [
      {
        q: "スマートフォンでも使えますか？",
        a: "はい。PC・タブレット・スマートフォン全てに対応しています。スマートフォンでは「入力」「プレビュー」をタブで切り替える設計で、現場でもサクサク使えます。",
      },
      {
        q: "推奨ブラウザはありますか？",
        a: "Google Chrome / Safari / Microsoft Edge の最新版を推奨します。Internet Explorer は非対応です。JavaScriptとCookieを有効にしてください。",
      },
      {
        q: "ログイン用のメールが届きません",
        a: "迷惑メールフォルダをご確認ください。届かない場合、メールアドレスのタイプミスの可能性があります。それでも届かない場合は、別のアドレスでお試しいただくか、お問い合わせフォームよりご連絡ください。",
      },
      {
        q: "PDFダウンロードが失敗します",
        a: "ブラウザのポップアップブロックを解除するか、別のブラウザでお試しください。特に古いブラウザや社内ネットワークの制限下では失敗することがあります。それでも直らない場合は「印刷」機能からPDF保存もお使いいただけます。",
      },
    ],
  },
  {
    title: "法令・コンプライアンス",
    items: [
      {
        q: "建設業法チェッカーの警告は何に基づいていますか？",
        a: "国土交通省の改正建設業法（2025年12月全面施行）と関連ガイドラインに基づいています。ただし、最終的な法的解釈はケースバイケースで異なるため、重要な契約では所属団体や建設業法に詳しい専門家（行政書士・社労士）にご確認ください。",
      },
      {
        q: "フリーランス新法には対応していますか？",
        a: "はい。2024年11月施行のフリーランス新法（特定受託事業者法）に対応した見積条件書フォーマットを用意しています。発注者への書面交付義務・60日以内支払い・7つの禁止行為への配慮を標準文言に盛り込んでいます。詳細は「フリーランス新法と建設業一人親方」ガイド記事をご覧ください。",
      },
      {
        q: "インボイス制度には対応していますか？",
        a: "対応しています。見積書にインボイス登録番号（適格請求書発行事業者番号）を記載する欄があり、PDFにも出力されます。税抜・税込表記の切替も可能です。",
      },
    ],
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">よくある質問</span>
          </nav>
          <Link
            href="/construction"
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5"
          >
            <HardHat className="w-4 h-4 text-green-700" strokeWidth={2.25} />
            ← 建設業向けトップに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          よくある質問（FAQ）
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          ケンミツについて、料金・機能・法令対応・決済・トラブルなどの主な質問を{" "}
          {faqCategories.reduce((sum, c) => sum + c.items.length, 0)}項目で整理しました。
        </p>

        <div className="space-y-10">
          {faqCategories.map((cat, i) => (
            <section key={i}>
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-700">
                {cat.title}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, j) => (
                  <details
                    key={j}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
                  >
                    <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-gray-900 flex items-center justify-between list-none hover:bg-gray-50">
                      <span className="flex-1 pr-4">Q. {item.q}</span>
                      <ChevronDown
                        className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0"
                        strokeWidth={2.5}
                      />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100">
                      <p className="mt-3 whitespace-pre-line">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">
            解決しなかった場合
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            FAQ で解決しないお問い合わせは、以下のいずれかの方法でご連絡ください。
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <Link
              href="/contact"
              className="block bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors"
            >
              <p className="text-sm font-bold text-green-900 mb-1">
                お問い合わせフォーム
              </p>
              <p className="text-xs text-green-800">通常1営業日以内に返信します</p>
            </Link>
            <Link
              href="/construction/mypage"
              className="block bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
            >
              <p className="text-sm font-bold text-blue-900 mb-1">
                マイページのβフィードバック
              </p>
              <p className="text-xs text-blue-800">Slackへ直接届きます</p>
            </Link>
          </div>
        </section>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">まずは無料で試してみる</h2>
          <p className="text-gray-400 mb-4 text-sm">
            登録不要・クレジットカード不要
          </p>
          <Link
            href="/construction/new"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            見積書を作成する →
          </Link>
        </div>
      </main>
    </div>
  );
}
