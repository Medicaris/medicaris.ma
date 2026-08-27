/* Medicaris — interactions */

(function () {
  'use strict';

  /* ── Language toggle ── */
  const html = document.documentElement;
  const langBtn = document.getElementById('langToggle');

  function setLang(lang) {
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang === 'fr' ? 'fr' : 'en');
    localStorage.setItem('med-lang', lang);

    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      const val = el.getAttribute('data-' + lang);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });

    /* Textarea placeholder (custom attribute) */
    document.querySelectorAll('textarea[data-' + lang + '-placeholder]').forEach(function (el) {
      el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
    });

    if (langBtn) {
      langBtn.setAttribute('aria-label', lang === 'fr' ? 'Passer en anglais' : 'Passer en français');
    }
  }

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      const current = html.getAttribute('data-lang');
      setLang(current === 'fr' ? 'en' : 'fr');
    });
  }

  /* Restore saved language */
  const saved = localStorage.getItem('med-lang');
  if (saved && saved !== 'fr') setLang(saved);

  /* Exposé pour les pages qui injectent du contenu dynamiquement
     (actualités/congrès/FAQ) après le chargement initial : on
     réapplique la langue courante une fois le DOM généré. */
  window.medicarisApplyLang = function () {
    setLang(html.getAttribute('data-lang') || 'fr');
  };
  document.addEventListener('medicaris:contentInjected', function () {
    window.medicarisApplyLang();
  });

  /* ── Navbar scroll shadow ── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  /* ── Mobile burger ── */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      const open = navLinks.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        const item = link.closest('.nav__item--dropdown');
        if (item) item.classList.remove('is-open');
      });
    });
  }

  /* ── Nav dropdown "Ressources" ── */
  document.querySelectorAll('.nav__item--dropdown').forEach(function (item) {
    const toggle = item.querySelector('.nav__dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const open = item.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
  });

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav__item--dropdown.is-open').forEach(function (item) {
      if (!item.contains(e.target)) {
        item.classList.remove('is-open');
        const toggle = item.querySelector('.nav__dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ── Footer year ── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Formulaire de contact ──
     Tant que le nom de domaine n'est pas réservé, il n'existe pas d'email
     professionnel valide : la demande part donc sur WhatsApp, qui est de
     toute façon le canal réel du B2B médical au Maroc.
     À basculer vers un envoi serveur une fois le domaine actif. */
  const WHATSAPP_NUMBER = '212661330704';

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = form.querySelector('[name="name"]').value.trim();
      const email   = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) return;

      const text = encodeURIComponent(
        'Demande via le site Medicaris\n\n' +
        'Nom / Établissement : ' + name + '\n' +
        'Email : ' + email + '\n\n' + message
      );
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank', 'noopener');
    });
  }

})();
