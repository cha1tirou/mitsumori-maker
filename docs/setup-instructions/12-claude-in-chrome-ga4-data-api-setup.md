# 12. Claude in Chrome に渡す GA4 Data API セットアップ指示書

ケンミツの `/api/admin/analytics` エンドポイントを有効化するため、
**Google Cloud でサービスアカウントを作成 → GA4 に閲覧者権限付与 → JSON キーを取得**
までを Claude for Chrome に代行させる指示書。

取得した 3 つの値（GA4 プロパティ ID / サービスアカウント JSON の base64 / 設定済み確認）は**ユーザー自身で Vercel 環境変数に設定**する。

## ユーザーに求められる作業

- Google Cloud Console へのログイン・2FA
- Vercel 環境変数の入力（Claude に Vercel 画面は触らせない）
- 最終的な Vercel Redeploy 操作

---

## ここから下を Claude にコピペ

---

あなたは私のアシスタントとして、ケンミツ（https://mitsumori-maker.com/construction）の GA4 Data API を叩けるようにするためのセットアップを代行してください。

目標: **Google Cloud のサービスアカウント JSON キー（base64 形式）** と **GA4 プロパティ ID**、この 2 つの値を私に渡してもらうこと。Vercel 環境変数への入力は私が自分でやります。

以下のタスクを **1 つずつ順番に** 実行してください。Google アカウントのログイン・2FA は私に委ねてください。

---

## タスク 1: GA4 プロパティ ID を取得

1. 新規タブで https://analytics.google.com/ を開く
2. ログインが必要なら私に委ねる
3. 左下の歯車アイコン「管理」をクリック
4. 「プロパティ設定」→「プロパティの詳細」（または「プロパティ設定」内のサマリー）
5. **プロパティ ID**（9 桁の数字、例: `488012345`）をコピーして私に報告
6. ※「測定 ID」（`G-13VR2YEZKB` で始まる形式）ではないので注意。Property ID は数字のみ

---

## タスク 2: Google Cloud プロジェクトの準備

1. 新規タブで https://console.cloud.google.com/ を開く
2. ログインが必要なら私に委ねる
3. 画面上部のプロジェクト選択ドロップダウンをクリック
4. 既存プロジェクトがある場合:
   - リストから適切そうなもの（`mitsumori-maker` や `kenmitsu` を含むもの）を選択
   - なければ新規作成へ
5. 新規プロジェクト作成する場合:
   - 「新しいプロジェクト」ボタン
   - プロジェクト名: `kenmitsu-analytics`
   - 組織: なし
   - 「作成」をクリック
   - プロジェクト作成完了まで待つ（10〜30 秒）
6. プロジェクト ID を私に報告（例: `kenmitsu-analytics-123456`）

---

## タスク 3: Google Analytics Data API を有効化

1. Cloud Console の画面上部検索バーで「Google Analytics Data API」と入力
2. 候補「Google Analytics Data API」を選択
3. 「有効にする」ボタンをクリック
4. 有効化完了を確認（「管理」画面に遷移すれば OK）

---

## タスク 4: サービスアカウントを作成

1. Cloud Console の左上ハンバーガーメニュー → 「IAM と管理」→ 「サービスアカウント」
2. 上部「+ サービス アカウントを作成」
3. 入力:
   - サービス アカウント名: `kenmitsu-ga4-reader`
   - サービス アカウント ID: 自動生成のまま
   - 説明: `Read GA4 data for kenmitsu admin dashboard`
4. 「作成して続行」
5. **ロール付与は不要** なので「続行」（GA4 への権限はサービスアカウントのメールで別途付与するため、プロジェクトレベルの IAM ロールは不要）
6. 「完了」
7. 作成されたサービスアカウントの**メールアドレス**をコピーして私に報告
   形式: `kenmitsu-ga4-reader@プロジェクト ID.iam.gserviceaccount.com`

---

## タスク 5: サービスアカウント JSON キーを生成

1. サービスアカウント一覧で `kenmitsu-ga4-reader` をクリック
2. タブ「キー」を開く
3. 「鍵を追加」→「新しい鍵を作成」
4. キータイプ: **JSON** を選択
5. 「作成」→ JSON ファイルが自動ダウンロードされる
6. **ダウンロードされたファイルを私に見せる必要はありません**。ファイル名と保存先だけ教えてください（ユーザーが後で base64 化する）

例: `kenmitsu-analytics-abc123-0123456789ab.json` が Downloads フォルダに保存

---

## タスク 6: GA4 プロパティにサービスアカウントを閲覧者として追加

1. https://analytics.google.com/ に戻る（既に開いているタブ）
2. 左下「管理」→ 「プロパティのアクセス管理」
3. 右上の「+」→「ユーザーを追加」
4. メールアドレス: タスク 4 で取得した **サービスアカウントのメール**
   例: `kenmitsu-ga4-reader@プロジェクト ID.iam.gserviceaccount.com`
5. 「新しいユーザーにメールを通知する」のチェックを**外す**（サービスアカウントなので通知不要）
6. 役割: **「閲覧者」** を選択
7. 「追加」ボタンをクリック
8. ユーザー一覧に追加されたことを確認してスクリーンショット報告

---

## タスク 7: 完了レポート

以下 3 点を私に報告:

1. **GA4 プロパティ ID**（タスク 1 で取得）
   例: `488012345`
2. **Google Cloud プロジェクト ID**（タスク 2 で作成 or 選択）
   例: `kenmitsu-analytics-123456`
3. **サービスアカウントのメール**（タスク 4 で取得）
   例: `kenmitsu-ga4-reader@プロジェクト ID.iam.gserviceaccount.com`
4. **JSON キーファイルのファイル名と保存先**（タスク 5 で生成）
   例: Downloads フォルダの `kenmitsu-analytics-abc123-0123456789ab.json`

これで私が以下を手動実施します:

- JSON を base64 化:
  ```
  base64 -i ~/Downloads/[ファイル名].json | pbcopy
  ```
- Vercel 環境変数に追加:
  - `GA4_SA_KEY_B64` = 上記 base64 文字列
  - `GA4_PROPERTY_ID` = プロパティ ID
- Vercel Redeploy
- curl で /api/admin/analytics を叩いて動作確認

---

## エラー・予期しない状況の対応ルール

- **Google Cloud の課金情報入力を求められた**: サービスアカウント作成は課金無料枠内なので、クレカ情報入力は**停止して私に確認**（新規プロジェクトで稀に発生、基本的には不要）
- **Google Analytics Data API の「有効にする」ボタンが見つからない**: 既に有効化されている可能性、スクショで確認
- **GA4 の「プロパティのアクセス管理」が見つからない**: 権限不足の可能性、ログインアカウントが GA4 の編集者以上か確認
- **予期しないエラー画面**: スクショで私に相談

---

以上、よろしくお願いします。
