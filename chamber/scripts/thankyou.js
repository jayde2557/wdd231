const params = new URLSearchParams(window.location.search);


const fieldMap = {
    fname: 'out-fname',
    lname: 'out-lname',
    email: 'out-email',
    phone: 'out-phone',
    orgname: 'out-orgname',
    timestamp: 'out-timestamp'
};

Object.entries(fieldMap).forEach(([paramName, elementId]) => {
    const value = params.get(paramName);
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = value ? decodeURIComponent(value) : 'Not provided';
    }
});
