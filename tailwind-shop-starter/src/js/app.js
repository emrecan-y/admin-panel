import { initNav, navEventListenerResize } from "./nav.js";
import { initProducts } from "./products.js";
import { initDashboard } from "./dashboard.js";
import { initProductCreation, initProductEdit } from "./product-detail.js";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

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

function injectProductList() {
  injectHTML("components/products/products.html", "#main-content").then(() =>
    initProducts(injectProductEditView),
  );
}

function injectProductEditView(productId) {
  injectHTML("components/products/product-detail.html", "#main-content").then(
    () => initProductEdit(productId),
  );
}

function injectProductDetailView() {
  injectHTML("components/products/product-detail.html", "#main-content").then(
    initProductCreation,
  );
}

function injectDashboard() {
  injectHTML("components/dashboard/dashboard.html", "#main-content").then(
    initDashboard,
  );
}

function injectUserView() {
  injectHTML("components/user/user.html", "#main-content").then();
}

injectHTML("components/nav/nav.html", "#nav").then(() =>
  initNav({
    breakpoints,
    injectDashboard,
    injectProductList,
    injectUserView,
    injectProductDetailView,
  }),
);

window.addEventListener("resize", () => navEventListenerResize(breakpoints));
injectDashboard();
