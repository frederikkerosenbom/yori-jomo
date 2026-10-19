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

/* NEWSLETTER POPUP */

const newsletterPopup = document.querySelector("#newsletterPopup");
const closeNewsletter = document.querySelector("#closeNewsletter");
const newsletterForm = document.querySelector("#newsletterForm");
const newsletterMessage = document.querySelector("#newsletterMessage");

if (newsletterPopup && closeNewsletter && newsletterForm) {
  let previousFocus = null;

  // Åbn popup
  function openNewsletter() {
    previousFocus = document.activeElement;
    newsletterPopup.hidden = false;
    document.body.style.overflow = "hidden";
    closeNewsletter.focus();
  }

  // Luk popup
  function hideNewsletter() {
    newsletterPopup.hidden = true;
    document.body.style.overflow = "";

    sessionStorage.setItem("newsletterClosed", "true");

    if (previousFocus) {
      previousFocus.focus();
    }
  }

  // Vis én gang pr. browsersession
  if (!sessionStorage.getItem("newsletterClosed")) {
    openNewsletter();
  }

  // Luk ved CLOSE
  closeNewsletter.addEventListener("click", hideNewsletter);

  // Luk ved klik på den mørke baggrund
  newsletterPopup.addEventListener("click", (event) => {
    if (event.target === newsletterPopup) {
      hideNewsletter();
    }
  });

  // Luk med Escape
  document.addEventListener("keydown", (event) => {
    if (newsletterPopup.hidden) return;

    if (event.key === "Escape") {
      hideNewsletter();
    }

    // Hold tastaturfokus inde i popup
    if (event.key === "Tab") {
      const focusable = Array.from(newsletterPopup.querySelectorAll("button:not([disabled]), input:not([disabled])")).filter((el) => el.getClientRects().length > 0);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Demo-formular
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newsletterMessage.textContent = "Thank you! We have sent you an email to confirm.";

    newsletterForm.reset();
  });

  // Åbn popup fra footer
  const openNewsletterButton = document.querySelector("#openNewsletter");

  if (openNewsletterButton) {
    openNewsletterButton.addEventListener("click", (event) => {
      event.preventDefault();
      openNewsletter();
    });
  }
} // Her slutter den overordnede if-blok

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
