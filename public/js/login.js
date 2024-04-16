document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with your API endpoint
    fetch('http://localhost:9000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.accessToken) {
            // Store the received token in localStorage or sessionStorage
            sessionStorage.setItem('accessToken', data.accessToken);
            // Redirect to the main page
            window.location.href = 'main.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => alert('Error logging in: ' + error));
});
