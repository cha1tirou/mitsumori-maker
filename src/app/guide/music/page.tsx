import type { Metadata } from "next";
import Link from "next/link";
import GuideJsonLd from "@/components/GuideJsonLd";

export const metadata: Metadata = {
  title: "音楽教室・演奏業の見積書の書き方ガイド【記載例・料金相場付き】 | 見積書メーカー",
  description:
    "音楽教室・楽器講師・フリーランスミュージシャンの見積書の書き方。レッスン料・出演料・音楽制作費の記載例と料金相場を解説。",
  openGraph: {
    title: "音楽教室・演奏業の見積書の書き方ガイド【記載例・料金相場付き】 | 見積書メーカー",
    description:
      "音楽教室・楽器講師・フリーランスミュージシャンの見積書の書き方。レッスン料・出演料・音楽制作費の記載例と料金相場を解説。",
    url: "https://mitsumori-maker.com/guide/music",
    siteName: "見積書メーカー",
    locale: "ja_JP",
    type: "article",
    images: [
      {
        url: "https://mitsumori-maker.com/api/og?title=%E9%9F%B3%E6%A5%BD%E6%95%99%E5%AE%A4%E3%83%BB%E6%BC%94%E5%A5%8F%E6%A5%AD%E3%81%AE%E8%A6%8B%E7%A9%8D%E6%9B%B8%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9",
        width: 1200,
        height: 630,
        alt: "音楽教室・演奏業の見積書の書き方",
      },
    ],
  },
  alternates: {
    canonical: "https://mitsumori-maker.com/guide/music",
  },
};

export default function MusicGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GuideJsonLd
        title="音楽教室・演奏業の見積書の書き方ガイド【記載例・料金相場付き】"
        description="音楽教室・楽器講師・フリーランスミュージシャンの見積書の書き方。レッスン料・出演料・音楽制作費の記載例と料金相場を解説。"
        slug="music"
        datePublished="2026-04-20"
        dateModified="2026-04-20"
      />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-gray-900">見積書メーカー</Link>
            <span className="mx-2">/</span>
            <span>ガイド</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800">音楽教室・演奏業の見積書</span>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            音楽教室・演奏業の見積書の書き方ガイド【記載例・料金相場付き】
          </h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年4月20日</p>

          <p className="text-gray-700 leading-relaxed mb-8">
            楽器レッスン・音楽教室の経営者、ライブやイベントに出演するミュージシャン、音楽制作・編曲を請け負うサウンドクリエイターなど、音楽に関わるビジネスは多岐にわたります。しかし、クライアントや生徒との間でトラブルが起きやすいのも事実で、「思っていた料金と違う」「キャンセルの扱いがわからない」といった問題が後を絶ちません。こうした問題を未然に防ぐためには、業務内容・料金・条件を明確にした見積書の作成が不可欠です。この記事では、音楽教室・楽器講師・イベント演奏・音楽制作のそれぞれについて、見積書の書き方・記載項目・料金相場・注意点を詳しく解説します。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            音楽教室・楽器講師の見積書の書き方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            個人・法人の音楽教室や楽器講師がレッスン料の見積書を発行する場面は、法人向けの出張レッスン、企業研修・ウェルネスプログラムへの参加、複数クラスのパッケージ契約などで特に多く見られます。個人の生徒に対しては都度請求書で済む場合も多いですが、法人や団体との取引では必ず見積書を用意しましょう。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            記載すべき主な項目
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>レッスン料</strong>：1回あたりの単価×回数で記載する。「60分レッスン×月4回」のように具体的に。
            </li>
            <li>
              <strong>レッスン形式</strong>：個人レッスン・グループレッスン・オンラインレッスンの別を明記。形式により単価が異なるため、混在する場合は別行に分ける。
            </li>
            <li>
              <strong>教材・テキスト代</strong>：使用する楽譜・教則本・プリント教材の費用。購入するか講師が用意するかも明記する。
            </li>
            <li>
              <strong>交通費</strong>：出張レッスンの場合は実費を記載。公共交通機関の場合は「実費精算」、車の場合は「〇円/km」のように基準を示す。
            </li>
            <li>
              <strong>発表会・イベント参加費</strong>：年間を通じたパッケージ見積もりでは、発表会の会場費・衣装代のうち負担分も含める。
            </li>
            <li>
              <strong>施設使用料</strong>：スタジオやレンタルスペースを使用する場合、その費用負担区分を明記する。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            記載例（法人向け出張ピアノレッスンの場合）
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">項目名</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">数量</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">単価</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">個人レッスン料（60分）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">8回</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">8,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">64,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">グループレッスン料（90分・最大5名）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">4回</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">15,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">60,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">テキスト・楽譜代</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">3,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">3,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">出張交通費（往復）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">12回</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1,200</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">14,400</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            料金相場の目安
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>個人レッスン（60分）：5,000〜15,000円（楽器・経験年数・地域により異なる）</li>
            <li>グループレッスン（60〜90分）：3,000〜8,000円/人</li>
            <li>法人向け出張レッスン（60分）：10,000〜30,000円＋交通費</li>
            <li>オンラインレッスン（45〜60分）：4,000〜12,000円</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            イベント演奏・ライブ演奏の見積書の書き方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            結婚式、パーティー、企業イベント、地域フェスティバル、商業施設のBGM演奏など、演奏業の場面は多様です。演奏の見積書では、演奏そのものの費用に加えて、機材・PA・移動・宿泊といった付帯費用を漏れなく記載することが重要です。特に複数の演者や機材が絡む大規模なイベントでは、見積もりが不十分だと赤字になるリスクがあります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            記載すべき主な項目
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>出演料</strong>：演奏時間・本数・演者数を明記した上で金額を提示。「ソロ演奏45分×2セット」のように具体的に記載する。
            </li>
            <li>
              <strong>機材費</strong>：ギターアンプ、キーボード、ドラムセット、マイクなど持ち込み機材の費用。会場側に設備がある場合はその旨を備考に記載する。
            </li>
            <li>
              <strong>PA（音響）費</strong>：PA機材（ミキサー・スピーカー・モニター等）および音響エンジニアの費用を分けて記載する。
            </li>
            <li>
              <strong>交通費</strong>：演者全員分の往復交通費を実費または概算で記載。遠方の場合は新幹線・飛行機等の交通手段も明記する。
            </li>
            <li>
              <strong>宿泊費</strong>：前泊・後泊が必要な場合は1泊あたりの上限額と泊数を記載する。
            </li>
            <li>
              <strong>リハーサル費</strong>：本番前日のリハーサルが必要な場合、別途費用として計上する。
            </li>
            <li>
              <strong>セットリスト・編曲費</strong>：クライアントの希望曲を特定の編成にアレンジする場合は、別途費用として明示する。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            記載例（結婚式でのバンド演奏の場合）
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-700 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">項目名</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">数量</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">単価</th>
                  <th className="border border-gray-200 px-3 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">出演料（4ピースバンド・披露宴90分）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">150,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">PA機材費・音響エンジニア費</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">50,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">50,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">機材運搬費（ドラムセット・アンプ一式）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">20,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">20,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">リハーサル費（前日・2時間）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">30,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">30,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">交通費（メンバー4名・往復実費）</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">1式</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">16,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">16,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">特別リクエスト楽曲アレンジ費</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">2曲</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">15,000</td>
                  <td className="border border-gray-200 px-3 py-2 text-right">30,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            演奏業の料金相場の目安
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>ソロ演奏（60〜90分）：30,000〜100,000円（楽器・経験・知名度による）</li>
            <li>デュオ・トリオ（90分）：60,000〜150,000円</li>
            <li>バンド4〜5ピース（90〜120分）：100,000〜300,000円</li>
            <li>コーラス・合唱グループ：80,000〜200,000円</li>
            <li>PA・音響エンジニア：30,000〜80,000円（規模による）</li>
            <li>DJ（3〜4時間）：50,000〜150,000円</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            音楽制作・編曲の見積書の書き方
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            企業のCMソング・ジングル制作、ゲームやアプリのBGM制作、アーティストへの楽曲提供、MV用の楽曲制作など、音楽制作の需要は広がっています。音楽制作の見積書で特に重要なのは、制作費の内訳に加えて「著作権・使用許諾の範囲」を明確に定めることです。これを怠ると、後になって「商業利用できないのか」「別の媒体でも使いたい」といったトラブルに発展するケースがあります。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            記載すべき主な項目
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>楽曲制作費</strong>：作曲・編曲・レコーディングを分けて記載する。「作曲：○万円」「編曲：○万円」「レコーディング・ミックス：○万円」のように細分化すると透明性が高まる。
            </li>
            <li>
              <strong>演奏・録音費</strong>：スタジオミュージシャンを起用する場合、人数・パート・拘束時間を明記して計上する。
            </li>
            <li>
              <strong>歌詞作成費</strong>：作詞が別途依頼の場合は作詞料として独立して記載する。
            </li>
            <li>
              <strong>ミックス・マスタリング費</strong>：音源の仕上げ作業費。音楽制作の最終工程として重要。
            </li>
            <li>
              <strong>著作権・使用許諾の記載</strong>：最も重要な項目。見積書の備考欄に「著作権の帰属」「使用許諾の範囲（媒体・地域・期間）」「二次利用・改変の可否」を必ず明記する。
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            著作権・使用許諾の書き方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            音楽制作の見積書では、著作権の扱いを備考欄に明記しておくことが極めて重要です。主なパターンは以下のとおりです。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>著作権譲渡の場合</strong>：「本楽曲の著作権（著作財産権）は、お支払い完了をもって貴社に全て譲渡します」と記載する。著作権譲渡は一般的に制作費に追加して別途費用を設定することが多い。
            </li>
            <li>
              <strong>使用許諾（ライセンス）の場合</strong>：「本楽曲の著作権は制作者に帰属します。使用許諾の範囲は以下のとおりです：媒体・使用期間・使用地域・二次利用の可否」のように明確に定める。
            </li>
            <li>
              <strong>JASRAC登録の扱い</strong>：楽曲をJASRACに信託登録するかどうかも明記が必要。商業利用する場合は登録の有無によって追加手続きが発生することがある。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            特に広告・CMで使用する楽曲の場合、放送局・媒体・使用期間・使用エリアによって追加の使用許諾料が発生することがあります。初期見積もりの段階で「本見積もりは〇〇媒体・〇年間の使用を想定しています。媒体・期間が変更になる場合は別途お見積もりします」と記載しておくと安心です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            音楽制作の料金相場の目安
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>ジングル・BGM制作（30秒〜1分）：30,000〜100,000円</li>
            <li>楽曲制作フル（作曲・編曲・録音・ミックス・マスタリング込み）：150,000〜500,000円</li>
            <li>編曲のみ（既存メロディへのアレンジ）：50,000〜200,000円</li>
            <li>ゲーム・アプリBGM（複数トラック）：1曲あたり30,000〜100,000円</li>
            <li>著作権譲渡費用：制作費の50〜200%（契約次第）</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            フリーランスミュージシャンの単価設定とキャンセルポリシーの記載
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            単価設定の考え方
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            フリーランスのミュージシャンや音楽講師が単価を設定する際は、以下の要素を考慮しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>準備時間を含めた時給換算</strong>：演奏時間だけでなく、準備・移動・打ち合わせの時間も含めて計算する。たとえば「90分演奏＋往復2時間＋準備1時間＝合計4.5時間」で考える。
            </li>
            <li>
              <strong>機材の減価償却</strong>：楽器・機材の購入費、メンテナンス費、弦や消耗品の費用を年間コストとして計算し、単価に上乗せする。
            </li>
            <li>
              <strong>スタジオ練習費・レッスン費</strong>：技術向上のための投資費用も考慮する。
            </li>
            <li>
              <strong>市場相場との比較</strong>：同じ楽器・ジャンル・経験年数の相場を調査し、極端に下回らない価格設定にする。価格競争に巻き込まれると品質低下・疲弊につながる。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            初めてのクライアントに価格を説明しやすくするため、見積書には「レッスン内容」「対象レベル」「使用教材」「サポート体制（メッセージ対応など）」を明記し、価格の根拠を示しましょう。価格だけでなく、提供する価値を伝えることが大切です。
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            キャンセルポリシーの記載方法
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            音楽業界では、直前のキャンセルが演者に大きな損失をもたらすことがあります。特に結婚式や企業イベントでは、出演者の確保・機材の手配・リハーサルの実施など、事前準備に多くのコストがかかります。キャンセルポリシーを見積書の備考欄に明記しておくことで、クライアントとのトラブルを防ぎましょう。
          </p>

          <div className="bg-gray-100 rounded-lg p-5 mb-6 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold mb-2">キャンセルポリシーの記載例</p>
            <ul className="space-y-1 list-none">
              <li>・公演30日以上前のキャンセル：キャンセル料なし（着手金は返金なし）</li>
              <li>・公演15〜29日前のキャンセル：見積総額の30%</li>
              <li>・公演7〜14日前のキャンセル：見積総額の50%</li>
              <li>・公演3〜6日前のキャンセル：見積総額の70%</li>
              <li>・公演2日前〜当日のキャンセル：見積総額の100%</li>
              <li>・天候・災害等の不可抗力によるキャンセル：双方協議の上で決定</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            事前入金条件の記載
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            演奏業・音楽制作では、着手金（前払い）を設定することが一般的です。特に初めて取引するクライアントや規模の大きい案件では、着手金を受け取ることでリスクを軽減できます。見積書の支払い条件欄に以下のように記載しましょう。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">
            <li>着手金：見積総額の30〜50%（契約時に請求）</li>
            <li>残金：公演・納品完了後〇日以内に振込</li>
            <li>振込手数料：クライアント負担</li>
            <li>銀行口座：（口座情報を記載）</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            レッスン料の場合は「月謝制（月初に翌月分を前払い）」や「10回チケット制（先払い）」のように、支払い方法を明確にしておくと未収トラブルを防げます。
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            見積書作成のポイントまとめ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            音楽関連のビジネスで見積書を作成するうえで、特に押さえておきたいポイントをまとめます。
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-2">
            <li>
              <strong>業務内容を具体的に記載する</strong>：「演奏一式」ではなく「ピアノソロ演奏60分×2セット（セットリスト5曲）」のように具体的に書く。
            </li>
            <li>
              <strong>付帯費用を漏れなく計上する</strong>：交通費・機材費・PA費・リハーサル費など、本体費用以外のコストを事前に洗い出して見積もりに含める。
            </li>
            <li>
              <strong>著作権・使用許諾の範囲を明文化する</strong>：音楽制作では特に重要。トラブル防止のために備考欄に必ず記載する。
            </li>
            <li>
              <strong>キャンセルポリシーと支払い条件を明記する</strong>：後からの追加請求や未収を防ぐため、見積書の備考欄に記載しておく。
            </li>
            <li>
              <strong>見積有効期限を設ける</strong>：「見積有効期限：発行日より30日間」と記載することで、長期間の値段保証を回避できる。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            見積書はクライアントとの信頼関係を築く重要な書類です。丁寧に作成することで、プロとしての信頼性を高めることができます。見積書メーカーを使えば、上記のような明細を簡単に作成・PDF化できますので、ぜひ活用してみてください。
          </p>
        </article>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">関連ガイド</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guide/how-to-write" className="text-blue-600 hover:underline text-sm">
                見積書の書き方・必要項目をわかりやすく解説
              </Link>
            </li>
            <li>
              <Link href="/guide/event" className="text-blue-600 hover:underline text-sm">
                イベント業の見積書の書き方ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/freelance" className="text-blue-600 hover:underline text-sm">
                フリーランス・個人事業主のための見積書ガイド
              </Link>
            </li>
            <li>
              <Link href="/guide/lump-sum" className="text-blue-600 hover:underline text-sm">
                見積書の「一式」の書き方ガイド
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
