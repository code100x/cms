import db from '../db/index';
import { durationMetaData, DurationMetaData } from './data';

async function updateVideoMetaData(data: DurationMetaData[]) {
  try {
    await db.$transaction(async (tx) => {
      for (const { duration, id } of data) {
        if (typeof duration === 'number') {
          await tx.videoMetadata.update({
            where: {
              contentId: id,
            },
            data: {
              duration: duration as number,
            },
          });
        }
      }
    });
    await db.$disconnect();
    console.log('All updates completed successfully.');
  } catch (error) {
    console.error('Error occurred during updates:', error);
    await db.$disconnect();
    process.exit(1);
  }
}

updateVideoMetaData(durationMetaData);
