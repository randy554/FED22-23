// JavaScript Document
console.log("hi");

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
