# Use SourceShelf with Ollama

Ollama runs the local model. An MCP-capable agent—such as Codex, Claude Code, or OpenCode—hosts the SourceShelf connection and gives its tools to that model.

Ollama’s native chat and API support tool calling, but Ollama is not by itself the SourceShelf MCP client. The simplest test is therefore:

```text
SourceShelf MCP helper → Codex / Claude Code / OpenCode → Ollama model
```

Last verified: 2026-08-01.

## Recommended setup: Ollama with Codex

1. Create the SourceShelf share and copy its command.
2. Add it to Codex using [the Codex guide](codex.md).
3. Launch Codex through Ollama:

```sh
ollama launch codex
```

1. Choose an installed model with a sufficiently large context window and reliable tool calling.
1. In Codex, run `/mcp` and confirm the SourceShelf server and its two tools are present.
1. Ask:

> Search the SourceShelf pack for public transit ridership trends, read the best result, and cite the resource URI.

Ollama recommends at least a 64K context window for coding agents. SourceShelf’s search-first workflow reduces unnecessary context, but the agent itself may still need room for tool definitions and results.

## Ollama with OpenCode

1. Configure SourceShelf in OpenCode using [the OpenCode guide](opencode.md).
2. Start the local agent through Ollama:

```sh
ollama launch opencode
```

Ollama says it deep-merges the temporary launch configuration with an existing OpenCode configuration, so your SourceShelf MCP entry remains available.

## Ollama with Claude Code

1. Configure SourceShelf using [the Claude Code guide](claude-code.md).
2. Launch:

```sh
ollama launch claude
```

Then use `/mcp` in Claude Code to confirm the server.

## Manual local-model mode in Codex

If your Codex setup already points to Ollama, you can also start it with:

```sh
codex --oss
```

The MCP configuration remains in Codex; `--oss` chooses the local open-source model provider. If you maintain multiple local providers, use a named Codex profile instead.

## Choosing a model

Look for a model whose Ollama page or documentation explicitly mentions tool/function calling. Smaller models benefit from direct prompts such as:

> Call `search_pack` first. Use `read_pack_resource` only on the top result. Do not guess and do not read the entire pack.

If the model repeatedly writes a hypothetical tool call as text, the host connection may be working while the model’s tool-call behavior is not. Confirm with a stronger tool-capable model before debugging SourceShelf.

## Advanced: build your own bridge

An application using Ollama’s chat API can define functions and execute them, but it must also implement an MCP client or translate those functions to SourceShelf’s MCP calls. SourceShelf intentionally does not provide a network endpoint. For normal testing, an existing agent host is much simpler and safer.

Official references: [Ollama tool calling](https://docs.ollama.com/capabilities/tool-calling), [Ollama launch](https://docs.ollama.com/cli), [Ollama with Codex](https://docs.ollama.com/integrations/codex), [Ollama with OpenCode](https://docs.ollama.com/integrations/opencode), [Ollama with Claude Code](https://docs.ollama.com/integrations/claude-code).
