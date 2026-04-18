import type { Metadata } from "next";
import Link from "next/link";
import {
  HardHat,
  CheckSquare,
  Download,
  AlertTriangle,
  BookOpen,
  FileText,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import LeadMagnetButton from "@/components/construction/LeadMagnetButton";

export const metadata: Metadata = {
  title:
    "改正建設業法2025 対応チェックリスト【30項目・無料DL】見積書の法令対応 | ケンミツ",
  description:
    "2025年12月全面施行の改正建設業法に自社が対応できているか、30項目で無料セルフチェック。労務費の内訳明示・法定福利費・見積条件書・瑕疵担保など実務項目を8セクションに整理。PDFを無料配布。一人親方・工務店向け。",
  keywords:
    "改正建設業法 チェックリスト, 建設業法 2025, 見積書, 対応, 無料, ダウンロード, 一人親方, 工務店, 労務費, 法定福利費",
  openGraph: {
    title:
      "改正建設業法2025 対応チェックリスト【30項目・無料DL】見積書の法令対応",
    description:
      "2025年12月全面施行の改正建設業法に自社が対応できているかを、30項目・8セクションで無料セルフチェック。PDF配布あり。",
    url: "https://mitsumori-maker.com/construction/checklist",
    siteName: "ケンミツ",
    locale: "ja_JP",
    type: "article",
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/checklist",
  },
  robots: { index: true, follow: true },
};

const sections = [
  {
    id: "labor-cost",
    title: "Section 1: 労務費の内訳明示",
    intro:
      "改正建設業法で特に重要視される項目。「一式」でまとめず、工種別・人工単位で労務費を明示することが努力義務化。",
    items: [
      "労務費を「一式」ではなく、工種別・人工単位で明示している",
      "労務費の単価（人日・人月）を明記している",
      "元請から労務費の分離を求められた場合、すぐに対応できる",
      "元請との請負契約書に労務費が明示されている",
    ],
  },
  {
    id: "legal-welfare",
    title: "Section 2: 法定福利費の計上",
    intro:
      "社会保険料の適正転嫁を目的に、見積書の独立行として計上することが求められる。",
    items: [
      "見積書に法定福利費を独立行で計上している",
      "法定福利費の料率（労務費×約20%）が適切",
      "法定福利費の計算根拠を社内で統一している",
      "（法人のみ）社会保険加入状況が台帳で管理されている",
    ],
  },
  {
    id: "overhead",
    title: "Section 3: 諸経費（現場管理費・一般管理費）",
    intro:
      "業界標準の段階計算に沿って算出。発注者から根拠説明を求められた時に即答できる状態に。",
    items: [
      "現場管理費を業界標準率（5〜10%）で計算している",
      "一般管理費を業界標準率（8〜15%）で計算している",
      "諸経費の根拠を発注者に説明できる",
    ],
  },
  {
    id: "quote-terms",
    title: "Section 4: 見積条件書の記載",
    intro:
      "改正法で記載義務が拡大された項目。工事場所・工事期間・支払条件に加え、施工条件や費用負担区分まで。",
    items: [
      "工事名称・工事場所を明記している",
      "工事期間（着工日・完成予定日）を明記している",
      "設計図書・仕様書を特定して記載している",
      "見積の有効期限を明記している（業界標準30日）",
      "支払条件（契約時・中間金・完成時の配分）が明確",
      "費用負担区分（仮設電気・水道・廃材等）を明記している",
    ],
  },
  {
    id: "change-order",
    title: "Section 5: 追加工事・変更の取扱い",
    intro:
      "後からのトラブルを防ぐため、工期延長や価格再協議のルールを事前に取り決める。",
    items: [
      "追加工事発生時の取扱いルールを見積書に記載している",
      "天候・現場状況悪化による工期延長の合意事項がある",
      "設計変更時の価格再協議の手順を明記している",
    ],
  },
  {
    id: "warranty",
    title: "Section 6: 瑕疵担保責任・アフターサービス",
    intro:
      "住宅品確法の10年保証も含め、保証期間と範囲を明確にすることが提出先からも求められる。",
    items: [
      "保証期間を明記している（引渡日より◯年間）",
      "保証範囲（構造耐力・雨水浸入等）を具体化している",
      "設備機器の保証は各メーカー保証に準じる旨を記載",
      "住宅工事の場合、住宅品確法の10年保証を明記している",
    ],
  },
  {
    id: "license",
    title: "Section 7: 建設業許可・事業者情報",
    intro:
      "取引先やインボイス適用の観点で、許可番号・登録番号の記載有無は重要な信用情報。",
    items: [
      "建設業許可番号を見積書に記載している",
      "インボイス登録番号（適格請求書発行事業者）を記載",
      "施工者の住所・電話・担当者を明記している",
      "（一人親方）労災特別加入の状況を把握している",
    ],
  },
  {
    id: "workflow",
    title: "Section 8: 業務フロー・実務対応",
    intro:
      "法令対応は仕組み化されていないと継続できない。作成時間・情報共有・最新情報の取得経路まで整える。",
    items: [
      "見積作成に30分以上かかっていない",
      "過去の類似案件から見積を流用できる仕組みがある",
      "現場でスマホから見積書を作成・送信できる",
      "改正建設業法の最新情報を定期的にチェックしている",
    ],
  },
];

const faqs = [
  {
    q: "改正建設業法2025はいつから施行されますか？",
    a: "2025年12月1日に全面施行されました。中心となる改正点（労務費内訳明示、見積条件書の記載事項拡大、「一式」表記の適正化、処分強化）は、すべての建設業者に対応義務があります。このチェックリストは、その実務対応の自己診断のために作られています。",
  },
  {
    q: "このチェックリストは一人親方でも使えますか？",
    a: "はい、むしろ一人親方・小規模工務店の現場感覚に合わせて作っています。30項目のうち「法人のみ対象」の項目が1〜2ありますが、それ以外は個人事業主でも該当します。労務費内訳明示や法定福利費計上は、規模に関係なく改正法の適用対象です。",
  },
  {
    q: "全部チェックが付かないと違法になりますか？",
    a: "本チェックリストは努力義務項目・推奨項目を含んでおり、未対応=即違法ではありません。ただし「労務費の内訳明示」「『一式』表記の適正化」「見積条件書の必須記載」は改正法で強化された項目で、元請・発注者からの差し戻しリスクが現実化しています。未対応項目から優先的に整備することをおすすめします。",
  },
  {
    q: "見積書の『一式』表記は完全に禁止ですか？",
    a: "完全禁止ではありませんが、工事内容が明確でない『一式』表記は避け、可能な限り内訳を展開することが改正法で推奨されています。元請の検収部門から差し戻される実例が増えており、実務上は『労務費』『材料費』『外注費』等に費目分解した明細での提出が標準になりつつあります。",
  },
  {
    q: "法定福利費の料率はいくらが適正ですか？",
    a: "労務費に対して約20%が業界標準です。内訳は健康保険料（約5%）、厚生年金保険料（約9%）、雇用保険料（約0.6%）、労災保険料（業種により0.25〜5%台）、介護保険料（約1%）等の合算です。元請から料率の根拠を聞かれた時に説明できるよう、計算式を社内で共有しておくと安全です。",
  },
  {
    q: "PDF でダウンロードできますか？",
    a: "はい。ページ上部の「メールで受け取る」ボタンからメールアドレスを登録いただくと、PDF ダウンロードリンクをメールでお送りします。印刷して社内会議で使用、協力業者に配布、などにご利用ください。",
  },
  {
    q: "ケンミツ（建設業向け見積書ツール）とは違いますか？",
    a: "このチェックリストは自己診断用の資料です。一方『ケンミツ』はチェックリストの各項目を実務フローに組み込んだ、建設業特化の見積書作成Webアプリで、労務費内訳・法定福利費・見積条件書の必須項目を入力画面で自動チェックしながら作成できます。登録不要で無料お試しできるので、チェックリストで課題を把握した後にそのままツールでも確認いただけます。",
  },
];

export default function ChecklistPage() {
  // HowTo + FAQPage の構造化データ
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "改正建設業法2025 対応チェックリスト",
    description:
      "2025年12月全面施行の改正建設業法に自社が対応できているかを、30項目・8セクションで自己診断。",
    step: sections.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.intro,
      itemListElement: s.items.map((item, j) => ({
        "@type": "HowToDirection",
        position: j + 1,
        text: item,
      })),
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav
            className="text-xs text-gray-500 mb-3"
            aria-label="パンくずリスト"
          >
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1.5">›</span>
            <span className="text-gray-700">
              改正建設業法2025 対応チェックリスト
            </span>
          </nav>
          <Link
            href="/construction"
            className="flex items-center gap-2 text-sm font-bold text-gray-900"
          >
            <HardHat
              className="w-4 h-4 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
            ケンミツ{" "}
            <span className="text-kenmitsu-navy">| 建設業の見積書</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* ヒーロー */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <CheckSquare className="w-4 h-4" strokeWidth={2.5} />
            <span>無料ダウンロード可・印刷可・社内配布OK</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            改正建設業法2025
            <br className="md:hidden" />
            対応チェックリスト
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2">
            2025年12月1日に全面施行された改正建設業法への対応を、
            <br className="hidden md:block" />
            一人親方・工務店が自社で自己診断できる
            <strong>8セクション・全30項目</strong>のチェックリスト。
          </p>
          <p className="text-xs text-gray-500">
            最終更新: 2026年4月18日 / ケンミツ編集部
          </p>
        </div>

        {/* リードマグネット CTA */}
        <div className="bg-white border-2 border-kenmitsu-navy100 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-center gap-4 no-print">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-kenmitsu-orange flex items-center justify-center">
            <Download className="w-6 h-6 text-white" strokeWidth={2.25} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-bold text-gray-900">
              チェックリスト PDF を無料で受け取る
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              メールアドレスにPDFダウンロードリンクをお送りします。社内会議・協力業者配布用にどうぞ。
            </p>
          </div>
          <LeadMagnetButton source="checklist_download" />
        </div>

        {/* 導入: 改正建設業法2025 の要点 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-10">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen
              className="w-5 h-5 text-kenmitsu-navy"
              strokeWidth={2.25}
            />
            改正建設業法2025 で何が変わったか
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            国土交通省の改正建設業法（2025年12月1日全面施行）は、建設業における賃金水準の確保と取引の透明性向上を目的に、見積書・請負契約書の記載事項と責任を強化する改正です。主なポイントは4つ。
          </p>
          <ul className="text-sm text-gray-700 space-y-3 mb-4 list-none">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kenmitsu-navy text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <div>
                <strong className="text-gray-900">労務費の内訳明示</strong>
                （努力義務化）— 従来「一式」でまとめていた労務費を、工種別・人工単位で明示することが求められます。
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kenmitsu-navy text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <strong className="text-gray-900">
                  見積条件書の記載事項拡大
                </strong>
                — 工事場所・工事期間に加え、施工条件・費用負担区分・見積期間などの明示が必要に。
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kenmitsu-navy text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <div>
                <strong className="text-gray-900">「一式」表記の適正化</strong>
                — 内容が明確でない「一式」は避け、内訳展開が推奨。元請から差し戻されるリスク増。
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kenmitsu-navy text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <div>
                <strong className="text-gray-900">
                  違反時の指示処分・営業停止
                </strong>
                — 正当な理由なく見積書の交付を怠った場合や内訳明示を怠った場合、国交相・都道府県知事から行政処分の可能性。
              </div>
            </li>
          </ul>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-2.5">
            <AlertTriangle
              className="w-4 h-4 text-amber-700 shrink-0 mt-0.5"
              strokeWidth={2.25}
            />
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>本チェックリストの位置付け:</strong>{" "}
              最終的な法的解釈は所属団体・建設業法に詳しい専門家（行政書士・社労士等）へご確認ください。実務レベルの自己診断用として作成しています。
            </p>
          </div>
        </section>

        {/* TOC */}
        <nav
          className="bg-white rounded-2xl border border-gray-200 p-5 mb-10 no-print"
          aria-label="目次"
        >
          <p className="text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">
            目次 / 30項目の内訳
          </p>
          <ol className="grid md:grid-cols-2 gap-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-kenmitsu-navy py-1"
                >
                  <ArrowRight
                    className="w-3 h-3 text-kenmitsu-navy shrink-0"
                    strokeWidth={2.5}
                  />
                  <span>
                    {s.title}（{s.items.length}項目）
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* チェックリスト本体 */}
        <article className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 print:p-0 print:border-0 mb-10">
          <h2 className="print:block hidden text-2xl font-bold mb-6">
            改正建設業法2025 対応チェックリスト
          </h2>
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-10 last:mb-0 scroll-mt-24">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 pb-2 border-b-2 border-kenmitsu-navy">
                {section.title}
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {section.intro}
              </p>
              <div className="space-y-3">
                {section.items.map((item, j) => (
                  <label
                    key={j}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 border-2 border-gray-300 rounded group-hover:border-kenmitsu-navy transition-colors" />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-2">
              © 2026 ケンミツ 編集部 / mitsumori-maker.com
            </p>
            <p className="text-[11px] text-gray-400">
              本チェックリストは情報提供を目的としています。法令の最終的な解釈は所属団体・専門家にご確認ください。
            </p>
          </div>
        </article>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            よくある質問
          </h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-gray-900 flex items-center justify-between list-none hover:bg-gray-50">
                  <span className="flex-1 pr-4">Q. {item.q}</span>
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
        </section>

        {/* 関連記事 */}
        <section className="mb-10">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            関連記事
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              {
                href: "/guide/kaisei-kensetsu-2025",
                title: "改正建設業法2025【完全ガイド】",
                desc: "見積書の書き方・対応事項・罰則まで法令全体像を解説",
              },
              {
                href: "/guide/legal-welfare",
                title: "法定福利費の計算方法と業界標準料率",
                desc: "約20%の内訳と、元請への根拠説明ができる計算式",
              },
              {
                href: "/guide/freelance-law-construction",
                title: "フリーランス新法と建設業一人親方",
                desc: "2024年11月施行のフリーランス新法と改正建設業法の関係",
              },
              {
                href: "/guide/lump-sum",
                title: "見積書の『一式』表記は禁止？",
                desc: "どこまで内訳展開すべきか、実務判断の基準",
              },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-kenmitsu-navy hover:shadow-sm transition-all"
              >
                <FileText
                  className="w-4 h-4 text-kenmitsu-navy shrink-0 mt-0.5"
                  strokeWidth={2.25}
                />
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-0.5">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 最終 CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-kenmitsu-navy to-kenmitsu-navy700 rounded-2xl p-8 md:p-10 text-center text-white no-print">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse at 50% 40%, #000 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 40%, #000 40%, transparent 80%)",
            }}
          />
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              チェック項目を自動で満たす見積書ツールがあります
            </h2>
            <p className="text-sm text-white/85 mb-6 leading-relaxed max-w-xl mx-auto">
              ケンミツなら、労務費の内訳明示・法定福利費の独立計上・見積条件書の必須項目を
              <strong>入力画面で自動チェック</strong>
              しながら作成できます。登録不要・月¥980・スマホ完結。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/construction/new"
                className="inline-flex items-center justify-center gap-2 bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
              >
                登録不要で無料で試す
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/construction"
                className="inline-flex items-center justify-center border-[1.5px] border-white/30 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
              >
                ケンミツの詳細を見る
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
