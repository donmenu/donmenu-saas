#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando banco de dados do Don Menu...\n');

// Verificar se o arquivo .env existe
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('📝 Crie um arquivo .env na raiz do projeto com as seguintes variáveis:');
  console.log('');
  console.log('DATABASE_URL="mysql://usuario:senha@localhost:3306/donmenu"');
  console.log('NEXTAUTH_SECRET="sua-chave-secreta-aqui"');
  console.log('NEXTAUTH_URL="http://localhost:3000"');
  console.log('');
  process.exit(1);
}

// Função para executar comandos
function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} concluído!\n`);
  } catch (error) {
    console.error(`❌ Erro ao ${description.toLowerCase()}:`, error.message);
    process.exit(1);
  }
}

// Verificar se o Prisma CLI está instalado
try {
  execSync('npx prisma --version', { stdio: 'ignore' });
} catch (error) {
  console.log('📦 Instalando Prisma CLI...');
  runCommand('npm install -g prisma', 'Instalar Prisma CLI');
}

// Gerar cliente Prisma
runCommand('npx prisma generate', 'Gerar cliente Prisma');

// Executar migrações
runCommand('npx prisma migrate deploy', 'Executar migrações do banco');

// Executar seed
console.log('🌱 Executando seed do banco de dados...');
try {
  execSync('npx prisma db seed', { stdio: 'inherit' });
  console.log('✅ Seed concluído!\n');
} catch (error) {
  console.log('⚠️ Erro ao executar seed. Verifique se o banco está configurado corretamente.');
  console.log('💡 Execute manualmente: npx prisma db seed\n');
}

// Verificar conexão com o banco
console.log('🔍 Verificando conexão com o banco de dados...');
try {
  execSync('npx prisma db pull', { stdio: 'ignore' });
  console.log('✅ Conexão com o banco estabelecida!\n');
} catch (error) {
  console.log('❌ Erro ao conectar com o banco de dados.');
  console.log('💡 Verifique se:');
  console.log('   - O banco MySQL está rodando');
  console.log('   - A DATABASE_URL está correta no .env');
  console.log('   - O usuário tem permissões para acessar o banco\n');
  process.exit(1);
}

console.log('🎉 Configuração do banco de dados concluída!');
console.log('');
console.log('📋 Próximos passos:');
console.log('   1. Execute: npm run dev');
console.log('   2. Acesse: http://localhost:3000');
console.log('   3. Faça login com: admin@restauranteexemplo.com / admin123');
console.log('');
console.log('🔧 Comandos úteis:');
console.log('   - npx prisma studio (abrir interface do banco)');
console.log('   - npx prisma db seed (executar seed novamente)');
console.log('   - npx prisma migrate reset (resetar banco)');
console.log(''); 