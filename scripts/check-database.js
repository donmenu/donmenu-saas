require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Variáveis de ambiente do Supabase não encontradas');
  console.log('URL:', supabaseUrl ? 'Encontrada' : 'Não encontrada');
  console.log('Key:', supabaseKey ? 'Encontrada' : 'Não encontrada');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndInsertData() {
  try {
    console.log('Verificando tabelas...');

    // 1. Verificar se a tabela categories existe e tem dados
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');

    if (categoriesError) {
      console.error('Erro ao verificar categories:', categoriesError);
    } else {
      console.log(`Tabela categories: ${categories?.length || 0} registros`);
      
      if (!categories || categories.length === 0) {
        console.log('Inserindo categorias de exemplo...');
        const { error: insertError } = await supabase
          .from('categories')
          .insert([
            { name: 'Hambúrgueres' },
            { name: 'Pizzas' },
            { name: 'Bebidas' },
            { name: 'Sobremesas' },
            { name: 'Acompanhamentos' }
          ]);
        
        if (insertError) {
          console.error('Erro ao inserir categorias:', insertError);
        } else {
          console.log('Categorias inseridas com sucesso!');
        }
      }
    }

    // 2. Verificar se a tabela ingredients existe e tem dados
    const { data: ingredients, error: ingredientsError } = await supabase
      .from('ingredients')
      .select('*');

    if (ingredientsError) {
      console.error('Erro ao verificar ingredients:', ingredientsError);
    } else {
      console.log(`Tabela ingredients: ${ingredients?.length || 0} registros`);
      
      if (!ingredients || ingredients.length === 0) {
        console.log('Inserindo ingredientes de exemplo...');
        const { error: insertError } = await supabase
          .from('ingredients')
          .insert([
            { name: 'Pão de Hambúrguer', unit: 'un', cost_per_unit: 2.50 },
            { name: 'Carne Bovina', unit: 'kg', cost_per_unit: 25.00 },
            { name: 'Queijo Cheddar', unit: 'kg', cost_per_unit: 35.00 },
            { name: 'Alface', unit: 'un', cost_per_unit: 1.50 },
            { name: 'Tomate', unit: 'kg', cost_per_unit: 8.00 },
            { name: 'Massa de Pizza', unit: 'kg', cost_per_unit: 12.00 },
            { name: 'Molho de Tomate', unit: 'l', cost_per_unit: 15.00 },
            { name: 'Refrigerante', unit: 'l', cost_per_unit: 6.00 }
          ]);
        
        if (insertError) {
          console.error('Erro ao inserir ingredientes:', insertError);
        } else {
          console.log('Ingredientes inseridos com sucesso!');
        }
      }
    }

    // 3. Verificar se a tabela itens existe e tem dados
    const { data: itens, error: itensError } = await supabase
      .from('itens')
      .select('*');

    if (itensError) {
      console.error('Erro ao verificar itens:', itensError);
    } else {
      console.log(`Tabela itens: ${itens?.length || 0} registros`);
      
      if (!itens || itens.length === 0) {
        console.log('Inserindo itens de exemplo...');
        
        // Primeiro, buscar uma categoria para usar
        const { data: category } = await supabase
          .from('categories')
          .select('category_id')
          .eq('name', 'Hambúrgueres')
          .single();

        if (category) {
          const { error: insertError } = await supabase
            .from('itens')
            .insert([
              {
                name: 'X-Burger',
                description: 'Hambúrguer com queijo, alface e tomate',
                price: 18.90,
                category_id: category.category_id
              },
              {
                name: 'X-Bacon',
                description: 'Hambúrguer com bacon, queijo e molho especial',
                price: 22.90,
                category_id: category.category_id
              }
            ]);
          
          if (insertError) {
            console.error('Erro ao inserir itens:', insertError);
          } else {
            console.log('Itens inseridos com sucesso!');
          }
        }
      }
    }

    console.log('Verificação concluída!');

  } catch (error) {
    console.error('Erro geral:', error);
  }
}

checkAndInsertData(); 