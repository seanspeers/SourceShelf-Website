# Acesso local à IA (MCP)

O Acesso Local de IA permite que um aplicativo de IA compatível pesquise e leia um pacote SourceShelf salvo sem exportá-lo e carregá-lo repetidamente. O compartilhamento é local, somente leitura, com escopo de pacote e desativado por padrão.

SourceShelf usa o Protocolo de Contexto do Modelo (MCP) acima da entrada/saída padrão. Não inicia um servidor da web ou um ouvinte de rede.

## Antes de conectar um cliente

1. aberto **SourceShelf > Configurações > Integrações**.
2. habilitar **local MCP Compartilhando**.
3. aberto **Pacotes** E selecione um pacote salvo.
4. Salve quaisquer alterações pendentes.
5. escolher **Mais > Acesso Local à IA...**.
6. Revise o resultado recente de Confiança e Segurança. Se houver avisos ou erros de fonte legível, escolha explicitamente **Compartilhar com problemas** Para continuar.

![O Local de inscrição voluntária MCP Configurações de compartilhamento](../../../assets/images/integrations-settings.png)

![Uma instantânea atual do Acesso Local de IA para um pacote salvo sintético](../../../assets/images/local-ai-access.png)

Um pacote sem título ou sujo não pode ser compartilhado. Um pacote sem fontes legíveis é bloqueado.

## O que a SourceShelf publica

Cada autorização cria um ID de compartilhamento aleatório e uma instantânea imutável contendo apenas o pacote selecionado:

- Uma visão geral do pacote com links de origem ordenados;
- Um gerado `llms.txt` Índice;
- Um catálogo JSON público;
- Um recurso Markdown por fonte legível;
- Imagens arquivadas referenciadas;
- Somas de verificação e um interno URI Lista de permissões.

A captura de tela faz **não** Inclua caminhos de arquivos de origem, caminhos de pastas de saída, marcadores de segurança, itens da Biblioteca não relacionados ou acesso de escrita.

O texto diz: adicione um aviso de referência não confiável sem alterar o corpo Markdown armazenado. Cada solicitação URI É verificado contra a lista de permissões de instantâneo e seu SHA-256 Soma de verificação antes de ser servido.

## Recursos e ferramentas

O servidor expõe descobertível `sourceshelf://pack/...` Recursos e duas ferramentas de leitura somente:

### `search_pack(query, limit)`

Pesquisa o pacote compartilhado localmente e retorna trechos classificados, além do recurso. URIs. A pesquisa é determinística e lexical; não usa embeddings, faz solicitações de rede ou chama um modelo.

### `read_pack_resource(uri, cursor, max_characters)`

Lê um recurso de texto em páginas limitadas. O cursor permite que um cliente continue através de uma longa fonte sem sobrecarregar a janela de contexto de um modelo menor.

Este par é especialmente útil para modelos locais: o modelo pode pesquisar de forma restrita, ler apenas as seções de fontes mais relevantes e citar seu SourceShelf. URIS. Um host compatível ainda precisa permitir que o modelo chame ferramentas.

## Copie os detalhes da conexão

o **Acesso local de IA** Folha fornece:

- **cópia MCP configuração** — JSON no comum `mcpServers` Formato usado por LM Studio E vários clientes;
- **Comando de Copiar** — o executável auxiliar mais `--share` Argumento de autorização;
- **refrescar** — reconstruir o instantâneo após uma revisão explícita quando necessário;
- **Pare de compartilhar** — revogar a autorização imediatamente.

Trate o ID de compartilhamento copiado como um token de acesso local. Não é uma senha enviada pela internet, mas qualquer processo executado como seu usuário que tenha o ID e o caminho auxiliar pode solicitar essa instantânea.

## Atualização e revogação de instantâneo

A SourceShelf reavalia as ações após mudanças relevantes no pacote, na Biblioteca e na política de confiança:

- Se um novo resultado de Confiança e Segurança estiver pronto, o SourceShelf pode substituir a instantânea automaticamente.
- Se novos avisos ou erros aparecerem, a captura de tela válida anterior permanece disponível e a partilha torna-se **Revisão necessária**.
- selecionar **refrescar** E confirme antes de publicar essas alterações.
- Excluir o pacote salvo revoga sua participação.
- **Pare de compartilhar**, **Revogar tudo**, ou desativando Local MCP Compartilhar invalida as configurações copiadas imediatamente.

O auxiliar recarrega o registro e os metadados de instantâneo para cada solicitação, para que um cliente em execução não possa continuar lendo uma partilha revogada.

## Movendo ou atualizando SourceShelf

As configurações copiadas apontam para o assistente dentro do aplicativo SourceShelf. Se você mover, reinstalar ou atualizar o SourceShelf, copie uma configuração nova de **Acesso Local de IA...** Então o cliente de IA usa a localização atual do assistente.

## Escolha um guia do cliente

- [LM Studio](lm-studio.md)
- [Ollama](ollama.md)
- [Codex](codex.md)
- [Claude Code](claude-code.md)
- [OpenCode](opencode.md)

ver [MCP solução de problemas](troubleshooting.md) Se o assistente sair, as ferramentas estiverem faltando ou uma partilha não estiver atual.

## Notas do protocolo

O auxiliar do SourceShelf usa MCP Sobre o stdio e suporta a versão do protocolo implementada pelo seu SDK Swift em pacote. O servidor publica apenas recursos e as duas ferramentas de leitura somente; ele não publica prompts, ferramentas de escrita, assinaturas ou notificações de alteração de lista.

Leitura adicional: [MCP Recursos](https://modelcontextprotocol.io/docs/learn/server-concepts), [MCP Ferramentas](https://modelcontextprotocol.io/docs/learn/server-concepts#tools).
