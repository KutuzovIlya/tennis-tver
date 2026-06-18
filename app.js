// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky nav shadow
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
document.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById("burger");
const navMobile = document.getElementById("navMobile");
burger.addEventListener("click", () => {
  const open = navMobile.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  burger.innerHTML = open
    ? '<i class="ph ph-x" aria-hidden="true"></i>'
    : '<i class="ph ph-list" aria-hidden="true"></i>';
});
navMobile.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navMobile.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.innerHTML = '<i class="ph ph-list" aria-hidden="true"></i>';
  })
);

// Rating tabs
const tabs = document.querySelectorAll(".rating__tab");
const panels = document.querySelectorAll(".rating__panel");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    const target = tab.dataset.tab;
    panels.forEach((p) =>
      p.classList.toggle("is-hidden", p.dataset.panel !== target)
    );
  })
);

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Form validation
const form = document.getElementById("joinForm");
const success = document.getElementById("formSuccess");
const setError = (input, msg) => {
  input.classList.toggle("is-invalid", Boolean(msg));
  const slot = form.querySelector(`.field__error[data-for="${input.id}"]`);
  if (slot) slot.textContent = msg;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements.name;
  const phone = form.elements.phone;
  let ok = true;

  if (!name.value.trim()) {
    setError(name, "Укажите имя");
    ok = false;
  } else setError(name, "");

  const digits = phone.value.replace(/\D/g, "");
  if (digits.length < 10) {
    setError(phone, "Укажите корректный телефон");
    ok = false;
  } else setError(phone, "");

  if (!ok) return;
  form.reset();
  success.hidden = false;
  setTimeout(() => (success.hidden = true), 6000);
});
