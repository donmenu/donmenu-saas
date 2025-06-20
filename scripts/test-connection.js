require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco...');
    
    // Testar conexão básica
    await prisma.$connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Verificar se as tabelas existem
    console.log('\n📋 Verificando tabelas...');
    
    try {
      const restaurants = await prisma.restaurant.findMany({ take: 1 });
      console.log('✅ Tabela restaurants: OK');
    } catch (error) {
      console.log('❌ Tabela restaurants: ERRO -', error.message);
    }
    
    try {
      const categories = await prisma.category.findMany({ take: 1 });
      console.log('✅ Tabela categories: OK');
    } catch (error) {
      console.log('❌ Tabela categories: ERRO -', error.message);
    }
    
    try {
      const ingredients = await prisma.ingredient.findMany({ take: 1 });
      console.log('✅ Tabela ingredients: OK');
    } catch (error) {
      console.log('❌ Tabela ingredients: ERRO -', error.message);
    }
    
    try {
      const menuItems = await prisma.menuItem.findMany({ take: 1 });
      console.log('✅ Tabela menu_items: OK');
    } catch (error) {
      console.log('❌ Tabela menu_items: ERRO -', error.message);
    }
    
    console.log('\n🎯 Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 