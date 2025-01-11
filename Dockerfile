FROM node:20-alpine
ARG DATABASE_URL

WORKDIR /usr/src/app

COPY packages*  pnpm-lock.yaml ./

RUN npm install -g pnpm

COPY ./prisma .
RUN DATABASE_URL=$DATABASE_URL npx prisma generate

COPY . .
RUN pnpm install
RUN DATABASE_URL=$DATABASE_URL pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
# modified by mea asddasfasfas