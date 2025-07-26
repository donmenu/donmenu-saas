const fetch = require('node-fetch');

async function testCombos() {
  try {
    console.log('🧪 Testando funcionalidade de combos...\n');

    // 1. Testar busca de combos
    console.log('1️⃣ Testando GET /api/combos...');
    
    const combosResponse = await fetch('http://localhost:3001/api/combos');
    
    console.log('Status da resposta (combos):', combosResponse.status);
    
    if (combosResponse.ok) {
      const combos = await combosResponse.json();
      console.log(`✅ Encontrados ${combos.length} combos`);
      
      if (combos.length > 0) {
        console.log('\n📋 Combos encontrados:');
        combos.forEach((combo, index) => {
          console.log(`   ${index + 1}. ${combo.name}`);
          console.log(`      - Preço: R$ ${combo.price}`);
          console.log(`      - Desconto: ${combo.discount || 0}%`);
          console.log(`      - Ativo: ${combo.active ? 'Sim' : 'Não'}`);
          console.log(`      - Itens: ${combo.items?.length || 0}`);
          console.log(`      - Economia: R$ ${combo.total_savings || 0}`);
        });
      }
    } else {
      const error = await combosResponse.json();
      console.error('❌ Erro na API de combos:', error);
    }

    // 2. Testar busca de produtos para criar combo
    console.log('\n2️⃣ Testando GET /api/cardapios (para produtos)...');
    
    const productsResponse = await fetch('http://localhost:3001/api/cardapios');
    
    if (productsResponse.ok) {
      const products = await productsResponse.json();
      console.log(`✅ Encontrados ${products.length} produtos disponíveis`);
      
      if (products.length > 0) {
        console.log('\n📋 Produtos disponíveis para combo:');
        products.slice(0, 5).forEach((product, index) => {
          console.log(`   ${index + 1}. ${product.name} - R$ ${product.price}`);
        });

        // 3. Testar criação de combo
        console.log('\n3️⃣ Testando POST /api/combos (criar combo)...');
        
        const comboData = {
          name: 'Combo Teste - X-Burger + Batata + Refri',
          description: 'Combo especial com hambúrguer, batata frita e refrigerante',
          price: 25.90,
          discount: 15,
          image_url: 'https://exemplo.com/combo-teste.jpg',
          valid_from: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Amanhã
          valid_to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
          items: products.slice(0, 3).map(product => ({
            menu_item_id: product.id,
            quantity: 1,
            discount: 0
          }))
        };

        console.log('📝 Dados do combo a ser criado:');
        console.log(`   - Nome: ${comboData.name}`);
        console.log(`   - Preço: R$ ${comboData.price}`);
        console.log(`   - Desconto: ${comboData.discount}%`);
        console.log(`   - Itens: ${comboData.items.length}`);

        const createResponse = await fetch('http://localhost:3001/api/combos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comboData)
        });

        console.log('Status da resposta (criar combo):', createResponse.status);
        
        if (createResponse.ok) {
          const newCombo = await createResponse.json();
          console.log('✅ Combo criado com sucesso!');
          console.log(`   - ID: ${newCombo.id}`);
          console.log(`   - Nome: ${newCombo.name}`);
          console.log(`   - Preço: R$ ${newCombo.price}`);
          console.log(`   - Itens: ${newCombo.items?.length || 0}`);

          // 4. Testar atualização do combo
          console.log('\n4️⃣ Testando PUT /api/combos/[id] (atualizar combo)...');
          
          const updateData = {
            name: 'Combo Teste Atualizado - X-Burger + Batata + Refri',
            description: 'Combo especial atualizado com hambúrguer, batata frita e refrigerante',
            price: 29.90,
            discount: 20,
            active: true,
            items: products.slice(0, 2).map(product => ({
              menu_item_id: product.id,
              quantity: 2,
              discount: 5
            }))
          };

          console.log('📝 Dados do combo a ser atualizado:');
          console.log(`   - Novo preço: R$ ${updateData.price}`);
          console.log(`   - Novo desconto: ${updateData.discount}%`);
          console.log(`   - Novos itens: ${updateData.items.length}`);

          const updateResponse = await fetch(`http://localhost:3001/api/combos/${newCombo.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
          });

          console.log('Status da resposta (atualizar combo):', updateResponse.status);
          
          if (updateResponse.ok) {
            const updatedCombo = await updateResponse.json();
            console.log('✅ Combo atualizado com sucesso!');
            console.log(`   - Novo nome: ${updatedCombo.name}`);
            console.log(`   - Novo preço: R$ ${updatedCombo.price}`);
            console.log(`   - Novos itens: ${updatedCombo.items?.length || 0}`);
          } else {
            const error = await updateResponse.json();
            console.error('❌ Erro ao atualizar combo:', error);
          }

          // 5. Testar exclusão do combo
          console.log('\n5️⃣ Testando DELETE /api/combos/[id] (excluir combo)...');
          
          const deleteResponse = await fetch(`http://localhost:3001/api/combos/${newCombo.id}`, {
            method: 'DELETE'
          });

          console.log('Status da resposta (excluir combo):', deleteResponse.status);
          
          if (deleteResponse.ok) {
            const deleteResult = await deleteResponse.json();
            console.log('✅ Combo excluído com sucesso!');
            console.log(`   - Mensagem: ${deleteResult.message}`);
          } else {
            const error = await deleteResponse.json();
            console.error('❌ Erro ao excluir combo:', error);
          }

        } else {
          const error = await createResponse.json();
          console.error('❌ Erro ao criar combo:', error);
        }
      } else {
        console.log('⚠️ Nenhum produto encontrado para criar combo');
      }
    } else {
      const error = await productsResponse.json();
      console.error('❌ Erro na API de produtos:', error);
    }

    // 6. Testar busca final de combos
    console.log('\n6️⃣ Testando GET /api/combos (verificação final)...');
    
    const finalCombosResponse = await fetch('http://localhost:3001/api/combos');
    
    if (finalCombosResponse.ok) {
      const finalCombos = await finalCombosResponse.json();
      console.log(`✅ Verificação final: ${finalCombos.length} combos existentes`);
    }

    console.log('\n✅ Teste de combos concluído!');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testCombos(); 