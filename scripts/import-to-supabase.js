// === InfraRPG – Script de Importação para Supabase ===
// Uso: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/import-to-supabase.js
//
// Requer Node.js 18+ e o arquivo data/database.js acessível pelo caminho relativo.
// O EDITAL_DATABASE é carregado via readFileSync para evitar dependência de módulos ES.

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Configuração ─────────────────────────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Defina SUPABASE_URL e SUPABASE_SERVICE_KEY como variáveis de ambiente.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ── Carregar database.js ──────────────────────────────────────────────────────
const dbPath = join(__dirname, '../data/database.js');
const dbSource = readFileSync(dbPath, 'utf8');

// Executa o source do database.js em um contexto isolado para extrair EDITAL_DATABASE
const fn = new Function(`${dbSource}; return EDITAL_DATABASE;`);
const EDITAL_DATABASE = fn();

// ── Converter questões ────────────────────────────────────────────────────────
function buildQuestionsArray(database) {
  const rows = [];
  for (const [subjectKey, subjectData] of Object.entries(database)) {
    for (const topic of subjectData.topics) {
      for (const q of topic.pool) {
        rows.push({
          subject:     subjectKey,
          topic_id:    topic.id,
          topic_label: topic.label,
          statement:   q.t,
          answer:      q.a,
          explanation: q.e,
          reference:   q.r || null,
          difficulty:  2,
          active:      true
        });
      }
    }
  }
  return rows;
}

// ── Importar em lotes ─────────────────────────────────────────────────────────
async function importQuestions() {
  const questions = buildQuestionsArray(EDITAL_DATABASE);
  console.log(`📦 Total de questões a importar: ${questions.length}`);

  const BATCH_SIZE = 50;
  let imported = 0;

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('questions').insert(batch);

    if (error) {
      console.error(`❌ Erro no lote ${Math.floor(i / BATCH_SIZE) + 1}:`, error.message);
    } else {
      imported += batch.length;
      console.log(`✅ Lote ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} questões importadas (total: ${imported})`);
    }
  }

  console.log(`\n🎉 Importação concluída: ${imported}/${questions.length} questões inseridas.`);
}

importQuestions().catch(err => {
  console.error('❌ Falha na importação:', err);
  process.exit(1);
});
