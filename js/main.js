// Simple site interactions: year, smooth scrolling, lightbox gallery, and contact form
document.addEventListener("DOMContentLoaded", function () {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  document.querySelectorAll(".gallery-item").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === this) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // Basic contact form handling
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        status.textContent = "Please fill in name, email and message.";
        status.style.color = "crimson";
        return;
      }

      // Fallback: open default mail client with prefilled content.
      // For production use, replace with a POST to a server endpoint or Formspree integration.
      const subject = encodeURIComponent("Service Request from " + name);
      const body = encodeURIComponent(
        "Name: " +
          name +
          "\nEmail: " +
          email +
          "\nPhone: " +
          (form.phone.value || "") +
          "\n\n" +
          message
      );
      const mailto = `mailto:info@nssauto.example?subject=${subject}&body=${body}`;
      // Try to open mail client
      window.location.href = mailto;
      status.textContent =
        "Opening your mail client — if that does not work, copy the message and email us.";
      status.style.color = "green";
    });
  }
});
