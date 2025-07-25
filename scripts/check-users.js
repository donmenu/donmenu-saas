const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuários no banco...')
    
    const users = await prisma.user.findMany()
    console.log('📊 Usuários encontrados:', users.length)
    
    users.forEach((user, index) => {
      console.log(`\n👤 Usuário ${index + 1}:`)
      console.log(`   ID: ${user.id}`)
      console.log(`   Nome: ${user.name}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Ativo: ${user.active}`)
      console.log(`   Criado em: ${user.created_at}`)
    })
    
    const restaurants = await prisma.restaurant.findMany()
    console.log(`\n🏪 Restaurantes encontrados: ${restaurants.length}`)
    
    restaurants.forEach((restaurant, index) => {
      console.log(`\n🏪 Restaurante ${index + 1}:`)
      console.log(`   ID: ${restaurant.id}`)
      console.log(`   Nome: ${restaurant.name}`)
      console.log(`   User ID: ${restaurant.userId}`)
      console.log(`   Ativo: ${restaurant.active}`)
    })
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers() 