# mitsumori-maker

建設業・一人親方向けの改正建設業法2025対応SaaS＋汎用無料見積書ツール。

## プロジェクト概要

- **本番URL**: https://mitsumori-maker.com
- **本命プロダクト**: `/construction` — 建設業向け月¥980 の見積書SaaS
- **既存プロダクト**: `/`・`/tools/*` — 汎用の無料見積書/請求書/納品書/発注書ツール

詳細は以下のドキュメント：

- **[SERVICE.md](./SERVICE.md)** — サービス全体像・コンセプト・機能一覧・ページ一覧・データモデル
- **[SETUP_CONSTRUCTION.md](./SETUP_CONSTRUCTION.md)** — 本番起動の詳細手順書（Supabase・Stripe・HeyGen・YouTube等）
- **[CLAUDE.md](./CLAUDE.md)** — Claude Code 運用ガイド
- **[supabase/schema.sql](./supabase/schema.sql)** — DBスキーマ
- **[.env.example](./.env.example)** — 環境変数リファレンス

## 技術スタック

- **Next.js 14** (App Router) / **TypeScript** / **Tailwind CSS**
- **Supabase** — 認証・DB・ストレージ
- **Stripe** — サブスク課金（Solo ¥980/月）
- **@react-pdf/renderer** — PDF生成（透かしあり/なし）
- **Resend** — メール送信・ドリップ配信
- **Anthropic Claude API + HeyGen + YouTube Data API** — 週次動画自動投稿

## ローカル開発

```bash
npm install
cp .env.example .env.local  # 値を埋める（未設定でも多くの機能は動作）
npm run dev
```

http://localhost:3000 にアクセス。

## 型チェック・ビルド

```bash
npx tsc --noEmit       # 型チェック
npm run build          # 本番ビルド
npm run lint           # ESLint
```

## ユニットテスト

建設業ロジックの回帰テスト：

```bash
npx tsx scripts/test-calc.ts       # 計算ロジック（法定福利費・諸経費・粗利）
npx tsx scripts/test-checker.ts    # 建設業法チェッカー・工種プリセット
```

## デプロイ

main ブランチへのpushで Vercel が自動デプロイします。

本番動作には `.env.example` の全変数を Vercel の環境変数に設定する必要があります（詳しくは `SETUP_CONSTRUCTION.md`）。

## 主要ページ一覧

| パス | 説明 |
|---|---|
| `/construction` | 建設業向けLP（本命プロダクト） |
| `/construction/new` | 建設業向け見積書作成ツール |
| `/construction/quotes/[id]` | 保存済み見積書の再編集 |
| `/construction/mypage` | マイページ（プラン・履歴・紹介・フィードバック） |
| `/construction/checklist` | 改正建設業法2025対応チェックリスト（リードマグネット） |
| `/construction/login` | マジックリンクログイン |
| `/construction/terms` `/privacy` `/tokushoho` | 法的ページ |
| `/construction/admin` | 管理ダッシュボード（ADMIN_EMAILS限定） |
| `/` | 汎用見積書ツール（既存） |
| `/tools/{invoice,delivery,purchase-order,invoice-calc}` | 他の汎用書類ツール |
| `/guide/*` | SEOガイド記事（27本＋） |

## API一覧

| パス | メソッド | 役割 |
|---|---|---|
| `/api/stripe/{checkout,portal,webhook}` | POST | Stripe 統合 |
| `/api/quotes` | POST/DELETE | 見積書 保存・論理削除 |
| `/api/quotes/[id]/duplicate` | POST | 見積書 複製 |
| `/api/send-quote` | POST | PDF添付メール送信（Solo以上） |
| `/api/referral` | GET | 自分の紹介コード取得 |
| `/api/lead-magnet` | POST | チェックリストPDFのメール配信＋ドリップ |
| `/api/user-data` | GET/PUT | 自社情報・マスタの Supabase 同期 |
| `/api/feedback` | POST | βフィードバック収集 |
| `/api/cron/generate-video` | GET | 週次YouTube動画自動投稿（Vercel Cron） |
| `/auth/callback` | GET | Supabase Auth コールバック |

## ライセンス

Private / Internal use only.
