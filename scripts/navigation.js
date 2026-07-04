const menuButton = document.getElementById('menuButton');
const primaryNav = document.getElementById('nav');

if (menuButton && primaryNav) {
    menuButton.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}