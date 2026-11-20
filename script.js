// Adresse qui reçoit les demandes du formulaire.
const COURRIEL_CONTACT = "zndigitalcreation@gmail.com";

// Textes du formulaire dans la langue de la page
const T = document.documentElement.lang.startsWith("en") ? {
  erreurs: {
    nom: "Enter your name.",
    courriel: "Enter a valid email, for example name@business.com.",
    message: "Describe your business in a few words.",
  },
  nom: "Name", entreprise: "Business", courriel: "Email", telephone: "Phone",
  projet: "Project", siteActuel: "Current website", forfait: "Package considered",
  sujet: "Free demo request",
  envoye: "Your email app opened with your request. Attach your photos if you have any, then send the email.",
} : {
  erreurs: {
    nom: "Indiquez votre nom.",
    courriel: "Indiquez un courriel valide, par exemple nom@entreprise.ca.",
    message: "Décrivez votre entreprise en quelques mots.",
  },
  nom: "Nom", entreprise: "Entreprise", courriel: "Courriel", telephone: "Téléphone",
  projet: "Projet", siteActuel: "Site actuel", forfait: "Forfait envisagé",
  sujet: "Demande de démo gratuite",
  envoye: "Votre application de courriel s'est ouverte avec votre demande. Joignez-y vos photos si vous en avez, puis envoyez le courriel.",
};

document.getElementById("annee").textContent = new Date().getFullYear();

/* ---------- Menu sur téléphone ---------- */
const menuBouton = document.querySelector(".menu-bouton");
const nav = document.getElementById("nav");
const fermerMenu = () => {
  nav.classList.remove("ouvert");
  menuBouton.setAttribute("aria-expanded", "false");
};
menuBouton.addEventListener("click", () => {
  const ouvert = nav.classList.toggle("ouvert");
  menuBouton.setAttribute("aria-expanded", String(ouvert));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("ouvert")) { fermerMenu(); menuBouton.focus(); }
});
addEventListener("resize", () => { if (innerWidth > 1056) fermerMenu(); });

/* ---------- Formulaire de demande de démo ---------- */
const formulaire = document.getElementById("formulaire");
if (formulaire) {
  const etat = document.getElementById("etat");
  const champRefonte = document.getElementById("champ-refonte");
  const messages = T.erreurs;

  // Le champ « site actuel » n'apparaît que pour une refonte
  const majType = () => {
    champRefonte.hidden = !formulaire.querySelector('input[name="type"]:checked').hasAttribute("data-refonte");
  };
  formulaire.addEventListener("change", (e) => { if (e.target.name === "type") majType(); });
  majType();

  const verifier = (champ) => {
    const bloc = champ.closest(".champ");
    let aide = bloc.querySelector(".aide");
    const valide = champ.checkValidity();
    const decrit = (champ.dataset.decrit ??= champ.getAttribute("aria-describedby") || "");
    bloc.classList.toggle("erreur", !valide);
    if (!valide) {
      if (!aide) {
        aide = document.createElement("span");
        aide.className = "aide";
        aide.id = champ.id + "-aide";
        bloc.appendChild(aide);
        champ.setAttribute("aria-describedby", (decrit + " " + aide.id).trim());
      }
      aide.textContent = messages[champ.name];
    } else if (aide) {
      aide.remove();
      if (decrit) champ.setAttribute("aria-describedby", decrit);
      else champ.removeAttribute("aria-describedby");
    }
    champ.setAttribute("aria-invalid", String(!valide));
    return valide;
  };

  formulaire.addEventListener("input", (e) => {
    if (e.target.closest(".champ.erreur")) verifier(e.target);
  });

  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = formulaire;
    const invalides = [f.nom, f.courriel, f.message].filter((c) => !verifier(c));
    if (invalides.length) {
      invalides[0].focus();
      etat.textContent = "";
      return;
    }

    const lignes = [`${T.nom} : ${f.nom.value}`];
    if (f.entreprise.value) lignes.push(`${T.entreprise} : ${f.entreprise.value}`);
    lignes.push(`${T.courriel} : ${f.courriel.value}`);
    if (f.telephone.value) lignes.push(`${T.telephone} : ${f.telephone.value}`);
    lignes.push(`${T.projet} : ${f.type.value}`);
    if (!champRefonte.hidden && f.siteActuel.value) lignes.push(`${T.siteActuel} : ${f.siteActuel.value}`);
    lignes.push(`${T.forfait} : ${f.forfait.value}`, "", f.message.value);
    const corps = lignes.join("\n");
    const sujet = `${T.sujet} : ${f.entreprise.value || f.nom.value}`;

    window.location.href =
      `mailto:${COURRIEL_CONTACT}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    etat.textContent = T.envoye;
  });
}

/* ---------- Effets ---------- */
const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
const borne = (v, min, max) => Math.min(max, Math.max(min, v));

// Titres dévoilés en coupe quand ils entrent à l'écran.
// La coupe est portée par un span interne : un titre masqué par son propre
// clip-path ne serait jamais détecté par l'observateur.
const titres = document.querySelectorAll("main h2");
titres.forEach((t) => { t.innerHTML = `<span class="coupe">${t.innerHTML}</span>`; });
if ("IntersectionObserver" in window && !calme) {
  const vus = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("vu"); vus.unobserve(e.target); }
    });
  }, { threshold: 0.35 });
  titres.forEach((t) => vus.observe(t));
} else {
  titres.forEach((t) => t.classList.add("vu"));
}

if (!calme) {
  // Fenêtre du client : inclinaison selon la souris, défilement de la page au survol
  document.querySelectorAll(".vitrine").forEach((vitrine) => {
    vitrine.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = vitrine.getBoundingClientRect();
      vitrine.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 7).toFixed(2));
      vitrine.style.setProperty("--rx", (((e.clientY - r.top) / r.height - 0.5) * -5).toFixed(2));
    });
    vitrine.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") vitrine.classList.add("defile"); });
    vitrine.addEventListener("pointerleave", () => {
      vitrine.classList.remove("defile");
      vitrine.style.setProperty("--rx", 0);
      vitrine.style.setProperty("--ry", 0);
    });
    // Sur écran tactile, la page défile quand la fenêtre est bien visible
    if (matchMedia("(hover: none)").matches && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => vitrine.classList.toggle("defile", e.isIntersecting), { threshold: 0.7 }).observe(vitrine);
    }
  });

  // Au défilement : ombre de l'en-tête, étapes qui se tracent, fragments en fond
  const entete = document.querySelector(".entete");
  const etapes = document.querySelector(".etapes");
  const pas = etapes ? [...etapes.children] : [];
  const fragments = [...document.querySelectorAll(".fragment")];
  let prevu = false;
  const majDefilement = () => {
    prevu = false;
    const h = innerHeight;
    entete.classList.toggle("defilee", scrollY > 8);

    if (etapes) {
      const r = etapes.getBoundingClientRect();
      const avance = borne((h * 0.8 - r.top) / (r.height + h * 0.25), 0, 1) * pas.length;
      pas.forEach((li, i) => li.style.setProperty("--f", borne(avance - i, 0, 1).toFixed(3)));
    }

    fragments.forEach((f) => {
      const p = f.parentElement.getBoundingClientRect();
      if (p.bottom < 0 || p.top > h) return;
      f.style.setProperty("--par", ((p.top + p.height / 2 - h / 2) * 0.12).toFixed(1) + "px");
    });
  };
  addEventListener("scroll", () => { if (!prevu) { prevu = true; requestAnimationFrame(majDefilement); } }, { passive: true });
  addEventListener("resize", majDefilement);
  majDefilement();
}
