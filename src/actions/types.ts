import { CommentType } from '@prisma/client';

export interface QueryParams {
  limit?: number;
  page?: number;
  tabtype?: TabType;
  search?: string;
  videoId?: number;
  date?: string;
  type?: CommentType;
  parentId?: number;
  userId?: number;
  commentId?: number;
  timestamp?: number;
  editCommentId?: number;
  newPost?: 'open' | 'close';
}
export enum TabType {
  md = 'Most downvotes',
  mu = 'Most upvotes',
  mr = 'Most Recent',
  mq = 'My question',
}
export type Delete = {
  message: string;
};

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}
