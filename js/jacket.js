// Single product page, loads one product and handles add to cart

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
  // Update the cart counter icon in the header
  const counterIcon = document.querySelector(".cart-counter");

  if (count > 0) {
    counterIcon.classList.remove("cart-counter--hidden");
    counterIcon.textContent = count;
  } else {
    counterIcon.classList.add("cart-counter--hidden");
  }
}

// Select container for the product content
const container = document.querySelector(".jacket__container");

// Base API setup
const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

// Fetch one product and render it
async function fetchAndCreateProduct() {
  // Show loading feedback
  container.textContent = "Loading product...";

  try {
    // Get product id from query string
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.textContent = "No product ID provided.";
      return;
    }

    // Fetch data for this product
    const response = await fetch(`${API_URL_PRODUCTS}/${id}`);
    const data = await response.json();
    const jacketProduct = data.data;

    // Clear loading text
    container.innerHTML = "";

    // Create DOM elements
    const jacketProductCard = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardContent = document.createElement("div");
    const jacketProductImage = document.createElement("img");
    const jacketProductTitle = document.createElement("h1");
    const jacketProductPrice = document.createElement("h2");
    const jacketProductInfo = document.createElement("p");
    const jacketProductButton = document.createElement("button");

    // Apply classes
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
      "btn--cart"
    );

    // Fill with API data
    jacketProductImage.src = jacketProduct.image.url;
    jacketProductImage.alt = jacketProduct.image?.alt || jacketProduct.title;
    jacketProductTitle.textContent = jacketProduct.title;
    jacketProductPrice.textContent = `${jacketProduct.price} NOK`;
    jacketProductInfo.textContent = jacketProduct.description;
    jacketProductButton.textContent = "Add to cart";

    // Handle add to cart
    jacketProductButton.addEventListener("click", function () {
      // Read existing cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check for existing item
      const existingItem = cart.find((item) => item.id === jacketProduct.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...jacketProduct, quantity: 1 });
      }

      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update header counter
      updateCartCount(getCartCount());
    });

    // Build the product card
    cardImage.append(jacketProductImage);
    cardContent.append(
      jacketProductTitle,
      jacketProductPrice,
      jacketProductInfo,
      jacketProductButton
    );
    jacketProductCard.append(cardContent, cardImage);
    container.appendChild(jacketProductCard);
  } catch (error) {
    // Show user friendly error
    container.textContent = "Product failed to load. Try again later.";
  }
}

// Run the function when the page loads
fetchAndCreateProduct();
