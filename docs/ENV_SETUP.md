# 🔧 Configuração das Variáveis de Ambiente

## 📋 Arquivo .env

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# ========================================
# CONFIGURAÇÃO DO BANCO DE DADOS
# ========================================

# URL de conexão com o MySQL
DATABASE_URL="mysql://usuario:senha@localhost:3306/donmenu"

# ========================================
# AUTENTICAÇÃO (NEXTAUTH)
# ========================================

# Chave secreta para criptografia
NEXTAUTH_SECRET="sua-chave-secreta-super-forte-aqui"

# URL base da aplicação
NEXTAUTH_URL="http://localhost:3000"

# ========================================
# GOOGLE OAUTH (OPCIONAL)
# ========================================

# Credenciais do Google OAuth
GOOGLE_ID="seu-google-client-id"
GOOGLE_SECRET="seu-google-client-secret"

# ========================================
# FACEBOOK OAUTH (OPCIONAL)
# ========================================

# Credenciais do Facebook OAuth
FACEBOOK_ID="seu-facebook-client-id"
FACEBOOK_SECRET="seu-facebook-client-secret"

# ========================================
# SUPABASE (OPCIONAL)
# ========================================

NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anonima"
SUPABASE_SERVICE_ROLE_KEY="sua-chave-de-servico"

# ========================================
# ANALYTICS (OPCIONAL)
# ========================================

NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_FACEBOOK_PIXEL_ID="XXXXXXXXXX"
NEXT_PUBLIC_LINKEDIN_PARTNER_ID="XXXXXXXXXX"
```

## 🔑 Gerando Chaves Secretas

### NEXTAUTH_SECRET

Execute no terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Exemplo de chave gerada:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

## 🗄️ Configuração do MySQL

### 1. Criar Banco de Dados

```sql
CREATE DATABASE donmenu;
```

### 2. Criar Usuário

```sql
CREATE USER 'donmenu_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON donmenu.* TO 'donmenu_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Exemplo de DATABASE_URL

```env
DATABASE_URL="mysql://donmenu_user:senha_segura@localhost:3306/donmenu"
```

## 🔐 Configuração do Google OAuth

### 1. Acessar Google Cloud Console

- Vá para: https://console.cloud.google.com/
- Crie um novo projeto ou selecione existente

### 2. Habilitar Google+ API

- Vá para "APIs & Services" > "Library"
- Procure por "Google+ API" e habilite

### 3. Criar Credenciais

- Vá para "APIs & Services" > "Credentials"
- Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
- Configure as URLs de redirecionamento:
  - http://localhost:3000/api/auth/callback/google

### 4. Copiar Credenciais

```env
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz"
```

## 📊 Configuração de Analytics

### Google Analytics

1. Crie uma conta em: https://analytics.google.com/
2. Crie uma propriedade
3. Copie o ID de medição (G-XXXXXXXXXX)

### Facebook Pixel

1. Acesse: https://business.facebook.com/
2. Crie um pixel
3. Copie o ID do pixel

### LinkedIn Insight Tag

1. Acesse: https://www.linkedin.com/campaignmanager/
2. Crie uma conta de anúncios
3. Copie o Partner ID

## ✅ Verificação

Após configurar o `.env`, execute:

```bash
npm run setup-db
```

Este comando irá:
- ✅ Verificar se o arquivo .env existe
- ✅ Testar conexão com o banco
- ✅ Executar migrações
- ✅ Popular dados iniciais

## 🚨 Variáveis Obrigatórias

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | ✅ | URL do banco MySQL |
| `NEXTAUTH_SECRET` | ✅ | Chave secreta para criptografia |
| `NEXTAUTH_URL` | ✅ | URL base da aplicação |
| `GOOGLE_ID` | ❌ | ID do cliente Google OAuth |
| `GOOGLE_SECRET` | ❌ | Secret do cliente Google OAuth |
| `FACEBOOK_ID` | ❌ | ID do cliente Facebook OAuth |
| `FACEBOOK_SECRET` | ❌ | Secret do cliente Facebook OAuth |

## 🔒 Segurança

### Boas Práticas

- ✅ Nunca commite o arquivo `.env`
- ✅ Use senhas fortes
- ✅ Rotacione chaves regularmente
- ✅ Use variáveis diferentes para dev/prod

### Arquivo .gitignore

Certifique-se que `.env` está no `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 🆘 Troubleshooting

### Erro: "DATABASE_URL is not set"

```bash
# Verificar se o arquivo .env existe
ls -la .env

# Verificar se a variável está definida
echo $DATABASE_URL
```

### Erro: "Invalid DATABASE_URL"

```bash
# Verificar formato da URL
# Deve ser: mysql://usuario:senha@host:porta/banco
```

### Erro: "Access denied"

```sql
-- Verificar permissões do usuário
SHOW GRANTS FOR 'donmenu_user'@'localhost';
```

---

*Configuração concluída? Execute `npm run setup-db` para continuar!* 