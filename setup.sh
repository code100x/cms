# Copies .env.example and changes it to .env so that future commands can find the env file
cp .env.example .env

# If the container is already running or exists, stop and remove it
if [ "$(docker ps -aq -f name=cms-db)" ]; then
  echo "Stopping and removing existing cms-db container..."
  docker stop cms-db
  docker rm cms-db
fi

# Start PostgreSQL container
docker run -d \
  --name cms-db \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  postgres

# Wait for the PostgreSQL container to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 10

# Install dependencies
pnpm install

# Run Prisma migrations
pnpm run prisma:migrate

# Generate Prisma client
pnpm prisma generate

# Seed the database
pnpm run db:seed

# Start the development server
pnpm run dev
