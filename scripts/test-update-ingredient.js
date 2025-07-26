const fetch = require('node-fetch');

async function testUpdateIngredient() {
  try {
    console.log('Testando atualização de ingrediente...');
    
    // Primeiro, vamos buscar um ingrediente existente
    const getResponse = await fetch('http://localhost:3001/api/ingredients');
    const ingredients = await getResponse.json();
    
    if (ingredients.length === 0) {
      console.log('Nenhum ingrediente encontrado para testar');
      return;
    }
    
    const firstIngredient = ingredients[0];
    console.log('Ingrediente encontrado:', firstIngredient);
    
    // Testar atualização
    const updateData = {
      name: firstIngredient.name + ' (Atualizado)',
      unit: firstIngredient.unit,
      cost_per_unit: firstIngredient.cost_per_unit,
      description: 'Descrição de teste',
      supplier: 'Fornecedor de teste',
      current_stock: 10,
      min_stock: 5,
      image_url: 'https://via.placeholder.com/300x200'
    };
    
    console.log('Dados para atualização:', updateData);
    
    const updateResponse = await fetch(`http://localhost:3001/api/ingredients/${firstIngredient.ingredient_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    
    console.log('Status da resposta:', updateResponse.status);
    
    if (updateResponse.ok) {
      const updatedIngredient = await updateResponse.json();
      console.log('Ingrediente atualizado com sucesso:', updatedIngredient);
    } else {
      const error = await updateResponse.json();
      console.error('Erro na atualização:', error);
    }
    
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

testUpdateIngredient(); 