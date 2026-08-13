# Guide de l’utilisateur SourceShelf

Langues : [English](../../README.md) · **Français** · [Español (Latinoamérica)](../es-419/README.md) · [Português (Brasil)](../pt-BR/README.md) · [日本語](../ja/README.md)

SourceShelf transforme des fichiers et des recherches Web en Markdown local, organise les sources en packs et permet de les exporter dans des formats portables. Ce guide couvre SourceShelf 1.0.2 sur Mac, iPhone et iPad.

## Bien démarrer sur Mac

- [Bien démarrer sur Mac](getting-started.md) — convertissez vos premiers fichiers, créez un pack et choisissez un format d’exportation.
- [Capturer depuis Safari](guides/safari-capture.md) — pages, contenu principal, sélections, extraits, recettes, révision et raccourcis clavier.
- [Parcourir la Bibliothèque](guides/library-and-inspector.md) — recherche, filtres, état des sources, actions et aperçus.
- [Créer et gérer des packs](guides/build-and-manage-packs.md) — packs enregistrés, ordre, brouillons, Confiance et sécurité, et Actualiser et comparer.
- [Choisir un format d’exportation](guides/export-formats.md) — Pack de référence IA, OKF, Markdown, `llms.txt` et presse-papiers.
- [Gérer le stockage](guides/storage-management.md) — consultez l’espace utilisé, nettoyez les données obsolètes et supprimez volontairement des sources générées.

## Bien démarrer sur iPhone ou iPad

- [Bien démarrer sur iPhone et iPad](ios/getting-started.md) — découvrez l’interface adaptative Bibliothèque, Packs, Sources et Lecteur.
- [Capturer depuis Safari](ios/safari-capture.md) — activez l’extension, capturez des pages ou une fenêtre Safari et importez les collections `llms.txt` d’un site.
- [Importer et lire des documents](ios/import-and-read.md) — utilisez Fichiers, la feuille de partage, l’OCR local, la recherche et la lecture hors ligne.
- [Créer, exporter et déplacer des packs](ios/packs-and-portability.md) — organisez vos recherches et déplacez des packs complets avec Fichiers ou AirDrop.
- [Réglages et confidentialité](ios/settings-and-privacy.md) — consultez le stockage local, les accès Safari et le fonctionnement sans compte ni synchronisation.

## Accès local à l’IA sur Mac

- [Présentation de l’Accès local à l’IA](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [Dépannage MCP](mcp/troubleshooting.md)

## Autres guides et références

- [Convertir des fichiers et des dossiers](guides/convert-files.md)
- [Confiance et sécurité et packs évolutifs](guides/trust-safety-and-refresh.md)
- [Importer et exporter llms.txt](guides/llms-txt.md)
- [Référence des réglages](reference/settings.md)
- [Formats pris en charge](reference/supported-formats.md)
- [Confidentialité et sécurité](reference/privacy-and-security.md)
- [Glossaire](reference/glossary.md)

## Un modèle simple

SourceShelf sépare quatre tâches :

1. **Convertir ou capturer** crée une source Markdown locale.
2. **Bibliothèque** permet de trouver, consulter et gérer les sources.
3. **Packs** organise les sources sélectionnées dans l’ordre souhaité.
4. **Exporter ou Accès local à l’IA** remet le pack à un autre flux de travail.

SourceShelf effectue ces tâches localement. L’importation de fichiers locaux, la conversion, l’OCR, la lecture, l’exportation, la comparaison et l’accès MCP ne récupèrent aucun contenu distant. La capture de sites Web et l’acquisition de `llms.txt` depuis un site sont des actions explicites de l’extension Safari, soumises aux autorisations de sites Web de Safari.

Les captures d’écran de la documentation utilisent le corpus de démonstration synthétique de SourceShelf; les chemins locaux et les valeurs d’autorisation MCP en ont été retirés.
