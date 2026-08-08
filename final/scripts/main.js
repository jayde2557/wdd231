// =========================================================
// JAYK MUSIC STUDIO
// WDD231 Individual Project
// Main JavaScript Module
// =========================================================

const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");


// =========================================================
// MOBILE NAVIGATION
// =========================================================

if (menuButton && siteNav) {

    menuButton.addEventListener("click", () => {

        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isOpen));

        siteNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );
    });


    // Close the mobile navigation after selecting a link
    const navLinks = siteNav.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            siteNav.classList.remove("open");
        });

    });
}