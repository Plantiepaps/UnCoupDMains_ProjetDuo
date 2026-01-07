// && veut dire et
// parseFloat convertir les nombres en string même après la virgule à l'instar de parseInt
// .trim qui retire les espaces
// .toLowerCase qui ne prends pas en compte les majuscules et mets tout en minuscules
// .toUpperCase qui fait l'invere et qui mets tout en majuscules
// .value recupere la valeur qui est de "" par défaut d'un input
// infinity qui permets de mettre n'importe quel chiffre
// !== veut dire n'est pas ou est different de
// || veut dire ou
// function() = () =>

// Attends que la parge se charge avant d'executer le JS
document.addEventListener("DOMContentLoaded", () => {
  // Le scroll de la secoonde barre de nav
  const arrowRight = document.querySelector(".arrowRight");
  const lesCategories = document.querySelector(".lesCategories");
  const scrollAmountSecondNav = 300;

  if (arrowRight && lesCategories) {
    arrowRight.addEventListener("click", () => {
      lesCategories.scrollBy({
        left: scrollAmountSecondNav,
        behavior: "smooth",
      });
    });
  }
  // Le menu scrolldown avec les sous categories
  const menuSubCategories = document.querySelectorAll(
    ".grosOngletsEtSubMenu > li"
  );

  menuSubCategories.forEach((categories) => {
    const subMenu = categories.querySelector(".subMenu");

    if (!subMenu) {
      return;
    }

    let delaiDeFermeture;

    categories.addEventListener("mouseenter", () => {
      clearTimeout(delaiDeFermeture);
      subMenu.classList.add("active");
    });

    categories.addEventListener("mouseleave", () => {
      delaiDeFermeture = setTimeout(() => {
        subMenu.classList.remove("active");
      }, 200);
    });

    subMenu.addEventListener("mouseenter", () => {
      clearTimeout(delaiDeFermeture);
      subMenu.classList.add("active");
    });

    subMenu.addEventListener("mouseleave", () => {
      delaiDeFermeture = setTimeout(() => {
        subMenu.classList.remove("active");
      }, 200);
    });
  });

  // Les boutons des filtres pour faire apparaitre la sideBar
  const buttonArrows = document.querySelectorAll(".buttonArrow");
  const sidebar = document.querySelector(".sidebar");
  const closeButton = document.querySelector(".closeButton");
  const sidebarOverlay = document.querySelector(".sidebarOverlay");

  buttonArrows.forEach((btn) => {
    btn.addEventListener("click", () => {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    });
  });

  closeButton.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    const clickDansSidebar = sidebar.contains(e.target);
    const clickSurBouton = e.target.closest(".buttonArrow");

    if (!clickDansSidebar && !clickSurBouton) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
  });

  // Le menu deroulant de la categorie dans la sidebar
  const categorySelector = document.querySelector(".categorySelector");
  const categoryList = document.querySelector(".categoryList");
  const categoryText = document.querySelector(".category-selector-text");
  const categoryIcon = document.querySelector(".category-selector-icon img");
  const categoryItems = document.querySelectorAll(".category-item");

  if (categorySelector) {
    categorySelector.addEventListener("click", () => {
      categoryList.classList.toggle("open");
      categorySelector.classList.toggle("open");
    });
  }

  categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const selectedText = item.querySelector(".textCategory").textContent;
      const selectedImg = item.querySelector(".category-icon img");

      categoryText.textContent = selectedText;
      categoryIcon.src = selectedImg.src;
      categoryIcon.alt = selectedImg.alt;
      categoryList.classList.remove("open");
      categorySelector.classList.remove("open"); // Ça retire la rotation automatiquement
    });
  });

  // Le bouton reset
  const buttonReset = document.querySelector(".buttonReinitialiser");

  if (buttonReset) {
    buttonReset.addEventListener("click", () => {
      document.querySelector(".location-input").value = "";

      document.querySelectorAll(".price-input").forEach((input) => {
        input.value = "";
      });

      categoryText.textContent = "Toutes catégories";
      categoryIcon.src = "/assets/img/handshake.png";
      categoryIcon.alt = "Toutes catégories";
    });
  }

  // Le button appliquer

  const buttonAppliquer = document.querySelector(".buttonAppliquer");

  if (buttonAppliquer) {
    buttonAppliquer.addEventListener("click", () => {
      const selectedCategory = categoryText.textContent.toLowerCase();
      const locationInput = document
        .querySelector(".location-input")
        .value.toLowerCase()
        .trim();
      const priceMinInput = document.querySelector(".price-input-min").value;
      const priceMaxInput = document.querySelector(".price-input-max").value;

      let priceMin = 0;
      if (priceMinInput) {
        priceMin = parseFloat(priceMinInput);
      }

      let priceMax = Infinity;
      if (priceMaxInput) {
        priceMax = parseFloat(priceMaxInput);
      }

      const cards = document.querySelectorAll(".cardLink");

      cards.forEach((card) => {
        const imgContainer = card.querySelector(".imgContainer");

        let cardCategory = "";
        if (imgContainer.dataset.category) {
          cardCategory = imgContainer.dataset.category.toLowerCase();
        }

        let cardLocation = "";
        if (imgContainer.dataset.location) {
          cardLocation = imgContainer.dataset.location.toLowerCase();
        }

        let cardPrice = 0;
        if (imgContainer.dataset.price) {
          cardPrice = parseFloat(imgContainer.dataset.price);
        }

        let afficher = true;

        if (selectedCategory !== "toutes catégories") {
          afficher = cardCategory.includes(selectedCategory);
        }

        if (afficher && locationInput) {
          afficher = cardLocation.includes(locationInput);
        }

        if (afficher) {
          if (cardPrice < priceMin) {
            afficher = false;
          }
          if (cardPrice > priceMax) {
            afficher = false;
          }
        }

        if (afficher) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }


  // recuperation de l'url pour les filtres de page ?category=babysitting
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromURL = urlParams.get("category");

  if (categoryFromURL) {
    const services = document.querySelectorAll(".cardLink");

    services.forEach((service) => {
      const imgContainer = service.querySelector(".imgContainer");

      if (imgContainer.dataset.category !== categoryFromURL) {
        service.style.display = "none";
      }
    });
  }
});




// Le changement des pages pour le content de la page
const containers = document.querySelectorAll(".pageContent");
const pageButtons = document.querySelectorAll(".pageButton");

function showPage(page) {
  containers.forEach((c) =>
    c.classList.toggle("active", c.dataset.page === page)
  );

  pageButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.page === page)
  );

  // remonter en haut de la page 
  window.scrollTo({
    top: 0,
  });
}

// clic bouton
pageButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.hash = `page=${btn.dataset.page}`;
  });
});

// URL
window.addEventListener("hashchange", handleRoute);

function handleRoute() {
  const page = window.location.hash.includes("page=")
    ? window.location.hash.split("page=")[1]
    : "1";

  showPage(page);
}

handleRoute();
