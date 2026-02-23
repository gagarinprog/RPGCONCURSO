// === InfraRPG – Cliente Supabase ===
// Substitua as variáveis abaixo pelas suas credenciais do Supabase.
// Enquanto não configuradas, o jogo usa o banco local (database.js).

const SUPABASE_URL = typeof __SUPABASE_URL__ !== 'undefined' ? __SUPABASE_URL__ : '';
const SUPABASE_KEY = typeof __SUPABASE_KEY__ !== 'undefined' ? __SUPABASE_KEY__ : '';

let _supabase = null;

async function _getClient() {
  if (_supabase) return _supabase;
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    return _supabase;
  } catch {
    return null;
  }
}

export const gameAPI = {
  /**
   * Busca questões de um tópico no Supabase.
   * Retorna array vazio em caso de erro (fallback para banco local).
   */
  async fetchQuestions(subjectKey, topicId) {
    const client = await _getClient();
    if (!client) return [];

    const { data, error } = await client
      .from('questions')
      .select('*')
      .eq('subject', subjectKey)
      .eq('topic_id', topicId)
      .eq('active', true);

    if (error) {
      console.warn('Supabase: erro ao buscar questões:', error.message);
      return [];
    }

    return (data || []).map(q => ({
      t: q.statement,
      a: q.answer,
      e: q.explanation,
      r: q.reference
    }));
  },

  /**
   * Salva o progresso do usuário anônimo identificado por userId.
   */
  async saveProgress(userId, topicId, progressData) {
    const client = await _getClient();
    if (!client) return;

    const { error } = await client
      .from('user_progress')
      .upsert({
        user_id: userId,
        topic_id: topicId,
        ...progressData,
        last_studied_at: new Date().toISOString()
      });

    if (error) console.warn('Supabase: erro ao salvar progresso:', error.message);
  },

  /**
   * Registra estatísticas de resposta para uma questão.
   */
  async logAnswer(questionId, correct) {
    const client = await _getClient();
    if (!client) return;

    const { error } = await client.rpc('increment_question_stats', {
      q_id: questionId,
      is_correct: correct
    });

    if (error) console.warn('Supabase: erro ao registrar estatística:', error.message);
  }
};
