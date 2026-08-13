# Confidentialité et sécurité

SourceShelf fonctionne localement par défaut. La conversion des fichiers, l’OCR, le traitement du contenu transmis par Safari, l’analyse sémantique, les aperçus, le découpage pour la recherche, les vérifications de confiance et de sécurité, les sommes de contrôle, l’exportation, l’importation locale de `llms.txt`, la comparaison des packs évolutifs et la recherche/lecture MCP s’effectuent sur l’appareil.

## Garantie sans réseau

SourceShelf ne récupère aucun contenu distant pendant :

- la conversion ou l’aperçu d’un fichier ;
- l’importation et la génération à partir d’un fichier `llms.txt` local ou d’un pack de recherche ;
- Actualiser et comparer ;
- l’énumération, la recherche ou la lecture des ressources MCP ;
- la génération d’un pack.

Un fichier `llms.txt` local reste hors ligne : les URL distantes qu’il contient deviennent des références indisponibles au lieu d’être récupérées. La capture d’un site et l’acquisition de son `llms.txt` sont des opérations distinctes et explicites de l’extension Safari. Celle-ci lit ou récupère le contenu autorisé selon le modèle d’autorisations de Safari, puis transmet à SourceShelf un volume limité de données locales. L’app native ne devient pas un client Web généraliste.

## Données stockées par SourceShelf

Selon les fonctionnalités utilisées, le stockage local comprend :

- le Markdown converti dans le dossier de sortie autorisé sur Mac ou dans la bibliothèque privée sur iPhone et iPad ;
- l’historique de la bibliothèque et les packs enregistrés ;
- les métadonnées ordonnées des brouillons ;
- les caches de documents sémantiques ;
- les images Web archivées ;
- les recettes de capture et les brouillons en attente de révision ;
- les références des exportations réussies ;
- les instantanés MCP explicitement autorisés.

Les instantanés de brouillon et les références conservent des identifiants, l’ordre, des dates et des empreintes, mais aucune copie arbitraire du contenu Markdown. Les instantanés MCP copient volontairement uniquement le Markdown lisible et les ressources référencées d’un pack partagé, afin que l’auxiliaire isolé n’ait pas besoin d’un accès étendu aux fichiers.

Les éléments de la bibliothèque sont conservés jusqu’à leur suppression. **Réglages > Général > Examiner le stockage…** sépare le nettoyage sûr et régénérable de la suppression des données sources générées. Les fichiers générés visibles par l’utilisateur sont placés dans la corbeille, les sources favorites et celles des packs enregistrés sont protégées par défaut, et les documents originaux importés ne sont jamais sélectionnés ni supprimés. Consultez [Gérer le stockage de SourceShelf](../guides/storage-management.md) pour connaître la procédure de nettoyage.

## Confidentialité des chemins locaux

L’app affiche les chemins locaux dans son inspecteur afin de permettre l’ouverture ou l’affichage des fichiers. Ces chemins sont exclus de la provenance exportée, des concepts OKF, des manifestes, des sorties `llms.txt` et des instantanés MCP. Les captures d’écran destinées à la documentation doivent aussi recadrer ou masquer ces détails locaux.

## Classification de confiance

Le texte capturé et converti porte la classification `untrusted_reference`. Les avertissements de confiance et de sécurité sont indicatifs et n’affirment jamais que le contenu a été assaini. Examinez le texte source avant de suivre les instructions qu’il contient.

## Limites de MCP sur Mac

Le partage MCP est :

- désactivé par défaut ;
- autorisé séparément pour chaque pack enregistré ;
- assuré par un auxiliaire stdio local signé, sans écoute réseau ;
- en lecture seule ;
- limité par une liste d’autorisation et une vérification SHA-256 ;
- révocable immédiatement.

Les deux outils recherchent dans l’instantané et lisent une ressource autorisée. Il n’existe aucun outil donnant accès aux chemins du système de fichiers, aucun navigateur de fichiers généraliste, aucune action d’écriture, recherche distante, invite ou souscription.

## Identifiants de partage et configurations

Un identifiant de partage autorise un seul instantané local. Ne le publiez pas dans un dépôt ni dans une capture d’écran de documentation. Si SourceShelf est déplacé, réinstallé ou mis à jour, recopiez le chemin de l’auxiliaire. Révoquez l’accès depuis SourceShelf au lieu de compter uniquement sur la suppression d’une configuration cliente.

Pour la déclaration de confidentialité du produit et les détails d’implémentation, consultez la [Politique de confidentialité de SourceShelf](/fr/privacy.html).
