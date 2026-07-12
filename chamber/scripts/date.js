const currentYear = document.getElementById('currentyear');
currentYear.textContent = new Date().getFullYear();

const lastModified = document.getElementById('lastmodified');
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const menuButton = document.getElementById('menuButton');
const primaryNav = document.getElementById('nav');

if (menuButton && primaryNav) {
    menuButton.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}