/* =========================
   NAVIGATION MENU
========================= */

const menuToggle = document.querySelector("#menuToggle");
const mainMenu = document.querySelector("#mainMenu");

if (menuToggle && mainMenu) {
  function openMenu() {
    mainMenu.classList.add("open");
    mainMenu.inert = false;

    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Luk menu");

    // Skift navbarens baggrundsfarve
    document.querySelector(".site-header").classList.add("menu-active");

    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mainMenu.classList.remove("open");
    mainMenu.inert = true;

    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Åbn menu");

    // Gendan navbarens normale baggrundsfarve
    document.querySelector(".site-header").classList.remove("menu-active");

    document.body.style.overflow = "";
  }

  // Klik på hamburger / X
  menuToggle.addEventListener("click", () => {
    if (mainMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Luk med Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainMenu.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Luk når man klikker på et link
  const menuLinks = mainMenu.querySelectorAll("a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* =========================
   MENU HOVER - BILLEDESKIFT
========================= */

const menuHoverLinks = document.querySelectorAll(".menu-links [data-menu]");

const menuProductGroups = document.querySelectorAll(".menu-product-group");

// Funktion til at vise den rigtige gruppe
function showMenuGroup(groupName) {
  menuProductGroups.forEach((group) => {
    group.classList.toggle("active", group.dataset.group === groupName);
  });
}

// Skift billeder ved hover og tastaturfokus
menuHoverLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    showMenuGroup(link.dataset.menu);
  });

  link.addEventListener("focus", () => {
    showMenuGroup(link.dataset.menu);
  });
});

// Nulstil til SHOP, når menuen lukkes
const navigationToggle = document.querySelector("#menuToggle");

if (navigationToggle) {
  navigationToggle.addEventListener("click", () => {
    if (!navigationToggle.classList.contains("active")) {
      showMenuGroup("shop");
    }
  });
}

/* PRODUCT CAROUSEL */

const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");

if (slides.length > 0 && prevBtn && nextBtn) {
  let currentSlide = 0;

  function showSlide(index) {
    slides[currentSlide].classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });
}

/* IN STORES DROPDOWN */

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownOptions = document.querySelector(".dropdown-options");
const selectedCountry = document.querySelector("#selected-country");

const countryButtons = document.querySelectorAll(".dropdown-options button");

const storeLists = document.querySelectorAll(".stores-list");

if (dropdownToggle && dropdownOptions && selectedCountry) {
  // Åbn og luk dropdown
  dropdownToggle.addEventListener("click", () => {
    const isOpen = dropdownToggle.getAttribute("aria-expanded") === "true";

    dropdownToggle.setAttribute("aria-expanded", String(!isOpen));
    dropdownOptions.hidden = isOpen;
  });

  // Vælg land
  countryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const country = button.dataset.country;

      // Opdater dropdown-tekst

      // Opdater dropdown-tekst
      if (country === "") {
        selectedCountry.textContent = "CHOOSE LOCATION";
      } else {
        selectedCountry.textContent = country.toUpperCase();
      }

      // Skjul alle butikslister
      storeLists.forEach((list) => {
        list.hidden = true;
      });

      // Vis butikker fra valgt land

      // Vis kun butikker, hvis et land er valgt
      if (country !== "") {
        const selectedList = document.querySelector(`#${country}-stores`);

        if (selectedList) {
          selectedList.hidden = false;
        }
      }

      // Luk dropdown
      dropdownOptions.hidden = true;
      dropdownToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Luk dropdown ved klik udenfor
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".stores-dropdown")) {
      dropdownOptions.hidden = true;
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const correctPassword = "YORI2026";

if (sessionStorage.getItem("siteUnlocked") !== "true") {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="password-screen">
        <form id="passwordForm">
          <h1 class:"passwordOver">Adgangskode</h1>
          <p class:"passwordbrød">Dette er et uddannelses projekt, og kan derfor ikke direkte forbindes med virksomheden "Yori Jomo"</p>
          <input
            type="password"
            id="passwordInput"
            placeholder="Indtast adgangskode"
            required
          >
          <button type="submit">Gå ind</button>
          <p id="passwordError"></p>
        </form>
      </div>
    `,
  );

  document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.getElementById("passwordInput").value;

    if (input === correctPassword) {
      sessionStorage.setItem("siteUnlocked", "true");
      document.querySelector(".password-screen").remove();
    } else {
      document.getElementById("passwordError").textContent =
        "Forkert adgangskode. Prøv igen.";
    }
  });
}
