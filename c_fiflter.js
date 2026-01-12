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
  // Je définis de combien de pixels je veux scroller à chaque clic
  const scrollAmountSecondNav = 300;
  // Je vérifie que la flèche et le conteneur des catégories existent bien dans le DOM
  if (arrowRight && lesCategories) {
    // Quand je clique sur la flèche droite, je scroll vers la droite de 300px avec une animation smooth
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
    //  si le submenu est false je fais pas le code qui suit
    if (!subMenu) {
      return;
    }
    // Je crée une variable pour stocker mon setTimeout, comme ça je peux l'annuler si besoin
    let delaiDeFermeture;
    // Quand je survole une catégorie, j'annule le délai de fermeture (au cas où) et j'ouvre le sous-menu
    categories.addEventListener("mouseenter", () => {
      clearTimeout(delaiDeFermeture);
      subMenu.classList.add("active");
    });
    // Quand je sors de la catégorie, j'attends 200ms avant de fermer le sous-menu
    // Ça me laisse le temps de passer ma souris sur le sous-menu sans qu'il se ferme
    categories.addEventListener("mouseleave", () => {
      delaiDeFermeture = setTimeout(() => {
        subMenu.classList.remove("active");
      }, 200);
    });

    // Quand je rentre dans le sous-menu, j'annule la fermeture pour qu'il reste ouvert
    subMenu.addEventListener("mouseenter", () => {
      clearTimeout(delaiDeFermeture);
      subMenu.classList.add("active");
    });
    // Quand je sors du sous-menu, je lance le délai de fermeture
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
  // Pour chaque bouton avec flèche, quand je clique dessus j'ouvre la sidebar et l'overlay
  buttonArrows.forEach((btn) => {
    btn.addEventListener("click", () => {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    });
  });
  // Quand je clique sur le bouton de fermeture, je ferme la sidebar et l'overlay
  closeButton.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });
  // Je ferme la sidebar si je clique en dehors d'elle.   , je déclare l'event sur tout le document
  document.addEventListener("click", (e) => {
    const clickDansSidebar = sidebar.contains(e.target); 
    const clickSurBouton = e.target.closest(".buttonArrow"); // Je vérifie si j'ai cliqué sur un bouton d'ouverture
    // Si j'ai cliqué ni dans la sidebar ni sur un bouton, je ferme tout
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
  // Quand je clique sur le sélecteur (si il existe), j'ouvre/ferme le menu déroulant
  if (categorySelector) {
    categorySelector.addEventListener("click", () => {
      categoryList.classList.toggle("open"); // J'affiche ou je cache la liste des catégories
      categorySelector.classList.toggle("open"); // Je change l'apparence du sélecteur (rotation de la flèche, etc)
    });
  }
  // Pour chaque catégorie dans la liste
  categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Je récupère le texte et l'icône de la catégorie que j'ai cliquée
      const selectedText = item.querySelector(".textCategory").textContent;
      const selectedImg = item.querySelector(".category-icon img");
      // Je mets à jour le texte et l'icône du sélecteur avec la catégorie choisie
      categoryText.textContent = selectedText;
      categoryIcon.src = selectedImg.src;
      categoryIcon.alt = selectedImg.alt;
      // Je ferme le menu déroulant après avoir sélectionné une catégorie
      categoryList.classList.remove("open");
      categorySelector.classList.remove("open"); // Ça remet la flèche dans sa position initiale car je retire la classe open
    });
  });

  // Le bouton reset
  const buttonReset = document.querySelector(".buttonReinitialiser");

  if (buttonReset) {
    buttonReset.addEventListener("click", () => {
      // Je vide le champ de localisation
      document.querySelector(".location-input").value = "";
      // Je vide tous les champs de prix (min et max)
      document.querySelectorAll(".price-input").forEach((input) => {
        input.value = "";
      });
      // Je remets la catégorie par défaut "Toutes catégories"
      categoryText.textContent = "Toutes catégories";
      categoryIcon.src = "/assets/img/handshake.png";
      categoryIcon.alt = "Toutes catégories";
    });
  }

  // Le button appliquer

  const buttonAppliquer = document.querySelector(".buttonAppliquer");
  // si buttonAppliquer existe
  if (buttonAppliquer) {
    buttonAppliquer.addEventListener("click", () => {
      // Je récupère la catégorie sélectionnée et je la mets en minuscule pour faciliter la comparaison
      const selectedCategory = categoryText.textContent.toLowerCase();
      // Je récupère la localisation et je nettoie les espaces en trop
      const locationInput = document
        .querySelector(".location-input")
        .value.toLowerCase()
        .trim();

      // Je récupère les valeurs des prix min et max
      const priceMinInput = document.querySelector(".price-input-min").value;
      const priceMaxInput = document.querySelector(".price-input-max").value;

      // Si l'utilisateur n'a pas renseigné de prix min, je mets 0 par défaut
      let priceMin = 0;
      if (priceMinInput) {
        priceMin = parseFloat(priceMinInput);
      }
      // Si l'utilisateur n'a pas renseigné de prix max, je mets l'infini (pas de limite)
      let priceMax = Infinity;
      if (priceMaxInput) {
        priceMax = parseFloat(priceMaxInput);
      }
      // Je récupère toutes les cartes d'annonces
      const cards = document.querySelectorAll(".cardLink");
      // Pour chaque carte, je vérifie si elle correspond aux filtres
      cards.forEach((card) => {
        const imgContainer = card.querySelector(".imgContainer");
        // Je récupère la catégorie de la carte depuis les data attributes
        let cardCategory = "";
        if (imgContainer.dataset.category) {
          cardCategory = imgContainer.dataset.category.toLowerCase();
        }

        let cardLocation = "";   // c'est une maniere se sécurisé , si il y a pas de data-location avec le if , il n'y a pas de bug
        if (imgContainer.dataset.location) {
          cardLocation = imgContainer.dataset.location.toLowerCase();
        }

        let cardPrice = 0;
        if (imgContainer.dataset.price) {
          cardPrice = parseFloat(imgContainer.dataset.price);
        }
        // Par défaut, je considère que la carte doit être affichée
        let afficher = true;
        //  Si une catégorie spécifique est sélectionnée, je vérifie que la carte correspond
        if (selectedCategory !== "toutes catégories") {
          afficher = cardCategory.includes(selectedCategory);    // par exemple si la cardCategory est "babysitting " et que selected Category est baby ou babysitting ca fonctionne
        }
        // Si une localisation est renseignée, je vérifie que la carte correspond
        if (afficher && locationInput) {
          afficher = cardLocation.includes(locationInput);
        }
        // Je vérifie que le prix de la carte est dans la fourchette définie
        if (afficher) {
          if (cardPrice < priceMin) {
            // Le prix est trop bas
            afficher = false;
          }
          if (cardPrice > priceMax) {
            // Le prix est trop haut
            afficher = false;
          }
        }
        // J'affiche ou je cache la carte selon si elle passe tous les filtres
        if (afficher) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
      // Une fois les filtres appliqués, je ferme la sidebar
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  // recuperation de l'url pour les filtres de page ?category=babysitting
  const urlParams = new URLSearchParams(window.location.search);  // le new sert a créer un nouvel objet qui va permettre de manipuler les parametres d'url
  const categoryFromURL = urlParams.get("category");  // je recupere la valeur de category dans l'url , ce qu'il y a apres le = 

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


//La pagination des cards a

// Je récupère tous les boutons de pagination (1, 2, 3...)
const boutons = document.querySelectorAll(".pageButton");

// Je récupère toutes les pages de contenu
const pages = document.querySelectorAll(".pageContent");

//  Pour CHAQUE bouton, j'ajoute un événement au clic
boutons.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    //  Je récupère le numéro de page sur lequel on a cliqué
    const numeroDePage = bouton.dataset.page;

    // Je cache TOUTES les pages d'abord
    pages.forEach((page) => {
      page.classList.remove("active"); // J'enlève la classe active de toutes les pages
    });

    //  J'enlève la surbrillance de TOUS les boutons
    boutons.forEach((btn) => {
      btn.classList.remove("active"); // J'enlève la classe active de tous les boutons
    });

    //Je cherche la page qui correspond au numéro cliqué
    pages.forEach((page) => {
      // Si le data-page de cette page correspond au numéro cliqué
      if (page.dataset.page === numeroDePage) {
        page.classList.add("active");
      }
    });

    bouton.classList.add("active");

    //Je remonte en haut de la page
    window.scrollTo({
      top: 0,
      // behavior: "smooth", // Animation douce
    });
  });
});

// Je simule un clic sur le premier bouton
if (boutons[0]) {
  boutons[0].click();
}
