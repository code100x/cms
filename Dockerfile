FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN  npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]
