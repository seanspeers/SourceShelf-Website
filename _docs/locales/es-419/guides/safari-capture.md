# Capturar desde Safari

La extensión SourceShelf Safari guarda la página actual, el contenido principal, una selección, una área de página seleccionada o una cesta de puntos destacados de investigación como Markdown local.

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
