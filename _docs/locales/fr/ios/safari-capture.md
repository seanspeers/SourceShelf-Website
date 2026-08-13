# Capturer avec Safari sur iPhone et iPad

L’extension Safari de SourceShelf capture les recherches Web autorisées et les transmet à la bibliothèque locale SourceShelf. Safari, et non SourceShelf, détermine les sites auxquels l’extension peut accéder.

## Activer l’extension

Dans SourceShelf, ouvrez **Réglages > Extension Safari** et utilisez **Activer l’extension Safari…** lorsque le lien direct vers les réglages est disponible. Pour une configuration manuelle :

1. Ouvrez l’app **Réglages** du système.
2. Sous iOS ou iPadOS 18 et versions ultérieures, choisissez **Apps > Safari > Extensions**. Sous iOS ou iPadOS 17, choisissez **Safari > Extensions**.
3. Sélectionnez SourceShelf et activez **Autoriser l’extension**.
4. Choisissez l’accès aux sites Web que vous souhaitez autoriser dans Safari.

Les réglages de Safari restent la référence pour la navigation normale et privée.

## Demandes d’accès aux sites Web

Safari peut afficher sa demande d’accès au site dès que vous touchez l’extension SourceShelf dans la barre d’outils. Ce comportement système est normal ; SourceShelf ne peut ni supprimer ni remplacer la demande. Accordez l’accès nécessaire à la page que vous souhaitez capturer.

Pour une collection `llms.txt` couvrant plusieurs sites ou plusieurs onglets, la révision peut marquer certaines sources comme **Accès nécessaire**. Sur iPhone et iPad, ouvrez chaque site indiqué, autorisez SourceShelf dans Safari, puis rouvrez la révision pour l’actualiser. Si Safari répète la demande ou si la page reste indisponible, vérifiez l’accès aux sites de SourceShelf dans les réglages de Safari plutôt que de toucher plusieurs fois l’action de la fenêtre contextuelle.

## Capturer une page

Ouvrez une page HTTP(S) normale, touchez la commande des extensions de Safari et choisissez SourceShelf. La fenêtre peut enregistrer la page, son contenu principal, le texte sélectionné, une zone sélectionnée ou une série ordonnée de passages de recherche. Les actions interactives exigent une page compatible et, pour une capture fondée sur une sélection, une sélection réelle.

Une capture de page unique est enregistrée dans **Toutes les recherches**. SourceShelf archive les images référencées admissibles dans ses limites habituelles afin que le résultat reste lisible hors ligne.

## Capturer la fenêtre Safari active

Choisissez **Recherche > Capturer la fenêtre active**. SourceShelf examine les onglets signalés par Safari dans la fenêtre où l’extension a été ouverte. Sélectionnez les onglets utiles, choisissez un pack nouveau ou existant, puis lancez la capture.

Les pages non compatibles ou inaccessibles restent visibles, mais ne peuvent pas être sélectionnées. SourceShelf conserve l’ordre choisi dans Safari, poursuit le traitement si une page échoue et ne crée pas de pack vide si toutes les pages échouent. Les onglets disponibles sont déterminés par Safari et peuvent varier selon la fenêtre, le groupe d’onglets, les autorisations et l’état du système.

## Importer la collection llms.txt d’un site

Sur un site Web, choisissez **Recherche > Importer via llms.txt**. SourceShelf cherche un index applicable à l’aide des liens de découverte déclarés, puis de chemins `llms.txt` de plus en plus généraux jusqu’à la racine du site. L’app présente les sections ordonnées et les ressources répertoriées sans explorer les autres liens de la page.

Sélectionnez les ressources voulues et choisissez un pack nouveau ou existant. L’index `llms.txt` est enregistré en premier, puis les ressources sélectionnées réussies dans l’ordre indiqué. L’échec d’une ressource n’annule pas les autres.

## Achèvement et récupération

L’extension prépare des transferts locaux de taille limitée pour l’app principale. SourceShelf les traite au lancement ou lors de son retour au premier plan. Si une capture terminée n’apparaît pas immédiatement, ouvrez SourceShelf et laissez l’app terminer l’importation en attente.

L’annulation d’une opération distante interrompt les requêtes encore actives et supprime si possible les données temporaires. Les tâches locales déjà acceptées peuvent se terminer. SourceShelf ne transforme jamais l’app native iPhone ou iPad en robot d’exploration en arrière-plan.
