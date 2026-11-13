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
