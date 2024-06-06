'use server';

import { getServerSession } from 'next-auth';
import {
  InputTypeHandleVote,
  ReturnTypeHandleVote,
} from '@repo/common/types/commentVote';
import { authOptions } from '@repo/common/lib/auth';
import prisma from '@repo/db/client';
import { VoteType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@repo/common/lib/create-safe-action';
import { VoteHandleSchema } from '@repo/common/schema/commentVote';

const voteHandler = async (
  data: InputTypeHandleVote,
): Promise<ReturnTypeHandleVote> => {
  const session = await getServerSession(authOptions);
  let targetType: 'question' | 'answer' | 'comment' | null = null;
  let targetId: number | undefined = undefined;

  if (!session || !session.user.id) {
    return { error: 'Unauthorized' };
  }

  const { questionId, answerId, commentId, voteType, currentPath } = data;

  if (!questionId && !answerId && !commentId) {
    return { error: 'No valid target specified.' };
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!userExists) {
      return { error: 'User not found.' };
    }

    await prisma.$transaction(async (prisma) => {
      if (commentId) {
        targetType = 'comment';
        targetId = commentId;
      } else if (questionId) {
        targetType = 'question';
        targetId = questionId;
      } else if (answerId) {
        targetType = 'answer';
        targetId = answerId;
      }

      const existingVote = await prisma.vote.findFirst({
        where: {
          userId: session.user.id,
          ...(commentId ? { commentId } : {}),
          ...(questionId ? { questionId } : {}),
          ...(answerId ? { answerId } : {}),
        },
      });

      if (existingVote) {
        if (existingVote.voteType === voteType) {
          await prisma.vote.delete({
            where: { id: existingVote.id },
          });
          const q = {
            where: { id: targetId },
            data: {
              [voteType === VoteType.UPVOTE ? 'upvotes' : 'downvotes']: {
                decrement: 1,
              },
            },
          };
          if (targetType === 'comment') {
            await prisma.comment.update(q);
          } else if (targetType === 'question') {
            await prisma.question.update(q);
          } else if (targetType === 'answer') {
            await prisma.answer.update(q);
          }
        } else {
          await prisma.vote.update({
            where: { id: existingVote.id },
            data: { voteType },
          });

          const incrementField =
            voteType === VoteType.UPVOTE ? 'upvotes' : 'downvotes';
          const decrementField =
            voteType === VoteType.UPVOTE ? 'downvotes' : 'upvotes';

          const q = {
            where: { id: targetId },
            data: {
              [incrementField]: { increment: 1 },
              [decrementField]: { decrement: 1 },
            },
          };
          if (targetType === 'comment') {
            await prisma.comment.update(q);
          } else if (targetType === 'question') {
            await prisma.question.update(q);
          } else if (targetType === 'answer') {
            await prisma.answer.update(q);
          }
        }
      } else {
        await prisma.vote.create({
          data: {
            voteType,
            userId: session.user.id,
            ...(commentId ? { commentId } : {}),
            ...(questionId ? { questionId } : {}),
            ...(answerId ? { answerId } : {}),
          },
        });
        const q = {
          where: { id: targetId },
          data: {
            [voteType === VoteType.UPVOTE ? 'upvotes' : 'downvotes']: {
              increment: 1,
            },
          },
        };
        if (targetType === 'comment') {
          await prisma.comment.update(q);
        } else if (targetType === 'question') {
          await prisma.question.update(q);
        } else if (targetType === 'answer') {
          await prisma.answer.update(q);
        }
      }
    });
    const q = {
      where: { id: targetId! },
    };
    let updatedEntity;
    if (targetType === 'comment') {
      updatedEntity = await prisma.comment.findUnique(q);
    } else if (targetType === 'question') {
      updatedEntity = await prisma.question.findUnique(q);
    } else if (targetType === 'answer') {
      updatedEntity = await prisma.answer.findUnique(q);
    }

    if (currentPath) {
      revalidatePath(currentPath);
    }

    return { data: updatedEntity };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to process the vote.' };
  }
};

export const voteHandlerAction = createSafeAction(
  VoteHandleSchema,
  voteHandler,
);
