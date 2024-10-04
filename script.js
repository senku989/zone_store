document.addEventListener("DOMContentLoaded", function() {
    var accordionItems = document.querySelectorAll(".accordion-item");

    // Add click event listener to each accordion item
    accordionItems.forEach(function(item) {
      var header = item.querySelector(".accordion-header");

      header.addEventListener("click", function() {
        // Toggle active class on click
        item.classList.toggle("active");

        // Toggle visibility of the content
        var content = item.querySelector(".accordion-content");
        content.style.display = content.style.display === "none" ? "block" : "none";
      });
    });
  });







//-------------------------------------------------
// completed orders

window.addEventListener('DOMContentLoaded', (event) => {
  const section = document.querySelector('.number-animation');
  const targetNumber = 2406;
  const duration = 3000; // Animation duration in milliseconds
  const interval = 50; // Update interval in milliseconds
  const steps = Math.ceil(duration / interval);
  const increment = targetNumber / steps;
  let currentNumber = 0;

  const updateNumber = () => {
    currentNumber += increment;
    section.textContent = "+ " + Math.floor(currentNumber);

    if (currentNumber >= targetNumber) {
      section.textContent = "+ " + targetNumber;
      clearInterval(animationInterval);
    }
  };

  const animationInterval = setInterval(updateNumber, interval);

  // Intersection Observer to start animation when the target div is visible
  const targetDiv = document.getElementById('target-div');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(targetDiv);
});



//---------------------------------------------------
// welcome message

$(document).ready(function() {
  // Check if the user has visited the website before
  if (document.cookie.indexOf("visited=true") === -1) {
    // Show the popup
    $('#popup').modal('show');
  }
  
  // Close the popup when the close button is clicked
  $('#popup .close').click(function() {
    $('#popup').modal('hide');
    
    // Set a cookie to remember that the user has visited the website
    document.cookie = "visited=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  });
});






// ----------------------------------------------------------------
// get the country & currancy

    // Function to retrieve the visitor's country and currency based on their IP address
    function showVisitorCountryAndCurrency() {
      // Make a request to ipapi
      fetch('https://ipapi.co/json/')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Extract the country and currency from the response data
          var country = data.country_name;
          var currency = data.currency;
          
          // Get the visitor-info div element
          var country1 = document.getElementById('country');
          var currency1 = document.getElementById('currency');
          
          // Set the country and currency information in the div
          country1.textContent = 'الدولة: ' + country;
          currency1.textContent = 'العملة: ' + currency;
          
          // You can also use the country and currency information in other ways as needed
          
        })
        .catch(function(error) {
          console.log('Error:', error);
        });
    }

    // Call the function to show the visitor's country and currency in the div
    showVisitorCountryAndCurrency();









// ---------------------------------------------------------
// floating button
$(document).ready(function() {
  $('.floating-button').click(function() {
    $('.floating-window').toggleClass('open');
  });

  $('.close-button').click(function() {
    $('.floating-window').removeClass('open');
  });

  $('#form').submit(function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('تم إرسال طلبك بنجاح!');
    $('.floating-window').removeClass('open');
  });
});



//-------------------------------------------------------------
// web3Forms
                const form = document.getElementById('form');
                const result = document.getElementById('result');

                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const object = Object.fromEntries(formData);
                    const json = JSON.stringify(object);
                    result.innerHTML = "يرجى الإنتظار..."

                    fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: json
                    })
                        .then(async (response) => {
                            let json = await response.json();
                            if (response.status == 200) {
                                result.innerHTML = "تم إستلام طلبك بنجاح، سيتم تأكيده بعد إكمال عملية الدفع";
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            result.innerHTML = "حدث خطأ غير متوقع!";
                        })
                        .then(function () {
                            form.reset();
                            setTimeout(() => {
                                result.style.display = "none";
                            }, 10000);
                        });
                });