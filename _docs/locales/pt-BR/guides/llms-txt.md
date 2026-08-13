# Importar e exportar llms.txt

O SourceShelf aceita o formato atual de `llms.txt` v2 para importação de arquivos locais e aquisição de sites pelo Safari. A importação local continua offline. A importação da web usa somente a extensão e as permissões de sites do Safari; o app nativo permanece isolado da rede.

## Importar um site pelo Safari

Em uma página HTTP(S), abra o SourceShelf e escolha **Pesquisa > Importar via llms.txt**. O SourceShelf descobre o índice, mostra suas seções e entradas ordenadas, indica origens externas que precisam de acesso e permite selecionar recursos e um único destino. O índice `llms.txt` é salvo primeiro, seguido pelos recursos bem-sucedidos na ordem escolhida. Nenhum pacote vazio é criado.

O Safari pode mostrar uma solicitação de acesso ao site quando você abre a extensão do SourceShelf pela primeira vez. Origens adicionais listadas na coleção podem exigir uma permissão separada. O Safari continua sendo a fonte de verdade para essas permissões; se você negar o acesso, altere-o nos ajustes de extensões do Safari e abra a revisão novamente.

## Ordem de descoberta do site

O SourceShelf verifica, na ordem: um `<link rel="describedby">` HTML, um cabeçalho HTTP `Link` com `rel="describedby"`, o caminho `llms.txt` mais específico caminhando até a raiz e, por fim, `/llms.txt`. URLs relativas são resolvidas contra a página e deduplicadas. A primeira resposta válida de texto ou Markdown com H1 vence, com limites de 12 candidatos, cinco redirecionamentos, 8 MiB e 20 segundos.

## Seleção de conteúdo da web e proveniência

Para cada entrada selecionada, o SourceShelf prefere uma representação Markdown explícita `rel="alternate"`, depois tenta `page.html.md` e `page.md` e, por fim, extrai HTML. Essa lógica é exclusiva do fluxo `llms.txt`; a captura rápida não muda. Apenas entradas do índice são aceitas, sem rastrear links comuns. O histórico distingue a URL listada, a representação realmente obtida, o método de descoberta e a URL do índice, sem alegar integridade de pacote.

## Limites e cancelamento do site

A revisão é limitada a 1.000 entradas, com até três recursos simultâneos, 100 imagens por fonte e 256 MiB por operação. Esquemas perigosos, redirecionamentos, permissões, tempos, tamanhos, análise e extração são informados por recurso. Cancelar interrompe solicitações da extensão e limpa dados temporários; o trabalho já entregue ao processador local pode terminar.

## Isolamento de rede do app nativo

O app nativo não tem direito de rede de saída para este recurso e não usa `URLSession` para aquisição do Safari ou de `llms.txt` da web. A extensão faz solicitações autorizadas, escolhe Markdown e prepara imagens, depois envia transferências locais limitadas. Conversão, histórico, pacotes, autorização da pasta de saída e persistência continuam nativos.

## Importar uma coleção

Escolha **Arquivo > Importar pacote de pesquisa…** ou use a ação de **Converter**. Para uma coleção local independente, selecione uma destas opções:

- Um `llms.txt` Arquivo; ou
- Uma pasta contendo `llms.txt`.

Escolha a pasta quando o índice conter links de documentos locais. Isso dá ao SourceShelf uma raiz segura contra a qual resolvê-los.

## O que o analisador aceita

Um índice deve conter um título H1. Também pode conter:

- Um resumo opcional de citação em bloco;
- Prosa detalhada;
- Ordenou seções H2;
- Entradas de lista de links Markdown com descrições;
- Um especial `## Optional` Seção.

Uma marca opcional de ordem de byte é aceita. Entradas opcionais malformadas são relatadas como avisos.

O H1 é o único elemento obrigatório. Resumo, detalhes, seções, descrições e `## Optional` permanecem ausentes quando não fornecidos; a exportação não inventa esses campos.

## Segurança do link local

SourceShelf resolve apenas relativos `.md`, `.markdown`, e `.txt` Links contidos abaixo da raiz selecionada. Ele rejeita:

- `..` Traversal;
- Caminhos locais absolutos;
- Links simbólicos que escapam da raiz;
- sem suporte URL Esquemas.

Os links HTTP(S) tornam-se referências de biblioteca nomeadas indisponíveis. Seus títulos, descrições e proveniência permanecem visíveis, mas o SourceShelf não os recupera. Alvos repetidos são deduplicados por identidade normalizada, preservando a primeira ocorrência.

O índice importado é o primeiro item da Biblioteca legível. Os documentos locais seguem na ordem do índice. A SourceShelf cria um pacote salvo com o nome H1 e oferece comportamento de substituição, salvar como ou cancelamento para uma colisão de nome normalizado.

## Gerar uma pasta de coleção

Abra um pacote salvo limpo, escolha **Exportar... > llms.txt Pastinha de Coleção**, passe pela Confiança e Segurança e selecione uma pasta de pai. A SourceShelf cria um seguro contra colisões `<pack-name>-llms` Pastinha:

```text
<pack-name>-llms/
├── llms.txt
├── documents/
│   └── ordered-source.md
├── assets/
│   └── referenced-image.png
├── sourceshelf-manifest.json
└── checksums.sha256
```

O índice raiz contém o título do pacote, um resumo de conteúdo não confiável, ordenado `## Sources` Links, e `## Optional` Entradas para fontes indisponíveis com proveniência web válida. Os links de imagens de documentos são reescritos para arquivos copiados em `assets/`.

Apenas imagens arquivadas realmente referenciadas por Markdown legível estão incluídas. Entradas ilegíveis sem proveniência web válida são omitidas e relatadas após a geração.

SourceShelf não gera `llms-full.txt`, blocos de recuperação, incorporações ou downloads remotos para este formato.
