# Privacidade e segurança

O SourceShelf é local por padrão. Conversão de arquivos, OCR, processamento de captura de web, análise semântica, pré-visualizações, agrupamento de recuperação, Confiança e Segurança, soma de verificação, exportação, `llms.txt` Importação, comparação de pacotes de vida e MCP Pesquisar/ler operar neste Mac.

## Garantia sem rede

A SourceShelf não recupera conteúdo remoto durante:

- Conversão de arquivo ou visualização prévia;
- `llms.txt` Importação ou geração;
- Atualizar e comparar;
- MCP Lista de recursos, pesquisa ou leitura;
- Geração de pacote.

Uma captura do Safari recebe conteúdo da página que você já está visualizando através da extensão habilitada. controle remoto URLEncontrado localmente `llms.txt` São mantidos como referências indisponíveis em vez de recuperadas.

## Quais lojas SourceShelf armazenam

Dependendo das funcionalidades que você usa, o armazenamento local inclui:

- Markdown convertido na pasta de saída;
- Histórico da biblioteca e pacotes salvos;
- Metadados preliminares encomendados;
- Caches de documentos semânticos;
- Imagens da web arquivadas;
- Capturar receitas e rascunhos de revisão em fila;
- Base de dados de exportação bem-sucedida;
- Explicitamente autorizado MCP Capturas de tela.

Os instantâneos de rascunho e as linhas de base armazenam identificadores, ordem, datas e hashes - não cópias de conteúdo arbitrário do Markdown. MCP As instantâneas copiam intencionalmente apenas o Markdown legível e os ativos referenciados de um pacote compartilhado, para que o auxiliar em sandbox não precise de amplo acesso a arquivos.

Os registros da biblioteca são mantidos até que você os remova. **Configurações > Geral > Revisar Armazenamento...** Separa a limpeza segura e regenerável da exclusão dos dados de origem gerados. A saída gerada visível pelo usuário é movida para a Lixeira, as fontes com estrelas e salvadas são protegidas por padrão e os documentos importados originais nunca são selecionados ou excluídos. ver [Gerenciar o armazenamento do SourceShelf](../guides/storage-management.md) Para o fluxo de trabalho de limpeza.

## Privacidade do caminho local

O aplicativo mostra caminhos locais em seu próprio inspetor para que você possa abrir ou revelar arquivos. Os caminhos de origem de arquivos são excluídos da proveniência exportada, conceitos OKF, manifestos, `llms.txt` Saída, e MCP Capturas de tela. A documentação de captura de tela também deve recortar ou mascarar esses detalhes exclusivos localizados.

## Classificação de confiança

Texto capturado e convertido está marcado `untrusted_reference`. Os avisos de Confiança e Segurança são apenas orientativos e nunca afirmam que o material foi higienizado. Revise o texto original antes de seguir quaisquer instruções contidas nele.

## MCP Límites

MCP Compartilhar é:

- Desativado por padrão;
- Autorizado por pacote salvo;
- Servido por um auxiliar local stdio assinado sem ouvinte de rede;
- Apenas leitura;
- Restrito por uma lista de permissões e SHA-256 Verificação;
- Imediatamente revogável.

As duas ferramentas pesquisam a instantânea e leem um recurso listado como permitido. Não há ferramenta de caminho de sistema de arquivos, navegador de arquivos geral, ação de escrita, pesquisa remota, prompt ou assinatura.

## Compartilhe IDs e configurações

Uma ID de compartilhamento autoriza uma instantânea local. Mantenha-a fora de repositórios públicos e capturas de tela de documentação. Se o SourceShelf for movido, reinstalado ou atualizado, copie novamente o caminho auxiliar. Revogue o acesso do SourceShelf em vez de depender apenas da remoção de uma configuração do cliente.

Para consultar a declaração de privacidade do produto, acesse a [Política de Privacidade do SourceShelf](/pt-BR/privacy.html).
