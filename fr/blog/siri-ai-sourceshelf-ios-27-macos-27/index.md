# Siri AI rencontre SourceShelf dans iOS 27 et macOS 27

iOS 27 et macOS 27 apportent deux changements importants pour les utilisateurs de SourceShelf : un modèle plus performant dans **Ask This Pack**, et une architecture système plus riche pour retrouver des recherches grâce à **Siri AI**.

Dans nos tests macOS 27, Ask This Pack a produit des réponses plus complètes, suivi les instructions plus attentivement et géré les citations plus efficacement avec le même code de récupération SourceShelf et les mêmes invites.

Au niveau du système, la nouvelle architecture Siri AI d’Apple permet aux applications de rendre leur contenu accessible via Spotlight et App Intents. Pour SourceShelf, cela ouvre une voie entre les recherches que vous organisez et leur découverte à l’échelle du système.

Ce sont des capacités complémentaires. **Ask This Pack se concentre sur un Pack que vous choisissez. Siri AI peut découvrir le contenu des applications mis à disposition dans l'index système d'Apple.** Le flux de travail Siri décrit ici est une opportunité d'intégration, plutôt qu'une affirmation selon laquelle chaque SourceShelf Pack est déjà disponible pour Siri.

## Ask This Pack bénéficie d’un meilleur modèle

La fonctionnalité Ask This Pack de SourceShelf sépare la récupération de la génération.

Lorsque vous posez une question, SourceShelf recherche des sources dans le pack sélectionné, constitue un ensemble limité d’éléments pertinents et demande au modèle Foundation d’Apple, exécuté sur l’appareil, de répondre à partir de ces éléments. Le modèle n’a pas besoin de connaître vos recherches à l’avance : SourceShelf lui fournit les sources nécessaires.

Cette architecture permet à SourceShelf de bénéficier des améliorations du modèle système d’Apple sans remplacer son moteur de recherche ni transférer vos recherches vers un autre service d’IA.

Les [mises à jour de Foundation Models](https://developer.apple.com/documentation/updates/foundationmodels) confirment qu’iOS 27, iPadOS 27, macOS 27 et visionOS 27 intègrent un `SystemLanguageModel` sur l’appareil plus performant pour suivre les instructions et traiter les situations complexes. Apple conseille aux développeurs de retester leurs prompts après la mise à niveau du système, car le modèle sous-jacent change.

Nous l'avons fait.

## La même version SourceShelf, de meilleures réponses

Nous avons relancé notre test de référence **Japan Adventure** Ask This Pack à dix questions sur macOS 27. Le code d'application SourceShelf, le paquet, les questions, l'architecture de récupération et les invites n'ont pas été modifiés. La mise à niveau du système d'exploitation a apporté le modèle Foundation mis à jour d'Apple, ainsi que d'autres modifications du système.

L’exécution a satisfait **les 10 contrôles de recherche, d’appui sur les sources et de citations**. Ce taux de réussite concerne ce test précis ; il ne signifie pas que chaque réponse était exhaustive ou sans erreur.

Les neuf questions auxquelles le pack permettait de répondre ont donné des réponses accompagnées de citations valides. Pour la question sur Hokkaido, volontairement sans réponse dans les sources, SourceShelf s’est correctement abstenu dès la recherche, sans appeler le modèle d’Apple.

Plusieurs réponses auparavant difficiles se sont nettement améliorées :

- L’itinéraire comprenait les dix jours.
- La réponse sur Hakone conservait toutes les étapes du trajet et les deux options prévues selon la météo.
- Les recommandations de temples précisaient les priorités et les moments de visite.
- Les réponses sur l’hébergement, le train, le budget, les repas et les sources contradictoires étaient exactes et utiles.

Il y avait encore des omissions. Une liste de vérification exhaustive des réservations a omis un élément de mesure des bagages et a répété un élément de note diététique. Une réponse alimentaire a négligé une recommandation facultative du jour 6. Les citations et l'examen des sources restent utiles même lorsque la réponse globale est bonne.

### Performances sur macOS 27

| Métrique | Résultat macOS 27 |
| --- | ---: |
| Récupération moyenne | 0,506 s |
| Délai moyen avant le premier texte | 1,127 s |
| Durée médiane de génération | 5,541 s |
| Durée moyenne de génération | 7,565 s |

Les réponses aux deux questions les plus exhaustives, sur l’itinéraire complet et la liste des réservations, ont chacune demandé environ 15 secondes de génération. Ce temps supplémentaire a produit des réponses nettement plus complètes.

Il s'agit des résultats de test internes de SourceShelf. Il ne s'agit pas d'une comparaison contrôlée entre macOS 26 et macOS 27 : nous ne pouvons plus redémarrer le système d'exploitation précédent sur la même machine, et une mise à niveau du système d'exploitation peut modifier plus que le modèle. Les résultats sont cohérents avec les améliorations de modèle documentées par Apple, mais ne distinguent pas leur contribution de chaque autre changement de système.

L'observation pratique reste utile : **le même pipeline de preuves SourceShelf a produit des réponses nettement meilleures sur macOS 27.** Vous pouvez voir le flux de travail de recherche sous-jacent dans notre [Exemple de planification d'un voyage au Japon](/fr/examples/japan-trip-ai-planner/).

## La recherche hybride reste importante

L'un des résultats met en évidence pourquoi SourceShelf combine la recherche sémantique et lexicale.

Pour une question concernant des informations contradictoires, Core Spotlight a rejeté la branche de recherche sémantique comme peu sûre. Le chemin lexical de SourceShelf a néanmoins trouvé les preuves correctes, et la réponse finale est restée exacte.

La recherche sémantique trouve des idées connexes même lorsque le libellé diffère. La recherche lexicale aide avec les noms exacts, les dates, les expressions et les identifiants, et fournit une autre voie lorsque la recherche sémantique échoue. Dans cette exécution, le maintien des deux chemins a empêché une recherche rejetée de devenir une réponse infructueuse.

La session WWDC26 d'Apple, [Recherche de LLM en utilisant Core Spotlight](https://developer.apple.com/videos/play/wwdc2026/246/), démontre la connexion de contenu indexé au framework Foundation Models par appel d'outils. Elle explique également comment les métadonnées et la conception de la récupération affectent la qualité des réponses ancrées.

Un modèle plus fort aide à obtenir la réponse finale. La récupération détermine toujours les preuves qu'il reçoit.

## Siri AI change ce que signifie Spotlight

Le deuxième changement se produit en dehors d’Ask This Pack.

La [présentation de Siri AI](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) d’Apple décrit un assistant repensé qui combine des modèles de langage, le contexte personnel, la compréhension du contenu à l’écran et des fonctions système comme Spotlight et App Toolbox. Le contexte personnel peut inclure les applications tierces lorsque leurs développeurs les intègrent à Spotlight.

Les applications peuvent représenter leur contenu sous la forme d'**Entités d'application** et l’ajouter à l'index sémantique de Spotlight. Apple Intelligence peut ensuite trouver ce contenu lorsque quelqu'un décrit ce dont il a besoin, même lorsque le libellé ne correspond pas exactement au titre. Apple documente cela dans [Apple Intelligence et Siri AI](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai) et [Mettre les entités d'application à disposition dans Spotlight](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight).

Cela crée un lien naturel avec les collections de recherche structurées de SourceShelf.

## Du paquet au contexte personnel de Siri

SourceShelf transforme les PDF, pages web, documents numérisés, notes, présentations, feuilles de calcul et autres recherches en packs ciblés. Un pack peut aussi être exporté en **bundle Open Knowledge Format (OKF) v0.2**, avec des documents Markdown lisibles et des informations structurées sur les sources.

Notre [guide d’Open Knowledge Format](/fr/blog/what-is-open-knowledge-format-okf/) explique comment Markdown, les métadonnées, la provenance et un index rendent ces connaissances portables. La [spécification OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) décrit le format lui-même.

L'architecture d'Apple offre une autre utilisation possible de ces mêmes connaissances organisées.

![Un ensemble SourceShelf se décline en Ask This Pack pour obtenir des réponses locales, un ensemble OKF pour l'exportation portable et une intégration potentielle de l'IA Siri via les entités d'application et Spotlight. La branche Siri nécessite une intégration d'application.](/assets/blog/fr/siri-ai-knowledge-paths.svg)

Le diagramme montre un chemin d'intégration conceptuelle. **Siri n'a pas besoin de devenir un parseur OKF, et l'exportation d'un ZIP ne l'ajoute pas automatiquement au contexte personnel de Siri.**

Au lieu de cela, SourceShelf peut utiliser sa connaissance du Pack et de sa structure compatible avec OKF pour représenter du contenu utile sous forme d'Entités d'application. Grâce à l'intégration appropriée de Spotlight et d’App Intents, ces entités peuvent devenir découvrables par le système. Une exportation de OKF et un index Spotlight sont des sorties distinctes de la collection sous-jacente ; exporter un fichier OKF n'est pas une condition préalable à l'indexation du contenu d'application.

Le [Guide iOS WWDC26](https://developer.apple.com/wwdc26/guides/ios/) d'Apple explique que les schémas d’entités ajoutent le contenu de l’application à l'index sémantique, où Siri peut le présenter avec une attribution à l'application d'origine.

**Les connaissances restent portables. L'index est une autre façon de les utiliser.**

## Des réponses ciblées et une découverte à l'échelle du système

Ask This Pack et Siri AI répondent à des besoins différents.

Avec **Ask This Pack**, vous choisissez la collection. SourceShelf récupère des preuves de cette collection et renvoie des réponses fondées avec des citations. Lorsque la collection ne dispose pas de preuves suffisantes, SourceShelf peut s'abstenir plutôt que d'élargir la recherche à des informations non liées.

Par exemple :

> Que dit mon Pack Japon sur ce que je dois réserver avant d'arriver à Hakone ?

Avec **Siri AI**, le contenu SourceShelf correctement indexé pourrait être trouvé à partir d'une demande au niveau du système, sans ouvrir au préalable un Pack ou se souvenir du titre exact du document.

La distinction est entre le raisonnement ciblé et la découverte à l'échelle du système. Un Pack reste la collection que vous organisez ; Siri offre une possibilité de trouver le contenu mis à sa disposition.

## D'abord local, avec des limites de confidentialité précises

Ask This Pack utilise le modèle de base sur appareil d’Apple sur les appareils pris en charge. SourceShelf récupère les preuves localement et n’envoie pas de Pack à un serveur SourceShelf.

Spotlight est également une fonction système exécutée sur l’appareil. Apple décrit l'orchestrateur système de Siri AI utilisant Spotlight et l'App Toolbox localement, tandis que le traitement du modèle linguistique de Siri peut s'exécuter sur l'appareil ou via Private Cloud Compute. Ces limites d'exécution diffèrent du fonctionnement sur l’appareil d’Ask This Pack. Consultez l’[annonce de l'architecture Siri AI](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) d'Apple pour cette distinction.

Rendre le contenu accessible pour Siri ne devrait donc pas être décrit comme une garantie que chaque demande Siri reste sur l'appareil. Cela ne nécessite pas non plus de transformer SourceShelf en un service de connaissances cloud : la Bibliothèque, le Markdown converti, la structure du paquet, les exportations et le pipeline de récupération de SourceShelf restent sous le contrôle de l'utilisateur.

## Pourquoi la connaissance ouverte devient plus précieuse

L'IA dans les systèmes d'exploitation évolue rapidement. Cela rend les connaissances portables plus utiles.

Un pack SourceShelf compatible avec OKF conserve des documents Markdown lisibles, les métadonnées, la provenance, les relations entre sources et un index de la collection. SourceShelf peut l’utiliser avec Ask This Pack, l’exporter vers un autre outil compatible ou s’appuyer sur son contenu structuré pour une intégration système.

La partie durable est la recherche que vous avez collectée et organisée. Un nouveau modèle devrait améliorer la façon dont vous utilisez ces connaissances sans vous obliger à les reconstruire.

Le modèle de base d'Apple peut changer. Siri peut changer. Votre recherche n'a pas besoin de changer.

## Disponibilité et ce à quoi s'attendre

L’[annonce de septembre](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/) d'Apple indique que Siri AI commence à être déployé avec iOS 27 **en version bêta le 14 septembre 2026**, pour les appareils compatibles configurés en anglais. Pour les fonctionnalités et la compatibilité de macOS 27, consultez l’[aperçu de macOS](https://www.apple.com/os/macos/) d'Apple.

Apple Intelligence nécessite du matériel compatible, y compris les Mac Apple silicon et les iPhones éligibles tels que les modèles iPhone 15 Pro et les modèles ultérieurs compatibles. La disponibilité des fonctionnalités varie selon l'appareil, la langue et la région ; consultez les [informations sur la disponibilité d’Apple Intelligence](https://www.apple.com/apple-intelligence/) d'Apple pour votre appareil.

Pour Ask This Pack, la mise à niveau d'un appareil compatible avec Apple Intelligence activé donne accès au modèle de système mis à jour sur l'appareil. Nos résultats de référence ici proviennent de macOS 27 ; il ne s'agit pas de mesures iPhone distinctes ni d'une garantie de performances identiques sur chaque appareil.

Le chemin de découverte de Siri dépend également de SourceShelf qui expose du contenu approprié via les API d'intégration d'Apple. La mise à niveau du système d'exploitation ne rend pas à elle seule chaque Pack disponible pour Siri.

## Un paquet, plusieurs façons de l'utiliser

SourceShelf a commencé avec une idée simple : la recherche devrait rester utile après que vous l'ayez sauvegardée.

Vous pouvez lire un pack ciblé, l’interroger en privé avec Ask This Pack, l’exporter en bundle OKF ouvert ou le parcourir avec un autre outil compatible. L’architecture d’indexation sémantique de Siri AI ouvre une voie supplémentaire pour retrouver du contenu sélectionné dans les applications.

La couche d'IA peut continuer à s'améliorer tandis que la collection sous-jacente reste ouverte, structurée, locale et réutilisable.

## Sources officielles

- [Mises à jour des modèles de fondation - Développeurs Apple](https://developer.apple.com/documentation/updates/foundationmodels): le modèle sur l’appareil mis à jour et les conseils pour retester les prompts.
- [Apple présente Siri AI - Apple Newsroom](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/): contexte personnel, architecture du système et limites de la vie privée.
- [Apple Intelligence et Siri AI — Développeur Apple](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai): comment le contenu et les actions de l'application se connectent à Apple Intelligence.
- [Mise à disposition des entités d’application dans Spotlight — développeur Apple](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight): indexation des entités pour la découverte du système.
- [Recherche de LLM en utilisant Core Spotlight — WWDC26](https://developer.apple.com/videos/play/wwdc2026/246/): récupération, appel d'outils et qualité des métadonnées.
- [Guide iOS WWDC26 - Développeur Apple](https://developer.apple.com/wwdc26/guides/ios/): schémas d'entités et attribution à l'application d'origine.
- [Annonce de l'iPhone de septembre - Apple Newsroom](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/): Lancement de la version bêta de Siri AI le 14 septembre.
