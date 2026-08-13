# Settings Reference on Mac

Open **SourceShelf > Settings**. The window is resizable and is organized into five tabs.

For the iPhone and iPad settings surface, see [Settings and Privacy on iPhone and iPad](../ios/settings-and-privacy.md).

## Language

SourceShelf supports English, French, Latin American Spanish, Brazilian Portuguese, and Japanese. It follows the language selected for SourceShelf in **System Settings > General > Language & Region > Applications**, falling back to your preferred macOS language order. The Safari extension follows Safari’s interface language.

Changing the interface language does not translate source documents, custom recipe or pack names, exported source text, MCP identifiers, filenames, or manifest fields.

## General

Choose the output folder used for new converted and captured Markdown. SourceShelf stores an authorized bookmark locally so it can return to that folder. Changing it affects future output; it does not move existing files.

**Review Storage…** inventories generated Markdown, projected output assets, managed Library copies, semantic caches, local MCP snapshots, and capture drafts/staging. Safe Cleanup removes only orphaned or regenerable internal data. Generated-source cleanup is a separate selection-and-confirmation workflow that moves output files to Trash; starred and saved-pack sources are protected by default, and original imported documents are never deletion targets. See [Manage SourceShelf Storage](../guides/storage-management.md) for the complete workflow.

## Capture

Capture settings include:

- Safari extension status and a shortcut to Safari’s extension settings;
- organization by domain and date;
- archived web-image behavior;
- the global web-capture staleness age;
- capture recipe creation, duplication, deletion, ordering, templates, YAML, behavior, and domain rules;
- the Safari quick-capture keyboard action and its preferred recipe.

Recipe changes are saved locally and published to the SourceShelf Safari extension.

## Export

Choose the format initially selected in the Packs export chooser. The setting and chooser share one preference; confirming a different choice updates it, while canceling does not.

**Include retrieval chunks in AI Reference Pack ZIPs** adds model-neutral `chunks.jsonl`. It defaults on and never adds embeddings.

## Integrations

**Enable local MCP sharing** is off by default. When enabled, individual saved packs can be authorized from the Packs workspace's visible Local AI status or **Pack Actions > Local AI Access…**.

This tab shows the active-share count and provides **Open Packs** and **Revoke All**. Disabling sharing or revoking all removes snapshots and immediately invalidates copied client configurations.

See [Local AI Access](../mcp/local-ai-access.md).

## Privacy

This tab summarizes local storage, exports, retrieval chunks, living-pack comparison, and advisory Trust & Safety behavior. **Open Privacy Details** opens the full in-app privacy explanation.
