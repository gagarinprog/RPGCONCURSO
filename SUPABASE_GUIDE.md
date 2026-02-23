# 🗄️ SUPABASE_GUIDE – Guia de Integração Supabase

## O que é o Supabase?

O [Supabase](https://supabase.com) é uma plataforma de backend open-source baseada em PostgreSQL. No InfraRPG, ele armazena questões na nuvem, permitindo adicionar/editar questões sem alterar o código.

---

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **"New Project"**
3. Escolha nome, senha e região (prefira `South America (São Paulo)`)
4. Aguarde ~2 minutos para o projeto ser criado

---

## 2. Criar as Tabelas

1. No painel do projeto, vá em **SQL Editor**
2. Clique em **"New Query"**
3. Cole o conteúdo de `supabase/schema.sql`
4. Clique em **"Run"** (▶)

Isso criará as tabelas `questions`, `user_progress` e `question_stats`, além de índices e políticas RLS.

---

## 3. Obter as Chaves de API

No painel do Supabase, vá em **Project Settings → API**:

- **URL**: `https://xxxxxxxxxxxx.supabase.co`
- **anon (public) key**: chave pública para uso no browser
- **service_role key**: chave privada para scripts de importação (nunca expor no browser)

---

## 4. Configurar o Projeto Local

```bash
cp .env.example .env
```

Edite `.env`:
```
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
```

---

## 5. Importar Questões Existentes

```bash
# Instalar dependências
npm install

# Importar todas as questões do database.js para o Supabase
SUPABASE_URL=<url> SUPABASE_SERVICE_KEY=<service_key> npm run import
```

O script `scripts/import-to-supabase.js` processa o `EDITAL_DATABASE` do `data/database.js` e insere em lotes de 50 questões.

---

## 6. Integração com o Jogo

O arquivo `js/supabase-client.js` contém o cliente. Para ativá-lo no jogo, configure as variáveis `__SUPABASE_URL__` e `__SUPABASE_KEY__` via um passo de build ou diretamente no arquivo.

**Fluxo de prioridade:**
1. O jogo tenta buscar questões no Supabase
2. Se falhar (offline, chave não configurada), usa `data/database.js` automaticamente

---

## 7. Adicionar Questões pelo Painel

1. No Supabase, vá em **Table Editor → questions**
2. Clique em **"Insert row"**
3. Preencha os campos:
   - `subject`: chave da matéria (ex: `inflacao`, `fiscal`)
   - `topic_id`: ID do tópico (ex: `metas_inflacao`)
   - `topic_label`: nome do tópico
   - `statement`: texto da afirmação
   - `answer`: `true` ou `false`
   - `explanation`: explicação da resposta
   - `reference`: fonte/referência

---

## 8. Políticas de Segurança (RLS)

O schema já configura Row Level Security:

| Tabela | Regra |
|--------|-------|
| `questions` | Questões ativas são públicas para leitura |
| `user_progress` | Usuário acessa apenas seu próprio progresso |
| `question_stats` | Leitura pública; escrita via RPC |

---

## 9. Sistema de Autenticação (Futuro)

O Supabase oferece autenticação nativa (email, OAuth, magic link). Para habilitar progresso na nuvem:

1. Ative um provedor em **Authentication → Providers**
2. Use `supabase.auth.signInWithOtp({ email })` no jogo
3. O `user_id` obtido autentica o `user_progress`

---

## Troubleshooting Supabase

| Problema | Causa | Solução |
|----------|-------|---------|
| `row violates row-level security policy` | RLS bloqueando inserção anônima | Adicione política permissiva para inserção ou use service_key |
| `relation "questions" does not exist` | Schema não executado | Execute `supabase/schema.sql` |
| Questões não aparecem no jogo | Chave não configurada | Verifique `supabase-client.js` ou use banco local |
| CORS error | URL incorreta | Confirme `SUPABASE_URL` no painel |
