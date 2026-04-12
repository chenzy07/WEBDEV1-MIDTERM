// LOAD NAME
document.querySelectorAll("[data-auth-name]").forEach(el => {
  el.textContent = localStorage.getItem("name") || "Guest";
});

// LOAD ROLE
document.querySelectorAll("[data-auth-role]").forEach(el => {
  el.textContent = localStorage.getItem("role") || "Unknown";
});

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}