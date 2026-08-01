# Convertir archivos y carpetas

SourceShelf convierte documentos locales compatibles a Markdown sin cargarlos ni realizar solicitudes de red.

## Formas de iniciar una conversión

- Arrastre archivos o carpetas a **convertir**.
- seleccionar **Seleccionar archivos** Oregón **Seleccionar carpeta**.
- uso **Archivo > Abrir** para archivos.
- uso **Archivo > Importar llms.txt...** para un local `llms.txt` carpeta de índice o colección.
- Utilice la acción de Atajos de SourceShelf para una conversión automática de archivos.

Al convertir una carpeta, SourceShelf escanea los archivos compatibles que contiene y reporta los elementos omitidos. La conversión de carpeta no convierte la carpeta en sí misma en un paquete guardado; agrega los elementos de la Biblioteca resultantes a un paquete después.

## Qué se conserva

SourceShelf construye un documento semántico antes de renderizar el nuevo Markdown. Dependiendo de la fuente, puede conservar encabezados, párrafos, listas, tablas, código, imágenes, títulos, límites de diapositivas o páginas y contenido de respaldo bruto.

Para PDFs y imágenes escaneadas, SourceShelf utiliza OCR local. El reconocimiento de documentos estructurados se utiliza cuando está disponible en la versión de macOS instalada; los sistemas más antiguos utilizan el camino de OCR de compatibilidad.

## Nombres de salida y colisiones

Los nombres generados se sanitizan para el sistema de archivos. Si el destino ya contiene el mismo nombre, SourceShelf elige un nombre seguro contra colisiones en lugar de sobrescribirlo silenciosamente.

Los rutas de archivos de origen se mantienen para las acciones locales de Abrir y Revelar de Open, pero no se colocan en los manifiestos exportados. MCP instantáneas, o la procedencia generada para las conversiones de archivos.

## Cache semántico

Para artículos gestionados, los almacenes SourceShelf `semantic-document.json` en el directorio privado y administrado del elemento. Incluye el márgen de error exacto en bytes de Markdown utilizado para decidir si la caché aún es válida.

Si editas el Markdown en otra aplicación, SourceShelf detecta el cambio de la suma de verificación y lo vuelve a analizar cuando sea necesario. No reescribe tu archivo editado. Una caché semántica faltante o dañada no bloquea el proceso.

## Si una conversión falla

1. Confirme que la fuente aún existe y se puede abrir en su aplicación normal.
2. Confirme que la carpeta de salida está disponible en **Configuración > General**.
3. Pruebe un archivo individual en lugar de una carpeta completa para aislar el formato.
4. Para una escanear, verifique que la página esté en posición vertical y tenga suficiente contraste para OCR.
5. Compruebe si el tipo de archivo aparece en [Formatos compatibles](../reference/supported-formats.md).
