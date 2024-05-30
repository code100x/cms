import db from '../src/db';

async function seedUsers() {
  const users = [
    {
      id: '1',
      email: 'testuser@example.com',
      name: 'Test User 1',
      disableDrm: false,
    },
    {
      id: '2',
      email: 'testuser2@example.com',
      name: 'Test User 2',
      disableDrm: false,
    },
  ];

  try {
    for (const user of users) {
      await db.user.upsert({
        where: {
          id: user.id,
        },
        create: user,
        update: {},
      });
    }
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCourses() {
  const courses = [
    {
      id: 1,
      appxCourseId: 1,
      discordRoleId: '2',
      title: 'test course 1',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      description: 'test course 1',
      openToEveryone: false,
      slug: 'test-course-1',
    },
    // Add more courses if needed
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
  const folderData = {
    type: 'folder',
    title: 'week 1',
    hidden: false,
    thumbnail:
      'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1.jpg',
    commentsCount: 0,
  };

  try {
    const createdFolder = await db.content.create({ data: folderData });
    console.log('Created folder:', createdFolder);
    const folderId = createdFolder.id;

    const contentData = [
      {
        type: 'notion',
        title: 'Notes for week 1',
        hidden: false,
        thumbnail:
          'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/notes.png',
        parentId: folderId,
        commentsCount: 0,
      },
      {
        type: 'video',
        title: 'test video for week 1',
        hidden: false,
        thumbnail:
          'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1-orientation.jpg',
        parentId: folderId,
        commentsCount: 0,
      },
    ];

    await db.content.createMany({ data: contentData });
    console.log('Created content:', contentData);
  } catch (error) {
    console.error('Error seeding content:', error);
    throw error;
  }
}

async function seedCourseContent() {
  const courseContentData = [
    { courseId: 1, contentId: 1 },
    // Add more course-content pairs if needed
  ];

  try {
    for (const data of courseContentData) {
      const existingCourseContent = await db.courseContent.findUnique({
        where: {
          courseId_contentId: {
            courseId: data.courseId,
            contentId: data.contentId,
          },
        },
      });

      if (!existingCourseContent) {
        await db.courseContent.create({
          data,
        });
        console.log('Created course content:', data);
      } else {
        console.log('Course content already exists:', data);
      }
    }
  } catch (error) {
    console.error('Error seeding course content:', error);
    throw error;
  }
}

async function seedNotionMetadata() {
  try {
    const existingMetadata = await db.notionMetadata.findUnique({
      where: {
        id: 1,
      },
    });

    if (!existingMetadata) {
      await db.notionMetadata.create({
        data: {
          id: 1,
          notionId: '39298af78c0f4c4ea780fd448551bad3',
          contentId: 2,
        },
      });
      console.log('Created Notion metadata');
    } else {
      console.log('Notion metadata already exists');
    }
  } catch (error) {
    console.error('Error seeding Notion metadata:', error);
    throw error;
  }
}

async function seedVideoMetadata() {
  try {
    const existingMetadata = await db.videoMetadata.findUnique({
      where: {
        id: 1,
      },
    });

    if (!existingMetadata) {
      await db.videoMetadata.create({
        data: {
          id: 1,
          contentId: 3,
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
        },
      });
      console.log('Created video metadata');
    } else {
      console.log('Video metadata already exists');
    }
  } catch (error) {
    console.error('Error seeding video metadata:', error);
    throw error;
  }
}

async function seedPurchases() {
  const purchases = [
    { userId: '1', courseId: 1 },
    { userId: '2', courseId: 1 },
    { userId: '1', courseId: 2 },
    { userId: '2', courseId: 2 },
  ];

  try {
    for (const purchase of purchases) {
      const existingPurchase = await db.userPurchases.findUnique({
        where: {
          userId_courseId: {
            userId: purchase.userId,
            courseId: purchase.courseId,
          },
        },
      });

      if (!existingPurchase) {
        await db.userPurchases.create({ data: purchase });
        console.log('Created user purchase:', purchase);
      } else {
        console.log('User purchase already exists:', purchase);
      }
    }
  } catch (error) {
    console.error('Error while seeding purchases:', error);
    throw error;
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
