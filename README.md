<h1 align='center'>CMS</h1>

## Table of contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Using Docker](#using-docker)
  - [Without Docker](#without-docker)
- [Usage](#usage)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have met the following requirements

- Node.js and npm installed on your machine.
- Docker installed (optional, required for Docker setup).
- Access to a PostgreSQL database (can be local or hosted).

## Setup

### Using Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cms.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cms
   ```
3. Run the following command to start the application:
   ```bash
   docker create volume postgres-data # (optional) run this command if you face any mount volume / volume not exist error
   docker-compose up
   ```

### Without Docker

1. clone the repository:
   ```bash
   git clone https://github.com/your-username/cms.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cms
   ```
3. (optional) Start a PostgreSQL database using Docker:
   ```bash
   docker run -d \
       --name cms-db \
       -e POSTGRES_USER=myuser \
       -e POSTGRES_PASSWORD=mypassword \
       -e POSTGRES_DB=mydatabase \
       -p 5432:5432 \
       postgres
   ```
   based on this command the connection url will be
   ```
   DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public
   ```
4. Create a `.env` file based on the `.env.example` file and configure the `DATABASE_URL` with your postgreSQL connection string.
5. Install dependencies:
   ```bash
   npm install
   ```
6. Run database migrations:
   ```bash
   npm run prisma:migrate:dev
   ```
7. Seed the database:
   ```bash
   npm run db:seed
   ```
8. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Access the aplication in your browser at `http://localhost:3000`
2. Login using any provided user credentials
   - (email: `testuser@example.com`, password: `123456`)
   - (email: `testuser2@example.com`, password: `123456`)

## Contributing

We welcome contributions from the community! To contribute to CMS, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/fooBar`).
3. Make your changes and commit them (`git commit -am 'Add some fooBar'`).
   > Make sure to lint and format your code before commiting
   >
   > - `npm run lint:check` to check for lint errors
   > - `npm run lint:fix` to fix lint errors
   > - `npm run format:check` to format the code
   > - `npm run format:fix` to fix the formatting
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

Read our [contribution guidelines](./CONTRIBUTING.md) for more details.

## Contributors

<a href="https://github.com/code100x/cms/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=code100x/cms&max=400&columns=20" />
</a>
