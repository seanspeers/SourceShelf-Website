# llms.txtとは？AIが利用しやすいWebサイトとナレッジを作る

大規模な言語モデルは、人々が情報を見つける方法を変えています。

人々はWebサイトを直接訪れるだけでなく、複数の情報源を必要とする質問をAIアシスタントに尋ねる機会が増えています。

従来のWebサイトは、主に人間の訪問者と検索エンジン向けに設計されています。ナビゲーションメニュー、スクリプト、スタイル、広告、対話型の要素などが含まれます。これらは人には便利ですが、自動化ツールが最も重要なコンテンツを見分けにくくする場合があります。

`llms.txt`という新しい取り決めは、よりシンプルな考え方を提案しています。Webサイトの内容と、最も役立つ情報の場所をAIシステムが理解しやすいよう、小さなMarkdownファイルを用意するという考え方です。

[当初のllms.txt提案](https://llmstxt.org/)では、推論時に言語モデルが利用しやすい情報を提供する方法として説明されています。現時点では広く採用されたWeb標準ではなく、提案段階のため、対応状況はツールごとに異なります。

## llms.txtを簡単に言うと

`llms.txt`は、通常Webサイトのルートに置くMarkdownファイルです。

```text
https://example.com/llms.txt
```

それは提供することができます：

- ウェブサイトの簡単な説明
- 重要なページとドキュメントへのリンク
- 重要なセクションに含まれる内容を説明する要約
- コンテキストが限られているときにスキップできるオプションのセカンダリリンクのグループ

[出版されたフォーマット](https://github.com/AnswerDotAI/llms-txt)はH1タイトルのみを必要とします。また、ブロック引用の要約、説明的な散文、H2セクション、および短いメモを含むMarkdownリンクリストも含まれることができます。

3つのルートレベルのファイルを同等なものとして扱うことなく、その意図を比較することは有用です。

- `robots.txt`：クローラーアクセス環境設定に関する説明
- `sitemap.xml`：ウェブサイトのURLとファイルのマップ
- `llms.txt`：AIシステムにとって重要なコンテンツのキュレーションガイド

## llms.txtファイルの例

![SourceShelfのllms.txtの例を表示するMarkdownエディタで、Getting Started、AI Packs、MCP Accessへのリンクが含まれています。](/assets/blog/ja/llms-txt-markdown-example.webp)

```markdown
# Example Documentation

> Example is a platform for managing research documents.

## Documentation

- [Getting Started](https://example.com/start)
  Learn how to begin.

- [API Reference](https://example.com/api)
  Complete API documentation.

## Guides

- [Importing Data](https://example.com/import)
  Learn supported formats.
```

Markdownは専用ビューアがなくても読めます。テキストエディタで編集やレビューができ、チームでバージョン管理もできます。また、ソフトウェアはWebページの画面要素を取り除かなくても、見出しやリンクの構造を理解できます。

## llms.txtが存在する理由

通常のWebページには、ナビゲーション、メニュー、スクリプト、関連リンク、広告、スタイル、対話型の操作項目などが含まれます。信頼できる説明やドキュメントは、そのページの一部に過ぎない場合があります。

llms.txt提案は、キュレーションされたエントリーポイントを提供します。 リンクされたページを置き換えるものではありません。 それは読者にコレクションが何についてなのか、そして次にどこを見るべきかを示します。

図書館のカタログを考えてみてください。カタログは図書館全体ではありません。適切な本を見つけるのに役立ちます。

## llms.txtの利点

{{benefit-cards}}

これらの利点は、そのファイルを読んで利用するツールがあってこそ得られるものです。`llms.txt`を公開しただけで、AIサービスがWebサイトを発見、取得、優先するわけではありません。

## llms.txtができないこと

`llms.txt`には、次のことはできません。

- AIシステムにWebサイトを読ませる
- AIの回答に必ず含まれるようにする
- AI検索やランキングの向上を保証する
- 通常のSEOやアクセシブルなWebサイト構造を置き換える
- `robots.txt`、サイトマップ、適切な内部リンクを置き換える
- スクレイピングを防いだり、アクセス許可を与えたりする
- AIナレッジベースを自動的に作る

これは許可システムではなく、有用なヒントと構造化された参照情報です。Webサイト運営者は、引き続き適切なアクセス制御、ライセンス、クローラーポリシー、プライバシーに関する判断を行う必要があります。

## llms.txt対robots.txt

![robots.txtはクローラーのアクセス設定、sitemap.xmlはWebサイトのURL、llms.txtはAI向けに選択されたコンテキストを表すという3列の比較。](/assets/blog/ja/llms-txt-file-comparison.webp)

| ファイル | 目的 |
|---|---|
| `robots.txt` | クローラーへのアクセス設定を伝達 |
| `sitemap.xml` | ウェブサイトのURLとファイルのリスト |
| `llms.txt` | 厳選されたAIで読み取ることができる文脈を提供します |

これらのファイルは、異なる問題を解決します。 Googleは、[`robots.txt`](https://developers.google.com/search/docs/crawling-indexing/robots/intro)を、主にクローラートラフィックの管理のために、検索エンジンクローラーにアクセスできるURLを伝える方法として説明しています。 [サイトマップ](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)は、サイトが重要なと見なすページやファイルを識別するファイルとして説明されています。

llms.txt提案は、アクセス制御メカニズムでも完全なURLインベントリでもありません。編集層です。サイト所有者は、有用な資料のサブセットを選択し、簡潔なMarkdownで説明します。

## llms.txtを手動で作成する

基本的なワークフローはシンプルです。

1. ウェブサイトを最もよく説明するページを特定します。
2. 明確なH1タイトルと簡単な要約を含むMarkdownファイルを作成します。
3. 重要なリンクを説明的なH2ヘッダーの下にグループ化します。
4. リンクの目的が明らかでない場合は、1文のメモを追加します。
5. ファイルをウェブサイトのルートに置きます。

```text
https://website.com/llms.txt
```

リストは重要な項目に絞ります。信頼できるコンテンツを厳選した短いガイドは、すべてのURLを含む2つ目のサイトマップより役立つことがあります。ドキュメントの場所やポリシーが変わったり、重要なページが追加されたりしたときは、ファイルを見直します。

## SourceShelfもllms.txtを公開しています

SourceShelfは独自の[llms.txtファイル](https://sourceshelf.app/llms.txt)を公開しています。これにより、AIシステムや開発者は、この記事で説明したものと同じ取り決めを使って、アプリケーションのドキュメントや主要な概念を見つけられます。

## SourceShelfがllms.txtを使用する方法

SourceShelfは`llms.txt`を、WebサイトとローカルなAIナレッジワークフローをつなぐ手段として扱います。

多くのWebサイトには、ドキュメント、研究、ポリシー、製品情報、技術ガイドなどの価値あるナレッジがすでに含まれています。ローカルなllms.txtコレクションは、それらを順序立てて人が読みやすい形で示せます。SourceShelfはそのコレクションをライブラリにインポートし、Mac上に保持される保存済みパックを作成できます。

このワークフローは意図的にオフラインです。SourceShelfはウェブサイトをクローリングしたり、インポートされたインデックスから任意のリモートURLを取得したりしません。

### SourceShelfでllms.txtをインポートする

典型的なインポートは次のように機能します。

1. `llms.txt`ファイルまたはそのファイルを含むフォルダを選択してください。
2. SourceShelfはローカルインデックスを読み取ります。
3. 選択したフォルダの下の安全な参照ファイル`.md`、`.markdown`、`.txt`は解決され、ローカルにインポートされます。
4. インデックスは最初のライブラリアイテムになり、ローカルドキュメントはインデックス順に続きます。
5. SourceShelfは、インデックスタイトルから名付けられた保存済みパックを作成します。

リモートのHTTPまたはHTTPSリンクはダウンロードされません。SourceShelfはタイトル、説明、出典情報を「利用不可」の参照として保持します。これにより、Webサイトのコンテンツを自動的に転送することなく、インデックスに記載された参照を確認できます。

![SourceShelf変換ビューで、llms.txtをインポートするアクションを使用すると、ローカルコレクションを選択できます。](/assets/blog/ja/llms-import-source.webp)

![ナレッジをローカルに整理した後、順序付けされたドキュメントとパックの操作項目を表示するSourceShelfの保存済みパック。](/assets/blog/ja/llms-pack-created.webp)

### SourceShelfを使用してllms.txtコレクションをエクスポートする

SourceShelfは、保存されたパックから**llms.txtコレクションフォルダ**を作成することもできます。

```text
my-research-pack/
├── llms.txt
├── documents/
├── assets/
├── sourceshelf-manifest.json
└── checksums.sha256
```

フォルダには、順序付けされたドキュメント、参照されるアーカイブ済みアセット、出典情報を含むSourceShelfマニフェスト、整合性確認用の決定論的チェックサムが含まれます。有効な出典情報を持つ利用不可のWeb参照は、インデックスの「Optional」セクションに表示される場合がありますが、SourceShelfはそれらをダウンロードしません。

![SourceShelfは、llms.txtコレクションフォルダ、AI Reference PackZIP、OKFバンドル ZIP を含むエクスポートオプションを提供します。](/assets/blog/ja/llms-export.webp)

これはポータブルなコレクション形式ですが、すべてのAI製品が直接インポートできることを保証するものではありません。読み取り可能なローカルナレッジとして保管したり、別のワークフローに合わせて変更したり、同じ保存済みパックを別の形式でエクスポートしたりできます。

### llms.txtからSourceShelfワークフローへの移行

![Webサイトからllms.txt、SourceShelf、ナレッジパックを経て、選択したAIツールにつながるワークフロー。](/assets/blog/ja/sourceshelf-llms-workflow.webp)

コレクションが保存されたパックになったら、[AI Reference Pack](/local-ai-reference-packs/)をエクスポートしたり、Local AI Accessを使用して、不変で読み取り専用のスナップショットを互換性のあるクライアントと共有したりできます。選択したパックだけが公開されます。SourceShelfはライブラリの残りを共有しません。

![SourceShelfLocal AI Accessは、選択した保存済みパックの現在の読み取り専用スナップショットを表示しています。](/assets/blog/ja/llms-ai-access.webp)

既存のインデックスではなく、より幅広いドキュメントやWebページの組み合わせから始める場合は、[プライベートAIナレッジベースのワークフロー](/private-ai-knowledge-base-mac/)で、ローカルソースを取り込み、整理し、選択的に共有する方法を解説しています。

## OKFとの関係

![3つの段階では、発見にはllms.txt、組織にはSourceShelf、保存にはOKFが表示されます。](/assets/blog/ja/llms-txt-okf-relationship.webp)

`llms.txt`とOpen Knowledge Formatは異なる問題を解決します。

- **llms.txt:** ツールが厳選されたWebサイトのナレッジを発見し、その中をたどる手がかりになります
- **OKF:** 構造化されたナレッジを、Markdownの概念とメタデータからなるポータブルなコレクションにまとめます
- **SourceShelf:** これらの2つのステージ間のローカルソースを整理し、選択したワークフロー用にエクスポートできます。

[Open Knowledge Formatへのガイド](what-is-open-knowledge-format-okf.md)は、パッケージングの側面をより詳細に説明しています。どちらのフォーマットもモデルのコンテキストウィンドウを拡大したり、ツールがすべてのソースを使用することを保証するものではありません。

## AIが実際に使えるナレッジを作る

AIシステムにはコンテキストが必要です。そのコンテキストは、構造化され、ポータブルで、理解可能であり、作成者によって維持されている場合に最も役立ちます。

`llms.txt`は、AIシステムやエージェントがオンラインのナレッジを発見しやすくするための小さな一歩です。その価値は、丁寧な選定、正確な要約、安定したリンク、そしてこの取り決めに対応するツールによって生まれます。

SourceShelfは、ナレッジをローカルで取り込み、整理し、パッケージ化することでこの考え方を広げます。それにより、選んだAIツールに移っても情報を役立てられます。

## 公式情報源

- [llms.txtの提案と形式](https://llmstxt.org/)
- [Answer.AI llms.txt仕様リポジトリ](https://github.com/AnswerDotAI/llms-txt)
- [Google Search Central：robots.txtの概要](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Search Central：サイトマップについて学ぶ](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
