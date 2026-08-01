# SourceShelf User Guide

SourceShelf turns files and web research into local Markdown, ordered context packs, portable exports, and optional read-only access for local AI applications. This guide is written for SourceShelf 1.0.1.

## Start here

- [Get started](getting-started.md) — convert your first files, build a pack, and choose an export.
- [Capture from Safari](guides/safari-capture.md) — pages, main content, selections, highlights, recipes, review, and keyboard shortcuts.
- [Browse the Library](guides/library-and-inspector.md) — search, filters, source status, actions, and previews.
- [Build and manage packs](guides/build-and-manage-packs.md) — saved packs, ordering, drafts, Trust & Safety, and Refresh & Compare.
- [Choose an export format](guides/export-formats.md) — AI Reference Pack, OKF, Markdown, `llms.txt`, and clipboard workflows.
- [Manage storage](guides/storage-management.md) — review local usage, safely clear obsolete data, and deliberately remove generated sources.

## Local AI access (MCP)

- [Local AI Access overview](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [MCP troubleshooting](mcp/troubleshooting.md)

## More guides

- [Convert files and folders](guides/convert-files.md)
- [Trust & Safety and living packs](guides/trust-safety-and-refresh.md)
- [Import and export llms.txt](guides/llms-txt.md)
- [Settings reference](reference/settings.md)
- [Supported formats](reference/supported-formats.md)
- [Privacy and security](reference/privacy-and-security.md)
- [Glossary](reference/glossary.md)

## A useful mental model

SourceShelf keeps four jobs separate:

1. **Convert or capture** creates a local Markdown source.
2. **Library** helps you find, inspect, and maintain sources.
3. **Packs** arrange selected sources in a deliberate order.
4. **Export or Local AI Access** delivers that pack to another workflow.

SourceShelf performs these jobs locally. It does not fetch remote content during file conversion, `llms.txt` import, export, comparison, or MCP reads.

The documentation screenshots use SourceShelf’s synthetic demo corpus and have local paths and MCP authorization values removed.
