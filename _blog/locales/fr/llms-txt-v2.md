# llms.txt v2 : une meilleure façon pour l’IA de découvrir les connaissances d’un site Web

Les connaissances d’un site Web lisibles par l’IA deviennent plus faciles à découvrir.

La proposition `llms.txt` a atteint la version 2. Elle met à jour cette convention émergente afin d’aider les assistants et agents IA à trouver du contenu Web utile et lisible par machine. Si vous découvrez ce format, commencez par notre [introduction à llms.txt](what-is-llms-txt.md).

La proposition originale a introduit une idée simple : donner à un site Web un petit index Markdown qui explique ce que le site contient et indique aux systèmes d'IA les ressources les plus utiles.

La version 2 conserve cette simplicité, mais aborde l'un des plus grands problèmes pratiques de la proposition originale :

**Comment un agent IA peut-il savoir qu’un fichier `llms.txt` — ou une version Markdown épurée d’une page — existe ?**

La réponse est une meilleure découverte.

Et SourceShelf 1.0.2 prend déjà en charge le nouveau flux de travail `llms.txt` v2, ce qui permet de découvrir, d'apercevoir, de sélectionner, d'importer, d'organiser et de préserver les connaissances sur les sites Web compatibles avec l'IA directement depuis Safari.

## Pourquoi llms.txt avait besoin d'une version 2

Lorsque `llms.txt` a été proposé pour la première fois en 2024, la lecture systématique des sites Web par des agents d'IA était encore largement une attente quant à l'orientation du web.

Cela a changé rapidement.

Les assistants de codage IA consultent désormais la documentation pendant le travail. Les assistants dotés de recherche récupèrent des pages Web pour répondre aux questions. Les agents ont de plus en plus besoin de localiser des informations spécifiques dans les sites Web plutôt que de simplement afficher ces sites à une personne.

Le [Journal officiel des modifications de llms.txt v2](https://llmstxt.org/changes.html) note que des milliers de sites publient désormais un fichier `llms.txt`, les plateformes de documentation les génèrent automatiquement et les principaux fournisseurs d'IA les publient pour leur propre documentation de développeurs.

La version 2 reflète ce qui a été appris à partir de cette adoption.

Il ne réinvente pas le format de base ou ne fait en sorte que la version 1 cesse de fonctionner. Au contraire, il rend `llms.txt` plus facile à découvrir et clarifie la façon dont les agents devraient l'utiliser.

## 1. Les sites Web peuvent annoncer explicitement leur llms.txt.

L'ajout le plus important dans la version 2 est la découvrabilité.

Auparavant, un outil qui voulait trouver un fichier `llms.txt` devait souvent essayer un emplacement prévisible tel que :

```text
/llms.txt
```

Cette URL conventionnelle reste utile, mais essayer un emplacement connu n'est pas la même chose que le site Web déclarant explicitement une relation.

La version 2 recommande d'utiliser la relation HTML standard :

```html
<link rel="describedby" href="/llms.txt">
```

Un site Web peut utiliser cela pour dire au logiciel compatible :

**Il s'agit du fichier llms.txt qui décrit cette page.**

Les mêmes informations peuvent être fournies via un en-tête HTTP `Link`, ce qui signifie que les sites Web, les systèmes de documentation, les CDN et d'autres infrastructures peuvent exposer la relation sans modifier la page visible.

Au lieu de nécessiter un outil d'IA pour explorer un site Web à la recherche de fichiers spéciaux, le site Web peut déclarer directement ses connaissances lisibles par l'IA.

## 2. Les pages peuvent annoncer une version propre de Markdown.

`llms.txt` est utile comme index, mais les informations détaillées se trouvent généralement sur les pages qu'il renvoie.

Le problème est que les pages web normales contiennent beaucoup plus que leur contenu principal.

La navigation, les menus, les scripts, le style, les contrôles des cookies, la publicité, les composants interactifs et d'autres éléments d'interface ont tous un sens dans un navigateur. Ils ne sont pas nécessairement la meilleure représentation pour un système d'IA qui essaie de comprendre les informations sous-jacentes.

La version 2 formalise donc une autre relation de découverte :

```html
<link
  rel="alternate"
  type="text/markdown"
  href="/docs/example.md">
```

Cela indique au logiciel compatible que la page dispose d'une représentation Markdown disponible.

Un agent IA peut donc rencontrer une page web normale tout en découvrant une représentation plus propre et plus concise des mêmes informations.

Cela peut signifier moins d'extraction, moins de matériel peu pertinent et moins de jetons dépensés pour reconstruire du contenu que l'éditeur a déjà rendu disponible sous une forme adaptée aux machines.

![Un schéma côte à côte contraste entre l'essai de la localisation conventionnelle /llms.txt et une page déclarant explicitement son index décrit et sa représentation alternative Markdown.](/assets/blog/fr/llms-txt-v2-discovery.svg)

## 3. Les URL Markdown sont plus flexibles.

La proposition originale suggérait de produire des versions Markdown des pages en ajoutant `.md` à l'URL existante.

Par exemple :

```text
guide.html
guide.html.md
```

En pratique, certains systèmes d'édition remplacent plutôt l'extension originale :

```text
guide.html
guide.md
```

La version 2 reconnaît les deux approches.

Cela peut sembler être un changement de compatibilité mineur, mais il reflète un principe important derrière la proposition mise à jour : `llms.txt` s'adapte aux conventions que les développeurs et les systèmes d'édition utilisent déjà plutôt que de forcer chaque site à adopter une seule structure URL.

## 4. llms.txt peut décrire une partie d'un site Web.

Une autre clarification particulièrement utile est le **définissement de la portée du chemin**.

Un fichier `llms.txt` n'a pas besoin de décrire un domaine entier. Par exemple :

```text
/llms.txt
/docs/llms.txt
/api/llms.txt
```

Peut décrire différentes parties du même site.

Un fichier `llms.txt` s'applique aux pages situées en dessous de son propre chemin, et lorsque plus d'un index pourrait s'appliquer, celui qui est le plus spécifique prend la priorité.

Cela signifie :

```text
/docs/llms.txt
```

Peut décrire la section de documentation sans avoir besoin de représenter le reste du site Web.

Cela est utile pour les grandes organisations, les plateformes de documentation, les projets hébergés, les universités, les produits logiciels et tout site où différentes zones contiennent des collections distinctes de connaissances.

Cela rend également la découverte plus précise. Un agent d'IA qui lit la documentation API n'a pas nécessairement besoin des pages de marketing, des nouvelles de l'entreprise, de la section carrière et de tout le reste publié sur le même domaine.

Un `llms.txt` à portée peut le guider vers les connaissances qui sont réellement pertinentes.

![Un arbre de site montre une racine llms.txt pour le site plus large, ainsi que des fichiers llms.txt plus spécifiques à l'intérieur des chemins des documents et de l'API.](/assets/blog/fr/llms-txt-v2-path-scoping.svg)

## 5. On s'attend à ce que les agents récupèrent ce dont ils ont besoin.

La version 2 clarifie également une idée fausse importante sur `llms.txt`.

L'objectif n'est pas nécessairement de concaténer un site Web entier et de le nourrir dans un modèle d'IA.

Au lieu de cela, le fichier `llms.txt` agit comme une carte.

Un agent peut lire ou rechercher dans l'index relativement petit, déterminer quels ressources sont pertinentes pour la tâche actuelle, puis récupérer ces ressources selon les besoins.

Conceptuellement, le flux de travail devient :

```text
Question
   ↓
llms.txt
   ↓
Find relevant sources
   ↓
Retrieve only those sources
   ↓
Use them as context
```

Il s'agit d'un modèle beaucoup plus évolutif que de traiter chaque document disponible comme contexte pour chaque question.

Il ressemble également à la façon dont une bonne recherche fonctionne : commencez par une collection organisée, identifiez les sources pertinentes, puis examinez ces sources en détail.

## 6. "Optionnel" est une convention, pas une règle de traitement.

Les versions précédentes de la proposition donnaient à la section `## Optional` un rôle spécial lors de l'expansion d'une collection `llms.txt` dans le contexte du modèle.

La version 2 supprime cette signification mécanique.

Une section facultative peut toujours identifier le matériel secondaire que l'agent pourrait omettre lorsqu'une collection plus petite est préférable, mais les agents ne sont plus tenus de le traiter comme une instruction de traitement spéciale.

Cela rend le format plus simple.

L'index décrit et organise les connaissances. L'agent décide quelles connaissances sont pertinentes pour la tâche.

## llms.txt fait partie d'un réseau Web plus large lisible par l'IA.

Ces changements arrivent alors que le web commence à s'adapter plus délibérément aux agents IA.

Le travail expérimental de Chrome sur le navigateur agentique dans Lighthouse, par exemple, comprend désormais [Un audit de la découvrabilité de llms.txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt).

Cela ne fait pas de `llms.txt` une norme web universelle, ni la publication d'une norme ne garantit que tous les systèmes d'IA l'utiliseront.

Cela montre que le contenu lisible par l'IA va au-delà d'une expérience intéressante.

Les créateurs de sites Web envisagent de plus en plus non seulement la façon dont les informations apparaissent aux personnes et aux moteurs de recherche, mais aussi la façon dont les agents logiciels peuvent les découvrir et les comprendre de manière fiable.

`llms.txt` offre une approche délibérément simple à ce problème.

## SourceShelf 1.0.2 prend en charge llms.txt v2

SourceShelf traite `llms.txt` comme plus qu'un fichier à afficher.

La version 1.0.2 étend le flux de travail vers Safari, permettant à la collection `llms.txt` d'un site Web compatible de devenir le point de départ d'un Pack de recherche local. Le document [Guide SourceShelf llms.txt](/docs/guides/llms-txt/) décrit l'ordre complet de découverte, le flux de travail de sélection, les mesures de sécurité et la provenance que l'application préserve.

Lorsque SourceShelf découvre une collection disponible, vous pouvez prévisualiser ce que le site fournit, choisir les sources que vous souhaitez réellement et importer cette sélection dans SourceShelf.

![Safari affiche un site web de recherche synthétique, tandis que l'extension réelle SourceShelf prévisualise une collection llms.txt découverte pour l'importation.](/assets/blog/fr/llms-txt-v2-safari-discovery.webp)

C'est une distinction importante.

Un site Web peut exposer des dizaines - ou éventuellement des centaines - de ressources via `llms.txt`. Votre projet de recherche n'aura peut-être besoin que de cinq.

SourceShelf permet à l'index du site d'aider à la découverte sans nécessiter que toute la collection devienne partie de votre contexte de travail.

![L'examen de la collection SourceShelf utilise l'interface d'extension d'expédition avec douze ressources réalistes et seulement six sélectionnées pour l'importation.](/assets/blog/fr/llms-txt-v2-source-selection.webp)

## De la collection du site Web à l'étude locale du pack

Un flux de travail typique peut ressembler à ceci :

1. Visitez un site Web dans Safari.
2. Ouvrez l'extension SourceShelf.
3. Découvrez la collection `llms.txt` disponible sur le site.
4. Aperçois les ressources qu'il expose.
5. Sélectionnez les sources pertinentes pour votre recherche.
6. Importez-les dans un nouveau ou un pack SourceShelf existant.
7. Examinez et organisez la collection résultante localement.
8. Exportez ou partagez le pack en utilisant le format approprié à votre flux de travail IA.

Une fois importées, ces sources ne sont plus qu'une collection de onglets de navigateur.

Ils deviennent partie d'un projet de recherche organisé qui peut préserver l'ordre des sources, les métadonnées, la provenance, les actifs archivés et d'autres informations nécessaires pour déplacer la recherche entre les flux de travail.

![L'interface réelle de trois colonnes SourceShelf affiche un pack de recherche synthétique terminé avec des ressources llms.txt, d'autres documents et une provenance d'importation du site Web.](/assets/blog/fr/llms-txt-v2-sourceshelf-pack.webp)

## llms.txt et la recherche locale en premier lieu

Il y a une différence importante entre **découvrir** des informations et **propriéter votre collection de recherches**.

`llms.txt` aide avec le premier problème.

Cela donne aux éditeurs un moyen de décrire des connaissances utiles et aide les logiciels compatibles à les trouver.

SourceShelf aborde le deuxième.

Cela vous permet de choisir quelles sources sont importantes, de les conserver sous forme de pack de recherche, de les combiner avec vos propres PDF, documents, notes, scans et autres matériaux, puis de décider comment cette collection doit être utilisée.

Le site Web reste l'éditeur.

Le fichier `llms.txt` reste le guide.

Votre pack SourceShelf devient votre collection de recherche.

## Une collection, plusieurs flux de travail d'IA

Une importation `llms.txt` n'a pas à rester une collection `llms.txt` pour toujours.

Une fois les connaissances pertinentes organisées dans SourceShelf, le même pack peut participer à différents flux de travail.

Vous pouvez le conserver comme archive de recherche portable, exporter Markdown pour une autre application, créer un [Paquet de référence orienté IA](/local-ai-reference-packs/) ou exposer un pack sélectionné à un client IA compatible via l'intégration locale et en lecture seule de MCP de SourceShelf.

Cette séparation entre **la collecte de connaissances** et **le choix d'un outil d'IA** est intentionnelle.

La recherche utile ne devrait pas être liée de manière permanente à quel que soit le produit d'IA qui a eu l'occasion de l'aider à être collecté.

Markdown, la provenance, les paquets portables et les interfaces ouvertes offrent un moyen de maintenir la recherche utile même lorsque les outils d'IA évoluent.

## Ce que llms.txt v2 ne fait pas

Il est tout aussi important de comprendre ce que la proposition ne prétend pas résoudre.

`llms.txt` n'est pas une alternative à `robots.txt`.

Ce n'est pas un remplacement d'une carte du site.

Cela ne garantit pas qu'un fournisseur d'IA indexera un site Web.

Il ne donne pas à un système d'IA la permission d'accéder à du contenu autrement restreint.

Et cela ne rend pas automatiquement les informations fiables simplement parce qu'elles sont écrites en Markdown.

Son but est beaucoup plus restreint :

**aider un système d'IA à découvrir et naviguer plus délibérément dans les connaissances utiles des sites Web.**

Cette simplicité fait partie de ce qui rend le format intéressant.

## Un petit changement avec une implication plus importante

La partie la plus importante de `llms.txt` v2 ne peut pas être une simple modification de la syntaxe.

C'est le changement d'hypothèse derrière la proposition.

En 2024, la question était de savoir si les systèmes d'IA auraient peut-être besoin de sites Web présentés sous une forme plus utilisable régulièrement.

En 2026, les agents qui lisent des documents, consultent des sites Web, écrivent des logiciels, effectuent des recherches et répondent aux questions provenant de sources en ligne sont déjà normaux.

La question devient de plus en plus :

**Comment les sites Web devraient-ils rendre leurs connaissances accessibles à eux-mêmes ?**

La version 2 fournit une meilleure réponse que la version 1.

Un petit index Markdown peut décrire les connaissances importantes.

Les relations web standard peuvent rendre cet index découvrable.

Clean Markdown peut fournir des versions adaptées aux agents de pages individuelles.

La définition de la portée des chemins peut aider à organiser de grands sites.

Et les agents ne peuvent récupérer que les informations pertinentes pour la tâche en cours.

Avec SourceShelf 1.0.2, cette même structure peut également devenir le début d'un flux de travail de recherche privé et portable - en commençant sur le web et en continuant sur vos propres appareils.

Le web lisible par l'IA évolue encore.

Mais avec `llms.txt` v2, il devient beaucoup plus facile à trouver.
