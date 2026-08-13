# Créer et gérer des packs

Un pack est un ensemble ordonné de sources de bibliothèque. Les packs enregistrés sont les collections durables de SourceShelf et l'unité utilisée pour l'exportation, la comparaison et l'accès local à l'IA.

## L'espace de travail des packs

La colonne de gauche est un navigateur redimensionnable des packs, la colonne centrale contient les sources du pack actif et la colonne de droite est l'inspecteur de source. Lorsque la fenêtre est plus étroite, l'inspecteur s'ouvre dans une feuille afin que la navigation et les sources restent visibles.

![Un pack sauvegardé construit à partir de sources de démonstration synthétiques.](../../../assets/images/pack-builder.png)

Utilisez **Rechercher des packs** pour filtrer localement la liste par nom sans modifier les filtres de la Bibliothèque. L'ordre enregistré est conservé. Le navigateur affiche le nombre de sources, la date de mise à jour, les modifications non enregistrées et un état compact de l'accès local à l'IA. Les noms longs sont tronqués sans déplacer les commandes.

Choisissez **Nouveau pack** dans le navigateur pour créer un brouillon. La colonne centrale propose deux modes :

- **Contenu** affiche la liste ordonnée, les états de comparaison, les références indisponibles et les commandes de classement.
- **Ajouter des sources** réutilise la recherche et les filtres locaux de la Bibliothèque, ainsi que les commandes d'ajout individuelles et groupées.

Un nouveau brouillon vide s'ouvre dans Ajouter des sources. Un pack enregistré s'ouvre dans Contenu.

## Ajouter et commander des sources

- Ouvrez **Ajouter des sources**, puis sélectionnez le contrôle plus ou moins à côté d'une source pour modifier son appartenance.
- **Ajouter des correspondances** Ajoute des sources lisibles correspondant aux filtres actuels du navigateur.
- **Ajouter tout exportable** Ajoute toutes les sources de la bibliothèque lisibles.
- **Ajouter depuis la dernière exportation** Ajoute des sources créées après l'exportation la plus récente réussie du pack actuel.
- Faites glisser les sources pour les réorganiser, ou utilisez **Avancer** et **Avancer vers le bas** Pour la commande accessible par clavier.

Exportateurs et MCP Les instantanés reçoivent les sources dans l'ordre affiché.

## État et actions du pack

L'en-tête stable affiche le nombre total de sources, l'estimation des jetons, la dernière date d'enregistrement, la disponibilité, l'état Confiance et sécurité et l'état exact de l'accès local à l'IA. **Actuel** signifie qu'un instantané MCP autorisé et à jour existe; **Révision requise**, **Non partagé** et **Désactivé** décrivent l'état réel.

Les actions principales restent visibles : **Enregistrer** ou **Enregistrer les modifications**, **Actualiser et comparer**, **Confiance et sécurité** et **Exporter…**. Le menu en forme d'engrenage **Actions du pack** contient **Enregistrer sous…**, **Renommer le pack…**, **Accès local à l'IA…** et **Supprimer le pack…**.

## Dossiers et sauvegarde explicite

Les modifications du pack sont des brouillons jusqu'à ce que vous sélectionniez. **économiser** ou **Sauvegarder les modifications**. SourceShelf restaure le pack actif, les commandes et les métadonnées du brouillon non sauvegardées après le redémarrage, mais l'instantané du brouillon ne contient jamais de contenu Markdown.

Si vous changez de pack ou si vous commencez un nouveau pack pendant que le projet actuel est sale, SourceShelf vous offre :

- **économiser** Pour persister dans les changements actuels et continuer ;
- **jeter** Pour revenir à l'adhésion enregistrée et continuer ;
- **annuler** Pour rester sur le projet actuel.

Un sauvegarde échoué laisse le projet sale et annule le commutateur demandé.

## Enregistrer sous, renommer et supprimer

**Enregistrer sous** crée un autre pack sauvegardé. Si son nom normalisé entre en collision avec un pack existant, SourceShelf demande avant de remplacer quoi que ce soit.

Le changement de nom modifie le nom du pack sauvegardé utilisé pour les titres des packs et les métadonnées de la collection de manifeste. La suppression d'un pack sauvegardé ne supprime pas les entrées de la bibliothèque ni les fichiers Markdown. Si vous supprimez le pack actif, ses contenus se détachent dans un brouillon sale sans titre.

## Références manquantes

Les références enregistrées sont conservées lorsque l'un des éléments de la bibliothèque ou un fichier Markdown devient indisponible. L'emplacement de remplacement peut toujours être réorganisé ou supprimé. Trust & Safety signale la référence non résolue comme une erreur, tout en permettant l'exportation lorsque l'une des autres sources est lisible.

## Les packs deviennent "vivants" après l'exportation.

Un enregistrement d'exportation réussi enregistre une ligne de base locale contenant la commande, les hachages, les dates et le format d'exportation. **Recharger et comparer** Compare l'état actuel de la bibliothèque locale avec cette ligne de base. Il ne revisite jamais un site Web. URL.

voir [Confiance et sécurité et packs de vie](trust-safety-and-refresh.md) Pour les significations de comparaison.
