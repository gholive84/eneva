import { h, clear } from '../utils/dom.js';
import { linkifyGlossary } from '../utils/glossary-link.js';

/**
 * Modal genérico — recebe { eyebrow, eyebrowNum, title, bodyHTML, media[] }
 * e renderiza dentro do container raiz (#app-modal-root). O HTML do body
 * é linkificado automaticamente para termos do glossário.
 *
 * API:
 *   const modal = createModal(rootEl);
 *   modal.open({ eyebrow, eyebrowNum, title, bodyHTML, media });
 *   modal.close();
 *
 * Equivalente React: <Modal open={...} onClose={...}>...</Modal>
 */
export function createModal(rootEl) {
  let overlay = null;
  let lastFocus = null;
  let currentOnClose = null;

  function open(payload) {
    close({ instant: true });
    lastFocus = document.activeElement;
    currentOnClose = typeof payload.onClose === 'function' ? payload.onClose : null;

    const overlayClass =
      'modal-overlay' + (payload.variant === 'side' ? ' modal-overlay--side' : '');
    const modalBase = payload.hero ? 'modal modal--with-hero' : 'modal';
    const modalClass = modalBase + (payload.variant === 'side' ? ' modal--side' : '');

    overlay = h('div', { className: overlayClass, role: 'presentation' }, [
      h('div', {
        className: modalClass,
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'modal-title'
      }, [
        payload.hero
          ? h('div', { className: 'modal__hero' }, [
              h('img', {
                className: 'modal__hero-img',
                src: payload.hero,
                alt: '',
                onError: (e) => { e.target.style.display = 'none'; }
              }),
              h('button', {
                className: 'modal__close modal__close--on-hero',
                'aria-label': 'Fechar',
                onClick: () => close()
              }, ['✕']),
              h('div', { className: 'modal__hero-overlay' }, [
                payload.eyebrow ? h('span', { className: 'modal__eyebrow modal__eyebrow--on-hero' }, [
                  payload.eyebrowNum != null
                    ? h('span', { className: 'modal__eyebrow-num' }, [String(payload.eyebrowNum)])
                    : null,
                  payload.eyebrow
                ]) : null,
                h('h2', { className: 'modal__title modal__title--on-hero', id: 'modal-title' }, [payload.title || ''])
              ])
            ])
          : h('header', { className: 'modal__header' }, [
              h('div', {}, [
                payload.eyebrow ? h('span', { className: 'modal__eyebrow' }, [
                  payload.eyebrowNum != null
                    ? h('span', { className: 'modal__eyebrow-num' }, [String(payload.eyebrowNum)])
                    : null,
                  payload.eyebrow
                ]) : null,
                h('h2', { className: 'modal__title', id: 'modal-title' }, [payload.title || ''])
              ]),
              h('button', {
                className: 'modal__close',
                'aria-label': 'Fechar',
                onClick: () => close()
              }, ['✕'])
            ]),
        h('div', { className: 'modal__body' }, [
          h('div', { html: linkifyGlossary(payload.bodyHTML || '') }),
          payload.media && payload.media.length > 0
            ? h('div', { className: 'modal__media' }, payload.media.map(renderMedia))
            : null
        ])
      ])
    ]);

    rootEl.appendChild(overlay);
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKeydown);

    // Trigger animação
    requestAnimationFrame(() => {
      overlay && overlay.classList.add('is-open');
    });

    document.body.style.overflow = 'hidden';
    return overlay;
  }

  function close({ instant = false } = {}) {
    if (!overlay) return;
    document.removeEventListener('keydown', onKeydown);
    overlay.removeEventListener('click', onOverlayClick);

    const fireOnClose = instant ? null : currentOnClose;
    currentOnClose = null;

    if (instant) {
      overlay.remove();
      overlay = null;
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      return;
    }

    overlay.classList.remove('is-open');
    const node = overlay;
    overlay = null;
    setTimeout(() => {
      if (node.parentNode) node.remove();
    }, 320);
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    if (fireOnClose) fireOnClose();
  }

  function onOverlayClick(e) {
    if (e.target === overlay) close();
  }
  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  return { open, close };
}

function renderMedia(item) {
  if (!item || !item.src) return null;

  if (item.type === 'youtube') {
    return h('iframe', {
      src: item.src,
      title: item.alt || 'Vídeo',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowfullscreen: true
    });
  }

  if (item.type === 'video') {
    return h('video', {
      src: item.src,
      controls: true,
      preload: 'metadata',
      'aria-label': item.alt || ''
    });
  }

  // padrão: image
  return h('img', {
    src: item.src,
    alt: item.alt || '',
    loading: 'lazy',
    onError: (e) => {
      // fallback discreto se a imagem não existir
      e.target.style.background = 'var(--ink-50)';
      e.target.style.opacity = '0.4';
    }
  });
}
