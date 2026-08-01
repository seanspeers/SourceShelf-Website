# Capturar no Safari

A extensão SourceShelf Safari salva a página atual, o conteúdo principal, uma seleção, uma área de página selecionada ou uma cesta de destaques de pesquisa como Markdown local.

## Ative a extensão do Safari

1. Lançar SourceShelf.
2. aberto **Safari > Configurações > Extensões**.
3. Ative a extensão SourceShelf.

## Modos de captura

- **Use a receita padrão** Sigue o modo de conteúdo da receita selecionada.
- **Salvar a Página Inteira como Markdown** Mantém o corpo da página ampla.
- **Salvar o conteúdo principal como Markdown** Foca no artigo ou documento primário.
- **Salvar seleção como Markdown** Utiliza a seleção de texto atual do Safari.
- **Selecione Área como Markdown** Permite que você escolha uma região da página.
- **Salvar destaques como Markdown** Combina o cesto de destaques ordenado e a nota curta opcional.

As ações pop-up explícitas substituem o padrão da receita para essa captura.

## Capturar receitas

aberto **SourceShelf > Configurações > Captura** Para criar, duplicar, reorganizar ou excluir receitas. Uma receita pode definir:

- Nome do arquivo e modelos de pasta relativa;
- Campos YAML personalizados;
- Modo de conteúdo padrão;
- Comportamento de imagem e link;
- Comportamento de revisão antes de salvar;
- Uma política de estagnação;
- Ordenou regras de domínio host exato e wildcard.

Os hosts exatos são mais específicos do que os principais asteriscos, como `*.example.com`. Se várias regras forem igualmente específicas, a ordem salva delas decide a correspondência.

O incorporado **padrão** A receita reflete o comportamento de salvamento rápido e é o recurso de backup quando as configurações estão faltando, inválidas ou se referem a uma receita excluída.

## Modelos e YAML

Modelos podem usar `{title}`, `{domain}`, `{date}`, `{time}`, `{captured_at}`, `{mode}`, `{recipe}`, `{url}`, e `{note}`. SourceShelf higieniza todos os componentes da pasta, rejeita caminhos absolutos e `..`, e mantém o destino abaixo da pasta de saída autorizada.

As chaves YAML personalizadas devem ser únicas e válidas. SourceShelf protege suas chaves de proveniência, incluindo `title`, `url`, `domain`, `captured_at`, `source`, e `created_by`.

## Captura de teclado em um único passo

pol **Configurações > Captura**, escolha uma receita para o atalho de captura rápida do Safari. Em seguida, abra as configurações de atalho de teclado da extensão do Safari e atribua uma combinação de teclas ao comando de captura rápida do SourceShelf.

Quando invocado, o SourceShelf escolhe a receita usando essa ordem:

1. A regra de domínio mais específica para a página ativa;
2. A receita de atalho configurada;
3. A receita padrão de backup.

Páginas simples, conteúdo principal ou receitas de seleção compatíveis podem ser salvas imediatamente sem abrir a caixa pop-up. Uma receita que requer revisão ou um fluxo de trabalho interativo, como seleção de área ou coleta de destaque, abre a extensão em vez disso.

## Destaques da pesquisa

Selecione o texto em uma página, abra o SourceShelf e escolha **Adicionar seleção atual**. Repita para construir uma cesta ordenada. Você pode remover ou reordenar trechos e adicionar uma breve nota antes de salvá-los juntos como um `.highlights` Captura.

O cesto está limitado à guia do navegador e URL. Ele é liberado apenas depois que a transferência de mão nativa for aceita ou a navegação o torne obsoleto.

## Revise antes de salvar

Uma receita habilitada para revisão enfileira uma folha de revisão local no SourceShelf. Você pode editar o destino relativo, o nome do arquivo, o YAML personalizado, a nota e o corpo Markdown, e depois alternar entre Prévia e Fonte Markdown. A proveniência permanece apenas lida.

Os rascunhos de revisão sobrevivem ao relançamento do aplicativo. Salvar repara o Markdown editado e copia apenas as imagens estagiadas referenciadas. Cancelar remove o rascunho e seus ativos estagiados.

## Recetas de solução de problemas

Se uma nova receita não aparecer no Safari:

1. Confirme que a extensão SourceShelf está habilitada no Safari.
2. Abra o Open SourceShelf uma vez para que ele possa publicar as receitas atuais.
3. Feche e reabra a janela pop-up da extensão; normalmente não é necessário reiniciar o Safari.
4. Se o menu estiver vazio, abra **Configurações de captura** Da caixa pop-up e confirme que pelo menos uma receita padrão ou personalizada existe.
