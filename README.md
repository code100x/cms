<h1>CMS - 100xDevs</h1>

## Table of Contents

- [Installation](#installation)

- [With Docker](#with-docker)

- [Without Docker](#without-docker)

- [Usage](#usage)

- [Contributing](#contributing)

- [Contributors](#contributors)

- [Troubleshooting](#troubleshooting)

## Installation

### With Docker

1. Clone the repository:

```bash

git clone https://github.com/code100x/cms.git

```

2. Navigate to the project directory:

```bash

cd cms

```

3. Run the following command to start the application:

```bash

docker volume create postgres-data # (optional) run this command if you face any mount volume / volume not exist error

docker-compose up

```

### Without Docker

1. Clone the repository:

```bash

git clone https://github.com/code100x/cms.git

```

2. Navigate to the project directory:

```bash

cd cms

```

3. (Optional) Start a PostgreSQL database using Docker:

```bash

docker run -d \

--name cms-db \

-e POSTGRES_USER=myuser  \

-e POSTGRES_PASSWORD=mypassword \

-e  POSTGRES_DB=mydatabase  \

-p 5432:5432 \

postgres

```

The connection URL for this setup will be:

```

DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public

```

4. Create a `.env` file based on the `.env.example` file and configure the `DATABASE_URL` with your PostgreSQL connection string.

5. Install dependencies:

```bash

pnpm install

```

6. Run database migrations:

```bash

pnpm run prisma:migrate

```

7. Seed the database:

```bash

pnpm run db:seed

```

8. Start the development server:

```bash

pnpm run dev

```

## Usage

1. Access the application in your browser at `http://localhost:3000`

2. Login using any of the following provided user credentials:

- Email: `testuser@example.com`, Password: `123456`

- Email: `testuser2@example.com`, Password: `123456`

## Contributing

We welcome contributions from the community! To contribute to CMS, follow these steps:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/fooBar`).

3. Make your changes and commit them (`git commit -am 'Add some fooBar'`).

> Before committing, ensure your code is properly formatted and linted:

> - Run `npm run lint:check` to check for lint errors

> - Run `npm run lint:fix` to automatically fix lint errors

> - Run `npm run format:check` to check code formatting

> - Run `npm run format:fix` to automatically fix formatting issues

4. Push to the branch (`git push origin feature/fooBar`).

5. Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

Read our [contribution guidelines](./CONTRIBUTING.md) for more details.

## Contributors

<a  href="https://github.com/code100x/cms/graphs/contributors">

<img  src="https://contrib.rocks/image?repo=code100x/cms&max=400&columns=20"  />

</a>

## Troubleshooting

### Issues on macOS Silicon

If you encounter issues on macOS with Silicon chips, you may need to install some additional dependencies. Run the following command:

```

brew install pkg-config cairo pango libpng jpeg giflib librsvg

```

If you continue to face issues, please open a GitHub issue with details about the problem you're experiencing.
