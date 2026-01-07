import db from '../src/db';

async function seedUsers() {
  try {
    await db.user.upsert({
      where: {
        id: '1',
      },
      create: {
        id: '1',
        email: 'testuser@example.com',
        name: 'Test User 1',
        disableDrm: false,
      },
      update: {},
    });

    await db.user.upsert({
      where: {
        id: '2',
      },
      create: {
        id: '2',
        email: 'testuser2@example.com',
        name: 'Test User 2',
        disableDrm: false,
      },
      update: {},
    });
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCourses() {
  const courses = [
    {
      id: 1,
      appxCourseId: '1',
      discordRoleId: '2',
      title: 'test course 1',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      description: 'test course 1',
      openToEveryone: false,
      slug: 'test-course-1',
    },
    {
      id: 2,
      appxCourseId: '2',
      discordRoleId: '3',
      title: 'test course 2',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png',
      description: 'test course 2',
      openToEveryone: false,
      slug: 'test-course-2',
    },
    {
      id: 3,
      appxCourseId: '3',
      discordRoleId: '4',
      title: 'test course 3',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png',
      description: 'test course 3',
      openToEveryone: false,
      slug: 'test-course-3',
    },
    {
      id: 4,
      appxCourseId: '4',
      discordRoleId: '5',
      title: 'test course 4',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png',
      description: 'test course 4',
      openToEveryone: false,
      slug: 'test-course-4',
    },
    {
      id: 5,
      appxCourseId: '5',
      discordRoleId: '6',
      title: 'test course 5',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png',
      description: 'test course 5',
      openToEveryone: false,
      slug: 'test-course-5',
    },
  ];

  try {
    const existingCourses = await db.course.findMany();
    if (existingCourses.length > 0) {
      console.error('DB is already seeded with courses.');
      return;
    }

    await db.course.createMany({ data: courses });
  } catch (error) {
    console.error('Error seeding courses:', error);
    throw error;
  }
}

async function seedContent() {
  try {
    //creating folders for 20 week:
    const weekFolders = [];
    for (let i = 1; i <= 20; i++) {
      const folderData = {
        type: 'folder',
        title: `week ${i}`,
        hidden: false,
        thumbnail: `https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-${i}.jpg`,
        commentsCount: 0,
      };
      const createdFolder = await db.content.create({ data: folderData });
      weekFolders.push(createdFolder);
      console.log(`Created folder: week ${i}`);
    }

    for (let i = 0; i < weekFolders.length; i++) {
      const weekNum = i + 1;
      const folderId = weekFolders[i].id;
      
      const contentData = [
        {
          type: 'notion',
          title: `Notes for week ${weekNum}`,
          hidden: false,
          thumbnail: 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/notes.png',
          parentId: folderId,
          commentsCount: 0,
        },
      ];

      if (weekNum === 1 || weekNum === 5 || weekNum === 6) {
        contentData.push({
          type: 'video',
          title: `Introduction to Week ${weekNum}`,
          hidden: false,
          thumbnail: 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1-orientation.jpg',
          parentId: folderId,
          commentsCount: 0,
        });
        contentData.push({
          type: 'video',
          title: `Week ${weekNum} - Core Concepts`,
          hidden: false,
          thumbnail: 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1-orientation.jpg',
          parentId: folderId,
          commentsCount: 0,
        });
        contentData.push({
          type: 'video',
          title: `Week ${weekNum} - Advanced Topics`,
          hidden: false,
          thumbnail: 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1-orientation.jpg',
          parentId: folderId,
          commentsCount: 0,
        });
      }

      await db.content.createMany({ data: contentData });
      console.log(`Created content for week ${weekNum}`);
    }

  } catch (error) {
    console.error('Error seeding content:', error);
    throw error;
  }
}

async function seedCourseContent() {
  try {
    // Get all folder type content (the week folders)
    const weekFolders = await db.content.findMany({
      where: { type: 'folder' },
      orderBy: { id: 'asc' },
    });

    for (const folder of weekFolders) {
      await db.courseContent.create({
        data: {
          courseId: 1,
          contentId: folder.id,
        },
      });
    }
    console.log(`Linked ${weekFolders.length} weeks to course 1`);
  } catch (error) {
    console.error('Error seeding course content:', error);
    throw error;
  }
}

async function seedNotionMetadata() {
  try {
    // Get all notion type content
    const notionContent = await db.content.findMany({
      where: { type: 'notion' },
    });

    for (const content of notionContent) {
      await db.notionMetadata.create({
        data: {
          notionId: '39298af78c0f4c4ea780fd448551bad3',
          contentId: content.id,
        },
      });
    }
    console.log(`Created notion metadata for ${notionContent.length} notion content items`);
  } catch (error) {
    console.error('Error seeding Notion metadata:', error);
    throw error;
  }
}

async function seedVideoMetadata() {
  try {
    // Get all video type content
    const videoContent = await db.content.findMany({
      where: { type: 'video' },
    });

    for (const content of videoContent) {
      await db.videoMetadata.create({
        data: {
          contentId: content.id,
          video_1080p_mp4_1: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_1080p_mp4_2: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_1080p_mp4_3: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_1080p_mp4_4: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_1080p_1: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_1080p_2: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_1080p_3: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_1080p_4: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_mp4_1: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_mp4_2: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_mp4_3: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_mp4_4: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_1: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_2: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_3: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_720p_4: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_mp4_1: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_mp4_2: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_mp4_3: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_mp4_4: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_1: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_2: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_3: 'https://www.w3schools.com/html/mov_bbb.mp4',
          video_360p_4: 'https://www.w3schools.com/html/mov_bbb.mp4',
          slides:
            'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/slides/Loops%2C+callbacks.pdf',
          segments: [
            { title: "Introduction", start: 0, end: 3 },
            { title: "Chapter 1", start: 3, end: 7 },
            { title: "Conclusion", start: 7, end: 10 }
          ]
        },
      });
    }
    console.log(`Created video metadata for ${videoContent.length} video content items`);
  } catch (error) {
    console.error('Error seeding video metadata:', error);
    throw error;
  }
}

async function seedPurchases() {
  try {
    await db.userPurchases.create({
      data: {
        userId: '1',
        courseId: 1,
      },
    });
    await db.userPurchases.create({
      data: {
        userId: '2',
        courseId: 1,
      },
    });
    await db.userPurchases.create({
      data: {
        userId: '1',
        courseId: 2,
      },
    });
    await db.userPurchases.create({
      data: {
        userId: '2',
        courseId: 2,
      },
    });
  } catch (error) {
    console.error('Error while seeding purchases');
    throw error;
  }
}

export async function addClassesFromAugustToMay() {
  const startDate = new Date('2024-08-01T00:00:00+05:30');
  const endDate = new Date('2025-05-31T23:59:59+05:30');

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (date.getDay() === 5) {
      // Friday
      await db.event.create({
        data: {
          title: 'Web 3 Class',
          start: new Date(date.setHours(19, 30, 0, 0)),
          end: new Date(date.setHours(21, 30, 0, 0)),
        },
      });
    } else if (date.getDay() === 6 || date.getDay() === 0) {
      // Saturday or Sunday
      await db.event.create({
        data: {
          title: 'WebDevs/Devops Class',
          start: new Date(date.setHours(19, 30, 0, 0)),
          end: new Date(date.setHours(21, 30, 0, 0)),
        },
      });
    }
  }
}

async function seedDatabase() {
  try {
    await seedUsers();
    await seedCourses();
    await seedContent();
    await seedCourseContent();
    await seedNotionMetadata();
    await seedVideoMetadata();
    await seedPurchases();
    await addClassesFromAugustToMay();
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('An unexpected error occurred during seeding:', error);
  process.exit(1);
});
