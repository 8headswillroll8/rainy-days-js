export function updateCartCounter() {
  const counter = document.querySelector(".cart-counter");
  if (!counter) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (totalItems > 0) {
    counter.textContent = totalItems;
    counter.classList.remove("cart-counter--hidden");
  } else {
    counter.textContent = "";
    counter.classList.add("cart-counter--hidden");
  }
}
