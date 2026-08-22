# llms.txt v2: uma maneira melhor para a IA descobrir o conhecimento de um site

O conhecimento de sites legível por IA está se tornando mais fácil de descobrir.

A proposta `llms.txt` chegou à versão 2. A atualização ajuda assistentes e agentes de IA a encontrar conteúdo útil e legível por máquina em sites. Se o formato é novo para você, comece com nossa [introdução ao llms.txt](what-is-llms-txt.md).

A proposta original introduziu uma ideia simples: dar a um site um pequeno índice Markdown que explique o que o site contém e indique os sistemas de IA para seus recursos mais úteis.

A versão 2 mantém essa simplicidade, mas aborda um dos maiores problemas práticos com a proposta original:

**Como um agente de IA sabe que um arquivo `llms.txt`—ou uma versão limpa de Markdown de uma página—existe mesmo?**

A resposta é uma melhor descoberta.

E o SourceShelf 1.0.2 já suporta o novo fluxo de trabalho `llms.txt` v2, tornando possível descobrir, visualizar, selecionar, importar, organizar e preservar o conhecimento do site amigável para IA diretamente do Safari.

## Por que o llms.txt precisava de uma versão 2

Quando `llms.txt` foi proposto pela primeira vez em 2024, os agentes de IA que leiam sites regularmente ainda eram amplamente uma expectativa sobre para onde a web estava indo.

Isso mudou rapidamente.

Os assistentes de codificação de IA agora consultam a documentação enquanto trabalham. Os assistentes habilitados para pesquisa recuperam páginas da web para responder perguntas. Os agentes precisam cada vez mais localizar informações específicas dentro de sites em vez de simplesmente exibir esses sites para uma pessoa.

O [Registro oficial de alterações do llms.txt v2](https://llmstxt.org/changes.html) observa que milhares de sites agora publicam um arquivo `llms.txt`, plataformas de documentação os geram automaticamente e principais provedores de IA os publicam para a documentação de seus próprios desenvolvedores.

A versão 2 reflete o que foi aprendido com essa adoção.

Não reinventa o formato básico nem faz com que a versão 1 pare de funcionar. Em vez disso, torna o `llms.txt` mais fácil de descobrir e esclarece como os agentes devem usá-lo.

## 1. Sites podem anunciar explicitamente seu llms.txt

A adição mais importante na v2 é a descoberta.

Anteriormente, uma ferramenta que queria encontrar um arquivo `llms.txt` muitas vezes tinha que tentar uma localização previsível, como:

```text
/llms.txt
```

Esse URL convencional permanece útil, mas tentar um local conhecido não é o mesmo que o site declarar explicitamente uma relação.

A versão 2 recomenda o uso da relação HTML padrão:

```html
<link rel="describedby" href="/llms.txt">
```

Um site pode usar isso para dizer ao software compatível:

**Este é o arquivo llms.txt que descreve esta página.**

A mesma informação pode ser fornecida através de um cabeçalho HTTP `Link`, o que significa que sites, sistemas de documentação, CDNs e outras infraestruturas podem expor a relação sem modificar a página visível.

Em vez de exigir uma ferramenta de IA para investigar um site em busca de arquivos especiais, o site pode declarar diretamente seu conhecimento legível por IA.

## 2. As páginas podem anunciar uma versão limpa do Markdown

`llms.txt` é útil como índice, mas as informações detalhadas geralmente estão nas páginas que ele referencia.

O problema é que as páginas da web normais contêm muito mais do que seu conteúdo primário.

Navegação, menus, scripts, estilo, controle de cookies, publicidade, componentes interativos e outros elementos de interface fazem todo o sentido em um navegador. Eles não são necessariamente a melhor representação para um sistema de IA tentando entender as informações subjacentes.

A versão 2, portanto, formaliza outra relação de descoberta:

```html
<link
  rel="alternate"
  type="text/markdown"
  href="/docs/example.md">
```

Isso informa ao software compatível que a página tem uma representação Markdown disponível.

Um agente de IA pode, portanto, encontrar uma página da web normal, ao mesmo tempo em que descobre uma representação mais limpa e concisa da mesma informação.

Isso pode significar menos extração, menos material irrelevante e menos tokens gastos reconstruindo conteúdo que o editor já disponibilizou em uma forma amigável para máquinas.

![Um diagrama lado a lado contrasta tentar a localização convencional /llms.txt com uma página que declara explicitamente seu índice descrito e representação alternativa de Markdown.](/assets/blog/pt-BR/llms-txt-v2-discovery.svg)

## 3. Os URLs Markdown são mais flexíveis

A proposta original sugeriu a produção de versões Markdown de páginas anexando `.md` ao URL existente.

Por exemplo:

```text
guide.html
guide.html.md
```

Na prática, alguns sistemas de publicação substituem em vez disso a extensão original:

```text
guide.html
guide.md
```

A versão 2 reconhece ambas as abordagens.

Isso pode parecer uma pequena mudança de compatibilidade, mas reflete um princípio importante por trás da proposta atualizada: `llms.txt` está se adaptando a convenções que desenvolvedores e sistemas de publicação já usam, em vez de forçar todos os sites a uma única estrutura de URL.

## 4. llms.txt pode descrever parte de um site

Outra clareza particularmente útil é **espaço de caminho**.

Um arquivo `llms.txt` não precisa descrever um domínio inteiro. Por exemplo:

```text
/llms.txt
/docs/llms.txt
/api/llms.txt
```

Pode descrever diferentes partes do mesmo site.

Um arquivo `llms.txt` se aplica às páginas abaixo do seu próprio caminho, e quando mais de um índice poderia se aplicar, o mais específico tem precedência.

Isso significa:

```text
/docs/llms.txt
```

Pode descrever a seção de documentação sem precisar representar o resto do site.

Isso é útil para grandes organizações, plataformas de documentação, projetos hospedados, universidades, produtos de software e qualquer site onde diferentes áreas contenham coleções distintas de conhecimento.

Isso também torna a descoberta mais precisa. Um agente de IA lendo a documentação da API não precisa necessariamente das páginas de marketing, notícias da empresa, seção de carreiras e tudo o mais publicado no mesmo domínio.

Um `llms.txt` com escopo pode guiá-lo para o conhecimento que é realmente relevante.

![Uma árvore de sites mostra uma raiz llms.txt para o site mais amplo, além de arquivos llms.txt mais específicos dentro dos documentos e caminhos da API.](/assets/blog/pt-BR/llms-txt-v2-path-scoping.svg)

## 5. Espera-se que os agentes recuperem o que precisam

A versão 2 também esclarece uma importante ideia errada sobre `llms.txt`.

O objetivo não é necessariamente concatenar um site inteiro e alimentá-lo em um modelo de IA.

Em vez disso, o arquivo `llms.txt` atua como um mapa.

Um agente pode ler ou pesquisar o índice relativamente pequeno, determinar quais recursos são relevantes para a tarefa atual e, em seguida, recuperar esses recursos conforme necessário.

Concepcionalmente, o fluxo de trabalho se torna:

```text
Question
   ↓
llms.txt
   ↓
Find relevant sources
   ↓
Retrieve only those sources
   ↓
Use them as context
```

Este é um modelo muito mais escalável do que tratar todos os documentos disponíveis como contexto para todas as perguntas.

Também se assemelha à maneira como uma boa pesquisa funciona: comece com uma coleção organizada, identifique as fontes relevantes e, em seguida, examine essas fontes em detalhes.

## 6. "Opcional" é uma convenção, não uma regra de processamento

Versões anteriores da proposta atribuíram à seção `## Opcional` um papel especial ao expandir uma coleção `llms.txt` para o contexto do modelo.

A versão 2 remove esse significado mecânico.

Uma seção opcional ainda pode identificar material secundário que um agente pode ignorar quando uma coleção menor é preferível, mas não se espera mais que os agentes o tratem como uma instrução especial de processamento.

Isso torna o formato mais simples.

O índice descreve e organiza o conhecimento. O agente decide qual conhecimento é relevante para a tarefa.

## llms.txt faz parte de uma web mais ampla legível por IA

Essas mudanças estão chegando à medida que a web começa a se adaptar mais deliberadamente aos agentes de IA.

O trabalho experimental de Navegação Agencial do Chrome no Lighthouse, por exemplo, agora inclui [Uma auditoria de descoberta do llms.txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt).

Isso não torna o `llms.txt` um padrão da web universal, nem a publicação de um garante que todos os sistemas de IA o usarão.

Isso mostra que o conteúdo legível por IA está indo além de um experimento interessante.

Os criadores de sites estão cada vez mais considerando não apenas como as informações aparecem para as pessoas e os motores de busca, mas também como os agentes de software podem descobri-las e compreendê-las de forma confiável.

`llms.txt` oferece uma abordagem deliberadamente simples para esse problema.

## SourceShelf 1.0.2 suporta llms.txt v2

SourceShelf trata `llms.txt` como mais do que um arquivo para visualizar.

A versão 1.0.2 expande o fluxo de trabalho para Safari, permitindo que a coleção `llms.txt` de um site compatível se torne o ponto de partida para um Pacote de pesquisa local. O [Guia SourceShelf llms.txt](/docs/guides/llms-txt/) documenta a ordem completa de descoberta, o fluxo de trabalho de seleção, as salvaguardas e a proveniência que o aplicativo preserva.

Quando o SourceShelf descobre uma coleção disponível, você pode visualizar o que o site oferece, escolher as fontes que realmente deseja e importar essa seleção para o SourceShelf.

![O Safari exibe um site de pesquisa sintético, enquanto a extensão real SourceShelf apresenta uma prévia de uma coleção llms.txt descoberta para importação.](/assets/blog/pt-BR/llms-txt-v2-safari-discovery.webp)

Esta é uma distinção importante.

Um site pode expor dezenas - ou eventualmente centenas - de recursos através de `llms.txt`. Seu projeto de pesquisa pode precisar apenas de cinco.

SourceShelf permite que o índice do site ajude na descoberta sem exigir que toda a coleção faça parte do seu contexto de trabalho.

![A revisão da coleção SourceShelf usa a interface de extensão de envio com doze recursos realistas e apenas seis selecionados para importação.](/assets/blog/pt-BR/llms-txt-v2-source-selection.webp)

## Da coleção do site à pesquisa local Pack

Um fluxo de trabalho típico pode parecer assim:

1. Visite um site em Safari.
2. Abra a extensão SourceShelf.
3. Descubra a coleção `llms.txt` disponível no site.
4. Pré-visualize os recursos que ele expõe.
5. Selecione as fontes relevantes para sua pesquisa.
6. Importe-os em um novo ou existente Pacote SourceShelf.
7. Revise e organize a coleção resultante localmente.
8. Exporte ou compartilhe o Pacote usando o formato apropriado para o seu fluxo de trabalho de IA.

Uma vez importadas, essas fontes não são mais apenas uma coleção de guias do navegador.

Eles se tornam parte de um projeto de pesquisa organizado que pode preservar a ordem de origem, metadados, proveniência, ativos arquivados e outras informações necessárias para mover a pesquisa entre fluxos de trabalho.

![A interface de três colunas do SourceShelf real mostra um pacote de pesquisa sintético finalizado com recursos do llms.txt, outros documentos e origem de importação do site.](/assets/blog/pt-BR/llms-txt-v2-sourceshelf-pack.webp)

## llms.txt e pesquisa local-first

Há uma diferença importante entre **descobrir** informações e **possuir sua coleção de pesquisa**.

`llms.txt` ajuda com o primeiro problema.

Isso dá aos editores uma maneira de descrever conhecimento útil e ajuda o software compatível a encontrá-lo.

SourceShelf aborda o segundo.

Isso permite que você escolha quais fontes são importantes, as preserve como um Pacote de Pesquisa, as combine com seus próprios PDFs, documentos, notas, cópias digitalizadas e outros materiais, e depois decida como essa coleção deve ser usada.

O site continua sendo o editor.

O arquivo `llms.txt` permanece como o guia.

Seu Pacote SourceShelf se torna sua coleção de pesquisa.

## Uma coleção, múltiplos fluxos de trabalho de IA

Uma importação de `llms.txt` não precisa permanecer uma coleção `llms.txt` para sempre.

Assim que o conhecimento relevante for organizado no SourceShelf, o mesmo Pacote pode participar de diferentes fluxos de trabalho.

Você pode preservá-lo como um arquivo de pesquisa portátil, exportar o Markdown para outra aplicação, criar um [Pacote de referência orientado para IA](/local-ai-reference-packs/) ou expor um Pacote selecionado a um cliente de IA compatível através da integração local, somente leitura do MCP do SourceShelf.

Essa separação entre **coletar conhecimento** e **escolher uma ferramenta de IA** é intencional.

Pesquisas úteis não devem se tornar permanentemente ligadas a qualquer produto de IA que acidentalmente tenha ajudado a coletá-las.

Markdown, proveniência, pacotes portáteis e interfaces abertas fornecem uma maneira de manter a pesquisa útil mesmo à medida que as ferramentas de IA mudam.

## O que o llms.txt v2 não faz

É igualmente importante entender o que a proposta não afirma resolver.

`llms.txt` não é uma substituição para `robots.txt`.

Não é uma substituição para um mapa do site.

Isso não garante que um provedor de IA indexará um site.

Isso não concede permissão a um sistema de IA para acessar conteúdo de outra forma restrito.

E isso não torna automaticamente as informações confiáveis simplesmente porque são escritas em Markdown.

Seu propósito é muito mais restrito:

**ajude um sistema de IA a descobrir e navegar por conhecimento útil de sites de forma mais deliberada.**

Essa simplicidade faz parte do que torna o formato interessante.

## Uma pequena mudança com uma implicação maior

A parte mais significativa do `llms.txt` v2 pode não ser nenhuma mudança individual de sintaxe.

É a mudança na suposição por trás da proposta.

Em 2024, a questão era se os sistemas de IA poderiam precisar regularmente de sites apresentados em uma forma mais utilizável.

Em 2026, agentes lendo documentação, pesquisando sites, escrevendo software, coletando pesquisas e respondendo perguntas de fontes online já são normais.

A questão está se tornando cada vez mais:

**Como os sites devem tornar seu conhecimento descoberto para eles?**

A versão 2 fornece uma resposta melhor do que a versão 1.

Um pequeno índice Markdown pode descrever o conhecimento importante.

As relações padrão da web podem tornar esse índice descoberto.

O Clean Markdown pode fornecer versões amigáveis para agentes de páginas individuais.

O escopo do caminho pode manter grandes sites organizados.

E os agentes podem recuperar apenas as informações relevantes para a tarefa em questão.

Com o SourceShelf 1.0.2, essa mesma estrutura também pode se tornar o início de um fluxo de trabalho de pesquisa privado e portátil - começando na web e continuando em seus próprios dispositivos.

A web legível por IA ainda está evoluindo.

Mas com `llms.txt` v2, está ficando muito mais fácil de encontrar.
