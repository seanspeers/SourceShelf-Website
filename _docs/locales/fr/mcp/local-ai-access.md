# Accès local à l’IA (MCP)

L'accès local à l'IA permet à une application IA compatible de rechercher et de lire un pack SourceShelf sauvegardé sans l'exporter et le télécharger à plusieurs reprises. Le partage est local, en lecture seule, dans le contexte du pack et est désactivé par défaut.

SourceShelf utilise le protocole de contexte de modèle (MCP) par rapport à l'entrée/sortie standard. Il ne lance pas un serveur Web ou un écouteur réseau.

## Avant de connecter un client

1. ouvert **SourceShelf > Paramètres > Intégrations**.
2. favoriser **local MCP Partageant**.
3. ouvert **Packs** Et sélectionnez un pack enregistré.
4. Enregistrez toutes les modifications en cours.
5. choisir **Plus > Accès local à l'IA...**.
6. Examinez les résultats récents de Trust & Safety. Si vous y trouvez des avertissements ou des erreurs de source lisibles, choisissez explicitement **Partager avec des problèmes** Pour continuer.

![Le local par choix MCP Paramètres de partage](../../../assets/images/integrations-settings.png)

![Une capture d'écran actuelle d'accès local à l'IA pour un pack sauvegardé synthétique.](../../../assets/images/local-ai-access.png)

Un pack sans titre ou sale ne peut pas être partagé. Un pack sans sources lisibles est bloqué.

## Ce que SourceShelf publie

Chaque autorisation crée un identifiant de partage aléatoire et une capture d'écran immuable contenant uniquement le pack sélectionné :

- Un aperçu du pack avec des liens de source triés par ordre ;
- Un généré `llms.txt` Indice ;
- Un catalogue JSON public ;
- Une ressource Markdown par source lisible ;
- Images archivées référencées ;
- Les chiffrages de contrôle et un interne URI Liste d'autorisations.

L'instantané le fait **pas du tout** inclure les chemins des fichiers sources, les chemins des dossiers de sortie, les favoris de sécurité, les éléments de la bibliothèque non liés ou l'accès écrit.

Le texte indique de préceder une notice de référence non fiable sans modifier le corps Markdown stocké. Chaque demande URI est vérifié contre la liste d'autorisations de snapshot et son SHA-256 Checksum avant qu'il ne soit servi.

## Ressources et outils

Le serveur expose ce qui peut être découvert. `sourceshelf://pack/...` Ressources et deux outils à lecture seule :

### `search_pack(query, limit)`

Recherche le pack partagé localement et renvoie des extraits classés ainsi que la ressource. URIs. La recherche est déterministe et lexicale ; elle ne utilise pas d'embeddings, ne fait pas de requêtes réseau ou ne appelle pas de modèle.

### `read_pack_resource(uri, cursor, max_characters)`

Lit une ressource texte dans des pages limitées. Le curseur permet à un client de continuer à travers une longue source sans surcharger la fenêtre de contexte d'un modèle plus petit.

Ce duo est particulièrement utile pour les modèles locaux : le modèle peut rechercher de manière précise, lire uniquement les sections de source les plus pertinentes et citer leur SourceShelf. URIUn hôte compatible doit toujours permettre au modèle d'appeler les outils.

## Copiez les détails de la connexion

le **Accès local à l'IA** La feuille fournit :

- **copie MCP configuration** — JSON dans le commun `mcpServers` Format utilisé par LM Studio Et plusieurs clients ;
- **Commande de copie** — l'exécutable d'aide plus `--share` Argument d'autorisation ;
- **rafraîchir** — reconstruire l'instantané après une révision explicite lorsque nécessaire ;
- **Arrêtez de partager** — révoquer immédiatement l'autorisation.

Traitez l'identifiant de part copié comme un jeton d'accès local. Il ne s'agit pas d'un mot de passe envoyé sur Internet, mais tout processus exécuté en tant qu'utilisateur qui possède l'identifiant et le chemin auxiliaire peut demander cette capture d'écran.

## Récupération et annulation de l'instantané.

SourceShelf réévalue les actions après des changements pertinents dans les packs, la bibliothèque et la politique de confiance :

- Si un nouveau résultat Trust & Safety est prêt, SourceShelf peut remplacer automatiquement l'instantané.
- Si de nouveaux avertissements ou erreurs apparaissent, l'instantané valide précédent reste disponible et le partage devient **Révision requise**.
- sélectionner **rafraîchir** Et confirmez avant de publier ces changements.
- La suppression du pack sauvegardé annule sa part.
- **Arrêtez de partager**, **Annuler tout**, ou désactiver Local MCP Le partage invalide immédiatement les configurations copiées.

L'assistant recharge le registre et les métadonnées de snapshot pour chaque demande, de sorte qu'un client en cours d'exécution ne peut pas continuer à lire un partage révoqué.

## Déplacer ou mettre à jour SourceShelf

Les configurations copiées pointent vers l'assistant à l'intérieur de l'application SourceShelf. Si vous déplacez, réinstallez ou mettez à jour SourceShelf, copiez une configuration fraîche à partir de **Accès local à l'IA...** Donc le client IA utilise l'emplacement actuel de l'assistant.

## Choisissez un guide client

- [LM Studio](lm-studio.md)
- [Ollama](ollama.md)
- [Codex](codex.md)
- [Claude Code](claude-code.md)
- [OpenCode](opencode.md)

voir [MCP diagnostic des anomalies](troubleshooting.md) Si l'assistant quitte, des outils manquent ou un partage n'est pas à jour.

## Notes du protocole

Les utilisations de l'assistant de SourceShelf MCP Au-dessus de stdio et prend en charge la version du protocole implémentée par son SDK Swift intégré. Le serveur ne publie que les ressources et les deux outils à lecture seule ; il ne publie pas les invites, les outils d'écriture, les abonnements ou les notifications de modification de liste.

Lecture complémentaire : [MCP Ressources](https://modelcontextprotocol.io/docs/learn/server-concepts), [MCP Outils](https://modelcontextprotocol.io/docs/learn/server-concepts#tools).
