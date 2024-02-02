## Setup procedure -

- Copy .env.example to .env
- Get a postgres db from https://neon.tech/ (or any other provider)
- replace the DATABASE_URL in .env
- Run `npx prisma migrate dev` to setup schema
- cd migrations, Seed SQL data -

```
    psql -h your_db_host -d your_db -U your_username  < neondb_backup.sql
```

For example

```
    psql -h ep-super-wildflower-a5sqjjhz.us-east-2.aws.neon.tech -d neondb -U harkirat  < neondb_backup.sql
```

- npm install
- npm run dev
- Login using any userid and password 123456
- You should be able to see some test courses

Read [contributing guidelines](./CONTRIBUTING.md) to start making contributions
