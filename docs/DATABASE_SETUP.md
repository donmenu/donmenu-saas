# 🗄️ Configuração do Banco de Dados - Don Menu

## 📋 Pré-requisitos

- **MySQL** 8.0 ou superior
- **Node.js** 16 ou superior
- **npm** ou **yarn**

## 🚀 Configuração Rápida

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="mysql://usuario:senha@localhost:3306/donmenu"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"
```

### 2. Executar Setup Automático

```bash
npm run setup-db
```

Este comando irá:
- ✅ Verificar dependências
- ✅ Gerar cliente Prisma
- ✅ Executar migrações
- ✅ Popular dados iniciais
- ✅ Verificar conexão

### 3. Iniciar o Sistema

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔧 Configuração Manual

### 1. Instalar Dependências

```bash
npm install
```

### 2. Gerar Cliente Prisma

```bash
npx prisma generate
```

### 3. Executar Migrações

```bash
npx prisma migrate deploy
```

### 4. Popular Dados Iniciais

```bash
npx prisma db seed
```

## 📊 Estrutura do Banco

### Tabelas Principais

| Tabela | Descrição | Registros |
|--------|-----------|-----------|
| `restaurants` | Restaurantes | 1+ |
| `users` | Usuários | 1+ |
| `categories` | Categorias | 5+ |
| `ingredients` | Insumos | 10+ |
| `recipes` | Fichas Técnicas | 3+ |
| `menus` | Cardápios | 3+ |
| `menu_items` | Itens do Cardápio | 3+ |
| `combos` | Combos | 1+ |
| `sales` | Vendas | 2+ |

### Dados de Exemplo

O seed cria automaticamente:

- **Restaurante**: "Restaurante Exemplo"
- **Usuário Admin**: admin@restauranteexemplo.com / admin123
- **Categorias**: Entradas, Pratos Principais, Sobremesas, Bebidas, Acompanhamentos
- **Ingredientes**: Carne, Pão, Queijo, Alface, Tomate, etc.
- **Receitas**: X-Burger, Batata Frita, Bolo de Chocolate
- **Cardápios**: Principal, Delivery, Sobremesas
- **Combos**: X-Burger + Batata
- **Vendas**: Exemplos de vendas realizadas

## 🛠️ Comandos Úteis

### Desenvolvimento

```bash
# Abrir interface do banco
npm run db:studio

# Executar seed novamente
npm run db:seed

# Criar nova migração
npm run db:migrate

# Resetar banco (cuidado!)
npm run db:reset
```

### Produção

```bash
# Aplicar migrações
npx prisma migrate deploy

# Verificar status
npx prisma migrate status

# Backup do schema
npx prisma db pull
```

## 🔍 Troubleshooting

### Erro de Conexão

```bash
# Verificar se o MySQL está rodando
sudo systemctl status mysql

# Testar conexão
mysql -u usuario -p -h localhost -P 3306
```

### Erro de Permissões

```sql
-- Criar usuário e banco
CREATE DATABASE donmenu;
CREATE USER 'donmenu_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON donmenu.* TO 'donmenu_user'@'localhost';
FLUSH PRIVILEGES;
```

### Erro de Migração

```bash
# Resetar migrações
npx prisma migrate reset

# Forçar nova migração
npx prisma migrate dev --name init
```

## 📈 Performance

### Índices Criados

- `restaurant_id` em todas as tabelas
- `email` e `google_id` em users
- `active` e `visible` em menu_items
- `created_at` em sales
- Compostos para consultas frequentes

### Otimizações Recomendadas

1. **Read Replicas** para relatórios
2. **Caching** com Redis
3. **Connection Pooling**
4. **Query Optimization**

## 🔒 Segurança

### Boas Práticas

- ✅ Usar variáveis de ambiente
- ✅ Senhas fortes para banco
- ✅ Backup regular
- ✅ Logs de auditoria
- ✅ Controle de acesso

### Configurações MySQL

```sql
-- Configurações recomendadas
SET GLOBAL max_connections = 200;
SET GLOBAL innodb_buffer_pool_size = 1073741824; -- 1GB
SET GLOBAL query_cache_size = 67108864; -- 64MB
```

## 📚 Documentação Adicional

- [Schema Completo](./DATABASE_SCHEMA.md)
- [Modelo de Dados](./DATABASE_MODEL.md)
- [Queries Otimizadas](./DATABASE_QUERIES.md)

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do MySQL
2. Execute `npx prisma validate`
3. Consulte a documentação do Prisma
4. Abra uma issue no repositório

---

*Última atualização: Janeiro 2024* 