# 10. Claude in Chrome に渡す自動セットアップ指示書（GA4 / Search Console）

このファイルの本文を**そのまま Claude (claude.ai の Chrome 拡張、もしくは Claude for Chrome) にコピペ**して「このタスクを順に進めて」と伝えてください。Claude がブラウザを操作して GA4 と Search Console のセットアップを代行します。

**Google Ads の開設・キャンペーン作成はユーザー自身で行う**ため、この指示書には含まれていません。

ユーザーに求められる作業:
- Google アカウントへのログイン（Claude はパスワードを入力しない）
- 2 段階認証（必要時）

---

## ここから下を Claude にコピペ

---

あなたは私のアシスタントとして、ケンミツ（https://mitsumori-maker.com/construction）のアナリティクス基盤を広告運用に向けて整えるセットアップを代行してください。

Google Ads のキャンペーン作成は私自身で別途行うため、このタスク群には含めません。あなたは **GA4 と Search Console の設定** のみを担当してください。

以下のタスクを **1 つずつ順番に** 実行してください。各タスクの完了を確認してから次に進むこと。パスワード入力や 2FA などセキュリティに関わる操作は必ず私に確認を求めて停止してください。

実行のルール:

- 画面遷移ごとに「今このページで〜を行います」と一言報告してから操作
- 予期しない画面や UI 変更があった場合は勝手に進めず、私に確認
- Google アカウントのログイン画面が出たら停止して私に操作を委ねる
- 各タスク完了時に要約を一言報告

---

## タスク 1: GA4 で主要イベント（コンバージョン）を指定

1. 新規タブで https://analytics.google.com/ を開く
2. ログイン画面が出たら停止して私にログインを委ねる
3. ログイン後、プロパティ選択で「mitsumori-maker.com」または測定 ID `G-13VR2YEZKB` を選ぶ。見つからない場合はアカウント一覧から探す
4. 左下の歯車アイコン（「管理」）をクリック
5. 左メニューから「データ表示」→「主要イベント」（英語 UI なら Key events）を開く
6. 「新しい主要イベント」（New key event）ボタンをクリック
7. 以下の 4 つのイベント名を **1 つずつ** 追加する:
   - `construction_subscribe_solo`
   - `construction_pdf_download`
   - `construction_signup`
   - `construction_pricing_view`
8. 各イベントで「主要イベントとしてマーク」のトグルを ON
9. 完了したら、設定済みイベント一覧のスクリーンショットを私に見せて確認

---

## タスク 2: GA4 リアルタイムで計測動作確認

1. 別タブで https://mitsumori-maker.com/construction を開く
2. ページを下までスクロールして、Pricing セクションで 3 秒ほど停止
3. さらに https://mitsumori-maker.com/construction/new を開いて 3 秒ほど停止
4. GA4 タブに戻り、左メニューの「レポート」→「リアルタイム」を開く
5. 以下を確認:
   - 「過去 30 分間のユーザー数」が 1 以上
   - 「イベント数」に以下が表示されているか:
     - `construction_lp_view` （LP 到達時）
     - `construction_pricing_view` （Pricing スクロール時）
     - `construction_tool_start` （見積作成画面起動時）
     - `page_view` （ページ遷移時）
6. 全部確認できたらスクリーンショットを撮って私に報告
7. 何か出ていないイベントがあれば、何が欠けているか報告

---

## タスク 3: GA4 拡張計測機能の確認

1. GA4 管理 → 「データストリーム」を開く
2. `mitsumori-maker.com` のストリームをクリック
3. 「拡張計測機能」セクションまでスクロール
4. 以下がすべて ON になっていることを確認:
   - ページビュー (Page views)
   - スクロール数 (Scrolls)
   - 離脱クリック (Outbound clicks)
   - サイト内検索 (Site search)
   - フォームの操作 (Form interactions)
   - 動画エンゲージメント (Video engagement)
   - ファイルのダウンロード (File downloads)
5. OFF のものがあれば ON に切り替え
6. 完了したらスクリーンショットを取って私に報告

---

## タスク 4: Search Console と GA4 のリンク

1. GA4 管理 → 左メニューの「製品リンク」の中から **「Search Console のリンク」** をクリック
2. 「リンク」ボタン → `mitsumori-maker.com` プロパティを選択
3. 「ウェブストリーム」で `mitsumori-maker.com` ストリームを選ぶ
4. 「送信」「リンク」で完了
5. リンク済みに `mitsumori-maker.com` が出ていることを確認

もし既にリンク済みの場合はその旨を報告して次へ進む。

---

## タスク 5: Search Console で sitemap 再送信

1. 新規タブで https://search.google.com/search-console を開く
2. ログインが必要なら私に委ねる
3. プロパティ一覧から `mitsumori-maker.com`（`sc-domain:mitsumori-maker.com` か `https://mitsumori-maker.com/` 表記）を選択
4. 左メニュー「サイトマップ」を開く
5. 既に `sitemap.xml` が登録されている場合:
   - URL の右側「⋮」→「削除」を選択（任意、再送信で十分だが古いキャッシュをクリアするため）
6. 「新しいサイトマップの追加」入力欄に `sitemap.xml` と入力して「送信」
7. 「送信しました」「取得できました」の表示を確認してスクリーンショットで報告

---

## タスク 6: Search Console でインデックス状況を確認

1. Search Console 左メニュー「ページ」（または「カバレッジ」）を開く
2. 「インデックス登録済み」のページ数を確認
3. 「インデックス未登録」の中で /construction 系のページがあるか確認
4. もし `/construction`（LP）がインデックス未登録の場合、重要なのでチェック:
   - 右上「URL 検査」ツールで `https://mitsumori-maker.com/construction` を入力
   - 「URL が Google に登録されていません」表示なら「インデックス登録をリクエスト」ボタンをクリック
5. 同様に以下の URL も 1 つずつ URL 検査してインデックス登録リクエスト:
   - `https://mitsumori-maker.com/construction`
   - `https://mitsumori-maker.com/construction/new`
   - `https://mitsumori-maker.com/construction/checklist`
   - `https://mitsumori-maker.com/construction/how-to`
   - `https://mitsumori-maker.com/construction/faq`
6. リクエスト送信後、各 URL の状況をスクショで報告

---

## タスク 7: Search Console の検索パフォーマンスざっくり確認

1. Search Console 左メニュー「検索パフォーマンス」
2. 期間を「過去 28 日間」に設定
3. 「クエリ」タブで、以下の情報を報告:
   - クリック数合計
   - 表示回数合計
   - 平均 CTR
   - 平均掲載順位
4. 「ページ」タブで、`/construction` 系のページのうち**クリック数上位 5 件**を報告（URL と クリック数）

これで広告運用前の現状ベースラインがわかる。

---

## タスク 8: Google AdSense のステータス確認

1. 新規タブで https://www.google.com/adsense/ を開く
2. ログインが必要なら私に委ねる
3. アカウントのトップページで「サイトのステータス」を確認
4. `mitsumori-maker.com` のステータスを報告:
   - 「審査待ち」
   - 「準備完了」
   - 「停止」
   - 「アクセスできません」
   - 等
5. ステータスのスクリーンショットを撮る

---

## タスク 9: 完了レポート

すべてのタスク完了後、以下を報告:

1. GA4 主要イベント 4 件の登録完了
2. GA4 リアルタイムで計測が生きていることを確認
3. GA4 拡張計測機能の有効化状況
4. Search Console ↔ GA4 リンク完了
5. Search Console sitemap 再送信完了
6. 主要ページ 5 件のインデックス登録リクエスト送信
7. 現状の検索パフォーマンスベースライン（クリック・表示・CTR・順位）
8. AdSense ステータス

私が最終確認します。

---

## エラー・予期しない状況の対応ルール

- **画面が英語 UI だった場合**: 日本語 UI との対応は論理的に判断（「Key events」=「主要イベント」など）
- **ボタンやメニュー位置が記載と違う場合**: Google のUI 更新で変わっている可能性大。スクリーンショットを取って私に「この画面からどう進めば良いか」と確認
- **エラーメッセージが出た場合**: そのままテキストで私に報告
- **リンク済みと表示されるリンクを再度リンクしようとしている場合**: エラーにならないよう「既にリンク済みのためスキップ」と報告して次へ

---

以上、よろしくお願いします。
