/* Medicaris — rendu des données Actualités / Congrès / FAQ.
   Cherche les containers présents sur la page courante et génère le DOM
   à partir de window.MEDICARIS_NEWS / MEDICARIS_EVENTS / MEDICARIS_FAQ
   (voir resources-data.js). Ce fichier ne connaît que la forme des
   données ; les remplacer par un fetch() vers une API ne demande aucun
   changement ici. */

(function () {
  'use strict';

  function parseDate(iso) {
    return new Date(iso + 'T00:00:00');
  }

  function fmtLongDate(iso, locale) {
    return parseDate(iso).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function bilingualDateAttrs(iso) {
    return { fr: fmtLongDate(iso, 'fr-FR'), en: fmtLongDate(iso, 'en-GB') };
  }

  function setBi(el, dict) {
    el.setAttribute('data-fr', dict.fr);
    el.setAttribute('data-en', dict.en);
    el.textContent = dict.fr;
  }

  function newsThumbSVG() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
      '<path d="M4 5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M15 3v5h5M8 13h8M8 17h5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function renderNewsCard(item) {
    const article = document.createElement('article');
    article.className = 'news-card';

    const thumb = document.createElement('div');
    thumb.className = 'news-card__thumb';
    thumb.innerHTML = newsThumbSVG();
    article.appendChild(thumb);

    const body = document.createElement('div');
    body.className = 'news-card__body';

    const date = document.createElement('div');
    date.className = 'news-card__date';
    setBi(date, bilingualDateAttrs(item.date));
    body.appendChild(date);

    const h3 = document.createElement('h3');
    setBi(h3, item.title);
    body.appendChild(h3);

    const p = document.createElement('p');
    setBi(p, item.excerpt);
    body.appendChild(p);

    if (item.sample) {
      const badge = document.createElement('span');
      badge.className = 'sample-badge';
      setBi(badge, { fr: 'Contenu d’exemple', en: 'Sample content' });
      body.appendChild(badge);
    }

    article.appendChild(body);
    return article;
  }

  function renderNewsInto(container, items) {
    if (!container) return;
    container.innerHTML = '';
    items.forEach(function (item) { container.appendChild(renderNewsCard(item)); });
  }

  const newsData = (window.MEDICARIS_NEWS || []).slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  renderNewsInto(document.getElementById('homeNewsGrid'), newsData.slice(0, 3));
  renderNewsInto(document.getElementById('newsGrid'), newsData);

  /* ── Congrès / événements ── */
  function renderEventCard(item) {
    const article = document.createElement('article');
    article.className = 'event-card';

    const dateBlock = document.createElement('div');
    dateBlock.className = 'event-card__date';
    const start = parseDate(item.dateStart);
    const day = document.createElement('span');
    day.className = 'event-card__date-day';
    day.textContent = start.getDate();
    const month = document.createElement('span');
    month.className = 'event-card__date-month';
    setBi(month, {
      fr: start.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''),
      en: start.toLocaleDateString('en-GB', { month: 'short' })
    });
    dateBlock.appendChild(day);
    dateBlock.appendChild(month);
    article.appendChild(dateBlock);

    const body = document.createElement('div');
    body.className = 'event-card__body';

    const status = document.createElement('span');
    status.className = 'event-card__status event-card__status--' + item.status;
    setBi(status, item.status === 'upcoming'
      ? { fr: 'À venir', en: 'Upcoming' }
      : { fr: 'Passé', en: 'Past' });
    body.appendChild(status);

    const h3 = document.createElement('h3');
    setBi(h3, item.title);
    body.appendChild(h3);

    const loc = document.createElement('div');
    loc.className = 'event-card__location';
    setBi(loc, item.location);
    body.appendChild(loc);

    const p = document.createElement('p');
    setBi(p, item.description);
    body.appendChild(p);

    if (item.sample) {
      const badge = document.createElement('span');
      badge.className = 'sample-badge';
      setBi(badge, { fr: 'Contenu d’exemple', en: 'Sample content' });
      body.appendChild(badge);
    }

    article.appendChild(body);
    return article;
  }

  const eventsGrid = document.getElementById('eventsGrid');
  if (eventsGrid) {
    const events = (window.MEDICARIS_EVENTS || []).slice().sort(function (a, b) {
      return a.dateStart.localeCompare(b.dateStart);
    });
    eventsGrid.innerHTML = '';
    events.forEach(function (item) { eventsGrid.appendChild(renderEventCard(item)); });
  }

  /* ── FAQ (accordéon) ── */
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.innerHTML = '';
    (window.MEDICARIS_FAQ || []).forEach(function (item, index) {
      const wrap = document.createElement('div');
      wrap.className = 'faq-item';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'faq-question';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'faq-panel-' + index);

      const qSpan = document.createElement('span');
      setBi(qSpan, item.q);
      btn.appendChild(qSpan);

      const icon = document.createElement('span');
      icon.className = 'faq-question__icon';
      icon.setAttribute('aria-hidden', 'true');
      btn.appendChild(icon);

      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.id = 'faq-panel-' + index;
      const answerInner = document.createElement('div');
      const answerP = document.createElement('p');
      setBi(answerP, item.a);
      answerInner.appendChild(answerP);
      answer.appendChild(answerInner);

      wrap.appendChild(btn);
      wrap.appendChild(answer);
      faqList.appendChild(wrap);
    });

    faqList.addEventListener('click', function (e) {
      const btn = e.target.closest('.faq-question');
      if (!btn || !faqList.contains(btn)) return;
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  /* Contenu injecté : demander la réapplication de la langue courante. */
  document.dispatchEvent(new CustomEvent('medicaris:contentInjected'));
})();
