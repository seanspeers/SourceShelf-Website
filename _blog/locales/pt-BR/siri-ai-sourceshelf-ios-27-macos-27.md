# Siri AI encontra SourceShelf no iOS 27 e macOS 27

O iOS 27 e o macOS 27 trazem duas mudanças que são importantes para os usuários do SourceShelf: um modelo mais forte dentro do **Ask This Pack** e uma arquitetura de sistema mais ampla para descobrir pesquisas por meio da **Siri AI**.

Em nossos testes no macOS 27, o Ask This Pack produziu respostas mais completas, seguiu as instruções com mais precisão e lidou com as citações com mais confiabilidade com o mesmo código de recuperação e prompts SourceShelf.

No sistema, a nova arquitetura Siri AI da Apple oferece aos aplicativos uma forma de tornar seu conteúdo acessível por meio do Spotlight e do App Intents. Para o SourceShelf, isso abre um caminho entre as pesquisas que você organiza e a descoberta em todo o sistema.

São recursos complementares. **O Ask This Pack se concentra em um pacote que você escolhe. A Siri AI pode encontrar conteúdo de apps disponibilizado no índice do sistema da Apple.** O fluxo da Siri descrito aqui é uma possibilidade de integração; não significa que todos os pacotes do SourceShelf já estejam disponíveis para a Siri.

## O Ask This Pack ganha um modelo melhor

O recurso Ask This Pack do SourceShelf separa a recuperação da geração.

Quando você faz uma pergunta, o SourceShelf pesquisa o Pacote selecionado, constrói um conjunto limitado de evidências relevantes e pede ao Modelo Fundacional do dispositivo da Apple para responder a partir desse material. O modelo não precisa saber sua pesquisa com antecedência: o SourceShelf fornece as fontes que precisa.

Essa arquitetura permite melhorias no modelo de sistema da Apple para beneficiar o SourceShelf sem substituir seu mecanismo de recuperação ou mover sua pesquisa para outro serviço de IA.

As [atualizações de Foundation Models](https://developer.apple.com/documentation/updates/foundationmodels) da Apple confirmam que o iOS 27, o iPadOS 27, o macOS 27 e o visionOS 27 incluem um `SystemLanguageModel` atualizado que roda no dispositivo, segue melhor as instruções e oferece resultados melhores em situações complexas. A Apple orienta os desenvolvedores a testar novamente seus prompts após a atualização do sistema, pois o modelo subjacente muda.

Nós fizemos.

## A mesma versão do SourceShelf, melhores respostas

Executamos novamente o benchmark **Japan Adventure** do Ask This Pack, com dez perguntas, no macOS 27. O código do SourceShelf, o pacote, as perguntas, a arquitetura de busca e os prompts permaneceram iguais. A atualização do sistema trouxe o modelo Foundation atualizado da Apple, além de outras mudanças no sistema.

A execução passou em **todas as 10 verificações de busca, fundamentação nas fontes e citações**. Essa taxa de aprovação se refere a este teste específico; não significa que todas as respostas tenham sido completas ou livres de erros.

As nove perguntas com respaldo no pacote receberam respostas com citações válidas. Diante da pergunta sobre Hokkaido, deliberadamente sem respaldo nas fontes, o SourceShelf se absteve corretamente na etapa de busca, sem chamar o modelo da Apple.

Várias respostas anteriormente difíceis melhoraram substancialmente:

- O itinerário incluía todos os dez dias.
- A resposta de Hakone preservou todas as etapas da jornada e as duas alternativas previstas para o clima.
- As recomendações de templos incluíam prioridades e horários concretos.
- As respostas sobre hospedagem, viagens de trem, orçamento, comida e fontes conflitantes foram precisas e úteis.

Ainda havia omissões. Uma lista de verificação de reservas exaustiva esqueceu um item de medição de bagagem e repetiu um item de nota alimentar. Uma resposta alimentar negligenciou uma recomendação opcional do Dia 6. Citações e inspeção de fontes continuam úteis mesmo quando a resposta geral é boa.

### Desempenho no macOS 27

| Métrica | Resultado macOS 27 |
| --- | ---: |
| Recuperação média | 0,506 s |
| Tempo médio até o primeiro texto | 1,127 s |
| Tempo mediano de geração | 5,541 s |
| Tempo médio de geração | 7,565 s |

As respostas às duas perguntas mais abrangentes, sobre o roteiro completo e a lista de reservas, levaram cerca de 15 segundos cada para serem geradas. Esse tempo adicional produziu respostas muito mais completas.

Estes são os resultados dos testes internos do SourceShelf. Esta não é uma comparação controlada entre macOS 26 e macOS 27: não podemos mais reiniciar o sistema operacional anterior na mesma máquina, e uma atualização de sistema operacional pode mudar mais do que o modelo. Os resultados são consistentes com as melhorias documentadas do modelo da Apple, mas não isolam sua contribuição de todas as outras mudanças de sistema.

A observação prática ainda é útil: **o mesmo pipeline de evidências SourceShelf produziu respostas substancialmente melhores no macOS 27.** Você pode ver o fluxo de trabalho de pesquisa subjacente em nosso [Exemplo de planejamento de viagem ao Japão](/examples/japan-trip-ai-planner/).

## A recuperação híbrida ainda importa

Um resultado destacou por que o SourceShelf combina recuperação semântica e lexical.

Para uma pergunta sobre informações conflitantes, o Core Spotlight rejeitou o ramo de busca semântica como inseguro. O caminho lexical de SourceShelf ainda encontrou as evidências corretas, e a resposta final permaneceu precisa.

A recuperação semântica encontra ideias relacionadas mesmo quando a redação difere. A recuperação lexical auxilia com nomes exatos, datas, frases e identificadores, e fornece outra rota quando a busca semântica falha. Nesta rodada, manter ambos os caminhos evitou que uma busca rejeitada se tornasse uma resposta falha.

A sessão WWDC26 da Apple, [Pesquisa de LLM usando Core Spotlight](https://developer.apple.com/videos/play/wwdc2026/246/), demonstra a conexão de conteúdo indexado com o framework Foundation Models por meio de chamadas de ferramenta. Também explica como metadados e design de recuperação afetam a qualidade das respostas fundamentadas.

Um modelo mais forte ajuda com a resposta final. A recuperação ainda determina quais evidências ele recebe.

## A IA da Siri muda o que o Spotlight significa

A segunda alteração ocorre fora do Ask This Pack.

A [introdução à Siri AI](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) da Apple descreve um assistente reconstruído que combina modelos de linguagem com contexto pessoal, compreensão do conteúdo na tela e recursos do sistema, incluindo Spotlight e App Toolbox. O contexto pessoal pode se estender a aplicativos de terceiros quando os desenvolvedores se integram ao Spotlight.

Os aplicativos podem representar seu conteúdo como **Entidades de Aplicativo** e adicioná-lo ao o índice semântico do Spotlight. A Apple Intelligence pode então encontrar esse conteúdo quando alguém descreve o que precisa, mesmo quando a redação não corresponde exatamente ao título. A Apple documenta isso nos documentos [Apple Intelligence e Siri AI](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai) e [Torne as entidades de aplicativos disponíveis no Spotlight](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight).

Isso cria uma conexão natural com as coleções de pesquisas estruturadas da SourceShelf.

## Do Pacote ao contexto pessoal da Siri

O SourceShelf transforma PDFs, páginas da web, documentos digitalizados, notas, apresentações, planilhas e outras pesquisas em Pacotes focados. Um Pacote também pode ser exportado como um **pacote Open Knowledge Format (OKF) v0.2**, contendo Markdown legível e informações estruturadas sobre suas fontes.

Nosso [guia para Open Knowledge Format](what-is-open-knowledge-format-okf.md) explica como o Markdown, metadados, procedência e um índice mantêm esse conhecimento portátil. A [especificação OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) descreve o próprio formato.

A arquitetura da Apple fornece outro uso possível para esse mesmo conhecimento organizado.

![Um pacote SourceShelf se ramifica no Ask This Pack para obter respostas locais, um pacote OKF para exportação portátil e uma possível integração de Siri AI por meio de Entidades de Aplicativo e Spotlight. O ramo Siri requer integração de aplicativo.](/assets/blog/pt-BR/siri-ai-knowledge-paths.svg)

O diagrama mostra um caminho de integração conceitual. **A Siri não precisa se tornar um parser OKF, e exportar um ZIP não o adiciona automaticamente ao contexto pessoal da Siri.**

Em vez disso, o SourceShelf pode usar seu conhecimento do Pacote e sua estrutura compatível com o OKF para representar conteúdo útil como Entidades de Aplicativo. Com a integração apropriada do Spotlight e do App Intents, essas entidades podem ser encontradas pelo sistema. Uma exportação do OKF e um índice do Spotlight são saídas separadas da coleção subjacente; exportar um arquivo OKF não é um pré-requisito para indexar o conteúdo do aplicativo.

O [Guia WWDC26 iOS](https://developer.apple.com/wwdc26/guides/ios/) da Apple explica que os esquemas de entidades contribuem com o conteúdo do aplicativo para o índice semântico, onde a Siri pode apresentá-lo com atribuição ao aplicativo de origem.

**O conhecimento permanece portátil. O índice é outra maneira de usá-lo.**

## Respostas focadas e descoberta em todo o sistema

O Ask This Pack e a Siri AI atendem a necessidades diferentes.

Com o **Ask This Pack**, você escolhe a coleção. O SourceShelf recupera evidências dessa coleção e retorna respostas fundamentadas com citações. Quando a coleção carece de evidências suficientes, o SourceShelf pode abster-se em vez de ampliar a busca para informações não relacionadas.

Por exemplo:

> O que o meu Japan Pack diz que preciso reservar antes de chegar a Hakone?

Com **Siri AI**, o conteúdo SourceShelf devidamente indexado pode ser encontrado a partir de uma solicitação de nível de sistema, sem primeiro abrir um Pacote ou lembrar do título exato de um documento.

A distinção é o raciocínio focado versus a descoberta em todo o sistema. Um Pacote permanece a coleção que você organiza; a Siri oferece uma maneira potencial de encontrar o conteúdo disponibilizado a ela.

## Primeiro local, com limites precisos de privacidade

O Ask This Pack usa o Modelo Fundacional no dispositivo da Apple em dispositivos compatíveis. O SourceShelf recupera as evidências localmente e não envia um Pacote para um servidor SourceShelf.

O Spotlight também é uma capacidade de sistema em dispositivo. A Apple descreve o orquestrador de sistema da Siri AI usando o Spotlight e a App Toolbox localmente, enquanto o processamento do modelo de linguagem da Siri pode ser executado no dispositivo ou por meio do Private Cloud Compute. Essas fronteiras de execução diferem do fluxo de trabalho em dispositivo do Ask This Pack. Consulte o [Anúncio da arquitetura de IA da Siri](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) da Apple para essa distinção.

Fazer o conteúdo ser descoberto pela Siri, portanto, não deve ser descrito como uma garantia de que cada solicitação da Siri permaneça no dispositivo. Também não requer transformar o SourceShelf em um serviço de conhecimento em nuvem: a Biblioteca, o Markdown convertido, a estrutura do Pacote, as exportações e o processo de recuperação do SourceShelf permanecem sob o controle do usuário.

## Por que o conhecimento aberto se torna mais valioso

A IA dos sistemas operacionais está mudando rapidamente. Isso torna o conhecimento portátil mais útil.

Um Pacote SourceShelf compatível com OKF preserva o Markdown legível, metadados, proveniência, relações entre fontes e um índice da coleção. O SourceShelf pode usá-lo com o Ask This Pack, exportá-lo para outra ferramenta compatível ou usar seu conteúdo estruturado como base para uma integração de sistema.

A parte duradoura é a pesquisa que você coletou e organizou. Um novo modelo deve melhorar a maneira como você usa esse conhecimento sem forçá-lo a reconstruí-lo.

O Modelo Fundacional da Apple pode mudar. A Siri pode mudar. Sua pesquisa não precisa.

## Disponibilidade e o que esperar

O [Anúncio de setembro](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/) da Apple diz que a Siri AI começará a ser implementada com o iOS 27 **como beta em 14 de setembro de 2026**, para dispositivos compatíveis configurados para o inglês. Para as funcionalidades e a compatibilidade do macOS 27, consulte a [visão geral do macOS](https://www.apple.com/os/macos/) da Apple.

A Apple Intelligence requer hardware compatível, incluindo Macs com chips da Apple e iPhones elegíveis, como os modelos iPhone 15 Pro e posteriores compatíveis. A disponibilidade de recursos varia de acordo com o dispositivo, o idioma e a região; consulte as [informações sobre a disponibilidade da Apple Intelligence](https://www.apple.com/apple-intelligence/) da Apple para o seu dispositivo.

Para o Ask This Pack, atualizar um dispositivo compatível com a Apple Intelligence habilitada fornece acesso ao modelo de sistema atualizado no dispositivo. Nossos resultados de benchmark aqui são do macOS 27; eles não são medições separadas do iPhone ou uma garantia de desempenho idêntico em todos os dispositivos.

O caminho de descoberta da Siri também depende do SourceShelf expondo conteúdo adequado por meio das APIs de integração da Apple. A atualização do sistema operacional por si só não torna todos os Pacotes disponíveis para a Siri.

## Um Pacote, várias formas de usar

SourceShelf começou com uma ideia simples: a pesquisa deve permanecer útil depois que você a salvar.

Você pode ler um pacote focado, consultá-lo de forma privada com o Ask This Pack, exportá-lo como um pacote OKF aberto ou pesquisar seu conteúdo com outra ferramenta compatível. A arquitetura de indexação semântica da Siri AI abre mais um caminho para encontrar conteúdo selecionado dos apps.

A camada de IA pode continuar melhorando enquanto a coleção subjacente permanece aberta, estruturada, local e reutilizável.

## Fontes oficiais

- [Atualizações dos modelos de fundação — Desenvolvedor da Apple](https://developer.apple.com/documentation/updates/foundationmodels): o modelo atualizado no dispositivo e as orientações para o reteste de prompt.
- [A Apple apresenta Siri AI - Apple Newsroom](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/): contexto pessoal, arquitetura do sistema e limites de privacidade.
- [Apple Intelligence e Siri AI — Desenvolvedor da Apple](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai): como o conteúdo e as ações do aplicativo se conectam à Apple Intelligence.
- [Tornando entidades de aplicativos disponíveis no Spotlight — Desenvolvedor da Apple](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight): indexação de entidades para descoberta de sistema.
- [Pesquisa de LLM usando Core Spotlight — WWDC26](https://developer.apple.com/videos/play/wwdc2026/246/): recuperação, chamadas de ferramenta e qualidade de metadados.
- [Guia iOS WWDC26 — Desenvolvedor da Apple](https://developer.apple.com/wwdc26/guides/ios/): esquemas de entidades e atribuição ao aplicativo de origem.
- [Anúncio do iPhone de setembro — Apple Newsroom](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/): Lançamento beta de 14 de setembro da Siri AI.
