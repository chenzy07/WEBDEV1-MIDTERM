const loginBtn = document.getElementById("loginBtn");
const sideDrawer = document.getElementById("sideDrawer");
const closeBtn = document.getElementById("closeBtn");

if(loginBtn){
    loginBtn.addEventListener("click", () => {
        sideDrawer.classList.add("active");
    });
}

if(closeBtn){
    closeBtn.addEventListener("click", () => {
        sideDrawer.classList.remove("active");
    });
}

const links = document.querySelectorAll(".nav-links a");
links.forEach(link => {
    if(link.href === window.location.href){
        link.style.fontWeight = "bold";
        link.style.textDecoration = "underline";
    }
});

const loginForm = document.getElementById("loginForm");

if(loginForm){
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(username === "admin" && password === "1234"){
            alert("Login Successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid Credentials");
        }
    });
}

const nutrients = {
    "Overnight Oats Bowl": "450 kcal | Protein: 15g | Carbs: 60g | Fats: 12g | Fiber: 8g | Vitamins: B, C | Minerals: Calcium, Iron",
    "Grilled Chicken & Rice": "520 kcal | Protein: 35g | Carbs: 50g | Fats: 15g | Fiber: 5g | Vitamins: B3, B6 | Minerals: Potassium, Magnesium",
    "Fresh Veggie Salad Bowl": "390 kcal | Protein: 10g | Carbs: 30g | Fats: 18g | Fiber: 12g | Vitamins: A, C, K | Minerals: Magnesium, Iron",
    "Healthy Chicken Wrap": "480 kcal | Protein: 28g | Carbs: 40g | Fats: 20g | Fiber: 6g | Vitamins: A, C | Minerals: Potassium, Zinc"
};

const foodCards = document.querySelectorAll('.food-card');
const nutrientPanel = document.getElementById('nutrientPanel');
const nutrientTitle = document.getElementById('nutrientTitle');
const nutrientDetails = document.getElementById('nutrientDetails');
const closeNutrient = document.getElementById('closeNutrient');

foodCards.forEach(card => {
    card.addEventListener('click', () => {
        const foodName = card.querySelector('h3').textContent;
        nutrientTitle.textContent = foodName;
        nutrientDetails.textContent = nutrients[foodName];
        nutrientPanel.classList.add('active');
    });
});

closeNutrient.addEventListener('click', () => {
    nutrientPanel.classList.remove('active');
});