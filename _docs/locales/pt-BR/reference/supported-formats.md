# Formatos compatíveis

O SourceShelf detecta os formatos pela extensão do arquivo e pelo tipo de conteúdo do macOS.

## Entradas locais compatíveis

| Formato | Extensões | Comportamento principal |
| --- | --- | --- |
| PDF | `.pdf` | Extrai o texto e a estrutura das páginas e usa OCR local para páginas digitalizadas. |
| Texto sem formatação | `.txt`, `.text` e tipos de texto simples compatíveis | Preserva o texto legível. |
| Markdown | `.md`, `.markdown` e tipos compatíveis | Preserva o Markdown como conteúdo-fonte de referência. |
| HTML | `.html`, `.htm` | Extrai a estrutura HTML local sem carregar recursos remotos. |
| Texto formatado | `.rtf` | Extrai o texto com estilo para uma estrutura compatível com Markdown. |
| Imagens | `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.heic`, `.heif` | Usa OCR local. |
| Microsoft Word | `.docx` | Extrai títulos, parágrafos, listas e tabelas compatíveis, além das imagens com suporte. |
| Microsoft PowerPoint | `.pptx` | Extrai limites de slides, títulos, listas, texto e tabelas. |
| Microsoft Excel | `.xlsx` | Extrai limites de planilhas e tabelas. |

A extensão do Safari também captura páginas da web e seleções. A importação local de `llms.txt` aceita um índice acompanhado de links relativos para arquivos `.md`, `.markdown` e `.txt`.

## Formatos sem suporte direto

Os arquivos antigos do Office `.doc`, `.ppt` e `.xls` são detectados, mas não são convertidos. Primeiro, salve-os como `.docx`, `.pptx` ou `.xlsx`.

As limitações atuais incluem avaliação avançada de fórmulas de planilhas, animações, mídias e anotações do apresentador do PowerPoint, novas mídias incorporadas do Office, notas de rodapé e controle de alterações do Word, precisão do OCR e preservação de layouts digitalizados complexos.

## Formatos de saída

Todas as conversões criam Markdown. Os pacotes podem gerar um ZIP de pacote de referência para IA, um pacote OKF v0.2, um pacote de contexto Markdown, uma pasta de coleção `llms.txt` ou Markdown copiado para a área de transferência.
