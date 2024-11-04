document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const form = e.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        const response = await fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            form.reset(); 
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert('There was an error sending your message. Please try again.');
    }
});
