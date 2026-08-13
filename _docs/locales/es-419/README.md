# Guía del usuario de SourceShelf

Idiomas: [English](../../README.md) · [Français](../fr/README.md) · **Español (Latinoamérica)** · [Português (Brasil)](../pt-BR/README.md) · [日本語](../ja/README.md)

SourceShelf convierte archivos e investigación web en Markdown local, organiza las fuentes en paquetes y permite exportarlas en formatos portátiles. Esta guía cubre SourceShelf 1.0.2 en Mac, iPhone y iPad.

## Comenzar en Mac

- [Comenzar en Mac](getting-started.md) — convierte tus primeros archivos, crea un paquete y elige un formato de exportación.
- [Capturar desde Safari](guides/safari-capture.md) — páginas, contenido principal, selecciones, fragmentos, recetas, revisión y atajos de teclado.
- [Explorar la Biblioteca](guides/library-and-inspector.md) — búsqueda, filtros, estado de las fuentes, acciones y vistas previas.
- [Crear y administrar paquetes](guides/build-and-manage-packs.md) — paquetes guardados, orden, borradores, Confianza y seguridad, y Actualizar y comparar.
- [Elegir un formato de exportación](guides/export-formats.md) — Paquete de referencia para IA, OKF, Markdown, `llms.txt` y portapapeles.
- [Administrar el almacenamiento](guides/storage-management.md) — revisa el uso local, limpia datos obsoletos de forma segura y elimina deliberadamente fuentes generadas.

## Comenzar en iPhone o iPad

- [Comenzar en iPhone y iPad](ios/getting-started.md) — conoce la interfaz adaptable de Biblioteca, Paquetes, Fuentes y Lector.
- [Capturar desde Safari](ios/safari-capture.md) — activa la extensión, captura páginas o una ventana de Safari e importa colecciones `llms.txt` de sitios web.
- [Importar y leer documentos](ios/import-and-read.md) — usa Archivos, la hoja para compartir, OCR local, búsqueda y lectura sin conexión.
- [Crear, exportar y mover paquetes](ios/packs-and-portability.md) — organiza la investigación y mueve paquetes completos con Archivos o AirDrop.
- [Configuración y privacidad](ios/settings-and-privacy.md) — revisa el almacenamiento local, el acceso de Safari y el funcionamiento sin cuenta ni sincronización.

## Acceso local a IA en Mac

- [Descripción del Acceso local a IA](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [Solución de problemas de MCP](mcp/troubleshooting.md)

## Más guías y referencias

- [Convertir archivos y carpetas](guides/convert-files.md)
- [Confianza y seguridad y paquetes evolutivos](guides/trust-safety-and-refresh.md)
- [Importar y exportar llms.txt](guides/llms-txt.md)
- [Referencia de configuración](reference/settings.md)
- [Formatos compatibles](reference/supported-formats.md)
- [Privacidad y seguridad](reference/privacy-and-security.md)
- [Glosario](reference/glossary.md)

## Un modelo sencillo

SourceShelf mantiene separadas cuatro tareas:

1. **Convertir o capturar** crea una fuente Markdown local.
2. **Biblioteca** ayuda a buscar, consultar y mantener las fuentes.
3. **Paquetes** organiza las fuentes seleccionadas en el orden deseado.
4. **Exportar o Acceso local a IA** entrega el paquete a otro flujo de trabajo.

SourceShelf realiza estas tareas localmente. La importación de archivos locales, la conversión, el OCR, la lectura, la exportación, la comparación y el acceso MCP no recuperan contenido remoto. La captura de sitios web y la adquisición de `llms.txt` desde un sitio son acciones explícitas de la extensión de Safari sujetas a los permisos de sitios web de Safari.

Las capturas de pantalla de la documentación usan el corpus de demostración sintético de SourceShelf; se eliminaron las rutas locales y los valores de autorización de MCP.
