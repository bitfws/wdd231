export default function navigation(currentPage) {
  document.querySelectorAll("nav a").forEach((pageLink) => {
    if (pageLink.textContent.toLowerCase() === currentPage.toLowerCase()) {
      pageLink.classList.add("active");
    } else {
      pageLink.classList.remove("active");
    }
  });
  
  const nav = document.querySelector("nav");
  const menuMobile = document.getElementById("menu-mobile");
  menuMobile.setAttribute("aria-controls", "menu");
  menuMobile.setAttribute("aria-label", "Toggle navigation menu");

  menuMobile.addEventListener("click", () => {
    const expanded = menuMobile.getAttribute("aria-expanded") === "true";
    menuMobile.setAttribute("aria-expanded", !expanded);

    if (!expanded) {
      menuMobile.textContent = "X";
      nav.classList.add('col')
      nav.style.top = '0'
    } else {
      menuMobile.textContent = "☰";
      nav.classList.remove('col')
      nav.style.top = '-100vh'
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove('col')
      nav.style.top = '-100vh'
    }
})
}
