# Privacy and Security

SourceShelf is local by default. File conversion, OCR, processing of content handed off by Safari, semantic parsing, previews, retrieval chunking, Trust & Safety, checksums, export, local-file `llms.txt` import, living-pack comparison, and MCP search/read operate on the device.

## No-network guarantee

SourceShelf does not fetch remote content during:

- file conversion or preview;
- local-file `llms.txt` or research-package import and generation;
- Refresh & Compare;
- MCP resource listing, search, or reads;
- bundle generation.

A local `llms.txt` file remains offline: remote URLs in it become unavailable references rather than being fetched. Website capture and website `llms.txt` acquisition are different, explicit Safari-extension workflows. The extension reads or fetches authorized website content under Safari’s permission model, then hands bounded local data to SourceShelf. The native app does not become a general-purpose web client.

## What SourceShelf stores

Depending on the features you use, local storage includes:

- converted Markdown in the authorized Mac output folder or the private iPhone/iPad library;
- Library history and saved packs;
- ordered draft metadata;
- semantic-document caches;
- archived web images;
- capture recipes and queued review drafts;
- successful-export baselines;
- explicitly authorized MCP snapshots.

Draft snapshots and baselines store identifiers, order, dates, and hashes—not copies of arbitrary Markdown content. MCP snapshots intentionally copy only a shared pack’s readable Markdown and referenced assets so the sandboxed helper does not need broad file access.

Library records are retained until you remove them. **Settings > General > Review Storage…** separates safe, regenerable cleanup from deletion of generated source data. User-visible generated output is moved to Trash, starred and saved-pack sources are protected by default, and original imported documents are never selected or deleted. See [Manage SourceShelf Storage](../guides/storage-management.md) for the cleanup workflow.

## Local path privacy

The app shows local paths in its own inspector so you can open or reveal files. File-source paths are excluded from exported provenance, OKF concepts, manifests, `llms.txt` output, and MCP snapshots. Screenshot documentation should likewise crop or mask these local-only details.

## Trust classification

Captured and converted text is marked `untrusted_reference`. Trust & Safety warnings are advisory and never claim that the material was sanitized. Review source text before following any instruction it contains.

## MCP boundaries on Mac

MCP sharing is:

- disabled by default;
- authorized per saved pack;
- served by a signed local stdio helper with no network listener;
- read-only;
- restricted by an allowlist and SHA-256 verification;
- immediately revocable.

The two tools search the snapshot and read an allowlisted resource. There is no filesystem-path tool, general file browser, write action, remote search, prompt, or subscription.

## Share IDs and configurations

A share ID authorizes one local snapshot. Keep it out of public repositories and documentation screenshots. If SourceShelf is moved, reinstalled, or updated, recopy the helper path. Revoke access from SourceShelf rather than relying only on removing a client configuration.

For the product privacy statement and implementation detail, see the [SourceShelf Privacy Policy](/privacy.html).
