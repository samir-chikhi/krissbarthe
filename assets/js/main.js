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

// ── FAQ ACCORDION ──────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Fermer tous les autres (comportement accordion)
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherAnswer = other.nextElementSibling;
        if (otherAnswer) otherAnswer.classList.remove('open');
      }
    });

    btn.setAttribute('aria-expanded', !isOpen);
    if (answer) answer.classList.toggle('open', !isOpen);
  });
});

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
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Délai progressif pour les éléments d'une même grille
        const siblings = entry.target.parentElement?.children;
        let delay = 0;
        if (siblings && siblings.length > 1) {
          const idx = Array.from(siblings).indexOf(entry.target);
          delay = Math.min(idx * 80, 320);
        }
        setTimeout(() => entry.target.classList.add('visible'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.card, .step, .blog-card, .pourqui-card, .testimonial, .section-header, .price-card'
  ).forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });
}

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
