# SourceShelfをOllamaで使う

Ollama ローカルモデルを実行します。 MCP-可能なエージェント—例えば Codex、 Claude Code、または OpenCode—SourceShelf接続をホストし、そのモデルにツールを提供します。

OllamaのネイティブチャットとAPIサポートツール通話、しかし Ollama SourceShelfはそれ自体ではありません。 MCP クライアント。したがって、最も簡単なテストは次のとおりです。

```text
SourceShelf MCP helper → Codex / Claude Code / OpenCode → Ollama model
```

最終確認日：2026年8月1日。

## 推奨設定： Ollama と Codex

1. SourceShelf 共有を作成し、そのコマンドをコピーします。
2. に追加する Codex 使用している [その Codex ガイド](codex.md)。
3. 起動する Codex スルー Ollama:

```sh
ollama launch codex
```

1. 十分な大きさのコンテキストウィンドウと信頼性の高いツール呼び出しを備えたインストール済みのモデルを選択します。
1. で Codex、走る `/mcp` SourceShelfサーバーとその2つのツールが存在することを確認します。
1. 尋ねる：

> SourceShelfパックで公共交通機関の利用者数の傾向を検索し、最適な結果を読み、リソースを引用します。 URI。

Ollama コーディングエージェントには少なくとも64Kのコンテキストウィンドウを推奨します。SourceShelfの検索優先ワークフローは不要なコンテキストを減らしますが、エージェント自体にはまだツール定義と結果のためのスペースが必要になる場合があります。

## Ollama と OpenCode

1. SourceShelf を設定する OpenCode 使用している [その OpenCode ガイド](opencode.md)。
2. ローカルエージェントを起動します。 Ollama:

```sh
ollama launch opencode
```

Ollama 一時的な起動構成を既存の OpenCode 構成なので、あなたのSourceShelf MCP エントリーは引き続き利用可能です。

## Ollama と Claude Code

1. ソースシェルフを構成するには、 [その Claude Code ガイド](claude-code.md)。
2. 開始：

```sh
ollama launch claude
```

それから使用する `/mcp` で Claude Code サーバーを確認する。

## のマニュアルローカルモデルモード Codex

もしあなたの Codex 設定はすでに次の場所にポインタを向けています。 Ollama、また、次のように開始することもできます。

```sh
codex --oss
```

その MCP 構成は保持されます。 Codex; `--oss` ローカルオープンソースモデルプロバイダーを選択します。複数のローカルプロバイダーを維持している場合は、名前付きを使用します Codex 代わりにプロフィール。

## モデルを選択する

以下の条件を満たすモデルを探してください。 Ollama ページまたはドキュメントにツール/関数の呼び出しが明示的に言及されている場合。小型モデルは、次の直接的なプロンプトの恩恵を受けます。

> コール `search_pack` 最初に。 使う `read_pack_resource` 上位結果のみ。推測しないで、パック全体を読み込まないでください。

モデルが仮定のツール呼び出しを繰り返しテキストとして書き込む場合、ホスト接続は機能している場合がありますが、モデルのツール呼び出し動作は機能していません。SourceShelfをデバッグする前に、より強力なツール対応モデルで確認してください。

## 上級：自分の橋を作ろう

使用するアプリケーション OllamaのチャットAPIは関数を定義して実行することができますが、また、また実装する必要があります MCP クライアントまたはそれらの機能をSourceShelfに翻訳します。 MCP コール。SourceShelfは意図的にネットワークエンドポイントを提供しません。通常のテストでは、既存のエージェントホストの方がはるかにシンプルで安全です。

公式参照： [Ollama ツールコール](https://docs.ollama.com/capabilities/tool-calling)、 [Ollama 起動する](https://docs.ollama.com/cli)、 [Ollama と Codex](https://docs.ollama.com/integrations/codex)、 [Ollama と OpenCode](https://docs.ollama.com/integrations/opencode)、 [Ollama と Claude Code](https://docs.ollama.com/integrations/claude-code)。
