FROM node:20-alpine

WORKDIR /app

# Instalar OpenSSL para Prisma
RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm run prisma:generate

EXPOSE 3001

CMD ["npm", "start"]
