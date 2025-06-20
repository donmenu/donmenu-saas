import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar categorias
  console.log('📂 Criando categorias...')
  const categorias = await Promise.all([
    prisma.categories.create({
      data: {
        name: 'Entradas'
      }
    }),
    prisma.categories.create({
      data: {
        name: 'Pratos Principais'
      }
    }),
    prisma.categories.create({
      data: {
        name: 'Sobremesas'
      }
    }),
    prisma.categories.create({
      data: {
        name: 'Bebidas'
      }
    })
  ])

  // Criar ingredientes
  console.log('🥕 Criando ingredientes...')
  const ingredientes = await Promise.all([
    prisma.ingredients.create({
      data: {
        name: 'Carne Bovina',
        unit: 'kg',
        cost_per_unit: 45.00
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Frango',
        unit: 'kg',
        cost_per_unit: 18.50
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Arroz',
        unit: 'kg',
        cost_per_unit: 8.00
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Feijão',
        unit: 'kg',
        cost_per_unit: 12.00
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Tomate',
        unit: 'kg',
        cost_per_unit: 6.50
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Cebola',
        unit: 'kg',
        cost_per_unit: 4.00
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Alho',
        unit: 'kg',
        cost_per_unit: 15.00
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Queijo',
        unit: 'kg',
        cost_per_unit: 28.00
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Farinha de Trigo',
        unit: 'kg',
        cost_per_unit: 5.50
      }
    }),
    prisma.ingredients.create({
      data: {
        name: 'Açúcar',
        unit: 'kg',
        cost_per_unit: 4.50
      }
    })
  ])

  // Criar itens do cardápio
  console.log('🍽️ Criando itens do cardápio...')
  const itens = await Promise.all([
    prisma.itens.create({
      data: {
        name: 'Picanha Grelhada',
        description: 'Picanha grelhada na brasa com acompanhamentos',
        price: 89.90,
        category_id: categorias[1].category_id // Pratos Principais
      }
    }),
    prisma.itens.create({
      data: {
        name: 'Frango à Parmegiana',
        description: 'Filé de frango empanado com molho de tomate e queijo',
        price: 45.90,
        category_id: categorias[1].category_id // Pratos Principais
      }
    }),
    prisma.itens.create({
      data: {
        name: 'Arroz com Feijão',
        description: 'Arroz branco com feijão preto',
        price: 12.90,
        category_id: categorias[1].category_id // Pratos Principais
      }
    }),
    prisma.itens.create({
      data: {
        name: 'Salada Caesar',
        description: 'Alface, croutons, parmesão e molho caesar',
        price: 28.90,
        category_id: categorias[0].category_id // Entradas
      }
    }),
    prisma.itens.create({
      data: {
        name: 'Pudim de Leite',
        description: 'Pudim de leite condensado com calda de caramelo',
        price: 15.90,
        category_id: categorias[2].category_id // Sobremesas
      }
    })
  ])

  // Criar fichas técnicas
  console.log('📋 Criando fichas técnicas...')
  const fichasTecnicas = await Promise.all([
    // Ficha técnica da Picanha
    prisma.fichas_tecnicas.create({
      data: {
        item_id: itens[0].item_id,
        yield: 1.0, // 1 porção
        total_cost: 35.00,
        price_suggestion: 89.90
      }
    }),
    // Ficha técnica do Frango à Parmegiana
    prisma.fichas_tecnicas.create({
      data: {
        item_id: itens[1].item_id,
        yield: 1.0,
        total_cost: 18.50,
        price_suggestion: 45.90
      }
    }),
    // Ficha técnica do Arroz com Feijão
    prisma.fichas_tecnicas.create({
      data: {
        item_id: itens[2].item_id,
        yield: 1.0,
        total_cost: 6.00,
        price_suggestion: 12.90
      }
    })
  ])

  // Criar ingredientes das fichas técnicas
  console.log('🥄 Adicionando ingredientes às fichas técnicas...')
  
  // Ingredientes da Picanha
  await Promise.all([
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[0].ficha_id,
        ingredient_id: ingredientes[0].ingredient_id, // Carne Bovina
        quantity: 0.3 // 300g
      }
    }),
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[0].ficha_id,
        ingredient_id: ingredientes[4].ingredient_id, // Tomate
        quantity: 0.1 // 100g
      }
    }),
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[0].ficha_id,
        ingredient_id: ingredientes[5].ingredient_id, // Cebola
        quantity: 0.05 // 50g
      }
    })
  ])

  // Ingredientes do Frango à Parmegiana
  await Promise.all([
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[1].ficha_id,
        ingredient_id: ingredientes[1].ingredient_id, // Frango
        quantity: 0.25 // 250g
      }
    }),
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[1].ficha_id,
        ingredient_id: ingredientes[7].ingredient_id, // Queijo
        quantity: 0.1 // 100g
      }
    }),
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[1].ficha_id,
        ingredient_id: ingredientes[8].ingredient_id, // Farinha
        quantity: 0.05 // 50g
      }
    })
  ])

  // Ingredientes do Arroz com Feijão
  await Promise.all([
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[2].ficha_id,
        ingredient_id: ingredientes[2].ingredient_id, // Arroz
        quantity: 0.15 // 150g
      }
    }),
    prisma.ficha_ingredientes.create({
      data: {
        ficha_id: fichasTecnicas[2].ficha_id,
        ingredient_id: ingredientes[3].ingredient_id, // Feijão
        quantity: 0.1 // 100g
      }
    })
  ])

  console.log('✅ Seed concluído com sucesso!')
  console.log(`📊 Dados criados:`)
  console.log(`   - ${categorias.length} categorias`)
  console.log(`   - ${ingredientes.length} ingredientes`)
  console.log(`   - ${itens.length} itens do cardápio`)
  console.log(`   - ${fichasTecnicas.length} fichas técnicas`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
