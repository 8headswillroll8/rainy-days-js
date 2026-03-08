import { updateCartCounter } from "./cartCounter.js";

const container = document.querySelector(".cart__container");

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  if (cart.length === 0) {
    container.textContent = "Your cart is empty";
    updateCartCounter();
    return;
  }

  cart.forEach((item) => {
    const productContainer = document.createElement("div");
    const productImage = document.createElement("img");
    const productTitle = document.createElement("p");
    const productPrice = document.createElement("p");
    const deleteButton = document.createElement("button");

    productContainer.classList.add("cart-item__container");
    productImage.classList.add("cart-item__img");
    productTitle.classList.add("cart-item__title");
    productPrice.classList.add("cart-item__price");
    deleteButton.classList.add("cart-item__delete-btn");

    productImage.src = item.image.url;
    productImage.alt = item.image?.alt || item.title;
    productTitle.textContent = item.title;
    productPrice.textContent = `${item.price} NOK`;
    deleteButton.textContent = "Remove item";

    productContainer.append(
      productImage,
      productTitle,
      productPrice,
      deleteButton,
    );

    container.appendChild(productContainer);

    deleteButton.addEventListener("click", function () {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      renderCart();
      updateCartCounter();
    });
  });
}

renderCart();
updateCartCounter();
