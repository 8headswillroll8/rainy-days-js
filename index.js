console.log("hello world");

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
  if (!counterIcon) return;
  if (count > 0) {
    counterIcon.classList.remove("cart-counter--hidden");
    counterIcon.textContent = count;
  } else {
    counterIcon.classList.add("cart-counter--hidden");
  }
}

window.addEventListener("load", function () {
  updateCartCount(getCartCount());
});

const trendingContainer = document.querySelector(".product-list");

const API_URL = "https://v2.api.noroff.dev";
const API_URL_PRODUCTS = `${API_URL}/rainy-days`;

async function loadTrending() {
  try {
    const response = await fetch(API_URL_PRODUCTS);
    const data = await response.json();
    const products = data.data;

    const trending = products.slice(0, 3);

    trending.forEach((product) => {
      const productCard = document.createElement("div");
      const productImage = document.createElement("img");
      const productTitle = document.createElement("h3");
      const productPrice = document.createElement("p");
      const productAnchor = document.createElement("a");

      productCard.classList.add("product__card");
      productImage.classList.add("product__img");
      productTitle.classList.add("product__title");
      productPrice.classList.add("product__price");
      productAnchor.classList.add("product__link");

      productImage.src = product.image.url;
      productImage.alt = product.image?.alt || product.title;

      productTitle.textContent = product.title;
      productPrice.textContent = product.price + " NOK";
      productAnchor.href = "jacket.html?id=" + product.id;

      productCard.append(productImage, productTitle, productPrice);
      productAnchor.append(productCard);
      trendingContainer.append(productAnchor);
    });
  } catch (error) {
    console.log(error);
  }
}

loadTrending();
