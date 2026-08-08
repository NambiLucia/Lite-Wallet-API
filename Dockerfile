FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash python3 make g++ openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 4900

CMD ["npm", "start"]