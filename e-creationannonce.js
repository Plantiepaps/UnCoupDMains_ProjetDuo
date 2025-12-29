const categoryButtons = document.querySelectorAll("div.button_category");

    categoryButtons.forEach(button,() => {
        button.addEventListener("click",() => {
        button.style.backgroundColor = "#e57a44";
    });
});