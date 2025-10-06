// "Bli medlem"-knapp
document.getElementById("joinBtn").addEventListener("click", function() {
    const msg = document.getElementById("joinMsg");
    msg.textContent = "Tack för ditt intresse! En länk för medlemskap skickas inom kort.";
    msg.style.color = "#90e0ef";
    msg.style.marginTop = "15px";
});

// Hamburgermeny-funktion
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});