// Mobile nav
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Scroll reveal
const revealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((el) => observer.observe(el));

// Active nav link + scroll top
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const offsetTop = section.offsetTop;
    const height = section.offsetHeight;
    const anchor = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollY >= offsetTop && scrollY < offsetTop + height) {
      navAnchors.forEach((a) => a.classList.remove("active"));
      anchor?.classList.add("active");
    }
  });

  if (scrollY > 500) {
    scrollTopBtn?.classList.add("visible");
  } else {
    scrollTopBtn?.classList.remove("visible");
  }
});

// Simple typing effect
const typedEl = document.querySelector(".typed");
if (typedEl) {
  const text = typedEl.textContent.trim();
  let idx = 0;
  typedEl.textContent = "";
  const type = () => {
    if (idx <= text.length) {
      typedEl.textContent = text.slice(0, idx);
      idx++;
      setTimeout(type, 45);
    }
  };
  type();
}
