# Use SourceShelf with OpenCode

OpenCode can host the SourceShelf stdio helper and make its two read-only tools available to a cloud or Ollama-backed model.

This guide targets the current OpenCode V2 configuration documented on 2026-08-01. Older releases use a different MCP JSON shape; use that release’s `mcp add` flow or update its configuration accordingly.

## Add a local MCP server

SourceShelf’s **Copy MCP Configuration** uses the common `mcpServers` shape. OpenCode V2 expects a local command array under `mcp.servers`, so translate it as follows in `opencode.json`:

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

Use the exact helper path and share ID from SourceShelf. Keep existing OpenCode settings and other servers when merging the entry.

`"codemode": false` exposes the two SourceShelf tools directly. That is a useful default for smaller local models because they do not need to write a code-mode wrapper around the calls.

## Verify and test

Open OpenCode and confirm the local MCP server is enabled. Then ask:

> Call `search_pack` for `open data publication schedule`, read the best resource with `read_pack_resource`, and answer only from that result. Include its SourceShelf URI.

If the model merely prints a call, switch to a model with better function calling or make the instruction more procedural.

## Use an Ollama model

With the SourceShelf entry already saved:

```sh
ollama launch opencode
```

Ollama documents that it deep-merges its temporary model configuration with your existing OpenCode configuration, preserving the MCP server entry.

## Older OpenCode releases

Configuration keys have changed between OpenCode generations. If `mcp.servers` is rejected, run the installed release’s MCP add command or consult its bundled/current documentation rather than placing both old and new shapes in one file.

Official references: [OpenCode V2 MCP servers](https://opencode.ai/v2/docs/mcp-servers), [Ollama with OpenCode](https://docs.ollama.com/integrations/opencode).
