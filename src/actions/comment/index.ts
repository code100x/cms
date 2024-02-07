'use server';
import { getServerSession } from 'next-auth';
import {
  InputTypeCreateComment,
  InputTypeDeleteComment,
  InputTypeUpdateComment,
  ReturnTypeCreateComment,
  ReturnTypeDeleteComment,
  ReturnTypeUpdateComment,
} from './types';
import { authOptions } from '@/lib/auth';
import { rateLimit } from '@/lib/utils';
import prisma from '@/db';
import {
  CommentDeleteSchema,
  CommentInsertSchema,
  CommentUpdateSchema,
} from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { CommentType, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const getComments = async (
  q: Prisma.CommentFindManyArgs,
  parentId: number | null | undefined,
) => {
  let parentComment = null;
  if (parentId) {
    parentComment = await prisma.comment.findUnique({
      where: { id: parseInt(parentId.toString(), 10) },
      include: {
        user: true,
      },
    });
  }
  if (!parentComment) {
    delete q.where?.parentId;
  }

  const comments = await prisma.comment.findMany(q);

  return {
    comments,
    parentComment,
  };
};
const parseIntroComment = (
  comment: string,
): Array<{ start: number; end?: number; title: string }> | null => {
  const introPattern = /^intro:\s*([\s\S]*)$/;
  const match = comment.match(introPattern);
  if (!match) return [];

  const lines = match[1].split('\n').filter((line) => line.trim() !== '');
  const segments = lines.map((line) => {
    const parts = line.split('-').map((part) => part.trim());
    const timePattern = /(\d{2}):(\d{2})/;
    const startTimeMatch = parts[0].match(timePattern);

    const start = startTimeMatch
      ? parseInt(startTimeMatch[1], 10) * 60 + parseInt(startTimeMatch[2], 10)
      : 0;
    const title = parts.length > 2 ? parts[2] : parts[1];

    return { start, title, end: 0 };
  });

  // Set 'end' to the 'start' of the next segment
  for (let i = 0; i < segments.length - 1; i++) {
    segments[i].end = segments[i + 1].start;
  }

  // Handle the last segment
  const lastLineParts = lines[lines.length - 1]
    .split('-')
    .map((part) => part.trim());
  if (lastLineParts.length < 2) {
    return null;
  }
  const timePattern = /(\d{2}):(\d{2})/;
  const endTimeMatch = lastLineParts[1].match(timePattern);
  const end = endTimeMatch
    ? parseInt(endTimeMatch[1], 10) * 60 + parseInt(endTimeMatch[2], 10)
    : 0;
  segments[segments.length - 1].end = end;

  return segments;
};
const createCommentHandler = async (
  data: InputTypeCreateComment,
): Promise<ReturnTypeCreateComment> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { content, contentId, parentId } = data;
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }

  try {
    // Check if the parent comment exists and is a top-level comment
    // Only top-level comments can have replies like youtube comments otherwise it would be a thread
    let parentComment;
    if (parentId) {
      parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        return { error: 'Parent comment not found.' };
      }

      if (parentComment.parentId) {
        return { error: 'Cannot reply to a nested comment.' };
      }
    }

    // Check if the related content exists and is not a folder
    // We only allow comments on videos and Notion pages
    const relatedContent = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!relatedContent || relatedContent.type === 'folder') {
      return { error: 'Invalid content for commenting.' };
    }
    let comment;
    if (parentComment) {
      await prisma.$transaction(async (prisma) => {
        comment = await prisma.comment.create({
          data: {
            content,
            contentId,
            parentId, // undefined if its a comment without parent (top level)
            userId,
          },
        });
        await prisma.comment.update({
          where: { id: parentId },
          data: {
            repliesCount: { increment: 1 },
          },
        });
      });
    } else {
      await prisma.$transaction(async (prisma) => {
        let introData:
          | { start: number; end?: number | undefined; title: string }[]
          | null = [];
        if (data.content.startsWith('intro:')) {
          introData = parseIntroComment(data.content);
          // Here you might want to store introData in a specific way, depending on your needs
        }

        comment = await prisma.comment.create({
          data: {
            content,
            contentId,
            parentId, // undefined if its a comment without parent (top level)
            userId,
            commentType:
              introData && introData.length > 0
                ? CommentType.INTRO
                : CommentType.DEFAULT,
          },
        });
        await prisma.content.update({
          where: { id: contentId },
          data: {
            commentsCount: { increment: 1 },
          },
        });
      });
    }
    revalidatePath(data.currentPath);
    return { data: comment };
  } catch (error) {
    console.log('error', error);
    return { error: 'Failed to create comment.' };
  }
};
const updateCommentHandler = async (
  data: InputTypeUpdateComment,
): Promise<ReturnTypeUpdateComment> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { commentId, content, approved, adminPassword } = data;
  const userId = session.user.id;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return { error: 'Comment not found.' };
    }

    // only the user who created the comment can update it
    if (existingComment.userId !== userId) {
      return { error: 'Unauthorized to update this comment.' };
    }

    // Update the comment but if its admin we need to check if the comment is approved
    const updObj = {
      content: content ?? existingComment.content,
      approved: existingComment.approved,
    };
    if (adminPassword === process.env.ADMIN_SECRET) {
      updObj.approved = approved ?? existingComment.approved;
    }
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: updObj,
    });
    revalidatePath(data.currentPath);
    return { data: updatedComment };
  } catch (error) {
    return { error: 'Failed to update comment.' };
  }
};

const deleteCommentHandler = async (
  data: InputTypeDeleteComment,
): Promise<ReturnTypeDeleteComment> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { commentId, adminPassword } = data;
  const userId = session.user.id;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return { error: 'Comment not found.' };
    }

    if (
      existingComment.userId !== userId &&
      adminPassword !== process.env.ADMIN_SECRET
    ) {
      return { error: 'Unauthorized to delete this comment.' };
    }

    // if there is no parentId we know that its a top level comment
    //   so lets delete the children aslo
    // lets do this in a transaction so we can rollback if something goes wrong
    await prisma.$transaction(async (prisma) => {
      // delete also votes so they are not orphaned
      await prisma.vote.deleteMany({
        where: {
          OR: [{ commentId }, { comment: { parentId: commentId } }],
        },
      });

      if (!existingComment.parentId) {
        await prisma.comment.deleteMany({
          where: { parentId: commentId },
        });
      }

      // Then delete the comment itself
      await prisma.comment.delete({
        where: { id: commentId },
      });
    });
    revalidatePath(data.currentPath);
    return { data: { message: 'Comment and its replies deleted successfully' } };
  } catch (error) {
    return { error: 'Failed to delete comment.' };
  }
};

export const createMessage = createSafeAction(
  CommentInsertSchema,
  createCommentHandler,
);
export const updateMessage = createSafeAction(
  CommentUpdateSchema,
  updateCommentHandler,
);
export const deleteMessage = createSafeAction(
  CommentDeleteSchema,
  deleteCommentHandler,
);
