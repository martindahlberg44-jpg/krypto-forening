// ==========================
// "Bli medlem"-knapp
// ==========================
const joinBtn = document.getElementById("joinBtn");
const joinMsg = document.getElementById("joinMsg");

if (joinBtn && joinMsg) {
    joinBtn.addEventListener("click", function() {
        joinMsg.textContent = "Tack för ditt intresse!";
        joinMsg.style.color = "#FF69B4";
        joinMsg.style.marginTop = "15px";
    });
} else {
    console.warn("Bli medlem-knapp eller meddelande hittades inte");
}

// ==========================
// Hamburgermeny-funktion
// ==========================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
} else {
    console.warn("Hamburgermeny-element hittades inte");
}

// Stäng menyn när man klickar på en länk (mobil)
const navLinks = document.querySelectorAll("nav a");

if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.classList.remove("show");
            }
        });
    });
}
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

// ==========================
// 4. SCROLL PROGRESS BAR
// ==========================
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

// ==========================
// 5. MOBILE FEATURE CARDS CAROUSEL
// ==========================
// Smooth scroll snap för feature cards på mobil
const featureCards = document.querySelector('.feature-cards');

if (featureCards && window.innerWidth <= 768) {
    let isScrolling = false;
    
    featureCards.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    // Touch-friendly: förbättra scroll experience
    featureCards.style.scrollBehavior = 'smooth';
}