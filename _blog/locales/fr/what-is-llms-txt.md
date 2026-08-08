# Qu’est-ce que llms.txt? Créer des sites Web et des connaissances adaptés à l’IA

Les grands modèles de langage changent la façon dont les gens trouvent des informations.

Au lieu de visiter uniquement les sites Web directement, les gens posent de plus en plus de questions aux assistants IA qui nécessitent des informations provenant de nombreuses sources.

Les sites Web traditionnels étaient conçus principalement pour les visiteurs humains et les moteurs de recherche. Ils contiennent des menus de navigation, des scripts, un style, des publicités et des éléments interactifs. Ces fonctionnalités peuvent être utiles pour une personne, mais elles rendent plus difficile pour un outil automatisé d'identifier le matériel le plus important.

Une convention émergente appelée `llms.txt` propose une idée plus simple : créer un petit fichier Markdown qui aide les systèmes d'IA à comprendre ce qu'un site Web contient et où se trouvent ses informations les plus utiles.

La [proposition originale de llms.txt](https://llmstxt.org/) le présente comme un moyen de fournir aux modèles de langage des informations adaptées à leur utilisation au moment de l’inférence. Il s’agit encore d’une proposition, et non d’une norme Web universellement adoptée; sa prise en charge varie donc selon les outils.

## llms.txt en termes simples

Un fichier `llms.txt` est un document Markdown normalement placé dans le répertoire racine d'un site Web :

```text
https://example.com/llms.txt
```

Il peut fournir :

- Une brève description du site Web
- Liens vers des pages et des documents importants
- Des résumés qui expliquent le contenu des sections importantes
- Un groupe facultatif de liens secondaires qui peut être omis lorsque le contexte est limité

Le [format publié](https://github.com/AnswerDotAI/llms-txt) exige seulement un titre H1. Il peut aussi comprendre un résumé sous forme de citation, un texte explicatif, des sections H2 et des listes de liens Markdown accompagnées de courtes notes.

Il est utile de comparer l'intention de trois fichiers de niveau racine sans les traiter comme équivalents :

- `robots.txt` : instructions sur les préférences d'accès des robots de recherche.
- `sitemap.xml` : une carte des URL et des fichiers du site Web.
- `llms.txt` : un guide sélectionné des contenus importants pour les systèmes d'IA.

## Exemple de fichier llms.txt

![Un éditeur Markdown montrant un exemple llms.txt pour SourceShelf avec des liens vers le démarrage, les packs d'IA et l'accès MCP.](/assets/blog/fr/llms-txt-markdown-example.webp)

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

Markdown est lisible sans un lecteur spécial. Une personne peut modifier et examiner le fichier dans un éditeur de texte, une équipe peut le garder dans un contrôle de version, et le logiciel peut interpréter ses titres et ses liens sans d'abord supprimer l'interface d'une page Web.

## Pourquoi llms.txt existe-t-il ?

Une page Web normale peut inclure la navigation, les menus, les scripts, les liens connexes, les publicités, le style et les contrôles interactifs. L’explication ou la documentation faisant autorité peut n’occuper qu’une partie de cette page.

La proposition llms.txt offre un point d'entrée sélectionné. Elle ne remplace pas les pages liées ; elle indique au lecteur à quoi sert la collection et où chercher ensuite.

Pensez à un catalogue de bibliothèque. Le catalogue n'est pas toute la bibliothèque. Il vous aide à trouver les bons livres.

## Avantages de llms.txt

{{benefit-cards}}

Ces avantages dépendent d'un outil qui choisit de lire et d'utiliser le fichier. La publication de `llms.txt` ne provoque pas en soi qu'un service d'IA découvre, récupère ou priorise un site Web.

## Ce que llms.txt ne fait pas

`llms.txt` ne permet pas de :

- Forcer les systèmes d’IA à lire un site Web
- Garantir l’inclusion dans les réponses générées par l’IA
- Garantir une amélioration de la recherche ou du classement par IA
- Remplacer le référencement naturel ou une structure de site accessible
- Remplacer `robots.txt`, un plan de site ou de bons liens internes
- Empêcher l’extraction automatisée ou accorder une autorisation d’accès
- Créer automatiquement une base de connaissances IA

Il s'agit d'un conseil utile et d'une référence structurée, et non d'un système de permis. Les propriétaires de sites Web ont toujours besoin de contrôles d'accès appropriés, de licences, de politiques de robots et de décisions de confidentialité.

## llms.txt contre robots.txt

![Trois colonnes comparent robots.txt pour les préférences des robots, sitemap.xml pour les URL du site Web et llms.txt pour le contexte sélectionné et lisible par l’IA.](/assets/blog/fr/llms-txt-file-comparison.webp)

| Fichier | Objectif |
|---|---|
| `robots.txt` | Communique les préférences d'accès des robots de recherche |
| `sitemap.xml` | Liste les URL et les fichiers du site Web |
| `llms.txt` | Fournit un contexte soigneusement sélectionné et lisible par l'IA |

Ces fichiers résolvent différents problèmes. Google décrit [`robots.txt`](https://developers.google.com/search/docs/crawling-indexing/robots/intro) comme un moyen d’indiquer aux robots de recherche les URL auxquelles ils peuvent accéder, principalement pour gérer leur trafic. Il décrit un [plan de site](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) comme un fichier qui identifie les pages et les fichiers qu’un site considère importants.

La proposition llms.txt n'est ni un mécanisme de contrôle d'accès ni un inventaire complet des URL. Il s'agit d'une couche éditoriale : le propriétaire d'un site choisit un sous-ensemble utile de matériel et l'explique de manière concise en Markdown.

## Création de llms.txt manuellement

Un flux de travail de base est simple :

1. Identifiez les pages qui expliquent le mieux le site Web.
2. Créez un fichier Markdown avec un titre H1 clair et un bref résumé.
3. Groupez les liens importants sous des titres descriptifs H2.
4. Ajoutez des notes d'une phrase lorsque le but d'un lien n'est pas évident.
5. Placez le fichier à la racine du site Web.

```text
https://website.com/llms.txt
```

Gardez la liste sélective. Un guide plus court sur le contenu autoritaire est souvent plus utile qu'une deuxième carte du site contenant toutes les URL. Réviser le fichier lorsque la documentation change, que les politiques évoluent ou que des pages importantes sont ajoutées.

## SourceShelf publie son propre fichier llms.txt

SourceShelf publie lui-même un [fichier llms.txt](https://sourceshelf.app/llms.txt). Les systèmes d’IA et les développeurs peuvent ainsi découvrir la documentation et les concepts clés de l’application au moyen de la même convention que celle décrite dans cet article.

## Comment SourceShelf utilise llms.txt

SourceShelf traite `llms.txt` comme un pont utile entre les sites Web et les flux de travail de connaissances locales de l'IA.

De nombreux sites Web contiennent déjà de la documentation, des recherches, des politiques, des renseignements sur les produits et de précieux guides techniques. Une collection llms.txt locale peut présenter ce contenu de façon ordonnée et lisible. SourceShelf peut importer cette collection dans sa bibliothèque et créer un pack enregistré qui reste sur votre Mac.

Ce flux de travail est délibérément hors ligne. SourceShelf n’explore pas un site Web et ne récupère pas d’URL distantes arbitraires à partir d’un index importé.

### Importation de llms.txt avec SourceShelf

Une importation typique fonctionne comme suit :

1. Choisissez un fichier `llms.txt` ou un dossier contenant un tel fichier.
2. SourceShelf lit l’index local.
3. Les références sécurisées relatives `.md`, `.markdown` et `.txt` situées sous le dossier sélectionné sont résolues et importées localement.
4. L'index devient le premier élément de la bibliothèque et les documents locaux suivent dans l'ordre de l'index.
5. SourceShelf crée un pack enregistré dont le nom reprend le titre de l’index.

Les liens HTTP ou HTTPS distants ne sont pas téléchargés. SourceShelf conserve leurs titres, descriptions et provenance comme des références indisponibles afin que vous puissiez voir ce que l'index nomme sans transférer silencieusement le contenu du site Web.

![La vue de conversion SourceShelf avec l'action Import llms.txt disponible pour sélectionner une collection locale.](/assets/blog/fr/llms-import-source.webp)

![Un pack enregistré dans SourceShelf montrant les documents ordonnés et les commandes du pack après l’organisation locale des connaissances.](/assets/blog/fr/llms-pack-created.webp)

### Exportation des collections llms.txt avec SourceShelf

SourceShelf peut également créer un **dossier de collection llms.txt** à partir d’un pack enregistré :

```text
my-research-pack/
├── llms.txt
├── documents/
├── assets/
├── sourceshelf-manifest.json
└── checksums.sha256
```

Le dossier contient des documents ordonnés, les ressources archivées auxquelles ils font référence, un manifeste SourceShelf avec les renseignements de provenance et des sommes de contrôle déterministes pour vérifier l’intégrité. Les références Web indisponibles dont la provenance est valide peuvent apparaître dans la section facultative de l’index, mais SourceShelf ne les télécharge pas.

![Options d'exportation SourceShelf, y compris le dossier de collection llms.txt, le ZIP AI Reference Pack et le ZIP OKF Bundle.](/assets/blog/fr/llms-export.webp)

Il s’agit d’un format de collection portable, et non d’une promesse que chaque produit d’IA l’importera directement. Vous pouvez conserver le dossier comme une collection locale lisible, l’adapter à un autre flux de travail ou exporter le même pack enregistré dans un format différent.

### D'un flux de travail llms.txt à un flux de travail SourceShelf

![Un flux de travail passe d'un site Web et de llms.txt à SourceShelf, puis à un pack de connaissances et à des outils d'IA sélectionnés.](/assets/blog/fr/sourceshelf-llms-workflow.webp)

Une fois la collection enregistrée sous forme de pack, vous pouvez exporter un [AI Reference Pack](/local-ai-reference-packs/) ou utiliser Local AI Access pour partager un instantané immuable et en lecture seule avec un client compatible. Seul le pack sélectionné est exposé; SourceShelf ne partage pas le reste de la bibliothèque.

![Local AI Access dans SourceShelf montrant l’instantané en lecture seule d’un pack enregistré sélectionné.](/assets/blog/fr/llms-ai-access.webp)

Si vous commencez avec un mélange plus large de documents et de pages Web plutôt qu'un index existant, le [Flux de travail de base de connaissances privée en intelligence artificielle](/private-ai-knowledge-base-mac/) explique comment capturer, organiser et partager sélectivement les sources locales.

## Relation avec OKF

![Trois étapes montrent llms.txt pour la découverte, SourceShelf pour l'organisation et OKF pour la préservation.](/assets/blog/fr/llms-txt-okf-relationship.webp)

`llms.txt` et Open Knowledge Format résolvent différents problèmes.

- **llms.txt:** aide un outil à découvrir et à naviguer dans les connaissances de sites Web sélectionnées.
- **OKF:** regroupe les connaissances structurées dans une collection portable de concepts et de métadonnées Markdown.
- **SourceShelf:** peut organiser les sources locales entre ces deux étapes et les exporter pour un flux de travail choisi.

Le [guide sur Open Knowledge Format](what-is-open-knowledge-format-okf.md) explique plus en détail l’aspect de la mise en paquet. Aucun de ces formats n’agrandit la fenêtre de contexte d’un modèle ni ne garantit qu’un outil utilisera toutes les sources.

## Créer des connaissances que l’IA peut réellement utiliser

Les systèmes d'IA ont besoin de contexte. Ce contexte est plus utile lorsqu'il est structuré, portable, compréhensible et maintenu par les personnes qui l'ont créé.

`llms.txt` est une petite étape vers la simplification de la découverte des connaissances en ligne pour les systèmes et les agents d'IA. Sa valeur provient d'une curation minutieuse, de résumés précis, de liens stables et d'outils qui décident de soutenir la convention.

SourceShelf prolonge cette idée en vous aidant à capturer, organiser et regrouper les connaissances localement, afin que vos informations restent utiles dans les outils d’IA que vous choisissez.

## Sources officielles

- [La proposition et le format llms.txt](https://llmstxt.org/)
- [Dépôt de la spécification llms.txt d’Answer.AI](https://github.com/AnswerDotAI/llms-txt)
- [Recherche centrale Google : Introduction à robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Search Central : Apprenez-en davantage sur les cartes du site.](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
