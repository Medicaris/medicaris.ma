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
      });
    });
  }

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
