# Solución de problemas de MCP

Trabaje desde SourceShelf hacia afuera: instantánea, ruta auxiliar, conexión del cliente, luego el comportamiento del modelo.

## 1. Confirmar el estado de SourceShelf

Abra el paquete guardado **Acceso local a IA** hoja y verificar:

- el intercambio global está habilitado;
- el paquete se ha guardado y no tiene cambios no guardados;
- se muestra una instantánea publicada;
- el estado es **corriente**, o has retenido intencionalmente un **Se requiere revisión** captura instantánea;
- la instantánea contiene al menos una fuente legible.

seleccionar **actualizar** si quieres revisar y publicar los cambios actuales. uso **copia MCP configuración** de nuevo después de cualquier cambio en el camino de instalación de SourceShelf.

## 2. Pruebe el comando copiado directamente

pasta **Comando de copia** en Terminal. Un stdio MCP helper normalmente espera en silencio la entrada del protocolo; no es una aplicación de shell interactiva. Si se cierra inmediatamente y imprime un diagnóstico, comprueba el mensaje para ver si falta una partición, el registro está desactivado, la instantánea es inválida o hay un error en la suma de verificación. Presiona Control-C para detener una prueba directa en espera.

Los diagnósticos pertenecen al error estándar. Los mensajes del protocolo JSON-RPC pertenecen a la salida estándar. Los clientes que fusionan o reescriben estos flujos pueden romper la conexión.

## 3. Errores comunes

### El proceso se cerró con el código 1 / conexión cerrada.

Causas probables:

- la aplicación configurada se ha movido, actualizado o reemplazado;
- la participación copiada fue revocada;
- global MCP el compartir está desactivado;
- la instantánea o el registro no se pueden leer.

En Open SourceShelf, confirme la comprobación del paquete y copie una configuración nueva.

### Método no encontrado: `tools/list`

El cliente se conectó con un asistente anterior que solo ofrecía recursos. Instala la versión actual de SourceShelf, luego copia el comando y reinicia la integración del cliente. SourceShelf actual anuncia `search_pack` y `read_pack_resource`.

### Recurso no encontrado

el URI viene de otro paquete, otra parte, una instantánea anterior o no está en la lista de permisos de instantáneas. Busque de nuevo y lea el URI devuelto por el resultado de búsqueda actual.

### Fallo de la suma de verificación

SourceShelf se niega a servir un archivo de instantánea que ya no coincide con su comprobante de integridad publicado. Actualiza la comprobación de la parte compartida de SourceShelf. No edites archivos dentro de él. `MCP Shares/<share-id>/` manualmente.

### El cliente muestra recursos, pero el modelo nunca llama a las herramientas.

el MCP la conexión está funcionando, pero la política del modelo o del host no está enviando llamadas de herramientas. Intente:

> Primera llamada `search_pack` con consulta `...`. Luego llama `read_pack_resource` en el resultado superior. No responda antes de que ambas llamadas finalicen.

Si eso sigue convirtiéndose en texto plano, pruebe un modelo conocido por soportar la llamada de funciones.

### La búsqueda no encuentra una frase exacta

Usa términos de contenido significativos en lugar de texto lleno de signos de puntuación. La búsqueda es recuperación léxica local, no búsqueda de incorporación semántica. Intenta usar una frase alternativa o una más corta.

### Una fuente larga está cortada.

llamada `read_pack_resource` de nuevo con el cursor devuelto. Menor `max_characters` los valores ayudan a los modelos de contexto limitado.

## 4. Crear una nueva autorización

Si el estado del cliente sigue siendo ambiguo:

1. Elimine la entrada del servidor del cliente de IA.
2. En SourceShelf elija **Deja de compartir**.
3. Guarda y comprueba de nuevo el paquete.
4. Cree una nueva autorización de acceso local de IA.
5. Agregue la configuración recién copiada al cliente.

Una nueva autorización obtiene un nuevo ID de participación. Las configuraciones antiguas permanecen inválidas.
