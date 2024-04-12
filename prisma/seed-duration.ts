import db from '../src/db/index';
import { promises as fs } from 'fs';

export async function seedDuration() {
  const file = await fs.readFile('./prisma/duration-raw.json', 'utf-8');
  const jsonData = JSON.parse(file);
  for (const data of jsonData) {
    const { id, duration } = data;
    await db.videoMetadata.update({
      where: {
        contentId: Number(id),
      },
      data: {
        duration: Number(duration),
      },
    });
  }
}
