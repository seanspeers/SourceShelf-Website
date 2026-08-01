# SourceShelfをLM Studioで使う

LM Studio ローカルモデルを実行し、として機能できます。 MCP SourceShelfのヘルパーを開始するホスト。信頼性の高いツール呼び出しサポートを備えたモデルを使用してください。モデルは選択する必要があります `search_pack` そして `read_pack_resource` 会話の過程で。

最終確認日：2026年8月1日。

## 要件

- 電流 LM Studio と一緒にリリースする MCP サポート（LM Studio 文書 MCP 0.3.17からサポートされます）。
- ツールを使用できるモデルをダウンロードしてロードしたものです。
- 作成した現在のSourceShelf共有フォルダ **パック>その他>ローカルAIアクセス...**。

## SourceShelf接続をインストールする

1. SourceShelf で、パッケージの **ローカルAIアクセス** シート。
2. 選択する **コピー MCP 設定**。
3. で LM Studio、を開く **プログラム** タブ。
4. 選択する **設置する**、それから **mcp.jsonを編集する**。
5. コピーしたものを貼り付けまたは結合します。 `mcpServers` エントリー。保持したい他のサーバーを削除しないでください。
6. ファイルを保存し、SourceShelf統合を有効にします。

結果は次の形になります。

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

SourceShelfによってコピーされた正確なコマンドと共有IDを使用してください。アプリケーションまたはヘルパーパスを手動で置き換えないでください。

## ツールをテストする

ツール対応のローカルモデルを読み込み、狭い、明示的なリクエストから始めます。

> SourceShelfツールを使用して、共有パックで樹冠ターゲットを検索します。最も一致するリソースを読み取り、ターゲットを要約し、SourceShelfリソースを引用します。 URI。一般的な知識から答えないでください。

小型モデルの場合、シーケンスを明示的にします。

> 最初の電話 `search_pack` クエリ付きで `tree canopy targets` そして5の制限があります。それから電話してください `read_pack_resource` 最適な結果を得るために。答えは返されたテキストのみに基づいてください。

検索呼び出しが1つ続き、1つ以上のバインドされた読み込みが続いているはずです。モデルがツールを呼び出す代わりにツールを説明している場合は、より強力な関数呼び出しサポートを備えたモデルを試したり、手順の言い回しを維持したりしてください。

## LM Studio ローカルAPIサーバーとして

LM Studio 構成することもできます MCP API駆動型エージェントに利用可能なサーバー。 現在の LM Studio ドキュメントでは、APIクライアントがサーバーを呼び出す前に、サーバーの構成と認証設定が必要となります。 `mcp.json`。これは高度なルートです。組み込みのチャットは最も簡単な機能テストです。

## 一般的な LM Studio エラー

### 「プラグインプロセスが予期せずコード 1 で終了しました」

ヘルパーは共有を開始したり検証したりできませんでした。SourceShelfを移動または更新した後、構成をコピーして、共有が有効になっていることを確認し、パッケージが現在のスナップショットが表示されていることを確認します。

### 「不明な方法：ツール/リスト」

クライアントがリソースのみまたは古いヘルパーに到達しました。現在のSourceShelfバージョンをインストールし、構成をコピーして、統合を再起動します。現在のSourceShelfは両方を露出しています `search_pack` そして `read_pack_resource`。

### コンテキストウィンドウがすぐに埋まる

モデルに最初に検索してもらい、1つか2つの結果のみを読み取ってもらいます。SourceShelfのページ付き読み取りツールは、すべてのリソースをプロンプトにロードすることを避けるために特別に作成されています。

公式参照： [LM Studio MCP サーバー](https://lmstudio.ai/docs/app/mcp)、 [LM Studio MCP APIの使用](https://lmstudio.ai/docs/developer/core/mcp)、 [LM Studio サーバー設定](https://lmstudio.ai/docs/developer/core/server/settings)。
