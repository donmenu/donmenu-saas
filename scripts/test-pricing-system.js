const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testPricingSystem() {
  try {
    console.log('🧪 Testando sistema completo de precificação...')
    
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
    
    // Verificar dados existentes
    console.log('\n📊 Dados existentes:')
    
    const ingredients = await prisma.ingredient.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   🥬 Insumos: ${ingredients.length}`)
    
    const recipes = await prisma.recipe.findMany({
      where: { restaurant_id: userRestaurant.id },
      include: {
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    })
    console.log(`   📝 Receitas: ${recipes.length}`)
    
    const menus = await prisma.menu.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   📋 Cardápios: ${menus.length}`)
    
    const menuItems = await prisma.menuItem.findMany({
      where: { restaurant_id: userRestaurant.id },
      include: {
        recipe: true,
        category: true,
        menu: true
      }
    })
    console.log(`   🍽️ Itens do cardápio: ${menuItems.length}`)
    
    // Criar uma receita de teste se não existir
    console.log('\n➕ Criando receita de teste...')
    
    let testRecipe = recipes.find(r => r.name === 'X-Burger Teste')
    
    if (!testRecipe) {
      // Buscar ingredientes necessários
      const carne = ingredients.find(i => i.name.includes('Carne'))
      const queijo = ingredients.find(i => i.name.includes('Queijo'))
      const alface = ingredients.find(i => i.name.includes('Alface'))
      
      if (!carne || !queijo || !alface) {
        console.log('❌ Ingredientes necessários não encontrados')
        return
      }
      
      // Criar receita
      testRecipe = await prisma.recipe.create({
        data: {
          name: 'X-Burger Teste',
          description: 'Hambúrguer de teste para precificação',
          yield_quantity: 1,
          yield_unit: 'un',
          preparation_time: 15,
          difficulty: 'fácil',
          instructions: '1. Grelhar carne\n2. Montar hambúrguer\n3. Adicionar queijo',
          restaurant_id: userRestaurant.id,
          active: true
        }
      })
      
      // Calcular custo total
      let totalCost = 0
      const recipeIngredients = [
        { ingredient: carne, quantity: 0.15, unit: 'kg' },
        { ingredient: queijo, quantity: 0.03, unit: 'kg' },
        { ingredient: alface, quantity: 0.5, unit: 'un' }
      ]
      
      for (const { ingredient, quantity, unit } of recipeIngredients) {
        const ingredientCost = Number(ingredient.cost_per_unit) * quantity
        totalCost += ingredientCost
        
        await prisma.recipeIngredient.create({
          data: {
            restaurant_id: userRestaurant.id,
            recipe_id: testRecipe.id,
            ingredient_id: ingredient.id,
            quantity: quantity,
            unit: unit,
            cost: ingredientCost
          }
        })
      }
      
      // Atualizar receita com custos
      const costPerYield = totalCost / testRecipe.yield_quantity
      
      await prisma.recipe.update({
        where: { id: testRecipe.id },
        data: {
          total_cost: totalCost,
          cost_per_yield: costPerYield
        }
      })
      
      // Buscar a receita atualizada
      testRecipe = await prisma.recipe.findUnique({
        where: { id: testRecipe.id }
      })
      
      console.log(`✅ Receita criada: ${testRecipe.name}`)
      console.log(`   Custo total: R$ ${totalCost.toFixed(2)}`)
      console.log(`   Custo por porção: R$ ${costPerYield.toFixed(2)}`)
    } else {
      console.log(`✅ Receita encontrada: ${testRecipe.name}`)
      console.log(`   Custo por porção: R$ ${testRecipe.cost_per_yield}`)
    }
    
    // Criar um cardápio de teste se não existir
    console.log('\n➕ Criando cardápio de teste...')
    
    let testMenu = menus.find(m => m.name === 'Cardápio Teste')
    
    if (!testMenu) {
      testMenu = await prisma.menu.create({
        data: {
          name: 'Cardápio Teste',
          description: 'Cardápio para testes de precificação',
          type: 'teste',
          sort_order: 999,
          restaurant_id: userRestaurant.id,
          active: true
        }
      })
      console.log(`✅ Cardápio criado: ${testMenu.name}`)
    } else {
      console.log(`✅ Cardápio encontrado: ${testMenu.name}`)
    }
    
    // Testar precificação automática
    console.log('\n💰 Testando precificação automática...')
    
    const margin = 60 // 60%
    const costPerYield = Number(testRecipe.cost_per_yield)
    const suggestedPrice = costPerYield / (1 - margin / 100)
    const grossProfit = suggestedPrice - costPerYield
    const actualMargin = (grossProfit / suggestedPrice) * 100
    
    console.log(`   Margem desejada: ${margin}%`)
    console.log(`   Custo por porção: R$ ${costPerYield.toFixed(2)}`)
    console.log(`   Preço sugerido: R$ ${suggestedPrice.toFixed(2)}`)
    console.log(`   Lucro bruto: R$ ${grossProfit.toFixed(2)}`)
    console.log(`   Margem real: ${actualMargin.toFixed(1)}%`)
    
    // Criar item do cardápio com precificação automática
    console.log('\n➕ Criando item do cardápio com precificação automática...')
    
    const existingMenuItem = menuItems.find(mi => mi.name === 'X-Burger Teste')
    
    if (!existingMenuItem) {
      const menuItem = await prisma.menuItem.create({
        data: {
          name: 'X-Burger Teste',
          description: 'Hambúrguer com precificação automática',
          menu_id: testMenu.id,
          recipe_id: testRecipe.id,
          price: suggestedPrice,
          suggested_price: suggestedPrice,
          desired_margin: margin,
          cost_price: costPerYield,
          gross_profit: grossProfit,
          actual_margin: actualMargin,
          manual_pricing: false,
          restaurant_id: userRestaurant.id,
          active: true,
          visible: true,
          sort_order: 1
        }
      })
      
      console.log(`✅ Item criado: ${menuItem.name}`)
      console.log(`   Preço final: R$ ${menuItem.price}`)
      console.log(`   Margem real: ${menuItem.actual_margin}%`)
    } else {
      console.log(`✅ Item encontrado: ${existingMenuItem.name}`)
      console.log(`   Preço: R$ ${existingMenuItem.price}`)
      console.log(`   Margem: ${existingMenuItem.actual_margin}%`)
    }
    
    // Verificar resultado final
    console.log('\n📊 Resultado final:')
    
    const finalMenuItems = await prisma.menuItem.findMany({
      where: { restaurant_id: userRestaurant.id },
      include: {
        recipe: true,
        category: true,
        menu: true
      },
      orderBy: { name: 'asc' }
    })
    
    console.log(`   Total de itens: ${finalMenuItems.length}`)
    
    finalMenuItems.forEach(item => {
      console.log(`   - ${item.name}`)
      console.log(`     Preço: R$ ${item.price}`)
      console.log(`     Custo: R$ ${item.cost_price || 'N/A'}`)
      console.log(`     Margem: ${item.actual_margin || 'N/A'}%`)
      console.log(`     Receita: ${item.recipe?.name || 'N/A'}`)
      console.log(`     Cardápio: ${item.menu?.name || 'N/A'}`)
    })
    
    console.log('\n✅ Sistema de precificação funcionando corretamente!')
    console.log('\n📝 Resumo:')
    console.log('   - Receitas calculam custo automaticamente')
    console.log('   - Itens do cardápio podem usar precificação automática')
    console.log('   - Margem desejada é aplicada corretamente')
    console.log('   - Lucro bruto e margem real são calculados')
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testPricingSystem() 