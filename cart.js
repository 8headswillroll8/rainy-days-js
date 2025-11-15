// Fetch product(s) from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);
// Select the container where the product will be displayed
const container = document.querySelector(".cart__container");

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach((item) => {
    count += item.quantity || 1;
  });

  return count;
}

function updateCartCount(count) {
  const counterIcon = document.querySelector(".cart-counter");

  if (count > 0) {
    counterIcon.classList.remove("cart-counter--hidden");
    counterIcon.textContent = count;
  } else {
    counterIcon.classList.add("cart-counter--hidden");
  }
}

window.addEventListener("load", function () {
  const count = getCartCount();
  updateCartCount(count);
});

function renderCart() {
  // Display message is cart is empty
  if (cart.length === 0) {
    container.textContent = "Your cart is empty";
    return;
  }

  cart.forEach((item) => {
    // Create elements for the product display
    const productContainer = document.createElement("div");
    const productImage = document.createElement("img");
    const productTitle = document.createElement("p");
    const productPrice = document.createElement("p");
    const deleteButton = document.createElement("button");

    // Apply BEM-style classes
    productContainer.classList.add("cart-item__container");
    productImage.classList.add("cart-item__img");
    productTitle.classList.add("cart-item__title");
    productPrice.classList.add("cart-item__price");
    deleteButton.classList.add("cart-item__delete-btn");

    // Fill elements with product data
    productImage.src = item.image.url;
    productImage.alt = item.image?.alt || item.title;
    productTitle.textContent = item.title;
    productPrice.textContent = `${item.price} NOK`;
    deleteButton.textContent = "Remove item";

    // Combine all product elements and display on the page
    productContainer.append(
      productImage,
      productTitle,
      productPrice,
      deleteButton
    );
    container.appendChild(productContainer);

    // Adding the button for deleting items in the cart
    deleteButton.addEventListener("click", function () {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      productContainer.remove();

      // Updating the cart counter
      const count = getCartCount();
      updateCartCount(count);
    });
  });
}

renderCart();
