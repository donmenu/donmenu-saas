const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAndCreateCategories() {
  try {
    console.log('🔍 Verificando categorias existentes...');
    
    // Buscar todos os restaurantes
    const restaurants = await prisma.restaurant.findMany({
      select: { id: true, name: true }
    });
    
    console.log(`Encontrados ${restaurants.length} restaurantes`);
    
    for (const restaurant of restaurants) {
      console.log(`\n🏪 Verificando restaurante: ${restaurant.name} (ID: ${restaurant.id})`);
      
      // Verificar categorias existentes
      const existingCategories = await prisma.category.findMany({
        where: { restaurant_id: restaurant.id },
        select: { id: true, name: true }
      });
      
      console.log(`   Categorias existentes: ${existingCategories.length}`);
      
      if (existingCategories.length === 0) {
        console.log('   ❌ Nenhuma categoria encontrada. Criando categorias padrão...');
        
        // Criar categorias padrão
        const defaultCategories = [
          { name: 'Entradas', description: 'Pratos de entrada', color: '#FF6B6B', icon: '🍽️', sort_order: 0 },
          { name: 'Pratos Principais', description: 'Pratos principais', color: '#4ECDC4', icon: '🍖', sort_order: 1 },
          { name: 'Sobremesas', description: 'Sobremesas e doces', color: '#45B7D1', icon: '🍰', sort_order: 2 },
          { name: 'Bebidas', description: 'Bebidas e refrigerantes', color: '#96CEB4', icon: '🥤', sort_order: 3 },
          { name: 'Acompanhamentos', description: 'Acompanhamentos', color: '#FFEAA7', icon: '🥔', sort_order: 4 }
        ];
        
        for (const category of defaultCategories) {
          const created = await prisma.category.create({
            data: {
              ...category,
              restaurant_id: restaurant.id,
              active: true
            }
          });
          console.log(`   ✅ Categoria criada: ${created.name}`);
        }
      } else {
        console.log('   ✅ Categorias já existem:');
        existingCategories.forEach(cat => {
          console.log(`      - ${cat.name}`);
        });
      }
    }
    
    console.log('\n✅ Verificação concluída!');
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndCreateCategories(); 