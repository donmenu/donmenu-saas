# 🗄️ Modelo de Banco de Dados - Don Menu

## 📋 Visão Geral

O Don Menu utiliza um modelo de banco de dados relacional otimizado para **multi-tenancy**, onde cada restaurante tem seu próprio ambiente isolado. O sistema é construído com **Prisma ORM** e **MySQL**.

## 🏗️ Arquitetura Multi-Tenant

### Princípios
- **Isolamento**: Cada restaurante tem seus dados completamente isolados
- **Escalabilidade**: Suporte a milhares de restaurantes
- **Performance**: Índices otimizados para consultas frequentes
- **Flexibilidade**: Suporte a diferentes tipos de estabelecimentos

### Estratégia de Multi-Tenancy
- **Shared Database, Shared Schema**: Todos os restaurantes compartilham o mesmo banco e schema
- **Restaurant ID**: Campo `restaurant_id` em todas as tabelas para isolamento
- **Índices Compostos**: Otimização para consultas por restaurante

## 📊 Estrutura das Tabelas

### 🏪 1. Restaurants (Restaurantes)
**Tabela principal para identificação dos estabelecimentos**

```sql
- id: Identificador único
- name: Nome do restaurante
- cnpj: CNPJ (opcional, único)
- email: Email de contato
- phone: Telefone
- address: Endereço completo
- city/state/zip_code: Localização
- logo_url: URL do logo
- active: Status ativo/inativo
- plan_type: Tipo de plano (free, basic, premium)
- created_at/updated_at: Timestamps
```

### 👥 2. Users (Usuários)
**Usuários do sistema com diferentes níveis de acesso**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- name: Nome do usuário
- email: Email (único)
- password: Senha (null se Google)
- google_id: ID do Google (único)
- role: Papel (owner, manager, user)
- avatar_url: URL do avatar
- active: Status ativo/inativo
- last_login: Último login
- created_at/updated_at: Timestamps
```

### 📂 3. Categories (Categorias)
**Categorização de receitas e itens do cardápio**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- name: Nome da categoria
- description: Descrição
- color: Cor em hex
- icon: Ícone
- active: Status ativo/inativo
- sort_order: Ordem de exibição
- created_at/updated_at: Timestamps
```

### 🥕 4. Ingredients (Insumos)
**Ingredientes/insumos utilizados nas receitas**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- name: Nome do ingrediente
- description: Descrição
- unit: Unidade (kg, g, l, ml, un, pct)
- cost_per_unit: Custo por unidade
- supplier: Fornecedor
- min_stock: Estoque mínimo
- current_stock: Estoque atual
- active: Status ativo/inativo
- created_at/updated_at: Timestamps
```

### 📈 5. IngredientPrices (Histórico de Preços)
**Controle de histórico de preços dos ingredientes**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- ingredient_id: FK para ingrediente
- price: Preço
- supplier: Fornecedor
- valid_from: Data de início da validade
- valid_to: Data de fim da validade
- created_at: Timestamp
```

### 🍳 6. Recipes (Fichas Técnicas)
**Receitas com ingredientes e quantidades**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- category_id: FK para categoria
- name: Nome da receita
- description: Descrição
- yield_quantity: Quantidade que produz
- yield_unit: Unidade de produção
- preparation_time: Tempo de preparo (minutos)
- difficulty: Dificuldade (fácil, médio, difícil)
- instructions: Instruções de preparo
- image_url: URL da imagem
- active: Status ativo/inativo
- created_at/updated_at: Timestamps
```

### 🔗 7. RecipeIngredients (Ingredientes das Receitas)
**Relação muitos-para-muitos entre receitas e ingredientes**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- recipe_id: FK para receita
- ingredient_id: FK para ingrediente
- quantity: Quantidade necessária
- unit: Unidade da quantidade
- cost: Custo calculado
- notes: Observações
- created_at/updated_at: Timestamps
```

### 📋 8. Menus (Cardápios)
**Cardápios do restaurante**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- name: Nome do cardápio
- description: Descrição
- type: Tipo (almoço, jantar, delivery, etc.)
- active: Status ativo/inativo
- sort_order: Ordem de exibição
- created_at/updated_at: Timestamps
```

### 🍽️ 9. MenuItems (Itens do Cardápio)
**Itens à venda no cardápio**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- menu_id: FK para cardápio
- recipe_id: FK para receita (opcional)
- category_id: FK para categoria
- name: Nome do item
- description: Descrição
- price: Preço de venda
- suggested_price: Preço sugerido pelo sistema
- desired_margin: Margem desejada (%)
- cost_price: Custo calculado
- gross_profit: Lucro bruto calculado
- actual_margin: Margem real calculada
- manual_pricing: Se preço foi definido manualmente
- image_url: URL da imagem
- active: Status ativo/inativo
- visible: Se está visível
- sort_order: Ordem de exibição
- created_at/updated_at: Timestamps
```

### 🎁 10. Combos (Combos e Promoções)
**Combos de itens com desconto**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- name: Nome do combo
- description: Descrição
- price: Preço do combo
- discount: Desconto (%)
- active: Status ativo/inativo
- valid_from: Data de início da validade
- valid_to: Data de fim da validade
- image_url: URL da imagem
- created_at/updated_at: Timestamps
```

### 📦 11. ComboItems (Itens dos Combos)
**Itens incluídos nos combos**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- combo_id: FK para combo
- menu_item_id: FK para item do cardápio
- quantity: Quantidade
- discount: Desconto específico do item
- created_at: Timestamp
```

### 💰 12. Sales (Vendas)
**Registro de vendas**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- sale_number: Número da venda
- customer_name: Nome do cliente
- customer_phone: Telefone do cliente
- subtotal: Subtotal
- discount: Desconto
- total: Total
- payment_method: Método de pagamento
- status: Status (pending, completed, cancelled)
- notes: Observações
- created_at/updated_at: Timestamps
```

### 🛒 13. SaleItems (Itens das Vendas)
**Itens vendidos em cada venda**

```sql
- id: Identificador único
- restaurant_id: FK para restaurante
- sale_id: FK para venda
- menu_item_id: FK para item do cardápio
- combo_id: FK para combo (opcional)
- quantity: Quantidade
- unit_price: Preço unitário
- total_price: Preço total
- cost_price: Custo
- gross_profit: Lucro bruto
- margin: Margem
- created_at: Timestamp
```

## 🔗 Relacionamentos Principais

### Hierarquia de Dados
```
Restaurant
├── Users
├── Categories
├── Ingredients
│   └── IngredientPrices
├── Recipes
│   ├── RecipeIngredients
│   └── MenuItems
├── Menus
│   └── MenuItems
├── Combos
│   └── ComboItems
└── Sales
    └── SaleItems
```

### Relacionamentos Chave
- **Restaurant → Users**: Um restaurante pode ter vários usuários
- **Restaurant → Ingredients**: Um restaurante pode ter vários ingredientes
- **Recipe → RecipeIngredients → Ingredients**: Receitas têm ingredientes
- **Menu → MenuItems**: Cardápios têm itens
- **MenuItem → Recipe**: Itens podem ter ficha técnica
- **Combo → ComboItems → MenuItem**: Combos têm itens do cardápio
- **Sale → SaleItems**: Vendas têm itens

## 📊 Índices e Performance

### Índices Principais
```sql
-- Usuários
CREATE INDEX idx_users_restaurant_id ON users(restaurant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);

-- Categorias
CREATE INDEX idx_categories_restaurant_id ON categories(restaurant_id);
CREATE INDEX idx_categories_restaurant_active ON categories(restaurant_id, active);

-- Ingredientes
CREATE INDEX idx_ingredients_restaurant_id ON ingredients(restaurant_id);
CREATE INDEX idx_ingredients_restaurant_active ON ingredients(restaurant_id, active);
CREATE INDEX idx_ingredients_restaurant_name ON ingredients(restaurant_id, name);

-- Receitas
CREATE INDEX idx_recipes_restaurant_id ON recipes(restaurant_id);
CREATE INDEX idx_recipes_restaurant_category ON recipes(restaurant_id, category_id);
CREATE INDEX idx_recipes_restaurant_active ON recipes(restaurant_id, active);

-- Itens do Cardápio
CREATE INDEX idx_menu_items_restaurant_menu ON menu_items(restaurant_id, menu_id);
CREATE INDEX idx_menu_items_restaurant_active ON menu_items(restaurant_id, active);
CREATE INDEX idx_menu_items_restaurant_visible ON menu_items(restaurant_id, visible);
CREATE INDEX idx_menu_items_recipe_id ON menu_items(recipe_id);
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);

-- Vendas
CREATE INDEX idx_sales_restaurant_id ON sales(restaurant_id);
CREATE INDEX idx_sales_restaurant_created ON sales(restaurant_id, created_at);
CREATE INDEX idx_sales_restaurant_status ON sales(restaurant_id, status);
```

### Consultas Otimizadas
```sql
-- Listar itens ativos de um cardápio
SELECT * FROM menu_items 
WHERE restaurant_id = ? AND menu_id = ? AND active = true AND visible = true
ORDER BY sort_order;

-- Calcular custo de uma receita
SELECT SUM(ri.quantity * i.cost_per_unit) as total_cost
FROM recipe_ingredients ri
JOIN ingredients i ON ri.ingredient_id = i.id
WHERE ri.recipe_id = ? AND ri.restaurant_id = ?;

-- Relatório de vendas por período
SELECT DATE(created_at) as date, COUNT(*) as sales_count, SUM(total) as total_revenue
FROM sales
WHERE restaurant_id = ? AND created_at BETWEEN ? AND ?
GROUP BY DATE(created_at)
ORDER BY date;
```

## 🧮 Campos Calculados

### Cálculos Automáticos
- **Custo da Receita**: Soma dos custos dos ingredientes
- **Custo por Porção**: Custo total ÷ quantidade produzida
- **Lucro Bruto**: Preço de venda - Custo
- **Margem Real**: (Lucro Bruto ÷ Preço de venda) × 100
- **Preço Sugerido**: Custo ÷ (1 - Margem Desejada)

### Triggers Recomendados
```sql
-- Atualizar custo da receita quando ingredientes mudam
DELIMITER //
CREATE TRIGGER update_recipe_cost
AFTER INSERT ON recipe_ingredients
FOR EACH ROW
BEGIN
    UPDATE recipes 
    SET total_cost = (
        SELECT SUM(ri.quantity * i.cost_per_unit)
        FROM recipe_ingredients ri
        JOIN ingredients i ON ri.ingredient_id = i.id
        WHERE ri.recipe_id = NEW.recipe_id
    )
    WHERE id = NEW.recipe_id;
END//
DELIMITER ;
```

## 🔒 Segurança e Validações

### Constraints de Integridade
- **Foreign Keys**: Todas as relações têm FK com CASCADE DELETE
- **Unique Constraints**: Nomes únicos por restaurante
- **Check Constraints**: Validações de valores (preços > 0, margens entre 0-100%)
- **Not Null**: Campos obrigatórios marcados

### Validações de Negócio
- Preços devem ser maiores que zero
- Margens devem estar entre 0% e 100%
- Quantidades devem ser positivas
- Datas de validade devem ser futuras
- Estoque não pode ser negativo

## 📈 Escalabilidade

### Estratégias de Crescimento
1. **Particionamento**: Por restaurante ou por data
2. **Read Replicas**: Para relatórios e consultas
3. **Caching**: Redis para dados frequentemente acessados
4. **Archiving**: Mover dados antigos para tabelas de arquivo

### Monitoramento
- **Query Performance**: Monitorar consultas lentas
- **Index Usage**: Verificar uso dos índices
- **Table Sizes**: Acompanhar crescimento das tabelas
- **Connection Pool**: Gerenciar conexões eficientemente

## 🚀 Próximos Passos

1. **Implementar Triggers**: Para cálculos automáticos
2. **Criar Views**: Para relatórios complexos
3. **Adicionar Soft Delete**: Para auditoria
4. **Implementar Audit Log**: Para rastreamento de mudanças
5. **Otimizar Consultas**: Baseado no uso real

---

*Este documento deve ser atualizado conforme o sistema evolui e novas funcionalidades são adicionadas.* 