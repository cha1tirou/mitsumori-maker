import type { Metadata } from "next";
import Link from "next/link";
import {
  HardHat,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Download,
  Save,
  Layers,
  Wand2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "使い方ガイド | ケンミツ",
  description:
    "ケンミツの使い方を全8ステップで解説。工種プリセット・明細入力・法定福利費・諸経費・PDF出力・保存・マスタ登録まで。メアド登録だけですぐ使えます。",
  alternates: {
    canonical: "https://mitsumori-maker.com/construction/how-to",
  },
  robots: { index: true, follow: true },
};

const steps = [
  {
    num: 1,
    title: "工種を選んでプリセットを読み込む",
    description:
      "8工種（電気・水道・内装・土木・外構・大工・左官・鳶足場）から今回の工事に近いものをタップ。「プリセットを読み込む」で代表5項目が自動投入されます。複数工種を扱う場合はセクションを追加して重ねられます。",
    icon: Wand2,
    hint: {
      label: "8工種の例",
      items: ["電気 → 配線・分電盤・照明", "水道 → 給排水管・給湯器", "内装 → クロス・床・天井", "土木 → 掘削・コンクリート", "外構 → フェンス・カーポート", "大工 → 木工造作・構造材", "左官 → モルタル・漆喰", "鳶足場 → 架設・解体・養生"],
    },
  },
  {
    num: 2,
    title: "発注者・施工者情報を入力",
    description:
      "発注者名と敬称を入れ、「取引先マスタ」ボタンから過去の取引先を呼び出せます。施工者情報は一度「自社情報を保存」を押せば、次回から自動で入力されます。建設業許可番号・インボイス登録番号も入れられます。",
    icon: Users,
    hint: null,
  },
  {
    num: 3,
    title: "見積情報と工事概要を入力",
    description:
      "見積番号は「自動」ボタンで前回+1を提案。工事名・工事場所・工事期間・設計図書・有効期限（日数）を埋めます。改正建設業法で求められる記載事項を網羅しています。",
    icon: CheckCircle2,
    hint: {
      label: "入力のコツ",
      items: ["有効期限は14〜30日が一般的", "工事期間は「着工後 約14日間」のように自由記述OK", "設計図書は参照した図面の番号を記載"],
    },
  },
  {
    num: 4,
    title: "明細を費目別に入力（労務費・材料費・外注費・その他）",
    description:
      "各明細行で費目をプルダウンから選び、品名・数量・単位・単価を入力。「マスタ」ボタンから単価マスタを呼び出せば即入力。中項目（サブセクション）を追加すれば3階層見積になります。",
    icon: Layers,
    hint: {
      label: "費目の使い分け",
      items: ["労務費 = 職人の手間賃・人工", "材料費 = 部材・資材・設備機器", "外注費 = 協力業者への支払い", "その他 = 仮設・運搬・養生・処分"],
    },
  },
  {
    num: 5,
    title: "法定福利費・諸経費は自動計算",
    description:
      "労務費を入れると、法定福利費（デフォルト20%）が自動計上。現場管理費（6%）・一般管理費（10%）も業界標準料率で自動計算。料率は工事や規模で編集可能。",
    icon: CheckCircle2,
    hint: {
      label: "料率の目安",
      items: ["法定福利費: 労務費の約20%（健保+厚年+雇用+労災）", "現場管理費: 直接工事費の5〜8%", "一般管理費: 直接工事費の8〜15%"],
    },
  },
  {
    num: 6,
    title: "建設業法チェッカーで法令遵守を確認",
    description:
      "右ペインの「建設業法2025チェッカー」が、「一式」の検知・労務費未入力・工事期間/場所未記入・瑕疵担保未記載などをリアルタイム警告。全てクリアすると OK バッジが出ます。",
    icon: CheckCircle2,
    hint: {
      label: "チェック項目",
      items: ["「一式」表記 → 内訳展開を推奨", "労務費の内訳 → 費目「労務費」の項目が必要", "法定福利費 → ON推奨", "工事場所・期間・有効期限 → 空欄は警告", "瑕疵担保・追加工事方針 → 記載推奨"],
    },
  },
  {
    num: 7,
    title: "PDFダウンロードで完成",
    description:
      "「PDFダウンロード」をクリックして保存。Free プランは通常フォーマットで出力、有料プランは改正建設業法のルールに沿った見積書（労務費・法定福利費・経費の内訳明示）で出力されます。印刷機能からも PDF 化可能。",
    icon: Download,
    hint: null,
  },
  {
    num: 8,
    title: "（Solo以上）クラウド保存・マイページ管理",
    description:
      "「下書き保存」でクラウドに保存、マイページから再編集・複製できます。取引先マスタ・単価マスタに登録しておけば、次回以降の入力時間が大幅に短縮されます。",
    icon: Save,
    hint: null,
  },
];

const featureBlocks = [
  {
    icon: Star,
    title: "単価マスタ",
    body: "よく使う品目・単価・費目を登録。2通目以降の作成時間が1/10に。",
  },
  {
    icon: Users,
    title: "取引先マスタ",
    body: "過去の発注者を登録。案件ごとにワンクリックで入力完了。",
  },
  {
    icon: Download,
    title: "Excelインポート",
    body: "既存のExcel見積を取り込み、セクション・明細を自動展開。",
  },
];

export default function HowToPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-xs text-gray-500 mb-2">
            <Link href="/construction" className="hover:text-gray-700">
              ケンミツ
            </Link>
            <span className="mx-1">/</span>
            <span className="text-gray-700">使い方ガイド</span>
          </nav>
          <Link
            href="/construction"
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1.5"
          >
            <HardHat className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
            ← ケンミツトップに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          使い方ガイド
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          ケンミツの使い方を全8ステップで解説。改正建設業法2025対応の見積書を、<strong>最短3分</strong>で作成できます。
        </p>

        <div className="bg-kenmitsu-navy50 border border-kenmitsu-navy100 rounded-xl p-4 mb-8 text-sm">
          <p className="font-bold text-kenmitsu-navy900 mb-1">💡 最初にやっておくと快適</p>
          <ul className="list-disc pl-5 text-kenmitsu-navy900 space-y-0.5">
            <li>施工者情報を一度入力して「自社情報を保存」を押す → 次回から自動入力</li>
            <li>よく使う品目は「単価マスタ」に登録 → 2通目から一瞬</li>
            <li>アカウント登録すると見積履歴が保存され、ブラウザ跨いでもマスタが同期されます</li>
          </ul>
        </div>

        <ol className="space-y-5">
          {steps.map(({ num, title, description, icon: Icon, hint }) => (
            <li
              key={num}
              className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4"
            >
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-kenmitsu-navy text-white font-bold flex items-center justify-center">
                  {num}
                </div>
                {num < steps.length && (
                  <div className="w-0.5 h-full bg-kenmitsu-navy100 mt-2" />
                )}
              </div>
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2.25} />
                  <h2 className="text-base font-bold text-gray-900">{title}</h2>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                {hint && (
                  <div className="mt-3 bg-kenmitsu-navy50 rounded-lg p-3 border border-kenmitsu-navy100">
                    <p className="text-[10px] font-bold text-kenmitsu-navy mb-1.5">{hint.label}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {hint.items.map((item, i) => (
                        <li key={i} className="text-[11px] text-kenmitsu-navy900 leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">よく使う機能</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featureBlocks.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-kenmitsu-navy50 border border-kenmitsu-navy100 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-kenmitsu-navy" strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            有料プランにアップグレードする手順
          </h2>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>
              <Link href="/construction/start" className="text-kenmitsu-navy hover:underline">
                登録ページ
              </Link>
              でメールアドレスを登録
            </li>
            <li>
              <Link href="/construction#solo-upgrade" className="text-kenmitsu-navy hover:underline">
                料金プラン
              </Link>
              の「月契約で始める」または「年契約で始める」をクリック
            </li>
            <li>Stripe の決済画面でクレジットカード情報を入力</li>
            <li>決済完了後、マイページで自動的に有料プランに切替わる</li>
            <li>
              解約は
              <Link
                href="/construction/mypage"
                className="text-kenmitsu-navy hover:underline mx-1"
              >
                マイページ
              </Link>
              の「プラン管理・解約」からワンクリックで可能
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">関連ページ</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { href: "/construction/faq", label: "よくある質問（FAQ）" },
              { href: "/construction/checklist", label: "改正建設業法2025対応チェックリスト" },
              { href: "/guide/kaisei-kensetsu-2025", label: "改正建設業法2025【完全ガイド】" },
              { href: "/guide/legal-welfare", label: "法定福利費の計算方法と業界標準料率" },
              { href: "/guide/freelance-law-construction", label: "フリーランス新法と建設業一人親方" },
              { href: "/contact", label: "お問い合わせ" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-kenmitsu-navy hover:text-kenmitsu-navy transition-colors text-sm"
              >
                <span>{l.label}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            まずは無料で試してみてください
          </h2>
          <p className="text-gray-400 mb-4 text-sm">
            メアド登録だけ・カード不要 / 改正建設業法のルールに沿った見積書は有料プラン（月¥980）から
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
