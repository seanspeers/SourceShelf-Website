# llms.txt v2: una mejor manera para que la IA descubra el conocimiento de un sitio web

El conocimiento web legible por IA es cada vez más fácil de descubrir.

La propuesta `llms.txt` ha alcanzado la versión 2. Esta actualización ayuda a que los asistentes y agentes de IA encuentren contenido web útil y legible por máquina. Si este formato es nuevo para ti, comienza con nuestra [introducción a llms.txt](/es-419/blog/what-is-llms-txt/).

La propuesta original introdujo una idea sencilla: darle a un sitio web un pequeño índice Markdown que explique lo que contiene y indique a los sistemas de IA sus recursos más útiles.

La versión 2 mantiene esa simplicidad, pero aborda uno de los mayores problemas prácticos con la propuesta original:

**¿Cómo sabe un agente de IA que existe un archivo `llms.txt` —o una versión Markdown limpia de una página—?**

La respuesta es una mejor exploración.

Y SourceShelf 1.0.2 ya admite el nuevo flujo de trabajo `llms.txt` v2, lo que hace posible descubrir, visualizar, seleccionar, importar, organizar y preservar el conocimiento del sitio web amigable con la IA directamente desde Safari.

## Por qué llms.txt necesitaba una versión 2

Cuando `llms.txt` se propuso por primera vez en 2024, la lectura rutinaria de sitios web por agentes de IA seguía siendo en gran medida una expectativa sobre hacia dónde se dirigía la web.

Eso cambió rápidamente.

Los asistentes de codificación de IA ahora consultan la documentación mientras trabajan. Los asistentes con búsqueda recuperan páginas web para responder preguntas. Los agentes cada vez necesitan localizar información específica dentro de sitios web en lugar de simplemente mostrar esos sitios a una persona.

El [registro oficial de cambios de llms.txt v2](https://llmstxt.org/changes.html) señala que miles de sitios ahora publican un archivo `llms.txt`, las plataformas de documentación los generan automáticamente y los principales proveedores de IA los publican para su propia documentación de desarrolladores.

La versión 2 refleja lo que se aprendió de esa adopción.

No reinventa el formato básico ni hace que la versión 1 deje de funcionar. En cambio, facilita la descubrimiento de `llms.txt` y clarifica cómo deben usarlo los agentes.

## 1. Los sitios web pueden anunciar explícitamente su llms.txt.

La adición más importante en v2 es la descubribilidad.

Anteriormente, una herramienta que quería encontrar un archivo `llms.txt` a menudo tenía que probar una ubicación predecible como:

```text
/llms.txt
```

Ese URL convencional sigue siendo útil, pero probar una ubicación conocida no es lo mismo que el sitio web declarando explícitamente una relación.

La versión 2 recomienda usar la relación HTML estándar:

```html
<link rel="describedby" href="/llms.txt">
```

Un sitio web puede usar esto para decirle al software compatible:

**Este es el archivo llms.txt que describe esta página.**

La misma información se puede proporcionar a través de un encabezado HTTP `Link`, lo que significa que sitios web, sistemas de documentación, CDNs y otras infraestructuras pueden exponer la relación sin modificar la página visible.

En lugar de requerir una herramienta de IA para examinar un sitio web en busca de archivos especiales, el sitio web puede declarar directamente su conocimiento legible por IA.

## 2. Las páginas pueden anunciar una versión limpia de Markdown.

`llms.txt` es útil como índice, pero la información detallada generalmente se encuentra en las páginas que hace referencia.

El problema es que las páginas web normales contienen mucho más que su contenido principal.

La navegación, los menús, los scripts, el diseño, los controles de cookies, la publicidad, los componentes interactivos y otros elementos de interfaz tienen sentido en un navegador. No son necesariamente la mejor representación para un sistema de IA que intenta entender la información subyacente.

Por lo tanto, la versión 2 formaliza otra relación de descubrimiento:

```html
<link
  rel="alternate"
  type="text/markdown"
  href="/docs/example.md">
```

Esto le dice al software compatible que la página tiene una representación Markdown disponible.

Un agente de IA puede, por lo tanto, encontrar una página web normal mientras descubre una representación más limpia y concisa de la misma información.

Eso puede significar menos extracción, menos material irrelevante y menos tokens gastados reconstruyendo contenido que el editor ya ha hecho disponible en una forma amigable con las máquinas.

![Un diagrama lado a lado contrasta probar la ubicación convencional /llms.txt con una página que declara explícitamente su índice descrito y su representación alternativa de Markdown.](/assets/blog/es-419/llms-txt-v2-discovery.svg)

## 3. Las URL de Markdown son más flexibles

La propuesta original sugería producir versiones de Markdown de las páginas agregando `.md` al URL existente.

Por ejemplo:

```text
guide.html
guide.html.md
```

En la práctica, algunos sistemas de publicación reemplazan en su lugar la extensión original:

```text
guide.html
guide.md
```

La versión 2 reconoce ambos enfoques.

Esto puede parecer un cambio de compatibilidad menor, pero refleja un principio importante detrás de la propuesta actualizada: `llms.txt` se está adaptando a convenciones que los desarrolladores y los sistemas de publicación ya utilizan, en lugar de obligar a todos los sitios a adoptar una sola estructura de URL.

## 4. llms.txt puede describir una parte de un sitio web

Otra aclaración particularmente útil es **el ámbito de la ruta**.

Un archivo `llms.txt` no necesita describir un dominio completo. Por ejemplo:

```text
/llms.txt
/docs/llms.txt
/api/llms.txt
```

puede describir diferentes partes del mismo sitio.

Un archivo `llms.txt` se aplica a las páginas que están debajo de su propio camino, y cuando más de un índice podría aplicarse, el más específico tiene prioridad.

Eso significa:

```text
/docs/llms.txt
```

puede describir la sección de documentación sin necesidad de representar el resto del sitio web.

Esto es útil para grandes organizaciones, plataformas de documentación, proyectos alojados, universidades, productos de software y cualquier sitio donde diferentes áreas contengan colecciones distintas de conocimiento.

También hace que la búsqueda sea más precisa. Un agente de IA que lee la documentación de la API no necesariamente necesita las páginas de marketing, las noticias de la empresa, la sección de carreras y todo lo demás publicado en el mismo dominio.

Un `llms.txt` con alcance puede guiarlo hacia el conocimiento que realmente es relevante.

![Un árbol de sitios muestra una raíz llms.txt para el sitio más amplio, además de archivos llms.txt más específicos dentro de los archivos y rutas de la API.](/assets/blog/es-419/llms-txt-v2-path-scoping.svg)

## 5. Se espera que los agentes recuperen lo que necesitan

La versión 2 también aclara una importante idea errónea sobre `llms.txt`.

El objetivo no es necesariamente concatenar un sitio web completo y alimentarlo a un modelo de IA.

En cambio, el archivo `llms.txt` actúa como un mapa.

Un agente puede leer o buscar en el índice relativamente pequeño, determinar qué recursos son relevantes para la tarea actual y luego recuperar esos recursos según sea necesario.

Conceptualmente, el flujo de trabajo se convierte en:

```text
Question
   ↓
llms.txt
   ↓
Find relevant sources
   ↓
Retrieve only those sources
   ↓
Use them as context
```

Este es un modelo mucho más escalable que tratar cada documento disponible como contexto para cada pregunta.

También se parece a la forma en que funciona una buena investigación: comienza con una colección organizada, identifica las fuentes relevantes, luego examina esas fuentes en detalle.

## 6. "Opcional" es una convención, no una regla de procesamiento.

Versiones anteriores de la propuesta otorgaron a la sección `## Opcional` un papel especial al expandir una colección `llms.txt` en el contexto del modelo.

La versión 2 elimina ese significado mecánico.

Una sección opcional aún puede identificar material secundario que un agente podría omitir cuando una colección más pequeña es preferible, pero ya no se espera que los agentes lo traten como una instrucción de procesamiento especial.

Eso hace que el formato sea más sencillo.

El índice describe y organiza el conocimiento. El agente decide qué conocimiento es relevante para la tarea.

## llms.txt forma parte de una web más amplia legible por IA.

Estos cambios están llegando a medida que la web comienza a adaptarse más deliberadamente a los agentes de IA.

El trabajo experimental de Chrome en el navegador Agencial en Lighthouse, por ejemplo, ahora incluye [un auditoría de descubribilidad de llms.txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt).

Eso no hace que `llms.txt` sea un estándar web universal, ni la publicación de uno garantiza que todos los sistemas de IA lo utilizarán.

Demuestra que el contenido legible por IA está pasando de ser un experimento interesante a algo más.

Los creadores de sitios web están considerando cada vez más no solo cómo la información se presenta a las personas y a los motores de búsqueda, sino también cómo los agentes de software pueden descubrirla y comprenderla de manera fiable.

`llms.txt` ofrece un enfoque deliberadamente simple para ese problema.

## SourceShelf 1.0.2 admite llms.txt v2

SourceShelf trata `llms.txt` como algo más que un archivo para ver.

La versión 1.0.2 amplía el flujo de trabajo a Safari, permitiendo que la colección `llms.txt` de un sitio web compatible se convierta en el punto de partida para un Pack de investigación local. El [Guía de SourceShelf llms.txt](/es-419/docs/guides/llms-txt/) documenta el orden completo de descubrimiento, el flujo de trabajo de selección, las salvaguardias y la procedencia que la aplicación preserva.

Cuando SourceShelf descubre una colección disponible, puedes ver una vista previa de lo que el sitio ofrece, elegir las fuentes que realmente deseas e importar esa selección a SourceShelf.

![Safari muestra un sitio web de investigación sintético, mientras que la extensión real SourceShelf muestra una colección llms.txt descubierta para importarla.](/assets/blog/es-419/llms-txt-v2-safari-discovery.webp)

Esta es una distinción importante.

Un sitio web podría exponer docenas, o eventualmente cientos, de recursos a través de `llms.txt`. Su proyecto de investigación solo podría necesitar cinco.

SourceShelf permite que el índice del sitio ayude con la exploración sin necesidad de que toda la colección se convierta en parte de su contexto de trabajo.

![La revisión de la colección SourceShelf utiliza la interfaz de extensión de envío con doce recursos realistas y solo seis seleccionados para importación.](/assets/blog/es-419/llms-txt-v2-source-selection.webp)

## Desde la recopilación de sitios web hasta el paquete de investigación local

Un flujo de trabajo típico puede verse así:

1. Visite un sitio web en Safari.
2. Abra la extensión SourceShelf.
3. Descubra la colección disponible de `llms.txt` en el sitio.
4. Vea una vista previa de los recursos que expone.
5. Seleccione las fuentes relevantes para su investigación.
6. Importalos a un nuevo o existente paquete SourceShelf.
7. Revisa y organiza la colección resultante localmente.
8. Exporte o comparta el Paquete utilizando el formato adecuado para su flujo de trabajo de IA.

Una vez importadas, esas fuentes ya no son solo una colección de pestañas del navegador.

Se convierten en parte de un proyecto de investigación organizado que puede preservar el orden de las fuentes, los metadatos, la procedencia, los activos archivados y otra información necesaria para mover la investigación entre los flujos de trabajo.

![La interfaz de tres columnas real de SourceShelf muestra un paquete de investigación sintético terminado con recursos de llms.txt, otros documentos y procedencia de importación del sitio web.](/assets/blog/es-419/llms-txt-v2-sourceshelf-pack.webp)

## llms.txt y investigación local primero

Hay una diferencia importante entre **descubrir** información y **poseer tu propia colección de investigación**.

`llms.txt` ayuda con el primer problema.

Le da a los editores una forma de describir conocimientos útiles y ayuda al software compatible a encontrarlos.

SourceShelf aborda el segundo.

Te permite elegir qué fuentes son importantes, preservarlas como un paquete de investigación, combinarlas con tus propios PDF, documentos, notas, escaneos y otro material, y luego decidir cómo debe utilizarse esa colección.

El sitio web sigue siendo el editor.

El archivo `llms.txt` sigue siendo la guía.

Tu paquete SourceShelf se convierte en tu colección de investigación.

## Una colección, múltiples flujos de trabajo de IA

Una importación de `llms.txt` no tiene por qué permanecer una colección de `llms.txt` para siempre.

Una vez que el conocimiento relevante esté organizado en SourceShelf, el mismo paquete puede participar en diferentes flujos de trabajo.

Puede conservarlo como un archivo de investigación portátil, exportar Markdown para otra aplicación, crear un [Paquete de referencia orientado a la IA](/es-419/local-ai-reference-packs/) o exponer un paquete seleccionado a un cliente de IA compatible a través de la integración local de MCP de lectura única de SourceShelf.

Esa separación entre **recopilar conocimiento** y **elegir una herramienta de IA** es intencional.

La investigación útil no debe quedar permanentemente vinculada a cualquier producto de IA que haya ayudado a recopilarla.

Markdown, la procedencia, los paquetes portátiles e interfaces abiertas proporcionan una forma de mantener la investigación útil incluso a medida que cambian las herramientas de IA.

## Lo que llms.txt v2 no hace

Es igualmente importante entender qué no afirma que la propuesta resuelva.

`llms.txt` no es una sustitución para `robots.txt`.

No es una sustitución para un mapa del sitio.

No garantiza que un proveedor de IA indexará un sitio web.

No otorga a un sistema de IA permiso para acceder a contenido de otro modo restringido.

Y no hace que la información sea automáticamente confiable simplemente porque está escrita en Markdown.

Su propósito es mucho más restringido:

**ayudar a un sistema de IA a descubrir y navegar de manera más deliberada el conocimiento útil de los sitios web.**

Esa simplicidad es parte de lo que hace que el formato sea interesante.

## Un pequeño cambio con una mayor implicación

La parte más significativa de `llms.txt` v2 puede no ser ningún cambio individual de sintaxis.

Es el cambio en la suposición detrás de la propuesta.

En 2024, la pregunta era si los sistemas de IA podrían necesitar regularmente que los sitios web se presentaran de una forma más utilizable.

En 2026, los agentes que leen documentación, buscan en sitios web, escriben software, recopilan investigaciones y responden preguntas de fuentes en línea ya son algo normal.

La pregunta se está convirtiendo cada vez más en:

¿Cómo deberían los sitios web hacer que su conocimiento sea descubrible para ellos?

La versión 2 proporciona una mejor respuesta que la versión 1.

Un pequeño índice Markdown puede describir los conocimientos importantes.

Las relaciones web estándar pueden hacer que ese índice sea descubrible.

Clean Markdown puede proporcionar versiones amigables para agentes de páginas individuales.

El escaneo de rutas puede mantener organizados sitios grandes.

Y los agentes solo pueden recuperar la información relevante para la tarea en cuestión.

Con SourceShelf 1.0.2, esa misma estructura también puede convertirse en el comienzo de un flujo de trabajo de investigación privado y portátil, comenzando en la web y continuando en tus propios dispositivos.

La web legible por IA todavía está evolucionando.

Pero con `llms.txt` v2, se está volviendo mucho más fácil de encontrar.
