# Formats pris en charge

SourceShelf détecte les formats à partir de l’extension du fichier et du type de contenu macOS.

## Entrées locales prises en charge

| Format | Extensions | Comportement principal |
| --- | --- | --- |
| PDF | `.pdf` | Extrait le texte et la structure des pages et utilise l’OCR local pour les pages numérisées. |
| Texte brut | `.txt`, `.text` et types de texte brut compatibles | Conserve le texte lisible. |
| Markdown | `.md`, `.markdown` et types compatibles | Conserve le Markdown comme contenu source de référence. |
| HTML | `.html`, `.htm` | Extrait la structure HTML locale sans charger de ressources distantes. |
| Texte enrichi | `.rtf` | Extrait le texte mis en forme dans une structure compatible avec Markdown. |
| Images | `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.heic`, `.heif` | Utilise l’OCR local. |
| Microsoft Word | `.docx` | Extrait les titres, paragraphes, listes et tableaux pris en charge, ainsi que les images compatibles. |
| Microsoft PowerPoint | `.pptx` | Extrait les limites des diapositives, les titres, les listes, le texte et les tableaux. |
| Microsoft Excel | `.xlsx` | Extrait les limites des feuilles et les tableaux. |

L’extension Safari capture également des pages Web et des sélections. L’importation locale d’un fichier `llms.txt` accepte un index accompagné de liens relatifs vers des fichiers `.md`, `.markdown` et `.txt`.

## Formats non pris en charge directement

Les anciens fichiers Office `.doc`, `.ppt` et `.xls` sont détectés, mais ne sont pas convertis. Enregistrez-les d’abord au format `.docx`, `.pptx` ou `.xlsx`.

Les limites actuelles concernent notamment l’évaluation avancée des formules de feuilles de calcul, les animations, médias et notes du présentateur PowerPoint, les nouveaux médias Office intégrés, les notes de bas de page et le suivi des modifications Word, la précision de l’OCR et la conservation des mises en page numérisées complexes.

## Formats de sortie

Toutes les conversions créent du Markdown. Les packs peuvent produire un ZIP de pack de référence IA, un bundle OKF v0.2, un pack de contexte Markdown, un dossier de collection `llms.txt` ou du Markdown copié dans le presse-papiers.
