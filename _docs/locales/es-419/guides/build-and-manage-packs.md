# Crear y administrar paquetes

Un paquete es una selección ordenada de fuentes de la Biblioteca. Los paquetes guardados son las colecciones duraderas de SourceShelf y la unidad utilizada para la exportación, comparación y acceso local a IA.

## El espacio de trabajo de Packs

La columna izquierda es un navegador redimensionable de paquetes, la columna central contiene las fuentes del paquete activo y la columna derecha es el inspector de fuentes. En ventanas compactas, el inspector se abre en una hoja para mantener visibles la navegación y las fuentes.

![Un paquete guardado construido a partir de fuentes de demostración sintéticas](../../../assets/images/pack-builder.png)

Usa **Buscar paquetes** para filtrar localmente la lista por nombre sin cambiar los filtros de la Biblioteca. Los resultados conservan el orden guardado. El navegador muestra el número de fuentes, la fecha de actualización, los cambios sin guardar y un estado compacto del acceso local a IA. Los nombres largos se truncan sin mover los controles.

Elige **Nuevo paquete** en el navegador para iniciar un borrador. La columna central tiene dos modos:

- **Contenido** muestra el paquete ordenado, estados de comparación, referencias no disponibles y controles de orden.
- **Agregar fuentes** reutiliza la búsqueda y los filtros locales de la Biblioteca, los controles de membresía y las acciones de adición masiva.

Los borradores nuevos y vacíos se abren en Agregar fuentes. Los paquetes guardados se abren en Contenido.

## Agregar y ordenar fuentes

- Abre **Agregar fuentes** y selecciona el control más o menos junto a una fuente para cambiar su membresía.
- **Agregar coincidencias** añade fuentes legibles que coincidan con los filtros actuales del navegador.
- **Agregar todo lo exportable** agrega todas las fuentes de la Biblioteca legibles.
- **Agregar desde la última exportación** añade fuentes creadas después de la exportación exitosa más reciente del paquete actual.
- Arrastre las fuentes para reordenarlas o use **Subir** y **Mueve hacia abajo** para pedidos accesibles con el teclado.

Exportadores y MCP Las instantáneas reciben las fuentes en el orden que se muestran.

## Estado y acciones del paquete

El encabezado estable muestra el número total de fuentes, la estimación de tokens, la última fecha de guardado, la disponibilidad, el estado de Confianza y Seguridad y el estado preciso del acceso local a IA. **Actual** significa que existe una instantánea MCP autorizada y vigente; **Revisión requerida**, **No compartido** y **Desactivado** describen el estado real.

Las acciones principales permanecen visibles: **Guardar** o **Guardar cambios**, **Actualizar y comparar**, **Confianza y Seguridad** y **Exportar…**. El menú con engrane **Acciones del paquete** contiene **Guardar como…**, **Cambiar nombre del paquete…**, **Acceso local a IA…** y **Eliminar paquete…**.

## Drafteos y ahorros explícitos

Los cambios de paquete son borradores hasta que los seleccione. **guardar** Oregón **Guardar cambios**. SourceShelf restaura el paquete activo, el orden de los paquetes y los metadatos del borrador no guardados después del reinicio, pero la instantánea del borrador nunca contiene contenido Markdown.

Si cambias de paquete o comienzas un nuevo paquete mientras el borrador actual está sucio, SourceShelf ofrece:

- **guardar** para persistir en los cambios actuales y continuar;
- **rechazo** para volver a la membresía guardada y continuar;
- **cancelar** para permanecer en el borrador actual.

Una guardado fallida deja el borrador sucio y cancela el cambio solicitado.

## Guardar como, cambiar de nombre y eliminar

**Guardar como** crea otro paquete guardado. Si el nombre normalizado choca con un paquete existente, SourceShelf pregunta antes de reemplazar cualquier cosa.

Renombrar cambia el nombre del paquete guardado que se usa para los títulos de los paquetes y los metadatos de la colección de manifiestos. Eliminar un paquete guardado no elimina las entradas de la Biblioteca ni los archivos Markdown. Si eliminas el paquete activo, sus contenidos se desprenden en un borrador sucio sin título.

## Referencias faltantes

Las referencias guardadas se mantienen cuando un elemento de la Biblioteca o un archivo Markdown se vuelve inaccesible. El lugar de vacío aún se puede reordenar o eliminar. Trust & Safety reporta la referencia no resuelta como un error, permitiendo la exportación cuando al menos otra fuente sea legible.

## Los paquetes se convierten en "vivos" después de la exportación

Un registro de exportación exitoso registra una línea de base local que contiene el pedido, los hashes, las fechas y el formato de exportación. **Actualizar y comparar** compara el estado actual de la Biblioteca local con esa línea de base. Nunca revisa una página web. URL.

ver [Confianza y seguridad y paquetes de vida](trust-safety-and-refresh.md) para los significados de comparación.
