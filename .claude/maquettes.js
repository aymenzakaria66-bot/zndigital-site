// Maquettes de démos par secteur. Les entreprises sont fictives.
// Chaque maquette a ses propres couleurs, comme un vrai site client.
const prix = (fr, n) => (fr ? `${n}&nbsp;$` : `$${n}`);

const MAQUETTES = [
  {
    couleurs: "--m-fond:#2A1E1B;--m-texte:#F3E9DC;--m-accent:#D9A05B", police: "serif",
    url: "bistrolumiere.ca", nom: "Bistro Lumière",
    titre: ["Cuisine du marché, au bord du fleuve.", "Market cuisine by the river."],
    bouton: ["Réserver une table", "Book a table"],
    detail: (fr) => `<ul class="mq-menu">${[
      ["Tartare de saumon", "Salmon tartare", "18"],
      ["Bavette, frites maison", "Flank steak, house fries", "27"],
      ["Tarte au sucre", "Sugar pie", "9"],
    ].map(([a, b, p]) => `<li><span>${fr ? a : b}</span><b>${prix(fr, p)}</b></li>`).join("")}</ul>`,
  },
  {
    couleurs: "--m-fond:#F4F4F1;--m-texte:#16191D;--m-accent:#D7432B", police: "large",
    url: "garageexpress.ca", nom: "Garage Express",
    titre: ["Votre auto entre bonnes mains.", "Your car in good hands."],
    bouton: ["Prendre rendez-vous", "Book an appointment"],
    detail: (fr) => `<ul class="mq-services">${[
      ["Changement d'huile", "Oil change", fr ? "59,95&nbsp;$" : "$59.95"],
      ["Pneus d'hiver", "Winter tires", fr ? "dès 80&nbsp;$" : "from $80"],
      ["Freins", "Brakes", fr ? "dès 149&nbsp;$" : "from $149"],
    ].map(([a, b, p]) => `<li><span>${fr ? a : b}</span><b>${p}</b></li>`).join("")}</ul>`,
  },
  {
    couleurs: "--m-fond:#1D2733;--m-texte:#F2F4F6;--m-accent:#F2B705", police: "etroite",
    url: "batisseursduval.ca", nom: "Bâtisseurs Duval",
    titre: ["Rénovations clés en main.", "Turnkey renovations."],
    bouton: ["Demander une soumission", "Request a quote"],
    detail: (fr) => `<ul class="mq-galerie">${(fr ? ["Cuisine", "Sous-sol", "Terrasse"] : ["Kitchen", "Basement", "Deck"])
      .map((t) => `<li><span></span>${t}</li>`).join("")}</ul>`,
  },
  {
    couleurs: "--m-fond:#EAF2EF;--m-texte:#173A33;--m-accent:#2E7D6B", police: "",
    url: "menageclair.ca", nom: "Ménage Clair",
    titre: ["Une maison propre, sans y penser.", "A clean home, without the hassle."],
    bouton: ["Réserver un ménage", "Book a cleaning"],
    detail: (fr) => `<p class="mq-sous">${fr ? "Secteurs desservis" : "Areas served"}</p><ul class="mq-zones">${
      ["Brossard", "Longueuil", "La Prairie", "Candiac"].map((t) => `<li>${t}</li>`).join("")}</ul>`,
  },
  {
    couleurs: "--m-fond:#F5EEE6;--m-texte:#3B2A33;--m-accent:#7D4F7F", police: "serif",
    url: "filetlin.ca", nom: "Fil &amp; Lin",
    titre: ["Linge de maison fait au Québec.", "Home linens made in Quebec."],
    bouton: ["Voir la boutique", "Shop now"],
    detail: (fr) => `<ul class="mq-produits">${[
      ["Nappe", "Tablecloth", "64"],
      ["Coussin", "Cushion", "38"],
      ["Serviettes", "Napkins", "24"],
    ].map(([a, b, p]) => `<li><span></span>${fr ? a : b}<b>${prix(fr, p)}</b></li>`).join("")}</ul>`,
  },
  {
    couleurs: "--m-fond:#FBFBFA;--m-texte:#141414;--m-accent:#6F747D", police: "large",
    url: "studionord.ca", nom: "Studio Nord",
    titre: ["Photographe de famille et d'événements.", "Family and event photographer."],
    bouton: ["Voir le portfolio", "View portfolio"],
    detail: () => `<ul class="mq-photos"><li></li><li></li><li></li><li></li></ul>`,
  },
];

const maquette = (i, fr) => {
  const m = MAQUETTES[i];
  return `<div class="mq" style="${m.couleurs}"${m.police ? ` data-police="${m.police}"` : ""} aria-hidden="true">
              <div class="mq-barre"><span></span><span></span><span></span><b>${m.url}</b></div>
              <div class="mq-site">
                <div class="mq-nav"><span class="mq-nom">${m.nom}</span><span class="mq-liens"><span></span><span></span><span></span></span></div>
                <div class="mq-hero">
                  <div>
                    <p class="mq-titre">${m.titre[fr ? 0 : 1]}</p>
                    <span class="mq-btn">${m.bouton[fr ? 0 : 1]}</span>
                  </div>
                  <svg class="mq-image" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice">
                    <rect width="100" height="80" style="fill:color-mix(in srgb, var(--m-accent) 22%, var(--m-fond))"/>
                    <circle cx="72" cy="24" r="12" style="fill:color-mix(in srgb, var(--m-accent) 55%, var(--m-fond))"/>
                    <polygon points="0,80 0,46 46,80" style="fill:color-mix(in srgb, var(--m-texte) 35%, var(--m-fond))"/>
                    <polygon points="22,80 100,32 100,80" style="fill:var(--m-accent)"/>
                  </svg>
                </div>
                <div class="mq-detail">${m.detail(fr)}</div>
              </div>
            </div>`;
};

module.exports = { maquette };
