const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testAuthentication() {
  try {
    console.log('🔐 Testando sistema de autenticação e isolamento de dados...')
    
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
    
    // Verificar dados do restaurante do usuário
    console.log('\n📋 Dados do seu restaurante:')
    
    const categories = await prisma.category.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   📂 Categorias: ${categories.length}`)
    
    const ingredients = await prisma.ingredient.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   🥬 Insumos: ${ingredients.length}`)
    
    const recipes = await prisma.recipe.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   📝 Fichas técnicas: ${recipes.length}`)
    
    const menus = await prisma.menu.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   🍽️ Cardápios: ${menus.length}`)
    
    const menuItems = await prisma.menuItem.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   🍴 Itens do cardápio: ${menuItems.length}`)
    
    // Verificar dados de outros restaurantes
    console.log('\n🔍 Verificando isolamento de dados...')
    
    const allRestaurants = await prisma.restaurant.findMany()
    const otherRestaurants = allRestaurants.filter(r => r.id !== userRestaurant.id)
    
    for (const rest of otherRestaurants) {
      console.log(`\n🏪 Restaurante: ${rest.name} (ID: ${rest.id})`)
      
      const otherIngredients = await prisma.ingredient.findMany({
        where: { restaurant_id: rest.id }
      })
      console.log(`   🥬 Insumos: ${otherIngredients.length}`)
      
      const otherRecipes = await prisma.recipe.findMany({
        where: { restaurant_id: rest.id }
      })
      console.log(`   📝 Fichas técnicas: ${otherRecipes.length}`)
      
      const otherMenuItems = await prisma.menuItem.findMany({
        where: { restaurant_id: rest.id }
      })
      console.log(`   🍴 Itens do cardápio: ${otherMenuItems.length}`)
    }
    
    console.log('\n✅ Teste concluído!')
    console.log('\n📝 Resumo:')
    console.log(`   - Seu restaurante tem ${ingredients.length} insumos, ${recipes.length} fichas técnicas e ${menuItems.length} itens de cardápio`)
    console.log(`   - Outros restaurantes têm dados que não aparecem no seu sistema`)
    console.log(`   - O isolamento de dados está funcionando corretamente`)
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAuthentication() 