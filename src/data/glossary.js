/**
 * Glossário Eneva — termos oficiais do setor de energia.
 * Shape (props compatível React):
 *   {
 *     id:         string
 *     term:       string             (termo principal — usado no índice e busca)
 *     acronym?:   string             (sigla curta, exibida como pill)
 *     aliases?:   string[]           (variações para autolinkagem em modais)
 *     definition: string             (texto da definição — HTML simples permitido)
 *     category?:  string             (categorização: 'upstream', 'governanca'...)
 *   }
 */
export const glossaryData = [
  {
    id: 'aneel',
    term: 'Agência Nacional de Energia Elétrica',
    acronym: 'ANEEL',
    aliases: ['ANEEL'],
    definition: 'Órgão que tem por finalidade <strong>regular e fiscalizar</strong> a produção, transmissão, distribuição e comercialização de energia elétrica, em conformidade com as políticas e diretrizes do governo federal.',
    category: 'governanca'
  },
  {
    id: 'anp',
    term: 'Agência Nacional do Petróleo, Gás Natural e Biocombustíveis',
    acronym: 'ANP',
    aliases: ['ANP'],
    definition: 'Agência que tem como finalidade <strong>promover a regulação, a contratação e a fiscalização</strong> das atividades econômicas integrantes da indústria do petróleo, do gás natural e dos biocombustíveis.',
    category: 'governanca'
  },
  {
    id: 'acl',
    term: 'Ambiente de Contratação Livre',
    acronym: 'ACL',
    aliases: ['ACL'],
    definition: 'A energia elétrica gerada pela Eneva no âmbito das usinas térmicas a gás pode ser vendida no Ambiente de Contratação Livre (<strong>ACL</strong>), por meio de <strong>contratos bilaterais</strong> através da negociação com os consumidores livres, outros geradores e comercializadoras.',
    category: 'comercializacao'
  },
  {
    id: 'acr',
    term: 'Ambiente de Contratação Regulada',
    acronym: 'ACR',
    aliases: ['ACR'],
    definition: 'A energia elétrica gerada pela Eneva no âmbito das usinas térmicas a gás pode ser vendida no Ambiente de Contratação Regulada (<strong>ACR</strong>), por meio de contratos firmados com distribuidoras em <strong>leilões de energia da ANEEL</strong>.',
    category: 'comercializacao'
  },
  {
    id: 'bacia',
    term: 'Bacia Sedimentar',
    aliases: ['Bacia', 'Bacia Sedimentar'],
    definition: '<strong>Depressão da crosta terrestre</strong> onde se acumulam rochas sedimentares que podem ser portadoras de petróleo ou gás, associados ou não. <em>(Fonte: Lei nº 9.478/1997)</em>.',
    category: 'upstream'
  },
  {
    id: 'barril',
    term: 'Barril',
    acronym: 'bbl',
    aliases: ['bbl', 'barril'],
    definition: 'Unidade padrão de volume que, para o caso específico do petróleo, equivale a <strong>42 galões americanos</strong> ou <strong>158,9873 litros</strong>. 1 m³ ≈ 6,28981 bbl. Uso tolerado apenas para medir volume de petróleo.',
    category: 'unidades'
  },
  {
    id: 'boe',
    term: 'Barril de Óleo Equivalente',
    acronym: 'BOE',
    aliases: ['BOE', 'Barril de Óleo Equivalente'],
    definition: 'Unidade utilizada pela indústria do petróleo para <strong>quantificar e comparar</strong> a energia relativa a volumes de diferentes combustíveis, onde 1 bbl de petróleo = 1 BOE = 5.800.000 BTU = 1.700 kWh. <em>(Fonte: Resolução ANP nº 25/2013)</em>.',
    category: 'unidades'
  },
  {
    id: 'bcm',
    term: 'Bilhões de metros cúbicos',
    acronym: 'BCM',
    aliases: ['BCM'],
    definition: 'Unidade de medida de volume usualmente utilizada para acumulações de <strong>gás natural</strong>.',
    category: 'unidades'
  },
  {
    id: 'bloco-exploratorio',
    term: 'Bloco Exploratório',
    aliases: ['Bloco Exploratório'],
    definition: 'Subdivisão de uma <strong>bacia sedimentar</strong> onde são desenvolvidas atividades de exploração e produção de petróleo e gás natural.',
    category: 'upstream'
  },
  {
    id: 'ccee',
    term: 'Câmara de Comercialização de Energia Elétrica',
    acronym: 'CCEE',
    aliases: ['CCEE'],
    definition: 'A CCEE garante as condições para que a <strong>energia elétrica seja negociada</strong>. Os leilões de energia, realizados no âmbito do ACR, são realizados pela CCEE, por delegação da ANEEL, e utilizam o critério de menor tarifa, visando a redução do custo de aquisição da energia elétrica a ser repassada aos consumidores.',
    category: 'governanca'
  },
  {
    id: 'capacidade-instalada',
    term: 'Capacidade Instalada',
    aliases: ['Capacidade Instalada'],
    definition: '<strong>Potência máxima</strong> de geração de energia de uma usina ou conjunto de usinas.',
    category: 'geracao'
  },
  {
    id: 'ciclo-aberto',
    term: 'Ciclo Aberto ou Simples',
    aliases: ['Ciclo Aberto', 'Ciclo Simples'],
    definition: 'Método de geração de energia elétrica a partir do gás natural. Consiste na <strong>queima do gás natural comprimido</strong> e misturado com ar, gerando gases que expandem uma turbina e geram energia mecânica. Essa energia é então convertida em energia elétrica por um gerador, enquanto os gases de exaustão da turbina são lançados na atmosfera.',
    category: 'geracao'
  },
  {
    id: 'ciclo-combinado',
    term: 'Ciclo Combinado',
    aliases: ['Ciclo Combinado'],
    definition: 'Processo de geração de energia elétrica que combina duas tecnologias: a <strong>turbina a gás</strong> e a <strong>turbina a vapor</strong>. Na primeira etapa, o gás natural é queimado na turbina a gás, gerando energia mecânica que movimenta um gerador e produz eletricidade. Os gases quentes expelidos pela turbina a gás são direcionados para uma caldeira, onde recuperam parte de seu calor para gerar vapor. Esse vapor aciona a turbina a vapor, gerando mais eletricidade. O ciclo combinado aproveita melhor a energia do combustível, resultando em um processo <strong>mais eficiente e com menor emissão</strong> de poluentes.',
    category: 'geracao'
  },
  {
    id: 'completacao',
    term: 'Completação de Poços',
    aliases: ['Completação', 'Completação de Poços'],
    definition: 'Conjunto de operações realizadas <strong>após a perfuração</strong> para transformar o poço em uma unidade produtora de petróleo, gás ou outros fluidos. Envolve a instalação de tubulações, válvulas, bombas e <em>packers</em>, que permitem o controle do fluxo de fluidos do reservatório para a superfície.',
    category: 'upstream'
  },
  {
    id: 'condensado',
    term: 'Condensado',
    aliases: ['Condensado'],
    definition: '<strong>Fração líquida do gás natural</strong> obtida no processo primário de separação de campo, mantida na fase líquida na condição de pressão e temperatura de separação.',
    category: 'upstream'
  },
  {
    id: 'ccesi',
    term: 'Contrato de Comercialização de Energia Elétrica e Potência nos Sistemas Isolados',
    acronym: 'CCESI',
    aliases: ['CCESI'],
    definition: 'Contrato bilateral de comercialização de energia elétrica nos <strong>sistemas isolados</strong> celebrado entre vendedora e compradora.',
    category: 'comercializacao'
  },
  {
    id: 'ccear',
    term: 'Contrato de Compra de Energia no Ambiente Regulado',
    acronym: 'CCEAR',
    aliases: ['CCEAR'],
    definition: 'Contrato de energia firmado entre <strong>geradoras e distribuidoras</strong>, celebrados a partir de leilões centralizados de energia (nova ou existente) no ACR. Os CCEARs podem ser firmados na modalidade quantidade ou disponibilidade e têm prazo de fornecimento estabelecido no edital do leilão. O preço é o firmado no leilão.',
    category: 'comercializacao'
  },
  {
    id: 'crcap',
    term: 'Contrato de Reserva de Capacidade para Potência',
    acronym: 'CRCAP',
    aliases: ['CRCAP'],
    definition: 'Os vencedores do leilão formalizam o negócio pelo <strong>Contrato de Reserva de Capacidade (CRCAP)</strong> junto à CCEE.',
    category: 'comercializacao'
  },
  {
    id: 'cmo',
    term: 'Custo Marginal da Operação',
    acronym: 'CMO',
    aliases: ['CMO'],
    definition: '<strong>Custo</strong> que o sistema incorre para acionar mais uma usina para fazer frente a uma unidade adicional de carga.',
    category: 'comercializacao'
  },
  {
    id: 'cvu',
    term: 'Custo Variável Unitário',
    acronym: 'CVU',
    aliases: ['CVU'],
    definition: 'Custo variável unitário de operação da termelétrica, composto por uma parcela variável (<strong>Ccomb</strong> – Custo de Combustível) e por uma parcela fixa (<strong>CO&M</strong> – Custo de operação e manutenção).',
    category: 'comercializacao'
  },
  {
    id: 'despachar',
    term: 'Despachar',
    aliases: ['Despachar', 'despacho'],
    definition: 'Processo em que a <strong>usina termelétrica (UTE) entra em funcionamento</strong> para gerar energia elétrica.',
    category: 'geracao'
  },
  {
    id: 'downstream',
    term: 'Downstream',
    aliases: ['Downstream'],
    definition: 'Termo aplicado às atividades de <strong>refino do petróleo bruto, processamento do gás natural</strong> em plantas de gasolina, transporte e comercialização/distribuição de derivados.',
    category: 'downstream'
  },
  {
    id: 'epe',
    term: 'Empresa de Pesquisa Energética',
    acronym: 'EPE',
    aliases: ['EPE'],
    definition: 'A EPE é uma <strong>empresa pública federal</strong> que tem por finalidade prestar serviços na área de estudos e pesquisas destinados a subsidiar o planejamento do setor energético — energia elétrica, petróleo e gás natural e seus derivados, carvão mineral, fontes energéticas renováveis e eficiência energética, entre outras.',
    category: 'governanca'
  },
  {
    id: 'ep',
    term: 'Exploração e Produção',
    acronym: 'E&P',
    aliases: ['E&P', 'Exploração e Produção'],
    definition: '<strong>Exploração e produção</strong> de petróleo e gás natural.',
    category: 'upstream'
  },
  {
    id: 'frsu',
    term: 'Unidade Flutuante de Armazenamento e Regaseificação',
    acronym: 'FRSU',
    aliases: ['FRSU'],
    definition: 'Um <strong>navio especial</strong> que armazena e regaseifica o Gás Natural Liquefeito (GNL). O GNL é armazenado em tanques especiais a baixas temperaturas e depois transformado em gás natural gasoso na própria FRSU.',
    category: 'midstream'
  },
  {
    id: 'garantia-fisica',
    term: 'Garantia Física',
    aliases: ['Garantia Física'],
    definition: 'Um <strong>limite máximo de energia</strong> que as usinas hidrelétricas, termelétricas e projetos de importação de energia podem comercializar. Definida por lei, garante o fornecimento de energia para o país, assegurando que a demanda seja atendida de forma confiável.',
    category: 'comercializacao'
  },
  {
    id: 'gnl',
    term: 'Gás Natural Liquefeito',
    acronym: 'GNL',
    aliases: ['GNL'],
    definition: 'É o <strong>gás natural no estado líquido</strong> obtido mediante processo de criogenia a que foi submetido e armazenado em pressões próximas à atmosférica.',
    category: 'midstream'
  },
  {
    id: 'gd',
    term: 'Geração Distribuída',
    acronym: 'GD',
    aliases: ['GD', 'Geração Distribuída'],
    definition: 'Modelo de produção de energia elétrica caracterizado pela <strong>proximidade entre geradores e consumidores</strong>. Essa proximidade geográfica contrasta com o modelo tradicional de geração centralizada, onde grandes usinas geram energia para ser distribuída por longas distâncias através de linhas de transmissão.',
    category: 'geracao'
  },
  {
    id: 'gw',
    term: 'Gigawatt',
    acronym: 'GW',
    aliases: ['GW'],
    definition: 'Unidade de grandeza física que representa uma medida de potência equivalente a <strong>um bilhão de Watts (W)</strong>.',
    category: 'unidades'
  },
  {
    id: 'gwh',
    term: 'Gigawatt-hora',
    acronym: 'GWh',
    aliases: ['GWh'],
    definition: 'Medida de <strong>energia em watt-hora</strong>, equivalente a um bilhão de Wh.',
    category: 'unidades'
  },
  {
    id: 'heat-rate',
    term: 'Heat rate',
    aliases: ['Heat rate', 'Heat Rate'],
    definition: 'Medida da <strong>eficiência</strong> de geradores/usinas elétricas que convertem um combustível em calor e em eletricidade. Reflete a quantidade de energia usada para gerar 1 kWh de eletricidade.',
    category: 'geracao'
  },
  {
    id: 'hidrocarboneto',
    term: 'Hidrocarboneto',
    aliases: ['Hidrocarboneto', 'hidrocarbonetos'],
    definition: 'Designação dos <strong>compostos químicos formados por carbono e hidrogênio</strong>. Refere-se, geralmente, ao petróleo ou seus derivados.',
    category: 'upstream'
  },
  {
    id: 'irr',
    term: 'Índice de Reposição de Reservas',
    acronym: 'IRR',
    aliases: ['IRR'],
    definition: 'Relação entre o <strong>volume de reservas incorporadas</strong> no ano e o volume total produzido no mesmo ano.',
    category: 'upstream'
  },
  {
    id: 'lead',
    term: 'Lead',
    aliases: ['Lead'],
    definition: 'Classificação no setor de E&P para definir um projeto associado a uma <strong>acumulação potencial atualmente mal definida</strong>, que requer mais aquisição de dados e/ou avaliação a ser classificada como Prospecto.',
    category: 'upstream'
  },
  {
    id: 'mw',
    term: 'Megawatt',
    acronym: 'MW',
    aliases: ['MW'],
    definition: 'Unidade de grandeza física que representa uma medida de potência equivalente a <strong>um milhão de Watts (W)</strong>.',
    category: 'unidades'
  },
  {
    id: 'mwh',
    term: 'Megawatt-hora',
    acronym: 'MWh',
    aliases: ['MWh'],
    definition: 'Medida de <strong>energia em watt-hora</strong>, equivalente a um milhão de Wh.',
    category: 'unidades'
  },
  {
    id: 'midstream',
    term: 'Midstream',
    aliases: ['Midstream'],
    definition: 'Cadeia de suprimento do gás natural que atua como uma <strong>ponte crucial entre a produção</strong> de gás natural e seu uso final. Uma extensa rede de gasodutos transporta o gás extraído para centros de processamento e unidades de distribuição. O gás é armazenado em tanques e terminais especializados, garantindo suprimento contínuo para as etapas subsequentes da cadeia de valor.',
    category: 'midstream'
  },
  {
    id: 'mm',
    term: 'Milhões',
    acronym: 'MM',
    aliases: ['MM'],
    definition: 'Unidade.',
    category: 'unidades'
  },
  {
    id: 'mmbtu',
    term: 'Milhões de BTU',
    acronym: 'MMbtu',
    aliases: ['MMbtu', 'MMBTU'],
    definition: 'Unidade que representa <strong>um milhão de BTUs</strong> (British Thermal Units — quantidade de energia necessária para elevar a temperatura de uma libra de água em um grau Fahrenheit). Comum para medir consumo de energia em processos industriais, incluindo a produção de petróleo e gás.',
    category: 'unidades'
  },
  {
    id: 'offshore',
    term: 'Offshore',
    aliases: ['Offshore'],
    definition: 'Localizado <strong>no mar</strong>.',
    category: 'upstream'
  },
  {
    id: 'onshore',
    term: 'Onshore',
    aliases: ['Onshore'],
    definition: 'Localizado <strong>em terra</strong>.',
    category: 'upstream'
  },
  {
    id: 'ons',
    term: 'Operador Nacional do Sistema Elétrico',
    acronym: 'ONS',
    aliases: ['ONS'],
    definition: 'Órgão responsável pela <strong>coordenação e controle</strong> da operação das instalações de geração e transmissão de energia elétrica no <strong>SIN</strong> e pelo planejamento da operação dos sistemas isolados do país, sob fiscalização e regulação da ANEEL.',
    category: 'governanca'
  },
  {
    id: 'play',
    term: 'Play',
    aliases: ['Play'],
    definition: 'Classificação no setor de E&P para definir um projeto associado a uma <strong>acumulação potencial atualmente mal definida</strong>, que requer mais aquisição de dados e/ou avaliação a ser classificado como Lead ou Prospecto.',
    category: 'upstream'
  },
  {
    id: 'ppa',
    term: 'Power Purchase Agreement',
    acronym: 'PPA',
    aliases: ['PPA'],
    definition: 'Contrato de <strong>compra e venda de energia</strong>.',
    category: 'comercializacao'
  },
  {
    id: 'pld',
    term: 'Preço de Liquidação de Diferenças',
    acronym: 'PLD',
    aliases: ['PLD'],
    definition: 'Calculado pela CCEE, o PLD é utilizado na <strong>liquidação</strong> da CCEE para tratamento de débitos, créditos e penalidades dos agentes.',
    category: 'comercializacao'
  },
  {
    id: 'prospecto',
    term: 'Prospecto',
    aliases: ['Prospecto'],
    definition: 'Classificação no setor de E&P para definir um projeto associado a uma <strong>acumulação potencial suficientemente bem definida</strong> para representar um alvo de perfuração viável.',
    category: 'upstream'
  },
  {
    id: 'rating',
    term: 'Rating',
    aliases: ['Rating'],
    definition: 'Ferramenta de <strong>avaliação</strong> atribuída por um analista ou agência independente a uma ação, título, empresa ou país. A classificação atribuída indica o nível de oportunidade de investimento da ação ou título.',
    category: 'governanca'
  },
  {
    id: 'reservas-1p',
    term: 'Reservas Provadas',
    acronym: 'Reservas 1P',
    aliases: ['Reservas Provadas', 'Reservas 1P', '1P'],
    definition: 'Estimativa de reservas calculada pelo volume que pode ser extraído dos reservatórios até que seja inviável economicamente manter a exploração. As <strong>reservas provadas</strong> são aquelas com <strong>alto grau de certeza</strong> quanto à possibilidade de extração — probabilidade mínima de <strong>90%</strong> (em análise probabilística) de que o volume explorado comercialmente será igual ou maior que o estimado.',
    category: 'upstream'
  },
  {
    id: 'reservas-2p',
    term: 'Reservas Provadas e Prováveis',
    acronym: 'Reservas 2P',
    aliases: ['Reservas Provadas e Prováveis', 'Reservas 2P', '2P'],
    definition: 'Soma das reservas provadas com as prováveis — estas possuem <strong>algum grau de incerteza</strong> quanto à possibilidade de extração. Considera-se probabilidade mínima de <strong>50%</strong> de que o volume explorado comercialmente iguale ou exceda o estimado.',
    category: 'upstream'
  },
  {
    id: 'reservas-3p',
    term: 'Reservas Provadas, Prováveis e Possíveis',
    acronym: 'Reservas 3P',
    aliases: ['Reservas Provadas, Prováveis e Possíveis', 'Reservas 3P', '3P'],
    definition: 'Soma das reservas provadas, prováveis e possíveis — estas possuem <strong>alto grau de incerteza</strong>. Considera-se probabilidade mínima de <strong>10%</strong> de que o volume explorado comercialmente iguale ou exceda o volume estimado.',
    category: 'upstream'
  },
  {
    id: 'reservatorio',
    term: 'Reservatório',
    aliases: ['Reservatório'],
    definition: '<strong>Rochas porosas e permeáveis</strong>, capazes de acumular grande quantidade de água, gás ou hidrocarbonetos.',
    category: 'upstream'
  },
  {
    id: 'reservoir-to-wire',
    term: 'Reservoir-to-wire',
    aliases: ['reservoir-to-wire', 'reservoir to wire'],
    definition: 'Modelo integrado de negócio em que a mesma companhia controla <strong>toda a cadeia</strong>: do <strong>reservatório de gás</strong> (upstream) à <strong>energia entregue na rede</strong> (geração). É o modelo característico da Eneva e gera vantagens de custo, eficiência logística e confiabilidade no fornecimento.',
    category: 'estrategia'
  },
  {
    id: 'sin',
    term: 'Sistema Interligado Nacional',
    acronym: 'SIN',
    aliases: ['SIN'],
    definition: 'O SIN incorpora o <strong>sistema de produção e transmissão de energia elétrica</strong> do país, dividido em quatro subsistemas: <strong>Sudeste/Centro-Oeste</strong>, <strong>Sul</strong>, <strong>Nordeste</strong> e <strong>Norte</strong>.',
    category: 'governanca'
  },
  {
    id: 'sisol',
    term: 'Sistema Isolado',
    acronym: 'SISOL',
    aliases: ['SISOL', 'Sistemas Isolados', 'sistemas isolados'],
    definition: 'Sistemas que se encontram <strong>fora do SIN</strong> — atualmente localizados majoritariamente na região Amazônica.',
    category: 'governanca'
  },
  {
    id: 'ton',
    term: 'Toneladas',
    acronym: 'ton',
    aliases: ['ton', 'toneladas'],
    definition: 'Unidade de medida de massa equivalente a <strong>1.000 quilogramas</strong>.',
    category: 'unidades'
  },
  {
    id: 'upstream',
    term: 'Upstream',
    aliases: ['Upstream'],
    definition: 'Segmento da indústria de petróleo que inclui as atividades de <strong>exploração, desenvolvimento, produção e transporte</strong> do petróleo até as refinarias.',
    category: 'upstream'
  },
  {
    id: 'ute',
    term: 'Usina Termelétrica',
    acronym: 'UTE',
    aliases: ['UTE', 'UTEs', 'termelétrica', 'termoelétrica'],
    definition: 'Instalações que produzem energia elétrica por meio da <strong>energia térmica</strong> obtida com a queima de combustíveis fósseis (petróleo, carvão mineral, gás natural) ou não fósseis.',
    category: 'geracao'
  },
  {
    id: 'ufv',
    term: 'Usinas Solares Fotovoltaicas',
    acronym: 'UFV',
    aliases: ['UFV'],
    definition: 'Instalações que produzem energia elétrica em <strong>corrente contínua</strong> pela incidência de luz solar em painéis de silício policristalino.',
    category: 'geracao'
  }
];
