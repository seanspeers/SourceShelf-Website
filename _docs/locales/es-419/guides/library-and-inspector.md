# Biblioteca e inspector

La Biblioteca es el navegador de fuentes. Está deliberadamente separada de los Paquetes: filtrar la Biblioteca nunca abre, reordena ni cambia un paquete guardado. SourceShelf conserva las entradas de la Biblioteca hasta que las eliminas explícitamente; no descarta automáticamente las fuentes más antiguas.

![Archivos sintéticos mostrados en la Biblioteca](../../../assets/images/library.png)

## Búsqueda y filtros

Busca coincidencias con detalles de la fuente como títulos y orígenes. Los filtros pueden restringir la Biblioteca por:

1. buscar texto;
2. fecha;
3. origen de la fuente;
4. tipo de contenido;
5. estado de disponibilidad;
6. membresía de paquete guardado.

Los filtros activos aparecen como chips extraíbles en ese orden. Eliminar un chip solo restablece ese filtro. **Restablecer todo** limpia todos los filtros activos.

## Estado de la fuente

- Un estado verde indica Markdown legible.
- Un aviso llama la atención sobre un problema con una fuente o un activo archivado.
- Una fuente no disponible permanece en la Biblioteca cuando su Markdown no se puede leer actualmente.
- Un lugar de almacenamiento para paquetes guardados permanece visible incluso si falta su registro en la Biblioteca, por lo que aún se puede volver a ordenar o eliminar.

SourceShelf omite intencionalmente una etiqueta repetida de "Exportable" de las filas sanas. Selecciona el artículo o inspíralo para verificar su estado cuando necesites detalles.

## Acciones de fila

Cuando la ventana es lo suficientemente ancha, las filas de la Biblioteca muestran iconos de acción individuales con herramientas de ayuda. En menos espacio, las mismas acciones se mueven a un menú. Dependiendo del elemento, las acciones incluyen:

- Mostrar detalles;
- Agregar o eliminar del paquete actual;
- Abrir Markdown;
- Revelar en Finder;
- Copiar ruta;
- Estrella o desestrella;
- Eliminar de la Biblioteca.

Eliminar un elemento de la Biblioteca no elimina su Markdown generado. Las referencias de paquetes guardados permanecen como espacios en blanco.

## investigador

En tamaños de ventana más amplios, el inspector es una tercera columna escalable. Cerca del ancho mínimo de la ventana, se abre como una hoja para que las columnas de construcción de paquetes de la Biblioteca o ambas sigan siendo utilizables.

![Vista previa renderizada de Markdown para un informe sintético](../../../assets/images/inspector-preview.png)

El inspector muestra:

- título completo y procedencia;
- fechas de captura y modificación;
- rutas de origen y salida locales;
- disponibilidad actual y advertencias;
- cantidad estimada de tokens y imágenes archivadas;
- Acciones de Abrir, Revelar y Copiar;
- **tráiler** y **Fuente Markdown** pestañas.

La vista previa lee como máximo 256 KiB del archivo Markdown local. Solo quita los YAML iniciales antes de renderizar, conserva los espacios y la estructura de bloques, y no busca imágenes o otros recursos remotos. La pestaña de origen preserva el YAML y el texto Markdown exacto. Un aviso de truncamiento enlaza a **Abrir Markdown** cuando el archivo es más grande.

## mantenimiento

El menú de mantenimiento de la Biblioteca puede eliminar entradas faltantes o borrar el historial sin marcar. Estas acciones operan sobre los registros de la Biblioteca, no sobre los archivos Markdown generados.

Para limpiar el almacenamiento, abra **Configuración > General > Revisar almacenamiento...**. Cleanup Safe se limita a datos gestionados huérfanos, cachés obsoletos, etapas de captura caducadas y revocadas. MCP instantáneas. La limpieza generada de Markdown requiere seleccionar las fuentes afectadas y confirmar; la salida se mueve a la papelera, mientras que los documentos importados originales nunca se tocan. Las fuentes con estrellas y guardadas se bloquean a menos que habilites deliberadamente la selección de fuentes protegidas. ver [Administrar el almacenamiento de SourceShelf](storage-management.md) para una guía detallada.
