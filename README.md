<h1 align='center'>CMS</h1>

## Setup Procedure

* Docker

    OR

* Copy .env.example to .env
* Get a postgres db from https://neon.tech/ (or any other provider)
* Replace the DATABASE_URL in .env
* Run ```npx prisma migrate dev``` to setup schema
## Steps to run locally
With Docker

* run this command to create the docker volume - ```docker create volume postgres-data```
* ```docker compose up```

Without Docker
* ```npm install```
* ```npm run db:seed``` to seed the database
* ```npm run dev```
* Login using any userid and password 123456
* You should be able to see some test courses

---

Read [contributing guidelines](./CONTRIBUTING.md) to start making contributions
