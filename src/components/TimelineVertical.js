import { h, clear } from '../utils/dom.js';

/**
 * Versão vertical da Linha do Tempo (Trajetória).
 *
 * Layout:
 *   ┌──────────────┬────┬───────────────────────────┐
 *   │  Year (big)  │ ●  │  Card: image + content     │
 *   ├──────────────┼─│──┼───────────────────────────┤
 *   │  Year (big)  │ ●  │  Card: image + content     │
 *   └──────────────┴────┴───────────────────────────┘
 *      coluna data    rail        coluna conteúdo
 *
 * Props (mountTimelineVertical):
 *   - data:     TimelineEvent[]
 *   - onSelect: (event) => void   (clique abre modal)
 *
 * Equivalente React: <TimelineVertical data={...} onSelect={...} />
 */
export function mountTimelineVertical(container, { data, onSelect }) {
  clear(container);

  const root = h('div', { className: 'tlv' }, [
    h('header', { className: 'tlv__head' }, [
      h('div', { className: 'tlv__eyebrow' }, ['Trajetória']),
      h('h1', { className: 'tlv__title', html: 'Da fundação ao <em>hoje</em>' }),
      h('p', { className: 'tlv__subtitle' }, [
        'Vinte anos de história em uma narrativa contínua. Cada marco contou para construir a Eneva que somos.'
      ])
    ]),
    h('ol', { className: 'tlv__rail', role: 'list' },
      data.map((evt, idx) => renderItem(evt, idx, onSelect))
    )
  ]);

  container.appendChild(root);

  // Reveal on scroll com IntersectionObserver
  const items = root.querySelectorAll('.tlv__item');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  items.forEach((it) => io.observe(it));

  return {
    destroy() { io.disconnect(); }
  };
}

function renderItem(evt, idx, onSelect) {
  const mediaCount = evt.media?.length || 0;

  return h('li', {
    className: 'tlv__item',
    dataset: { id: evt.id, idx: String(idx) }
  }, [
    h('div', { className: 'tlv__year-col' }, [
      h('span', { className: 'tlv__year' }, [evt.year]),
      evt.date && evt.date !== evt.year
        ? h('span', { className: 'tlv__date' }, [evt.date])
        : null
    ]),
    h('div', { className: 'tlv__node-col' }, [
      h('span', { className: 'tlv__node' })
    ]),
    h('button', {
      className: 'tlv__card',
      type: 'button',
      'aria-label': `Abrir detalhes: ${evt.title}`,
      onClick: () => onSelect && onSelect(evt)
    }, [
      evt.image
        ? h('div', { className: 'tlv__card-thumb' }, [
            h('img', {
              src: evt.image,
              alt: '',
              loading: 'lazy',
              onError: (e) => { e.target.style.display = 'none'; }
            }),
            mediaCount > 1
              ? h('span', { className: 'tlv__card-media' }, [
                  iconStack(),
                  ` ${mediaCount}`
                ])
              : null
          ])
        : null,
      h('div', { className: 'tlv__card-body' }, [
        h('h3', { className: 'tlv__card-title' }, [evt.title]),
        h('p', { className: 'tlv__card-summary' }, [evt.summary]),
        h('span', { className: 'tlv__card-cta' }, [
          'Ler história',
          iconArrow()
        ])
      ])
    ])
  ]);
}

function iconStack() {
  const span = document.createElement('span');
  span.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
  return span.firstElementChild;
}

function iconArrow() {
  const span = document.createElement('span');
  span.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  return span.firstElementChild;
}
