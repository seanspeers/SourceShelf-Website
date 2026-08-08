# ¿Qué es llms.txt? Crear sitios web y conocimiento preparados para la IA

Los modelos de lenguaje grandes están cambiando la forma en que la gente encuentra información.

En lugar de solo visitar sitios web directamente, la gente está haciendo cada vez más preguntas a los asistentes de IA que requieren información de muchas fuentes.

Los sitios web tradicionales se diseñaron principalmente para visitantes humanos y motores de búsqueda. Contienen menús de navegación, scripts, diseño, anuncios y elementos interactivos. Esas características pueden ser útiles para una persona mientras dificultan que una herramienta automatizada identifique el material más importante.

Una nueva convención llamada `llms.txt` propone una idea más sencilla: crear un pequeño archivo Markdown que ayude a los sistemas de IA a entender qué contiene un sitio web y dónde se encuentra su información más útil.

La [propuesta original de llms.txt](https://llmstxt.org/) lo describe como una forma de proporcionar información adaptada a los modelos de lenguaje para usarla durante la inferencia. Sigue siendo una propuesta y no un estándar web adoptado universalmente, por lo que la compatibilidad varía entre herramientas.

## llms.txt en términos simples

Un archivo `llms.txt` es un documento Markdown normalmente ubicado en la raíz de un sitio web:

```text
https://example.com/llms.txt
```

Puede proporcionar:

- Una breve descripción del sitio web
- Enlaces a páginas importantes y documentación
- Resúmenes que explican qué secciones importantes contienen
- Un grupo opcional de enlaces secundarios que se pueden omitir cuando el contexto es limitado.

El [formato publicado](https://github.com/AnswerDotAI/llms-txt) solo requiere un título H1. También puede incluir un resumen de citas, prosa explicativa, secciones H2 y listas de enlaces Markdown con breves notas.

Es útil comparar la intención de tres archivos de nivel raíz sin tratarlos como equivalentes:

- `robots.txt`: instrucciones sobre preferencias de acceso del rastreador
- `sitemap.xml`: un mapa de las URL y archivos del sitio web
- `llms.txt`: una guía seleccionada de contenido importante para sistemas de IA

## Ejemplo de archivo llms.txt

![Un editor Markdown mostrando un ejemplo de llms.txt para SourceShelf con enlaces a Inicio, Paquetes de IA y Acceso a MCP.](/assets/blog/es-419/llms-txt-markdown-example.webp)

```markdown
# Example Documentation

> Example is a platform for managing research documents.

## Documentation

- [Getting Started](https://example.com/start)
  Learn how to begin.

- [API Reference](https://example.com/api)
  Complete API documentation.

## Guides

- [Importing Data](https://example.com/import)
  Learn supported formats.
```

Markdown es legible sin un visualizador especial. Una persona puede editar y revisar el archivo en un editor de texto, un equipo puede mantenerlo en control de versiones y el software puede interpretar sus encabezados y enlaces sin tener que eliminar primero la interfaz de una página web.

## Por qué existe llms.txt

Una página web normal puede incluir navegación, menús, scripts, enlaces relacionados, anuncios, diseño y controles interactivos. La explicación o documentación oficial puede ser solo una parte de esa página.

La propuesta llms.txt ofrece un punto de entrada seleccionado. No reemplaza las páginas vinculadas; le dice al lector de qué trata la colección y dónde buscar el siguiente paso.

Piensa en un catálogo de una biblioteca. El catálogo no es toda la biblioteca. Te ayuda a encontrar los libros adecuados.

## Beneficios de llms.txt

{{benefit-cards}}

Estos beneficios dependen de que una herramienta elija leer y usar el archivo. Publicar `llms.txt` no causa por sí solo que un servicio de IA descubra, recupere o priorice un sitio web.

## Lo que llms.txt no hace

`llms.txt` no permite:

- Obligar a los sistemas de IA a leer un sitio web
- Garantizar la inclusión en respuestas generadas por IA
- Garantizar mejoras en la búsqueda o en la clasificación de IA
- Reemplazar el SEO normal o una estructura web accesible
- Sustituir `robots.txt`, un mapa del sitio o buenos enlaces internos
- Impedir la extracción automatizada ni conceder permiso de acceso
- Crear automáticamente una base de conocimiento para IA

Es una pista útil y una referencia estructurada, no un sistema de permisos. Los propietarios de sitios web aún necesitan controles de acceso adecuados, licencias, políticas de rastreadores y decisiones de privacidad.

## llms.txt frente a robots.txt

![Tres columnas comparan robots.txt para preferencias de rastreadores, sitemap.xml para URL de sitios web y llms.txt para contexto curado legible por IA.](/assets/blog/es-419/llms-txt-file-comparison.webp)

| Archivo | Propósito |
|---|---|
| `robots.txt` | Comunica las preferencias de acceso del rastreador |
| `sitemap.xml` | Lista de URL y archivos del sitio web |
| `llms.txt` | Proporciona un contexto cuidadosamente seleccionado que es legible por IA |

Estos archivos resuelven problemas diferentes. Google describe [`robots.txt`](https://developers.google.com/search/docs/crawling-indexing/robots/intro) como una forma de indicar a los rastreadores de motores de búsqueda a qué URL pueden acceder, principalmente para gestionar su tráfico. Describe un [mapa del sitio](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) como un archivo que identifica las páginas y los archivos que un sitio considera importantes.

La propuesta llms.txt ni es un mecanismo de control de acceso ni un inventario completo de URL. Es una capa editorial: el propietario del sitio elige un subconjunto útil de material y lo explica de forma concisa en Markdown.

## Crear llms.txt manualmente

Un flujo de trabajo básico es sencillo:

1. Identifica las páginas que mejor explican el sitio web.
2. Cree un archivo Markdown con un título H1 claro y un breve resumen.
3. Agrupa enlaces importantes bajo encabezados descriptivos H2.
4. Añade notas de una oración donde el propósito de un enlace no sea obvio.
5. Coloca el archivo en la raíz del sitio web.

```text
https://website.com/llms.txt
```

Mantén la lista selectiva. Una guía breve del contenido de referencia suele ser más útil que un segundo mapa del sitio con todas las URL. Revisa el archivo cuando la documentación cambie de ubicación, cambien las políticas o se añadan páginas importantes.

## Cómo SourceShelf utiliza llms.txt

SourceShelf trata `llms.txt` como un puente útil entre sitios web y flujos de trabajo de conocimiento local de IA.

Muchos sitios web ya contienen documentación valiosa, investigaciones, políticas, información sobre productos y guías técnicas. Una colección local de llms.txt puede identificar ese material de manera ordenada y legible por humanos. SourceShelf puede importar la colección local a su Biblioteca y crear un paquete guardado que permanecerá en su Mac.

Este flujo de trabajo funciona deliberadamente sin conexión. SourceShelf no rastrea un sitio web ni recupera URL remotas arbitrarias de un índice importado.

### Importar llms.txt con SourceShelf

Una importación típica funciona así:

1. Elija un archivo `llms.txt` o una carpeta que contenga uno.
2. SourceShelf lee el índice local.
3. Las referencias seguras de `.md`, `.markdown` y `.txt` que se encuentran debajo de la carpeta seleccionada se resuelven e importan localmente.
4. El índice se convierte en el primer elemento de la Biblioteca y los documentos locales siguen en el orden del índice.
5. SourceShelf crea un paquete guardado con el nombre del título del índice.

Los enlaces HTTP o HTTPS remotos no se descargan. SourceShelf mantiene sus títulos, descripciones y procedencia como referencias no disponibles para que puedas ver el índice con el nombre sin transferir silenciosamente el contenido del sitio web.

![La vista de conversión SourceShelf con la acción Importar llms.txt disponible para seleccionar una colección local.](/assets/blog/es-419/llms-import-source.webp)

![Un paquete guardado de SourceShelf que muestra los documentos ordenados y los controles del paquete después de organizar el conocimiento de forma local.](/assets/blog/es-419/llms-pack-created.webp)

### Exportar colecciones llms.txt con SourceShelf

SourceShelf también puede crear una **Carpeta de Colección llms.txt** a partir de un paquete guardado:

```text
my-research-pack/
├── llms.txt
├── documents/
├── assets/
├── sourceshelf-manifest.json
└── checksums.sha256
```

La carpeta contiene documentos ordenados, activos archivados con referencias, un manifiesto SourceShelf con procedencia y comprobaciones de suma de verificación deterministas para verificar la integridad. Referencias web no disponibles con procedencia válida pueden aparecer en la sección opcional del índice, pero SourceShelf no las descarga.

![Opciones de exportación de SourceShelf, incluyendo la carpeta de la colección llms.txt, el archivo ZIP AI Reference Pack y el archivo ZIP del paquete OKF.](/assets/blog/es-419/llms-export.webp)

Este es un formato de colección portátil, no una promesa de que todos los productos de IA lo importarán directamente. Puedes mantener la carpeta como conocimiento local legible, adaptarla para otro flujo de trabajo o exportar el mismo paquete guardado en un formato diferente.

### De llms.txt a un flujo de trabajo de SourceShelf

![Un flujo de trabajo pasa de un sitio web y llms.txt a SourceShelf, luego a un paquete de conocimientos y a herramientas de IA seleccionadas.](/assets/blog/es-419/sourceshelf-llms-workflow.webp)

Una vez que una colección es un paquete guardado, puedes exportar un [AI Reference Pack](/local-ai-reference-packs/) o usar Local AI Access para compartir una instantánea inmutable y de solo lectura con un cliente compatible. Solo se expone el paquete seleccionado; SourceShelf no comparte el resto de la Biblioteca.

![SourceShelf Local AI Access mostrando la instantánea actual de solo lectura de un paquete guardado seleccionado.](/assets/blog/es-419/llms-ai-access.webp)

Si estás comenzando con una mezcla más amplia de documentos y páginas web en lugar de un índice existente, el [proceso de trabajo de la base de conocimientos de IA privada](/private-ai-knowledge-base-mac/) explica cómo capturar, organizar y compartir selectivamente fuentes locales.

## Relación con OKF

![Tres etapas muestran llms.txt para el descubrimiento, SourceShelf para la organización y OKF para la preservación.](/assets/blog/es-419/llms-txt-okf-relationship.webp)

`llms.txt` y Open Knowledge Format resuelven problemas diferentes.

- **llms.txt:** ayuda a una herramienta a descubrir y navegar por el conocimiento curado de un sitio web.
- **OKF:** estructura el conocimiento en una colección portátil de conceptos y metadatos de Markdown.
- **SourceShelf:** puede organizar fuentes locales entre esas dos etapas y exportarlas para un flujo de trabajo seleccionado.

La [guía de Open Knowledge Format](what-is-open-knowledge-format-okf.md) explica con más detalle el empaquetado. Ningún formato amplía la ventana de contexto de un modelo ni garantiza que una herramienta utilice todas las fuentes.

## Crear conocimiento que la IA realmente pueda usar

Los sistemas de IA necesitan contexto. Ese contexto es más útil cuando está estructurado, portátil, comprensible y mantenido por las personas que lo crearon.

`llms.txt` es un pequeño paso hacia la facilitación del descubrimiento de conocimientos en línea para los sistemas y agentes de IA. Su valor proviene de una cuidadosa curaduría, resúmenes precisos, enlaces estables y herramientas que deciden apoyar la convención.

SourceShelf amplía esa idea ayudándote a capturar, organizar y empaquetar el conocimiento localmente, para que tu información siga siendo útil en las herramientas de IA que elijas.

## Fuentes oficiales

- [La propuesta y el formato de llms.txt](https://llmstxt.org/)
- [Repositorio de especificaciones de Answer.AI llms.txt](https://github.com/AnswerDotAI/llms-txt)
- [Búsqueda Central de Google: Introducción a robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Búsqueda Central de Google: Aprenda sobre mapas de sitios](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
