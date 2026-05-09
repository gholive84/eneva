import { h } from '../utils/dom.js';
import { getGlossaryTerm } from '../utils/glossary-link.js';

/**
 * GlossaryTooltip — popover acionado por clique/hover em <span class="glossary-link">.
 *
 * Estratégia:
 *   - Listener global delegated em document (cobre modais e qualquer view)
 *   - Clica no termo → mostra tooltip ancorado abaixo do span
 *   - Sai do termo (mouseleave / outside click / Esc) → fecha
 *   - "Ver no glossário" → callback opcional para navegar à aba Glossário
 *
 * API:
 *   const tt = createGlossaryTooltip(rootEl, { onSeeMore: (id) => navigate });
 *   tt.attach(); // liga listeners globais
 */
export function createGlossaryTooltip(rootEl, { onSeeMore } = {}) {
  let tipEl = null;
  let openId = null;

  function build(term) {
    const tip = h('div', { className: 'glossary-tooltip', role: 'tooltip' }, [
      h('span', { className: 'glossary-tooltip__arrow' }),
      h('span', { className: 'glossary-tooltip__term' }, [
        term.term,
        term.acronym ? ` · ${term.acronym}` : ''
      ]),
      h('div', { html: term.definition || '' }),
      onSeeMore
        ? h('button', {
            className: 'glossary-tooltip__see-more',
            type: 'button',
            onClick: (e) => {
              e.stopPropagation();
              close();
              onSeeMore(term.id);
            }
          }, ['Ver no glossário →'])
        : null
    ]);
    return tip;
  }

  function position(anchor) {
    if (!tipEl || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    const tipRect = tipEl.getBoundingClientRect();
    const margin = 10;

    let left = rect.left + window.scrollX;
    const maxLeft = window.scrollX + document.documentElement.clientWidth - tipRect.width - margin;
    if (left > maxLeft) left = maxLeft;
    if (left < window.scrollX + margin) left = window.scrollX + margin;

    const top = rect.bottom + window.scrollY + 10;
    tipEl.style.left = left + 'px';
    tipEl.style.top = top + 'px';

    // ajusta a seta para a posição relativa do termo
    const arrow = tipEl.querySelector('.glossary-tooltip__arrow');
    if (arrow) {
      const arrowOffset = Math.max(14, Math.min(rect.left + window.scrollX - left + rect.width / 2 - 5, tipRect.width - 14));
      arrow.style.left = arrowOffset + 'px';
    }
  }

  function open(anchor, termId) {
    if (openId === termId && tipEl) return;
    close();
    const term = getGlossaryTerm(termId);
    if (!term) return;
    tipEl = build(term);
    rootEl.appendChild(tipEl);
    openId = termId;
    requestAnimationFrame(() => {
      position(anchor);
      tipEl && tipEl.classList.add('is-open');
    });
  }

  function close() {
    if (!tipEl) return;
    const node = tipEl;
    tipEl = null;
    openId = null;
    node.classList.remove('is-open');
    setTimeout(() => node.remove(), 180);
  }

  function onClickGlobal(e) {
    const link = e.target.closest('.glossary-link');
    if (link) {
      e.preventDefault();
      e.stopPropagation();
      const id = link.dataset.termId;
      if (openId === id) {
        close();
      } else {
        open(link, id);
      }
      return;
    }
    if (tipEl && !tipEl.contains(e.target)) close();
  }

  function onKeydownGlobal(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' || e.key === ' ') {
      const link = e.target.closest && e.target.closest('.glossary-link');
      if (link) {
        e.preventDefault();
        const id = link.dataset.termId;
        if (openId === id) close();
        else open(link, id);
      }
    }
  }

  function onScrollGlobal() {
    close();
  }

  function attach() {
    document.addEventListener('click', onClickGlobal, true);
    document.addEventListener('keydown', onKeydownGlobal);
    document.addEventListener('scroll', onScrollGlobal, true);
  }

  function detach() {
    document.removeEventListener('click', onClickGlobal, true);
    document.removeEventListener('keydown', onKeydownGlobal);
    document.removeEventListener('scroll', onScrollGlobal, true);
    close();
  }

  return { attach, detach, close };
}
