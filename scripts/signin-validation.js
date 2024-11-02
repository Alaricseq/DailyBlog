document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!signinForm || !emailInput || !passwordInput) {
        console.error('Required form elements are missing.');
        return;
    }

    signinForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Validation
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert('Both fields are required!');
            return;
        }

        try {
            const response = await fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success) {
                alert('Sign in successful! Redirecting...');
                window.location.href = result.redirectTo; // Redirect to appropriate page
            } else {
                alert(result.message); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
