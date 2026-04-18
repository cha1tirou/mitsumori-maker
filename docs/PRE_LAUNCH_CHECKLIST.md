# ケンミツ 広告運用開始前チェックリスト

バーチャルオフィス契約 → Stripe 本番化 → 広告運用開始 の流れで、
抜け漏れなく進めるためのチェックリスト。

**最終更新**: 2026-04-19

---

## ステータス凡例

- 🔴 **ブロッカー** — これが埋まるまで広告配信不可
- 🟠 **高優先** — 公開品質の確保に必要
- 🟢 **推奨** — 品質向上・運用効率化

---

## A. ブロッカー（配信開始前に必須）

### A-1. 🔴 バーチャルオフィス → 特商法表記の公開

Stripe の本人確認でも使われる住所なので、Stripe 本番化より前に確定させる。

- [ ] バーチャルオフィス契約完了（住所・電話・転送サービス確定）
- [ ] `src/app/construction/tokushoho/page.tsx` の更新:
  - [ ] `businessInfo.name` — 事業者名
  - [ ] `businessInfo.representative` — 運営責任者
  - [ ] `businessInfo.address` — バーチャルオフィス住所
  - [ ] `businessInfo.phone` — 電話番号
  - [ ] `businessInfo.email` — 問い合わせ用メール
  - [ ] `IS_PUBLISHED = true` に変更（準備中バナー非表示）
- [ ] Vercel へデプロイ
- [ ] /construction/tokushoho にアクセスして表示確認

### A-2. 🔴 Stripe 本番切替

詳細手順: `docs/setup-instructions/06-stripe-production.md`

- [ ] Stripe アカウント本人確認完了（バーチャルオフィス住所で申請）
- [ ] Stripe Dashboard で商品作成:
  - [ ] Solo Monthly (¥980/月)
  - [ ] Solo Yearly (¥9,800/年)
  - [ ] Team Monthly (¥2,980/月) — 準備中なら後回しでも可
  - [ ] Team Yearly (¥29,800/年) — 同上
- [ ] Price ID を取得
- [ ] Webhook エンドポイント登録: `https://mitsumori-maker.com/api/stripe/webhook`
- [ ] Webhook Signing Secret 取得
- [ ] Customer Portal の設定（キャンセル・プラン変更許可）
- [ ] Vercel 環境変数:
  - [ ] `STRIPE_SECRET_KEY` (本番)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (本番)
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `STRIPE_PRICE_SOLO_MONTHLY`
  - [ ] `STRIPE_PRICE_SOLO_YEARLY`
  - [ ] `STRIPE_PRICE_TEAM_MONTHLY`（任意）
  - [ ] `STRIPE_PRICE_TEAM_YEARLY`（任意）
- [ ] 再デプロイ

### A-3. 🔴 広告アカウント・計測タグ

- [ ] Google Ads アカウント作成 — `docs/setup-instructions/04-google-ads.md`
- [ ] Meta Pixel 作成 — `docs/setup-instructions/03-meta-pixel.md`
- [ ] コンバージョン変換ラベル取得（5種類）
- [ ] Vercel 環境変数:
  - [ ] `NEXT_PUBLIC_GOOGLE_ADS_ID`（AW-XXXXXXXXXX）
  - [ ] `NEXT_PUBLIC_META_PIXEL_ID`
  - [ ] `NEXT_PUBLIC_GADS_CONV_TOOL_START`
  - [ ] `NEXT_PUBLIC_GADS_CONV_PDF`
  - [ ] `NEXT_PUBLIC_GADS_CONV_SIGNUP`
  - [ ] `NEXT_PUBLIC_GADS_CONV_SUB_SOLO`
  - [ ] `NEXT_PUBLIC_GADS_CONV_SUB_TEAM`
- [ ] Tag Assistant / Meta Pixel Helper で発火確認

---

## B. 高優先（公開品質）

### B-1. 🟠 Supabase 本番稼働

- [ ] `docs/setup-instructions/01-vercel-env-supabase.md` 実施済み
- [ ] `docs/setup-instructions/05-supabase-email-templates.md` 実施済み
- [ ] テストアカウントで:
  - [ ] 新規登録 → 確認メール受信
  - [ ] ログイン成功
  - [ ] パスワードリセットメール受信 → 変更成功

### B-2. 🟠 Resend メール配信

- [ ] `docs/setup-instructions/02-resend-setup.md` 実施済み（DNS認証含む）
- [ ] /construction/checklist の「メールで受け取る」で実送信できる
- [ ] 迷惑メール判定回避（SPF/DKIM/DMARC 設定済）

### B-3. 🟠 景品表示法 / 誇大表現チェック

現状検出された要確認表現:

| 箇所 | 表現 | リスク | 推奨対応 |
|---|---|---|---|
| `src/components/construction/lp/Hero.tsx:58` | 「業界最安値帯」 | 中 | 合理的根拠（他社5社比較表）がなければ「月¥980〜」に変更 |
| `src/components/construction/lp/StatsBar.tsx:25` | 「業界最安値帯」 | 中 | 同上 |
| 各所 | 「完全対応」 | 低〜中 | 根拠リスト（対応項目一覧）とセットなら OK |
| 各所 | 「3分で作れる」 | 低 | 実測根拠あり（社内計測）なら OK |

- [ ] 「業界最安値帯」の根拠資料準備 or 表現差し替え
- [ ] 「完全対応」系の根拠明示（LawCompliance セクションで改正法の条項を列挙している状態で OK）
- [ ] 広告クリエイティブ内でも同様の表現規制を適用

### B-4. 🟠 法的文書の最新化

- [ ] `/construction/terms` — 最終改定日確認・Stripe/Supabase 記載の正確性
- [ ] `/construction/privacy` — 外部サービス（Vercel/Supabase/Stripe/GA/Meta Pixel/Resend/Google Fonts）すべて記載
- [ ] `/construction/tokushoho` — IS_PUBLISHED=true かつ実データ
- [ ] Stripe Checkout 画面への特商法リンク（Stripe Dashboard 設定）

### B-5. 🟠 ユーザーフロー E2E 動作確認（本番環境で）

- [ ] 未ログインでアクセス → LP 表示
- [ ] エディタ /construction/new で見積書入力 → プレビュー更新
- [ ] PDF ダウンロード（透かしあり）→ ローカル保存
- [ ] 新規登録 → 確認メール → ログイン
- [ ] ログイン後 PDF ダウンロード（透かしあり）
- [ ] 保存ボタン → 成功
- [ ] 保存 4回目で 402 エラー表示
- [ ] 料金ページへ → Solo Checkout 実行
- [ ] テストカード（`4242 4242 4242 4242`）で決済完了
- [ ] plan が solo に切り替わる（マイページで確認）
- [ ] 透かしなし PDF 出力できる
- [ ] 書類変換・CSV・メール送信・マスタ・原価・写真すべて使える
- [ ] Customer Portal から解約 → plan が free に戻る

---

## C. 推奨（あれば品質 UP）

### C-1. 🟢 エラー監視

- [ ] Sentry など外部 APM 導入 or Vercel Runtime Logs 監視体制
- [ ] Slack 通知（既存: `src/app/api/slack/` 系ルート あり）
- [ ] 決済失敗・Webhook エラーのアラート

### C-2. 🟢 パフォーマンス

- [ ] Lighthouse: LP モバイル LCP < 2.5s
- [ ] 375px 表示崩れ確認（LP・エディタ・料金・checklist）
- [ ] 主要画像の最適化（og-image.png, ヒーローSVG）

### C-3. 🟢 コンバージョン計測の完全性

広告運用中に触れない欠番があると機会損失になる。

- [ ] GA4 イベント受信:
  - [ ] `construction_lp_view`
  - [ ] `construction_tool_start`
  - [ ] `construction_pdf_download`
  - [ ] `construction_signup`
  - [ ] `construction_subscribe_solo`
- [ ] Meta Pixel イベント受信: `ViewContent` / `StartTrial` / `Lead` / `CompleteRegistration` / `Subscribe`
- [ ] Google Ads 変換ラベル発火確認

### C-4. 🟢 広告クリエイティブ準備

- [ ] 検索広告見出し 15本（30字以内）
- [ ] 検索広告説明文 4本（90字以内）
- [ ] 広告表示 URL: mitsumori-maker.com/construction
- [ ] ファイナル URL に UTM を付与:
  ```
  ?utm_source=google&utm_medium=cpc&utm_campaign=kensetsu_2025_launch&utm_content=headline_A
  ```
- [ ] ディスプレイ画像（1200×628, 300×250, 320×50 など）

### C-5. 🟢 運用ガードレール

- [ ] 初期予算: ¥1,000/日 × 7日でテスト配信
- [ ] 除外キーワード設定（「エロ」「求人」「無料」など関連性薄いもの）
- [ ] 配信エリア: 日本国内限定
- [ ] 配信時間: 平日日中優先（建設業の閲覧時間帯）
- [ ] 広告審査対応（Google/Meta 両方）

---

## D. 広告 ON の直前チェック（配信当日）

- [ ] 本番サイト全ページ 404/500 なし
- [ ] /construction/tokushoho 実データ公開
- [ ] /construction/terms 最終改定日記載
- [ ] Stripe Checkout が本番環境で動作
- [ ] サポート問い合わせ（Google Form）動作
- [ ] ドリップメール稼働中
- [ ] Resend 送信制限に余裕あり
- [ ] Supabase 接続エラーなし
- [ ] Google Ads Tag Assistant 全タグ Green
- [ ] Meta Pixel Helper で LP 表示時にイベント発火

---

## 関連ドキュメント

- `docs/setup-instructions/README.md` — 外部サービスセットアップ全体
- `docs/setup-instructions/01-vercel-env-supabase.md` — Supabase 環境変数
- `docs/setup-instructions/02-resend-setup.md` — メール配信
- `docs/setup-instructions/03-meta-pixel.md` — Meta Pixel
- `docs/setup-instructions/04-google-ads.md` — Google Ads
- `docs/setup-instructions/05-supabase-email-templates.md` — メールテンプレート
- `docs/setup-instructions/06-stripe-production.md` — Stripe 本番切替（本リスト A-2 の詳細手順）
