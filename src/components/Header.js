import { h, clear } from '../utils/dom.js';

/**
 * Header simplificado da intranet Eneva.
 * Apenas estrutura visual — sem lógica de submenus / mega menu.
 *
 * Uso:
 *   import { mountHeader } from './components/Header.js';
 *   mountHeader(document.getElementById('app-header'));
 *
 * React mapping (futuro):
 *   <EnevaHeader logoSrc="/logo.png" userPhotoSrc="/foto.jpg" />
 */
export function mountHeader(container, {
  logoSrc = 'assets/logointranet.png',
  userPhotoSrc = null
} = {}) {
  clear(container);

  const userPhoto = h('div', { className: 'eneva-header__user-photo' }, [
    userPhotoSrc
      ? h('img', { src: userPhotoSrc, alt: 'Foto do usuário' })
      : userSilhouette()
  ]);

  const header = h('header', { className: 'eneva-header', role: 'banner' }, [
    h('div', { className: 'eneva-header__inner' }, [
      h('div', { className: 'eneva-header__logo' }, [
        h('img', { src: logoSrc, alt: 'Intranet Eneva' })
      ]),
      h('nav', { className: 'eneva-header__nav', 'aria-label': 'Menu principal' }, [
        h('div', { className: 'eneva-header__nav-item' }, [
          userPhoto,
          h('span', {}, ['Para Você'])
        ]),
        h('div', { className: 'eneva-header__nav-item' }, [h('span', {}, ['Nossa Companhia'])]),
        h('div', { className: 'eneva-header__nav-item' }, [h('span', {}, ['Comunicação e Marca'])])
      ]),
      h('div', { className: 'eneva-header__complaint' }, [
        h('span', { className: 'eneva-header__complaint-icon' }, ['!']),
        h('span', {}, ['Canal de Denúncia'])
      ])
    ])
  ]);

  container.appendChild(header);
  return header;
}

function userSilhouette() {
  const wrap = document.createElement('span');
  wrap.style.cssText = 'display:grid; place-items:center; width:100%; height:100%;';
  wrap.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.667-10 5v3h20v-3c0-3.333-6.686-5-10-5z"/></svg>`;
  return wrap;
}
