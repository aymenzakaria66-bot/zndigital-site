// Adresse qui reçoit les demandes du formulaire.
const COURRIEL_CONTACT = "zndigitalcreation@gmail.com";

const lien = document.getElementById("lien-courriel");
lien.href = "mailto:" + COURRIEL_CONTACT;
lien.textContent = COURRIEL_CONTACT;

document.getElementById("annee").textContent = new Date().getFullYear();

const formulaire = document.getElementById("formulaire");
const etat = document.getElementById("etat");

const messages = {
  nom: "Indiquez votre nom.",
  courriel: "Indiquez un courriel valide, par exemple nom@entreprise.ca.",
  message: "Décrivez votre projet en quelques mots.",
};

function verifier(champ) {
  const bloc = champ.closest(".champ");
  let aide = bloc.querySelector(".aide");
  const valide = champ.checkValidity();
  bloc.classList.toggle("erreur", !valide);
  if (!valide) {
    if (!aide) {
      aide = document.createElement("span");
      aide.className = "aide";
      aide.id = champ.id + "-aide";
      bloc.appendChild(aide);
      champ.setAttribute("aria-describedby", aide.id);
    }
    aide.textContent = messages[champ.name];
  } else if (aide) {
    aide.remove();
    champ.removeAttribute("aria-describedby");
  }
  champ.setAttribute("aria-invalid", String(!valide));
  return valide;
}

formulaire.addEventListener("input", (e) => {
  if (e.target.closest(".champ.erreur")) verifier(e.target);
});

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  const champs = [formulaire.nom, formulaire.courriel, formulaire.message];
  const invalides = champs.filter((c) => !verifier(c));
  if (invalides.length) {
    invalides[0].focus();
    etat.textContent = "";
    return;
  }

  const type = formulaire.type.value;
  const sujet = `Nouveau projet (${type}) : ${formulaire.nom.value}`;
  const corps =
    `Nom : ${formulaire.nom.value}\n` +
    `Courriel : ${formulaire.courriel.value}\n` +
    `Type de projet : ${type}\n\n` +
    formulaire.message.value;

  window.location.href =
    `mailto:${COURRIEL_CONTACT}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  etat.textContent =
    "Courriel préparé dans votre messagerie. Il ne reste qu'à l'envoyer.";
});

/* ---------- Effets ---------- */
const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
const borne = (v, min, max) => Math.min(max, Math.max(min, v));

// Titres dévoilés en coupe quand ils entrent à l'écran
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
  // Monogramme : les pièces s'écartent et suivent la souris
  const hero = document.querySelector(".hero");
  const zn = document.querySelector(".hero-zn");
  zn.lastElementChild.addEventListener("animationend", () => zn.classList.add("pret"));
  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = zn.getBoundingClientRect();
    zn.style.setProperty("--mx", borne((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1));
    zn.style.setProperty("--my", borne((e.clientY - (r.top + r.height / 2)) / r.height, -1, 1));
    zn.classList.add("actif");
  });
  hero.addEventListener("pointerleave", () => zn.classList.remove("actif"));

  // Fenêtre du client : inclinaison selon la souris, défilement au survol
  const vitrine = document.querySelector(".vitrine");
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

  // Au défilement : ombre de l'en-tête, étapes qui se tracent, fragments en fond
  const entete = document.querySelector(".entete");
  const etapes = document.querySelector(".etapes");
  const pas = [...etapes.children];
  const fragments = [...document.querySelectorAll(".fragment")];
  let prevu = false;
  const majDefilement = () => {
    prevu = false;
    const h = innerHeight;
    entete.classList.toggle("defilee", scrollY > 8);

    const r = etapes.getBoundingClientRect();
    const avance = borne((h * 0.8 - r.top) / (r.height + h * 0.25), 0, 1) * pas.length;
    pas.forEach((li, i) => li.style.setProperty("--f", borne(avance - i, 0, 1).toFixed(3)));

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
