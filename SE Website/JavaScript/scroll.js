// =========================
// Scroll reveal animations
// Path: JavaScript/scroll.js
// =========================

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));

// Scroll-driven background (no tiling, no seams)
(() => {
  const root = document.documentElement;
  let ticking = false;

  function update() {
    const scrollY = window.scrollY || 0;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const t = scrollY / max; // 0 -> 1 as you scroll down

    // Smooth positions (0-100) for background-position
    // These values are tuned to feel "alive" but not jumpy.
    const x1 = 20 + t * 40;    // 20 -> 60
    const y1 = 15 + t * 55;    // 15 -> 70
    const x2 = 80 - t * 35;    // 80 -> 45
    const y2 = 70 - t * 45;    // 70 -> 25

    // Slight hue shift (very subtle)
    const hue = 0 + t * 18;    // 0deg -> 18deg

    root.style.setProperty("--bg-x1", `${x1}%`);
    root.style.setProperty("--bg-y1", `${y1}%`);
    root.style.setProperty("--bg-x2", `${x2}%`);
    root.style.setProperty("--bg-y2", `${y2}%`);
    root.style.setProperty("--bg-hue", `${hue}deg`);

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
