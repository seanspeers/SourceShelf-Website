# Capturer depuis Safari

L'extension SourceShelf Safari enregistre la page actuelle, le contenu principal, une sélection, une zone de page sélectionnée ou un panier de points forts de recherche sous forme de Markdown local.

## Activer l'extension Safari

1. Lancez SourceShelf.
2. ouvert **Safari > Paramètres > Extensions**.
3. Activez l'extension SourceShelf.

## Modes de capture

- **Utiliser la recette par défaut** Suivre le mode de contenu de la recette sélectionnée.
- **Sauvegarder toute la page sous forme de Markdown** Gardent le corps de la page large.
- **Enregistrer le contenu principal sous forme de Markdown** Se concentre sur l'article ou le document principal.
- **Enregistrer la sélection sous forme de Markdown** utilise la sélection de texte actuelle de Safari.
- **Sélectionnez la zone comme Markdown** Vous permet de choisir une région de page.
- **Enregistrer les points forts sous forme de Markdown** Combine le panier de mise en évidence commandé et la note courte facultative.

Les actions popup explicites suppriment la valeur par défaut de la recette pour cette capture.

## Capturer les recettes

ouvert **SourceShelf > Paramètres > Capture** Créer, duplicer, réorganiser ou supprimer des recettes. Une recette peut définir :

- Modèles de noms de fichiers et de dossiers relatifs ;
- Champ YAML personnalisés ;
- Mode de contenu par défaut ;
- Comportement de l'image et du lien ;
- Comportement de révision avant sauvegarde ;
- Une politique de raideur ;
- Ordonné les règles exactes de l'hôte et du domaine wildcard.

Les hôtes exacts sont plus spécifiques que les wildcards les plus courants tels que `*.example.com`. sont égauxement spécifiques, l'ordre enregistré de ces règles détermine le résultat du match.

Le intégré **norme** La recette reflète le comportement de sauvegarde rapide et est la solution de secours lorsque les paramètres manquent, sont invalides ou font référence à une recette supprimée.

## Modèles et YAML

Les modèles peuvent utiliser `{title}`, `{domain}`, `{date}`, `{time}`, `{captured_at}`, `{mode}`, `{recipe}`, `{url}`, et `{note}`. SourceShelf désinfecte chaque composant de dossier, rejette les chemins absolus et `..`, et garde la destination sous le dossier de sortie autorisé.

Les clés YAML personnalisées doivent être uniques et valides. SourceShelf protège ses clés de provenance, y compris `title`, `url`, `domain`, `captured_at`, `source`, et `created_by`.

## Capture du clavier en une seule étape

dans **Paramètres > Capture**, choisissez une recette pour le raccourci de capture rapide Safari. Ensuite, ouvrez les paramètres des raccourcis clavier de l'extension Safari et attribuez une combinaison de touches au commandement de capture rapide de SourceShelf.

Lorsqu'il est invoqué, SourceShelf choisit la recette en utilisant cette séquence :

1. La règle de domaine la plus spécifique pour la page active ;
2. La recette de raccourci configurée ;
3. La recette de secours standard.

Une page simple, le contenu principal ou des recettes de sélection compatibles peuvent être enregistrés immédiatement sans ouvrir la fenêtre contextuelle. Une recette qui nécessite une révision ou un flux de travail interactif, tel que la sélection d'une zone ou la collecte de mises en évidence, ouvre plutôt l'extension.

## Points forts de la recherche

Sélectionnez le texte sur une page, ouvrez SourceShelf et choisissez **Ajouter la sélection actuelle**. ez-le à nouveau pour construire un panier ordonné. Vous pouvez supprimer ou réorganiser les extraits et ajouter une courte note avant de les enregistrer ensemble comme un `.highlights` Capturer.

Le panier est limité à l'onglet du navigateur et URL. uniquement après l'acceptation du transfert de main natif ou lorsque la navigation le rend obsolète.

## Revenez-y avant de sauvegarder

Une recette activée pour la révision file une feuille de révision locale dans SourceShelf. Vous pouvez modifier la destination relative, le nom du fichier, le YAML personnalisé, la note et le corps Markdown, puis passer d'Aperçu à Source Markdown. L'origine reste en lecture seule.

Les brouillons de révision survivent au relancement de l'application. Enregistrer réinterprète le Markdown modifié et ne copie que les images en version préliminaire référencées. Annuler supprime le brouillon et ses actifs en version préliminaire.

## Recettes de dépannage

Si une nouvelle recette ne s'affiche pas dans Safari :

1. Vérifiez que l'extension SourceShelf est activée dans Safari.
2. Ouvrez Open SourceShelf une fois pour qu'il puisse publier les recettes actuelles.
3. Fermez et rouvrez la fenêtre contextuelle de l'extension ; un redémarrage de Safari ne devrait normalement pas être nécessaire.
4. Si le menu est vide, ouvrez **Paramètres de capture** à partir de la fenêtre contextuelle et confirmez qu'il existe au moins une recette standard ou personnalisée.
