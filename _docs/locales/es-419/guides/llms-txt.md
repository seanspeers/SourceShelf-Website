# Importar y exportar llms.txt

SourceShelf admite la forma actual de `llms.txt` v2 para importar archivos locales y adquirir sitios desde Safari. La importación local sigue sin conexión. La importación web solo usa la extensión y los permisos de sitios de Safari; la app nativa permanece aislada de la red.

## Importar un sitio desde Safari

En una página HTTP(S), abre SourceShelf y elige **Investigación > Importar mediante llms.txt**. SourceShelf descubre el índice, muestra sus secciones y entradas ordenadas, señala los orígenes externos que requieren acceso y permite seleccionar recursos y un solo destino. El índice `llms.txt` se guarda primero y después los recursos exitosos en el orden elegido. No se crea un paquete vacío.

Safari puede mostrar una solicitud de acceso al sitio cuando abres la extensión de SourceShelf por primera vez. Los orígenes adicionales incluidos en la colección pueden necesitar un permiso aparte. Safari sigue siendo la fuente de verdad para esos permisos; si rechazas el acceso, cámbialo en la configuración de extensiones de Safari y vuelve a abrir la revisión.

## Orden de descubrimiento del sitio

SourceShelf revisa, en orden: un `<link rel="describedby">` HTML, un encabezado HTTP `Link` con `rel="describedby"`, la ruta `llms.txt` más específica avanzando hacia la raíz y, por último, `/llms.txt`. Las URL relativas se resuelven contra la página y se deduplican. Gana la primera respuesta de texto o Markdown válida con H1, con límites de 12 candidatos, cinco redirecciones, 8 MiB y 20 segundos.

## Selección de contenido web y procedencia

Para cada entrada seleccionada, SourceShelf prefiere una representación Markdown explícita `rel="alternate"`, después prueba `page.html.md` y `page.md`, y finalmente extrae HTML. Esta lógica solo se aplica al flujo `llms.txt`; la captura rápida no cambia. Solo se admiten entradas del índice y no se rastrean enlaces comunes. El historial distingue la URL enumerada, la representación realmente obtenida, el método de descubrimiento y la URL del índice, sin afirmar integridad de paquete.

## Límites y cancelación del sitio

La revisión se limita a 1,000 entradas, con hasta tres recursos simultáneos, 100 imágenes por fuente y 256 MiB por operación. Los esquemas peligrosos, redirecciones, permisos, tiempos, tamaños, análisis y extracciones se informan por recurso. Cancelar detiene solicitudes de la extensión y limpia datos temporales; el trabajo que ya se entregó al procesador local puede terminar.

## Aislamiento de red de la app nativa

La app nativa no tiene autorización de red saliente para esta función y no usa `URLSession` para adquirir desde Safari o `llms.txt` web. La extensión realiza las solicitudes autorizadas, elige Markdown y prepara imágenes, y luego envía transferencias locales acotadas. Conversión, historial, paquetes, autorización de carpeta de salida y persistencia siguen siendo nativos.

## Importar una colección

Elige **Archivo > Importar paquete de investigación…** o usa la acción de **Convertir**. Para una colección local independiente, selecciona una de estas opciones:

- un `llms.txt` archivo; o
- una carpeta que contiene `llms.txt`.

Elige la carpeta cuando el índice contenga enlaces a documentos locales. Eso le da a SourceShelf una raíz segura contra la que resolvirlos.

## Lo que acepta el parser

Un índice debe contener un título H1. También puede contener:

- un resumen opcional de citas;
- prosa detallada;
- pedidos de secciones H2;
- Entradas de la lista de enlaces Markdown con descripciones;
- un especial `## Optional` sección.

Se acepta una marca opcional de orden de bytes. Las entradas opcionales malformadas se reportan como advertencias.

El H1 es el único elemento obligatorio. El resumen, los detalles, las secciones, las descripciones y `## Optional` se omiten si no existen; la exportación no inventa esos campos.

## Seguridad de enlace local

SourceShelf solo resuelve relativos `.md`, `.markdown`, y `.txt` enlaces contenidos debajo de la raíz seleccionada. Rejeita:

- `..` transversal;
- rutas locales absolutas;
- enlaces simbólicos que salen del raíz;
- sin apoyo URL esquemas.

Los enlaces HTTP(S) se convierten en referencias de biblioteca con nombres de "no disponibles". Sus títulos, descripciones y procedencia permanecen visibles, pero SourceShelf no los busca. Los destinos repetidos se deduplican por identidad normalizada, preservando la primera ocurrencia.

El índice importado es el primer elemento de la Biblioteca legible. Los documentos locales siguen en el orden del índice. SourceShelf crea un paquete guardado con el nombre del H1 y ofrece el comportamiento de reemplazo, guardar como o cancelar en caso de colisión de nombres normalizados.

## Generar una carpeta de colección

Abra un paquete guardado limpio, elija **Exportar... > llms.txt Carpeta de colección**, apruebe Trust & Safety y seleccione una carpeta de padres. SourceShelf crea una carpeta segura contra colisiones. `<pack-name>-llms` carpeta:

```text
<pack-name>-llms/
├── llms.txt
├── documents/
│   └── ordered-source.md
├── assets/
│   └── referenced-image.png
├── sourceshelf-manifest.json
└── checksums.sha256
```

El índice raíz contiene el título del paquete, un resumen de contenido no confiable, ordenado `## Sources` enlaces, y `## Optional` entradas para fuentes no disponibles con una proveniencia web válida. Los enlaces de imágenes de documentos se reescriben en archivos copiados en `assets/`.

Solo se incluyen las imágenes archivadas que realmente se refieren a Markdown legible. Las entradas ilegibles sin una proveniencia web válida se omiten y se reportan después de la generación.

SourceShelf no genera `llms-full.txt`, fragmentos de recuperación, incorporaciones o descargas remotas para este formato.
