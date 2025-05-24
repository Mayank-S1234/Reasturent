document.addEventListener("DOMContentLoaded", function () {
    // Select all stars divs
    const stars = document.querySelectorAll(".stars, .stars6");

    stars.forEach(starContainer => {
        starContainer.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "0.3s";
        });

        starContainer.addEventListener("mouseout", function () {
            this.style.transform = "scale(1)";
        });

        starContainer.addEventListener("click", function () {
            this.style.color = "#FFD700"; // Gold color effect on click
            this.style.transition = "0.3s";
        });
    });
});
