# Usar SourceShelf con OpenCode

OpenCode puede alojar el asistente stdio de SourceShelf y hacer disponibles sus dos herramientas de solo lectura para una nube o Ollama-modelo respaldado.

Esta guía se dirige al actual OpenCode Configuración V2 documentada el 01-08-2026. Las versiones anteriores utilizan una diferente MCP Forma JSON; usa la de esa versión `mcp add` flujo o actualice su configuración en consecuencia.

## Agregar un local MCP servidor

De SourceShelf **copia MCP configuración** usa lo común `mcpServers` forma. OpenCode V2 espera una matriz de comandos locales bajo `mcp.servers`, así que tradúcelo de la siguiente manera en `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "sourceshelf-municipal-research": {
        "type": "local",
        "command": [
          "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
          "--share",
          "<share-id>"
        ],
        "codemode": false
      }
    }
  }
}
```

Utilice el camino de ayuda exacto y el ID de intercambio de SourceShelf. Mantenga los existentes OpenCode configuraciones y otros servidores al fusionar la entrada.

`"codemode": false` expone directamente las dos herramientas SourceShelf. Ese es un valor predeterminado útil para modelos locales más pequeños porque no necesitan escribir un envoltorio de modo de código alrededor de las llamadas.

## Verificar y probar

aire libre OpenCode y confirmar el local MCP el servidor está habilitado. Luego pregunte:

> llamada `search_pack` para `open data publication schedule`, lee el mejor recurso con `read_pack_resource`, y responda solo a partir de ese resultado. Incluya su SourceShelf. URI.

Si el modelo solo imprime una llamada, cambie a un modelo con mejores funciones de llamada o haga que la instrucción sea más procedural.

## Usa un Ollama modelo

Con la entrada de SourceShelf ya guardada:

```sh
ollama launch opencode
```

Ollama documentos que fusionan profundamente su configuración temporal del modelo con la existente OpenCode configuración, preservando el MCP entrada del servidor.

## Más viejo OpenCode lanzamientos

Las claves de configuración han cambiado entre OpenCode generaciones. si `mcp.servers` se rechaza, ejecute la versión instalada MCP añade el comando o consulta su documentación incluida/actual en lugar de colocar tanto las formas antiguas como las nuevas en un solo archivo.

Referencias oficiales: [OpenCode V2 MCP servidores](https://opencode.ai/v2/docs/mcp-servers), [Ollama con OpenCode](https://docs.ollama.com/integrations/opencode).
