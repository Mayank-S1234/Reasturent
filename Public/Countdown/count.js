document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-item h2");
    const speed = 200; // Speed of count animation

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || ""; // Preserve M+, %, etc.

        const updateCount = () => {
            let count = +counter.innerText.replace(/\D/g, ''); // Extract numbers only
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + suffix;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString() + suffix; // Format with commas if needed
            }
        };

        counter.innerText = "0" + suffix; // Start with 0
        updateCount();
    });
});