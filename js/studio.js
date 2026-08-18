/**
 * HUASAN Editorial Portfolio Studio
 * Shared interactions for the live Stitch site.
 */

const HERO_CAROUSEL_IMAGES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfEfsnwuKGGtP3X_8tJIn3VN3Vm6z8k2wtYSZ9UfG5Tl35SYkHjxkAm7nfpPOVsqXxbC9wjt2U9YdCtmEnOtCj_laXS6bZQDe2p-NyvPZvAca03JJaGsRAUfUEU5D58ZVPmlY3Ki3c-sVL8VOKDX-u8Zp-WKM7uDzQLiySkbcvtPGsHkIHuNEbHQzzQXWFLsTghiHn6mQN7zOqQHnEaXeWuIpPRzZ_TmAsmd4FxQUsYGtR9DXflJc",
    alt: "Premium interior architecture photography, sculptural furniture in a sunlit corner, travertine walls, linen textures, warm minimalist design."
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuzxHXptg6mEB9Jv-ZiYvtxR7D4bcSloQZ30tTRciANFN-Jlj1hNcgUmjyVN6pb-5e9vpkMdqWR7w0deIE76MnMLDgywzD5FToCIM8b7Ba22DrwZI5j9SjfH-G-9DrBHOSihgk4lOPzmW6zCNIr8R5-g23wRvOh650rLJIjiuR5HkxQSFRvYGtjzKl3MEqhRy9Bx2lnZ4mi_cfUjfKz1aTWazXGXYwxj5j9pYGjU33zx2pkS6zR04",
    alt: "Premium interior architecture photography, luxury residential living room, warm neutral palette, natural stone and wood, natural light."
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1fqNtUjhbB7szkFy2gN5xb6gaYW2f4dV-XjrJIgKLrdfrgyH1auMEfcAg5kzecTgomxH3d5LgU39Wwyz_wSKvHJ6L_Amq6XQxL8XOeAcc_ypqWVsXYsofD5c7py6ptRLCiYdflRJ10wX8WdiLn70kE2_qOuExb86GHYvL1kSVKS_CQfsYoEOdUqrks3DJNxMBFiFjrdhYO5XjcLgiqFnRQFkAID8o2aLcUW-IK1-7ERNXg9OO_AU",
    alt: "Premium interior architecture photography, close-up of high-end material textures, natural oak and fluted plaster, soft shadows."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initWorksFilter();
  initLookbookFallback();
  initImageCarousels();
});

function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn") || document.querySelector("header button.md\\:hidden");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  const open = () => {
    menu.classList.remove("hidden");
    requestAnimationFrame(() => {
      menu.classList.remove("opacity-0", "pointer-events-none");
      menu.classList.add("opacity-100", "pointer-events-auto");
    });
    document.body.style.overflow = "hidden";
    btn.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    menu.classList.add("opacity-0", "pointer-events-none");
    menu.classList.remove("opacity-100", "pointer-events-auto");
    setTimeout(() => menu.classList.add("hidden"), 280);
    document.body.style.overflow = "";
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("opacity-100");
    if (isOpen) close();
    else open();
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function initWorksFilter() {
  const buttons = document.querySelectorAll(".works-filter");
  const items = document.querySelectorAll("article[data-category]");
  if (!buttons.length || !items.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter") || "all";
      buttons.forEach((btn) => {
        btn.classList.remove("text-primary", "border-b", "border-primary", "pb-1");
        btn.classList.add("text-on-surface-variant");
      });
      button.classList.add("text-primary", "border-b", "border-primary", "pb-1");
      button.classList.remove("text-on-surface-variant");

      items.forEach((item) => {
        const match = filter === "all" || item.getAttribute("data-category") === filter;
        item.style.display = match ? "" : "none";
      });
    });
  });
}

function initLookbookFallback() {
  document.querySelectorAll("form").forEach((form) => {
    if (form.dataset.bound === "true") return;
    if (form.id === "contactForm") return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        const original = button.textContent;
        button.textContent = "Received — we will be in touch";
        setTimeout(() => {
          button.textContent = original;
          form.reset();
        }, 2400);
      }
    });
    form.dataset.bound = "true";
  });
}

function initImageCarousels() {
  const pageImages = Array.from(document.querySelectorAll("img.object-cover"))
    .filter((img) => !img.closest("header, #mobile-menu"))
    .map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.getAttribute("data-alt") || img.alt || ""
    }));

  document.querySelectorAll("img.object-cover").forEach((img, index) => {
    if (img.closest("header, #mobile-menu, .carousel-slide")) return;
    convertImageToCarousel(img, pageImages, index);
  });

  document.querySelectorAll(".image-carousel, #hero-carousel").forEach((container, index) => {
    const slides = container.querySelectorAll(":scope > .carousel-slide");
    if (slides.length > 1) startCarousel(slides, index);
  });
}

function convertImageToCarousel(img, pageImages, index) {
  const parent = img.parentElement;
  if (!parent || parent.querySelector(":scope > .carousel-slide")) return;

  const original = {
    src: img.currentSrc || img.src,
    alt: img.getAttribute("data-alt") || img.alt || ""
  };
  const extras = pickExtraImages(original.src, pageImages, index);
  const set = [original, ...extras].slice(0, 3);
  HERO_CAROUSEL_IMAGES.forEach((item) => {
    if (set.length >= 3) return;
    if (!set.some((existing) => existing.src === item.src)) set.push(item);
  });

  const aspectClass = Array.from(img.classList).find((name) => name.startsWith("aspect-"));
  parent.classList.add("image-carousel", "relative", "overflow-hidden");
  if (aspectClass && !parent.className.includes("aspect-")) {
    parent.classList.add("w-full", aspectClass);
  }

  const overlay = Array.from(parent.children).filter((node) => node !== img);
  img.remove();

  set.forEach((item, slideIndex) => {
    const slide = document.createElement("div");
    slide.className = `carousel-slide absolute inset-0 transition-opacity duration-1000 ease-in-out z-10 ${slideIndex === 0 ? "opacity-100" : "opacity-0"}`;
    const slideImg = document.createElement("img");
    slideImg.className = "w-full h-full object-cover";
    slideImg.src = item.src;
    slideImg.alt = item.alt;
    if (item.alt) slideImg.setAttribute("data-alt", item.alt);
    slide.appendChild(slideImg);
    parent.appendChild(slide);
  });

  overlay.forEach((node) => parent.appendChild(node));
}

function pickExtraImages(currentSrc, pageImages, index) {
  const unique = [];
  pageImages.forEach((item) => {
    if (item.src === currentSrc) return;
    if (unique.some((existing) => existing.src === item.src)) return;
    unique.push(item);
  });

  const extras = [];
  const start = unique.length ? index % unique.length : 0;
  for (let offset = 0; offset < unique.length && extras.length < 2; offset += 1) {
    extras.push(unique[(start + offset) % unique.length]);
  }

  HERO_CAROUSEL_IMAGES.forEach((item) => {
    if (extras.length >= 2) return;
    if (item.src === currentSrc) return;
    if (extras.some((existing) => existing.src === item.src)) return;
    extras.push(item);
  });

  return extras.slice(0, 2);
}

function startCarousel(slides, index) {
  if (slides.length < 2) return;
  let current = 0;
  const delay = 5000 + (index % 3) * 400;
  setInterval(() => {
    slides[current].classList.replace("opacity-100", "opacity-0");
    current = (current + 1) % slides.length;
    slides[current].classList.replace("opacity-0", "opacity-100");
  }, delay);
}
