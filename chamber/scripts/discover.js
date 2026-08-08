import { discoverItems } from '../data/discover.mjs';

// Named grid areas, assigned in order to each of the 8 cards
const gridAreas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// Builds one card for a single item of interest
function createCard(item, areaName) {
    const card = document.createElement('div');
    card.className = 'discover-card';
    card.style.gridArea = areaName;

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    return card;
}

function renderCards() {
    const container = document.getElementById('discover-grid');

    discoverItems.forEach((item, index) => {
        const areaName = gridAreas[index];
        container.appendChild(createCard(item, areaName));
    });
}

// Compares the stored last-visit timestamp to now and shows one of three messages
function showVisitMessage() {
    const messageEl = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysBetween = Math.floor((now - Number(lastVisit)) / msPerDay);

        if (daysBetween < 1) {
            messageEl.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            messageEl.textContent = "You last visited 1 day ago.";
        } else {
            messageEl.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', now);
}

renderCards();
showVisitMessage();
