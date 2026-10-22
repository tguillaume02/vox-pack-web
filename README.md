# Vox-Pack-Web

**Crée les fichiers de voix de ta radio EdgeTX à partir du web · EdgeTX voice file generator from web page**

👉 **[Ouvrir l'application](https://tguillaume02.github.io/vox-pack-web/)**

Vox-Pack-Web fabrique les annonces vocales que ta radiocommande EdgeTX prononce en vol — « Moteur armé », « Train sorti », « Chrono démarré »… — directement dans le navigateur, sans rien installer.

Tu écris tes phrases, tu choisis une voix, tu appuies sur **Let's Go** : tu récupères des fichiers WAV au format exact attendu par EdgeTX (**PCM 16 bits, 32 kHz, mono**), prêts à copier sur la carte SD, dans `SOUNDS/fr` (ou `SOUNDS/en`).

- **30 voix** (français et anglais), la ★ marque la voix officielle d'EdgeTX
- **44 annonces prêtes à l'emploi**, modifiables
- **Quatre voix de robot**
- **Sons SYSTEM officiels d'EdgeTX** régénérés avec la voix de ton choix
- **Import / export** de ta liste en CSV

Le premier accès après une pause peut prendre jusqu'à une minute : le serveur de synthèse se réveille, un bandeau l'indique en haut de la page.

## Confidentialité

Le texte des phrases est envoyé au serveur Vox-Pack-Web, qui le fait synthétiser par le service vocal en ligne de Microsoft Edge.

## Crédits

Portage web **non officiel** par [tguillaume02](https://github.com/tguillaume02), basé sur **[ritchy-lab/Vox-Pack](https://github.com/ritchy-lab/Vox-Pack)** (MIT). Il n'est ni édité ni maintenu par ritchy-lab. Outil indépendant, ni édité ni approuvé par l'équipe EdgeTX.

Ce dépôt contient uniquement l'interface publiée ; il est mis à jour automatiquement.

Licence MIT — voir [LICENSE](LICENSE).

---

☕ Ce projet vous est utile ? Vous pouvez me soutenir sur [Ko-fi](https://ko-fi.com/thibaultguillaume).

🔗 Mes autres projets : [tguillaume02.github.io](https://tguillaume02.github.io/)
