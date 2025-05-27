/*
//  Music Toggle
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicToggle.textContent = "🎵";
  } else {
    music.play();
    musicToggle.textContent = "🔇";
  }
  isPlaying = !isPlaying;
});

// Language Toggle
const languageSelect = document.getElementById("language");
const translatableElements = document.querySelectorAll("[data-en]");

languageSelect.addEventListener("change", () => {
  const selectedLang = languageSelect.value;

  translatableElements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${selectedLang}`);
  });
});

// Form Submission (Fake example with success message)
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("form-status").textContent =
      "Message sent successfully!";
    this.reset();
  });

document
  .getElementById("reservation-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("res-status").textContent =
      "Reservation submitted!";
    this.reset();
  });

document.getElementById("language").addEventListener("change", () => {
  const lang = document.getElementById("language").value;
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent =
      lang === "hi" ? el.getAttribute("data-hi") : el.getAttribute("data-en");
  });
  window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top on language change
});

//From Server
document.addEventListener("DOMContentLoaded", () => {
  const jwtToken = localStorage.getItem("jwt_token"); // get Token from server

  if (!jwtToken) {
    alert("Pleasse Login to use for site Features"); // Send Messge to user
    window.location.href = "../Bemone a member/member.html"; // Render in Login Page
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("contact-bttn");
  if (btn) {
    btn.addEventListener("submit", async (e) => {
      e.preventDefault();
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message
     = document.getElementById("message").value;
    const formData = {
      name: name,
      email: email,
      message: message,
    };
    const response = await fetch("/api/v1/contact/send", {
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
else{
   console.log("btn not clicked");
}
}); */

// Music Toggle
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicToggle.textContent = "🎵";
  } else {
    music.play();
    musicToggle.textContent = "🔇";
  }
  isPlaying = !isPlaying;
});

// Language Toggle
const languageSelect = document.getElementById("language");
const translatableElements = document.querySelectorAll("[data-en]");

languageSelect.addEventListener("change", () => {
  const selectedLang = languageSelect.value;

  translatableElements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${selectedLang}`);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form Submission
const contactForm = document.getElementById("contact-form");
const reservationForm = document.getElementById("reservation-form");
/*
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("form-status").textContent =
      "Message sent successfully!";
    this.reset();
  });
}
*/
if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("res-status").textContent =
      "Reservation submitted!";
    this.reset();
  });
}

// Authentication
document.addEventListener("DOMContentLoaded", () => {
  const jwtToken = localStorage.getItem("jwt_token");

  if (!jwtToken) {
    alert("Please login to use site features");
    window.location.href = "../Bemone a member/member.html";
  }

  const contactBtnForm = document.getElementById("contact-form");
  if (contactBtnForm) {
    contactBtnForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const formData = {
          name: name,
          email: email,
          message: message,
        };
        const response = await fetch("/api/v1/contact/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("jwt_token"); // Clear token
          alert("Session expired. Please login again.");
          window.location.href = "/login.html"; // Redirect to login
        }

        if (response.ok && data.success) {
          alert(data.message);
          window.location.href = "./ContactVerification/contactverify.html";
        } else {
          alert(`Registration Fail: ${data.message || "An unknown error"}`);
          console.error("Registration Fail:", data.message);
        }
      } catch (error) {
        console.log("Server Error:", error);
        alert(`Server Error: ${error.message}`);
      }
    });
  }
});
