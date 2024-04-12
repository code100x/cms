import db from '../src/db/index';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path'; // Function to convert CSV to JSON and return as an object

function csvToJson(csvFilePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => reject(error));
  });
}

async function main() {
  const data: {
    email: string;
    phone: string;
    id: string;
    courseId: string;
    name: string;
  }[] = await csvToJson(path.join(__dirname, './d.csv'));
  const allUsers = await db.user.findMany({});
  const usersMap: any = {};
  allUsers.map((user) => {
    if (user && user.id) {
      usersMap[user.email || ''] = user?.id;
    }
  });

  //@ts-ignore
  const updatedData: {
    courseId: number;
    email: string;
    phone: string;
    id: string;
    name: string;
  }[] = data
    .map((x) => ({
      email: x.email,
      phone: x.phone,
      name: x.name,
      id: usersMap[x.email] || usersMap[x.phone] || null,
      // eslint-disable-next-line
      courseId: x.name.includes('1-100')
        ? 2
        : // eslint-disable-next-line
          x.name.includes('0-100')
          ? 3
          : // eslint-disable-next-line
            x.name.includes('0-1')
            ? 1
            : null,
    }))
    .filter((x) => x.courseId && x.id);

  console.log(updatedData);
  for (let i = 0; i < updatedData.length; i++) {
    const itemsToPush: {
      userId: string;
      courseId: number;
    }[] = [];

    for (let j = 0; j <= 100 && i + j < updatedData.length; j++) {
      //@ts-ignore
      itemsToPush.push({
        userId: updatedData[i + j].id,
        courseId: updatedData[i + j].courseId,
      });
    }
    i += 100;
    console.log(itemsToPush);
    await db.userPurchases.createMany({
      data: itemsToPush,
      skipDuplicates: true, // Skip 'Bobo'
    });
  }
}

main();
