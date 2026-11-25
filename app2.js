// Vox-Pack-Web — compléments de l'interface (index.html).
// Se charge après app.js, sans le modifier : réutilise ses fonctions et variables
// globales (lignes, t, synthese, jouer…) et en enveloppe quelques-unes.

// Textes propres à cette interface ; les langues absentes prennent l'anglais.
const TEXTES2 = {
  fr: { fichiers: "Fichiers", soutenir: "Soutenir", voix: "Voix", effet: "Effet", annonces: "Annonces",
        rechercher: "Rechercher (train, chrono…)", coches: "{n} cochée{s} sur {total}",
        aucun: "Aucune annonce ne correspond.", ecouter_ligne: "Écouter cette ligne",
        supprimer_ligne: "Supprimer cette ligne", exemple: "Écouter un exemple de la voix",
        tout_cocher: "Tout cocher / décocher", indice: "Coche les annonces à créer",
        supprimee: "« {nom} » supprimée",
        theme_clair: "Passer en thème clair", theme_sombre: "Passer en thème sombre" },
  en: { fichiers: "Files", soutenir: "Support", voix: "Voice", effet: "Effect", annonces: "Announcements",
        rechercher: "Search (gear, timer…)", coches: "{n} of {total} selected",
        aucun: "No announcement matches.", ecouter_ligne: "Play this line",
        supprimer_ligne: "Delete this line", exemple: "Play a sample of the voice",
        tout_cocher: "Select / deselect all", indice: "Tick the announcements to create",
        supprimee: "“{nom}” deleted",
        theme_clair: "Switch to light theme", theme_sombre: "Switch to dark theme" },
};
// Textes du choix de la radio, fusionnés dans TEXTES d'app.js (lus par t()).
// msg_prets + consigne_* remplacent msg_succes pour Ethos, Jeti et Graupner.
const TEXTES_RADIO = {
  fr: { radio: "Radio", radio_note: "Ethos, Jeti et Graupner : format pas encore vérifié sur une vraie radio.",
        msg_prets: "Vos voix sont prêtes !\n\n{n} fichier{s} WAV (16 bits, {khz} kHz, mono).",
        consigne_copie: "Copie-les sur la carte SD de la radio, dans {chemin}.",
        consigne_graupner: "Importe-les comme annonces utilisateur (User Voice) avec le logiciel Firmware_Upgrade_grStudio de Graupner." },
  en: { radio: "Radio", radio_note: "Ethos, Jeti and Graupner: format not yet checked on a real radio.",
        msg_prets: "Your voices are ready!\n\n{n} WAV file{s} (16-bit, {khz} kHz, mono).",
        consigne_copie: "Copy them to the radio's SD card, into {chemin}.",
        consigne_graupner: "Import them as user announcements (User Voice) with Graupner's Firmware_Upgrade_grStudio software." },
  de: { radio: "Sender", radio_note: "Ethos, Jeti und Graupner: Format noch nicht an einem echten Sender geprüft.",
        msg_prets: "Ihre Stimmen sind fertig!\n\n{n} WAV-Datei(en) (16 Bit, {khz} kHz, mono).",
        consigne_copie: "Kopieren Sie sie auf die SD-Karte des Senders nach {chemin}.",
        consigne_graupner: "Importieren Sie sie als Benutzeransagen (User Voice) mit der Graupner-Software Firmware_Upgrade_grStudio." },
  it: { radio: "Radio", radio_note: "Ethos, Jeti e Graupner: formato non ancora verificato su una radio reale.",
        msg_prets: "Le tue voci sono pronte!\n\n{n} file WAV (16 bit, {khz} kHz, mono).",
        consigne_copie: "Copiali sulla scheda SD della radio, in {chemin}.",
        consigne_graupner: "Importali come annunci utente (User Voice) con il software Firmware_Upgrade_grStudio di Graupner." },
  es: { radio: "Emisora", radio_note: "Ethos, Jeti y Graupner: formato aún no comprobado en una emisora real.",
        msg_prets: "¡Tus voces están listas!\n\n{n} archivo(s) WAV (16 bits, {khz} kHz, mono).",
        consigne_copie: "Cópialos en la tarjeta SD de la emisora, dentro de {chemin}.",
        consigne_graupner: "Impórtalos como anuncios de usuario (User Voice) con el programa Firmware_Upgrade_grStudio de Graupner." },
  pt: { radio: "Rádio", radio_note: "Ethos, Jeti e Graupner: formato ainda não verificado num rádio real.",
        msg_prets: "Suas vozes estão prontas!\n\n{n} arquivo(s) WAV (16 bits, {khz} kHz, mono).",
        consigne_copie: "Copie-os para o cartão SD do rádio, em {chemin}.",
        consigne_graupner: "Importe-os como anúncios do usuário (User Voice) com o programa Firmware_Upgrade_grStudio da Graupner." },
  cs: { radio: "Vysílač", radio_note: "Ethos, Jeti a Graupner: formát zatím není ověřen na skutečném vysílači.",
        msg_prets: "Vaše hlasy jsou hotové!\n\nSouborů WAV: {n} (16 bitů, {khz} kHz, mono).",
        consigne_copie: "Zkopírujte je na SD kartu vysílače do {chemin}.",
        consigne_graupner: "Importujte je jako uživatelská hlášení (User Voice) programem Firmware_Upgrade_grStudio od Graupneru." },
  da: { radio: "Sender", radio_note: "Ethos, Jeti og Graupner: formatet er endnu ikke afprøvet på en rigtig sender.",
        msg_prets: "Dine stemmer er klar!\n\n{n} WAV-fil(er) (16 bit, {khz} kHz, mono).",
        consigne_copie: "Kopiér dem til senderens SD-kort, i {chemin}.",
        consigne_graupner: "Importér dem som brugermeddelelser (User Voice) med Graupners program Firmware_Upgrade_grStudio." },
  sv: { radio: "Sändare", radio_note: "Ethos, Jeti och Graupner: formatet är ännu inte provat på en riktig sändare.",
        msg_prets: "Dina röster är klara!\n\n{n} WAV-fil(er) (16 bitar, {khz} kHz, mono).",
        consigne_copie: "Kopiera dem till sändarens SD-kort, i {chemin}.",
        consigne_graupner: "Importera dem som användarmeddelanden (User Voice) med Graupners program Firmware_Upgrade_grStudio." },
  uk: { radio: "Апаратура", radio_note: "Ethos, Jeti і Graupner: формат ще не перевірено на справжній апаратурі.",
        msg_prets: "Ваші голоси готові!\n\nФайлів WAV: {n} (16 біт, {khz} кГц, моно).",
        consigne_copie: "Скопіюйте їх на SD-карту апаратури, у {chemin}.",
        consigne_graupner: "Імпортуйте їх як користувацькі оголошення (User Voice) програмою Firmware_Upgrade_grStudio від Graupner." },
  ja: { radio: "送信機", radio_note: "Ethos、Jeti、Graupner：実機での形式確認はまだです。",
        msg_prets: "音声ができました！\n\nWAV ファイル {n} 個（16 ビット、{khz} kHz、モノラル）。",
        consigne_copie: "送信機の SD カードの {chemin} にコピーしてください。",
        consigne_graupner: "Graupner の Firmware_Upgrade_grStudio でユーザー音声（User Voice）として取り込んでください。" },
  cn: { radio: "遥控器", radio_note: "Ethos、Jeti 和 Graupner：格式尚未在真机上验证。",
        msg_prets: "语音已生成！\n\n{n} 个 WAV 文件（16 位，{khz} kHz，单声道）。",
        consigne_copie: "请把它们复制到遥控器 SD 卡的 {chemin} 中。",
        consigne_graupner: "请用 Graupner 的 Firmware_Upgrade_grStudio 软件把它们导入为用户语音（User Voice）。" },
  tw: { radio: "遙控器", radio_note: "Ethos、Jeti 和 Graupner：格式尚未在實機上驗證。",
        msg_prets: "語音已產生！\n\n{n} 個 WAV 檔（16 位元，{khz} kHz，單聲道）。",
        consigne_copie: "請把它們複製到遙控器 SD 卡的 {chemin} 中。",
        consigne_graupner: "請用 Graupner 的 Firmware_Upgrade_grStudio 軟體把它們匯入為使用者語音（User Voice）。" },
};
// Aide : section « Radio » ([titre, intro, Ethos, Jeti, Graupner, sons SYSTEM]),
// puis message affiché quand on choisit Graupner (avant consigne_graupner).
const AIDE_RADIO = {
  fr: ["Radio", "Le bouton 📻 adapte les fichiers à ta radio :", "Ethos 1.5 ou plus récent", "8 caractères maximum",
       "à importer comme annonces utilisateur avec le logiciel Firmware_Upgrade_grStudio de Graupner, pas de copie directe sur la carte SD",
       "Les sons SYSTEM ne sont proposés que pour EdgeTX et OpenTX.",
       "Graupner HoTT : les fichiers ne se copient pas directement sur la carte SD de la radio. Après Let's Go :"],
  en: ["Radio", "The 📻 button adapts the files to your radio:", "Ethos 1.5 or later", "8 characters max",
       "import them as user announcements with Graupner's Firmware_Upgrade_grStudio software, no direct copy to the SD card",
       "SYSTEM sounds are only offered for EdgeTX and OpenTX.",
       "Graupner HoTT: the files are not copied straight to the radio's SD card. After Let's Go:"],
  de: ["Sender", "Die Taste 📻 passt die Dateien an Ihren Sender an:", "Ethos 1.5 oder neuer", "höchstens 8 Zeichen",
       "als Benutzeransagen mit der Graupner-Software Firmware_Upgrade_grStudio importieren, kein direktes Kopieren auf die SD-Karte",
       "SYSTEM-Ansagen gibt es nur für EdgeTX und OpenTX.",
       "Graupner HoTT: Die Dateien werden nicht direkt auf die SD-Karte des Senders kopiert. Nach Let's Go:"],
  it: ["Radio", "Il pulsante 📻 adatta i file alla tua radio:", "Ethos 1.5 o successivo", "8 caratteri al massimo",
       "da importare come annunci utente con il software Firmware_Upgrade_grStudio di Graupner, nessuna copia diretta sulla scheda SD",
       "I suoni SYSTEM sono proposti solo per EdgeTX e OpenTX.",
       "Graupner HoTT: i file non si copiano direttamente sulla scheda SD della radio. Dopo Let's Go:"],
  es: ["Emisora", "El botón 📻 adapta los archivos a tu emisora:", "Ethos 1.5 o posterior", "8 caracteres como máximo",
       "impórtalos como anuncios de usuario con el programa Firmware_Upgrade_grStudio de Graupner, sin copiarlos directamente a la tarjeta SD",
       "Los sonidos SYSTEM solo se ofrecen para EdgeTX y OpenTX.",
       "Graupner HoTT: los archivos no se copian directamente en la tarjeta SD de la emisora. Después de Let's Go:"],
  pt: ["Rádio", "O botão 📻 adapta os arquivos ao seu rádio:", "Ethos 1.5 ou mais recente", "8 caracteres no máximo",
       "importe-os como anúncios do usuário com o programa Firmware_Upgrade_grStudio da Graupner, sem cópia direta para o cartão SD",
       "Os sons SYSTEM só são oferecidos para EdgeTX e OpenTX.",
       "Graupner HoTT: os arquivos não são copiados diretamente para o cartão SD do rádio. Depois do Let's Go:"],
  cs: ["Vysílač", "Tlačítko 📻 přizpůsobí soubory vašemu vysílači:", "Ethos 1.5 nebo novější", "nejvýše 8 znaků",
       "importujte je jako uživatelská hlášení programem Firmware_Upgrade_grStudio od Graupneru, nekopírují se přímo na SD kartu",
       "Systémové zvuky SYSTEM jsou jen pro EdgeTX a OpenTX.",
       "Graupner HoTT: soubory se nekopírují přímo na SD kartu vysílače. Po Let's Go:"],
  da: ["Sender", "Knappen 📻 tilpasser filerne til din sender:", "Ethos 1.5 eller nyere", "højst 8 tegn",
       "importér dem som brugermeddelelser med Graupners program Firmware_Upgrade_grStudio, ingen direkte kopi til SD-kortet",
       "SYSTEM-lyde tilbydes kun til EdgeTX og OpenTX.",
       "Graupner HoTT: filerne kopieres ikke direkte til senderens SD-kort. Efter Let's Go:"],
  sv: ["Sändare", "Knappen 📻 anpassar filerna till din sändare:", "Ethos 1.5 eller senare", "högst 8 tecken",
       "importera dem som användarmeddelanden med Graupners program Firmware_Upgrade_grStudio, ingen direkt kopiering till SD-kortet",
       "SYSTEM-ljud erbjuds bara för EdgeTX och OpenTX.",
       "Graupner HoTT: filerna kopieras inte direkt till sändarens SD-kort. Efter Let's Go:"],
  uk: ["Апаратура", "Кнопка 📻 пристосовує файли до вашої апаратури:", "Ethos 1.5 або новіша", "не більше 8 символів",
       "імпортуйте їх як користувацькі оголошення програмою Firmware_Upgrade_grStudio від Graupner, без прямого копіювання на SD-карту",
       "Звуки SYSTEM доступні лише для EdgeTX і OpenTX.",
       "Graupner HoTT: файли не копіюються прямо на SD-карту апаратури. Після Let's Go:"],
  ja: ["送信機", "📻 ボタンでファイルを送信機に合わせます：", "Ethos 1.5 以降", "最大 8 文字",
       "Graupner の Firmware_Upgrade_grStudio でユーザー音声として取り込みます（SD カードへの直接コピーは不可）",
       "SYSTEM 音声は EdgeTX と OpenTX のみです。",
       "Graupner HoTT：ファイルは送信機の SD カードに直接コピーしません。Let's Go の後："],
  cn: ["遥控器", "📻 按钮会按你的遥控器调整文件：", "Ethos 1.5 或更高版本", "最多 8 个字符",
       "用 Graupner 的 Firmware_Upgrade_grStudio 软件导入为用户语音，不能直接复制到 SD 卡",
       "SYSTEM 系统语音仅适用于 EdgeTX 和 OpenTX。",
       "Graupner HoTT：文件不能直接复制到遥控器的 SD 卡。Let's Go 之后："],
  tw: ["遙控器", "📻 按鈕會依你的遙控器調整檔案：", "Ethos 1.5 或更新版本", "最多 8 個字元",
       "用 Graupner 的 Firmware_Upgrade_grStudio 軟體匯入為使用者語音，不能直接複製到 SD 卡",
       "SYSTEM 系統語音僅適用於 EdgeTX 和 OpenTX。",
       "Graupner HoTT：檔案不能直接複製到遙控器的 SD 卡。Let's Go 之後："],
};
for (const [code, a] of Object.entries(AIDE_RADIO)) TEXTES_RADIO[code].graupner_intro = a[6];

TEXTES_RADIO.hk = TEXTES_RADIO.tw;
AIDE_RADIO.hk = AIDE_RADIO.tw;
for (const [code, textes] of Object.entries(TEXTES_RADIO)) if (TEXTES[code]) Object.assign(TEXTES[code], textes);

/** Section « Radio » de l'aide, avec les dossiers de la langue en cours. */
function aideRadio() {
  const [titre, intro, ethos, jeti, graupner, systeme] = AIDE_RADIO[reglages.langue] || AIDE_RADIO.en;
  const loc = { cn: "zh-CN", tw: "zh-TW", hk: "zh-HK" }[reglages.langue] || reglages.langue;
  const khz = (taux) => (taux / 1000).toLocaleString(loc) + " kHz";
  const code = (s) => "<code>" + s + "</code>";
  return `<h3>📻 ${titre}</h3><p>${intro}</p><ul>`
    + `<li><b>EdgeTX / OpenTX</b> : WAV ${khz(RADIOS.edgetx.taux)} → ${code(RADIOS.edgetx.chemin() + "/Vox-Pack")}</li>`
    + `<li><b>FrSky Ethos</b> : WAV ${khz(RADIOS.ethos.taux)} → ${code(RADIOS.ethos.chemin())} (${ethos})</li>`
    + `<li><b>Jeti</b> : WAV ${khz(RADIOS.jeti.taux)} → ${code(RADIOS.jeti.chemin())} (${jeti})</li>`
    + `<li><b>Graupner HoTT</b> : WAV ${khz(RADIOS.graupner.taux)} → ${graupner}</li></ul>`
    + `<p>${systeme} ${t("radio_note")}</p>`;
}

/** Aide d'app.js, avec la section « Radio » glissée avant sa dernière rubrique. */
function afficherAide() {
  const aide = t("aide");
  const i = aide.lastIndexOf("<h3>");
  message(i < 0 ? aide + aideRadio() : aide.slice(0, i) + aideRadio() + aide.slice(i), null, true);
}

// Phrase lue par le bouton ▶ à côté du choix de la voix
const PHRASE_EXEMPLE = {
  fr: "Voici un exemple de phrase.",
  en: "Here is an example sentence.",
  de: "Hier ist ein Beispielsatz.",
  it: "Ecco una frase di esempio.",
  es: "Aquí tienes una frase de ejemplo.",
  pt: "Aqui está uma frase de exemplo.",
  cs: "Toto je ukázková věta.",
  da: "Her er en eksempelsætning.",
  sv: "Här är en exempelmening.",
  uk: "Ось приклад речення.",
  ja: "これは例文です。",
  cn: "这是一个例句。",
  tw: "這是一個例句。",
  hk: "呢個係一個例句。",
};

// Mention du pied de page (remplace « Portage web non officiel par » sur cette interface)
const VERSION_PAR = {
  fr: "Version web par", en: "Web version by", de: "Web-Version von", it: "Versione web di",
  es: "Versión web de", pt: "Versão web por", cs: "Webová verze od", da: "Webversion af",
  sv: "Webbversion av", uk: "Вебверсія від", ja: "Web 版：", cn: "网页版，作者",
  tw: "網頁版，作者", hk: "網頁版，作者",
};

const t2 = (cle, r = {}) => {
  let s = (TEXTES2[reglages.langue] || TEXTES2.en)[cle] ?? TEXTES2.en[cle] ?? cle;
  for (const [k, v] of Object.entries(r)) s = s.split("{" + k + "}").join(v);
  return s;
};

// ------------------------------------------------------------------
// Lignes : compteur de caractères, lecture et suppression par ligne
// ------------------------------------------------------------------
const creerLigneOrigine = creerLigne;
creerLigne = function (l, i) {
  const div = creerLigneOrigine(l, i);
  const nom = div.querySelector(".nom");
  const msg = div.querySelector(".msg");

  const champ = document.createElement("div");
  champ.className = "champ-nom";
  const compte = document.createElement("span");
  compte.className = "compte";
  const majCompte = () => {
    const n = nom.value.trim().length;
    compte.textContent = n + "/" + LIMITE_NOM;
    compte.classList.toggle("trop", n > LIMITE_NOM);
  };
  nom.addEventListener("input", majCompte);
  majCompte();
  nom.replaceWith(champ);
  champ.append(nom, compte);

  const actions = document.createElement("div");
  actions.className = "actions-ligne";
  const lire = document.createElement("button");
  lire.className = "ic"; lire.type = "button"; lire.textContent = "▶";
  lire.title = t2("ecouter_ligne"); lire.setAttribute("aria-label", t2("ecouter_ligne"));
  lire.onclick = () => jouerPhrase(l.phrase, lire);
  const suppr = document.createElement("button");
  suppr.className = "ic suppr"; suppr.type = "button"; suppr.textContent = "✕";
  suppr.title = t2("supprimer_ligne"); suppr.setAttribute("aria-label", t2("supprimer_ligne"));
  suppr.onclick = () => supprimerLigne(l);
  actions.append(lire, suppr);
  div.insertBefore(actions, msg);
  return div;
};

// ------------------------------------------------------------------
// Suppression d'une ligne, avec « Annuler » pendant quelques secondes
// ------------------------------------------------------------------
let minuteurToast = null;

function supprimerLigne(l) {
  const k = lignes.indexOf(l);
  if (k < 0) return;
  lignes.splice(k, 1);
  ancre = null;
  dessinerListe();
  sauverListe();
  const nom = l.nom.trim() || l.phrase.trim() || "—";
  $("#toast-texte").textContent = t2("supprimee", { nom });
  $("#toast-annuler").onclick = () => {
    lignes.splice(Math.min(k, lignes.length), 0, l);
    dessinerListe();
    sauverListe();
    cacherToast();
  };
  $("#toast").hidden = false;
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(cacherToast, 6000);
}

function cacherToast() {
  clearTimeout(minuteurToast);
  $("#toast").hidden = true;
}

// ------------------------------------------------------------------
// Lecture d'une seule phrase (ligne ou exemple de voix)
// ------------------------------------------------------------------
let lectureSeule = null;

async function jouerPhrase(phrase, bouton) {
  const enCours = lectureSeule;
  if (enCours) { enCours.arreter(); if (enCours.bouton === bouton) return; }
  phrase = (phrase || "").trim();
  if (!aDuTexte(phrase)) return;
  // Coupe aussi la lecture « Écouter » des lignes cochées
  apercuNo++; arreterLecture(); boutonEcouter(false);

  const ctrl = new AbortController();
  const texteBouton = bouton.textContent;
  const lecture = {
    bouton,
    arreter() {
      ctrl.abort(); arreterLecture();
      bouton.textContent = texteBouton; bouton.classList.remove("joue");
      if (lectureSeule === lecture) lectureSeule = null;
    },
  };
  lectureSeule = lecture;
  bouton.textContent = "■"; bouton.classList.add("joue");
  try {
    await serveurPret();
    const blob = await synthese(phrase, voixChoisie(), reglages.robot, reglages.niveau, ctrl.signal, "ecoute");
    if (lectureSeule !== lecture) return;
    await jouer(blob);
  } catch (e) {
    if (e.name !== "AbortError" && lectureSeule === lecture) message(e.message);
  } finally {
    if (lectureSeule === lecture) lecture.arreter();
  }
}

// ------------------------------------------------------------------
// Recherche
// ------------------------------------------------------------------
const sansAccent = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function filtrer() {
  const q = sansAccent($("#recherche").value.trim());
  let visibles = 0;
  [...$("#lignes").children].forEach((el, i) => {
    const l = lignes[i];
    const ok = !q || (l && sansAccent(l.nom + " " + l.phrase).includes(q));
    el.classList.toggle("cachee", !ok);
    if (ok) visibles++;
  });
  const aucun = $("#aucun-resultat");
  aucun.hidden = !(q && !visibles);
  aucun.textContent = t2("aucun");
}

/** Index des lignes visibles avec le filtre actuel. */
function indexVisibles() {
  return [...$("#lignes").children]
    .map((el, i) => (el.classList.contains("cachee") ? -1 : i))
    .filter((i) => i >= 0);
}

// ------------------------------------------------------------------
// Compteur de lignes cochées et case « tout » de l'en-tête
// ------------------------------------------------------------------
function majCoches() {
  const n = lignes.filter((l) => l.coche).length;
  const nb = $("#nb-coches");
  nb.textContent = n ? t2("coches", { n, s: pluriel(n), total: lignes.length }) : t2("indice");
  nb.classList.toggle("vide", !n);
  $("#destination").textContent = n ? "→ " + destinationRadio() : "";
  $("#btn-supprimer").hidden = !n;
  const vis = indexVisibles();
  const cochees = vis.filter((i) => lignes[i].coche).length;
  const tout = $("#case-tout");
  tout.checked = vis.length > 0 && cochees === vis.length;
  tout.indeterminate = cochees > 0 && cochees < vis.length;
}

// ------------------------------------------------------------------
// Enveloppes des fonctions d'app.js
// ------------------------------------------------------------------
const dessinerListeOrigine = dessinerListe;
dessinerListe = function () { dessinerListeOrigine(); filtrer(); majCoches(); };

const toutCocherOrigine = toutCocher;
toutCocher = function (etat) { toutCocherOrigine(etat); majCoches(); };

const ajouterLigneOrigine = ajouterLigne;
ajouterLigne = function () {
  if ($("#recherche").value) { $("#recherche").value = ""; filtrer(); }
  ajouterLigneOrigine();
  majCoches();
};

const majRobotOrigine = majRobot;
majRobot = function (survol = null) {
  majRobotOrigine(survol);
  $("#robot-0").classList.toggle("actif", !reglages.robot);
};

const appliquerLangueOrigine = appliquerLangue;
appliquerLangue = function () {
  appliquerLangueOrigine();
  document.querySelectorAll("[data-t2]").forEach((el) => (el.textContent = t2(el.dataset.t2)));
  $("#recherche").placeholder = t2("rechercher");
  $("#recherche").setAttribute("aria-label", t2("rechercher"));
  $("#case-tout").setAttribute("aria-label", t2("tout_cocher"));
  $("#btn-exemple").title = t2("exemple");
  $("#btn-exemple").setAttribute("aria-label", t2("exemple"));
  $("#code-langue").textContent = reglages.langue.toUpperCase();
  $("#robot-0").textContent = t("voix_normale");
  $("#version-par").textContent = VERSION_PAR[reglages.langue] || VERSION_PAR.en;
  majBoutonTheme();
  // Titre de colonne : le nom, puis les limites EdgeTX / OpenTX en plus petit dessous
  const colNom = t("colonne_nom", { max: LIMITE_NOM });
  const coupe = colNom.search(/\s*[(（]/);
  const detail = document.createElement("small");
  detail.className = "detail-col";
  // Les limites EdgeTX / OpenTX ne concernent que ces radios : ailleurs, juste le maximum.
  detail.textContent = coupe < 0 ? ""
    : reglages.radio === "edgetx" ? colNom.slice(coupe).trim() : "(max " + LIMITE_NOM + ")";
  $("#col-nom").replaceChildren(coupe < 0 ? colNom : colNom.slice(0, coupe), detail);
  majRadio();
  majCoches();
};

// ------------------------------------------------------------------
// Choix de la radio (EdgeTX / OpenTX, FrSky Ethos, Jeti, Graupner)
// ------------------------------------------------------------------
function majRadio() {
  $("#nom-radio").textContent = radioChoisie().court;
  const zone = $("#menu-radios");
  if (!zone.children.length) {
    for (const [code, r] of Object.entries(RADIOS)) {
      const b = document.createElement("button");
      b.dataset.radio = code; b.textContent = r.nom;
      zone.appendChild(b);
    }
  }
  zone.querySelectorAll("button").forEach((b) =>
    b.classList.toggle("actif", b.dataset.radio === reglages.radio));
}

function changerRadio(code) {
  if (!RADIOS[code] || code === reglages.radio) return;
  reglages.radio = code; sauverReglages();
  appliquerLangue();
  // Graupner : rien à copier sur la carte, tout passe par le logiciel de Graupner.
  if (code === "graupner") message(t("graupner_intro") + "\n\n" + t("consigne_graupner"));
}

// ------------------------------------------------------------------
// Thème sombre / clair (appliqué au chargement par le script de <head>)
// ------------------------------------------------------------------
function themeActuel() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function majBoutonTheme() {
  const clair = themeActuel() === "light";
  const b = $("#btn-theme");
  b.textContent = clair ? "☾" : "☀";
  const lib = t2(clair ? "theme_sombre" : "theme_clair");
  b.title = lib;
  b.setAttribute("aria-label", lib);
}

function basculerTheme() {
  const nouveau = themeActuel() === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nouveau);
  try { localStorage.setItem("vp_theme", nouveau); } catch {}
  majBoutonTheme();
}

// ------------------------------------------------------------------
// Branchements propres à l'interface 2
// ------------------------------------------------------------------
function brancherMenu(bouton, menu) {
  const fermer = () => { menu.hidden = true; bouton.setAttribute("aria-expanded", "false"); };
  bouton.addEventListener("click", (e) => {
    e.stopPropagation();
    const ouvrir = menu.hidden;
    document.dispatchEvent(new Event("click"));   // ferme les autres menus
    menu.hidden = !ouvrir;
    bouton.setAttribute("aria-expanded", String(ouvrir));
  });
  document.addEventListener("click", (e) => { if (!menu.contains(e.target)) fermer(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fermer(); });
  return fermer;
}

(function brancher2() {
  const fermerLangue = brancherMenu($("#btn-langue"), $("#menu-langue"));
  $("#menu-langue").addEventListener("click", (e) => {
    const a = e.target.closest("button")?.dataset.action;
    if (!a?.startsWith("langue-")) return;
    fermerLangue();
    changerLangue(a.slice(7));
  });
  const fermerRadio = brancherMenu($("#btn-radio"), $("#menu-radio"));
  $("#menu-radio").addEventListener("click", (e) => {
    const code = e.target.closest("button")?.dataset.radio;
    if (!code) return;
    fermerRadio();
    changerRadio(code);
  });
  brancherMenu($("#btn-soutenir"), $("#menu-soutenir"));
  // Le bouton « Fichiers » (#btn-menu) est géré par app.js ; il doit fermer les autres menus.
  $("#btn-menu").addEventListener("click", () => {
    $("#menu-langue").hidden = true; $("#menu-soutenir").hidden = true; $("#menu-radio").hidden = true;
  });

  $("#btn-theme").onclick = basculerTheme;
  $("#btn-aide").onclick = afficherAide;

  $("#robot-0").onclick = () => { reglages.robot = 0; sauverReglages(); majRobot(); };
  $("#robot-0").onmouseenter = () => majRobot(0);
  $("#robot-0").onmouseleave = () => majRobot();

  $("#btn-exemple").onclick = () =>
    jouerPhrase(PHRASE_EXEMPLE[reglages.langue] || PHRASE_EXEMPLE.en, $("#btn-exemple"));

  $("#recherche").addEventListener("input", () => { filtrer(); majCoches(); });

  $("#case-tout").addEventListener("change", (e) => {
    const etat = e.target.checked;
    if (!$("#recherche").value.trim()) return toutCocher(etat);
    // Avec une recherche, seules les lignes affichées sont (dé)cochées
    const cases = document.querySelectorAll("#lignes .case");
    for (const i of indexVisibles()) { lignes[i].coche = etat; cases[i].checked = etat; }
    sauverListe(); majCoches();
  });

  // Après le clic d'app.js sur une case (y compris Majuscule + clic)
  $("#lignes").addEventListener("click", (e) => { if (e.target.classList.contains("case")) majCoches(); });

  // app.js a déjà dessiné la liste et la langue : on refait la passe avec les enveloppes
  appliquerLangue();
  majRobot();
  dessinerListe();
})();
