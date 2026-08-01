# Importar e exportar llms.txt

Da SourceShelf `llms.txt` o suporte é experimental e deliberadamente offline. Ele pode importar um índice local e gerar uma pasta de coleção portátil, mas nunca recupera links da internet.

## Importar uma coleção

escolher **Arquivo > Importar llms.txt...** Ou use a ação em **converter**. Selecione qualquer um dos seguintes:

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
