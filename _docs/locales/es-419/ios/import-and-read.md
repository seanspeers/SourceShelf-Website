# Importar y leer documentos en iPhone y iPad

SourceShelf convierte documentos locales compatibles en Markdown canónico dentro de su biblioteca privada en el dispositivo. La conversión, el OCR, la indexación y la lectura no cargan tus documentos a ningún servidor.

## Importar desde Archivos

Abre el menú **Más** de la barra lateral o **Configuración > Importar y exportar** y luego selecciona **Importar investigación…**. Puedes elegir varios archivos compatibles. SourceShelf muestra el progreso de las tareas más largas y ofrece **Cancelar** durante una importación activa.

Las entradas locales compatibles son:

- PDF;
- JPEG, PNG, HEIC/HEIF, TIFF y otras imágenes que los frameworks de Apple puedan decodificar;
- RTF;
- Markdown y texto simple, incluido un archivo `llms.txt` independiente;
- ZIP de Paquete de referencia de IA, ZIP de Bundle OKF v0.2 y ZIP de Paquete `llms.txt` portátil.

## Importar desde la hoja para compartir

En Archivos, Fotos, Safari u otra app, abre **Compartir** y elige SourceShelf para un documento compatible. La extensión ligera para compartir copia el archivo autorizado en una bandeja local limitada. La app principal de SourceShelf realiza la conversión y guarda la fuente en la biblioteca.

Si SourceShelf no aparece, usa **Más** en la hoja para compartir para activarlo, o guarda el archivo en Archivos y usa **Importar investigación…**.

## Reconocimiento de PDF e imágenes

En los PDF, SourceShelf usa el texto seleccionable cuando resulta útil y aplica OCR local de Vision solo a las páginas que lo necesitan. El orden de las páginas se conserva. Los PDF protegidos con contraseña, dañados, demasiado grandes o no compatibles fallan sin crear una fuente completa.

Para una imagen importada, SourceShelf conserva los bytes originales en el directorio privado de recursos de esa fuente y agrega el texto reconocido cuando está disponible. Así, la imagen se presenta sin conexión y el texto reconocido participa en la búsqueda de la Biblioteca. Los metadatos incrustados en la imagen original permanecen locales, salvo que después exportes un paquete que incluya ese recurso.

La conversión de RTF conserva párrafos legibles, énfasis básico, enlaces seguros, listas simples y archivos de imagen adjuntos compatibles. RTFD no es compatible.

## Buscar y filtrar

La búsqueda funciona sobre el contenido ya indexado en la biblioteca local. Selecciona **Toda la investigación**, **Favoritos** o un paquete antes de buscar para limitar el contexto. Usa Filtrar para limitar las fuentes por disponibilidad o tipo de adquisición y Ordenar para cambiar el orden visible.

## Usar el Lector

El Lector muestra el título, tipo, fecha, enlace seguro al sitio web original cuando está disponible, procedencia, notas de disponibilidad, contenido Markdown e imágenes archivadas localmente. El texto se puede seleccionar. Los enlaces web y de correo se abren mediante una acción del sistema solo después de tocarlos.

SourceShelf no ejecuta scripts, carga rutas de archivos arbitrarias ni obtiene imágenes remotas en el Lector. Una imagen local no disponible se muestra como no disponible en vez de descargarse.

## Limitaciones actuales

En la versión 1.0.2, iPhone y iPad no importan RTFD, documentos de Office, archivos HTML locales ni carpetas. Usa SourceShelf en Mac para convertir DOCX, PPTX, XLSX, HTML o lotes de carpetas y luego exporta un paquete portátil si deseas tener el resultado en iPhone o iPad.
