document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('isAdmin').checked;

    const roles = isAdmin ? ["user", "admin"] : ["user"];

    const response = await fetch('http://localhost:9000/api/auth/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password,
            roles
        })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Registration successful!');
        window.location.href = '/html/signin.html';
    } else {
        alert('Registration failed: ' + data.message);
    }
});
