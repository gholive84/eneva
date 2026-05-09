/**
 * Auto-link de termos do glossário em qualquer HTML.
 *
 * - Recebe HTML bruto + dataset do glossário
 * - Retorna HTML com os termos detectados envolvidos em
 *   <span class="glossary-link" data-term-id="..."></span>
 * - Apenas a *primeira* ocorrência de cada termo é linkada (evita poluição visual)
 * - Não quebra dentro de tags HTML (lê apenas text nodes via DOM parsing)
 *
 * Ao migrar para React, este utilitário continua válido — apenas
 * adapte o consumo (ex.: dangerouslySetInnerHTML do resultado).
 */

import { glossaryData } from '../data/glossary.js';

/**
 * Constrói índice de termos ordenado por tamanho descendente (matches
 * mais longos têm prioridade — "Gás Natural Liquefeito" antes de "gás").
 */
function buildIndex() {
  const entries = [];
  for (const item of glossaryData) {
    const all = [item.term];
    if (item.acronym) all.push(item.acronym);
    if (Array.isArray(item.aliases)) all.push(...item.aliases);
    for (const alias of all) {
      if (!alias) continue;
      entries.push({ id: item.id, alias });
    }
  }
  entries.sort((a, b) => b.alias.length - a.alias.length);
  return entries;
}

const INDEX = buildIndex();

/** Escapa string para uso em RegExp. */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Linka termos em uma string HTML. O parser DOM garante que tags e atributos
 * permanecem intactos — só nós de texto são alterados.
 */
export function linkifyGlossary(html) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  const linkedIds = new Set(); // primeira ocorrência por termo

  walkTextNodes(wrapper, (node) => {
    let text = node.nodeValue;
    if (!text || !text.trim()) return;

    // Para cada alias, procura a primeira ocorrência
    let frag = null;
    for (const { id, alias } of INDEX) {
      if (linkedIds.has(id)) continue;
      const re = new RegExp(`\\b(${escapeRegex(alias)})\\b`, 'i');
      const match = text.match(re);
      if (!match) continue;

      // Nunca linkar dentro de uma tag glossary-link já existente
      if (isInsideGlossaryLink(node)) continue;

      const before = text.slice(0, match.index);
      const matched = match[0];
      const after = text.slice(match.index + matched.length);

      frag = frag || document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));

      const span = document.createElement('span');
      span.className = 'glossary-link';
      span.dataset.termId = id;
      span.tabIndex = 0;
      span.setAttribute('role', 'button');
      span.setAttribute('aria-label', `Definição de ${matched}`);
      span.textContent = matched;
      frag.appendChild(span);

      linkedIds.add(id);
      text = after;

      if (!text) break;
    }

    if (frag) {
      if (text) frag.appendChild(document.createTextNode(text));
      node.parentNode.replaceChild(frag, node);
    }
  });

  return wrapper.innerHTML;
}

function walkTextNodes(root, visit) {
  // Snapshot porque o visitor pode substituir nós
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      // pular dentro de <a>, <code>, <abbr> e <span class="glossary-link">
      let p = node.parentNode;
      while (p && p !== root) {
        if (
          p.nodeType === 1 &&
          (p.tagName === 'A' ||
           p.tagName === 'CODE' ||
           p.tagName === 'ABBR' ||
           p.classList?.contains('glossary-link'))
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        p = p.parentNode;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  for (const node of nodes) visit(node);
}

function isInsideGlossaryLink(node) {
  let p = node.parentNode;
  while (p) {
    if (p.nodeType === 1 && p.classList?.contains('glossary-link')) return true;
    p = p.parentNode;
  }
  return false;
}

/** Retorna o termo do glossário pelo id. */
export function getGlossaryTerm(id) {
  return glossaryData.find((item) => item.id === id) || null;
}
