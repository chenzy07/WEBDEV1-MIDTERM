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
    const studentID = document.getElementById("regStudentID").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!studentID || !email || !password) {
        return alert("All fields are required");
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if studentID already exists
    if (users.some(u => u.studentID === studentID)) {
        return alert("Student ID already exists");
    }

    users.push({ studentID, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    showLogin();
}

// Login user
function login() {
    const studentID = document.getElementById("loginStudentID").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!studentID || !password) {
        return alert("Enter Student ID and Password");
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.studentID === studentID && u.password === password);

    if (user) {
        alert(`Welcome, ${studentID}!`);
        // Redirect to dashboard (create dashboard.html)
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Student ID or Password");
    }
}

function logout() {
    // Optional: clear any session-specific data
    localStorage.removeItem("loggedIn"); // if you had a flag for logged-in state
    alert("You have been logged out.");
    
    // Redirect to login page
    window.location.href = "index.html"; // replace with your login page file
}

// Optional: auto-check login state on dashboard
window.onload = function() {
    // If user is not logged in, redirect to login
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.length) {
        // No registered users, redirect to login
        window.location.href = "index.html";
    }
};