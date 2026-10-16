/* MOBIL MENU */

const navicon = document.querySelector(".navicon");
const mobileMenu = document.querySelector(".mobile-menu");
const logo = document.querySelector(".logo");

if (navicon && mobileMenu) {
  const toggleMobileMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  };

  navicon.addEventListener("click", toggleMobileMenu);
  mobileMenu.addEventListener("click", toggleMobileMenu);

  if (logo) {
    logo.addEventListener("click", () => {
      if (mobileMenu.classList.contains("flex")) {
        toggleMobileMenu();
      }
    });
  }
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
      selectedCountry.textContent = country.toUpperCase();

      // Skjul alle butikslister
      storeLists.forEach((list) => {
        list.hidden = true;
      });

      // Vis butikker fra valgt land
      const selectedList = document.querySelector(`#${country}-stores`);

      if (selectedList) {
        selectedList.hidden = false;
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
