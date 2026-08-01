# Usar SourceShelf con Codex

Codex puede iniciar el asistente stdio de SourceShelf y exponer los recursos y herramientas del paquete compartido a una nube o Ollama-modelo local respaldado.

Última verificación: 01-08-2026.

## Opción 1: agregar el servidor desde la línea de comandos

1. En SourceShelf, cree una comparta y seleccione **Comando de copia**.
2. Agregalo a Codex. el camino exacto del asistente y el ID de intercambio de SourceShelf:

```sh
codex mcp add sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

1. Verificar el registro:

```sh
codex mcp list
```

1. inicio Codex y entrar `/mcp` para inspeccionar el servidor conectado.

## Opción 2: editar Codex configuración

Codex los clientes comparten MCP configuración en `~/.codex/config.toml`. :

```toml
[mcp_servers.sourceshelf-municipal-research]
command = "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer"
args = ["--share", "<share-id>"]
```

En su lugar, puede colocar la entrada en el proyecto de confianza de `.codex/config.toml` Cuando la conexión debe ser específica del proyecto. Use el comando exacto copiado de la partición SourceShelf.

## Opción 3: Codex configuración de la aplicación

indio Codex configuración de la aplicación, agrega un MCP servidor, elija **STDIO**, ingrese el comando y los argumentos del asistente, guarde y reinicie la conexión. La misma configuración del servidor está disponible para Codex CLI porque los clientes comparten `config.toml`.

## Prueba el paquete compartido

Prueba:

> Utilice SourceShelf para encontrar los indicadores climáticos del paquete de demostración. Lea la fuente más relevante, resuma la tendencia reportada y cite su `sourceshelf://` URI. no inspeccione archivos locales no relacionados.

Para una modelo local a través de Ollama:

```sh
ollama launch codex
```

o usar `codex --oss` cuando tu Codex la configuración del proveedor local ya está dirigida a Ollama.

## Retire o reemplace la conexión

uso `codex mcp remove sourceshelf-municipal-research` para eliminar la entrada del cliente. Esto no revoca la partición SourceShelf. Para revocar el acceso inmediatamente, seleccione **Deja de compartir** también en SourceShelf.

Si mueves, reinstalas o actualizas SourceShelf, elimina o actualiza el antiguo Codex entrada y copia un nuevo camino auxiliar.

Referencia oficial: [Codex MCP configuración](https://developers.openai.com/codex/mcp/).
