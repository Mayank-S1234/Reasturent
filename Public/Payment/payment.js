document.addEventListener("DOMContentLoaded", function () {
    const amountField = document.getElementById("amount");

    // Retrieve the total amount from localStorage
    const totalAmount = localStorage.getItem("totalAmount");

    if (totalAmount) {
        // Display the total amount in the disabled input field
        amountField.value = `₹ ${totalAmount}`;
    } else {
        // Handle the case if the totalAmount is not found
        amountField.value = "₹ 0.00";
    }

    // Form submit functionality
    const form = document.getElementById("payment-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simulate successful payment processing
        const cardName = document.getElementById("cardName").value.trim();
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expiry = document.getElementById("expiry").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Simulate basic validation
        if (!cardName || !cardNumber || !expiry || !cvv) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Generate a unique order ID
        const orderId = Math.floor(100000 + Math.random() * 900000); // A random 6-digit order ID
        localStorage.setItem("orderId", orderId); // Store the order ID in localStorage

        // Simulate payment success
        localStorage.setItem("paymentStatus", "success");

        // Store the paid amount in localStorage
        localStorage.setItem("paidAmount", totalAmount);

        // Clear the cart from localStorage after payment
        localStorage.removeItem("cart");

        // Optionally, remove totalAmount after successful payment
        localStorage.removeItem("totalAmount");

        // Redirect to the success page
        window.location.href = "success.html"; // Change this to the correct path of your success page
    });
});
