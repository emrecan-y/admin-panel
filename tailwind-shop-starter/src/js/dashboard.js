import { getProducts } from "./api.js";

export async function initDashboard() {
  setProductCount();
}

async function setProductCount() {
  const products = await getProducts();
  document.getElementById("product-count").innerText = products.length;
}
