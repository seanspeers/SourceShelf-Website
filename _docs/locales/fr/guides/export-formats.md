# Choisir un format d’exportation

Ouvrez un pack et sélectionnez **Exporter...**. SourceShelf se souvient du dernier format confirmé ; l'annulation du sélecteur ne modifie pas la préférence.

![Le sélecteur d'exportation SourceShelf](../../../assets/images/export-chooser.png)

## Pack de référence AI ZIP

**Meilleur pour :** Chats IA, modèles locaux, agents et espaces de travail de projet.

Le ZIP contient des pages Markdown par source, du Markdown combiné, un manifeste versionné par schéma, des images archivées référencées et `checksums.sha256`. quand **Inclure des morceaux de récupération** Est activé, il contient également `chunks.jsonl`.

Les morceaux de récupération sont conscients de la structure et neutres par rapport au modèle :

- un maximum de 800 jetons estimés ;
- Jusqu'à 120 jetons estimés d'overlap structurel ;
- Source stable et identifiants de blocs ;
- Titre ancestry, provenance, hachages, références d'actifs et classification des références non fiables ;
- Les en-têtes de table sont répétés lorsque une table doit être divisée ;
- `token_count_method: "estimated_chars_div_4"`.

Aucune intégration n'est générée ou incluse.

## OKF v0.2 Pack ZIP

**Meilleur pour :** Catalogs de connaissances et agents basés sur des normes.

La racine `index.md` Contient canonique OKF v0.2 Métadonnées de la version. Les concepts portent le type, le titre, la provenance, les métadonnées SourceShelf et les valeurs générées par/générées à. La provenance web HTTP(S) absolue valide peut apparaître sous la forme de `resource` et `sources`; les chemins de fichiers locaux ne sont jamais exportés.

La déclaration de SourceShelf comprend des hachages, des dates de modification, des extensions de confiance, des actifs et l'ordre de source. Les champs canoniques du cycle de vie de la confiance OKF tels que `verified`, `status`, et `stale_after` Restent omis car SourceShelf ne fournit pas d'affirmations de cycle de vie contrôlées par l'utilisateur.

## Pack de contexte Markdown

**Meilleur pour :** Contexte portable de fichier unique.

Cela crée un fichier Markdown contenant les sources lisibles du pack dans l'ordre. Il est facile de l'inspecter, de la versionner, de l'attacher ou de le coller dans un système qui ne comprend pas les packs ZIP.

## llms.txt Dossier de collection

**Meilleur pour :** Une collection locale inspectable utilisant l'expérimentale `llms.txt` Convention.

Cela nécessite un pack sauvegardé propre et crée un pack sûr contre les collisions. `<pack-name>-llms` Fichier contenant un index, des documents triés, des actifs archivés référencés, un manifeste SourceShelf et des chiffrages de contrôle. Les sources indisponibles avec une provenance HTTP(S) valide apparaissent sous `## Optional` Et ne sont pas récupérés.

voir [Importation et exportation llms.txt](llms-txt.md).

## Copier le Markdown combiné

**Meilleur pour :** Demande rapide, chat ou transfert de document.

Le Markdown combiné est copié immédiatement. Comme il s'agit d'une livraison de pack réussie, SourceShelf enregistre une référence de pack vivant après la fin de l'opération de la presse-papiers.

## Chiffres de contrôle et validation

AI et ZIP OKF et `llms.txt` Les dossiers contiennent un déterministe `checksums.sha256`, trié par chemin relatif et couvrant tous les fichiers générés, à l'exception de l'inventaire de la somme de contrôle lui-même. SourceShelf valide l'ordre, les identifiants, les hachages, la provenance et les références aux actifs avant d'écrire.

ZIP et `llms.txt` Les flux de travail de dossiers fonctionnent à nouveau avec Trust & Safety. Les flux de travail Markdown et de presse-papiers conservent leur comportement immédiat.
