const url = "http://localhost:3000";
const apiKey =
  "TE2FlPiHDhap9AC5CpwGJTK9IF5S8hBT7SyLLa3hhM1hYP9Gw9eCFevyjJ2pc/vqc6EErVNYSto7CWLPb78C1g==";

export async function getProducts() {
  const response = await fetch(url + "/products");
  const { data } = await response.json();
  return data;
}

export async function getProductById(productId) {
  const response = await fetch(url + "/products/" + productId);
  const { data } = await response.json();
  return data;
}

export async function deleteProduct(productId) {
  let response = await fetch(url + "/products/" + productId, {
    method: "DELETE",
    headers: {
      "x-api-key": apiKey,
    },
  });
}

export async function updateProduct(product) {
  let response = await fetch(url + "/products/" + product.id, {
    method: "PUT",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

export async function createProduct(product) {
  let response = await fetch(url + "/products", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}
