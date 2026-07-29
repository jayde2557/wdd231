// Set the hidden timestamp field to the moment the form was loaded
const timestamp = document.getElementById('timestamp');
if (timestamp) {
    timestamp.value = new Date().toString();
}

// Wire up each "Learn more" link to open its matching <dialog> modal
const modalTriggers = document.querySelectorAll('.modal-trigger');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = trigger.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

// Wire up each modal's close button
const closeButtons = document.querySelectorAll('.modal-close');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dialog = button.closest('dialog');
        if (dialog) {
            dialog.close();
        }
    });
});
