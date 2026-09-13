# Siri AI se encuentra con SourceShelf en iOS 27 y macOS 27

iOS 27 y macOS 27 traen dos cambios que son importantes para los usuarios de SourceShelf: un modelo más fuerte en **Ask This Pack**, y una arquitectura de sistema más amplia para descubrir investigación a través de **Siri AI**.

En nuestras pruebas de macOS 27, Ask This Pack produjo respuestas más completas, siguió las instrucciones más de cerca y manejó las citas de manera más confiable con el mismo código de recuperación y las mismas indicaciones de SourceShelf.

A nivel del sistema, la nueva arquitectura de IA de Siri de Apple brinda a las aplicaciones una ruta compatible para hacer que su contenido sea descubrible a través de Spotlight e App Intents. Para SourceShelf, eso crea un camino desde la investigación intencionalmente organizada hasta el descubrimiento a nivel del sistema.

Estas son capacidades complementarias. **Ask This Pack se enfoca en un Pack que elijas. Siri AI puede descubrir contenido de aplicaciones disponible en el índice del sistema de Apple.** El flujo de trabajo de Siri descrito aquí es una oportunidad de integración, en lugar dy una afirmación de que cada SourceShelf Pack ya está disponible para Siri.

## Ask This Pack recibe un modelo mejor

La función de Ask This Pack de SourceShelf separa la recuperación de la generación.

Cuando haces una pregunta, SourceShelf busca el paquete seleccionado, construye un conjunto delimitado de evidencia relevante y le pide al modelo Foundation que se ejecuta en el dispositivo de Apple que responda a partir de ese material. El modelo no necesita conocer tu investigación de antemano: SourceShelf proporciona las fuentes que necesita.

Esa arquitectura permite mejoras al modelo de sistema de Apple para beneficiar a SourceShelf sin reemplazar su motor de recuperación ni trasladar tu investigación a otro servicio de IA.

Las [actualizaciones de Foundation Models](https://developer.apple.com/documentation/updates/foundationmodels) de Apple confirman que iOS 27, iPadOS 27, macOS 27 y visionOS 27 incluyen un `SystemLanguageModel` actualizado que se ejecuta en el dispositivo, sigue mejor las instrucciones y ofrece mejores resultados en situaciones complejas. Apple aconseja volver a probar las instrucciones después de actualizar el sistema operativo porque el modelo subyacente cambia.

Lo hicimos.

## La misma versión de SourceShelf, mejores respuestas

Volvimos a realizar nuestra prueba de referencia **Japan Adventure** Ask This Pack de diez preguntas en macOS 27. El código de aplicación SourceShelf, el paquete, las preguntas, la arquitectura de recuperación y las indicaciones no se modificaron. La actualización del sistema operativo introdujo el modelo Foundation actualizado de Apple, junto con otros cambios del sistema.

La ejecución pasó **todos los 10 controles de recuperación, anclaje y citación**. Esa es una tasa de aprobación para este punto de referencia específico, no una afirmación de que cada respuesta fue exhaustiva o libre de errores.

Las nueve preguntas que tenían respaldo en el paquete recibieron respuestas con citas válidas. Ante la pregunta sobre Hokkaido, deliberadamente sin respaldo en las fuentes, SourceShelf se abstuvo correctamente durante la búsqueda, sin invocar el modelo de Apple.

Varias respuestas anteriormente difíciles mejoraron sustancialmente:

- El itinerario incluía los diez días.
- La respuesta de Hakone preservó cada etapa del viaje y las dos alternativas previstas según el clima.
- Las recomendaciones del templo incluían prioridades concretas y plazos.
- Las respuestas sobre alojamiento, viajes en tren, presupuesto, comida y fuentes contradictorias fueron precisas y útiles.

Aún había omisiones. Una lista exhaustiva de reservas omitió un elemento de medición de equipaje y repitió un elemento de nota dietética. Una respuesta sobre comida pasó por alto una recomendación opcional del Día 6. Las citas y la revisión de las fuentes siguen siendo útiles incluso cuando la respuesta general es buena.

### Rendimiento en macOS 27

| Métrica | Resultado de macOS 27 |
| --- | ---: |
| Recuperación promedio | 0.506 s |
| Tiempo promedio hasta el primer texto | 1.127 s |
| Tiempo mediano de generación | 5.541 s |
| Tiempo promedio de generación | 7.565 s |

Las dos preguntas más exhaustivas, que cubren el itinerario completo y la lista de verificación de reservas, cada una tardó aproximadamente 15 segundos en generarse. Ese tiempo adicional produjo respuestas sustancialmente más completas.

Estos son los resultados de las pruebas internas de SourceShelf. Esta no es una comparación controlada entre macOS 26 y macOS 27: ya no podemos volver a ejecutar el sistema operativo anterior en la misma máquina, y una actualización del sistema operativo puede cambiar más que el modelo. Los resultados son consistentes con las mejoras documentadas del modelo de Apple, pero no permiten aislar su contribución de los demás cambios del sistema.

La observación práctica sigue siendo útil: **el mismo proceso de búsqueda de evidencias de SourceShelf produjo respuestas sustancialmente mejores en macOS 27.** Puedes ver el flujo de trabajo de investigación subyacente en nuestro [Ejemplo de planificación de un viaje a Japón](/es-419/examples/japan-trip-ai-planner/).

## La recuperación híbrida sigue siendo importante

Un resultado destacó por qué SourceShelf combina recuperación semántica y léxica.

Para una pregunta sobre información conflictiva, Core Spotlight rechazó la rama de búsqueda semántica como insegura. El camino léxico de SourceShelf aún encontró la evidencia correcta, y la respuesta final permaneció precisa.

La recuperación semántica encuentra ideas relacionadas incluso cuando la redacción difiere. La recuperación léxica ayuda con nombres, fechas, frases e identificadores exactos, y proporciona otra ruta cuando la búsqueda semántica falla. En este intento, mantener ambos caminos evitó quy una búsqueda rechazada se convirtiera en una respuesta fallida.

La sesión WWDC26 de Apple, [Búsqueda de LLM usando Core Spotlight](https://developer.apple.com/videos/play/wwdc2026/246/), demuestra cómo conectar contenido indexado al marco de Modelos Fundacionales mediante la invocación de herramientas. También explica cómo los metadatos y el diseño de recuperación afectan la calidad de las respuestas fundamentadas.

Un modelo más fuerte ayuda con la respuesta final. La recuperación aún determina qué evidencia recibe.

## Siri AI cambia lo que significa Spotlight

El segundo cambio ocurre fuera de Ask This Pack.

La [introducción a Siri AI](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) de Apple describe un asistente reconstruido que combina modelos de lenguaje con contexto personal, comprensión del contenido en pantalla y capacidades del sistema, incluidas Spotlight y App Toolbox. El contexto personal puede extenderse a aplicaciones de terceros cuando los desarrolladores se integran con Spotlight.

Las aplicaciones pueden representar su contenido como **Entidades de Aplicación** y añadirlo al índice semántico de Spotlight. Apple Intelligence puede entonces encontrar ese contenido cuando alguien describe lo que necesita, incluso cuando el lenguaje no coincide exactamente con el título. Apple lo documenta en [Apple Intelligence y Siri AI](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai) y [Hacer disponibles las entidades de aplicaciones en Spotlight](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight).

Eso crea una conexión natural con las colecciones de investigación estructuradas de SourceShelf.

## De un paquete al contexto personal de Siri

SourceShelf convierte PDFs, páginas web, escaneos, notas, presentaciones, hojas de cálculo y otra investigación en Paquetes enfocados. Un Paquete también se puede exportar como un **bundle Open Knowledge Format (OKF) v0.2**, que contiene Markdown legible e información estructurada sobre sus fuentes.

Nuestra [guía de Open Knowledge Format](/es-419/blog/what-is-open-knowledge-format-okf/) explica cómo Markdown, los metadatos, la procedencia y un índice mantienen ese conocimiento portátil. La [especificación OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) describe el formato.

La arquitectura de Apple proporciona otro posible uso para ese mismo conocimiento organizado.

![Una rama de SourceShelf Pack se ramifica en Ask This Pack para obtener respuestas locales, un paquete OKF para la exportación portátil y una posible integración de Siri mediante entidades de aplicaciones y Spotlight. La rama de Siri requiere integración de aplicaciones.](/assets/blog/es-419/siri-ai-knowledge-paths.svg)

El diagrama muestra un camino de integración conceptual. **Siri no necesita convertirse en un parser OKF, y exportar un ZIP no lo agrega automáticamente al contexto personal de Siri.**

En su lugar, SourceShelf puede utilizar su conocimiento del paquete y su estructura compatible con OKF para representar contenido útil como entidades de aplicación. Con la integración adecuada de Spotlight e App Intents, esas entidades pueden volverse descubribles por el sistema. Una exportación de OKF y un índice de Spotlight son salidas separadas de la colección subyacente; exportar un archivo OKF no es un requisito previo para indexar el contenido de la aplicación.

La [guía de iOS de WWDC26](https://developer.apple.com/wwdc26/guides/ios/) de Apple explica que los esquemas de entidades añaden el contenido de la aplicación al índice semántico, donde Siri puede mostrarlo con atribución a la aplicación de origen.

**El conocimiento permanece portátil. El índice es otra forma de usarlo.**

## Respuestas enfocadas y descubrimiento a nivel de sistema

Ask This Pack y Siri AI sirven para diferentes necesidades.

Con **Ask This Pack**, eliges la colección. SourceShelf recupera evidencia de esa colección y devuelve respuestas fundamentadas con citas. Cuando la colección carece de evidencia suficiente, SourceShelf puede abstenerse en lugar de ampliar la búsqueda a información no relacionada.

Por ejemplo:

> ¿Qué dice mi paquete Japón sobre lo que necesito reservar antes de llegar a Hakone?

Con **Siri AI**, el contenido SourceShelf indexado adecuadamente podría encontrarse a partir dy una solicitud a nivel de sistema, sin abrir primero un paquete o recordar el título exacto de un documento.

La distinción es el razonamiento enfocado versus el descubrimiento a nivel de sistema. Un paquete sigue siendo la colección que organizas; Siri ofrecy una posible forma de encontrar el contenido que está disponible para él.

## Primero local, con límites de privacidad precisos

Ask This Pack utiliza el modelo Foundation en el dispositivo de Apple en los dispositivos compatibles. SourceShelf recupera la evidencia localmente y no envía un paquete a un servidor SourceShelf.

Spotlight también es una capacidad de sistema en el dispositivo. Apple describe el orquestador de sistemas de Siri AI utilizando Spotlight y App Toolbox localmente, mientras que el procesamiento del modelo de lenguaje de Siri puede ejecutarse en el dispositivo o a través de Private Cloud Compute. Estos límites de ejecución difieren del flujo de trabajo en el dispositivo de Ask This Pack. Consulta el [Anuncio de la arquitectura de IA de Siri](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) de Apple para esa distinción.

Por lo tanto, hacer que el contenido sea descubrible para Siri no debe describirse como una garantía de que cada solicitud de Siri permanezca en el dispositivo. Tampoco requiere convertir SourceShelf en un servicio de conocimiento en la nube: la Biblioteca, el Markdown convertido, la estructura del paquete, las exportaciones y el pipeline de recuperación de SourceShelf permanecen bajo el control del usuario.

## Por qué el conocimiento abierto se vuelve más valioso

La IA en los sistemas operativos está cambiando rápidamente. Eso hace que el conocimiento portátil sea más útil.

Un paquete SourceShelf compatible con OKF preserva Markdown legible, metadatos, procedencia, relaciones entre fuentes y un índice de la colección. SourceShelf puede usarlo con Ask This Pack, exportarlo a otra herramienta compatible o utilizar su contenido estructurado como base para la integración de un sistema.

La parte duradera es la investigación que recopilaste y organizaste. Un nuevo modelo debería mejorar la forma en que utilizas ese conocimiento sin obligarte a reconstruirlo.

El modelo Foundation de Apple puede cambiar. Siri puede cambiar. Tu investigación no tiene por qué hacerlo.

## Disponibilidad y qué esperar

El [Anuncio de septiembre](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/) de Apple indica que Siri AI comienza a implementarse con iOS 27 **como beta el 14 de septiembre de 2026**, para dispositivos compatibles configurados en inglés. Para obtener información sobre las funciones y la compatibilidad de macOS 27, consulta el [Resumen de macOS](https://www.apple.com/os/macos/) de Apple.

Apple Intelligence requiere hardware compatible, incluidos los Mac con chips de Apple y los iPhone compatibles, como el iPhone 15 Pro y modelos posteriores compatibles. La disponibilidad de funciones varía según el dispositivo, el idioma y la región; consulta [Información sobre la disponibilidad de Apple Intelligence](https://www.apple.com/apple-intelligence/) de Apple para tu dispositivo.

En Ask This Pack, actualizar un dispositivo compatible con Apple Intelligence activado permite acceder al modelo actualizado que se ejecuta en el dispositivo. Estos resultados provienen de macOS 27; no son mediciones realizadas en un iPhone ni garantizan el mismo rendimiento en todos los dispositivos.

El camino de descubrimiento de Siri también depende de que SourceShelf exponga contenido adecuado a través de las APIs de integración de Apple. La actualización del sistema operativo por sí sola no hace que todos los paquetes estén disponibles para Siri.

## Un paquete, varias formas de usarlo

SourceShelf comenzó con una idea simple: la investigación debe seguir siendo útil después de guardarla.

Puedes leer un paquete enfocado, consultarlo de forma privada con Ask This Pack, exportarlo como un paquete OKF abierto o buscar en él con otra herramienta compatible. La arquitectura de indexación semántica de Siri AI abry una vía adicional para descubrir contenido seleccionado de las aplicaciones.

La capa de IA puede seguir mejorando mientras que la colección subyacente permanece abierta, estructurada, local y reutilizable.

## Fuentes oficiales

- [Actualizaciones de modelos de fundación — Desarrollador de Apple](https://developer.apple.com/documentation/updates/foundationmodels): la guía actualizada sobre el modelo en dispositivo y las instrucciones para volver a probar la solicitud.
- [Apple presenta Siri AI — Apple Newsroom](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/): contexto personal, arquitectura del sistema y límites de privacidad.
- [Apple Intelligence y Siri AI — Desarrollador de Apple](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai): cómo el contenido y las acciones de la aplicación se conectan con Apple Intelligence.
- [Hacer disponibles las entidades de aplicaciones en Spotlight — Desarrollador de Apple](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight): indexación de entidades para el descubrimiento del sistema.
- [Búsqueda de LLM usando Core Spotlight — WWDC26](https://developer.apple.com/videos/play/wwdc2026/246/): recuperación, llamada de herramientas y calidad de metadatos.
- [Guía de iOS WWDC26 — Desarrollador de Apple](https://developer.apple.com/wwdc26/guides/ios/): esquemas de entidades y atribución a la aplicación de origen.
- [Anuncio de iPhone de septiembre — Sala de prensa de Apple](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/): Lanzamiento de la versión beta del 14 de septiembre de Siri AI.
