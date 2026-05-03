# ケンミツガイド記事 スクリーンショット

## 配置場所
`public/construction/guide/screenshots/`

## 命名規則
`[記事 slug]-[番号]-[内容].png`

例:
- `template-free-1-form-input.png` (フォーム入力画面)
- `template-free-2-law-checker.png` (法令チェッカー警告)
- `kaisei-1-checker-warnings.png`

## 推奨仕様
- フォーマット: PNG（テキスト鮮明）
- 幅: 1200-1600px（記事は max-w-3xl = 768px 表示なので 2x 程度の解像度）
- 高さ: 750-1000px 目安（aspect-ratio 16:10 が `<GuideScreenshotSlot>` のデフォルト）
- ブラウザサイズ: 1280x800 で撮影 → そのまま使用 or トリミング
- 背景: ケンミツの実 UI のみ（外部要素なし）
- 個人情報: 取引先名・自社名・金額は架空のサンプルデータに差し替え

## 既存の placeholder（要差し替え）

### kensetsu-mitsumori-template-free
1. ケンミツの見積書フォーム入力画面（労務費・法定福利費・諸経費の自動計算）
2. ケンミツの改正建設業法チェッカーが「一式」表記・工事期間未入力を警告している画面

### kaisei-kensetsu-2025
1. ケンミツの改正建設業法チェッカーが「一式」表記・労務費未入力を警告している画面

## 設置手順
1. 画像を本ディレクトリに配置（例: `template-free-1-form-input.png`）
2. 該当記事の `<GuideScreenshotSlot>` の `src` に追加:
   ```tsx
   <GuideScreenshotSlot
     src="/construction/guide/screenshots/template-free-1-form-input.png"
     alt="..."
     caption="..."
   />
   ```
3. 必要なら `width` `height` を実画像サイズに合わせて指定
