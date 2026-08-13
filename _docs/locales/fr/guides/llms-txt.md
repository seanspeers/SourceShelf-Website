# Importer et exporter llms.txt

SourceShelf accepte la forme actuelle de `llms.txt` v2 pour l'import de fichiers locaux et l'acquisition de sites depuis Safari. L'import local reste hors ligne. L'import web passe uniquement par l'extension et les autorisations de site de Safari ; l'app native reste isolée du réseau.

## Importer un site depuis Safari

Sur une page HTTP(S), ouvrez SourceShelf et choisissez **Recherche > Importer via llms.txt**. SourceShelf découvre l'index, affiche ses sections et entrées ordonnées, indique les origines externes qui demandent un accès et vous laisse sélectionner les ressources et une destination unique. L'index `llms.txt` est enregistré en premier, puis les ressources réussies dans l'ordre choisi. Aucun pack vide n'est créé.

Safari peut afficher une demande d’accès au site quand vous ouvrez l’extension SourceShelf pour la première fois. Les origines supplémentaires mentionnées dans la collection peuvent nécessiter une autorisation distincte. Safari reste la référence pour ces autorisations; si vous refusez l’accès, modifiez-le dans les réglages d’extensions de Safari puis rouvrez la révision.

## Ordre de découverte du site

SourceShelf vérifie, dans l'ordre : un `<link rel="describedby">` HTML, un en-tête HTTP `Link` avec `rel="describedby"`, le chemin `llms.txt` le plus spécifique en remontant vers le site, puis `/llms.txt` à la racine. Les URL relatives sont résolues contre la page et dédupliquées. La première réponse textuelle ou Markdown valide avec H1 gagne, dans une limite de 12 candidats, cinq redirections, 8 Mio et 20 secondes.

## Sélection du contenu web et provenance

Pour chaque entrée sélectionnée, SourceShelf préfère une représentation Markdown explicite `rel="alternate"`, puis essaie `page.html.md` et `page.md`, avant l'extraction HTML. Cette logique est limitée au flux `llms.txt` ; la capture rapide ne change pas. Seules les entrées de l'index sont admissibles : les liens ordinaires ne sont pas explorés. L'historique distingue l'URL listée, la représentation réellement récupérée, la méthode de découverte et l'URL de l'index, sans prétendre à l'intégrité d'un pack.

## Limites et annulation du site

L'aperçu est limité à 1 000 entrées, avec au plus trois ressources simultanées, 100 images par source et 256 Mio par opération. Les schémas dangereux, redirections, permissions, délais, tailles, analyses et extractions sont signalés par ressource. Annuler arrête les requêtes de l'extension et nettoie les données temporaires ; le travail déjà remis au processeur local peut se terminer.

## Isolation réseau de l'app native

L'app native n'a aucun droit réseau sortant pour cette fonction et n'utilise pas `URLSession` pour l'acquisition Safari ou web `llms.txt`. L'extension effectue les récupérations autorisées, choisit le Markdown et met les images en attente, puis transmet des handoffs locaux limités. Conversion, historique, packs, autorisation du dossier de sortie et persistance restent natifs.

## Importer une collection

Choisissez **Fichier > Importer un pack de recherche…** ou utilisez l’action de **Convertir**. Pour une collection locale autonome, sélectionnez l’un des éléments suivants :

- Un `llms.txt` Fichier ; ou
- Un dossier contenant `llms.txt`.

Choisissez le dossier lorsque l'index contient des liens vers des documents locaux. Cela donne à SourceShelf une racine sécurisée contre laquelle les résoudre.

## Ce que le parser accepte

Un index doit contenir un titre H1. Il peut également contenir :

- Un résumé optionnel en citation entre guillemets ;
- Prose détaillée ;
- Des sections H2 commandées ;
- Entrées de liste de liens Markdown avec descriptions ;
- Un spécial `## Optional` Section.

Un marqueur d'ordre de octets facultatif est accepté. Les entrées facultatives malformées sont signalées comme des avertissements.

Le H1 est le seul élément obligatoire. Le résumé, les détails, sections, descriptions et `## Optional` restent absents s'ils ne sont pas fournis ; l'export n'invente pas ces champs.

## Sécurité du lien local

SourceShelf résout uniquement les relations relatives. `.md`, `.markdown`, et `.txt` Liens contenus sous la racine sélectionnée. Il rejette :

- `..` Traversée ;
- Chemins locaux absolus ;
- Des liens sym qui échappent à la racine ;
- sans être soutenu URL Schemes.

Les liens HTTP(S) deviennent des références de bibliothèque nommées indisponibles. Leur titre, leur description et leur provenance restent visibles, mais SourceShelf ne les récupère pas. Les cibles répétées sont dédupliquées par identité normalisée, en préservant la première occurrence.

L'indice importé est le premier élément de la bibliothèque lisible. Les documents locaux suivent dans l'ordre de l'indice. SourceShelf crée un pack enregistré nommé à partir de l'H1 et offre un comportement de remplacement, de sauvegarde sous un autre nom ou d'annulation en cas de collision de noms normalisés.

## Générer un dossier de collection

Ouvrez un pack sauvegardé propre, choisissez **Exporter... > llms.txt Dossier de collection**, passez la vérification de confiance et de sécurité, et sélectionnez un dossier parent. SourceShelf crée un espace sûr contre les collisions. `<pack-name>-llms` Fichier :

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

L'index racine contient le titre du pack, un résumé du contenu non fiable, trié. `## Sources` Liens, et `## Optional` Entrées pour des sources indisponibles avec une provenance web valide. Les liens d'images de documents sont réécrits pour les fichiers copiés dans `assets/`.

Seules les images archivées réellement référencées par Markdown lisible sont incluses. Les entrées non lisibles sans provenance web valide sont omises et signalées après la génération.

SourceShelf ne génère pas `llms-full.txt`, morceaux de récupération, intégrations ou téléchargements à distance pour ce format.
