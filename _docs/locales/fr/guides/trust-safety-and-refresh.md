# Confiance et sécurité et packs évolutifs

Trust & Safety vous aide à inspecter un pack avant qu'il ne quitte SourceShelf ou ne devienne disponible pour une autre application locale. Il s'agit d'un rapport consultatif, et non d'une garantie que le contenu est sûr.

![Résumé de la confiance et de la sécurité pour le pack de démonstration synthétique.](../../../assets/images/trust-and-safety.png)

## Ce que SourceShelf vérifie

Le rapport comprend des contrôles pour :

- Sources lisibles et indisponibles ;
- Références de packs enregistrés non résolues ;
- Taille de sortie et nombre d'images archivées ;
- Nommage, collision et structure du pack ;
- Checksums des fichiers source et emballés ;
- Dates de modification ;
- Les captures Web plus anciennes que la politique de vieillissement applicable ;
- Ressources et références de liens invalides ;
- Surrèglement probable des instructions, divulgation par invitation du système, utilisation d'outils, crédentials ou langage d'exfiltration.

Le détecteur de risque est intentionnellement conservateur. Les résultats montrent une catégorie, une ligne Markdown et un extrait court. Les exemples situés dans du code clôturé reçoivent une gravité réduite ou supprimée dans la mesure du possible.

## Contenu de référence non fiable

Le matériel capturé et converti est classé comme `untrusted_reference`. des documents de contexte générés et MCP Les lectures comprennent une notice visible. SourceShelf conserve le corps original afin que vous puissiez le consulter ; il ne supprime pas les instructions ni ne décrit le matériel comme désinfecté.

## Prêt, avertissements et erreurs

- **prêt** Cela signifie que les contrôles structurels partagés ont été passés et qu'aucun problème consultatif n'a besoin d'être examiné.
- **Avertissements** Permettez l'exportation ou le partage après avoir examiné le rapport.
- **Erreurs avec des sources lisibles** Peut encore permettre une continuation explicite "avec des problèmes".
- **Aucune source lisible** Bloque l'exportation ou le partage car il n'y a rien de utile à livrer.

La validation de l'exportateur structurel reste autoritaire. Si la validation du pack échoue, SourceShelf n'écrit pas de résultat invalide.

## usure

Les captures Web utilisent un âge par défaut global de 90 jours. Une recette de capture peut hériter de cette valeur, choisir un nombre positif de jours ou désactiver l'obsolescence basée sur l'âge pour ses captures.

Les conversions de fichiers sont comparées en fonction des dates de modification et des hachages de contenu, et non d'une limite d'âge arbitraire. SourceShelf ne récupère jamais un URL Pour décider si une page web a changé.

## Recharger et comparer

Après une exportation réussie, SourceShelf enregistre une référence pour ce pack sauvegardé. sélectionner **Recharger et comparer** Pour classer l'état local actuel :

![Un nouveau pack sauvegardé avant sa première ligne de base d'exportation.](../../../assets/images/refresh-and-compare.png)

- **nouveau** — dans le pack actuel mais absent de la ligne de base ;
- **Changé** — le contenu sémantique ou les métadonnées de provenance suivies diffèrent ;
- **disparu** — référencé mais actuellement non lisible ou indisponible ;
- **inchangé** — les hachages de métadonnées de contenu et de suivi correspondent ;
- **Supprimé** — présent au moment de l'exportation mais plus dans le pack sauvegardé.

Les modifications de l'ordre sont signalées séparément. La feuille de détail montre les dates actuelles et les dernières exportations, ainsi que les hachages raccourcis. Les hachages de contenu et de métadonnées correspondants sont classés comme inchangés.

Les packs sans titre n'ont pas de lignes de base persistantes. Sauvegardez d'abord le pack. L'annulation ou une erreur d'exportation ne met pas à jour la ligne de base ; si l'exportation réussit mais que la persistance de la ligne de base échoue, SourceShelf signale une erreur de suivi au lieu de prétendre que le pack est actuel.

## Lorsque les rapports deviennent obsolètes

Les changements liés à l'adhésion, à la commande, au pack actif, à l'état de la source, à la politique de recette et à la ligne de base invalident les résultats précédents de Trust & Safety ou de comparaison. Effectuez à nouveau le contrôle avant de vous y fier.
