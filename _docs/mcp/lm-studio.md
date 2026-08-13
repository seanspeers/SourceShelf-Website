# Use SourceShelf with LM Studio

LM Studio can run a local model and act as the MCP host that starts SourceShelf’s helper. Use a model with reliable tool-calling support; the model needs to choose `search_pack` and `read_pack_resource` during the conversation.

Last verified: 2026-08-01.

## Requirements

- A current LM Studio release with MCP support (LM Studio documents MCP support from 0.3.17).
- A downloaded and loaded model that supports tool use.
- A current SourceShelf share created through the visible Local AI status or **Pack Actions > Local AI Access…**.

## Install the SourceShelf connection

1. In SourceShelf, open the pack’s **Local AI Access** sheet.
2. Select **Copy MCP Configuration**.
3. In LM Studio, open the **Program** tab.
4. Select **Install**, then **Edit mcp.json**.
5. Paste or merge the copied `mcpServers` entry. Do not remove other servers you want to keep.
6. Save the file and enable the SourceShelf integration.

The result has this shape:

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

Use the exact command and share ID copied by SourceShelf. Do not manually substitute an application or helper path.

## Test the tools

Load a tool-capable local model and start with a narrow, explicit request:

> Use the SourceShelf tools to search the shared pack for tree canopy targets. Read the best matching resource, summarize the targets, and cite the SourceShelf resource URI. Do not answer from general knowledge.

For a smaller model, make the sequence explicit:

> First call `search_pack` with the query `tree canopy targets` and a limit of 5. Then call `read_pack_resource` for the best result. Base the answer only on the returned text.

You should see one search call followed by one or more bounded reads. If the model describes the tools instead of calling them, try a model with stronger function-calling support or keep the procedural wording.

## LM Studio as a local API server

LM Studio can also make configured MCP servers available to an API-driven agent. Current LM Studio documentation requires server configuration and authorization settings before API clients can invoke servers from `mcp.json`. This is an advanced route; the built-in chat is the simplest functional test.

## Common LM Studio errors

### “Plugin process exited unexpectedly with code 1”

The helper could not start or validate the share. Recopy the configuration after moving or updating SourceShelf, confirm sharing is enabled, and confirm the pack still shows a current snapshot.

### “Unknown method: tools/list”

The client reached a resource-only or older helper. Install the current SourceShelf version, recopy the configuration, and restart the integration. Current SourceShelf exposes both `search_pack` and `read_pack_resource`.

### The context window fills quickly

Ask the model to search first and read only one or two results. SourceShelf’s paged read tool exists specifically to avoid loading every resource into the prompt.

Official references: [LM Studio MCP servers](https://lmstudio.ai/docs/app/mcp), [LM Studio MCP API use](https://lmstudio.ai/docs/developer/core/mcp), [LM Studio server settings](https://lmstudio.ai/docs/developer/core/server/settings).
