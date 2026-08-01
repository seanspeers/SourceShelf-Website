# Importar y exportar llms.txt

De SourceShelf `llms.txt` el soporte es experimental y deliberadamente sin conexión. Puede importar un índice local y generar una carpeta de colección portátil, pero nunca busca enlaces en Internet.

## Importar una colección

elegir **Archivo > Importar llms.txt...** o usa la acción en **convertir**. elegir cualquiera de los siguientes:

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
