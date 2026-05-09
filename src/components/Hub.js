import { h, clear } from '../utils/dom.js';
import { linkifyGlossary } from '../utils/glossary-link.js';

/**
 * HUB interativo — overlay de hotspots animados sobre a imagem do hub.
 *
 * Props (mountHub):
 *   - points:   HubPoint[]   (ver src/data/hub-points.js)
 *   - imageSrc: string       (caminho da imagem do hub)
 *   - onSelect: (point) => void   (clique abre modal)
 *
 * Equivalente React:
 *   <Hub points={...} imageSrc="..." onSelect={handleSelect} />
 */
export function mountHub(container, { points, imageSrc = 'assets/HUB.png', onSelect }) {
  clear(container);

  // Sequência ordenada por seq (1 → 2 → 3 → 1 → 2 → ...). Ao clicar em
  // qualquer ponto, o ciclo "reinicia nele": ele é marcado como atual e o
  // próximo pulsante é o seq seguinte (cíclico).
  const sortedPoints = [...points].sort((a, b) => a.seq - b.seq);
  const seqList = sortedPoints.map((p) => p.seq);
  const pointBySeq = new Map(sortedPoints.map((p) => [p.seq, p]));

  // Inicialmente: o primeiro ponto pulsa, sem linha desenhada.
  let currentPulsingSeq = seqList[0];
  let lastClickedSeq = null;

  function nextSeqAfter(seq) {
    const idx = seqList.indexOf(seq);
    // Último ponto: ciclo encerra (não volta pro 1).
    if (idx < 0 || idx >= seqList.length - 1) return null;
    return seqList[idx + 1];
  }

  function handleSelect(point) {
    lastClickedSeq = point.seq;
    currentPulsingSeq = nextSeqAfter(point.seq);
    refresh();
    if (onSelect) onSelect(point);
  }

  function refresh() {
    root.querySelectorAll('.hub__hotspot, .hub__list-item').forEach((el) => {
      const seq = Number(el.dataset.seq);
      el.classList.toggle('is-pulsing', seq === currentPulsingSeq);
      el.classList.toggle('is-clicked', seq === lastClickedSeq);
    });
    drawConnector();
  }

  function drawConnector() {
    if (!svgLine) return;
    if (lastClickedSeq == null || currentPulsingSeq == null) {
      svgLine.style.opacity = '0';
      return;
    }
    const from = pointBySeq.get(lastClickedSeq);
    const to = pointBySeq.get(currentPulsingSeq);
    if (!from || !to) {
      svgLine.style.opacity = '0';
      return;
    }
    svgLine.setAttribute('x1', from.x);
    svgLine.setAttribute('y1', from.y);
    svgLine.setAttribute('x2', to.x);
    svgLine.setAttribute('y2', to.y);
    svgLine.style.opacity = '1';
  }

  // ── Render ────────────────────────────────────────────────────
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'hub__connector-svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  const svgLine = document.createElementNS(svgNS, 'line');
  svgLine.setAttribute('class', 'hub__connector-line');
  svgLine.style.opacity = '0';
  svg.appendChild(svgLine);

  const canvas = h('div', { className: 'hub__canvas' }, [
    h('img', {
      className: 'hub__image',
      src: imageSrc,
      alt: 'Hub Eneva — cadeia integrada de energia',
      loading: 'eager',
      onError: (e) => { e.target.style.opacity = '0.3'; }
    })
  ]);
  canvas.appendChild(svg);
  for (const p of points) canvas.appendChild(renderHotspot(p, handleSelect));

  const root = h('div', { className: 'hub' }, [
    h('header', { className: 'hub__head' }, [
      h('h1', { className: 'hub__title', html: 'Como funciona o <em>hub Eneva</em>' }),
      h('p', {
        className: 'hub__subtitle',
        html: linkifyGlossary(
          'Uma cadeia integrada de produção a entrega de energia. Clique nos pontos para conhecer cada etapa do nosso modelo reservoir-to-wire.'
        )
      })
    ]),
    h('div', { className: 'hub__stage' }, [canvas]),
    h('div', { className: 'hub__list' }, points.map((p) => renderListItem(p, handleSelect)))
  ]);

  container.appendChild(root);
  refresh();

  return {
    destroy() {}
  };
}

function renderHotspot(point, onClick) {
  return h('button', {
    className: 'hub__hotspot',
    type: 'button',
    'aria-label': `${point.label} — clique para abrir`,
    dataset: { seq: String(point.seq), id: point.id },
    style: {
      left: `${point.x}%`,
      top: `${point.y}%`
    },
    onClick: () => onClick(point)
  }, [
    h('span', { className: 'hub__hotspot-pulse' }),
    h('span', { className: 'hub__hotspot-pulse hub__hotspot-pulse--delay' }),
    h('span', { className: 'hub__hotspot-dot' }, [String(point.seq)]),
    h('span', { className: 'hub__hotspot-tip' }, [point.label])
  ]);
}

function renderListItem(point, onClick) {
  return h('button', {
    className: 'hub__list-item',
    type: 'button',
    dataset: { seq: String(point.seq), id: point.id },
    onClick: () => onClick(point)
  }, [
    h('span', { className: 'hub__list-num' }, [String(point.seq)]),
    h('div', { className: 'hub__list-content' }, [
      h('h4', {}, [point.title]),
      h('p', {}, [point.summary])
    ])
  ]);
}
