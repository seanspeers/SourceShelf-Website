# Utiliser SourceShelf avec OpenCode

OpenCode Peut héberger l'assistant stdio SourceShelf et rendre ses deux outils à lecture seule disponibles pour un cloud ou Ollama-modèle soutenu.

Ce guide vise le courant actuel OpenCode Configuration V2 documentée le 01/08/2026. Les versions plus anciennes utilisent une autre MCP Forme JSON ; utilisez celle de cette version. `mcp add` Flux ou mettre à jour sa configuration en conséquence.

## Ajouter un local MCP serveur

De SourceShelf **copie MCP configuration** Utilise le commun `mcpServers` Forme. OpenCode V2 attend une matrice de commande locale sous `mcp.servers`, alors traduisez-le comme suit dans `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "sourceshelf-municipal-research": {
        "type": "local",
        "command": [
          "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
          "--share",
          "<share-id>"
        ],
        "codemode": false
      }
    }
  }
}
```

Utilisez le chemin d'aide exact et le identifiant de partage de SourceShelf. Gardez les existants OpenCode Paramètres et autres serveurs lors de la fusion de l'entrée.

`"codemode": false` Expose directement les deux outils SourceShelf. C'est une valeur par défaut utile pour les modèles locaux plus petits car ils n'ont pas besoin d'écrire un enveloppeur de mode de code autour des appels.

## Vérifier et tester

ouvert OpenCode Et confirmer le local MCP Le serveur est activé. Ensuite demandez :

> appeler `search_pack` pour `open data publication schedule`, lisez le meilleur ressource avec `read_pack_resource`, et répondez uniquement à partir de ce résultat. Incluez sa SourceShelf. URI.

Si le modèle ne génère qu'une simple appel, passez à un modèle avec une meilleure fonction d'appel ou rendez l'instruction plus procédurale.

## Utiliser un Ollama modèle

Avec l'entrée SourceShelf déjà enregistrée :

```sh
ollama launch opencode
```

Ollama Documents qui fusionnent en profondeur sa configuration de modèle temporaire avec votre configuration existante. OpenCode Configuration, en préservant le MCP Entrée du serveur.

## Plus âgé OpenCode Sorties

Les clés de configuration ont changé entre OpenCode Générations. si `mcp.servers` Est rejeté, exécutez la version installée MCP Ajoutez la commande ou consultez sa documentation associée/actuelle plutôt que de placer à la fois les formes anciennes et les nouvelles dans un seul fichier.

Références officielles : [OpenCode V2 MCP Serveurs](https://opencode.ai/v2/docs/mcp-servers), [Ollama avec OpenCode](https://docs.ollama.com/integrations/opencode).
