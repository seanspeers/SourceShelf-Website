# Usar SourceShelf con Ollama

Ollama ejecuta el modelo local. Un MCPagente capaz, como Codex, Claude Code, o OpenCode—aloja la conexión SourceShelf y proporciona sus herramientas a ese modelo.

Ollamala herramienta de soporte de chat nativo y API de llamadas, pero Ollama no es por sí solo la SourceShelf MCP cliente. Por lo tanto, la prueba más sencilla es:

```text
SourceShelf MCP helper → Codex / Claude Code / OpenCode → Ollama model
```

Última verificación: 01-08-2026.

## Configuración recomendada: Ollama con Codex

1. Cree la partición SourceShelf y copie su comando.
2. Agregalo a Codex utilizando [el Codex guía](codex.md).
3. lanzamiento Codex por Ollama:

```sh
ollama launch codex
```

1. Elija un modelo instalado con una ventana de contexto lo suficientemente grande y una llamada de herramienta confiable.
1. indio Codex, correr `/mcp` y confirme que el servidor SourceShelf y sus dos herramientas están presentes.
1. Pregunta:

> Busque en el paquete SourceShelf tendencias de pasajeros del transporte público, lea el mejor resultado y cite el recurso. URI.

Ollama recomendamos al menos una ventana de contexto de 64K para agentes de codificación. El flujo de trabajo de búsqueda primero de SourceShelf reduce el contexto innecesario, pero el propio agente aún puede necesitar espacio para las definiciones de herramientas y los resultados.

## Ollama con OpenCode

1. Configurar SourceShelf en OpenCode utilizando [el OpenCode guía](opencode.md).
2. Inicie al agente local a través de Ollama:

```sh
ollama launch opencode
```

Ollama dice que fusiona profundamente la configuración de lanzamiento temporal con una existente OpenCode configuración, para que tu SourceShelf MCP la entrada sigue disponible.

## Ollama con Claude Code

1. Configurar SourceShelf utilizando [el Claude Code guía](claude-code.md).
2. Lanzamiento:

```sh
ollama launch claude
```

Entonces usa `/mcp` indio Claude Code para confirmar el servidor.

## Modo manual de modelo local en Codex

Si tu Codex la configuración ya hace referencia a Ollama, también puedes empezarlo con:

```sh
codex --oss
```

el MCP la configuración permanece en Codex; `--oss` Elige el proveedor local de modelos de código abierto. Si mantienes múltiples proveedores locales, utiliza un nombre Codex perfil en su lugar.

## Elegir un modelo

Busca un modelo cuyo Ollama la página o la documentación menciona explícitamente la llamada de herramientas/funciones. Los modelos más pequeños se benefician de mensajes directos como:

> llamada `search_pack` primero. uso `read_pack_resource` solo en el primer resultado. No adivines y no leas todo el paquete.

Si el modelo escribe repetidamente una llamada hipotética a una herramienta como texto, la conexión del host puede estar funcionando mientras que el comportamiento de llamada a la herramienta del modelo no lo está. Confirma con un modelo más capaz de herramientas antes de depurar SourceShelf.

## Avanzado: construye tu propio puente

Una aplicación que utiliza OllamaLa API de chat de puede definir funciones y ejecutarlas, pero también debe implementar un MCP cliente o traduce esas funciones a las de SourceShelf MCP llamadas. SourceShelf intencionalmente no proporciona un punto final de red. Para pruebas normales, un host de agente existente es mucho más simple y seguro.

Referencias oficiales: [Ollama llamada de herramientas](https://docs.ollama.com/capabilities/tool-calling), [Ollama lanzamiento](https://docs.ollama.com/cli), [Ollama con Codex](https://docs.ollama.com/integrations/codex), [Ollama con OpenCode](https://docs.ollama.com/integrations/opencode), [Ollama con Claude Code](https://docs.ollama.com/integrations/claude-code).
