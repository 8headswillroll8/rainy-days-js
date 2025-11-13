const container = document.querySelector(".product-list--grid");
const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

let allProducts = [];

async function getProducts() {
  try {
    const response = await fetch(API_URL_PRODUCTS, { method: "GET" });
    const data = await response.json();
    const products = data.data;
    allProducts = products;

    products.forEach((product) => {
      const productCard = document.createElement("div");
      const productImage = document.createElement("img");
      const productTitle = document.createElement("h3");
      const productPrice = document.createElement("p");
      const productAnchor = document.createElement("a");

      productCard.classList.add("product__card");
      productImage.classList.add("product__img");
      productTitle.classList.add("product__title");
      productPrice.classList.add("product__price");
      productAnchor.classList.add("product__link");

      productImage.src = product.image.url;
      productImage.alt = product.image?.alt || product.title;
      productImage.loading = "lazy";
      productImage.decoding = "async";

      productTitle.textContent = product.title;
      productPrice.textContent = `${product.price} NOK`;
      productAnchor.href = `jacket.html?id=${product.id}`;

      productCard.append(productImage, productTitle, productPrice);
      productAnchor.appendChild(productCard);
      container.appendChild(productAnchor);
    });
  } catch (error) {
    console.error("Fetching products failed", error);
  }
}

getProducts();

// Filter product by gender

const filterContainer = document.querySelector(".data-filter");
const clearButton = document.getElementById("clear-filter");

filterContainer.addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  console.log("gender filter:", selectedValue);
});

clearButton.addEventListener("click", function () {
  console.log("click detected on clear button");
});
