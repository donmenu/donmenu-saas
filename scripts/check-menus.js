const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkMenus() {
  try {
    console.log('🔍 Verificando menus existentes...');
    
    // Buscar todos os restaurantes
    const restaurants = await prisma.restaurant.findMany({
      select: { id: true, name: true }
    });
    
    console.log(`Encontrados ${restaurants.length} restaurantes`);
    
    for (const restaurant of restaurants) {
      console.log(`\n🏪 Verificando restaurante: ${restaurant.name} (ID: ${restaurant.id})`);
      
      // Verificar menus existentes
      const existingMenus = await prisma.menu.findMany({
        where: { restaurant_id: restaurant.id },
        select: { id: true, name: true, type: true, active: true }
      });
      
      console.log(`   Menus existentes: ${existingMenus.length}`);
      
      if (existingMenus.length === 0) {
        console.log('   ❌ Nenhum menu encontrado. Criando menus padrão...');
        
        // Criar menus padrão
        const defaultMenus = [
          { name: 'Cardápio Principal', description: 'Cardápio completo do restaurante', type: 'principal', sort_order: 1 },
          { name: 'Cardápio Delivery', description: 'Especial para delivery', type: 'delivery', sort_order: 2 },
          { name: 'Cardápio Sobremesas', description: 'Apenas sobremesas', type: 'sobremesas', sort_order: 3 }
        ];
        
        for (const menu of defaultMenus) {
          const created = await prisma.menu.create({
            data: {
              restaurant_id: restaurant.id,
              ...menu,
              active: true
            }
          });
          console.log(`   ✅ Menu criado: ${created.name} (${created.type})`);
        }
      } else {
        console.log('   ✅ Menus já existem:');
        existingMenus.forEach(menu => {
          console.log(`      - ${menu.name} (${menu.type}) - ${menu.active ? 'Ativo' : 'Inativo'}`);
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

checkMenus(); 