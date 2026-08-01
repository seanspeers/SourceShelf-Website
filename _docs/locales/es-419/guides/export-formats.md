# Elegir un formato de exportación

Abra un paquete y seleccione **Exportar...**. SourceShelf recuerda el último formato confirmado; cancelar el selector no cambia la preferencia.

![El selector de exportación de SourceShelf](../../../assets/images/export-chooser.png)

## Paquete de referencia de IA ZIP

**Ideal para:** Chats con IA, modelos locales, agentes y espacios de trabajo de proyectos.

El ZIP contiene páginas Markdown por fuente, Markdown combinado, un manifiesto con versiones de esquema, imágenes archivadas con referencias y `checksums.sha256`. cuando **Incluir fragmentos de recuperación** está habilitado, también contiene `chunks.jsonl`.

Los trozos de recuperación son conscientes de la estructura y neutros con respecto al modelo:

- un máximo de 800 tokens estimados;
- hasta 120 tokens estimados de superposición estructural;
- fuente estable y IDs de bloques;
- encabezado de ascendencia, procedencia, hashes, referencias de activos y clasificación de referencias no confiables;
- encabezados de tabla repetidos cuando una tabla debe dividirse;
- `token_count_method: "estimated_chars_div_4"`.

No se generan ni incluyen enlaces incorporados.

## OKF v0.2 Paquete ZIP

**Ideal para:** catálogos de conocimientos y agentes basados en estándares.

La raíz `index.md` contiene canónico OKF v0.2 metadata de la versión. Los conceptos llevan tipo, título, procedencia, metadata de SourceShelf y valores generados por/generados en. La procedencia web absoluta HTTP(S) válida puede aparecer como `resource` y `sources`; los rutas de archivos locales nunca se exportan.

El manifiesto de SourceShelf incluye hashes, fechas de modificación, extensiones de confianza, activos y el orden de origen. Los campos canónicos del ciclo de vida de la confianza de OKF, como `verified`, `status`, y `stale_after` se omite porque SourceShelf no proporciona afirmaciones de ciclo de vida controladas por el usuario.

## Paquete de contexto de Markdown

**Ideal para:** contexto de un archivo portátil.

Esto crea un archivo Markdown que contiene las fuentes legibles del paquete en orden. Es fácil de inspeccionar, verificar la versión, adjuntar o pegar en un sistema que no entienda los paquetes ZIP.

## llms.txt Carpeta de colección

**Ideal para:** una colección local inspeccionable utilizando el experimental `llms.txt` convención.

Esto requiere un paquete guardado limpio y crea un paquete seguro contra colisiones. `<pack-name>-llms` carpeta con índice, documentos ordenados, activos archivados con referencias, un manifiesto de SourceShelf y comprobaciones de suma. Fuentes no disponibles con procedencia HTTP(S) válida aparecen debajo de `## Optional` y no se recuperan.

ver [Importación y exportación llms.txt](llms-txt.md).

## Copiar Markdown combinado

**Ideal para:** instrucción rápida, chat o transferencia de documentos.

El Markdown combinado se copia inmediatamente. Debido a que esta es una entrega de paquete exitosa, SourceShelf registra una línea de base del paquete en vivo después de que se complete la operación en la pestaña de la carpeta.

## Suma de verificación y validación

Códigos postales de AI y OKF y `llms.txt` las carpetas contienen un determinista `checksums.sha256`, ordenado por ruta relativa y cubriendo todos los archivos generados excepto el inventario de suma de verificación en sí. SourceShelf valida el ordenamiento, los identificadores, las hashes, la procedencia y las referencias de activos antes de escribir.

Código postal y `llms.txt` Los flujos de trabajo de carpetas se ejecutan de nuevo con Trust & Safety. Los flujos de trabajo de Markdown y la bandeja de entrada mantienen su comportamiento inmediato.
