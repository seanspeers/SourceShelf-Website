# Formatos compatibles

SourceShelf detecta los formatos a partir de la extensión del archivo y del tipo de contenido de macOS.

## Entradas locales compatibles

| Formato | Extensiones | Comportamiento principal |
| --- | --- | --- |
| PDF | `.pdf` | Extrae el texto y la estructura de las páginas y usa OCR local para las páginas escaneadas. |
| Texto sin formato | `.txt`, `.text` y tipos de texto sin formato compatibles | Conserva el texto legible. |
| Markdown | `.md`, `.markdown` y tipos compatibles | Conserva el Markdown como contenido fuente de referencia. |
| HTML | `.html`, `.htm` | Extrae la estructura HTML local sin cargar recursos remotos. |
| Texto enriquecido | `.rtf` | Extrae el texto con formato en una estructura compatible con Markdown. |
| Imágenes | `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.heic`, `.heif` | Usa OCR local. |
| Microsoft Word | `.docx` | Extrae los títulos, párrafos, listas y tablas compatibles, además de las imágenes admitidas. |
| Microsoft PowerPoint | `.pptx` | Extrae los límites de las diapositivas, títulos, listas, texto y tablas. |
| Microsoft Excel | `.xlsx` | Extrae los límites de las hojas y las tablas. |

La extensión de Safari también captura páginas web y selecciones. La importación local de `llms.txt` acepta un índice acompañado de enlaces relativos a archivos `.md`, `.markdown` y `.txt`.

## Formatos que no se admiten directamente

Los archivos antiguos de Office `.doc`, `.ppt` y `.xls` se detectan, pero no se convierten. Primero guárdalos como `.docx`, `.pptx` o `.xlsx`.

Las limitaciones actuales incluyen la evaluación avanzada de fórmulas de hojas de cálculo, las animaciones, los archivos multimedia y las notas del presentador de PowerPoint, los nuevos archivos multimedia de Office incrustados, las notas al pie y el control de cambios de Word, la precisión del OCR y la conservación de diseños escaneados complejos.

## Formatos de salida

Todas las conversiones crean Markdown. Los paquetes pueden generar un ZIP de paquete de referencia para IA, un paquete OKF v0.2, un paquete de contexto Markdown, una carpeta de colección `llms.txt` o Markdown copiado al portapapeles.
