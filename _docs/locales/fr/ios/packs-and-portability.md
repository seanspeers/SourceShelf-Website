# Créer, exporter et déplacer des packs sur iPhone et iPad

Un pack est une collection ordonnée de sources de la Bibliothèque. Il organise les recherches sans dupliquer les sources sous-jacentes.

## Créer et gérer un pack

Utilisez **Nouveau pack** dans la barre latérale pour créer un pack vide. Pour ajouter des recherches, ouvrez les actions d’une source ou le mode de sélection, choisissez **Ajouter au pack…**, puis sélectionnez un pack existant ou créez-en un.

Dans un pack, **Retirer du pack** retire uniquement l’appartenance. La source reste dans **Toutes les recherches**. Renommez ou supprimez un pack depuis son menu contextuel ; supprimer un pack conserve également ses sources.

La recherche, les filtres et le tri s’appliquent à la Bibliothèque ou au pack actuellement sélectionné. Sur iPad, le pack, la liste des sources et le Lecteur peuvent rester visibles ensemble si l’espace le permet. Sur iPhone, parcourez la même hiérarchie un écran à la fois.

## Exporter un pack

Ouvrez un pack et choisissez **Plus > Exporter le pack…**, ou choisissez **Réglages > Exporter un pack…**. SourceShelf 1.0.2 pour iPhone et iPad propose :

- **ZIP Pack de référence IA** pour les conversations avec une IA et les espaces de projet ;
- **Bundle OKF v0.2** pour les catalogues et agents fondés sur des normes ;
- **Package llms.txt portable** pour une collection complète compatible avec les normes.

Une fois le ZIP créé, la feuille de partage du système permet de l’enregistrer dans Fichiers, de l’envoyer par AirDrop ou de le transmettre à une autre app sélectionnée.

## Importer un pack portable

Choisissez **Importer des recherches…** et sélectionnez un ZIP compatible. SourceShelf détecte et valide les packs SourceShelf de référence IA, OKF et `llms.txt` portables, ainsi que les packs compatibles pris en charge. L’app vérifie les sommes de contrôle et les relations déclarées avant de valider l’importation.

Une importation crée un nouveau pack local et de nouveaux identifiants de sources. Importer deux fois le même pack crée deux packs indépendants ; l’app ne fusionne ni ne remplace silencieusement le premier.

L’intégrité du pack signifie que les octets importés correspondent à l’inventaire déclaré. Elle ne prouve ni l’identité du créateur ni l’innocuité des recherches. Le texte importé reste du contenu de référence et n’est pas interprété comme des instructions pour l’app.

## Continuer sur Mac

Exportez un pack sur iPhone ou iPad, déplacez-le avec Fichiers ou AirDrop, puis choisissez **Importer un pack de recherche…** dans SourceShelf sur Mac. Vous pouvez aussi exporter un pack sur Mac et sélectionner le pack avec **Importer des recherches…** sur iPhone ou iPad.

Il s’agit d’une portabilité volontaire par fichier, et non d’une synchronisation automatique ou en direct. Les modifications apportées sur un appareil ne mettent pas à jour les copies sur un autre appareil sans nouvelle exportation et importation.
