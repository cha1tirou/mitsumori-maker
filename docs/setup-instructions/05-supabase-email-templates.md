# 【指示書 05】Supabase メールテンプレート日本語化 + サイトURL設定

## 目的
Supabaseのデフォルト英語メール（Confirm Your Signup等）を「ケンミツ」ブランドの日本語メールに差し替える。同時にサイトURLとリダイレクトURLを正しく設定する。

## 所要時間
**約 10〜15分**

## 前提
- Supabaseダッシュボードへのログイン情報

---

## 実行手順

### Step 1: Supabaseダッシュボードにログイン

1. **https://supabase.com/dashboard** を開く
2. ログイン → 対象プロジェクトを選択

### Step 2: サイトURL・リダイレクトURL設定

1. 左サイドバー「**Authentication**」をクリック
2. 「**URL Configuration**」をクリック
3. 以下を設定：

   **Site URL:**
   ```
   https://mitsumori-maker.com
   ```

   **Redirect URLs（Add URL で1つずつ追加）:**
   ```
   https://mitsumori-maker.com/auth/callback
   https://mitsumori-maker.com/auth/callback?next=/**
   http://localhost:3000/auth/callback
   http://localhost:3000/auth/callback?next=/**
   ```

4. 「**Save**」

### Step 3: メール送信者名の設定

1. 左サイドバー「**Authentication**」→「**Email Templates**」をクリック
2. 上部に **Sender name** / **Sender email** の設定がある場合：
   - Sender name: `ケンミツ（建設業の見積書）`
   - ※ Sender email はカスタムSMTP設定時のみ変更可。デフォルトの `noreply@mail.app.supabase.io` のままでOK

### Step 4: メールテンプレート変更（4種類）

「**Email Templates**」タブで以下4つのテンプレートを順番に編集する。

---

#### 4-1. Confirm signup（サインアップ確認）

**Subject:**
```
【ケンミツ】メールアドレスの確認
```

**Body（HTML）:**
```html
<div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="font-size: 20px; font-weight: bold; color: #15803d;">ケンミツ</span>
    <span style="font-size: 12px; color: #6b7280; margin-left: 4px;">建設業の見積書</span>
  </div>

  <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px; text-align: center;">メールアドレスの確認</h1>

  <p style="font-size: 14px; line-height: 1.8; margin-bottom: 24px;">
    ケンミツへのご登録ありがとうございます。<br>
    以下のボタンをクリックして、メールアドレスの確認を完了してください。
  </p>

  <div style="text-align: center; margin-bottom: 24px;">
    <a href="{{ .ConfirmationURL }}"
       style="display: inline-block; background-color: #15803d; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
      メールアドレスを確認する →
    </a>
  </div>

  <p style="font-size: 12px; color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
    ※ このリンクは24時間有効です。<br>
    ※ ボタンが押せない場合は、以下のURLをブラウザに貼り付けてください：<br>
    <a href="{{ .ConfirmationURL }}" style="color: #15803d; word-break: break-all;">{{ .ConfirmationURL }}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

  <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; text-align: center;">
    このメールに心当たりがない場合は、無視してください。<br>
    ケンミツ — 建設業向け見積書作成ツール<br>
    <a href="https://mitsumori-maker.com/construction" style="color: #9ca3af;">https://mitsumori-maker.com/construction</a>
  </p>
</div>
```

---

#### 4-2. Magic Link（ログインリンク）

**Subject:**
```
【ケンミツ】ログインリンク
```

**Body（HTML）:**
```html
<div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="font-size: 20px; font-weight: bold; color: #15803d;">ケンミツ</span>
    <span style="font-size: 12px; color: #6b7280; margin-left: 4px;">建設業の見積書</span>
  </div>

  <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px; text-align: center;">ログインリンク</h1>

  <p style="font-size: 14px; line-height: 1.8; margin-bottom: 24px;">
    以下のボタンをクリックしてログインしてください。
  </p>

  <div style="text-align: center; margin-bottom: 24px;">
    <a href="{{ .ConfirmationURL }}"
       style="display: inline-block; background-color: #15803d; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
      ログインする →
    </a>
  </div>

  <p style="font-size: 12px; color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
    ※ このリンクは24時間有効です。<br>
    ※ ボタンが押せない場合は、以下のURLをブラウザに貼り付けてください：<br>
    <a href="{{ .ConfirmationURL }}" style="color: #15803d; word-break: break-all;">{{ .ConfirmationURL }}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

  <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; text-align: center;">
    このメールに心当たりがない場合は、無視してください。<br>
    ケンミツ — 建設業向け見積書作成ツール<br>
    <a href="https://mitsumori-maker.com/construction" style="color: #9ca3af;">https://mitsumori-maker.com/construction</a>
  </p>
</div>
```

---

#### 4-3. Change Email Address（メールアドレス変更）

**Subject:**
```
【ケンミツ】メールアドレス変更の確認
```

**Body（HTML）:**
```html
<div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="font-size: 20px; font-weight: bold; color: #15803d;">ケンミツ</span>
    <span style="font-size: 12px; color: #6b7280; margin-left: 4px;">建設業の見積書</span>
  </div>

  <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px; text-align: center;">メールアドレス変更の確認</h1>

  <p style="font-size: 14px; line-height: 1.8; margin-bottom: 24px;">
    メールアドレスの変更リクエストを受け付けました。<br>
    以下のボタンをクリックして変更を確定してください。
  </p>

  <div style="text-align: center; margin-bottom: 24px;">
    <a href="{{ .ConfirmationURL }}"
       style="display: inline-block; background-color: #15803d; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
      メールアドレス変更を確定 →
    </a>
  </div>

  <p style="font-size: 12px; color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
    ※ このリンクは24時間有効です。<br>
    ※ ボタンが押せない場合は、以下のURLをブラウザに貼り付けてください：<br>
    <a href="{{ .ConfirmationURL }}" style="color: #15803d; word-break: break-all;">{{ .ConfirmationURL }}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

  <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; text-align: center;">
    このメールに心当たりがない場合は、無視してください。<br>
    ケンミツ — 建設業向け見積書作成ツール<br>
    <a href="https://mitsumori-maker.com/construction" style="color: #9ca3af;">https://mitsumori-maker.com/construction</a>
  </p>
</div>
```

---

#### 4-4. Reset Password（パスワードリセット）

※ 現在マジックリンク認証のみなので使われないが、念のため日本語化しておく。

**Subject:**
```
【ケンミツ】パスワードリセット
```

**Body（HTML）:**
```html
<div style="font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="font-size: 20px; font-weight: bold; color: #15803d;">ケンミツ</span>
    <span style="font-size: 12px; color: #6b7280; margin-left: 4px;">建設業の見積書</span>
  </div>

  <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 16px; text-align: center;">パスワードリセット</h1>

  <p style="font-size: 14px; line-height: 1.8; margin-bottom: 24px;">
    パスワードリセットのリクエストを受け付けました。<br>
    以下のボタンをクリックして新しいパスワードを設定してください。
  </p>

  <div style="text-align: center; margin-bottom: 24px;">
    <a href="{{ .ConfirmationURL }}"
       style="display: inline-block; background-color: #15803d; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
      パスワードをリセットする →
    </a>
  </div>

  <p style="font-size: 12px; color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
    ※ このリンクは24時間有効です。<br>
    ※ ボタンが押せない場合は、以下のURLをブラウザに貼り付けてください：<br>
    <a href="{{ .ConfirmationURL }}" style="color: #15803d; word-break: break-all;">{{ .ConfirmationURL }}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

  <p style="font-size: 11px; color: #9ca3af; line-height: 1.6; text-align: center;">
    このメールに心当たりがない場合は、無視してください。<br>
    ケンミツ — 建設業向け見積書作成ツール<br>
    <a href="https://mitsumori-maker.com/construction" style="color: #9ca3af;">https://mitsumori-maker.com/construction</a>
  </p>
</div>
```

---

### Step 5: 保存＆動作確認

1. 各テンプレートの「**Save**」をクリック
2. ブラウザで **https://mitsumori-maker.com/construction/login** を開く
3. テスト用メアドでログインリンクを送信
4. 届いたメールが日本語になっていることを確認：
   - 件名が「【ケンミツ】ログインリンク」
   - 本文が日本語
   - ボタンが緑色（#15803d）
   - リンクをクリックしてマイページに遷移できる

### Step 6: 完了報告

```
【Supabase メールテンプレート設定完了】

■ サイトURL
Site URL: https://mitsumori-maker.com
Redirect URLs: 4件追加済

■ メールテンプレート（4種）
- Confirm signup: 日本語化済
- Magic Link: 日本語化済
- Change Email: 日本語化済
- Reset Password: 日本語化済

■ 動作確認
[x] ログインリンクメールが日本語で届いた
[x] リンクからマイページに遷移成功
```

---

## トラブル対応

| 症状 | 対処 |
|---|---|
| テンプレート変更が反映されない | Saveボタンを押し忘れていないか確認。ブラウザをリロードして再確認 |
| リンクをクリックしてもログインできない | Redirect URLs に `https://mitsumori-maker.com/auth/callback` が入っているか確認 |
| `{{ .ConfirmationURL }}` がそのまま表示される | テンプレート変数を半角で正確に入力。前後にスペースを入れない |

---

## 禁止事項

- テンプレートのHTMLを変更する際に `{{ .ConfirmationURL }}` を削除・変更しないこと
- SMTP設定（カスタムメールサーバー）は変更しない（別途Resend設定で対応予定）
