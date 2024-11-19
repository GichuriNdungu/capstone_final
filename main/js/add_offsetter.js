document.getElementById('offsetter-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = document.getElementById('offsetter-form');    
    const formData = {
        name: document.getElementById('name').value,
        website:document.getElementById('website').value,
        location: document.getElementById('location').value,
        offsetFocus: document.getElementById('offsetFocus').value,
        CO2ReductionPotential: document.getElementById('CO2ReductionPotential').value,
        contact:document.getElementById('contact').value,
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/add-offsetters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        const responseDiv = document.getElementById('form-response');
        
        if (response.error) {
            responseDiv.textContent = `Error: ${response.error}`;
            responseDiv.style.color = 'red';
        } else {
            responseDiv.textContent = result.message;
            responseDiv.style.color = 'green';
            form.reset();
        }
    } catch (error) {
        console.error('Error submitting the form:', error);
        document.getElementById('form-response').textContent = 'An error occurred while submitting the form.';
    }
});
