# 見積書メーカー — Claude Code プロジェクトガイド

## プロジェクト概要
- **サービス名**: 見積書メーカー
- **本番URL**: https://mitsumori-maker.com
- **GitHub**: cha1tirou/mitsumori-maker
- **Vercel**: cha1tirous-projects / mitsumori-maker
- **デプロイ**: mainブランチへのpushで自動デプロイ

## 技術スタック
- Next.js 14 / App Router (`src/app/` 構成)
- TypeScript / Tailwind CSS
- フォント: Noto Sans JP
- PDF出力: @react-pdf/renderer

## ディレクトリ構成
```
src/
├── app/
│   ├── layout.tsx        # 共通レイアウト・メタデータ・AdSense・フッター
│   ├── page.tsx          # トップページ（見積書作成ツール本体）
│   ├── how-to/page.tsx   # 使い方ページ
│   ├── faq/page.tsx      # よくある質問ページ
│   ├── privacy/page.tsx  # プライバシーポリシー
│   └── contact/page.tsx  # お問い合わせ（Googleフォームリンク）
├── components/
│   ├── QuoteForm.tsx       # 見積入力フォーム
│   ├── QuotePreview.tsx    # リアルタイムプレビュー
│   ├── TemplateSelector.tsx
│   ├── PdfDownloadButton.tsx
│   └── templates/
│       ├── StandardTemplate.tsx
│       ├── MinimalTemplate.tsx
│       └── PremiumTemplate.tsx
├── lib/pdfGenerator.tsx
└── types/quote.ts
public/
├── sitemap.xml
├── robots.txt
└── og-image.png
```

## SEO・アナリティクス設定（layout.tsx管理）
- Google AdSense: `ca-pub-6875835900503056`
- Google Search Console: 確認済み
- OGP: og-image.png（1200x630）
- JSON-LD: WebApplication スキーマ
- sitemap.xml: 5ページ登録済み

## コーディングルール
- コンポーネントはすべて `src/components/` に配置
- 新規ページは `src/app/[ページ名]/page.tsx` で作成
- Tailwind CSS のみ使用（外部CSSライブラリ不可）
- `metadata` は各ページで個別に設定すること
- サーバーコンポーネントを基本とし、インタラクションが必要な場合のみ `"use client"` を使用

## エージェント構成
- **orchestrator**: タスクを分解してサブエージェントに振り分ける
- **github-agent**: ファイル変更・GitHub APIでのプッシュ
- **content-agent**: ページ・コンテンツの新規作成・編集
- **seo-agent**: メタデータ・sitemap・OGP・JSON-LDの管理
