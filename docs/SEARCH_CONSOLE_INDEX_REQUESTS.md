# Search Console インデックス申請 URL リスト

> Google Search Console の「URL 検査」→「インデックス登録をリクエスト」で 1 件ずつ手動申請する用途。
> 大量申請は制限がかかるため、新規・大幅更新分のみに絞ること。
> 最終更新: 2026-05-03

## 操作手順

1. [Google Search Console](https://search.google.com/search-console) にアクセス
2. プロパティ「mitsumori-maker.com」を選択
3. 上部の検索ボックスに下記 URL を 1 つずつ貼り付け
4. 「インデックス登録をリクエスト」を押す（1 URL あたり数十秒）
5. 1 日あたり 10〜20 件程度が現実的な上限

---

## 優先度 ★★★（新規・即申請）

```
https://mitsumori-maker.com/construction/guide/kensetsu-mitsumori-template-free
https://mitsumori-maker.com/construction/guide/hitorioyakata-mitsumori-soft-free
```

## 優先度 ★★（大幅更新・再申請）

E-E-A-T 強化（Disclaimer / References / ConstructionAuthor 追加）と本文加筆を行ったため、再クロールを促す。

```
https://mitsumori-maker.com/construction/guide/kaisei-kensetsu-2025
https://mitsumori-maker.com/construction/guide/legal-welfare
https://mitsumori-maker.com/construction/guide/labor-cost
https://mitsumori-maker.com/construction/guide/lump-sum
https://mitsumori-maker.com/construction/guide/freelance-law-construction
```

## 優先度 ★（補助）

```
https://mitsumori-maker.com/construction/guide
https://mitsumori-maker.com/about
```

## 進捗ログ

申請したら日付を記録する。

| 日付 | URL | ステータス |
|---|---|---|
| 2026-05-03 |  | 申請待ち |

---

## 補足：sitemap 経由の自動クロール

Search Console > サイトマップ で `https://mitsumori-maker.com/sitemap.xml` が登録されていれば、新規ページは数日〜数週間で自動的にクロールされます。手動申請は「優先的にクロールしてほしい URL」のみで OK。

## なぜ手動申請するか

新規記事はクロール頻度が低く、自動だけだと 2〜4 週間後にようやく検出されることがあります。Buy-intent の高い KW 記事は早く順位確定したいため、手動申請で初動を加速させます。
