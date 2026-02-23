# ⚔️ InfraRPG – RPG do Concurseiro

> Prepare-se para concursos de economia em formato RPG. Responda questões de Verdadeiro/Falso e avance de fase derrotando desafios do edital!

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-7c3aed)](#) [![Supabase](https://img.shields.io/badge/Supabase-Integrado-10b981)](#) [![Offline First](https://img.shields.io/badge/Offline-First-f59e0b)](#)

---

## 🎮 Visão Geral

O **InfraRPG** é um jogo educativo no estilo RPG para quem estuda para concursos públicos de economia (BACEN, Receita Federal, BNDES, etc.). O jogador escolhe uma matéria, enfrenta fases de questões Verdadeiro/Falso e avança conforme acerta respostas.

**Funcionalidades:**
- 🗃️ Banco local com 50+ questões sobre 6 temas do edital
- ☁️ Integração com Supabase para questões dinâmicas (quando online)
- 📱 PWA: instalável no celular, funciona offline
- 💾 Progresso salvo automaticamente no navegador (localStorage)
- ♻️ Fallback automático: sem Supabase → usa banco local

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ (apenas para o servidor de desenvolvimento)
- Navegador moderno

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/gagarinprog/RPGCONCURSO.git
cd RPGCONCURSO

# 2. Inicie o servidor local (necessário para módulos ES)
npm run dev
# ou: npx serve -l 3000 .

# 3. Acesse no navegador
# http://localhost:3000
```

> ⚠️ Abrir `index.html` diretamente pelo sistema de arquivos (`file://`) pode causar erros com módulos ES. Use sempre um servidor local.

---

## ➕ Como Adicionar Questões

### Opção 1: Banco Local (sem Supabase)

Edite `data/database.js` e adicione questões no array `pool` do tópico desejado:

```javascript
{
  t: 'Afirmação da questão aqui.',
  a: true,           // true = CERTO, false = ERRADO
  e: 'Explicação detalhada da resposta.',
  r: 'Fonte/Referência (ex: CF/88, art. 150)'
}
```

### Opção 2: Via Supabase (nuvem)

1. Configure o Supabase (veja [SUPABASE_GUIDE.md](SUPABASE_GUIDE.md))
2. Execute: `SUPABASE_URL=... SUPABASE_SERVICE_KEY=... npm run import`

---

## 📂 Estrutura de Pastas

```
RPGCONCURSO/
├── index.html          # HTML principal (< 6 KB)
├── manifest.json       # Configuração PWA
├── sw.js               # Service Worker (cache offline)
├── package.json        # Scripts npm
├── .env.example        # Modelo de variáveis de ambiente
├── css/
│   └── styles.css      # Todos os estilos (16 KB)
├── js/
│   ├── constants.js    # Configurações globais do jogo
│   ├── ui.js           # Funções de interface
│   ├── game.js         # Motor principal (GameSession)
│   └── supabase-client.js  # Integração Supabase
├── data/
│   └── database.js     # Questões offline (fallback)
├── assets/
│   └── icon.svg        # Ícone PWA
├── supabase/
│   ├── schema.sql      # Criação das tabelas
│   ├── seed.sql        # Dados iniciais de exemplo
│   └── migrations/     # Migrações SQL numeradas
└── scripts/
    └── import-to-supabase.js  # Importação em lote
```

---

## 🔧 Troubleshooting

| Problema | Solução |
|----------|---------|
| Jogo não carrega questões | Verifique o console do navegador. Tente recarregar com `Ctrl+Shift+R`. |
| Questões aparecem repetidas | Limpe o cache com `localStorage.clear()` no console. |
| PWA não instala | Serve o site via HTTPS ou localhost, nunca via `file://`. |
| Supabase retorna erro | Confirme URL e chave em `.env`; verifique políticas RLS no Supabase. |
| Service Worker antigo | Vá em DevTools → Application → Service Workers → "Unregister". |

---

## 📚 Documentação Adicional

- [SUPABASE_GUIDE.md](SUPABASE_GUIDE.md) – Configuração completa do Supabase
- [QUALITY_GUIDE.md](QUALITY_GUIDE.md) – Boas práticas para criação de questões
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) – Arquitetura técnica detalhada
- [RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md) – Comparativo antes/depois e métricas

---

## 📄 Licença

MIT – use, modifique e distribua à vontade.
