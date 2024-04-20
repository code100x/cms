<h1 align='center'>CMS</h1>

## Setup Procedure

- Docker

  OR

- Copy .env.example to .env
- Get a postgres db from https://neon.tech/ (or any other provider)
- Replace the DATABASE_URL in .env
- Run `npx prisma migrate dev` to setup schema

## Steps to run locally

With Docker

- `docker compose up`

Without Docker

- `npm install`
- `npm run db:seed` to seed the database
- `npm run dev`
- Login using any userid and password 123456
- You should be able to see some test courses

Make sure to lint and format your code before creating a PR

- `npm run lint:check` to check for lint errors
- `npm run lint:fix` to fix lint errors
- `npm run format:check` to format the code
- `npm run format:fix` to fix the formatting
- If the code is not formatted properly, the CI will fail

## Steps to run StoryBook locally

`npm run storybook`

---

Read [contributing guidelines](./CONTRIBUTING.md) to start making contributions
