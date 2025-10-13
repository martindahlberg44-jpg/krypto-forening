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

// ==========================
// Smooth scroll
// ==========================
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            } else {
                console.warn(`Sektion ${targetId} hittades inte`);
            }
        });
    });
}

// ==========================
// Scroll animations (fade-in)
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

const sectionsToAnimate = document.querySelectorAll(".section, .feature-card");

if (sectionsToAnimate.length > 0) {
    sectionsToAnimate.forEach(section => {
        section.classList.add("fade-in-element");
        observer.observe(section);
    });
} else {
    console.warn("Inga element hittades för scroll-animationer");
}

// ==========================
// Aktiv navigation (highlight current section)
// ==========================
const sections = document.querySelectorAll(".section");

function setActiveNav() {
    if (sections.length === 0 || navLinks.length === 0) return;
    
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

let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        setActiveNav();
    });
});

window.addEventListener("load", setActiveNav);

// ==========================
// Scroll progress bar
// ==========================
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    if (!scrollProgress) return;
    try {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + "%";
    } catch (error) {
        console.error("Fel vid uppdatering av scroll progress:", error);
    }
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

// ==========================
// Mobile feature cards carousel
// ==========================
const featureCards = document.querySelector('.feature-cards');

if (featureCards && window.innerWidth <= 768) {
    try {
        let isScrolling = false;
        featureCards.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
        featureCards.style.scrollBehavior = 'smooth';
    } catch (error) {
        console.error("Fel vid initiering av feature cards carousel:", error);
    }
}

// ==========================
// DARK MODE TOGGLE
// ==========================
const themeToggle = document.createElement('button');
themeToggle.id = 'themeToggle';
themeToggle.innerHTML = '🌙';
themeToggle.classList.add('theme-toggle');
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
