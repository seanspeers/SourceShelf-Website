# Settings Reference

Open **SourceShelf > Settings**. The window is resizable and is organized into five tabs.

## General

Choose the output folder used for new converted and captured Markdown. SourceShelf stores an authorized bookmark locally so it can return to that folder. Changing it affects future output; it does not move existing files.

## Capture

Capture settings include:

- Safari extension status and a shortcut to Safari’s extension settings;
- organization by domain and date;
- archived web-image behavior;
- the global web-capture staleness age;
- capture recipe creation, duplication, deletion, ordering, templates, YAML, behavior, and domain rules;
- the Safari quick-capture keyboard action and its preferred recipe.

Recipe changes are saved to the app-group container and published for the matching Safari extension build.

## Export

Choose the format initially selected in the Packs export chooser. The setting and chooser share one preference; confirming a different choice updates it, while canceling does not.

**Include retrieval chunks in AI Reference Pack ZIPs** adds model-neutral `chunks.jsonl`. It defaults on and never adds embeddings.

## Integrations

**Enable local MCP sharing** is off by default. When enabled, individual saved packs can be authorized from **Packs > More > Local AI Access…**.

This tab shows the active-share count and provides **Open Packs** and **Revoke All**. Disabling sharing or revoking all removes snapshots and immediately invalidates copied client configurations.

See [Local AI Access](../mcp/local-ai-access.md).

## Privacy

This tab summarizes local storage, exports, retrieval chunks, living-pack comparison, and advisory Trust & Safety behavior. **Open Privacy Details** opens the full in-app privacy explanation.
