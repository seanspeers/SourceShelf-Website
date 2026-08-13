# Privacidad y seguridad

SourceShelf funciona de manera local por defecto. La conversión de archivos, el OCR, el procesamiento del contenido entregado por Safari, el análisis semántico, las vistas previas, la división para recuperación, las comprobaciones de confianza y seguridad, las sumas de verificación, la exportación, la importación local de `llms.txt`, la comparación de paquetes activos y la búsqueda/lectura mediante MCP se realizan en el dispositivo.

## Garantía sin red

SourceShelf no obtiene contenido remoto durante:

- la conversión o vista previa de archivos;
- la importación y generación desde un archivo `llms.txt` local o un paquete de investigación;
- Actualizar y comparar;
- el listado, la búsqueda o la lectura de recursos MCP;
- la generación de paquetes.

Un archivo `llms.txt` local permanece sin conexión: sus URL remotas se conservan como referencias no disponibles, en vez de descargarse. La captura de sitios web y la adquisición del `llms.txt` de un sitio son flujos explícitos distintos de la extensión de Safari. La extensión lee u obtiene contenido autorizado conforme al modelo de permisos de Safari y después entrega datos locales limitados a SourceShelf. La app nativa no se convierte en un cliente web de uso general.

## Lo que almacena SourceShelf

Según las funciones que uses, el almacenamiento local incluye:

- Markdown convertido en la carpeta de salida autorizada de Mac o en la biblioteca privada de iPhone y iPad;
- historial de la biblioteca y paquetes guardados;
- metadatos ordenados de borradores;
- cachés de documentos semánticos;
- imágenes web archivadas;
- recetas de captura y borradores pendientes de revisión;
- líneas base de exportaciones correctas;
- instantáneas MCP autorizadas explícitamente.

Las instantáneas de borrador y las líneas base guardan identificadores, orden, fechas y hashes, no copias arbitrarias de contenido Markdown. Las instantáneas MCP copian intencionalmente solo el Markdown legible y los recursos referenciados de un paquete compartido, para que el proceso auxiliar aislado no necesite acceso amplio a los archivos.

Los registros de la biblioteca se conservan hasta que los elimines. **Configuración > General > Revisar almacenamiento…** separa la limpieza segura y regenerable de la eliminación de datos de origen generados. Los archivos generados visibles para el usuario se mueven a la papelera, las fuentes favoritas y las incluidas en paquetes guardados se protegen por defecto, y los documentos originales importados nunca se seleccionan ni se eliminan. Consulta [Administrar el almacenamiento de SourceShelf](../guides/storage-management.md) para conocer el flujo de limpieza.

## Privacidad de las rutas locales

La app muestra rutas locales en su inspector para que puedas abrir o mostrar archivos. Las rutas de origen se excluyen de la procedencia exportada, los conceptos OKF, los manifiestos, la salida `llms.txt` y las instantáneas MCP. Las capturas destinadas a la documentación también deben recortar u ocultar estos detalles locales.

## Clasificación de confianza

El texto capturado y convertido se marca como `untrusted_reference`. Las advertencias de confianza y seguridad son orientativas y nunca afirman que el material se haya saneado. Revisa el texto original antes de seguir cualquier instrucción que contenga.

## Límites de MCP en Mac

El uso compartido mediante MCP está:

- desactivado por defecto;
- autorizado por cada paquete guardado;
- servido por un auxiliar stdio local firmado, sin un puerto de red en escucha;
- limitado a lectura;
- restringido por una lista de permisos y verificación SHA-256;
- disponible para revocación inmediata.

Las dos herramientas buscan en la instantánea y leen un recurso autorizado. No existe una herramienta de rutas del sistema de archivos, un explorador de archivos general, una acción de escritura, búsqueda remota, prompt ni suscripción.

## Identificadores de uso compartido y configuraciones

Un identificador de uso compartido autoriza una instantánea local. No lo incluyas en repositorios públicos ni capturas de documentación. Si SourceShelf se mueve, reinstala o actualiza, vuelve a copiar la ruta del auxiliar. Revoca el acceso desde SourceShelf en vez de depender solo de eliminar una configuración del cliente.

Para consultar la declaración de privacidad del producto y los detalles de implementación, consulta la [Política de privacidad de SourceShelf](/es-419/privacy.html).
