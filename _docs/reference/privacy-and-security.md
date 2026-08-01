# Privacy and Security

SourceShelf is local by default. File conversion, OCR, web-capture processing, semantic parsing, previews, retrieval chunking, Trust & Safety, checksums, export, `llms.txt` import, living-pack comparison, and MCP search/read operate on this Mac.

## No-network guarantee

SourceShelf does not fetch remote content during:

- file conversion or preview;
- `llms.txt` import or generation;
- Refresh & Compare;
- MCP resource listing, search, or reads;
- bundle generation.

A Safari capture receives content from the page you are already viewing through the enabled extension. Remote URLs found in local `llms.txt` are retained as unavailable references rather than fetched.

## What SourceShelf stores

Depending on the features you use, local storage includes:

- converted Markdown in the output folder;
- Library history and saved packs;
- ordered draft metadata;
- semantic-document caches;
- archived web images;
- capture recipes and queued review drafts;
- successful-export baselines;
- explicitly authorized MCP snapshots.

Draft snapshots and baselines store identifiers, order, dates, and hashes—not copies of arbitrary Markdown content. MCP snapshots intentionally copy only a shared pack’s readable Markdown and referenced assets so the sandboxed helper does not need broad file access.

## Local path privacy

The app shows local paths in its own inspector so you can open or reveal files. File-source paths are excluded from exported provenance, OKF concepts, manifests, `llms.txt` output, and MCP snapshots. Screenshot documentation should likewise crop or mask these local-only details.

## Trust classification

Captured and converted text is marked `untrusted_reference`. Trust & Safety warnings are advisory and never claim that the material was sanitized. Review source text before following any instruction it contains.

## MCP boundaries

MCP sharing is:

- disabled by default;
- authorized per saved pack;
- served by a signed local stdio helper with no network listener;
- read-only;
- restricted by an allowlist and SHA-256 verification;
- immediately revocable.

The two tools search the snapshot and read an allowlisted resource. There is no filesystem-path tool, general file browser, write action, remote search, prompt, or subscription.

## Share IDs and configurations

A share ID authorizes one local snapshot. Keep it out of public repositories and documentation screenshots. If SourceShelf is moved or rebuilt, recopy the helper path. Revoke access from SourceShelf rather than relying only on removing a client configuration.

For the product privacy statement and implementation detail, see the [SourceShelf Privacy Policy](/privacy.html).
