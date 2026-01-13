// js/image-carousel.js

(function () {
  function initCarousel(gallery) {
    const originalImages = Array.from(gallery.querySelectorAll("img"));
    if (originalImages.length <= 1) return;

    gallery.classList.add("carousel-ready");

    const track = document.createElement("div");
    track.className = "carousel-track";

    originalImages.forEach((img) => {
      const item = document.createElement("div");
      item.className = "carousel-item";
      item.appendChild(img);
      track.appendChild(item);
    });

    gallery.innerHTML = "";
    gallery.appendChild(track);

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "image-carousel__btn image-carousel__btn--prev";
    prevBtn.setAttribute("aria-label", "Poprzednie zdjęcie");
    prevBtn.innerHTML = '<span aria-hidden="true">&#10094;</span>';

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "image-carousel__btn image-carousel__btn--next";
    nextBtn.setAttribute("aria-label", "Następne zdjęcie");
    nextBtn.innerHTML = '<span aria-hidden="true">&#10095;</span>';

    gallery.appendChild(prevBtn);
    gallery.appendChild(nextBtn);

    const items = Array.from(track.children);
    let currentIndex = 0;

    function clampIndex(i) {
      if (i < 0) return 0;
      if (i >= items.length) return items.length - 1;
      return i;
    }

    function setActive(index) {
      currentIndex = clampIndex(index);

      items.forEach((item, i) => {
        item.classList.remove("is-center", "is-left", "is-right", "is-hidden");

        if (i === currentIndex) {
          item.classList.add("is-center");
        } else if (i === currentIndex - 1) {
          item.classList.add("is-left");
        } else if (i === currentIndex + 1) {
          item.classList.add("is-right");
        } else {
          item.classList.add("is-hidden");
        }
      });
    }


    function next() {
      setActive(currentIndex + 1);
    }

    function prev() {
      setActive(currentIndex - 1);
    }
    setActive(0, false);

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    gallery.addEventListener("click", function (evt) {
      const item = evt.target.closest(".carousel-item");
      if (!item) return;
      const index = items.indexOf(item);
      if (index === -1) return;

      if (index === currentIndex) {
        const img = item.querySelector("img");
        if (img) openLightbox(img);
      } else {
        setActive(index);
      }
    });
  }

  let lightbox;
  let lightboxImg;
  let lightboxCaption;
  let lightboxHint;

  function ensureLightbox() {
    if (lightbox) return;

    lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Podgląd zdjęcia");

    lightboxImg = document.createElement("img");
    lightboxImg.className = "image-lightbox__img";

    lightboxCaption = document.createElement("div");
    lightboxCaption.className = "image-lightbox__caption";

    lightboxHint = document.createElement("div");
    lightboxHint.className = "image-lightbox__hint";
    lightboxHint.textContent = "Kliknij lub ESC aby zamknąć";

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxCaption);
    lightbox.appendChild(lightboxHint);

    document.body.appendChild(lightbox);

    function close() {
      lightbox.classList.remove("is-open");
    }

    lightbox.addEventListener("click", close);

    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" && lightbox.classList.contains("is-open")) {
        close();
      }
    });
  }

  function openLightbox(imgEl) {
    ensureLightbox();
    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt || "";
    lightboxCaption.textContent = imgEl.alt || "";
    lightbox.classList.add("is-open");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const galleries = document.querySelectorAll(".section__gallery");
    galleries.forEach(initCarousel);
  });
})();
