# Capture pelo Safari no iPhone e iPad

A extensão do SourceShelf para Safari captura pesquisas da web autorizadas e as entrega à biblioteca local do SourceShelf. O Safari, não o SourceShelf, controla quais sites a extensão pode acessar.

## Ative a extensão

Você pode abrir **Ajustes > Extensão do Safari** no SourceShelf e usar **Ativar Extensão do Safari…** quando o link direto estiver disponível. Para configurar manualmente:

1. Abra o app **Ajustes** do sistema.
2. No iOS ou iPadOS 18 e posteriores, escolha **Apps > Safari > Extensões**. No iOS ou iPadOS 17, escolha **Safari > Extensões**.
3. Selecione SourceShelf e ative **Permitir Extensão**.
4. Escolha o acesso a sites que você deseja permitir no Safari.

Os ajustes do Safari continuam sendo a fonte de verdade para os perfis de navegação normal e privada.

## Solicitações de acesso a sites

O Safari pode mostrar a solicitação de acesso ao site assim que você toca na extensão SourceShelf na barra de ferramentas. Esse é um comportamento normal do sistema; o SourceShelf não pode suprimir nem substituir a solicitação. Conceda o acesso necessário à página que deseja capturar.

Em uma coleção `llms.txt` com vários sites ou em várias abas, a revisão pode marcar algumas fontes como **Acesso necessário**. No iPhone e iPad, abra cada site listado, permita o SourceShelf no Safari e reabra a revisão para atualizá-la. Se o Safari perguntar repetidamente ou a página continuar indisponível, revise o acesso a sites do SourceShelf nos ajustes do Safari em vez de pressionar repetidamente a ação do pop-up.

## Capture uma página

Abra uma página HTTP(S) normal, toque no controle de extensões do Safari e escolha SourceShelf. A janela pode salvar a página, seu conteúdo principal, texto selecionado, uma área selecionada ou um conjunto ordenado de trechos da pesquisa. Ações interativas exigem uma página compatível e, para uma captura baseada em seleção, uma seleção real.

A captura de uma única página é salva em **Todas as Pesquisas**. O SourceShelf arquiva imagens referenciadas elegíveis dentro de seus limites normais para que o resultado salvo possa ser lido offline.

## Capture a janela atual do Safari

Escolha **Pesquisa > Capturar Janela Atual**. O SourceShelf revisa as abas que o Safari informa para a janela em que a extensão foi aberta. Selecione as abas úteis, escolha um pacote novo ou existente e inicie a captura.

Páginas incompatíveis ou inacessíveis continuam visíveis, mas não podem ser selecionadas. O SourceShelf preserva a ordem escolhida no Safari, continua quando uma página falha e não cria um pacote vazio se todas as páginas falharem. As abas disponíveis são determinadas pelo Safari e podem variar com a janela, Grupo de Abas, permissão e estado do sistema operacional.

## Importe uma coleção llms.txt de um site

Em um site, escolha **Pesquisa > Importar via llms.txt**. O SourceShelf procura um índice aplicável usando links de descoberta declarados e caminhos `llms.txt` progressivamente mais amplos até a raiz do site. Ele apresenta as seções ordenadas e os recursos listados; não rastreia outros links da página.

Selecione os recursos desejados e escolha um pacote novo ou existente. O índice `llms.txt` é salvo primeiro, seguido pelos recursos selecionados que foram obtidos com sucesso, na ordem listada. A falha de um recurso não descarta os demais.

## Conclusão e recuperação

A extensão prepara entregas locais limitadas para o app principal. O SourceShelf as processa quando o app é iniciado ou volta a ficar ativo. Se uma captura concluída não aparecer imediatamente, abra o SourceShelf e permita que ele termine a importação pendente.

Cancelar o trabalho remoto interrompe as solicitações ativas da extensão e remove dados temporários quando possível. O trabalho local já aceito pode terminar. O SourceShelf nunca transforma o app nativo para iPhone ou iPad em um rastreador em segundo plano.
