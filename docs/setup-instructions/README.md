# セットアップ指示書インデックス

ブラウザ操作が必要な初期セットアップ手順を、Claude Coworker 等の自動化エージェントに渡せる形式で整理しています。

## 指示書一覧

| # | ファイル | 内容 | 所要時間 | 優先度 |
|---|---|---|---|---|
| 01 | [01-vercel-env-supabase.md](./01-vercel-env-supabase.md) | Vercel に Supabase 環境変数を設定＋再デプロイ | 5〜10分 | 🔴 最優先 |
| 02 | [02-resend-setup.md](./02-resend-setup.md) | Resend アカウント作成＋DNS認証＋APIキー取得 | 30〜60分 | 🟡 高 |
| 03 | [03-meta-pixel.md](./03-meta-pixel.md) | Meta Business Suite + Facebook Pixel 作成 | 30分 | 🟢 中 |
| 04 | [04-google-ads.md](./04-google-ads.md) | Google Ads アカウント作成＋コンバージョン設定 | 45分 | 🟢 中 |
| 05 | [05-supabase-email-templates.md](./05-supabase-email-templates.md) | Supabase メールテンプレート日本語化＋サイトURL設定 | 10〜15分 | 🔴 最優先 |
| 06 | [06-stripe-production.md](./06-stripe-production.md) | Stripe 本番切替（商品・Webhook・Portal・環境変数） | 60〜90分 | 🔴 広告配信前必須 |

総合チェックリスト: [`../PRE_LAUNCH_CHECKLIST.md`](../PRE_LAUNCH_CHECKLIST.md)

## 実行順序

### 最優先（本番サービス稼働に必要）

1. **01-vercel-env-supabase** — これが終われば認証機能が本番で動き始める

### 高優先（メール機能に必要）

2. **02-resend-setup** — チェックリストDL・メール送信機能・ドリップメールが動く

### 中優先（広告運用前に必要）

3. **03-meta-pixel** — 広告効果測定の基盤
4. **04-google-ads** — 検索広告配信の基盤

## その他の手動セットアップ

以下はブラウザ操作指示書ではカバーしていません：

- **バーチャルオフィス契約** — 業者選定＆契約書締結は本人のみ
- **Stripe 申請** — バーチャルオフィス到着後に本人確認書類アップロードが必要
- **YouTube チャンネル + OAuth** — Google アカウントで管理、OAuth Playground 使用
- **HeyGen API プラン契約** — クレジットカード登録（月$99）

これらは `SETUP_CONSTRUCTION.md` を参照してください。

## 使い方

各 `.md` ファイルの内容を丸ごと Claude Coworker に貼り付けて、「この指示書通り実行して」と依頼すれば完了できます。

複数まとめて渡す場合は「1から順番に実行」と指示してください。依存関係は：

- 01 → 他すべてより先（環境変数設定の基盤）
- 02, 03, 04 は互いに独立（並行実行可）
