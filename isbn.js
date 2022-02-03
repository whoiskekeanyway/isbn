// Switch case to select the correct function to call
// between ISBN10 and ISBN13
// if isbn is a number, check if it is a valid ISBN10 or ISBN13


function isValidISBN(isbn) {

  // Initialize the result variable to false
  var result = false;
  
  if (isbn != null) {
    // Replace all unwanted characters with an empty string
    isbn = isbn.replace(/-/g, "");
    isbn = isbn.replace(/ /g, "");

    switch (isbn.length) {
      case 10:
        result = isValidISBN10(isbn);
        break;
      case 13:
        result = isValidISBN13(isbn);
        break;
      default:
    }
  }
  return result;
}

// helper function to validate the ISBN10

function isValidISBN10(isbn) {
  // Initialize the result variable to false
  var result = false;
  // Replace all unwanted characters with an empty string
  var regex = new RegExp(/^\d{9}(\d|X){1}$/);

  // Check if the ISBN is valid number after the regex
  if (regex.test(isbn)) {
    var sum = 0;
    for (var i = 0; i < 9; i++) {
      sum += isbn[i] * (i + 1);
    }
    sum += isbn[9] == "X" ? 10 : isbn[9] * 10;
    result = sum % 11 == 0;

    // remove the check digits from the length of the ISBN string 
    isbn = isbn.substring(0, isbn.length - 1);
    // convert the ISBN to ISBN13 format by adding 978 to the front
    convertedISBN = "978" + isbn + convertISBN10toISBN13("978" + isbn)
    document.getElementById("result").innerText = convertedISBN;
    document.getElementById("boolean").innerText = result;
  }
  return result;
}

// helper function to validate the ISBN13

function isValidISBN13(isbn) {
  var result = false;

  if (!isNaN(isbn)) {
    var index = 0;
    var sum = 0;

    for (var i = 0; i < length; i++) {
      sum += isbn[i] * (isOddNumber(index) ? 3 : 1);
    }
    result = sum % 10 == 0;
     document.getElementById("boolean").innerText = result;
  }
  return result;
}


// helper function to determine if the index is odd 
function isOddNumber(number) {
  // return number % 2 == 1;
  return number % 2 != 0;
}

function convertISBN10toISBN13(isbn10) {
  var newISBN13 = "";

  var sum = 0;
  var oddIndex = false;

  for (var i = 0; i < isbn10.length; i++) {
    sum += isbn10[i] * (oddIndex ? 3 : 1);
    oddIndex = !oddIndex;
  }

  newISBN13 = (10 - (sum % 10)) % 10;
  return newISBN13;
}

// function toISBN13(isbn10) {}




console.log(isValidISBN("0330301824"));

	module.exports = isValidISBN;