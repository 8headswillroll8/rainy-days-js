// Select the container where the product will be displayed
const container = document.querySelector(".jacket__container");

// Base API setup
const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

// Fetch a single product based on its ID and render it on the page
async function fetchAndCreateProduct() {
  try {
    // Get the product ID from the URL query string
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Stop if no ID was found in the URL
    if (!id) {
      container.textContent = "No product ID provided!";
      return;
    }

    // Fetch product data from the API
    const response = await fetch(`${API_URL_PRODUCTS}/${id}`);
    const data = await response.json();
    const jacketProduct = data.data;

    // Create elements for the product display
    const jacketProductCard = document.createElement("div");
    const jacketProductImage = document.createElement("img");
    const jacketProductTitle = document.createElement("h1");
    const jacketProductPrice = document.createElement("h2");
    const jacketProductInfo = document.createElement("p");
    const jacketProductButton = document.createElement("button");

    // Apply BEM-style classes
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

    // Fill elements with product data
    jacketProductImage.src = jacketProduct.image.url;
    jacketProductImage.alt = jacketProduct.image?.alt || jacketProduct.title;
    jacketProductTitle.textContent = jacketProduct.title;
    jacketProductPrice.textContent = `${jacketProduct.price} NOK`;
    jacketProductInfo.textContent = jacketProduct.description;
    jacketProductButton.textContent = "Add to cart";

    // Handle “Add to cart” clicks by updating localStorage
    jacketProductButton.addEventListener("click", function () {
      console.log("Click detected");

      // Get the current cart from localStorage (or start empty)
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Try to find if this product already exists in the cart
      const existingItem = cart.find((item) => item.id === jacketProduct.id);

      if (existingItem) {
        // If found, increase its quantity
        existingItem.quantity++;
      } else {
        // If not found, add it as a new item with quantity = 1
        cart.push({ ...jacketProduct, quantity: 1 });
      }

      // Save updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    // Combine all product elements and display on the page
    jacketProductCard.append(
      jacketProductImage,
      jacketProductTitle,
      jacketProductPrice,
      jacketProductInfo,
      jacketProductButton
    );
    container.appendChild(jacketProductCard);
  } catch (error) {
    // Log any issues with the API request
    console.error("Fetching products failed", error);
  }
}

// Run the function on page load
fetchAndCreateProduct();

// Select the container where the filter will be displayed
// Filter product by gender
const filterContainer = document.createElement("div");
const filterTitle = document.createElement("h2");
const filterWomen = document.createElement("button");
const filterMen = document.createElement("button");

filterContainer.classList.add("filter__container");
filterTitle.classList.add("filter__title");
filterWomen.classList.add("filter__women-btn");
filterMen.classList.add("filter__men-btn");

filterWomen.textContent = "Women";
