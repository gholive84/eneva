/**
 * Hub — Pontos interativos sobre a imagem do hub.
 * Os percentuais (x, y) são posicionados sobre a imagem ./assets/HUB.png.
 *
 * Shape (props compatível React):
 *   {
 *     id:       string
 *     seq:      number  (1, 2, 3 — ordem da sequência de pulsos)
 *     x:        number  (% horizontal sobre a imagem; 0–100)
 *     y:        number  (% vertical sobre a imagem; 0–100)
 *     label:    string  (tooltip no hover)
 *     title:    string  (título do modal)
 *     summary:  string  (descrição curta para o card lateral)
 *     hero:     string  (imagem grande do header do modal)
 *     body:     string  (texto longo — termos do glossário são linkados)
 *     media?:   Array<{ type: 'image' | 'video' | 'youtube', src: string, alt?: string }>
 *   }
 */
export const hubPoints = [
  {
    id: 'upstream',
    seq: 1,
    x: 42,
    y: 23,
    label: 'Upstream · Exploração e Produção',
    title: 'Upstream — onde tudo começa',
    summary: 'Exploração e produção de gás natural em campos próprios.',
    hero: 'assets/hub/upstream.jpg',
    body: `O <strong>Upstream</strong> é onde a Eneva atua na <strong>exploração</strong> e <strong>produção (E&P)</strong> de gás natural. Operamos campos terrestres em bacias como <strong>Parnaíba</strong> e <strong>Amazonas</strong>, com tecnologia de ponta em sísmica, perfuração e gestão de reservatórios.<br><br>O modelo integrado da companhia (<em>reservoir-to-wire</em>) começa aqui: o gás extraído é destinado prioritariamente às nossas próprias <strong>UTEs</strong>, garantindo segurança de suprimento e ganho de escala.`,
    media: [
      { type: 'image', src: 'assets/hub/upstream.jpg', alt: 'Campo de produção de gás natural' },
      { type: 'image', src: 'assets/hub/upstream-2.jpg', alt: 'Operação onshore' }
    ]
  },
  {
    id: 'midstream',
    seq: 2,
    x: 58,
    y: 33,
    label: 'Midstream · Logística e Transporte',
    title: 'Midstream — a ponte energética',
    summary: 'Tratamento, transporte e logística do gás até as usinas.',
    hero: 'assets/hub/midstream.jpg',
    body: `No <strong>Midstream</strong> conectamos a produção à geração. Inclui <abbr title="Unidade de Tratamento de Gás">UTGs</abbr>, gasodutos dedicados e o sistema único de <strong>transporte criogênico</strong> (Azulão–Jaguatirica) que liquefaz gás natural e o leva por mais de 1.000 km até Roraima.<br><br>É essa logística integrada que torna o modelo <em>reservoir-to-wire</em> da Eneva possível e competitivo.`,
    media: [
      { type: 'image', src: 'assets/hub/midstream.jpg', alt: 'Estocagem criogênica de GNL' },
      { type: 'image', src: 'assets/hub/midstream-2.jpg', alt: 'Logística e transporte' }
    ]
  },
  {
    id: 'downstream',
    seq: 3,
    x: 52,
    y: 55,
    label: 'Downstream · Geração e Comercialização',
    title: 'Downstream — energia que move o Brasil',
    summary: 'Geração térmica a gás e comercialização de energia.',
    hero: 'assets/hub/downstream.jpg',
    body: `No <strong>Downstream</strong> o gás natural se transforma em <strong>energia elétrica</strong> em nossas <abbr title="Usina Termelétrica">UTEs</abbr>. Operamos um dos maiores parques térmicos privados do país, com despacho coordenado pelo <abbr title="Operador Nacional do Sistema Elétrico">ONS</abbr>.<br><br>A energia gerada é comercializada via contratos no <abbr title="Ambiente de Contratação Regulada">ACR</abbr> e <abbr title="Ambiente de Contratação Livre">ACL</abbr>, levando confiabilidade ao <abbr title="Sistema Interligado Nacional">SIN</abbr>.`,
    media: [
      { type: 'image', src: 'assets/hub/downstream.jpg', alt: 'Vista aérea de termelétrica' },
      { type: 'image', src: 'assets/hub/downstream-2.jpg', alt: 'Complexo de geração térmica' }
    ]
  },
  {
    id: 'renovaveis',
    seq: 4,
    x: 67,
    y: 80,
    label: 'Renováveis · Solar e Eólica',
    title: 'Renováveis — diversificação da matriz',
    summary: 'Geração solar e eólica como complemento estratégico ao gás natural.',
    hero: 'assets/hub/upstream.jpg',
    body: `A Eneva expande seu portfólio de <strong>geração renovável</strong> com projetos de <strong>UFV</strong> (solar fotovoltaica) e fontes eólicas. As renováveis são o complemento natural ao gás na <strong>transição energética</strong>: zero emissão direta de carbono, custos competitivos e alta sinergia operacional com nossos ativos térmicos.<br><br>Combinando térmica e renovável, oferecemos <strong>energia firme</strong> mesmo nos momentos de baixa irradiação ou vento, mantendo a confiabilidade que o sistema brasileiro exige.`,
    media: [
      { type: 'image', src: 'assets/timeline/08-futuro.jpg', alt: 'Painéis solares ao pôr do sol' }
    ]
  },
  {
    id: 'logistica-maritima',
    seq: 5,
    x: 24,
    y: 66,
    label: 'Logística Marítima · GNL',
    title: 'Logística marítima — alcance global',
    summary: 'Importação e movimentação de GNL via terminais marítimos.',
    hero: 'assets/hub/midstream.jpg',
    body: `Além da produção doméstica, complementamos o suprimento com <strong>GNL importado</strong> via terminais marítimos. Embarcações especializadas (<abbr title="Unidade Flutuante de Armazenamento e Regaseificação">FRSU</abbr>) armazenam e regaseificam o gás natural liquefeito, conectando a Eneva ao mercado global.<br><br>A logística marítima nos dá <strong>flexibilidade de suprimento</strong> e capacidade de atender picos de demanda em qualquer região do litoral brasileiro.`,
    media: [
      { type: 'image', src: 'assets/hub/midstream-2.jpg', alt: 'Terminal portuário de GNL' }
    ]
  },
  {
    id: 'comercializacao',
    seq: 6,
    x: 23,
    y: 86,
    label: 'Comercialização · ACL e ACR',
    title: 'Comercialização — energia até o cliente',
    summary: 'Venda de energia em leilões regulados e contratos no mercado livre.',
    hero: 'assets/hub/downstream.jpg',
    body: `Nossa área de <strong>Comercialização</strong> conecta a energia gerada a <strong>distribuidoras</strong>, <strong>consumidores livres</strong>, <strong>comercializadoras</strong> e demais agentes do setor.<br><br>Atuamos nos dois ambientes: <abbr title="Ambiente de Contratação Regulada">ACR</abbr> via <strong>CCEAR</strong> firmados em leilões da <abbr title="Agência Nacional de Energia Elétrica">ANEEL</abbr>, e <abbr title="Ambiente de Contratação Livre">ACL</abbr> através de <strong>PPAs</strong> bilaterais. Também participamos do <strong>PLD</strong> e <abbr title="Câmara de Comercialização de Energia Elétrica">CCEE</abbr> para liquidação de diferenças.`,
    media: [
      { type: 'image', src: 'assets/timeline/02-ipo.jpg', alt: 'Mercado de capitais e energia' }
    ]
  }
];
