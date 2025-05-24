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