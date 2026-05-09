import { h, clear, normalize, escapeHtml } from '../utils/dom.js';

/**
 * Glossário com busca e índice alfabético.
 *
 * Props (mountGlossary):
 *   - data:      GlossaryEntry[]
 *   - highlight: string | null   (id do termo a destacar via deep-link, ex.: vindo de tooltip)
 *
 * API retornada:
 *   - focusTerm(id):  rola até o termo e dá highlight temporário
 *   - destroy()
 *
 * Equivalente React:
 *   <Glossary data={...} highlight={focusedId} onClearHighlight={...} />
 */
export function mountGlossary(container, { data, highlight = null }) {
  clear(container);

  // estado local
  const state = { query: '' };

  const root = h('div', { className: 'glossary' });
  container.appendChild(root);

  // ── Cabeçalho ───────────────────────────────────────────────────
  const head = h('header', { className: 'glossary__head' }, [
    h('div', {}, [
      h('h1', { className: 'glossary__title', html: '<em>Glossário</em> Eneva' }),
      h('p', { className: 'glossary__subtitle' }, [
        'Os termos do nosso dia a dia — energia, governança e mercado — explicados de forma direta.'
      ])
    ]),
    h('div', { className: 'glossary__stats', id: 'glossary-stats' })
  ]);
  root.appendChild(head);

  // ── Busca ───────────────────────────────────────────────────────
  const searchWrap = h('div', { className: 'glossary__search' });
  const input = h('input', {
    className: 'glossary__search-input',
    type: 'search',
    placeholder: 'Buscar termo, sigla ou definição…',
    autocomplete: 'off',
    'aria-label': 'Buscar no glossário'
  });
  const clearBtn = h('button', {
    className: 'glossary__search-clear',
    type: 'button',
    'aria-label': 'Limpar busca',
    onClick: () => {
      input.value = '';
      state.query = '';
      input.focus();
      render();
    }
  }, ['✕']);
  const searchIcon = document.createElement('span');
  searchIcon.className = 'glossary__search-icon';
  searchIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
  input.addEventListener('input', () => {
    state.query = input.value;
    render();
  });
  searchWrap.appendChild(searchIcon);
  searchWrap.appendChild(input);
  searchWrap.appendChild(clearBtn);
  root.appendChild(searchWrap);

  // ── Índice alfabético ─────────────────────────────────────────
  const alpha = h('nav', {
    className: 'glossary__alpha',
    'aria-label': 'Índice alfabético'
  });
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const lettersWithEntries = new Set(
    data.map((d) => firstLetter(d.term))
  );
  alphabet.forEach((letter) => {
    const btn = h('button', {
      className: 'glossary__alpha-btn',
      type: 'button',
      onClick: () => scrollToLetter(letter),
      disabled: !lettersWithEntries.has(letter)
    }, [letter]);
    alpha.appendChild(btn);
  });
  root.appendChild(alpha);

  // ── Lista ───────────────────────────────────────────────────────
  const list = h('div', { className: 'glossary__list-root' });
  root.appendChild(list);

  // ── Render ──────────────────────────────────────────────────────
  function render() {
    const q = normalize(state.query);
    const filtered = !q
      ? data
      : data.filter((it) => {
          const haystack = normalize(
            [it.term, it.acronym, ...(it.aliases || []), it.definition].filter(Boolean).join(' ')
          );
          return haystack.includes(q);
        });

    clearBtn.classList.toggle('is-visible', !!state.query);

    const stats = head.querySelector('#glossary-stats');
    stats.innerHTML = q
      ? `<span><strong>${filtered.length}</strong> de ${data.length} termos</span>`
      : `<span><strong>${data.length}</strong> termos</span>`;

    clear(list);
    if (filtered.length === 0) {
      list.appendChild(h('div', { className: 'glossary__empty' }, [
        h('strong', {}, ['Nenhum termo encontrado']),
        `Tente outra palavra-chave ou limpe a busca.`
      ]));
      return;
    }

    // Agrupa por letra
    const groups = {};
    for (const it of filtered) {
      const letter = firstLetter(it.term);
      (groups[letter] = groups[letter] || []).push(it);
    }
    const sortedLetters = Object.keys(groups).sort((a, b) => a.localeCompare(b, 'pt-BR'));

    for (const letter of sortedLetters) {
      const group = h('section', {
        className: 'glossary__group',
        dataset: { letter }
      }, [
        h('h2', { className: 'glossary__group-letter' }, [letter]),
        h('div', { className: 'glossary__list' },
          groups[letter]
            .slice()
            .sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'))
            .map((it) => renderEntry(it, q))
        )
      ]);
      list.appendChild(group);
    }

    if (highlight) {
      // após render, foca no termo destacado
      requestAnimationFrame(() => focusTerm(highlight));
    }
  }

  function renderEntry(item, query) {
    const def = highlightMatch(item.definition || '', query);
    return h('article', {
      className: 'glossary__entry',
      id: `glossary-${item.id}`,
      dataset: { id: item.id }
    }, [
      h('h3', { className: 'glossary__entry-term' }, [
        item.term,
        item.acronym ? h('span', { className: 'glossary__entry-acronym' }, [item.acronym]) : null
      ]),
      h('p', { className: 'glossary__entry-def', html: def })
    ]);
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    // Transformar text->TextOnly via temp DOM (preservar <strong> etc) é complexo;
    // como o HTML é simples, fazemos highlight só em texto puro com regex segura.
    try {
      const re = new RegExp(`(${escapeRegex(query)})`, 'gi');
      // Para evitar quebrar tags: dividimos por tags e processamos só os pedaços fora delas
      return text.replace(/(<[^>]+>)|([^<]+)/g, (_, tag, content) => {
        if (tag) return tag;
        return content.replace(re, '<mark>$1</mark>');
      });
    } catch (e) {
      return text;
    }
  }

  function focusTerm(id) {
    const el = root.querySelector(`#glossary-${cssEscape(id)}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
    el.style.boxShadow = '0 0 0 4px var(--eneva-teal-soft), var(--shadow-md)';
    el.style.borderColor = 'var(--eneva-teal)';
    setTimeout(() => {
      el.style.boxShadow = '';
      el.style.borderColor = '';
    }, 2200);
  }

  function scrollToLetter(letter) {
    const group = list.querySelector(`[data-letter="${letter}"]`);
    if (group) group.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render();

  return {
    focusTerm,
    setHighlight(id) { highlight = id; if (id) focusTerm(id); },
    destroy() {}
  };
}

function firstLetter(term) {
  if (!term) return '#';
  const c = String(term).trim().charAt(0).toUpperCase();
  // remover acentos
  return c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cssEscape(s) {
  return String(s).replace(/[^\w-]/g, '\\$&');
}
