# Crie, exporte e mova pacotes no iPhone e iPad

Um pacote é uma coleção ordenada de fontes da Biblioteca. Ele organiza a pesquisa sem duplicar as fontes subjacentes.

## Crie e gerencie um pacote

Use **Novo Pacote** na barra lateral para criar um pacote vazio. Para adicionar pesquisa, abra as ações de uma fonte ou entre no modo de seleção, escolha **Adicionar ao Pacote…** e selecione um pacote existente ou crie um novo.

Dentro de um pacote, **Remover do Pacote** remove apenas a participação. A fonte permanece em **Todas as Pesquisas**. Renomeie ou exclua um pacote pelo menu de contexto; excluir um pacote também mantém suas fontes intactas.

Pesquisa, filtros e ordenação se aplicam à Biblioteca ou à visualização de pacote selecionada. No iPad, mantenha o pacote, a lista de fontes e o Leitor visíveis juntos quando houver espaço. No iPhone, percorra a mesma hierarquia uma tela por vez.

## Exporte um pacote

Abra um pacote e escolha **Mais > Exportar Pacote…**, ou escolha **Ajustes > Exportar um Pacote…**. O SourceShelf 1.0.2 para iPhone e iPad oferece:

- **ZIP do Pacote de Referência de IA** para chats de IA e espaços de projetos;
- **Bundle OKF v0.2** para catálogos e agentes baseados em padrões;
- **Pacote llms.txt Portátil** para uma coleção completa e compatível com padrões.

Depois que o SourceShelf cria o ZIP, a folha de compartilhamento do sistema pode salvá-lo no app Arquivos, enviá-lo pelo AirDrop ou passá-lo a outro app selecionado.

## Importe um pacote portátil

Escolha **Importar Pesquisa…** e selecione um ZIP compatível. O SourceShelf detecta e valida Pacotes de Referência de IA, OKF e `llms.txt` Portáteis do SourceShelf, além de pacotes compatíveis suportados. Ele verifica somas de verificação e relações declaradas antes de confirmar a importação.

Uma importação cria um novo pacote local e novos identificadores de fontes. Importar o mesmo pacote duas vezes cria dois pacotes independentes; o segundo não é mesclado nem substitui o primeiro silenciosamente.

Integridade do pacote significa que os bytes importados correspondem ao inventário declarado. Isso não prova quem criou o pacote nem que o conteúdo da pesquisa é seguro. O texto importado continua sendo conteúdo de referência e não é interpretado como instruções do app.

## Continue no Mac

Exporte um pacote no iPhone ou iPad, mova-o pelo app Arquivos ou AirDrop e escolha **Importar Pacote de Pesquisa…** no SourceShelf para Mac. Você também pode exportar no Mac e selecionar o pacote resultante com **Importar Pesquisa…** no iPhone ou iPad.

Isso é portabilidade intencional de arquivos, não sincronização automática ou ao vivo. Alterações feitas em um dispositivo não atualizam cópias em outro, a menos que você exporte e importe um novo pacote.
