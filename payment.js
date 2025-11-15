const paymentForm = document.querySelector(".payment-form");

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear old error messages
  document.querySelectorAll(".error-message").forEach(function (msg) {
    msg.textContent = "";
  });

  // Remove old error borders
  document.querySelectorAll("input").forEach(function (input) {
    input.classList.remove("error");
  });

  let isValid = true;

  // Payment inputs
  const cardNumberInput = document.getElementById("card-number");
  const expirationInput = document.getElementById("expiration-date");
  const cvvInput = document.getElementById("cvv");

  // Shipping inputs
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const countryInput = document.getElementById("country-region");
  const stateInput = document.getElementById("state");
  const zipInput = document.getElementById("zip-code");

  // Error elements
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

  // 1. Empty checks

  // Card number
  if (cardNumberInput.value.trim() === "") {
    cardNumberError.textContent = "Card number is missing";
    cardNumberInput.classList.add("error");
    isValid = false;
  }

  // Expiration
  if (expirationInput.value.trim() === "") {
    expirationError.textContent = "Expiration date is missing";
    expirationInput.classList.add("error");
    isValid = false;
  }

  // CVV
  if (cvvInput.value.trim() === "") {
    cvvError.textContent = "CVV is missing";
    cvvInput.classList.add("error");
    isValid = false;
  }

  // First name
  if (firstNameInput.value.trim() === "") {
    firstNameError.textContent = "First name is missing";
    firstNameInput.classList.add("error");
    isValid = false;
  }

  // Last name
  if (lastNameInput.value.trim() === "") {
    lastNameError.textContent = "Last name is missing";
    lastNameInput.classList.add("error");
    isValid = false;
  }

  // Address
  if (addressInput.value.trim() === "") {
    addressError.textContent = "Address is missing";
    addressInput.classList.add("error");
    isValid = false;
  }

  // City
  if (cityInput.value.trim() === "") {
    cityError.textContent = "City is missing";
    cityInput.classList.add("error");
    isValid = false;
  }

  // Country
  if (countryInput.value.trim() === "") {
    countryError.textContent = "Country is missing";
    countryInput.classList.add("error");
    isValid = false;
  }

  // State
  if (stateInput.value.trim() === "") {
    stateError.textContent = "State is missing";
    stateInput.classList.add("error");
    isValid = false;
  }

  // ZIP
  if (zipInput.value.trim() === "") {
    zipError.textContent = "ZIP code is missing";
    zipInput.classList.add("error");
    isValid = false;
  }

  // 2. Format checks (only if not empty)

  // Card number: digits only, 16 digits
  if (cardNumberInput.value.trim() !== "") {
    const digits = cardNumberInput.value.replace(/\s+/g, "");

    if (!/^\d+$/.test(digits)) {
      cardNumberError.textContent = "Card number must contain digits only";
      cardNumberInput.classList.add("error");
      isValid = false;
    } else if (digits.length !== 16) {
      cardNumberError.textContent = "Card number must be 16 digits";
      cardNumberInput.classList.add("error");
      isValid = false;
    }
  }

  // Expiration: MM/YY
  if (expirationInput.value.trim() !== "") {
    const exp = expirationInput.value.trim();

    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      expirationError.textContent = "Use MM/YY format";
      expirationInput.classList.add("error");
      isValid = false;
    }
  }

  // CVV: exactly 3 digits
  if (cvvInput.value.trim() !== "") {
    const cvvValue = cvvInput.value.trim();

    if (!/^\d{3}$/.test(cvvValue)) {
      cvvError.textContent = "CVV must be 3 digits";
      cvvInput.classList.add("error");
      isValid = false;
    }
  }

  // ZIP: at least 4 digits
  if (zipInput.value.trim() !== "") {
    const zipValue = zipInput.value.trim();

    if (!/^\d{4,}$/.test(zipValue)) {
      zipError.textContent = "ZIP must be at least 4 digits";
      zipInput.classList.add("error");
      isValid = false;
    }
  }

  // Stop if anything failed
  if (!isValid) {
    return;
  }

  // All good, go to confirmation page
  window.location.href = "confirmation.html";
});
