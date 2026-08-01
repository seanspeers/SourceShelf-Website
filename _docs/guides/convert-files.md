# Convert Files and Folders

SourceShelf converts supported local documents to Markdown without uploading them or making network requests.

## Ways to start a conversion

- Drag files or folders into **Convert**.
- Select **Select Files** or **Select Folder**.
- Use **File > Open** for files.
- Use **File > Import llms.txt…** for a local `llms.txt` index or collection folder.
- Use the SourceShelf Shortcuts action for an automated file conversion.

When converting a folder, SourceShelf scans supported files inside it and reports skipped items. Folder conversion does not turn the folder itself into a saved pack; add the resulting Library items to a pack afterward.

## What is preserved

SourceShelf builds a semantic document before it renders new Markdown. Depending on the source, it can preserve headings, paragraphs, lists, tables, code, images, captions, slide or page boundaries, and raw fallback content.

For scanned PDFs and images, SourceShelf uses local OCR. Structured document recognition is used when available on the installed macOS version; older systems use the compatibility OCR path.

## Output names and collisions

Generated names are sanitized for the file system. If the destination already contains the same name, SourceShelf chooses a collision-safe name instead of silently overwriting it.

Source file paths are kept for local Open and Reveal actions, but are not placed in exported manifests, MCP snapshots, or generated provenance for file conversions.

## Semantic cache

For managed items, SourceShelf stores `semantic-document.json` in the item’s private managed directory. It includes the exact Markdown-byte checksum used to decide whether the cache is still valid.

If you edit the Markdown in another application, SourceShelf detects the checksum change and reparses it when needed. It does not rewrite your edited file. A missing or damaged semantic cache is nonblocking.

## If a conversion fails

1. Confirm the source still exists and can be opened in its normal application.
2. Confirm the output folder is available in **Settings > General**.
3. Try a single file rather than a whole folder to isolate the format.
4. For a scan, verify the page is upright and has enough contrast for OCR.
5. Check whether the file type appears in [Supported formats](../reference/supported-formats.md).
