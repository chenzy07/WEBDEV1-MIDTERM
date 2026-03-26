// Show/Hide forms
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

// Register user (stored in localStorage)
function register() {
    let username = document.getElementById("regUsername").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    if (!username || !email || !password) return alert("All fields required");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.username === username)) {
        return alert("Username already exists");
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    showLogin();
}

// Login user
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert(`Welcome, ${username}!`);
        window.location.href = "index.html"; // redirect after login
    } else {
        alert("Invalid username or password");
    }
}