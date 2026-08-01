# Usar o SourceShelf com o Claude Code

Claude Code Pode hospedar o servidor stdio local do SourceShelf e fornecer suas ferramentas de pesquisa e leitura ao modelo ativo.

Última verificação: 01-08-2026.

## Adicione o servidor

Crie uma partilha SourceShelf, em seguida execute:

```sh
claude mcp add --transport stdio --scope user sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

Use o caminho exato e compartilhe o ID mostrado pelo SourceShelf. o `--scope user` A opção torna a conexão disponível em todos os seus projetos. Omita-a para Claude CodeO escopo padrão local/específico do projeto, ou use `--scope project` Quando a equipe deve receber um check-in `.mcp.json` Entrada.

## verificar

De uma concha:

```sh
claude mcp list
```

dentro de Claude Code, digite:

```text
/mcp
```

Confirme isso `search_pack` e `read_pack_resource` Aparecer.

## Exibição de teste

> Pesquise o pacote SourceShelf para o aviso de serviço de transporte. Leia o resultado mais relevante e explique a mudança de serviço, citando o `sourceshelf://` URI. Não use outros arquivos ou fontes da web.

Para um modelo mais fraco, exija explicitamente uma pesquisa seguida por uma leitura.

## Configuração do projeto

Claude Code Também apoia `.mcp.json`. A configuração copiada do SourceShelf já usa o comum `mcpServers` Forma:

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "type": "stdio",
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

Não crie um ID de compartilhamento real em um repositório público. Prefira o escopo do usuário para uma captura de tela pessoal do SourceShelf.

## Use um Ollama modelo

Depois que a entrada SourceShelf for configurada, Ollama Pode lançar Claude Code Contra um modelo local:

```sh
ollama launch claude
```

o Claude Code O processo permanece o MCP Anfitrião; Ollama Fornece o modelo.

Referência oficial: [Claude Code MCP](https://code.claude.com/docs/en/mcp).
