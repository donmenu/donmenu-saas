const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...')
    
    // Testar conexão básica
    await prisma.$connect()
    console.log('✅ Conexão estabelecida com sucesso!')
    
    // Testar contagem de tabelas
    const categoriesCount = await prisma.categories.count()
    console.log(`📂 Categorias: ${categoriesCount}`)
    
    const ingredientsCount = await prisma.ingredients.count()
    console.log(`🥕 Ingredientes: ${ingredientsCount}`)
    
    const itensCount = await prisma.itens.count()
    console.log(`🍽️ Itens: ${itensCount}`)
    
    const fichasCount = await prisma.fichas_tecnicas.count()
    console.log(`📋 Fichas técnicas: ${fichasCount}`)
    
    // Testar busca de fichas técnicas
    const fichasTecnicas = await prisma.fichas_tecnicas.findMany({
      include: {
        item: {
          include: {
            category: true
          }
        },
        ficha_ingredientes: {
          include: {
            ingredient: true
          }
        }
      },
      take: 1
    })
    
    console.log(`🔍 Teste de busca: ${fichasTecnicas.length} fichas encontradas`)
    
    if (fichasTecnicas.length > 0) {
      console.log('📊 Exemplo de ficha técnica:')
      console.log(`   - Item: ${fichasTecnicas[0].item.name}`)
      console.log(`   - Categoria: ${fichasTecnicas[0].item.category.name}`)
      console.log(`   - Ingredientes: ${fichasTecnicas[0].ficha_ingredientes.length}`)
    }
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message)
    console.error('Stack trace:', error.stack)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 