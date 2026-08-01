# Utiliser SourceShelf avec Codex

Codex Peut lancer l'assistant stdio de SourceShelf et exposer les ressources et les outils du pack partagé à un cloud ou Ollama-modèle local soutenu.

Dernière vérification : 01/08/2026.

## Option 1 : ajouter le serveur depuis la ligne de commande

1. Dans SourceShelf, créez un partage et sélectionnez **Commande de copie**.
2. Ajoutez-le à Codex. z le chemin exact de l'assistant et l'identifiant de partage de SourceShelf :

```sh
codex mcp add sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

1. Vérifier l'enregistrement :

```sh
codex mcp list
```

1. commencer Codex Et entrez `/mcp` Pour inspecter le serveur connecté.

## Option 2 : modifier Codex configuration

Codex Les clients partagent MCP Configuration dans `~/.codex/config.toml`. :

```toml
[mcp_servers.sourceshelf-municipal-research]
command = "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer"
args = ["--share", "<share-id>"]
```

Vous pouvez plutôt mettre l'entrée dans le projet de confiance. `.codex/config.toml` Lorsque la connexion doit être spécifique au projet. Utilisez la commande exacte copiée de la partage SourceShelf.

## Option 3 : Codex Paramètres de l'application

dans Codex Paramètres de l'application, ajoutez un MCP Serveur, choisissez **STDIO**, entrez la commande et les arguments d'aide, enregistrez et redémarrez la connexion. La même configuration du serveur est disponible pour Codex CLI parce que les clients partagent `config.toml`.

## Tester le pack partagé

Essayer :

> Utilisez SourceShelf pour trouver les indicateurs climatiques du pack de démonstration. Lisez la source la plus pertinente, résumez la tendance rapportée et citez son `sourceshelf://` URI. ne pas inspecter les fichiers locaux non liés.

Pour un modèle local via Ollama:

```sh
ollama launch codex
```

Ou utiliser `codex --oss` Quand votre Codex La configuration du fournisseur local cible déjà Ollama.

## Supprimez ou remplacez la connexion

utiliser `codex mcp remove sourceshelf-municipal-research` Pour supprimer l'entrée du client. Cela ne révoque pas la part SourceShelf. Pour révoquer l'accès immédiatement, choisissez **Arrêtez de partager** Dans SourceShelf aussi.

Si vous déplacez, réinstallez ou mettez à jour SourceShelf, supprimez ou mettez à jour l'ancien. Codex Entrée et copie d'un chemin d'aide frais.

Référence officielle : [Codex MCP configuration](https://developers.openai.com/codex/mcp/).
