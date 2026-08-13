# Capturar desde Safari

La extensión SourceShelf Safari guarda la página actual, el contenido principal, una selección, una área de página seleccionada o una cesta de puntos destacados de investigación como Markdown local.

También puede adquirir varias pestañas de la ventana actual de Safari en un solo paquete de investigación nuevo o existente. La extensión obtiene y prepara los datos web; la app nativa solo recibe capturas locales acotadas y nunca actúa como cliente web de propósito general.

## Habilita la extensión de Safari

1. Iniciar SourceShelf.
2. aire libre **Safari > Configuración > Extensión**.
3. Habilita la extensión SourceShelf.

## Modos de captura

- **Usar receta predeterminada** sigue el modo de contenido de la receta seleccionada.
- **Guardar toda la página como Markdown** mantiene el cuerpo de la página ancha.
- **Guardar el contenido principal como Markdown** se centra en el artículo o documento principal.
- **Guardar selección como Markdown** utiliza la selección de texto actual de Safari.
- **Seleccionar área como Markdown** te permite elegir una región de página.
- **Guardar los puntos destacados como Markdown** combina el cesto de resaltados ordenado y la nota corta opcional.

Las acciones de pop-up explícitas suprimen la configuración predeterminada de la receta para esa captura.

## Capturar la ventana actual

Abre SourceShelf en Safari, elige **Investigación > Capturar ventana actual** y revisa las pestañas que Safari informa para esa ventana. Las páginas que no usan HTTP(S), los archivos locales y las páginas internas se muestran, pero no se pueden seleccionar.

Selecciona las pestañas útiles y un solo destino. SourceShelf conserva el orden elegido, continúa tras fallas individuales, no crea un paquete vacío si todo falla y asigna una identidad local nueva a cada elemento. Las acciones rápidas de una sola página no cambian, y el lote reutiliza el mismo flujo de Markdown, recetas, imágenes, historial y carpeta de salida.

## Acceso a sitios web y seguridad

Safari controla el acceso de la extensión a los sitios web y puede mostrar su solicitud de permiso en cuanto haces clic en el botón de SourceShelf en la barra de herramientas. El momento y el texto de esa solicitud pertenecen a Safari. Si rechazas el acceso, concédelo después en la configuración de extensiones de Safari y vuelve a abrir SourceShelf.

Para las operaciones por lotes, SourceShelf solo solicita a Safari acceso a los orígenes HTTP(S) necesarios para las pestañas o los recursos `llms.txt` seleccionados. No declara acceso permanente a todos los sitios. Antes de comenzar, la pantalla de revisión distingue entre fuentes disponibles, fuentes que necesitan acceso y fuentes no compatibles.

## Límites, cancelación y fallas

La adquisición usa como máximo tres fuentes a la vez, 8 MiB por respuesta, 256 MiB por operación, 100 imágenes por fuente, cinco redirecciones y 20 segundos por solicitud. La revisión de `llms.txt` se limita a 1,000 entradas y el descubrimiento a 12 candidatos. Cancelar detiene solicitudes pendientes y limpia datos temporales; una falla de permisos, tiempo, HTTP, análisis, extracción o tamaño no elimina las fuentes exitosas.

## Grupos de pestañas de Safari y límites del navegador

La captura usa la API pública `tabs.query({ currentWindow: true })`. La API pública WebExtensions de Safari no expone un identificador documentado ni una consulta de pertenencia para grupos de pestañas. Por eso SourceShelf dice “ventana actual” y no afirma que pueda distinguir el grupo activo de otras pestañas que Safari exponga para esa ventana.

El conjunto exacto lo define Safari y puede variar según la versión y el estado de la ventana. Las páginas que Safari no permite leer siguen sin estar disponibles, y los encabezados HTTP `Link` o las redirecciones manuales dependen de lo que Safari exponga. Verifica esos casos con una extensión firmada en las versiones de Safari distribuidas.

## Captura recetas

aire libre **SourceShelf > Configuración > Captura** para crear, duplicar, reordenar o eliminar recetas. Una receta puede definir:

- plantillas de nombres de archivos y carpetas relativas;
- campos YAML personalizados;
- modo de contenido predeterminado;
- comportamiento de imagen y enlace;
- comportamiento de revisión antes de guardar;
- una política de estancamiento;
- ordenó reglas de dominio exactas y de patrones wildcard.

Los anfitriones exactos son más específicos que los patrones genéricos principales como `*.example.com`. son igual de específicas, el orden en el que se guardan determina la coincidencia.

El incorporado **parámetro** la receta refleja el comportamiento de guardado rápido y es la opción por defecto cuando faltan, son inválidas o se refieren a una receta eliminada.

## Plantillas y YAML

Los plantillas pueden usar `{title}`, `{domain}`, `{date}`, `{time}`, `{captured_at}`, `{mode}`, `{recipe}`, `{url}`, y `{note}`. SourceShelf desinfecta cada componente de carpeta, rechaza rutas absolutas y `..`y mantiene el destino debajo de la carpeta de salida autorizada.

Las claves YAML personalizadas deben ser únicas y válidas. SourceShelf protege sus claves de proveniencia, incluyendo `title`, `url`, `domain`, `captured_at`, `source`, y `created_by`.

## Captura de teclado en un solo paso

indio **Configuración > Captura**, elige una receta para la atracción rápida de Safari. Luego, abre la configuración de atracción rápida por teclado de la extensión de Safari y asigna una combinación de teclas al comando de atracción rápida de SourceShelf.

Cuando se invoca, SourceShelf elige la receta utilizando este orden:

1. la regla de dominio más específica para la página activa;
2. la receta de atajos configurada;
3. la receta de respaldo estándar.

Las páginas simples, el contenido principal o las recetas de selección compatibles se pueden guardar inmediatamente sin abrir la ventana emergente. Una receta que requiere revisión o un flujo de trabajo interactivo, como la selección de área o la recopilación de resaltados, abre la extensión en su lugar.

## Destacados de la investigación

Seleccione el texto en una página, abra SourceShelf y elija **Agregar selección actual**. ir para crear una cesta ordenada. Puedes eliminar o reordenar extractos y agregar una breve nota antes de guardarlos juntos como un `.highlights` capturar.

El carrito está restringido a la pestaña del navegador y URL. solo se libera después de que se acepte la transferencia de manos nativa o que la navegación la haga obsoleta.

## Revisa antes de guardar

Una receta habilitada para revisión coloca una hoja de revisión local en SourceShelf. Puedes editar el destino relativo, el nombre del archivo, el YAML personalizado, la nota y el cuerpo de Markdown, y luego alternar entre Vista previa y Fuente Markdown. La procedencia se mantiene como solo lectura.

Los borradores de revisión sobreviven al reinicio de la app. Guardar restaura el Markdown editado y copia solo las imágenes estáticas referenciadas. Cancelar elimina el borrador y sus activos estáticos.

## Solución de problemas de recetas

Si una nueva receta no aparece en Safari:

1. Confirme que la extensión SourceShelf está habilitada en Safari.
2. Abre Open SourceShelf una vez para que pueda publicar las recetas actuales.
3. Cierre y vuelva a abrir la ventana emergente de la extensión; normalmente no debería ser necesario reiniciar Safari.
4. Si el menú está vacío, abre **Configuración de Captura** de la ventana emergente y confirme que al menos existe una receta Estándar o personalizada.
5. Si Safari sigue solicitando acceso o la ventana no puede leer la página, abre **Safari > Configuración > Extensiones**, concede acceso a SourceShelf para ese sitio y vuelve a intentarlo.
