# Crear, exportar y mover paquetes en iPhone y iPad

Un paquete es una colección ordenada de fuentes de la Biblioteca. Organiza la investigación sin duplicar las fuentes subyacentes.

## Crear y administrar un paquete

Usa **Nuevo paquete** en la barra lateral para crear un paquete vacío. Para agregar investigación, abre las acciones de una fuente o entra al modo de selección, elige **Agregar al paquete…** y selecciona un paquete existente o crea uno nuevo.

Dentro de un paquete, **Quitar del paquete** elimina solo la pertenencia. La fuente permanece en **Toda la investigación**. Cambia el nombre de un paquete o elimínalo desde su menú contextual; eliminar un paquete también conserva sus fuentes.

La búsqueda, los filtros y el orden se aplican a la Biblioteca o vista de paquete seleccionada. En iPad, el paquete, la lista de fuentes y el Lector pueden permanecer visibles juntos cuando hay espacio. En iPhone, recorre la misma jerarquía una pantalla a la vez.

## Exportar un paquete

Abre un paquete y selecciona **Más > Exportar paquete…**, o elige **Configuración > Exportar un paquete…**. SourceShelf 1.0.2 para iPhone y iPad ofrece:

- **ZIP de Paquete de referencia de IA** para chats de IA y espacios de proyectos;
- **Bundle OKF v0.2** para catálogos y agentes basados en estándares;
- **Paquete llms.txt portátil** para una colección completa compatible con estándares.

Después de que SourceShelf crea el ZIP, la hoja para compartir del sistema permite guardarlo en Archivos, enviarlo con AirDrop o pasarlo a otra app seleccionada.

## Importar un paquete portátil

Elige **Importar investigación…** y selecciona un ZIP compatible. SourceShelf detecta y valida paquetes SourceShelf de referencia de IA, OKF y `llms.txt` portátiles, además de paquetes compatibles admitidos. Comprueba las sumas de verificación y relaciones declaradas antes de confirmar la importación.

Una importación crea un paquete local nuevo e identificadores de fuente nuevos. Importar el mismo paquete dos veces crea dos paquetes independientes; no fusiona ni reemplaza el primero silenciosamente.

La integridad del paquete significa que los bytes importados coinciden con el inventario declarado. No demuestra quién creó el paquete ni que su investigación sea segura. El texto importado sigue siendo contenido de referencia y no se interpreta como instrucciones de la app.

## Continuar en Mac

Exporta un paquete en iPhone o iPad, muévelo mediante Archivos o AirDrop y selecciona **Importar paquete de investigación…** en SourceShelf para Mac. También puedes exportar en Mac y seleccionar el paquete resultante con **Importar investigación…** en iPhone o iPad.

Esto es portabilidad deliberada mediante archivos, no sincronización automática ni en vivo. Los cambios realizados en un dispositivo no actualizan las copias de otro, salvo que exportes e importes un paquete nuevo.
