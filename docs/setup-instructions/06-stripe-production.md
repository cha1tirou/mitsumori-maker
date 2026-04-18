# 06. Stripe 本番切替（バーチャルオフィス到着後）

**所要時間**: 60〜90分（本人確認審査待ち除く）
**前提**: バーチャルオフィス契約完了（住所・電話確定）

---

## 概要

テスト環境で動作している Stripe を本番環境に切り替え、実際のクレジットカード決済を受け付けられる状態にする。

---

## 手順

### 1. Stripe アカウントの本人確認提出

1. https://dashboard.stripe.com/ にログイン
2. 右上のアカウントメニュー → 「アクティベート」
3. 事業者情報入力:
   - 事業形態（個人事業主 or 法人）
   - 事業者名
   - **住所: バーチャルオフィス住所**
   - **電話番号: バーチャルオフィス電話**
4. 本人確認書類アップロード（運転免許証 or マイナンバーカード）
5. 銀行口座情報（売上入金先）
6. 提出 → 審査 1〜3 営業日

審査通過までは本番決済は使えない。通知メールを待つ。

### 2. 商品・価格の作成

1. Stripe Dashboard 左メニュー「商品」→「新規商品を追加」

#### Solo プラン

**月額**:
- 商品名: `ケンミツ Solo プラン`
- 説明: `建設業向け見積書作成ツール Solo プラン（月額）`
- 価格: `¥980` / JPY / 定期（毎月）
- 作成 → 「API ID」をコピー（例: `price_1XXXXXXX`）→ これが `STRIPE_PRICE_SOLO_MONTHLY`

**年額**:
- 同じ商品の「価格を追加」
- 価格: `¥9,800` / JPY / 定期（年次）
- 作成 → API ID をコピー → `STRIPE_PRICE_SOLO_YEARLY`

#### Team プラン（リリース時に作成）

同じ手順で `¥2,980/月` と `¥29,800/年` を作成。

### 3. Webhook の登録

1. Dashboard 左メニュー「開発者」→「Webhook」→「エンドポイントを追加」
2. エンドポイント URL: `https://mitsumori-maker.com/api/stripe/webhook`
3. 受信するイベント:
   - [x] `checkout.session.completed`
   - [x] `customer.subscription.created`
   - [x] `customer.subscription.updated`
   - [x] `customer.subscription.deleted`
   - [x] `invoice.payment_succeeded`
   - [x] `invoice.payment_failed`
4. 追加 → エンドポイント詳細の「署名シークレット」を表示 → コピー → `STRIPE_WEBHOOK_SECRET`

### 4. Customer Portal の設定

1. Dashboard「設定」→「Billing」→「Customer Portal」
2. 機能を許可:
   - [x] サブスクリプションのキャンセル
   - [x] サブスクリプションのプラン変更（Solo ↔ Team 等）
   - [x] 支払い方法の更新
   - [x] 請求履歴の閲覧
3. キャンセルポリシー:
   - 即時キャンセルにする場合: 「サイクル終了時」を選ぶ（既存ユーザーが次回更新日まで使えるよう配慮）
4. ブランディング: ロゴ・カラー設定（任意、ケンミツのネイビー #1E40AF）
5. 保存

### 5. 特定商取引法リンクの設定

1. Dashboard「設定」→「ブランディング」または「決済フォーム」
2. カスタマイズ可能な場合:
   - 利用規約 URL: `https://mitsumori-maker.com/construction/terms`
   - プライバシーポリシー URL: `https://mitsumori-maker.com/construction/privacy`
   - 特定商取引法 URL: `https://mitsumori-maker.com/construction/tokushoho`

### 6. Vercel 環境変数の設定

https://vercel.com/ の対象プロジェクト → Settings → Environment Variables で以下を追加。

| 変数名 | 値 | 環境 |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...`（本番用Secret Key） | Production |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...`（本番用Publishable Key） | Production |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...`（Webhook Signing Secret） | Production |
| `STRIPE_PRICE_SOLO_MONTHLY` | `price_XXX`（Solo 月額の Price ID） | Production |
| `STRIPE_PRICE_SOLO_YEARLY` | `price_XXX`（Solo 年額の Price ID） | Production |
| `STRIPE_PRICE_TEAM_MONTHLY` | `price_XXX`（Team 月額、任意） | Production |
| `STRIPE_PRICE_TEAM_YEARLY` | `price_XXX`（Team 年額、任意） | Production |

**注意**: テスト環境で使っていた `sk_test_...` / `pk_test_...` は本番では使わない。Preview 環境でのみ残すか、丸ごと本番キーに差し替えるか好みで。

### 7. 再デプロイ

環境変数を設定したら、Vercel で最新の Production デプロイを trigger:
- Vercel Dashboard → Deployments → 最新の main → 「Redeploy」

### 8. E2E 動作確認

本番環境で以下を実施（自分のメアドで OK）:

1. `https://mitsumori-maker.com/construction/new` で見積書作成
2. `/construction/login` で新規登録
3. `/construction#pricing` で「Soloで始める」
4. Stripe Checkout 画面で**実際のカードで** ¥980 決済
5. マイページ `/construction/mypage` でプランが Solo に変わっていることを確認
6. 透かしなし PDF がダウンロードできることを確認
7. マイページの「プラン管理」→ Customer Portal で解約実行
8. 即時 or 次回更新日に plan が free に戻ることを確認
9. Stripe Dashboard で該当取引を「返金」して本人のカードへ戻す

本人テスト 1件は必須。これで決済フロー全体が壊れていないことを保証する。

---

## トラブルシューティング

### 決済後に plan が切り替わらない

Webhook が受信できていない可能性。

1. Stripe Dashboard → Webhook → 該当エンドポイント → Recent events で配信状況確認
2. 失敗していれば `Response` を見る
3. よくある原因:
   - `STRIPE_WEBHOOK_SECRET` が未設定 or 間違い → 署名検証エラー
   - エンドポイント URL が間違い（末尾スラッシュ・HTTPS 必須）
   - Vercel のファンクションタイムアウト → 10秒以内に完了する必要

### Customer Portal で「プランがありません」と出る

Solo プランが Customer Portal の対象商品に入っていない可能性。
Dashboard → Billing → Customer Portal → 製品で Solo を選択。

### 本番キーに切り替えたら開発環境でエラー

Vercel の Preview 環境でもキーを設定するか、ローカル開発の `.env.local` は test キーのまま使う。

---

## チェックリスト

- [ ] 本人確認通過
- [ ] Solo 商品作成（月額・年額）
- [ ] Webhook 登録 + Secret 取得
- [ ] Customer Portal 設定
- [ ] Vercel 環境変数設定（7つ）
- [ ] 再デプロイ
- [ ] 本人カードで ¥980 決済 → plan 切替確認
- [ ] Customer Portal で解約 → plan 戻り確認
- [ ] 返金処理
