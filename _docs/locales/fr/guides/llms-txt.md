# Importer et exporter llms.txt

De SourceShelf `llms.txt` le support est expérimental et délibérément hors ligne. Il peut importer un index local et générer un dossier de collection portable, mais il ne récupère jamais de liens à partir d'Internet.

## Importer une collection

choisir **Fichier > Importation llms.txt...** Ou utilisez l'action dans **convertir**. ez l'un des deux :

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
