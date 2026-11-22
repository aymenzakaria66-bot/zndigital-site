// Visuels sans photos : illustrations dessinées en code et icônes au trait.

/* ---------- Illustrations ---------- */
const DESSINS = {
  // Une arche avec un vase et une branche, comme dans l'image de référence
  scene: `<svg viewBox="0 0 220 240" aria-hidden="true">
      <path class="il-arche" d="M30 232V112a80 80 0 0 1 160 0v120z"/>
      <path class="il-interieur" d="M56 232V118a54 54 0 0 1 108 0v114z"/>
      <path class="il-sol" d="M8 232h204"/>
      <path class="il-tige" d="M110 168c-4-26 4-52 22-74M112 150c-14-14-30-20-46-20M116 124c12-12 26-16 40-14"/>
      <ellipse class="il-feuille" cx="132" cy="92" rx="11" ry="5" transform="rotate(-50 132 92)"/>
      <ellipse class="il-feuille" cx="68" cy="130" rx="11" ry="5" transform="rotate(10 68 130)"/>
      <ellipse class="il-feuille" cx="154" cy="110" rx="10" ry="4.5" transform="rotate(-15 154 110)"/>
      <ellipse class="il-feuille" cx="122" cy="112" rx="9" ry="4" transform="rotate(-70 122 112)"/>
      <ellipse class="il-feuille" cx="88" cy="136" rx="9" ry="4" transform="rotate(25 88 136)"/>
      <path class="il-vase" d="M92 232c-16 0-20-24-14-40 5-13 14-16 14-24v-8h36v8c0 8 9 11 14 24 6 16 2 40-14 40z"/>
    </svg>`,
  // Une branche feuillue dans un cercle
  feuilles: `<svg viewBox="0 0 220 220" aria-hidden="true">
      <circle class="il-arche" cx="110" cy="110" r="96"/>
      <path class="il-tige" d="M60 176C88 140 118 96 160 52"/>
      ${[[78, 150, 35], [96, 126, 30], [114, 102, 25], [132, 80, 20], [150, 62, 15]].map(([x, y, a]) =>
        `<ellipse class="il-feuille" cx="${x - 14}" cy="${y - 6}" rx="14" ry="6" transform="rotate(${a - 60} ${x - 14} ${y - 6})"/>
      <ellipse class="il-feuille clair" cx="${x + 12}" cy="${y + 8}" rx="14" ry="6" transform="rotate(${a + 10} ${x + 12} ${y + 8})"/>`).join("\n      ")}
    </svg>`,
  // Deux arches qui se chevauchent et un soleil
  arche: `<svg viewBox="0 0 220 220" aria-hidden="true">
      <circle class="il-soleil" cx="160" cy="58" r="22"/>
      <path class="il-arche" d="M24 212V120a58 58 0 0 1 116 0v92z"/>
      <path class="il-interieur" d="M92 212V138a52 52 0 0 1 104 0v74z"/>
      <path class="il-sol" d="M8 212h204"/>
    </svg>`,
};
const illustration = (nom, classe = "") => `<div class="illus${classe ? " " + classe : ""}">${DESSINS[nom]}</div>`;

/* ---------- Icônes au trait (24 x 24) ---------- */
const TRACES = {
  design: '<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>',
  langue: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  recherche: '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
  refonte: '<path d="M20 11a8 8 0 0 0-14.5-4.6L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.5 4.6L20 16"/><path d="M20 20v-4h-4"/>',
  fonctions: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  securite: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  lieu: '<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
  rapide: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
  telephone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  prix: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  restaurant: '<path d="M7 3v18M5 3v5a2 2 0 0 0 4 0V3"/><path d="M17 21V3c-2 1-3.5 4-3.5 8H17"/>',
  garage: '<path d="M14.5 6.5a4 4 0 0 0-5.3 5L3 17.7 6.3 21l6.2-6.2a4 4 0 0 0 5.3-5.3l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  construction: '<path d="M4 18h16"/><path d="M5.5 18a6.5 6.5 0 0 1 13 0"/><path d="M10 11.6V8h4v3.6"/>',
  maison: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  commerce: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  autonome: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
};
const icone = (nom) => TRACES[nom]
  ? `<span class="icone" aria-hidden="true"><svg viewBox="0 0 24 24">${TRACES[nom]}</svg></span>`
  : "";

// Ajoute une icône devant chaque titre h3 d'une liste, dans l'ordre donné
const iconiser = (corps) => {
  const listes = [
    ['<ul class="raisons trois">', "</ul>", ["design", "langue", "recherche", "refonte", "fonctions", "securite"]],
    ['<ul class="raisons">', "</ul>", ["lieu", "rapide", "telephone", "prix"]],
    ['<ul class="secteurs">', "</section>", ["restaurant", "garage", "construction", "maison", "commerce", "autonome"]],
  ];
  for (const [debut, fin, noms] of listes) {
    let position = 0;
    while ((position = corps.indexOf(debut, position)) !== -1) {
      const bout = corps.indexOf(fin, position);
      let i = 0;
      const morceau = corps.slice(position, bout).replace(/<h3>/g, () => `${icone(noms[i++])}<h3>`);
      corps = corps.slice(0, position) + morceau + corps.slice(bout);
      position += morceau.length;
    }
  }
  return corps;
};

module.exports = { illustration, iconiser };
