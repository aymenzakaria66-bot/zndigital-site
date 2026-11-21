// Éléments inspirés de l'analyse d'autres sites d'agences (FR et EN).

/* Bandeau de garanties sous le haut de page de l'accueil */
const bandeau = (fr) => {
  const promesses = fr
    ? ["Démo gratuite d'abord", "Vous payez seulement si vous l'aimez", "Site bilingue", "Domaine à votre nom", "Une vraie personne répond", "Rive-Sud et Grand Montréal"]
    : ["Free demo first", "You only pay if you love it", "Bilingual website", "Domain in your name", "A real person answers", "South Shore and Greater Montreal"];
  const ligne = promesses.map((p) => `<span>${p}</span>`).join("");
  return `<div class="bandeau" aria-hidden="true"><div class="bandeau-piste">${ligne}${ligne}</div></div>
      <p class="sr-only">${promesses.join(". ")}.</p>`;
};

/* Phrase rassurante sous le bouton principal */
const rassurance = (fr) => `<p class="rassurance">${fr
  ? "Environ 2 minutes. Aucun engagement. Rien à payer d'avance."
  : "About 2 minutes. No commitment. Nothing to pay upfront."}</p>`;

/* Avant / après : un vieux site et la démo, à comparer en glissant */
const avantApres = (fr) => `
    <section class="bloc bloc-sauge">
      <div class="contenant">
        <h2>${fr ? "Glissez pour voir la différence" : "Drag to see the difference"}</h2>
        <p class="intro">${fr
          ? "Beaucoup de sites d'entreprises d'ici datent de plusieurs années et font fuir les clients vers le concurrent. Votre démo est conçue de zéro pour votre entreprise. Illustration avec une entreprise fictive."
          : "Many local business websites are years old and quietly send customers to the competitor. Your demo is designed from scratch for your business. Illustration with a fictional business."}</p>
        <div class="comparateur" style="--pos: 50%">
          <div class="cmp-barre" aria-hidden="true"><span></span><span></span><span></span><b class="cmp-url-avant">garageexpress.ca/accueil.htm</b><b class="cmp-url-apres">garageexpress.ca</b></div>
          <div class="cmp-cadre">
            <div class="cmp-apres" aria-hidden="true">
              <div class="mq" style="--m-fond:#F4F4F1;--m-texte:#16191D;--m-accent:#D7432B" data-police="large">
                <div class="mq-site">
                  <div class="mq-nav"><span class="mq-nom">Garage Express</span><span class="mq-liens"><span></span><span></span><span></span></span></div>
                  <div class="mq-hero">
                    <div>
                      <p class="mq-titre">${fr ? "Votre auto entre bonnes mains." : "Your car in good hands."}</p>
                      <span class="mq-btn">${fr ? "Prendre rendez-vous" : "Book an appointment"}</span>
                    </div>
                    <svg class="mq-image" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice">
                      <rect width="100" height="80" style="fill:color-mix(in srgb, var(--m-accent) 22%, var(--m-fond))"/>
                      <circle cx="72" cy="24" r="12" style="fill:color-mix(in srgb, var(--m-accent) 55%, var(--m-fond))"/>
                      <polygon points="0,80 0,46 46,80" style="fill:color-mix(in srgb, var(--m-texte) 35%, var(--m-fond))"/>
                      <polygon points="22,80 100,32 100,80" style="fill:var(--m-accent)"/>
                    </svg>
                  </div>
                  <div class="mq-detail"><ul class="mq-services">${[
                    [fr ? "Changement d'huile" : "Oil change", fr ? "59,95&nbsp;$" : "$59.95"],
                    [fr ? "Pneus d'hiver" : "Winter tires", fr ? "dès 80&nbsp;$" : "from $80"],
                    [fr ? "Freins" : "Brakes", fr ? "dès 149&nbsp;$" : "from $149"],
                  ].map(([a, p]) => `<li><span>${a}</span><b>${p}</b></li>`).join("")}</ul></div>
                </div>
              </div>
            </div>
            <div class="cmp-avant" aria-hidden="true">
              <p class="va-titre">${fr ? "BIENVENUE SUR NOTRE SITE WEB !!!" : "WELCOME TO OUR WEB SITE!!!"}</p>
              <p class="va-defile">${fr ? "*** Garage Express, au service de la Rive-Sud, appelez-nous aujourd'hui !! ***" : "*** Garage Express, serving the South Shore, call us today!! ***"}</p>
              <p class="va-menu"><u>${fr ? "Accueil" : "Home"}</u> | <u>${fr ? "À_propos" : "About_us"}</u> | <u>Services.htm</u> | <u>${fr ? "Photos (brisé)" : "Photos (broken)"}</u> | <u>Contact!!</u></p>
              <p class="va-texte">${fr
                ? "Merci de visiter notre page d'accueil. Nous sommes une entreprise qui fait du travail de qualité à un prix juste. Veuillez nous téléphoner pour recevoir une estimation."
                : "Thank you for visiting our home page. We are a company that does quality work for a fair price. Please call us on the telephone to receive an estimate."}</p>
              <p class="va-image">${fr ? "[ image introuvable ]" : "[ image not found ]"}</p>
              <p class="va-compteur">${fr ? "Vous êtes le visiteur no 004 182" : "You are visitor No. 004,182"}<br>${fr ? "Dernière mise à jour : 03/11/2012" : "Page last updated: 11/03/2012"}</p>
            </div>
            <span class="cmp-etiquette avant">${fr ? "Avant" : "Before"}</span>
            <span class="cmp-etiquette apres">${fr ? "Votre démo" : "Your demo"}</span>
            <span class="cmp-poignee" aria-hidden="true"></span>
            <input class="cmp-curseur" type="range" min="0" max="100" value="50" aria-label="${fr ? "Comparer l'ancien site et la démo" : "Compare the old website and the demo"}">
          </div>
        </div>
      </div>
    </section>
`;

/* Comparatif : agence habituelle et ZN Digital */
const comparatif = (fr) => {
  const lignes = fr ? [
    ["Vous payez avant de voir quoi que ce soit", "Vous voyez votre démo avant de payer"],
    ["Un gabarit à remplir", "Un design fait pour votre entreprise, avec votre logo et vos couleurs"],
    ["Des semaines avant un premier aperçu", "Un premier aperçu rapidement"],
    ["Un service par courriel ou par billet", "Une vraie personne au bout du fil"],
    ["Des prix à découvrir en cours de route", "Des forfaits affichés sur notre site"],
    ["Un domaine au nom de l'agence", "Un domaine enregistré à votre nom"],
  ] : [
    ["You pay before you see anything", "You see your demo before you pay"],
    ["A template to fill in", "A design made for your business, with your logo and colours"],
    ["Weeks before a first preview", "A first preview, quickly"],
    ["Support by email or ticket", "A real person on the line"],
    ["Prices you discover along the way", "Packages listed on our website"],
    ["A domain in the agency's name", "A domain registered in your name"],
  ];
  return `
    <section class="bloc bloc-sauge">
      <div class="contenant">
        <h2>${fr ? "Ce qui nous distingue" : "What sets us apart"}</h2>
        <div class="comparatif" role="table" aria-label="${fr ? "Agence habituelle et ZN Digital" : "Typical agency and ZN Digital"}">
          <div class="cmpf-tete" role="row">
            <span role="columnheader">${fr ? "L'agence habituelle" : "The typical agency"}</span>
            <span role="columnheader" class="cmpf-zn"><svg viewBox="0 0 640 325" aria-hidden="true"><use href="#zn"/></svg>ZN Digital</span>
          </div>
          ${lignes.map(([a, b]) => `<div class="cmpf-ligne" role="row"><span role="cell" class="cmpf-non">${a}</span><span role="cell" class="cmpf-oui">${b}</span></div>`).join("\n          ")}
        </div>
      </div>
    </section>
`;
};

/* Contact : ce qui se passe après l'envoi */
const ensuite = (fr) => `
    <section class="bloc bloc-sauge">
      <div class="contenant">
        <h2>${fr ? "Et ensuite&nbsp;?" : "What happens next?"}</h2>
        <ol class="etapes">
          ${(fr ? [
            ["On vous répond sous 24&nbsp;h", "Par courriel ou par téléphone, pour préciser votre projet."],
            ["On prépare votre démo", "Un aperçu de votre futur site, fait pour votre entreprise. Sans frais."],
            ["Vous décidez", "Vous l'aimez : on le termine et on le met en ligne. Sinon, vous ne payez rien."],
          ] : [
            ["We reply within 24 hours", "By email or phone, to clarify your project."],
            ["We build your demo", "A preview of your future website, made for your business. Free of charge."],
            ["You decide", "Love it: we finish it and launch it. Otherwise, you pay nothing."],
          ]).map(([t, p]) => `<li>
            <h3>${t}</h3>
            <p>${p}</p>
          </li>`).join("\n          ")}
        </ol>
      </div>
    </section>
`;

/* Barre d'action fixée en bas de l'écran sur téléphone */
const barreMobile = (fr) => `<div class="barre-mobile">
    <a class="bouton bouton-os" href="tel:+14387283615">${fr ? "Appeler" : "Call"}</a>
    <a class="bouton bouton-encre" href="contact.html">${fr ? "Ma démo gratuite" : "My free demo"}</a>
  </div>
`;

module.exports = { bandeau, rassurance, avantApres, comparatif, ensuite, barreMobile };
