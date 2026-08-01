# Usar o SourceShelf com o Codex

Codex Pode iniciar o auxiliar stdio do SourceShelf e expor os recursos e ferramentas do pacote compartilhado a uma nuvem ou Ollama-modelo local apoiado.

Última verificação: 01-08-2026.

## Opção 1: adicione o servidor da linha de comando

1. No SourceShelf, crie uma partilha e selecione **Comando de Copiar**.
2. Adicione-o a Codex. Substitua o caminho de ajuda exato e o ID de compartilhamento do SourceShelf:

```sh
codex mcp add sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

1. Verifique o registro:

```sh
codex mcp list
```

1. começar Codex E entre `/mcp` Para inspecionar o servidor conectado.

## Opção 2: editar Codex configuração

Codex Clientes compartilham MCP Configuração em `~/.codex/config.toml`. Adicionar:

```toml
[mcp_servers.sourceshelf-municipal-research]
command = "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer"
args = ["--share", "<share-id>"]
```

Você pode, em vez disso, colocar a entrada em um projeto confiável `.codex/config.toml` Quando a conexão deve ser específica do projeto. Use o comando exato copiado da partilha SourceShelf.

## Opção 3: Codex Configurações do aplicativo

pol Codex Configurações do aplicativo, adicione um MCP Servidor, escolha **STDIO**, entre no comando e argumentos do assistente, salve e reinicie a conexão. A mesma configuração do servidor está disponível para Codex CLI porque os clientes compartilham `config.toml`.

## Teste o pacote compartilhado

Tente:

> Use o SourceShelf para encontrar os indicadores climáticos do pacote de demonstração. Leia a fonte mais relevante, resuma a tendência relatada e cite seu `sourceshelf://` URI. Não inspecione arquivos locais não relacionados.

Para um modelo local através Ollama:

```sh
ollama launch codex
```

Ou usar `codex --oss` Quando seu Codex A configuração do provedor local já visa Ollama.

## Remova ou substitua a conexão

uso `codex mcp remove sourceshelf-municipal-research` Para remover a entrada do cliente. Isso não revoga a partilha SourceShelf. Para revogar o acesso imediatamente, escolha **Pare de compartilhar** Também no SourceShelf.

Se você mover, reinstalar ou atualizar o SourceShelf, exclua ou atualize o antigo Codex Entrada e copie um caminho auxiliar novo.

Referência oficial: [Codex MCP configuração](https://developers.openai.com/codex/mcp/).
