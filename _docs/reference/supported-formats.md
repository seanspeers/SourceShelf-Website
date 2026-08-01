# Supported Formats

SourceShelf detects formats from both the file extension and the macOS content type.

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

The Safari extension also captures web pages and selections. Local `llms.txt` import accepts an index plus contained relative `.md`, `.markdown`, and `.txt` links.

## Not supported directly

Legacy Office `.doc`, `.ppt`, and `.xls` files are detected but not converted. Save them as `.docx`, `.pptx`, or `.xlsx` first.

Current limitations include advanced spreadsheet formula evaluation, PowerPoint animation/media/speaker notes, newly extracted embedded Office media, Word footnotes and tracked revisions, perfect OCR, and complex scanned layout preservation.

## Output formats

All conversions create Markdown. Packs can produce AI Reference Pack ZIP, OKF v0.2 Bundle ZIP, Markdown Context Pack, `llms.txt` Collection Folder, or clipboard Markdown.
