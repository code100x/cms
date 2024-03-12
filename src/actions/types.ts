import { CommentType } from '@prisma/client';

export interface QueryParams {
  limit?: number;
  page?: number;
  commentfilter?: CommentFilter;
  search?: string;
  date?: string;
  type?: CommentType;
  parentId?: number;
  userId?: number;
  commentId?: number;
  timestamp?: number;
  editCommentId?: number;
}
export enum CommentFilter {
  md = 'Most downvotes',
  mu = 'Most upvotes',
  mr = 'Most Recent',
}
export type Delete = {
  message: string;
};

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}
