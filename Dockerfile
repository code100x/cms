FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3000
EXPOSE 5555

CMD [ "yarn", "run", "dev:docker" ]
