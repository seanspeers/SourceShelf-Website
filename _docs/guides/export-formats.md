# Choose an Export Format

Open a pack and select **Export…**. SourceShelf remembers the last confirmed format; canceling the chooser does not change the preference.

![The SourceShelf export chooser](../assets/images/export-chooser.png)

## AI Reference Pack ZIP

**Best for:** AI chats, local models, agents, and project workspaces.

The ZIP contains per-source Markdown pages, combined Markdown, a schema-versioned manifest, referenced archived images, and `checksums.sha256`. When **Include retrieval chunks** is enabled, it also contains `chunks.jsonl`.

Retrieval chunks are structure-aware and model-neutral:

- a maximum of 800 estimated tokens;
- up to 120 estimated tokens of structural overlap;
- stable source and chunk IDs;
- heading ancestry, provenance, hashes, asset references, and untrusted-reference classification;
- table headers repeated when a table must be split;
- `token_count_method: "estimated_chars_div_4"`.

No embeddings are generated or included.

## OKF v0.2 Bundle ZIP

**Best for:** standards-based knowledge catalogs and agents.

The root `index.md` contains canonical OKF v0.2 version metadata. Concepts carry type, title, provenance, SourceShelf metadata, and generated-by/generated-at values. Valid absolute HTTP(S) web provenance can appear as `resource` and `sources`; local file paths are never exported.

SourceShelf’s manifest includes hashes, modification dates, trust extensions, assets, and source order. Canonical OKF trust-lifecycle fields such as `verified`, `status`, and `stale_after` remain omitted because SourceShelf does not provide user-controlled lifecycle assertions.

## Markdown Context Pack

**Best for:** portable one-file context.

This creates one Markdown file containing the pack’s readable sources in order. It is easy to inspect, version, attach, or paste into a system that does not understand ZIP bundles.

## Portable llms.txt Package ZIP

**Best for:** sharing or backing up a complete research collection and moving it between SourceShelf on Mac, iPhone, and iPad.

The ZIP keeps a standards-friendly `llms.txt` at its root and includes canonical Markdown, referenced archived assets, a versioned `sourceshelf-manifest.json`, and an integrity inventory. Importing it creates a new pack with fresh local identifiers; it does not merge with or overwrite an existing pack.

This is manual portability through Files, AirDrop, or another user-selected share destination. It is not cloud sync and does not update another device automatically.

## llms.txt Collection Folder

**Best for:** an inspectable local collection using the experimental `llms.txt` convention.

This requires a clean saved pack and creates a collision-safe `<pack-name>-llms` folder with an index, ordered documents, referenced archived assets, a SourceShelf manifest, and checksums. Unavailable sources with valid HTTP(S) provenance appear under `## Optional` and are not fetched.

See [Import and export llms.txt](llms-txt.md).

## Copy Combined Markdown

**Best for:** quick prompt, chat, or document handoff.

The combined Markdown is copied immediately. Because this is a successful pack delivery, SourceShelf records a living-pack baseline after the clipboard operation completes.

## Checksums and validation

AI, OKF, and portable `llms.txt` ZIPs plus `llms.txt` folders contain deterministic integrity metadata. SourceShelf validates ordering, identifiers, hashes, provenance, and asset references before writing.

ZIP and `llms.txt` folder workflows run fresh Trust & Safety. Markdown and clipboard workflows keep their immediate behavior. SourceShelf package manifests also let a later import verify that the package contents match the declared inventory; this is integrity checking, not proof of authorship.
