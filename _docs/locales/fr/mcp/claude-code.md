# Utiliser SourceShelf avec Claude Code

Claude Code Peut héberger le serveur stdio local de SourceShelf et fournir ses outils de recherche et de lecture au modèle actif.

Dernière vérification : 01/08/2026.

## Ajouter le serveur

Créez une part SourceShelf, puis exécutez :

```sh
claude mcp add --transport stdio --scope user sourceshelf-municipal-research -- \
  "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer" \
  --share "<share-id>"
```

Utilisez le chemin exact et le identifiant de partage affichés par SourceShelf. le `--scope user` L'option rend la connexion disponible dans tous vos projets. Omettre pour Claude CodeLa portée locale par défaut/spécifique au projet, ou utiliser `--scope project` Quand l'équipe devrait recevoir un enregistrement en ligne `.mcp.json` Entrée.

## vérifier

De une coquille :

```sh
claude mcp list
```

à l'intérieur Claude Code, entrez :

```text
/mcp
```

Confirmez cela `search_pack` et `read_pack_resource` Apparaître.

## Demande de test

> Recherchez dans le pack SourceShelf l'avis du service de transport. Lisez le résultat le plus pertinent et expliquez le changement de service, en citant le `sourceshelf://` URI. aucune autre source de fichiers ou de sites Web.

Pour un modèle plus faible, exigez explicitement une recherche suivie d'une lecture.

## Configuration du projet

Claude Code Soutient également `.mcp.json`. SourceShelf utilise déjà la configuration copiée de manière commune. `mcpServers` Forme :

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "type": "stdio",
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

Ne pas enregistrer un identifiant de partage réel dans un référentiel public. Préférez la portée de l'utilisateur pour une capture d'écran personnelle de SourceShelf.

## Utiliser un Ollama modèle

Après la configuration de l'entrée SourceShelf, Ollama Peut lancer Claude Code Contre un modèle local :

```sh
ollama launch claude
```

le Claude Code Le processus reste le MCP Animateur ; Ollama Fournit le modèle.

Référence officielle : [Claude Code MCP](https://code.claude.com/docs/en/mcp).
