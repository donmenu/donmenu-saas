const fetch = require('node-fetch');

async function testPromotionalMenus() {
  try {
    console.log('🧪 Testando funcionalidade de cardápios promocionais...\n');

    // 1. Buscar cardápios existentes
    console.log('1️⃣ Buscando cardápios existentes...');
    const getResponse = await fetch('http://localhost:3001/api/menus');
    const existingMenus = await getResponse.json();
    console.log(`   Encontrados ${existingMenus.length} cardápios`);
    
    if (existingMenus.length > 0) {
      console.log('   Primeiro cardápio:', existingMenus[0].name);
    }

    // 2. Criar um cardápio promocional
    console.log('\n2️⃣ Criando cardápio promocional...');
    const promotionalMenuData = {
      name: 'Promoção de Verão 2024',
      description: 'Cardápio especial com desconto para o verão',
      type: 'promocional',
      is_promotional: true,
      discount_percentage: 15.5,
      valid_from: '2024-12-01',
      valid_to: '2024-12-31',
      image_url: 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=Promoção+Verão',
      sort_order: 10
    };

    const createResponse = await fetch('http://localhost:3001/api/menus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promotionalMenuData)
    });

    if (createResponse.ok) {
      const createdMenu = await createResponse.json();
      console.log('   ✅ Cardápio promocional criado:', createdMenu.name);
      console.log('   Desconto:', createdMenu.discount_percentage + '%');
      console.log('   Válido de:', createdMenu.valid_from);
      console.log('   Válido até:', createdMenu.valid_to);

      // 3. Atualizar o cardápio promocional
      console.log('\n3️⃣ Atualizando cardápio promocional...');
      const updateData = {
        ...promotionalMenuData,
        discount_percentage: 20.0,
        description: 'Cardápio especial com desconto de 20% para o verão'
      };

      const updateResponse = await fetch(`http://localhost:3001/api/menus/${createdMenu.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (updateResponse.ok) {
        const updatedMenu = await updateResponse.json();
        console.log('   ✅ Cardápio promocional atualizado');
        console.log('   Novo desconto:', updatedMenu.discount_percentage + '%');
        console.log('   Nova descrição:', updatedMenu.description);
      } else {
        const error = await updateResponse.json();
        console.error('   ❌ Erro ao atualizar:', error);
      }

      // 4. Criar um cardápio normal para comparação
      console.log('\n4️⃣ Criando cardápio normal...');
      const normalMenuData = {
        name: 'Cardápio Executivo',
        description: 'Cardápio para almoço executivo',
        type: 'principal',
        is_promotional: false,
        sort_order: 5
      };

      const normalCreateResponse = await fetch('http://localhost:3001/api/menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalMenuData)
      });

      if (normalCreateResponse.ok) {
        const normalMenu = await normalCreateResponse.json();
        console.log('   ✅ Cardápio normal criado:', normalMenu.name);
        console.log('   É promocional:', normalMenu.is_promotional);
      } else {
        const error = await normalCreateResponse.json();
        console.error('   ❌ Erro ao criar cardápio normal:', error);
      }

      // 5. Buscar todos os cardápios novamente
      console.log('\n5️⃣ Buscando todos os cardápios após criação...');
      const finalGetResponse = await fetch('http://localhost:3001/api/menus');
      const allMenus = await finalGetResponse.json();
      
      console.log(`   Total de cardápios: ${allMenus.length}`);
      
      const promotionalMenus = allMenus.filter(menu => menu.is_promotional);
      const normalMenus = allMenus.filter(menu => !menu.is_promotional);
      
      console.log(`   Cardápios promocionais: ${promotionalMenus.length}`);
      console.log(`   Cardápios normais: ${normalMenus.length}`);

      promotionalMenus.forEach(menu => {
        console.log(`   - ${menu.name} (${menu.discount_percentage}% de desconto)`);
      });

    } else {
      const error = await createResponse.json();
      console.error('   ❌ Erro ao criar cardápio promocional:', error);
    }

    console.log('\n✅ Teste concluído!');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testPromotionalMenus(); 