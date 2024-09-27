import { $Enums, Content, CourseContent, VideoProgress } from '@prisma/client';

export type CommentType = {
  id: number;
  content: string;
  userId: string;
  contentId: number;
  createdAt: Date;
  approved: boolean;
  commentType: $Enums.CommentType;
  parentId: number | null;
  upvotes: number;
  downvotes: number;
  repliesCount: number;
  updatedAt: Date;
  isPinned: boolean;
};

export type TWatchHistory = VideoProgress & {
  content: Content & {
    parent: { id: number; courses: CourseContent[] } | null;
    VideoMetadata: { duration: number | null } | null;
  };
};
