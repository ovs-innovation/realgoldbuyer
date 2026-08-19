const header = document.getElementById("header");
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
document.getElementById("menu")?.addEventListener("click", () => nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

const layers = [...document.querySelectorAll("[data-speed]")];
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.add("solid");
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = `${max ? (y / max) * 100 : 0}%`;
  layers.forEach((el) => {
    if (!el.closest(".hero")) return;
    const s = parseFloat(el.dataset.speed);
    el.style.transform = `translate3d(0, ${y * s * 0.35}px, 0)`;
  });
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const hero = document.querySelector(".hero");
const slides = [...document.querySelectorAll(".hero-bg img")];
const dotsWrap = document.getElementById("heroDots");
if (hero && slides.length > 1) {
  let i = 0;
  let timer;
  slides.forEach((_, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Slide ${n + 1}`);
    if (n === 0) b.classList.add("on");
    b.addEventListener("click", () => go(n, true));
    dotsWrap?.append(b);
  });
  const dots = [...(dotsWrap?.children || [])];
  const go = (n) => {
    slides[i].classList.remove("show");
    dots[i]?.classList.remove("on");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("show");
    dots[i]?.classList.add("on");
    clearInterval(timer);
    timer = setInterval(() => go(i + 1), 2000);
  };
  timer = setInterval(() => go(i + 1), 2000);
}

if (hero && matchMedia("(pointer:fine)").matches) {
  const bg = document.querySelector(".hero-bg");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (bg) bg.style.transform = `translate(${x * -18}px, ${y * -12}px)`;
  });
  hero.addEventListener("mouseleave", () => { if (bg) bg.style.transform = ""; });
}

document.querySelectorAll(".features article, .split-txt, .tgrid blockquote, .steps article, .look figure").forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver((ents) => {
  ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("waForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const text = [
    "Hello, I want a gold valuation.",
    "Name: " + f.name.value,
    "Phone: " + f.phone.value,
    "Type: " + f.gold.value,
    f.msg.value ? "Message: " + f.msg.value : "",
  ].filter(Boolean).join("\n");
  window.open("https://wa.me/919958086980?text=" + encodeURIComponent(text), "_blank");
});
