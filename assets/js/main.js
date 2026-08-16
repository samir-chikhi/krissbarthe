/* ============================================================
   KRISTINE BARTHE — Scripts principaux
   - Navigation mobile
   - FAQ accordion
   - FALC toggle
   - Cookie banner
   - Smooth scroll
   - Active nav
   ============================================================ */

'use strict';

// ── NAVIGATION MOBILE ──────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fermer le menu au clic sur un lien
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Fermer au clic extérieur
  document.addEventListener('click', e => {
    if (!e.target.closest('.menu-toggle') && !e.target.closest('.main-nav')) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── ACTIVE NAV LINK ────────────────────────────────────────────
(function markActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── FAQ ACCORDION (géré après IntersectionObserver, voir bas de fichier) ──

// ── FALC TOGGLE ────────────────────────────────────────────────
(function initFalc() {
  const btn = document.querySelector('.falc-toggle-btn');
  if (!btn) return;

  // Restaurer l'état FALC depuis localStorage
  const saved = localStorage.getItem('falc-mode');
  if (saved === '1') {
    document.body.classList.add('falc-mode');
    btn.classList.add('active');
    btn.textContent = '📖 Version standard';
  }

  btn.addEventListener('click', () => {
    const isActive = document.body.classList.toggle('falc-mode');
    btn.classList.toggle('active', isActive);
    btn.innerHTML = isActive ? '📖 Version standard' : '🔤 Lecture simplifiée (FALC)';
    localStorage.setItem('falc-mode', isActive ? '1' : '0');
  });
})();

// ── COOKIE BANNER ──────────────────────────────────────────────
(function initCookies() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  if (!localStorage.getItem('cookies-consent')) {
    setTimeout(() => banner.classList.add('visible'), 800);
  }

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookies-consent', 'accepted');
    banner.classList.remove('visible');
    // Ici on pourrait initialiser analytics si consentement donné
  });

  document.getElementById('cookie-refuse')?.addEventListener('click', () => {
    localStorage.setItem('cookies-consent', 'refused');
    banner.classList.remove('visible');
  });
})();

// ── SMOOTH SCROLL pour les ancres ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // hauteur header
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── HEADER SCROLLED CLASS ──────────────────────────────────────
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── ANIMATIONS ON SCROLL (IntersectionObserver) ────────────────
if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const idx = siblings.indexOf(entry.target);
      const delay = siblings.length > 1 ? Math.min(idx * 90, 360) : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      fadeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll(
    '.card, .step, .blog-card, .pourqui-card, .testimonial, .section-header, .price-card, .seance-block, .freq-item, .permet-item, .fin-block, .method-block, .arbre-section, .distinction-card, .seance-detail-list'
  ).forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });
}

// ── FAQ — transition hauteur fluide ────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const a = other.nextElementSibling;
        if (a) a.classList.remove('open');
      }
    });
    btn.setAttribute('aria-expanded', !isOpen);
    if (answer) answer.classList.toggle('open', !isOpen);
  });
});

// ── SCROLL PROGRESS BAR ────────────────────────────────────────
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,var(--violet-mid),var(--violet-light));z-index:200;transition:width .1s linear;pointer-events:none;';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// ── COMPTEURS ANIMÉS ──────────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target || el.textContent);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      const update = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(el => {
    el.dataset.target = parseFloat(el.textContent);
    obs.observe(el);
  });
})();

// ── CONTACT FORM (Formspree) ───────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        contactForm.reset();
        if (successMsg) successMsg.style.display = 'block';
        if (errorMsg) errorMsg.style.display = 'none';
        submitBtn.textContent = 'Message envoyé ✓';
      } else {
        throw new Error();
      }
    } catch {
      if (errorMsg) errorMsg.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer';
    }
  });
}
