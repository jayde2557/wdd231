const container = document.getElementById('members-container');
const filterButtons = document.querySelectorAll('.view-filters button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update which button looks "active"
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        button.dataset.filter === 'list'
            ? container.classList.add('list-view')
            : container.classList.remove('list-view');
    });
});
