# Exit on any error
set -e

# Copy .env.example to .env
if ! cp .env.example .env; then
    echo "Error: Failed to copy .env.example to .env."
    exit 1
fi
echo "Copied .env.example to .env..."

# Start PostgreSQL container
echo "Starting PostgreSQL container..."
if ! docker run -d \
  --name cms-db \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  postgres; then
    echo "Error: Failed to start PostgreSQL container."
    exit 1
fi

# Wait for the PostgreSQL container to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 10  # You can adjust the sleep time if needed

# Install dependencies using pnpm
echo "Installing dependencies..."
if ! pnpm install; then
    echo "Error: Failed to install dependencies."
    exit 1
fi

# Run Prisma migrations
echo "Running Prisma migrations..."
if ! pnpm run prisma:migrate; then
    echo "Error: Prisma migration failed."
    exit 1
fi

# Generate Prisma client
echo "Generating Prisma client..."
if ! pnpm prisma generate; then
    echo "Error: Failed to generate Prisma client."
    exit 1
fi

# Seed the database
echo "Seeding the database..."
if ! pnpm run db:seed; then
    echo "Error: Database seeding failed."
    exit 1
fi

# Start the development server
echo "Starting development server..."
if ! pnpm run dev; then
    echo "Error: Failed to start the development server."
    exit 1
fi

