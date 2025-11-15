const paymentForm = document.querySelector(".payment-form");

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  document.querySelectorAll(".error-message").forEach(function (msg) {
    msg.textContent = "";
  });

  let isValid = true;

  const cardNumberInput = document.getElementById("card-number");
  const expirationInput = document.getElementById("expiration-date");
  const cvvInput = document.getElementById("cvv");

  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const countryInput = document.getElementById("country-region");
  const stateInput = document.getElementById("state");
  const zipInput = document.getElementById("zip-code");

  const cardNumberError = document.getElementById("card-number-error");
  const expirationError = document.getElementById("expiration-error");
  const cvvError = document.getElementById("cvv-error");
  const firstNameError = document.getElementById("first-name-error");
  const lastNameError = document.getElementById("last-name-error");
  const addressError = document.getElementById("address-error");
  const cityError = document.getElementById("city-error");
  const countryError = document.getElementById("country-error");
  const stateError = document.getElementById("state-error");
  const zipError = document.getElementById("zip-code-error");

  if (cardNumberInput.value.trim() === "") {
    cardNumberError.textContent = "Card number is missing";
    isValid = false;
  }

  if (expirationInput.value.trim() === "") {
    expirationError.textContent = "Expiration date is missing";
    isValid = false;
  }

  if (cvvInput.value.trim() === "") {
    cvvError.textContent = "CVV is missing";
    isValid = false;
  }

  if (firstNameInput.value.trim() === "") {
    firstNameError.textContent = "First name is missing";
    isValid = false;
  }

  if (lastNameInput.value.trim() === "") {
    lastNameError.textContent = "Last name is missing";
    isValid = false;
  }

  if (addressInput.value.trim() === "") {
    addressError.textContent = "Address is missing";
    isValid = false;
  }

  if (cityInput.value.trim() === "") {
    cityError.textContent = "City is missing";
    isValid = false;
  }

  if (countryInput.value.trim() === "") {
    countryError.textContent = "Country is missing";
    isValid = false;
  }

  if (stateInput.value.trim() === "") {
    stateError.textContent = "State is missing";
    isValid = false;
  }

  if (zipInput.value.trim() === "") {
    zipError.textContent = "ZIP code is missing";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  window.location.href = "confirmation.html";
});
