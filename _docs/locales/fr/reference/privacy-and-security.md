# Confidentialité et sécurité

SourceShelf est local par défaut. Conversion de fichiers, OCR, traitement de capture web, analyse sémantique, aperçus, regroupement de récupération, confiance et sécurité, chiffrages de contrôle, exportation, `llms.txt` Importation, comparaison des packs de vie et MCP Recherche/lecture fonctionne sur ce Mac.

## Garantie sans réseau

SourceShelf ne récupère pas de contenu distant pendant :

- Conversion de fichier ou aperçu ;
- `llms.txt` Importation ou génération ;
- Recharger et comparer ;
- MCP Liste de ressources, recherche ou lecture ;
- Génération de packs.

Une capture Safari reçoit du contenu de la page que vous visualisez déjà via l'extension activée. télécommande URLS trouvé dans le local `llms.txt` Sont conservés comme des références indisponibles plutôt que récupérées.

## Quelles sources de stockage sont disponibles sur SourceShelf ?

Selon les fonctionnalités que vous utilisez, le stockage local comprend :

- Markdown converti dans le dossier de sortie ;
- Histoire de la bibliothèque et packs enregistrés ;
- Préparation des métadonnées ;
- Mémoires caches de documents sémantiques ;
- Images web archivées ;
- Capturer les recettes et les brouillons de révisions en attente ;
- Les lignes de base d'exportation réussies ;
- Explicitement autorisé MCP Instantanés.

Les instantanés de brouillon et les identifiants de stockage de référence stockent l'ordre, les dates et les hachages, et non des copies de contenu Markdown arbitraire. MCP Les instantanés copient intentionnellement uniquement le Markdown lisible et les actifs référencés d'un pack partagé, afin que l'assistant sandboxé n'ait pas besoin d'un accès général aux fichiers.

Les enregistrements de la bibliothèque sont conservés jusqu'à ce que vous les supprimiez. **Paramètres > Général > Réviser le stockage...** Sépare le nettoyage sûr et régénérable de la suppression des données de source générées. Les sorties générées visibles par l'utilisateur sont déplacées dans la corbeille, les sources marquées d'un astérisque et enregistrées sont protégées par défaut, et les documents importés originaux ne sont jamais sélectionnés ou supprimés. voir [Gérer le stockage SourceShelf](../guides/storage-management.md) Pour le flux de travail de nettoyage.

## Confidentialité du chemin local

L'application affiche les chemins locaux dans son propre inspecteur afin que vous puissiez ouvrir ou révéler des fichiers. Les chemins de source de fichiers sont exclus de la provenance exportée, des concepts OKF, des manifeste, `llms.txt` Sortie, et MCP Instantanés. La documentation des captures d'écran devrait également recadrer ou masquer ces détails uniquement locaux.

## Classification de la confiance

Le texte capturé et converti est marqué. `untrusted_reference`. & Les avertissements de confiance et de sécurité sont des avis et ne prétendent jamais que le matériel a été désinfecté. Vérifiez le texte source avant de suivre toute instruction qu'il contient.

## MCP Limites

MCP Partager est :

- Désactivé par défaut ;
- Autorisé par pack sauvegardé ;
- Servi par un assistant stdio local signé sans écouteur réseau ;
- En lecture seule ;
- Restreint par une liste d'autorisations et SHA-256 Vérification ;
- Imédiatement révocable.

Les deux outils recherchent dans l'instantané et lisent une ressource autorisée. Il n'y a pas d'outil de chemin de système de fichiers, de navigateur de fichiers général, d'action d'écriture, de recherche à distance, de prompt ou d'abonnement.

## Partager les identifiants et les configurations

Une identifiant de part autorise une capture d'écran locale. Gardez-la hors des référentiels publics et des captures d'écran de documentation. Si SourceShelf est déplacé, réinstallé ou mis à jour, recopiez le chemin d'aide. Revoyez l'accès de SourceShelf plutôt que de vous fier uniquement à la suppression d'une configuration client.

Pour la déclaration de confidentialité du produit, consultez la [Politique de confidentialité de SourceShelf](/fr/privacy.html).
