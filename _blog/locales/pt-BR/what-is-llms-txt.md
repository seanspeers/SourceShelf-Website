# O que é llms.txt? Como criar sites e conhecimento preparados para IA

Os modelos de linguagem grandes estão mudando a forma como as pessoas encontram informações.

Em vez de apenas visitar sites diretamente, as pessoas estão cada vez mais fazendo perguntas aos assistentes de IA que exigem informações de muitas fontes.

Os sites tradicionais foram projetados principalmente para visitantes humanos e motores de busca. Eles contêm menus de navegação, scripts, estilo, anúncios e elementos interativos. Essas funcionalidades podem ser úteis para uma pessoa, mas dificultam para uma ferramenta automatizada identificar o material mais importante.

Uma convenção emergente chamada `llms.txt` propõe uma ideia mais simples: criar um pequeno arquivo Markdown que ajude os sistemas de IA a entender o que um site contém e onde suas informações mais úteis podem ser encontradas.

A [proposta original do llms.txt](https://llmstxt.org/) o descreve como uma forma de fornecer informações adequadas aos modelos de linguagem para uso durante a inferência. Ele continua sendo uma proposta, e não um padrão da web adotado universalmente; por isso, a compatibilidade varia entre as ferramentas.

## llms.txt em termos simples

Um arquivo `llms.txt` é um documento Markdown normalmente colocado na raiz de um site:

```text
https://example.com/llms.txt
```

Pode fornecer:

- Uma breve descrição do site
- Links para páginas importantes e documentação
- Resumos que explicam o que as seções importantes contêm
- Um grupo opcional de links secundários que podem ser ignorados quando o contexto é limitado

O [Formato publicado](https://github.com/AnswerDotAI/llms-txt) requer apenas um título H1. Ele também pode incluir um resumo de citações, prosa explicativa, seções H2 e listas de links Markdown com notas curtas.

É útil comparar a intenção de três arquivos de nível raiz sem tratá-los como equivalentes:

- `robots.txt`: instruções sobre preferências de acesso do crawler
- `sitemap.xml`: um mapa de URLs e arquivos do site
- `llms.txt`: um guia selecionado de conteúdo importante para sistemas de IA

## Exemplo de arquivo llms.txt

![Um editor Markdown mostrando um exemplo llms.txt para SourceShelf com links para Começar, Pacotes de IA e Acesso MCP.](/assets/blog/pt-BR/llms-txt-markdown-example.webp)

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

Markdown é legível sem um visualizador especial. Uma pessoa pode editar e revisar o arquivo em um editor de texto, uma equipe pode mantê-lo no controle de versão e o software pode interpretar seus títulos e links sem remover primeiro a interface de uma página da web.

## Por que llms.txt existe

Uma página da web normal pode incluir navegação, menus, scripts, links relacionados, anúncios, estilo e controles interativos. A explicação ou documentação autoritária pode ser apenas uma parte dessa página.

A proposta llms.txt oferece um ponto de entrada selecionado. Não substitui as páginas vinculadas; ela informa ao leitor sobre o que a coleção é sobre e onde procurar a seguir.

Pense em um catálogo de biblioteca. O catálogo não é toda a biblioteca. Ele ajuda você a encontrar os livros certos.

## Benefícios do llms.txt

{{benefit-cards}}

Esses benefícios dependem de uma ferramenta que escolha ler e usar o arquivo. A publicação de `llms.txt` não causa por si só que um serviço de IA descubra, recupere ou priorize um site.

## O que llms.txt não faz

`llms.txt` não permite:

- Forçar sistemas de IA a ler um site
- Garantir inclusão em respostas geradas por IA
- Garantir melhorias na pesquisa ou na classificação por IA
- Substituir o SEO normal ou uma estrutura de site acessível
- Substituir `robots.txt`, um mapa do site ou bons links internos
- Impedir a coleta automatizada ou conceder permissão de acesso
- Criar automaticamente uma base de conhecimento para IA

É uma dica útil e uma referência estruturada, não um sistema de permissões. Os proprietários de sites ainda precisam de controles de acesso apropriados, licenciamento, políticas de rastreadores e decisões de privacidade.

## llms.txt versus robots.txt

![Três colunas comparam robots.txt para preferências de crawler, sitemap.xml para URLs de sites e llms.txt para contexto curado legível por IA.](/assets/blog/pt-BR/llms-txt-file-comparison.webp)

| Arquivo | Objetivo |
|---|---|
| `robots.txt` | Comunica preferências de acesso do crawler |
| `sitemap.xml` | Lista URLs e arquivos do site |
| `llms.txt` | Fornece contexto curado legível por IA |

Esses arquivos resolvem diferentes problemas. O Google descreve o [`robots.txt`](https://developers.google.com/search/docs/crawling-indexing/robots/intro) como uma maneira de dizer aos rastreadores de mecanismos de busca quais URLs eles podem acessar, principalmente para gerenciar o tráfego dos rastreadores. Ele descreve o [Mapa do site](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) como um arquivo que identifica páginas e arquivos que um site considera importantes.

A proposta llms.txt não é um mecanismo de controle de acesso nem um inventário completo de URL. É uma camada editorial: um proprietário de site escolhe um subconjunto útil de material e o explica em Markdown conciso.

## Criar llms.txt manualmente

Um fluxo de trabalho básico é simples:

1. Identifique as páginas que melhor explicam o site.
2. Crie um arquivo Markdown com um título H1 claro e um resumo curto.
3. Agrupe links importantes sob títulos descritivos H2.
4. Adicione notas de uma frase onde o propósito de um link não é óbvio.
5. Coloque o arquivo na raiz do site.

```text
https://website.com/llms.txt
```

Mantenha a lista seletiva. Um guia breve para o conteúdo de referência costuma ser mais útil do que um segundo mapa do site com todas as URLs. Revise o arquivo quando a documentação mudar de lugar, as políticas forem alteradas ou páginas importantes forem adicionadas.

## Como o SourceShelf usa o llms.txt

SourceShelf trata `llms.txt` como uma ponte útil entre sites e fluxos de trabalho de conhecimento local de IA.

Muitos sites já contêm documentação valiosa, pesquisas, políticas, informações sobre produtos e guias técnicos. Uma coleção local de llms.txt pode identificar esse material de forma ordenada e legível por humanos. O SourceShelf pode importar a coleção local para sua Biblioteca e criar um pacote salvo que permanece em seu Mac.

Este fluxo de trabalho está deliberadamente offline. O SourceShelf não rastreia um site ou recupera URLs remotos arbitrários de um índice importado.

### Importando llms.txt com SourceShelf

Uma importação típica funciona assim:

1. Escolha um arquivo `llms.txt` ou uma pasta contendo um.
2. SourceShelf lê o índice local.
3. As referências seguras de `.md`, `.markdown` e `.txt` abaixo da pasta selecionada são resolvidas e importadas localmente.
4. O índice se torna o primeiro item da Biblioteca e os documentos locais seguem na ordem do índice.
5. SourceShelf cria um pacote salvo com o nome do título do índice.

Links HTTP ou HTTPS remotos não são baixados. O SourceShelf mantém seus títulos, descrições e proveniência como referências indisponíveis para que você possa ver o que o índice nomeou sem transferir silenciosamente o conteúdo do site.

![A visualização de conversão SourceShelf com a ação Importar llms.txt disponível para selecionar uma coleção local.](/assets/blog/pt-BR/llms-import-source.webp)

![Um pacote salvo do SourceShelf mostrando os documentos ordenados e os controles do pacote depois que o conhecimento foi organizado localmente.](/assets/blog/pt-BR/llms-pack-created.webp)

### Exportar coleções llms.txt com o SourceShelf

O SourceShelf também pode criar uma **pasta de coleção llms.txt** a partir de um pacote salvo:

```text
my-research-pack/
├── llms.txt
├── documents/
├── assets/
├── sourceshelf-manifest.json
└── checksums.sha256
```

A pasta contém documentos ordenados, ativos arquivados referenciados, um manifesto SourceShelf com proveniência e somas de verificação determinísticas para verificações de integridade. Referências da web indisponíveis com proveniência válida podem aparecer na seção opcional do índice, mas o SourceShelf não as baixa.

![Opções de exportação SourceShelf, incluindo Pasta de Coleção llms.txt, ZIP AI Reference Pack e ZIP do Pacote OKF.](/assets/blog/pt-BR/llms-export.webp)

Este é um formato de coleção portátil, não uma promessa de que todos os produtos de IA o importarão diretamente. Você pode manter a pasta como conhecimento local legível, adaptá-la para outro fluxo de trabalho ou exportar o mesmo pacote salvo em um formato diferente.

### De um fluxo de trabalho llms.txt para um SourceShelf

![Um fluxo de trabalho muda de um site e llms.txt para SourceShelf, depois para um pacote de conhecimento e ferramentas de IA selecionadas.](/assets/blog/pt-BR/sourceshelf-llms-workflow.webp)

Depois que uma coleção se torna um pacote salvo, você pode exportar um [AI Reference Pack](/local-ai-reference-packs/) ou usar Local AI Access para compartilhar um instantâneo imutável e somente para leitura com um cliente compatível. Apenas o pacote selecionado fica exposto; o SourceShelf não compartilha o restante da Biblioteca.

![Local AI Access no SourceShelf mostrando o instantâneo atual e somente para leitura de um pacote salvo selecionado.](/assets/blog/pt-BR/llms-ai-access.webp)

Se você está começando com uma combinação mais ampla de documentos e páginas da web em vez de um índice existente, o [fluxo de trabalho para uma base de conhecimento privada de IA](/private-ai-knowledge-base-mac/) explica como capturar, organizar e compartilhar fontes locais de forma seletiva.

## Relacionamento com OKF

![Três etapas mostram llms.txt para descoberta, SourceShelf para organização e OKF para preservação.](/assets/blog/pt-BR/llms-txt-okf-relationship.webp)

`llms.txt` e Open Knowledge Format resolvem problemas diferentes.

- **llms.txt:** ajuda uma ferramenta a descobrir e navegar em conhecimento curado de sites
- **OKF:** encapsula o conhecimento estruturado em uma coleção portátil de conceitos e metadados Markdown
- **SourceShelf:** pode organizar fontes locais entre essas duas etapas e exportá-las para um fluxo de trabalho escolhido

O [guia sobre Open Knowledge Format](what-is-open-knowledge-format-okf.md) explica o empacotamento com mais detalhes. Nenhum dos formatos amplia a janela de contexto de um modelo nem garante que uma ferramenta usará todas as fontes.

## Criar conhecimento que a IA realmente pode usar

Os sistemas de IA precisam de contexto. Esse contexto é mais útil quando é estruturado, portátil, compreensível e mantido pelas pessoas que o criaram.

`llms.txt` é um pequeno passo em direção a tornar o conhecimento online mais fácil para sistemas e agentes de IA descobrirem. Seu valor vem da curadoria cuidadosa, resumos precisos, links estáveis e ferramentas que decidem apoiar a convenção.

SourceShelf amplia essa ideia, ajudando você a capturar, organizar e empacotar conhecimento localmente, para que suas informações permaneçam úteis em todas as ferramentas de IA que você escolher.

## Fontes oficiais

- [A proposta e o formato llms.txt](https://llmstxt.org/)
- [Repositório de especificações Answer.AI llms.txt](https://github.com/AnswerDotAI/llms-txt)
- [Google Search Central: Introdução ao robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Search Central: Saiba mais sobre mapas do site](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
