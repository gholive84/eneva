import { h, clear, escapeHtml } from '../utils/dom.js';

/**
 * Timeline horizontal premium da Eneva.
 *
 * Props (passadas via mountTimeline):
 *   - data: TimelineEvent[]   (ver src/data/timeline.js)
 *   - onSelect: (event) => void   (chamada ao clicar num card; abre modal)
 *
 * Componentes filhos virtuais:
 *   - TimelineHeader     (título + controles)
 *   - TimelineTrack      (viewport + track scrollable)
 *   - TimelineItem       (cada card)
 *
 * Equivalente React:
 *   <Timeline data={events} onSelect={handleSelect} />
 */
export function mountTimeline(container, { data, onSelect }) {
  clear(container);

  const root = h('div', { className: 'timeline' });
  container.appendChild(root);

  const head = renderHead();
  root.appendChild(head);

  const viewport = h('div', { className: 'timeline__viewport' });
  const track = h('div', { className: 'timeline__track', role: 'list' });
  const rail = h('div', { className: 'timeline__rail' });
  const hint = h('div', { className: 'timeline__hint' }, ['arraste →']);

  const btnPrev = h('button', {
    className: 'timeline__btn timeline__btn--side timeline__btn--prev',
    type: 'button',
    'aria-label': 'Voltar',
    dataset: { dir: 'prev' },
    onClick: () => scrollBy('prev')
  }, [iconChevron('left')]);
  const btnNext = h('button', {
    className: 'timeline__btn timeline__btn--side timeline__btn--next',
    type: 'button',
    'aria-label': 'Avançar',
    dataset: { dir: 'next' },
    onClick: () => scrollBy('next')
  }, [iconChevron('right')]);

  viewport.appendChild(rail);
  viewport.appendChild(track);
  viewport.appendChild(btnPrev);
  viewport.appendChild(btnNext);
  viewport.appendChild(hint);
  root.appendChild(viewport);

  // Render dos itens — todos acima do trilho, com leve variação vertical
  const items = data.map((evt, i) => {
    const variant = i % 2 === 0 ? 'a' : 'b';
    const item = renderItem(evt, variant, onSelect);
    track.appendChild(item);
    return item;
  });

  // Atualiza progresso do trilho conforme scroll
  const updateProgress = () => {
    const max = track.scrollWidth - track.clientWidth;
    const pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
    rail.style.setProperty('--progress', `${pct}%`);

    // marca item ativo (mais próximo do centro)
    const center = track.scrollLeft + track.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    items.forEach((it, idx) => {
      const itCenter = it.offsetLeft + it.offsetWidth / 2;
      const dist = Math.abs(itCenter - center);
      if (dist < bestDist) { bestDist = dist; bestIdx = idx; }
    });
    items.forEach((it, idx) => it.classList.toggle('is-active', idx === bestIdx));

    // estado dos botões
    btnPrev.disabled = track.scrollLeft <= 4;
    btnNext.disabled = track.scrollLeft >= max - 4;
  };

  function scrollBy(dir) {
    const step = Math.max(280, track.clientWidth * 0.6);
    track.scrollTo({
      left: track.scrollLeft + (dir === 'next' ? step : -step),
      behavior: 'smooth'
    });
  }

  track.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  // primeira marcação após render
  requestAnimationFrame(updateProgress);

  // Suporte a drag horizontal com mouse (mobile já tem touch nativo)
  enableDragScroll(track);

  return {
    destroy() {
      track.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    }
  };
}

function renderHead() {
  return h('header', { className: 'timeline__head' }, [
    h('div', {}, [
      h('div', { className: 'timeline__eyebrow' }, ['Linha do tempo']),
      h('h1', { className: 'timeline__title', html: 'Nossa <em>história</em>' }),
      h('p', { className: 'timeline__subtitle' }, [
        'Marcos que construíram a Eneva — da fundação ao próximo capítulo da nossa jornada de energia.'
      ])
    ])
  ]);
}

function renderItem(evt, variant, onSelect) {
  const mediaCount = evt.media?.length || 0;

  const card = h('button', {
    className: 'timeline__card',
    type: 'button',
    'aria-label': `Abrir detalhes: ${evt.title}`,
    onClick: () => onSelect && onSelect(evt)
  }, [
    h('div', { className: 'timeline__card-hero' }, [
      mediaCount > 1
        ? h('span', { className: 'timeline__card-media-flag' }, [
            iconMedia(),
            ` ${mediaCount}`
          ])
        : null,
      evt.image
        ? h('img', {
            className: 'timeline__card-hero-img',
            src: evt.image,
            alt: '',
            loading: 'lazy',
            onError: (e) => { e.target.style.display = 'none'; }
          })
        : null
    ]),
    h('div', { className: 'timeline__card-body' }, [
      h('span', { className: 'timeline__card-date' }, [evt.date || evt.year]),
      h('h3', { className: 'timeline__card-title' }, [evt.title]),
      h('p', { className: 'timeline__card-summary' }, [evt.summary]),
      h('span', { className: 'timeline__card-cta' }, [
        'Ler história',
        iconArrow()
      ])
    ])
  ]);

  const node = h('div', { className: 'timeline__node' });
  const yearPin = h('span', { className: 'timeline__year-pin' }, [evt.year]);
  const connector = h('span', { className: 'timeline__connector' });

  return h('div', {
    className: `timeline__item timeline__item--above timeline__item--${variant}`,
    role: 'listitem',
    dataset: { id: evt.id }
  }, [card, connector, node, yearPin]);
}

function enableDragScroll(track) {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener('mousedown', (e) => {
    // não iniciar drag em clique de botão (clicks normais devem funcionar)
    if (e.target.closest('button')) return;
    isDown = true;
    startX = e.pageX;
    startScroll = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    if (isDown) track.style.cursor = '';
    isDown = false;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    track.scrollLeft = startScroll - (e.pageX - startX);
  });
}

function iconChevron(dir) {
  const span = document.createElement('span');
  span.innerHTML = dir === 'left'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
  return span.firstElementChild;
}

function iconMedia() {
  const span = document.createElement('span');
  span.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
  return span.firstElementChild;
}

function iconArrow() {
  const span = document.createElement('span');
  span.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  return span.firstElementChild;
}
