# Referência de ajustes

aberto **SourceShelf > Configurações**. A janela é redimensionável e está organizada em cinco guias.

## Idioma

O SourceShelf oferece suporte a inglês, francês, espanhol latino-americano, português do Brasil e japonês. Ele usa o idioma escolhido para o SourceShelf em **Ajustes do Sistema > Geral > Idioma e Região > Aplicativos**. Caso nenhum seja escolhido, segue a ordem de idiomas preferidos do macOS. A extensão do Safari segue o idioma da interface do Safari.

Alterar o idioma da interface não traduz os documentos de origem, os nomes personalizados de receitas ou pacotes, o texto exportado, os identificadores MCP, os nomes de arquivo nem os campos de manifesto.

## geral

Escolha a pasta de saída usada para novos Markdown convertidos e capturados. O SourceShelf armazena uma marca de página autorizada localmente para que ele possa retornar para essa pasta. Alterá-la afeta a saída futura; não move arquivos existentes.

**Revisar Armazenamento...** inventários gerados Markdown, ativos de saída projetados, cópias gerenciadas da Biblioteca, caches semânticos, locais MCP Capturas de tela e captura de rascunhos/estágio. A Limpeza Segura remove apenas dados internos órfãos ou regeneráveis. A limpeza de fontes geradas é um fluxo de trabalho de seleção e confirmação separado que move os arquivos de saída para a Lixeira; as fontes marcadas com estrelas e salvas são protegidas por padrão e os documentos importados originais nunca são alvos de exclusão. ver [Gerenciar o armazenamento do SourceShelf](../guides/storage-management.md) Para o fluxo de trabalho completo.

## captura

As configurações de captura incluem:

- Status da extensão do Safari e um atalho para as configurações da extensão do Safari;
- Organização por domínio e data;
- Comportamento arquivado da imagem da web;
- A idade de estagnação da captura global da web;
- Capturar a criação, duplicação, exclusão, ordenação, modelos, YAML, comportamento e regras de domínio da receita;
- A ação do teclado de captura rápida do Safari e sua receita preferida.

As alterações de receita são salvas localmente e publicadas na extensão SourceShelf Safari.

## exportação

Escolha o formato inicialmente selecionado no selecionador de exportação de pacotes. A configuração e o selecionador compartilham uma preferência; confirmar uma escolha diferente a atualiza, enquanto cancelar não.

**Inclua blocos de recuperação nos ZIPs do AI Reference Pack** Adiciona modelo neutro `chunks.jsonl`. Ele está configurado por padrão e nunca adiciona incorporações.

## Integrações

**Ativar local MCP Compartilhando** Está desativado por padrão. Quando ativado, pacotes salvos individuais podem ser autorizados a partir de **Pacotes > Mais > Acesso Local à IA...**.

Esta guia mostra o número de compartilhamento ativo e fornece **Pacotes abertos** e **Revogar tudo**. Desativar o compartilhamento ou revogar tudo remove instantâneos e invalida imediatamente as configurações de cliente copiadas.

ver [Acesso local de IA](../mcp/local-ai-access.md).

## privacidade

Esta guia resume o armazenamento local, exportações, blocos de recuperação, comparação de pacotes vivos e comportamento de aconselhamento de Confiança e Segurança. **Abrir detalhes de privacidade** abre a explicação completa de privacidade no aplicativo.
