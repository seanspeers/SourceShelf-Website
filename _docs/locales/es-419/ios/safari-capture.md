# Capturar desde Safari en iPhone y iPad

La extensión de Safari de SourceShelf captura investigación web autorizada y la entrega a la biblioteca local de SourceShelf. Safari, no SourceShelf, controla a qué sitios web puede acceder la extensión.

## Activar la extensión

Puedes abrir **Configuración > Extensión de Safari** en SourceShelf y usar **Activar extensión de Safari…** cuando el enlace directo esté disponible. Para configurarla manualmente:

1. Abre la app **Configuración** del sistema.
2. En iOS o iPadOS 18 y versiones posteriores, elige **Apps > Safari > Extensiones**. En iOS o iPadOS 17, elige **Safari > Extensiones**.
3. Selecciona SourceShelf y activa **Permitir extensión**.
4. Elige el acceso a sitios web que deseas permitir en Safari.

La configuración de Safari sigue siendo la fuente de verdad para los perfiles de navegación normal y privada.

## Solicitudes de acceso a sitios web

Safari puede mostrar su solicitud de acceso al sitio en cuanto tocas la extensión SourceShelf en la barra de herramientas. Es un comportamiento normal del sistema; SourceShelf no puede suprimir ni reemplazar la solicitud. Concede el acceso necesario para la página que deseas capturar.

En una colección `llms.txt` de varios sitios o en varias pestañas, la revisión puede marcar algunas fuentes como **Acceso necesario**. En iPhone y iPad, abre cada sitio indicado, permite SourceShelf en Safari y vuelve a abrir la revisión para actualizarla. Si Safari pregunta repetidamente o la página sigue sin estar disponible, revisa el acceso a sitios web de SourceShelf en la configuración de Safari en lugar de presionar repetidamente la acción emergente.

## Capturar una página

Abre una página HTTP(S) normal, toca el control de extensiones de Safari y selecciona SourceShelf. La ventana puede guardar la página, su contenido principal, texto seleccionado, un área seleccionada o un conjunto ordenado de fragmentos de investigación. Las acciones interactivas requieren una página compatible y, para una captura basada en selección, una selección real.

La captura de una sola página se guarda en **Toda la investigación**. SourceShelf archiva las imágenes referenciadas que cumplan sus límites normales para que el resultado guardado se pueda leer sin conexión.

## Capturar la ventana actual de Safari

Elige **Investigación > Capturar ventana actual**. SourceShelf revisa las pestañas que Safari informa para la ventana donde se abrió la extensión. Selecciona las pestañas útiles, elige un paquete nuevo o existente e inicia la captura.

Las páginas no compatibles o inaccesibles siguen visibles, pero no se pueden seleccionar. SourceShelf conserva el orden elegido en Safari, continúa cuando una página individual falla y no crea un paquete vacío si todas fallan. Safari determina las pestañas disponibles, que pueden variar según la ventana, grupo de pestañas, permiso y estado del sistema operativo.

## Importar una colección llms.txt de un sitio web

En un sitio web, elige **Investigación > Importar mediante llms.txt**. SourceShelf busca un índice aplicable mediante enlaces de descubrimiento declarados y rutas `llms.txt` progresivamente más amplias hasta la raíz del sitio. Presenta una vista previa de las secciones ordenadas y los recursos listados; no rastrea otros enlaces de la página.

Selecciona los recursos que desees y elige un paquete nuevo o existente. El índice `llms.txt` se guarda primero, seguido por los recursos seleccionados que se obtuvieron correctamente, en el orden indicado. El fallo de un recurso no descarta los demás.

## Finalización y recuperación

La extensión prepara entregas locales limitadas para la app principal. SourceShelf las procesa cuando la app se inicia o vuelve a estar activa. Si una captura terminada no aparece de inmediato, abre SourceShelf y permite que finalice la importación pendiente.

Cancelar el trabajo remoto detiene las solicitudes activas de la extensión y elimina los datos temporales cuando es posible. El trabajo local ya aceptado puede finalizar. SourceShelf nunca convierte la app nativa para iPhone o iPad en un rastreador en segundo plano.
