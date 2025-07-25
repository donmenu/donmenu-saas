# 💰 Sistema de Precificação Automática - Don Menu

## 🎯 Visão Geral

O sistema de precificação automática do Don Menu permite calcular preços de venda baseados nos custos dos ingredientes e na margem desejada. Isso garante que seus produtos sejam lucrativos e competitivos.

## 🔄 Fluxo de Trabalho

### 1. **Criar Insumos** 🥕
- Cadastre todos os ingredientes utilizados
- Defina o custo por unidade de cada ingrediente
- Exemplo: Carne Bovina - R$ 25,00/kg

### 2. **Criar Fichas Técnicas** 📝
- Defina as receitas dos seus produtos
- Adicione ingredientes e quantidades
- O sistema calcula automaticamente o custo total

### 3. **Criar Itens do Cardápio** 🍽️
- Associe uma ficha técnica ao item
- Defina a margem desejada
- O sistema calcula o preço sugerido automaticamente

## 📊 Exemplo Prático

### Insumos Cadastrados:
- **Carne Bovina**: R$ 25,00/kg
- **Queijo Cheddar**: R$ 35,00/kg  
- **Alface**: R$ 2,00/un

### Ficha Técnica - X-Burger:
- **Carne**: 0,15 kg × R$ 25,00 = R$ 3,75
- **Queijo**: 0,03 kg × R$ 35,00 = R$ 1,05
- **Alface**: 0,5 un × R$ 2,00 = R$ 1,00
- **Custo Total**: R$ 5,80 por porção

### Precificação Automática:
- **Margem Desejada**: 60%
- **Preço Sugerido**: R$ 5,80 ÷ (1 - 0,60) = R$ 14,50
- **Lucro Bruto**: R$ 14,50 - R$ 5,80 = R$ 8,70
- **Margem Real**: 60%

## 🛠️ APIs Implementadas

### 1. **API de Insumos** (`/api/ingredients`)
```typescript
// POST - Criar insumo
{
  "name": "Carne Bovina",
  "unit": "kg",
  "cost_per_unit": 25.00,
  "description": "Carne bovina moída",
  "supplier": "Frigorífico Silva"
}
```

### 2. **API de Fichas Técnicas** (`/api/ficha-tecnica`)
```typescript
// POST - Criar ficha técnica
{
  "name": "X-Burger Clássico",
  "description": "Hambúrguer com queijo e salada",
  "yield_quantity": 1,
  "yield_unit": "un",
  "ingredients": [
    {
      "ingredient_id": 1,
      "quantity": 0.15,
      "unit": "kg"
    }
  ]
}
```

### 3. **API de Cardápios** (`/api/cardapios`)
```typescript
// POST - Criar item com precificação automática
{
  "name": "X-Burger",
  "menu_id": 1,
  "recipe_id": 1,
  "desired_margin": 60,
  "manual_pricing": false
}
```

## 🎨 Interface Melhorada

### Componente: `add-cardapio-improved.tsx`

**Funcionalidades:**
- ✅ Seleção de cardápio
- ✅ Seleção de receita (opcional)
- ✅ Configuração de margem desejada
- ✅ Precificação automática ou manual
- ✅ Visualização de custos e lucros
- ✅ Lista de ingredientes da receita

**Campos do Formulário:**
1. **Nome do Item** (obrigatório)
2. **Cardápio** (obrigatório)
3. **Categoria** (opcional)
4. **Receita** (opcional - para precificação automática)
5. **Descrição** (opcional)
6. **Margem Desejada** (padrão: 60%)
7. **Preço Manual** (se habilitado)

## 📈 Cálculos Automáticos

### Fórmula de Precificação:
```
Preço Sugerido = Custo por Porção ÷ (1 - Margem Desejada / 100)
```

### Exemplo:
- **Custo por Porção**: R$ 5,80
- **Margem Desejada**: 60%
- **Preço Sugerido**: R$ 5,80 ÷ (1 - 0,60) = R$ 14,50

### Cálculos Adicionais:
- **Lucro Bruto**: Preço Final - Custo por Porção
- **Margem Real**: (Lucro Bruto ÷ Preço Final) × 100

## 🔒 Validações Implementadas

### Insumos:
- ✅ Nome obrigatório
- ✅ Unidade obrigatória
- ✅ Custo por unidade > 0
- ✅ Nome único por restaurante

### Fichas Técnicas:
- ✅ Nome obrigatório
- ✅ Quantidade de produção > 0
- ✅ Pelo menos um ingrediente
- ✅ Nome único por restaurante

### Itens do Cardápio:
- ✅ Nome obrigatório
- ✅ Cardápio obrigatório
- ✅ Receita ou preço manual obrigatório
- ✅ Nome único por cardápio

## 🧪 Testes Realizados

### Script: `test-pricing-system.js`

**Resultados:**
```
✅ Receita criada: X-Burger Teste
   Custo total: R$ 5.80
   Custo por porção: R$ 5.80

💰 Testando precificação automática...
   Margem desejada: 60%
   Custo por porção: R$ 5.80
   Preço sugerido: R$ 14.50
   Lucro bruto: R$ 8.70
   Margem real: 60.0%

✅ Item criado: X-Burger Teste
   Preço final: R$ 14.50
   Margem real: 60%
```

## 🚀 Como Usar

### 1. **Acesse o Dashboard**
```bash
http://localhost:3000/dashboard
```

### 2. **Cadastre Insumos**
- Vá para "Insumos"
- Clique em "Adicionar Insumo"
- Preencha nome, unidade e custo

### 3. **Crie Fichas Técnicas**
- Vá para "Fichas Técnicas"
- Clique em "Adicionar Ficha Técnica"
- Adicione ingredientes e quantidades

### 4. **Crie Itens do Cardápio**
- Vá para "Cardápios"
- Clique em "Adicionar Item"
- Selecione uma receita para precificação automática
- Ou defina preço manual

## 📊 Benefícios

### Para o Restaurante:
- ✅ **Precificação Consistente**: Todos os produtos seguem a mesma lógica
- ✅ **Controle de Custos**: Visibilidade total dos custos por produto
- ✅ **Lucratividade Garantida**: Margem mínima sempre respeitada
- ✅ **Flexibilidade**: Pode ajustar preços manualmente quando necessário

### Para o Cliente:
- ✅ **Preços Competitivos**: Baseados em custos reais
- ✅ **Transparência**: Sistema justo de precificação
- ✅ **Qualidade**: Produtos bem estruturados

## 🔧 Configurações

### Margem Padrão:
- **Valor**: 60%
- **Configurável**: Sim, por item
- **Recomendação**: 50-70% para restaurantes

### Unidades Suportadas:
- **Peso**: kg, g
- **Volume**: l, ml
- **Quantidade**: un, pct, cx, lata, garrafa

### Tipos de Cardápio:
- **Principal**: Cardápio completo
- **Delivery**: Especial para delivery
- **Sobremesas**: Apenas sobremesas
- **Personalizado**: Qualquer tipo

## 🐛 Troubleshooting

### Erro: "Receita não encontrada"
- **Solução**: Verifique se a receita existe e está ativa
- **Verificar**: Lista de fichas técnicas

### Erro: "Ingrediente não encontrado"
- **Solução**: Verifique se o ingrediente está cadastrado
- **Verificar**: Lista de insumos

### Erro: "Margem inválida"
- **Solução**: Use valores entre 0 e 100
- **Verificar**: Campo de margem desejada

### Preço muito alto/baixo
- **Solução**: Ajuste a margem desejada
- **Verificar**: Custos dos ingredientes

## 📝 Próximos Passos

### Funcionalidades Futuras:
1. **Histórico de Preços**: Acompanhar variações
2. **Precificação por Período**: Preços diferentes por horário
3. **Análise de Concorrência**: Comparar com mercado
4. **Relatórios de Rentabilidade**: Análises detalhadas
5. **Integração com Fornecedores**: Atualização automática de preços

### Melhorias Planejadas:
1. **Interface mais intuitiva**: Wizard de criação
2. **Templates de receitas**: Receitas pré-definidas
3. **Cálculo de impostos**: Inclusão automática
4. **Gestão de desperdícios**: Ajuste de custos
5. **Análise de sazonalidade**: Preços por época

---

**Status:** ✅ **FUNCIONANDO**
**Versão:** 1.0.0
**Última Atualização:** $(date)
**Funcionalidade:** ✅ **COMPLETA** 