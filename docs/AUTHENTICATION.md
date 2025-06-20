# Configuração da Autenticação - Don Menu

## Visão Geral

O Don Menu utiliza NextAuth.js para autenticação com provedores sociais (Google e Facebook). Este documento explica como configurar e usar o sistema de autenticação.

## Configuração Inicial

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_ID=your-facebook-client-id
FACEBOOK_SECRET=your-facebook-client-secret
```

### 2. Configurar Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+ 
4. Vá para "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure as URIs de redirecionamento autorizadas:
   - `http://localhost:3000/api/auth/callback/google` (desenvolvimento)
   - `https://seudominio.com/api/auth/callback/google` (produção)
6. Copie o Client ID e Client Secret para o arquivo `.env.local`

### 3. Configurar Facebook OAuth

1. Acesse o [Facebook Developers](https://developers.facebook.com/)
2. Crie um novo aplicativo
3. Adicione o produto "Login do Facebook"
4. Configure as URIs de redirecionamento OAuth:
   - `http://localhost:3000/api/auth/callback/facebook` (desenvolvimento)
   - `https://seudominio.com/api/auth/callback/facebook` (produção)
5. Copie o App ID e App Secret para o arquivo `.env.local`

## Estrutura do Sistema

### Componentes Principais

- **`pages/api/auth/[...nextauth].ts`**: Configuração do NextAuth
- **`app/login/page.tsx`**: Página de login
- **`components/AuthGuard.tsx`**: Componente de proteção de rotas
- **`app/(authenticated)/dashboard/session-wrapper.tsx`**: Wrapper da sessão
- **`middleware.ts`**: Middleware para proteção de rotas

### Fluxo de Autenticação

1. Usuário acessa `/login`
2. Clica em "Entrar com Google" ou "Entrar com Facebook"
3. É redirecionado para o provedor OAuth
4. Após autenticação, retorna para `/dashboard`
5. O AuthGuard verifica a sessão e protege as rotas

## Uso no Código

### Hook useAuth

```typescript
import { useAuth } from '@/lib/hooks/useAuth'

function MyComponent() {
  const { session, login, logout, isAuthenticated } = useAuth()
  
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Sair</button>
      ) : (
        <button onClick={() => login('google')}>Entrar</button>
      )}
    </div>
  )
}
```

### Proteção de Rotas

```typescript
import AuthGuard from '@/components/AuthGuard'

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>Conteúdo protegido</div>
    </AuthGuard>
  )
}
```

## Solução de Problemas

### Erro "OAuth client not found"

- Verifique se o Client ID está correto no `.env.local`
- Confirme se o projeto está ativo no Google Cloud Console

### Erro "Invalid redirect URI"

- Verifique se as URIs de redirecionamento estão configuradas corretamente
- Certifique-se de que o NEXTAUTH_URL está correto

### Login não funciona

- Verifique o console do navegador para erros
- Confirme se todas as variáveis de ambiente estão definidas
- Teste com um provedor por vez

## Segurança

- Nunca commite o arquivo `.env.local`
- Use HTTPS em produção
- Configure corretamente as URIs de redirecionamento
- Mantenha as chaves secretas seguras

## Produção

Para deploy em produção:

1. Configure as variáveis de ambiente no seu provedor de hosting
2. Atualize as URIs de redirecionamento nos provedores OAuth
3. Configure o NEXTAUTH_URL para seu domínio
4. Gere um NEXTAUTH_SECRET seguro

```bash
# Gerar secret seguro
openssl rand -base64 32
``` 