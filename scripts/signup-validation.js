document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Validation
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone_number = document.getElementById('phone_number_number').value.trim();
    const age = document.getElementById('age').value.trim();

    if (!username || !password || !email || !phone_number || !age) {
        alert('All fields are required!');
        return;
    } else if (phone_number.length !== 10) {
        alert('phone_number number must be 10 digits long.');
        return;
    } else if (isNaN(age) || age < 1 || age > 120) {
        alert('Please enter a valid age between 1 and 120.');
        return;
    }

    // Submit form data
    const formData = {
        username,
        password,
        email,
        phone_number: phone_number,
        age
    };

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Sign Up Successful! Redirecting to sign-in page.');
            window.location.href = 'signin.html';
        } else {
            const result = await response.json();
            alert(`Sign Up Failed: ${result.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sign Up Failed');
    }
});
