// Homepage script, keeps cart counter in sync and shows trending products

function getCartCount() {
  // Read cart from localStorage and return total quantity
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach((item) => {
    count += item.quantity || 1;
  });

  return count;
}

function updateCartCount(count) {
  // Update the cart badge in the header
  const counterIcon = document.querySelector(".cart-counter");
  if (!counterIcon) {
    return;
  }

  if (count > 0) {
    // Show badge and write number
    counterIcon.classList.remove("cart-counter--hidden");
    counterIcon.textContent = count;
  } else {
    // Hide badge if there are no items
    counterIcon.classList.add("cart-counter--hidden");
  }
}

// Make sure the cart counter is correct when the page loads
window.addEventListener("load", function () {
  updateCartCount(getCartCount());
});

// Container for the trending products section on the homepage
const trendingContainer = document.querySelector(".product-list");

// Base API setup
const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

// Fetch a list of products and show three as "trending" on the homepage
async function loadTrending() {
  if (!trendingContainer) {
    // If the container is missing, do nothing
    return;
  }

  // Show a loading message while waiting for the API response
  trendingContainer.textContent = "Loading products...";

  try {
    // Fetch all products from the API
    const response = await fetch(API_URL_PRODUCTS);
    const data = await response.json();
    const products = data.data;

    // Remove loading text before rendering cards
    trendingContainer.innerHTML = "";

    // Pick the first three products as trending
    const trending = products.slice(0, 3);

    // Build and append a card for each trending product
    trending.forEach((product) => {
      const productCard = document.createElement("div");
      const productImage = document.createElement("img");
      const productTitle = document.createElement("h3");
      const productPrice = document.createElement("p");
      const productAnchor = document.createElement("a");

      // Apply BEM classes
      productCard.classList.add("product__card");
      productImage.classList.add("product__img");
      productTitle.classList.add("product__title");
      productPrice.classList.add("product__price");
      productAnchor.classList.add("product__link");

      // Fill elements with product data
      productImage.src = product.image.url;
      productImage.alt = product.image?.alt || product.title;

      productTitle.textContent = product.title;
      productPrice.textContent = product.price + " NOK";
      productAnchor.href = "jacket.html?id=" + product.id;

      // Combine elements and add to the page
      productCard.append(productImage, productTitle, productPrice);
      productAnchor.append(productCard);
      trendingContainer.append(productAnchor);
    });
  } catch (error) {
    // Show a user friendly message if the API call fails
    trendingContainer.textContent =
      "Sorry, the products failed to load. Please try again later.";
  }
}

// Run the function when the script loads
loadTrending();
