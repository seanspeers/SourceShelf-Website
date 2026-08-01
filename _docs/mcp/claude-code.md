# Use SourceShelf with Claude Code

Claude Code can host SourceShelf’s local stdio server and provide its search and read tools to the active model.

Last verified: 2026-08-01.

## Add the server

Create a SourceShelf share, then run:

```sh
claude mcp add --transport stdio --scope user sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

Use the exact path and share ID shown by SourceShelf. The `--scope user` option makes the connection available across your projects. Omit it for Claude Code’s default local/project-specific scope, or use `--scope project` when the team should receive a checked-in `.mcp.json` entry.

## Verify

From a shell:

```sh
claude mcp list
```

Inside Claude Code, enter:

```text
/mcp
```

Confirm that `search_pack` and `read_pack_resource` appear.

## Test prompt

> Search the SourceShelf pack for the transit service notice. Read the most relevant result and explain the service change, citing the `sourceshelf://` URI. Use no other files or web sources.

For a weaker model, explicitly require one search followed by a read.

## Project configuration

Claude Code also supports `.mcp.json`. SourceShelf’s copied configuration already uses the common `mcpServers` shape:

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

Do not commit a real share ID to a public repository. Prefer user scope for a personal SourceShelf snapshot.

## Use an Ollama model

After the SourceShelf entry is configured, Ollama can launch Claude Code against a local model:

```sh
ollama launch claude
```

The Claude Code process remains the MCP host; Ollama supplies the model.

Official reference: [Claude Code MCP](https://code.claude.com/docs/en/mcp).
