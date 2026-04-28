# 16. Google Ads コンバージョン計測 env 設定（Claude in Chrome 用指示書）

`/construction/admin` の「設定ヘルス」で以下が ✗ になっている問題を解決する手順書。
**Claude in Chrome に貼り付けて代行させる前提**で書かれている。

```
✗ NEXT_PUBLIC_GOOGLE_ADS_ID         (Google Ads 全体のタグ ID)
✗ NEXT_PUBLIC_GADS_CONV_SIGNUP      (登録 conversion のラベル)
✗ NEXT_PUBLIC_GADS_CONV_SUB_SOLO    (有料プラン課金 conversion のラベル)
✗ CRON_SECRET                        (drip-email cron の認証キー)
```

---

## 1. なぜ今やる必要があるか

ケンミツは 2026-04-26 から Google Ads で「見積書」系キーワードに広告出稿中
（指示書 15 参照）。広告費は出ているが、**Google Ads 側で「広告経由で誰が
登録したか・課金したか」を学習できていない**。理由:

- LP / ツール内のコードは `trackConversion("construction_signup")` 等を発火する
- しかしその時に `gtag("event", "conversion", { send_to: AW-XXX/LABEL })` の
  `AW-XXX/LABEL` が空のため、**Google Ads サーバーには何も送信されない**
- → Google Ads は「このキーワード/クリックから登録/課金が出た」を学習できず、
  入札最適化（コンバージョン重視）が効かない
- → CPA が悪化し、広告費が無駄になる

つまり「広告は出してるが計測してない」状態。これを直す。

なお `CRON_SECRET` は drip-email cron の認証キー。未設定だと cron エンドポイント
を誰でも叩けてしまうので、ついでに設定する。

---

## 2. 前提

実装側はすべて完了済み（コード変更不要）:
- `src/lib/analytics.ts` で `trackConversion()` が定義済み、Google Ads / GA4 /
  Meta Pixel に同時送信する設計
- LP・登録・課金各イベントで `trackConversion()` 呼び出し実装済み

ユーザー側で必要な作業 = 以下の 3 環境変数を Vercel に登録するだけ。

| 環境変数 | 用途 | 値の形式 |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads 全体タグ ID | `AW-1234567890` |
| `NEXT_PUBLIC_GADS_CONV_SIGNUP` | 登録 conversion ラベル | `abc-defGHIjkl` |
| `NEXT_PUBLIC_GADS_CONV_SUB_SOLO` | 課金 conversion ラベル | `xyz-mnoPQRstu` |
| `CRON_SECRET` | cron 認証キー | 任意の長い乱数 |

---

## 3. ユーザーに求められる作業

- Google Ads / Vercel / Supabase（不要）のログイン・2FA（Claude は認証情報を
  入力しない）
- Vercel 環境変数の保存ボタン押下（最終確認のため）

---

## ここから下を Claude にコピペ

---

あなたは私のアシスタントとして、ケンミツ（https://mitsumori-maker.com/construction）の
**Google Ads コンバージョン計測**のセットアップを代行してください。

実行のルール:
- 画面遷移ごとに「今このページで〜を行います」と一言報告してから操作
- 予期しない画面や UI 変更があった場合は勝手に進めず、私に確認
- Google アカウント / Vercel のログイン画面が出たら停止して私に操作を委ねる
- 各タスク完了時に要約を一言報告
- 取得したコンバージョン ID・ラベルは**そのまま私に提示**してから次に進む（私が
  値を確認できるように）

ゴール: Google Ads で 2 種類のコンバージョンアクションを作成し、Google タグ ID と
ラベルを取得し、Vercel に 4 つの環境変数を登録、再デプロイして動作確認まで完了
させる。

---

## タスク 1: Google Ads にログイン → 既存コンバージョンの確認

1. 新規タブで https://ads.google.com/ を開く
2. ログインが必要なら私に委ねる
3. 左メニューから「**ツールと設定**」（歯車アイコン）→「**測定**」→
   「**コンバージョン**」を開く
4. 既存のコンバージョンアクションを一覧表示し、以下の 2 つが**既にあるか**を
   チェック:
   - 名称に「登録」「signup」「サインアップ」を含むもの
   - 名称に「課金」「subscribe」「purchase」「Solo」を含むもの
5. 結果を私に報告:
   - 両方とも既にある → タスク 2 をスキップしてタスク 3 へ
   - 片方あるいは両方が未作成 → タスク 2 に進む

---

## タスク 2: コンバージョンアクションを 2 つ作成

### タスク 2-A: 「アカウント登録」コンバージョン

1. 「+ **新しいコンバージョン アクション**」ボタンをクリック
2. 「**ウェブサイト**」を選択
3. ウェブサイト URL に `mitsumori-maker.com` を入力 → 「スキャン」
4. スキャン結果が表示されたら「+ コンバージョン アクションを手動で追加」を選択
5. 以下を入力:
   - 目標とアクションの最適化: **「申し込み」**
   - コンバージョン名: `アカウント登録（ケンミツ）`
   - 価値: 「**コンバージョンごとに同じ価値を使用**」
   - 値: `500`（単位 JPY、登録 1 件あたりの推定価値・後から調整可）
   - カウント方法: 「**1 回**」（1 ユーザー 1 回まで計上）
   - クリックスルー コンバージョン計測期間: 30 日
   - エンゲージメント ビュースルー計測期間: 1 日
   - アトリビューション モデル: データドリブン
6. 「完了」 → 「保存して次へ」
7. 「**タグの設定**」画面で「**自分でタグを取り付ける**」を選択
8. 表示される 2 つの値を**正確にコピーして私に報告**:
   - **Google タグ ID**（`AW-` で始まる）
   - **コンバージョン ラベル**（英数字とハイフンの短い文字列）
9. 「次へ」→「完了」

### タスク 2-B: 「有料プラン課金」コンバージョン

1. 再度「+ **新しいコンバージョン アクション**」
2. 「ウェブサイト」「mitsumori-maker.com」「コンバージョン アクションを手動で追加」
3. 以下を入力:
   - 目標とアクションの最適化: **「購入」**
   - コンバージョン名: `有料プラン課金（ケンミツ）`
   - 価値: 「**コンバージョンごとに同じ価値を使用**」
   - 値: `1980`（単位 JPY、Solo 月額相当）
   - カウント方法: 「**1 回**」
   - クリックスルー コンバージョン計測期間: 30 日
   - アトリビューション モデル: データドリブン
4. 「完了」→「保存して次へ」
5. 「**自分でタグを取り付ける**」
6. **Google タグ ID** はタスク 2-A と同じはず（同一アカウント内なら共通）。
   念のため再確認して私に報告
7. **コンバージョン ラベル**（タスク 2-A とは別の値）を私に報告
8. 「次へ」→「完了」

---

## タスク 3: 取得した値を整理して私に提示

ここまでで以下 3 つの値を取得しているはず。Markdown 表形式で整理して提示:

| 環境変数 | 値 |
|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-XXXXXXXXXX` |
| `NEXT_PUBLIC_GADS_CONV_SIGNUP` | `xxxxxxxxxx-xxx`（登録用） |
| `NEXT_PUBLIC_GADS_CONV_SUB_SOLO` | `yyyyyyyyyy-yyy`（課金用） |

私が確認 OK と言ったらタスク 4 に進む。

---

## タスク 4: CRON_SECRET 用の乱数を生成

`CRON_SECRET` 用に 32 バイトの乱数を生成して私に提示。
方法: 以下のページに記載されているコマンドのいずれかを使う:

- ターミナルで `openssl rand -hex 32` を実行（ユーザーに依頼）
- ブラウザで https://www.uuidgenerator.net/ を開いて UUID を 2 つ連結

例: `9f2c8b3a4e7d1...（64 桁の hex）` のような値。

→ 私に提示して、私が「OK これを使う」と返すまで待つ。

---

## タスク 5: Vercel に環境変数を登録

1. 新規タブで https://vercel.com/ を開く
2. ログインが必要なら私に委ねる
3. プロジェクト一覧から `mitsumori-maker` を選択
4. 上部メニュー「**Settings**」→ 左メニュー「**Environment Variables**」
5. 既存の環境変数を確認し、以下が未登録か確認:
   - `NEXT_PUBLIC_GOOGLE_ADS_ID`
   - `NEXT_PUBLIC_GADS_CONV_SIGNUP`
   - `NEXT_PUBLIC_GADS_CONV_SUB_SOLO`
   - `CRON_SECRET`
6. 各環境変数を以下の手順で追加（4 回繰り返す）:
   - **Key**: 上記いずれか
   - **Value**: タスク 3 / 4 で取得した値
   - **Environments**: **Production / Preview / Development すべて** チェック
   - 「**Save**」ボタン
7. 4 つすべて Save 完了したことを私に報告

---

## タスク 6: 再デプロイ

環境変数は **再デプロイしないと反映されない**（特に NEXT_PUBLIC_* は build 時に
inlined されるため）。

1. Vercel プロジェクトページの上部メニュー「**Deployments**」
2. 最新の Production デプロイ（緑のチェックマーク付き）の「**…**」メニュー
3. 「**Redeploy**」を選択
4. 確認モーダルで「**Use existing Build Cache**」のチェックを**外す**（NEXT_PUBLIC
   系は build 時 inline されるためキャッシュを使うと反映されない）
5. 「**Redeploy**」確定
6. デプロイ完了（緑チェック）まで待機（通常 2-3 分）
7. 完了したら私に報告

---

## タスク 7: 動作確認

### 7-1. /construction/admin で「設定ヘルス」が全部 ✓ になっているか確認

1. 新規タブで https://mitsumori-maker.com/construction/admin を開く
2. Basic 認証ダイアログが出たらユーザーに認証情報を入力してもらう
3. ページ最上部「設定ヘルス」セクションを確認
4. 期待状態: **「✓ 全項目 OK」と表示**
5. もし ✗ が残っていたら:
   - Vercel 側の env が保存されているか再確認
   - Redeploy が完了しているか再確認
   - 反映に数分かかる場合があるので 5 分待って再読み込み
6. 結果を私に報告（スクリーンショット推奨）

### 7-2. Google Ads タグ実装テスト

1. 新規タブで https://mitsumori-maker.com/construction を開く
2. ブラウザの DevTools を開く（F12）→ **Network** タブ
3. フィルタに `googleads` または `google-analytics` と入力
4. ページを再読み込み
5. 期待状態: 以下のリクエストが発生する:
   - `https://www.googletagmanager.com/gtag/js?id=G-13VR2YEZKB` （GA4・既存）
   - `https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX` （Google Ads・新規）
6. もし AW- のリクエストが無ければ、再デプロイがまだ完了していない可能性
7. 結果を私に報告

### 7-3. 模擬コンバージョン送信テスト（任意）

1. 上記 LP の DevTools Network タブを開いたまま
2. 「無料で見積書を作成」ボタン → /construction/start に遷移
3. 適当なテストメアド（例: cha1tirou+adstest@gmail.com）を入力 → 送信
4. Network タブで `google.com/pagead/conversion` または `googleadservices`
   宛のリクエストが発生したか確認
5. もし発生していれば計測は OK。発生していなければ実装上の問題なので私に報告

---

## タスク 8: 最終報告

完了したことを以下の形式で報告:

```
✅ Google Ads コンバージョン アクション 2 つ作成
✅ Vercel に 4 つの環境変数を登録（Production/Preview/Development）
✅ 再デプロイ完了
✅ /construction/admin の「設定ヘルス」全項目 ✓
✅ LP で AW- タグの読み込み確認
（任意）✅ 模擬コンバージョン送信確認

取得した値:
- NEXT_PUBLIC_GOOGLE_ADS_ID: AW-XXXXXXXXXX
- NEXT_PUBLIC_GADS_CONV_SIGNUP: xxxx-yyyy
- NEXT_PUBLIC_GADS_CONV_SUB_SOLO: zzzz-wwww
- CRON_SECRET: （長い hex 文字列）

備考:
- （あれば追記）
```

---

## トラブルシューティング

### 「設定ヘルス」が ✗ のまま

- Vercel の Environment Variables ページで本当に保存されているか確認
- Redeploy 時に「Use existing Build Cache」を**外したか**を再確認
- Redeploy 後 5 分以上待って再読み込み（CDN キャッシュの可能性）

### Google Ads でコンバージョン作成画面が見つからない

- 「ツールと設定」→「測定」→「コンバージョン」のパスを再確認
- Google Ads UI が変更されている可能性 → 「conversion action」で UI 内検索

### コンバージョン ラベルがどこに表示されるか分からない

- コンバージョンアクション一覧で該当アクション名をクリック →「タグを設定」
- 「タグを自分で取り付ける」セクションを開く
- HTML スニペット内の `'send_to': 'AW-XXXXXXXXXX/abc-defGHI'` の `/` 以降が
  「コンバージョン ラベル」

---

## 関連ドキュメント

- 指示書 09: 全体のアナリティクス・広告セットアップ手順
- 指示書 11: Google Ads キャンペーン作成（陳腐化済・15 を使う）
- 指示書 15: Phase 1 ピボット後の再出稿戦略
- `src/lib/analytics.ts`: コード側の trackConversion 実装
- `src/app/construction/admin/page.tsx`: 設定ヘルスの表示ロジック
