<h1 style="font-size: 40px;">CMS - 100xDevs</h1>

![stars](https://badgen.net/github/stars/code100x/cms) ![forks](https://badgen.net/github/forks/code100x/cms) ![contributors](https://badgen.net/github/contributors/code100x/cms?color=green)  ![prs](https://badgen.net/github/prs/code100x/cms) ![closed-prs](https://badgen.net/github/closed-prs/code100x/cms?color=red) ![open-prs](https://badgen.net/github/open-prs/code100x/cms?color=green) ![open-issues](https://badgen.net/github/open-issues/code100x/cms?color=green)

Welcome to **CMS 100xDevs** , A beginner-friendly platform where you'll find the right content to help you improve your skills, grow your knowledge and master programming skills.

**100xdevs** is an initiative by **Harkirat Singh** to personally mentor folks in the field of Programming. We believe that today you are either a 1x engineer or a 100x engineer and nothing in the middle, and our vision is to take everyone in this community to be a 100x Engineer.

## Running Locally
To run the CMS locally, we recommend following the **manual method** without Docker. This approach provides better flexibility for configuring dependencies and databases and ensures a smoother development process.

### Without Docker (Recommended)

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

4. Create a .env file:

    - Copy `.env.example` and rename it to `.env`.

    - Configure the `DATABASE_URL` with your PostgreSQL connection string.

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
- **Feedback.** : Tell us what we're doing well or where we can improve.
- **Report.** : Create issues with bug reports so we can make 100xDevs even better.

- **Code.** : Fork the repository, make changes, and submit a pull request. We will review your Pull Request and either merge it, request changes to it, or close it with an explanation.


### To contribute follow these steps:
1. [Fork the repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo).

2. Clone the fork to your local machine:

```bash
git clone https://github.com/<your username>/cms.git
cd cms
```

3. Create a new branch
```bash
git checkout -b feature/fooBar
```

4. Make your changes and commit them
```bash
git commit -am 'Add some fooBar'
```
> Before committing, ensure your code is properly formatted and linted:
>
> - Run `npm run lint:check` to check for lint errors
>
> - Run `npm run lint:fix` to automatically fix lint errors
>
> - Run `npm run format:check` to check code formatting
>
> - Run `npm run format:fix` to automatically fix formatting issues

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

## Troubleshooting

### Issues on macOS Silicon

If you encounter issues on macOS with Silicon chips, you may need to install some additional dependencies. Run the following command:

```

brew install pkg-config cairo pango libpng jpeg giflib librsvg

```

If you continue to face issues, please open a GitHub issue with details about the problem you're experiencing.