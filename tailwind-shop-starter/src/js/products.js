import { getProducts, deleteProduct } from "./api.js";
import { initConfirm } from "./confirm.js";

const listEntryStylingDark =
  "border-r-4 border-solid border-nav text-left bg-table-dark px-1 py-2".split(
    " ",
  );
const listEntryStylingLight =
  "border-r-4 border-solid border-nav text-left bg-table-light px-1 py-2".split(
    " ",
  );

export async function initProducts(injectProductEditView) {
  const products = await getProducts();
  fillProductsTable(products);
  addEventListenerToButtons(injectProductEditView);
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

function hideDescription() {
  const descriptions = document.getElementsByClassName("product-descriptions");
  if (descriptions !== null) {
    for (let label of descriptions) {
      label.classList.add("hidden");
    }
  }
}

function showDescription() {
  const descriptions = document.getElementsByClassName("product-descriptions");
  if (descriptions !== null) {
    for (let label of descriptions) {
      label.classList.remove("hidden");
    }
  }
}

export function productsEventListenerResize(breakpoints) {
  const descriptions = document.getElementsByClassName("product-descriptions");

  if (descriptions !== null) {
    const currentWidth = document.documentElement.clientWidth;
    const isDefault = currentWidth < breakpoints.sm;
    const isTablet = currentWidth < breakpoints.lg;
    if (isDefault) {
      hideDescription();
    } else if (isTablet) {
      showDescription();
    }
  }
}

function fillProductsTable(products) {
  const table = document.getElementById("products-table");
  const firstRow = document.querySelector("#products-table tr");
  const cellTemplate = document.querySelector("#products-table tr th");
  // override table entries
  table.innerHTML = firstRow.outerHTML;

  for (let i = 0; i < products.length; i++) {
    const style = i % 2 ? listEntryStylingLight : listEntryStylingDark;

    const row = table.insertRow();

    const id = row.insertCell(0);
    id.innerHTML = products[i].id;
    id.classList.add(...style);

    const name = row.insertCell(1);
    name.innerHTML = products[i].name;
    name.classList.add(...style);

    const description = row.insertCell(2);
    description.innerHTML = products[i].description;
    description.classList.add(...style);
    description.classList.add("product-descriptions");

    const price = row.insertCell(3);
    price.innerHTML = products[i].price;
    price.classList.add(...style);

    const actions = row.insertCell(4);
    actions.innerHTML = getButtonsHTML(products[i].id);
    actions.classList.add(...style);
    actions.classList.add("flex", "items-center", "justify-around");
  }
}
