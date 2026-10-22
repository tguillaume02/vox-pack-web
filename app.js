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
    colonne_nom: "Nom du fichier WAV (Max {max} car.)",
    colonne_phrase: "Phrase à prononcer par la radiocommande",
    genre_f: "Femme", genre_h: "Homme", genre_e: "Enfant",
    accent_france: "France", accent_suisse: "Suisse", accent_belgique: "Belgique",
    accent_quebec: "Québec", accent_usa: "USA", accent_uk: "Royaume-Uni",
    accent_irlande: "Irlande", voix_multilingue: "Multilingue",
    voix_normale: "Voix normale",
    niveau_m6: "🔉 Volume bas", niveau_0: "🔊 Volume normal",
    niveau_6: "🔊 Volume fort",
    niveau_manuel: "🎚️ Volume manuel…", niveau_curseur: "Volume",
    menu_exporter: "Exporter la liste…", menu_importer: "Importer une liste…",
    menu_defaut: "Charger la liste par défaut", menu_sons_systeme: "Créer les sons système…",
    menu_langue: "Langue",
    kofi: "☕ M'offrir un café", projets: "🔗 Mes autres projets", pub: "Publicité",
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
    adjectif_fr: "français", adjectif_en: "anglais",
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
<h3>2. Écris tes phrases</h3><p>À gauche le nom du fichier : 8 caractères au maximum, sans accent ni espace (lettres, chiffres, - et _). Sur un EdgeTX antérieur à 2.11, reste à 6 caractères pour être lu partout.</p>
<h3>3. Coche les lignes</h3><p>Clique une case, puis Majuscule + clic sur une autre pour cocher toute la plage. « Tout » et « Rien » cochent ou décochent tout.</p>
<h3>4. Écouter, puis Let's Go</h3><p>« Écouter » lit les lignes cochées. « Let's Go » fabrique les WAV (16 bits, 32 kHz, mono) et te les donne dans un zip — ou, sur Chrome et Edge, directement dans un dossier (même la carte SD). Copie-les dans SOUNDS/fr (ou SOUNDS/en).</p>
<h3>Voix de robot</h3><p>Les quatre pastilles transforment la voix : Robot 1 à 3 et HAL 9000. HAL 9000 impose sa propre voix, indépendamment du menu — une voix librement inspirée du film, pas la voix officielle. Reclique la pastille allumée pour revenir à la normale.</p>
<h3>Volume</h3><p>Le menu à côté de la voix règle le volume des fichiers. « Fort » compresse la voix pour qu'elle porte mieux sur le petit haut-parleur de la radio. « Volume manuel » affiche un curseur de −20 à +6 dB : au-delà, la voix perdrait en qualité. Pour un son nettement plus fort, monte le volume sur la radio (Radio Setup → Sound).</p>
<h3>Menu ☰</h3><p>Exporter / importer ta liste (CSV « nom,phrase » ou CSV officiel EdgeTX), recharger la liste par défaut, créer les sons SYSTEM officiels, changer de langue. Chaque langue garde sa propre liste, enregistrée dans ce navigateur.</p>
<h3>Confidentialité</h3><p>Les phrases sont envoyées au serveur Vox-Pack-Web, qui les fait synthétiser par le service vocal de Microsoft Edge.</p>
<p>Vox-Pack-Web est un outil indépendant, ni édité ni approuvé par l'équipe EdgeTX. <a href="https://ko-fi.com/thibaultguillaume" target="_blank" rel="noopener">M'offrir un café ☕</a> · <a href="https://tguillaume02.github.io/" target="_blank" rel="noopener">Mes autres projets</a></p
<p>L'outil te plaît ? Laisse une ⭐ au projet <a href="https://github.com/tguillaume02/vox-pack-web" target="_blank" rel="noopener">sur GitHub</a> (bouton « Star » en haut de la page, compte GitHub requis).</p>`,
  },
  en: {
    ajouter: "Add", supprimer: "Delete", ecouter: "Listen", arreter: "■  Stop",
    tout: "All", rien: "None", lets_go: "Let's Go",
    colonne_nom: "WAV file name (Max {max} char.)",
    colonne_phrase: "Phrase spoken by the radio",
    genre_f: "Female", genre_h: "Male", genre_e: "Child",
    accent_france: "France", accent_suisse: "Switzerland", accent_belgique: "Belgium",
    accent_quebec: "Quebec", accent_usa: "USA", accent_uk: "United Kingdom",
    accent_irlande: "Ireland", voix_multilingue: "Multilingual",
    voix_normale: "Normal voice",
    niveau_m6: "🔉 Low volume", niveau_0: "🔊 Normal volume",
    niveau_6: "🔊 Loud",
    niveau_manuel: "🎚️ Manual volume…", niveau_curseur: "Volume",
    menu_exporter: "Export list…", menu_importer: "Import list…",
    menu_defaut: "Load default list", menu_sons_systeme: "Create system sounds…",
    menu_langue: "Language",
    kofi: "☕ Buy me a coffee", projets: "🔗 My other projects", pub: "Advertisement",
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
    adjectif_fr: "French", adjectif_en: "English",
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
<h3>2. Write your phrases</h3><p>On the left, the file name: 8 characters max, no accents or spaces (letters, digits, - and _). On EdgeTX before 2.11, stay within 6 characters to be read everywhere.</p>
<h3>3. Tick the lines</h3><p>Click a box, then Shift + click another to tick the whole range. "All" and "None" tick or untick everything.</p>
<h3>4. Listen, then Let's Go</h3><p>"Listen" plays the ticked lines. "Let's Go" builds the WAV files (16-bit, 32 kHz, mono) and hands them to you as a zip — or, on Chrome and Edge, straight into a folder (even the SD card). Copy them to SOUNDS/en (or SOUNDS/fr).</p>
<h3>Robot voices</h3><p>The four dots transform the voice: Robot 1 to 3 and HAL 9000. HAL 9000 uses its own voice, regardless of the menu — freely inspired by the film, not the official voice. Click the lit dot again to go back to normal.</p>
<h3>Volume</h3><p>The menu next to the voice sets the volume of the files. "Loud" compresses the voice so it carries better on the radio's small speaker. "Manual volume" shows a slider from −20 to +6 dB: beyond that, the voice would lose quality. For a much louder sound, raise the volume on the radio (Radio Setup → Sound).</p>
<h3>Menu ☰</h3><p>Export / import your list (CSV "name,phrase" or official EdgeTX CSV), reload the default list, create the official SYSTEM sounds, switch language. Each language keeps its own list, saved in this browser.</p>
<h3>Privacy</h3><p>Phrases are sent to the Vox-Pack-Web server, which has them spoken by Microsoft Edge's online voice service.</p>
<p>Vox-Pack-Web is an independent tool, not made or endorsed by the EdgeTX team. <a href="https://ko-fi.com/thibaultguillaume" target="_blank" rel="noopener">Buy me a coffee ☕</a> · <a href="https://tguillaume02.github.io/" target="_blank" rel="noopener">My other projects</a></p
<p>Enjoying the tool? Give the project a ⭐ <a href="https://github.com/tguillaume02/vox-pack-web" target="_blank" rel="noopener">on GitHub</a> ("Star" button at the top of the page, GitHub account required).</p>`,
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
};
const OFFICIELLES = new Set(["fr-FR-DeniseNeural", "en-IE-EmilyNeural"]);

const LISTE_PAR_DEFAUT = {
  fr: [["mot-arme","Moteur armé"],["mot-off","Moteur coupé"],["V-decol","Volets de décollage"],["V-atter","Volets d'atterrissage"],["v-rentre","Volet rentré"],["train-so","Train sorti"],["train-re","Train rentré"],["chrono-d","Chrono démarré"],["chrono-a","Chrono arrêté"],["mv-norm","Mode normal"],["mv-grat","Mode thermique"],["mv-vite","Mode vitesse"],["mv-deco","Mode décollage"],["croc-act","Crocodiles activés"],["croc-des","Crocodiles coupés"],["crochet","Largage remorque"],["stab-off","Stabilisation désactivée"],["stab-act","Stabilisation activée"],["stab-aut","Stabilisation automatique"],["panique","Panique"],["gain-aug","Gain augmenté"],["gain-dim","Gain diminué"],["pv-atte","Mode atterrissage"],["accro","Mode acrobatique"],["aerofrei","Aérofreins"],["croisier","Croisière"],["decol","Décollage"],["atterro","Atterrissage"],["dr-hgh","Grand débattement"],["dr-med","Débattement moyen"],["dr-small","Petit débattement"],["flperon","Flapperon"],["lance","Lancer"],["lu-in","Lumières allumées"],["lu-out","Lumières éteintes"],["moyen","Moyen"],["eleve","Élevé"],["small","Petit"],["snap-fl","Snapflap"],["Stab-1","Stabilité un"],["Stab-2","Stabilité deux"],["TX-eleve","Taux élevé"],["TX-moyen","Taux moyen"],["TX-faibl","Taux faible"]],
  en: [["armed","Motor armed"],["disarmed","Motor disarmed"],["flaps-tk","Takeoff flaps"],["flap-ldg","Landing flaps"],["flap-up","Flaps up"],["gear-dn","Gear down"],["gear-up","Gear up"],["timer-on","Timer started"],["timr-off","Timer stopped"],["mode-nrm","Normal mode"],["mode-th","Thermal mode"],["mode-spd","Speed mode"],["mode-tko","Takeoff mode"],["crow-act","Crow enabled"],["crow-dis","Crow disabled"],["tow-drop","Tow released"],["stab-off","Stabilization off"],["stab-on","Stabilization on"],["stab-aut","Auto stabilization"],["panic","Panic"],["gain-up","Gain increased"],["gain-dn","Gain decreased"],["landing","Landing mode"],["acro","Acrobatic mode"],["airbrake","Airbrakes"],["cruise","Cruise"],["takeoff","Takeoff"],["land","Landing"],["rate-hi","High rates"],["rate-mid","Medium rates"],["rate-low","Low rates"],["flaperon","Flaperon"],["launch","Launch"],["lgt-on","Lights on"],["lgt-off","Lights off"],["medium","Medium"],["high","High"],["low","Low"],["snapflap","Snapflap"],["stab-1","Stability one"],["stab-2","Stability two"],["tx-hi","High rate"],["tx-mid","Medium rate"],["tx-lo","Low rate"]],
};

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
  { langue: (navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en",
    voix: {}, robot: 0, niveau: 0, niveauManuel: false },
  stock.lire("vp_reglages", {}));
let voixDispo = JSON.parse(JSON.stringify(VOIX_DEFAUT));
let lignes = [];               // [{nom, phrase, coche}]
let ancre = null;              // pour Majuscule + clic
let occupe = false;            // génération en cours
let arretDemande = false;
let apercuNo = 0;
let lectureEnCours = null;

const $ = (s) => document.querySelector(s);
const t = (cle, r = {}) => {
  let s = (TEXTES[reglages.langue] || TEXTES.fr)[cle] ?? TEXTES.fr[cle] ?? cle;
  for (const [k, v] of Object.entries(r)) s = s.split("{" + k + "}").join(v);
  return s;
};
const pluriel = (n) => (n > 1 ? "s" : "");
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
    else if (phrase) taches.push([nom, phrase]);
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
const VOIX_HAL = { fr: "Henri", en: "Christopher" };
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
  const textes = lignes.filter((l) => l.coche && l.phrase.trim())
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
                        langue: reglages.langue }));
  } finally {
    verrouiller(false);
  }
}

async function sonsSysteme() {
  if (occupe) return message(t("msg_occupe"));
  verrouiller(true);
  try {
    await serveurPret();
    dire(t("etat_csv"));
    let liste;
    try {
      const r = await fetch(API + "/api/sons-systeme/" + reglages.langue);
      if (!r.ok) throw new Error(r.status);
      liste = (await r.json()).lignes;
    } catch (e) {
      dire("");
      return message(t("msg_csv_echec", { err: t("err_reseau") }));
    }
    dire("");
    const robot = reglages.robot;
    const ok = await message(t("msg_systeme", {
      n: liste.length, voix: robot === 4 ? VOIX_HAL[reglages.langue] : libelleVoixChoisie(),
      robot: robot ? t("msg_systeme_robot", { robot: nomRobot(robot) }) : "" }),
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
      t("msg_systeme_ok", { n: res.fichiers.length, langue: reglages.langue }));
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

// Clics sur les liens externes (Ko-fi, autres projets, GitHub).
const LIENS = [
  [/^https:\/\/ko-fi\.com\//, "kofi"],
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
  document.querySelectorAll("[data-action^=langue-]").forEach((b) =>
    b.classList.toggle("actif", b.dataset.action === "langue-" + reglages.langue));
  boutonEcouter(false);
  majRobot();
  remplirVoix();
  remplirNiveaux();
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
    else if (a === "systeme") sonsSysteme();
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
