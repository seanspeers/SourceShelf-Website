# Import and Export llms.txt

SourceShelf’s `llms.txt` support is experimental and deliberately offline. It can import a local index and generate a portable collection folder, but it never fetches links from the internet.

## Import a collection

Choose **File > Import llms.txt…** or use the action in **Convert**. Select either:

- an `llms.txt` file; or
- a folder containing `llms.txt`.

Choose the folder when the index contains local document links. That gives SourceShelf a safe root against which to resolve them.

## What the parser accepts

An index must contain one H1 title. It may also contain:

- an optional blockquote summary;
- detail prose;
- ordered H2 sections;
- Markdown link-list entries with descriptions;
- a special `## Optional` section.

An optional byte-order mark is accepted. Malformed optional entries are reported as warnings.

## Local-link safety

SourceShelf resolves only relative `.md`, `.markdown`, and `.txt` links contained beneath the selected root. It rejects:

- `..` traversal;
- absolute local paths;
- symlinks that escape the root;
- unsupported URL schemes.

HTTP(S) links become named unavailable Library references. Their titles, descriptions, and provenance remain visible, but SourceShelf does not fetch them. Repeated targets are deduplicated by normalized identity, preserving the first occurrence.

The imported index is the first readable Library item. Local documents follow in index order. SourceShelf creates a saved pack named from the H1 and offers replace, save-as, or cancel behavior for a normalized-name collision.

## Generate a collection folder

Open a clean saved pack, choose **Export… > llms.txt Collection Folder**, pass Trust & Safety, and select a parent folder. SourceShelf creates a collision-safe `<pack-name>-llms` folder:

```text
<pack-name>-llms/
├── llms.txt
├── documents/
│   └── ordered-source.md
├── assets/
│   └── referenced-image.png
├── sourceshelf-manifest.json
└── checksums.sha256
```

The root index contains the pack title, an untrusted-content summary, ordered `## Sources` links, and `## Optional` entries for unavailable sources with valid web provenance. Document image links are rewritten to copied files in `assets/`.

Only archived images actually referenced by readable Markdown are included. Unreadable entries without valid web provenance are omitted and reported after generation.

SourceShelf does not generate `llms-full.txt`, retrieval chunks, embeddings, or remote downloads for this format.
