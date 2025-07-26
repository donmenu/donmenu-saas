const fetch = require('node-fetch');

async function testMenusList() {
  try {
    console.log('🧪 Testando funcionalidade de listagem de cardápios...\n');

    // 1. Testar busca de cardápios
    console.log('1️⃣ Testando GET /api/menus...');
    
    const menusResponse = await fetch('http://localhost:3001/api/menus');
    
    console.log('Status da resposta (menus):', menusResponse.status);
    
    if (menusResponse.ok) {
      const menus = await menusResponse.json();
      console.log(`✅ Encontrados ${menus.length} cardápios`);
      
      if (menus.length > 0) {
        console.log('\n📋 Cardápios encontrados:');
        menus.forEach((menu, index) => {
          console.log(`   ${index + 1}. ${menu.name} (${menu.type})`);
          console.log(`      - Promocional: ${menu.is_promotional ? 'Sim' : 'Não'}`);
          if (menu.is_promotional) {
            console.log(`      - Desconto: ${menu.discount_percentage}%`);
            console.log(`      - Válido: ${menu.valid_from} até ${menu.valid_to}`);
          }
          console.log(`      - Ativo: ${menu.active ? 'Sim' : 'Não'}`);
        });

        // 2. Testar busca de itens por cardápio
        console.log('\n2️⃣ Testando busca de itens por cardápio...');
        
        for (const menu of menus) {
          console.log(`\n   Buscando itens do cardápio: ${menu.name}`);
          
          const itemsResponse = await fetch(`http://localhost:3001/api/cardapios?menu_id=${menu.id}`);
          
          if (itemsResponse.ok) {
            const items = await itemsResponse.json();
            console.log(`   ✅ ${items.length} itens encontrados`);
            
            if (items.length > 0) {
              console.log('   Primeiros itens:');
              items.slice(0, 3).forEach(item => {
                console.log(`      - ${item.name} (R$ ${item.price})`);
                console.log(`        Categoria: ${item.category?.name || 'Sem categoria'}`);
                console.log(`        Ativo: ${item.active ? 'Sim' : 'Não'}`);
              });
            }
          } else {
            console.log(`   ❌ Erro ao buscar itens: ${itemsResponse.status}`);
          }
        }

        // 3. Calcular métricas
        console.log('\n3️⃣ Calculando métricas...');
        
        let totalItems = 0;
        const activeMenus = menus.filter(m => m.active).length;
        const promotionalMenus = menus.filter(m => m.is_promotional).length;
        
        for (const menu of menus) {
          const itemsResponse = await fetch(`http://localhost:3001/api/cardapios?menu_id=${menu.id}`);
          if (itemsResponse.ok) {
            const items = await itemsResponse.json();
            totalItems += items.length;
          }
        }
        
        console.log('   📊 Métricas calculadas:');
        console.log(`      - Total de cardápios: ${menus.length}`);
        console.log(`      - Cardápios ativos: ${activeMenus}`);
        console.log(`      - Cardápios promocionais: ${promotionalMenus}`);
        console.log(`      - Total de itens: ${totalItems}`);

      } else {
        console.log('   ⚠️ Nenhum cardápio encontrado');
      }
      
    } else {
      const error = await menusResponse.json();
      console.error('❌ Erro na API de menus:', error);
    }

    console.log('\n✅ Teste concluído!');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testMenusList(); 