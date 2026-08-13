# Supported Formats

SourceShelf on Mac detects formats from both the file extension and the macOS content type. iPhone and iPad support the focused local-import set described below.

## Supported local inputs

| Format | Extensions | Main behavior |
| --- | --- | --- |
| PDF | `.pdf` | Extracts text and page structure; uses local OCR for scanned pages. |
| Plain text | `.txt`, `.text` and compatible plain-text types | Preserves readable text. |
| Markdown | `.md`, `.markdown` and compatible types | Preserves Markdown as authoritative source content. |
| HTML | `.html`, `.htm` | Extracts local HTML structure without loading remote resources. |
| Rich Text | `.rtf` | Extracts styled text into Markdown-compatible structure. |
| Images | `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.heic`, `.heif` | Uses local OCR. |
| Microsoft Word | `.docx` | Extracts supported headings, paragraphs, lists, tables, and existing image handling. |
| Microsoft PowerPoint | `.pptx` | Extracts slide boundaries, titles, lists, text, and tables. |
| Microsoft Excel | `.xlsx` | Extracts sheet boundaries and tables. |

The Safari extension also captures web pages, selections, highlights, and multiple tabs from the current window. It can discover and acquire website `llms.txt` collections under Safari’s website permissions. Local `llms.txt` import remains offline and accepts an index plus contained relative `.md`, `.markdown`, and `.txt` links.

## iPhone and iPad

From Safari, SourceShelf captures authorized web pages and imports `llms.txt` research collections. From the Share Sheet, Files, or **Import Research…**, it accepts:

- PDF, including text PDFs and scanned or mixed PDFs using local Vision OCR only where native text is insufficient;
- images decoded by Apple’s image frameworks, including JPEG, PNG, HEIC/HEIF, and TIFF;
- RTF, Markdown, plain text, and standalone `llms.txt`;
- AI Reference Pack ZIP, OKF v0.2 Bundle ZIP, and Portable `llms.txt` Package ZIP exports.

PDF and RTF imports preserve canonical Markdown rather than the original document, matching the Mac conversion policy. An imported image preserves its original bytes in the source’s private assets sidecar, so it remains visible offline; any embedded metadata in those original bytes remains local. Recognized PDF/image text and converted RTF text participate in normal library search.

All conversion and OCR happen on the device. Password-protected PDFs fail cleanly without creating a source. RTFD, Office documents, HTML-file conversion, and folder import remain unsupported on iPhone and iPad. The Share extension deliberately does not register for arbitrary `public.data`; the explicit in-app picker can safely recognize a mislabeled supported file from its signature or actual decodability.

## Not supported directly

Legacy Office `.doc`, `.ppt`, and `.xls` files are detected but not converted. Save them as `.docx`, `.pptx`, or `.xlsx` first.

Current limitations include advanced spreadsheet formula evaluation, PowerPoint animation/media/speaker notes, newly extracted embedded Office media, Word footnotes and tracked revisions, perfect OCR, and complex scanned layout preservation.

## Output formats

All conversions create Markdown. On Mac, packs can produce AI Reference Pack ZIP, OKF v0.2 Bundle ZIP, Markdown Context Pack, Portable `llms.txt` Package ZIP, `llms.txt` Collection Folder, or clipboard Markdown. On iPhone and iPad, packs can produce AI Reference Pack ZIP, OKF v0.2 Bundle ZIP, or Portable `llms.txt` Package ZIP through the system share sheet.
