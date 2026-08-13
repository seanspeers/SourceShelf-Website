# Privacidade e segurança

O SourceShelf funciona localmente por padrão. Conversão de arquivos, OCR, processamento do conteúdo entregue pelo Safari, análise semântica, pré-visualizações, divisão para recuperação, verificações de confiança e segurança, somas de verificação, exportação, importação local de `llms.txt`, comparação de pacotes ativos e pesquisa/leitura por MCP acontecem no dispositivo.

## Garantia sem rede

O SourceShelf não busca conteúdo remoto durante:

- a conversão ou pré-visualização de arquivos;
- a importação e geração a partir de um arquivo `llms.txt` local ou pacote de pesquisa;
- Atualizar e comparar;
- a listagem, pesquisa ou leitura de recursos MCP;
- a geração de pacotes.

Um arquivo `llms.txt` local permanece offline: as URLs remotas nele contidas se tornam referências indisponíveis em vez de serem baixadas. A captura de sites e a aquisição do `llms.txt` de um site são fluxos explícitos e diferentes da extensão do Safari. A extensão lê ou busca conteúdo autorizado conforme o modelo de permissões do Safari e entrega dados locais limitados ao SourceShelf. O app nativo não se torna um cliente web de uso geral.

## O que o SourceShelf armazena

Dependendo dos recursos utilizados, o armazenamento local inclui:

- Markdown convertido na pasta de saída autorizada do Mac ou na biblioteca privada do iPhone e iPad;
- histórico da Biblioteca e pacotes salvos;
- metadados ordenados de rascunhos;
- caches de documentos semânticos;
- imagens da web arquivadas;
- receitas de captura e rascunhos aguardando revisão;
- linhas de base de exportações concluídas;
- instantâneos MCP autorizados explicitamente.

Os instantâneos de rascunho e as linhas de base armazenam identificadores, ordem, datas e hashes, não cópias arbitrárias de conteúdo Markdown. Os instantâneos MCP copiam intencionalmente somente o Markdown legível e os recursos referenciados de um pacote compartilhado, para que o auxiliar isolado não precise de amplo acesso aos arquivos.

Os registros da Biblioteca permanecem até que você os remova. **Ajustes > Geral > Revisar armazenamento…** separa a limpeza segura e regenerável da exclusão dos dados de origem gerados. Os arquivos gerados visíveis ao usuário são movidos para o Lixo, fontes favoritas e presentes em pacotes salvos são protegidas por padrão, e os documentos originais importados nunca são selecionados nem excluídos. Consulte [Gerenciar o armazenamento do SourceShelf](../guides/storage-management.md) para conhecer o fluxo de limpeza.

## Privacidade de caminhos locais

O app mostra caminhos locais em seu inspetor para que você possa abrir ou revelar arquivos. Os caminhos das fontes são excluídos da procedência exportada, dos conceitos OKF, manifestos, da saída `llms.txt` e dos instantâneos MCP. Capturas destinadas à documentação também devem cortar ou ocultar esses detalhes locais.

## Classificação de confiança

O texto capturado e convertido recebe a classificação `untrusted_reference`. Os avisos de confiança e segurança são apenas orientativos e nunca afirmam que o material foi sanitizado. Revise o texto original antes de seguir qualquer instrução nele contida.

## Limites do MCP no Mac

O compartilhamento por MCP é:

- desativado por padrão;
- autorizado para cada pacote salvo;
- fornecido por um auxiliar stdio local assinado, sem porta de rede em escuta;
- somente leitura;
- restrito por uma lista de permissões e verificação SHA-256;
- revogável imediatamente.

As duas ferramentas pesquisam no instantâneo e leem um recurso permitido. Não há ferramenta de caminho do sistema de arquivos, navegador de arquivos geral, ação de gravação, pesquisa remota, prompt ou assinatura.

## IDs de compartilhamento e configurações

Um ID de compartilhamento autoriza um instantâneo local. Mantenha-o fora de repositórios públicos e capturas de documentação. Se o SourceShelf for movido, reinstalado ou atualizado, copie novamente o caminho do auxiliar. Revogue o acesso pelo SourceShelf em vez de depender apenas da remoção de uma configuração do cliente.

Para ver a declaração de privacidade do produto e os detalhes de implementação, consulte a [Política de Privacidade do SourceShelf](/pt-BR/privacy.html).
