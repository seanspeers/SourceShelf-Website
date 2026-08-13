# Formatos compatibles

En Mac, SourceShelf detecta formatos por la extensión del archivo y el tipo de contenido de macOS. El iPhone y el iPad admiten el conjunto específico de importación local que se describe a continuación.

## Entradas locales apoyadas

| formato | Extensión | Comportamiento principal |
| --- | --- | --- |
| PDF | `.pdf` | Extrae el texto y la estructura de la página; utiliza OCR local para páginas escaneadas. |
| Texto simple | `.txt`, `.text` y tipos de texto plano compatibles | Preserva el texto legible. |
| rebaja | `.md`, `.markdown` y tipos compatibles | Preserva Markdown como contenido fuente autorizado. |
| HTML | `.html`, `.htm` | Extrae la estructura HTML local sin cargar recursos remotos. |
| Texto enriquecido | `.rtf` | Extrae texto estilizado en una estructura compatible con Markdown. |
| Imágenes | `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.heic`, `.heif` | Utiliza OCR local. |
| Microsoft Word | `.docx` | Extrae encabezados, párrafos, listas, tablas y manejo de imágenes existentes soportados. |
| Microsoft PowerPoint | `.pptx` | Extrae los límites de las diapositivas, títulos, listas, texto y tablas. |
| Microsoft Excel | `.xlsx` | Extrae los límites de las hojas y las tablas. |

La extensión de Safari también captura páginas web, selecciones, fragmentos resaltados y varias pestañas de la ventana actual. Puede descubrir y adquirir colecciones `llms.txt` de sitios web conforme a los permisos de Safari. La importación de un archivo `llms.txt` local permanece sin conexión y acepta un índice con enlaces relativos a archivos `.md`, `.markdown` y `.txt` incluidos.

## iPhone y iPad

Desde Safari, SourceShelf captura páginas web autorizadas e importa colecciones de investigación `llms.txt`. Desde la hoja para compartir, Archivos o **Importar investigación…**, acepta:

- PDF con texto, escaneados o mixtos, con OCR local de Vision solo cuando el texto nativo es insuficiente;
- imágenes que pueden decodificar los frameworks de Apple, como JPEG, PNG, HEIC/HEIF y TIFF;
- RTF, Markdown, texto simple y `llms.txt` independiente;
- exportaciones ZIP de Paquete de referencia de IA, Bundle OKF v0.2 y Paquete `llms.txt` portátil.

Las importaciones de PDF y RTF conservan Markdown canónico en vez del documento original, igual que la conversión en Mac. Una imagen importada conserva sus bytes originales en los recursos privados de la fuente para que siga visible sin conexión; cualquier metadato incrustado permanece local. El texto reconocido o convertido participa en la búsqueda normal de la biblioteca.

Toda la conversión y el OCR ocurren en el dispositivo. Los PDF protegidos con contraseña fallan claramente sin crear una fuente. RTFD, documentos de Office, conversión de archivos HTML e importación de carpetas no son compatibles con iPhone ni iPad. La extensión para compartir no se registra para el tipo genérico `public.data`; el selector explícito de la app puede reconocer de forma segura un archivo compatible mal etiquetado por su firma o capacidad real de decodificación.

## No se admite directamente

Oficina Legacy `.doc`, `.ppt`, y `.xls` se detectan archivos pero no se convierten. Guárdalos como `.docx`, `.pptx`, o `.xlsx` primero.

Las limitaciones actuales incluyen la evaluación avanzada de fórmulas de hojas de cálculo, animaciones/medios/notas de presentaciones de PowerPoint, medios embebidos de Office recién extraídos, notas al pie de página de Word y revisiones rastreadas, OCR perfecto y la preservación de diseños complejos escaneados.

## Formatos de salida

Todas las conversiones crean Markdown. En Mac, los paquetes pueden producir ZIP de Paquete de referencia de IA, ZIP de Bundle OKF v0.2, Paquete de contexto Markdown, ZIP de Paquete `llms.txt` portátil, Carpeta de colección `llms.txt` o Markdown en el portapapeles. En iPhone y iPad, pueden producir ZIP de Paquete de referencia de IA, ZIP de Bundle OKF v0.2 o ZIP de Paquete `llms.txt` portátil mediante la hoja para compartir del sistema.
