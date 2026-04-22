let search = document.getElementById("search");

if (search) {
  search.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      let name = card.querySelector("h4").innerText.toLowerCase();

      if (name.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

  });
}

let cart = [];

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("cartOverlay");

  if (overlay) {
    overlay.addEventListener("click", function () {
      toggleCart();
    });
  }
});

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

// UPDATE CART UI
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
    cartTotal.textContent = "0";
    return;
  }

  cart.forEach(item => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>₱${item.price}</span>
      </div>
    `;
  });

  cartTotal.textContent = total;
}

// CLEAR CART
function clearCart() {
  cart = [];
  updateCart();
}

// CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Purchase successful!");
  cart = [];
  updateCart();
}

// OPEN / CLOSE MODAL
function openAuth() {
  document.getElementById("authModal").classList.add("active");
  document.getElementById("authOverlay").classList.add("active");
}

function closeAuth() {
  document.getElementById("authModal").classList.remove("active");
  document.getElementById("authOverlay").classList.remove("active");
}

// SWITCH FORMS
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

// DARK MODE TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("darkModeToggle");

  // Load saved mode
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
        toggleBtn.textContent = "☀️";
      } else {
        localStorage.setItem("darkMode", "disabled");
        toggleBtn.textContent = "🌙";
      }
    });
  }
});

function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}