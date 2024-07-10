import { readFileSync } from 'fs';
import db from '../db/index';
import { exit } from 'process';

export function readJson(path: string) {
  const data = JSON.parse(readFileSync(path, 'utf-8'));
  return data;
}

async function updateVideoDateTime(jsonPath: string) {
  const data = readJson(jsonPath);
  try {
    await db.$transaction(async (tx) => {
      for (const { id, date, timestamp } of data) {
        await tx.videoMetadata.update({
          where: {
            contentId: id,
          },
          data: {
            timestamp: timestamp as number,
            // eslint-disable-next-line object-shorthand
            date: new Date(date),
          },
        });
      }
    });
    await db.$disconnect();
    console.log('Update completed');
  } catch (error) {
    console.error('Error occurred during updates:', error);
    await db.$disconnect();
    exit(1);
  }
}
updateVideoDateTime('./dateAndTimestampData/cohort2.json');
