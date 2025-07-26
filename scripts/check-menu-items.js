const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkMenuItems() {
  try {
    console.log('🔍 Verificando itens de cardápio existentes...\n');
    
    // Buscar todos os restaurantes
    const restaurants = await prisma.restaurant.findMany({
      select: { id: true, name: true }
    });
    
    console.log(`Encontrados ${restaurants.length} restaurantes`);
    
    for (const restaurant of restaurants) {
      console.log(`\n🏪 Verificando restaurante: ${restaurant.name} (ID: ${restaurant.id})`);
      
      // Verificar menus existentes
      const menus = await prisma.menu.findMany({
        where: { restaurant_id: restaurant.id },
        select: { id: true, name: true, type: true }
      });
      
      console.log(`   Menus encontrados: ${menus.length}`);
      menus.forEach(menu => {
        console.log(`   - ${menu.name} (${menu.type})`);
      });
      
      // Verificar itens de menu
      const menuItems = await prisma.menuItem.findMany({
        where: { restaurant_id: restaurant.id },
        include: {
          category: true,
          menu: true
        }
      });
      
      console.log(`   Itens de cardápio encontrados: ${menuItems.length}`);
      
      if (menuItems.length === 0) {
        console.log('   ❌ Nenhum item de cardápio encontrado.');
        
        // Verificar se há categorias
        const categories = await prisma.category.findMany({
          where: { restaurant_id: restaurant.id },
          select: { id: true, name: true }
        });
        
        console.log(`   Categorias disponíveis: ${categories.length}`);
        
        // Verificar se há receitas
        const recipes = await prisma.recipe.findMany({
          where: { restaurant_id: restaurant.id },
          select: { id: true, name: true }
        });
        
        console.log(`   Receitas disponíveis: ${recipes.length}`);
        
        if (menus.length > 0 && categories.length > 0) {
          console.log('   💡 Sugestão: Criar alguns itens de exemplo...');
          
          // Criar alguns itens de exemplo
          const sampleItems = [
            {
              name: 'X-Burger Clássico',
              description: 'Hambúrguer com queijo, alface e tomate',
              price: 25.90,
              menu_id: menus[0].id,
              category_id: categories[0].id,
              active: true
            },
            {
              name: 'Batata Frita',
              description: 'Porção de batatas fritas crocantes',
              price: 12.90,
              menu_id: menus[0].id,
              category_id: categories[0].id,
              active: true
            }
          ];
          
          for (const item of sampleItems) {
            try {
              const created = await prisma.menuItem.create({
                data: {
                  restaurant_id: restaurant.id,
                  ...item
                }
              });
              console.log(`   ✅ Item criado: ${created.name} - R$ ${created.price}`);
            } catch (error) {
              console.log(`   ❌ Erro ao criar item ${item.name}:`, error.message);
            }
          }
        }
      } else {
        console.log('   ✅ Itens encontrados:');
        menuItems.forEach(item => {
          console.log(`   - ${item.name} (R$ ${item.price}) - ${item.active ? 'Ativo' : 'Inativo'}`);
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

checkMenuItems(); 