# Don Menu - Sistema de Gestão para Restaurantes

<div align="center">
  <img src="/public/images/logo.png" alt="Don Menu Logo" width="120" height="120">
  <h1 align="center">Don Menu</h1>
  <p align="center">
    O sistema completo para gestão de restaurantes, do cardápio digital à ficha técnica.
    <br />
    <a href="https://donmenu.com.br/docs"><strong>Explore a documentação »</strong></a>
    <br />
    <br />
    <a href="https://donmenu.com.br/bug-report">Reportar Bug</a>
    ·
    <a href="https://donmenu.com.br/request-feature">Sugerir Funcionalidade</a>
  </p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
</div>

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O **Don Menu** é uma solução SaaS completa desenvolvida especificamente para pequenos restaurantes, lanchonetes, cafés e food trucks. O sistema oferece ferramentas práticas e inteligentes para gestão de cardápios, precificação, controle de custos e vendas.

### 🎨 Design Philosophy

- **Simplicidade**: Interface intuitiva e fácil de usar
- **Acessibilidade**: Preços justos para pequenos empreendedores
- **Inovação**: Assistente de IA integrado para automatizar tarefas
- **Escalabilidade**: Cresce junto com o seu negócio

## ✨ Funcionalidades

### 🍽️ Gestão de Cardápios
- Cadastro e edição de itens do cardápio
- Categorização por tipos de pratos
- Controle de status (ativo/inativo)
- Busca e filtros avançados

### 📊 Fichas Técnicas
- Criação de fichas técnicas completas
- Cálculo automático de custos por item
- Controle de ingredientes e quantidades
- Sugestão de preços baseada em margem

### 🛒 Sistema de Pedidos
- Cardápio digital com QR Code
- Pedidos diretos pelos clientes
- Controle de status dos pedidos
- Histórico completo de vendas

### 💰 Gestão Financeira
- Controle de caixa (abertura/fechamento)
- Registro de receitas e despesas
- Relatórios financeiros
- Categorização de transações

### 🤖 Assistente de IA
- Sugestões de precificação
- Otimização de cardápio
- Análise de custos
- Dicas personalizadas

### 👥 Gestão de Usuários
- Controle de acesso multiusuário
- Perfis e permissões
- Histórico de atividades

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Tremor** - Biblioteca de componentes para dashboards
- **Heroicons** - Ícones SVG

### Backend
- **Next.js API Routes** - API REST
- **Prisma** - ORM para banco de dados
- **Supabase** - Banco de dados PostgreSQL
- **NextAuth.js** - Autenticação

### Infraestrutura
- **Vercel** - Deploy e hosting
- **PlanetScale** - Banco de dados MySQL (alternativo)
- **Docker** - Containerização

## 📁 Estrutura do Projeto

```
donmenu-saas/
├── app/                          # App Router (Next.js 14)
│   ├── (authenticated)/          # Rotas autenticadas
│   │   └── dashboard/            # Dashboard principal
│   │       ├── cardapio/         # Gestão de cardápios
│   │       ├── ficha-tecnica/    # Fichas técnicas
│   │       ├── supplies/         # Gestão de insumos
│   │       ├── users/            # Gestão de usuários
│   │       ├── pedidos/          # Sistema de pedidos
│   │       ├── qr-code/          # Geração de QR Codes
│   │       └── financeiro/       # Sistema financeiro
│   ├── (public)/                 # Páginas públicas
│   │   ├── pricing/              # Planos e preços
│   │   ├── sobre/                # Sobre a empresa
│   │   ├── contato/              # Página de contato
│   │   └── blog/                 # Blog e artigos
│   ├── login/                    # Página de login
│   └── cardapio/                 # Cardápio público
├── lib/                          # Bibliotecas e configurações
│   ├── supabase.ts              # Cliente Supabase
│   └── planetscale.ts           # Cliente PlanetScale
├── pages/                        # API Routes
│   └── api/                      # Endpoints da API
├── prisma/                       # Schema e migrações
│   ├── schema.prisma            # Schema do banco
│   ├── migrations/              # Migrações
│   └── seed.ts                  # Dados iniciais
├── types/                        # Tipos TypeScript
├── public/                       # Arquivos estáticos
└── components/                   # Componentes reutilizáveis
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm
- Conta no Supabase ou PlanetScale

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/donmenu-saas.git
cd donmenu-saas
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_do_supabase

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu_secret_do_nextauth

# Banco de dados (opcional - se usar PlanetScale)
DATABASE_URL=sua_url_do_banco

# Outras configurações
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configure o banco de dados

#### Opção A: Supabase (Recomendado)

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Execute as migrações SQL no SQL Editor:

```sql
-- Categorias
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Itens do cardápio
CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(category_id),
  status VARCHAR(20) DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insumos
CREATE TABLE ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  cost_per_unit DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Fichas técnicas
CREATE TABLE ficha_tecnica (
  ficha_id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES items(item_id),
  yield DECIMAL(10,2),
  total_cost DECIMAL(10,2),
  price_suggestion DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ingredientes das fichas técnicas
CREATE TABLE ficha_ingredientes (
  id SERIAL PRIMARY KEY,
  ficha_id INTEGER REFERENCES ficha_tecnica(ficha_id),
  ingredient_id INTEGER REFERENCES ingredients(ingredient_id),
  quantity DECIMAL(10,2) NOT NULL
);

-- Usuários
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pedidos
CREATE TABLE pedidos (
  pedido_id SERIAL PRIMARY KEY,
  mesa VARCHAR(10),
  status VARCHAR(20) DEFAULT 'pendente',
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Itens dos pedidos
CREATE TABLE pedido_items (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(pedido_id),
  item_id INTEGER REFERENCES items(item_id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Sistema financeiro
CREATE TABLE caixa (
  caixa_id SERIAL PRIMARY KEY,
  data_abertura TIMESTAMP DEFAULT NOW(),
  data_fechamento TIMESTAMP,
  valor_inicial DECIMAL(10,2) NOT NULL,
  valor_final DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'aberto'
);

CREATE TABLE categorias_financeiras (
  categoria_id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(20) NOT NULL, -- 'receita' ou 'despesa'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE receitas (
  receita_id SERIAL PRIMARY KEY,
  descricao VARCHAR(200) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  categoria_id INTEGER REFERENCES categorias_financeiras(categoria_id),
  data_receita DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE despesas (
  despesa_id SERIAL PRIMARY KEY,
  descricao VARCHAR(200) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  categoria_id INTEGER REFERENCES categorias_financeiras(categoria_id),
  data_despesa DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Opção B: PlanetScale

1. Crie uma conta no [PlanetScale](https://planetscale.com)
2. Crie um novo banco de dados
3. Configure o Prisma:

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Execute o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📖 Uso

### 🏠 Página Inicial

A página inicial apresenta o Don Menu com:
- Hero section com call-to-action
- Benefícios do sistema
- Depoimentos de clientes
- Seção de planos

### 🎛️ Dashboard

Após fazer login, você terá acesso ao dashboard completo com:

1. **Visão Geral**: Métricas principais do negócio
2. **Cardápios**: Gestão de itens do menu
3. **Fichas Técnicas**: Controle de custos e ingredientes
4. **Insumos**: Cadastro de ingredientes
5. **Pedidos**: Sistema de pedidos com QR Code
6. **Financeiro**: Controle de caixa e relatórios
7. **Usuários**: Gestão de equipe

### 📱 Cardápio Digital

Os clientes podem acessar o cardápio através de QR Code nas mesas:
- Visualização organizada por categorias
- Adição de itens ao carrinho
- Finalização de pedidos
- Notificações em tempo real

## 🔌 API Endpoints

### Cardápios
- `GET /api/cardapios` - Listar cardápios
- `POST /api/cardapios` - Criar item
- `PUT /api/cardapios/[id]` - Atualizar item
- `DELETE /api/cardapios/[id]` - Deletar item

### Fichas Técnicas
- `GET /api/ficha-tecnica` - Listar fichas técnicas
- `POST /api/ficha-tecnica` - Criar ficha técnica
- `PUT /api/ficha-tecnica/[id]` - Atualizar ficha técnica

### Pedidos
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Criar pedido
- `PUT /api/pedidos/[id]` - Atualizar status

### Financeiro
- `GET /api/financeiro/metricas` - Métricas financeiras
- `POST /api/financeiro/caixa` - Abrir/fechar caixa
- `POST /api/financeiro/receitas` - Registrar receita
- `POST /api/financeiro/despesas` - Registrar despesa

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### 📋 Checklist para Contribuição

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Não há conflitos de merge

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

## 📞 Suporte

- **Email**: contato@donmenu.com.br
- **WhatsApp**: (11) 99999-9999
- **Documentação**: [docs.donmenu.com.br](https://docs.donmenu.com.br)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework incrível
- [Supabase](https://supabase.com/) - Backend como serviço
- [Tremor](https://tremor.so/) - Componentes de dashboard
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Heroicons](https://heroicons.com/) - Ícones SVG

---

<div align="center">
  <p>Feito com ❤️ para pequenos empreendedores da gastronomia</p>
  <p><strong>Don Menu</strong> - Transformando restaurantes com tecnologia simples e inteligente</p>
</div>
