document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the page from refreshing

    // Collect form input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Clear the error message
    const errorDiv = document.getElementById('login-error');
    errorDiv.style.display = 'none';document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                window.location.href = '/admin'; 
            } else {
                document.getElementById('login-error').style.display = 'block';
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });
    

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            
            window.location.href = '/admin';
        } else {
            
            errorDiv.textContent = 'Invalid credentials. Please try again.';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error logging in:', error);
        errorDiv.textContent = 'An error occurred. Please try again later.';
        errorDiv.style.display = 'block';
    }
});
