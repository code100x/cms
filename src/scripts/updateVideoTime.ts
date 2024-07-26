import { readFileSync } from 'fs';
import db from '../db/index';

async function updateVideoDateTime(jsonpath: string) {
  const jsonData = readFileSync(jsonpath, 'utf-8'); // reading the data from the path
  const data = JSON.parse(jsonData); //parsing the json data

  try {
    await db.$transaction(async (prisma) => {
      // to maintain the acid properties
      for (const datas of data) {
        await prisma.videoMetadata.update({
          where: {
            contentId: datas.id, // where i need to make changes
          },
          data: {
            timestamp: datas.duration, //what changes i have to make
            date: datas.date,
          },
        });
      }
    });
    await db.$disconnect(); // disconnect the database
  } catch (e) {
    console.error('error occured', e);
    await db.$disconnect();
  }
}

updateVideoDateTime('./dateAndTimeStamp/cohort2.json');
