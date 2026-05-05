/* ============================================================
   BRIEF MEDICARIS — script.js
   ============================================================ */

/* ---- Année courante dans le footer ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Date du jour auto dans l'en-tête ---- */
const metaDate = document.getElementById('metaDate');
if (metaDate && !metaDate.value) {
  metaDate.value = new Date().toISOString().split('T')[0];
}

/* ---- Sync input color ↔ texte hex ---- */
document.querySelectorAll('.color-input-wrap').forEach(wrap => {
  const picker = wrap.querySelector('input[type="color"]');
  const hex    = wrap.querySelector('input[type="text"]');
  if (!picker || !hex) return;
  picker.addEventListener('input', () => { hex.value = picker.value.toUpperCase(); });
  hex.addEventListener('input', () => {
    const val = hex.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) picker.value = val;
  });
});

/* ---- Ajouter une catégorie de produits dynamiquement ---- */
let catCount = 3;
const addCatBtn = document.getElementById('addCat');
if (addCatBtn) {
  addCatBtn.addEventListener('click', () => {
    catCount++;
    const container = addCatBtn.parentElement;
    const newBlock = document.createElement('div');
    newBlock.className = 'soin-block';
    newBlock.id = `cat-${catCount}`;
    newBlock.innerHTML = `
      <div class="soin-block__header">
        <span class="soin-block__label">Catégorie n°${catCount}</span>
        <button type="button" class="soin-remove" title="Supprimer" style="background:none;border:none;cursor:pointer;color:#999;font-size:1.1rem;padding:0 4px;">✕</button>
      </div>
      <table class="brief-table">
        <thead><tr><th>Information demandée</th><th>La réponse</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Nom de la catégorie</strong></td>
            <td><textarea name="cat${catCount}_nom" placeholder="À compléter..." rows="2"></textarea></td>
          </tr>
          <tr>
            <td><strong>Description courte</strong><span class="hint">Pour qui, à quoi ça sert</span></td>
            <td><textarea name="cat${catCount}_desc" placeholder="À compléter..." rows="3"></textarea></td>
          </tr>
          <tr>
            <td><strong>Produits phares</strong><span class="hint">3 à 5 références clés</span></td>
            <td><textarea name="cat${catCount}_produits" placeholder="À compléter..." rows="4"></textarea></td>
          </tr>
          <tr>
            <td><strong>Marques / fournisseurs</strong></td>
            <td><textarea name="cat${catCount}_marques" placeholder="À compléter..." rows="2"></textarea></td>
          </tr>
          <tr>
            <td><strong>Tarification affichée sur le site ?</strong></td>
            <td>
              <div class="radio-group">
                <label class="radio-label"><input type="radio" name="cat${catCount}_prix_mode" value="affiches" /> Prix affichés</label>
                <label class="radio-label"><input type="radio" name="cat${catCount}_prix_mode" value="devis" /> Sur devis</label>
                <label class="radio-label"><input type="radio" name="cat${catCount}_prix_mode" value="mixte" /> Mixte</label>
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>Stock</strong></td>
            <td>
              <div class="radio-group">
                <label class="radio-label"><input type="radio" name="cat${catCount}_stock" value="stock" /> Permanent</label>
                <label class="radio-label"><input type="radio" name="cat${catCount}_stock" value="commande" /> Sur commande</label>
                <label class="radio-label"><input type="radio" name="cat${catCount}_stock" value="mixte" /> Mixte</label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>`;

    container.insertBefore(newBlock, addCatBtn);
    newBlock.querySelector('.soin-remove').addEventListener('click', () => newBlock.remove());
    newBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---- Sauvegarde locale (localStorage) ---- */
const STORAGE_KEY = 'brief_medicaris_draft';

function saveDraft() {
  const data = {};
  document.querySelectorAll('[name]').forEach(el => {
    if (el.type === 'checkbox' || el.type === 'radio') {
      if (el.checked) {
        if (!data[el.name]) data[el.name] = [];
        if (Array.isArray(data[el.name])) data[el.name].push(el.value);
        else data[el.name] = el.value;
      }
    } else if (el.type !== 'color') {
      data[el.name] = el.value;
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([name, val]) => {
      document.querySelectorAll(`[name="${name}"]`).forEach(el => {
        if (el.type === 'checkbox') {
          el.checked = Array.isArray(val) ? val.includes(el.value) : el.value === val;
        } else if (el.type === 'radio') {
          el.checked = el.value === val;
        } else {
          el.value = val;
        }
      });
    });
    /* draft silently restored */
  } catch (e) { /* silent */ }
}

setInterval(saveDraft, 20000);
document.addEventListener('input', saveDraft);
document.addEventListener('change', saveDraft);
loadDraft();

/* ---- Partage ---- */
const btnShare      = document.getElementById('btnShare');
const shareDropdown = document.getElementById('shareDropdown');

if (btnShare && shareDropdown) {
  btnShare.addEventListener('click', (e) => {
    e.stopPropagation();
    shareDropdown.hidden = !shareDropdown.hidden;
  });
  document.addEventListener('click', () => { shareDropdown.hidden = true; });
  shareDropdown.addEventListener('click', (e) => e.stopPropagation());
}

/* ---- Construction du résumé texte ---- */
function val(name) {
  const el = document.querySelector(`[name="${name}"]`);
  return el?.value?.trim() || '';
}

function checkedValues(name) {
  return [...document.querySelectorAll(`[name="${name}"]:checked`)]
    .map(el => el.value).join(', ') || '';
}

function radioValue(name) {
  const el = document.querySelector(`[name="${name}"]:checked`);
  return el?.value || '';
}

function line(label, value) {
  return value ? `${label} : ${value}` : '';
}

function buildBriefTexte() {
  const nom = val('marque_nom') || 'Medicaris SARL';
  const sections = [];

  sections.push(`📋 BRIEF CLIENT — ${nom}`);
  sections.push(`Soumis le ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}`);
  sections.push('─'.repeat(40));

  // 1. Identité
  const s1 = [
    '▸ IDENTITÉ & MARQUE',
    line('Nom commercial', val('marque_nom')),
    line('Slogan', val('slogan')),
    line('Ambiance visuelle', checkedValues('ambiance')),
    line('Logo existant', radioValue('logo')),
  ].filter(Boolean).join('\n');
  sections.push(s1);

  // 2. Entreprise
  const s2 = [
    '▸ PRÉSENTATION DE L\'ENTREPRISE',
    line('Activité', val('activite_desc')),
    line('Année de création', val('annee_creation')),
    line('Certifications', val('certifications')),
    line('Marques distribuées', val('marques')),
    line('Différenciateur', val('differenciateur')),
  ].filter(Boolean).join('\n');
  sections.push(s2);

  // 3. Catalogue
  const catLines = ['▸ CATALOGUE PRODUITS'];
  for (let i = 1; i <= catCount; i++) {
    const nomCat = val(`cat${i}_nom`);
    if (!nomCat) continue;
    catLines.push(`  Catégorie ${i} : ${nomCat}`);
    const produits = val(`cat${i}_produits`);
    const marques  = val(`cat${i}_marques`);
    const prix     = radioValue(`cat${i}_prix_mode`);
    const stock    = radioValue(`cat${i}_stock`);
    if (produits) catLines.push(`    Produits phares : ${produits}`);
    if (marques)  catLines.push(`    Marques : ${marques}`);
    if (prix)     catLines.push(`    Prix sur site : ${prix}`);
    if (stock)    catLines.push(`    Stock : ${stock}`);
  }
  sections.push(catLines.join('\n'));

  // 4. Clientèle
  const s4 = [
    '▸ CLIENTÈLE',
    line('Répartition', radioValue('repartition_clients')),
    line('Professionnels', checkedValues('clients_pro')),
    line('Particuliers', checkedValues('clients_part')),
    line('Clients hors Casa', val('clients_geo')),
  ].filter(Boolean).join('\n');
  sections.push(s4);

  // 5. Zone & Livraison
  const s5 = [
    '▸ ZONE & LIVRAISON',
    line('Zone livraison', checkedValues('zone_livraison')),
    line('Délai livraison', radioValue('delai_livraison')),
    line('Frais livraison', radioValue('frais_liv')),
    line('Horaires', val('horaires')),
  ].filter(Boolean).join('\n');
  sections.push(s5);

  // 6. Commandes
  const s6 = [
    '▸ COMMANDES & DEVIS',
    line('Actions site', checkedValues('site_action')),
    line('E-commerce', radioValue('ecommerce')),
    line('Min. commande', radioValue('min_commande')),
    line('SAV / Garanties', val('sav')),
  ].filter(Boolean).join('\n');
  sections.push(s6);

  // 7. Contact
  const s7 = [
    '▸ CONTACT & LÉGAL',
    line('Téléphone', val('tel')),
    line('Email', val('email')),
    line('Adresse', val('adresse')),
    line('Statut', radioValue('statut')),
    line('RC', val('rc')),
    line('IF', val('if_fiscal')),
    line('ICE', val('ice')),
  ].filter(Boolean).join('\n');
  sections.push(s7);

  // 8. Objectifs
  const s8 = [
    '▸ OBJECTIFS',
    line('Objectif principal', radioValue('objectif')),
    line('Requêtes SEO cibles', val('requetes_seo')),
    line('Google My Business', radioValue('gmb')),
    line('À éviter', val('eviter')),
  ].filter(Boolean).join('\n');
  sections.push(s8);

  return sections.join('\n\n');
}

/* WhatsApp */
document.getElementById('shareWhatsApp')?.addEventListener('click', (e) => {
  e.preventDefault();
  const text = encodeURIComponent(buildBriefTexte());
  window.open(`https://wa.me/?text=${text}`, '_blank');
  shareDropdown.hidden = true;
});

/* Email */
document.getElementById('shareEmail')?.addEventListener('click', (e) => {
  e.preventDefault();
  const subject = encodeURIComponent('Brief client — Medicaris SARL');
  const body    = encodeURIComponent(buildBriefTexte());
  window.location.href = `mailto:edhemrombhot@agencelepanaf.ma?subject=${subject}&body=${body}`;
  shareDropdown.hidden = true;
});

/* Copier */
document.getElementById('shareCopy')?.addEventListener('click', () => {
  navigator.clipboard.writeText(buildBriefTexte()).then(() => {
    showToast('Brief copié dans le presse-papiers !');
  }).catch(() => {
    showToast('Non supporté — utilisez l\'export PDF.');
  });
  shareDropdown.hidden = true;
});

/* ---- Toast ---- */
function showToast(msg, duration = 3000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px);
      background:#2E5D4B; color:#fff; padding:12px 24px; border-radius:50px;
      font-size:.85rem; font-family:'Inter',sans-serif; font-weight:500;
      box-shadow:0 4px 20px rgba(0,0,0,.2); z-index:9999;
      opacity:0; transition:opacity .3s, transform .3s; pointer-events:none;
      white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, duration);
}

/* ---- Indicateur visuel champs prioritaires ---- */
document.querySelectorAll('.section-header--teal').forEach(header => {
  if (!header.querySelector('.badge--priority')) return;
  const section = header.closest('.brief-section');
  if (!section) return;
  section.querySelectorAll('textarea, input[type="text"], input[type="email"], input[type="tel"]').forEach(el => {
    el.addEventListener('blur', function () {
      this.style.borderColor = this.value.trim() ? '#2E5D4B' : '';
    });
  });
});
