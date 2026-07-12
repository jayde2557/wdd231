// Fetches the member data from the JSON file
const memberData = async () => {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching member data:', error);
        return [];
    }
};

// Builds one card's DOM for a single company object
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

// Renders the full list into the container by ID
function renderMembers(companies) {
    const container = document.getElementById('members-container');
    container.innerHTML = ''; // clear any placeholder content

    companies.forEach(company => {
        container.appendChild(createCard(company));
    });
}

// Kick things off once the script runs
memberData().then(companies => {
    renderMembers(companies);
});