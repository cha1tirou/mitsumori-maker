# 09. アナリティクスと広告の初期セットアップ（ブラウザ作業）

このドキュメントは **Claude AI（claude.ai）に貼り付けて、一緒に進めてもらう想定** の手順書です。コード側の実装は完了しているので、あとは Google の各管理画面でクリック操作するだけです。

---

## 前提

コード側で既に完了していること（ブラウザ作業は不要）:

- ✅ GA4 タグ (`G-13VR2YEZKB`) が layout.tsx に埋め込み済み
- ✅ Meta Pixel は `NEXT_PUBLIC_META_PIXEL_ID` 環境変数で有効化
- ✅ Google Ads コンバージョンタグは `NEXT_PUBLIC_GOOGLE_ADS_ID` で有効化
- ✅ 7 種類のコンバージョンイベントの発火実装
- ✅ SPA 遷移時のページビュー計測（`PageviewTracker.tsx`）
- ✅ Pricing セクションの表示計測（`PricingSectionTracker.tsx`）

## 発火されるイベント一覧

| イベント名 | 発火タイミング | 発火場所 |
|---|---|---|
| `construction_lp_view` | LP (`/construction`) 到達 | `TrackPageView` |
| `construction_pricing_view` | Pricing セクション 30% 表示 | `PricingSectionTracker` |
| `construction_tool_start` | 見積作成画面起動 | `ConstructionEditor` |
| `construction_pdf_download` | PDF ダウンロード成功 | `ConstructionPdfDownloadButton` |
| `construction_signup` | 新規登録送信 | `/construction/login` |
| `construction_subscribe_solo` | Solo プラン決済ボタン押下 | `PlanCheckoutButton` |
| `construction_subscribe_team` | Team プラン決済（停止中） | `PlanCheckoutButton` |

---

## Step 1. GA4 管理画面で主要イベントを指定（5 分）

GA4 にイベントは送信されますが、**「主要イベント」（旧コンバージョン）としてマークしないと Google Ads にインポートできない**ため、必ず設定してください。

### 手順

1. https://analytics.google.com/ にログイン
2. プロパティ選択: `mitsumori-maker.com` (ID: G-13VR2YEZKB)
3. 左下の **管理**（歯車アイコン）→ **データ表示** → **主要イベント**
4. 右上の **新しい主要イベント** ボタン
5. 以下の 4 つを順に追加:
   - `construction_subscribe_solo` （Solo 契約・最重要）
   - `construction_pdf_download` （PDF ダウンロード・マイクロ CV）
   - `construction_signup` （新規登録）
   - `construction_pricing_view` （Pricing 表示・広告学習用）
6. 各イベントのトグルを ON に

### 動作確認

1. GA4 → **レポート** → **リアルタイム**
2. 別タブで https://mitsumori-maker.com/construction を開く
3. 数秒以内に「過去 30 分間のユーザー」に自分が表示される
4. 「イベント数」セクションに `page_view` / `construction_lp_view` が出ていれば OK
5. Pricing までスクロールすると `construction_pricing_view` も追加される

### もし表示されない場合

- ブラウザのアドブロッカーが有効なら一旦 OFF にして確認（ただし実ユーザーはアドブロッカーで計測を外すことが多いので、計測漏れは仕様として受容）
- 5 分経っても何も出ない場合はタグ設定ミスの可能性 → Vercel 本番デプロイが最新か確認

---

## Step 2. Google Ads アカウント開設（15 分）

### 手順

1. https://ads.google.com にアクセス → Google アカウントでログイン
2. 「新しいキャンペーン」案内をスキップして **エキスパートモード** を選択
3. 通貨: **日本円 (JPY)**、タイムゾーン: **(GMT+09:00) 東京**
4. 支払い情報登録（クレジットカード）

### 💡 プロモコード確認

新規アカウント開設時に「¥10,000 分の無料クレジット」のプロモコードが付与されることがあります。画面右上の通知を確認してください。表示されない場合は、Google で「Google Ads プロモーション コード 新規」で検索するとサードパーティ経由で入手できることもあります。

---

## Step 3. Google Ads と GA4 をリンク（5 分）

Google Ads 側で GA4 のコンバージョンを使えるようにします。

1. Google Ads 管理画面 → 右上の **ツールと設定** → **設定** セクション → **リンクされたアカウント**
2. **Google Analytics (GA4)** のカードで **詳細** → **リンク**
3. GA4 プロパティ `mitsumori-maker.com` を選択
4. 確認画面で **リンク**

完了後、GA4 の主要イベントが Google Ads にインポートできるようになります。

---

## Step 4. Google Ads でコンバージョンをインポート（5 分）

### 手順

1. Google Ads → **ツールと設定** → **測定** → **コンバージョン**
2. **新しいコンバージョン アクション** → **インポート** → **Google Analytics 4 プロパティ**
3. GA4 プロパティを選択 → Step 1 で主要イベント指定した 4 つが表示される
4. 以下 4 つを選択してインポート:
   - `construction_subscribe_solo` （コンバージョンの主要目標）
   - `construction_pdf_download` （補助）
   - `construction_signup` （補助）
   - `construction_pricing_view` （補助）
5. 各コンバージョンの設定:
   - **カテゴリ**: `construction_subscribe_solo` は「購入」、その他は「その他」or 「リード」
   - **値**: `construction_subscribe_solo` に `9800`（年間 LTV の目安）、その他は空欄 or 0
   - **コンバージョンに含める**: `construction_subscribe_solo` のみ ON（他はデータ分析用）
   - **カウント方法**: `construction_subscribe_solo` は「1 回のみ」、他は「毎回」

これで Google Ads が `construction_subscribe_solo` を最終目標として広告を最適化するようになります。

---

## Step 5. Google Ads タグをコードで有効化（任意・精度向上）

GA4 経由のコンバージョン計測だけでも機能しますが、**Google Ads 独自のコンバージョンタグ**を直接埋め込むと計測精度が上がります。

### 手順

1. Google Ads → コンバージョンアクションの詳細 → **タグ設定** → **タグをインストール**
2. 表示される `AW-XXXXXXXXX`（Google Ads ID）をコピー
3. 各コンバージョンの **送信先** ラベル（例: `AW-XXXXXXXXX/abcDEF123`）もコピー
4. Vercel → Settings → Environment Variables に以下を追加（Production）:

```
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GADS_CONV_SUB_SOLO=abcDEF123XYZ
NEXT_PUBLIC_GADS_CONV_PDF=ghiJKL456XYZ
NEXT_PUBLIC_GADS_CONV_SIGNUP=mnoPQR789XYZ
```

5. **Redeploy** で反映

### 動作確認

1. Google Ads → **ツールと設定** → **Google タグアシスタント** （またはブラウザ拡張「Tag Assistant Legacy」）
2. 本番サイトで実際のイベント（例: PDF ダウンロード）を発火
3. タグアシスタントで `AW-XXXXXXXXX/abcDEF123` の送信が確認できれば OK

---

## Step 6. Google Search Console で sitemap を再送信（5 分）

sitemap を最新版に差し替えた（2026-04-22）ので、再送信でクローラーに通知します。

1. https://search.google.com/search-console にログイン
2. プロパティ選択: `mitsumori-maker.com`
3. 左メニュー **サイトマップ**
4. 既に `sitemap.xml` が登録済みのはずなので、URL の右の **⋮** → **削除** （任意）
5. 再度「新しいサイトマップの追加」に `sitemap.xml` を入力して **送信**

これでクローラーが 24 時間以内に再訪問します。

---

## Step 7. キャンペーン作成（30 分・実際の広告出稿）

前回ユーザーと決めた戦略:

- 月予算: ¥10,000〜¥15,000 でテスト開始
- Tier 1 改正建設業法系メイン、Tier 2 工事見積書系をサブ

### キャンペーン #1: 改正建設業法

1. Google Ads → **キャンペーン** → **新規キャンペーン**
2. 目標: **販売 / リード**（「construction_subscribe_solo」コンバージョンに最適化）
3. キャンペーンタイプ: **検索**
4. 結果: **ウェブサイトへのアクセス** を選択、URL: `https://mitsumori-maker.com/construction`
5. キャンペーン名: `改正建設業法2025_見積書`
6. 入札戦略: 初月は **クリック数の最大化**、CPC 上限 ¥200
7. 日予算: ¥400（月 ¥12,000 相当）
8. ネットワーク: **Google 検索**のみ ON、ディスプレイは OFF（費用ムダ食い防止）
9. キーワード設定:
```
[改正建設業法 2025 対応 見積書]
[改正建設業法 見積書]
[建設業法 見積書 対応]
[一式 禁止 見積書]
"改正建設業法 見積書"
"労務費 内訳 見積書"
```
10. 広告文（レスポンシブ検索広告）:
```
見出し1: 改正建設業法2025対応の見積書
見出し2: 「一式」禁止への自動対応
見出し3: 労務費内訳を自動計算
見出し4: 月¥980・登録不要・PDF無制限
見出し5: 一人親方向け見積書ツール

説明文1: 2025年12月施行の改正建設業法に自動対応。労務費内訳・費目分類・一式禁止警告で法令違反を防ぎます。
説明文2: 一人親方・小規模工務店向け月¥980。登録不要で今すぐお試し。freee/MFより低価格、ANDPADより軽量。
```

### キャンペーン #2: 工事見積書系

1. 同じ手順でキャンペーン名: `工事見積書_一人親方`
2. 日予算: ¥170（月 ¥5,000 相当）
3. キーワード:
```
[工事見積書 作成 無料]
[工事見積書 無料]
[工事見積書 テンプレート]
[建設業 見積書 無料]
[建設業 見積書 アプリ]
"工事見積書 スマホ"
```
4. 広告文:
```
見出し1: 建設業の見積書を月¥980で
見出し2: 改正建設業法2025対応・自動チェック
見出し3: 一人親方・小規模工務店向け
見出し4: 登録不要・スマホで3分・PDF出力
```

### 広告表示オプション（必ず全部）

- **サイトリンク**: 「料金プラン → /construction#pricing」「使い方 → /construction/how-to」「FAQ → /construction/faq」「チェックリスト → /construction/checklist」
- **コールアウト**: 「登録不要」「月¥980〜」「改正法2025対応」「PDF無制限」「スマホ対応」「いつでも解約可」
- **構造化スニペット**: タイプ「サービス」→ 値「見積書作成 / 建設業法対応 / 工種プリセット / PDF出力 / 取引先マスタ / 工事写真添付」

これで広告枠が拡大し、CTR が 20〜30% 上がります。

---

## Step 8. 運用開始後の監視（毎週）

### 2 週間後のチェック項目

1. Google Ads → **キャンペーン** → 詳細指標で以下を確認:
   - **CTR**（3% 以上が健全）
   - **CPC**（想定 ¥60〜¥200）
   - **コンバージョン数**
   - **CPA**（¥8,000 以下に抑えたい）

2. Google Ads → **キーワード** → **検索語句**
   - 実際に検索された語句を見て、CV しないものは除外キーワードへ
   - CV する語句は完全一致キーワードに追加

3. 判定:
   - ✅ CTR 3%+ / CV 1件+ / CPA ¥8,000- → 月予算 ¥30,000〜¥50,000 に増額
   - 🟡 CTR あり / CV 0 → LP 側の問題 → Hero 文言や Pricing を調整
   - 🔴 CTR 1%- / CV 0 → 広告路線から別チャネル検討

---

## まとめ（チェックリスト）

- [ ] Step 1. GA4 で 4 つの主要イベント指定 + リアルタイム動作確認
- [ ] Step 2. Google Ads アカウント開設（JPY / 東京）
- [ ] Step 3. Google Ads と GA4 をリンク
- [ ] Step 4. Google Ads で 4 つのコンバージョンをインポート
- [ ] Step 5. （任意）Google Ads 直接タグを Vercel 環境変数に追加
- [ ] Step 6. Search Console で sitemap 再送信
- [ ] Step 7. キャンペーン #1 と #2 を作成（広告表示オプション全部 ON）
- [ ] Step 8. 2 週間後の運用監視スタート

Claude AI に「このチェックリストを一緒に進めたい」と伝えて、1 項目ずつ画面共有しながら進めると最速です。画面遷移で迷ったら、そのページのスクリーンショットを Claude に送れば次のクリック先を案内できます。
