# Import and Read Documents on iPhone and iPad

SourceShelf converts supported local documents into canonical Markdown in its private on-device library. Conversion, OCR, indexing, and reading do not upload your documents.

## Import from Files

Open the sidebar’s **More** menu or **Settings > Import & Export**, then choose **Import Research…**. You can select multiple supported files. SourceShelf shows progress for longer work and provides **Cancel** while an import is active.

Supported local inputs are:

- PDF;
- JPEG, PNG, HEIC/HEIF, TIFF, and other images Apple’s image frameworks can decode;
- RTF;
- Markdown and plain text, including standalone `llms.txt`;
- AI Reference Pack ZIP, OKF v0.2 Bundle ZIP, and Portable `llms.txt` Package ZIP.

## Import from the Share Sheet

In Files, Photos, Safari, or another app, open **Share** and choose SourceShelf for a supported document. The lightweight Share extension copies the authorized file into a bounded local inbox. The containing SourceShelf app performs the conversion and commits the source to the library.

If SourceShelf does not appear, use **More** in the Share Sheet to enable it, or save the file to Files and use **Import Research…**.

## PDF and image recognition

For PDFs, SourceShelf uses selectable text where it is meaningful and applies local Vision OCR only to pages that need it. Pages retain their order. Password-protected, malformed, oversized, or unsupported PDFs fail without creating a completed source.

For an imported image, SourceShelf keeps the original image bytes in that source’s private assets directory and adds recognized text when available. This lets the image render offline and lets recognized text participate in Library search. Embedded metadata in the original image remains local unless you later export a package containing that asset.

RTF conversion preserves readable paragraphs, basic emphasis, safe links, simple lists, and supported image attachments. RTFD is not supported.

## Search and filter

Search operates on content already indexed in the local library. Select **All Research**, **Starred**, or a pack before searching to limit the context. Use Filter to narrow sources by availability or acquisition type and Sort to change the visible order.

## Use the Reader

The Reader displays the source title, type, date, safe original website link when available, provenance, availability notes, Markdown content, and locally archived images. Text can be selected. Web and mail links open through a system action only after you tap them.

SourceShelf does not execute scripts, load arbitrary file paths, or fetch remote images in the Reader. An unavailable local image is shown as unavailable rather than downloaded.

## Current limitations

In 1.0.2, iPhone and iPad do not import RTFD, Office documents, local HTML files, or folders. Use SourceShelf on Mac to convert DOCX, PPTX, XLSX, HTML, or folder batches, then export a portable pack if you want the resulting research on iPhone or iPad.
