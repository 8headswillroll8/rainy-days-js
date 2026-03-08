// Cart page script, reads items from localStorage and shows them in the cart

// Fetch product(s) from localStorage when the file loads
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Select the container where the cart products will be displayed
const container = document.querySelector(".cart__container");

function getCartCount() {
  // Read cart again from localStorage and return total quantity
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach((item) => {
    // Each item has a quantity value, default to 1 if missing
    count += item.quantity || 1;
  });

  return count;
}

function updateCartCount(count) {
  // Update the cart counter icon in the header
  const counterIcon = document.querySelector(".cart-counter");

  if (count > 0) {
    // Show the badge and display the number of items
    counterIcon.classList.remove("cart-counter--hidden");
    counterIcon.textContent = count;
  } else {
    // Hide the badge when the cart is empty
    counterIcon.classList.add("cart-counter--hidden");
  }
}

// Make sure the cart counter is correct when the cart page loads
window.addEventListener("load", function () {
  const count = getCartCount();
  updateCartCount(count);
});

function renderCart() {
  // Display message if cart is empty and stop
  if (cart.length === 0) {
    container.textContent = "Your cart is empty";
    return;
  }

  // Loop through each cart item and render it
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

    // Add click handler for deleting items in the cart
    deleteButton.addEventListener("click", function () {
      // Read the latest cart from localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Create a new cart without this item
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Remove this item from the DOM
      productContainer.remove();

      // Update the cart counter after removal
      const count = getCartCount();
      updateCartCount(count);
    });
  });
}

// Render all cart items when the script runs
renderCart();
