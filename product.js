const container = document.querySelector(".product-list--grid");
const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

async function getProducts() {
  try {
    const response = await fetch(API_URL_PRODUCTS, { method: "GET" });
    const data = await response.json();
    console.log(data);

    const products = data.data;

    products.forEach((product) => {
      const productCard = document.createElement("div");
      const productImage = document.createElement("img");
      const productTitle = document.createElement("h3");
      const productPrice = document.createElement("p");

      productCard.classList.add("product__card");
      productImage.classList.add("product__img");
      productTitle.classList.add("product__title");
      productPrice.classList.add("product__price");

      productImage.src = product.image.url;
      productTitle.textContent = product.title;
      productPrice.textContent = `${product.price} NOK`;

      productCard.append(productImage, productTitle, productPrice);
      container.appendChild(productCard);
    });
  } catch (error) {
    console.error("Fetching products failed", error);
  }
}

getProducts();
