
// Activity 5: JavaScript Basics and User Interaction

// Reusable Toast Notification Function
function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";

        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


// Smooth Scrolling and Book Button Interaction
document.addEventListener("DOMContentLoaded", function () {

    // Select all links that point to the booking section.
    const bookButtons = document.querySelectorAll(
        'a[href="#booking"]'
    );

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {

                event.preventDefault();

                // Smoothly scroll to booking form.
                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Display toast notification.
                showToast("Redirecting to the IPL booking form!");

            }

        });

    });

});
