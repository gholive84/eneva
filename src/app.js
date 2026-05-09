/**
 * Eneva Intranet — Módulos
 * Entry point. Equivalente em React seria App.jsx com <Tabs>, <Timeline>,
 * <Hub>, <Glossary>, <Modal> e <GlossaryTooltip>.
 */
import { mountHeader } from './components/Header.js';
import { mountTimeline } from './components/Timeline.js';
import { mountHub } from './components/Hub.js';
import { mountGlossary } from './components/Glossary.js';
import { createModal } from './components/Modal.js';
import { createGlossaryTooltip } from './components/GlossaryTooltip.js';

import { timelineData } from './data/timeline.js';
import { hubPoints } from './data/hub-points.js';
import { glossaryData } from './data/glossary.js';

// ── Header ─────────────────────────────────────────────────────────
mountHeader(document.getElementById('app-header'));

// ── Modal e Tooltip de glossário (singletons) ──────────────────────
const modal = createModal(document.getElementById('app-modal-root'));

const tooltip = createGlossaryTooltip(document.getElementById('app-tooltip-root'), {
  onSeeMore: (termId) => {
    // Ao clicar em "Ver no glossário" → ir para aba Glossário e focar no termo
    activateTab('glossary');
    if (glossaryInstance) glossaryInstance.setHighlight(termId);
  }
});
tooltip.attach();

// ── Timeline (horizontal) ──────────────────────────────────────────
mountTimeline(document.getElementById('panel-timeline'), {
  data: timelineData,
  onSelect: (event) => {
    modal.open({
      eyebrow: event.date || event.year,
      title: event.title,
      bodyHTML: event.body,
      media: event.media || []
    });
  }
});

// ── Hub ────────────────────────────────────────────────────────────
mountHub(document.getElementById('panel-hub'), {
  points: hubPoints,
  imageSrc: 'assets/hub-eneva.png',
  onSelect: (point) => {
    modal.open({
      eyebrow: 'Hub Eneva',
      eyebrowNum: point.seq,
      title: point.title,
      bodyHTML: point.body,
      media: point.media || []
    });
  }
});

// ── Glossário ──────────────────────────────────────────────────────
let glossaryInstance = mountGlossary(document.getElementById('panel-glossary'), {
  data: glossaryData
});

// ── Tab navigation ─────────────────────────────────────────────────
const tabsEl = document.getElementById('app-tabs');

function activateTab(tabId) {
  tabsEl.querySelectorAll('.app-tab').forEach((btn) => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  document.querySelectorAll('.app-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === tabId);
  });
  // hash routing leve
  if (history.replaceState) {
    history.replaceState(null, '', `#${tabId}`);
  }
}

tabsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.app-tab');
  if (!btn) return;
  activateTab(btn.dataset.tab);
});

// Restaurar aba pelo hash
const initialTab = (location.hash || '').replace(/^#/, '');
if (['timeline', 'hub', 'glossary'].includes(initialTab)) {
  activateTab(initialTab);
}
