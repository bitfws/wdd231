"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Obtener datos JSON
  async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  }

  async function fetchMembers() {
    const data = await getData("data/members.json");
    if (data) {
      displayMembers(data);
    }
  }

  fetchMembers();

  // Actualiza el título de la página según el <title>
  const title = document.querySelector(".currentPageTitle");
  if (title) {
    title.textContent = document.title.split(" | ")[1];
  }

  // Marca la navegación activa
  document.querySelectorAll("nav a").forEach((pageLink) => {
    const pageName = document.title.split(" | ")[1].toLowerCase();
    if (pageLink.textContent.toLowerCase() === pageName) {
      pageLink.classList.add("active");
    } else {
      pageLink.classList.remove("active");
    }
  });

  // Menú móvil accesible
  const nav = document.getElementById("menu");
  const menuMobile = document.getElementById("menu-mobile");

  menuMobile.setAttribute("aria-controls", "menu");
  menuMobile.setAttribute("aria-label", "Toggle navigation menu");

  menuMobile.addEventListener("click", () => {
    const expanded = menuMobile.getAttribute("aria-expanded") === "true";
    menuMobile.setAttribute("aria-expanded", !expanded);

    if (!expanded) {
      menuMobile.textContent = "X";
      nav.style.display = "flex";
      nav.style.top = "0px";
    } else {
      menuMobile.textContent = "☰";
      nav.style.display = "none";
      nav.style.top = "-100vw";
    }
  });

  // Cambiar entre vista Grid y List
  const view_selector = document.getElementById("view_selector");
  const content = document.getElementById("content");

  Array.from(view_selector.children).forEach((button) => {
    button.addEventListener("click", () => {
      content.classList.remove("grid", "list");

      if (button.textContent === "Grid") {
        content.classList.add("grid");
      } else {
        content.classList.add("list");
      }
    });
  });

  // Mostrar miembros
  function displayMembers(membersArray) {
    content.innerHTML = "";

    membersArray.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = `images/${member.image}`;
      img.alt = `${member.name} Avatar`;
      img.loading = "lazy";
      img.width = 200;
      img.height = 200;

      const name = document.createElement("h3");
      name.textContent = member.name;

      const address = document.createElement("p");
      address.textContent = member.address;

      const phone = document.createElement("p");
      phone.textContent = member.phone;

      const website = document.createElement("a");
      website.href = member.website;
      website.target = "_blank";
      website.rel = "noopener noreferrer";
      website.textContent = "Details";

      card.append(img, name, address, phone, website);
      content.appendChild(card);
    });
  }

  // Año actual y última modificación
  const currentYearSpan = document.getElementById("currentyear");
  if (currentYearSpan) {
    currentYearSpan.textContent = `© ${new Date().getFullYear()} Timbuktu Chamber of Commerce`;
  }

  const lastModifiedP = document.getElementById("lastModified");
  if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
  }
});
