# Import and Export llms.txt

SourceShelf supports the current `llms.txt` v2 shape for both local-file import and website acquisition from Safari. Local-file import remains offline. Website import fetches only through the Safari extension under explicit Safari website permissions; the native app remains network-isolated.

## Import a website from Safari

On an HTTP(S) page, open SourceShelf and choose **Research > Import via llms.txt**. SourceShelf discovers the index, previews its ordered sections and entries, marks external origins that need access, and lets you select resources before choosing one new or existing pack.

Safari may show a website-access prompt when you first open the SourceShelf extension. Additional origins listed by the collection can require separate access. Safari remains the source of truth for those permissions; if access is denied, change it in Safari’s extension settings and reopen the review.

The imported `llms.txt` index is saved as the first source. Selected resources follow in listed order. A resource failure does not discard successful siblings, and no empty pack is created.

## Website discovery order

SourceShelf checks discovery evidence in this order and deduplicates normalized URLs:

1. an HTML `<link rel="describedby" href="…/llms.txt">` declaration;
2. an HTTP `Link` header with `rel="describedby"`;
3. the most-specific `llms.txt` path for the current URL, walking outward to the site root;
4. root `/llms.txt`.

Relative discovery links resolve against the page URL. The first valid `text/plain` or Markdown-like response with a parseable H1 wins. Discovery is bounded to 12 candidates, five redirect hops, 8 MiB per response, and a 20-second request timeout.

## Website content selection and provenance

For each selected entry, SourceShelf prefers an explicit `rel="alternate"` Markdown representation from HTML or HTTP `Link` metadata. It then tries the common `page.html.md` and `page.md` variants before falling back to HTML extraction. This alternate-representation logic is intentionally limited to the `llms.txt` workflow; single-page quick capture remains unchanged.

Only entries explicitly listed in the discovered index are eligible. SourceShelf does not crawl ordinary page links. It archives only images actually referenced by the selected Markdown, subject to access and size limits.

History records keep the listed human-facing URL, the representation URL actually fetched, the discovery method, and the originating `llms.txt` URL as web-acquisition provenance. That record is separate from portable-package provenance and never claims package-integrity verification.

## Website limits and cancellation

The review is capped at 1,000 listed entries and flags larger indexes as limited. Acquisition uses at most three concurrent resources, at most 100 images per source, and at most 256 MiB of staged data per operation. Unsupported schemes, unsafe redirects, permission failures, timeouts, oversized responses, parse failures, and extraction failures are reported per resource.

Canceling aborts outstanding extension requests and removes temporary staged data. Work already handed to the native local processor may finish, but remote acquisition does not continue in the native app.

## Native network isolation

The SourceShelf native app has no outbound-network entitlement for this feature and does not use `URLSession` for Safari or website `llms.txt` acquisition. The extension performs permission-gated fetching, Markdown selection, and asset staging, then sends bounded local handoffs through native messaging and the App Group. Local conversion, history, pack creation, output-folder authorization, and persistence stay native.

## Import a collection

Choose **File > Import Research Pack…** or use the action in **Convert**. For a standalone local collection, select either:

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

The H1 is the only required element. A blockquote summary, freeform details, H2 sections, link descriptions, and `## Optional` are optional and remain omitted when absent. Export does not fabricate those fields.

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
