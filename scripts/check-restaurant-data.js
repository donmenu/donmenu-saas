const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkRestaurantData() {
  try {
    console.log('🔍 Verificando dados do restaurante...')
    
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
    
    console.log(`🏪 Restaurante do usuário: ${userRestaurant.name} (ID: ${userRestaurant.id})`)
    
    // Verificar todos os restaurantes
    const allRestaurants = await prisma.restaurant.findMany({
      include: {
        user: true
      }
    })
    
    console.log('\n📊 Todos os restaurantes no sistema:')
    allRestaurants.forEach(rest => {
      console.log(`   - ${rest.name} (ID: ${rest.id}) - Usuário: ${rest.user.name} (${rest.user.email})`)
    })
    
    // Verificar dados do restaurante do usuário
    console.log('\n📋 Dados do seu restaurante:')
    
    // Categorias
    const categories = await prisma.category.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   📂 Categorias: ${categories.length}`)
    categories.forEach(cat => console.log(`     - ${cat.name}`))
    
    // Insumos
    const ingredients = await prisma.ingredient.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   🥬 Insumos: ${ingredients.length}`)
    ingredients.forEach(ing => console.log(`     - ${ing.name}`))
    
    // Fichas técnicas
    const recipes = await prisma.recipe.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   📝 Fichas técnicas: ${recipes.length}`)
    recipes.forEach(rec => console.log(`     - ${rec.name}`))
    
    // Cardápios
    const menus = await prisma.menu.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   🍽️ Cardápios: ${menus.length}`)
    menus.forEach(menu => console.log(`     - ${menu.name}`))
    
    // Itens do cardápio
    const menuItems = await prisma.menuItem.findMany({
      where: { restaurant_id: userRestaurant.id }
    })
    console.log(`   🍴 Itens do cardápio: ${menuItems.length}`)
    
    // Verificar dados de outros restaurantes
    console.log('\n🔍 Verificando dados de outros restaurantes...')
    
    const otherRestaurants = allRestaurants.filter(r => r.id !== userRestaurant.id)
    
    for (const rest of otherRestaurants) {
      console.log(`\n🏪 Restaurante: ${rest.name} (ID: ${rest.id})`)
      
      const otherCategories = await prisma.category.findMany({
        where: { restaurant_id: rest.id }
      })
      console.log(`   📂 Categorias: ${otherCategories.length}`)
      
      const otherIngredients = await prisma.ingredient.findMany({
        where: { restaurant_id: rest.id }
      })
      console.log(`   🥬 Insumos: ${otherIngredients.length}`)
      
      const otherRecipes = await prisma.recipe.findMany({
        where: { restaurant_id: rest.id }
      })
      console.log(`   📝 Fichas técnicas: ${otherRecipes.length}`)
      
      const otherMenus = await prisma.menu.findMany({
        where: { restaurant_id: rest.id }
      })
      console.log(`   🍽️ Cardápios: ${otherMenus.length}`)
    }
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkRestaurantData() 