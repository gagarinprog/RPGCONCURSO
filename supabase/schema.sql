-- === InfraRPG – Schema do Banco de Dados (Supabase / PostgreSQL) ===
-- Execute este script no SQL Editor do seu projeto Supabase.

-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
-- Tabela de questões
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS questions (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject      VARCHAR(50)  NOT NULL,
    topic_id     VARCHAR(50)  NOT NULL,
    topic_label  VARCHAR(200) NOT NULL,
    statement    TEXT         NOT NULL,
    answer       BOOLEAN      NOT NULL,
    explanation  TEXT         NOT NULL,
    reference    VARCHAR(300),
    difficulty   INTEGER      DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
    tags         TEXT[]       DEFAULT '{}',
    active       BOOLEAN      DEFAULT TRUE,
    created_at   TIMESTAMPTZ  DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Tabela de progresso do usuário
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_progress (
    id                 UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id            UUID        NOT NULL,
    topic_id           VARCHAR(50) NOT NULL,
    phase              INTEGER     DEFAULT 1,
    correct_in_phase   INTEGER     DEFAULT 0,
    completed_phases   INTEGER[]   DEFAULT '{}',
    last_studied_at    TIMESTAMPTZ DEFAULT NOW(),
    total_correct      INTEGER     DEFAULT 0,
    total_wrong        INTEGER     DEFAULT 0,
    UNIQUE(user_id, topic_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Tabela de estatísticas por questão
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS question_stats (
    question_id    UUID REFERENCES questions(id) ON DELETE CASCADE,
    times_shown    INTEGER DEFAULT 0,
    times_correct  INTEGER DEFAULT 0,
    times_wrong    INTEGER DEFAULT 0,
    PRIMARY KEY (question_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Índices
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject);
CREATE INDEX IF NOT EXISTS idx_questions_topic   ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_active  ON questions(active);
CREATE INDEX IF NOT EXISTS idx_progress_user     ON user_progress(user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Trigger: atualiza updated_at automaticamente
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_questions_updated_at
BEFORE UPDATE ON questions
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Função RPC: incrementar estatísticas de questão
-- ─────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION increment_question_stats(q_id UUID, is_correct BOOLEAN)
RETURNS VOID AS $$
BEGIN
  INSERT INTO question_stats (question_id, times_shown, times_correct, times_wrong)
  VALUES (q_id, 1, CASE WHEN is_correct THEN 1 ELSE 0 END, CASE WHEN is_correct THEN 0 ELSE 1 END)
  ON CONFLICT (question_id) DO UPDATE SET
    times_shown   = question_stats.times_shown + 1,
    times_correct = question_stats.times_correct + CASE WHEN is_correct THEN 1 ELSE 0 END,
    times_wrong   = question_stats.times_wrong   + CASE WHEN is_correct THEN 0 ELSE 1 END;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE questions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_stats ENABLE ROW LEVEL SECURITY;

-- Questões ativas são públicas para leitura
CREATE POLICY "questions_public_read"
ON questions FOR SELECT
USING (active = TRUE);

-- Usuário só acessa seu próprio progresso
CREATE POLICY "user_progress_own"
ON user_progress FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Estatísticas de questões são públicas para leitura
CREATE POLICY "question_stats_public_read"
ON question_stats FOR SELECT
USING (TRUE);
