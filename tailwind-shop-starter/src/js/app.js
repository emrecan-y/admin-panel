import { initNav, navEventListenerResize } from "./nav.js";
import { initProducts } from "./products.js";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

window.addEventListener("resize", () => navEventListenerResize(breakpoints));

/**
 * Injects HTML from a file into an element
 * @param {string} htmlFile - The path to the HTML file
 * @param {string} element - The element to inject the HTML into
 * @returns {void}
 * @example
 * injectHTML('path/to/file.html', '.element')
 */
function injectHTML(htmlFile, element) {
  return fetch(htmlFile)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(element).innerHTML = data;
    });
}

// Inject the header
injectHTML("components/nav/nav.html", "#nav").then(() => initNav(breakpoints));
injectHTML("components/products/products.html", "#products").then(initProducts);
