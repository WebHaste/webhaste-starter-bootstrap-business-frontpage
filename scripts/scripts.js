//Send email form input to user's email client

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // EDIT THESE... This is where you set the recipient and subject.
    const recipient = "support@example.com";
    const subject = "Contact from Website";

    // Grab and sanitize the user's inputs
    const name = encodeURIComponent(document.getElementById('name').value);
    const email = encodeURIComponent(document.getElementById('email').value);
    const phone = encodeURIComponent(document.getElementById('phone').value);
    const message = encodeURIComponent(document.getElementById('message').value);

    const emailBody = `Name:  ${name}
    Email: ${email}
    Phone: ${phone}
    Message:
    ${message}

    _______________________
    This message sent from the website.`;

    // Construct the mailto link and trigger user's native email client
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
});
