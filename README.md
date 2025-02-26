<h1 style="font-size: 40px;">CMS - 100xDevs</h1>

Open source repo for app.100xdevs.com

## Running Locally

> [!NOTE]  
> This project uses [pnpm](https://pnpm.io/) only as a package manager.

1. Clone the repository:

```bash
git clone https://github.com/code100x/cms.git
```
> If the above command fails due to connection issues, try using the `--depth=1` flag to perform a shallow clone:
> 
> ```bash
> git clone --depth=1 https://github.com/code100x/cms.git
> ```

2. Navigate to the project directory:

```bash
cd cms
```
# Instant Docker Setup

> [!NOTE]  
> Your Docker Demon should be online

1. Running Script for Instant setup

```
# Gives permission to execute a setup file
chmod +x setup.sh

# Runs the setup script file
./setup.sh
```

# Traditional Docker Setup

(Optional) Start a PostgreSQL database using Docker:

```bash
docker run -d \
--name cms-db \
-e POSTGRES_USER=myuser \
-e POSTGRES_PASSWORD=mypassword \
-e POSTGRES_DB=mydatabase \
-p 5432:5432 \
postgres
``` 



1. Create a .env file:

   - Copy `.env.example` and rename it to `.env`.


2. Install dependencies:

```bash
pnpm install
```

3. Run database migrations:

```bash
pnpm prisma:migrate
```

4. Generate prisma client

```bash
pnpm prisma generate
```

5. Seed the database:

```bash
pnpm db:seed
```

6. Start the development server:

```bash
pnpm dev
```

## Usage

1. Access the application in your browser:

```bash
http://localhost:3000
```

2. Login using any of the following provided user credentials:

- Email: `testuser@example.com`, Password: `123456`

- Email: `testuser2@example.com`, Password: `123456`

## Contributing

We welcome contributions from the community! There are many ways to contribute to the CMS. Code is just one possible means of contribution.

### To contribute follow these steps:

1. [Fork the repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo).

2. Clone the fork to your local machine:

```bash
git clone https://github.com/<your username>/cms.git
cd cms
```
> If the above command fails, try using the `--depth=1` flag:
> 
> ```bash
> git clone --depth=1 https://github.com/<your-username>/cms.git
> ```

3. Create a new branch

```bash
git checkout -b feature/fooBar
```

4. Make your changes and commit them

```bash
git commit -am 'Add some fooBar'
```

5. Push to the branch

```bash
git push origin feature/fooBar
```

6. Go to [the repository](https://github.com/code100x/cms/pulls) and [make a Pull Request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

> For major changes, please open an issue first to discuss what you would like to change.

Read our [contribution guidelines](./CONTRIBUTING.md) for more details.

## Contributors

<a  href="https://github.com/code100x/cms/graphs/contributors">
<img  src="https://contrib.rocks/image?repo=code100x/cms&max=400&columns=20"  />
</a>
