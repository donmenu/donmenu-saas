const fetch = require('node-fetch');

async function testCategories() {
  try {
    console.log('Testando API de categorias...');
    
    // Testar busca de categorias
    const response = await fetch('http://localhost:3001/api/categories');
    
    console.log('Status da resposta:', response.status);
    
    if (response.ok) {
      const categories = await response.json();
      console.log('Categorias encontradas:', categories.length);
      
      if (categories.length > 0) {
        console.log('Primeira categoria:', categories[0]);
      } else {
        console.log('Nenhuma categoria encontrada');
      }
    } else {
      const error = await response.json();
      console.error('Erro na busca de categorias:', error);
    }
    
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

testCategories(); 