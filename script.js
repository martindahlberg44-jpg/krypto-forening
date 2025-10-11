// ==========================
// "Bli medlem"-knapp
// ==========================
document.getElementById("joinBtn").addEventListener("click", function() {
    const msg = document.getElementById("joinMsg");
    msg.textContent = "Tack för ditt intresse!";
    msg.style.color = "#FF69B4";
    msg.style.marginTop = "15px";
});

// ==========================
// Hamburgermeny-funktion
// ==========================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Stäng menyn när man klickar på en länk (mobil)
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove("show");
        }
    });
});

// ==========================
// 1. SMOOTH SCROLL
// ==========================
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // Höjd på header
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ==========================
// 2. SCROLL ANIMATIONS (Fade-in effect)
// ==========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
        }
    });
}, observerOptions);

// Observera alla sektioner och feature cards
const sectionsToAnimate = document.querySelectorAll(".section, .feature-card");
sectionsToAnimate.forEach(section => {
    section.classList.add("fade-in-element");
    observer.observe(section);
});

// ==========================
// 3. AKTIV NAVIGATION (Highlight current section)
// ==========================
const sections = document.querySelectorAll(".section");

function setActiveNav() {
    let current = "";
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

// Kör när man scrollar (throttled för bättre performance)
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        setActiveNav();
    });
});

// Kör en gång vid sidladdning
window.addEventListener("load", setActiveNav);