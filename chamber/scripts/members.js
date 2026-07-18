import { memberData } from './memberData.js';

function createCard(company) {
    const card = document.createElement('div');
    card.className = 'member-card';

    const displayUrl = company.website.replace(/^https?:\/\//, '');

    card.innerHTML = `
      <img src="images/${company.image}" alt="${company.name} logo"
           onerror="this.style.display='none'">
      <h2>${company.name}</h2>
      <p>${company.address}</p>
      <p>${company.phone}</p>
      <p><a href="${company.website}" target="_blank" rel="noopener">${displayUrl}</a></p>
    `;

    return card;
}

function renderMembers(companies) {
    const container = document.getElementById('members-container');
    container.innerHTML = '';

    companies.forEach(company => {
        container.appendChild(createCard(company));
    });
}


memberData().then(companies => {
    renderMembers(companies);
});

