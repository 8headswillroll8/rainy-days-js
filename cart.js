// Fetch product(s) from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);
// Select the container where the product will be displayed
const container = document.querySelector(".cart__container");

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
    });
  });
}

renderCart();
