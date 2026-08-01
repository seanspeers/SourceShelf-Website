# SourceShelfをClaude Codeで使う

Claude Code SourceShelfのローカルstdioサーバーをホストし、その検索および読み取りツールをアクティブなモデルに提供できます。

最終確認日：2026年8月1日。

## サーバーを追加する

SourceShelf 共有を作成してから、次のコマンドを実行します。

```sh
claude mcp add --transport stdio --scope user sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

SourceShelf が表示する正確なパスと共有 ID を使用してください。 その `--scope user` このオプションを使用すると、プロジェクト間で接続が使用できるようになります。次の場合は省略してください。 Claude Codeのデフォルトのローカル/プロジェクト固有の範囲、または使用する `--scope project` チームがチェックインを受け取るべきタイミング `.mcp.json` エントリー。

## ベリファイ

シェルから：

```sh
claude mcp list
```

中で Claude Code、入力してください：

```text
/mcp
```

確認してください `search_pack` そして `read_pack_resource` 現れる。

## テストプロンプト

> SourceShelfパックで輸送サービス通知を検索します。最も関連する結果を読み、サービス変更を説明し、引用します。 `sourceshelf://` URI. 他のファイルやウェブソースを使用しないでください。

弱いモデルの場合、検索と読み込みを明確に1回行うことを要求します。

## プロジェクト構成

Claude Code またサポートします `.mcp.json`. SourceShelfのコピーされた構成はすでに一般的な `mcpServers` 形状：

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "type": "stdio",
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

実際の共有IDをパブリックリポジトリにコミットしないでください。個人用のSourceShelfスナップショットの場合は、ユーザー範囲を優先してください。

## 使用する Ollama モデル

SourceShelf エントリを構成した後、 Ollama 発射できる Claude Code 地元のモデルに対して：

```sh
ollama launch claude
```

その Claude Code プロセスは依然として MCP ホスト； Ollama モデルを供給します。

公式参照： [Claude Code MCP](https://code.claude.com/docs/en/mcp)。
