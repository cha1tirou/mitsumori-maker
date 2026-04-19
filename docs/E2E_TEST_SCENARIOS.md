# ケンミツ 本番切替後 E2E テストシナリオ

Stripe 本番化・バーチャルオフィス住所公開・広告配信開始の直前に、
本番環境で手動で通すべきユーザーフロー一覧。

**所要時間**: 全シナリオ通しで 40〜60 分
**前提**: `docs/PRE_LAUNCH_CHECKLIST.md` の A-1〜A-3 がすべて完了

---

## 事前準備

- [ ] テスト用メールアドレス（受信できる実アドレス。Gmail+aliasでOK、例: `you+test1@gmail.com`）
- [ ] 実カード1枚（返金前提でテスト決済用）
- [ ] スマホ＋PC（両デバイスで最低1周ずつ）
- [ ] Chrome DevTools を開いて Console タブ確認できる状態

---

## シナリオ 1: 未ログインでの基本動作確認（5分）

**目的**: 広告から来たユーザーの最初の体験を検証。

1. シークレットウィンドウで https://mitsumori-maker.com/construction を開く
2. [ ] LP がエラーなく表示される（Console にエラー赤字ゼロ）
3. [ ] ヒーローの「施行から N 日経過」が今日日付と整合
4. [ ] 「登録不要で今すぐ試す」ボタンをクリック → /construction/new に遷移
5. [ ] フォーム入力: 顧客名「テスト」、工事名「テスト」、明細1行（数量1/単価10000）
6. [ ] プレビューに入力内容が反映される
7. [ ] LawCheckPanel が「OK」または警告を適切に表示
8. [ ] 「PDFダウンロード」オレンジボタンをクリック
9. [ ] 生成中モーダル → 数秒後にダウンロード開始
10. [ ] 完了モーダル「PDFを保存しました」表示
11. [ ] ダウンロードフォルダに PDF があり、開いて透かし「無料版 SAMPLE」が入っている
12. [ ] PDF内に日本語が文字化けなく表示されている
13. [ ] 完了モーダルの「無料登録で見積書を保存する →」リンクが /construction/login へ遷移

**想定結果**: 全項目 ✅

---

## シナリオ 2: 新規登録フロー（10分）

**目的**: Supabase + Resend の連携・メールテンプレ・認証フローを検証。

1. /construction/login から新規タブを選択
2. メール `you+test2@gmail.com` + パスワード `TestPass123!`
3. [ ] 「アカウントを作成」→ 「確認メール送信しました」画面
4. [ ] メールボックスに確認メール到着（2分以内）
5. [ ] メール内リンクをクリック → ログイン済み状態で /construction/mypage へリダイレクト
6. [ ] マイページに email 表示、plan = Free
7. [ ] サインアウト → ログイン画面 → 同じメール/パスワードで再ログイン成功

**トラブルシューティング**:
- メールが来ない → Supabase Dashboard → Auth → Logs で送信ステータス確認
- リンクをクリックしても未ログイン → Supabase 設定の Site URL / Redirect URL 確認

---

## シナリオ 3: Free プランでの PDF・保存上限（10分）

**目的**: Free プラン制限（3通保存・透かし常時）が効いているか検証。

1. 新規登録済みのアカウントで /construction/new
2. 見積書 1通目を作成して「見積書を保存」
3. [ ] 保存成功 → URL が /construction/quotes/[id] に変わる
4. /construction/new で 2通目を作成して保存
5. [ ] 保存成功
6. /construction/new で 3通目を作成して保存
7. [ ] 保存成功
8. /construction/new で 4通目を作成して保存
9. [ ] エラー表示「無料プランでは月3通までしか保存できません」
10. [ ] 3通目までの PDF すべて透かし付きで出力される

**想定結果**: 月3通の壁に到達 → Solo アップグレードの動機が生まれる

---

## シナリオ 4: Solo 機能ロックの導線（5分）

**目的**: Free ユーザーが Solo 限定機能をタップした際の誘導モーダルを検証。

1. /construction/new で適当に入力
2. [ ] フォーム右上「取引先マスタ」ボタン → Solo 誘導モーダル
3. [ ] モーダル「Solo プランの詳細を見る」→ /construction#pricing へ遷移
4. [ ] 戻って「単価マスタ」（明細行のマスタボタン）→ 同じ誘導モーダル
5. [ ] 「原価・粗利」トグル → 同モーダル
6. [ ] 「工事写真」追加ボタン → 同モーダル
7. [ ] Free 用ヘッダー下の Solo CTA カードが表示されている（¥980 / 6ベネフィット）

---

## シナリオ 5: Solo 契約フロー（10分）⚠️ 実カード決済あり

**目的**: Stripe Checkout → plan 切替 → Solo 機能解放までの通し。

1. /construction#pricing の「Soloで始める」をクリック
2. [ ] Stripe Checkout 画面へ遷移、商品名「ケンミツ Solo プラン」、価格 ¥980 表示
3. [ ] 利用規約・プライバシー・特商法のリンクが全て機能（Stripe 側設定）
4. **実カード**で決済実行
5. [ ] 決済完了 → /construction/mypage?checkout=success へリダイレクト
6. [ ] 「プランのアップグレードが完了しました」緑バナー表示
7. [ ] プラン表示が `Solo` に変化（数秒かかる場合あり、更新ボタンで反映確認）
8. [ ] Stripe Dashboard で subscription が `active`、customer_id が Supabase profiles テーブルに入っている
9. [ ] Supabase Dashboard → profiles テーブルで該当ユーザーの plan = solo に更新されている
10. /construction/new で:
    - [ ] PDF が**透かしなし**で出力される
    - [ ] 取引先マスタ使える
    - [ ] 単価マスタ使える
    - [ ] 原価・粗利トグル ON に切り替わる
    - [ ] 工事写真アップロードできる
    - [ ] 「他の書類に変換」ボタン表示
    - [ ] 「会計ソフトにCSV出力」ボタン表示
    - [ ] 「メールで送信」ボタン表示

**トラブルシューティング**:
- plan が切り替わらない → Stripe Dashboard → Webhook → Recent events で配信状態確認。Failed なら response ログを見る
- Webhook が来ているのに plan 変わらない → Supabase SUPABASE_SERVICE_ROLE_KEY 設定確認

---

## シナリオ 6: 解約フロー（10分）

**目的**: Customer Portal からの解約→ Free 落ち検証。

1. /construction/mypage → 「プラン管理・解約」ボタン（PortalButton）
2. [ ] Stripe Customer Portal へ遷移（stripe.com のドメイン）
3. [ ] Solo サブスクリプションを「キャンセル」
4. [ ] 「サイクル終了時キャンセル」の設定になっている（設定確認: Dashboard → Customer Portal）
5. /construction/mypage へ戻る
6. [ ] subscription_status が `canceled`、ただしサイクル終了まで plan=solo（機能使える）
7. サイクル終了まで待てないので、Stripe Dashboard から subscription を手動で「即時終了」
8. Webhook 受信後、マイページをリロード
9. [ ] plan が `Free` に戻る
10. [ ] PDF が透かし付きに戻る
11. [ ] Solo 機能が再びロック状態に

---

## シナリオ 7: メール送信（Solo 限定・Resend 動作確認）

Solo プラン契約中の状態で:

1. /construction/quotes/[id] で保存済み見積書を開く
2. 「メールで送信」をクリック
3. [ ] ダイアログ表示
4. 送信先: `you+test3@gmail.com`、件名・本文の初期値が表示される
5. [ ] 送信ボタン → 「送信しました」トースト
6. [ ] 受信メールに PDF 添付で届く
7. [ ] メールヘッダの From が `RESEND_FROM_EMAIL` 設定値と一致
8. [ ] DKIM/SPF/DMARC 認証通過（Gmail 上部「詳細」で確認）

---

## シナリオ 8: リードマグネット（チェックリスト PDF 配布）

1. シークレットウィンドウで /construction/checklist を開く
2. 「メールで受け取る」ボタン → ダイアログ
3. メール入力 → 送信
4. [ ] 「送信しました」画面
5. [ ] 受信メールに PDF ダウンロードリンク
6. [ ] リンクから PDF が開ける

---

## シナリオ 9: 管理ダッシュボード

1. `ADMIN_EMAILS` に登録したメールで /construction/admin にアクセス
2. [ ] KPI カードが表示される（ユーザー数・有料ユーザー・MRR 等）
3. [ ] 実際に登録したテストアカウントが最近のユーザー登録に出る
4. [ ] テスト解約分が Churn に反映（日時遅延あり）
5. 未登録メールでアクセスすると「管理者権限がありません」表示

---

## シナリオ 10: エラー耐性

1. /construction/qwertyuiop （存在しないパス）→ 404 ページ表示
2. [ ] not-found.tsx が表示される
3. [ ] オレンジボタン「マイページに戻る」が機能
4. /construction/error への意図的な遷移（該当なければスキップ）

---

## シナリオ 11: モバイル（375px 基準）

Chrome DevTools → iPhone SE (375px) エミュレーションで:

1. [ ] LP が崩れなく表示（特に Comparison のテーブル → カード積層になる）
2. [ ] Pricing の Solo カードがはみ出ない
3. [ ] エディタでフォーム・プレビューのタブ切替動作
4. [ ] PDF ダウンロード動作

---

## 直前チェック: 広告 ON する瞬間

以下を再確認してから広告を Enable:

- [ ] 本番 Stripe キーが環境変数に設定されている（sk_live_ で始まる）
- [ ] 特商法ページが `IS_PUBLISHED=true` で実データ表示
- [ ] Google Ads Tag Assistant で LP に入った時に `construction_lp_view` 発火
- [ ] Meta Pixel Helper で `ViewContent` 発火
- [ ] 日予算・配信エリア（日本）・除外キーワード設定完了
- [ ] Search Console で sitemap 登録済み＆カバレッジエラーなし

---

## 終了後のクリーンアップ

テストで作った決済分:

1. Stripe Dashboard → 該当 Subscription → Refund
2. Supabase のテストユーザーレコード削除（profiles テーブル）
3. 本人テストメール分はキャンセル

本番稼働で必要ないテストデータを残さない。
