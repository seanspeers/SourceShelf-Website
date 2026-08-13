# SourceShelfユーザーガイド

言語: [English](../../README.md) · [Français](../fr/README.md) · [Español (Latinoamérica)](../es-419/README.md) · [Português (Brasil)](../pt-BR/README.md) · **日本語**

SourceShelfは、ファイルやWebリサーチをローカルのMarkdownに変換し、ソースをパックに整理して、ポータブルな形式で書き出せるアプリです。このガイドは、Mac、iPhone、iPad向けSourceShelf 1.0.2を対象としています。

## Macではじめる

- [Macではじめる](getting-started.md) — 最初のファイルを変換し、パックを作成して、書き出し形式を選びます。
- [Safariからキャプチャする](guides/safari-capture.md) — ページ、メインコンテンツ、選択範囲、ハイライト、レシピ、レビュー、キーボードショートカット。
- [ライブラリを使う](guides/library-and-inspector.md) — 検索、フィルタ、ソースの状態、操作、プレビュー。
- [パックを作成・管理する](guides/build-and-manage-packs.md) — 保存済みパック、順序、下書き、信頼性と安全性、更新して比較。
- [書き出し形式を選ぶ](guides/export-formats.md) — AIリファレンスパック、OKF、Markdown、`llms.txt`、クリップボード。
- [ストレージを管理する](guides/storage-management.md) — ローカル使用量の確認、不要データの安全なクリーンアップ、生成済みソースの削除。

## iPhoneまたはiPadではじめる

- [iPhoneとiPadではじめる](ios/getting-started.md) — ライブラリ、パック、ソース、リーダーで構成される画面を確認します。
- [Safariからキャプチャする](ios/safari-capture.md) — 拡張機能を有効にし、ページやSafariウインドウをキャプチャして、Webサイトの`llms.txt`コレクションを読み込みます。
- [書類を読み込んで読む](ios/import-and-read.md) — ファイル、共有シート、ローカルOCR、検索、オフライン閲覧を使います。
- [パックを作成・書き出し・移動する](ios/packs-and-portability.md) — リサーチを整理し、ファイルやAirDropで完全なパックを移動します。
- [設定とプライバシー](ios/settings-and-privacy.md) — ローカルストレージ、Safariのアクセス、アカウントや同期を使わない仕組みを確認します。

## MacのローカルAIアクセス

- [ローカルAIアクセスの概要](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [MCPのトラブルシューティング](mcp/troubleshooting.md)

## その他のガイドとリファレンス

- [ファイルとフォルダを変換する](guides/convert-files.md)
- [信頼性と安全性、更新されるパック](guides/trust-safety-and-refresh.md)
- [llms.txtを読み込む／書き出す](guides/llms-txt.md)
- [設定リファレンス](reference/settings.md)
- [対応形式](reference/supported-formats.md)
- [プライバシーとセキュリティ](reference/privacy-and-security.md)
- [用語集](reference/glossary.md)

## 基本的な考え方

SourceShelfでは、次の4つの役割を分けています。

1. **変換またはキャプチャ**でローカルのMarkdownソースを作成します。
2. **ライブラリ**でソースを検索、確認、管理します。
3. **パック**で選択したソースを任意の順序に整理します。
4. **書き出しまたはローカルAIアクセス**でパックを別のワークフローへ渡します。

SourceShelfはこれらの処理をローカルで行います。ローカルファイルの読み込み、変換、OCR、閲覧、書き出し、比較、MCPアクセスでは、リモートコンテンツを取得しません。WebサイトのキャプチャとWebサイトからの`llms.txt`取得は、SafariのWebサイトアクセス権限に従って実行される、Safari拡張機能の明示的な操作です。

ドキュメントのスクリーンショットにはSourceShelfの合成デモデータを使用し、ローカルパスとMCP認証値を削除しています。
