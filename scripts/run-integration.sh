 docker run -d \
       --name db \
       -e POSTGRES_USER=postgres \
       -e POSTGRES_PASSWORD=postgres \
       -e POSTGRES_DB=mydatabase \
       -p 5432:5432 \
       postgres
echo '🟡 - Waiting for database to be ready...'
/Users/piyush/cms/scripts/wait-for-it.sh  "postgresql://postgres" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init --schema=./prisma/schema.prisma
vitest -c ./vitest.config.integration.ts
docker stop db && docker rm db
