document.getElementById("subscribeBtn").addEventListener("click", function() {
    let emailInput = document.getElementById("emailInput");
    let emailValue = emailInput.value.trim();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "" || !emailPattern.test(emailValue)) {
        alert("Please enter a valid email address!");
        return;
    }

    this.textContent = "Subscribed";
    this.style.backgroundColor = "green";
    this.style.color = "white";
    this.disabled = true;

    alert("Your email has been subscribed for future updates!");
});

document.getElementById("button4").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            document.getElementById("map").src = 
                `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${latitude},${longitude}`;
        }, error => {
            alert("Unable to retrieve your location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
