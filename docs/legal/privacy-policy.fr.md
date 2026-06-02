# Politique de confidentialité — Dartrak

**Dernière mise à jour : 2 juin 2026**

Dartrak (« l'application », « nous ») est une application de comptage de scores de
fléchettes. Cette politique explique quelles données l'application manipule, où elles
sont stockées, et quels sont vos droits sur celles-ci.

Notre principe directeur est le **local-first, la confidentialité par défaut** : Dartrak
fonctionne à 100 % hors ligne et conserve tout sur votre appareil. Rien ne quitte votre
téléphone, sauf si vous choisissez *explicitement* de vous connecter et d'activer la
synchronisation cloud.

Nous **n'utilisons aucun** service d'analyse d'audience, de télémétrie, de pistage, de
publicité ni de rapport de plantage. Nous ne vendons, ne louons et ne partageons pas vos
données avec des tiers à des fins marketing.

---

## 1. Ce qui fonctionne sans compte ni réseau

Par défaut — et pour toujours, si vous le souhaitez — Dartrak fonctionne entièrement sur
votre appareil :

- Les **données de jeu** (joueurs, scores, historique des parties, statistiques) sont
  stockées localement dans une base de données SQLite sur l'appareil.
- Les **réglages de l'application** (langue, préférences d'affichage, activation des
  notifications) sont stockés localement.
- Aucune connexion Internet n'est requise et **aucune donnée n'est transmise** où que ce
  soit.

Dans ce mode par défaut, **nous ne collectons rien**, car aucune donnée ne nous parvient.

---

## 2. Microphone & saisie vocale du score (optionnel, sur l'appareil)

Dartrak propose une **saisie vocale du score** optionnelle. Lorsque vous l'activez,
l'application utilise le microphone et la reconnaissance vocale de votre appareil pour
transcrire les scores dictés (par exemple « triple vingt »).

- La reconnaissance s'effectue **sur votre appareil**. Votre voix n'est **pas**
  enregistrée, ni stockée, ni envoyée par l'application à nous ou à un serveur tiers.
- Le microphone n'est sollicité **que** pendant que vous utilisez activement la saisie
  vocale.
- Vous pouvez refuser ou révoquer l'autorisation du microphone à tout moment dans les
  réglages de votre appareil ; le reste de l'application continue de fonctionner
  normalement.

Remarque : la reconnaissance vocale sur l'appareil est fournie par votre système
d'exploitation (Android / iOS). Le comportement de reconnaissance vocale propre au
fabricant de votre appareil est régi par sa propre politique de confidentialité.

---

## 3. Notifications locales (optionnel, sur l'appareil)

Si vous activez les rappels dans les Réglages, Dartrak programme des **notifications
locales, sur l'appareil** (un rappel quotidien de série et un rappel occasionnel de
sauvegarde de vos statistiques).

- Ces notifications sont programmées entièrement sur votre appareil. Il n'y a **aucun
  jeton push, aucune programmation distante et aucune activité réseau**.
- L'autorisation de notification est demandée **uniquement** lorsque vous activez
  explicitement la fonctionnalité — jamais au premier lancement.
- Vous pouvez désactiver les rappels à tout moment dans les Réglages ou dans les réglages
  de votre appareil.

---

## 4. Comptes & synchronisation cloud (sur opt-in uniquement)

Dartrak vous permet, en option, de vous connecter avec **Google** pour sauvegarder vos
parties et entrer en relation avec des amis. C'est entièrement **sur opt-in** : la couche
cloud reste inerte tant que vous ne vous connectez pas, et la déconnexion vous ramène à
un fonctionnement entièrement local.

Si — et seulement si — vous vous connectez, les données suivantes sont traitées par notre
hébergeur cloud :

- **Identité de compte** : l'identifiant et l'adresse e-mail fournis par la connexion
  Google, utilisés uniquement pour créer et sécuriser votre compte.
- **Vos données de jeu** : les parties et statistiques que vous choisissez de
  synchroniser, afin de pouvoir les restaurer sur un autre appareil.
- **Données d'amis** : les relations d'amitié et les demandes d'ami que vous créez, pour
  que la fonctionnalité d'amis fonctionne.

Vos données synchronisées sont **isolées par utilisateur** et protégées par une sécurité
au niveau des lignes (RLS) : aucun autre utilisateur ne peut lire ou modifier vos
données.

Les jetons d'authentification sont stockés de manière sécurisée sur votre appareil via le
stockage sécurisé du système d'exploitation (Keychain sur iOS, Keystore sur Android).

### Sous-traitant cloud

Lorsque vous activez la synchronisation, les données sont stockées et traitées par
**Supabase**, notre sous-traitant d'hébergement et de base de données, agissant pour
notre compte dans le cadre de conditions de protection des données appropriées.

---

## 5. Données que vous exportez ou partagez

Dartrak vous permet d'exporter ou de partager vos propres statistiques (par exemple sous
forme d'image ou de fichier) via la feuille de partage standard de votre appareil. La
destination de ces données relève entièrement de votre choix et de votre contrôle.

---

## 6. Vos droits (RGPD)

Dartrak est conçu pour être conforme au RGPD.

- **Données locales** : vous les contrôlez directement. Supprimer l'application ou effacer
  ses données supprime toutes les informations stockées localement sur votre appareil.
- **Données synchronisées** (uniquement si vous vous êtes connecté) : vous disposez d'un
  droit d'accès, de rectification, de portabilité et d'effacement de vos données. Vous
  pouvez supprimer vos données synchronisées en supprimant votre compte, après quoi elles
  sont retirées de notre stockage cloud.
- **Base légale** : lorsque nous traitons des données synchronisées, la base est votre
  consentement (le fait de vous connecter et d'activer la synchronisation), que vous
  pouvez retirer à tout moment en vous déconnectant et en demandant la suppression.

Pour exercer un droit, contactez-nous à l'adresse ci-dessous.

---

## 7. Confidentialité des mineurs

Dartrak ne collecte pas sciemment de données personnelles concernant des enfants.
L'application ne contient aucune publicité, aucun achat intégré et aucun pistage
comportemental.

---

## 8. Conservation des données

- Les **données locales** restent sur votre appareil jusqu'à ce que vous les supprimiez
  (ou désinstalliez l'application).
- Les **données synchronisées** sont conservées tant que votre compte existe, et sont
  supprimées lorsque vous supprimez votre compte.

---

## 9. Modifications de cette politique

Nous pouvons mettre à jour cette politique à mesure que l'application évolue. Les
modifications importantes seront signalées par une mise à jour de la date de « Dernière
mise à jour ». La poursuite de l'utilisation après une mise à jour vaut acceptation de la
politique révisée.

---

## 10. Contact

Pour toute question relative à la confidentialité ou pour exercer vos droits :

**E-mail :** simon.farail@smile.fr

---

*Dartrak ne contient aucune publicité, aucun achat intégré et aucun pistage. Elle est
gratuite et local-first par conception.*
