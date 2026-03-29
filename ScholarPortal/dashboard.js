// Sidebar Navigation Functions

function showDashboardHome() {
    const dashboardHome = document.getElementById('dashboardHome');
    const subjectPage = document.getElementById('subjectPage');
    
    if(dashboardHome) dashboardHome.style.display = 'flex';
    if(subjectPage) subjectPage.style.display = 'none';
}

// Redirect to register page (optional: you can also show an in-page section)
function showSection(section) {
    if(section === 'register') {
        window.location.href = 'register.html'; // redirect to register page
    } 
    else if(section === 'profile') {
        window.location.href = 'profile.html'; // redirect to profile page
    } 
    else {
        alert('Section coming soon!');
    }
}