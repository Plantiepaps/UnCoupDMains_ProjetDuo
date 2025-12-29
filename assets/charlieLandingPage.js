const carousel = document.getElementById('carousel');
const btnLeft = document.querySelector('.nav.left');
const btnRight = document.querySelector('.nav.right');

const scrollAmount = 300; // quantité fixe de scroll à chaque clic

btnLeft.addEventListener('click', () => {
  carousel.scrollBy({ left: -scrollAmount});
});

btnRight.addEventListener('click', () => {
  carousel.scrollBy({ left: scrollAmount});
});

const secondeNav = document.querySelector('.secondeNav')
const arrowRight = document.querySelector(".arrowRight")


arrowRight.addEventListener("click", () => {
    secondeNav.scrollBy({ left: scrollAmount})
})