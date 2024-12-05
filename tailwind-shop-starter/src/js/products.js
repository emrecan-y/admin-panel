export function initProducts() {
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
}
