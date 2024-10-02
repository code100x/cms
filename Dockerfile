FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm && \
  pnpm install && \
  pnpm add sharp && \
  STANDALONE=1 pnpm run build 



FROM node:20-alpine AS run

USER 1001:1001

WORKDIR /usr/src/app

COPY --from=build --chown=1001:1001 usr/src/app/.next/standalone ./
COPY --from=build --chown=1001:1001 usr/src/app/.next/static ./.next/static
COPY --from=build usr/src/app/public ./public

ENV NODE_ENV production
ENV PORT 3000 
ENV HOSTNAME "0.0.0.0"

CMD [ "node", "server.js" ]

