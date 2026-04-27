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
    if (toggleBtn) toggleBtn.textContent = "Light Mode";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
        toggleBtn.textContent = "Light Mode";
      } else {
        localStorage.setItem("darkMode", "disabled");
        toggleBtn.textContent = "Dark Mode";
      }
    });
  }
});

function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// fade in on load
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// smooth transition when clicking links
document.querySelectorAll("a").forEach(link => {
  if (link.href && !link.target) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const url = this.href;

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = url;
      }, 300);
    });
  }
});

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");

const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalRarity = document.getElementById("modalRarity");

let scrollY = 0;

// OPEN MODAL
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", (e) => {
    if (e.target.closest(".add-btn")) return;

    // SAVE SCROLL POSITION
    scrollY = window.scrollY;

    // LOCK BODY PROPERLY
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    modal.classList.add("active");

    modalImg.src = card.dataset.img;
    modalName.textContent = card.dataset.name;
    modalPrice.textContent = card.dataset.price;

    modalRarity.textContent = card.dataset.rarity;
    modalRarity.className = "rarity-tag rarity-" + card.dataset.rarity;
  });
});

// CLOSE MODAL
function closeModal() {
  modal.classList.remove("active");

  // RESTORE SCROLL
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  window.scrollTo(0, scrollY);
}

modalClose.onclick = closeModal;

modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};
