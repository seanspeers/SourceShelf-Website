# iOS 27およびmacOS 27でSiri AIがSourceShelfと出会う

iOS 27とmacOS 27は、SourceShelfユーザーにとって重要な2つの変更をもたらします：**Ask This Pack**内のモデルの強化、そして**Siri AI**を通じて研究を発見するためのより広範なシステムアーキテクチャです。

macOS 27でのテストでは、SourceShelfの検索コードとプロンプトを変更せずに、Ask This Packの回答の網羅性、指示への追従性、引用の信頼性が向上しました。

システム側では、Appleの新しいSiri AIアーキテクチャにより、アプリはSpotlightとApp Intentsを通じてコンテンツを見つけられるようにできます。SourceShelfにとっては、意図を持って整理したリサーチをシステム全体から発見するための道が開かれます。

これらは補完的な機能です。**Ask This Packは、選択したパックに焦点を当てています。Siri AIは、Appleのシステムインデックスに公開されているアプリの内容を発見できます。**ここで説明されているSiriワークフローは、すべてのSourceShelfパックがすでにSiriに利用可能であるという主張ではなく、統合の機会です。

## Ask This Packのモデルが進化

SourceShelfのAsk This Pack機能は、取得と生成を分離します。

質問をすると、SourceShelfは選択したパックを検索し、関連する根拠を一定の範囲に絞って集め、AppleのオンデバイスFoundation Modelにその資料に基づく回答を求めます。モデルが事前にリサーチの内容を知っている必要はありません。SourceShelfが必要な資料を提供します。

この構成では、検索エンジンを置き換えたり、リサーチを別のAIサービスに移したりせずに、Appleのシステムモデルの改善をSourceShelfで活用できます。

Appleの[ファウンデーションモデルの更新](https://developer.apple.com/documentation/updates/foundationmodels)は、iOS 27、iPadOS 27、macOS 27、visionOS 27に、より優れた指示追従機能を備え、複雑なシナリオでも結果が得られるように、更新されたオンデバイスの`SystemLanguageModel`が含まれていることを確認しています。Appleは、OSのアップグレード後、基盤モデルが変更されるため、開発者にプロンプトを再テストするようアドバイスしています。

私たちはそうしました。

## 同じSourceShelfビルド、より良い答え

macOS 27で10問の**Japan Adventure** Ask This Packベンチマークを再実行しました。SourceShelfアプリケーションコード、パック、質問、検索アーキテクチャ、プロンプトは変更されていませんでした。オペレーティングシステムアップグレードにより、Appleの更新されたFoundation Modelに加え、その他のシステム変更も実施されました。

今回の実行では、**10問すべてで検索、根拠との整合性、引用のチェックに合格**しました。これはこのベンチマークの判定基準に対する合格率であり、すべての回答が網羅的で誤りがなかったという意味ではありません。

パック内の資料で答えられる9問すべてに、有効な引用付きの回答が生成されました。意図的に資料にない北海道について尋ねた質問では、Appleのモデルを呼び出さず、検索段階で適切に回答を控えました。

以前は難しい答えだったいくつかの答えが大幅に改善されました：

- 旅程には10日間すべてが含まれていました。
- 箱根の回答では、移動の全行程と天候に応じた2つの代替案を保持していました。
- 寺院のおすすめには、具体的な優先順位と訪問時間が含まれていました。
- 宿泊、鉄道、予算、食事、情報源間の矛盾についても、正確で役立つ回答が得られました。

依然として省略がありました。包括的な予約チェックリストには荷物測定項目が1つ見落とされ、食事に関する注記項目が重複していました。食事に関する回答では、オプションの6日目のおすすめ事項が見落とされました。引用や出典の確認は、全体的な回答が良好であっても依然として有用です。

### macOS 27でのパフォーマンス

| 指標 | macOS 27の結果 |
| --- | ---: |
| 平均検索時間 | 0.506秒 |
| 最初のテキスト表示までの平均時間 | 1.127秒 |
| 生成時間の中央値 | 5.541秒 |
| 平均生成時間 | 7.565秒 |

完全な旅程と予約チェックリストについての、特に網羅性が求められる2問では、回答の生成にそれぞれ約15秒かかりました。その時間に見合う、より充実した回答が得られました。

これらはSourceShelfの内部テスト結果です。これは制御されたmacOS 26とmacOS 27の比較ではありません：以前のオペレーティングシステムを同じマシンで再起動することはできなくなり、OSのアップグレードはモデルよりも多くの変更を引き起こす可能性があります。結果はAppleが文書化したモデルの改善と一致していますが、他のすべてのシステム変更からの貢献を単独に特定することはできません。

実用的な観察は依然として有用です：**同じSourceShelfの証拠パイプラインがmacOS 27で大幅に優れた答えを出しました。** [日本旅行計画の例](/ja/examples/japan-trip-ai-planner/)の裏にある研究ワークフローを確認できます。

## ハイブリッド検索は引き続き重要

1つの結果は、SourceShelfが意味的および語彙的検索を組み合わせている理由を強調しています。

情報の矛盾について尋ねた質問では、Core Spotlightがセマンティック検索の経路を安全でないとして拒否しました。それでもSourceShelfの字句検索は正しい根拠を見つけ、最終的な回答は正確でした。

セマンティック検索は、表現が異なっていても関連する内容を見つけます。字句検索は、正確な名前、日付、フレーズ、識別子を探すのに役立ち、セマンティック検索が失敗したときの別経路にもなります。今回も、2つの経路を持つことで、一方の検索が拒否されても回答を返すことができました。

AppleのWWDC26セッション、[Core Spotlightを使用したLLM検索](https://developer.apple.com/videos/play/wwdc2026/246/)では、ツール呼び出しを通じてインデックス化されたコンテンツをFoundation Modelsフレームワークに接続する方法を実証しています。また、メタデータと検索の設計が根拠のある応答の品質にどのように影響するかについても説明しています。

より強力なモデルは、最終的な答えを支援します。検索は引き続き、モデルに渡す根拠を決定します。

## Siri AIがSpotlightの意味を変える

2番目の変更は、Ask This Packの外で発生します。

Appleの[Siri AIの紹介](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/)は、言語モデルと個人コンテキスト、画面認識、SpotlightやApp Toolboxなどのシステム機能を組み合わせた再構築されたアシスタントについて説明しています。Spotlightと統合する開発者の場合、個人コンテキストはサードパーティアプリにも拡張できます。

アプリは、そのコンテンツを**Appエンティティ**として表現し、Spotlightのセマンティックインデックスに登録することができます。Apple Intelligenceは、ユーザーが必要な内容を説明した際に、文言がタイトルと完全に一致していなくても、そのコンテンツを特定できます。Appleはこの内容を[Apple IntelligenceとSiri AI](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai)および[Spotlightでアプリエンティティを公開する](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight)で文書化しています。

それはSourceShelfの構造化された研究コレクションとの自然なつながりを作り出します。

## パックからSiriの個人的なコンテキストまで

SourceShelfは、PDF、ウェブページ、スキャン、ノート、プレゼンテーション、スプレッドシート、その他の研究を集中したパックに変換します。パックはまた、**Open Knowledge Format(OKF) v0.2 バンドル**としてエクスポートでき、読み取り可能な Markdownとそのソースに関する構造化された情報が含まれています。

私たちの[Open Knowledge Formatのガイド](/ja/blog/what-is-open-knowledge-format-okf/)は、Markdown、メタデータ、出所、インデックスがどのようにしてその知識をポータブルに保つかを説明しています。[OKF仕様](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)はフォーマット自体を説明しています。

Appleのアーキテクチャは、同じ組織化された知識の別の可能な用途を提供します。

![SourceShelfパックは、ローカル回答用のAsk This Pack、ポータブルエクスポート用のOKFバンドル、およびAppエンティティとSpotlightを通じての潜在的なSiri AI統合に分岐します。Siri分岐にはアプリ統合が必要です。](/assets/blog/ja/siri-ai-knowledge-paths.svg)

図は概念的統合経路を示しています。**SiriはOKFパーサーになる必要はなく、ZIPをエクスポートしても自動的にSiriの個人コンテキストに追加されるわけではありません。**

代わりに、SourceShelfは、パックに関する知識とOKF互換の構造を利用して、Appエンティティとして有用なコンテンツを表現できます。適切なSpotlightとApp Intentsの統合により、これらのエンティティはシステムによって発見可能になります。OKFのエクスポートとSpotlightインデックスは、基礎コレクションからの別々の出力です。OKFファイルをエクスポートすることは、Appコンテンツのインデックス作成の前提条件ではありません。

Appleの[WWDC26 iOSガイド](https://developer.apple.com/wwdc26/guides/ios/)は、エンティティスキーマがアプリの内容をセマンティックインデックスに登録し、Siriが元のアプリに帰属情報を付けてそれらを提示できると説明しています。

**知識は持ち運び可能です。インデックスはそれを活用する別の方法です。**

## 集中した回答とシステム全体の発見

Ask This PackとSiri AIは、それぞれ異なるニーズに応えます。

**Ask This Pack**では、対象のコレクションを自分で選びます。SourceShelfはそのパックから根拠を集め、引用付きの回答を返します。十分な根拠がなければ、関係のない情報に検索を広げるのではなく、回答を控えることができます。

例えば：

> 箱根に到着する前に何を予約する必要があると、日本旅行のパックに書かれていますか？

**Siri AI**では、SourceShelfの適切に索引化されたコンテンツを、システムへの依頼から見つけられる可能性があります。先にパックを開いたり、文書の正確なタイトルを覚えたりする必要はありません。

この違いは、集中思考とシステム全体の発見の区別です。パックはあなたが整理するコレクションであり、Siriはそれに対して利用可能なコンテンツを見つけるための可能性のある方法を提供します。

## ローカルファースト、正確なプライバシー境界を持つ

Ask This Packは、サポートされているデバイスでAppleのオンデバイスファウンデーションモデルを使用しています。SourceShelfは証拠をローカルで取得し、SourceShelfサーバーにパックを送信しません。

Spotlightもデバイス上で動作するシステム機能です。Appleによると、Siri AIのシステムオーケストレーターはSpotlightとApp Toolboxをローカルで利用し、言語モデルの処理はデバイス上またはPrivate Cloud Computeで実行できます。この実行範囲は、Ask This Packのオンデバイス処理とは異なります。詳しくはAppleの[Siri AIアーキテクチャの発表](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/)を参照してください。

Siriがコンテンツを発見できることは、すべてのSiriへの依頼がデバイス内で処理される保証にはなりません。一方で、SourceShelfをクラウドの知識サービスに変える必要もありません。ライブラリ、変換したMarkdown、パック構造、エクスポート、SourceShelfの検索処理は、引き続きユーザーの管理下にあります。

## なぜオープンな知識がより価値があるのか

オペレーティングシステムAIは急速に進化しています。そのため、ポータブルな知識がより便利になります。

OKF互換のSourceShelfパックは、読み取り可能なMarkdown、メタデータ、出所、ソース間の関係、およびコレクションのインデックスを保持します。SourceShelfは、Ask This Packで使用したり、他の互換ツールにエクスポートしたり、構造化されたコンテンツをシステム統合の基盤として使用できます。

耐久性のある部分は、あなたが収集し整理した研究成果です。新しいモデルは、その知識を再構築することなく、どのように活用するかを改善すべきです。

Appleのファウンデーションモデルは変わる可能性があります。Siriも変わる可能性があります。あなたの研究は変わる必要はありません。

## 利用可能状況と期待できること

Appleの[9月の発表](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/)によると、Siri AIはiOS 27とともに**2026年9月14日からベータ版として**、言語を英語に設定した対応デバイス向けに展開されます。macOS 27の機能と互換性は、Appleの[macOSの概要](https://www.apple.com/os/macos/)をご覧ください。

Apple Intelligenceは、Appleシリコン搭載のMacやiPhone 15 Pro以降の対応モデルなど、対応ハードウェアが必要です。機能の利用可能状況はデバイス、言語、地域によって異なります。お使いのデバイスについては、Appleの[Apple Intelligenceの利用可能情報](https://www.apple.com/apple-intelligence/)をご覧ください。

Ask This Packでは、Apple Intelligenceを有効にした対応デバイスのOSをアップグレードすることで、更新されたオンデバイスのシステムモデルを利用できます。ここで紹介した結果はmacOS 27での測定であり、iPhoneで別途測定した結果でも、すべてのデバイスで同じ性能を保証するものでもありません。

Siriの発見パスも、SourceShelfがAppleの統合APIを通じて適切なコンテンツを公開することに依存します。オペレーティングシステムをアップグレードするだけでは、すべてのパックがSiriに利用可能になるわけではありません。

## 1つのパック、さまざまな活用方法

SourceShelfはシンプルなアイデアから始まりました：保存した後は、研究は依然として有用であるべきです。

目的を絞ったパックは、自分で読んだり、Ask This Packでプライベートに質問したり、オープンなOKFバンドルとして書き出したり、他の対応ツールで検索したりできます。Siri AIのセマンティック索引の仕組みは、アプリの選択したコンテンツを見つけるための新たな経路を開きます。

AIレイヤーは継続的に改善することができますが、基礎となるコレクションはオープンで、構造化され、ローカルで、再利用可能です。

## 公式情報源

- [Foundation Modelsのアップデート - Apple Developer](https://developer.apple.com/documentation/updates/foundationmodels)：更新されたオンデバイスモデルとプロンプト再テストのガイドライン。
- [AppleがSiri AIを発表 - Appleニュースルーム](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/)：個人コンテキスト、システムアーキテクチャ、プライバシーの境界。
- [Apple IntelligenceとSiri AI - Apple Developer](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai)：アプリのコンテンツとアクションがApple Intelligenceにどのように接続されるか。
- [Spotlightでアプリエンティティを有効にする - Apple Developer](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight)：システム検出のためのエンティティのインデックス付け。
- [Core Spotlightを使用したLLM検索 - WWDC26](https://developer.apple.com/videos/play/wwdc2026/246/)：取得、ツール呼び出し、メタデータ品質。
- [WWDC26 iOSガイド - Apple Developer](https://developer.apple.com/wwdc26/guides/ios/)：エンティティスキーマと発信アプリへの帰属。
- [9月のiPhone発表 - Appleニュースルーム](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/)：Siri AIの9月14日ベータ版リリース。
