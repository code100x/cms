<h1 align='center'>CMS</h1>

## Table of contents


1. Clone the repository:
   ```bash
   git clone https://github.com/code100x/cms.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cms
   ```

3. Run the following command to configure environment variables.
   ```bash
   yarn run env:docker
   ```

4. Run the following command to start the application:
   ```bash
   docker volume create postgres-data # (optional) run this command if you face any mount volume / volume not exist error
   docker-compose up
   ```

### Without Docker

1. clone the repository:
   ```bash
   git clone https://github.com/code100x/cms.git
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
4. (optional) Run the following command to configure environment variables if you started postgres locally otherwise put you database url.
   ```bash
   yarn run env:local
   ```
5. Install dependencies:
   ```bash
   yarn install
   ```
6. Run database migrations and start the application for development:
    ```bash
   yarn run dev:docker
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

## Issues on mac Silicon
brew install pkg-config cairo pango libpng jpeg giflib librsvg
