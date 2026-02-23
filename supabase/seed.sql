-- === InfraRPG – Seed: Dados Iniciais ===
-- Este script insere as questões do database.js no Supabase.
-- Execute APÓS o schema.sql.
-- Para um seed completo, prefira usar o script: scripts/import-to-supabase.js

-- Exemplo: Inflação – Regime de Metas
INSERT INTO questions (subject, topic_id, topic_label, statement, answer, explanation, reference, difficulty) VALUES
(
  'inflacao', 'metas_inflacao', 'Regime de Metas de Inflação',
  'O regime de metas de inflação consiste em um mecanismo em que o banco central se compromete publicamente a manter a inflação em um determinado nível ou intervalo ao longo do tempo.',
  TRUE,
  'Correto. No regime de metas de inflação, a autoridade monetária anuncia uma meta numérica para a inflação e usa os instrumentos de política monetária (principalmente a taxa de juros) para alcançá-la. No Brasil, o CMN define a meta e o Banco Central executa a política.',
  'Decreto nº 3.088/1999; Banco Central do Brasil',
  2
),
(
  'inflacao', 'metas_inflacao', 'Regime de Metas de Inflação',
  'No Brasil, a meta de inflação é definida pelo Banco Central do Brasil, que também a persegue por meio da taxa SELIC.',
  FALSE,
  'Errado. A meta de inflação no Brasil é definida pelo Conselho Monetário Nacional (CMN), não pelo Banco Central. O BCB é responsável por executar a política monetária para alcançar a meta definida pelo CMN.',
  'Decreto nº 3.088/1999, art. 1º e 2º',
  1
),
(
  'inflacao', 'metas_inflacao', 'Regime de Metas de Inflação',
  'A taxa SELIC é o principal instrumento de política monetária utilizado pelo Banco Central do Brasil para controlar a inflação dentro do regime de metas.',
  TRUE,
  'Correto. A taxa SELIC (taxa básica de juros da economia) é o principal instrumento de política monetária do BCB.',
  'Banco Central do Brasil – Relatório de Inflação',
  1
);

-- Exemplo: Política Fiscal
INSERT INTO questions (subject, topic_id, topic_label, statement, answer, explanation, reference, difficulty) VALUES
(
  'fiscal', 'resultado_fiscal', 'Resultado Fiscal e Dívida Pública',
  'O superávit primário representa o resultado positivo das contas do governo antes do pagamento dos juros da dívida pública.',
  TRUE,
  'Correto. O resultado primário exclui receitas e despesas financeiras (juros). Quando as receitas primárias superam as despesas primárias, temos superávit primário.',
  'Tesouro Nacional – Glossário de Finanças Públicas',
  1
),
(
  'fiscal', 'resultado_fiscal', 'Resultado Fiscal e Dívida Pública',
  'A Lei de Responsabilidade Fiscal (LRF) estabelece normas de finanças públicas voltadas para a responsabilidade na gestão fiscal e se aplica apenas ao governo federal.',
  FALSE,
  'Errado. A LRF aplica-se a todos os entes da Federação: União, estados, Distrito Federal e municípios.',
  'Lei Complementar nº 101/2000',
  2
);

-- Exemplo: Sistema Financeiro Nacional
INSERT INTO questions (subject, topic_id, topic_label, statement, answer, explanation, reference, difficulty) VALUES
(
  'sfn', 'estrutura_sfn', 'Estrutura do Sistema Financeiro Nacional',
  'O Conselho Monetário Nacional (CMN) é o órgão máximo do Sistema Financeiro Nacional, responsável pela formulação da política monetária, creditícia e cambial do Brasil.',
  TRUE,
  'Correto. O CMN é o órgão normativo máximo do SFN, presidido pelo Ministro da Fazenda.',
  'Lei nº 4.595/1964',
  1
),
(
  'sfn', 'estrutura_sfn', 'Estrutura do Sistema Financeiro Nacional',
  'A Comissão de Valores Mobiliários (CVM) é responsável por regular e fiscalizar o mercado de crédito bancário no Brasil.',
  FALSE,
  'Errado. A CVM regula o MERCADO DE CAPITAIS. O mercado de CRÉDITO BANCÁRIO é regulado e fiscalizado pelo Banco Central.',
  'Lei nº 6.385/1976',
  1
);
