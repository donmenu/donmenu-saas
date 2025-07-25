const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testLogin() {
  try {
    console.log('🔐 Testando login do usuário w_patriota@hotmail.com...')
    
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: 'w_patriota@hotmail.com' }
    })
    
    if (!user) {
      console.log('❌ Usuário não encontrado')
      return
    }
    
    console.log('✅ Usuário encontrado:')
    console.log(`   ID: ${user.id}`)
    console.log(`   Nome: ${user.name}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Tem senha: ${!!user.password}`)
    
    // Testar senha
    const testPassword = '123456'
    const isValid = await bcrypt.compare(testPassword, user.password)
    
    console.log(`\n🔑 Testando senha: ${testPassword}`)
    console.log(`   Senha válida: ${isValid ? '✅ SIM' : '❌ NÃO'}`)
    
    if (isValid) {
      console.log('\n🎉 Login funcionando corretamente!')
      console.log('   Você pode fazer login com:')
      console.log(`   Email: ${user.email}`)
      console.log(`   Senha: ${testPassword}`)
    } else {
      console.log('\n❌ Problema com a senha')
      console.log('   Vamos recriar a senha...')
      
      const newPassword = await bcrypt.hash(testPassword, 12)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: newPassword }
      })
      
      console.log('✅ Senha atualizada!')
      console.log(`   Nova senha: ${testPassword}`)
    }
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin() 