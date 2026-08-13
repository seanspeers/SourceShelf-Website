# Convertir des fichiers et des dossiers

SourceShelf convertit les documents locaux pris en charge en Markdown sans les télécharger ni faire de requêtes réseau.

## Manières de commencer une conversion

- Faites glisser des fichiers ou des dossiers dans **convertir**.
- sélectionner **Sélectionner des fichiers** ou **Sélectionner le dossier**.
- utiliser **Fichier > Ouvrir** Pour les fichiers.
- Utilisez **Fichier > Importer un pack de recherche…** pour un pack SourceShelf, un ZIP OKF, un pack portable `llms.txt`, un fichier `llms.txt` autonome ou un dossier de collection `llms.txt`.
- Utilisez l'action Accès rapides SourceShelf pour une conversion de fichiers automatisée.

Lors de la conversion d'un dossier, SourceShelf examine les fichiers pris en charge à l'intérieur et signale les éléments omis. La conversion de dossier ne transforme pas le dossier lui-même en un pack enregistré ; ajoutez les éléments de la bibliothèque résultants à un pack ultérieurement.

L’importation d’un pack portable suit un parcours distinct de prévisualisation et de validation. Avant de créer un nouveau pack enregistré, SourceShelf affiche le format détecté, le nombre de sources et d’éléments archivés, l’origine, l’état d’intégrité et les avertissements. Le Markdown et les éléments archivés sont enregistrés dans le dossier de sortie actuellement autorisé. Les archives volumineuses affichent leur progression, peuvent être annulées et sont inspectées sans bloquer l’interface principale.

## Qu'est-ce qui est préservé ?

SourceShelf construit un document sémantique avant de générer de nouveaux Markdown. En fonction de la source, il peut conserver les titres, les paragraphes, les listes, les tableaux, le code, les images, les légendes, les limites des diapositives ou des pages et le contenu de secours brut.

Pour les PDF et images numérisés, SourceShelf utilise l'OCR local. La reconnaissance de documents structurés est utilisée lorsque disponible sur la version macOS installée ; les systèmes plus anciens utilisent le chemin OCR de compatibilité.

## Noms de sortie et collisions

Les noms générés sont désinfectés pour le système de fichiers. Si la destination contient déjà le même nom, SourceShelf choisit un nom sûr contre les collisions au lieu de le remplacer silencieusement.

Les chemins de fichiers source sont conservés pour les actions locales d'ouverture et de révélation d'Open, mais ne sont pas placés dans les manifeste exportés. MCP Instantanés, ou provenance générée pour les conversions de fichiers.

## Mémoire cache sémantique

Pour les articles gérés, les magasins SourceShelf stockent `semantic-document.json` dans le répertoire géré de manière privée de l'élément. Il comprend le chèque de somme exact en octets Markdown utilisé pour décider si la cache est toujours valide.

Si vous modifiez le Markdown dans une autre application, SourceShelf détecte le changement de chiffrage et le reformule lorsqu'il en a besoin. Il ne réécrit pas votre fichier modifié. Un cache sémantique manquant ou endommagé n'est pas bloquant.

## Si une conversion échoue

1. Confirmez que la source existe toujours et peut être ouverte dans son application normale.
2. Confirmez que le dossier de sortie est disponible dans **Paramètres > Général**.
3. Essayez un seul fichier plutôt qu'un dossier entier pour isoler le format.
4. Pour un scan, vérifiez que la page est droite et qu'elle a suffisamment de contraste pour l'OCR.
5. Vérifiez si le type de fichier apparaît dans [Formats pris en charge](../reference/supported-formats.md).
