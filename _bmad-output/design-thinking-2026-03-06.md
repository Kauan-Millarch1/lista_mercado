# Design Thinking Session: Lista de Compras para Mercado

**Date:** 2026-03-06
**Facilitator:** Kauan
**Design Challenge:** Projetar uma experiência web interativa, clara e confiável para consumidores criarem e usarem listas de compras de mercado com alta eficiência, usando componentes ShadCN e suporte a tema claro/escuro.

---

## ðŸŽ¯ Design Challenge

Desenhar uma interface de lista de compras para mercado, centrada no consumidor final, que permita adicionar/editar/remover itens com fluidez, leitura rápida e baixa fricção, com consistência visual em light/dark mode e base de componentes ShadCN para acelerar qualidade e manutenção.

---

## ðŸ‘¥ EMPATHIZE: Understanding Users

### User Insights

- Usuário principal (consumidor) prepara a lista antes de sair de casa, então precisa de fluxo rápido de planejamento.
- Estrutura de item desejada: nome, preço estimado, categoria (tag) e prioridade.
- Organização por categorias é central: usuário escolhe itens por painéis categorizados (fruta, carne, bebida etc.).
- Fluxo esperado: entrar no painel de categoria, abrir card do produto e clicar em selecionar para adicionar na lista.
- Usuário precisa de capacidade de filtrar por tags e priorizar itens já selecionados para orientar a compra no mercado.

### Key Observations

- A arquitetura da interface deve priorizar descoberta por categoria em vez de input livre como ponto principal.
- Cards de produto são um ponto crítico de decisão; CTA de seleção precisa ser evidente e com feedback imediato.
- O modelo de dados mínimo de item já está claro e suporta filtros e ordenação por prioridade.
- A experiência precisa reduzir carga cognitiva: ver categorias primeiro, depois detalhes do item.
- O requisito de interatividade deve se traduzir em ações objetivas (selecionar, filtrar, priorizar), não em animação excessiva.

### Empathy Map Summary

Says (Diz):
- "Quero montar tudo antes de sair."
- "Preciso separar por tipo de produto para não esquecer nada."

Thinks (Pensa):
- "Se ficar bagunçado, vou perder tempo no mercado."
- "Quero saber o que é mais importante comprar primeiro."

Does (Faz):
- Navega por categorias de produtos.
- Abre cards de itens e seleciona para a lista.
- Usa tags e prioridade para organizar a compra.

Feels (Sente):
- Quer controle e clareza antes da compra.
- Frustração quando a lista não está bem organizada.
- Confiança quando consegue visualizar categorias e prioridades com facilidade.

---

## ðŸŽ¨ DEFINE: Frame the Problem

### Point of View Statement

Consumidor que organiza compras antes de sair de casa precisa montar e priorizar uma lista por categorias de forma muito rápida e visual, porque quer reduzir esquecimento de itens, ganhar controle do gasto estimado e chegar ao mercado com um plano claro.

### How Might We Questions

- Como poderíamos permitir que o usuário monte a lista completa em poucos toques sem perder controle dos detalhes?
- Como poderíamos tornar a navegação por categorias mais rápida do que digitar item por item?
- Como poderíamos destacar prioridade e itens essenciais sem poluir a interface?
- Como poderíamos mostrar preço estimado e impacto no total no momento da seleção do item?
- Como poderíamos fazer filtros por tags serem intuitivos para uso no celular?
- Como poderíamos manter a experiência igualmente clara em light mode e dark mode?
- Como poderíamos transformar o card de produto em uma decisão instantânea (ver, entender, adicionar)?

### Key Insights

- O problema central não é só "adicionar itens", é planejar compra com confiança antes de sair.
- Categoria é o eixo principal de descoberta; busca textual entra como apoio.
- Prioridade e preço estimado precisam aparecer cedo no fluxo para orientar decisão.
- Interatividade deve significar feedback rápido de ação (selecionado, priorizado, filtrado), não excesso de efeitos visuais.
- Mobile-first é fundamental, com alvos de toque grandes e leitura imediata.
- A base de design deve ser consistente via ShadCN para escalar telas sem quebrar padrão.

---

## ðŸ’¡ IDEATE: Generate Solutions

### Selected Methods

- Brainstorming estruturado: gerar volume e variedade de soluções sem julgamento inicial.
- Crazy 8s: explorar rapidamente variações de layout para catálogo, card e lista ativa.
- SCAMPER: adaptar padrões conhecidos de lista/compras para aumentar clareza e velocidade.
- Analogous Inspiration: usar referências de apps de tarefas e streaming (descoberta por categorias) para navegação fluida.

### Generated Ideas

1. Barra de categorias em tabs com ícones (frutas, carnes, bebidas etc.).
2. Grid de produtos com card compacto (nome, faixa de preço, tag de categoria).
3. Card detalhado em modal/sheet com botão primário "Adicionar à lista".
4. Seletor de prioridade no card (Alta, Média, Baixa) com cores semânticas.
5. Filtro por tags em chips selecionáveis (multi-seleção).
6. Busca rápida no catálogo com destaque de categoria no resultado.
7. Lista ativa com agrupamento por categoria e ordenação por prioridade.
8. Toggle "ver apenas prioritários" na lista ativa.
9. Badge de quantidade de itens selecionados por categoria.
10. Feedback instantâneo ao adicionar item (toast + atualização de contador).
11. Barra fixa com total estimado da lista.
12. Edição inline de preço estimado por item já adicionado.
13. Modo "compras" para marcar item comprado com um toque (checkbox grande).
14. Histórico de itens frequentes sugeridos no topo da categoria.
15. Sugestões de combinação de itens (comprados juntos) no card.
16. Atalho "Adicionar todos os itens prioritários".
17. Estado vazio guiado com CTA para começar por categoria.
18. Tema dark/light com troca imediata e persistência de preferência.
19. Painel dashboard com mini-gráficos de gasto estimado por categoria.
20. Tooltips curtos explicando prioridade, tags e total estimado.

### Top Concepts

- Conceito 1: Catálogo por Categorias + Card de Seleção Rápida
Descrição: navegação principal em tabs de categorias com cards simples e ação de adicionar no detalhe.
Valor: reduz fricção cognitiva e acelera montagem da lista.

- Conceito 2: Lista Ativa Inteligente com Prioridade e Filtros por Tags
Descrição: lista agrupada por categoria, filtros rápidos e destaque visual para itens de alta prioridade.
Valor: aumenta controle e organização antes e durante a compra.

- Conceito 3: Painel de Controle de Gasto com Feedback Imediato
Descrição: total estimado sempre visível, variação por categoria e mini-gráficos no dashboard.
Valor: conecta decisão de item com impacto financeiro em tempo real.

---

## ðŸ› ï¸ PROTOTYPE: Make Ideas Tangible

### Prototype Approach

Protótipo de baixa fidelidade evolutivo (wireframe -> UI funcional), com foco em fluxos críticos:
- Fluxo A: escolher categoria -> abrir card -> adicionar item com prioridade.
- Fluxo B: filtrar lista por tags/prioridade -> revisar total estimado.
- Fluxo C: alternar tema light/dark e validar legibilidade/contraste.

Base técnica visual (ShadCN):
- Navegação e estrutura: Tabs, Card, Sheet/Dialog, Separator.
- Ações: Button, Dropdown Menu, Tooltip.
- Seleção e filtros: Checkbox, Badge, Toggle Group, Input, Select.
- Feedback: Toast/Sonner, Skeleton.
- Dados visuais: Chart (Recharts + estilo ShadCN) no dashboard.

### Prototype Description

Protótipo contendo 3 telas principais:
1. Catálogo
- Tabs de categoria no topo.
- Grid de cards de produtos com nome, preço estimado e tag.
- Ação de abrir detalhe do produto.

2. Detalhe do Produto (card/modal)
- Informações essenciais do item.
- Controle de prioridade.
- Botão principal "Adicionar à lista".

3. Lista Ativa + Dashboard Resumido
- Itens agrupados por categoria com checkbox de comprado.
- Filtros por tags e prioridade.
- Total estimado atualizado em tempo real.
- Mini-gráfico por categoria (participação no total).
- Alternância light/dark global.

### Key Features to Test

- Entendimento imediato da navegação por categorias.
- Velocidade para adicionar 5 itens com prioridade.
- Clareza dos filtros por tags/prioridade.
- Compreensão do total estimado e impacto por categoria.
- Facilidade de marcar itens comprados com um toque.
- Legibilidade e contraste no dark mode e no light mode.
- Feedback percebido após ação (adicionar, filtrar, priorizar).

---

## âœ… TEST: Validate with Users

### Testing Plan

- Perfil de teste: consumidores que fazem compras semanais de mercado.
- Cenários de tarefa:
  1. Montar lista com 8 itens em 3 categorias.
  2. Definir prioridade alta para itens essenciais.
  3. Filtrar por uma categoria e por prioridade.
  4. Alternar tema e continuar usando sem perder contexto.
  5. Marcar itens como comprados no modo lista.
- Coleta de dados:
  - Taxa de conclusão por tarefa.
  - Erros e hesitações por etapa.
  - Tempo relativo entre usuários (comparativo interno, sem promessa externa).
  - Feedback qualitativo de clareza e confiança.

### User Feedback

Feedback inicial esperado a validar em testes reais:
- Positivo: organização por categoria facilita lembrar itens.
- Positivo: prioridade ajuda a decidir o que não pode faltar.
- Positivo: total estimado dá sensação de controle de gasto.
- Atenção: excesso de filtros pode confundir se não houver hierarquia visual.
- Atenção: card de produto precisa CTA muito claro em mobile.
- Atenção: dark mode deve manter contraste alto em tags e textos secundários.

### Key Learnings

- Categoria + prioridade forma o núcleo da experiência.
- O usuário valoriza previsibilidade do fluxo mais do que elementos visuais chamativos.
- A ação primária de adicionar item deve estar sempre evidente.
- Informação financeira (preço e total estimado) precisa aparecer cedo e de forma persistente.
- Consistência entre componentes ShadCN reduz esforço de aprendizado entre telas.

---

## ðŸš€ Next Steps

### Refinements Needed

- Refinar hierarquia visual do card de produto para destacar decisão principal.
- Ajustar densidade de informação na lista ativa para não sobrecarregar mobile.
- Simplificar camada de filtros (tags + prioridade) com defaults inteligentes.
- Definir padrões de estado (loading, vazio, erro, sucesso) para todas as telas.
- Padronizar tokens de cor para garantir equivalência entre dark/light.

### Action Items

1. Mapear design system mínimo em ShadCN (Button, Card, Tabs, Checkbox, Badge, Input, Select, Dialog/Sheet, Tooltip, Chart).
2. Criar wireframe navegável de Catálogo, Card de Produto e Lista Ativa.
3. Implementar protótipo funcional de fluxo "categoria -> card -> adicionar".
4. Implementar filtros por tags/prioridade e ordenação por categoria.
5. Implementar dark/light mode com persistência de tema.
6. Implementar dashboard resumido com gráfico de categorias e total estimado.
7. Rodar testes com usuários e registrar fricções por tarefa.
8. Priorizar correções por impacto na clareza e velocidade de uso.

### Success Metrics

- >= 90% dos usuários conseguem adicionar item pelo card sem ajuda.
- >= 85% conseguem aplicar filtro por tag e prioridade sem erro.
- >= 90% entendem o total estimado e onde ele é atualizado.
- >= 85% consideram a navegação por categorias "clara" ou "muito clara".
- >= 80% relatam experiência equivalente entre light e dark mode.
- Redução de passos médios para montar lista completa após iteração.

---

_Generated using BMAD Creative Intelligence Suite - Design Thinking Workflow_



