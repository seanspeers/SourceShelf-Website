# Importer et lire des documents sur iPhone et iPad

SourceShelf convertit les documents locaux compatibles en Markdown canonique dans sa bibliothèque privée sur l’appareil. La conversion, l’OCR, l’indexation et la lecture n’entraînent aucun téléversement de vos documents.

## Importer depuis Fichiers

Ouvrez le menu **Plus** de la barre latérale ou **Réglages > Importation et exportation**, puis choisissez **Importer des recherches…**. Vous pouvez sélectionner plusieurs fichiers compatibles. SourceShelf affiche la progression des opérations longues et propose **Annuler** pendant une importation.

Les entrées locales compatibles sont :

- PDF ;
- JPEG, PNG, HEIC/HEIF, TIFF et autres images décodables par les frameworks d’Apple ;
- RTF ;
- Markdown et texte brut, y compris un fichier `llms.txt` autonome ;
- ZIP Pack de référence IA, ZIP Bundle OKF v0.2 et ZIP Package `llms.txt` portable.

## Importer depuis la feuille de partage

Dans Fichiers, Photos, Safari ou une autre app, ouvrez **Partager** et choisissez SourceShelf pour un document compatible. L’extension de partage légère copie le fichier autorisé dans une boîte de réception locale limitée. L’app SourceShelf principale effectue la conversion et ajoute la source à la bibliothèque.

Si SourceShelf n’apparaît pas, utilisez **Plus** dans la feuille de partage pour l’activer, ou enregistrez le fichier dans Fichiers et utilisez **Importer des recherches…**.

## Reconnaissance des PDF et des images

Pour les PDF, SourceShelf utilise le texte sélectionnable lorsqu’il est exploitable et applique l’OCR Vision local uniquement aux pages qui en ont besoin. L’ordre des pages est conservé. Les PDF protégés par mot de passe, incorrects, trop volumineux ou non compatibles échouent sans créer de source terminée.

Pour une image importée, SourceShelf conserve les octets d’origine dans le dossier privé des ressources de cette source et ajoute le texte reconnu lorsqu’il existe. L’image reste ainsi visible hors ligne et le texte reconnu participe à la recherche dans la Bibliothèque. Les métadonnées intégrées à l’image restent locales, sauf si vous exportez ensuite un pack contenant cette ressource.

La conversion RTF conserve les paragraphes lisibles, la mise en évidence de base, les liens sûrs, les listes simples et les pièces jointes image compatibles. RTFD n’est pas pris en charge.

## Rechercher et filtrer

La recherche porte sur le contenu déjà indexé dans la bibliothèque locale. Sélectionnez **Toutes les recherches**, **Favoris** ou un pack avant de chercher pour limiter le contexte. Utilisez Filtrer pour limiter les sources par disponibilité ou type d’acquisition, et Trier pour modifier l’ordre visible.

## Utiliser le Lecteur

Le Lecteur affiche le titre, le type, la date, le lien sûr vers le site d’origine lorsqu’il existe, la provenance, les remarques de disponibilité, le contenu Markdown et les images archivées localement. Le texte peut être sélectionné. Les liens Web et courriel ne s’ouvrent par une action système qu’après les avoir touchés.

SourceShelf n’exécute aucun script, ne charge aucun chemin de fichier arbitraire et ne récupère pas d’image distante dans le Lecteur. Une image locale indisponible est indiquée comme telle au lieu d’être téléchargée.

## Limites actuelles

Dans la version 1.0.2, l’iPhone et l’iPad n’importent pas les fichiers RTFD, les documents Office, les fichiers HTML locaux ni les dossiers. Utilisez SourceShelf sur Mac pour convertir les fichiers DOCX, PPTX, XLSX, HTML ou des lots de dossiers, puis exportez un pack portable pour consulter les résultats sur iPhone ou iPad.
