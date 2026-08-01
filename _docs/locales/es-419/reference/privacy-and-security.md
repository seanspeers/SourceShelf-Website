# Privacidad y seguridad

SourceShelf es local por defecto. Conversión de archivos, OCR, procesamiento de captura web, análisis semántico, vistas previas, agrupación de recuperación, Confianza y Seguridad, comprobaciones de suma, exportación. `llms.txt` importación, comparación de paquetes de vida y MCP buscar/leer funciona en este Mac.

## Garantía sin red

SourceShelf no recupera contenido remoto durante:

- conversión de archivos o vista previa;
- `llms.txt` importación o generación;
- Actualizar y comparar;
- MCP lista de recursos, búsqueda o lectura;
- generación de paquetes.

Una captura de Safari recibe contenido de la página que ya está visualizando a través de la extensión habilitada. a distancia URLse encuentra en local `llms.txt` se retienen como referencias no disponibles en lugar de ser recuperadas.

## Qué tiendas de SourceShelf almacenan

Dependiendo de las funciones que uses, el almacenamiento local incluye:

- convertido Markdown en la carpeta de salida;
- Historia de la biblioteca y paquetes guardados;
- ordenado borrador de metadatos;
- cache de documentos semánticos;
- imágenes web archivadas;
- capturar recetas y borradores de reseñas en cola;
- líneas de base de exportación exitosas;
- explicitamente autorizado MCP instantáneas.

Las instantáneas de borrador y las bases de datos almacenan identificadores, orden, fechas y hashes, no copias de contenido Markdown arbitrario. MCP Las instantáneas copian intencionalmente solo el Markdown legible y los recursos referenciados de un paquete compartido para que el asistente en la caja de arena no necesite acceso general a los archivos.

Los registros de la biblioteca se conservan hasta que los elimines. **Configuración > General > Revisar almacenamiento...** Separa la limpieza segura y regenerable de la eliminación de los datos de origen generados. La salida generada visible al usuario se mueve a la papelera, las fuentes con estrellas y guardadas se protegen por defecto, y los documentos importados originales nunca se seleccionan ni eliminan. ver [Administrar el almacenamiento de SourceShelf](../guides/storage-management.md) para el flujo de trabajo de limpieza.

## Privacidad del camino local

La aplicación muestra los caminos locales en su propio inspector para que puedas abrir o revelar archivos. Los caminos de origen de los archivos están excluidos de la proveniencia exportada, los conceptos OKF, los manifiestos, `llms.txt` salida, y MCP instantáneas. La documentación de capturas de pantalla también debe recortar o ocultar estos detalles exclusivos de localización.

## Clasificación de confianza

El texto capturado y convertido está marcado `untrusted_reference`. y las advertencias de Confianza y Seguridad son de carácter orientativo y nunca afirman que el material haya sido desinfectado. Revisa el texto original antes de seguir cualquier instrucción que contenga.

## MCP límites

MCP compartir es:

- desactivado por defecto;
- autorizado por paquete guardado;
- servido por un asistente local de stdio firmado sin oyente de red;
- solo lectura;
- restringido por una lista de permiso y SHA-256 verificación;
- immediatamente revocable.

Las dos herramientas buscan en la instantánea y leen un recurso que está en la lista de permisos. No hay una herramienta de ruta de sistema de archivos, un navegador de archivos general, una acción de escritura, una búsqueda remota, un mensaje de error o una suscripción.

## Compartir identificaciones y configuraciones

Una identificación de partición autoriza una instantánea local. Manténla alejada de repositorios públicos y capturas de pantalla de documentación. Si SourceShelf se mueve, se reinstala o se actualiza, copia de nuevo el camino auxiliar. Revoca el acceso de SourceShelf en lugar de depender únicamente de eliminar una configuración del cliente.

Para consultar la declaración de privacidad del producto, visita la [Política de privacidad de SourceShelf](/es-419/privacy.html).
