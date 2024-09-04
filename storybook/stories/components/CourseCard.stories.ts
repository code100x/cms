import { CourseCard } from '@/components/CourseCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CourseCard> = {
  title: 'CourseCard',
  component: CourseCard,
  argTypes: {
    buttonColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonColor: Story = {
  args: {
    course: {
      id: 1,
      slug: 'course-slug',
      appxCourseId: '1',
      certIssued: false,
      discordOauthUrl: '',
      discordRoleId: 'discord-role-id',
      title: 'Course Title',
      description: 'Course Description',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      totalVideos: 10,
      totalVideosWatched: 5,
      openToEveryone: true,
    },
    onClick: () => {},
  },
};

export const SmallRoundedCard: Story = {
  args: {
    course: {
      id: 1,
      slug: 'course-slug',
      appxCourseId: '1',
      discordOauthUrl: '',
      certIssued: false,
      discordRoleId: 'discord-role-id',
      title: 'Course Title',
      description: 'Course Description',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      totalVideos: 10,
      totalVideosWatched: 5,
      openToEveryone: true,
    },
    onClick: () => {},
  },
};

export const MediumRoundedCard: Story = {
  args: {
    course: {
      id: 1,
      slug: 'course-slug',
      appxCourseId: '1',
      certIssued: false,
      discordOauthUrl: '',
      discordRoleId: 'discord-role-id',
      title: 'Course Title',
      description: 'Course Description',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      totalVideos: 10,
      totalVideosWatched: 5,
      openToEveryone: true,
    },
    onClick: () => {},
  },
};

export const LargeRoundedCard: Story = {
  args: {
    course: {
      id: 1,
      slug: 'course-slug',
      appxCourseId: '1',
      discordOauthUrl: '',
      discordRoleId: 'discord-role-id',
      certIssued: false,
      title: 'Course Title',
      description: 'Course Description',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      totalVideos: 10,
      totalVideosWatched: 5,
      openToEveryone: true,
    },
    onClick: () => {},
  },
};
