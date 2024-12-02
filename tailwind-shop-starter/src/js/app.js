/**
 * Injects HTML from a file into an element
 * @param {string} htmlFile - The path to the HTML file
 * @param {string} element - The element to inject the HTML into
 * @returns {void}
 * @example
 * injectHTML('path/to/file.html', '.element')
 */
function injectHTML(htmlFile, element) {
  fetch(htmlFile)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(element).innerHTML = data;
    });
}

// Inject the header
injectHTML("components/header/header.html", "#header");
injectHTML("components/products/products.html", "#products");
