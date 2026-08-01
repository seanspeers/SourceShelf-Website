# Usar SourceShelf con Claude Code

Claude Code puede alojar el servidor local stdio de SourceShelf y proporcionar sus herramientas de búsqueda y lectura al modelo activo.

Última verificación: 01-08-2026.

## Agregar el servidor

Cree una partición de SourceShelf y luego ejecute:

```sh
claude mcp add --transport stdio --scope user sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

Utilice el camino exacto y el ID de intercambio mostrado por SourceShelf. el `--scope user` la opción hace que la conexión esté disponible en todos sus proyectos. Omítala para Claude Codeel alcance predeterminado local/específico del proyecto, o usar `--scope project` cuándo el equipo debería recibir un registro de entrada `.mcp.json` entrada.

## verificar

De una concha:

```sh
claude mcp list
```

interior Claude Code, ingrese:

```text
/mcp
```

Confirmar eso `search_pack` y `read_pack_resource` aparecer.

## Solicitud de prueba

> Busque en el paquete SourceShelf el aviso del servicio de transporte. Lea el resultado más relevante y explique el cambio de servicio, citando el `sourceshelf://` URI. otros archivos o fuentes web.

Para un modelo más débil, requiera explícitamente una búsqueda seguida de una lectura.

## Configuración del proyecto

Claude Code también apoya `.mcp.json`. SourceShelf ya utiliza la configuración copiada de manera común. `mcpServers` forma:

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "type": "stdio",
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

No cometas un ID de participación real en un repositorio público. Prefiere el alcance del usuario para una instantánea personal de SourceShelf.

## Usa un Ollama modelo

Después de que la entrada de SourceShelf esté configurada, Ollama puede lanzar Claude Code contra un modelo local:

```sh
ollama launch claude
```

el Claude Code el proceso sigue siendo el MCP anfitrión; Ollama proporciona al modelo.

Referencia oficial: [Claude Code MCP](https://code.claude.com/docs/en/mcp).
