# 14. Google Ads の Final URL を /construction/start に切り替える

MVP 仕様変更に伴い、広告のランディング先を **LP（/construction）から登録ページ（/construction/start）** に切り替える。

## 背景

旧導線: 広告 → LP `/construction` → ツール `/construction/new` → 登録誘導
新導線: 広告 → 登録 `/construction/start` → ツール `/construction/new`

理由:
- LP→ツール遷移率 21%（79% 離脱）が改善せず、メアド取得チャネルが完全にゼロ
- 登録ファーストでメアドを先取りしてドリップ教育チャネルを確保
- 「登録不要」訴求は実証データで CV につながらないことが確認済み

## 手順

### A. キャンペーン設定の Final URL を変更

1. https://ads.google.com/ にログイン
2. 「改正建設業法2025_見積書」キャンペーンを開く
3. 各広告グループの**広告**タブを開く
4. レスポンシブ検索広告（RSA）を編集
5. **最終ページ URL（Final URL）** を以下に変更:
   ```
   旧: https://mitsumori-maker.com/construction
   新: https://mitsumori-maker.com/construction/start
   ```
6. 保存
7. 審査が再走るが、LP 構成が大きく変わっていないので通常 1〜2 営業日で承認

### B. サイトリンク・コールアウトの URL も確認

サイトリンク表示オプションで個別 URL を指定している場合、必要に応じて更新:

| サイトリンク | 推奨 URL |
|---|---|
| 「無料で始める」「30秒で登録」系 | `/construction/start` |
| 「料金プラン」 | `/construction#pricing` |
| 「改正建設業法とは」 | `/construction#law` |
| 「使い方」 | `/construction/how-to` |
| 「FAQ」 | `/construction/faq` |

### C. UTM パラメータ（任意）

CV 経路を分析しやすくするため UTM を付ける場合:

```
https://mitsumori-maker.com/construction/start?utm_source=google&utm_medium=cpc&utm_campaign=law2025
```

GA4 上で Source/Medium/Campaign が分離して計測できる。

## 期待される効果

- 広告クリックから登録完了までのステップが 2 → 1 に減少
- メアド取得率の向上（KPI: /start 到達 → 登録 30%+）
- ドリップメール対象の増加 → Solo 転換率の改善

## ロールバック

Final URL を旧値に戻すだけで即時切り戻し可能。データには影響しない。

## 監視ポイント（切替後 1〜2 週間）

GA4 / 管理ダッシュボードで以下を確認:

1. `construction_start_view` イベント発火数（≒ 広告 → 登録ページ到達）
2. `construction_signup` イベント発火数（≒ 登録完了）
3. `/start → /new` の遷移率（GA4 のページ経路レポート）
4. `construction_law_banner_click` 発火数（バナー → LP 遷移）
5. `construction_subscribe_solo` 発火数（最終 CV）

期待ライン:
- 広告クリック → /start 到達: 90%+
- /start → 登録完了: 30%+（最低）/ 50%+（良好）
- 登録 → ツール 1 通完成: 30%+
- バナー CTR: 5%+（最低）/ 15%+（良好）
- 全体 CVR（広告 → Solo 課金）: 0.3% で最低ライン、1% で黒字
