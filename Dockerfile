FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN  npm install

COPY . .

EXPOSE 3000
EXPOSE 5555

CMD ["npm", "run", "dev:docker"]
