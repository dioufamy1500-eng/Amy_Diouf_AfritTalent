const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const navbar = document.getElementById("navbar");
const icon = document.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("theme");
const backToTop= document.getElementById("backToTop");

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
    if (window.scrollY > 200) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

backToTop.addEventListener("click", () =>{
    window.scrollTo({
        top:0,
    })
})

// compteur 

const counters = document.querySelectorAll(".counter");
function animate(counter){
  const target = Number(counter.dataset.bsTarget);
  let current = 0;

  const timer = setInterval(() => {
    current = current + 10;

    counter.textContent = "+" + current;
    if (current >= target){
      counter.textContent = "+" + target;
      clearInterval(timer);
    }
  },30)
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animate(entry.target);
    }
  });
});

counters.forEach((counter) => {
  counter.textContent = "+0";
  observer.observe(counter);
});

// fad-Animation

const sections = document.querySelectorAll(".fad-section");

const regarder = new IntersectionObserver((elementsVisibles) => {
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

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation en temps réel sur blur
  form.querySelectorAll('[data-validate]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      // Effacer erreur si l'utilisateur corrige
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Valider tous les champs
    let valid = true;
    form.querySelectorAll('[data-validate]').forEach(input => {
      if (!validateField(input)) valid = false;
    });

    if (valid) {
      // Succès — afficher message
      form.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  function validateField(input) {
    const type = input.getAttribute('data-validate');
    const value = input.value.trim();
    const errorEl = document.getElementById(input.id + '-error');

    let isValid = true;
    let errorMsg = '';

    switch (type) {
      case 'required':
        if (!value) { isValid = false; errorMsg = 'Ce champ est requis.'; }
        break;
      case 'email':
        if (!value) { isValid = false; errorMsg = 'L\'email est requis.'; }
        else if (!emailRegex.test(value)) { isValid = false; errorMsg = 'Format d\'email invalide.'; }
        break;
      case 'message':
        if (!value) { isValid = false; errorMsg = 'Le message est requis.'; }
        else if (value.length < 20) { isValid = false; errorMsg = `Minimum 20 caractères (${value.length}/20).`; }
        break;
      case 'select':
        if (!value) { isValid = false; errorMsg = 'Veuillez choisir un sujet.'; }
        break;
    }

    // Mise à jour visuelle
    input.classList.toggle('is-valid', isValid && value.length > 0);
    input.classList.toggle('is-invalid', !isValid);

    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.toggle('show', !isValid);
    }

    return isValid;
  }
}
