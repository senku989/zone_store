function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
  var cookieName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return "";
}

function redirectToCurrencyPage(currency) {
  if (currency === "SAR") {
    window.location.href = "../../../services/SR/tiktok/" +
      window.location.pathname.split("/").pop();
  } else if (currency === "OMR") {
    window.location.href = "../../../services/OMR/tiktok/" +
      window.location.pathname.split("/").pop();
  } else if (currency === "USD") {
    window.location.href = "#";
/*  } else if (currency === "KWD") {
    window.location.href = "../../../services/KWD/tiktok/" +
      window.location.pathname.split("/").pop();*/
  } else if (currency === "AED") {
    window.location.href = "../../../services/AED/tiktok/" +
      window.location.pathname.split("/").pop();
/*  } else if (currency === "QAR") {
    window.location.href = "../../../services/QAR/tiktok/" +
      window.location.pathname.split("/").pop();*/
  }
}

$(document).ready(function () {
  var currencyPicker = $("#currency-picker");
  var currencyCookie = getCookie("currency");

  // Define a variable to track whether the page should redirect
  var shouldRedirect = true;

  if (currencyCookie) {
    // Check if the current currency matches the cookie value
    if (currencyCookie === currencyPicker.val()) {
      // If the currency matches, no redirection is needed
      shouldRedirect = false;
    }
  }

  if (!currencyCookie) {
    fetch("https://ipapi.co/json/")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var currency = data.currency;
        alert("عذرا، لقد اكتشفنا أنك تستخدم هذه العملة (" + currency + ") !!");

        setCookie("currency", currency);
        redirectToCurrencyPage(currency);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }

  if (shouldRedirect) {
    redirectToCurrencyPage(currencyCookie);
  }

  // Handle currency selection change
  currencyPicker.change(function () {
    var selectedCurrency = $(this).val();
    setCookie("currency", selectedCurrency);
    redirectToCurrencyPage(selectedCurrency);
  });
});
