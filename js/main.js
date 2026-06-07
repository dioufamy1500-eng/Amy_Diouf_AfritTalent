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
        // behavior:"smooth"
    })
})




