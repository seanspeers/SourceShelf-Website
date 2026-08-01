# Utiliser SourceShelf avec Ollama

Ollama Exécute le modèle local. Un MCP-Agent capable - tel que Codex, Claude Code, ou OpenCode—héberge la connexion SourceShelf et donne ses outils à ce modèle.

OllamaLe chat natif et l'outil de support API appelant, mais Ollama N'est pas en soi la SourceShelf MCP Client. Le test le plus simple est donc :

```text
SourceShelf MCP helper → Codex / Claude Code / OpenCode → Ollama model
```

Dernière vérification : 01/08/2026.

## Configuration recommandée : Ollama avec Codex

1. Créez le partage SourceShelf et copiez son commande.
2. Ajoutez-le à Codex Utilisant [le Codex guide](codex.md).
3. lancement Codex à travers Ollama:

```sh
ollama launch codex
```

1. Choisissez un modèle installé avec une fenêtre de contexte suffisamment grande et une appelation de outils fiable.
1. dans Codex, courir `/mcp` Et confirmer que le serveur SourceShelf et ses deux outils sont présents.
1. Demander :

> Recherchez dans le pack SourceShelf les tendances de la fréquentation des transports en commun, lisez le meilleur résultat et citez la ressource. URI.

Ollama Recommande au moins une fenêtre de contexte de 64K pour les agents de codage. Le flux de travail de recherche prioritaire de SourceShelf réduit le contexte inutile, mais l'agent lui-même peut encore avoir besoin de place pour les définitions des outils et les résultats.

## Ollama avec OpenCode

1. Configurez SourceShelf dans OpenCode Utilisant [le OpenCode guide](opencode.md).
2. Démarrez l'agent local via Ollama:

```sh
ollama launch opencode
```

Ollama Dit qu'il fusionne profondément la configuration de lancement temporaire avec une configuration existante. OpenCode Configuration, donc votre SourceShelf MCP L'entrée reste disponible.

## Ollama avec Claude Code

1. Configurez SourceShelf en utilisant [le Claude Code guide](claude-code.md).
2. Lancement :

```sh
ollama launch claude
```

Ensuite utilisez `/mcp` dans Claude Code Pour confirmer le serveur.

## Mode manuel de modèle local dans Codex

Si votre Codex L'installation pointe déjà vers Ollama, vous pouvez également le commencer avec :

```sh
codex --oss
```

le MCP La configuration reste dans Codex; `--oss` Choisissez le fournisseur de modèle open source local. Si vous maintenez plusieurs fournisseurs locaux, utilisez un nom. Codex Profil à la place.

## Choisir un modèle

Cherchez un modèle dont le Ollama La page ou la documentation mentionne explicitement l'appel d'outils/fonctions. Les modèles plus petits bénéficient de prompts directs tels que :

> appeler `search_pack` Premier. utiliser `read_pack_resource` Seulement sur le résultat le plus élevé. Ne devinez pas et ne lisez pas tout le pack.

Si le modèle écrit à plusieurs reprises une appel hypothétique d'outil sous forme de texte, la connexion hôte peut fonctionner alors que le comportement d'appel d'outil du modèle ne le fait pas. Vérifiez auprès d'un modèle plus capable d'outils avant de déboguer SourceShelf.

## Avancé : construisez votre propre pont

Une application utilisant OllamaL'API de chat peut définir des fonctions et les exécuter, mais elle doit également implémenter un MCP Client ou traduisez ces fonctions vers SourceShelf. MCP Appels. SourceShelf ne fournit intentionnellement pas d'extrémité réseau. Pour les tests normaux, un hôte d'agent existant est beaucoup plus simple et plus sûr.

Références officielles : [Ollama Appel d'outil](https://docs.ollama.com/capabilities/tool-calling), [Ollama lancement](https://docs.ollama.com/cli), [Ollama avec Codex](https://docs.ollama.com/integrations/codex), [Ollama avec OpenCode](https://docs.ollama.com/integrations/opencode), [Ollama avec Claude Code](https://docs.ollama.com/integrations/claude-code).
