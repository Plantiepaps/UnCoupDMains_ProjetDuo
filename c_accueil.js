const scrollAmountSecondNav = 300; // quantité fixe de scroll à chaque clic , c'est en pixels

const arrowRight = document.querySelector(".arrowRight");
const lesCategories = document.querySelector(".lesCategories");

arrowRight.addEventListener("click", () => {
  lesCategories.scrollBy({ left: scrollAmountSecondNav, behavior: "smooth" });
});

/* Le js pour le caroussel des services les plus demandées  */

// Le mobile

const hamburger = document.querySelector(".menuHamburger"); // le logo hamburger
const menuToggle = document.querySelector(".menuHamburgerToggle"); // le contenu du menu
const exitButton = document.querySelector(".exitButton"); // la croix pour sortir du menu

hamburger.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
});

exitButton.addEventListener("click", () => {
  menuToggle.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (!menuToggle.contains(e.target) && !hamburger.contains(e.target)) {
    menuToggle.classList.remove("active");
  }
});

// Je sélectionne tous mes <li> qui sont directement dans .grosOngletsEtSubMenu
const menuSubCategories = document.querySelectorAll(
  ".grosOngletsEtSubMenu > li"
);

// Je boucle sur chaque <li> que j'ai trouvé
menuSubCategories.forEach((categories) => {
  // Dans ce <li>, je cherche s'il y a un .subMenu
  const subMenu = categories.querySelector(".subMenu");

  // Si j'ai trouvé un sous-menu dans ce <li>
  if (subMenu) {
    // Je crée une variable vide pour stocker mon timer plus tard
    let delaiDeFermeture;

    // Quand ma souris ENTRE sur mon <li>
    categories.addEventListener("mouseenter", () => {
      clearTimeout(delaiDeFermeture); // J'annule le timer s'il existe
      subMenu.classList.add("active"); // J'ouvre le menu
    });

    // Quand ma souris SORT de mon <li>
    categories.addEventListener("mouseleave", () => {
      delaiDeFermeture = setTimeout(() => {
        // Je lance un timer de 200ms
        subMenu.classList.remove("active"); // Après 200ms, je ferme le menu
      }, 200);
    });

    // Quand ma souris ENTRE sur mon .subMenu
    subMenu.addEventListener("mouseenter", () => {
      clearTimeout(delaiDeFermeture); // J'annule le timer pour pas que ça se ferme
      subMenu.classList.add("active"); // Je m'assure que c'est bien ouvert
    });

    // Quand ma souris SORT de mon .subMenu
    subMenu.addEventListener("mouseleave", () => {
      delaiDeFermeture = setTimeout(() => {
        // Je lance un timer de 200ms
        subMenu.classList.remove("active"); // Après 200ms, je ferme le menu
      }, 200);
    });
  }
});

// filtrer les pages selon la categorie

// Récupérer le paramètre "category" de l'URL
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

// Filtrer les services selon la catégorie
if (selectedCategory) {
  const services = document.querySelectorAll(".imgContainer");

  services.forEach((service) => {
    const serviceCategory = service.dataset.category; // Le service doit avoir un data-category

    if (serviceCategory !== selectedCategory) {
      service.style.display = "none"; // Cacher les services qui ne correspondent pas
    }
  });
}
