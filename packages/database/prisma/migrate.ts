import fs from 'fs';
import db from '../src/';

const titleToCourseId: { [key: string]: number } = {
  'Live 0-100 Complete': 8,
  'Live 0-1': 6,
  'Live 1-100': 7,
  'Complete Web Development + Devops + Blockchain Cohort': 14,
  'Complete Web3/Blockchain Cohort': 13,
  'Complete Web development + Devops Cohort': 12,
  'Complete Web Development Cohort': 15,
  'Complete Devops Cohort': 16,
};

async function seedPurchases() {
  const csvData = fs.readFileSync('path_to_csv_file', 'utf8');
  const users = await db.user.findMany();
  const courses = await db.course.findMany();
  const csvDataArr = csvData.split('\n').slice(100);
  console.log(`Total number of purchases: ${csvDataArr.length}`);
  console.log(`Total number of users: ${users.length}`);
  console.log(`Total number of courses: ${courses.length}`);

  const purchases = csvDataArr.map((line) => {
    const data = line.split(',');
    const user = users.find((user) => user.email === data[1]);
    const courseTitle = data[7];
    const course = courses.find(
      (course) =>
        titleToCourseId[courseTitle]?.toString() === course.appxCourseId,
    );
    if (course && user) {
      return {
        userId: user.id,
        courseId: course.id,
      };
    }
  });

  const filteredPurchases: { userId: string; courseId: number }[] = [];
  purchases.forEach((purchase) => {
    if (purchase) {
      filteredPurchases.push(purchase);
    }
  });
  // remove duplicates
  const map = new Map();
  const uniquePurchases: { userId: string; courseId: number }[] = [];
  filteredPurchases.forEach((purchase) => {
    if (map.has(`${purchase.userId}-${purchase.courseId}`)) {
      return;
    }
    map.set(`${purchase.userId}-${purchase.courseId}`, true);
    uniquePurchases.push(purchase);
  });

  console.log(`Total number of purchases: ${filteredPurchases.length}`);
  console.log(`Total number of unique purchases: ${uniquePurchases.length}`);
  console.log(`Total filtered purchases: ${purchases.length}`);

  try {
    await db.userPurchases.deleteMany({});
    await db.userPurchases.createMany({
      data: uniquePurchases,
    });
  } catch (error) {
    console.error('Error while seeding purchases');
    throw error;
  }
}

seedPurchases();
