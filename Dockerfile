# Definir a imagem base
FROM node:14-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos necessários
COPY package.json .

# Instalar as dependências
RUN npm ci --production

# Copiar o código do aplicativo
COPY . .

# Expor a porta em que o aplicativo será executado
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
