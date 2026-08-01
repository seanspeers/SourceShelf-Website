# Acceso local a IA (MCP)

El acceso local a IA permite que una aplicación de IA compatible busque y lea un paquete SourceShelf guardado sin tener que exportarlo y cargarlo repetidamente. Compartir es local, solo de lectura, limitado al paquete y desactivado por defecto.

SourceShelf utiliza el Protocolo de Contexto del Modelo (MCP) sobre la entrada/salida estándar. No inicia un servidor web ni un escucha de red.

## Antes de conectar a un cliente

1. aire libre **SourceShelf > Configuración > Integraciones**.
2. permitir **anestesia local MCP reparto**.
3. aire libre **Paquetes** y selecciona un paquete guardado.
4. Guarda cualquier cambio pendiente.
5. elegir **Más > Acceso local a IA…**.
6. Revise el resultado reciente de Confianza y Seguridad. Si tiene advertencias o errores de fuente legible, elija explícitamente **Compartir con problemas** para continuar.

![El local de suscripción voluntaria MCP Configuración de compartir](../../../assets/images/integrations-settings.png)

![Una instantánea actual de Acceso Local de IA para un paquete guardado sintético](../../../assets/images/local-ai-access.png)

Un paquete sin título o sucio no se puede compartir. Un paquete sin fuentes legibles está bloqueado.

## Lo que publica SourceShelf

Cada autorización crea un ID de participación aleatorio y una instantánea inmutable que contiene solo el paquete seleccionado:

- una descripción general del paquete con enlaces de origen ordenados;
- un generado `llms.txt` índice;
- un catálogo JSON público;
- un recurso Markdown por fuente legible;
- imágenes archivadas referenciadas;
- sumas de verificación y un interno URI lista de permiso.

La instantánea sí **no** incluir rutas de archivos de origen, rutas de carpetas de salida, marcadores de seguridad, elementos de la Biblioteca no relacionados o acceso de escritura.

El texto dice que se debe agregar un aviso de referencia no confiable sin cambiar el cuerpo Markdown almacenado. Cada solicitud URI se comprueba contra la lista de permisos de la instantánea y su SHA-256 suma de verificación antes de ser servido.

## Recursos y herramientas

El servidor expone lo que es descubrible `sourceshelf://pack/...` recursos y dos herramientas de solo lectura:

### `search_pack(query, limit)`

Busca el paquete compartido localmente y devuelve extractos clasificados más el recurso. URIs. La búsqueda es determinista y léxica; no utiliza embeddings, realiza solicitudes de red ni llama a un modelo.

### `read_pack_resource(uri, cursor, max_characters)`

Lee un recurso de texto en páginas limitadas. El cursor permite que un cliente continúe a través de una fuente larga sin sobrellenar la ventana de contexto de un modelo más pequeño.

Este par es especialmente útil para modelos locales: el modelo puede buscar de forma específica, leer solo las secciones de fuentes más relevantes y citar su SourceShelf. URIUn host compatible aún necesita permitir que el modelo llame a las herramientas.

## Copiar los detalles de la conexión

el **Acceso local a IA** la hoja proporciona:

- **copia MCP configuración** — JSON en el común `mcpServers` formato utilizado por LM Studio y varios clientes;
- **Comando de copia** — el ejecutable auxiliar plus `--share` argumento de autorización;
- **actualizar** — reconstruir la instantánea después de una revisión explícita cuando sea necesario;
- **Deja de compartir** — revocar la autorización inmediatamente.

Trate el ID de la acción copiada como un token de acceso local. No es una contraseña enviada por Internet, sino que cualquier proceso que funcione como su usuario y tenga el ID y la ruta auxiliar puede solicitar esa instantánea.

## Actualización y revocación de instantáneas

SourceShelf reevalúa las acciones después de cambios relevantes en el paquete, la biblioteca y la política de confianza:

- Si un nuevo resultado de Confianza y Seguridad está listo, SourceShelf puede reemplazar automáticamente la instantánea.
- Si aparecen nuevos avisos o errores, la instantánea válida anterior sigue disponible y la participación se convierte en **Se requiere revisión**.
- seleccionar **actualizar** y confirme antes de publicar esos cambios.
- Eliminar el paquete guardado revoca su participación.
- **Deja de compartir**, **Revocar todo**, o desactivar Local MCP Compartir invalida las configuraciones copiadas inmediatamente.

El asistente recarga el registro y los metadatos de instantánea para cada solicitud, por lo que un cliente en ejecución no puede seguir leyendo una partición revocada.

## Moviendo o actualizando SourceShelf

Las configuraciones copiadas apuntan a la ayuda dentro de la aplicación SourceShelf. Si mueves, reinstalas o actualizas SourceShelf, copia una configuración nueva desde **Acceso local a IA...** entonces el cliente de IA utiliza la ubicación actual del asistente.

## Elige una guía para clientes

- [LM Studio](lm-studio.md)
- [Ollama](ollama.md)
- [Codex](codex.md)
- [Claude Code](claude-code.md)
- [OpenCode](opencode.md)

ver [MCP localización y corrección de fallos](troubleshooting.md) si el asistente sale, faltan herramientas o una participación no es actual.

## Notas del protocolo

Los usos del asistente de SourceShelf MCP Sobre stdio y admite la versión del protocolo implementada por su SDK Swift incluido. El servidor solo publica recursos y las dos herramientas de solo lectura; no publica mensajes de inicio de sesión, herramientas de escritura, suscripciones ni notificaciones de cambios en la lista.

Lectura adicional: [MCP recursos](https://modelcontextprotocol.io/docs/learn/server-concepts), [MCP herramientas](https://modelcontextprotocol.io/docs/learn/server-concepts#tools).
