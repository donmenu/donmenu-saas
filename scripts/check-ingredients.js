const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkIngredients() {
  try {
    console.log('🔍 Verificando ingredientes existentes...')
    
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: 'w_patriota@hotmail.com' }
    })
    
    if (!user) {
      console.log('❌ Usuário não encontrado')
      return
    }
    
    // Buscar restaurante do usuário
    const userRestaurant = await prisma.restaurant.findFirst({
      where: { userId: user.id }
    })
    
    if (!userRestaurant) {
      console.log('❌ Restaurante não encontrado para o usuário')
      return
    }
    
    // Buscar ingredientes
    const ingredients = await prisma.ingredient.findMany({
      where: { restaurant_id: userRestaurant.id },
      orderBy: { name: 'asc' }
    })
    
    console.log(`\n📊 Ingredientes encontrados: ${ingredients.length}`)
    
    ingredients.forEach(ing => {
      console.log(`   - ${ing.name} (${ing.unit}) - R$ ${ing.cost_per_unit}`)
    })
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkIngredients() 