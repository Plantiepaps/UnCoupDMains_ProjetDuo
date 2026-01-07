// Le scrolldown menu sur la barre de nav

const arrowRight = document.querySelector(".arrowRight");
const lesCategories = document.querySelector(".lesCategories");
const scrollAmountSecondNav = 300;
arrowRight.addEventListener("click", () => {
  lesCategories.scrollBy({ left: scrollAmountSecondNav, behavior: "smooth" });
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