// ============================================================
// Vox-Pack Web — interface
// © 2026 ritchy-lab — licence MIT
// ============================================================
"use strict";

const API = (window.VOXPACK_API || "").replace(/\/+$/, "");
const LIMITE_NOM = 8;
const AUTORISES = /^[A-Za-z0-9_-]+$/;
const ACCENTS = /[éèêëàâäîïôöùûüçÉÈÊËÀÂÄÎÏÔÖÙÛÜÇ]/;
const SIMULTANES = 3;          // synthèses en parallèle pendant la génération
const NB_LEDS = 32;

// ------------------------------------------------------------------
// Textes
// ------------------------------------------------------------------
const TEXTES = {
  fr: {
    ajouter: "Ajouter", supprimer: "Supprimer", ecouter: "Écouter", arreter: "■  Arrêter",
    tout: "Tout", rien: "Rien", lets_go: "Let's Go",
    colonne_nom: "Nom du fichier WAV (Max {max} car. EdgeTX, 6 OpenTX)",
    colonne_phrase: "Phrase à prononcer par la radiocommande",
    genre_f: "Femme", genre_h: "Homme", genre_e: "Enfant",
    accent_france: "France", accent_suisse: "Suisse", accent_belgique: "Belgique",
    accent_quebec: "Québec", accent_usa: "USA", accent_uk: "Royaume-Uni",
    accent_irlande: "Irlande", accent_allemagne: "Allemagne", accent_italie: "Italie", voix_multilingue: "Multilingue",
    voix_normale: "Voix normale",
    niveau_m6: "🔉 Volume bas", niveau_0: "🔊 Volume normal",
    niveau_6: "🔊 Volume fort",
    niveau_manuel: "🎚️ Volume manuel…", niveau_curseur: "Volume",
    menu_exporter: "Exporter la liste…", menu_importer: "Importer une liste…",
    menu_defaut: "Charger la liste par défaut", menu_sons_systeme: "Créer les sons système…",
    menu_langue: "Langue",
    kofi: "☕ M'offrir un café", sponsor: "💖 Me sponsoriser", projets: "🔗 Mes autres projets", pub: "Publicité",
    compteurs: "{fichiers} fichiers téléchargés · {utilisateurs} utilisateurs",
    fork: "Fork de Vox-Pack par ritchy-lab",
    sous_titre_par: "Portage web non officiel par", sous_titre_base: ", basé sur",
    pb_vide: "nom vide", pb_long: "{n} caractères (max {max})", pb_espace: "pas d'espace",
    pb_accent: "pas d'accent", pb_caractere: "caractère « {c} » interdit",
    pb_doublon: "déjà utilisé (ligne {n})",
    nouvelle_ligne: "nouveau", texte_a_dire: "Texte à prononcer",
    err_refus: "service refusé (voix indisponible ou serveur à mettre à jour)",
    err_voix_absente: "voix supprimée par le service : choisissez-en une autre",
    err_lent: "le service n'a pas répondu à temps",
    err_illisible: "réponse illisible du service, réessayez dans un instant",
    err_reseau: "serveur injoignable (connexion Internet ?)",
    err_quota: "trop de demandes depuis cette connexion, réessayez dans une heure",
    err_texte: "phrase vide ou trop longue",
    err_autre: "erreur du serveur",
    srv_demarre: "Le serveur démarre… cela peut prendre jusqu'à une minute ({s} s)",
    srv_long: "Le serveur met plus de temps que prévu ({s} s). Nouvel essai en cours…",
    srv_pret: "Serveur prêt ✓",
    etat_pret: "Prêt — {n} voix disponibles",
    etat_ecoute: "Écoute {rang}/{total} — {nom}",
    etat_genere: "Génération ({fait}/{total}) — {nom}…",
    etat_csv: "Téléchargement de la liste officielle EdgeTX…",
    etat_zip: "Préparation du fichier zip…",
    etat_arret: "Arrêt demandé — fin des fichiers en cours…",
    msg_rien_coche: "Coche au moins une ligne.",
    msg_aucune_valide: "Aucune ligne cochée n'a un nom valide et une phrase.",
    msg_supprimer: "Supprimer {n} ligne{s} ?",
    oui: "Oui", non: "Non", annuler: "Annuler", fermer: "Fermer", arreter_court: "Arrêter",
    msg_star: "L'outil te plaît ? Laisse une ⭐ au projet <a href=\"https://github.com/tguillaume02/vox-pack-web\" target=\"_blank\" rel=\"noopener\">sur GitHub</a> (compte GitHub requis).",
    msg_succes: "Vos voix sont prêtes !\n\n{n} fichier{s} WAV (16 bits, 32 kHz, mono).\nCopie le dossier « {dossier} » sur la carte SD, dans SOUNDS/{langue}.",
    msg_bilan: "{ok} fichier{s1} créé{s1} sur {total}.\n\n{pb} problème{s2} :\n{detail}",
    msg_autres: "… et {n} autre(s)",
    btn_zip: "Télécharger le zip", btn_dossier: "Enregistrer dans un dossier…",
    msg_dossier_ok: "Fichiers écrits dans le dossier « {dossier} ».",
    msg_dossier_echec: "Impossible d'écrire dans ce dossier.\n\n{err}",
    msg_import_vide: "Ce fichier ne contient aucune ligne.",
    msg_import_confirmer: "Remplacer les {avant} ligne{s1} actuelle{s1} par les {apres} ligne{s2} du fichier ?",
    msg_import_ok: "{n} ligne{s} importée{s}.",
    msg_defaut: "Remplacer ta liste par la liste par défaut ({n} phrases en {langue}) ?",
    adjectif_fr: "français", adjectif_en: "anglais", adjectif_de: "allemand", adjectif_it: "italien",
    nom_export: "ma-liste-vox-pack.csv", entete_nom: "nom", entete_phrase: "phrase",
    msg_systeme: "Créer les {n} sons SYSTEM officiels d'EdgeTX avec la voix « {voix} »{robot} ?\n\nLa liste vient du dépôt officiel EdgeTX. Compte quelques minutes. Ta liste n'est pas touchée.",
    msg_systeme_robot: " ({robot})",
    btn_creer: "Créer",
    msg_systeme_ok: "Les {n} sons système sont prêts.\nCopie le dossier SYSTEM dans SOUNDS/{langue} sur la carte SD (remplace l'ancien).",
    msg_csv_echec: "Impossible de récupérer la liste officielle EdgeTX.\n\n{err}",
    msg_occupe: "Une génération est déjà en cours.",
    aide: `<h2>Vox-Pack-Web</h2><p>Fait parler ta radiocommande EdgeTX : « Moteur armé », « Train sorti »…</p>
<p>Fork de <a href="https://github.com/ritchy-lab/Vox-Pack" target="_blank" rel="noopener">Vox-Pack</a> de ritchy-lab, adapté pour le navigateur.</p>
<h3>1. Choisis une voix</h3><p>La ★ marque la voix officielle d'EdgeTX.</p>
<h3>2. Écris tes phrases</h3><p>À gauche le nom du fichier : 8 caractères au maximum pour EdgeTX, 6 pour OpenTX, sans accent ni espace (lettres, chiffres, - et _).</p>
<p>Pour laisser un silence, tape un « &gt; » ou plus dans la phrase : chaque « &gt; » vaut une demi-seconde. « Moteur armé &gt;&gt; Moteur coupé » laisse une seconde entre les deux, et « &gt;&gt;&gt; Moteur armé » retarde l'annonce d'une seconde et demie. Dix secondes au maximum.</p>
<h3>3. Coche les lignes</h3><p>Clique une case, puis Majuscule + clic sur une autre pour cocher toute la plage. « Tout » et « Rien » cochent ou décochent tout.</p>
<h3>4. Écouter, puis Let's Go</h3><p>« Écouter » lit les lignes cochées. « Let's Go » fabrique les WAV (16 bits, 32 kHz, mono) et te les donne dans un zip — ou, sur Chrome et Edge, directement dans un dossier (même la carte SD). Copie-les dans SOUNDS/fr (ou SOUNDS/en, SOUNDS/de, SOUNDS/it).</p>
<h3>Voix de robot</h3><p>Les quatre pastilles transforment la voix : Robot 1 à 3 et HAL 9000. HAL 9000 impose sa propre voix (Henri, Christopher, Conrad ou Diego selon la langue), indépendamment du menu — une voix librement inspirée du film, pas la voix officielle. Reclique la pastille allumée pour revenir à la normale.</p>
<h3>Volume</h3><p>Le menu à côté de la voix règle le volume des fichiers. « Fort » compresse la voix pour qu'elle porte mieux sur le petit haut-parleur de la radio. « Volume manuel » affiche un curseur de −20 à +6 dB : au-delà, la voix perdrait en qualité. Pour un son nettement plus fort, monte le volume sur la radio (Radio Setup → Sound).</p>
<h3>Menu ☰</h3><p>Exporter / importer ta liste (CSV « nom,phrase » ou CSV officiel EdgeTX), recharger la liste par défaut, créer les sons SYSTEM officiels, changer de langue. Chaque langue garde sa propre liste, enregistrée dans ce navigateur.</p>
<h3>Confidentialité</h3><p>Les phrases sont envoyées au serveur Vox-Pack-Web, qui les fait synthétiser par le service vocal de Microsoft Edge.</p>
<p>Vox-Pack-Web est un outil indépendant, ni édité ni approuvé par l'équipe EdgeTX. <a href="https://ko-fi.com/thibaultguillaume" target="_blank" rel="noopener">M'offrir un café ☕</a> · <a href="https://github.com/sponsors/tguillaume02" target="_blank" rel="noopener">GitHub Sponsors 💖</a> · <a href="https://tguillaume02.github.io/" target="_blank" rel="noopener">Mes autres projets</a></p>
<p>L'outil te plaît ? Laisse une ⭐ au projet <a href="https://github.com/tguillaume02/vox-pack-web" target="_blank" rel="noopener">sur GitHub</a> (bouton « Star » en haut de la page, compte GitHub requis).</p>`,
  },
  en: {
    ajouter: "Add", supprimer: "Delete", ecouter: "Listen", arreter: "■  Stop",
    tout: "All", rien: "None", lets_go: "Let's Go",
    colonne_nom: "WAV file name (Max {max} char. EdgeTX, 6 OpenTX)",
    colonne_phrase: "Phrase spoken by the radio",
    genre_f: "Female", genre_h: "Male", genre_e: "Child",
    accent_france: "France", accent_suisse: "Switzerland", accent_belgique: "Belgium",
    accent_quebec: "Quebec", accent_usa: "USA", accent_uk: "United Kingdom",
    accent_irlande: "Ireland", accent_allemagne: "Germany", accent_italie: "Italy", voix_multilingue: "Multilingual",
    voix_normale: "Normal voice",
    niveau_m6: "🔉 Low volume", niveau_0: "🔊 Normal volume",
    niveau_6: "🔊 Loud",
    niveau_manuel: "🎚️ Manual volume…", niveau_curseur: "Volume",
    menu_exporter: "Export list…", menu_importer: "Import list…",
    menu_defaut: "Load default list", menu_sons_systeme: "Create system sounds…",
    menu_langue: "Language",
    kofi: "☕ Buy me a coffee", sponsor: "💖 Sponsor me", projets: "🔗 My other projects", pub: "Advertisement",
    compteurs: "{fichiers} files downloaded · {utilisateurs} users",
    fork: "Fork of Vox-Pack by ritchy-lab",
    sous_titre_par: "Unofficial web port by", sous_titre_base: ", based on",
    pb_vide: "empty name", pb_long: "{n} characters (max {max})", pb_espace: "no spaces allowed",
    pb_accent: "no accents allowed", pb_caractere: "character \"{c}\" not allowed",
    pb_doublon: "already used (line {n})",
    nouvelle_ligne: "new", texte_a_dire: "Text to speak",
    err_refus: "service refused (voice unavailable, or server needs an update)",
    err_voix_absente: "voice removed by the service: pick another one",
    err_lent: "the service did not answer in time",
    err_illisible: "unreadable answer from the service, try again shortly",
    err_reseau: "server unreachable (Internet connection?)",
    err_quota: "too many requests from this connection, try again in an hour",
    err_texte: "empty or too long phrase",
    err_autre: "server error",
    srv_demarre: "The server is starting… this can take up to a minute ({s} s)",
    srv_long: "The server is taking longer than usual ({s} s). Still trying…",
    srv_pret: "Server ready ✓",
    etat_pret: "Ready — {n} voices available",
    etat_ecoute: "Listening {rang}/{total} — {nom}",
    etat_genere: "Generating ({fait}/{total}) — {nom}…",
    etat_csv: "Downloading the official EdgeTX list…",
    etat_zip: "Building the zip file…",
    etat_arret: "Stop requested — finishing current files…",
    msg_rien_coche: "Tick at least one line.",
    msg_aucune_valide: "No ticked line has a valid name and a phrase.",
    msg_supprimer: "Delete {n} line{s}?",
    oui: "Yes", non: "No", annuler: "Cancel", fermer: "Close", arreter_court: "Stop",
    msg_star: "Enjoying the tool? Give the project a ⭐ <a href=\"https://github.com/tguillaume02/vox-pack-web\" target=\"_blank\" rel=\"noopener\">on GitHub</a> (GitHub account required).",
    msg_succes: "Your voices are ready!\n\n{n} WAV file{s} (16-bit, 32 kHz, mono).\nCopy the \"{dossier}\" folder to the SD card, into SOUNDS/{langue}.",
    msg_bilan: "{ok} file{s1} created out of {total}.\n\n{pb} problem{s2}:\n{detail}",
    msg_autres: "… and {n} more",
    btn_zip: "Download zip", btn_dossier: "Save to a folder…",
    msg_dossier_ok: "Files written to the \"{dossier}\" folder.",
    msg_dossier_echec: "Could not write to this folder.\n\n{err}",
    msg_import_vide: "This file contains no lines.",
    msg_import_confirmer: "Replace the current {avant} line{s1} with the {apres} line{s2} from the file?",
    msg_import_ok: "{n} line{s} imported.",
    msg_defaut: "Replace your list with the default list ({n} {langue} phrases)?",
    adjectif_fr: "French", adjectif_en: "English", adjectif_de: "German", adjectif_it: "Italian",
    nom_export: "my-vox-pack-list.csv", entete_nom: "name", entete_phrase: "phrase",
    msg_systeme: "Create the {n} official EdgeTX SYSTEM sounds with the \"{voix}\" voice{robot}?\n\nThe list comes from the official EdgeTX repository. This takes a few minutes. Your list is not touched.",
    msg_systeme_robot: " ({robot})",
    btn_creer: "Create",
    msg_systeme_ok: "The {n} system sounds are ready.\nCopy the SYSTEM folder into SOUNDS/{langue} on the SD card (replace the old one).",
    msg_csv_echec: "Could not fetch the official EdgeTX list.\n\n{err}",
    msg_occupe: "A generation is already running.",
    aide: `<h2>Vox-Pack-Web</h2><p>Makes your EdgeTX radio talk: "Motor armed", "Gear down"…</p>
<p>Fork of <a href="https://github.com/ritchy-lab/Vox-Pack" target="_blank" rel="noopener">Vox-Pack</a> by ritchy-lab, adapted for the browser.</p>
<h3>1. Pick a voice</h3><p>The ★ marks EdgeTX's official voice.</p>
<h3>2. Write your phrases</h3><p>On the left, the file name: 8 characters max for EdgeTX, 6 for OpenTX, no accents or spaces (letters, digits, - and _).</p>
<p>To leave a silence, type one "&gt;" sign or more in the phrase: each "&gt;" is half a second. "Motor armed &gt;&gt; Motor off" leaves a second between the two, and "&gt;&gt;&gt; Motor armed" delays the announcement by a second and a half. Ten seconds at most.</p>
<h3>3. Tick the lines</h3><p>Click a box, then Shift + click another to tick the whole range. "All" and "None" tick or untick everything.</p>
<h3>4. Listen, then Let's Go</h3><p>"Listen" plays the ticked lines. "Let's Go" builds the WAV files (16-bit, 32 kHz, mono) and hands them to you as a zip — or, on Chrome and Edge, straight into a folder (even the SD card). Copy them to SOUNDS/en (or SOUNDS/fr, SOUNDS/de, SOUNDS/it).</p>
<h3>Robot voices</h3><p>The four dots transform the voice: Robot 1 to 3 and HAL 9000. HAL 9000 uses its own voice (Henri, Christopher, Conrad or Diego depending on the language), regardless of the menu — freely inspired by the film, not the official voice. Click the lit dot again to go back to normal.</p>
<h3>Volume</h3><p>The menu next to the voice sets the volume of the files. "Loud" compresses the voice so it carries better on the radio's small speaker. "Manual volume" shows a slider from −20 to +6 dB: beyond that, the voice would lose quality. For a much louder sound, raise the volume on the radio (Radio Setup → Sound).</p>
<h3>Menu ☰</h3><p>Export / import your list (CSV "name,phrase" or official EdgeTX CSV), reload the default list, create the official SYSTEM sounds, switch language. Each language keeps its own list, saved in this browser.</p>
<h3>Privacy</h3><p>Phrases are sent to the Vox-Pack-Web server, which has them spoken by Microsoft Edge's online voice service.</p>
<p>Vox-Pack-Web is an independent tool, not made or endorsed by the EdgeTX team. <a href="https://ko-fi.com/thibaultguillaume" target="_blank" rel="noopener">Buy me a coffee ☕</a> · <a href="https://github.com/sponsors/tguillaume02" target="_blank" rel="noopener">GitHub Sponsors 💖</a> · <a href="https://tguillaume02.github.io/" target="_blank" rel="noopener">My other projects</a></p>
<p>Enjoying the tool? Give the project a ⭐ <a href="https://github.com/tguillaume02/vox-pack-web" target="_blank" rel="noopener">on GitHub</a> ("Star" button at the top of the page, GitHub account required).</p>`,
  },
  de: {
    ajouter: "Hinzufügen", supprimer: "Löschen", ecouter: "Anhören", arreter: "■  Stopp",
    tout: "Alle", rien: "Keine", lets_go: "Let's Go",
    colonne_nom: "WAV-Name (max. {max} Zeichen EdgeTX, 6 OpenTX)",
    colonne_phrase: "Text der Ansage",
    genre_f: "Weiblich", genre_h: "Männlich", genre_e: "Kind",
    accent_france: "Frankreich", accent_suisse: "Schweiz", accent_belgique: "Belgien",
    accent_quebec: "Québec", accent_usa: "USA", accent_uk: "Großbritannien",
    accent_irlande: "Irland", accent_allemagne: "Deutschland", accent_italie: "Italien", voix_multilingue: "Mehrsprachig",
    voix_normale: "Normale Stimme",
    niveau_m6: "🔉 Leise", niveau_0: "🔊 Normale Lautstärke",
    niveau_6: "🔊 Laut",
    niveau_manuel: "🎚️ Lautstärke manuell…", niveau_curseur: "Lautstärke",
    menu_exporter: "Liste exportieren…", menu_importer: "Liste importieren…",
    menu_defaut: "Standardliste laden", menu_sons_systeme: "System-Ansagen erzeugen…",
    menu_langue: "Sprache",
    kofi: "☕ Spendier mir einen Kaffee", sponsor: "💖 Sponsor werden", projets: "🔗 Meine anderen Projekte", pub: "Werbung",
    compteurs: "{fichiers} Dateien heruntergeladen · {utilisateurs} Nutzer",
    fork: "Fork von Vox-Pack von ritchy-lab",
    sous_titre_par: "Inoffizielle Web-Version von", sous_titre_base: ", basierend auf",
    pb_vide: "leerer Name", pb_long: "{n} Zeichen (max. {max})", pb_espace: "keine Leerzeichen erlaubt",
    pb_accent: "keine Akzente erlaubt", pb_caractere: "Zeichen „{c}“ nicht erlaubt",
    pb_doublon: "bereits verwendet (Zeile {n})",
    nouvelle_ligne: "neu", texte_a_dire: "Zu sprechender Text",
    err_refus: "Dienst abgelehnt (Stimme nicht verfügbar oder Server-Update nötig)",
    err_voix_absente: "Stimme vom Dienst entfernt: bitte eine andere wählen",
    err_lent: "Dienst hat nicht rechtzeitig geantwortet",
    err_illisible: "unlesbare Antwort des Dienstes, bitte gleich noch einmal versuchen",
    err_reseau: "Server nicht erreichbar (Internetverbindung?)",
    err_quota: "zu viele Anfragen von dieser Verbindung, bitte in einer Stunde erneut versuchen",
    err_texte: "leere oder zu lange Ansage",
    err_autre: "Serverfehler",
    srv_demarre: "Der Server startet… das kann bis zu einer Minute dauern ({s} s)",
    srv_long: "Der Server braucht länger als üblich ({s} s). Neuer Versuch läuft…",
    srv_pret: "Server bereit ✓",
    etat_pret: "Bereit — {n} Stimmen verfügbar",
    etat_ecoute: "Wiedergabe {rang}/{total} — {nom}",
    etat_genere: "Erzeugung ({fait}/{total}) — {nom}…",
    etat_csv: "Offizielle EdgeTX-Liste wird geladen…",
    etat_zip: "ZIP-Datei wird vorbereitet…",
    etat_arret: "Stopp angefordert — aktuelle Dateien werden beendet…",
    msg_rien_coche: "Markieren Sie mindestens eine Zeile.",
    msg_aucune_valide: "Keine markierte Zeile hat einen gültigen Namen und einen Ansage-Text.",
    msg_supprimer: "{n} Zeile(n) löschen?",
    oui: "Ja", non: "Nein", annuler: "Abbrechen", fermer: "Schließen", arreter_court: "Stopp",
    msg_star: "Gefällt Ihnen das Tool? Geben Sie dem Projekt einen ⭐ <a href=\"https://github.com/tguillaume02/vox-pack-web\" target=\"_blank\" rel=\"noopener\">auf GitHub</a> (GitHub-Konto erforderlich).",
    msg_succes: "Ihre Stimmen sind fertig!\n\n{n} WAV-Datei(en) (16 Bit, 32 kHz, mono).\nKopieren Sie den Ordner „{dossier}“ auf die SD-Karte nach SOUNDS/{langue}.",
    msg_bilan: "{ok} von {total} Datei(en) erstellt.\n\n{pb} Problem(e):\n{detail}",
    msg_autres: "… und {n} weitere",
    btn_zip: "ZIP herunterladen", btn_dossier: "In einem Ordner speichern…",
    msg_dossier_ok: "Dateien in den Ordner „{dossier}“ geschrieben.",
    msg_dossier_echec: "In diesen Ordner kann nicht geschrieben werden.\n\n{err}",
    msg_import_vide: "Diese Datei enthält keine Zeile.",
    msg_import_confirmer: "Aktuelle Liste ({avant} Zeile(n)) durch die {apres} Zeile(n) der Datei ersetzen?",
    msg_import_ok: "{n} Zeile(n) importiert.",
    msg_defaut: "Ihre Liste durch die Standardliste ersetzen ({n} Ansagen auf {langue})?",
    adjectif_fr: "Französisch", adjectif_en: "Englisch", adjectif_de: "Deutsch", adjectif_it: "Italienisch",
    nom_export: "meine-vox-pack-liste.csv", entete_nom: "Name", entete_phrase: "Ansage",
    msg_systeme: "Die {n} offiziellen SYSTEM-Ansagen von EdgeTX mit der Stimme „{voix}“{robot} erzeugen?\n\nDie Liste stammt aus dem offiziellen EdgeTX-Repository. Das dauert einige Minuten. Ihre Liste bleibt unverändert.",
    msg_systeme_robot: " ({robot})",
    btn_creer: "Erzeugen",
    msg_systeme_ok: "Die {n} System-Ansagen sind fertig.\nKopieren Sie den SYSTEM-Ordner auf der SD-Karte nach SOUNDS/{langue} (den alten ersetzen).",
    msg_csv_echec: "Die offizielle EdgeTX-Liste konnte nicht geladen werden.\n\n{err}",
    msg_occupe: "Es läuft bereits eine Erzeugung.",
    aide: `<h2>Vox-Pack-Web</h2><p>Bringt Ihre EdgeTX-Fernsteuerung zum Sprechen: „Motor an“, „Fahrwerk ausgefahren“…</p>
<p>Fork von <a href="https://github.com/ritchy-lab/Vox-Pack" target="_blank" rel="noopener">Vox-Pack</a> von ritchy-lab, für den Browser angepasst. Deutsche Übersetzung: Ralf.</p>
<h3>1. Stimme wählen</h3><p>Der ★ kennzeichnet die offizielle EdgeTX-Stimme.</p>
<h3>2. Ansagen schreiben</h3><p>Links der Dateiname: höchstens 8 Zeichen für EdgeTX, 6 für OpenTX, ohne Akzente oder Leerzeichen (Buchstaben, Ziffern, - und _).</p>
<p>Für eine Pause tippen Sie ein „&gt;“ oder mehr in den Satz: jedes „&gt;“ zählt eine halbe Sekunde. „Motor an &gt;&gt; Motor aus“ lässt eine Sekunde zwischen beiden, und „&gt;&gt;&gt; Motor an“ verzögert die Ansage um eineinhalb Sekunden. Höchstens zehn Sekunden.</p>
<h3>3. Zeilen markieren</h3><p>Klicken Sie auf ein Kästchen, dann mit Umschalt + Klick auf ein anderes, um den ganzen Bereich zu markieren. „Alle“ und „Keine“ markieren alles oder nichts.</p>
<h3>4. Anhören, dann Let's Go</h3><p>„Anhören“ spielt die markierten Zeilen ab. „Let's Go“ erzeugt die WAV-Dateien (16 Bit, 32 kHz, mono) als ZIP — oder, in Chrome und Edge, direkt in einen Ordner (sogar auf die SD-Karte). Kopieren Sie sie nach SOUNDS/de.</p>
<h3>Roboterstimmen</h3><p>Die vier Punkte verwandeln die Stimme: Roboter 1 bis 3 und HAL 9000. HAL 9000 nutzt seine eigene Stimme (auf Deutsch Conrad), unabhängig vom Menü — frei vom Film inspiriert, nicht die offizielle Stimme. Klicken Sie erneut auf den leuchtenden Punkt, um zur normalen Stimme zurückzukehren.</p>
<h3>Lautstärke</h3><p>Das Menü neben der Stimme stellt die Lautstärke der Dateien ein. „Laut“ komprimiert die Stimme, damit sie auf dem kleinen Lautsprecher besser trägt. „Lautstärke manuell“ zeigt einen Regler von −20 bis +6 dB: darüber würde die Stimme an Qualität verlieren. Für deutlich mehr Lautstärke an der Fernsteuerung lauter stellen (Radio Setup → Sound).</p>
<h3>Menü ☰</h3><p>Liste exportieren / importieren (CSV „Name,Ansage“ oder offizielle EdgeTX-CSV), Standardliste neu laden, offizielle SYSTEM-Ansagen erzeugen, Sprache wechseln. Jede Sprache hat ihre eigene Liste, gespeichert in diesem Browser.</p>
<h3>Datenschutz</h3><p>Die Ansagen werden an den Vox-Pack-Web-Server gesendet, der sie vom Sprachdienst von Microsoft Edge sprechen lässt.</p>
<p>Vox-Pack-Web ist ein unabhängiges Tool, weder vom EdgeTX-Team herausgegeben noch unterstützt. <a href="https://ko-fi.com/thibaultguillaume" target="_blank" rel="noopener">Spendier mir einen Kaffee ☕</a> · <a href="https://github.com/sponsors/tguillaume02" target="_blank" rel="noopener">GitHub Sponsors 💖</a> · <a href="https://tguillaume02.github.io/" target="_blank" rel="noopener">Meine anderen Projekte</a></p>
<p>Gefällt Ihnen das Tool? Geben Sie dem Projekt einen ⭐ <a href="https://github.com/tguillaume02/vox-pack-web" target="_blank" rel="noopener">auf GitHub</a> („Star“-Knopf oben auf der Seite, GitHub-Konto erforderlich).</p>`,
  },
  it: {
    ajouter: "Aggiungi", supprimer: "Elimina", ecouter: "Ascolta", arreter: "■  Stop",
    tout: "Tutte", rien: "Nessuna", lets_go: "Let's Go",
    colonne_nom: "Nome file WAV (max. {max} caratteri EdgeTX, 6 OpenTX)",
    colonne_phrase: "Frase pronunciata dalla radio",
    genre_f: "Donna", genre_h: "Uomo", genre_e: "Bambino",
    accent_france: "Francia", accent_suisse: "Svizzera", accent_belgique: "Belgio",
    accent_quebec: "Québec", accent_usa: "USA", accent_uk: "Regno Unito",
    accent_irlande: "Irlanda", accent_allemagne: "Germania", accent_italie: "Italia",
    voix_multilingue: "Multilingue",
    voix_normale: "Voce normale",
    niveau_m6: "🔉 Volume basso", niveau_0: "🔊 Volume normale",
    niveau_6: "🔊 Volume alto",
    niveau_manuel: "🎚️ Volume manuale…", niveau_curseur: "Volume",
    menu_exporter: "Esporta l'elenco…", menu_importer: "Importa un elenco…",
    menu_defaut: "Carica l'elenco predefinito", menu_sons_systeme: "Crea i suoni di sistema…",
    menu_langue: "Lingua",
    kofi: "☕ Offrimi un caffè", sponsor: "💖 Sponsorizzami", projets: "🔗 I miei altri progetti", pub: "Pubblicità",
    compteurs: "{fichiers} file scaricati · {utilisateurs} utenti",
    fork: "Fork di Vox-Pack di ritchy-lab",
    sous_titre_par: "Versione web non ufficiale di", sous_titre_base: ", basata su",
    pb_vide: "nome vuoto", pb_long: "{n} caratteri (max. {max})", pb_espace: "niente spazi",
    pb_accent: "niente accenti", pb_caractere: "carattere «{c}» non consentito",
    pb_doublon: "già usato (riga {n})",
    nouvelle_ligne: "nuovo", texte_a_dire: "Testo da pronunciare",
    err_refus: "servizio rifiutato (voce non disponibile o server da aggiornare)",
    err_voix_absente: "voce rimossa dal servizio: scegline un'altra",
    err_lent: "il servizio non ha risposto in tempo",
    err_illisible: "risposta illeggibile dal servizio, riprova tra un attimo",
    err_reseau: "server irraggiungibile (connessione Internet?)",
    err_quota: "troppe richieste da questa connessione, riprova tra un'ora",
    err_texte: "frase vuota o troppo lunga",
    err_autre: "errore del server",
    srv_demarre: "Il server si sta avviando… può volerci fino a un minuto ({s} s)",
    srv_long: "Il server ci mette più del previsto ({s} s). Nuovo tentativo in corso…",
    srv_pret: "Server pronto ✓",
    etat_pret: "Pronto — {n} voci disponibili",
    etat_ecoute: "Ascolto {rang}/{total} — {nom}",
    etat_genere: "Generazione ({fait}/{total}) — {nom}…",
    etat_csv: "Download dell'elenco ufficiale EdgeTX…",
    etat_zip: "Preparazione del file zip…",
    etat_arret: "Arresto richiesto — completamento dei file in corso…",
    msg_rien_coche: "Seleziona almeno una riga.",
    msg_aucune_valide: "Nessuna riga selezionata ha un nome valido e una frase.",
    msg_supprimer: "Eliminare {n} riga/righe?",
    oui: "Sì", non: "No", annuler: "Annulla", fermer: "Chiudi", arreter_court: "Stop",
    msg_star: "Ti piace lo strumento? Lascia una ⭐ al progetto <a href=\"https://github.com/tguillaume02/vox-pack-web\" target=\"_blank\" rel=\"noopener\">su GitHub</a> (account GitHub richiesto).",
    msg_succes: "Le tue voci sono pronte!\n\n{n} file WAV (16 bit, 32 kHz, mono).\nCopia la cartella «{dossier}» sulla scheda SD, in SOUNDS/{langue}.",
    msg_bilan: "{ok} file creati su {total}.\n\n{pb} problema/i:\n{detail}",
    msg_autres: "… e altri {n}",
    btn_zip: "Scarica lo zip", btn_dossier: "Salva in una cartella…",
    msg_dossier_ok: "File scritti nella cartella «{dossier}».",
    msg_dossier_echec: "Impossibile scrivere in questa cartella.\n\n{err}",
    msg_import_vide: "Questo file non contiene alcuna riga.",
    msg_import_confirmer: "Sostituire le {avant} righe attuali con le {apres} righe del file?",
    msg_import_ok: "{n} riga/righe importate.",
    msg_defaut: "Sostituire il tuo elenco con quello predefinito ({n} frasi in {langue})?",
    adjectif_fr: "francese", adjectif_en: "inglese", adjectif_de: "tedesco", adjectif_it: "italiano",
    nom_export: "il-mio-elenco-vox-pack.csv", entete_nom: "nome", entete_phrase: "frase",
    msg_systeme: "Creare i {n} suoni SYSTEM ufficiali di EdgeTX con la voce «{voix}»{robot}?\n\nL'elenco proviene dal repository ufficiale EdgeTX. Ci vorrà qualche minuto. Il tuo elenco non viene toccato.",
    msg_systeme_robot: " ({robot})",
    btn_creer: "Crea",
    msg_systeme_ok: "I {n} suoni di sistema sono pronti.\nCopia la cartella SYSTEM in SOUNDS/{langue} sulla scheda SD (sostituisci quella vecchia).",
    msg_csv_echec: "Impossibile recuperare l'elenco ufficiale EdgeTX.\n\n{err}",
    msg_occupe: "Una generazione è già in corso.",
    aide: `<h2>Vox-Pack-Web</h2><p>Fa parlare la tua radio EdgeTX: «Motore armato», «Carrello estratto»…</p>
<p>Fork di <a href="https://github.com/ritchy-lab/Vox-Pack" target="_blank" rel="noopener">Vox-Pack</a> di ritchy-lab, adattato per il browser.</p>
<h3>1. Scegli una voce</h3><p>La ★ indica la voce ufficiale di EdgeTX.</p>
<h3>2. Scrivi le tue frasi</h3><p>A sinistra il nome del file: 8 caratteri al massimo per EdgeTX, 6 per OpenTX, senza accenti né spazi (lettere, cifre, - e _).</p>
<p>Per lasciare una pausa, scrivi uno o più «&gt;» nella frase: ogni «&gt;» vale mezzo secondo. «Motore armato &gt;&gt; Motore disarmato» lascia un secondo tra le due, e «&gt;&gt;&gt; Motore armato» ritarda l'annuncio di un secondo e mezzo. Dieci secondi al massimo.</p>
<h3>3. Seleziona le righe</h3><p>Clicca una casella, poi Maiusc + clic su un'altra per selezionare tutto l'intervallo. «Tutte» e «Nessuna» selezionano o deselezionano tutto.</p>
<h3>4. Ascolta, poi Let's Go</h3><p>«Ascolta» riproduce le righe selezionate. «Let's Go» crea i file WAV (16 bit, 32 kHz, mono) e te li dà in uno zip — oppure, su Chrome ed Edge, direttamente in una cartella (anche la scheda SD). Copiali in SOUNDS/it.</p>
<h3>Voci robot</h3><p>I quattro pallini trasformano la voce: Robot 1 a 3 e HAL 9000. HAL 9000 usa la propria voce (in italiano Diego), indipendentemente dal menu — liberamente ispirata al film, non la voce ufficiale. Riclicca il pallino acceso per tornare alla voce normale.</p>
<h3>Volume</h3><p>Il menu accanto alla voce regola il volume dei file. «Alto» comprime la voce perché si senta meglio sul piccolo altoparlante della radio. «Volume manuale» mostra un cursore da −20 a +6 dB: oltre, la voce perderebbe qualità. Per un suono molto più forte, alza il volume sulla radio (Radio Setup → Sound).</p>
<h3>Menu ☰</h3><p>Esporta / importa il tuo elenco (CSV «nome,frase» o CSV ufficiale EdgeTX), ricarica l'elenco predefinito, crea i suoni SYSTEM ufficiali, cambia lingua. Ogni lingua ha il proprio elenco, salvato in questo browser.</p>
<h3>Privacy</h3><p>Le frasi vengono inviate al server Vox-Pack-Web, che le fa pronunciare dal servizio vocale di Microsoft Edge.</p>
<p>Vox-Pack-Web è uno strumento indipendente, non realizzato né approvato dal team EdgeTX. <a href="https://ko-fi.com/thibaultguillaume" target="_blank" rel="noopener">Offrimi un caffè ☕</a> · <a href="https://github.com/sponsors/tguillaume02" target="_blank" rel="noopener">GitHub Sponsors 💖</a> · <a href="https://tguillaume02.github.io/" target="_blank" rel="noopener">I miei altri progetti</a></p>
<p>Ti piace lo strumento? Lascia una ⭐ al progetto <a href="https://github.com/tguillaume02/vox-pack-web" target="_blank" rel="noopener">su GitHub</a> (pulsante «Star» in alto nella pagina, account GitHub richiesto).</p>`,
  },
};

// ------------------------------------------------------------------
// Données de départ (identiques à l'application de bureau)
// ------------------------------------------------------------------
const VOIX_DEFAUT = {
  fr: [
    ["fr-FR-DeniseNeural", "Denise", "f", "france"], ["fr-FR-HenriNeural", "Henri", "h", "france"],
    ["fr-FR-EloiseNeural", "Eloise", "e", "france"], ["fr-CH-ArianeNeural", "Ariane", "f", "suisse"],
    ["fr-CH-FabriceNeural", "Fabrice", "h", "suisse"], ["fr-BE-CharlineNeural", "Charline", "f", "belgique"],
    ["fr-BE-GerardNeural", "Gerard", "h", "belgique"], ["fr-CA-SylvieNeural", "Sylvie", "f", "quebec"],
    ["fr-CA-AntoineNeural", "Antoine", "h", "quebec"], ["fr-CA-JeanNeural", "Jean", "h", "quebec"],
    ["fr-CA-ThierryNeural", "Thierry", "h", "quebec"],
  ],
  en: [
    ["en-US-AriaNeural", "Aria", "f", "usa"], ["en-US-GuyNeural", "Guy", "h", "usa"],
    ["en-US-JennyNeural", "Jenny", "f", "usa"], ["en-US-ChristopherNeural", "Christopher", "h", "usa"],
    ["en-US-MichelleNeural", "Michelle", "f", "usa"], ["en-US-EricNeural", "Eric", "h", "usa"],
    ["en-US-AvaNeural", "Ava", "f", "usa"], ["en-US-AndrewNeural", "Andrew", "h", "usa"],
    ["en-US-EmmaMultilingualNeural", "Emma", "f", "usa"], ["en-US-BrianNeural", "Brian", "h", "usa"],
    ["en-US-RogerNeural", "Roger", "h", "usa"], ["en-US-SteffanNeural", "Steffan", "h", "usa"],
    ["en-US-AnaNeural", "Ana", "e", "usa"], ["en-IE-EmilyNeural", "Emily", "f", "irlande"],
    ["en-GB-SoniaNeural", "Sonia", "f", "uk"], ["en-GB-RyanNeural", "Ryan", "h", "uk"],
    ["en-GB-LibbyNeural", "Libby", "f", "uk"], ["en-GB-MaisieNeural", "Maisie", "e", "uk"],
    ["en-GB-ThomasNeural", "Thomas", "h", "uk"],
  ],
  de: [
    ["de-DE-KatjaNeural", "Katja", "f", "allemagne"], ["de-DE-ConradNeural", "Conrad", "h", "allemagne"],
    ["de-DE-AmalaNeural", "Amala", "f", "allemagne"], ["de-DE-KillianNeural", "Killian", "h", "allemagne"],
  ],
  it: [
    ["it-IT-ElsaNeural", "Elsa", "f", "italie"], ["it-IT-DiegoNeural", "Diego", "h", "italie"],
    ["it-IT-IsabellaNeural", "Isabella", "f", "italie"], ["it-IT-GiuseppeMultilingualNeural", "Giuseppe", "h", "italie"],
  ],
};
const OFFICIELLES = new Set(["fr-FR-DeniseNeural", "en-IE-EmilyNeural", "de-DE-KatjaNeural", "it-IT-ElsaNeural",
  "es-ES-ElviraNeural", "pt-BR-FranciscaNeural", "cs-CZ-VlastaNeural", "da-DK-ChristelNeural", "sv-SE-SofieNeural",
  "uk-UA-PolinaNeural", "uk-UA-OstapNeural", "ja-JP-NanamiNeural", "zh-CN-XiaoxiaoNeural", "zh-TW-HsiaoChenNeural",
  "zh-HK-HiuGaaiNeural"]);

const LISTE_PAR_DEFAUT = {
  fr: [["motarm","Moteur armé"],["motoff","Moteur coupé"],["vdecol","Volets de décollage"],["vatter","Volets d'atterrissage"],["vrentr","Volet rentré"],["trsort","Train sorti"],["trrent","Train rentré"],["chr-on","Chrono démarré"],["chroff","Chrono arrêté"],["mvnorm","Mode normal"],["mvgrat","Mode thermique"],["mvvite","Mode vitesse"],["mvdeco","Mode décollage"],["crocon","Crocodiles activés"],["crocof","Crocodiles coupés"],["largag","Largage remorque"],["stboff","Stabilisation désactivée"],["stabon","Stabilisation activée"],["stbaut","Stabilisation automatique"],["paniq","Panique"],["gainau","Gain augmenté"],["gaindi","Gain diminué"],["pvatte","Mode atterrissage"],["accro","Mode acrobatique"],["aerofr","Aérofreins"],["crois","Croisière"],["decol","Décollage"],["attero","Atterrissage"],["dr-hgh","Grand débattement"],["dr-med","Débattement moyen"],["dr-sml","Petit débattement"],["flaprn","Flapperon"],["lance","Lancer"],["lu-in","Lumières allumées"],["lu-out","Lumières éteintes"],["moyen","Moyen"],["eleve","Élevé"],["small","Petit"],["snapfl","Snapflap"],["Stab-1","Stabilité un"],["Stab-2","Stabilité deux"],["tx-hau","Taux élevé"],["tx-moy","Taux moyen"],["tx-fai","Taux faible"]],
  en: [["armed","Motor armed"],["disarm","Motor disarmed"],["flp-tk","Takeoff flaps"],["flp-ld","Landing flaps"],["flapup","Flaps up"],["geardn","Gear down"],["gearup","Gear up"],["tmr-on","Timer started"],["tmroff","Timer stopped"],["md-nrm","Normal mode"],["md-th","Thermal mode"],["md-spd","Speed mode"],["md-tko","Takeoff mode"],["crowon","Crow enabled"],["crowof","Crow disabled"],["towrel","Tow released"],["stboff","Stabilization off"],["stabon","Stabilization on"],["stbaut","Auto stabilization"],["panic","Panic"],["gainup","Gain increased"],["gaindn","Gain decreased"],["md-lnd","Landing mode"],["acro","Acrobatic mode"],["airbrk","Airbrakes"],["cruise","Cruise"],["tkoff","Takeoff"],["land","Landing"],["rt-hi","High rates"],["rt-mid","Medium rates"],["rt-low","Low rates"],["flaprn","Flaperon"],["launch","Launch"],["lgt-on","Lights on"],["lgtoff","Lights off"],["medium","Medium"],["high","High"],["low","Low"],["snapfl","Snapflap"],["stab-1","Stability one"],["stab-2","Stability two"],["tx-hi","High rate"],["tx-mid","Medium rate"],["tx-lo","Low rate"]],
  de: [["engon","Motor an"],["engoff","Motor aus"],["gearup","Fahrwerk eingefahren"],["geardn","Fahrwerk ausgefahren"],["flapup","Klappen eingefahren"],["flapdn","Klappen ausgefahren"],["crowon","Butterfly ein"],["crowof","Butterfly aus"],["lnding","Lande-Modus"],["fm-nrm","Normal-Modus"],["fm-thm","Thermik-Modus"],["fm-spd","Geschwindigkeits-Modus"],["acro","Akro-Modus"],["schlep","Schleppkupplung offen"],["gross","Großer Ausschlag"],["mittel","Mittlerer Ausschlag"],["klein","Kleiner Ausschlag"],["flaprn","Flapperon"],["snapfl","Snapflap"],["lbrems","Luftbremsen"],["panik","Panik"],["tmr-st","Timer gestartet"],["tmr-sp","Timer gestoppt"],["tmovr1","Timer eins abgelaufen"],["tmovr2","Timer zwei abgelaufen"],["staban","Stabilisierung an"],["stbaut","Automatische Stabilisierung"],["stbaus","Stabilisierung aus"]],
  it: [["motarm","Motore armato"],["motoff","Motore disarmato"],["flpdec","Flap di decollo"],["flpatt","Flap di atterraggio"],["flapsu","Flap retratti"],["carrgi","Carrello estratto"],["carrsu","Carrello retratto"],["tmr-on","Timer avviato"],["tmroff","Timer fermato"],["modnrm","Modalità normale"],["modter","Modalità termica"],["modvel","Modalità velocità"],["moddec","Modalità decollo"],["crowon","Crow attivato"],["crowof","Crow disattivato"],["sganci","Sgancio traino"],["stboff","Stabilizzazione disattivata"],["stabon","Stabilizzazione attivata"],["stbaut","Stabilizzazione automatica"],["panico","Panico"],["gainsu","Guadagno aumentato"],["gaingi","Guadagno diminuito"],["modatt","Modalità atterraggio"],["acro","Modalità acrobatica"],["aerofr","Aerofreni"],["crocie","Crociera"],["decoll","Decollo"],["atterr","Atterraggio"],["escalt","Escursione alta"],["escmed","Escursione media"],["escbas","Escursione bassa"],["flaprn","Flaperon"],["lancio","Lancio"],["lucion","Luci accese"],["lucoff","Luci spente"],["medio","Medio"],["alto","Alto"],["basso","Basso"],["snapfl","Snapflap"],["stab-1","Stabilità uno"],["stab-2","Stabilità due"],["txalto","Rateo alto"],["tx-med","Rateo medio"],["tx-bas","Rateo basso"]],
};

// Langues ajoutées par la version web (langues.js).
for (const [code, l] of Object.entries(LANGUES_PLUS)) {
  TEXTES[code] = l.textes; VOIX_DEFAUT[code] = l.voix; LISTE_PAR_DEFAUT[code] = l.liste;
}
const LANGUES = [["fr", "Français"], ["en", "English"], ["de", "Deutsch"], ["it", "Italiano"],
  ...Object.entries(LANGUES_PLUS).map(([code, l]) => [code, l.nom])];

/** Langue de l'interface d'après le navigateur (chinois : Taïwan, Hong Kong ou simplifié). */
function langueDuNavigateur() {
  const nav = (navigator.language || "fr").toLowerCase();
  if (nav.startsWith("zh")) return /hk|mo/.test(nav) ? "hk" : /tw|hant/.test(nav) ? "tw" : "cn";
  const code = nav.slice(0, 2);
  return LANGUES.some(([c]) => c === code) ? code : "en";
}

/** Dossier de la langue sous SOUNDS/ sur la carte SD (EdgeTX dit « cz », « se », « jp », « ua »…). */
const dossierSd = () => LANGUES_PLUS[reglages.langue]?.dossier || reglages.langue;

// ------------------------------------------------------------------
// Stockage (navigateur) — toujours protégé : il peut être indisponible
// ------------------------------------------------------------------
const stock = {
  lire(cle, defaut) {
    try { const v = localStorage.getItem(cle); return v == null ? defaut : JSON.parse(v); }
    catch { return defaut; }
  },
  ecrire(cle, valeur) { try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch {} },
};

// ------------------------------------------------------------------
// Statistiques : un appareil ouvert une fois avec ?nometrics n'est plus
// compté (?metrics pour le remettre). « attente » tant que ce qu'il a
// envoyé aujourd'hui n'a pas été effacé, puis « fait ».
// ------------------------------------------------------------------
const CLE_SANS_STATS = "vp_nometrics";
const sansStats = (() => {
  const q = new URLSearchParams(location.search);
  let etat = null;
  try {
    if (q.has("metrics")) localStorage.removeItem(CLE_SANS_STATS);
    else if (q.has("nometrics") && !localStorage.getItem(CLE_SANS_STATS)) localStorage.setItem(CLE_SANS_STATS, "attente");
    etat = localStorage.getItem(CLE_SANS_STATS);
  } catch { if (q.has("nometrics")) etat = "attente"; }
  if (q.has("nometrics") || q.has("metrics")) {
    q.delete("nometrics"); q.delete("metrics");
    history.replaceState(null, "", location.pathname + (q.size ? "?" + q : "") + location.hash);
  }
  return etat;
})();
const avecSuffixe = (url) => sansStats ? url + (url.includes("?") ? "&" : "?") + "nometrics=1" : url;

function effacerMesStats() {
  if (sansStats !== "attente") return;
  fetch(API + "/api/exclure?nometrics=1", { method: "POST" })
    .then((r) => { if (r.ok) try { localStorage.setItem(CLE_SANS_STATS, "fait"); } catch {} }, () => {});
}

// ------------------------------------------------------------------
// État
// ------------------------------------------------------------------
const reglages = Object.assign(
  { langue: langueDuNavigateur(),
    voix: {}, robot: 0, niveau: 0, niveauManuel: false },
  stock.lire("vp_reglages", {}));
if (!TEXTES[reglages.langue]) reglages.langue = "en";
let voixDispo = JSON.parse(JSON.stringify(VOIX_DEFAUT));
let lignes = [];               // [{nom, phrase, coche}]
let ancre = null;              // pour Majuscule + clic
let occupe = false;            // génération en cours
let arretDemande = false;
let apercuNo = 0;
let lectureEnCours = null;

const $ = (s) => document.querySelector(s);
const t = (cle, r = {}) => {
  let s = (TEXTES[reglages.langue] || TEXTES.en)[cle] ?? TEXTES.en[cle] ?? cle;
  for (const [k, v] of Object.entries(r)) s = s.split("{" + k + "}").join(v);
  return s;
};
const pluriel = (n) => (n > 1 ? "s" : "");
/** Vrai si la phrase a quelque chose à dire en dehors des silences « > ». */
const aDuTexte = (phrase) => !!phrase.replace(/>+/g, "").trim();
const sauverReglages = () => stock.ecrire("vp_reglages", reglages);

// ------------------------------------------------------------------
// Liste
// ------------------------------------------------------------------
function chargerListe() {
  const enregistree = stock.lire("vp_liste_" + reglages.langue, null);
  if (Array.isArray(enregistree) && enregistree.length) {
    lignes = enregistree.map((l) => ({ nom: l[0] || "", phrase: l[1] || "", coche: !!l[2] }));
  } else {
    lignes = (LISTE_PAR_DEFAUT[reglages.langue] || LISTE_PAR_DEFAUT.fr)
      .map(([nom, phrase]) => ({ nom, phrase, coche: false }));
  }
  ancre = null;
  dessinerListe();
  sauverListe();
}

let minuteurSauvegarde = null;
function sauverListe() {
  clearTimeout(minuteurSauvegarde);
  minuteurSauvegarde = setTimeout(() => {
    stock.ecrire("vp_liste_" + reglages.langue,
      lignes.filter((l) => l.nom.trim() || l.phrase.trim())
        .map((l) => [l.nom.trim(), l.phrase.trim(), l.coche ? 1 : 0]));
  }, 250);
}

function problemeNom(nom) {
  if (!nom) return t("pb_vide");
  if (nom.length > LIMITE_NOM) return t("pb_long", { n: nom.length, max: LIMITE_NOM });
  if (/\s/.test(nom)) return t("pb_espace");
  if (!AUTORISES.test(nom)) {
    if (ACCENTS.test(nom)) return t("pb_accent");
    const c = [...nom].find((ch) => !/[A-Za-z0-9_-]/.test(ch));
    return t("pb_caractere", { c });
  }
  return null;
}

function verifierNoms() {
  const vus = new Map();
  const zone = $("#lignes");
  lignes.forEach((l, i) => {
    const nom = l.nom.trim();
    let souci = nom || l.phrase.trim() ? problemeNom(nom) : null;
    if (!souci && nom) {
      const deja = vus.get(nom.toLowerCase());
      if (deja) souci = t("pb_doublon", { n: deja });
      else vus.set(nom.toLowerCase(), i + 1);
    }
    const el = zone.children[i];
    if (!el) return;
    el.querySelector(".nom").classList.toggle("erreur", !!souci);
    el.querySelector(".msg").textContent = souci || "";
  });
}

function dessinerListe() {
  const zone = $("#lignes");
  zone.textContent = "";
  lignes.forEach((l, i) => zone.appendChild(creerLigne(l, i)));
  verifierNoms();
}

function creerLigne(l, i) {
  const div = document.createElement("div");
  div.className = "ligne";
  const caseEl = document.createElement("input");
  caseEl.type = "checkbox"; caseEl.className = "case"; caseEl.checked = l.coche;
  caseEl.setAttribute("aria-label", l.nom || "ligne");
  caseEl.addEventListener("click", (e) => clicCase(i, caseEl.checked, e.shiftKey));
  const nom = document.createElement("input");
  nom.type = "text"; nom.className = "nom"; nom.value = l.nom; nom.maxLength = 40;
  nom.spellcheck = false; nom.autocapitalize = "off"; nom.autocomplete = "off";
  nom.addEventListener("input", () => { l.nom = nom.value; verifierNoms(); sauverListe(); });
  const phrase = document.createElement("input");
  phrase.type = "text"; phrase.className = "phrase"; phrase.value = l.phrase; phrase.maxLength = 300;
  phrase.addEventListener("input", () => { l.phrase = phrase.value; verifierNoms(); sauverListe(); });
  const msg = document.createElement("div");
  msg.className = "msg";
  div.append(caseEl, nom, phrase, msg);
  return div;
}

function clicCase(i, etat, majuscule) {
  if (majuscule && ancre !== null && ancre !== i) {
    const [a, b] = ancre < i ? [ancre, i] : [i, ancre];
    for (let k = a; k <= b; k++) lignes[k].coche = etat;
    const cases = document.querySelectorAll("#lignes .case");
    for (let k = a; k <= b; k++) cases[k].checked = etat;
  } else {
    lignes[i].coche = etat;
  }
  ancre = i;
  sauverListe();
}

function toutCocher(etat) {
  lignes.forEach((l) => (l.coche = etat));
  document.querySelectorAll("#lignes .case").forEach((c) => (c.checked = etat));
  sauverListe();
}

function ajouterLigne() {
  lignes.push({ nom: t("nouvelle_ligne"), phrase: t("texte_a_dire"), coche: true });
  const zone = $("#lignes");
  zone.appendChild(creerLigne(lignes[lignes.length - 1], lignes.length - 1));
  verifierNoms();
  sauverListe();
  zone.scrollTop = zone.scrollHeight;
  const champ = zone.lastElementChild.querySelector(".nom");
  champ.focus(); champ.select();
}

async function supprimerSelection() {
  const n = lignes.filter((l) => l.coche).length;
  if (!n) return message(t("msg_rien_coche"));
  const ok = await message(t("msg_supprimer", { n, s: pluriel(n) }),
    [[t("supprimer"), true, true], [t("annuler"), false]]);
  if (!ok) return;
  lignes = lignes.filter((l) => !l.coche);
  ancre = null;
  dessinerListe();
  sauverListe();
}

/** Lignes cochées prêtes à générer, et celles refusées (nom invalide, doublon). */
function tachesCochees() {
  const taches = [], refuses = [], vus = new Map();
  lignes.forEach((l, i) => {
    if (!l.coche) return;
    const nom = l.nom.trim(), phrase = l.phrase.trim();
    let souci = problemeNom(nom);
    if (!souci) {
      const deja = vus.get(nom.toLowerCase());
      if (deja) souci = t("pb_doublon", { n: deja });
      else vus.set(nom.toLowerCase(), i + 1);
    }
    if (souci) refuses.push([nom || t("pb_vide"), souci]);
    else if (aDuTexte(phrase)) taches.push([nom, phrase]);
  });
  return { taches, refuses };
}

// ------------------------------------------------------------------
// Voix et robots
// ------------------------------------------------------------------
function libelleVoix(v) {
  const [id, prenom, genre, accent] = v;
  const origine = id.includes("Multilingual") ? t("voix_multilingue") : t("accent_" + accent);
  return `${prenom} (${t("genre_" + genre)} - ${origine})` + (OFFICIELLES.has(id) ? "  ★" : "");
}

function remplirVoix() {
  const sel = $("#voix");
  sel.textContent = "";
  const liste = voixDispo[reglages.langue] || [];
  for (const v of liste) {
    const o = document.createElement("option");
    o.value = v[0]; o.textContent = libelleVoix(v);
    sel.appendChild(o);
  }
  const memo = reglages.voix[reglages.langue];
  sel.value = liste.some((v) => v[0] === memo) ? memo : (liste[0] || [""])[0];
}

function voixChoisie() { return $("#voix").value; }
function libelleVoixChoisie() {
  const o = $("#voix").selectedOptions[0];
  return o ? o.textContent.replace("★", "").trim() : "";
}

async function verifierVoix() {
  await serveurPret();
  try {
    const r = await fetch(avecSuffixe(API + "/api/voix?langue=" + reglages.langue));
    if (!r.ok) throw new Error(r.status);
    effacerMesStats();
    noterUtilisateur();
    chargerCompteurs();
    const d = await r.json();
    dernierContact = Date.now();
    for (const langue of Object.keys(VOIX_DEFAUT)) {
      if (Array.isArray(d[langue]) && d[langue].length) {
        voixDispo[langue] = d[langue].map((v) => [v.id, v.prenom, v.genre, v.accent]);
      }
    }
    remplirVoix();
    dire(t("etat_pret", { n: (voixDispo[reglages.langue] || []).length }));
    setTimeout(() => { if ($("#etat").textContent.startsWith(t("etat_pret", { n: "" }).slice(0, 5))) dire(""); }, 4000);
  } catch {
    dire(t("err_reseau"));
  }
}

// ------------------------------------------------------------------
// Compteurs sous le logo (masqués si le serveur ne les donne pas)
// ------------------------------------------------------------------
let compteurs = null;

function majCompteurs() {
  const zone = $("#compteurs");
  zone.hidden = !compteurs;
  if (!compteurs) return;
  const nombre = new Intl.NumberFormat({ cn: "zh-CN", tw: "zh-TW", hk: "zh-HK" }[reglages.langue] || reglages.langue);
  zone.textContent = t("compteurs", {
    fichiers: nombre.format(compteurs.telecharges),
    utilisateurs: nombre.format(compteurs.utilisateurs),
  });
}

async function chargerCompteurs() {
  try {
    const r = await fetch(API + "/api/compteurs");
    if (!r.ok) return;
    compteurs = await r.json();
    majCompteurs();
  } catch {}
}

// ------------------------------------------------------------------
// Réveil du serveur (Render gratuit : il s'endort après 15 min sans visite)
// ------------------------------------------------------------------
const VEILLE_MS = 14 * 60 * 1000;   // au-delà, le serveur dort peut-être
let dernierContact = 0;
let reveil = null;

/** Attend que le serveur réponde ; affiche le bandeau s'il tarde. */
function serveurPret(forcer = false) {
  if (!forcer && Date.now() - dernierContact < VEILLE_MS) return Promise.resolve();
  if (reveil) return reveil;
  reveil = (async () => {
    const debut = Date.now();
    let visible = false, compteur = null;
    const majTexte = () => {
      const s = Math.round((Date.now() - debut) / 1000);
      $("#bandeau-texte").textContent = t(s > 90 ? "srv_long" : "srv_demarre", { s });
    };
    const montrer = () => {
      if (visible) return;
      visible = true;
      const b = $("#bandeau");
      b.classList.remove("pret"); b.hidden = false;
      majTexte(); compteur = setInterval(majTexte, 1000);
    };
    // Un serveur éveillé répond en moins d'une seconde : pas de bandeau.
    const delai = setTimeout(montrer, 1500);
    for (;;) {
      const ctrl = new AbortController();
      const limite = setTimeout(() => ctrl.abort(), 10000);
      try {
        const r = await fetch(API + "/api/sante", { signal: ctrl.signal, cache: "no-store" });
        if (r.ok) break;
      } catch {}
      finally { clearTimeout(limite); }
      montrer();
      await new Promise((ok) => setTimeout(ok, 3000));
    }
    clearTimeout(delai); clearInterval(compteur);
    dernierContact = Date.now();
    if (visible) {
      const b = $("#bandeau");
      b.classList.add("pret");
      $("#bandeau-texte").textContent = t("srv_pret");
      setTimeout(() => { b.hidden = true; b.classList.remove("pret"); }, 2000);
    }
  })().finally(() => { reveil = null; });
  return reveil;
}

/** HAL 9000 (pastille 4) impose sa voix, selon la langue de la liste. */
const VOIX_HAL = { fr: "Henri", en: "Christopher", de: "Conrad", it: "Diego", es: "Alvaro", pt: "Antonio",
  cs: "Antonin", da: "Jeppe", sv: "Mattias", uk: "Ostap", ja: "Keita", cn: "Yunjian", tw: "YunJhe", hk: "WanLung" };
function nomRobot(n) { return n === 4 ? "HAL 9000" : "Robot " + n; }

const NIVEAUX = [-6, 0, 6];

const NIVEAU_MIN = -20, NIVEAU_MAX = 6;     // curseur du volume manuel

function remplirNiveaux() {
  const sel = $("#niveau");
  if (!Number.isInteger(reglages.niveau)) reglages.niveau = 0;
  // Ancien « Très fort » (+12) ou curseur au-delà de +6 : ramené au maximum.
  reglages.niveau = Math.max(NIVEAU_MIN, Math.min(reglages.niveau, NIVEAU_MAX));
  if (!reglages.niveauManuel && !NIVEAUX.includes(reglages.niveau)) reglages.niveauManuel = true;
  sel.textContent = "";
  for (const n of [...NIVEAUX, "manuel"]) {
    const o = document.createElement("option");
    o.value = n; o.textContent = t("niveau_" + (n < 0 ? "m" + -n : n));
    sel.appendChild(o);
  }
  sel.value = reglages.niveauManuel ? "manuel" : reglages.niveau;
  majCurseur();
}

function majCurseur() {
  $("#zone-curseur").hidden = !reglages.niveauManuel;
  $("#curseur").value = reglages.niveau;
  const n = reglages.niveau;
  $("#val-curseur").textContent = (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n) + " dB";
}

function majRobot(survol = null) {
  document.querySelectorAll(".pastille").forEach((b) =>
    b.classList.toggle("actif", Number(b.dataset.robot) === reglages.robot));
  const n = survol ?? reglages.robot;
  $("#lbl-robot").textContent = n ? nomRobot(n) : t("voix_normale");
}

// ------------------------------------------------------------------
// Synthèse (serveur)
// ------------------------------------------------------------------
class ErreurService extends Error {}

async function synthese(texte, voix, robot, niveau, signal, usage, deuxiemeEssai = false) {
  let r, code = null;
  try {
    r = await fetch(avecSuffixe(API + "/api/tts"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texte, voix, robot, niveau, usage }),
      signal,
    });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    code = "reseau";
  }
  if (r && !r.ok) {
    try { code = (await r.json()).erreur || "autre"; }
    // Pas de réponse JSON : c'est Render qui répond, le serveur ne tourne pas.
    catch { code = [502, 503, 504].includes(r.status) ? "reseau" : "autre"; }
  }
  if (code === "reseau" && !deuxiemeEssai) {
    // Le serveur s'est peut-être endormi : on attend son réveil, puis on réessaie.
    await serveurPret(true);
    return synthese(texte, voix, robot, niveau, signal, usage, true);
  }
  if (code) throw new ErreurService(t("err_" + code));
  dernierContact = Date.now();
  return await r.blob();
}

// ------------------------------------------------------------------
// Écouter
// ------------------------------------------------------------------
async function ecouter() {
  const textes = lignes.filter((l) => l.coche && aDuTexte(l.phrase))
    .map((l) => [l.nom.trim(), l.phrase.trim()]);
  if (!textes.length) return message(t("msg_rien_coche"));
  const numero = ++apercuNo;
  const ctrl = new AbortController();
  const voix = voixChoisie(), robot = reglages.robot, niveau = reglages.niveau;
  boutonEcouter(true, () => { apercuNo++; ctrl.abort(); arreterLecture(); boutonEcouter(false); dire(""); });
  await serveurPret();
  if (apercuNo !== numero) return;

  // La phrase suivante se télécharge pendant la lecture de celle-ci.
  let suivante = synthese(textes[0][1], voix, robot, niveau, ctrl.signal, "ecoute");
  try {
    for (let i = 0; i < textes.length; i++) {
      if (apercuNo !== numero) return;
      dire(t("etat_ecoute", { rang: i + 1, total: textes.length, nom: textes[i][0] }));
      const blob = await suivante;
      if (i + 1 < textes.length) {
        suivante = synthese(textes[i + 1][1], voix, robot, niveau, ctrl.signal, "ecoute");
        suivante.catch(() => {});
      }
      if (apercuNo !== numero) return;
      await jouer(blob);
    }
  } catch (e) {
    if (e.name !== "AbortError" && apercuNo === numero) message(e.message);
  }
  if (apercuNo === numero) { boutonEcouter(false); dire(""); }
}

function jouer(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    const fin = () => { URL.revokeObjectURL(url); lectureEnCours = null; resolve(); };
    lectureEnCours = { audio, fin };
    audio.onended = fin; audio.onerror = fin;
    audio.play().catch(fin);
  });
}

function arreterLecture() {
  if (lectureEnCours) { lectureEnCours.audio.pause(); lectureEnCours.fin(); }
}

function boutonEcouter(enCours, arret) {
  const b = $("#btn-ecouter");
  b.textContent = enCours ? t("arreter") : t("ecouter");
  b.onclick = enCours ? arret : ecouter;
}

// ------------------------------------------------------------------
// Génération
// ------------------------------------------------------------------
function initLeds() {
  const z = $("#leds");
  z.textContent = "";
  for (let i = 0; i < NB_LEDS; i++) z.appendChild(document.createElement("span"));
}
function leds(v) {
  const n = Math.round(v * NB_LEDS);
  [...$("#leds").children].forEach((s, i) => s.classList.toggle("on", i < n));
}
function dire(texte) { $("#etat").textContent = texte; }

/** Fabrique tous les WAV ; renvoie {fichiers:[[nom, blob]], echecs:[[nom, raison]]}. */
async function fabriquer(taches, voix, robot, niveau, usage) {
  const fichiers = new Array(taches.length);
  const echecs = [];
  let suivant = 0, faits = 0;
  arretDemande = false;
  leds(0);
  async function ouvrier() {
    while (!arretDemande && suivant < taches.length) {
      const i = suivant++;
      const [nom, phrase] = taches[i];
      dire(t("etat_genere", { fait: faits + 1, total: taches.length, nom }));
      try {
        fichiers[i] = [nom, await synthese(phrase, voix, robot, niveau, undefined, usage)];
      } catch (e) {
        echecs.push([nom, e.message]);
        // Serveur injoignable ou quota : inutile d'insister sur les suivantes.
        if (e.message === t("err_reseau") || e.message === t("err_quota")) arretDemande = true;
      }
      faits++;
      leds(faits / taches.length);
    }
  }
  await Promise.all(Array.from({ length: SIMULTANES }, ouvrier));
  await new Promise((r) => setTimeout(r, 800));   // la dernière led reste visible
  leds(0); dire("");
  return { fichiers: fichiers.filter(Boolean), echecs };
}

function verrouiller(oui) {
  occupe = oui;
  $("#btn-go").disabled = oui;
}

async function letsGo() {
  if (occupe) return message(t("msg_occupe"));
  if (!lignes.some((l) => l.coche)) return message(t("msg_rien_coche"));
  const { taches, refuses } = tachesCochees();
  if (!taches.length) return message(t("msg_aucune_valide"));
  verrouiller(true);
  try {
    await serveurPret();
    const { fichiers, echecs } = await fabriquer(taches, voixChoisie(), reglages.robot, reglages.niveau, "generation");
    noterEvenement({ type: "generation", nombre: fichiers.length });
    await livrer("Vox-Pack", fichiers, [...refuses, ...echecs], taches.length + refuses.length,
      t("msg_succes", { n: fichiers.length, s: pluriel(fichiers.length), dossier: "Vox-Pack",
                        langue: dossierSd() }));
  } finally {
    verrouiller(false);
  }
}

// Langues dont OpenTX 2.3 fournit la liste SYSTEM (web/sons_opentx.json)
const LANGUES_OPENTX = new Set(["fr", "en", "de", "it", "es", "pt", "cs"]);

async function sonsSysteme(firmware) {
  if (occupe) return message(t("msg_occupe"));
  const opentx = firmware === "opentx";
  verrouiller(true);
  try {
    await serveurPret();
    dire(t("etat_csv"));
    let liste;
    try {
      const r = await fetch(API + "/api/sons-systeme/" + reglages.langue + (opentx ? "?firmware=opentx" : ""));
      if (!r.ok) throw new Error(r.status);
      liste = (await r.json()).lignes;
    } catch (e) {
      dire("");
      return message(t("msg_csv_echec", { err: t("err_reseau") }));
    }
    dire("");
    const robot = reglages.robot;
    const texte = t("msg_systeme", {
      n: liste.length, voix: robot === 4 ? VOIX_HAL[reglages.langue] : libelleVoixChoisie(),
      robot: robot ? t("msg_systeme_robot", { robot: nomRobot(robot) }) : "" });
    const ok = await message(opentx ? texte.replaceAll("EdgeTX", "OpenTX") : texte,
      [[t("btn_creer"), true, true], [t("annuler"), false]]);
    if (!ok) return;
    const go = $("#btn-go");
    const texteGo = go.textContent;
    go.disabled = false; go.textContent = t("arreter_court");
    go.onclick = () => { arretDemande = true; dire(t("etat_arret")); };
    let res;
    try { res = await fabriquer(liste, voixChoisie(), robot, reglages.niveau, "systeme"); }
    finally { go.textContent = texteGo; go.onclick = letsGo; go.disabled = true; }
    noterEvenement({ type: "systeme", nombre: res.fichiers.length });
    await livrer("SYSTEM", res.fichiers, res.echecs, liste.length,
      t("msg_systeme_ok", { n: res.fichiers.length, langue: dossierSd() }));
  } finally {
    verrouiller(false);
  }
}

/** Statistiques : ce que seul le navigateur sait (jamais bloquant). */
function noterEvenement(donnees) {
  if (sansStats) return;
  try {
    fetch(API + "/api/evenement", {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign(
        { voix: voixChoisie(), robot: reglages.robot, langue: reglages.langue }, donnees)),
    }).catch(() => {});
  } catch {}
}

// Une liste enregistrée au chargement : ce navigateur est déjà venu. S'il n'a pas
// encore « vp_utilisateur », il fait partie des visiteurs repris dans « cumuls ».
const dejaVenu = (() => {
  try { return Object.keys(localStorage).some((c) => c.startsWith("vp_liste_")); }
  catch { return false; }
})();

/** Compte ce navigateur une seule fois, à sa toute première visite. */
function noterUtilisateur() {
  if (sansStats) return;
  try {
    if (localStorage.getItem("vp_utilisateur")) return;
    localStorage.setItem("vp_utilisateur", "1");
  } catch { return; }
  if (!dejaVenu) noterEvenement({ type: "utilisateur" });
}

// Clics sur les liens externes (Ko-fi, GitHub Sponsors, autres projets, GitHub).
const LIENS = [
  [/^https:\/\/ko-fi\.com\//, "kofi"],
  [/^https:\/\/github\.com\/sponsors\/tguillaume02/, "sponsors"],
  [/^https:\/\/tguillaume02\.github\.io\/?$/, "projets"],
  [/^https:\/\/github\.com\/tguillaume02\//, "tguillaume02"],
  [/^https:\/\/github\.com\/ritchy-lab\//, "ritchy-lab"],
];
function clicLien(e) {
  if (e.type === "auxclick" && e.button !== 1) return;
  const a = e.target.closest && e.target.closest("a[href]");
  const lien = a && LIENS.find(([motif]) => motif.test(a.href));
  if (lien) noterEvenement({ type: "lien", usage: lien[1] });
}
document.addEventListener("click", clicLien);
document.addEventListener("auxclick", clicLien);

/** Bilan, puis zip ou écriture dans un dossier. */
async function livrer(dossier, fichiers, echecs, total, texteSucces) {
  let texte;
  if (echecs.length) {
    let detail = echecs.slice(0, 6).map(([n, r]) => `• ${n} : ${r}`).join("\n");
    if (echecs.length > 6) detail += "\n" + t("msg_autres", { n: echecs.length - 6 });
    texte = t("msg_bilan", { ok: fichiers.length, s1: pluriel(fichiers.length), total,
                             pb: echecs.length, s2: pluriel(echecs.length), detail });
  } else {
    texte = texteSucces;
  }
  if (!fichiers.length) return message(texte);
  // Petit rappel GitHub sous le bilan ; le texte (noms de fichiers) est échappé.
  const echappe = Object.assign(document.createElement("div"), { textContent: texte }).innerHTML;
  const html = echappe + `<p class="dlg-star">${t("msg_star")}</p>`;
  const boutons = [[t("btn_zip"), "zip", true]];
  if (window.showDirectoryPicker) boutons.push([t("btn_dossier"), "dossier"]);
  boutons.push([t("fermer"), null]);
  // Le dialogue reste ouvert tant qu'on n'a pas fermé : on peut prendre les deux.
  for (;;) {
    const choix = await message(html, boutons, true);
    if (choix === "zip") {
      await telechargerZip(dossier, fichiers);
      noterEvenement({ type: "telechargement", mode: "zip", nombre: fichiers.length });
    } else if (choix === "dossier") {
      if (await ecrireDossier(dossier, fichiers)) {
        noterEvenement({ type: "telechargement", mode: "dossier", nombre: fichiers.length });
        return;
      }
    }
    else return;
  }
}

async function telechargerZip(dossier, fichiers) {
  dire(t("etat_zip"));
  const zip = new JSZip();
  const rep = zip.folder(dossier);
  for (const [nom, blob] of fichiers) rep.file(nom + ".wav", blob);
  const contenu = await zip.generateAsync({ type: "blob" });
  telecharger(contenu, dossier + ".zip");
  dire("");
}

async function ecrireDossier(dossier, fichiers) {
  let racine;
  try { racine = await window.showDirectoryPicker({ mode: "readwrite", id: "voxpack" }); }
  catch { return false; }                                    // annulé
  try {
    // Si l'utilisateur a choisi le dossier lui-même, on n'en crée pas un second dedans.
    const cible = racine.name === dossier ? racine
      : await racine.getDirectoryHandle(dossier, { create: true });
    for (const [nom, blob] of fichiers) {
      const f = await cible.getFileHandle(nom + ".wav", { create: true });
      const w = await f.createWritable();
      await w.write(blob); await w.close();
    }
    await message(t("msg_dossier_ok", { dossier: racine.name === dossier ? dossier : racine.name + "/" + dossier }));
    return true;
  } catch (e) {
    await message(t("msg_dossier_echec", { err: e.message || e }));
    return false;
  }
}

function telecharger(blob, nom) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nom;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

// ------------------------------------------------------------------
// Import / export
// ------------------------------------------------------------------
function lireCsv(texte) {
  const premiere = texte.split(/\r?\n/).find((l) => l.trim()) || "";
  const sep = (premiere.split(";").length > premiere.split(",").length) ? ";" : ",";
  const rangs = []; let rang = [], champ = "", guillemets = false;
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i];
    if (guillemets) {
      if (c === '"' && texte[i + 1] === '"') { champ += '"'; i++; }
      else if (c === '"') guillemets = false;
      else champ += c;
    } else if (c === '"') guillemets = true;
    else if (c === sep) { rang.push(champ); champ = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && texte[i + 1] === "\n") i++;
      rang.push(champ); rangs.push(rang); rang = []; champ = "";
    } else champ += c;
  }
  if (champ || rang.length) { rang.push(champ); rangs.push(rang); }
  return rangs.filter((r) => r.some((c) => c.trim()));
}

function exporter() {
  const q = (s) => /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  const contenu = [[t("entete_nom"), t("entete_phrase")],
    ...lignes.map((l) => [l.nom.trim(), l.phrase.trim()])]
    .map((r) => r.map(q).join(",")).join("\r\n") + "\r\n";
  telecharger(new Blob([contenu], { type: "text/csv;charset=utf-8" }), t("nom_export"));
}

async function importer(fichier) {
  let brut;
  try { brut = lireCsv((await fichier.text()).replace(/^﻿/, "")); }
  catch (e) { return message(String(e)); }
  const entete = brut.length ? brut[0].map((c) => c.trim().toLowerCase()) : [];
  let paires;
  if (["translation", "filename"].every((c) => entete.includes(c))) {
    // CSV officiel EdgeTX (edgetx-sdcard-sounds) : SYSTEM et sons racine
    const iPhrase = entete.indexOf("translation"), iNom = entete.indexOf("filename");
    const vus = new Set();
    paires = brut.slice(1).map((m) => [(m[iNom] || "").trim().replace(/\.wav$/i, ""), (m[iPhrase] || "").trim()])
      .filter(([nom, phrase]) => nom && phrase && !vus.has(nom.toLowerCase()) && vus.add(nom.toLowerCase()));
  } else {
    if (brut.length && ["nom", "name", "fichier", "file"].includes(entete[0])) brut = brut.slice(1);
    paires = brut.map((m) => [m[0].trim(), (m.length > 1 ? m[1] : m[0]).trim()]);
  }
  if (!paires.length) return message(t("msg_import_vide"));
  const ok = await message(t("msg_import_confirmer", {
    avant: lignes.length, s1: pluriel(lignes.length), apres: paires.length, s2: pluriel(paires.length) }),
    [[t("oui"), true, true], [t("annuler"), false]]);
  if (!ok) return;
  lignes = paires.map(([nom, phrase]) => ({ nom, phrase, coche: false }));
  ancre = null; dessinerListe(); sauverListe();
  $("#lignes").scrollTop = 0;
  message(t("msg_import_ok", { n: paires.length, s: pluriel(paires.length) }));
}

async function listeDefaut() {
  const defaut = LISTE_PAR_DEFAUT[reglages.langue];
  const ok = await message(t("msg_defaut", { n: defaut.length, langue: t("adjectif_" + reglages.langue) }),
    [[t("oui"), true, true], [t("annuler"), false]]);
  if (!ok) return;
  stock.ecrire("vp_liste_" + reglages.langue, null);
  try { localStorage.removeItem("vp_liste_" + reglages.langue); } catch {}
  chargerListe();
}

// ------------------------------------------------------------------
// Langue
// ------------------------------------------------------------------
function appliquerLangue() {
  document.documentElement.lang = reglages.langue;
  document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
  $("#col-nom").textContent = t("colonne_nom", { max: LIMITE_NOM });
  const libSysteme = t("menu_sons_systeme").replace(/…$/, "");
  $("#menu-systeme-edgetx").textContent = libSysteme + " (EdgeTX)…";
  $("#menu-systeme-opentx").textContent = libSysteme + " (OpenTX)…";
  $("#menu-systeme-opentx").hidden = !LANGUES_OPENTX.has(reglages.langue);
  const zone = $("#menu-langues");
  if (!zone.children.length) {
    for (const [code, nom] of LANGUES) {
      const b = document.createElement("button");
      b.dataset.action = "langue-" + code; b.lang = code; b.textContent = nom;
      zone.appendChild(b);
    }
  }
  document.querySelectorAll("[data-action^=langue-]").forEach((b) =>
    b.classList.toggle("actif", b.dataset.action === "langue-" + reglages.langue));
  boutonEcouter(false);
  majRobot();
  remplirVoix();
  remplirNiveaux();
  majCompteurs();
}

function changerLangue(code) {
  if (code === reglages.langue) return;
  apercuNo++; arreterLecture();
  sauverListe();
  clearTimeout(minuteurSauvegarde);
  stock.ecrire("vp_liste_" + reglages.langue,
    lignes.filter((l) => l.nom.trim() || l.phrase.trim())
      .map((l) => [l.nom.trim(), l.phrase.trim(), l.coche ? 1 : 0]));
  reglages.langue = code; sauverReglages();
  appliquerLangue();
  chargerListe();
}

// ------------------------------------------------------------------
// Dialogue
// ------------------------------------------------------------------
/** boutons : [[libellé, valeur, principal?]] — renvoie la valeur choisie. */
function message(texte, boutons = null, html = false) {
  const dlg = $("#dialogue");
  const zone = $("#dlg-texte");
  if (html) zone.innerHTML = texte; else zone.textContent = texte;
  const bz = $("#dlg-boutons");
  bz.textContent = "";
  boutons = boutons || [[t("fermer"), undefined, true]];
  return new Promise((resolve) => {
    let valeur = null;
    for (const [lib, val, principal] of boutons) {
      const b = document.createElement("button");
      b.className = "btn" + (principal ? " principal" : "");
      b.textContent = lib;
      b.onclick = () => { valeur = val; dlg.close(); };
      bz.appendChild(b);
    }
    dlg.onclose = () => resolve(valeur);
    if (dlg.open) dlg.close();
    dlg.showModal();
    bz.querySelector(".principal")?.focus();
  });
}

// ------------------------------------------------------------------
// Démarrage
// ------------------------------------------------------------------
function brancher() {
  $("#btn-ajouter").onclick = ajouterLigne;
  $("#btn-supprimer").onclick = supprimerSelection;
  $("#btn-tout").onclick = () => toutCocher(true);
  $("#btn-rien").onclick = () => toutCocher(false);
  $("#btn-go").onclick = letsGo;
  $("#btn-aide").onclick = () => message(t("aide"), null, true);
  $("#voix").onchange = () => { reglages.voix[reglages.langue] = voixChoisie(); sauverReglages(); };
  $("#niveau").onchange = (e) => {
    reglages.niveauManuel = e.target.value === "manuel";
    if (!reglages.niveauManuel) reglages.niveau = Number(e.target.value);
    sauverReglages(); majCurseur();
  };
  $("#curseur").oninput = (e) => { reglages.niveau = Number(e.target.value); majCurseur(); };
  $("#curseur").onchange = sauverReglages;

  document.querySelectorAll(".pastille").forEach((b) => {
    const n = Number(b.dataset.robot);
    b.onclick = () => { reglages.robot = reglages.robot === n ? 0 : n; sauverReglages(); majRobot(); };
    b.onmouseenter = () => majRobot(n);
    b.onmouseleave = () => majRobot();
  });

  const menu = $("#menu"), bm = $("#btn-menu");
  const fermerMenu = () => { menu.hidden = true; bm.setAttribute("aria-expanded", "false"); };
  bm.onclick = (e) => { e.stopPropagation(); menu.hidden = !menu.hidden; bm.setAttribute("aria-expanded", String(!menu.hidden)); };
  document.addEventListener("click", (e) => { if (!menu.contains(e.target)) fermerMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fermerMenu(); });
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("button")?.dataset.action;
    if (!a) return;
    fermerMenu();
    if (a === "exporter") exporter();
    else if (a === "importer") $("#fichier-import").click();
    else if (a === "defaut") listeDefaut();
    else if (a === "systeme-edgetx") sonsSysteme("edgetx");
    else if (a === "systeme-opentx") sonsSysteme("opentx");
    else if (a.startsWith("langue-")) changerLangue(a.slice(7));
  });
  $("#fichier-import").onchange = (e) => {
    const f = e.target.files[0];
    e.target.value = "";
    if (f) importer(f);
  };
}

initLeds();
brancher();
appliquerLangue();
chargerListe();
verifierVoix();
