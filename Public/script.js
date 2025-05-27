

document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector('#searchIcon');
    const searchBox = document.querySelector('#searchBox');
    searchIcon.onclick = function() {
        searchBox.classList.toggle('active')
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIcon = document.querySelector(".cart-icon"); // Navbar cart icon
    const cartCounter = document.querySelector(".cart-counter"); // Cart item count

    // Function to update cart count
    function updateCartCounter() {
        cartCounter.textContent = cart.length;
    }

    // Function to add items to cart
    function addToCart(event) {
        const itemBox = event.target.closest(".item-box");
        if (!itemBox) return;

        const itemName = itemBox.querySelector("h1").textContent;
        const itemPrice = parseFloat(itemBox.querySelector(".priceCart").textContent.replace("₹", ""));
        const itemImage = itemBox.querySelector("img").src;

        let existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if item exists
        } else {
            cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCounter();
    }

    // Attach event listeners to all cart icons inside item boxes
    document.querySelectorAll(".item-box .cart-icon").forEach(icon => {
        icon.addEventListener("click", addToCart);
    });

    // Redirect to cart page when clicking the navbar cart icon
    cartIcon.addEventListener("click", function () {
        window.location.href = "Shopping Cart/cart.html"; // Redirect to cart page
    });

    updateCartCounter(); // Update cart count on page load
});


 
 document.addEventListener('DOMContentLoaded', () => {
        const verifiedUserName = localStorage.getItem('verifiedUserName');
        const jwtToken = localStorage.getItem('jwt_token'); 
        if(jwtToken){
        if (verifiedUserName) {
          const becomeMemberLink = document.querySelector('#memberlink');
          if (becomeMemberLink) {
            becomeMemberLink.textContent = verifiedUserName;
            becomeMemberLink.href = '../Profile/Profile.html';
          }
        }
          else{
            becomeMemberLink.textContent = "Become a Member";
          }
        }
      });

