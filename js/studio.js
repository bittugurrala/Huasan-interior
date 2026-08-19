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

const SITE_NAVBAR_HTML = `<header class="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md dark:bg-transparent transition-colors duration-500 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6" id="navbar">
<a class="font-headline-lg text-headline-lg-mobile md:text-[2.15rem] md:leading-none tracking-tighter text-espresso" href="index.html">HUASAN</a>
<nav class="hidden md:flex items-center gap-8">
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-espresso transition-colors hover:opacity-70" href="works.html">Portfolio</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-espresso transition-colors hover:opacity-70" href="services.html">Services</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-espresso transition-colors hover:opacity-70" href="studio.html">Philosophy</a>
<a class="font-label-caps text-label-caps text-on-surface-variant hover:text-espresso transition-colors hover:opacity-70" href="journal.html">Journal</a>
</nav>
<div class="flex items-center gap-6">
<a class="hidden md:inline-block font-label-caps text-label-caps text-espresso border-b border-espresso pb-1 hover:opacity-70 transition-opacity" href="contact.html">Contact</a>
<button type="button" id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false" class="md:hidden flex flex-col gap-[4px] w-6">
<span class="w-full h-[1px] bg-espresso"></span>
<span class="w-full h-[1px] bg-espresso"></span>
</button>
</div>
</header>`;

const SITE_MOBILE_MENU_HTML = `<div id="mobile-menu" class="fixed inset-0 z-[60] hidden opacity-0 pointer-events-none bg-paper/95 backdrop-blur-xl transition-opacity duration-300">
  <div class="flex flex-col justify-center h-full px-margin-mobile md:px-margin-desktop gap-8">
    <a class="font-headline-lg text-headline-lg text-espresso" href="index.html">Home</a>
    <a class="font-headline-lg text-headline-lg text-espresso" href="works.html">Portfolio</a>
    <a class="font-headline-lg text-headline-lg text-espresso" href="studio.html">Studio</a>
    <a class="font-headline-lg text-headline-lg text-espresso" href="services.html">Services</a>
    <a class="font-headline-lg text-headline-lg text-espresso" href="journal.html">Journal</a>
    <a class="font-headline-lg text-headline-lg text-espresso" href="contact.html">Contact</a>
  </div>
</div>`;

document.addEventListener("DOMContentLoaded", () => {
  initSiteNav();
  initNavbarScroll();
  initMobileMenu();
  initWorksFilter();
  initLookbookFallback();
  initImageCarousels();
  initScrollMotion();
});

function initSiteNav() {
  const header = document.getElementById("navbar");
  if (header) header.outerHTML = SITE_NAVBAR_HTML;

  const menu = document.getElementById("mobile-menu");
  if (menu) {
    menu.outerHTML = SITE_MOBILE_MENU_HTML;
  } else {
    document.body.insertAdjacentHTML("beforeend", SITE_MOBILE_MENU_HTML);
  }
}

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.replace("bg-transparent", "bg-ivory/90");
    } else {
      navbar.classList.replace("bg-ivory/90", "bg-transparent");
    }
  });
}

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
    if (img.closest("header, #mobile-menu, .carousel-slide, #hero-carousel")) return;
    const parent = img.parentElement;
    if (parent && parent.classList.contains("absolute") && parent.classList.contains("inset-0")) return;
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

function initScrollMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  injectScrollProgress();
  if (reduced) {
    document.querySelectorAll(".fade-in-up, .animate-fade-in").forEach((el) => {
      el.classList.add("visible", "is-inview");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  prepareTextReveals();
  prepareMediaReveals();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview", "visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  document
    .querySelectorAll(".fade-in-up, .animate-fade-in, .fade-up, .reveal-block, .reveal-copy, .tracking-in, .media-reveal, .line-grow, [data-split='true']")
    .forEach((el) => observer.observe(el));

  const heroCopy = document.querySelector("[data-hero-copy]");
  if (heroCopy) {
    requestAnimationFrame(() => {
      heroCopy.classList.add("is-inview", "visible");
      heroCopy.querySelectorAll("h1, h2, p, a").forEach((el) => el.classList.add("is-inview", "visible"));
    });
  }

  initScrollType();
}

function initScrollType() {
  const nodes = [];
  const pick = document.querySelectorAll("main h1, main h2, .tracking-in, .footer-giant");

  pick.forEach((el) => {
    if (el.closest("header, #mobile-menu, nav")) return;
    const cls = el.className || "";
    const large =
      el.classList.contains("tracking-in") ||
      el.classList.contains("footer-giant") ||
      cls.includes("display-lg") ||
      cls.includes("headline-lg") ||
      cls.includes("text-[12vw]");
    if (!large) return;

    el.classList.add("scroll-type");
    let mode = "headline";
    if (el.classList.contains("footer-giant")) mode = "giant";
    else if (el.classList.contains("tracking-in")) mode = "tracking";
    else if (el.closest("[data-hero-copy]")) mode = "hero";

    nodes.push({
      el,
      frame: el.closest("section, footer") || el.parentElement,
      mode
    });
  });

  if (!nodes.length) return;

  let ticking = false;
  const render = () => {
    ticking = false;
    const vh = window.innerHeight;
    const mobile = window.innerWidth < 768;

    nodes.forEach(({ el, frame, mode }) => {
      const rect = frame.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > vh + 120) return;

      const start = vh * 0.92;
      const end = vh * 0.18;
      let progress = (start - rect.top) / (start - end + Math.max(rect.height * 0.35, 1));
      progress = Math.min(1, Math.max(0, progress));

      if (mode === "tracking") {
        const from = mobile ? 0.1 : 0.2;
        const tracking = from - progress * (from + 0.02);
        const y = (1 - progress) * (mobile ? 28 : 56);
        el.style.letterSpacing = `${tracking}em`;
        el.style.transform = `translate3d(0, ${y}px, 0) scale(${1.04 - progress * 0.04})`;
        el.style.opacity = String(0.55 + progress * 0.45);
        return;
      }

      if (mode === "hero") {
        const leave = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.5)));
        el.style.transform = `translate3d(0, ${leave * -56}px, 0)`;
        el.style.opacity = String(1 - leave * 0.9);
        return;
      }

      if (mode === "giant") {
        const y = (vh - rect.top) * 0.14;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        el.style.letterSpacing = `${0.08 - progress * 0.1}em`;
        return;
      }

      const y = (1 - progress) * 42;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.opacity = String(0.2 + progress * 0.8);
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(render);
  };

  render();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

function injectScrollProgress() {
  if (document.getElementById("scroll-progress")) return;
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.prepend(bar);

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${value}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function prepareTextReveals() {
  document.querySelectorAll("main h1, main h2, main h3").forEach((el) => {
    if (el.closest("header, footer, #mobile-menu")) return;
    if (el.classList.contains("tracking-in")) return;
    splitHeading(el);
  });

  document.querySelectorAll("main p").forEach((el, index) => {
    if (el.closest("header, footer, #mobile-menu, form")) return;
    if (el.querySelector("a, br, span") && el.querySelector("a")) {
      el.classList.add("reveal-copy");
      el.style.transitionDelay = `${(index % 4) * 60}ms`;
      return;
    }
    el.classList.add("reveal-copy");
    el.style.transitionDelay = `${(index % 5) * 50}ms`;
  });
}

function splitHeading(el) {
  if (el.dataset.split === "true") return;
  if (el.querySelector("a, br, span, img")) {
    el.classList.add("reveal-block");
    return;
  }

  const text = el.textContent.replace(/\s+/g, " ").trim();
  if (!text || text.length < 2) return;

  const words = text.split(" ");
  el.setAttribute("aria-label", text);
  el.textContent = "";
  words.forEach((word, index) => {
    const clip = document.createElement("span");
    clip.className = "word-clip";
    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.textContent = word;
    inner.style.transitionDelay = `${80 + index * 55}ms`;
    inner.setAttribute("aria-hidden", "true");
    clip.appendChild(inner);
    el.appendChild(clip);
    if (index < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.split = "true";
}

function prepareMediaReveals() {
  document.querySelectorAll("main img.object-cover, main .image-scale, main .image-carousel").forEach((node) => {
    const target = node.tagName === "IMG" ? node.parentElement : node;
    if (!target || target.closest("header, #hero-carousel, footer")) return;
    if (target.id === "hero-carousel") return;
    if (target.classList.contains("absolute") && target.classList.contains("inset-0")) return;
    if (target.classList.contains("media-reveal")) return;
    target.classList.add("media-reveal");
  });
}
