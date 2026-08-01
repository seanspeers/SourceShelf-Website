# SourceShelfユーザーガイド

SourceShelfは、ファイルやウェブリサーチをローカルMarkdown、順序付けされたコンテキストパック、ポータブルエクスポート、およびローカルAIアプリケーション用のオプションの読み取り専用アクセスをに変換します。 このガイドはSourceShelf 1.0.1用に書かれています。

## ここから始めましょう

- [始める](getting-started.md) — 最初のファイルを変換し、パックを作成し、エクスポートを選択します。
- [Safariからキャプチャする](guides/safari-capture.md) — ページ、メインコンテンツ、選択、ハイライト、レシピ、レビュー、およびキーボードショートカット。
- [ライブラリを閲覧する](guides/library-and-inspector.md) — 検索、フィルタ、ソースステータス、アクション、プレビュー。
- [パックを作成して管理する](guides/build-and-manage-packs.md) — 保存済みパック、順序、ドラフト、トラスト＆セキュリティ、および更新して比較。
- [エクスポート形式を選択する](guides/export-formats.md) — AI リファレンスパック、OKF、マークダウン、 `llms.txt`、およびクリップボードワークフロー。
- [ストレージを管理する](guides/storage-management.md) — ローカルの使用状況をレビューし、安全に古いデータをクリアし、意図的に生成されたソースを削除します。

## ローカルAIアクセス（MCP)

- [ローカルAIアクセス概要](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [MCP トラブルシューティング](mcp/troubleshooting.md)

## より多くのガイド

- [ファイルとフォルダを変換する](guides/convert-files.md)
- [信頼性と安全性、および継続運用パック](guides/trust-safety-and-refresh.md)
- [インポートとエクスポート llms.txt](guides/llms-txt.md)
- [設定参照](reference/settings.md)
- [サポートされているフォーマット](reference/supported-formats.md)
- [プライバシーとセキュリティ](reference/privacy-and-security.md)
- [語彙集](reference/glossary.md)

## 役立つメンタルモデル

SourceShelfは、4つのジョブを分離して保持します。

1. **変換またはキャプチャする** ローカルMarkdownソースを作成します。
2. **ライブラリ** ソースの検索、検査、およびメンテナンスを支援します。
3. **パック** 選択したソースを意図的に並べます。
4. **エクスポートまたはローカルAIアクセス** そのパッケージを別のワークフローに配信します。

SourceShelfはこれらのジョブをローカルで実行します。ファイル変換中にリモートコンテンツを取得することはありません。 `llms.txt` インポート、エクスポート、比較、または MCP 読む。

ドキュメントのスクリーンショットにはSourceShelfの合成デモデータを使用し、ローカルパスとMCP認証値は削除しています。
