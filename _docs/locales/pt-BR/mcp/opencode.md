# Usar o SourceShelf com o OpenCode

OpenCode Pode hospedar o auxiliar stdio SourceShelf e tornar suas duas ferramentas de leitura somente disponível para uma nuvem ou Ollama-modelo apoiado.

Este guia visa o atual OpenCode Configuração V2 documentada em 01-08-2026. Versões anteriores usam um diferente MCP Formato JSON; use o daquele lançamento `mcp add` Fluxo ou atualize sua configuração de acordo.

## Adicionar um local MCP servidor

Da SourceShelf **cópia MCP configuração** Usar o comum `mcpServers` Forma. OpenCode O V2 espera uma matriz de comandos locais sob `mcp.servers`, então traduza-o da seguinte forma em `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "sourceshelf-municipal-research": {
        "type": "local",
        "command": [
          "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
          "--share",
          "<share-id>"
        ],
        "codemode": false
      }
    }
  }
}
```

Use o caminho de ajuda exato e compartilhe o ID da SourceShelf. Mantenha o existente OpenCode Configurações e outros servidores ao mesclar a entrada.

`"codemode": false` Exibe as duas ferramentas SourceShelf diretamente. Essa é uma configuração padrão útil para modelos locais menores, pois eles não precisam escrever um wrapper de modo de código em torno das chamadas.

## Verificar e testar

aberto OpenCode E confirme o local MCP O servidor está ativado. Então pergunte:

> chamada `search_pack` para `open data publication schedule`, leia o melhor recurso com `read_pack_resource`, e responda apenas a partir desse resultado. Inclua sua SourceShelf URI.

Se o modelo simplesmente imprime uma chamada, mude para um modelo com melhor chamada de função ou torne a instrução mais procedural.

## Use um Ollama modelo

Com a entrada SourceShelf já salva:

```sh
ollama launch opencode
```

Ollama Documentos que fazem a fusão profunda de sua configuração temporária do modelo com sua configuração existente OpenCode Configuração, preservando o MCP Entrada do servidor.

## Mais velho OpenCode Lançamentos

As chaves de configuração mudaram entre OpenCode Gerações. se `mcp.servers` É rejeitado, execute a versão instalada MCP Adicione o comando ou consulte a documentação incluída/atual em vez de colocar tanto as formas antigas quanto as novas em um único arquivo.

Referências oficiais: [OpenCode V2 MCP Servidores](https://opencode.ai/v2/docs/mcp-servers), [Ollama com OpenCode](https://docs.ollama.com/integrations/opencode).
