# 見積書メーカー — Claude Code 運用ガイド

## プロジェクト概要
- **サービス名**: 見積書メーカー
- **本番URL**: https://mitsumori-maker.com
- **GitHub**: cha1tirou/mitsumori-maker
- **Vercel**: cha1tirous-projects / mitsumori-maker（mainへのpushで自動デプロイ）
- **目標**: 最短での広告・アフィリエイト収益化

---

## 収益化戦略

### 収益源（優先順）
1. **Google AdSense**（審査中）— メイン収益。月間PVを増やすことが最優先
2. **アフィリエイト**（次フェーズ）— 会計ソフト・印鑑・名刺サービスなど関連商品
3. **将来的な有料プラン**（検討段階）— テンプレート追加・データ保存など

### KPI
- 月間PV: 1万PV（3ヶ月以内）→ 5万PV（6ヶ月以内）
- AdSense月収: 2,000円（3ヶ月）→ 10,000円（6ヶ月）

---

## コンテンツ戦略（SEO流入最大化）

### 優先キーワード
| キーワード | 月間検索数 | 難易度 | 優先度 |
|---|---|---|---|
| 見積書 無料 | 8,000〜12,000 | 中 | ★★★ |
| 見積書 テンプレート | 5,000〜8,000 | 中 | ★★★ |
| 見積書 書き方 | 3,000〜5,000 | 低 | ★★★ |
| 見積書 エクセル | 2,000〜4,000 | 低 | ★★ |
| 見積書 個人事業主 | 1,000〜3,000 | 低 | ★★ |
| 見積書 フリーランス | 1,000〜2,000 | 低 | ★★ |
| 見積書 PDF | 1,000〜2,000 | 低 | ★★ |

### 作成すべきコンテンツページ（優先順）
以下を `src/app/[slug]/page.tsx` として順番に追加する。

1. `/guide/how-to-write` — 「見積書の書き方・必要項目を解説」
2. `/guide/template-excel` — 「見積書テンプレート（Excel・PDF）の選び方」
3. `/guide/freelance` — 「フリーランス・個人事業主のための見積書ガイド」
4. `/guide/difference` — 「見積書・請求書・納品書の違い」
5. `/guide/consumption-tax` — 「見積書の消費税の書き方・インボイス対応」
6. `/guide/valid-period` — 「見積書の有効期限の設定方法」
7. `/guide/electronic` — 「見積書を電子化・PDF化するメリット」

### コンテンツページの作成ルール
- 文字数: 1,500字以上
- H2見出し: 3〜5個
- 内部リンク: 記事末尾に「見積書メーカーで今すぐ作成→」のCTAを必ず設置
- メタdescription: 120字以内、キーワードを含める
- sitemap.xmlに追加すること（priority: 0.7）

---

## 技術スタック
- Next.js 14 / App Router（`src/app/` 構成）
- TypeScript / Tailwind CSS
- フォント: Noto Sans JP
- PDF出力: @react-pdf/renderer

## ディレクトリ構成
```
src/
├── app/
│   ├── layout.tsx          # 共通レイアウト・AdSense・OGP・JSON-LD
│   ├── page.tsx            # トップページ（ツール本体）
│   ├── how-to/page.tsx     # 使い方
│   ├── faq/page.tsx        # よくある質問
│   ├── privacy/page.tsx    # プライバシーポリシー
│   ├── contact/page.tsx    # お問い合わせ
│   └── guide/              # ← SEOコンテンツ記事をここに追加
│       └── [slug]/page.tsx
├── components/
│   ├── QuoteForm.tsx
│   ├── QuotePreview.tsx
│   ├── TemplateSelector.tsx
│   ├── PdfDownloadButton.tsx
│   └── templates/
│       ├── StandardTemplate.tsx
│       ├── MinimalTemplate.tsx
│       └── PremiumTemplate.tsx
├── lib/pdfGenerator.tsx
└── types/quote.ts
public/
├── sitemap.xml    # ページ追加のたびに更新
├── robots.txt
└── og-image.png
```

---

## コーディングルール
- コンポーネントは `src/components/` に配置
- 新規ページは `src/app/[name]/page.tsx`
- Tailwind CSS のみ（外部CSSライブラリ不可）
- 各ページに `export const metadata: Metadata` を設定
- サーバーコンポーネント基本、インタラクションのみ `"use client"`
- ページ追加時は必ず `public/sitemap.xml` も更新する

## コンテンツページのテンプレート
```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "記事タイトル | 見積書メーカー",
  description: "120字以内の説明文。キーワードを含める。",
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← 見積書メーカーに戻る
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <article>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">記事タイトル</h1>
          <p className="text-gray-500 text-sm mb-8">更新日: 2026年3月31日</p>
          {/* 本文 H2・H3・p で構成 */}
          {/* 文字数1,500字以上 */}
        </article>
        {/* CTA：必須 */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">見積書を今すぐ無料で作成</h2>
          <p className="text-gray-400 mb-4 text-sm">登録不要・完全無料・PDF出力対応</p>
          <Link
            href="/"
            className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            見積書メーカーを使う →
          </Link>
        </div>
      </main>
    </div>
  );
}
```

---

## タスク判断基準（優先順）
1. **収益直結**: AdSense承認後の広告ユニット設置、A8.net登録・アフィリエイトリンク挿入
2. **SEO強化**: パンくずJSON-LD、Article JSON-LD、追加ガイド記事（見積書 無料 エクセル/個人事業主/建設業/IT業種など）、Search Consoleインデックス申請、メタdescription最適化
3. **サイト改善**: トップページCVR改善（使い方GIF/スクリーンショット追加）、ユーザーの声セクション、関連ツールページ（インボイス計算機）、請求書メーカー実装
4. **内部リンク強化**: 全ページ間のリンク網羅、パンくずナビ
5. **SNS流入**: OGP最適化、Twitter/X施策

---

## エージェント構成
- **orchestrator**: タスク分解・サブエージェント指示
- **content-agent**: コンテンツページ作成（上記テンプレートに従う）
- **seo-agent**: sitemap.xml更新・メタデータ管理
- **github-agent**: GitHub APIでのプッシュ

## 開発サイクル（推奨）
1. `content-agent` でガイド記事を1本作成
2. `seo-agent` で sitemap.xml に追加
3. `github-agent` でまとめてプッシュ
4. Vercel自動デプロイ完了

---

## SEO設定（変更禁止）
- Google AdSense: `ca-pub-6875835900503056`（layout.tsxに記載）
- Google Search Console: 確認済み（verification key: GjZNFGBtFEmvoeEUPesUdP0p2GDKfXrOjrbToCGVptQ）
- OGP画像: `/public/og-image.png`（1200x630）
- JSON-LD: WebApplication スキーマ（layout.tsxに記載）

## 現在のsitemap.xml登録ページ
- https://mitsumori-maker.com/ (priority: 1.0)
- https://mitsumori-maker.com/how-to (priority: 0.8)
- https://mitsumori-maker.com/faq (priority: 0.8)
- https://mitsumori-maker.com/privacy (priority: 0.3)
- https://mitsumori-maker.com/contact (priority: 0.3)
※ガイド記事追加時: priority 0.7 で追加

---

## ケンミツ(/construction)運用ガイド

### 概要
- ケンミツは `/construction` 配下で提供する建設業一人親方向けの独立ブランド。見積書メーカーとインフラ共有、訴求軸（改正建設業法2025対応）とビジュアルアイデンティティは別
- **LP**: `src/app/construction/page.tsx` は薄いオーケストレーター、セクション本体は `src/components/construction/lp/`
- **サービス画面**: `/construction/new`（見積書作成）・`/construction/mypage`（マイページ）・`/construction/checklist`（法令対応チェックリスト）・`/construction/login`・`/construction/faq`・`/construction/how-to`・`/construction/quotes/[id]` など

### ブランドカラー（`tailwind.config.ts` の `kenmitsu.*`）
- `kenmitsu.navy` (#1E40AF) — メイン、構造・ヘッダー・ナビ
- `kenmitsu.orange` (#F59E0B) — ヘルメット色、プライマリCTA
- `kenmitsu.blueprint` (#CBD5E1) — 方眼紙背景（LPのみ）
- `kenmitsu.ok` (#0E7A52) — 成功状態専用
- `kenmitsu.warn` (#B45309) — 警告専用
- `ink` / `muted` / `paper` 系 — 標準テキスト/背景

### 色の使い分けルール
- **プライマリCTA**（見積書作成・PDFダウンロード・保存・ログイン送信・Soloアップグレード等の前進アクション）: `bg-kenmitsu-orange hover:bg-kenmitsu-orange600 text-white`
- **構造・ナビ・リンク・強調**（ヘッダー帯・ロゴ・フォーカスring・セクション見出し・選択中状態）: `kenmitsu-navy` 系（`navy50` / `navy100` / `navy` / `navy700` / `navy900`）
- **成功**（チェックマーク・「自動チェック済」・「対応済」・「ACTIVE」バッジ・成功トースト・PDFのOKスタンプ）: `kenmitsu-ok` / `kenmitsu-okBg`
- **警告**（要注意バッジなど）: `kenmitsu-warn` / `kenmitsu-warnBg`（実装済みは少ない。`amber-*` で既に書かれている箇所は触らない）
- 🚫 **旧 `green-*` / `emerald-*` / 緑のhex（`#15803d` `#166534` `#14532d` など）は `/construction` 配下で使用禁止**。PR のレビュー時に grep で検出されれば修正対象

### 特徴的ビジュアル（LPのみ）
- 工事テープ装飾（`lp/ConstructionTape.tsx`） / ブループリント方眼紙背景（`lp/BlueprintBg.tsx`） / 職人ヘルメットSVG（`lp/illustrations.tsx` の `IluCard` / `IluHeroKeyArt`）
- **サービス画面ではUIの邪魔にならないよう使わない**（編集性・可読性優先）

### 動的要素
- 「改正建設業法 施行から **N** 日経過」は施行日 `2025-12-01` からの経過日数を `daysSinceLawEnforcement()`（`src/app/construction/page.tsx`）で Server Component が動的計算。**ハードコード禁止**
- LP の `Hero` / `LawCompliance` / `FinalCta` に `lawDays` を props で渡す

### PlanCheckoutButton（`src/components/construction/PlanCheckoutButton.tsx`）
- `variant="kenmitsu"`（オレンジ）: ケンミツブランドのCTA用。**LP の Pricing、及びケンミツ配下のアップグレード誘導 CTA で使う**
- `variant="primary"`（緑）: **レガシー**。`@deprecated` コメント付き。将来の参照性のため定義は残すが新規使用禁止
- `variant="outline"`: セカンダリ（白地 + 枠）

### PDF テンプレート（`src/lib/constructionPdfGenerator.tsx`）
- `@react-pdf/renderer` で描画。色定数は `colors` オブジェクトで集約管理
- `primary` / `primaryDark` / `primaryLight` / `primaryBorder` は全て navy 系 hex
- PDF とプレビュー（`ConstructionPreview.tsx`）は**同じ見た目になるよう両方とも navy で統一**する

### 絶対に触らない（ケンミツ改修時の保護対象）
- `src/app/layout.tsx` のルート設定全て（AdSense `ca-pub-6875835900503056` / GA4 `G-13VR2YEZKB` / Meta Pixel 条件分岐 / Search Console verification / WebApplication JSON-LD / SiteFooter / Noto_Sans_JP）
- `lib/supabase/` のロジック（`getCurrentUserProfile` / `isSupabaseConfigured` を含む）
- Stripe 決済フロー本体（`PlanCheckoutButton` の `/api/stripe/checkout` 呼び出し部分、`PortalButton`、Stripe webhook）
- `src/app/construction/page.tsx` 内の SoftwareApplication + FAQPage JSON-LD、`metadata`、`TrackPageView name="construction_lp_view"`
- `/construction/` 配下のサブルート13本のレイアウト構造・情報項目・ラベル・ガイダンス文言・デフォ値（色だけは統一OK）

### モバイルブレークポイント注意点（LP）
- `Comparison.tsx`: **sm 以下ではカード積層に切替**（テーブルではない）。3列squeezeを避けるための専用レイアウト
- `Pricing.tsx`: 単列 → 2列 → 3列。Solo の浮き上がり（`translate-y`）は **lg 以上限定**でモバイル時のクリッピングを回避
- `Hero`: アラートリボンのテキストは **sm 以下で短縮表示**（フル文言「施行から N 日経過 — 未対応は法令リスク」は sm 以上のみ）
