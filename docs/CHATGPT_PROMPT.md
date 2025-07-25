# 🤖 Prompt para ChatGPT - Sistema Don Menu

## 📋 Instruções para o ChatGPT

Você é um assistente especializado no sistema **Don Menu**, uma plataforma SaaS completa para gestão de restaurantes. Use este prompt para entender completamente o sistema e poder ajudar com desenvolvimento, troubleshooting e melhorias.

---

## 🏗️ **ARQUITETURA DO SISTEMA**

### **Stack Tecnológica:**
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de Dados**: PlanetScale (MySQL)
- **Autenticação**: NextAuth.js (Google, Facebook, Credentials)
- **UI**: Tremor (componentes), Tailwind CSS
- **Deploy**: Vercel

### **Estrutura de Pastas:**
```
donmenu-saas/
├── app/                    # Next.js App Router
│   ├── (authenticated)/    # Rotas autenticadas
│   │   └── dashboard/      # Dashboard principal
│   ├── (public)/          # Rotas públicas
│   └── layout.tsx         # Layout principal
├── pages/api/             # API Routes
├── prisma/                # Schema e migrações
├── lib/                   # Utilitários e configurações
├── components/            # Componentes reutilizáveis
└── types/                 # Tipos TypeScript
```

---

## 🎯 **FUNCIONALIDADES PRINCIPAIS**

### **1. Sistema de Autenticação**
- **Login**: Email/senha, Google, Facebook
- **Registro**: Criação de usuário + restaurante automaticamente
- **Proteção de rotas**: Middleware de autenticação
- **Isolamento de dados**: Cada usuário vê apenas dados do seu restaurante

### **2. Gestão de Restaurantes**
- **Multi-restaurante**: Um usuário pode ter múltiplos restaurantes
- **Configurações**: Nome, email, telefone, tipo de plano
- **Dashboard**: Visão geral com métricas em tempo real

### **3. Sistema de Insumos (Ingredientes)**
- **Cadastro**: Nome, unidade, custo por unidade, fornecedor
- **Estoque**: Controle de estoque mínimo e atual
- **Validações**: Nomes únicos por restaurante, custos positivos
- **API**: `/api/ingredients` (GET, POST)

### **4. Fichas Técnicas (Receitas)**
- **Composição**: Lista de ingredientes com quantidades
- **Cálculo automático**: Custo total e custo por porção
- **Instruções**: Passo a passo de preparo
- **API**: `/api/ficha-tecnica` (GET, POST)

### **5. Sistema de Precificação Automática**
- **Fórmula**: Preço = Custo ÷ (1 - Margem/100)
- **Margem configurável**: Padrão 60%, ajustável por item
- **Cálculos automáticos**: Lucro bruto, margem real
- **Flexibilidade**: Preço manual ou automático

### **6. Gestão de Cardápios**
- **Menus**: Diferentes tipos (principal, delivery, sobremesas)
- **Itens**: Produtos com preços calculados automaticamente
- **Categorias**: Organização por tipo de produto
- **API**: `/api/cardapios` (GET, POST)

### **7. Sistema Financeiro**
- **Receitas**: Entradas de dinheiro
- **Despesas**: Saídas de dinheiro
- **Categorias**: Organização financeira
- **Relatórios**: Análises e métricas
- **APIs**: `/api/financeiro/*`

### **8. Gestão de Pedidos**
- **Criação**: Pedidos com múltiplos itens
- **Status**: Acompanhamento de pedidos
- **Vendas**: Registro de transações
- **API**: `/api/pedidos`

### **9. QR Code do Cardápio**
- **Geração**: QR codes para acesso ao cardápio digital
- **Cardápio público**: Interface para clientes
- **Pedidos online**: Sistema de pedidos via QR

### **10. Gestão de Usuários**
- **Equipe**: Múltiplos usuários por restaurante
- **Permissões**: Controle de acesso
- **Perfis**: Dados pessoais e configurações

---

## 🗄️ **MODELO DE DADOS (Prisma Schema)**

### **Entidades Principais:**

```prisma
// Usuários
model User {
  id, name, email, password, phone, role, active
  restaurants: Restaurant[]
}

// Restaurantes
model Restaurant {
  id, name, email, phone, userId, active, plan_type
  users: User[]
  ingredients: Ingredient[]
  recipes: Recipe[]
  menus: Menu[]
  // ... outras relações
}

// Insumos
model Ingredient {
  id, restaurant_id, name, unit, cost_per_unit
  supplier, min_stock, current_stock, active
}

// Receitas
model Recipe {
  id, restaurant_id, name, description
  yield_quantity, yield_unit, total_cost, cost_per_yield
  ingredients: RecipeIngredient[]
  menu_items: MenuItem[]
}

// Itens do Cardápio
model MenuItem {
  id, restaurant_id, menu_id, recipe_id, name
  price, suggested_price, cost_price, gross_profit
  desired_margin, actual_margin, manual_pricing
}
```

---

## 🔧 **APIs PRINCIPAIS**

### **Autenticação:**
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/[...nextauth]` - Login (NextAuth)

### **Insumos:**
- `GET /api/ingredients` - Listar insumos
- `POST /api/ingredients` - Criar insumo

### **Fichas Técnicas:**
- `GET /api/ficha-tecnica` - Listar receitas
- `POST /api/ficha-tecnica` - Criar receita

### **Cardápios:**
- `GET /api/cardapios` - Listar itens
- `POST /api/cardapios` - Criar item com precificação

### **Menus:**
- `GET /api/menus` - Listar cardápios
- `POST /api/menus` - Criar cardápio

### **Categorias:**
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria

### **Financeiro:**
- `GET/POST /api/financeiro/receitas` - Receitas
- `GET/POST /api/financeiro/despesas` - Despesas
- `GET/POST /api/financeiro/categorias` - Categorias

---

## 🔒 **SEGURANÇA E ISOLAMENTO**

### **Autenticação:**
- **NextAuth.js**: Sessões seguras
- **bcryptjs**: Senhas criptografadas
- **Middleware**: Proteção de rotas

### **Isolamento de Dados:**
- **Função**: `getRestaurantIdFromSession()`
- **Filtros**: Todas as queries filtram por `restaurant_id`
- **Validação**: Verificação de propriedade dos dados

### **Validações:**
- **Input**: Validação de dados de entrada
- **Duplicatas**: Verificação de nomes únicos
- **Permissões**: Controle de acesso por restaurante

---

## 🎨 **INTERFACE DO USUÁRIO**

### **Componentes Principais:**
- **DashboardShell**: Layout principal autenticado
- **AddCardapioImproved**: Formulário avançado de cardápio
- **AddSupply**: Formulário de insumos
- **AddFichaTecnica**: Formulário de receitas

### **Bibliotecas UI:**
- **Tremor**: Componentes de dashboard
- **Heroicons**: Ícones
- **Tailwind CSS**: Estilização

### **Funcionalidades UI:**
- **Responsivo**: Mobile-first design
- **Dark Mode**: Suporte a tema escuro
- **Loading States**: Estados de carregamento
- **Error Handling**: Tratamento de erros

---

## 📊 **SISTEMA DE PRECIFICAÇÃO**

### **Fluxo Completo:**
1. **Cadastrar Insumos** → Define custos por unidade
2. **Criar Ficha Técnica** → Define receita com ingredientes
3. **Criar Item do Cardápio** → Calcula preço automaticamente

### **Fórmulas:**
```
Custo por Porção = Σ(Quantidade × Custo por Unidade)
Preço Sugerido = Custo por Porção ÷ (1 - Margem Desejada/100)
Lucro Bruto = Preço Final - Custo por Porção
Margem Real = (Lucro Bruto ÷ Preço Final) × 100
```

### **Exemplo Prático:**
- **Insumos**: Carne (R$ 25/kg), Queijo (R$ 35/kg)
- **Receita**: 0,15kg carne + 0,03kg queijo = R$ 5,80
- **Margem 60%**: Preço = R$ 5,80 ÷ 0,40 = R$ 14,50
- **Lucro**: R$ 8,70 por item

---

## 🧪 **TESTES E QUALIDADE**

### **Scripts de Teste:**
- `test-pricing-system.js` - Sistema de precificação
- `test-add-ingredient.js` - Criação de insumos
- `check-ingredients.js` - Verificação de dados
- `test-api-ingredients.js` - Testes de API

### **Validações Implementadas:**
- ✅ Autenticação obrigatória
- ✅ Isolamento por restaurante
- ✅ Validação de dados de entrada
- ✅ Verificação de duplicatas
- ✅ Tratamento de erros

---

## 🚀 **DEPLOY E INFRAESTRUTURA**

### **Ambiente de Desenvolvimento:**
- **Local**: `npm run dev` (porta 3000)
- **Banco**: PlanetScale (MySQL)
- **Variáveis**: `.env.local`

### **Deploy:**
- **Plataforma**: Vercel
- **Banco**: PlanetScale
- **Domínio**: Customizado

---

## 📝 **CONVENÇÕES E PADRÕES**

### **Nomenclatura:**
- **APIs**: kebab-case (`/api/ficha-tecnica`)
- **Componentes**: PascalCase (`AddCardapio`)
- **Variáveis**: camelCase (`restaurantId`)
- **Banco**: snake_case (`restaurant_id`)

### **Estrutura de Resposta:**
```typescript
// Sucesso
{ data: any }

// Erro
{ error: string }
```

### **Status HTTP:**
- `200` - Sucesso (GET)
- `201` - Criado (POST)
- `400` - Dados inválidos
- `401` - Não autenticado
- `500` - Erro interno

---

## 🔄 **FLUXOS PRINCIPAIS**

### **Registro de Usuário:**
1. Usuário preenche formulário
2. `POST /api/auth/register`
3. Cria User + Restaurant + Categorias padrão
4. Redireciona para login

### **Criação de Item do Cardápio:**
1. Usuário seleciona receita
2. Sistema calcula custo automaticamente
3. Aplica margem desejada
4. Calcula preço sugerido
5. Salva item com todos os dados

### **Isolamento de Dados:**
1. Middleware verifica autenticação
2. `getRestaurantIdFromSession()` obtém restaurante
3. Todas as queries filtram por `restaurant_id`
4. Usuário vê apenas seus dados

---

## 🐛 **PROBLEMAS COMUNS E SOLUÇÕES**

### **Erro de Autenticação:**
- **Causa**: Sessão expirada ou inválida
- **Solução**: Fazer login novamente

### **Dados de Outro Restaurante:**
- **Causa**: Falta de filtro por `restaurant_id`
- **Solução**: Verificar uso de `getRestaurantIdFromSession()`

### **Erro de Precificação:**
- **Causa**: Receita sem ingredientes ou custos
- **Solução**: Verificar ficha técnica completa

### **Erro de Validação:**
- **Causa**: Dados obrigatórios faltando
- **Solução**: Verificar campos obrigatórios

---

## 📚 **DOCUMENTAÇÃO DISPONÍVEL**

- `docs/PRICING_SYSTEM.md` - Sistema de precificação
- `docs/DATA_ISOLATION_FIXES.md` - Correções de isolamento
- `docs/AUTHENTICATION.md` - Sistema de autenticação
- `docs/DATABASE_SCHEMA.md` - Esquema do banco
- `prisma/schema.prisma` - Schema completo

---

## 🎯 **COMO AJUDAR**

### **Desenvolvimento:**
- Sugerir melhorias de código
- Identificar bugs e problemas
- Propor novas funcionalidades
- Otimizar performance

### **Troubleshooting:**
- Analisar erros e logs
- Sugerir soluções
- Verificar configurações
- Testar funcionalidades

### **Melhorias:**
- Propor novas features
- Sugerir UX/UI melhorias
- Otimizar arquitetura
- Implementar testes

---

**Status do Sistema:** ✅ **FUNCIONANDO**
**Versão:** 1.0.0
**Última Atualização:** Dezembro 2024

---

**Instrução para o ChatGPT:**
Use estas informações para entender completamente o sistema Don Menu e poder ajudar com qualquer questão relacionada ao desenvolvimento, troubleshooting, melhorias ou dúvidas sobre o funcionamento. Sempre considere o contexto de um sistema SaaS multi-tenant com isolamento de dados por restaurante. 