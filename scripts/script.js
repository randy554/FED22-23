// JavaScript Document

//Stap 1: Variabel declareren (hoe heet mijn html element en waar staat dit)
var body = document.querySelector("body");
var menuButton = document.querySelector("header > button");
var navigationMenu = document.querySelector("header nav:last-of-type");

//Stap 2: EventListener aanmaken (wanneer werk ik?)
menuButton.addEventListener("click", openMenu);

//Stap 3: Functie aanmaken
function openMenu() {
  navigationMenu.classList.toggle("open");
  body.classList.toggle("dontScrollPls"); //zodat de pagina zelf niet meer te scrollen is.
}

// hamburger menu sluiten

window.addEventListener("keydown", (event) => {
  if (event.key == "Escape") {
    navigationMenu.classList.remove("open");
    body.classList.remove("dontScrollPls"); //zodat de pagina zelf niet meer te scrollen is.
  }
});

// Footer mobile menu

let arrowMenuButtons = document.querySelectorAll(
  "footer > section:first-of-type > section > button"
);
let headerMenuButtons = document.querySelectorAll(
  "footer > section:first-of-type > section > h3"
);

arrowMenuButtons.forEach((arrowMenuButton) => {
  arrowMenuButton.addEventListener("click", toggleMenu);
});

headerMenuButtons.forEach((headerMenuButton) => {
  headerMenuButton.addEventListener("click", toggleMenu);
});

function toggleMenu() {
  // let button = event.target;
  // let section = button.parentElement;
  // let content = section.querySelector("section");

  // content.classList.toggle("open");
  // button.classList.toggle("open");

  // let theButtonThatWasClicked = event.target;

  console.log("toggleMenu");

  // De button die geklikt is (button of h3 element)
  let theButtonThatWasClicked = this;

  // Vindt de section die de geklikte button bevat
  let theSectionThatHoldsTheClickedButton =
    theButtonThatWasClicked.closest("section");

  // Toggle de class open op de section
  theSectionThatHoldsTheClickedButton.classList.toggle("open");
}
