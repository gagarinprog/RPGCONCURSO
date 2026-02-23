// === InfraRPG – Motor Principal do Jogo ===

class GameSession {
  constructor() {
    this.session = null;      // { subjectId, topicId, phase, correctInPhase, wrongInPhase, pool, usedIndices }
    this.currentQuestion = null;
    this.playerHP = 100;
    this.maxHP = 100;
  }

  // ── Navegação ──────────────────────────────────────────────────

  selectSubject(subjectKey) {
    buildTopicList(subjectKey);
    showScreen('topic-screen');
  }

  backToSubjects() {
    showScreen('subject-screen');
  }

  async startSession(subjectKey, topicId) {
    const progress = loadProgress();
    const saved = progress[`${subjectKey}_${topicId}`] || {};
    const phase = Math.min(saved.phase || 1, PHASES_PER_TOPIC + 1);

    if (phase > PHASES_PER_TOPIC) {
      showToast('Tópico já concluído! Revise para praticar.', 'info');
      // Allow replay from phase 1
    }

    this.session = {
      subjectId: subjectKey,
      topicId,
      phase: phase > PHASES_PER_TOPIC ? 1 : phase,
      correctInPhase: 0,
      wrongInPhase: 0,
      pool: [],
      usedIndices: []
    };
    this.playerHP = this.maxHP;
    setHP(this.playerHP, this.maxHP);

    const subject = EDITAL_DATABASE[subjectKey];
    const topicData = subject?.topics.find(t => t.id === topicId);
    document.getElementById('topic-title').textContent = topicData?.label || 'Tópico';
    document.getElementById('phase-title').textContent = `Fase ${this.session.phase}`;

    showScreen('game-screen');
    await this._loadQuestion();
  }

  // ── Carregamento de Questão ─────────────────────────────────────

  async _loadQuestion() {
    closeAllModals();
    document.getElementById('ans-btns').style.display = 'none';
    document.getElementById('q-text').textContent = 'Carregando questão...';

    // Tenta buscar do Supabase; usa banco local como fallback
    let pool = [];
    try {
      const { gameAPI } = await import('./supabase-client.js');
      pool = await gameAPI.fetchQuestions(this.session.subjectId, this.session.topicId);
    } catch {
      // Supabase indisponível – usar banco local
    }

    if (!pool || pool.length === 0) {
      const subject = EDITAL_DATABASE[this.session.subjectId];
      const topic = subject?.topics.find(t => t.id === this.session.topicId);
      pool = topic?.pool || [];
    }

    this.session.pool = pool;

    if (pool.length === 0) {
      document.getElementById('q-text').textContent = 'Nenhuma questão disponível para este tópico.';
      return;
    }

    // Escolhe questão não usada recentemente (rotação inteligente)
    let idx = this._pickIndex(pool.length);
    this.currentQuestion = pool[idx];
    this._showQuestion(this.currentQuestion);
  }

  _pickIndex(poolLength) {
    if (this.session.usedIndices.length >= poolLength) {
      this.session.usedIndices = [];
    }
    let idx;
    do {
      idx = Math.floor(Math.random() * poolLength);
    } while (this.session.usedIndices.includes(idx) && this.session.usedIndices.length < poolLength);
    this.session.usedIndices.push(idx);
    return idx;
  }

  _showQuestion(q) {
    document.getElementById('q-text').textContent = q.t;
    document.getElementById('ans-btns').style.display = 'flex';
    setPhaseProgress(this.session.correctInPhase, CORRECT_PER_PHASE);
    document.getElementById('phase-title').textContent = `Fase ${this.session.phase}`;

    const subject = EDITAL_DATABASE[this.session.subjectId];
    const topic = subject?.topics.find(t => t.id === this.session.topicId);
    document.getElementById('topic-title').textContent = topic?.label || '';
  }

  // ── Resposta do Jogador ─────────────────────────────────────────

  answer(userAnswer) {
    if (!this.currentQuestion) return;
    document.getElementById('ans-btns').style.display = 'none';

    const correct = userAnswer === this.currentQuestion.a;

    document.getElementById('result-icon').textContent = correct ? '✅' : '❌';
    document.getElementById('result-title').textContent = correct ? 'CORRETO!' : 'ERRADO!';
    document.getElementById('result-explanation').textContent = this.currentQuestion.e || '';
    document.getElementById('result-reference').textContent = this.currentQuestion.r
      ? `📖 ${this.currentQuestion.r}`
      : '';

    if (correct) {
      flashGreen('q-card');
      this.session.correctInPhase++;
      setPhaseProgress(this.session.correctInPhase, CORRECT_PER_PHASE);
    } else {
      flashRed('q-card');
      shake('q-card');
      this.session.wrongInPhase++;
      this.playerHP = Math.max(0, this.playerHP - 20);
      setHP(this.playerHP, this.maxHP);
    }

    openModal('result-modal');

    // Verifica fim da fase após mostrar modal
    if (this.session.correctInPhase >= CORRECT_PER_PHASE) {
      setTimeout(() => this._advancePhase(), 400);
    } else if (this.playerHP <= 0) {
      setTimeout(() => this._gameOver(), 400);
    }
  }

  // ── Progressão ────────────────────────────────────────────────

  _advancePhase() {
    const prevPhase = this.session.phase;
    this.session.phase++;
    this.session.correctInPhase = 0;
    this.session.wrongInPhase = 0;
    this.session.usedIndices = [];
    this.playerHP = this.maxHP;
    setHP(this.playerHP, this.maxHP);

    const progressKey = `${this.session.subjectId}_${this.session.topicId}`;
    saveProgress(progressKey, { phase: this.session.phase, correct_in_phase: 0 });

    if (prevPhase >= PHASES_PER_TOPIC) {
      this._completeTopic();
    } else {
      document.getElementById('phase-complete-num').textContent = prevPhase;
      document.getElementById('next-phase-num').textContent = this.session.phase;
      openModal('phase-modal');
    }
  }

  _completeTopic() {
    const subject = EDITAL_DATABASE[this.session.subjectId];
    const topic = subject?.topics.find(t => t.id === this.session.topicId);
    document.getElementById('complete-topic-name').textContent = topic?.label || 'Tópico';
    openModal('complete-modal');
  }

  _gameOver() {
    openModal('gameover-modal');
  }

  // ── Controles de Fluxo ─────────────────────────────────────────

  continueAfterResult() {
    closeModal('result-modal');
    if (this.session.correctInPhase >= CORRECT_PER_PHASE) return; // vai para _advancePhase
    if (this.playerHP <= 0) return; // vai para _gameOver
    this._loadQuestion();
  }

  continueToNextPhase() {
    closeModal('phase-modal');
    this._loadQuestion();
  }

  retryPhase() {
    closeModal('gameover-modal');
    this.session.correctInPhase = 0;
    this.session.wrongInPhase = 0;
    this.session.usedIndices = [];
    this.playerHP = this.maxHP;
    setHP(this.playerHP, this.maxHP);
    setPhaseProgress(0, CORRECT_PER_PHASE);
    this._loadQuestion();
  }

  backToTopics() {
    const subjectKey = this.session?.subjectId;
    closeAllModals();
    this.session = null;
    if (subjectKey) buildTopicList(subjectKey);
    showScreen('topic-screen');
  }

  backToSubjectsFromGame() {
    closeAllModals();
    this.session = null;
    showScreen('subject-screen');
  }
}

// ── Inicialização ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  window.game = new GameSession();
  buildSubjectMenu();
  showScreen('subject-screen');

  // Botões de resposta
  document.getElementById('btn-true').addEventListener('click', () => window.game.answer(true));
  document.getElementById('btn-false').addEventListener('click', () => window.game.answer(false));

  // Botões de navegação
  document.getElementById('btn-continue').addEventListener('click', () => window.game.continueAfterResult());
  document.getElementById('btn-next-phase').addEventListener('click', () => window.game.continueToNextPhase());
  document.getElementById('btn-retry').addEventListener('click', () => window.game.retryPhase());
  document.getElementById('btn-back-topics').addEventListener('click', () => {
    closeAllModals();
    showScreen('topic-screen');
  });
  document.getElementById('btn-back-subjects').addEventListener('click', () => {
    closeAllModals();
    showScreen('subject-screen');
  });
  document.getElementById('btn-complete-back').addEventListener('click', () => {
    closeAllModals();
    buildTopicList(window.game.session?.subjectId || Object.keys(EDITAL_DATABASE)[0]);
    showScreen('topic-screen');
  });
  document.getElementById('btn-topic-back').addEventListener('click', () => {
    showScreen('subject-screen');
  });
});
