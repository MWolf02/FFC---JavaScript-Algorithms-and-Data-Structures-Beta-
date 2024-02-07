document.addEventListener("DOMContentLoaded", function () {
  // Get references to the DOM elements
  const userInput = document.getElementById("user-input");
  const checkBtn = document.getElementById("check-btn");
  const clearBtn = document.getElementById("clear-btn");
  const resultsDiv = document.getElementById("results-div");

  // Validate phone number
  function validatePhoneNumber(number) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regex.test(number);
  }

  // Check button click event
  checkBtn.addEventListener("click", function () {
    const number = userInput.value.trim();
    if (!number) {
      alert("Please provide a phone number");
      return;
    }
    const isValid = validatePhoneNumber(number);
    // Create a new div for the result
    const result = document.createElement("div");
    result.textContent = isValid
      ? `Valid US number: ${number}`
      : `Invalid US number: ${number}`;
    // Append the new result to the resultsDiv
    resultsDiv.appendChild(result);
  });

  // Clear button click event
  clearBtn.addEventListener("click", function () {
    userInput.value = ""; // Clear input field
    resultsDiv.innerHTML = ""; // Clear results div entirely
  });
});
