# Référence des réglages

ouvert **SourceShelf > Paramètres**. est rétrécissable et est organisée en cinq onglets.

## Langue

SourceShelf prend en charge l’anglais, le français, l’espagnol d’Amérique latine, le portugais du Brésil et le japonais. L’app utilise la langue choisie pour SourceShelf dans **Réglages Système > Général > Langue et région > Applications**. Sinon, elle suit l’ordre des langues préférées de macOS. L’extension Safari suit la langue de l’interface de Safari.

Changer la langue de l’interface ne traduit pas les documents sources, les noms personnalisés de recettes ou de packs, le texte exporté, les identifiants MCP, les noms de fichiers ni les champs des manifestes.

## général

Choisissez le dossier de sortie utilisé pour le nouveau Markdown converti et capturé. SourceShelf stocke un marque-page autorisé localement afin qu'il puisse revenir dans ce dossier. En le modifiant, cela affecte la sortie future ; il ne déplace pas les fichiers existants.

**Examen du stockage...** inventaires générés Markdown, actifs de production projetés, copies de bibliothèque gérées, caches sémantiques, locaux MCP Des instantanés, et capture des brouillons/staging. Safe Cleanup supprime uniquement les données internes orphelines ou régénérables. La nettoyage à partir de source générée est un flux de travail de sélection et de confirmation distinct qui déplace les fichiers de sortie dans la corbeille ; les sources étiquetées et enregistrées sont protégées par défaut, et les documents importés originaux ne sont jamais des cibles de suppression. voir [Gérer le stockage SourceShelf](../guides/storage-management.md) Pour le flux de travail complet.

## capture

Les paramètres de capture comprennent :

- Statut de l'extension Safari et un raccourci vers les paramètres de l'extension Safari ;
- Organisation par domaine et date ;
- Comportement de l'image web archivée ;
- L'âge de la sténacité mondiale de la capture web ;
- Capturer la création, la duplication, la suppression, l'affichage, les modèles, le YAML, le comportement et les règles de domaine des recettes ;
- L'action de clavier de capture rapide Safari et sa recette préférée.

Les modifications des recettes sont enregistrées localement et publiées dans l'extension SourceShelf Safari.

## exportation

Choisissez le format initialement sélectionné dans le sélecteur d'exportation des packs. Les paramètres et le sélecteur partagent une seule préférence ; la confirmation d'un choix différent le met à jour, tandis que l'annulation ne le fait pas.

**Inclure des morceaux de récupération dans les ZIP des packs de référence IA.** Ajoute modèle-neutre `chunks.jsonl`. est activé par défaut et ne ajoute jamais d'embeddings.

## Intégrations

**Activer local MCP Partageant** est désactivé par défaut. Lorsqu'il est activé, les packs enregistrés individuels peuvent être autorisés à partir de **Packs > Plus > Accès local à l'IA...**.

Cette onglet affiche le nombre de partages actifs et fournit **Packs ouverts** et **Annuler tout**. le partage ou la révocation de tout cela supprime les instantanés et invalide immédiatement les configurations clients copiées.

voir [Accès local à l'IA](../mcp/local-ai-access.md).

## vie privée

Cette onglet résume le stockage local, les exportations, les blocs de récupération, la comparaison des livraisons et le comportement de conseil en matière de confiance et de sécurité. **Ouvrir les détails de la confidentialité** Ouvre l'explication complète de la confidentialité dans l'application.
