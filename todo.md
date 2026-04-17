# 見積書メーカー タスク管理

## ステータス凡例
- [ ] 未着手
- [x] 完了
- [-] スキップ

---

## 完了済み
- [x] privacy/page.tsx 作成
- [x] contact/page.tsx 作成（Googleフォーム）
- [x] フッターにリンク追加
- [x] AdSenseコード埋め込み
- [x] AdSense審査リクエスト送信
- [x] OGP設定
- [x] robots.txt 作成
- [x] sitemap.xml 作成・Search Console登録
- [x] JSON-LD 構造化データ追加
- [x] OGP画像生成
- [x] Google Search Console確認
- [x] how-to/page.tsx 作成
- [x] faq/page.tsx 作成
- [x] CLAUDE.md 作成
- [x] エージェント構成（.claude/agents/）
- [x] guide/how-to-write 作成・push済み
- [x] guide/template-excel 作成
- [x] guide/freelance 作成
- [x] guide/difference 作成
- [x] guide/consumption-tax 作成
- [x] guide/valid-period 作成
- [x] guide/electronic 作成
- [x] トップページにガイド記事へのリンク一覧を追加
- [x] Google Analytics設定
- [x] 各ガイド記事に関連記事リンクを追加
- [x] サイトデザイン改修（特徴セクション・おすすめセクション追加）
- [x] ガイド記事にパンくず・Article JSON-LD追加（全7記事）
- [x] 業種別ガイド記事追加（建設業）
- [x] OGP・メタdescription最適化（全ガイド記事にopenGraph・canonical追加）
- [x] 業種別ガイド記事追加（IT・Web業界）
- [x] トップページに「使い方3ステップ」セクション追加

## 進行中（収益化・改善）
- [ ] AdSense承認確認・広告ユニット設置（4/24以降に再審査申請）
- [x] アフィリエイトリンク挿入（会計ソフト） → how-to-write・template-excel・beauty に追加済み
- [ ] Search Consoleでインデックス状況確認・サイトマップ再送信（手動）
- [x] guide/page.tsx: construction（noindex）削除・transportation/welfare/education追加・記事数を20本に修正（2026-04-16）
- [x] sitemap.xml: /guideの重複エントリ削除・lastmod更新（2026-04-16）
- [x] ConstructionForm: AIで積算（β）ボタン追加・ExcelImportButton動的import最適化（2026-04-16）

## アイデアバックログ
- [x] ガイド記事一覧ページ /guide 作成・sitemapに追加（2026-04-12）
- [x] GuideJsonLdにFAQ schemaサポート追加・主要3記事（how-to-write/valid-period/consumption-tax）にFAQ JSON-LD追加（2026-04-12）
- [x] インデックス14記事のnoindexリンク修正・FAQ JSON-LD残11記事に追加（2026-04-13）
- [ ] Search ConsoleでURL検査・インデックスリクエスト（8本のガイド記事）
- [x] 業種別ガイド記事追加（飲食）→ guide/restaurant 実装済み
- [x] 関連ツールページ（インボイス計算機）作成 → tools/invoice-calc 実装済み
- [x] 業種別ガイド記事追加（美容など）→ guide/beauty 実装済み（2026-04-07）
- [x] 請求書メーカー本実装 → /invoice 実装済み（2026-04-07）
- [x] Twitter/X SNS流入施策 → ShareButtonsコンポーネント作成・主要5記事に組み込み済み（2026-04-10）
- [ ] A8.net登録・アフィリエイトリンク挿入（印鑑・名刺サービス）※手動作業：実際のA8.net提携URLが必要
- [x] ガイド記事追加（送付状・内訳・諸経費）→ cover-letter / breakdown / misc-expenses 実装済み（2026-04-07）
- [x] ガイド記事追加（交通費・前払い・端数処理）→ travel-expense / prepayment / rounding 実装済み（2026-04-08）
- [ ] AdSense承認後の広告ユニット設置
- [x] ガイド記事追加（値上げ・価格改定）→ guide/price-increase 実装済み（2026-04-10）
- [x] ガイド記事追加（スプレッドシートテンプレート）→ guide/spreadsheet 実装済み（2026-04-10）
- [x] ガイド記事追加（Wordテンプレート）→ guide/word-template 実装済み（2026-04-10）
- [x] 建設業専用見積書ツール実装 → /construction LP・見積フォーム・法令チェック・PDF出力 実装済み（2026-04-14）
- [x] 建設業関連ガイド記事にConstructionPromoBannerを追加（construction/breakdown/labor-cost/misc-expenses）（2026-04-14）
- [x] analytics.ts更新（建設業コンバージョン計測追加）（2026-04-14）
- [x] ガイド記事追加（Numbersテンプレート）→ guide/numbers-template 実装済み（2026-04-14）
- [x] 建設業法対応ガイド記事追加（kaisei-kensetsu-2025・legal-welfare・freelance-law-construction）→ 実装・push済み（2026-04-15）
- [x] 建設業チェックリストページ + リードマグネット機能 → /construction/checklist・LeadMagnetButton・/api/lead-magnet 実装済み（2026-04-15）
- [x] 建設業プレミアムプラン実装 → Supabase認証・Stripe決済・見積書保存・マイページ・リファラル実装済み（2026-04-15）
- [x] 業種別ガイド記事追加（運送業・物流）→ guide/transportation 実装済み（2026-04-15）
- [x] 業種別ガイド記事追加（介護・福祉）→ guide/welfare 実装済み（2026-04-15）
- [x] 業種別ガイド記事追加（塾・教育）→ guide/education 実装済み（2026-04-15）
- [x] 業種別ガイド記事追加（医療・クリニック）→ guide/medical 実装済み（2026-04-17）
- [x] 業種別ガイド記事追加（製造業）→ guide/manufacturing 実装済み（2026-04-17）
- [x] 業種別ガイド記事追加（不動産業）→ guide/real-estate 実装済み（2026-04-17）
