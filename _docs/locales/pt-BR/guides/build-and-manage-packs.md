# Criar e gerenciar pacotes

Um pacote é uma seleção ordenada de fontes da Biblioteca. Os pacotes salvos são as coleções duráveis da SourceShelf e a unidade usada para exportação, comparação e Acesso Local à IA.

## A área de trabalho do Packs

A coluna esquerda é um navegador de biblioteca compacto. A coluna central é o pacote ordenado. Em larguras de janela maiores, o inspetor aparece como uma terceira coluna; em larguras compactas, ele se abre em uma folha.

![Um pacote salvo construído a partir de fontes de demonstração sintéticas](../../../assets/images/pack-builder.png)

Use o cabeçalho para selecionar um pacote salvo, iniciar um novo, salvar as alterações, salvar com um nome diferente, renomear ou excluí-lo.

## Adicionar e ordenar fontes

- Selecione o controle mais ou menos ao lado de uma fonte para alterar a adesão.
- **Adicionar correspondência** Adiciona fontes legíveis que correspondem aos filtros atuais do navegador.
- **Adicionar tudo exportável** Adiciona todas as fontes da Biblioteca legíveis.
- **Adicionar desde a última exportação** Adiciona fontes criadas após a exportação mais recente bem-sucedida do pacote atual.
- Arraste as fontes para reordená-las ou use **Mover para cima** e **Mova para baixo** Para pedidos acessíveis por teclado.

Exportadores e MCP As instantâneas recebem fontes na ordem exibida.

## Rascunhos e salvamentos explícitos

As alterações de pacote são rascunhos até que você selecione **salvar** ou **Salvar Alterações**. O SourceShelf restaura o pacote ativo, a ordem e os metadados do rascunho não salvos após o reinício, mas a captura de tela do rascunho nunca contém conteúdo Markdown.

Se você trocar pacotes ou iniciar um novo pacote enquanto o rascunho atual estiver sujo, o SourceShelf oferece:

- **salvar** Para persistir nas mudanças atuais e continuar;
- **descarte** Para retornar à associação salva e continuar;
- **cancelar** Para permanecer no rascunho atual.

Uma salvação falhada deixa o rascunho sujo e cancela a troca solicitada.

## Salvar como, renomear e excluir

**Salvar como** Cria outro pacote salvo. Se o nome normalizado dele colidir com um pacote existente, o SourceShelf pergunta antes de substituir qualquer coisa.

Renomear altera o nome do pacote salvo usado para os títulos dos pacotes e os metadados da coleção de manifestos. Excluir um pacote salvo não exclui as entradas da Biblioteca ou os arquivos Markdown. Se você excluir o pacote ativo, seus conteúdos se desprendem em um rascunho sujo sem título.

## Referências ausentes

As referências salvas são mantidas quando um item da Biblioteca ou um arquivo Markdown se torna indisponível. O espaço em branco ainda pode ser reordenado ou removido. O Trust & Safety relata a referência não resolvida como um erro, permitindo a exportação quando pelo menos outra fonte for legível.

## Os pacotes se tornam "vivos" após a exportação

Um registro de exportação bem-sucedido registra uma linha de base local contendo pedido, hashes, datas e o formato de exportação. **Atualizar e comparar** Compara o estado atual da Biblioteca local com essa linha de base. Nunca revisita uma web novamente URL.

ver [Confiança e Segurança e pacotes de vida](trust-safety-and-refresh.md) Para os significados de comparação.
