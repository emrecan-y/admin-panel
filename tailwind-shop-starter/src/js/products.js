import { getProducts, deleteProduct } from "./api.js";
import { initConfirm } from "./confirm.js";

export async function initProducts(injectProductEditView) {
  const products = await getProducts();
  fillProductsTable(products);
  addEventListenerToButtons(injectProductEditView);
}

function addEventListenerToButtons(injectProductEditView) {
  const editButtons = document.getElementsByClassName("edit-buttons");
  const deleteButtons = document.getElementsByClassName("delete-buttons");

  for (let button of deleteButtons) {
    const productId = parseInt(button.id.replace("delete-btn-", ""));
    button.addEventListener("click", (event) =>
      initConfirm(
        "Löschen?",
        event.target,
        () => deleteButonEventListener(productId, injectProductEditView),
        null,
      ),
    );
  }

  for (let button of editButtons) {
    const productId = parseInt(button.id.replace("edit-btn-", ""));
    button.addEventListener("click", () => injectProductEditView(productId));
  }
}

async function deleteButonEventListener(productId, injectProductEditView) {
  await deleteProduct(productId);
  initProducts(injectProductEditView);
}

function getButtonsHTML(productId) {
  return `
      <img
        id="edit-btn-${productId}"
        src="../resources/icons/edit-icon.png"
        class="edit-buttons w-6 rounded-md p-0.5 hover:bg-accent-dark"
        alt="edit-entry"
      />
      <img
        id="delete-btn-${productId}"
        src="../resources/icons/delete-icon.png"
        class="delete-buttons w-6 rounded-md p-1 hover:bg-accent-dark"
        alt="delete-entry"
      />`;
}

function fillProductsTable(products) {
  const table = document.getElementById("products-table");
  const firstRow = document.querySelector("#products-table tr");
  const cellTemplate = document.querySelector("#products-table tr th");
  // override table entries
  table.innerHTML = firstRow.outerHTML;
  products.forEach((product) => {
    const row = table.insertRow();

    const id = row.insertCell(0);
    id.innerHTML = product.id;
    id.classList.add(...cellTemplate.classList);

    const name = row.insertCell(1);
    name.innerHTML = product.name;
    name.classList.add(...cellTemplate.classList);

    const description = row.insertCell(2);
    description.innerHTML = product.description;
    description.classList.add(...cellTemplate.classList);

    const price = row.insertCell(3);
    price.innerHTML = product.price;
    price.classList.add(...cellTemplate.classList);

    const actions = row.insertCell(4);
    actions.innerHTML = getButtonsHTML(product.id);
    actions.classList.add(...cellTemplate.classList);
    actions.classList.add("flex", "items-center", "justify-around");
  });
}
