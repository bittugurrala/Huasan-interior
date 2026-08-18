/**
 * HUASAN STUDIOS — MAIN JAVASCRIPT CONTROLLER
 * Architectural Quietude Interactions & Systems
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initScrollReveals();
  initShaderCanvas();
  initWorksFiltering();
  initViewSwitcher();
  initMaterialExplorer();
  initBudgetEstimator();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Theme & Dusk/Dawn Mode Toggle
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('huasan_theme');

  if (savedTheme === 'dusk') {
    document.body.classList.add('dusk-mode');
    updateToggleButtons(true);
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDusk = document.body.classList.toggle('dusk-mode');
      localStorage.setItem('huasan_theme', isDusk ? 'dusk' : 'day');
      updateToggleButtons(isDusk);
    });
  });

  function updateToggleButtons(isDusk) {
    toggleBtns.forEach(btn => {
      const label = btn.querySelector('.theme-label');
      if (label) {
        label.textContent = isDusk ? 'Day Mode' : 'Dusk Mode';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const openBtn = document.querySelector('.mobile-menu-trigger');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');

  if (!openBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. WebGL Ambient Liquid Light Shader
   -------------------------------------------------------------------------- */
function initShaderCanvas() {
  const canvas = document.getElementById('shader-ambient-canvas');
  if (!canvas) return;

  function syncSize() {
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  window.addEventListener('resize', syncSize);
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const vs = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fs = `
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 v_texCoord;

    void main() {
      vec2 uv = v_texCoord;
      vec2 m = u_mouse / u_resolution;

      // Organic subtle fluid wave simulation
      float noise = sin(uv.x * 2.5 + u_time * 0.35) * cos(uv.y * 2.5 + u_time * 0.35);
      noise += 0.4 * sin(uv.x * 6.0 - u_time * 0.5) * cos(uv.y * 6.0 + u_time * 0.2);

      vec2 p = uv + 0.03 * vec2(noise);
      float dist = distance(uv, m);
      p += 0.015 * (uv - m) / (dist + 0.15) * exp(-dist * 4.0);

      // Warm ivory to subtle stone gradient
      vec3 col1 = vec3(0.985, 0.976, 0.961); // Architectural Ivory
      vec3 col2 = vec3(0.91, 0.89, 0.86);   // Soft Muted Limestone

      vec3 finalCol = mix(col1, col2, noise * 0.5 + 0.5);
      float shimmer = pow(max(0.0, noise), 8.0) * 0.06;
      finalCol += shimmer;

      gl_FragColor = vec4(finalCol, 1.0);
    }
  `;

  function createShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const pos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');

  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = 1.0 - (event.clientY - rect.top) / rect.height;
      mouse.x = nx * canvas.width;
      mouse.y = ny * canvas.height;
    }
  });

  function render(t) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  render(0);
}

/* --------------------------------------------------------------------------
   5. Works Filtering
   -------------------------------------------------------------------------- */
function initWorksFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('[data-category]');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'border-champagne-brass', 'text-champagne-brass'));
      btn.classList.add('active', 'border-champagne-brass', 'text-champagne-brass');

      const targetCategory = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (targetCategory === 'all' || itemCat === targetCategory) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Dual-view Switcher (Grid vs Blueprint List)
   -------------------------------------------------------------------------- */
function initViewSwitcher() {
  const gridViewBtn = document.getElementById('view-grid-btn');
  const listViewBtn = document.getElementById('view-list-btn');
  const gridContainer = document.getElementById('works-grid-view');
  const listContainer = document.getElementById('works-list-view');

  if (!gridViewBtn || !listViewBtn || !gridContainer || !listContainer) return;

  gridViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.add('btn-primary');
    gridViewBtn.classList.remove('btn-outline');
    listViewBtn.classList.add('btn-outline');
    listViewBtn.classList.remove('btn-primary');

    gridContainer.style.display = 'grid';
    listContainer.style.display = 'none';
  });

  listViewBtn.addEventListener('click', () => {
    listViewBtn.classList.add('btn-primary');
    listViewBtn.classList.remove('btn-outline');
    gridViewBtn.classList.add('btn-outline');
    gridViewBtn.classList.remove('btn-primary');

    listContainer.style.display = 'block';
    gridContainer.style.display = 'none';
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Material Explorer
   -------------------------------------------------------------------------- */
const materialData = {
  oak: {
    title: 'Custom Quarter-Sawn White Oak',
    origin: 'Black Forest, Germany',
    finish: 'Ultra-Matte Natural Bio-Polymer Oil',
    acoustic: 'High absorption coefficient (NRC 0.45)',
    description: 'Sourced from sustainably managed timber stands, dried for 18 months to achieve architectural dimensional stability. Grain patterns are deliberately selected for soft linear tension.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLt-72gQLL4YjZZQgamwJQoeTOZ4nVeP9FI3fG2U5XQUoGGig4xvm-Ozr1xa4T8Xo2EHRzUDddnrI0D_36e5HTlBN4m2frNKc2GcQEokKXIYh1vP83qAv7RWsvC341B4sa2XQgwPvyJpXuxWgNFdaV0U2pH5jAv7I3yTjP6ZNQMQnbjYsEcbDxwoh8deM8g5-YKZHKf-4VaAQ478s1Erq5g2oO3EH0coJv3eiSScUhiJBzKrF4NiMHH-aQY'
  },
  travertine: {
    title: 'Honed Navona Travertine',
    origin: 'Makrana, Rajasthan',
    finish: 'Open-Pore Honed, Unfilled Micro-texture',
    acoustic: 'Reflective structural mass with soft diffuse scattering',
    description: 'Drawn from Rajasthan quarries, this stone imparts warmth and enduring geological quietude to monolithic islands and wall planes.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsQEEEv9j9nJ-vn75C02446hHVAzFsv19bPNRZV2iZjkCcGEJYI1Yy9_u_UO6kX4NfXbVfnYAd0wYS3ilxoTki5YwGjk1RVTSoz0nRi2sp0WJzi26grifSw_WIE9c6vrAqAHcIGUzv1YGYEGH_Bd9ZA0wV44qeBCLjQLsDu-mCe2c13-lLb0xaDnXnJCfJryVEaNtMtVjHuvxObeA8FxiKckwnCH5objuqoPyjZuQ5ddQy_FxU8GBPZ0LA'
  },
  brass: {
    title: 'Brushed Champagne Brass',
    origin: 'Moradabad Artisan Workshop, India',
    finish: 'Hand-brushed, Living Patina Sealed',
    acoustic: 'High density metal hardware & structural inlays',
    description: 'Machined to 0.1mm tolerances and finished by hand with organic beeswax to allow gentle, graceful aging over decades of tactile interaction.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvkKGgcreFrEav93LKh9CaUyKhpnbn_3SXTj-7oPad350v-ryW13mrOtXK2TT1ILQI5kh2A2t39JV72vZHaqdigFwJ4g65fGdeibkiH70shI1E4_dlqWLc_OTRFGL_fCm6N9EOwDy3eXg6DKWcpu3jroTSFY2NfHdsjHvdGD_yHuXslceDcUtlBnVhs7dCzisHxYGDjDxl2zErkzcMyFS9pF9NNLzhCiQBfR9JoQwINmwBZg8XEFCtyYmk'
  },
  linen: {
    title: 'Raw Belgian Oatmeal Linen',
    origin: 'Flanders, Belgium',
    finish: 'Unbleached, Enzyme-Washed Slub Weave',
    acoustic: 'Superior acoustic dampening & daylight diffusion',
    description: 'Woven on heritage looms from long-staple flax. Provides soft tactile counterpoint to rigid stone and concrete geometries.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtyLTvYE8hwLYOQa9fIwUOMXkk8HqViK3QSWJt3dzPZLoTX7N5_nX21hXHEnnKbuvAKUpe38K_InSfXRC7GtbS--T0iz_L_jqcALC2gn3eEJvZjm0_om-Kyhz-bRceo8qkVp3gWgm4Q5SCN3etiLfqo1dODsnG3AyEKuVNhnLghzlql5jMH_gNOPBabo0DocCXo1MFEtAGQxGf5ruQlI_2n3wt-5OGaT30pfQIUrEmO_bByB2lBDtHdmQw'
  }
};

function initMaterialExplorer() {
  const cards = document.querySelectorAll('.material-card');
  const titleEl = document.getElementById('mat-detail-title');
  const originEl = document.getElementById('mat-detail-origin');
  const finishEl = document.getElementById('mat-detail-finish');
  const acousticEl = document.getElementById('mat-detail-acoustic');
  const descEl = document.getElementById('mat-detail-desc');
  const imgEl = document.getElementById('mat-detail-img');

  if (!cards.length || !titleEl) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const matKey = card.getAttribute('data-material');
      const data = materialData[matKey];
      if (!data) return;

      titleEl.textContent = data.title;
      if (originEl) originEl.textContent = data.origin;
      if (finishEl) finishEl.textContent = data.finish;
      if (acousticEl) acousticEl.textContent = data.acoustic;
      if (descEl) descEl.textContent = data.description;
      if (imgEl && data.image) imgEl.src = data.image;
    });
  });
}

/* --------------------------------------------------------------------------
   8. Interactive Consultation / Scope Estimator
   -------------------------------------------------------------------------- */
function initBudgetEstimator() {
  const scopeSelect = document.getElementById('calc-scope');
  const sizeInput = document.getElementById('calc-size');
  const resultBudget = document.getElementById('calc-budget-result');
  const resultDuration = document.getElementById('calc-duration-result');

  if (!scopeSelect || !sizeInput || !resultBudget) return;

  function calculate() {
    const scope = scopeSelect.value;
    const sqft = parseFloat(sizeInput.value) || 2500;

    let baseRate = 85; // USD per sq ft architectural design & turnkey oversight
    let months = 6;

    if (scope === 'full-architecture') {
      baseRate = 120;
      months = Math.ceil(sqft / 500) + 6;
    } else if (scope === 'interior-mastery') {
      baseRate = 85;
      months = Math.ceil(sqft / 750) + 4;
    } else if (scope === 'bespoke-objects') {
      baseRate = 45;
      months = 3;
    }

    const estimatedTotal = Math.round(sqft * baseRate);
    resultBudget.textContent = `$${estimatedTotal.toLocaleString()} USD`;
    if (resultDuration) {
      resultDuration.textContent = `${months} - ${months + 3} Months`;
    }
  }

  scopeSelect.addEventListener('change', calculate);
  sizeInput.addEventListener('input', calculate);
  calculate();
}

/* --------------------------------------------------------------------------
   9. Contact / Inquiry Form Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('architectural-inquiry-form');
  const successModal = document.getElementById('inquiry-success-modal');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Transmitting Blueprint...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      form.reset();
      if (successModal) {
        successModal.style.display = 'flex';
      } else {
        alert('Thank you. Your architectural inquiry has been received. A Principal Partner will respond within 24 hours.');
      }
    }, 1200);
  });

  const closeModalBtn = document.getElementById('close-success-modal');
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.style.display = 'none';
    });
  }
}
