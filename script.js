"use strict";

document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-navigation");

function setMenu(open) {
  if (!menuButton || !navigation) return;
  navigation.classList.toggle("nav-open", open);
  menuButton.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenu(false);
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.05 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.setAttribute("data-visible", "true"));
}

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = String(new Date().getFullYear());
