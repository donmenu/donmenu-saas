const fetch = require('node-fetch');

async function testCardapiosAPI() {
  try {
    console.log('🧪 Testando API de cardápios...\n');

    // 1. Testar busca de cardápios
    console.log('1️⃣ Testando GET /api/cardapios...');
    
    const response = await fetch('http://localhost:3001/api/cardapios');
    
    console.log('Status da resposta:', response.status);
    
    if (response.ok) {
      const cardapios = await response.json();
      console.log(`✅ Encontrados ${cardapios.length} itens de cardápio`);
      
      if (cardapios.length > 0) {
        console.log('\n📋 Primeiro item:');
        console.log('   ID:', cardapios[0].id);
        console.log('   Nome:', cardapios[0].name);
        console.log('   Preço:', cardapios[0].price);
        console.log('   Ativo:', cardapios[0].active);
        console.log('   Menu ID:', cardapios[0].menu_id);
        console.log('   Categoria:', cardapios[0].category?.name || 'Sem categoria');
        console.log('   Menu:', cardapios[0].menu?.name || 'Sem menu');
      }
      
      // Calcular métricas
      const total = cardapios.length;
      const ativos = cardapios.filter(c => c.active).length;
      const inativos = cardapios.filter(c => !c.active).length;
      
      console.log('\n📊 Métricas:');
      console.log('   Total de itens:', total);
      console.log('   Itens ativos:', ativos);
      console.log('   Itens inativos:', inativos);
      
    } else {
      const error = await response.json();
      console.error('❌ Erro na API:', error);
    }

    // 2. Testar busca com filtro
    console.log('\n2️⃣ Testando busca com filtro...');
    
    const searchResponse = await fetch('http://localhost:3001/api/cardapios?search=burger');
    
    if (searchResponse.ok) {
      const searchResults = await searchResponse.json();
      console.log(`✅ Busca por "burger" retornou ${searchResults.length} resultados`);
    } else {
      console.error('❌ Erro na busca');
    }

    console.log('\n✅ Teste concluído!');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testCardapiosAPI(); 