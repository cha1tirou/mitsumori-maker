import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Scale,
  HardHat,
  Calculator,
  Smartphone,
  Zap,
  CloudUpload,
  FileSpreadsheet,
  Search,
  Wrench,
  Clock,
  FolderSearch,
  Check,
  ChevronDown,
} from "lucide-react";
import TrackPageView from "@/components/construction/TrackPageView";

export const metadata: Metadata = {
  title: "建設業の見積書作成｜改正建設業法2025対応・月980円｜見積書メーカー",
  description:
    "一人親方・小規模建設業向けの見積書作成ツール。改正建設業法2025に対応した労務費内訳・一式チェッカー・工種別テンプレを搭載。登録不要で今すぐ試せる。月980円から。",
  keywords: "建設業 見積書, 一人親方 見積書, 建設業法 2025, 工事見積書 アプリ, 労務費 内訳, 見積書 ソフト 建設",
  openGraph: {
    title: "建設業の見積書作成｜改正建設業法2025対応・月980円",
    description: "一人親方向け・登録不要で試せる建設業専用の見積書作成ツール。労務費内訳・一式チェッカー・工種テンプレ搭載。",
    url: "https://mitsumori-maker.com/construction",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction",
  },
};

const features = [
  {
    Icon: Scale,
    title: "改正建設業法2025に完全対応",
    body: "2025年12月施行の改正建設業法が求める労務費の内訳明示・「一式」表記の注意喚起・見積条件書の必須記載項目を自動チェック。法令遵守のための判断をツールが支援します。",
  },
  {
    Icon: HardHat,
    title: "8工種の見積プリセット",
    body: "電気・水道設備・内装・土木・外構・大工・左官・鳶足場の8工種それぞれに代表的な明細項目・単価レンジ・単位をあらかじめ用意。1クリックで見積の骨格が完成します。",
  },
  {
    Icon: Calculator,
    title: "諸経費の自動計算",
    body: "直接工事費から現場管理費（デフォ6%）・一般管理費（デフォ10%）を自動計算。業界標準の数値をスタート地点としつつ、案件ごとに柔軟に調整可能。",
  },
  {
    Icon: Smartphone,
    title: "スマホで完結する軽量UI",
    body: "現場から見積書を作成→PDF出力→即メール送信まで完結。PC専用の重いソフトとは違い、片手のスマホ操作で見積業務が終わります。",
  },
  {
    Icon: Zap,
    title: "登録不要で今すぐ試せる",
    body: "他社ツールのように「お問い合わせ→デモ」の重い入口はありません。このページの下から即座にツールを触って、自分の業務に合うか確認できます。",
  },
  {
    Icon: CloudUpload,
    title: "見積履歴を自動保存",
    body: "有料プランなら作成した見積書をすべてクラウドに保存。再編集・コピー・過去案件からの複製で、2通目以降の作成時間を大幅短縮できます。",
  },
];

const problems = [
  { Icon: FileSpreadsheet, text: "Excelテンプレを毎回コピーして手作業で数字を書き換えている" },
  { Icon: Search, text: "改正建設業法で「一式」「労務費」の書き方が変わると聞いたが、具体的にどうすれば？" },
  { Icon: Scale, text: "大手ソフトは月1万円以上で、一人親方には重すぎる" },
  { Icon: Smartphone, text: "現場でスマホで見積書を渡したいが、PCに戻らないと作成できない" },
  { Icon: Clock, text: "諸経費・管理費の計算を毎回電卓で叩き直している" },
  { Icon: FolderSearch, text: "過去の見積書を探すのに時間がかかり、似た案件の流用ができない" },
];

const comparisons = [
  {
    label: "対応する建設業法の改正",
    ours: "2025年12月施行の改正版に対応",
    others: "未対応・対応時期不明のツール多数",
  },
  {
    label: "料金（一人親方向け）",
    ours: "月980円（Solo）",
    others: "月9,800〜数万円（大手ソフト）",
  },
  {
    label: "導入の手続き",
    ours: "登録不要で即試せる→気に入ったら課金",
    others: "お問い合わせ→営業→デモ→契約",
  },
  {
    label: "デバイス",
    ours: "スマホで完結",
    others: "PC前提が多い",
  },
  {
    label: "機能の範囲",
    ours: "見積書作成に特化（軽い）",
    others: "工程・顧客・写真・勤怠まで全部入り（重い）",
  },
];

const faqs = [
  {
    q: "本当に無料で試せますか？",
    a: "はい。登録もクレジットカード登録も不要で、見積書の作成からPDF出力まですべて無料で試せます。月3通までは無料プランでご利用いただけます。",
  },
  {
    q: "建設業法2025対応とは具体的に何ですか？",
    a: "2025年12月に全面施行される改正建設業法では、労務費（人件費）の内訳明示、「一式」記載の適正化、見積条件書の記載事項の明確化などが努力義務となります。本ツールはこれらをフォーム入力時にリアルタイムでチェックし、漏れを警告する機能を搭載しています。",
  },
  {
    q: "既存の会計ソフト（弥生・freee等）との連携はできますか？",
    a: "現時点では連携機能は提供していません。見積書はPDFで出力してメール添付・印刷・保存できます。将来的にCSV出力や会計ソフト連携を検討しています。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "マイページからワンクリックで即時解約できます。「電話しないと解約できない」「メールでのお問い合わせのみ」のような摩擦はありません。",
  },
  {
    q: "一人親方ではなく、5〜10人規模の工務店でも使えますか？",
    a: "もちろん使えます。アカウント複数名プラン（Team ¥2,980/月）を準備しています。顧客管理・見積履歴の共有などが可能になります。",
  },
];

const planFeatures = {
  free: ["月3通まで見積書作成", "PDF出力", "8種類のテンプレート", "登録不要で即利用"],
  solo: [
    "無制限で見積書作成",
    "建設業法チェッカー",
    "工種別プリセット（8工種）",
    "諸経費自動計算",
    "見積履歴・再編集・複製",
    "メール送信履歴",
  ],
  team: [
    "Solo全機能",
    "5アカウントまで",
    "顧客管理機能",
    "請求書との連動",
    "電子サイン",
    "電子帳簿保存法対応",
  ],
};

export default function ConstructionLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TrackPageView name="construction_lp_view" />
      {/* ヘッダー */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <HardHat className="w-5 h-5 text-green-700" strokeWidth={2.25} />
            <span>
              見積書メーカー <span className="text-green-700">for 建設業</span>
            </span>
          </Link>
          <Link
            href="/construction/new"
            className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            無料で試す →
          </Link>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" strokeWidth={2.5} />
            <span>2025年12月・改正建設業法 全面施行</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            一人親方のための、
            <br />
            <span className="text-green-700">建設業法対応・月980円の</span>
            <br />
            見積書ツール
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            労務費の内訳明示・「一式」表記の自動チェック・工種別テンプレで、
            <br className="hidden md:block" />
            改正法に対応した見積書を片手のスマホで作成できます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/construction/new"
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              登録不要で今すぐ試す →
            </Link>
            <a
              href="#pricing"
              className="border border-gray-300 hover:border-gray-400 text-gray-800 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              料金プランを見る
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-6">
            無料プラン・月3通まで利用可能 / クレジットカード登録不要
          </p>
        </div>
      </section>

      {/* 課題提起 */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            こんな課題、抱えていませんか？
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {problems.map(({ Icon, text }, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-sm text-gray-700"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-green-700" strokeWidth={2} />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            6つの専用機能で、見積業務を最短化
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            汎用ツールにはない、建設業専用の機能を搭載
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map(({ Icon, title, body }, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-700" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 比較表 */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            大手ソフトとの違い
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="py-3 px-4 text-left font-bold">比較項目</th>
                  <th className="py-3 px-4 text-left font-bold bg-green-700">見積書メーカー for 建設業</th>
                  <th className="py-3 px-4 text-left font-bold">大手ソフト</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 font-medium text-gray-700 border-t border-gray-100">{row.label}</td>
                    <td className="py-3 px-4 text-green-800 font-medium border-t border-gray-100">{row.ours}</td>
                    <td className="py-3 px-4 text-gray-500 border-t border-gray-100">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section id="pricing" className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
            料金プラン
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            いつでも解約できます。自動更新停止もワンクリック。
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Free */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-xs font-bold text-gray-500 mb-2">FREE</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">¥0</div>
              <div className="text-xs text-gray-500 mb-5">ずっと無料</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {planFeatures.free.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/construction/new"
                className="block text-center border border-gray-300 hover:border-gray-400 text-gray-800 text-sm font-bold py-3 rounded-lg transition-colors"
              >
                無料で試す
              </Link>
            </div>

            {/* Solo - 推奨 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-green-700 relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                一人親方に人気
              </div>
              <div className="text-xs font-bold text-green-700 mb-2">SOLO</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ¥980<span className="text-sm font-normal text-gray-500">/月</span>
              </div>
              <div className="text-xs text-gray-500 mb-5">年払い ¥9,800（2ヶ月分お得）</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {planFeatures.solo.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/construction/new"
                className="block text-center bg-green-700 hover:bg-green-800 text-white text-sm font-bold py-3 rounded-lg transition-colors"
              >
                Soloで始める
              </Link>
            </div>

            {/* Team */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="text-xs font-bold text-gray-500 mb-2">TEAM</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ¥2,980<span className="text-sm font-normal text-gray-500">/月</span>
              </div>
              <div className="text-xs text-gray-500 mb-5">小規模工務店向け（〜5名）</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                {planFeatures.team.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/construction/new"
                className="block text-center border border-gray-300 hover:border-gray-400 text-gray-800 text-sm font-bold py-3 rounded-lg transition-colors"
              >
                Teamで始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            よくある質問
          </h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-gray-900 flex items-center justify-between list-none">
                  <span>Q. {item.q}</span>
                  <ChevronDown
                    className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0"
                    strokeWidth={2.5}
                  />
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100">
                  <p className="mt-3">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="bg-green-800 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/20 mb-5">
            <Wrench className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            まずは無料で、実際の見積書を作ってみてください
          </h2>
          <p className="text-green-100 text-sm mb-8">
            登録・カード登録は不要。作った見積書はPDFで保存できます。
          </p>
          <Link
            href="/construction/new"
            className="inline-block bg-white hover:bg-gray-100 text-green-800 font-bold px-10 py-4 rounded-xl transition-colors"
          >
            建設業向け見積書を作成する →
          </Link>
          <div className="mt-10 text-xs text-green-200">
            <Link href="/construction/terms" className="hover:underline">
              利用規約
            </Link>
            <span className="mx-2">・</span>
            <Link href="/construction/privacy" className="hover:underline">
              プライバシーポリシー
            </Link>
            <span className="mx-2">・</span>
            <Link href="/construction/tokushoho" className="hover:underline">
              特定商取引法に基づく表記
            </Link>
            <span className="mx-2">・</span>
            <Link href="/" className="hover:underline">
              汎用版を使う
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
