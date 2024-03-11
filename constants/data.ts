export const Course = [
  {
    id: 1,
    appxCourseId: 1,
    discordRoleId: '2',
    title: 'test course 100',
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
    title: 'test course 200',
    imageUrl:
      'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png',
    description: 'test course 2',
    openToEveryone: false,
    slug: 'test-course-2',
  },
];

export const Content = [
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
];

export const CourseContent = [
  {
    courseId: 1,
    contentId: 1,
  },
];

export const NotionMetaData = [
  {
    id: 1,
    notionId: '39298af78c0f4c4ea780fd448551bad3',
    contentId: 2,
  },
];

export const VideoMetaData = [
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
  },
];

export const User = [
  {
    id: '2',
    email: 'test',
    name: 'test',
    disableDrm: false,
  },
  {
    id: '1',
    email: 'test1',
    name: 'test1',
    disableDrm: false,
  },
];
