import db from '../src/db/index';
import {
  Content,
  Course,
  CourseContent,
  NotionMetaData,
  User,
  VideoMetaData,
} from '../constants/data';

async function main() {
  await db.user.createMany({
    data: User,
  });
  await db.course.createMany({
    data: Course,
  });
  await db.content.createMany({
    data: Content,
  });
  await db.courseContent.createMany({
    data: CourseContent,
  });
  await db.notionMetadata.createMany({
    data: NotionMetaData,
  });
  await db.videoMetadata.createMany({
    data: VideoMetaData,
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
