document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");

    function displayCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            if (totalAmount) totalAmount.textContent = `Total: ₹ 0.00`;
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            total += item.price * item.quantity;

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: ₹${item.price}</p>
                    <div class="quantity-controls">
                        <button class="decrease" data-index="${index}">–</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                    <p>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        if (totalAmount) {
            totalAmount.textContent = `Total: ₹ ${total.toFixed(2)}`;
        }

        // Increase quantity
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart[index].quantity++;
                updateCart();
            });
        });

        // Decrease quantity
        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        // Remove item
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    // Clear cart
    document.getElementById("clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        cart = [];
        displayCart();
    });

    // Checkout (Updated to store total)
    document.getElementById("checkout").addEventListener("click", function () {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });

        localStorage.setItem("totalAmount", total.toFixed(2));
        window.location.href = "../Payment/payment.html";
    });

    displayCart();
});

//From Server
        document.addEventListener('DOMContentLoaded', () => {
            const jwtToken = localStorage.getItem('jwt_token'); // get Token from server

            if (!jwtToken) {
                alert('Pleasse Login to Use the Cart'); // Send Messge to user
                window.location.href = '../Bemone a member/member.html'; // Render in Login Page
            } else {
                console.log('Page Loding');
            }
        });