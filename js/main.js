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
 regarder.regarder(section);
});



