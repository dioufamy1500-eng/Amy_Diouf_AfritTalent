const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const navbar = document.getElementById("navbar");
const icon = document.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("theme");
const backToTop = document.getElementById("backToTop");

//    CHARGEMENT THEME

if (savedTheme === "dark") {
  body.classList.add("dark");

  icon.classList.remove("bi-moon");
  icon.classList.add("bi-sun");
}

//    TOGGLE THEME

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");

    icon.classList.remove("bi-moon");
    icon.classList.add("bi-sun");
  } else {
    localStorage.setItem("theme", "light");

    icon.classList.remove("bi-sun");
    icon.classList.add("bi-moon");
  }
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // BACK TO TOP

  // window.scrollY est une propriété qui renvoie le nombre 
  // de pixels dont la page web a été défilée verticalement
  if (window.scrollY > 200) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});
//  backToTop permet de remonter instantanement la page
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
  })
})

// compteur 

const counters = document.querySelectorAll(".counter");
function animate(counter) {
  const target = Number(counter.dataset.bsTarget);
  //  counter.dataset.bsTarget permet de récupérer 
  // la valeur de l'attribut HTML data-bs-target stockée sur un élément du DOM
  let current = 0;
  // current c'est un element DOM qui permet de cibler un element
  const timer = setInterval(() => {
    current = current + 10;

    // target est une propriété essentielle qui renvoie l'élément HTML exact sur lequel 
    // un événement s'est produit (comme un clic ou une frappe)
    counter.textContent = "+" + current;
    if (current >= target) {
      counter.textContent = "+" + target;
      clearInterval(timer);
    }
  }, 30)
}

// entries c'est les paires clé-valeur d'un objet
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animate(entry.target);
    }
  });
});

// counter c'est compteur
counters.forEach((counter) => {
  counter.textContent = "+0";
  observer.observe(counter);
});

// fad-Animation

const sections = document.querySelectorAll(".fad-section");

// IntersectionObserver est le constructeur qui permet
//  de créer un objet capable de détecter quand un élément HTML devient visible (ou invisible)
const regarder = new IntersectionObserver((elementsVisibles) => {
  // Element visible c'est l'ensemble des éléments (textes, boutons, images ou blocs) 
  //  affichés et visibles à l'écran
  elementsVisibles.forEach((elementVisible) => {
    if (elementVisible.isIntersecting) {
      elementVisible.target.classList.add("show");
    }
  });
});

sections.forEach((section) => {
  regarder.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.freelance-card-wrapper');

  function filter(category) {

    cards.forEach(card => {

      const cardCategory = card.dataset.category;

      if (category === "all" || cardCategory === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  }

  buttons.forEach(btn => {

    btn.addEventListener('click', () => {

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      filter(category);
    });
  });

  // INIT
  filter("all");
});

//Formulaires

// On récupère le formulaire dans la page
var form = document.getElementById("contactForm");

// FONCTIONS UTILITAIRES

// Cette fonction affiche un message d'erreur sous un champ
function montrerErreur(champ, message) {
  champ.classList.add("is-invalid");
  // bordure rouge Bootstrap
  champ.classList.remove("is-valid");
  // enlève la bordure verte si elle était là

  // On cherche la div juste après le champ (celle avec le texte d'erreur)
  var divErreur = champ.nextElementSibling;
  if (divErreur) {
    divErreur.textContent = message;
    // on change le texte de l'erreur
  }
}

// Cette fonction affiche une bordure verte sur un champ 
function montrerSucces(champ) {
  champ.classList.remove("is-invalid");
  // enlève la bordure rouge
  champ.classList.add("is-valid");
  // ajoute la bordure verte Bootstrap
}

// VALIDATION D'UN CHAMP

// Cette fonction vérifie UN seul champ et retourne true (valide) ou false (invalide)
function validerChamp(champ) {
  var valeur = champ.value.trim();
  // .trim() enlève les espaces au début et à la fin
  var id = champ.id;
  // l'identifiant du champ (ex: nom, email)

  // Vérification du champ NOM 
  if (id === "nom") {
    if (valeur === "") {
      montrerErreur(champ, "Le nom est requis.");
      return false;
    }
    if (valeur.length < 2) {
      montrerErreur(champ, "Minimum 2 caractères.");
      return false;
    }
  }

  // Vérification du champ PRÉNOM 
  if (id === "prenom") {
    if (valeur === "") {
      montrerErreur(champ, "Le prénom est requis.");
      return false;
    }
    if (valeur.length < 2) {
      montrerErreur(champ, "Minimum 2 caractères.");
      return false;
    }
  }

  // Vérification du champ EMAIL 
  if (id === "email") {
    // Une regex est une formule qui vérifie le format d'un texte
    // Ici elle vérifie qu'il y a bien un @ et un point dans l'email
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valeur === "") {
      montrerErreur(champ, "L'email est requis.");
      return false;
    }
    if (regexEmail.test(valeur) === false) {
      montrerErreur(champ, "Email invalide. Exemple : nom@domaine.com");
      return false;
    }
  }

  //  Vérification du champ 
  if (id === "sujet") {
    if (valeur === "") {
      montrerErreur(champ, "Veuillez choisir un sujet.");
      return false;
    }
  }

  // Vérification du champ MESSAGE 
  if (id === "message") {
    if (valeur === "") {
      montrerErreur(champ, "Le message est requis.");
      return false;
    }
    if (valeur.length < 20) {
      var manque = 20 - valeur.length;
      // manque de caractères comme taille ou longeur d'un structure de donner(length)
      montrerErreur(
        champ,
        "Encore " + manque + " caractère(s) minimum requis.",
      );
      return false;
    }
  }

  // le champ est valide
  montrerSucces(champ);
  return true;
}

// VALIDATION EN TEMPS RÉEL 

// On récupère tous les champs du formulaire 
var tousLesChamps = form.querySelectorAll("input, select, textarea");

// écouter Pour chaque champ deux événements
for (var i = 0; i < tousLesChamps.length; i++) {
  var champ = tousLesChamps[i];

  // blur se déclenche quand l'utilisateur quitte le champ (clique ailleurs)
  champ.addEventListener("blur", function () {
    validerChamp(this);
    // this le champ qui vient d'être quitté
  });

  // input se déclenche à chaque frappe 
  champ.addEventListener("input", function () {
    // re-validation
    if (this.classList.contains("is-invalid")) {
      validerChamp(this);
    }
  });
}

// FORMULAIRE 

form.addEventListener("submit", function (e) {
  // Empêche la page de se recharger
  e.preventDefault();


  //validation de tous les champs 
  var toutEstValide = true;

  for (var i = 0; i < tousLesChamps.length; i++) {
    var resultat = validerChamp(tousLesChamps[i]);
    if (resultat === false) {
      toutEstValide = false;
    }
  }

  //scroller vers la première et s'arrêter
  if (toutEstValide === false) {
    var premierChampEnErreur = form.querySelector(".is-invalid");
    if (premierChampEnErreur) {
      premierChampEnErreur.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      premierChampEnErreur.focus();
    }
    return;
  }

  //  affiche le message de succès
  var messageSucces = document.getElementById("successMessage");
  messageSucces.classList.remove("d-none");
  messageSucces.scrollIntoView({ behavior: "smooth", block: "center" });

  //  remet le formulaire à zéro
  setTimeout(function () {
    form.reset(); // vide tous les champs

    //  enlève les bordures vertes/rouges
    for (var i = 0; i < tousLesChamps.length; i++) {
      tousLesChamps[i].classList.remove("is-valid", "is-invalid");
    }

    //  cache le message de succès
    messageSucces.classList.add("d-none");
  }, 5000);
  // 5000 millisecondes = 5 secondes
});

