/**
 * Linha do Tempo — Eneva
 * Cada evento segue o shape (compatível com props React futuras):
 *   {
 *     id:       string  (slug único)
 *     year:     string  ('2001', '2008/2009', etc.)
 *     date?:    string  (data específica opcional)
 *     title:    string
 *     summary:  string  (texto curto, exibido no card)
 *     body:     string  (texto longo do modal — pode conter HTML simples)
 *     image:    string  (URL/caminho do hero do card)
 *     media?:   Array<{ type: 'image' | 'video' | 'youtube', src: string, alt?: string }>
 *   }
 *
 * Os textos abaixo são placeholders editoriais — substituir pela narrativa
 * oficial aprovada pela área de Comunicação da Eneva.
 */
export const timelineData = [
  {
    id: 'fundacao-2001',
    year: '2001',
    date: 'Novembro · 2001',
    title: 'A semente da Eneva',
    summary: 'Nasce a MPX, holding de energia que daria origem à Eneva, com foco em geração térmica a partir de fontes locais.',
    body: `Em 2001 nasce a MPX, primeira empresa do grupo a apostar em geração térmica integrada a recursos minerais brasileiros. A visão fundadora era clara: levar <strong>energia confiável e competitiva</strong> a regiões onde a infraestrutura tradicional não chegava.<br><br>Esse é o ponto de partida da Eneva como conhecemos hoje — uma companhia <strong>integrada</strong> de exploração, produção e geração de energia.`,
    image: 'assets/timeline/01-fundacao.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/01-fundacao.jpg', alt: 'IPO em destaque na origem da companhia' }
    ]
  },
  {
    id: 'ipo-2008',
    year: '2008',
    date: 'Dezembro · 2008',
    title: 'IPO na B3',
    summary: 'A companhia abre capital na bolsa brasileira, marco que viabilizou os investimentos em geração térmica de larga escala.',
    body: `O IPO na <strong>B3</strong> abriu acesso ao mercado de capitais e financiou a construção das primeiras usinas térmicas integradas a campos de gás natural no Brasil. A negociação de ações em ambiente regulado introduziu uma nova fase de <strong>governança</strong>, transparência e disciplina financeira.`,
    image: 'assets/timeline/02-ipo.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/02-ipo.jpg', alt: 'Abertura de capital — IPO' }
    ]
  },
  {
    id: 'parnaiba-2013',
    year: '2013',
    title: 'Complexo Parnaíba entra em operação',
    summary: 'O maior complexo térmico a gás natural da América Latina inicia operação no Maranhão, integrado aos campos da Bacia do Parnaíba.',
    body: `O <strong>Complexo Parnaíba</strong> consolida o modelo <em>reservoir-to-wire</em>: gás produzido nos próprios campos da Bacia do Parnaíba é convertido em energia elétrica nas usinas vizinhas. O modelo reduz custos logísticos e estabelece um novo padrão de eficiência para o setor de <strong>termelétricas</strong> no país.`,
    image: 'assets/timeline/03-parnaiba.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/03-parnaiba.jpg', alt: 'Complexo termelétrico Parnaíba' },
      { type: 'image', src: 'assets/hub/downstream.jpg', alt: 'Vista aérea da operação' }
    ]
  },
  {
    id: 'recuperacao-2015',
    year: '2014/2015',
    title: 'Reestruturação e renascimento',
    summary: 'A companhia atravessa um processo de recuperação judicial e emerge mais enxuta, sob novo controle e nova marca: Eneva.',
    body: `Após um período de profunda reestruturação, a empresa emerge com novo controle acionário, balanço saneado e foco renovado. Adota-se o nome <strong>Eneva</strong>, sinalizando ao mercado o início de um <strong>novo ciclo</strong>.`,
    image: 'assets/timeline/04-renascimento.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/04-renascimento.jpg', alt: 'Novo ciclo da companhia' }
    ]
  },
  {
    id: 'jaguatirica-2019',
    year: '2019',
    title: 'Jaguatirica II — energia para Roraima',
    summary: 'Eneva vence leilão para suprir Roraima, único estado fora do Sistema Interligado Nacional, com usina térmica a gás natural.',
    body: `A vitória no leilão de Roraima representa um marco <strong>estratégico e social</strong>: substituir a geração a óleo diesel por gás natural mais limpo e barato em um estado isolado do <abbr title="Sistema Interligado Nacional">SIN</abbr>. <strong>Jaguatirica II</strong> envolve campo de produção, gasoduto dedicado e usina, tudo no mesmo modelo integrado da companhia.`,
    image: 'assets/timeline/05-jaguatirica.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/05-jaguatirica.jpg', alt: 'Operação Roraima' }
    ]
  },
  {
    id: 'azulao-2022',
    year: '2022',
    title: 'Azulão–Jaguatirica em operação',
    summary: 'Entra em operação o sistema integrado que leva gás natural do Amazonas a Roraima por meio de transporte criogênico inédito no Brasil.',
    body: `Sistema único no país: o gás é produzido no <strong>Campo de Azulão (AM)</strong>, liquefeito, transportado por mais de 1.000 km em caminhões criogênicos até a usina <strong>Jaguatirica II (RR)</strong> e regaseificado para gerar eletricidade. A solução substitui geração a diesel e reduz drasticamente as emissões locais.`,
    image: 'assets/timeline/06-azulao.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/06-azulao.jpg', alt: 'Tanques de GNL — Azulão' },
      { type: 'image', src: 'assets/hub/midstream.jpg', alt: 'Logística criogênica' }
    ]
  },
  {
    id: 'crescimento-2024',
    year: '2024',
    title: 'Maior geradora privada de energia térmica',
    summary: 'A Eneva consolida sua posição como uma das maiores geradoras privadas do Brasil, com forte presença em E&P de gás natural.',
    body: `Com expansão de portfólio em <strong>geração</strong> e em <strong>upstream</strong> (exploração e produção de gás), a Eneva consolida posição como <strong>uma das maiores geradoras privadas do Brasil</strong>, mantendo o foco em fontes domésticas competitivas.`,
    image: 'assets/timeline/07-crescimento.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/07-crescimento.jpg', alt: 'Operação consolidada' }
    ]
  },
  {
    id: 'futuro',
    year: 'Hoje',
    title: 'O próximo capítulo',
    summary: 'Transição energética com responsabilidade: gás natural como ponte e novos negócios em fontes renováveis e descarbonização.',
    body: `Olhando para frente, a Eneva atua na <strong>transição energética</strong> com pragmatismo: gás natural como ponte para um sistema de baixo carbono, ao mesmo tempo em que avança em novos negócios em <strong>renováveis</strong>, <strong>captura de carbono</strong> e descarbonização industrial.`,
    image: 'assets/timeline/08-futuro.jpg',
    media: [
      { type: 'image', src: 'assets/timeline/08-futuro.jpg', alt: 'Energia renovável — solar' }
    ]
  }
];
