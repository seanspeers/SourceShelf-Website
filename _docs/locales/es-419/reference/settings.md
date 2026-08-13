# Referencia de configuración

Abre **SourceShelf > Configuración**. La ventana se puede redimensionar y está organizada en cinco pestañas.

Para conocer la configuración de iPhone y iPad, consulta [Configuración y privacidad en iPhone y iPad](../ios/settings-and-privacy.md).

## Idioma

SourceShelf es compatible con inglés, francés, español latinoamericano, portugués de Brasil y japonés. Usa el idioma elegido para SourceShelf en **Configuración del Sistema > General > Idioma y región > Aplicaciones**. Si no eliges uno, sigue el orden de idiomas preferidos de macOS. La extensión de Safari sigue el idioma de la interfaz de Safari.

Cambiar el idioma de la interfaz no traduce los documentos de origen, los nombres personalizados de recetas o paquetes, el texto exportado, los identificadores MCP, los nombres de archivo ni los campos de manifiesto.

## general

Elige la carpeta de salida que se utiliza para los nuevos Markdown convertidos y capturados. SourceShelf almacena una marca de página autorizada localmente para que pueda volver a esa carpeta. Cambiarla afecta la salida futura; no mueve los archivos existentes.

**Revisar almacenamiento...** inventarios generados Markdown, activos de producción proyectados, copias de la Biblioteca gestionadas, cachés semánticos, locales MCP instantáneas y captura borradores/estado de preparación. Limpieza segura elimina solo los datos internos huérfanos o regenerables. La limpieza de fuentes generadas es un flujo de trabajo de selección y confirmación separado que mueve los archivos de salida a la papelera; las fuentes con estrellas y guardadas están protegidas por defecto, y los documentos importados originales nunca son objetivos de eliminación. ver [Administrar el almacenamiento de SourceShelf](../guides/storage-management.md) para el flujo de trabajo completo.

## captura

Las configuraciones de captura incluyen:

- Estado de la extensión de Safari y una atracción para acceder a la configuración de la extensión de Safari;
- organización por dominio y fecha;
- comportamiento de la imagen web archivada;
- la edad de la estancamiento global de la captura web;
- capturar la creación, duplicación, eliminación, ordenación, plantillas, YAML, comportamiento y reglas del dominio de la receta;
- la acción del teclado de captura rápida de Safari y su receta preferida.

Los cambios en la receta se guardan localmente y se publican en la extensión SourceShelf Safari.

## exportación

Elige el formato inicialmente seleccionado en el selector de exportación de Paquetes. La configuración y el selector comparten una preferencia; confirmar una elección diferente la actualiza, mientras que cancelar no lo hace.

**Incluir fragmentos de recuperación en los ZIPs del Paquete de Referencia de IA** añade modelo neutral `chunks.jsonl`. se activa por defecto y nunca agrega incorporaciones.

## Integraciones

**Habilitar el uso compartido MCP local** está desactivado de forma predeterminada. Cuando está activado, un paquete guardado puede autorizarse desde su estado visible de Acceso local a IA o **Acciones del paquete > Acceso local a IA…**.

Esta pestaña muestra el número de compartimientos activos y proporciona **Paquetes abiertos** y **Revocar todo**. el acceso compartido o la revocación de todo elimina instantáneas y invalida inmediatamente las configuraciones del cliente copiadas.

ver [Acceso local a IA](../mcp/local-ai-access.md).

## intimidad

Esta pestaña resume el almacenamiento local, las exportaciones, los fragmentos de recuperación, la comparación de living-pack y el comportamiento de asesoramiento de Confianza y Seguridad. **Abrir detalles de privacidad** abre la explicación completa de privacidad dentro de la aplicación.
