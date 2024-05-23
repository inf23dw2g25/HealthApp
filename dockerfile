# Use uma imagem base que já tenha o Node.js instalado
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências da aplicação
RUN npm install --legacy-peer-deps

# Copie todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Construa a aplicação React
RUN npm run build

# Exponha a porta em que a aplicação será executada (porta padrão do React é 3000)
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["npm", "start"]
