// main.js
document.addEventListener('DOMContentLoaded', function() {
    const accessToken = sessionStorage.getItem('accessToken');
    
    // If there's an accessToken, user is already logged in,
    // so we can redirect them from index.html to main.html.
    if (accessToken && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'main.html';
    }

    // If there's no accessToken and we are on main.html,
    // redirect the user to index.html to sign in or sign up.
    if (!accessToken && window.location.pathname.endsWith('main.html')) {
        window.location.href = 'index.html';
    }
});
