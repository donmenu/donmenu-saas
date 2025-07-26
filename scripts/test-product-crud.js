const fetch = require('node-fetch');

async function testProductCRUD() {
  try {
    console.log('🧪 Testando funcionalidades CRUD de produtos...\n');

    // 1. Testar busca de produtos
    console.log('1️⃣ Testando GET /api/cardapios...');
    
    const productsResponse = await fetch('http://localhost:3001/api/cardapios');
    
    console.log('Status da resposta (produtos):', productsResponse.status);
    
    if (productsResponse.ok) {
      const products = await productsResponse.json();
      console.log(`✅ Encontrados ${products.length} produtos`);
      
      if (products.length > 0) {
        const firstProduct = products[0];
        console.log('\n📋 Primeiro produto encontrado:');
        console.log(`   - ID: ${firstProduct.id}`);
        console.log(`   - Nome: ${firstProduct.name}`);
        console.log(`   - Preço: R$ ${firstProduct.price}`);
        console.log(`   - Ativo: ${firstProduct.active ? 'Sim' : 'Não'}`);
        console.log(`   - Categoria: ${firstProduct.category?.name || 'Sem categoria'}`);
        console.log(`   - Cardápio: ${firstProduct.menu?.name || 'Sem cardápio'}`);

        // 2. Testar atualização de produto
        console.log('\n2️⃣ Testando PUT /api/cardapios/[id]...');
        
        const updateData = {
          name: `${firstProduct.name} - Atualizado`,
          description: 'Produto atualizado via teste',
          price: firstProduct.price + 1,
          image_url: 'https://exemplo.com/imagem-teste.jpg',
          category_id: firstProduct.category_id,
          menu_id: firstProduct.menu_id,
          active: firstProduct.active,
          visible: firstProduct.visible
        };

        const updateResponse = await fetch(`http://localhost:3001/api/cardapios/${firstProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });

        console.log('Status da resposta (update):', updateResponse.status);
        
        if (updateResponse.ok) {
          const updatedProduct = await updateResponse.json();
          console.log('✅ Produto atualizado com sucesso');
          console.log(`   - Novo nome: ${updatedProduct.name}`);
          console.log(`   - Novo preço: R$ ${updatedProduct.price}`);
          console.log(`   - Nova descrição: ${updatedProduct.description}`);
          console.log(`   - Nova imagem: ${updatedProduct.image_url}`);
        } else {
          const error = await updateResponse.json();
          console.log('❌ Erro ao atualizar produto:', error);
        }

        // 3. Testar busca de produtos por menu
        console.log('\n3️⃣ Testando GET /api/cardapios?menu_id=X...');
        
        const menuProductsResponse = await fetch(`http://localhost:3001/api/cardapios?menu_id=${firstProduct.menu_id}`);
        
        if (menuProductsResponse.ok) {
          const menuProducts = await menuProductsResponse.json();
          console.log(`✅ Encontrados ${menuProducts.length} produtos no menu ${firstProduct.menu_id}`);
        } else {
          console.log('❌ Erro ao buscar produtos por menu');
        }

        // 4. Testar busca de menus
        console.log('\n4️⃣ Testando GET /api/menus...');
        
        const menusResponse = await fetch('http://localhost:3001/api/menus');
        
        if (menusResponse.ok) {
          const menus = await menusResponse.json();
          console.log(`✅ Encontrados ${menus.length} menus`);
          
          if (menus.length > 0) {
            console.log('\n📋 Menus encontrados:');
            menus.forEach((menu, index) => {
              console.log(`   ${index + 1}. ${menu.name} (${menu.type})`);
              console.log(`      - Promocional: ${menu.is_promotional ? 'Sim' : 'Não'}`);
              if (menu.is_promotional) {
                console.log(`      - Desconto: ${menu.discount_percentage}%`);
              }
              console.log(`      - Ativo: ${menu.active ? 'Sim' : 'Não'}`);
            });
          }
        } else {
          console.log('❌ Erro ao buscar menus');
        }

        // 5. Testar busca de categorias
        console.log('\n5️⃣ Testando GET /api/categories...');
        
        const categoriesResponse = await fetch('http://localhost:3001/api/categories');
        
        if (categoriesResponse.ok) {
          const categories = await categoriesResponse.json();
          console.log(`✅ Encontradas ${categories.length} categorias`);
          
          if (categories.length > 0) {
            console.log('\n📋 Categorias encontradas:');
            categories.forEach((category, index) => {
              console.log(`   ${index + 1}. ${category.name}`);
            });
          }
        } else {
          console.log('❌ Erro ao buscar categorias');
        }

      } else {
        console.log('   ⚠️ Nenhum produto encontrado');
      }
      
    } else {
      const error = await productsResponse.json();
      console.error('❌ Erro na API de produtos:', error);
    }

    console.log('\n✅ Teste concluído!');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testProductCRUD(); 