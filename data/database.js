// === InfraRPG – Banco de Questões Local (Fallback Offline) ===
// Usado quando o Supabase não está disponível.
// Estrutura: EDITAL_DATABASE[subjectKey].topics[n].pool[n]
// Campos da questão: t (texto), a (resposta bool), e (explicação), r (referência)

const EDITAL_DATABASE = {

  inflacao: {
    label: 'Inflação e Política Monetária',
    icon: '📈',
    color: '#7c3aed',
    topics: [
      {
        id: 'metas_inflacao',
        label: 'Regime de Metas de Inflação',
        pool: [
          {
            t: 'O regime de metas de inflação consiste em um mecanismo em que o banco central se compromete publicamente a manter a inflação em um determinado nível ou intervalo ao longo do tempo.',
            a: true,
            e: 'Correto. No regime de metas de inflação, a autoridade monetária anuncia uma meta numérica para a inflação e usa os instrumentos de política monetária (principalmente a taxa de juros) para alcançá-la. No Brasil, o CMN define a meta e o Banco Central executa a política.',
            r: 'Decreto nº 3.088/1999; Banco Central do Brasil'
          },
          {
            t: 'No Brasil, a meta de inflação é definida pelo Banco Central do Brasil, que também a persegue por meio da taxa SELIC.',
            a: false,
            e: 'Errado. A meta de inflação no Brasil é definida pelo Conselho Monetário Nacional (CMN), não pelo Banco Central. O BCB é responsável por executar a política monetária para alcançar a meta definida pelo CMN, usando a taxa SELIC como principal instrumento.',
            r: 'Decreto nº 3.088/1999, art. 1º e 2º'
          },
          {
            t: 'A taxa SELIC é o principal instrumento de política monetária utilizado pelo Banco Central do Brasil para controlar a inflação dentro do regime de metas.',
            a: true,
            e: 'Correto. A taxa SELIC (taxa básica de juros da economia) é o principal instrumento de política monetária do BCB. Aumentos na SELIC encarecem o crédito e reduzem a demanda, ajudando a controlar a inflação; reduções estimulam a economia.',
            r: 'Banco Central do Brasil – Relatório de Inflação'
          },
          {
            t: 'O IPCA é o índice oficial de inflação do Brasil, calculado pelo IBGE e utilizado como referência para o sistema de metas de inflação.',
            a: true,
            e: 'Correto. O Índice Nacional de Preços ao Consumidor Amplo (IPCA), calculado pelo IBGE, é o indicador oficial de inflação no Brasil e o índice de referência do sistema de metas de inflação do BCB.',
            r: 'Decreto nº 3.088/1999; IBGE'
          },
          {
            t: 'A inflação de demanda ocorre quando há excesso de oferta em relação à demanda de bens e serviços na economia.',
            a: false,
            e: 'Errado. A inflação de demanda ocorre quando há excesso de DEMANDA em relação à oferta. Quando os consumidores e o governo querem gastar mais do que a economia pode produzir, os preços sobem. O excesso de oferta, ao contrário, tende a reduzir preços.',
            r: 'Teoria Econômica – Macroeconomia'
          },
          {
            t: 'A hiperinflação é caracterizada por taxas de inflação extremamente elevadas que corroem rapidamente o valor da moeda e desorganizam a economia.',
            a: true,
            e: 'Correto. A hiperinflação, geralmente definida como inflação mensal acima de 50%, causa perda acelerada do poder de compra, fuga para ativos reais e desestruturação do sistema econômico. O Brasil viveu processos de hiperinflação nas décadas de 1980 e início dos anos 1990.',
            r: 'Cagan (1956); Experiência brasileira do Plano Real'
          },
          {
            t: 'O Plano Real de 1994 utilizou a âncora cambial como único mecanismo de estabilização da inflação no Brasil.',
            a: false,
            e: 'Errado. O Plano Real utilizou múltiplos mecanismos: a URV (Unidade Real de Valor) como âncora para coordenar expectativas, a âncora cambial após a introdução do Real, e ajuste fiscal. Não foi um mecanismo único, mas uma combinação de políticas.',
            r: 'Franco (1995); Plano Real – Ministério da Fazenda'
          },
          {
            t: 'No sistema de metas de inflação, o banco central possui independência para escolher os instrumentos de política monetária, mesmo que a meta seja definida pelo governo.',
            a: true,
            e: 'Correto. Este é o conceito de independência de instrumentos (instrument independence), distinto da independência de objetivos (goal independence). No Brasil, o CMN define a meta (objetivo), mas o BCB tem autonomia para escolher como alcançá-la (instrumentos).',
            r: 'Lei Complementar nº 179/2021 – Autonomia do BCB'
          },
          {
            t: 'Deflação significa sempre uma situação positiva para a economia, pois os preços dos produtos ficam mais baratos para os consumidores.',
            a: false,
            e: 'Errado. Deflação (queda generalizada de preços) pode ser prejudicial à economia. Quando os consumidores esperam que os preços continuem caindo, adiam compras, o que reduz a demanda, desincentiva investimentos e pode levar à recessão. É o chamado ciclo deflacionário.',
            r: 'Teoria Econômica – Armadilha da liquidez e deflação'
          },
          {
            t: 'A inflação de custos ocorre quando há aumento nos custos de produção, como alta no preço de matérias-primas ou salários, que são repassados aos preços finais.',
            a: true,
            e: 'Correto. A inflação de custos (cost-push inflation) resulta de choques de oferta adversos: aumento do preço de insumos (petróleo, câmbio, commodities) ou de salários. As empresas repassam esses custos aos preços finais, gerando inflação sem necessariamente haver excesso de demanda.',
            r: 'Teoria Econômica – Macroeconomia'
          }
        ]
      },
      {
        id: 'politica_monetaria',
        label: 'Instrumentos de Política Monetária',
        pool: [
          {
            t: 'O compulsório bancário é o percentual dos depósitos que os bancos são obrigados a recolher ao Banco Central, sendo um instrumento de controle da liquidez da economia.',
            a: true,
            e: 'Correto. O recolhimento compulsório reduz a multiplicação do crédito bancário. Ao aumentar a alíquota de compulsório, o BCB reduz os recursos disponíveis para empréstimos, diminuindo a liquidez e ajudando a controlar a inflação.',
            r: 'Banco Central do Brasil – Instrumentos de Política Monetária'
          },
          {
            t: 'As operações de open market consistem na compra e venda de títulos públicos pelo Banco Central para regular a liquidez da economia.',
            a: true,
            e: 'Correto. O open market (mercado aberto) é o instrumento mais ágil de política monetária. Quando o BCB vende títulos, retira dinheiro de circulação (contrai liquidez); quando compra títulos, injeta recursos (expande liquidez). É o principal mecanismo de gestão da SELIC.',
            r: 'Banco Central do Brasil – Instrumentos de Política Monetária'
          },
          {
            t: 'A redesconto é uma operação pela qual os bancos comerciais emprestam recursos ao Banco Central para auxiliar nas operações de mercado aberto.',
            a: false,
            e: 'Errado. O redesconto é o oposto: é quando o Banco Central empresta recursos aos bancos comerciais que se encontram com falta de liquidez. Funciona como "emprestador de última instância". É o banco central que fornece recursos aos bancos, não o contrário.',
            r: 'Banco Central do Brasil – Instrumentos de Política Monetária'
          },
          {
            t: 'A política monetária expansionista, caracterizada pela redução da taxa de juros, tende a estimular o consumo e o investimento, podendo pressionar a inflação.',
            a: true,
            e: 'Correto. Uma política monetária expansionista reduz o custo do crédito, estimulando consumo e investimento. Isso aumenta a demanda agregada e, se a economia já estiver operando próximo ao pleno emprego, pode gerar pressões inflacionárias.',
            r: 'Macroeconomia – Política Monetária'
          },
          {
            t: 'O COPOM é o Comitê de Política Monetária responsável por definir a meta da Taxa SELIC no Brasil, reunindo-se a cada 45 dias.',
            a: true,
            e: 'Correto. O COPOM (Comitê de Política Monetária) se reúne a cada 45 dias para analisar as condições econômicas e definir a meta para a taxa SELIC, que é a taxa básica de juros da economia brasileira.',
            r: 'Banco Central do Brasil – COPOM'
          }
        ]
      }
    ]
  },

  fiscal: {
    label: 'Política Fiscal e Finanças Públicas',
    icon: '🏛️',
    color: '#059669',
    topics: [
      {
        id: 'resultado_fiscal',
        label: 'Resultado Fiscal e Dívida Pública',
        pool: [
          {
            t: 'O superávit primário representa o resultado positivo das contas do governo antes do pagamento dos juros da dívida pública.',
            a: true,
            e: 'Correto. O resultado primário exclui receitas e despesas financeiras (juros). Quando as receitas primárias superam as despesas primárias, temos superávit primário, que indica a capacidade do governo de honrar seus compromissos financeiros sem recorrer a empréstimos.',
            r: 'Tesouro Nacional – Glossário de Finanças Públicas'
          },
          {
            t: 'A dívida bruta do governo geral inclui apenas as dívidas do governo federal, excluindo estados e municípios.',
            a: false,
            e: 'Errado. A dívida bruta do governo geral (DBGG) inclui as dívidas do governo federal, dos estados e dos municípios. É uma medida abrangente do endividamento público utilizada para comparações internacionais, frequentemente usada pelo FMI e pelo BCB.',
            r: 'Banco Central do Brasil – Nota de Política Fiscal'
          },
          {
            t: 'O déficit nominal do setor público corresponde ao resultado negativo das contas públicas incluindo o pagamento de juros da dívida.',
            a: true,
            e: 'Correto. O resultado nominal considera todas as receitas e despesas, incluindo as financeiras (juros). Quando há déficit nominal, o governo precisa se endividar para cobrir toda a diferença entre receitas e despesas, incluindo os juros.',
            r: 'Tesouro Nacional – Conceitos de Resultado Fiscal'
          },
          {
            t: 'O teto de gastos estabelecido pela EC 95/2016 limitou o crescimento das despesas primárias federais à variação do IPCA do ano anterior.',
            a: true,
            e: 'Correto. A Emenda Constitucional 95/2016 (Novo Regime Fiscal) estabeleceu que as despesas primárias do governo federal só poderiam crescer em termos reais de acordo com a inflação do ano anterior (IPCA), visando controlar o crescimento dos gastos públicos.',
            r: 'Emenda Constitucional nº 95/2016'
          },
          {
            t: 'A política fiscal expansionista necessariamente resulta em aumento da dívida pública, independentemente do ciclo econômico.',
            a: false,
            e: 'Errado. A política fiscal expansionista pode ser financiada por diferentes fontes. Além disso, nos estabilizadores automáticos, receitas aumentam automaticamente em períodos de crescimento. Em períodos recessivos, expansão fiscal pode ser "paga" com crescimento futuro da arrecadação.',
            r: 'Teoria Fiscal – Estabilizadores Automáticos'
          },
          {
            t: 'Os estabilizadores automáticos são instrumentos de política fiscal que operam automaticamente para suavizar os ciclos econômicos sem necessidade de decisões discricionárias.',
            a: true,
            e: 'Correto. Exemplos de estabilizadores automáticos incluem o seguro-desemprego (aumenta gasto em recessão) e a arrecadação de impostos progressivos (diminui automaticamente em recessão, reduzindo a contração). Eles atuam sem necessidade de aprovação legislativa específica.',
            r: 'Teoria Fiscal – Macroeconomia'
          },
          {
            t: 'A Lei de Responsabilidade Fiscal (LRF) estabelece normas de finanças públicas voltadas para a responsabilidade na gestão fiscal e se aplica apenas ao governo federal.',
            a: false,
            e: 'Errado. A LRF (Lei Complementar nº 101/2000) aplica-se a todos os entes da Federação: União, estados, Distrito Federal e municípios, além de seus poderes e órgãos. É uma lei nacional de abrangência ampla.',
            r: 'Lei Complementar nº 101/2000 – Lei de Responsabilidade Fiscal'
          },
          {
            t: 'O financiamento monetário do déficit, também chamado de "senhoriagem", consiste na criação de moeda pelo banco central para cobrir os gastos do governo.',
            a: true,
            e: 'Correto. A senhoriagem é o ganho do governo pela emissão de moeda. Quando o governo financia déficits imprimindo dinheiro, isso pode gerar inflação (imposto inflacionário), pois aumenta a base monetária sem correspondente aumento da produção.',
            r: 'Teoria Econômica – Macroeconomia Fiscal'
          },
          {
            t: 'O efeito crowding-out ocorre quando o gasto público financia projetos privados, aumentando assim o investimento total da economia.',
            a: false,
            e: 'Errado. O crowding-out (efeito deslocamento) é o oposto: o aumento do gasto público pode elevar a taxa de juros (via maior demanda por crédito) e deslocar o investimento PRIVADO. Isto é, o governo "expulsa" o setor privado do mercado de crédito.',
            r: 'Macroeconomia – Teoria Keynesiana e Neoclássica'
          },
          {
            t: 'A regra de ouro fiscal estabelece que o governo não pode se endividar para financiar despesas correntes, mas pode contrair empréstimos para investimentos.',
            a: true,
            e: 'Correto. A regra de ouro proíbe que operações de crédito excedam as despesas de capital no orçamento. O princípio é que endividamento para investimento é justificável (cria ativos), mas endividamento para custeio (salários, aposentadorias) é problemático.',
            r: 'Constituição Federal, art. 167, III'
          }
        ]
      },
      {
        id: 'orcamento_publico',
        label: 'Orçamento Público e Receitas',
        pool: [
          {
            t: 'O orçamento público brasileiro é composto por três peças: o Plano Plurianual (PPA), a Lei de Diretrizes Orçamentárias (LDO) e a Lei Orçamentária Anual (LOA).',
            a: true,
            e: 'Correto. O sistema de planejamento orçamentário brasileiro é composto por esses três instrumentos: o PPA (4 anos), a LDO (anual, estabelece metas e prioridades) e a LOA (estima receitas e fixa despesas para o exercício seguinte).',
            r: 'Constituição Federal, art. 165'
          },
          {
            t: 'A receita tributária compreende os impostos, taxas e contribuições de melhoria, sendo estes os únicos tributos previstos no Sistema Tributário Nacional.',
            a: false,
            e: 'Errado. O Sistema Tributário Nacional prevê cinco espécies tributárias: impostos, taxas, contribuições de melhoria, contribuições especiais (sociais, de intervenção no domínio econômico e de interesse de categorias profissionais) e empréstimos compulsórios.',
            r: 'Constituição Federal, arts. 145-149; CTN'
          },
          {
            t: 'Os impostos, diferentemente das taxas, não exigem contraprestação específica do Estado ao contribuinte.',
            a: true,
            e: 'Correto. Esta é a distinção fundamental: impostos são tributos não vinculados (não há contraprestação específica), enquanto taxas são vinculadas ao exercício do poder de polícia ou à utilização de serviço público específico e divisível.',
            r: 'CTN, art. 16 e 77'
          },
          {
            t: 'A vinculação de receitas é amplamente permitida pela Constituição Federal, podendo qualquer receita ser destinada a despesas específicas por lei ordinária.',
            a: false,
            e: 'Errado. A CF/88 veda a vinculação de receita de impostos a órgão, fundo ou despesa, com exceções expressamente previstas (saúde, educação, fundos constitucionais, etc.). As exceções são taxativas e constam do art. 167, IV da Constituição.',
            r: 'Constituição Federal, art. 167, IV'
          },
          {
            t: 'O princípio da anterioridade tributária estabelece que nenhum tributo pode ser cobrado no mesmo exercício financeiro em que tenha sido publicada a lei que o instituiu ou aumentou.',
            a: true,
            e: 'Correto. O princípio da anterioridade (art. 150, III, b da CF) protege o contribuinte de surpresas tributárias. Há também a anterioridade nonagesimal (90 dias), sendo necessário cumprir ambas na maioria dos casos.',
            r: 'Constituição Federal, art. 150, III, b e c'
          }
        ]
      }
    ]
  },

  setor_externo: {
    label: 'Setor Externo e Câmbio',
    icon: '🌐',
    color: '#0284c7',
    topics: [
      {
        id: 'balanco_pagamentos',
        label: 'Balanço de Pagamentos',
        pool: [
          {
            t: 'O balanço de pagamentos é um registro sistemático de todas as transações econômicas entre residentes de um país e residentes do exterior em um determinado período.',
            a: true,
            e: 'Correto. O balanço de pagamentos (BP) registra todas as transações econômicas internacionais: comércio de bens e serviços, transferências, fluxos de capital e financiamentos. É organizado em conta corrente, conta capital e conta financeira.',
            r: 'FMI – Manual de Balanço de Pagamentos; Banco Central do Brasil'
          },
          {
            t: 'A balança comercial registra tanto o comércio de mercadorias quanto o comércio de serviços entre um país e o exterior.',
            a: false,
            e: 'Errado. A balança comercial (ou de mercadorias) registra apenas o comércio de BENS (exportações e importações de mercadorias). O comércio de SERVIÇOS (turismo, fretes, royalties) é registrado na balança de serviços, ambas dentro da conta corrente.',
            r: 'Banco Central do Brasil – Notas Metodológicas do BP'
          },
          {
            t: 'Um déficit na conta corrente do balanço de pagamentos significa que o país está gastando mais com o exterior do que recebendo, devendo ser financiado por entradas na conta financeira.',
            a: true,
            e: 'Correto. O déficit em conta corrente indica que o país consome mais do que produz para o exterior. Este déficit precisa ser financiado por superávit na conta financeira (entradas de capital), que pode ser investimento direto, portfólio ou outros investimentos.',
            r: 'Macroeconomia Internacional – Identidades do BP'
          },
          {
            t: 'O investimento estrangeiro direto (IED) é registrado na conta corrente do balanço de pagamentos por gerar rendas para o exterior.',
            a: false,
            e: 'Errado. O IED é registrado na CONTA FINANCEIRA do balanço de pagamentos, pois representa transferência de propriedade de ativos. Os rendimentos gerados pelo IED (lucros, dividendos) é que são registrados na conta corrente (renda primária).',
            r: 'FMI – Manual de Balanço de Pagamentos'
          },
          {
            t: 'As reservas internacionais de um país são ativos externos controlados pelas autoridades monetárias e podem ser usadas para intervir no mercado de câmbio.',
            a: true,
            e: 'Correto. As reservas internacionais (em ouro, direitos especiais de saque e moedas estrangeiras, principalmente dólares) são geridas pelo banco central e servem como "colchão" de liquidez para cobrir déficits externos e para intervenções no mercado cambial.',
            r: 'Banco Central do Brasil; FMI'
          },
          {
            t: 'A apreciação da taxa de câmbio nominal significa que a moeda doméstica se tornou mais fraca em relação às moedas estrangeiras.',
            a: false,
            e: 'Errado. Apreciação cambial significa que a moeda doméstica se tornou mais FORTE (valorizada). Em termos de BRL/USD, apreciação do real significa que são necessários menos reais para comprar um dólar. Depreciação é quando a moeda doméstica se enfraquece.',
            r: 'Macroeconomia Internacional – Taxa de Câmbio'
          },
          {
            t: 'A taxa de câmbio real mede o poder de compra relativo entre países, incorporando as diferenças de inflação entre eles além da taxa nominal.',
            a: true,
            e: 'Correto. A taxa de câmbio real = taxa nominal × (preços externos / preços domésticos). Uma apreciação real ocorre quando os preços domésticos sobem mais que os externos, ou quando a moeda se aprecia nominalmente, tornando as exportações menos competitivas.',
            r: 'Macroeconomia Internacional – Teoria da PPC'
          },
          {
            t: 'O regime de câmbio fixo requer que o banco central possua reservas internacionais suficientes para defender a paridade anunciada.',
            a: true,
            e: 'Correto. No câmbio fixo, o banco central se compromete a comprar ou vender moeda estrangeira ao preço determinado. Para isso, precisa de reservas para intervir quando há pressão vendedora sobre a moeda doméstica.',
            r: 'Macroeconomia Internacional – Regimes Cambiais'
          }
        ]
      },
      {
        id: 'comercio_internacional',
        label: 'Comércio Internacional e Tarifas',
        pool: [
          {
            t: 'A teoria das vantagens comparativas de David Ricardo argumenta que países devem se especializar na produção dos bens que produzem com menor custo de oportunidade relativo.',
            a: true,
            e: 'Correto. Ricardo demonstrou que, mesmo que um país seja mais eficiente em tudo, o comércio é benéfico se cada país se especializar onde tem vantagem comparativa (menor custo de oportunidade). A especialização e o comércio geram ganhos mútuos.',
            r: 'Ricardo – Princípios de Economia Política e Tributação (1817)'
          },
          {
            t: 'As tarifas de importação sempre prejudicam o país que as impõe, sem qualquer benefício para grupos domésticos específicos.',
            a: false,
            e: 'Errado. Embora tarifas reduzam o bem-estar agregado do país importador, elas beneficiam produtores domésticos que competem com importações (proteção à indústria nacional). O custo recai sobre os consumidores. A análise de bem-estar mostra perdas líquidas para o país como um todo.',
            r: 'Teoria do Comércio Internacional – Análise de Bem-Estar'
          },
          {
            t: 'O dumping consiste na prática de exportar produtos a preços abaixo do custo de produção ou abaixo do preço praticado no mercado doméstico do exportador.',
            a: true,
            e: 'Correto. O dumping é considerado uma prática de comércio desleal. O Acordo Antidumping da OMC permite que países apliquem medidas antidumping (tarifas compensatórias) quando uma indústria doméstica sofre dano material comprovado pelo dumping de importações.',
            r: 'Acordo Antidumping da OMC; Lei nº 9.019/1995'
          },
          {
            t: 'O Mercosul é uma união aduaneira completa entre Brasil, Argentina, Paraguai e Uruguai, com livre circulação de bens, serviços e fatores de produção.',
            a: false,
            e: 'Errado. O Mercosul é uma união aduaneira IMPERFEITA, não um mercado comum. Há livre circulação de bens entre os membros e Tarifa Externa Comum (TEC), mas há exceções, listas de exceção à TEC, e a livre circulação de serviços e fatores ainda não está plenamente implementada.',
            r: 'Tratado de Assunção (1991); Protocolo de Ouro Preto (1994)'
          }
        ]
      }
    ]
  },

  microeconomia: {
    label: 'Microeconomia e Estruturas de Mercado',
    icon: '🏢',
    color: '#b45309',
    topics: [
      {
        id: 'estruturas_mercado',
        label: 'Estruturas de Mercado',
        pool: [
          {
            t: 'Em um mercado perfeitamente competitivo, as empresas são tomadoras de preço porque individualmente não possuem poder de mercado suficiente para influenciar o preço de equilíbrio.',
            a: true,
            e: 'Correto. Na concorrência perfeita, há muitos compradores e vendedores, produto homogêneo e livre entrada e saída. Cada firma representa fração mínima do mercado e aceita o preço determinado pela oferta e demanda agregadas como dado.',
            r: 'Microeconomia – Teoria da Firma'
          },
          {
            t: 'No monopólio, a empresa pratica preços iguais aos praticados em mercados competitivos, pois o monopólista não tem incentivo para aumentar preços.',
            a: false,
            e: 'Errado. O monopolista, justamente por ser único ofertante, tem poder de mercado e pratica preços SUPERIORES ao custo marginal (acima do nível competitivo). Isso gera lucros extraordinários e uma perda de eficiência (deadweight loss) para a sociedade.',
            r: 'Microeconomia – Teoria do Monopólio'
          },
          {
            t: 'O oligopólio é caracterizado por um pequeno número de empresas que se reconhecem mutuamente como rivais, o que pode levar a comportamentos estratégicos como cartéis ou guerras de preços.',
            a: true,
            e: 'Correto. No oligopólio, a interdependência entre as poucas firmas leva a comportamento estratégico (teoria dos jogos). Podem cooperar (cartel) ou competir agressivamente (guerra de preços). O modelo de Cournot e o dilema do prisioneiro são ferramentas analíticas clássicas.',
            r: 'Microeconomia – Teoria dos Jogos e Oligopólio'
          },
          {
            t: 'As externalidades negativas ocorrem quando a produção ou consumo de um bem gera custos para terceiros não envolvidos na transação, sem que o mercado reflita esses custos.',
            a: true,
            e: 'Correto. Exemplo clássico: poluição industrial. O custo social (inclui dano a terceiros) supera o custo privado, levando o mercado a produzir mais do que o socialmente ótimo. Instrumentos de correção incluem taxação pigouviana, regulação e direitos de propriedade (Coase).',
            r: 'Microeconomia – Falhas de Mercado e Externalidades'
          },
          {
            t: 'A elasticidade-preço da demanda mede a variação percentual na quantidade demandada em resposta a uma variação percentual no preço do bem.',
            a: true,
            e: 'Correto. A elasticidade-preço = %ΔQ / %ΔP. Se |ε| > 1, a demanda é elástica (quantidade responde mais que proporcionalmente ao preço); se |ε| < 1, inelástica; se |ε| = 1, unitária. É crucial para análise de receita total e política de preços.',
            r: 'Microeconomia – Teoria da Demanda'
          },
          {
            t: 'A discriminação de preços de primeiro grau ocorre quando o monopolista cobra preços diferentes de grupos distintos de consumidores com base em suas características observáveis.',
            a: false,
            e: 'Errado. A discriminação de primeiro grau (perfeita) cobra de cada consumidor exatamente seu preço de reserva, capturando todo o excedente do consumidor. A discriminação de TERCEIRO grau é a que cobra preços diferentes a grupos distintos (estudantes, idosos, etc.).',
            r: 'Microeconomia – Discriminação de Preços'
          },
          {
            t: 'Os bens públicos são caracterizados por serem não rivais (o consumo por um não reduz a disponibilidade para outros) e não excludentes (impossível impedir o uso).',
            a: true,
            e: 'Correto. A não rivalidade e a não excludência são as características definidoras dos bens públicos. Exemplos: defesa nacional, iluminação pública. Geram o problema do free rider (carona): consumidores não revelam preferências verdadeiras, levando ao subprovimento pelo mercado.',
            r: 'Microeconomia – Teoria dos Bens Públicos'
          },
          {
            t: 'O modelo de Bertrand prevê que dois duopolistas que competem em preços alcançarão o equilíbrio de lucro zero, semelhante ao resultado competitivo.',
            a: true,
            e: 'Correto. No modelo de Bertrand, as firmas competem em preços (não quantidades como em Cournot). Se o produto é homogêneo, o equilíbrio de Nash ocorre quando ambas precificam ao custo marginal, eliminando lucros extraordinários (paradoxo de Bertrand).',
            r: 'Microeconomia – Teoria dos Jogos'
          }
        ]
      }
    ]
  },

  contas_nacionais: {
    label: 'Contabilidade Social e PIB',
    icon: '📊',
    color: '#0891b2',
    topics: [
      {
        id: 'pib_conceitos',
        label: 'Conceitos de PIB e Renda Nacional',
        pool: [
          {
            t: 'O PIB (Produto Interno Bruto) mede o valor de mercado de todos os bens e serviços finais produzidos em um país em um determinado período, independentemente da nacionalidade dos produtores.',
            a: true,
            e: 'Correto. O PIB é uma medida geográfica: inclui toda produção dentro das fronteiras do país, seja por residentes ou não residentes. O PNB (Produto Nacional Bruto), por sua vez, considera a renda dos cidadãos nacionais, independentemente de onde produzem.',
            r: 'IBGE – Sistema de Contas Nacionais'
          },
          {
            t: 'O PIB real difere do PIB nominal por eliminar os efeitos da inflação, permitindo comparações do crescimento econômico ao longo do tempo.',
            a: true,
            e: 'Correto. O PIB nominal é medido a preços correntes do período. O PIB real usa preços de um ano-base, eliminando o efeito da variação de preços e permitindo identificar se houve crescimento efetivo da produção (aumento de volume) ou apenas aumento nominal.',
            r: 'IBGE – Contas Nacionais Trimestrais'
          },
          {
            t: 'Pela ótica da despesa, o PIB é composto por: Consumo das famílias, Investimento privado, Gastos do governo e Exportações líquidas.',
            a: true,
            e: 'Correto. PIB = C + I + G + (X – M), onde C = consumo privado, I = investimento (FBCF + variação de estoques), G = gastos do governo, X = exportações, M = importações. Esta é a abordagem da demanda (ótica da despesa).',
            r: 'IBGE – Contas Nacionais; Macroeconomia'
          },
          {
            t: 'O PIB per capita é a melhor medida de bem-estar e desenvolvimento humano de uma população.',
            a: false,
            e: 'Errado. O PIB per capita é um indicador médio de renda e não captura distribuição de renda, acesso a saúde, educação, expectativa de vida ou sustentabilidade. O IDH (Índice de Desenvolvimento Humano) e o Índice de Gini são mais adequados para avaliar bem-estar e desigualdade.',
            r: 'PNUD – Relatório de Desenvolvimento Humano'
          },
          {
            t: 'A depreciação do capital (consumo de capital fixo) é deduzida do PIB para se obter o Produto Interno Líquido (PIL).',
            a: true,
            e: 'Correto. PIL = PIB – Consumo de Capital Fixo (depreciação). O conceito "líquido" exclui a parte da produção que simplesmente reposiciona o capital desgastado, medindo o quanto efetivamente a economia cresceu em termos de riqueza líquida.',
            r: 'IBGE – Sistema de Contas Nacionais'
          },
          {
            t: 'O deflator do PIB e o IPCA são medidas de inflação idênticas, pois ambos medem a variação de preços na economia brasileira.',
            a: false,
            e: 'Errado. São medidas distintas. O deflator do PIB considera todos os bens e serviços produzidos internamente (inclusive exportações, excluindo importações). O IPCA mede apenas a variação de preços de uma cesta de consumo das famílias de baixa e média renda urbanas.',
            r: 'IBGE – Metodologia de Índices de Preços'
          },
          {
            t: 'Pela ótica da renda, o PIB é igual à soma das remunerações dos fatores de produção: salários, lucros, juros e aluguéis, acrescida dos impostos líquidos de subsídios.',
            a: true,
            e: 'Correto. Toda a produção gera renda equivalente distribuída aos fatores de produção. A ótica da renda soma trabalho (salários), capital (lucros, juros, dividendos), terra (aluguéis) e o governo (impostos sobre produção líquidos de subsídios). As três óticas (despesa, produto, renda) devem ser iguais.',
            r: 'IBGE – Sistema de Contas Nacionais'
          },
          {
            t: 'A Formação Bruta de Capital Fixo (FBCF) representa o investimento em máquinas, equipamentos, construções e propriedade intelectual na economia.',
            a: true,
            e: 'Correto. A FBCF é o principal componente do investimento no PIB (pela ótica da despesa). Inclui aquisições de máquinas e equipamentos, construção civil (residencial e não residencial) e propriedade intelectual (pesquisa & desenvolvimento, software). É um indicador da capacidade produtiva futura.',
            r: 'IBGE – Contas Nacionais'
          }
        ]
      }
    ]
  },

  sfn: {
    label: 'Sistema Financeiro Nacional',
    icon: '🏦',
    color: '#7c3aed',
    topics: [
      {
        id: 'estrutura_sfn',
        label: 'Estrutura do Sistema Financeiro Nacional',
        pool: [
          {
            t: 'O Conselho Monetário Nacional (CMN) é o órgão máximo do Sistema Financeiro Nacional, responsável pela formulação da política monetária, creditícia e cambial do Brasil.',
            a: true,
            e: 'Correto. O CMN é o órgão normativo máximo do SFN, presidido pelo Ministro da Fazenda e composto também pelo Ministro do Planejamento e pelo Presidente do BCB. Ele define as diretrizes gerais de política monetária, cambial e de crédito que o BCB executa.',
            r: 'Lei nº 4.595/1964 – Lei do SFN'
          },
          {
            t: 'O Banco Central do Brasil possui, entre suas funções, o poder de emitir moeda, regular as instituições financeiras e gerir as reservas internacionais.',
            a: true,
            e: 'Correto. O BCB exerce múltiplas funções: emissor de moeda (monopólio de emissão), autoridade monetária (executa política monetária), supervisor bancário (fiscaliza instituições financeiras), gestor das reservas internacionais e administrador do Sistema de Pagamentos Brasileiro (SPB).',
            r: 'Lei nº 4.595/1964; Lei Complementar nº 179/2021'
          },
          {
            t: 'Os bancos múltiplos são instituições financeiras que podem operar em diversas carteiras simultaneamente, substituindo a exigência de criação de bancos especializados para cada atividade.',
            a: true,
            e: 'Correto. Criados pela Resolução CMN 1.524/1988, os bancos múltiplos podem operar com as carteiras: comercial, investimento, desenvolvimento, crédito imobiliário, leasing e crédito financiamento. Simplificaram a estrutura do SFN e são a forma predominante de banco no Brasil.',
            r: 'Resolução CMN 1.524/1988'
          },
          {
            t: 'A Comissão de Valores Mobiliários (CVM) é responsável por regular e fiscalizar o mercado de crédito bancário no Brasil.',
            a: false,
            e: 'Errado. A CVM regula e fiscaliza o MERCADO DE CAPITAIS (ações, debêntures, fundos de investimento). O mercado de CRÉDITO BANCÁRIO é regulado e fiscalizado pelo Banco Central do Brasil.',
            r: 'Lei nº 6.385/1976 – Lei da CVM'
          },
          {
            t: 'O Fundo Garantidor de Créditos (FGC) garante créditos de até R$ 250.000,00 por CPF ou CNPJ contra a mesma instituição financeira, protegendo depositantes em caso de intervenção ou liquidação.',
            a: true,
            e: 'Correto. O FGC é uma entidade privada, sem fins lucrativos, que protege os depositantes e investidores de instituições financeiras associadas. O limite de R$ 250 mil por CPF/CNPJ e por conglomerado financeiro garante depósitos à vista, poupança, CDB, LCI e LCA, entre outros.',
            r: 'Resolução CMN 4.222/2013 – FGC'
          },
          {
            t: 'As cooperativas de crédito são instituições financeiras que captam recursos exclusivamente de seus cooperados e a eles concedem crédito, sendo fiscalizadas pelo Banco Central.',
            a: true,
            e: 'Correto. As cooperativas de crédito são instituições financeiras autorizadas pelo BCB. Seguem os princípios do cooperativismo: adesão voluntária, gestão democrática, participação econômica dos membros. Oferecem serviços financeiros mais acessíveis aos cooperados.',
            r: 'Lei nº 5.764/1971 – Cooperativas; Resolução CMN 4.434/2015'
          },
          {
            t: 'O mercado primário de capitais é onde ocorre a negociação de ações e títulos já emitidos entre investidores, sem que a empresa emissora participe da transação.',
            a: false,
            e: 'Errado. O mercado PRIMÁRIO é onde ocorre a emissão INICIAL de títulos (IPO, emissão de debêntures), com a empresa emissora captando recursos diretamente dos investidores. O mercado SECUNDÁRIO é onde os investidores negociam títulos já existentes entre si (bolsa de valores).',
            r: 'Teoria do Mercado de Capitais; CVM'
          },
          {
            t: 'O spread bancário representa a diferença entre a taxa de juros que os bancos cobram em empréstimos e a taxa que pagam nos recursos captados.',
            a: true,
            e: 'Correto. O spread é a margem financeira dos bancos. No Brasil, o spread bancário é historicamente elevado em comparação internacional, refletindo inadimplência, custo do compulsório, tributação, custos administrativos e concentração bancária.',
            r: 'Banco Central do Brasil – Relatório de Economia Bancária'
          }
        ]
      }
    ]
  }

};
