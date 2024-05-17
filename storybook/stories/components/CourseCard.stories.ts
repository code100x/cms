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
      appxCourseId: 1,
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
    roundedCardSize: 'xl',
  },
};

export const SmallRoundedCard: Story = {
  args: {
    course: {
      id: 1,
      slug: 'course-slug',
      appxCourseId: 1,
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
    roundedCardSize: 'xl',
  },
};

export const MediumRoundedCard: Story = {
  args: {
    course: {
      id: 1,
      slug: 'course-slug',
      appxCourseId: 1,
      discordRoleId: 'discord-role-id',
      title: 'Course Title',
      description: 'Course Description',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      totalVideos: 10,
      totalVideosWatched: 5,
      openToEveryone: true,
    },
    roundedCardSize: '2xl',
    onClick: () => {},
  },
};

export const LargeRoundedCard: Story = {
  args: {
    course: {
      id: 1,
      slug: 'course-slug',
      appxCourseId: 1,
      discordRoleId: 'discord-role-id',
      title: 'Course Title',
      description: 'Course Description',
      imageUrl:
        'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png',
      totalVideos: 10,
      totalVideosWatched: 5,
      openToEveryone: true,
    },
    roundedCardSize: '3xl',
    onClick: () => {},
  },
};
