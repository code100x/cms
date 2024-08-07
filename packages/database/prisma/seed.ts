import db from '../src';

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

    const createdContent = await db.content.createMany({ data: contentData });
    console.log('Created content:', createdContent);
  } catch (error) {
    console.error('Error seeding content:', error);
    throw error;
  }
}

async function seedCourseContent() {
  try {
    await db.courseContent.create({
      data: {
        courseId: 1,
        contentId: 1,
      },
    });
  } catch (error) {
    console.error('Error seeding course content:', error);
    throw error;
  }
}

async function seedNotionMetadata() {
  try {
    await db.notionMetadata.create({
      data: {
        id: 1,
        notionId: '39298af78c0f4c4ea780fd448551bad3',
        contentId: 2,
      },
    });
  } catch (error) {
    console.error('Error seeding Notion metadata:', error);
    throw error;
  }
}

async function seedVideoMetadata() {
  try {
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
