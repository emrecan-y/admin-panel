import { getProductById, updateProduct, createProduct } from "./api.js";

export async function initProductEdit(productId, injectProductList) {
  const product = await getProductById(productId);
  document.getElementById("product-detail-name").value = product.name;
  document.getElementById("product-detail-price").value = product.price;
  document.getElementById("product-detail-desc").value = product.description;

  document.querySelector("#product-cancel-btn p").innerText = "Abbrechen";
  document.querySelector("#product-confirm-btn p").innerText = "Speichern";

  const cancelButton = document.getElementById("product-cancel-btn");
  cancelButton.addEventListener("click", () =>
    cancelButtonEditHandler(injectProductList),
  );

  const confirmButton = document.getElementById("product-confirm-btn");
  confirmButton.addEventListener("click", () =>
    confirmButtonEditHandler(product, injectProductList),
  );
}

export function initProductCreation(injectProductList) {
  document.querySelector("#product-cancel-btn p").innerText = "Verwerfen";
  document.querySelector("#product-confirm-btn p").innerText = "Erstellen";

  const cancelButton = document.getElementById("product-cancel-btn");
  cancelButton.addEventListener("click", cancelButtonCreationHandler);

  const confirmButton = document.getElementById("product-confirm-btn");
  confirmButton.addEventListener("click", () =>
    confirmButtonCreationtHandler(injectProductList),
  );
}

async function confirmButtonEditHandler(product, injectProductList) {
  product.name = document.getElementById("product-detail-name").value;
  product.price = document.getElementById("product-detail-price").value;
  product.description = document.getElementById("product-detail-desc").value;
  await updateProduct(product);
  injectProductList();
}

async function cancelButtonEditHandler(injectProductList) {
  injectProductList();
}

async function confirmButtonCreationtHandler(injectProductList) {
  let newProduct = {};
  console.log("s");
  newProduct.name = document.getElementById("product-detail-name").value;
  newProduct.price = document.getElementById("product-detail-price").value;
  newProduct.description = document.getElementById("product-detail-desc").value;
  await createProduct(newProduct);
  injectProductList();
}

async function cancelButtonCreationHandler() {
  document.getElementById("product-detail-name").value = "";
  document.getElementById("product-detail-price").value = "";
  document.getElementById("product-detail-desc").value = "";
}
