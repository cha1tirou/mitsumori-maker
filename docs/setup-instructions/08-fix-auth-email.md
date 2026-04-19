# 【指示書 08】新規登録の確認メールが届かない問題の診断と修正

## 背景
ケンミツ（https://mitsumori-maker.com/construction/login）で新規登録すると、確認メールが送信される仕組みだが、**届かない**という報告あり。迷惑メールフォルダにも入っていない。

## 目的
- 問題を診断し、根本原因を特定する
- 原因に応じた修正を実施する
- 本番運用で確実に確認メールが届く状態にする

## 所要時間
- 診断のみ: 10〜15分
- 修正含む: 最大 60分（Resend カスタム SMTP 設定まで）

## 前提
- ユーザー（依頼主）から以下のログイン情報を受け取る:
  - Supabase ダッシュボード（対象プロジェクト）
  - Resend ダッシュボード（既にアカウント作成済みの場合）
  - Vercel ダッシュボード（環境変数確認用）

---

## Phase 1: 診断（原因特定）

### Step 1: テスト登録を1回実行（診断の起点を作る）

1. シークレットウィンドウで https://mitsumori-maker.com/construction/login を開く
2. 「新規登録」タブを選択
3. **使い捨て可能なメアド**で登録（例: `diagnosis-test-20260419@` のような識別しやすいもの）
4. パスワード: 適当な8文字以上
5. 「アカウントを作成」をクリック
6. 「確認メールを送信しました」画面が表示されることを確認
7. **現在時刻をメモ**（Step 3 のログ確認で使う）

### Step 2: Supabase ダッシュボードで登録成功可否を確認

1. https://supabase.com/dashboard にログイン → 対象プロジェクトを開く
2. 左サイドバー「**Authentication**」→「**Users**」
3. 検索ボックスに Step 1 で登録したメアドを入力
4. ユーザー行が表示されるか確認

**判定:**
- ✅ **表示される** → 登録自体は成功。問題はメール送信フェーズ → Step 3 へ
- ❌ **表示されない** → 登録が失敗している。DB トリガーや RLS 設定の問題の可能性 → Step 6 へジャンプ

行のステータス欄も見る:
- `Waiting for verification` → 確認待ち状態（正常）
- `Confirmed` → 既に確認済み（このテストでは違うはず）

### Step 3: Auth Logs で送信ログを確認

1. 左サイドバー「**Logs**」→「**Auth Logs**」
2. 日時フィルタで「直近 1時間」または Step 1 の時刻以降
3. `level:error` または `level:warn` のエントリを探す

よく出るエラーメッセージと意味:

| ログ内容 | 意味 | 次の対処 |
|---|---|---|
| `Error sending confirmation email` | 送信自体が失敗 | Step 4 へ |
| `Email rate limit exceeded` | レート制限ヒット | Step 4-A へ |
| `Invalid redirect URL` | Redirect URL 未設定 | Step 5 へ |
| エラーなし | 送信は成功扱い → 受信側問題 | Step 4-B へ |

**エラーメッセージのスクリーンショットを保存しておく**（必要なら依頼主に共有）。

### Step 4: Email Provider 設定を確認

1. 「**Authentication**」→「**Providers**」
2. **Email** プロバイダをクリックして展開
3. 以下を確認:
   - `Enable Email provider`: ON か
   - `Confirm email`: ON か（OFF だと確認メール自体が不要になる）
   - `Secure email change`: 任意
   - `Secure password change`: 任意

4. 「**Authentication**」→「**Email Templates**」の上部
5. **SMTP Settings** セクションを探す:
   - **Custom SMTP**: enabled か disabled か
   - disabled なら → Supabase デフォルト SMTP 使用 → レート制限と deliverability 問題あり
   - enabled なら → ホスト/ポート/ユーザー名/送信元メアドを記録

#### Step 4-A: デフォルト SMTP でレート制限に引っかかっている場合

Supabase デフォルトは**プロジェクト全体で 1時間 3〜4 通**の制限。
→ **Resend カスタム SMTP への移行が必須** → Phase 2 へ

#### Step 4-B: エラーログなしだがメール届かない場合

デフォルト SMTP の送信元 `noreply@mail.app.supabase.io` は**評価が低く、Gmail 側で受信せず黙って破棄されることがある**。
→ **Resend カスタム SMTP への移行が根本対策** → Phase 2 へ

### Step 5: URL Configuration を確認

1. 「**Authentication**」→「**URL Configuration**」
2. 以下が正しく入っているか確認:

**Site URL:**
```
https://mitsumori-maker.com
```

**Redirect URLs（全4つ）:**
```
https://mitsumori-maker.com/auth/callback
https://mitsumori-maker.com/auth/callback?next=/**
http://localhost:3000/auth/callback
http://localhost:3000/auth/callback?next=/**
```

欠けていれば「Add URL」で追加し「Save」。これだけで解決する可能性あり（Step 1 を再実行して確認）。

### Step 6: Users に登録ユーザーが表示されない場合（例外）

Step 2 で Users に表示されない場合、DB トリガーエラーの可能性。

1. 「**Database**」→「**Triggers**」
2. `auth.users` テーブルに関連するトリガー（`handle_new_user` 等）があるか
3. 「**Logs**」→「**Postgres Logs**」で直近の ERROR を探す
4. `null value in column "id"` や `violates foreign key constraint` 等があれば、トリガー内の処理が失敗している

この場合は依頼主にエラーログのスクリーンショットと共にエスカレーション。SQL 修正が必要。

---

## Phase 2: 対処 — Resend カスタム SMTP 設定

**前提**: Step 4 で Resend への移行が必要と判断された場合のみ実施。

### Step 7: Resend の状態確認

1. https://resend.com/dashboard にログイン
2. 左サイドバー「**API Keys**」
3. 既存のキーがあるか確認。なければ「**Create API Key**」で作成（Full access でOK、名前: `supabase-smtp`）
4. キーの値をコピー（`re_xxxxx...`）。**一度しか表示されないので確実に保存**

### Step 8: Resend でドメイン認証を確認

1. 「**Domains**」
2. `mitsumori-maker.com` があるか。あれば `Verified` になっているかチェック
3. なければ「**Add Domain**」で追加 → DNS レコード（SPF, DKIM, DMARC）を設定するよう表示される → それを依頼主のドメイン管理画面（Cloudflare / お名前.com 等）で追加してもらう

※ ドメイン認証が完了してないと SMTP 経由でも送信できない。依頼主への宿題。

### Step 9: Supabase Auth SMTP を Resend に切替

1. Supabase Dashboard → **Authentication** → **Email Templates** (または SMTP Settings がある場所)
2. **Enable Custom SMTP** を ON
3. 以下を入力:

| 項目 | 値 |
|---|---|
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | Step 7 で取得した Resend API Key（`re_xxxxx...`）|
| Sender email | `noreply@mitsumori-maker.com`（または Resend でドメイン認証済みの任意アドレス）|
| Sender name | `ケンミツ（建設業の見積書）` |

4. 「**Save**」

### Step 10: レート制限の引き上げ

Supabase の「**Authentication**」→「**Rate Limits**」で、カスタム SMTP になったら以下に設定可:

- Emails per hour: **100**（デフォルトは 3〜4）
- OTPs per hour: **30**

Resend 無料プランは月 3,000通・日 100 通なので、これで十分。

### Step 11: 動作確認

1. 再度シークレットウィンドウで https://mitsumori-maker.com/construction/login
2. **別のメアド**で新規登録（同じメアドは「既に登録済み」エラーになるため）
3. 1分以内に確認メールが届くか確認
4. 受信トレイ（プロモーションタブではなくメインタブ）に届けば OK
5. メール内ボタンをクリックして /construction/mypage に到達

### Step 12: 過去の失敗分のクリーンアップ

Phase 1 の Step 1 で作った診断テストユーザーが「未確認」のまま残っているはず:

1. Supabase **Authentication** → **Users**
2. 該当メアドの行の「⋮」メニュー → **Delete user**
3. 不要なテストアカウントを削除

---

## 完了報告フォーマット

以下を依頼主に返信する形でまとめる:

```
【確認メール届かない問題 — 診断結果】

■ Phase 1 診断結果
- Users 登録: [成功 / 失敗]
- Auth Logs: [エラーあり/なし、エラー内容]
- SMTP 設定: [デフォルト / カスタム（Resend 等）]
- Redirect URL: [適切 / 不足（追加済）]
- 判断: [デフォルト SMTP のレート制限 / deliverability 問題 / Redirect URL 不足 / その他]

■ Phase 2 対処（実施した場合）
- Resend API Key: 作成済（キー値は本報告書には含めない、Supabase に設定済）
- ドメイン認証: [完了 / 依頼主に依頼中]
- Supabase SMTP: Resend に切替済
- Rate Limits: 100通/時 に引き上げ
- 動作確認: [別メアドで新規登録 → 1分以内にメール到達確認済 / 未確認]

■ 残タスク（依頼主の対応）
- [ドメイン認証 DNS 設定が必要な場合、レコード値を記載]
- [その他]
```

---

## トラブル対応

| 症状 | 対処 |
|---|---|
| Resend ドメイン認証に時間がかかる | DNS 反映は最大 48時間。急ぐなら Resend のデフォルト送信ドメイン（`onboarding@resend.dev` 等）で一時対応も可 |
| SMTP 設定を保存しようとするとエラー | Port 465 でなく 587 (STARTTLS) で試す。一部のホスティングは 465 ブロックしている |
| Resend API Key が reject される | キー先頭が `re_` になっているか、コピー時に空白が入っていないか確認 |
| カスタム SMTP に切り替えたらログイン出来なくなった | Sender email が Resend で認証されたドメインになっているか確認。デフォルト送信ドメインを使う場合は `onboarding@resend.dev` |

---

## 禁止事項

- **Resend API Key を Git にコミットしない**（`.env.local` や Supabase 管理画面にのみ保存）
- **SMTP Password 欄に他のサービスのキーを貼らない**（Anthropic / Stripe のキーとは別物）
- **Redirect URL に http:// の本番ドメインを追加しない**（HTTPS のみ）

---

## 実施記録

### 2026-04-19: Phase 2 完了 — Resend カスタム SMTP への移行
- Phase 1 診断: 根本原因は Supabase Default SMTP（レート制限・deliverability 問題）と確定
- ドメイン `mitsumori-maker.com` を Resend で Verified（DNS 設定済）
- Supabase Auth SMTP を `smtp.resend.com:465` に切替
- Rate Limit を 100 通/時 に引き上げ
- 動作確認: 新規メアドで登録 → 1分以内にメール到達 → 確認リンクで `/construction/mypage` 到達 OK

### 2026-04-19: 認証フロー改善 — token_hash フロー + 既登録検出
Supabase Email Confirm のデフォルト PKCE フローだと「PC で登録 → スマホでメール開く」のクロスデバイス確認に失敗するため、`token_hash` フローへ移行した。同時に既登録メアドでの再登録を検出してユーザーに通知する実装を追加。

**コード変更**（コミット `45b06cd`）:
- `src/app/auth/confirm/route.ts` を新規作成（`verifyOtp` ベース）
- `src/app/construction/login/page.tsx` の `signUp()`:
  - `emailRedirectTo` を `/auth/callback` → `/auth/confirm?next=...` に変更
  - `data.user.identities.length === 0` で既登録メアドを検出し、「既に登録されています」メッセージ + login タブに自動切替
- 既存の `/auth/callback` ルートは OAuth / magic link 用途で残置

**Supabase Dashboard 側設定**:
- Email Template `Confirm signup` の Body 内リンクを以下に差し替え:
  ```
  {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/construction/mypage
  ```
- URL Configuration の Redirect URLs に追加:
  - `https://mitsumori-maker.com/auth/confirm`
  - `https://mitsumori-maker.com/auth/confirm?next=/**`
  - `http://localhost:3000/auth/confirm`
  - `http://localhost:3000/auth/confirm?next=/**`

**動作確認**:
- クロスデバイス: PC シークレットで新規登録 → スマホ Gmail で確認リンク → `/construction/mypage` 到達 OK
- 既登録検出: 既存メアドで再登録 → 「このメールアドレスは既に登録されています」表示 + login タブ切替 OK
