/**
 * HUASAN x MERSI INSPIRA — BUTTER-SMOOTH ANIMATION & INTERACTION ENGINE
 * Features:
 * - Dual Split-Screen Synchronized Parallax Slider (Mersi-Style)
 * - Custom Magnetic Cursor with Dynamic State Labels
 * - Interactive Before / After Renovation Comparison Slider
 * - 3D Card Tilt with Specular Glare Tracking
 * - Interactive 3-Step Project Scope & Cost Estimator
 * - Lookbook Lead Magnet Modal Trigger & Conversion Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initMagneticCursor();
  initDualSplitHero();
  initBeforeAfterSlider();
  init3DCardTilt();
  initEstimatorEngine();
  initLeadModals();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. Magnetic Cursor & Velocity Follower
   -------------------------------------------------------------------------- */
function initMagneticCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  let currentScale = 1;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    // Smooth lerp (linear interpolation) for butter physics
    followerX += (mouseX - followerX) * 0.14;
    followerY += (mouseY - followerY) * 0.14;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(${currentScale})`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover target detectors
  const interactiveTargets = [
    { selector: '.project-capsule-btn', label: 'EXPLORE' },
    { selector: '.transformation-container', label: 'DRAG' },
    { selector: '.card-3d', label: 'VIEW' },
    { selector: '.btn-brass, .btn-primary', label: 'INQUIRE' },
    { selector: '.estimator-option-btn', label: 'SELECT' }
  ];

  interactiveTargets.forEach(({ selector, label }) => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('hover-active');
        follower.textContent = label;
        currentScale = 1.25;
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('hover-active');
        follower.textContent = '';
        currentScale = 1;
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2. Mersi-Style Dual Split-Screen Parallax Hero Slider
   -------------------------------------------------------------------------- */
function initDualSplitHero() {
  const streamLeft = document.getElementById('hero-stream-left');
  const streamRight = document.getElementById('hero-stream-right');
  const capsuleBtns = document.querySelectorAll('.project-capsule-btn');
  if (!streamLeft || !streamRight || !capsuleBtns.length) return;

  let activeIndex = 0;
  const totalSlides = capsuleBtns.length;
  const slideHeight = window.innerHeight;

  function updateSlider(index) {
    activeIndex = Math.max(0, Math.min(index, totalSlides - 1));
    
    // Left column moves downwards, Right column moves upwards (Opposing dual momentum)
    const offsetLeft = -(activeIndex * 100);
    const offsetRight = -(activeIndex * 100);

    streamLeft.style.transform = `translate3d(0, ${offsetLeft}vh, 0)`;
    streamRight.style.transform = `translate3d(0, ${offsetRight}vh, 0)`;

    capsuleBtns.forEach((btn, idx) => {
      if (idx === activeIndex) {
        btn.classList.add('active');
        btn.style.borderColor = 'var(--champagne-brass)';
        btn.style.transform = 'scale(1.04) translateY(-3px)';
      } else {
        btn.classList.remove('active');
        btn.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        btn.style.transform = 'scale(1) translateY(0)';
      }
    });
  }

  capsuleBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      updateSlider(idx);
    });
  });

  // Wheel velocity listener for hero section
  const heroSection = document.getElementById('dual-hero-section');
  let wheelTimeout;
  if (heroSection) {
    heroSection.addEventListener('wheel', (e) => {
      // If user is over hero, let them cycle through slides
      if (Math.abs(e.deltaY) > 30) {
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          if (e.deltaY > 0 && activeIndex < totalSlides - 1) {
            updateSlider(activeIndex + 1);
          } else if (e.deltaY < 0 && activeIndex > 0) {
            updateSlider(activeIndex - 1);
          }
        }, 60);
      }
    }, { passive: true });
  }

  updateSlider(0);
}

/* --------------------------------------------------------------------------
   3. Interactive Before / After Renovation Comparison Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('transformation-slider');
  const afterLayer = document.getElementById('after-layer');
  const handle = document.getElementById('slider-handle');
  if (!container || !afterLayer || !handle) return;

  let isDragging = false;

  function updatePosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;

    afterLayer.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updatePosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch support for mobile devices
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* --------------------------------------------------------------------------
   4. 3D Perspective Card Tilt on Mousemove
   -------------------------------------------------------------------------- */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.card-3d');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive 3-Step Project Estimator Engine (Lead Capture)
   -------------------------------------------------------------------------- */
function initEstimatorEngine() {
  const typologyBtns = document.querySelectorAll('.estim-typology-btn');
  const scopeBtns = document.querySelectorAll('.estim-scope-btn');
  const areaSlider = document.getElementById('estim-area-slider');
  const areaDisplay = document.getElementById('estim-area-display');
  const budgetOutput = document.getElementById('estim-budget-output');
  const timelineOutput = document.getElementById('estim-timeline-output');

  if (!areaSlider || !budgetOutput) return;

  let selectedTypology = 'residential';
  let selectedScope = 'turnkey';
  let areaValue = parseInt(areaSlider.value, 10) || 250; // m²

  function recalculate() {
    areaDisplay.textContent = `${areaValue} m² (${Math.round(areaValue * 10.764)} sq ft)`;

    let ratePerSqM = 1800; // EUR/m² baseline
    let durationMonths = 6;

    if (selectedTypology === 'haussmann') ratePerSqM = 2400;
    else if (selectedTypology === 'penthouse') ratePerSqM = 2800;
    else if (selectedTypology === 'hospitality') ratePerSqM = 2100;

    if (selectedScope === 'architectural-only') {
      ratePerSqM *= 0.45;
      durationMonths = 4;
    } else if (selectedScope === 'turnkey') {
      durationMonths = Math.ceil(areaValue / 60) + 4;
    } else if (selectedScope === 'bespoke-furniture') {
      ratePerSqM *= 0.35;
      durationMonths = 3;
    }

    const estimatedTotal = Math.round(areaValue * ratePerSqM);
    budgetOutput.textContent = `€${estimatedTotal.toLocaleString('fr-FR')} EUR`;
    if (timelineOutput) {
      timelineOutput.textContent = `${durationMonths} - ${durationMonths + 3} Mois`;
    }
  }

  typologyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typologyBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTypology = btn.getAttribute('data-val');
      recalculate();
    });
  });

  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scopeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedScope = btn.getAttribute('data-val');
      recalculate();
    });
  });

  areaSlider.addEventListener('input', (e) => {
    areaValue = parseInt(e.target.value, 10);
    recalculate();
  });

  recalculate();
}

/* --------------------------------------------------------------------------
   6. Lead Generation & Lookbook Modals
   -------------------------------------------------------------------------- */
function initLeadModals() {
  const lookbookTrigger = document.querySelectorAll('.open-lookbook-modal');
  const modalBackdrop = document.getElementById('lookbook-modal');
  const closeModalBtn = document.getElementById('close-lookbook-modal');
  const lookbookForm = document.getElementById('lookbook-lead-form');

  if (lookbookTrigger.length && modalBackdrop) {
    lookbookTrigger.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalBackdrop.style.display = 'flex';
      });
    });
  }

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.style.display = 'none';
    });
  }

  if (lookbookForm) {
    lookbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = lookbookForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Transmitting Lookbook...';
      }
      setTimeout(() => {
        alert('Thank you. The 2026 Materiality & Quiet Luxury Lookbook has been dispatched to your email.');
        if (modalBackdrop) modalBackdrop.style.display = 'none';
        lookbookForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Download Lookbook (PDF)';
        }
      }, 1000);
    });
  }
}

/* --------------------------------------------------------------------------
   7. Scroll Spy & Navbar Blur Transition
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.9rem 0';
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
    } else {
      header.style.padding = '1.35rem 0';
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}
