# Usar SourceShelf con LM Studio

LM Studio puede ejecutar un modelo local y actuar como el MCP anfitrión que inicia el asistente de SourceShelf. Utiliza un modelo con soporte confiable para llamar a herramientas; el modelo necesita elegir `search_pack` y `read_pack_resource` durante la conversación.

Última verificación: 01-08-2026.

## Requisitos

- Una corriente LM Studio lanzamiento con MCP soporte (LM Studio documentos MCP soporte desde 0.3.17).
- Un modelo descargado y cargado que admite el uso de herramientas.
- Una participación actual de SourceShelf creada a través de **Paquetes > Más > Acceso local a IA…**.

## Instalar la conexión SourceShelf

1. En SourceShelf, abra el paquete **Acceso local a IA** hoja.
2. seleccionar **copia MCP configuración**.
3. indio LM Studio, abre el **programa** pestaña.
4. seleccionar **instalar**, entonces **Editar mcp.json**.
5. Pegar o fusionar lo copiado `mcpServers` entrada. No elimines otros servidores que quieras mantener.
6. Guarda el archivo y activa la integración de SourceShelf.

El resultado tiene esta forma:

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

Utiliza el comando exacto y comparte el ID copiado por SourceShelf. No sustitutas manualmente un camino de aplicación o asistente.

## Prueba las herramientas

Carga un modelo local compatible con herramientas y comienza con una solicitud estrecha y explícita:

> Utiliza las herramientas de SourceShelf para buscar objetivos de copa de árboles en el paquete compartido. Lee el recurso que mejor coincida, resume los objetivos y cita el recurso de SourceShelf. URI. no respondas con conocimientos generales.

Para un modelo más pequeño, haga que la secuencia sea explícita:

> Primera llamada `search_pack` con la consulta `tree canopy targets` y un límite de 5. Luego llama `read_pack_resource` para obtener el mejor resultado. Basar la respuesta únicamente en el texto devuelto.

Deberías ver una llamada de búsqueda seguida de una o más lecturas restringidas. Si el modelo describe las herramientas en lugar de llamarlas, prueba con un modelo que tenga un mejor soporte para la llamada de funciones o mantén la formulación procedural.

## LM Studio como un servidor de API local

LM Studio también se puede configurar MCP servidores disponibles para un agente impulsado por API. corriente LM Studio la documentación requiere configuración del servidor y ajustes de autorización antes de que los clientes de API puedan invocar servidores desde `mcp.json`. ruta avanzada; el chat integrado es la prueba funcional más sencilla.

## común LM Studio errores

### "El proceso del plugin terminó inesperadamente con el código 1"

El asistente no pudo iniciar ni validar la partición. Copia la configuración después de mover o actualizar SourceShelf, confirma que la comprobación de coincidencia está activada y confirma que el paquete aún muestra una instantánea actual.

### "Método desconocido: herramientas/lista"

El cliente ha llegado a un asistente solo de recursos o más antiguo. Instala la versión actual de SourceShelf, copia la configuración y reinicia la integración. SourceShelf actual expone ambos. `search_pack` y `read_pack_resource`.

### La ventana de contexto se llena rápidamente

Pide al modelo que busque primero y lea solo uno o dos resultados. La herramienta de lectura por páginas de SourceShelf existe específicamente para evitar cargar todos los recursos en el cuadro de diálogo.

Referencias oficiales: [LM Studio MCP servidores](https://lmstudio.ai/docs/app/mcp), [LM Studio MCP Uso de API](https://lmstudio.ai/docs/developer/core/mcp), [LM Studio configuración del servidor](https://lmstudio.ai/docs/developer/core/server/settings).
