# Utiliser SourceShelf avec LM Studio

LM Studio Peut exécuter un modèle local et agir comme le MCP hôte qui lance l'assistant de SourceShelf. Utilisez un modèle avec un support fiable pour l'appel d'outils ; le modèle doit choisir `search_pack` et `read_pack_resource` Pendant la conversation.

Dernière vérification : 01/08/2026.

## Exigences

- Une courante LM Studio Libération avec MCP Soutien (LM Studio Documents MCP Soutien à partir de 0.3.17).
- Un modèle téléchargé et chargé qui prend en charge l'utilisation d'outils.
- Une part actuelle de SourceShelf créée via **Packs > Plus > Accès local à l'IA...**.

## Installez la connexion SourceShelf

1. Dans SourceShelf, ouvrez le pack. **Accès local à l'IA** Plaque.
2. sélectionner **copie MCP configuration**.
3. dans LM Studio, ouvre le **programme** Fichier.
4. sélectionner **installer**, alors **Modifier mcp.json**.
5. Coller ou fusionner le copié `mcpServers` Entrée. Ne retirez pas d'autres serveurs que vous voulez garder.
6. Enregistrez le fichier et activez l'intégration SourceShelf.

Le résultat a cette forme :

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

Utilisez la commande exacte et partagez l'ID copié par SourceShelf. Ne remplacez pas manuellement un chemin d'application ou d'aide.

## Tester les outils

Chargez un modèle local capable d'outils et commencez par une demande étroite et explicite :

> Utilisez les outils SourceShelf pour rechercher des cibles de canopée d'arbres dans le pack partagé. Lisez la ressource la mieux correspondante, résumez les cibles et citez la ressource SourceShelf. URI. z ne répondez pas à partir de connaissances générales.

Pour un modèle plus petit, faites explicitement la séquence :

> Premier appel `search_pack` Avec la requête `tree canopy targets` Et une limite de 5. Ensuite appelez `read_pack_resource` Pour obtenir le meilleur résultat. Basez la réponse uniquement sur le texte retourné.

Vous devriez voir une appel de recherche suivie d'une ou plusieurs lectures limitées. Si le modèle décrit les outils au lieu de les appeler, essayez un modèle avec un meilleur support pour l'appel de fonctions ou conservez la formulation procédurale.

## LM Studio En tant que serveur API local

LM Studio Peut également être configuré MCP Serveurs disponibles pour un agent basé sur une API. actuel LM Studio La documentation nécessite la configuration du serveur et les paramètres d'autorisation avant que les clients API ne puissent appeler les serveurs à partir de `mcp.json`. route avancée ; le chat intégré est le test fonctionnel le plus simple.

## général LM Studio Erreurs

### « Le processus du plugin s'est terminé de manière inattendue avec le code 1 »

L'assistant n'a pas pu démarrer ou valider le partage. Recopiez la configuration après avoir déplacé ou mis à jour SourceShelf, confirmez que le partage est activé et confirmez que le pack affiche toujours une capture d'écran actuelle.

### « Méthode inconnu : outils/liste »

Le client a atteint un assistant uniquement de ressources ou plus ancien. Installez la version actuelle de SourceShelf, recopiez la configuration et redémarrez l'intégration. SourceShelf actuel expose les deux. `search_pack` et `read_pack_resource`.

### La fenêtre contextuelle se remplit rapidement.

Demandez au modèle de rechercher d'abord et de lire seulement un ou deux résultats. L'outil de lecture par pages de SourceShelf existe spécifiquement pour éviter de charger chaque ressource dans la boîte de dialogue.

Références officielles : [LM Studio MCP Serveurs](https://lmstudio.ai/docs/app/mcp), [LM Studio MCP Utilisation de l'API](https://lmstudio.ai/docs/developer/core/mcp), [LM Studio Paramètres du serveur](https://lmstudio.ai/docs/developer/core/server/settings).
