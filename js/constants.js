// === InfraRPG – Configurações Globais ===

// Quantas respostas certas são necessárias para avançar de fase
const CORRECT_PER_PHASE = 5;

// Número máximo de questões erradas antes do "game over" na fase
const MAX_WRONG_PER_PHASE = 3;

// Número de fases por tópico antes de desbloquear o próximo
const PHASES_PER_TOPIC = 3;

// Chave do localStorage para o progresso do usuário
const STORAGE_KEY = 'infra_rpg_progress';

// Versão do jogo (usada para invalidar cache local em atualizações)
const GAME_VERSION = '2.0.0';
