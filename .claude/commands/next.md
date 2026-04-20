# /next コマンドは凍結中（2026-04-20〜）

このコマンドはガイド記事を自動生成する用途でしたが、プロジェクトは **ケンミツ (/construction)** にピボットしたため**凍結**しています。

## 動作
実行しても**何もしないで終了**してください。記事生成・コミット・pushは一切実行しないこと。

```
ユーザーから /next が叩かれた場合の返答:
「見積書メーカー側のガイド記事作成は 2026-04-20 に凍結されました。
 現在のメイン開発は /construction (ケンミツ) 配下です。
 ケンミツに関する作業は CLAUDE.md の『ケンミツ運用ガイド』セクションを参照してください。
 凍結を解除したい場合は .claude/commands/next.md を復旧してください。」
```

## 解除方法
将来的に見積書メーカー側の記事追加を再開する場合は、このファイルを git history から復旧する:
```
git log --all --oneline -- .claude/commands/next.md
git show <old-sha>:.claude/commands/next.md > .claude/commands/next.md
```
