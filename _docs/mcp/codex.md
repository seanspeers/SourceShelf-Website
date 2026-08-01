# Use SourceShelf with Codex

Codex can start SourceShelf’s stdio helper and expose the shared pack’s resources and tools to a cloud or Ollama-backed local model.

Last verified: 2026-08-01.

## Option 1: add the server from the command line

1. In SourceShelf, create a share and select **Copy Command**.
2. Add it to Codex. Substitute the exact helper path and share ID from SourceShelf:

```sh
codex mcp add sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

1. Verify the registration:

```sh
codex mcp list
```

1. Start Codex and enter `/mcp` to inspect the connected server.

## Option 2: edit Codex configuration

Codex clients share MCP configuration in `~/.codex/config.toml`. Add:

```toml
[mcp_servers.sourceshelf-municipal-research]
command = "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer"
args = ["--share", "<share-id>"]
```

You may instead put the entry in a trusted project’s `.codex/config.toml` when the connection should be project-specific. Use the exact command copied from the SourceShelf share.

## Option 3: Codex app settings

In Codex app settings, add an MCP server, choose **STDIO**, enter the helper command and arguments, save, and restart the connection. The same server configuration is available to Codex CLI because the clients share `config.toml`.

## Test the shared pack

Try:

> Use SourceShelf to find the demo pack’s climate indicators. Read the most relevant source, summarize the reported trend, and cite its `sourceshelf://` URI. Do not inspect unrelated local files.

For a local model through Ollama:

```sh
ollama launch codex
```

or use `codex --oss` when your Codex local-provider configuration already targets Ollama.

## Remove or replace the connection

Use `codex mcp remove sourceshelf-municipal-research` to remove the client entry. This does not revoke the SourceShelf share. To revoke access immediately, choose **Stop Sharing** in SourceShelf as well.

If you move, reinstall, or update SourceShelf, delete or update the old Codex entry and copy a fresh helper path.

Official reference: [Codex MCP configuration](https://developers.openai.com/codex/mcp/).
