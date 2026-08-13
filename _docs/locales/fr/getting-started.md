# Commencer avec SourceShelf

Cette procédure détaillée convertit quelques fichiers, crée un pack ordonné, le vérifie et l'exporte.

## 1. Choisissez un dossier de sortie

ouvert **SourceShelf > Paramètres > Général** et choisissez un dossier de sortie. Le Markdown converti y est sauvegardé. SourceShelf se souvient de l'accès au dossier, de sorte que les conversions ultérieures peuvent l'utiliser sans autre message de confirmation.

Choisissez un dossier facile à reconnaître et à sauvegarder. SourceShelf conserve également les métadonnées de la bibliothèque locale et les actifs gérés dans son conteneur d'application ; le changement du dossier de sortie ne déplace pas les anciens fichiers Markdown.

## 2. Convertir des fichiers

Ouvrez **Convertir**, puis faites glisser les fichiers dans la zone de dépôt ou choisissez **Sélectionner des fichiers**. Vous pouvez également utiliser **Fichier > Ouvrir**, convertir un dossier entier ou choisir **Importer un pack de recherche…** pour importer un pack SourceShelf, un ZIP OKF, un pack portable `llms.txt`, un fichier `llms.txt` autonome ou un dossier qui contient `llms.txt`.

![L'espace de travail Convertir prêt pour les fichiers locaux](../../assets/images/convert.png)

Chaque conversion réussie crée :

- Un fichier Markdown dans le dossier de sortie ;
- Une entrée de bibliothèque avec son titre, son type de source, ses dates et sa disponibilité ;
- Métadonnées sémantiques gérées utilisées par les aperçus, le regroupement et la comparaison ;
- Actifs archivés lorsque le format source ou la capture incluent des images prises en charge.

Le fichier original n'est pas modifié.

## 3. Réviser la bibliothèque

ouvert **bibliothèque**. Les articles nouvellement convertis apparaissent en haut lorsqu'ils sont regroupés par date. Sélectionnez un article pour ouvrir l'inspecteur. utiliser **avant-première** Pour le contenu rendu et **Source Markdown** Pour le Markdown stocké exact, y compris le matériel avant YAML.

![Sources de démonstration synthétiques dans la bibliothèque](../../assets/images/library.png)

Les filtres de la bibliothèque n'affectent que ce que vous voyez. Ils ne changent pas le pack actuel.

## 4. Construire un pack

Ouvrez **Packs**. Le navigateur de gauche répertorie les packs enregistrés et le champ **Rechercher des packs** permet de les filtrer localement par nom. Choisissez **Nouveau pack**, puis **Ajouter des sources** dans la colonne centrale. La recherche de packs et la recherche de sources sont indépendantes. Ajoutez des sources individuelles ou utilisez :

- **Ajouter des correspondances** Pour les filtres actuels ;
- **Ajouter tout exportable** Pour chaque élément de bibliothèque lisible ;
- **Ajouter depuis la dernière exportation** Pour les articles capturés ou convertis après la dernière exportation réussie.

Passez à **Contenu**, puis réorganisez la liste en faisant glisser les éléments ou avec **Monter** et **Descendre**. L'ordre affiché devient l'ordre d'exportation et celui présenté par l'accès local à l'IA.

Enregistrez le pack pour lui donner un nom durable. **Enregistrer les modifications**, **Actualiser et comparer**, **Confiance et sécurité** et **Exporter…** restent visibles. Utilisez **Actions du pack** pour Enregistrer sous, Renommer, Accès local à l'IA et Supprimer.

![Un pack commandé fabriqué à partir de fichiers de recherche municipaux synthétiques.](../../assets/images/pack-builder.png)

## 5. Gérer la confiance et la sécurité

sélectionner **Confiance et sécurité**. SourceShelf vérifie la lisibilité de la source, le nomage et la structure du pack, les dates de modification, l'âge de la source web, les références aux actifs, les hachages de contenu et les modèles conservateurs qui peuvent indiquer un langage d'injection de prompt.

Les avertissements sont de nature consultative. SourceShelf conserve le contenu original et le classe comme un matériau de référence non fiable ; il ne prétend pas le désinfecter.

## 6. exportation

sélectionner **Exporter...**, puis choisissez la destination qui correspond à votre flux de travail :

- **Pack de référence AI ZIP** Pour les chats IA, les agents et les espaces de travail de projet ;
- **OKF v0.2 Pack ZIP** Pour les catalogues et agents basés sur des normes ;
- **Pack de contexte Markdown** Pour un seul fichier portable ;
- **Pack portable llms.txt ZIP** pour une collection complète pouvant être déplacée entre vos appareils SourceShelf ;
- **llms.txt Dossier de collection** Pour un dossier organisé et inspectable ;
- **Copier le Markdown combiné** Pour une pâte rapide.

![Le sélecteur d’exportation de SourceShelf](../../assets/images/export-chooser.png)

ZIP et `llms.txt` Les exportations de dossiers effectuent un nouveau contrôle de confiance et de sécurité. Les exportations de Markdown et de presse-papiers commencent immédiatement. Une exportation réussie enregistre une référence locale pour **Recharger et comparer**.

## Prochaines étapes

- Capturez la recherche web avec [L'extension Safari](guides/safari-capture.md).
- Connectez un pack sauvegardé à une application locale d'IA avec [Accès local à l'IA](mcp/local-ai-access.md).
- Découvrez ce que contient chaque pack dans [Choisissez un format d'exportation](guides/export-formats.md).
- Apprenez comment la rétention et le nettoyage fonctionnent dans [Gérer le stockage SourceShelf](guides/storage-management.md).
