DIR="$(cd "$(dirname "$0")" && pwd)"
export $(grep -v '^#' .env.test | xargs)
 docker run -d \
       --name db \
       -e POSTGRES_USER=postgres \
       -e POSTGRES_PASSWORD=postgres \
       -e POSTGRES_DB=cms \
       -p 5434:5434 \
       postgres
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
echo $DATABASE_URL
npx prisma migrate dev --name init
vitest -c ./vitest.config.integration.ts
docker stop db && docker rm db

