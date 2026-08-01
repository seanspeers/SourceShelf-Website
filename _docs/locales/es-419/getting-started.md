# Comenzar con SourceShelf

Esta guía paso a paso convierte algunos archivos, crea un paquete ordenado, lo comprueba y lo exporta.

## 1. Elija una carpeta de salida

aire libre **SourceShelf > Configuración > General** y elige una carpeta de salida. El Markdown convertido se guarda allí. SourceShelf recuerda el acceso a la carpeta para que las conversiones posteriores puedan usarlo sin solicitarlo de nuevo.

Elige una carpeta fácil de reconocer y de hacer copias de seguridad. SourceShelf también mantiene los metadatos locales de la Biblioteca y los activos gestionados en su contenedor de aplicaciones; cambiar la carpeta de salida no mueve los archivos Markdown más antiguos.

## 2. Convertir archivos

aire libre **convertir**, luego arrastre los archivos a la zona de soltar o elija **Seleccionar archivos**. También puedes usar **Archivo > Abrir**, convierta una carpeta completa o importe una carpeta local `llms.txt` colección.

![El espacio de trabajo Convert listo para archivos locales](../../assets/images/convert.png)

Cada conversión exitosa crea:

- un archivo Markdown en la carpeta de salida;
- una entrada de la Biblioteca con su título, tipo de fuente, fechas y disponibilidad;
- metadatos semánticos gestionados utilizados por las vistas previas, el agrupamiento y la comparación;
- activos archivados cuando el formato de origen o la captura incluyen imágenes compatibles.

El archivo original no se modifica.

## 3. Revisar la Biblioteca

aire libre **biblioteca**. elementos recién convertidos aparecen en la parte superior cuando se agrupan por fecha. Selecciona un elemento para abrir el inspector. uso **tráiler** para contenido renderizado y **Fuente Markdown** para el Markdown almacenado exacto, incluyendo el contenido inicial YAML.

![Fuentes de demostración sintéticas en la Biblioteca](../../assets/images/library.png)

Los filtros de la biblioteca solo afectan lo que ves. No cambian el paquete actual.

## 4. Construye un paquete

aire libre **Paquetes**, elegir **Nuevo paquete**, y utilice el navegador de fuentes a la izquierda para encontrar material. Agregue fuentes individuales o utilice:

- **Agregar coincidencias** para los filtros actuales;
- **Agregar todo lo exportable** para cada elemento de la Biblioteca legible;
- **Agregar desde la última exportación** para artículos capturados o convertidos después de la última exportación exitosa.

Reordene la lista central arrastrando los elementos o usando **Subir** y **Mueve hacia abajo**. orden mostrada se convierte en el pedido de exportación y el pedido presentado a través de Local AI Access.

Guarda el paquete para darle un nombre duradero y habilitar la comparación de paquetes de vida, `llms.txt` generación de carpetas, y MCP compartir.

![Un paquete ordenado hecho a partir de archivos de investigación municipales sintéticos.](../../assets/images/pack-builder.png)

## 5. Ejecutar Confianza y Seguridad

seleccionar **Confianza y seguridad**. SourceShelf comprueba la legibilidad de la fuente, el nombre y la estructura del paquete, las fechas de modificación, la antigüedad de la fuente web, las referencias de activos, los hashes de contenido y los patrones conservadores que pueden indicar un lenguaje de inyección de comandos.

Los avisos son de carácter orientativo. SourceShelf conserva el contenido original y lo etiqueta como material de referencia no confiable; no afirma que lo haya desinfectado.

## 6. exportación

seleccionar **Exportar...**, luego elija el destino que coincida con su flujo de trabajo:

- **Paquete de referencia de IA ZIP** para chats de IA, agentes y espacios de trabajo de proyectos;
- **OKF v0.2 Paquete ZIP** para catálogos y agentes basados en estándares;
- **Paquete de contexto de Markdown** para un archivo portátil;
- **llms.txt Carpeta de colección** para una carpeta ordenada e inspeccionable;
- **Copiar Markdown combinado** para una pegatina rápida.

![Las cinco opciones de exportación de SourceShelf](../../assets/images/export-chooser.png)

Código postal y `llms.txt` Las exportaciones de carpetas ejecutan una nueva verificación de Confianza y Seguridad. Las exportaciones de Markdown y bandeja de entrada comienzan inmediatamente. Una exportación exitosa registra una línea de base local para **Actualizar y comparar**.

## Pasos siguientes

- Captura la investigación web con [la extensión Safari](guides/safari-capture.md).
- Conecte un paquete guardado a una aplicación local de IA con [Acceso local a IA](mcp/local-ai-access.md).
- Aprende qué contiene cada paquete en [Elige un formato de exportación](guides/export-formats.md).
- Aprenda cómo funciona la retención y la limpieza en [Administrar el almacenamiento de SourceShelf](guides/storage-management.md).
