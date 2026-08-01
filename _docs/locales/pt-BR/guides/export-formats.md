# Escolher um formato de exportação

Abra um pacote e selecione **Exportar...**. SourceShelf lembra o último formato confirmado; cancelar o selecionador não altera a preferência.

![O selecionador de exportação do SourceShelf](../../../assets/images/export-chooser.png)

## Pacote de Referência de IA ZIP

**Melhor para:** Chats de IA, modelos locais, agentes e espaços de trabalho de projetos.

O ZIP contém páginas Markdown por fonte, Markdown combinado, um manifesto com versão de esquema, imagens arquivadas referenciadas e `checksums.sha256`. quando **Incluir blocos de recuperação** Está habilitado, também contém `chunks.jsonl`.

Os blocos de recuperação são conscientes da estrutura e neutros em relação ao modelo:

- Um máximo de 800 tokens estimados;
- Até 120 tokens estimados de sobreposição estrutural;
- Fonte estável e IDs de bloco;
- Cabeça de ancestralidade, proveniência, hashes, referências de ativos e classificação de referência não confiável;
- Cabeçalhos de tabela repetidos quando uma tabela deve ser dividida;
- `token_count_method: "estimated_chars_div_4"`.

Nenhuma incorporação é gerada ou incluída.

## OKF v0.2 Pacote ZIP

**Melhor para:** Catálogos de conhecimento e agentes baseados em padrões.

A raiz `index.md` Contém canônico OKF v0.2 Metainformações da versão. Os conceitos carregam tipo, título, proveniência, metadados SourceShelf e valores gerados por/gerados em. A proveniência web absoluta HTTP(S) válida pode aparecer como `resource` e `sources`; os caminhos de arquivos locais nunca são exportados.

O manifesto do SourceShelf inclui hashes, datas de modificação, extensões de confiança, ativos e ordem de origem. Campos de ciclo de vida de confiança Canonical OKF, como `verified`, `status`, e `stale_after` Permanecem omitidos porque o SourceShelf não fornece afirmações de ciclo de vida controladas pelo usuário.

## Pacote de contexto Markdown

**Melhor para:** Contexto de arquivo único portátil.

Isso cria um arquivo Markdown contendo as fontes legíveis do pacote em ordem. É fácil inspecionar, editar, anexar ou colar em um sistema que não entende pacotes ZIP.

## llms.txt Pastinha de Coleção

**Melhor para:** Uma coleta local inspecível usando o experimental `llms.txt` Convenção.

Isso requer um pacote salvo limpo e cria um seguro contra colisões. `<pack-name>-llms` Pastinha com um índice, documentos ordenados, ativos arquivados referenciados, um manifesto SourceShelf e soma de verificação. Fontes indisponíveis com proveniência HTTP(S) válida aparecem em `## Optional` E não são recuperados.

ver [Importar e exportar llms.txt](llms-txt.md).

## Copiar Markdown combinado

**Melhor para:** Solicitação rápida, bate-papo ou transferência de documentos.

O Markdown combinado é copiado imediatamente. Como esta é uma entrega de pacote bem-sucedida, o SourceShelf registra uma linha de base de pacote vivo após a operação da área de transferência ser concluída.

## Checksums e validação

AI e ZIPs da OKF e `llms.txt` Pastas contêm um determinístico `checksums.sha256`, ordenado por caminho relativo e cobrindo todos os arquivos gerados, exceto o próprio inventário de soma de verificação. O SourceShelf valida a ordenação, identificadores, hashes, proveniência e referências de ativos antes de escrever.

CEP e `llms.txt` Os fluxos de trabalho de pastas são executados com o Trust & Safety atualizados. Os fluxos de trabalho de Markdown e área de transferência mantêm seu comportamento imediato.
