const paymentForm = document.querySelector(".payment-form");

paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const payment = document.querySelector(".payment-form");

  // Checking if the payment details form is filled out
  const cardNumber = document.getElementById("card-number").value;
  const expiration = document.getElementById("expiration-date").value;
  const cvv = document.getElementById("cvv").value;

  if (cardNumber.trim() === "") {
    alert("Card number is missing");
    return;
  }

  if (expiration.trim() === "") {
    alert("Expiration date is missing");
    return;
  }

  if (cvv.trim() === "") {
    alert("CVV is missing");
    return;
  }

  // Checking if the shipping details is filled out
  const firstName = document.querySelector(".shipping__first-name").value;
  const lastName = document.querySelector(".shipping__last-name").value;
  const adress = document.querySelector(".shipping__address").value;
  const city = document.querySelector(".shipping__city").value;
  const country = document.querySelector(".shipping__country").value;
  const state = document.querySelector(".shipping__state").value;
  const zipCode = document.querySelector(".shipping__zip-code").value;

  if (firstName.trim() === "") {
    alert("First name is missing");
    return;
  }

  if (lastName.trim() === "") {
    alert("Last name is missing");
    return;
  }

  if (adress.trim() === "") {
    alert("Adress is missing");
    return;
  }

  if (city.trim() === "") {
    alert("City is missing");
    return;
  }

  if (country.trim() === "") {
    alert("Country is missing");
    return;
  }

  if (state.trim() === "") {
    alert("State is missing");
    return;
  }

  if (zipCode.trim() === "") {
    alert("Zip code is missing");
    return;
  }
});

/* 

• Select the form
• Listen for submit
• preventDefault so the page does not move forward
• Check every required field
• If anything is empty, show feedback
• If everything looks good, send the user to confirmation.html

const firstNameField = document.getElementById("first-name");
const value = firstNameField.value;

if (cardNumber.trim() === "") {
alert("Card number is missing");
return;
}


Check empty
If the field is empty, show a message and stop.

Check only digits
Remove spaces first.
Then check if every character is a digit.
If any character is not a digit, show a message and stop.

Check length
After removing spaces, count the characters.
If it is not 16, show a message and stop.
*/
