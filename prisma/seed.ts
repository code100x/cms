import db from '../src/db/index';

async function main() {
  await db.user.createMany({
    data: [
      {
        id: '2',
        email: 'testuser',
        name: 'Test User 1',
        disableDrm: false,
      },
      {
        id: '1',
        email: 'testuser2',
        name: 'Test User 2',
        disableDrm: false,
      },
    ],
  });

  await db.course.createMany({
    data: [
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
      {
        id: 2,
        appxCourseId: 2,
        discordRoleId: '3',
        title: 'test course 2',
        imageUrl:
          'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png',
        description: 'test course 2',
        openToEveryone: false,
        slug: 'test-course-2',
      },
    ],
  });

  const moreVideos = [];
  for (let i = 4; i <= 40; i++) {
    moreVideos.push({
      id: i,
      type: 'video',
      title: `Another test video ${i} for week 1`,
      hidden: false,
      thumbnail:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1.jpg',
      parentId: 1,
      commentsCount: 0,
    });
  }

  const moreVideosMetadata = [];
  for (let i = 2; i <= 38; i++) {
    moreVideosMetadata.push({
      id: i,
      contentId: i + 2,
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
      duration: 10,
    });
  }

  await db.content.createMany({
    data: [
      {
        id: 1,
        type: 'folder',
        title: 'week 1',
        hidden: false,
        thumbnail:
          'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1.jpg',
        commentsCount: 0,
      },
      {
        id: 2,
        type: 'notion',
        title: 'Notes for week 1',
        hidden: false,
        thumbnail:
          'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/notes.png',
        parentId: 1,
        commentsCount: 0,
      },
      {
        id: 3,
        type: 'video',
        title: 'test video for week 1',
        hidden: false,
        thumbnail:
          'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1-orientation.jpg',
        parentId: 1,
        commentsCount: 0,
      },
      ...moreVideos,
    ],
  });

  await db.courseContent.create({
    data: {
      courseId: 1,
      contentId: 1,
    },
  });
  await db.notionMetadata.create({
    data: {
      id: 1,
      notionId: '39298af78c0f4c4ea780fd448551bad3',
      contentId: 2,
    },
  });

  await db.videoMetadata.createMany({
    data: [
      {
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
        duration: 10,
      },
      ...moreVideosMetadata,
    ],
  });

  const data = [];
  const uniqueDates = [
    ...Array.from({ length: 5 }, () => getRandomDate()),
    new Date(Date.now()),
    new Date(Date.now() - 24 * 60 * 60 * 1000),
  ];

  for (let i = 3; i <= 40; i++) {
    const updatedAt =
      uniqueDates[Math.floor(Math.random() * uniqueDates.length)];

    for (let j = 0; j < 1; j++) {
      // Each contentId will have exactly 1 entry
      data.push({
        id: i,
        contentId: i,
        userId: '1',
        currentTimestamp: getRandomTimestamp(),
        updatedAt, // Set updatedAt time to be the same for the first 5 entries
      });
    }
  }

  function getRandomTimestamp() {
    return Math.floor(Math.random() * 11); // Random number between 0 and 10
  }

  function getRandomDate() {
    const startDate = new Date(2023, 0, 1); // Random start date
    const endDate = new Date(); // Current date
    return new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime()),
    );
  }

  await db.videoProgress.createMany({
    data,
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
