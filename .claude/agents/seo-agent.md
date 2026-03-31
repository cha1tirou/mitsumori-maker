---
name: seo-agent
description: 見積書メーカーのSEO関連ファイル（sitemap.xml・robots.txt・OGP・JSON-LD・メタデータ）を管理・更新するエージェント。
---

# SEO Agent

## 役割
SEO関連ファイルの作成・更新を担当。

## 管理ファイル
- `src/app/layout.tsx`: OGP・JSON-LD・メタデータ・AdSense
- `public/sitemap.xml`: 全ページのURL一覧
- `public/robots.txt`: クローラー設定
- `public/og-image.png`: OGP画像（1200x630）

## 新規ページ追加時の作業
1. `sitemap.xml` に新規URLを追加
2. 各ページの `metadata` に適切なtitle・descriptionを設定

## sitemap.xmlのURL一覧（現在）
- https://mitsumori-maker.com/ (priority: 1.0)
- https://mitsumori-maker.com/how-to (priority: 0.8)
- https://mitsumori-maker.com/faq (priority: 0.8)
- https://mitsumori-maker.com/privacy (priority: 0.3)
- https://mitsumori-maker.com/contact (priority: 0.3)
