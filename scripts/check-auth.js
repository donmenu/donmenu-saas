#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔍 Verificando configuração da autenticação...\n')

// Verificar se o arquivo .env.local existe
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env.local não encontrado!')
  console.log('📝 Crie o arquivo .env.local na raiz do projeto com as seguintes variáveis:')
  console.log(`
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
FACEBOOK_ID=your-facebook-client-id
FACEBOOK_SECRET=your-facebook-client-secret
  `)
  process.exit(1)
}

// Ler o arquivo .env.local
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    envVars[key.trim()] = value.trim()
  }
})

// Verificar variáveis obrigatórias
const requiredVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_ID',
  'GOOGLE_SECRET'
]

const missingVars = requiredVars.filter(varName => !envVars[varName])

if (missingVars.length > 0) {
  console.log('❌ Variáveis de ambiente obrigatórias não encontradas:')
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`)
  })
  console.log('\n📝 Adicione essas variáveis ao arquivo .env.local')
  process.exit(1)
}

console.log('✅ Configuração da autenticação verificada com sucesso!')
console.log('\n📋 Variáveis encontradas:')
requiredVars.forEach(varName => {
  const value = envVars[varName]
  const maskedValue = value.length > 8 ? value.substring(0, 8) + '...' : value
  console.log(`   - ${varName}: ${maskedValue}`)
})

console.log('\n🚀 Para configurar o Google OAuth:')
console.log('1. Acesse https://console.cloud.google.com/')
console.log('2. Crie um projeto ou selecione um existente')
console.log('3. Ative a API do Google+')
console.log('4. Vá para "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"')
console.log('5. Configure as URIs de redirecionamento:')
console.log('   - http://localhost:3000/api/auth/callback/google (desenvolvimento)')
console.log('   - https://seudominio.com/api/auth/callback/google (produção)')

console.log('\n📚 Para mais informações, consulte: docs/AUTHENTICATION.md') 