// Génère le site ZN Digital en français (racine) et en anglais (dossier en/) :
// node gen.js <dossier du site>
const fs = require("fs");
const path = require("path");
const { maquette, champsApercu, apercu } = require("./maquettes.js");
const { bandeau, rassurance, avantApres, comparatif, ensuite, barreMobile } = require("./extras.js");
const { illustration, iconiser } = require("./visuels.js");
const out = process.argv[2];

const BASE = "https://aymenzakaria66-bot.github.io/zndigital-site/";

const ZN = `<polygon points="7,0 191,0 130,71 7,71"/>
      <polygon points="212,0 286,0 286,63 72,325 0,325 0,264"/>
      <polygon points="155,254 282,254 282,325 94,325"/>
      <polygon points="328,32 422,185 422,325 328,325"/>
      <polygon points="328,0 442,0 640,325 525,325"/>
      <polygon points="546,0 640,0 640,293 546,139"/>`;

const FICHIERS = ["index.html", "presentation.html", "forfaits.html", "portfolio.html", "faq.html", "contact.html"];

const LANGUES = {
  fr: {
    html: "fr-CA", og: "fr_CA", prefixe: "", dossier: "",
    noms: ["Accueil", "Présentation", "Forfaits", "Réalisations", "FAQ", "Contact"],
    skip: "Aller au contenu", accueilAria: "ZN Digital, accueil", navAria: "Navigation principale",
    piedAria: "Pied de page", menu: "Menu", demo: "Obtenir ma démo gratuite",
    slogan: "ZN Digital, sites web professionnels pour entreprises locales.",
    pages: "Pages", joindre: "Nous joindre", langue: "Langue", region: "Grand Montréal",
    droits: "Tous droits réservés.",
    autre: { code: "en", court: "EN", aria: "English version", chemin: (f) => "en/" + f },
    vitrineAria: "Voir le site zkdetails.ca (nouvel onglet)",
    altOrdi: "Le site ZK Details sur ordinateur", altMobile: "Le même site sur cellulaire",
    ch: {
      aria: "Animation : un site web se construit dans une fenêtre de navigateur.",
      url: "votreentreprise.ca", logo: "Votre entreprise",
      titre: ["Votre site,", "prêt en quelques jours."], bouton: "Prendre rendez-vous",
      badge: "Votre démo est prête",
    },
  },
  en: {
    html: "en-CA", og: "en_CA", prefixe: "../", dossier: "en",
    noms: ["Home", "Our approach", "Pricing", "Our work", "FAQ", "Contact"],
    skip: "Skip to content", accueilAria: "ZN Digital, home", navAria: "Main navigation",
    piedAria: "Footer", menu: "Menu", demo: "Get my free demo",
    slogan: "ZN Digital, professional websites for local businesses.",
    pages: "Pages", joindre: "Contact us", langue: "Language", region: "Greater Montreal",
    droits: "All rights reserved.",
    autre: { code: "fr", court: "FR", aria: "Version française", chemin: (f) => "../" + f },
    vitrineAria: "Visit zkdetails.ca (new tab)",
    altOrdi: "The ZK Details website on a computer", altMobile: "The same website on a phone",
    ch: {
      aria: "Animation: a website builds itself in a browser window.",
      url: "yourbusiness.ca", logo: "Your business",
      titre: ["Your website,", "ready in a few days."], bouton: "Book now",
      badge: "Your demo is ready",
    },
  },
};

const fragment = (cote = "") =>
  `<svg class="fragment${cote ? " " + cote : ""}" viewBox="0 0 640 325" aria-hidden="true"><use href="#zn"/></svg>`;

const vitrine = (L) => `<a class="vitrine" href="https://zkdetails.ca" target="_blank" rel="noopener" aria-label="${L.vitrineAria}">
          <div class="ecran">
            <div class="ecran-barre" aria-hidden="true"><span></span><span></span><span></span><b>zkdetails.ca</b></div>
            <div class="ecran-vue">
              <div class="ecran-page">
                <img src="${L.prefixe}assets/zkdetails-ordi.jpg" alt="${L.altOrdi}" width="2880" height="1800" loading="lazy">
                <img src="${L.prefixe}assets/zkdetails-suite-1.jpg" alt="" width="2160" height="1350" loading="lazy">
                <img src="${L.prefixe}assets/zkdetails-suite-2.jpg" alt="" width="2160" height="1350" loading="lazy">
                <img src="${L.prefixe}assets/zkdetails-suite-3.jpg" alt="" width="2160" height="1350" loading="lazy">
                <img src="${L.prefixe}assets/zkdetails-suite-4.jpg" alt="" width="2160" height="1350" loading="lazy">
              </div>
            </div>
          </div>
          <div class="telephone">
            <img src="${L.prefixe}assets/zkdetails-mobile.jpg" alt="${L.altMobile}" width="1170" height="2532" loading="lazy">
          </div>
        </a>`;


/* Notre engagement : la garantie mise en avant */
const engagement = (fr) => `<div class="engagement">
          <p class="engagement-titre">${fr ? "Notre engagement" : "Our promise"}</p>
          <p>${fr ? "On prépare votre démo gratuitement. Si elle ne vous plaît pas, vous ne payez rien : aucun dépôt, aucun engagement."
                  : "We build your demo for free. If you don't like it, you pay nothing: no deposit, no commitment."}</p>
          <p>${fr ? "Vous payez 50&nbsp;% seulement quand vous l'acceptez." : "You only pay 50% once you approve it."}</p>
          <p class="engagement-signature"><svg viewBox="0 0 640 325" aria-hidden="true"><use href="#zn"/></svg>ZN Digital</p>
        </div>`;

/* Une pièce du logo ZN comme emblème de chaque page */
const PIECES = [
  { points: "7,0 191,0 130,71 7,71", vb: "7 0 184 71", forme: "large", d: "-80px,0px" },
  { points: "212,0 286,0 286,63 72,325 0,325 0,264", vb: "0 0 286 325", forme: "haute", d: "60px,-60px" },
  { points: "155,254 282,254 282,325 94,325", vb: "94 254 188 71", forme: "large", d: "80px,0px" },
  { points: "328,32 422,185 422,325 328,325", vb: "328 32 94 293", forme: "haute", d: "0px,80px" },
  { points: "328,0 442,0 640,325 525,325", vb: "328 0 312 325", forme: "haute", d: "-50px,-80px" },
  { points: "546,0 640,0 640,293 546,139", vb: "546 0 94 293", forme: "haute", d: "0px,-80px" },
];
const embleme = (n, classe = "") =>
  `<svg class="embleme logo-complet${classe ? " " + classe : ""}" viewBox="-15 -20 840 480" aria-hidden="true"><use href="#zn" width="640" height="325"/><rect x="718" y="-15" width="6" height="375"/><text transform="translate(805 357) rotate(-90)" font-size="60" textLength="357" lengthAdjust="spacing">DIGITAL</text><text x="-12" y="451" font-size="50" textLength="374" lengthAdjust="spacing">CREATION</text></svg>`;


/* Quiz « Quel forfait vous convient ? » (affiché seulement si JavaScript est actif) */
const quizForfaits = (fr) => {
  const question = (nom, legende, choix) => `<fieldset class="champ">
            <legend>${legende}</legend>
            <div class="choix">
              ${choix.map(([valeur, texte]) => `<label><input type="radio" name="${nom}" value="${valeur}"><span>${texte}</span></label>`).join("\n              ")}
            </div>
          </fieldset>`;
  const ouiNon = fr ? [["oui", "Oui"], ["non", "Non"]] : [["oui", "Yes"], ["non", "No"]];
  const noms = JSON.stringify({ essentiel: fr ? "Essentiel" : "Essential", pro: "Pro", complet: fr ? "Complet" : "Complete" });
  return `<div class="quiz" data-quiz hidden
          data-noms='${noms}'
          data-phrase="${fr ? "Notre suggestion : le forfait {plan}." : "Our suggestion: the {plan} package."}"
          data-attente="${fr ? "Répondez aux trois questions pour voir notre suggestion." : "Answer the three questions to see our suggestion."}">
          <p class="quiz-titre">${fr ? "Quel forfait vous convient&nbsp;?" : "Which package is right for you?"}</p>
          ${question("q1", fr ? "Combien de pages vous faut-il&nbsp;?" : "How many pages do you need?",
            fr ? [["1", "Une seule"], ["2", "2 à 5"], ["3", "Plus de 5"]] : [["1", "Just one"], ["2", "2 to 5"], ["3", "More than 5"]])}
          ${question("q2", fr ? "Voulez-vous modifier votre site vous-même&nbsp;?" : "Do you want to edit your website yourself?", ouiNon)}
          ${question("q3", fr ? "Voulez-vous montrer vos réalisations en photos&nbsp;?" : "Do you want to show your work in photos?", ouiNon)}
          <p class="quiz-resultat" aria-live="polite"></p>
        </div>`;
};

const url = (dossier, f) => BASE + (dossier ? dossier + "/" : "") + (f === "index.html" ? "" : f);

function page(L, { fichier, titre, description, corps, tete = "" }) {
  // Les sections alternent vert et crème ; le kaki foncé ne sert qu'aux textes et aux accents
  let rang = 0;
  corps = corps
    .replace(/class="bloc bloc-(?:sauge|os|encre)/g, () => `class="bloc bloc-${rang++ % 2 ? "os" : "sauge"}`)
    .replace(/bouton bouton-os/g, "bouton bouton-encre");
  // Sections mises en valeur en olive profond (étapes, expertise, hébergement, démos, « En bref »)
  // Palette crème et bronze : plus de sections foncées. Remettre les repères ci-dessous pour les réactiver.
  const reperes = []; // ['class="etapes"', 'class="raisons trois"', 'class="heberg"', 'class="secteurs"', 'class="suite"><a class="lien" href="presentation.html"']
  corps = corps.split("<section").map((morceau, i) =>
    i > 0 && reperes.some((r) => morceau.split("</section>")[0].includes(r))
      ? morceau.replace(/^ class="bloc /, ' class="bloc olive ')
      : morceau).join("<section");
  corps = iconiser(corps);
  const P = L.prefixe;
  const lien = (f, i) => `<a href="${f}"${f === fichier ? ' aria-current="page"' : ""}>${L.noms[i]}</a>`;
  const demo = (classe) => `<a class="bouton ${classe}" href="contact.html">${L.demo}</a>`;
  return `<!doctype html>
<html lang="${L.html}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titre}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${url(L.dossier, fichier)}">
  <link rel="alternate" hreflang="fr-CA" href="${url("", fichier)}">
  <link rel="alternate" hreflang="en-CA" href="${url("en", fichier)}">
  <link rel="alternate" hreflang="x-default" href="${url("", fichier)}">
  <meta property="og:title" content="${titre}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${L.og}">
  <meta name="theme-color" content="#E7E2D6">
  <link rel="icon" type="image/svg+xml" href="${P}assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${P}styles.css">
  <script>document.documentElement.classList.add("js");</script>${tete}
</head>
<body data-page="${fichier.replace(".html", "")}">
  <a class="skip" href="#contenu">${L.skip}</a>

  <svg width="0" height="0" class="defs" aria-hidden="true">
    <symbol id="zn" viewBox="0 0 640 325">
      ${ZN}
    </symbol>
  </svg>

  <header class="entete">
    <a class="marque" href="index.html" aria-label="${L.accueilAria}">
      <svg class="marque-zn" viewBox="0 0 640 325" aria-hidden="true"><use href="#zn"/></svg>
      <span class="marque-trait" aria-hidden="true"></span>
      <span class="marque-nom">Digital</span>
    </a>
    <nav class="nav" id="nav" aria-label="${L.navAria}">
      ${FICHIERS.map((f, i) => lien(f, i)).join("\n      ")}
      <a class="bouton bouton-encre nav-cta" href="contact.html">${L.demo}</a>
    </nav>
    <a class="langue" href="${L.autre.chemin(fichier)}" hreflang="${L.autre.code}" lang="${L.autre.code}" aria-label="${L.autre.aria}">${L.autre.court}</a>
    ${demo("bouton-encre entete-cta")}
    <button class="menu-bouton" type="button" aria-expanded="false" aria-controls="nav">
      ${L.menu}
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M7 0h2v7h7v2H9v7H7V9H0V7h7z"/></svg>
    </button>
  </header>

  <main id="contenu">
${corps}
  </main>

  ${barreMobile(L.html.startsWith("fr"))}
  <footer class="pied">
    <div class="contenant pied-grille">
      <div class="pied-marque">
        <svg viewBox="0 0 640 325" role="img" aria-label="ZN Digital"><use href="#zn"/></svg>
        <p>${L.slogan}</p>
      </div>
      <nav aria-label="${L.piedAria}">
        <p class="pied-titre">${L.pages}</p>
        <ul>
          ${FICHIERS.map((f, i) => `<li>${lien(f, i)}</li>`).join("\n          ")}
        </ul>
      </nav>
      <div>
        <p class="pied-titre">${L.joindre}</p>
        <ul>
          <li><a href="mailto:zndigitalcreation@gmail.com">zndigitalcreation@gmail.com</a></li>
          <li><a href="tel:+14387283615">438 728-3615</a></li>
          <li><a href="https://www.instagram.com/zndigitalcreation/" target="_blank" rel="noopener">Instagram</a></li>
          <li>${L.region}</li>
        </ul>
        <p class="pied-titre pied-langues-titre">${L.langue}</p>
        <p class="pied-langues">
          <a href="${L.dossier ? "../" : ""}${fichier}" hreflang="fr" lang="fr"${L.dossier ? "" : ' aria-current="true"'}>Français</a>
          <a href="${L.dossier ? "" : "en/"}${fichier}" hreflang="en" lang="en"${L.dossier ? ' aria-current="true"' : ""}>English</a>
        </p>
      </div>
      <p class="pied-bas">© <span id="annee">2026</span> ZN Digital. ${L.droits}</p>
    </div>
  </footer>

  <script src="${P}script.js"></script>
</body>
</html>
`;
}

const chantier = (L) => `<div class="chantier" role="img" aria-label="${L.ch.aria}">
          <div class="ch-fenetre">
            <div class="ch-barre"><span></span><span></span><span></span><b class="ch-url"><span style="--n:${L.ch.url.length}">${L.ch.url}</span></b></div>
            <div class="ch-site">
              <div class="ch-nav">
                <span class="ch-logo">${L.ch.logo}</span>
                <span class="ch-liens"><span></span><span></span><span></span></span>
                <span class="ch-nav-btn"></span>
              </div>
              <div class="ch-hero">
                <div>
                  <p class="ch-titre"><span>${L.ch.titre[0]}</span><span>${L.ch.titre[1]}</span></p>
                  <span class="ch-ligne"></span>
                  <span class="ch-ligne courte"></span>
                  <span class="ch-btn">${L.ch.bouton}</span>
                </div>
                <svg class="ch-image" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice">
                  <rect width="100" height="120" style="fill:var(--sauge)"/>
                  <circle cx="68" cy="32" r="17" style="fill:var(--os);opacity:.6"/>
                  <polygon points="0,120 0,64 62,120" style="fill:var(--encre-mi)"/>
                  <polygon points="24,120 100,46 100,120" style="fill:var(--encre)"/>
                </svg>
              </div>
              <div class="ch-cartes"><span></span><span></span><span></span></div>
            </div>
          </div>
          <p class="ch-badge"><svg viewBox="0 0 16 16"><path d="M6.2 11.6 2.4 7.8l1.4-1.4 2.4 2.4 6-6 1.4 1.4z"/></svg>${L.ch.badge}</p>
        </div>`;

const jsonLd = (description, region) => `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ZN Digital",
    "description": "${description}",
    "email": "zndigitalcreation@gmail.com",
    "telephone": "+1-438-728-3615",
    "areaServed": "${region}",
    "sameAs": ["https://www.instagram.com/zndigitalcreation/"]
  }
  </script>`;

const plan = (debut, nom, prix, ideal, items, id = "", badge = "") => `
          <li class="plan" data-plan="${id}" data-badge="${badge}">
            <h3>${nom}</h3>
            <p class="ideal">${ideal}</p>
            <p class="prix-plan"><small>${debut}</small>${prix}</p>
            <ul class="puces une">
              ${items.map((i) => `<li>${i}</li>`).join("\n              ")}
            </ul>
          </li>`;

const faqListe = (qr) => qr.map(([q, r]) => `<details>
            <summary>${q}</summary>
            <div class="reponse"><span class="avatar" aria-hidden="true"><svg viewBox="0 0 640 325"><use href="#zn"/></svg></span><p>${r}</p></div>
          </details>`).join("\n          ");

/* =====================================================================
   Contenu
   ===================================================================== */
function contenu(code) {
  const L = LANGUES[code];
  const demo = (classe = "bouton-encre") => `<a class="bouton ${classe}" href="contact.html">${L.demo}</a>`;
  const fr = code === "fr";

  /* ----------------------------------------------------------- Accueil */
  const accueil = {
    fichier: "index.html",
    titre: fr ? "ZN Digital | Création de sites web et marketing à Montréal"
              : "ZN Digital | Website Design and Marketing in Montreal",
    description: fr
      ? "ZN Digital accompagne les PME de Montréal dans la création de sites web, le référencement SEO, le branding et les réseaux sociaux. Demandez une soumission."
      : "ZN Digital helps Montreal small businesses with website design, SEO, branding and social media. Request a quote.",
    tete: jsonLd(fr ? "Création de sites web professionnels pour les entreprises du Grand Montréal."
                    : "Professional website design for businesses in Greater Montreal.", L.region),
    corps: `
    <section class="bloc bloc-sauge hero">
      <div class="contenant">
        <div>
          <h1>${fr ? "Votre entreprise mérite une présence numérique à la hauteur de son potentiel."
                   : "Your business deserves an online presence that matches its potential."}</h1>
          <p class="accroche">${fr ? "Un site web professionnel pour votre entreprise, sans aucun risque."
                                   : "A professional website for your business, with zero risk."}</p>
          <p class="chapo">${fr ? "On crée un aperçu de votre futur site gratuitement. Vous payez seulement si vous l'aimez."
                                : "We build a preview of your future website for free. You only pay if you like it."}</p>
          <div class="actions">
            ${demo()}
            <a class="lien" href="portfolio.html">${fr ? "Voir nos réalisations" : "See our work"}</a>
          </div>
          ${rassurance(fr)}
        </div>
        ${chantier(L)}
      </div>
      ${bandeau(fr)}
    </section>

    <section class="bloc bloc-os">
      <div class="contenant">
        <h2>${fr ? "Comment ça marche" : "How it works"}</h2>
        <ol class="etapes">
          <li>
            <h3>${fr ? "Parlez-nous de votre entreprise" : "Tell us about your business"}</h3>
            <p>${fr ? "Remplissez le formulaire. Ajoutez des photos de votre entreprise si vous en avez : elles nous aident à préparer une démo qui vous ressemble."
                    : "Fill out the form. Add photos of your business if you have some: they help us build a demo that feels like you."}</p>
          </li>
          <li>
            <h3>${fr ? "Recevez votre démo gratuite" : "Get your free demo"}</h3>
            <p>${fr ? "On vous montre un aperçu de votre futur site, sans frais et sans engagement."
                    : "We show you a preview of your future website, free and with no commitment."}</p>
          </li>
          <li>
            <h3>${fr ? "Vous l'aimez&nbsp;? On le termine" : "Like it? We finish it"}</h3>
            <p>${fr ? "On complète votre site, on le met en ligne et votre entreprise est visible sur le web."
                    : "We complete your website, put it online, and your business is visible on the web."}</p>
          </li>
        </ol>
        <div class="note">
          <h3>${fr ? "Vous avez déjà un site&nbsp;?" : "Already have a website?"}</h3>
          <p>${fr ? "Expliquez-nous ce qui ne va plus : manque de visibilité, image à rafraîchir, changement d'image de marque. On fait un audit gratuit de votre site actuel et on vous propose nos recommandations."
                  : "Tell us what isn't working anymore: low visibility, a dated look, a rebrand. We audit your current website for free and send you our recommendations."}</p>
        </div>
      </div>
    </section>

${avantApres(fr)}
    <section class="bloc bloc-encre inverse">
      ${fragment()}
      <div class="contenant deux">
        <h2>${fr ? "En bref" : "At a glance"}</h2>
        ${illustration("scene")}
        <div>
          <ul class="puces">
            ${(fr ? [
              "Site bilingue français et anglais",
              "Adapté aux cellulaires, ordinateurs et tablettes",
              "Nom de domaine inclus la première année, selon le forfait",
              "Votre site vous appartient, selon le forfait",
            ] : [
              "Bilingual website in French and English",
              "Works on phones, computers and tablets",
              "Domain name included for the first year, depending on the package",
              "Your website belongs to you, depending on the package",
            ]).map((i) => `<li>${i}</li>`).join("\n            ")}
          </ul>
          <p class="suite"><a class="lien" href="presentation.html">${fr ? "En savoir plus sur notre approche" : "Learn more about our approach"}</a></p>
        </div>
      </div>
    </section>

    <section class="bloc bloc-sauge">
      <div class="contenant">
        <h2>${fr ? "Nos réalisations" : "Our work"}</h2>
        <p class="intro">${fr ? "Des sites que nous avons conçus et mis en ligne." : "Websites we've designed and launched."}</p>
        ${vitrine(L)}
        <ul class="projets">
          <li><a class="domaine" href="https://zkdetails.ca" target="_blank" rel="noopener">zkdetails.ca</a><span>${fr ? "ZK Details, esthétique automobile mobile à La Prairie" : "ZK Details, mobile car detailing in La Prairie"}</span></li>
          <li><span class="domaine">bynafsi.ca</span><span class="attente">${fr ? "Portfolio Nafsi. Mise en ligne prochainement." : "Nafsi portfolio. Launching soon."}</span></li>
        </ul>
        <p class="suite"><a class="lien" href="portfolio.html">${fr ? "Voir nos réalisations" : "See our work"}</a></p>
      </div>
    </section>

    <section class="bloc bloc-os inverse prix">
      <div class="contenant">
        <div>
          <h2>${fr ? "Des sites professionnels à partir de 500&nbsp;$." : "Professional websites starting at $500."}</h2>
          <p class="suite"><a class="lien" href="forfaits.html">${fr ? "Voir les forfaits" : "See pricing"}</a></p>
        </div>
        ${engagement(fr)}
      </div>
    </section>

    <section class="bloc bloc-encre appel">
      ${fragment("gauche")}
      <div class="contenant">
        ${embleme(5, "sur-encre")}
        <h2>${fr ? "Prêt à voir votre futur site&nbsp;?" : "Ready to see your future website?"}</h2>
        <p>${fr ? "La démo est gratuite et sans engagement." : "The demo is free, with no commitment."}</p>
        ${demo("bouton-os")}
      </div>
    </section>`,
  };

  /* ----------------------------------------------------------- Présentation */
  const presentation = {
    fichier: "presentation.html",
    titre: fr ? "Notre approche | ZN Digital" : "Our Approach | ZN Digital",
    description: fr
      ? "Essayez avant d'acheter : ZN Digital vous montre gratuitement un aperçu de votre futur site. Équipe locale de la Rive-Sud, démo en quelques jours, prix accessibles."
      : "Try before you buy: ZN Digital shows you a free preview of your future website. Local South Shore team, demo in a few days, affordable prices.",
    corps: `
    <section class="bloc bloc-sauge tete">
      <div class="contenant">
        ${embleme(0)}
        <h1>${fr ? "Votre entreprise mérite d'être trouvée en ligne." : "Your business deserves to be found online."}</h1>
        <p class="chapo">${fr ? "Aujourd'hui, la majorité de vos clients vous cherchent sur Google avant de vous appeler. Sans site professionnel, ils choisissent quelqu'un d'autre."
                              : "Today, most of your customers look you up on Google before they call. Without a professional website, they choose someone else."}</p>
      </div>
    </section>

    <section class="bloc bloc-os">
      <div class="contenant deux">
        <h2>${fr ? "Notre approche" : "Our approach"}</h2>
        ${illustration("feuilles")}
        <div class="texte">
          <h3>${fr ? "Essayez avant d'acheter" : "Try before you buy"}</h3>
          <p>${fr ? "La plupart des agences vous demandent de payer avant de voir quoi que ce soit. Nous, on fait l'inverse : on vous montre d'abord un aperçu de votre site, gratuitement. Vous décidez ensuite."
                  : "Most agencies ask you to pay before you see anything. We do the opposite: we show you a preview of your website first, for free. Then you decide."}</p>
          <p>${fr ? "Domaine, hébergement, mise en ligne, sécurité : on s'occupe de tout. Vous n'avez rien de technique à gérer."
                  : "Domain, hosting, launch, security: we take care of everything. There's nothing technical for you to manage."}</p>
        </div>
      </div>
    </section>

${comparatif(fr)}
    <section class="bloc bloc-encre inverse">
      ${fragment()}
      <div class="contenant">
        <h2>${fr ? "Notre expertise" : "Our expertise"}</h2>
        <p class="intro">${fr ? "Tout ce qu'il faut pour que votre entreprise soit bien présentée et facile à trouver en ligne."
                              : "Everything your business needs to look professional and be easy to find online."}</p>
        <ul class="raisons trois">
          ${(fr ? [
            ["Design sur mesure", "Chaque site est dessiné pour votre entreprise, à partir de votre logo, de vos couleurs et de vos photos. Pas de gabarit recyclé."],
            ["Sites bilingues", "Vos textes en français et en anglais, pour rejoindre toute la clientèle du Grand Montréal."],
            ["Référencement local", "Titres, descriptions et fiche Google configurés pour qu'on vous trouve quand on cherche vos services près de chez soi."],
            ["Refonte de sites", "On modernise votre site actuel après un audit gratuit, en gardant votre nom de domaine."],
            ["Fonctions utiles", "Prise de rendez-vous, galerie photos, avis clients, carte Google ou petite boutique en ligne, selon vos besoins."],
            ["Hébergement et entretien", "Sauvegardes, sécurité et mises à jour : votre site reste rapide, sécurisé et en ligne."],
          ] : [
            ["Custom design", "Every website is designed for your business, based on your logo, your colours and your photos. No recycled templates."],
            ["Bilingual websites", "Your content in French and English, to reach every customer in Greater Montreal."],
            ["Local SEO", "Titles, descriptions and your Google Business Profile set up so people find you when they search for your services nearby."],
            ["Website redesigns", "We modernize your current website after a free audit, and you keep your domain name."],
            ["Useful features", "Appointment booking, photo gallery, customer reviews, Google map or a small online store, depending on your needs."],
            ["Hosting and maintenance", "Backups, security and updates: your website stays fast, secure and online."],
          ]).map(([t, p]) => `<li>
            <h3>${t}</h3>
            <p>${p}</p>
          </li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="bloc bloc-sauge">
      <div class="contenant deux">
        <h2>${fr ? "Ce qui est inclus dans chaque site" : "What's included with every website"}</h2>
        <ul class="puces une">
          ${(fr ? [
            "Site bilingue français et anglais",
            "Design adapté aux cellulaires, tablettes et ordinateurs",
            "Nom de domaine inclus la première année",
            "2 révisions incluses",
            "Hébergement et mises à jour pris en charge",
            "Site sécurisé (HTTPS)",
            "Formulaire de contact pour recevoir des demandes de clients",
          ] : [
            "Bilingual website in French and English",
            "Design that works on phones, tablets and computers",
            "Domain name included for the first year",
            "2 rounds of revisions included",
            "Hosting and updates taken care of",
            "Secure website (HTTPS)",
            "Contact form to receive customer requests",
          ]).map((i) => `<li>${i}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="bloc bloc-os inverse">
      <div class="contenant">
        <h2>${fr ? "Pourquoi nous choisir" : "Why choose us"}</h2>
        <ul class="raisons">
          ${(fr ? [
            ["Une équipe locale", "Basés sur la Rive-Sud, on travaille avec les entreprises d'ici et on comprend leur réalité."],
            ["Rapide", "Votre démo est prête en quelques jours, pas en quelques mois."],
            ["Une vraie personne au bout du fil", "Une question&nbsp;? Vous nous parlez directement, sans centre d'appels."],
            ["Des prix accessibles", "Un site professionnel ne devrait pas coûter des milliers de dollars à une petite entreprise."],
          ] : [
            ["A local team", "Based on Montreal's South Shore, we work with local businesses and understand their reality."],
            ["Fast", "Your demo is ready in a few days, not a few months."],
            ["A real person on the line", "Have a question? You talk to us directly, no call centre."],
            ["Affordable prices", "A professional website shouldn't cost a small business thousands of dollars."],
          ]).map(([t, p]) => `<li>
            <h3>${t}</h3>
            <p>${p}</p>
          </li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="bloc bloc-encre appel">
      ${fragment("gauche")}
      <div class="contenant">
        <h2>${fr ? "Nos secteurs" : "Who we work with"}</h2>
        <p class="intro">${fr ? "Votre site est pensé pour votre métier. Voici le genre de démo qu'on pourrait vous préparer. Ces entreprises sont fictives."
                              : "Your website is built around your trade. Here's the kind of demo we could prepare for you. These businesses are fictional."}</p>
        <ul class="secteurs">
          ${(fr ? [
            ["Restaurants", "Votre menu, vos heures d'ouverture et un moyen simple de réserver ou de commander."],
            ["Garages", "Vos services, vos prix et la prise de rendez-vous en ligne."],
            ["Entrepreneurs en construction", "Une galerie de vos projets réalisés et un formulaire de demande de soumission."],
            ["Services à domicile", "Votre zone desservie, vos tarifs et les demandes de rendez-vous directement par votre site.", "Exemple : ZK Details"],
            ["Commerces de détail", "Vos produits, vos heures, votre adresse sur Google Maps et, au besoin, une petite boutique en ligne."],
            ["Travailleurs autonomes", "Un portfolio qui présente votre travail et donne envie de vous contacter."],
          ] : [
            ["Restaurants", "Your menu, your opening hours and an easy way to book a table or order."],
            ["Garages", "Your services, your prices and online appointment booking."],
            ["Construction contractors", "A gallery of your completed projects and a quote request form."],
            ["Home services", "Your service area, your rates and appointment requests straight from your website.", "Example: ZK Details"],
            ["Retail stores", "Your products, your hours, your address on Google Maps and, if needed, a small online store."],
            ["Freelancers", "A portfolio that showcases your work and makes people want to reach out."],
          ]).map(([t, p, ex], i) => `<li>
            ${maquette(i, fr)}
            <h3>${t}</h3>
            <p>${p}</p>${ex ? `
            <a class="lien" href="portfolio.html">${ex}</a>` : ""}
          </li>`).join("\n          ")}
        </ul>
        <p class="secteurs-suite">${fr ? "Et toute entreprise qui veut être plus visible." : "And any business that wants to be more visible."}</p>
        ${demo("bouton-os")}
      </div>
    </section>`,
  };

  /* ----------------------------------------------------------- Forfaits */
  const debut = fr ? "À partir de" : "Starting at";
  const domaine = fr ? "Domaine inclus la 1<sup>re</sup> année" : "Domain included for the 1st year";
  const revisions = fr ? "2 révisions incluses" : "2 rounds of revisions included";
  const forfaits = {
    fichier: "forfaits.html",
    titre: fr ? "Forfaits et prix | ZN Digital" : "Pricing | ZN Digital",
    description: fr
      ? "Sites web professionnels à partir de 500 $ : forfaits Essentiel, Pro et Complet, hébergement dès 25 $ par mois. Chaque site commence par une démo gratuite."
      : "Professional websites starting at $500: Essential, Pro and Complete packages, hosting from $25 per month. Every website starts with a free demo.",
    corps: `
    <section class="bloc bloc-sauge tete">
      <div class="contenant">
        ${embleme(1)}
        <h1>${fr ? "Nos forfaits" : "Our packages"}</h1>
        <p class="chapo">${fr ? "Chaque site commence par une démo gratuite. Vous payez seulement si vous êtes satisfait."
                              : "Every website starts with a free demo. You only pay if you're satisfied."}</p>
      </div>
    </section>

    <section class="bloc bloc-os">
      <div class="contenant">
        <h2>${fr ? "Création de votre site" : "Building your website"}</h2>
        ${quizForfaits(fr)}
        <ul class="plans">${plan(debut, fr ? "Essentiel" : "Essential", fr ? "500&nbsp;$" : "$500",
          fr ? "Idéal pour être présent en ligne rapidement." : "Ideal for getting online quickly.",
          fr ? ["Site d'une page ou multipage", "Bilingue FR/EN", "Formulaire de contact", domaine, revisions]
             : ["One-page or multi-page website", "Bilingual FR/EN", "Contact form", domaine, revisions],
          "essentiel", fr ? "Suggéré pour vous" : "Suggested for you"
        )}${plan(debut, "Pro", fr ? "1&nbsp;500&nbsp;$" : "$1,500",
          fr ? "Pour présenter vos services en détail." : "To present your services in detail.",
          fr ? ["Jusqu'à 5 pages", "Bilingue FR/EN", "Galerie photos", "Formulaire de contact", "Optimisation de base pour Google", domaine, revisions]
             : ["Up to 5 pages", "Bilingual FR/EN", "Photo gallery", "Contact form", "Basic Google optimization", domaine, revisions],
          "pro", fr ? "Suggéré pour vous" : "Suggested for you"
        )}${plan(debut, fr ? "Complet" : "Complete", fr ? "2&nbsp;500&nbsp;$" : "$2,500",
          fr ? "Pour les entreprises qui veulent tout." : "For businesses that want it all.",
          fr ? ["Pages illimitées", "Bilingue FR/EN", "Possibilité de modifier votre site vous-même", "Galerie, avis clients, carte Google", "Optimisation pour Google", domaine, revisions]
             : ["Unlimited pages", "Bilingual FR/EN", "Option to edit your website yourself", "Gallery, customer reviews, Google map", "Google optimization", domaine, revisions],
          "complet", fr ? "Suggéré pour vous" : "Suggested for you"
        )}
        </ul>
        <p class="mention">${fr ? "Taxes en sus." : "Taxes not included."}</p>
        ${engagement(fr)}
      </div>
    </section>

    <section class="bloc bloc-encre inverse">
      ${fragment()}
      <div class="contenant">
        <h2>${fr ? "Hébergement et entretien" : "Hosting and maintenance"}</h2>
        <p class="intro">${fr ? "Un plan d'hébergement est nécessaire pour garder votre site en ligne. Il commence le mois de la mise en ligne."
                              : "A hosting plan is required to keep your website online. It starts the month your website launches."}</p>
        <ul class="heberg">
          <li>
            <h3>Base</h3>
            <p class="tarif">${fr ? "25&nbsp;$ par mois<span>ou 250&nbsp;$ par année</span>" : "$25 per month<span>or $250 per year</span>"}</p>
            <p>${fr ? "Hébergement, domaine à votre nom, sauvegardes, sécurité et mises à jour techniques."
                    : "Hosting, domain in your name, backups, security and technical updates."}</p>
          </li>
          <li>
            <h3>Plus</h3>
            <p class="tarif">${fr ? "45&nbsp;$ par mois<span>ou 450&nbsp;$ par année</span>" : "$45 per month<span>or $450 per year</span>"}</p>
            <p>${fr ? "Tout le plan Base, plus 30 minutes de modifications par mois et un rapport de visites de votre site chaque mois."
                    : "Everything in Base, plus 30 minutes of changes per month and a monthly report on your website's visits."}</p>
          </li>
        </ul>
        <p class="mention">${fr ? "Payer à l'année vous donne environ deux mois gratuits." : "Paying yearly gives you about two months free."}</p>
      </div>
    </section>

    <section class="bloc bloc-sauge">
      <div class="contenant deux">
        <h2>${fr ? "Paiement" : "Payment"}</h2>
        ${illustration("arche")}
        <div>
          <ul class="puces une">
            ${(fr ? [
              "50&nbsp;% à l'acceptation de la démo, 50&nbsp;% à la mise en ligne",
              "2 révisions incluses, puis 50&nbsp;$ par révision supplémentaire",
              "Taxes en sus",
            ] : [
              "50% when you approve the demo, 50% at launch",
              "2 rounds of revisions included, then $50 per additional revision",
              "Taxes not included",
            ]).map((i) => `<li>${i}</li>`).join("\n            ")}
          </ul>
          <div class="actions">${demo()}</div>
        </div>
      </div>
    </section>`,
  };

  /* ----------------------------------------------------------- Réalisations */
  const portfolio = {
    fichier: "portfolio.html",
    titre: fr ? "Nos réalisations | ZN Digital" : "Our Work | ZN Digital",
    description: fr
      ? "Découvrez les sites conçus par ZN Digital, dont ZK Details, et des exemples de démos pour chaque secteur."
      : "See websites designed by ZN Digital, including ZK Details, and sample demos for every industry.",
    corps: `
    <section class="bloc bloc-sauge tete">
      <div class="contenant">
        ${embleme(2)}
        <h1>${fr ? "Nos réalisations" : "Our work"}</h1>
        <p class="chapo">${fr ? "Un site que nous avons conçu et mis en ligne, et des exemples de démos qu'on peut vous préparer."
                              : "A website we designed and launched, and sample demos we can prepare for you."}</p>
      </div>
    </section>

    <section class="bloc bloc-os">
      <div class="contenant">
        <h2>${fr ? "ZK Details, esthétique automobile mobile" : "ZK Details, mobile car detailing"}</h2>
        ${vitrine(L)}
        <div class="fiche">
          <div>
            <p class="lieu">${fr ? "La Prairie, Rive-Sud" : "La Prairie, South Shore"}</p>
            <p>${fr ? "Site bilingue présentant les services, les prix et la prise de rendez-vous."
                    : "Bilingual website presenting the services, prices and appointment booking."}</p>
            <a class="bouton bouton-encre" href="https://zkdetails.ca" target="_blank" rel="noopener">${fr ? "Voir le site" : "Visit the website"}</a>
          </div>
          <ul class="puces une">
            ${(fr ? [
              "Trois forfaits avec les prix affichés",
              "Galerie de photos avant-après",
              "Formulaire de demande de rendez-vous",
              "Offert en français et en anglais",
            ] : [
              "Three packages with prices shown",
              "Before-and-after photo gallery",
              "Appointment request form",
              "Available in French and English",
            ]).map((i) => `<li>${i}</li>`).join("\n            ")}
          </ul>
        </div>
      </div>
    </section>

    <section class="bloc bloc-encre inverse">
      ${fragment()}
      <div class="contenant">
        <h2>${fr ? "Exemples de démos" : "Sample demos"}</h2>
        <p class="intro">${fr ? "Ces entreprises sont fictives : elles montrent le genre de site qu'on peut préparer pour votre secteur."
                              : "These businesses are fictional: they show the kind of website we can prepare for your industry."}</p>
        <ul class="secteurs">
          ${(fr ? ["Restaurant", "Garage", "Construction et rénovation", "Services à domicile", "Commerce de détail", "Travailleur autonome"]
                : ["Restaurant", "Garage", "Construction and renovation", "Home services", "Retail store", "Freelancer"])
            .map((t, i) => `<li>
            ${maquette(i, fr)}
            <h3>${t}</h3>
          </li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="bloc bloc-sauge">
      <div class="contenant deux">
        <h2>Nafsi</h2>
        ${illustration("scene")}
        <div class="texte">
          <h3>Portfolio</h3>
          <p>${fr ? "Mise en ligne prochainement." : "Launching soon."}</p>
        </div>
      </div>
    </section>

    <section class="bloc bloc-encre appel">
      ${fragment("gauche")}
      <div class="contenant">
        <h2>${fr ? "Votre entreprise pourrait être la prochaine." : "Your business could be next."}</h2>
        ${demo("bouton-os")}
      </div>
    </section>`,
  };

  /* ----------------------------------------------------------- FAQ */
  const qr = fr ? [
    ["Est-ce que la démo m'engage à quelque chose&nbsp;?", "Non. Si la démo ne vous plaît pas, vous ne payez rien."],
    ["Combien de temps faut-il pour avoir mon site&nbsp;?", "Cela dépend de votre demande. On vous donne une estimation dès notre premier échange."],
    ["Qu'est-ce qu'un nom de domaine&nbsp;?", "C'est l'adresse de votre site, par exemple votreentreprise.com. Il est inclus la première année et enregistré à votre nom."],
    ["Est-ce que mon site va bien s'afficher sur cellulaire&nbsp;?", "Oui. Tous nos sites s'adaptent automatiquement aux cellulaires, tablettes et ordinateurs."],
    ["Est-ce que je peux modifier mon site moi-même&nbsp;?", "Oui, avec le forfait Complet. Sinon, on s'occupe des modifications pour vous."],
    ["Est-ce que le site m'appartient&nbsp;?", "Oui. Le domaine est à votre nom et votre présence en ligne vous appartient."],
    ["J'ai déjà un site, pouvez-vous le refaire&nbsp;?", "Absolument. On peut moderniser votre site actuel et garder votre nom de domaine."],
  ] : [
    ["Does the demo commit me to anything?", "No. If you don't like the demo, you pay nothing."],
    ["How long does it take to get my website?", "It depends on your request. We'll give you an estimate as soon as we first talk."],
    ["What is a domain name?", "It's your website's address, for example yourbusiness.com. It's included for the first year and registered in your name."],
    ["Will my website look good on a phone?", "Yes. All our websites automatically adapt to phones, tablets and computers."],
    ["Can I edit my website myself?", "Yes, with the Complete package. Otherwise, we make the changes for you."],
    ["Does the website belong to me?", "Yes. The domain is in your name and your online presence belongs to you."],
    ["I already have a website. Can you redo it?", "Absolutely. We can modernize your current website and keep your domain name."],
  ];
  const faq = {
    fichier: "faq.html",
    titre: fr ? "Questions fréquentes | ZN Digital" : "Frequently Asked Questions | ZN Digital",
    description: fr
      ? "Démo gratuite, délais, nom de domaine, hébergement, paiement : les réponses aux questions fréquentes sur la création de votre site avec ZN Digital."
      : "Free demo, timelines, domain name, hosting, payment: answers to common questions about building your website with ZN Digital.",
    corps: `
    <section class="bloc bloc-sauge tete">
      <div class="contenant">
        ${embleme(3)}
        <h1>${fr ? "Questions fréquentes" : "Frequently asked questions"}</h1>
        <p class="chapo">${fr ? "Les questions qu'on nous pose le plus souvent, et nos réponses." : "The questions we hear most often, and our answers."}</p>
      </div>
    </section>

    <section class="bloc bloc-os">
      <div class="contenant">
        ${illustration("scene", "illus-cote")}
        <div class="faq conversation">
          ${faqListe(qr)}
        </div>
      </div>
    </section>

    <section class="bloc bloc-encre inverse appel">
      ${fragment("gauche")}
      <div class="contenant">
        <h2>${fr ? "Vous avez une autre question&nbsp;?" : "Have another question?"}</h2>
        <a class="bouton bouton-os" href="contact.html">${fr ? "Contactez-nous" : "Contact us"}</a>
      </div>
    </section>`,
  };

  /* ----------------------------------------------------------- Contact */
  const opt = fr ? "(facultatif)" : "(optional)";
  const contact = {
    fichier: "contact.html",
    titre: fr ? "Obtenez votre démo gratuite | ZN Digital" : "Get Your Free Demo | ZN Digital",
    description: fr
      ? "Demandez votre démo gratuite : remplissez le formulaire et ZN Digital vous contacte sous 24 h. Aucun engagement. Grand Montréal."
      : "Request your free demo: fill out the form and ZN Digital will contact you within 24 hours. No commitment. Greater Montreal.",
    corps: `
    <section class="bloc bloc-sauge tete">
      <div class="contenant">
        ${embleme(4)}
        <h1>${fr ? "Obtenez votre démo gratuite" : "Get your free demo"}</h1>
        <p class="chapo">${fr ? "Remplissez le formulaire et on vous contacte sous 24&nbsp;h. Aucun engagement."
                              : "Fill out the form and we'll get back to you within 24 hours. No commitment."}</p>
      </div>
    </section>

    <section class="bloc bloc-encre">
      ${fragment("gauche")}
      <div class="contenant contact-grille">
        <form id="formulaire" novalidate>
          <div class="rangee">
            <div class="champ">
              <label for="nom">${fr ? "Votre nom" : "Your name"}</label>
              <input id="nom" name="nom" type="text" autocomplete="name" required>
            </div>
            <div class="champ">
              <label for="entreprise">${fr ? "Nom de l'entreprise" : "Business name"} <span class="facultatif">${opt}</span></label>
              <input id="entreprise" name="entreprise" type="text" autocomplete="organization">
            </div>
          </div>
          <div class="rangee">
            <div class="champ">
              <label for="courriel">${fr ? "Courriel" : "Email"}</label>
              <input id="courriel" name="courriel" type="email" autocomplete="email" required>
            </div>
            <div class="champ">
              <label for="telephone">${fr ? "Téléphone" : "Phone"} <span class="facultatif">${opt}</span></label>
              <input id="telephone" name="telephone" type="tel" autocomplete="tel">
            </div>
          </div>
          <fieldset class="champ">
            <legend>${fr ? "Votre projet" : "Your project"}</legend>
            <div class="choix">
              <label><input type="radio" name="type" value="${fr ? "Nouveau site" : "New website"}" checked><span>${fr ? "Nouveau site" : "New website"}</span></label>
              <label><input type="radio" name="type" value="${fr ? "Refonte de mon site" : "Redesign of my website"}" data-refonte><span>${fr ? "Refonte de mon site" : "Redesign my website"}</span></label>
            </div>
          </fieldset>
          <div class="champ" id="champ-refonte" hidden>
            <label for="siteActuel">${fr ? "Adresse de votre site actuel" : "Your current website address"}</label>
            <input id="siteActuel" name="siteActuel" type="text" inputmode="url" placeholder="${fr ? "votreentreprise.com" : "yourbusiness.com"}">
          </div>
          ${champsApercu(fr)}
          <div class="champ">
            <label for="forfait">${fr ? "Forfait envisagé" : "Package you're considering"}</label>
            <select id="forfait" name="forfait">
              ${(fr ? ["Je ne sais pas encore", "Essentiel, à partir de 500 $", "Pro, à partir de 1 500 $", "Complet, à partir de 2 500 $"]
                    : ["Not sure yet", "Essential, starting at $500", "Pro, starting at $1,500", "Complete, starting at $2,500"])
                .map((o) => `<option>${o}</option>`).join("\n              ")}
            </select>
          </div>
          <div class="champ">
            <label for="message">${fr ? "Parlez-nous de votre entreprise" : "Tell us about your business"}</label>
            <textarea id="message" name="message" rows="5" required aria-describedby="message-indice"></textarea>
            <span class="indice" id="message-indice">${fr ? "Vos services, vos clients, ce que vous voulez sur votre site. Pour une refonte, dites-nous ce qui ne vous plaît plus."
                                                         : "Your services, your customers, what you want on your website. For a redesign, tell us what you no longer like."}</span>
          </div>
          <button class="bouton bouton-os" type="submit">${fr ? "Envoyer ma demande" : "Send my request"}</button>
          <p class="envoi-note">${fr ? "Votre application de courriel s'ouvrira avec votre demande déjà rédigée. Vous pourrez y joindre des photos de votre entreprise."
                                     : "Your email app will open with your request already written. You can attach photos of your business."}</p>
          <p class="etat" id="etat" role="status" aria-live="polite"></p>
        </form>

        <aside class="cote">
          ${apercu(fr)}
          <div class="joindre">
          <h2>${L.joindre}</h2>
          <dl>
            <div><dt>${fr ? "Courriel" : "Email"}</dt><dd><a href="mailto:zndigitalcreation@gmail.com">zndigitalcreation@gmail.com</a></dd></div>
            <div><dt>${fr ? "Téléphone" : "Phone"}</dt><dd><a href="tel:+14387283615">438 728-3615</a></dd></div>
            <div><dt>${fr ? "Région desservie" : "Area served"}</dt><dd>${L.region}</dd></div>
            <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/zndigitalcreation/" target="_blank" rel="noopener">@zndigitalcreation</a></dd></div>
          </dl>
          </div>
        </aside>
      </div>
    </section>
${ensuite(fr)}`,
  };

  return [accueil, presentation, forfaits, portfolio, faq, contact];
}

for (const code of ["fr", "en"]) {
  const L = LANGUES[code];
  const dossier = path.join(out, L.dossier);
  fs.mkdirSync(dossier, { recursive: true });
  for (const p of contenu(code)) {
    const html = page(L, p);
    fs.writeFileSync(path.join(dossier, p.fichier), html);
    console.log(path.join(L.dossier, p.fichier), html.length);
  }
}
