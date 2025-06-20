import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar restaurante de exemplo
  console.log('🏪 Criando restaurante de exemplo...')
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Restaurante Exemplo',
      cnpj: '12.345.678/0001-90',
      email: 'contato@restauranteexemplo.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01234-567',
      logo_url: 'https://via.placeholder.com/150x150',
      active: true,
      plan_type: 'premium'
    }
  })
  console.log(`✅ Restaurante criado: ${restaurant.name}`)

  // Criar usuário administrador
  console.log('👤 Criando usuário administrador...')
  const adminUser = await prisma.user.create({
    data: {
      restaurant_id: restaurant.id,
      name: 'Administrador',
      email: 'admin@restauranteexemplo.com',
      password: '$2b$10$example.hash', // Senha: admin123
      role: 'owner',
      avatar_url: 'https://via.placeholder.com/100x100',
      active: true
    }
  })
  console.log(`✅ Usuário criado: ${adminUser.name}`)

  // Criar categorias
  console.log('📂 Criando categorias...')
  const categories = [
    { name: 'Entradas', description: 'Pratos de entrada', color: '#FF6B6B', icon: '🍽️' },
    { name: 'Pratos Principais', description: 'Pratos principais', color: '#4ECDC4', icon: '🍖' },
    { name: 'Sobremesas', description: 'Sobremesas e doces', color: '#45B7D1', icon: '🍰' },
    { name: 'Bebidas', description: 'Bebidas e refrigerantes', color: '#96CEB4', icon: '🥤' },
    { name: 'Acompanhamentos', description: 'Acompanhamentos', color: '#FFEAA7', icon: '🥔' }
  ]

  const createdCategories: any[] = []
  for (const category of categories) {
    const created = await prisma.category.create({
      data: {
        restaurant_id: restaurant.id,
        ...category,
        sort_order: createdCategories.length
      }
    })
    createdCategories.push(created)
    console.log(`✅ Categoria criada: ${created.name}`)
  }

  // Criar ingredientes
  console.log('🥕 Criando ingredientes...')
  const ingredients = [
    { name: 'Carne Bovina', description: 'Carne bovina moída', unit: 'kg', cost_per_unit: 25.00, supplier: 'Frigorífico Silva', min_stock: 5.0, current_stock: 10.0 },
    { name: 'Pão de Hambúrguer', description: 'Pão especial para hambúrguer', unit: 'un', cost_per_unit: 1.50, supplier: 'Padaria Central', min_stock: 50, current_stock: 100 },
    { name: 'Queijo Cheddar', description: 'Queijo cheddar fatiado', unit: 'kg', cost_per_unit: 35.00, supplier: 'Laticínios Santos', min_stock: 2.0, current_stock: 5.0 },
    { name: 'Alface', description: 'Alface americana', unit: 'un', cost_per_unit: 2.00, supplier: 'Hortifruti Verde', min_stock: 20, current_stock: 30 },
    { name: 'Tomate', description: 'Tomate vermelho', unit: 'kg', cost_per_unit: 8.00, supplier: 'Hortifruti Verde', min_stock: 3.0, current_stock: 5.0 },
    { name: 'Batata', description: 'Batata inglesa', unit: 'kg', cost_per_unit: 6.00, supplier: 'Hortifruti Verde', min_stock: 10.0, current_stock: 15.0 },
    { name: 'Óleo de Soja', description: 'Óleo de soja refinado', unit: 'l', cost_per_unit: 12.00, supplier: 'Distribuidora ABC', min_stock: 5.0, current_stock: 8.0 },
    { name: 'Farinha de Trigo', description: 'Farinha de trigo especial', unit: 'kg', cost_per_unit: 4.50, supplier: 'Moinho Central', min_stock: 20.0, current_stock: 25.0 },
    { name: 'Ovos', description: 'Ovos de galinha', unit: 'dz', cost_per_unit: 15.00, supplier: 'Granja Feliz', min_stock: 10, current_stock: 15 },
    { name: 'Leite', description: 'Leite integral', unit: 'l', cost_per_unit: 5.00, supplier: 'Laticínios Santos', min_stock: 10.0, current_stock: 15.0 }
  ]

  const createdIngredients: any[] = []
  for (const ingredient of ingredients) {
    const created = await prisma.ingredient.create({
      data: {
        restaurant_id: restaurant.id,
        ...ingredient
      }
    })
    createdIngredients.push(created)
    console.log(`✅ Ingrediente criado: ${created.name}`)
  }

  // Criar receitas (fichas técnicas)
  console.log('🍳 Criando receitas...')
  const recipes = [
    {
      name: 'X-Burger Clássico',
      description: 'Hambúrguer clássico com queijo e salada',
      category_id: createdCategories[1].id, // Pratos Principais
      yield_quantity: 1,
      yield_unit: 'un',
      preparation_time: 15,
      difficulty: 'fácil',
      instructions: '1. Grelhar a carne\n2. Montar o hambúrguer\n3. Adicionar queijo e salada',
      image_url: 'https://via.placeholder.com/300x200',
      ingredients: [
        { ingredient_id: 0, quantity: 0.15, unit: 'kg' }, // Carne
        { ingredient_id: 1, quantity: 1, unit: 'un' }, // Pão
        { ingredient_id: 2, quantity: 0.03, unit: 'kg' }, // Queijo
        { ingredient_id: 3, quantity: 0.5, unit: 'un' }, // Alface
        { ingredient_id: 4, quantity: 0.05, unit: 'kg' } // Tomate
      ]
    },
    {
      name: 'Batata Frita',
      description: 'Batatas fritas crocantes',
      category_id: createdCategories[4].id, // Acompanhamentos
      yield_quantity: 1,
      yield_unit: 'porção',
      preparation_time: 20,
      difficulty: 'fácil',
      instructions: '1. Cortar batatas\n2. Fritar em óleo quente\n3. Salgar a gosto',
      image_url: 'https://via.placeholder.com/300x200',
      ingredients: [
        { ingredient_id: 5, quantity: 0.2, unit: 'kg' }, // Batata
        { ingredient_id: 6, quantity: 0.1, unit: 'l' } // Óleo
      ]
    },
    {
      name: 'Bolo de Chocolate',
      description: 'Bolo de chocolate caseiro',
      category_id: createdCategories[2].id, // Sobremesas
      yield_quantity: 1,
      yield_unit: 'un',
      preparation_time: 60,
      difficulty: 'médio',
      instructions: '1. Misturar ingredientes\n2. Assar por 40 minutos\n3. Deixar esfriar',
      image_url: 'https://via.placeholder.com/300x200',
      ingredients: [
        { ingredient_id: 7, quantity: 0.3, unit: 'kg' }, // Farinha
        { ingredient_id: 8, quantity: 2, unit: 'un' }, // Ovos
        { ingredient_id: 9, quantity: 0.5, unit: 'l' } // Leite
      ]
    }
  ]

  const createdRecipes: any[] = []
  for (const recipe of recipes) {
    const { ingredients: recipeIngredients, ...recipeData } = recipe
    const created = await prisma.recipe.create({
      data: {
        restaurant_id: restaurant.id,
        ...recipeData
      }
    })
    createdRecipes.push(created)

    // Criar ingredientes da receita
    for (const ingredient of recipeIngredients) {
      await prisma.recipeIngredient.create({
        data: {
          restaurant_id: restaurant.id,
          recipe_id: created.id,
          ingredient_id: createdIngredients[ingredient.ingredient_id].id,
          quantity: ingredient.quantity,
          unit: ingredient.unit
        }
      })
    }
    console.log(`✅ Receita criada: ${created.name}`)
  }

  // Criar cardápios
  console.log('📋 Criando cardápios...')
  const menus = [
    { name: 'Cardápio Principal', description: 'Cardápio completo do restaurante', type: 'principal', sort_order: 1 },
    { name: 'Cardápio Delivery', description: 'Especial para delivery', type: 'delivery', sort_order: 2 },
    { name: 'Cardápio Sobremesas', description: 'Apenas sobremesas', type: 'sobremesas', sort_order: 3 }
  ]

  const createdMenus: any[] = []
  for (const menu of menus) {
    const created = await prisma.menu.create({
      data: {
        restaurant_id: restaurant.id,
        ...menu
      }
    })
    createdMenus.push(created)
    console.log(`✅ Cardápio criado: ${created.name}`)
  }

  // Criar itens do cardápio
  console.log('🍽️ Criando itens do cardápio...')
  const menuItems = [
    {
      menu_id: createdMenus[0].id, // Cardápio Principal
      recipe_id: createdRecipes[0].id, // X-Burger
      category_id: createdCategories[1].id, // Pratos Principais
      name: 'X-Burger Clássico',
      description: 'Hambúrguer com queijo, alface e tomate',
      price: 25.90,
      desired_margin: 60.0,
      manual_pricing: false,
      image_url: 'https://via.placeholder.com/300x200',
      sort_order: 1
    },
    {
      menu_id: createdMenus[0].id, // Cardápio Principal
      recipe_id: createdRecipes[1].id, // Batata Frita
      category_id: createdCategories[4].id, // Acompanhamentos
      name: 'Batata Frita',
      description: 'Porção de batatas fritas crocantes',
      price: 12.90,
      desired_margin: 70.0,
      manual_pricing: false,
      image_url: 'https://via.placeholder.com/300x200',
      sort_order: 2
    },
    {
      menu_id: createdMenus[2].id, // Cardápio Sobremesas
      recipe_id: createdRecipes[2].id, // Bolo de Chocolate
      category_id: createdCategories[2].id, // Sobremesas
      name: 'Bolo de Chocolate',
      description: 'Bolo de chocolate caseiro',
      price: 18.90,
      desired_margin: 65.0,
      manual_pricing: false,
      image_url: 'https://via.placeholder.com/300x200',
      sort_order: 1
    }
  ]

  const createdMenuItems: any[] = []
  for (const item of menuItems) {
    const created = await prisma.menuItem.create({
      data: {
        restaurant_id: restaurant.id,
        ...item
      }
    })
    createdMenuItems.push(created)
    console.log(`✅ Item criado: ${created.name}`)
  }

  // Criar combos
  console.log('🎁 Criando combos...')
  const combos = [
    {
      name: 'Combo X-Burger + Batata',
      description: 'X-Burger com batata frita e refrigerante',
      price: 32.90,
      discount: 15.0,
      image_url: 'https://via.placeholder.com/300x200'
    }
  ]

  const createdCombos: any[] = []
  for (const combo of combos) {
    const created = await prisma.combo.create({
      data: {
        restaurant_id: restaurant.id,
        ...combo
      }
    })
    createdCombos.push(created)
    console.log(`✅ Combo criado: ${created.name}`)
  }

  // Criar itens dos combos
  console.log('📦 Criando itens dos combos...')
  const comboItems = [
    {
      combo_id: createdCombos[0].id,
      menu_item_id: createdMenuItems[0].id, // X-Burger
      quantity: 1,
      discount: 10.0
    },
    {
      combo_id: createdCombos[0].id,
      menu_item_id: createdMenuItems[1].id, // Batata Frita
      quantity: 1,
      discount: 5.0
    }
  ]

  for (const item of comboItems) {
    await prisma.comboItem.create({
      data: {
        restaurant_id: restaurant.id,
        ...item
      }
    })
    console.log(`✅ Item do combo criado`)
  }

  // Criar algumas vendas de exemplo
  console.log('💰 Criando vendas de exemplo...')
  const sales = [
    {
      sale_number: 'V001',
      customer_name: 'João Silva',
      customer_phone: '(11) 99999-1111',
      subtotal: 38.80,
      discount: 5.90,
      total: 32.90,
      payment_method: 'cartão',
      status: 'completed'
    },
    {
      sale_number: 'V002',
      customer_name: 'Maria Santos',
      customer_phone: '(11) 99999-2222',
      subtotal: 25.90,
      discount: 0,
      total: 25.90,
      payment_method: 'pix',
      status: 'completed'
    }
  ]

  const createdSales: any[] = []
  for (const sale of sales) {
    const created = await prisma.sale.create({
      data: {
        restaurant_id: restaurant.id,
        ...sale
      }
    })
    createdSales.push(created)
    console.log(`✅ Venda criada: ${created.sale_number}`)
  }

  // Criar itens das vendas
  console.log('🛒 Criando itens das vendas...')
  const saleItems = [
    {
      sale_id: createdSales[0].id,
      menu_item_id: createdMenuItems[0].id, // X-Burger (obrigatório)
      combo_id: createdCombos[0].id, // Combo (opcional)
      quantity: 1,
      unit_price: 32.90,
      total_price: 32.90
    },
    {
      sale_id: createdSales[1].id,
      menu_item_id: createdMenuItems[0].id, // X-Burger
      quantity: 1,
      unit_price: 25.90,
      total_price: 25.90
    }
  ]

  for (const item of saleItems) {
    await prisma.saleItem.create({
      data: {
        restaurant_id: restaurant.id,
        ...item
      }
    })
    console.log(`✅ Item da venda criado`)
  }

  // Criar categorias financeiras
  console.log('💰 Criando categorias financeiras...')
  const financialCategories = [
    { name: 'Vendas de Alimentos', type: 'receita', description: 'Receitas provenientes de vendas de alimentos', color: '#10B981' },
    { name: 'Vendas de Bebidas', type: 'receita', description: 'Receitas provenientes de vendas de bebidas', color: '#3B82F6' },
    { name: 'Delivery', type: 'receita', description: 'Receitas de delivery e entrega', color: '#8B5CF6' },
    { name: 'Outras Receitas', type: 'receita', description: 'Outras receitas diversas', color: '#06B6D4' },
    { name: 'Fornecedores', type: 'despesa', description: 'Despesas com fornecedores de ingredientes', color: '#EF4444' },
    { name: 'Funcionários', type: 'despesa', description: 'Despesas com salários e benefícios', color: '#F59E0B' },
    { name: 'Aluguel', type: 'despesa', description: 'Despesas com aluguel do estabelecimento', color: '#EC4899' },
    { name: 'Contas Públicas', type: 'despesa', description: 'Água, luz, telefone, internet', color: '#84CC16' },
    { name: 'Manutenção', type: 'despesa', description: 'Despesas com manutenção de equipamentos', color: '#F97316' },
    { name: 'Marketing', type: 'despesa', description: 'Despesas com publicidade e marketing', color: '#6366F1' }
  ]

  const createdFinancialCategories: any[] = []
  for (const category of financialCategories) {
    const created = await prisma.financialCategory.create({
      data: {
        restaurant_id: restaurant.id,
        ...category
      }
    })
    createdFinancialCategories.push(created)
    console.log(`✅ Categoria financeira criada: ${created.name}`)
  }

  // Criar um caixa de exemplo
  console.log('💼 Criando caixa de exemplo...')
  const caixa = await prisma.cashRegister.create({
    data: {
      restaurant_id: restaurant.id,
      initial_amount: 100.00,
      notes: 'Caixa inicial do restaurante',
      status: 'aberto'
    }
  })
  console.log(`✅ Caixa criado com valor inicial: R$ ${caixa.initial_amount}`)

  // Criar algumas receitas de exemplo
  console.log('📈 Criando receitas de exemplo...')
  const receitas = [
    {
      description: 'Venda de X-Burger',
      amount: 25.90,
      revenue_date: new Date(),
      payment_method: 'cartão',
      category_id: createdFinancialCategories[0].id, // Vendas de Alimentos
      cash_register_id: caixa.id
    },
    {
      description: 'Venda de Batata Frita',
      amount: 12.90,
      revenue_date: new Date(),
      payment_method: 'dinheiro',
      category_id: createdFinancialCategories[0].id, // Vendas de Alimentos
      cash_register_id: caixa.id
    }
  ]

  for (const receita of receitas) {
    await prisma.revenue.create({
      data: {
        restaurant_id: restaurant.id,
        ...receita
      }
    })
    console.log(`✅ Receita criada: ${receita.description}`)
  }

  // Criar algumas despesas de exemplo
  console.log('📉 Criando despesas de exemplo...')
  const despesas = [
    {
      description: 'Compra de ingredientes',
      amount: 150.00,
      expense_date: new Date(),
      payment_method: 'pix',
      supplier: 'Fornecedor ABC',
      category_id: createdFinancialCategories[4].id, // Fornecedores
      cash_register_id: caixa.id
    },
    {
      description: 'Conta de luz',
      amount: 89.50,
      expense_date: new Date(),
      payment_method: 'boleto',
      supplier: 'Companhia de Energia',
      category_id: createdFinancialCategories[7].id, // Contas Públicas
      cash_register_id: caixa.id
    }
  ]

  for (const despesa of despesas) {
    await prisma.expense.create({
      data: {
        restaurant_id: restaurant.id,
        ...despesa
      }
    })
    console.log(`✅ Despesa criada: ${despesa.description}`)
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log('📊 Dados criados:')
  console.log(`   - 1 restaurante`)
  console.log(`   - 1 usuário administrador`)
  console.log(`   - ${categories.length} categorias`)
  console.log(`   - ${ingredients.length} ingredientes`)
  console.log(`   - ${recipes.length} receitas`)
  console.log(`   - ${menus.length} cardápios`)
  console.log(`   - ${createdMenuItems.length} itens do cardápio`)
  console.log(`   - ${combos.length} combos`)
  console.log(`   - ${sales.length} vendas`)
  console.log(`   - ${financialCategories.length} categorias financeiras`)
  console.log(`   - 1 caixa`)
  console.log(`   - ${receitas.length} receitas`)
  console.log(`   - ${despesas.length} despesas`)
  console.log('')
  console.log('🔑 Credenciais de acesso:')
  console.log(`   Email: admin@restauranteexemplo.com`)
  console.log(`   Senha: admin123`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
