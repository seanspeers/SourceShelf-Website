# Administrar el almacenamiento de SourceShelf

SourceShelf guarda las fuentes de la Biblioteca hasta que decides eliminarlas. No hay límite por edad ni de 500 fuentes, así que las investigaciones más antiguas, las fuentes destacadas y los miembros de los paquetes guardados no desaparecen en silencio.

uso **SourceShelf > Configuración > General > Revisar almacenamiento...** para ver qué está usando SourceShelf y elegir qué, si es que algo, eliminar.

## Entender el resumen de almacenamiento

El inventario resumido incluye los datos gestionados por SourceShelf y generados por SourceShelf, incluyendo:

- generado Markdown en la carpeta de salida;
- carpetas de imágenes creadas junto a Markdown generado;
- administró copias de la biblioteca e imágenes archivadas;
- cachés semánticos utilizados para vistas previas, fragmentación y comparación;
- Instantáneas de acceso local a IA;
- Revisión de borradores de captura de Safari y datos de ensayo.

El resumen no trata los documentos importados originales como almacenamiento de SourceShelf. Los archivos de origen como el PDF, el documento de Word o la hoja de cálculo que convirtiste nunca son objetivos de limpieza.

seleccionar **actualizar** después de convertir, capturar, exportar o eliminar datos si desea recalcular los totales mientras la ventana está abierta.

## Ejecutar limpieza segura

**Limpieza segura** elimina solo los datos internos que están huérfanos, obsoletos, vencidos o ya no están autorizados:

- copias gestionadas que ya no pertenecen a una fuente de biblioteca;
- cachés semánticos que ya no coinciden con su Markdown;
- datos de ensayo de Safari caducados que no forman parte de una captura o revisión activa;
- revocado MCP instantáneas y abandonadas MCP datos de ensayo.

No elimina el Markdown generado, las entradas actuales de la Biblioteca, los borradores de revisión activos ni los publicados. MCP acciones, o documentos originales importados.

SourceShelf muestra el número estimado de archivos y el espacio recuperable antes de la limpieza. seleccionar **Limpiar...**, revise la confirmación y continúe solo cuando esté listo.

## Eliminar los datos de origen generados

el **Datos de origen generados** la lista es para la eliminación deliberada de fuentes por fuente. Cada fila muestra el título de la fuente, el tamaño estimado y cualquier protección aplicada a ella.

1. Seleccione fuentes individuales o elija **Seleccionar Desprotegido**.
2. Revisa el número de selecciones y el tamaño estimado.
3. seleccionar **Mover seleccionado a la papelera...**.
4. Lee la confirmación y elige **Mover a la basura**.

Para cada fuente seleccionada, SourceShelf:

- mueve su Markdown generado y la carpeta de imágenes generadas adyacentes al basurero de macOS;
- elimina su copia privada de la Biblioteca gestionada;
- elimina la entrada correspondiente de la Biblioteca.

Los archivos importados originales nunca se seleccionan ni se eliminan. La salida generada movida a la Papelería se puede recuperar hasta que se vacíe la Papelería, pero los datos gestionados internamente y el registro de la Biblioteca se eliminan. Si restauras un archivo Markdown más tarde, importalo de nuevo para crear una nueva entrada en la Biblioteca.

## Fuentes protegidas

Las fuentes destacadas y las fuentes que se mencionan en los paquetes guardados están bloqueadas por defecto. Sus filas explican por qué están protegidas.

Si desea eliminarlos intencionalmente, habilite **Permitir la selección de fuentes destacadas o guardadas en paquetes**, selecciona las fuentes y confirma la eliminación. Eliminar una fuente de pack guardado no reescribe el pack en silencio: deja un lugar vacío no disponible que puedes restaurar o eliminar más tarde del pack.

La protección evita la selección accidental en la ventana de almacenamiento; no es una copia de seguridad. Mantenga copias de seguridad separadas del material fuente importante y de los paquetes exportados.

## Eliminación de la biblioteca frente a limpieza del almacenamiento

Estos comandos sirven para diferentes propósitos:

- **Eliminar de la Biblioteca** elimina el registro de la Biblioteca pero deja el Markdown generado en la carpeta de salida.
- **Limpieza segura** elimina solo datos internos huérfanos o regenerables.
- **Mover seleccionado a la papelera...** elimina el registro de la Biblioteca seleccionado y su salida generada por SourceShelf juntos.

Para el mantenimiento rutinario, comienza con Limpieza Segura. Usa la eliminación de fuentes generadas solo cuando ya no desees esos resultados convertidos o capturados en SourceShelf.

## Una rutina de mantenimiento práctica

No hay horario requerido. Cuando el uso del almacenamiento se vuelve evidente:

1. aire libre **Revisar almacenamiento...** y actualice el inventario.
2. Ejecutar Limpieza Segura.
3. Organiza las fuentes que ya no necesitas en la Biblioteca.
4. Revise los datos de origen generados sin protección y mueva solo los artículos confirmados a la papelera.
5. Vuelva a vaciar la papelera de macOS más tarde, después de estar seguro de que no necesita restaurarse nada.

Para obtener más detalles sobre los límites de almacenamiento, consulte [Privacidad y Seguridad](../reference/privacy-and-security.md).
