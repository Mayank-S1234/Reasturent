document.addEventListener("DOMContentLoaded", () => {
  // Franchisee Button Hover Effect
  const franchiseeButton = document.querySelector(".Franchisee-button");

  if (franchiseeButton) {
    franchiseeButton.addEventListener("mouseover", () => {
      franchiseeButton.style.transform = "scale(1.05)";
    });

    franchiseeButton.addEventListener("mouseout", () => {
      franchiseeButton.style.transform = "scale(1)";
    });
  }

  // Smooth scrolling to Franchisee section if needed
  const franchiseeLink = document.querySelector(".franchisee-link");
  if (franchiseeLink) {
    franchiseeLink.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".Franchisee-container").scrollIntoView({
        behavior: "smooth",
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("franchiseFormbtn");
  if (btn) {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const investment = document.getElementById("investment").value;
    const reason = document.getElementById("reason").value;
    const formData = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      investment: investment,
      reason: reason,
    };
    const response = await fetch("/api/v1/become/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert(data.message);
      window.location.href = "./otpVerificationFolder/otpVerification.html";
      console.log("Redirected");
    } else {
      alert(`Registration Fail: ${data.message || "An Knwon Error"}`);
      console.error("Registration Fail:", data.message);
    }
  } catch (error) {
    console.error("Server Error:", error);
    alert(`Server Error: ${error.message}`);
  }
});   
 
}
});
