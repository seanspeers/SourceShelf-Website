# Crear y administrar paquetes

Un paquete es una selección ordenada de fuentes de la Biblioteca. Los paquetes guardados son las colecciones duraderas de SourceShelf y la unidad utilizada para la exportación, comparación y acceso local a IA.

## El espacio de trabajo de Packs

La columna izquierda es un navegador de biblioteca compacto. La columna central es el paquete ordenado. En ventanas de mayor ancho, el inspector aparece como una tercera columna; en anchos compactos se abre en una hoja.

![Un paquete guardado construido a partir de fuentes de demostración sintéticas](../../../assets/images/pack-builder.png)

Utilice el encabezado para seleccionar un paquete guardado, iniciar uno nuevo, guardar cambios, guardar con un nombre diferente, renombrarlo o eliminarlo.

## Agregar y ordenar fuentes

- Seleccione el control más o menos junto a una fuente para cambiar la membresía.
- **Agregar coincidencias** añade fuentes legibles que coincidan con los filtros actuales del navegador.
- **Agregar todo lo exportable** agrega todas las fuentes de la Biblioteca legibles.
- **Agregar desde la última exportación** añade fuentes creadas después de la exportación exitosa más reciente del paquete actual.
- Arrastre las fuentes para reordenarlas o use **Subir** y **Mueve hacia abajo** para pedidos accesibles con el teclado.

Exportadores y MCP Las instantáneas reciben las fuentes en el orden que se muestran.

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
