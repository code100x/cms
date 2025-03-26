import db from '../src/db';

async function seedUsers() {
  try {
    const users = [
      { id: '1', email: 'testuser@example.com', name: 'Test User 1', disableDrm: false },
      { id: '2', email: 'testuser2@example.com', name: 'Test User 2', disableDrm: false },
    ];

    for (const user of users) {
      const existingUser = await db.user.findUnique({ where: { id: user.id } });

      if (existingUser) {
        console.log(`User with ID ${user.id} already exists. Skipping creation.`);
      } else {
        await db.user.create({ data: user });
        console.log(`Created user with ID ${user.id}`);
      }
    }

    console.log('User seeding completed.');
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
      id: 4,
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
      id: 5,
      appxCourseId: '2',
      discordRoleId: '3',
      title: 'test course 2',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png',
      description: 'test course 2',
      openToEveryone: false,
      slug: 'test-course-2',
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
  const folderData = {
    type: 'folder',
    title: 'week 1',
    hidden: false,
    thumbnail:
      'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1.jpg',
    commentsCount: 0,
  };

  try {
    let existingFolder = await db.content.findFirst({
      where: { title: folderData.title, type: 'folder' },
    });

    if (existingFolder) {
      console.log('Folder already exists:', existingFolder);
      return;
    }

    // Create folder
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

    // Insert content using a loop since createMany does not return records
    const createdContent = await Promise.all(
      contentData.map(async (content) => {
        return db.content.create({ data: content });
      })
    );

    console.log('Created content:', createdContent);
  } catch (error) {
    console.error('Error seeding content:', error);
    throw error;
  }
}


async function seedCourseContent() {
  try {
    const existingCourseContent = await db.courseContent.findUnique({
      where: {
        courseId_contentId: { courseId: 1, contentId: 1 },
      },
    });

    if (existingCourseContent) {
      console.log('Course content already exists:', existingCourseContent);
      return;
    }

    await db.courseContent.create({
      data: {
        courseId: 1,
        contentId: 1,
      },
    });

    console.log('Course content seeded successfully');
  } catch (error) {
    console.error('Error seeding course content:', error);
    throw error;
  }
}

async function seedNotionMetadata() {
  try {
    const existingNotionMetadata = await db.notionMetadata.findUnique({
      where: { id: 1 },
    });

    if (existingNotionMetadata) {
      console.log('Notion metadata already exists:', existingNotionMetadata);
      return;
    }

    await db.notionMetadata.create({
      data: {
        id: 1,
        notionId: '39298af78c0f4c4ea780fd448551bad3',
        contentId: 2,
      },
    });

    console.log('Notion metadata seeded successfully');
  } catch (error) {
    console.error('Error seeding Notion metadata:', error);
    throw error;
  }
}


async function seedVideoMetadata() {
  try {
    const existingVideoMetadata = await db.videoMetadata.findUnique({
      where: { id: 1 },
    });

    if (existingVideoMetadata) {
      console.log('Video metadata already exists:', existingVideoMetadata);
      return;
    }

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
        slides: 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/slides/Loops%2C+callbacks.pdf',
        segments: [
          { title: "Introduction", start: 0, end: 3 },
          { title: "Chapter 1", start: 3, end: 7 },
          { title: "Conclusion", start: 7, end: 10 }
        ]
      },
    });

    console.log('Video metadata seeded successfully');
  } catch (error) {
    console.error('Error seeding video metadata:', error);
    throw error;
  }
}

async function seedPurchases() {
  try {
    const purchases = [
      { userId: '1', courseId: 1 },
      { userId: '2', courseId: 1 },
      { userId: '1', courseId: 2 },
      { userId: '2', courseId: 2 },
    ];

    for (const purchase of purchases) {
      const existingPurchase = await db.userPurchases.findFirst({
        where: { userId: purchase.userId, courseId: purchase.courseId },
      });

      if (!existingPurchase) {
        await db.userPurchases.create({ data: purchase });
        console.log(`Purchase added for user ${purchase.userId} (Course ${purchase.courseId})`);
      } else {
        console.log(`Purchase already exists for user ${purchase.userId} (Course ${purchase.courseId})`);
      }
    }

    console.log('Purchase seeding completed');
  } catch (error) {
    console.error('Error while seeding purchases:', error);
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
    let title;
    if (date.getDay() === 5) {
      title = 'Web 3 Class';
    } else if (date.getDay() === 6 || date.getDay() === 0) {
      title = 'WebDevs/DevOps Class';
    } else {
      continue;
    }

    const eventExists = await db.event.findFirst({
      where: {
        title,
        start: new Date(date.setHours(19, 30, 0, 0)),
      },
    });

    if (!eventExists) {
      await db.event.create({
        data: {
          title,
          start: new Date(date.setHours(19, 30, 0, 0)),
          end: new Date(date.setHours(21, 30, 0, 0)),
        },
      });
      console.log(`Event added: ${title} on ${date.toISOString().split('T')[0]}`);
    } else {
      console.log(`Event already exists: ${title} on ${date.toISOString().split('T')[0]}`);
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
