# Gérer le stockage SourceShelf

SourceShelf conserve les sources de la bibliothèque jusqu'à ce que vous décidiez de les supprimer. Il n'y a pas de limite d'âge ou de 500 sources, donc les recherches plus anciennes, les sources marquées d'étoiles et les membres des packs enregistrés ne disparaissent pas silencieusement.

utiliser **SourceShelf > Paramètres > Général > Réviser le stockage...** Pour voir ce que SourceShelf utilise et choisir ce qui, si quelque chose, doit être supprimé.

## Comprendre le résumé du stockage

Les inventaires de synthèse répertorient les données gérées par SourceShelf et générées par SourceShelf, y compris :

- Markdown généré dans le dossier de sortie ;
- Fichiers d'images créés à côté du Markdown généré ;
- Géré les copies de la bibliothèque et les images archivées ;
- Des caches sémantiques utilisés pour les aperçus, le regroupement et la comparaison ;
- Instantanés d'accès local à l'IA ;
- Prévisions de révision de la capture Safari et données de mise en scène.

Le résumé ne traite pas les documents importés originaux comme un stockage SourceShelf. Les fichiers source tels que le PDF, le document Word ou la feuille de calcul que vous avez convertis ne sont jamais des cibles de nettoyage.

sélectionner **rafraîchir** Après avoir converti, capturé, exporté ou supprimé des données, si vous souhaitez recalculer les totaux pendant que la fenêtre est ouverte.

## Exécuter le nettoyage sécurisé

**Nettoyage sûr** Supprime uniquement les données internes qui sont orphelines, obsolètes, expirées ou qui ne sont plus autorisées :

- Des copies gérées qui ne appartiennent plus à une source de bibliothèque ;
- des caches sémantiques qui ne correspondent plus à leur Markdown ;
- Données de mise en scène Safari expirées qui ne font pas partie d'une capture ou d'une révision active ;
- révoqué MCP Instantanés et abandonnés MCP Données de mise en scène.

Il ne supprime pas le Markdown généré, les entrées actuelles de la bibliothèque, les brouillons d'examen actifs, les publications. MCP Actions, ou documents importés originaux.

SourceShelf affiche le nombre estimé de fichiers et l'espace récupérable avant le nettoyage. sélectionner **Nettoyer...**, vérifiez la confirmation et continuez seulement lorsque vous êtes prêt.

## Supprimer les données de source générées

le **Données de source générées** La liste est destinée à une suppression délibérée de source en source. Chaque ligne affiche le titre de la source, sa taille estimée et toute protection qui lui est appliquée.

1. Sélectionnez des sources individuelles, ou choisissez **Sélectionnez non protégé**.
2. Examinez le nombre de choix et la taille estimée.
3. sélectionner **Déplacer sélectionné dans la corbeille...**.
4. Lisez la confirmation et choisissez **Mettre en poubelle**.

Pour chaque source sélectionnée, SourceShelf :

- déplace son Markdown généré et le dossier d'images générées adjacents vers la corbeille de macOS ;
- Supprime sa copie privée de la bibliothèque gérée ;
- Supprime l'entrée correspondante de la bibliothèque.

Les fichiers importés d'origine ne sont jamais sélectionnés ou supprimés. Les résultats générés déplacés dans la corbeille restent récupérables jusqu'à ce que la corbeille soit vidée, mais les données gérées de manière interne et l'enregistrement de la bibliothèque sont supprimés. Si vous récupérez un fichier Markdown ultérieurement, importez-le à nouveau pour créer une nouvelle entrée de bibliothèque.

## Sources protégées

Les sources étiquetées d'étoiles et les sources référencées par les packs enregistrés sont verrouillées par défaut. Les lignes expliquent pourquoi elles sont protégées.

Si vous souhaitez intentionnellement les supprimer, activez **Autoriser le choix des sources marquées d'étoiles ou des packs enregistrés.**, sélectionnez les sources et confirmez le retrait. Le retrait d'une source de pack sauvegardé ne réécrit pas silencieusement le pack : il laisse un emplacement réservé indisponible que vous pouvez plus tard restaurer ou supprimer du pack.

La protection empêche la sélection accidentelle dans la fenêtre de stockage ; elle n'est pas une sauvegarde. Gardez des sauvegardes séparées du matériel source important et des packs exportés.

## Suppression de la bibliothèque par rapport au nettoyage du stockage

Ces commandes servent à des fins différentes :

- **Supprimer de la bibliothèque** Supprime l'enregistrement de la bibliothèque mais laisse le Markdown généré dans le dossier de sortie.
- **Nettoyage sûr** Supprime uniquement les données internes orphelines ou régénérables.
- **Déplacer sélectionné dans la corbeille...** Supprime le enregistrement de la bibliothèque sélectionné et son résultat généré par SourceShelf ensemble.

Pour l'entretien de routine, commencez par le nettoyage sécurisé. Utilisez la suppression de la source générée uniquement lorsque vous ne souhaitez plus ces résultats convertis ou capturés dans SourceShelf.

## Une routine de maintenance pratique

Il n'y a pas de calendrier requis. Lorsque l'utilisation du stockage devient perceptible :

1. ouvert **Examen du stockage...** Et rafraîchir l'inventaire.
2. Exécutez le nettoyage sécurisé.
3. Organisez les sources dont vous n'avez plus besoin dans la bibliothèque.
4. Examinez les données de source générées sans protection et déplacez uniquement les éléments confirmés dans la corbeille.
5. Videz la corbeille de macOS plus tard, après être sûr que rien ne doit être restauré.

Pour plus de détails sur les limites de stockage, voir [Confidentialité et sécurité](../reference/privacy-and-security.md).
