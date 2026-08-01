# Glossary

**Archived asset**  
An image copied into SourceShelf-managed local storage from a supported capture or conversion. Exports include only assets referenced by selected readable Markdown.

**Baseline**  
The hashes, metadata, dates, format, source IDs, and ordering saved after a successful pack delivery. Refresh & Compare uses it as the “then” state.

**Capture recipe**  
A reusable Safari-capture policy for destination templates, YAML, content mode, image/link behavior, review, domain rules, and staleness.

**Library**  
The searchable browser for converted and captured sources. It is not the current pack.

**Living pack**  
A saved pack with a successful-export baseline that can classify local sources as new, changed, missing, unchanged, or removed.

**Local AI Access**  
SourceShelf’s opt-in MCP sharing workflow for a saved pack.

**MCP**  
Model Context Protocol, a standard through which an AI host can discover resources and tools from a server. SourceShelf uses local stdio only.

**OKF**  
Open Knowledge Format. SourceShelf exports canonical v0.2 concept metadata with SourceShelf manifest extensions.

**Pack**  
An ordered selection of Library source IDs. A saved pack can be exported, compared, or shared.

**Recipe review**  
An optional queued step that lets you edit captured Markdown and destination metadata before saving.

**Retrieval chunk**  
A bounded, structure-aware section of a source recorded in `chunks.jsonl` with stable IDs, provenance, hashes, headings, and estimated token count. It is not an embedding.

**Semantic document**  
SourceShelf’s versioned local representation of headings, paragraphs, lists, tables, code, images, captions, page boundaries, quotes, and fallback content.

**Share ID**  
A random local authorization identifying one published MCP snapshot.

**Snapshot**  
An immutable, pack-scoped MCP copy of readable Markdown, referenced assets, catalog, `llms.txt`, checksums, and allowlist.

**Trust & Safety**  
The preflight report for readability, packaging, freshness, checksums, assets, and conservative untrusted-instruction patterns. It is advisory, not sanitization.

**Untrusted reference**  
The trust classification applied to captured and converted material to remind AI clients and users not to treat source-body instructions as system authority.
