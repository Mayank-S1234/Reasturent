// Frontend (JavaScript)

async function deleteAccount() {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      console.error("Authentication token not found. Please log in.");
      alert("You are not logged in. Please log in first.");
      window.location.href = "../Bemone a member/member.html";
      return;
    }

    const response = await fetch("/api/v1/auth/deleteAccount", {
      // Call the /logout endpoint
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "No detailed error message from server." }));
      throw new Error(
        `HTTP error! status: ${response.status}. Message: ${
          errorData.message || "Unknown server error."
        }`
      );
    }

    const data = await response.json();
    console.log(data.message);
    alert(data.message);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("verifiedUserName");
    window.location.reload();
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Error during logout:", error);
    // Handle errors (e.g., display a message to the user)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const verifiedUserName = localStorage.getItem("verifiedUserName");
  if (verifiedUserName) {
    const becomeMember = document.querySelector(".userName");
    if (becomeMember) {
      becomeMember.textContent = verifiedUserName;
    } else {
      console.warn(".userName element not found on the page."); // चेतावनी लॉग करें
      // becomeMember.textContent = " "; // यह लाइन हटा दें
    }
  }
});

//--------------------------------------------------------------------------------------------
async function handleLogout() {
  try {
    const jwtToken = localStorage.getItem("jwt_token");

    if (!jwtToken) {
      console.log(
        "No token found. User already logged out or never logged in."
      );
      //window.location.href = '/login';
      return;
    }
    const response = await fetch("/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`, // send token to the server
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Server logout response:", data.message);
      localStorage.removeItem("jwt_token"); //Remove Token From client Side
      console.log("JWT token removed from client storage.");
      alert(data.message); // यूजर को सक्सेस मैसेज दिखाएं
      window.location.reload();
      window.location.href = "../index.html";
    } else {
      console.error("Logout failed:", data.message);
      alert(`Logout failed: ${data.message}`);
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Network or unexpected error during logout:", error);
    alert("An unexpected error occurred during logout.");
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  }
}

// अपने लॉगआउट बटन के onclick इवेंट पर इस फंक्शन को कॉल करें
// <button onclick="handleLogout()">Logout</button>
