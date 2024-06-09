import { z } from 'zod';

import { ActionState } from '@/lib/create-safe-action';
import {
  QuestionDeleteSchema,
  QuestionInsertSchema,
  QuestionUpdateSchema,
} from '@/zodSchema/question';
import { Answer, Question } from '@repo/db';
import { Delete } from '@/lib/utils';

export type InputTypeCreate = z.infer<typeof QuestionInsertSchema>;
export type ReturnTypeCreate = ActionState<InputTypeCreate, Question>;

export type InputTypeUpadate = z.infer<typeof QuestionUpdateSchema>;
export type ReturnTypeUpdate = ActionState<InputTypeUpadate, Question>;

export type DeleteTypeQuestion = z.infer<typeof QuestionDeleteSchema>;
export type ReturnTypeDelete = ActionState<DeleteTypeQuestion, Delete>;

export interface QuestionQuery {
  take?: number;
  skip?: number;
  orderBy?: {
    upvotes?: 'asc' | 'desc';
    downvotes?: 'asc' | 'desc';
    totalvotes?: 'asc' | 'desc';
    createdAt?: 'asc' | 'desc';
    // Add other fields as needed
  };
  select?: {
    id: boolean;
    title: boolean;
    totalvotes?: boolean;
    upvotes: boolean;
    downvotes: boolean;
    slug?: boolean;
    tags?: boolean;
    totalanswers?: boolean;
    createdAt: true;
    updatedAt: true;
    author: {
      select: {
        id: boolean;
        name: boolean;
      };
    };
    votes: {
      where: {
        userId: string | undefined;
      };
      select: {
        userId: boolean;
        voteType: boolean;
      };
    };
  };
  where?: {
    authorId?: string;

    title?: {
      contains: string;
    };
    search?: string;
    createdAt?: {
      gte?: string;
      lt?: string;
    };
  };
}

export interface Author {
  id: string | undefined;
  name: string | null; // Allow null
  role?: string | null;
  email?: string | null;
}

export interface ExtendedQuestion extends Question {
  author: Author;
  votes: any[];
}

export interface ExtendedAnswer extends Answer {
  author: Author;
  votes: any[];
  responses: ExtendedAnswer[];
}
