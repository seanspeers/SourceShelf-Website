# Gerenciar o armazenamento do SourceShelf

O SourceShelf mantém as fontes da Biblioteca até que você decida removê-las. Não há limite baseado em idade ou de 500 fontes, então pesquisas mais antigas, fontes destacadas e membros de pacotes salvos não desaparecem silenciosamente.

uso **SourceShelf > Configurações > Geral > Revisar Armazenamento...** para ver o que o SourceShelf está usando e escolher o que, se houver, remover.

## Entenda o resumo de armazenamento

O inventário resumido inclui dados gerenciados pelo SourceShelf e gerados pelo SourceShelf, incluindo:

- Markdown gerado na pasta de saída;
- Pastas de imagens criadas ao lado do Markdown gerado;
- Gerenciou cópias da biblioteca e imagens arquivadas;
- Caches semânticos usados para pré-visualizações, agrupamento e comparação;
- Capturas de tela de acesso local à IA;
- Revisão de rascunhos de captura do Safari e dados de encenação.

O resumo não trata os documentos importados originais como armazenamento SourceShelf. Arquivos de origem, como o PDF, documento do Word ou planilha que você converteu, nunca são alvos de limpeza.

selecionar **refrescar** Depois de converter, capturar, exportar ou remover dados, se você quiser recalcular os totais enquanto a janela estiver aberta.

## Execute a limpeza segura

**Limpeza segura** Remove apenas dados internos que estão órfãos, obsoletos, vencidos ou não mais autorizados:

- Cópias gerenciadas que não pertencem mais a uma fonte da Biblioteca;
- Cache semânticos que não correspondem mais ao seu Markdown;
- Dados de teste do Safari expirados que não fazem parte de uma captura ou revisão ativa;
- Revogado MCP Capturas de tela e abandonados MCP Dados de encenação.

Não remove Markdown gerado, entradas atuais da Biblioteca, rascunhos de revisão ativos, publicados. MCP Ações, ou documentos importados originais.

O SourceShelf mostra o número estimado de arquivos e espaço recuperável antes da limpeza. selecionar **Limpar...**, revise a confirmação e continue somente quando estiver pronto.

## Remova os dados de origem gerados

o **Dados de origem gerados** A lista é para remoção deliberada de fonte por fonte. Cada linha mostra o título da fonte, o tamanho estimado e qualquer proteção aplicada a ela.

1. Selecione fontes individuais, ou escolha **Selecione Não Protegido**.
2. Revise o número de seleções e o tamanho estimado.
3. selecionar **Mova selecionado para a Lixeira...**.
4. Leia a confirmação e escolha **Mover para Lixo**.

Para cada fonte selecionada, SourceShelf:

- Mova o Markdown gerado e a pasta de imagens geradas adjacentes para a Lixeira do macOS;
- Remove sua cópia privada da Biblioteca gerenciada;
- Remove a entrada correspondente da Biblioteca.

Os arquivos importados originais nunca são selecionados ou excluídos. A saída gerada movida para a Lixeira permanece recuperável até que a Lixeira seja esvaziada, mas os dados gerenciados internamente e o registro da Biblioteca são removidos. Se você restaurar um arquivo Markdown posteriormente, importe-o novamente para criar uma nova entrada na Biblioteca.

## Fontes protegidas

Fontes destacadas e fontes referenciadas por pacotes salvos são bloqueadas por padrão. Suas linhas explicam por que elas são protegidas.

Se você quiser removê-los intencionalmente, habilite **Permita a seleção de fontes destacadas ou salvas em pacote.**, selecione as fontes e confirme a remoção. Remover uma fonte de pacote salvo não reescreve silenciosamente o pacote: deixa um espaço em branco indisponível que você pode restaurar ou remover posteriormente do pacote.

A proteção impede a seleção acidental na janela de armazenamento; não é um backup. Mantenha backups separados do material de origem importante e dos pacotes exportados.

## Remoção da biblioteca versus limpeza de armazenamento

Esses comandos servem para diferentes propósitos:

- **Remover da Biblioteca** Remove o registro da Biblioteca, mas deixa o Markdown gerado na pasta de saída.
- **Limpeza segura** Remove apenas dados internos órfãos ou regeneráveis.
- **Mova selecionado para a Lixeira...** Remove o registro da Biblioteca selecionado e sua saída gerada pelo SourceShelf juntos.

Para manutenção de rotina, comece com a Limpeza Segura. Use a remoção de fontes geradas apenas quando você não quiser mais esses resultados convertidos ou capturados no SourceShelf.

## Uma rotina de manutenção prática

Não há um horário obrigatório. Quando o uso de armazenamento se torna notável:

1. aberto **Revisar Armazenamento...** E atualize o inventário.
2. Execute a limpeza segura.
3. Organize as fontes que você não precisa mais na Biblioteca.
4. Revise os dados de origem gerados sem proteção e mova apenas os itens confirmados para a Lixeira.
5. Esvazie a Lixeira do macOS mais tarde, depois de ter certeza de que nada precisa ser restaurado.

Para mais detalhes sobre os limites de armazenamento, consulte [Privacidade e Segurança](../reference/privacy-and-security.md).
