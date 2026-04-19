# 07. Sentry エラー監視導入（任意・推奨）

**所要時間**: 30〜45 分
**優先度**: 🟢 推奨（広告運用開始と同時 or 開始 1 週間以内）

---

## 概要

本番環境で発生するクライアント/サーバーエラーを Sentry にリアルタイム収集する。
Stripe Webhook の失敗や Supabase 接続エラーなど、ユーザーからは見えないが課金に直結する障害を即座に検知できる。

**Sentry なしだと困ること**:
- 決済失敗の兆候（Webhook エラー頻発など）に気付くのが遅れる
- 特定ユーザーの PDF 生成失敗原因を追えない
- 初回デプロイ直後の client エラーを見逃す

---

## 料金

Sentry 無料プラン:
- 5,000 エラー/月まで
- ユーザー 1 名
- 7日間の履歴保持

初期フェーズには十分。

---

## 手順

### 1. Sentry アカウント作成

1. https://sentry.io/signup/ にアクセス
2. Google or GitHub でサインアップ
3. プロジェクト作成:
   - Platform: **Next.js**
   - Project name: `mitsumori-maker`
   - Alert Frequency: `Alert me on every new issue`

作成後の DSN (Data Source Name) をコピーしておく。
形式: `https://XXXXXXX@oXXXXXX.ingest.sentry.io/XXXXXXXX`

### 2. npm パッケージのインストール

```bash
npm install @sentry/nextjs
```

### 3. Sentry Wizard の実行

Sentry が自動で Next.js 向け設定ファイルを生成してくれる。

```bash
npx @sentry/wizard@latest -i nextjs
```

対話プロンプトで:
- プロジェクト: `mitsumori-maker`
- ソースマップアップロード: Yes（本番エラーでスタックトレースが読めるように）
- `.env.sentry-build-plugin` にトークンが書き込まれる

自動生成されるファイル:
- `sentry.client.config.ts` — ブラウザ側
- `sentry.server.config.ts` — Node.js 側
- `sentry.edge.config.ts` — Edge Runtime 側
- `next.config.js` の末尾に `withSentryConfig` ラッパー追加

### 4. 設定カスタマイズ

`sentry.client.config.ts` を以下のように調整推奨:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% のトランザクションを収集
  replaysSessionSampleRate: 0.0, // 通常は録画しない
  replaysOnErrorSampleRate: 0.5, // エラー時のみ 50% 録画
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production", // ローカルで飛ばさない
  ignoreErrors: [
    // ブラウザ拡張由来の無意味なエラーを無視
    "ResizeObserver loop",
    "Non-Error promise rejection captured",
  ],
});
```

### 5. Vercel 環境変数の設定

| 変数名 | 値 | 環境 |
|---|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | 手順 1 で取得した DSN | Production |
| `SENTRY_AUTH_TOKEN` | Sentry → Settings → Auth Tokens で発行 | Production (Build-time) |
| `SENTRY_ORG` | Sentry 組織スラッグ | Production |
| `SENTRY_PROJECT` | `mitsumori-maker` | Production |

`SENTRY_AUTH_TOKEN` はソースマップアップロードに使う。

### 6. テストエラーを送信

ビルド後、本番環境で以下を実行してテスト:

ブラウザ Console で:
```js
throw new Error("Sentry Test Error - 本番初回確認");
```

Sentry ダッシュボードで 1〜2 分以内にエラーが受信されるか確認。

### 7. 主要ポイントにカスタムキャプチャを追加（任意）

Stripe Webhook の失敗箇所で既に `console.error` + Slack 通知している箇所を Sentry にも投げる:

```typescript
// src/app/api/stripe/webhook/route.ts の catch 内
import * as Sentry from "@sentry/nextjs";

Sentry.captureException(err, {
  tags: { stripe_event: event.type },
  extra: { event_id: event.id },
});
```

---

## 運用ルール

- **Slack 通知**: Sentry → Settings → Integrations → Slack で連携。High priority (Error/Warning) のみ #alerts へ
- **レビュー頻度**: 週1回はダッシュボードで新規エラー確認
- **Issue Resolution**: 修正したらダッシュボードで Resolve マーク

---

## 代替案

Sentry 以外の選択肢:

| ツール | 無料プラン | 特徴 |
|---|---|---|
| Sentry | 5,000 errors/月 | 最も一般的、Next.js 公式サポート |
| LogRocket | 1,000 セッション/月 | セッション録画が強み |
| Vercel Log Drain + Axiom | 限定無料 | 純粋なログ収集、分析は別途 |
| Better Stack (Logtail) | 1GB/月 | シンプル・日本語サポートあり |

このプロジェクトは Next.js on Vercel なので **Sentry が最適**。

---

## チェックリスト

- [ ] Sentry アカウント作成
- [ ] `@sentry/nextjs` インストール
- [ ] Wizard 実行
- [ ] 設定ファイル調整
- [ ] Vercel 環境変数 4つ設定
- [ ] 本番デプロイ
- [ ] テストエラー送信 → ダッシュボードで受信確認
- [ ] Slack 連携（任意）
