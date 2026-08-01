# Guía del usuario de SourceShelf

SourceShelf convierte archivos y investigaciones web en Markdown local, paquetes de contexto ordenados, exportaciones portátiles y acceso opcional de solo lectura para aplicaciones locales de IA. Esta guía está escrita para SourceShelf 1.0.1.

## Empieza aquí

- [Comience](getting-started.md) — convierte tus primeros archivos, crea un paquete y elige una exportación.
- [Captura de Safari](guides/safari-capture.md) — páginas, contenido principal, selecciones, puntos destacados, recetas, reseñas y atajos de teclado.
- [Explorar la Biblioteca](guides/library-and-inspector.md) — búsqueda, filtros, estado de la fuente, acciones y vistas previas.
- [Crea y gestiona paquetes](guides/build-and-manage-packs.md) — paquetes guardados, pedidos, borradores, Confianza y Seguridad, y Actualizar y Comparar.
- [Elige un formato de exportación](guides/export-formats.md) — Paquete de Referencia de IA, OKF, Markdown, `llms.txt`, y flujos de trabajo de la bandeja de recortes.
- [Administrar almacenamiento](guides/storage-management.md) — revise el uso local, elimine de forma segura los datos obsoletos y elimine deliberadamente las fuentes generadas.

## Acceso local a IA (MCP)

- [Visión general del acceso local a la IA](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [MCP localización y corrección de fallos](mcp/troubleshooting.md)

## Más guías

- [Convertir archivos y carpetas](guides/convert-files.md)
- [Confianza y seguridad y paquetes de vida](guides/trust-safety-and-refresh.md)
- [Importación y exportación llms.txt](guides/llms-txt.md)
- [Referencia de ajustes](reference/settings.md)
- [Formatos compatibles](reference/supported-formats.md)
- [Privacidad y seguridad](reference/privacy-and-security.md)
- [glosario](reference/glossary.md)

## Un modelo mental útil

SourceShelf mantiene cuatro trabajos separados:

1. **Convertir o capturar** crea una fuente local de Markdown.
2. **biblioteca** te ayuda a encontrar, inspeccionar y mantener fuentes.
3. **Paquetes** organizar las fuentes seleccionadas en un orden deliberado.
4. **Exportar o acceder localmente a la IA** entrega ese paquete a otro flujo de trabajo.

SourceShelf realiza estos trabajos localmente. No descarga contenido remoto durante la conversión de archivos. `llms.txt` importación, exportación, comparación o MCP lee.

Las capturas de pantalla de la documentación usan el corpus de demostración sintético de SourceShelf. Se eliminaron las rutas locales y los valores de autorización MCP.
