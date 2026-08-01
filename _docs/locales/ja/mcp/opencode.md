# SourceShelfをOpenCodeで使う

OpenCode SourceShelf stdioヘルパーをホストでき、その2つの読み取り専用ツールをクラウドまたは Ollama-裏付けられたモデル。

このガイドは、現在の OpenCode V2構成は2026年8月1日に文書化されました。古いリリースは別のものを使用しています。 MCP JSON 形状。そのリリースの `mcp add` それに応じてフローまたは構成を更新します。

## ローカルを追加する MCP サーバー

ソースシェルフの **コピー MCP 設定** 一般的なものを使用する `mcpServers` 形。 OpenCode V2は、以下の下にあるローカルコマンド配列を期待しています。 `mcp.servers`、だからそれを次のように翻訳してください `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "sourceshelf-municipal-research": {
        "type": "local",
        "command": [
          "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
          "--share",
          "<share-id>"
        ],
        "codemode": false
      }
    }
  }
}
```

SourceShelfから正確なヘルパーパスと共有IDを使用します。既存のものを保持します OpenCode エントリを統合する際の設定と他のサーバー。

`"codemode": false` 2つのSourceShelfツールを直接公開します。これは、呼び出しにコードモードのラップラーを書き込む必要がないため、小さなローカルモデルにとって便利なデフォルトです。

## 検証とテスト

開いている OpenCode そして、現地を確認します MCP サーバーが有効になっています。次に尋ねます。

> コール `search_pack` のために `open data publication schedule`、最高のリソースを読んでください `read_pack_resource`、そしてその結果からのみ回答してください。そのSourceShelfを含めてください URI。

モデルが単に呼び出しを印刷する場合は、より優れた機能呼び出しを備えたモデルに切り替えたり、指示をより手続き的にする必要があります。

## 使用する Ollama モデル

SourceShelf エントリがすでに保存されている場合：

```sh
ollama launch opencode
```

Ollama 一時的なモデル構成を既存のドキュメントと深く統合するドキュメント OpenCode 構成、保存する MCP サーバーエントリー。

## 年上 OpenCode リリース

構成キーが変更されました。 OpenCode 世代。 イフ `mcp.servers` 拒否されます。インストールされたリリースの MCP 古い形状と新しい形状を同じファイルに配置するのではなく、コマンドを追加するか、バンドルされたドキュメントまたは現在のドキュメントを参照してください。

公式参照： [OpenCode V2 MCP サーバー](https://opencode.ai/v2/docs/mcp-servers)、 [Ollama と OpenCode](https://docs.ollama.com/integrations/opencode)。
