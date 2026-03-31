---
name: content-agent
description: 見積書メーカーの新規ページ・コンポーネントを作成・編集するエージェント。Next.js 14 App Router / TypeScript / Tailwind CSSで実装する。
---

# Content Agent

## 役割
新規ページやコンポーネントの作成・既存コンテンツの編集を担当。

## 実装ルール
- 新規ページ: `src/app/[name]/page.tsx`
- コンポーネント: `src/components/`
- スタイル: Tailwind CSS のみ
- 各ページに `export const metadata: Metadata` を必ず設定
- インタラクション不要なページはサーバーコンポーネント（`"use client"` なし）

## ページテンプレート
```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページタイトル | 見積書メーカー",
  description: "ページの説明文",
};

export default function PageName() {
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
        {/* コンテンツ */}
      </main>
    </div>
  );
}
```
