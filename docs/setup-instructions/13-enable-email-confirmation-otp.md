# 13. Supabase Email Confirmation を ON にする（OTP フロー対応）

ケンミツの新規登録は **OTP（マジックリンク）+ パスワード設定** フローに統一する。
そのため Supabase 側で **Confirm email = ON** にする必要がある。

## 背景

旧設計（廃止）: 登録 → 即セッション → ツール画面（確認メールなし）
新設計: メアド入力 → 確認メール送信 → リンククリック → /setup-password でパスワード設定 → マイページ

理由:
- ターゲットの主流デバイスは PC（Gmail/Yahoo/Outlook）でキャリアメール拒否問題は軽微
- ドリップメールで改正建設業法の教育を行うには、メアド真正性の保証が必須
- typo・偽メアド・Bot 流入の抑止
- 業界標準の登録 UX

## 手順

> **注意**: 最新の Supabase Dashboard では「Confirm email」設定が Project Settings 配下に移動している。

1. https://supabase.com/dashboard にログイン
2. ケンミツのプロジェクトを選択
3. 左サイドバー**最下部**の **Project Settings**（⚙️ 歯車アイコン）をクリック
4. Project Settings 画面の左メニューから **Authentication** を選択
5. 画面内の **User Signups** セクションを探す
6. **Confirm email** トグルを **ON** にする
7. **Save changes** をクリック

直接 URL で開くなら:

```
https://supabase.com/dashboard/project/[プロジェクトID]/settings/auth
```

## メールテンプレートの確認

Confirm email を ON にすると、以下のメールテンプレートが使われる:

- **Magic Link**: signInWithOtp で送信されるリンクメール（新フロー /start で使用）
- **Confirm signup**: 旧 signUp で使われていた（互換のため残置）

両テンプレートで以下のリンク形式を使うように統一:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next={{ .RedirectTo }}
```

これで `/auth/confirm` ルートがトークン検証して `next` 先（/construction/setup-password）に飛ばす。

## 確認方法

設定変更 + Vercel デプロイ完了後、本番環境で以下を確認:

```
https://mitsumori-maker.com/construction/start
```

シークレットウィンドウで新規メアド（例: cha1tirou+kenmitsu-test02@gmail.com）登録 →
「確認メールを送信しました」画面 → メール内リンククリック →
`/construction/setup-password` でパスワード入力 → 「アカウント作成完了」表示 →
2 秒後にマイページへ遷移、まで通れば成功。

## ロールバック

問題があれば同じ画面で **Confirm email** を OFF に戻すと旧挙動に戻る（即時セッション）。
ただし現在のコード（`signInWithOtp` 使用）は Confirm email = ON 前提なので、
OFF に戻す場合はコード側も `signUp` フローへ書き換える必要がある。
