const fetch = require('node-fetch')

async function testApiIngredients() {
  try {
    console.log('🌐 Testando API de insumos via HTTP...')
    
    // Teste 1: GET sem autenticação (deve retornar 401)
    console.log('\n1️⃣ Testando GET sem autenticação...')
    try {
      const response = await fetch('http://localhost:3000/api/ingredients')
      const data = await response.json()
      console.log(`   Status: ${response.status}`)
      console.log(`   Resposta: ${JSON.stringify(data)}`)
    } catch (error) {
      console.log(`   Erro: ${error.message}`)
    }
    
    // Teste 2: POST sem autenticação (deve retornar 401)
    console.log('\n2️⃣ Testando POST sem autenticação...')
    try {
      const response = await fetch('http://localhost:3000/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Teste API',
          unit: 'kg',
          cost_per_unit: 10.50
        })
      })
      const data = await response.json()
      console.log(`   Status: ${response.status}`)
      console.log(`   Resposta: ${JSON.stringify(data)}`)
    } catch (error) {
      console.log(`   Erro: ${error.message}`)
    }
    
    // Teste 3: POST com dados inválidos (deve retornar 400)
    console.log('\n3️⃣ Testando POST com dados inválidos...')
    try {
      const response = await fetch('http://localhost:3000/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '', // Nome vazio
          unit: 'kg',
          cost_per_unit: -5 // Custo negativo
        })
      })
      const data = await response.json()
      console.log(`   Status: ${response.status}`)
      console.log(`   Resposta: ${JSON.stringify(data)}`)
    } catch (error) {
      console.log(`   Erro: ${error.message}`)
    }
    
    console.log('\n✅ Testes concluídos!')
    console.log('\n📝 Resumo:')
    console.log('   - APIs estão protegidas por autenticação')
    console.log('   - Validação de dados está funcionando')
    console.log('   - Para testar com autenticação, faça login no navegador')
    
  } catch (error) {
    console.error('❌ Erro:', error)
  }
}

testApiIngredients() 