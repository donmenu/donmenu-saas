const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testAddIngredient() {
  try {
    console.log('🧪 Testando criação de insumos...')
    
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: 'w_patriota@hotmail.com' }
    })
    
    if (!user) {
      console.log('❌ Usuário não encontrado')
      return
    }
    
    console.log(`👤 Usuário: ${user.name} (ID: ${user.id})`)
    
    // Buscar restaurante do usuário
    const userRestaurant = await prisma.restaurant.findFirst({
      where: { userId: user.id }
    })
    
    if (!userRestaurant) {
      console.log('❌ Restaurante não encontrado para o usuário')
      return
    }
    
    console.log(`🏪 Restaurante: ${userRestaurant.name} (ID: ${userRestaurant.id})`)
    
    // Verificar insumos existentes
    const existingIngredients = await prisma.ingredient.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    
    console.log(`📊 Insumos existentes: ${existingIngredients.length}`)
    existingIngredients.forEach(ing => {
      console.log(`   - ${ing.name} (${ing.unit}) - R$ ${ing.cost_per_unit}`)
    })
    
    // Criar um novo insumo de teste
    console.log('\n➕ Criando novo insumo...')
    
    const newIngredient = await prisma.ingredient.create({
      data: {
        name: 'Farinha de Trigo',
        unit: 'kg',
        cost_per_unit: 4.50,
        description: 'Farinha de trigo especial para pães',
        supplier: 'Moinho Central',
        min_stock: 10.0,
        current_stock: 15.0,
        restaurant_id: userRestaurant.id,
        active: true
      }
    })
    
    console.log('✅ Insumo criado com sucesso!')
    console.log(`   ID: ${newIngredient.id}`)
    console.log(`   Nome: ${newIngredient.name}`)
    console.log(`   Unidade: ${newIngredient.unit}`)
    console.log(`   Custo: R$ ${newIngredient.cost_per_unit}`)
    console.log(`   Fornecedor: ${newIngredient.supplier}`)
    
    // Verificar se foi criado corretamente
    const updatedIngredients = await prisma.ingredient.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    
    console.log(`\n📊 Total de insumos após criação: ${updatedIngredients.length}`)
    
    // Testar criação de insumo duplicado
    console.log('\n🔄 Testando criação de insumo duplicado...')
    
    try {
      await prisma.ingredient.create({
        data: {
          name: 'Farinha de Trigo', // Nome duplicado
          unit: 'kg',
          cost_per_unit: 5.00,
          restaurant_id: userRestaurant.id,
          active: true
        }
      })
      console.log('❌ Erro: Deveria ter falhado (nome duplicado)')
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('✅ Correto: Falhou ao tentar criar insumo duplicado')
      } else {
        console.log('❌ Erro inesperado:', error.message)
      }
    }
    
    // Criar mais alguns insumos de exemplo
    console.log('\n➕ Criando mais insumos de exemplo...')
    
    const sampleIngredients = [
      { name: 'Carne Bovina', unit: 'kg', cost_per_unit: 25.00, description: 'Carne bovina moída', supplier: 'Frigorífico Silva' },
      { name: 'Queijo Cheddar', unit: 'kg', cost_per_unit: 35.00, description: 'Queijo cheddar fatiado', supplier: 'Laticínios Santos' },
      { name: 'Alface', unit: 'un', cost_per_unit: 2.00, description: 'Alface americana', supplier: 'Hortifruti Verde' },
      { name: 'Tomate', unit: 'kg', cost_per_unit: 8.00, description: 'Tomate vermelho', supplier: 'Hortifruti Verde' }
    ]
    
    for (const ingredientData of sampleIngredients) {
      try {
        const created = await prisma.ingredient.create({
          data: {
            ...ingredientData,
            restaurant_id: userRestaurant.id,
            active: true
          }
        })
        console.log(`✅ ${created.name} criado`)
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`⚠️ ${ingredientData.name} já existe`)
        } else {
          console.log(`❌ Erro ao criar ${ingredientData.name}:`, error.message)
        }
      }
    }
    
    // Verificar resultado final
    const finalIngredients = await prisma.ingredient.findMany({
      where: { restaurant_id: userRestaurant.id },
      orderBy: { name: 'asc' }
    })
    
    console.log(`\n📊 Resultado final: ${finalIngredients.length} insumos`)
    finalIngredients.forEach(ing => {
      console.log(`   - ${ing.name} (${ing.unit}) - R$ ${ing.cost_per_unit}`)
    })
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAddIngredient() 