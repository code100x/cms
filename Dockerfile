FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --update --no-cache \
  make \
  g++ \
  jpeg-dev \
  cairo-dev \
  giflib-dev \
  pango-dev \
  libtool \
  autoconf \
  automake

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN  npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]
