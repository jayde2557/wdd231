import { memberData } from './memberData.js';

// Maps numeric membership level to a display label
const LEVEL_LABELS = {
    1: 'Member',
    2: 'Silver',
    3: 'Gold'
};

// Builds one spotlight card's DOM for a single company object
function createSpotlightCard(company) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';

    const displayUrl = company.website.replace(/^https?:\/\//, '');
    const levelLabel = LEVEL_LABELS[company.membershipLevel] || 'Member';

    card.innerHTML = `
      <img src="images/${company.image}" alt="${company.name} logo"
           onerror="this.style.display='none'">
      <h2>${company.name}</h2>
      <p class="spotlight-level">${levelLabel} Member</p>
      <p>${company.address}</p>
      <p>${company.phone}</p>
      <p><a href="${company.website}" target="_blank" rel="noopener">${displayUrl}</a></p>
    `;

    return card;
}

// Fisher-Yates shuffle — randomizes array order without bias
function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Picks 2-3 random gold/silver members and renders them into the container
function renderSpotlights(companies) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    // Only gold (3) or silver (2) members qualify for a spotlight
    const eligible = companies.filter(
        company => company.membershipLevel === 3 || company.membershipLevel === 2
    );

    // Randomize order, then take either 2 or 3 at random
    const shuffled = shuffle(eligible);
    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, count);

    selected.forEach(company => {
        container.appendChild(createSpotlightCard(company));
    });
}

memberData().then(companies => {
    renderSpotlights(companies);
});