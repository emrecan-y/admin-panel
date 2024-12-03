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

function injectProducts(htmlFile, element) {
  fetch(htmlFile)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(element).innerHTML = data;
      const table = document.getElementById("products-table");
      const firstRow = document.querySelector("#products-table th");
      fetch("http://localhost:3000/products").then((response) =>
        response.json().then((response) =>
          response.data.forEach((product) => {
            const row = table.insertRow();
            row.classList.add(...firstRow.classList);
            const id = row.insertCell(0);
            id.innerHTML = product.id;
            const name = row.insertCell(1);
            name.innerHTML = product.name;
            const description = row.insertCell(2);
            description.innerHTML = product.description;
            const price = row.insertCell(3);
            price.innerHTML = product.price;
          }),
        ),
      );
    });
}

// Inject the header
injectHTML("components/header/header.html", "#header");
injectProducts("components/products/products.html", "#products");
