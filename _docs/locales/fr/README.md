# Guide de l’utilisateur SourceShelf

SourceShelf transforme les fichiers et la recherche Web en Markdown local, en packs de contexte ordonnés, en exportations portables et en accès en lecture seule optionnel pour les applications locales d'IA. Ce guide est écrit pour SourceShelf 1.0.1.

## Commencez ici

- [Commencer](getting-started.md) — convertissez vos premiers fichiers, construisez un pack et choisissez une exportation.
- [Capture de Safari](guides/safari-capture.md) — pages, contenu principal, sélections, points forts, recettes, avis et raccourcis clavier.
- [Parcourir la bibliothèque](guides/library-and-inspector.md) — recherche, filtres, statut de la source, actions et aperçus.
- [Construire et gérer des packs](guides/build-and-manage-packs.md) - packs enregistrés, commande, brouillons, confiance et sécurité, et rafraîchissement et comparaison.
- [Choisissez un format d'exportation](guides/export-formats.md) - Pack de référence IA, OKF, Markdown, `llms.txt`, et les flux de travail de la presse-papiers.
- [Gérer le stockage](guides/storage-management.md) — examiner l'utilisation locale, effacer en toute sécurité les données obsolètes et supprimer délibérément les sources générées.

## Accès local à l'IA (MCP)

- [Aperçu de l'accès local à l'IA](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [MCP diagnostic des anomalies](mcp/troubleshooting.md)

## Plus de guides

- [Convertir des fichiers et des dossiers](guides/convert-files.md)
- [Confiance et sécurité et packs de vie](guides/trust-safety-and-refresh.md)
- [Importation et exportation llms.txt](guides/llms-txt.md)
- [Référence des paramètres](reference/settings.md)
- [Formats pris en charge](reference/supported-formats.md)
- [Confidentialité et sécurité](reference/privacy-and-security.md)
- [glossaire](reference/glossary.md)

## Un modèle mental utile

SourceShelf garde quatre tâches séparées :

1. **Convertir ou capturer** Crée une source Markdown locale.
2. **bibliothèque** Vous aide à trouver, inspecter et maintenir les sources.
3. **Packs** Organiser les sources sélectionnées dans un ordre délibéré.
4. **Exportation ou accès local à l'IA** Fournit ce pack à un autre flux de travail.

SourceShelf effectue ces tâches localement. Il ne récupère pas de contenu distant pendant la conversion de fichiers, `llms.txt` Importation, exportation, comparaison ou MCP Lit.

Les captures d’écran de la documentation utilisent le corpus de démonstration synthétique de SourceShelf. Les chemins locaux et les valeurs d’autorisation MCP en ont été retirés.
