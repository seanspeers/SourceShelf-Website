# Converter arquivos e pastas

O SourceShelf converte documentos locais suportados para Markdown sem carregá-los ou fazer solicitações de rede.

## Maneiras de iniciar uma conversão

- Arraste arquivos ou pastas para dentro **converter**.
- selecionar **Selecione arquivos** ou **Selecione Pasta**.
- uso **Arquivo > Abrir** Para arquivos.
- Use **Arquivo > Importar pacote de pesquisa…** para um pacote do SourceShelf, um ZIP OKF, um pacote portátil `llms.txt`, um arquivo `llms.txt` independente ou uma pasta de coleção `llms.txt`.
- Use a ação Atalhos SourceShelf para uma conversão automática de arquivos.

Ao converter uma pasta, o SourceShelf analisa os arquivos suportados dentro dela e relata os itens ignorados. A conversão de pasta não transforma a própria pasta em um pacote salvo; adicione os itens da Biblioteca resultantes a um pacote posteriormente.

A importação de um pacote portátil segue um fluxo separado de pré-visualização e validação. Antes de criar um novo pacote salvo, o SourceShelf mostra o formato detectado, a quantidade de fontes e ativos arquivados, a origem, o status de integridade e os avisos. O Markdown e os ativos arquivados são salvos dentro da pasta de saída autorizada. Arquivos grandes mostram o progresso, podem ser cancelados e são inspecionados sem bloquear a interface principal.

## O que é preservado

O SourceShelf cria um documento semântico antes de renderizar novo Markdown. Dependendo da fonte, ele pode preservar cabeçalhos, parágrafos, listas, tabelas, código, imagens, legendas, limites de slides ou páginas e conteúdo de recuperação bruto.

Para PDFs e imagens digitalizadas, o SourceShelf usa OCR local. O reconhecimento de documentos estruturados é usado quando disponível na versão do macOS instalada; sistemas mais antigos usam o caminho OCR de compatibilidade.

## Nomes de saída e colisões

Os nomes gerados são sanitizados para o sistema de arquivos. Se o destino já contém o mesmo nome, o SourceShelf escolhe um nome seguro contra colisões em vez de substituí-lo silenciosamente.

Os caminhos de arquivos de origem são mantidos para ações locais de Abrir e Revelar, mas não são colocados em manuais exportados, MCP Capturas de tela, ou proveniência gerada para conversões de arquivos.

## Cache semântico

Para itens gerenciados, os depósitos SourceShelf armazenam `semantic-document.json` no diretório gerenciado de forma privada do item. Inclui a soma de verificação de bytes Markdown exata usada para decidir se a cache ainda é válida.

Se você editar o Markdown em outro aplicativo, o SourceShelf detecta a mudança de soma de verificação e o repara quando necessário. Ele não reescreve o arquivo editado. Um cache semântico ausente ou danificado não bloqueia.

## Se uma conversão falhar

1. Confirme se a fonte ainda existe e pode ser aberta em seu aplicativo normal.
2. Confirme que a pasta de saída está disponível em **Configurações > Geral**.
3. Tente um arquivo único em vez de uma pasta inteira para isolar o formato.
4. Para uma digitalização, verifique se a página está em pé e tem contraste suficiente para OCR.
5. Verifique se o tipo de arquivo aparece em [Formatos suportados](../reference/supported-formats.md).
