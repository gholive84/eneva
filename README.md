# Eneva — Intranet Modules

Módulos interativos para a intranet Eneva: **Hub**, **Glossário**, **Linha do Tempo (horizontal)** e **Trajetória (timeline vertical)**.

Construído em HTML/CSS/JS vanilla com arquitetura componentizada para facilitar futura migração ao **React.js** dentro do **SharePoint**.

## Rodar localmente

```bash
npm install
npm start          # abre em http://localhost:3030
# ou:
npm run dev        # mesmo, sem abrir o navegador
```

## Estrutura

```
assets/
  hub-eneva.png         imagem do hub
  hub/                  imagens dos modais do hub
  timeline/             imagens dos eventos da timeline
  fonts/                GustanBook (drop o .woff2 aqui)
  logointranet.png
src/
  app.js                entry point — wiring de componentes + tabs
  components/
    Header.js           header da intranet (sem cliques)
    Hub.js              hotspots interativos sobre a imagem
    Glossary.js         busca + índice alfabético
    Timeline.js         linha do tempo horizontal
    TimelineVertical.js trajetória vertical
    Modal.js            overlay genérico
    GlossaryTooltip.js  popover acionado por links do glossário
  data/
    hub-points.js       6 pontos do hub
    glossary.js         57 termos oficiais
    timeline.js         8 marcos da história Eneva
  styles/
    tokens.css          design tokens (cores, fontes, etc)
    base.css            reset + tipografia base
    fonts.css           @font-face do GustanBook
    header.css
    tabs.css
    hub.css
    glossary.css
    timeline.css
    timeline-vertical.css
    modal.css
  utils/
    dom.js              helpers de criação de elementos
    glossary-link.js    autolink de termos do glossário em HTML
```

## Notas para migração ao React

Cada componente vanilla é uma função `mount<Name>(container, props)` que retorna `{ destroy, ... }`, mapeando 1:1 para Functional Components React. Os dados em `src/data/*.js` já estão no shape esperado de props.

| Vanilla | React |
|---|---|
| `mountHub(el, { points, imageSrc, onSelect })` | `<Hub points imageSrc onSelect />` |
| `mountTimeline(el, { data, onSelect })` | `<Timeline data onSelect />` |
| `mountTimelineVertical(el, { data, onSelect })` | `<TimelineVertical data onSelect />` |
| `mountGlossary(el, { data, highlight })` | `<Glossary data highlight />` |
| `createModal(root)` → `.open()` / `.close()` | `<Modal open onClose>` |
| `createGlossaryTooltip(root, { onSeeMore })` | `<GlossaryTooltip onSeeMore />` |

## Deploy

Site é 100% estático (HTML + CSS + JS módulos). Para subir em hospedagem como Hostinger, basta fazer upload dos arquivos do projeto (excluindo `node_modules/`).

Como usa **ES Modules** nativos (`<script type="module">`), o servidor precisa servir os `.js` com mime-type `application/javascript`. Apache/Nginx fazem isso por padrão.
