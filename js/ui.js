// === InfraRPG – Funções de Interface ===

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(screenId);
  if (el) el.classList.remove('hidden');
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('visible'));
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('visible');
    modal.addEventListener('transitionend', () => { modal.style.display = 'none'; }, { once: true });
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => {
    m.classList.remove('visible');
    m.style.display = 'none';
  });
}

function setHP(current, max) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const bar = document.getElementById('hp-bar');
  const label = document.getElementById('hp-label');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = `${current}/${max} HP`;
}

function setPhaseProgress(current, max) {
  const bar = document.getElementById('phase-bar');
  const label = document.getElementById('phase-label');
  if (bar) bar.style.width = `${Math.min(100, (current / max) * 100)}%`;
  if (label) label.textContent = `${current}/${max} corretas`;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function shake(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add('shake');
  el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
}

function flashGreen(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add('flash-green');
  el.addEventListener('animationend', () => el.classList.remove('flash-green'), { once: true });
}

function flashRed(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add('flash-red');
  el.addEventListener('animationend', () => el.classList.remove('flash-red'), { once: true });
}

function buildSubjectMenu() {
  const grid = document.getElementById('subject-grid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.entries(EDITAL_DATABASE).forEach(([key, subject]) => {
    const card = document.createElement('button');
    card.className = 'subject-card';
    card.style.setProperty('--card-color', subject.color || '#7c3aed');
    card.innerHTML = `
      <span class="subject-icon">${subject.icon || '📚'}</span>
      <span class="subject-label">${subject.label}</span>
      <span class="subject-topics">${subject.topics.length} tópico(s)</span>
    `;
    card.addEventListener('click', () => {
      if (typeof window.game !== 'undefined') {
        window.game.selectSubject(key);
      }
    });
    grid.appendChild(card);
  });
}

function buildTopicList(subjectKey) {
  const subject = EDITAL_DATABASE[subjectKey];
  if (!subject) return;
  const container = document.getElementById('topic-list');
  const title = document.getElementById('subject-title');
  if (title) title.textContent = subject.label;
  if (!container) return;
  container.innerHTML = '';

  const progress = loadProgress();

  subject.topics.forEach(topic => {
    const topicProgress = progress[`${subjectKey}_${topic.id}`] || { phase: 1, correct_in_phase: 0 };
    const isCompleted = topicProgress.phase > PHASES_PER_TOPIC;
    const item = document.createElement('button');
    item.className = `topic-item${isCompleted ? ' completed' : ''}`;
    item.innerHTML = `
      <div class="topic-info">
        <span class="topic-label">${topic.label}</span>
        <span class="topic-progress">Fase ${Math.min(topicProgress.phase, PHASES_PER_TOPIC)}/${PHASES_PER_TOPIC}${isCompleted ? ' ✅' : ''}</span>
      </div>
      <span class="topic-questions">${topic.pool.length} questões</span>
    `;
    item.addEventListener('click', () => {
      if (typeof window.game !== 'undefined') {
        window.game.startSession(subjectKey, topic.id);
      }
    });
    container.appendChild(item);
  });
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(key, data) {
  try {
    const all = loadProgress();
    all[key] = { ...all[key], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore storage errors */
  }
}
