# 13. Supabase Email Confirmation を OFF にする

ケンミツの新規登録フローを「メール確認待ちなし・即時セッション化」に変更するための Supabase Dashboard 操作手順。

## 背景

旧設計: 登録 → 確認メール送信 → リンククリック → ログイン
新設計: 登録 → 即セッション → 即ツール画面（PDF DL も即時可能）

理由:
- 建設業ユーザのキャリアメール（au/docomo/softbank）が PC ドメインを拒否設定にしてメール届かない事例あり
- PDF DL のピーク熱量で「メール待ち」は離脱の主因
- Free アカウントは害が小さく、Solo 課金時に Stripe が本人確認するので問題ない

## 手順

1. https://supabase.com/dashboard にログイン
2. ケンミツのプロジェクトを選択
3. 左メニュー **Authentication** → **Providers**
4. **Email** プロバイダの設定を開く
5. **Confirm email** トグルを **OFF** にする
6. **Save** をクリック

## 影響範囲

- 新規登録: `signUp()` の戻り値に session が即座に含まれる
- 既存ユーザー: 影響なし
- 過去に確認メール未クリックで放置されたユーザー: 自動的に有効扱いになる
- パスワードリセット: 既存挙動のまま（リセット時のみメール送信）

## 確認方法

設定変更後、本番環境で以下を確認:

```
https://mitsumori-maker.com/construction/start
```

新規メアドで登録 → 確認メールを待たずに即ツール画面に遷移すれば成功。

## ロールバック

問題があれば同じ画面で **Confirm email** を ON に戻すだけ。データには影響しない。
