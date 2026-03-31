CLAUDE.mdを読み込み、コンテンツ戦略に記載されているガイド記事のうちまだ`src/app/guide/`に存在しないものを確認する。

手順:
1. `src/app/guide/` 配下の既存ディレクトリを確認する
2. CLAUDE.mdの「作成すべきコンテンツページ」リストと照合して、まだ作成されていない最優先の記事を1本選ぶ
3. その記事をCLAUDE.mdのルール（1,500字以上、H2×3〜5、CTA必須、メタdescription120字以内）に従って作成する
4. `public/sitemap.xml` に priority 0.7 で追加する
5. `npx next build` でビルドが通ることを確認する
6. `git add` → `git commit` → `git push origin main` する
7. 完了後、次に作成すべき記事を1行で報告する
