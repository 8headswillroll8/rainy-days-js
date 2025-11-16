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
