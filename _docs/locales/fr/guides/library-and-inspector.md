# Bibliothèque et inspecteur

La bibliothèque est le navigateur de source. Elle est délibérément séparée des packs : le filtrage de la bibliothèque ne s'ouvre jamais, ne réordonne ni ne modifie un pack sauvegardé. SourceShelf conserve les entrées de la bibliothèque jusqu'à ce que vous les supprimiez explicitement ; il ne rejette pas automatiquement les sources plus anciennes.

![Fichiers synthétiques affichés dans la bibliothèque](../../../assets/images/library.png)

## Recherche et filtres

La recherche trouve des correspondances avec les détails de la source tels que les titres et les origines. Les filtres peuvent restreindre la bibliothèque en fonction de :

1. Rechercher le texte ;
2. Date ;
3. Origine de la source ;
4. Type de contenu ;
5. Statut d' disponibilité ;
6. Adhésion à un pack sauvegardé.

Les filtres actifs apparaissent sous forme de puces amovibles dans cet ordre. La suppression d'une puce ne réinitialise que ce filtre. **Réinitialiser tout** efface tous les filtres actifs.

## Statut de la source

- Un statut vert indique un Markdown lisible.
- Un avertissement attire l'attention sur un problème de source ou d'actif archivé.
- Une source indisponible reste dans la bibliothèque lorsque son Markdown ne peut actuellement pas être lu.
- Un emplacement de pack sauvegardé reste visible même si son enregistrement de bibliothèque est manquant, il peut donc toujours être réaffecté ou supprimé.

SourceShelf omet intentionnellement un étiquette "Exportable" répété des lignes saines. Sélectionnez l'article ou inspectez son statut lorsque vous avez besoin de détails.

## Actions de rang

Lorsque la fenêtre est suffisamment large, les rangées de la bibliothèque affichent des icônes d'action individuelles avec des informations contextuelles. Dans un espace plus réduit, les mêmes actions sont regroupées dans un menu. En fonction de l'élément, les actions comprennent :

- Afficher les détails ;
- Ajouter ou supprimer du pack actuel ;
- Ouvrir Markdown ;
- Révéler dans le Finder ;
- Copier le chemin ;
- Étoffer ou désétoffer ;
- Supprimer de la bibliothèque.

Supprimer un élément de la bibliothèque ne supprime pas son Markdown généré. Les références des packs enregistrés restent des tampons.

## inspecteur

Pour des tailles de fenêtres plus larges, l'inspecteur est une troisième colonne réaménageable. Près de la largeur minimale de la fenêtre, elle s'ouvre en feuille, de sorte que les colonnes de construction de bibliothèque ou les deux restent utilisables.

![Aperçu rendu Markdown pour un rapport synthétique](../../../assets/images/inspector-preview.png)

L'inspecteur montre :

- Titre complet et origine ;
- Dates de capture et de modification ;
- Chemins de source et de sortie locaux ;
- Disponibilité actuelle et avertissements ;
- Nombre estimé de jetons et de photos archivées ;
- Actions d'ouverture, de révélation et de copie ;
- **avant-première** et **Source Markdown** onglets.

L'aperçu ne lit pas plus de 256 Ko du fichier Markdown local. Il ne supprime que les YAML en tête avant la rendu, conserve les espaces et la structure des blocs, et ne récupère pas d'images ou d'autres actifs distants. L'onglet source préserve le texte YAML et Markdown exact. Une notice de truncation renvoie à **Ouvrir Markdown** Lorsque le fichier est plus grand.

## entretien

Le menu de maintenance de la bibliothèque peut supprimer les entrées manquantes ou effacer l'historique non étiqueté. Ces actions s'appliquent aux enregistrements de la bibliothèque, et non aux fichiers Markdown générés.

Pour nettoyer le stockage, ouvrez **Paramètres > Général > Réviser le stockage...**. Cleanup Safe est limité aux données gérées orphelines, aux caches obsolètes, au staging de capture expiré et aux données révoquées. MCP Instantanés. Le nettoyage Markdown généré nécessite le sélectionnement des sources affectées et la confirmation ; la sortie est déplacée dans la corbeille, tandis que les documents importés originaux ne sont jamais touchés. Les sources étiquetées et enregistrées sont verrouillées à moins que vous n'activiez délibérément la sélection de sources protégées. voir [Gérer le stockage SourceShelf](storage-management.md) Pour une visite guidée.
