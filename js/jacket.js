import { updateCartCounter } from "./cartCounter.js";

const container = document.querySelector(".jacket__container");

const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

async function fetchAndCreateProduct() {
  container.textContent = "Loading product...";

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.textContent = "No product ID provided.";
      return;
    }

    const response = await fetch(`${API_URL_PRODUCTS}/${id}`);
    const data = await response.json();
    const jacketProduct = data.data;

    container.innerHTML = "";

    const jacketProductCard = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardContent = document.createElement("div");
    const jacketProductImage = document.createElement("img");
    const jacketProductTitle = document.createElement("h1");
    const jacketProductPrice = document.createElement("h2");
    const jacketProductInfo = document.createElement("p");
    const jacketProductButton = document.createElement("button");

    jacketProductCard.classList.add("jacket-product__card");
    cardImage.classList.add("card__image");
    cardContent.classList.add("card__content");
    jacketProductImage.classList.add("jacket-product__img");
    jacketProductTitle.classList.add("jacket-product__title");
    jacketProductPrice.classList.add("jacket-product__price");
    jacketProductInfo.classList.add("jacket-product__info");
    jacketProductButton.classList.add(
      "jacket-product__btn",
      "btn",
      "btn--cart",
    );

    jacketProductImage.src = jacketProduct.image.url;
    jacketProductImage.alt = jacketProduct.image?.alt || jacketProduct.title;
    jacketProductTitle.textContent = jacketProduct.title;
    jacketProductPrice.textContent = `${jacketProduct.price} NOK`;
    jacketProductInfo.textContent = jacketProduct.description;
    jacketProductButton.textContent = "Add to cart";

    jacketProductButton.addEventListener("click", function () {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.id === jacketProduct.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...jacketProduct, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();
    });

    cardImage.append(jacketProductImage);
    cardContent.append(
      jacketProductTitle,
      jacketProductPrice,
      jacketProductInfo,
      jacketProductButton,
    );
    jacketProductCard.append(cardContent, cardImage);
    container.appendChild(jacketProductCard);
  } catch (error) {
    container.textContent = "Product failed to load. Try again later.";
  }
}

fetchAndCreateProduct();
updateCartCounter();
