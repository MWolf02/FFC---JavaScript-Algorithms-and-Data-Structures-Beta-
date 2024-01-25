const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');
const reversedResultDiv = document.getElementById('reversed-result')

function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '');

    const lowercaseStr = cleanedStr.toLowerCase();

    const reversedStr = lowercaseStr.split('').reverse().join('');

    return lowercaseStr === reversedStr;
}

// Step 3: Handle Button Click Event

// TODO: Add an event listener to the 'checkBtn' for the 'click' event
checkBtn.addEventListener('click', handleButtonClick);


// TODO: Define the callback function for the click event
function handleButtonClick() {
  // TODO: Get the input value from 'textInput'
  const inputValue = textInput.value;

  // TODO: Check if the input is empty, display an alert if true
  if (inputValue.trim() === '') {
    // Display an alert with the message 'Please input a value'
    alert('Please input a value');
    return;
  }

  // TODO: Use the 'isPalindrome' function to check if it's a palindrome
  const isPalindromic = isPalindrome(inputValue);

  // TODO: Display the result in 'resultDiv'
  if (isPalindromic) {
    // Display 'Palindrome' in 'resultDiv'
    resultDiv.textContent = `"${inputValue}" is a palindrome.`;
  } else {
    // Display 'Not a palindrome' in 'resultDiv'
    resultDiv.textContent = `"${inputValue}" is not a palindrome.`;
  }

  const reversedInput = inputValue.split('').reverse().join('');
  reversedResultDiv.textContent = `Your word spelled backward is "${reversedInput}"`
}

