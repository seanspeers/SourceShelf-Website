# Solução de problemas do MCP

Trabalhe da SourceShelf para fora: instantâneo, caminho auxiliar, conexão do cliente, depois comportamento do modelo.

## 1. Confirmar o estado do SourceShelf

Abra o pacote salvo **Acesso local de IA** Folha e verifique:

- O compartilhamento global está ativado;
- O pacote foi salvo e não tem alterações não salvas;
- Uma captura de tela publicada é exibida;
- Status é **atual**, ou você retiveram intencionalmente um **Revisão necessária** Captura de tela;
- A captura de tela contém pelo menos uma fonte legível.

selecionar **refrescar** Se você quiser revisar e publicar as alterações atuais. uso **cópia MCP configuração** Novamente após qualquer alteração no caminho de instalação do SourceShelf.

## 2. Teste o comando copiado diretamente

colar **Comando de Copiar** No Terminal. Um stdio MCP O auxiliar normalmente espera silenciosamente pela entrada do protocolo; não é um aplicativo de shell interativo. Se ele sair imediatamente e imprimir um diagnóstico, verifique a mensagem para ver se há uma partilha ausente, registro desativado, instantâneo inválido ou falha de soma de verificação. Pressione Control-C para parar um teste direto em espera.

Os diagnósticos pertencem ao erro padrão. As mensagens do protocolo JSON-RPC pertencem à saída padrão. Clientes que mesclam ou reescrevem esses fluxos podem quebrar a conexão.

## 3. Erros comuns

### Processo encerrado com código 1 / conexão fechada

Causas prováveis:

- O aplicativo configurado foi movido, atualizado ou substituído;
- a participação copiada foi revogada;
- global MCP Compartilhar está desativado;
- A captura de tela ou o registro não podem ser lidos.

Open SourceShelf, confirme a partilha do pacote e copie uma configuração nova.

### Método não encontrado: `tools/list`

O cliente atingiu um assistente mais antigo que só fornece recursos. Instale a versão atual do SourceShelf, depois copie o comando novamente e reinicie a integração do cliente. O SourceShelf atual anuncia `search_pack` e `read_pack_resource`.

### Recurso não encontrado

o URI É de outro pacote, outra partilha, uma captura de tela mais antiga ou não está na lista de permissões de captura de tela. Pesquise novamente e leia o URI Retornado pelo resultado da pesquisa atual.

### Falha de soma de verificação

O SourceShelf se recusa a servir um arquivo de instantâneo que não corresponde mais à sua soma de verificação publicada. Atualize a partilha do SourceShelf. Não edite arquivos dentro dele. `MCP Shares/<share-id>/` Manualmente.

### O cliente mostra recursos, mas o modelo nunca chama ferramentas

o MCP A conexão está funcionando, mas a política do modelo ou host não está emitindo chamadas de ferramentas. Tente:

> Primeira chamada `search_pack` Com consulta `...`. Então ligue `read_pack_resource` No resultado superior. Não responda antes que ambas as chamadas terminem.

Se isso ainda se tornar texto simples, teste um modelo conhecido por suportar chamadas de funções.

### A pesquisa perde uma frase exata

Use termos de conteúdo significativos em vez de texto pesado em pontuação. A pesquisa é recuperação lexical local, não pesquisa de incorporação semântica. Tente uma formulação alternativa ou uma frase mais curta.

### Uma longa fonte é cortada

chamada `read_pack_resource` Novamente com o cursor retornado. Menor `max_characters` Valores ajudam modelos de contexto limitado.

## 4. Crie uma nova autorização

Se o estado do cliente permanecer ambíguo:

1. Remova a entrada do servidor do cliente de IA.
2. Em SourceShelf escolha **Pare de compartilhar**.
3. Salve e recheck o pacote.
4. Crie uma nova autorização de Acesso Local de IA.
5. Adicione a configuração recém-copiada ao cliente.

Uma nova autorização recebe um novo ID de compartilhamento. As configurações antigas permanecem inválidas.
