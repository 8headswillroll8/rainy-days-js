const container = document.querySelector(".jacket__container");
const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

async function fetchAndCreateProduct() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.textContent = "No product ID provided!";
      return;
    }

    const response = await fetch(`${API_URL_PRODUCTS}/${id}`);
    const data = await response.json();
    const jacketProduct = data.data;

    const jacketProductCard = document.createElement("div");
    const jacketProductImage = document.createElement("img");
    const jacketProductTitle = document.createElement("h1");
    const jacketProductPrice = document.createElement("h2");
    const jacketProductInfo = document.createElement("p");
    const jacketProductButton = document.createElement("button");

    jacketProductCard.classList.add("jacket-product__card");
    jacketProductImage.classList.add("jacket-product__img");
    jacketProductTitle.classList.add("jacket-product__title");
    jacketProductPrice.classList.add("jacket-product__price");
    jacketProductInfo.classList.add("jacket-product__info");
    jacketProductButton.classList.add(
      "jacket-product__btn",
      "btn",
      "btn--cart"
    );

    jacketProductImage.src = jacketProduct.image.url;
    jacketProductImage.alt = jacketProduct.image?.alt || jacketProduct.title;
    jacketProductTitle.textContent = jacketProduct.title;
    jacketProductPrice.textContent = `${jacketProduct.price} NOK`;
    jacketProductInfo.textContent = jacketProduct.description;
    jacketProductButton.textContent = "Add to cart";

    // Handle “Add to cart” clicks by updating localStorage
    jacketProductButton.addEventListener("click", function () {
      console.log("Click detected");
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(jacketProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    jacketProductCard.append(
      jacketProductImage,
      jacketProductTitle,
      jacketProductPrice,
      jacketProductInfo,
      jacketProductButton
    );
    container.appendChild(jacketProductCard);
  } catch (error) {
    console.error("Fetching products failed", error);
  }
}

fetchAndCreateProduct();
