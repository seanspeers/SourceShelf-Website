# Dépannage MCP

Travaillez à partir de SourceShelf vers l'extérieur : instantané, chemin d'aide, connexion client, puis comportement du modèle.

## 1. Confirmer l'état de SourceShelf

Ouvrez le pack sauvegardé **Accès local à l'IA** Feuille et vérifier :

- Le partage mondial est activé ;
- Le pack est sauvegardé et n'a pas de modifications non sauvegardées ;
- Une capture d'écran publiée est affichée ;
- Le statut est **actuel**, ou vous avez intentionnellement conservé un **Révision requise** Instantané ;
- L'instantané contient au moins une source lisible.

sélectionner **rafraîchir** Si vous souhaitez examiner et publier les modifications actuelles. utiliser **copie MCP configuration** Encore une fois après tout changement du chemin d'installation de SourceShelf.

## 2. Tester directement la commande copiée.

coller **Commande de copie** Dans le terminal. Un stdio MCP l'assistant attend normalement silencieusement l'entrée du protocole ; il ne s'agit pas d'une application de shell interactive. Si elle s'arrête immédiatement et affiche un diagnostic, vérifiez le message à la recherche d'une part manquante, d'un registre désactivé, d'une instantané invalide ou d'une erreur de chiffrage. Appuyez sur Control-C pour arrêter un test direct en attente.

Les diagnostics appartiennent à l'erreur standard. Les messages du protocole JSON-RPC appartiennent à la sortie standard. Les clients qui fusionnent ou réécrivent ces flux peuvent rompre la connexion.

## 3. Erreurs courantes

### Le processus a été terminé avec le code 1 / connexion fermée.

Causes probables :

- L'application configurée a été déplacée, mise à jour ou remplacée ;
- La participation copiée a été révoquée ;
- mondial MCP Le partage est désactivé ;
- L'instantané ou le registre ne peut pas être lu.

Ouvrez Open SourceShelf, confirmez le partage du pack et copiez une nouvelle configuration.

### Méthode non trouvée : `tools/list`

Le client a atteint un assistant plus ancien qui ne dispose que de ressources. Installez la version actuelle de SourceShelf, puis recopiez la commande et redémarrez l'intégration du client. SourceShelf actuel annonce `search_pack` et `read_pack_resource`.

### Ressource non trouvée

le URI Est issu d'un autre pack, d'une autre part, d'une capture d'écran plus ancienne ou n'est pas sur la liste d'autorisation des captures d'écran. Recherchez à nouveau et lisez le URI Renvoyé par le résultat actuel de la recherche.

### Échec de la somme de contrôle

SourceShelf refuse de servir un fichier instantané qui ne correspond plus à son chèque de somme publié. Rechargez le partage depuis SourceShelf. Ne modifiez pas les fichiers à l'intérieur. `MCP Shares/<share-id>/` Manuellement.

### Le client affiche des ressources, mais le modèle ne appelle jamais les outils.

le MCP La connexion fonctionne, mais la politique du modèle ou de l'hôte ne génère pas d'appels d'outils. Essayez :

> Premier appel `search_pack` Avec une requête `...`. Puis appelez `read_pack_resource` Sur le résultat le plus élevé. Ne répondez pas avant que les deux appels ne soient terminés.

Si cela devient toujours du texte brut, testez un modèle connu pour prendre en charge l'appel de fonctions.

### La recherche manque une phrase exacte

Utilisez des termes de contenu significatifs plutôt que du texte chargé de ponctuation. La recherche est une récupération lexicale locale, et non une recherche d'intégration sémantique. Essayez un autre mot ou une phrase plus courte.

### Une longue source est coupée.

appeler `read_pack_resource` Encore une fois avec le curseur retourné. Plus petit `max_characters` Les valeurs aident les modèles de contexte limité.

## 4. Créer une nouvelle autorisation

Si l'état du client reste ambigu :

1. Supprimez l'entrée du serveur du client IA.
2. Dans SourceShelf, choisissez **Arrêtez de partager**.
3. Enregistrez et recheckez le pack.
4. Créez une nouvelle autorisation d'accès local à l'IA.
5. Ajoutez la configuration nouvellement copiée au client.

Une nouvelle autorisation obtient un nouveau identifiant de part. Les anciennes configurations restent invalides.
