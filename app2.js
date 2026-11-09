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
  $("#destination").textContent = n ? "→ SOUNDS/" + dossierSd() + "/Vox-Pack" : "";
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
  detail.textContent = coupe < 0 ? "" : colNom.slice(coupe).trim();
  $("#col-nom").replaceChildren(coupe < 0 ? colNom : colNom.slice(0, coupe), detail);
  majCoches();
};

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
  brancherMenu($("#btn-soutenir"), $("#menu-soutenir"));
  // Le bouton « Fichiers » (#btn-menu) est géré par app.js ; il doit fermer les autres menus.
  $("#btn-menu").addEventListener("click", () => {
    $("#menu-langue").hidden = true; $("#menu-soutenir").hidden = true;
  });

  $("#btn-theme").onclick = basculerTheme;

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
