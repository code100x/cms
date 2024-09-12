FROM node:20-alpine
ARG DATABASE_URL

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

COPY . .
RUN pnpm install
RUN DATABASE_URL=$DATABASE_URL npx prisma generate
RUN DATABASE_URL=$DATABASE_URL pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]

