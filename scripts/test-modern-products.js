const fetch = require('node-fetch');

async function testModernProducts() {
  try {
    console.log('🧪 Testando visualização moderna de produtos...\n');

    // 1. Testar busca de produtos
    console.log('1️⃣ Testando GET /api/cardapios...');
    
    const productsResponse = await fetch('http://localhost:3001/api/cardapios');
    
    console.log('Status da resposta (produtos):', productsResponse.status);
    
    if (productsResponse.ok) {
      const products = await productsResponse.json();
      console.log(`✅ Encontrados ${products.length} produtos`);
      
      if (products.length > 0) {
        console.log('\n📋 Produtos encontrados:');
        products.forEach((product, index) => {
          console.log(`   ${index + 1}. ${product.name}`);
          console.log(`      - Preço: R$ ${product.price}`);
          console.log(`      - Categoria: ${product.category?.name || 'Sem categoria'}`);
          console.log(`      - Cardápio: ${product.menu?.name || 'Sem cardápio'}`);
          console.log(`      - Ativo: ${product.active ? 'Sim' : 'Não'}`);
          console.log(`      - Ficha Técnica: ${product.recipe_id ? 'Sim' : 'Não'}`);
        });

        // 2. Testar busca de menus
        console.log('\n2️⃣ Testando GET /api/menus...');
        
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
        }

        // 3. Testar agrupamento por menu e categoria
        console.log('\n3️⃣ Testando agrupamento de produtos...');
        
        const menuGroups = {};
        products.forEach(product => {
          const menuName = product.menu?.name || 'Sem Cardápio';
          const categoryName = product.category?.name || 'Sem Categoria';
          
          if (!menuGroups[menuName]) {
            menuGroups[menuName] = {};
          }
          
          if (!menuGroups[menuName][categoryName]) {
            menuGroups[menuName][categoryName] = [];
          }
          
          menuGroups[menuName][categoryName].push(product);
        });

        console.log('\n📊 Agrupamento por Menu e Categoria:');
        Object.entries(menuGroups).forEach(([menuName, categories]) => {
          console.log(`\n   🍽️ ${menuName}:`);
          Object.entries(categories).forEach(([categoryName, products]) => {
            console.log(`      🏷️ ${categoryName}: ${products.length} produtos`);
            products.forEach(product => {
              console.log(`         - ${product.name} (R$ ${product.price})`);
            });
          });
        });

        // 4. Testar busca de ficha técnica (se houver produtos com recipe_id)
        const productsWithRecipe = products.filter(p => p.recipe_id);
        if (productsWithRecipe.length > 0) {
          console.log('\n4️⃣ Testando busca de fichas técnicas...');
          
          const firstProductWithRecipe = productsWithRecipe[0];
          console.log(`   Testando ficha técnica do produto: ${firstProductWithRecipe.name}`);
          
          const recipeResponse = await fetch(`http://localhost:3001/api/ficha-tecnica/${firstProductWithRecipe.recipe_id}`);
          
          if (recipeResponse.ok) {
            const recipe = await recipeResponse.json();
            console.log('✅ Ficha técnica encontrada');
            console.log(`   - Nome: ${recipe.name}`);
            console.log(`   - Categoria: ${recipe.category?.name || 'Sem categoria'}`);
            console.log(`   - Ingredientes: ${recipe.ingredients?.length || 0}`);
            
            if (recipe.ingredients && recipe.ingredients.length > 0) {
              console.log('\n   📋 Ingredientes:');
              recipe.ingredients.forEach((ingredient, index) => {
                console.log(`      ${index + 1}. ${ingredient.ingredient?.name || ingredient.name}`);
                console.log(`         - Quantidade: ${ingredient.quantity} ${ingredient.unit}`);
                console.log(`         - Custo: R$ ${ingredient.cost || 0}`);
              });
            }
          } else {
            console.log('❌ Erro ao buscar ficha técnica');
          }
        } else {
          console.log('\n4️⃣ Nenhum produto com ficha técnica encontrado');
        }

        // 5. Calcular métricas
        console.log('\n5️⃣ Calculando métricas...');
        
        const activeProducts = products.filter(p => p.active).length;
        const totalMenus = menus.length;
        const promotionalMenus = menus.filter(m => m.is_promotional).length;
        
        console.log('   📊 Métricas calculadas:');
        console.log(`      - Total de produtos: ${products.length}`);
        console.log(`      - Produtos ativos: ${activeProducts}`);
        console.log(`      - Total de menus: ${totalMenus}`);
        console.log(`      - Menus promocionais: ${promotionalMenus}`);

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

testModernProducts(); 