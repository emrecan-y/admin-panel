import { getProductById, updateProduct, createProduct } from "./api.js";

// -1 means compnent is used for product creation
// everything else for product editing
let currentProducttId = -1;

export async function initProductEdit(productId) {
  currentProducttId = productId;
  const product = await getProductById(productId);
  console.log(product);
  document.getElementById("product-detail-name").value = product.name;
  document.getElementById("product-detail-price").value = product.price;
  document.getElementById("product-detail-desc").value = product.description;
  initButtons();
}

export function initProductCreation() {
  currentProducttId = -1;
  initButtons();
}

function initButtons() {
  const cancelButton = document.getElementById("product-cancel-btn");
  const confirmButton = document.getElementById("product-confirm-btn");
  if (currentProducttId == -1) {
    confirmButton, addEventListener("click", createButtonHandler);
  } else {
    confirmButton.addEventListener("click", () => updateButtonHandler());
  }
}

function updateButtonHandler() {
  let updatedProduct = {};
  updatedProduct.id = currentProducttId;
  updatedProduct.name = document.getElementById("product-detail-name").value;
  updatedProduct.price = document.getElementById("product-detail-price").value;
  updatedProduct.description = document.getElementById(
    "product-detail-desc",
  ).value;
  updateProduct(updatedProduct);
}

function createButtonHandler() {
  let newProduct = {};
  newProduct.name = document.getElementById("product-detail-name").value;
  newProduct.price = document.getElementById("product-detail-price").value;
  newProduct.description = document.getElementById("product-detail-desc").value;
  createProduct(newProduct);
}
