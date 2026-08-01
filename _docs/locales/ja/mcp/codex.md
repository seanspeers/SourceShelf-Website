# SourceShelfをCodexで使う

Codex SourceShelfのstdioヘルパーを開始し、共有パックのリソースとツールをクラウドに公開したりできます。 Ollama-地元のモデルをサポートしています。

最終確認日：2026年8月1日。

## オプション1：コマンドラインからサーバーを追加する

1. SourceShelf で共有を作成し、「 **コピーコマンド**。
2. に追加する Codex。SourceShelfから正確なヘルパーパスと共有IDを代入します。

```sh
codex mcp add sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

1. 登録を確認してください。

```sh
codex mcp list
```

1. 始める Codex そして入る `/mcp` 接続されたサーバーを検査します。

## オプション2：編集 Codex 設定

Codex クライアントは共有します MCP 構成 `~/.codex/config.toml`.追加：

```toml
[mcp_servers.sourceshelf-municipal-research]
command = "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer"
args = ["--share", "<share-id>"]
```

代わりに、エントリを信頼できるプロジェクトの `.codex/config.toml` 接続がプロジェクト固有の必要がある場合。SourceShelf共有からコピーした正確なコマンドを使用します。

## オプション3： Codex アプリ設定

で Codex アプリ設定、追加する MCP サーバー、選択してください **STDIO**、ヘルパーコマンドと引数を入力し、保存し、接続を再起動します。同じサーバー構成は次のものにも使用できます。 Codex クライアントが共有しているため、CLI `config.toml`。

## 共有パックをテストする

試してみてください：

> SourceShelfを使用してデモパックの気候指標を探します。最も関連性の高いソースを読み、報告された傾向を要約し、その引用をしてください。 `sourceshelf://` URI. 関連のないローカルファイルを検査しないでください。

地元のモデルのために Ollama:

```sh
ollama launch codex
```

または使用する `codex --oss` あなたのとき Codex ローカルプロバイダ構成はすでにターゲットにしています Ollama。

## 接続を取り外したり交換したりする

使う `codex mcp remove sourceshelf-municipal-research` クライアントエントリを削除するには。これはSourceShelf共有権の取り消しにはなりません。すぐにアクセスを取り消すには、次のオプションを選択します。 **共有を停止する** SourceShelfでも同様です。

SourceShelf を移動、再インストール、または更新する場合、古い SourceShelf を削除または更新します。 Codex エントリーして、新しいヘルパーパスをコピーします。

公式参照： [Codex MCP 設定](https://developers.openai.com/codex/mcp/)。
