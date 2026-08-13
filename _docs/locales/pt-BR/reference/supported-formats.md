# Formatos compatíveis

No Mac, o SourceShelf detecta formatos pela extensão do arquivo e pelo tipo de conteúdo do macOS. O iPhone e o iPad oferecem o conjunto específico de importação local descrito abaixo.

## Entradas locais suportadas

| formato | Extensões | Comportamento principal |
| --- | --- | --- |
| PDF | `.pdf` | Extrai texto e estrutura da página; usa OCR local para páginas digitalizadas. |
| texto sem formatação | `.txt`, `.text` E tipos de texto simples compatíveis | Preserva o texto legível. |
| Marcação de baixo preço | `.md`, `.markdown` E tipos compatíveis | Preserva o Markdown como conteúdo de fonte autoritária. |
| HTML | `.html`, `.htm` | Extrai a estrutura HTML local sem carregar recursos remotos. |
| Texto rico | `.rtf` | Extrai texto estilizado para uma estrutura compatível com Markdown. |
| Imagens | `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.heic`, `.heif` | Utiliza OCR local. |
| Microsoft Word | `.docx` | Extrai cabeçalhos, parágrafos, listas, tabelas e manipulação de imagens existentes suportados. |
| Microsoft PowerPoint | `.pptx` | Extrai limites de slides, títulos, listas, texto e tabelas. |
| Microsoft Excel | `.xlsx` | Extrai limites de folhas e tabelas. |

A extensão do Safari também captura páginas da web, seleções, trechos destacados e várias abas da janela atual. Ela pode descobrir e adquirir coleções `llms.txt` de sites conforme as permissões do Safari. A importação de um arquivo `llms.txt` local permanece offline e aceita um índice com links relativos para arquivos `.md`, `.markdown` e `.txt` incluídos.

## iPhone e iPad

No Safari, o SourceShelf captura páginas autorizadas e importa coleções de pesquisa `llms.txt`. Pela folha de compartilhamento, Arquivos ou **Importar Pesquisa…**, ele aceita:

- PDFs de texto, digitalizados ou mistos, com OCR local do Vision apenas quando o texto nativo é insuficiente;
- imagens decodificadas pelos frameworks da Apple, incluindo JPEG, PNG, HEIC/HEIF e TIFF;
- RTF, Markdown, texto simples e `llms.txt` independente;
- exportações ZIP do Pacote de Referência de IA, Bundle OKF v0.2 e Pacote `llms.txt` Portátil.

As importações de PDF e RTF preservam o Markdown canônico, não o documento original, seguindo a política de conversão do Mac. Uma imagem importada preserva os bytes originais nos recursos privados da fonte para continuar visível offline; eventuais metadados incorporados permanecem locais. O texto reconhecido ou convertido participa da pesquisa normal da biblioteca.

Toda conversão e OCR ocorrem no dispositivo. PDFs protegidos por senha falham de forma clara sem criar uma fonte. RTFD, documentos do Office, conversão de arquivos HTML e importação de pastas continuam indisponíveis no iPhone e iPad. A extensão de compartilhamento não se registra para o tipo genérico `public.data`; o seletor explícito do app pode reconhecer com segurança um arquivo compatível rotulado incorretamente pela assinatura ou capacidade real de decodificação.

## Não suportado diretamente

Escritório Legacy `.doc`, `.ppt`, e `.xls` Os arquivos são detectados, mas não convertidos. Salve-os como `.docx`, `.pptx`, ou `.xlsx` Primeiro.

As limitações atuais incluem avaliação avançada de fórmulas de planilhas, animações/mídias/anotações de palestrante do PowerPoint, mídia integrada do Office recém-extraída, notas de rodapé do Word e revisões rastreadas, OCR perfeito e preservação de layout digitalizado complexo.

## Formatos de saída

Todas as conversões criam Markdown. No Mac, os pacotes podem produzir ZIP do Pacote de Referência de IA, ZIP do Bundle OKF v0.2, Pacote de Contexto Markdown, ZIP do Pacote `llms.txt` Portátil, Pasta de Coleção `llms.txt` ou Markdown na área de transferência. No iPhone e iPad, podem produzir ZIP do Pacote de Referência de IA, ZIP do Bundle OKF v0.2 ou ZIP do Pacote `llms.txt` Portátil pela folha de compartilhamento do sistema.
