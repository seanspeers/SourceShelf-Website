# Biblioteca e inspetor

A Biblioteca é o navegador de origem. É deliberadamente separada dos Pacotes: o filtragem da Biblioteca nunca abre, reordena ou altera um pacote salvo. O SourceShelf mantém as entradas da Biblioteca até que você as remova explicitamente; ele não descarta automaticamente fontes mais antigas.

![Arquivos sintéticos exibidos na Biblioteca](../../../assets/images/library.png)

## Pesquisa e filtros

A pesquisa encontra correspondências com detalhes da fonte, como títulos e origens. Os filtros podem restringir a Biblioteca por:

1. Pesquisar texto;
2. Data;
3. Origem da fonte;
4. Tipo de conteúdo;
5. Status de disponibilidade;
6. Assinatura de pacote salvo.

Os filtros ativos aparecem como chips removíveis nessa ordem. Remover um chip reinicia apenas esse filtro. **Restaurar tudo** limpa todos os filtros ativos.

## Status da fonte

- Um status verde indica Markdown legível.
- Um aviso chama a atenção para um problema de fonte ou ativo arquivado.
- Uma fonte indisponível permanece na Biblioteca quando seu Markdown não pode ser lido no momento.
- Um lugar-vazio de pacote salvo permanece visível mesmo que o registro da Biblioteca esteja ausente, então ainda pode ser reordenado ou removido.

A SourceShelf omite intencionalmente uma etiqueta repetida de "Exportável" de linhas saudáveis. Selecione o item ou insira seu status quando precisar de detalhes.

## Ações de linha

Quando a janela é ampla o suficiente, as filas da Biblioteca mostram ícones de ação individuais com pop-ups. Em menos espaço, as mesmas ações são movidas para um menu. Dependendo do item, as ações incluem:

- Mostrar detalhes;
- Adicionar ou remover do pacote atual;
- Abrir Markdown;
- Revelar no Finder;
- Cópia do caminho;
- Marcar ou desmarcar como favorito;
- Remover da Biblioteca.

Remover um item da Biblioteca não exclui o Markdown gerado. As referências do pacote salvo permanecem como espaços reservados.

## inspetor

Em tamanhos de janela mais largos, o inspetor é uma terceira coluna redefinível. Perto da largura mínima da janela, ele se abre como uma folha, para que a Biblioteca ou ambas as colunas de construção de pacotes permaneçam utilizáveis.

![Prévia renderizada do Markdown para um relatório sintético](../../../assets/images/inspector-preview.png)

O inspetor mostra:

- Título completo e proveniência;
- Datas de captura e modificação;
- Caminhos de origem e saída locais;
- Disponibilidade atual e avisos;
- tokens estimados e contagem de imagens arquivadas;
- Ações de Abrir, Revelar e Copiar;
- **pré-visualização** e **Fonte Markdown** Guias.

A prévia lê no máximo 256 KiB do arquivo Markdown local. Ela remove apenas o YAML inicial antes de renderizar, mantém o espaçamento e a estrutura do bloco e não carrega imagens remotas ou outros ativos remotos. A guia de origem preserva o YAML e o texto Markdown exato. Um aviso de truncamento vincula para **Abrir Markdown** Quando o arquivo é maior.

## manutenção

O menu de manutenção da Biblioteca pode remover entradas ausentes ou limpar o histórico sem estrelas. Essas ações operam nos registros da Biblioteca, não em arquivos Markdown gerados.

Para limpeza de armazenamento, abra **Configurações > Geral > Revisar Armazenamento...**. A Limpeza Segura é limitada a dados gerenciados órfãos, caches obsoletos, estágio de captura expirado e revogado. MCP Capturas de tela. A limpeza gerada do Markdown requer a seleção das fontes afetadas e a confirmação; a saída é movida para a Lixeira, enquanto os documentos importados originais nunca são tocados. Fontes marcadas com estrelas e salvas em pacote são bloqueadas, a menos que você habilite deliberadamente a seleção de fontes protegidas. ver [Gerenciar o armazenamento do SourceShelf](storage-management.md) Para uma explicação guiada.
