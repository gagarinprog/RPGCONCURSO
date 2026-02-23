# ✅ QUALITY_GUIDE – Guia de Qualidade das Questões

## Por Que a Qualidade Importa?

Questões mal elaboradas confundem o estudante e comprometem a eficácia do jogo. Questões de alta qualidade:
- Testam compreensão genuína, não memorização de palavras-chave
- Têm explicações que ensinam, não apenas confirmam
- São baseadas em fontes verificáveis

---

## Análise Crítica das Questões Atuais

### ✅ Pontos Positivos
- Questões baseadas em bancas reais (CEBRASPE/CESPE)
- Explicações detalhadas com base legal
- Referências a leis e normas específicas
- Cobertura de 6 grandes áreas do edital

### ⚠️ Pontos de Melhoria
- Algumas questões são longas demais para o formato mobile
- Falta de tags para filtrar por dificuldade
- Poucas questões de nível difícil (difficulty 4-5)
- Tópicos sem questões sobre cálculos práticos

---

## Exemplos: Questão Boa vs. Ruim

### ❌ Questão Ruim
```
"O PIB existe no Brasil."
Resposta: CERTO
Explicação: Sim, o PIB existe.
```
**Problemas:** Trivial, não testa conhecimento, explicação inútil.

### ✅ Questão Boa
```
"O deflator do PIB e o IPCA são medidas de inflação idênticas,
pois ambos medem a variação de preços na economia brasileira."
Resposta: ERRADO
Explicação: São medidas distintas. O deflator do PIB considera todos os bens
e serviços produzidos internamente (inclusive exportações, excluindo importações).
O IPCA mede apenas a variação de preços de uma cesta de consumo das famílias
urbanas de baixa e média renda.
Referência: IBGE – Metodologia de Índices de Preços
```
**Qualidades:** Afirmação plausível (erro comum), explicação didática, fonte específica.

---

## Template de Questão de Qualidade

```javascript
{
  t: '[Afirmação completa e bem formulada, testando conceito específico]',
  a: true,  // ou false
  e: '[Explicação que ENSINA: por que certo/errado, como funciona o conceito, comparações relevantes]',
  r: '[Lei/Norma/Autor, capítulo/artigo específico]'
}
```

### Checklist Antes de Adicionar uma Questão:
- [ ] A afirmação é clara e sem ambiguidade?
- [ ] Teste: alguém que estudou o tema conseguiria responder?
- [ ] A explicação ensina algo, mesmo para quem acertou?
- [ ] A referência é verificável?
- [ ] A questão não é idêntica a outra já no banco?

---

## Sistema de Tags Proposto

Adicione tags para facilitar filtragem futura:

| Tag | Significado |
|-----|-------------|
| `conceitual` | Definição ou conceito puro |
| `normativo` | Baseada em lei, decreto, resolução |
| `calculo` | Envolve raciocínio quantitativo |
| `comparativo` | Compara dois conceitos/institutos |
| `armadilha` | Questão com pegadinha clássica de banca |
| `dificil` | Nível avançado, exige profundidade |

Exemplo no banco:
```javascript
{
  t: '...',
  a: false,
  e: '...',
  r: '...',
  // Nos dados do Supabase:
  // tags: ['normativo', 'armadilha'],
  // difficulty: 3
}
```

---

## Roadmap de Melhorias de Conteúdo

| Prioridade | Ação |
|-----------|------|
| 🔴 Alta | Adicionar 10+ questões por tópico (mínimo 15) |
| 🔴 Alta | Criar questões de dificuldade 4-5 para cada tópico |
| 🟡 Média | Adicionar tópicos: Microeconomia Avançada, Econometria |
| 🟡 Média | Incluir questões com gráficos descritos em texto |
| 🟢 Baixa | Sistema de votação de qualidade pelos usuários |
| 🟢 Baixa | Questões com múltiplas referências cruzadas |
