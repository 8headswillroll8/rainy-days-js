// Product listing page, shows all products and handles filters

// Container for the product grid
const container = document.querySelector(".product-list--grid");

// Base API setup
const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

// Store all products so filters can reuse them
let allProducts = [];

// Render a given list of products into the grid
function renderProducts(list) {
  if (!container) {
    return;
  }

  // Clear previous content
  container.innerHTML = "";

  // Loop through each product and build a card
  list.forEach((product) => {
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

    // Fill with data from API
    productImage.src = product.image.url;
    productImage.alt = product.image?.alt || product.title;
    productImage.loading = "lazy";
    productImage.decoding = "async";

    productTitle.textContent = product.title;
    productPrice.textContent = `${product.price} NOK`;
    productAnchor.href = `jacket.html?id=${product.id}`;

    // Build and append the card
    productCard.append(productImage, productTitle, productPrice);
    productAnchor.appendChild(productCard);
    container.appendChild(productAnchor);
  });
}

// Fetch all products from API and render them
async function getProducts() {
  if (!container) {
    return;
  }

  // Show loading feedback while waiting for API
  container.textContent = "Loading products...";

  try {
    const response = await fetch(API_URL_PRODUCTS, { method: "GET" });
    const data = await response.json();
    const products = data.data;

    // Save full list for filters
    allProducts = products;

    // Render all products and clear loading text
    renderProducts(allProducts);
  } catch (error) {
    // User friendly error message
    container.textContent =
      "Sorry, the products failed to load. Please try again later.";
  }
}

// Run fetch when script loads
getProducts();

// Filter controls
const filterContainer = document.querySelector(".data-filter");
const clearButton = document.getElementById("clear-filter");

// Handle filter changes for gender
if (filterContainer) {
  filterContainer.addEventListener("change", function (event) {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      // Show all products
      renderProducts(allProducts);
      return;
    }

    // Filter by gender property from API
    const filtered = allProducts.filter(
      (product) => product.gender === selectedValue
    );

    renderProducts(filtered);
  });
}

// Clear filters and reset to "all"
if (clearButton) {
  clearButton.addEventListener("click", function () {
    const allRadio = document.getElementById("filter-all");
    if (allRadio) {
      allRadio.checked = true;
    }

    renderProducts(allProducts);
  });
}
