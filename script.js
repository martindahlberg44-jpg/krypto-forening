// ==========================
// 1. BLI MEDLEM-KNAPP
// ==========================
const joinBtn = document.getElementById("joinBtn");
const joinMsg = document.getElementById("joinMsg");

if (joinBtn && joinMsg) {
    joinBtn.addEventListener("click", () => {
        joinMsg.textContent = "Tack för ditt intresse!";
        joinMsg.style.color = "#FF69B4";
        joinMsg.style.marginTop = "15px";
    });
} else {
    console.warn("Bli medlem-knapp eller meddelande hittades inte");
}

// ==========================
// 2. HAMBURGERMENY
// ==========================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav a");

menuToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) navMenu.classList.remove("show");
    });
});

// ==========================
// 3. SMOOTH SCROLL & AKTIV NAVIGATION
// ==========================
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

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

window.addEventListener("scroll", () => window.requestAnimationFrame(setActiveNav));
window.addEventListener("load", setActiveNav);

// ==========================
// 4. SCROLL PROGRESS BAR
// ==========================
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = (window.pageYOffset / totalHeight) * 100 + "%";
}

window.addEventListener("scroll", () => window.requestAnimationFrame(updateScrollProgress));
window.addEventListener("load", updateScrollProgress);

// ==========================
// 5. FADE-IN ANIMATION
// ==========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".section, .feature-card").forEach(el => {
    el.classList.add("fade-in-element");
    observer.observe(el);
});

// ==========================
// 6. FEATURE CARDS SCROLL (Mobil) MED SNAP TO CENTER
// ==========================
const featureCards = document.querySelector(".feature-cards");

if (featureCards) {
    // Scroll snap behavior via JS
    featureCards.style.scrollBehavior = 'smooth';
    featureCards.style.scrollSnapType = 'x mandatory';

    let isScrolling;
    featureCards.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            const cardWidth = featureCards.querySelector('.feature-card').offsetWidt
