function showSection(section) {
    document.getElementById('search').style.display = 'none';
    document.getElementById('members').style.display = 'none';
    document.getElementById('loans').style.display = 'none';

    document.getElementById(section).style.display = 'block';
}

function searchBooks() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let books = document.querySelectorAll('.book');

    books.forEach(book => {
        book.style.display = book.innerText.toLowerCase().includes(input) ? 'block' : 'none';
    });
}

function highlightOverdue() {
    let today = new Date();
    let loans = document.querySelectorAll('.loan');

    loans.forEach(loan => {
        let due = new Date(loan.dataset.due);
        if (due < today) {
            loan.classList.add('overdue');
        }
    });
}

function showLogin() {
    document.getElementById('app').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

// ===== MEMBERS =====
function showForm() {
    document.getElementById("memberForm").style.display = "block";
}

function addMember() {
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let avatar = document.getElementById("avatar").value || "https://via.placeholder.com/150";

    if (!name || !id) return alert("Please enter Name and Member ID");

    let members = JSON.parse(localStorage.getItem("members")) || [];

    members.push({ name, id, avatar });
    localStorage.setItem("members", JSON.stringify(members));

    displayMembers();
    document.getElementById("memberForm").reset();
}

function displayMembers() {
    let list = document.getElementById("memberList");
    let members = JSON.parse(localStorage.getItem("members")) || [];
    list.innerHTML = "";

    if (members.length === 0) {
        list.innerHTML = "<p>No members yet. Add one!</p>";
        return;
    }

    members.forEach(m => {
        list.innerHTML += `
            <div class="book-card">
                <img src="${m.avatar}" alt="${m.name}">
                <p><strong>${m.name}</strong></p>
                <p>ID: ${m.id}</p>
            </div>
        `;
    });
}

function searchMembers() {
    let input = document.getElementById('memberSearch').value.toLowerCase();
    let members = JSON.parse(localStorage.getItem("members")) || [];
    let list = document.getElementById("memberList");
    list.innerHTML = "";

    members.filter(m => m.name.toLowerCase().includes(input) || m.id.toLowerCase().includes(input))
           .forEach(m => {
        list.innerHTML += `
            <div class="book-card">
                <img src="${m.avatar}" alt="${m.name}">
                <p><strong>${m.name}</strong></p>
                <p>ID: ${m.id}</p>
            </div>
        `;
    });
}

// Call displayMembers on load
window.onload = () => {
    if (document.getElementById("memberList")) displayMembers();
    if (document.getElementById("loanList")) displayLoans();
    if (document.getElementById("overdueList")) displayOverdue();
    updateOverdueBadge();
    setActiveNav();
};

// ===== LOANS =====
function showLoanForm() {
    document.getElementById("loanForm").style.display = "block";
}

function addLoan() {
    let book = document.getElementById("book").value;
    let borrower = document.getElementById("borrower").value;
    let due = document.getElementById("due").value;

    if (!book || !borrower || !due) return alert("All fields are required");

    let loans = JSON.parse(localStorage.getItem("loans")) || [];

    loans.push({ book, borrower, due });
    localStorage.setItem("loans", JSON.stringify(loans));

    displayLoans();
    document.getElementById("loanForm").reset();
}

function displayLoans() {
    let list = document.getElementById("loanList");
    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    let today = new Date();

    list.innerHTML = "";

    if (loans.length === 0) {
        list.innerHTML = "<p>No loans yet. Add one!</p>";
        return;
    }

    loans.forEach((l, index) => {
        let overdue = new Date(l.due) < today ? "overdue" : "";
        let daysLate = overdue ? Math.floor((today - new Date(l.due)) / (1000*60*60*24)) : 0;

        list.innerHTML += `
            <div class="book-card ${overdue}">
                <p><strong>${l.book}</strong></p>
                <p>Borrower: ${l.borrower}</p>
                <p>Due: ${l.due} ${overdue ? `- <span style="color:red;">${daysLate} days overdue</span>` : ""}</p>
                <button class="delete-btn" onclick="deleteLoan(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteLoan(index) {
    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    loans.splice(index, 1);
    localStorage.setItem("loans", JSON.stringify(loans));
    displayLoans();
}

function searchLoans() {
    let input = document.getElementById("loanSearch").value.toLowerCase();
    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    let list = document.getElementById("loanList");
    list.innerHTML = "";

    loans.filter(l => 
        l.book.toLowerCase().includes(input) || 
        l.borrower.toLowerCase().includes(input)
    ).forEach((l, index) => {
        let today = new Date();
        let overdue = new Date(l.due) < today ? "overdue" : "";
        let daysLate = overdue ? Math.floor((today - new Date(l.due)) / (1000*60*60*24)) : 0;

        list.innerHTML += `
            <div class="book-card ${overdue}">
                <p><strong>${l.book}</strong></p>
                <p>Borrower: ${l.borrower}</p>
                <p>Due: ${l.due} ${overdue ? `- <span style="color:red;">${daysLate} days overdue</span>` : ""}</p>
                <button class="delete-btn" onclick="deleteLoan(${index})">Delete</button>
            </div>
        `;
    });
}

// Auto load loans on page load
window.onload = () => {
    if (document.getElementById("memberList")) displayMembers();
    if (document.getElementById("loanList")) displayLoans();
    if (document.getElementById("overdueList")) displayOverdue();
    updateOverdueBadge();
    setActiveNav();
};


// AUTO LOAD
window.onload = () => {
    if (document.getElementById("memberList")) displayMembers();
    if (document.getElementById("loanList")) displayLoans();
};

function highlightOverdue() {
    if (!document.querySelector('.loan')) {
        alert("Go to Loans page to view overdue items.");
        return;
    }

    let today = new Date();
    let loans = document.querySelectorAll('.loan');

    loans.forEach(loan => {
        let due = new Date(loan.dataset.due);
        if (due < today) {
            loan.classList.add('overdue');
        }
    });
}

window.onload = () => {
    displayLoans();
    highlightOverdue();
};

function displayOverdue() {
    let list = document.getElementById("overdueList");
    if (!list) return;

    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    let today = new Date();

    list.innerHTML = "";

    loans.forEach(l => {
        let dueDate = new Date(l.due);

        if (dueDate < today) {
            list.innerHTML += `
                <div class="card overdue">
                    ${l.book} - ${l.borrower} <br>
                    Due: ${l.due}
                </div>
            `;
        }
    });

    if (list.innerHTML === "") {
        list.innerHTML = "<p>No overdue books 🎉</p>";
    }
}

window.onload = () => {
    if (document.getElementById("memberList")) displayMembers();
    if (document.getElementById("loanList")) displayLoans();
    if (document.getElementById("overdueList")) displayOverdue();
};

function displayOverdue() {
    let list = document.getElementById("overdueList");
    let countDisplay = document.getElementById("overdueCount");

    if (!list) return;

    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    let today = new Date();

    list.innerHTML = "";
    let count = 0;

    loans.forEach(l => {
        let dueDate = new Date(l.due);

        if (dueDate < today) {
            count++;

            let daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

            list.innerHTML += `
                <div class="card overdue">
                    <strong>${l.book}</strong><br>
                    Borrower: ${l.borrower}<br>
                    Due: ${l.due}<br>
                    <span style="color:red;">${daysLate} days overdue</span>
                </div>
            `;
        }
    });

    countDisplay.innerText = "Total Overdue: " + count;

    if (count === 0) {
        list.innerHTML = `
            <div class="card">
                🎉 No overdue books right now!
            </div>
        `;
    }
}

function updateOverdueBadge() {
    let badge = document.getElementById("overdueBadge");
    if (!badge) return;

    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    let today = new Date();

    let count = 0;

    loans.forEach(l => {
        let dueDate = new Date(l.due);
        if (dueDate < today) {
            count++;
        }
    });

    badge.innerText = count;

    // Hide badge if zero (optional clean look)
    badge.style.display = count > 0 ? "inline-block" : "none";
}

window.onload = () => {
    if (document.getElementById("memberList")) displayMembers();
    if (document.getElementById("loanList")) displayLoans();
    if (document.getElementById("overdueList")) displayOverdue();

    updateOverdueBadge(); // ⭐ ADD THIS
};

function displayMembers() {
    let list = document.getElementById("memberList");
    let members = JSON.parse(localStorage.getItem("members")) || [];
    list.innerHTML = "";

    if (members.length === 0) {
        list.innerHTML = "<p>No members yet. Add one!</p>";
        return;
    }

    members.forEach((m, index) => {
        list.innerHTML += `
            <div class="book-card">
                <img src="${m.avatar}" alt="${m.name}">
                <p><strong>${m.name}</strong></p>
                <p>ID: ${m.id}</p>
                <button class="delete-btn" onclick="deleteMember(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteMember(index) {
    let members = JSON.parse(localStorage.getItem("members")) || [];
    if (!members[index]) return;

    // Remove member at the given index
    members.splice(index, 1);

    // Save updated list
    localStorage.setItem("members", JSON.stringify(members));

    // Refresh display
    displayMembers();
}