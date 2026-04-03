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

function addToCart(name, price){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if(existing){
    existing.quantity++;
  } else {
    cart.push({name, price, quantity:1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartNotifier();
}

// Update badge
function updateCartNotifier(){
  const cartCountEl = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if(cartCountEl) cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
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
