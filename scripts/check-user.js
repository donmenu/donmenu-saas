const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function checkUser() {
  try {
    console.log('🔍 Verificando usuário w_patriota@hotmail.com...')
    
    // Verificar se o usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { email: 'w_patriota@hotmail.com' }
    })

    if (existingUser) {
      console.log('✅ Usuário encontrado:')
      console.log(`   ID: ${existingUser.id}`)
      console.log(`   Nome: ${existingUser.name}`)
      console.log(`   Email: ${existingUser.email}`)
      console.log(`   Role: ${existingUser.role}`)
      console.log(`   Ativo: ${existingUser.active}`)
      console.log(`   Tem senha: ${!!existingUser.password}`)
      
      // Verificar restaurantes do usuário
      const restaurants = await prisma.restaurant.findMany({
        where: { userId: existingUser.id }
      })
      
      console.log(`   Restaurantes: ${restaurants.length}`)
      restaurants.forEach(rest => {
        console.log(`     - ${rest.name} (${rest.id})`)
      })
      
    } else {
      console.log('❌ Usuário não encontrado')
      console.log('📝 Criando usuário w_patriota@hotmail.com...')
      
      // Criar senha criptografada
      const hashedPassword = await bcrypt.hash('123456', 12)
      
      // Criar usuário
      const newUser = await prisma.user.create({
        data: {
          name: 'Wellington Patriota',
          email: 'w_patriota@hotmail.com',
          password: hashedPassword,
          phone: '(11) 99999-9999',
          role: 'owner',
          active: true
        }
      })
      
      console.log('✅ Usuário criado com sucesso!')
      console.log(`   ID: ${newUser.id}`)
      console.log(`   Email: ${newUser.email}`)
      console.log(`   Senha: 123456`)
      
      // Criar restaurante padrão
      const restaurant = await prisma.restaurant.create({
        data: {
          name: 'Restaurante do Wellington',
          email: 'w_patriota@hotmail.com',
          phone: '(11) 99999-9999',
          userId: newUser.id,
          active: true,
          plan_type: 'free'
        }
      })
      
      console.log('✅ Restaurante criado:')
      console.log(`   ID: ${restaurant.id}`)
      console.log(`   Nome: ${restaurant.name}`)
      
      // Criar categorias padrão
      const categories = [
        { name: 'Entradas', description: 'Pratos de entrada', color: '#FF6B6B', icon: '🍽️' },
        { name: 'Pratos Principais', description: 'Pratos principais', color: '#4ECDC4', icon: '🍖' },
        { name: 'Sobremesas', description: 'Sobremesas e doces', color: '#45B7D1', icon: '🍰' },
        { name: 'Bebidas', description: 'Bebidas e refrigerantes', color: '#96CEB4', icon: '🥤' },
        { name: 'Acompanhamentos', description: 'Acompanhamentos', color: '#FFEAA7', icon: '🥔' }
      ]
      
      for (const category of categories) {
        await prisma.category.create({
          data: {
            ...category,
            restaurant_id: restaurant.id,
            active: true
          }
        })
      }
      
      console.log('✅ Categorias criadas')
      
      // Criar caixa padrão
      await prisma.cashRegister.create({
        data: {
          restaurant_id: restaurant.id,
          initial_amount: 0,
          status: 'aberto'
        }
      })
      
      console.log('✅ Caixa criado')
      
      // Criar categorias financeiras
      const financialCategories = [
        { name: 'Vendas', type: 'revenue', color: '#10B981' },
        { name: 'Despesas Operacionais', type: 'expense', color: '#EF4444' },
        { name: 'Impostos', type: 'expense', color: '#F59E0B' },
        { name: 'Salários', type: 'expense', color: '#8B5CF6' }
      ]
      
      for (const category of financialCategories) {
        await prisma.financialCategory.create({
          data: {
            ...category,
            restaurant_id: restaurant.id
          }
        })
      }
      
      console.log('✅ Categorias financeiras criadas')
      
    }
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUser() 