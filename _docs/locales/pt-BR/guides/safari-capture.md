# Capturar no Safari

A extensão SourceShelf Safari salva a página atual, o conteúdo principal, uma seleção, uma área de página selecionada ou uma cesta de destaques de pesquisa como Markdown local.

Ela também pode adquirir várias abas da janela atual do Safari em um único pacote de pesquisa novo ou existente. A extensão busca e prepara os dados da web; o app nativo recebe apenas capturas locais limitadas e nunca atua como cliente web de uso geral.

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

## Capturar a janela atual

Abra o SourceShelf no Safari, escolha **Pesquisa > Capturar janela atual** e revise as abas que o Safari informa para essa janela. Páginas que não usam HTTP(S), arquivos locais e páginas internas aparecem, mas não podem ser selecionados.

Selecione as abas úteis e um único destino. O SourceShelf mantém a ordem escolhida, continua após falhas individuais, não cria um pacote vazio se tudo falhar e atribui uma identidade local nova a cada item. As ações rápidas de uma página não mudam, e o lote reutiliza o mesmo fluxo de Markdown, receitas, imagens, histórico e pasta de saída.

## Acesso a sites e segurança

O Safari controla o acesso da extensão aos sites e pode mostrar a solicitação de permissão assim que você clicar no botão do SourceShelf na barra de ferramentas. O momento e o texto dessa solicitação pertencem ao Safari. Se você negar o acesso, conceda-o depois nos ajustes de extensões do Safari e abra o SourceShelf novamente.

Para operações em lote, o SourceShelf solicita ao Safari acesso apenas às origens HTTP(S) necessárias para as abas ou os recursos `llms.txt` selecionados. Ele não declara acesso permanente a todos os sites. Antes de começar, a tela de revisão distingue fontes disponíveis, fontes que precisam de acesso e fontes não compatíveis.

## Limites, cancelamento e falhas

A aquisição usa no máximo três fontes simultâneas, 8 MiB por resposta, 256 MiB por operação, 100 imagens por fonte, cinco redirecionamentos e 20 segundos por solicitação. A revisão de `llms.txt` é limitada a 1.000 entradas e a descoberta a 12 candidatos. Cancelar interrompe solicitações pendentes e limpa dados temporários; uma falha de permissão, tempo, HTTP, análise, extração ou tamanho não remove fontes bem-sucedidas.

## Grupos de abas do Safari e limites do navegador

A captura usa a API pública `tabs.query({ currentWindow: true })`. A API pública WebExtensions do Safari não expõe um identificador documentado nem uma consulta de associação para Grupos de Abas. Por isso, o SourceShelf diz “janela atual” e não afirma distinguir o grupo ativo de outras abas que o Safari exponha nessa janela.

O conjunto exato é definido pelo Safari e pode variar conforme a versão e o estado da janela. Páginas que o Safari não permite ler permanecem indisponíveis, e cabeçalhos HTTP `Link` ou redirecionamentos manuais dependem do que o Safari expõe. Verifique esses casos com uma extensão assinada nas versões distribuídas do Safari.

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
5. Se o Safari continuar solicitando acesso ou o painel não conseguir ler a página, abra **Safari > Ajustes > Extensões**, conceda acesso ao SourceShelf para esse site e tente novamente.
