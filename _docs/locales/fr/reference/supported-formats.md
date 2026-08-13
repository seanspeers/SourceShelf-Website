# Formats pris en charge

Sur Mac, SourceShelf détecte les formats à partir de l’extension du fichier et du type de contenu macOS. L’iPhone et l’iPad prennent en charge l’ensemble ciblé d’importations locales décrit ci-dessous.

## Entrées locales prises en charge

| format | Extensions | Comportement principal |
| --- | --- | --- |
| PDF | `.pdf` | Extrait le texte et la structure de la page ; utilise l'OCR local pour les pages numérisées. |
| texte en clair | `.txt`, `.text` Et des types de texte brut compatibles | Conserve le texte lisible. |
| rabais | `.md`, `.markdown` Et types compatibles | Conserve le Markdown comme contenu source autoritaire. |
| HTML | `.html`, `.htm` | Extrait la structure HTML locale sans charger de ressources distantes. |
| Texte riche | `.rtf` | Extrait le texte formaté dans une structure compatible avec Markdown. |
| Images | `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.heic`, `.heif` | Utilise l'OCR local. |
| Microsoft Word | `.docx` | Extrait les titres, les paragraphes, les listes, les tableaux et le traitement des images existants pris en charge. |
| Microsoft PowerPoint | `.pptx` | Extrait les limites des diapositives, les titres, les listes, le texte et les tableaux. |
| Microsoft Excel | `.xlsx` | Extrait les limites des feuilles et les tableaux. |

L’extension Safari capture aussi des pages Web, des sélections, des passages surlignés et plusieurs onglets de la fenêtre active. Elle peut découvrir et acquérir les collections `llms.txt` de sites Web selon les autorisations de Safari. L’importation d’un fichier `llms.txt` local reste hors ligne et accepte un index avec des liens relatifs vers des fichiers `.md`, `.markdown` et `.txt` inclus.

## iPhone et iPad

Depuis Safari, SourceShelf capture les pages Web autorisées et importe les collections de recherche `llms.txt`. Depuis la feuille de partage, Fichiers ou **Importer des recherches…**, il accepte :

- les PDF texte, numérisés ou mixtes, avec OCR Vision local uniquement lorsque le texte natif est insuffisant ;
- les images décodées par les frameworks d’Apple, notamment JPEG, PNG, HEIC/HEIF et TIFF ;
- RTF, Markdown, texte brut et `llms.txt` autonome ;
- les exports ZIP Pack de référence IA, Bundle OKF v0.2 et Package `llms.txt` portable.

Les importations PDF et RTF conservent le Markdown canonique plutôt que le document d’origine, comme sur Mac. Une image importée conserve ses octets d’origine dans les ressources privées de la source pour rester visible hors ligne ; les métadonnées intégrées éventuelles restent locales. Le texte reconnu ou converti participe à la recherche normale de la bibliothèque.

Toutes les conversions et l’OCR s’effectuent sur l’appareil. Les PDF protégés par mot de passe échouent proprement sans créer de source. RTFD, les documents Office, la conversion de fichiers HTML et l’importation de dossiers restent indisponibles sur iPhone et iPad. L’extension de partage ne s’enregistre pas pour le type générique `public.data` ; le sélecteur explicite de l’app peut reconnaître en toute sécurité un fichier pris en charge mal étiqueté grâce à sa signature ou à son décodage réel.

## Pas pris en charge directement

Bureau héritier `.doc`, `.ppt`, et `.xls` Les fichiers sont détectés mais non convertis. Enregistrez-les sous le nom de `.docx`, `.pptx`, ou `.xlsx` Premier.

Les limitations actuelles comprennent l'évaluation avancée des formules de feuilles de calcul, les animations/médias/notes de conférenciers PowerPoint, les médias Office intégrés nouvellement extraits, les notes de bas de page Word et les révisions suivies, le OCR parfait et la préservation complexe du mise en page numérisée.

## Formats de sortie

Toutes les conversions créent du Markdown. Sur Mac, les packs peuvent produire un ZIP Pack de référence IA, un ZIP Bundle OKF v0.2, un pack de contexte Markdown, un ZIP Package `llms.txt` portable, un dossier de collection `llms.txt` ou du Markdown dans le presse-papiers. Sur iPhone et iPad, ils peuvent produire un ZIP Pack de référence IA, un ZIP Bundle OKF v0.2 ou un ZIP Package `llms.txt` portable par la feuille de partage du système.
