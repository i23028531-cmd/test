const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxClose = document.querySelector(".lightbox-close");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const setActiveLink = () => {
  let currentSectionId = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
  });
};

window.addEventListener("scroll", setActiveLink);
setActiveLink();

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imageSource = item.dataset.full;
    const imageTitle = item.dataset.title;
    const thumbnail = item.querySelector("img");

    lightboxImage.src = imageSource;
    lightboxImage.alt = thumbnail.alt;
    lightboxTitle.textContent = imageTitle;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Please complete all required fields.";
    return;
  }

  const formData = new FormData(contactForm);
  const visitorName = formData.get("name").trim();
  formStatus.textContent = `Thank you, ${visitorName}. Your message is ready to be sent to Junlin Coffee.`;
  contactForm.reset();
});
