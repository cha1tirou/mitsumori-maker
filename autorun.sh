#!/bin/bash
# 見積書メーカー 記事自動生成スクリプト
# 使い方: ./autorun.sh

ARTICLES=(
  "guide/template-excel"
  "guide/freelance"
  "guide/difference"
  "guide/consumption-tax"
  "guide/valid-period"
  "guide/electronic"
)

PROMPT="CLAUDE.mdのルールに従って、次の条件で作業してください:
1. src/app/guide/ 配下の既存ディレクトリを確認する
2. CLAUDE.mdの「作成すべきコンテンツページ」リストと照合して、まだ作成されていない最優先の記事を1本作成する
3. public/sitemap.xml に priority 0.7 で追加する
4. npx next build でビルド確認する
5. git add, git commit, git push origin main する"

echo "🚀 自動記事生成を開始します..."
echo "残り記事数を確認中..."

for article in "${ARTICLES[@]}"; do
  if [ ! -d "src/app/$article" ]; then
    echo "📝 次の記事を作成: $article"
    claude --print "$PROMPT 対象: $article"
    echo "✅ $article 完了"
    echo "⏳ 次の記事まで5秒待機..."
    sleep 5
  else
    echo "✓ スキップ（作成済み）: $article"
  fi
done

echo "🎉 全記事の生成が完了しました！"
