# 🏗️ PROJECT_STRUCTURE – Arquitetura Técnica

## Visão Geral

O InfraRPG é uma aplicação web estática com Progressive Enhancement:
- **Funciona offline** via Service Worker + banco local
- **Melhora quando online** via integração Supabase
- **Instalável** como PWA no Android e iOS

---

## Detalhamento de Cada Arquivo

### `index.html` (~6 KB)
HTML semântico e limpo. Responsável pela estrutura de telas (screens) e modais.
- Não contém CSS inline nem JavaScript (exceto inicialização mínima)
- Telas: `subject-screen`, `topic-screen`, `game-screen`
- Modais: `result-modal`, `phase-modal`, `complete-modal`, `gameover-modal`
- Carrega scripts na ordem: `database.js` → `constants.js` → `ui.js` → `game.js`

### `css/styles.css` (~16 KB)
Todos os estilos organizados em seções:
1. Variáveis CSS (tokens de design)
2. Reset e base
3. Layout principal
4. Navbar
5. Tela de seleção de matéria / tópico
6. Tela de jogo (HP bar, phase bar, question card)
7. Modais
8. Toast notifications
9. Animações (fadeIn, slideUp, shake, flash-green, flash-red, float)
10. Media queries (mobile)

### `js/constants.js`
Configurações globais do jogo:
- `CORRECT_PER_PHASE`: acertos necessários para avançar de fase (padrão: 5)
- `MAX_WRONG_PER_PHASE`: erros antes de "game over" (padrão: 3)
- `PHASES_PER_TOPIC`: fases por tópico (padrão: 3)
- `STORAGE_KEY`: chave do localStorage
- `GAME_VERSION`: versão para invalidar cache

### `js/ui.js`
Funções de interface sem estado:
- `showScreen(id)` – troca de tela ativa
- `openModal(id)` / `closeModal(id)` / `closeAllModals()` – controle de modais
- `setHP(current, max)` – atualiza barra de HP
- `setPhaseProgress(current, max)` – barra de progresso da fase
- `showToast(msg, type)` – notificações temporárias
- `shake(id)` / `flashGreen(id)` / `flashRed(id)` – feedback visual
- `buildSubjectMenu()` – renderiza grid de matérias
- `buildTopicList(key)` – lista tópicos de uma matéria
- `loadProgress()` / `saveProgress(key, data)` – localStorage

### `js/game.js`
Classe `GameSession` – motor principal:
- `selectSubject(key)` → mostra tela de tópicos
- `startSession(subjectKey, topicId)` → inicia sessão de jogo
- `_loadQuestion()` → carrega questão (Supabase → fallback local)
- `_pickIndex(poolLength)` → seleção inteligente sem repetição imediata
- `answer(bool)` → processa resposta, atualiza HP e progresso
- `_advancePhase()` → avança fase, salva progresso
- `_completeTopic()` → celebra conclusão do tópico
- `_gameOver()` → exibe modal de derrota

### `js/supabase-client.js`
Cliente assíncrono do Supabase com três métodos exportados via `gameAPI`:
- `fetchQuestions(subject, topicId)` → retorna array de questões no formato do jogo
- `saveProgress(userId, topicId, data)` → persiste progresso na nuvem
- `logAnswer(questionId, correct)` → atualiza estatísticas via RPC

### `data/database.js`
Banco de questões offline (50+ questões em 6 matérias). Exporta `EDITAL_DATABASE` como variável global. Estrutura:
```
EDITAL_DATABASE[subjectKey] = {
  label, icon, color,
  topics: [{ id, label, pool: [{ t, a, e, r }] }]
}
```

---

## Fluxo de Execução

```
Usuário abre index.html
  └─ DOMContentLoaded (game.js)
       ├─ window.game = new GameSession()
       ├─ buildSubjectMenu() → renderiza cards
       └─ showScreen('subject-screen')

Usuário clica em matéria
  └─ game.selectSubject(key)
       └─ buildTopicList(key) + showScreen('topic-screen')

Usuário clica em tópico
  └─ game.startSession(key, topicId)
       ├─ Carrega progresso do localStorage
       ├─ showScreen('game-screen')
       └─ game._loadQuestion()
            ├─ Tenta Supabase (import supabase-client.js)
            │    └─ Em caso de falha → usa EDITAL_DATABASE
            └─ game._showQuestion(q)

Usuário responde
  └─ game.answer(bool)
       ├─ Feedback visual (flash/shake)
       ├─ Atualiza HP e barras
       ├─ openModal('result-modal')
       └─ Se correctInPhase >= CORRECT_PER_PHASE → _advancePhase()
          Se HP <= 0 → _gameOver()
```

---

## Paleta de Cores

| Variável CSS | Valor | Uso |
|---|---|---|
| `--bg-deep` | `#0a0e1a` | Fundo da página |
| `--bg-dark` | `#0f172a` | Fundo navbar/tracks |
| `--bg-card` | `#1e293b` | Cards e itens |
| `--bg-modal` | `#162032` | Fundo de modais |
| `--accent-purple` | `#7c3aed` | Cor principal / botões |
| `--accent-amber` | `#f59e0b` | Fases / títulos RPG |
| `--accent-green` | `#10b981` | Certo / HP |
| `--accent-red` | `#ef4444` | Errado / Game Over |
| `--accent-blue` | `#3b82f6` | Toasts info |

---

## Guidelines de Manutenção

1. **Não adicione dependências NPM** para funcionalidade do browser. O jogo deve rodar sem build step.
2. **Mantenha o HTML < 10 KB**. Toda lógica vai em arquivos JS separados.
3. **Questões novas** vão em `data/database.js` (local) e/ou Supabase (nuvem).
4. **Novas matérias** seguem a estrutura do `EDITAL_DATABASE` em `database.js`.
5. **CSS**: use variáveis CSS existentes. Não adicione cores hardcoded.
6. **Service Worker**: atualize `CACHE_NAME` ao mudar arquivos cacheados (ex: `infra-rpg-v3`).
