document.addEventListener("DOMContentLoaded", function () {
    function toggleItems() {
        let items = document.querySelector(".more-items");
        let button = document.querySelector(".more-item-seen");

        if (items.classList.contains("show")) {
            items.classList.remove("show");
            button.textContent = "See All";
        } else {
            items.classList.add("show");
            button.textContent = "See Less";
        }
    }

    function filterMenu(category, event) {
        let sections = document.querySelectorAll(".others-category, .image-container");

        if (category === "all") {
            document.querySelector(".image-container").style.display = "flex";
            document.querySelectorAll(".others-category").forEach(section => {
                section.style.display = "none";
            });
        } else {
            sections.forEach(section => {
                section.style.display = "none";
            });

            let selectedSection = document.querySelector(`#section${getCategoryIndex(category)}`);
            if (selectedSection) {
                selectedSection.style.display = "flex";
            }
        }

        document.querySelectorAll(".navbar2 .btn").forEach(btn => {
            btn.classList.remove("active");
        });
        event.target.classList.add("active");
    }

    function getCategoryIndex(category) {
        const categories = {
            "breads": 2,
            "chiffon_Rolls": 3,
            "donuts": 4,
            "pastry_Danish": 5,
            "cakes": 6,
            "cookies": 7
        };
        return categories[category] || 1;
    }

    function animateCartIcon() {
        document.querySelectorAll('.cart-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                // Bounce animation for clicked icon
                icon.classList.add('clicked');
                setTimeout(() => icon.classList.remove('clicked'), 300);

                // Flash navbar cart icon
                const navCart = document.getElementById('navbar-cart-icon');
                if (navCart) {
                    navCart.classList.add('flash');
                    setTimeout(() => navCart.classList.remove('flash'), 500);
                }

                // Show toast
                showToast("Item added to cart!");
            });
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.right = '30px';
        toast.style.background = '#D83A2D';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '25px';
        toast.style.fontSize = '16px';
        toast.style.zIndex = '999';
        toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    // Event bindings
    document.querySelector(".more-item-seen").addEventListener("click", toggleItems);
    document.querySelectorAll(".navbar2 .btn").forEach(button => {
        button.addEventListener("click", function (event) {
            filterMenu(this.getAttribute("data-category"), event);
        });
    });

    // Init cart animation
    animateCartIcon();
});
