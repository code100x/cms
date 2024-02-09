'use server';

import { getServerSession } from 'next-auth';
import { InputTypeHandleVote, ReturnTypeHandleVote } from './types';
import { authOptions } from '@/lib/auth';
import prisma from '@/db';
import { VoteType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { VoteHandleSchema } from './schema';

const voteHandler = async (
  data: InputTypeHandleVote,
): Promise<ReturnTypeHandleVote> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return { error: 'Unauthorized' };
  }

  const { commentId, voteType } = data;

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!userExists) {
      return { error: 'User not found.' };
    }
    await prisma.$transaction(async (prisma) => {
      const existingVote = await prisma.vote.findFirst({
        where: {
          userId: session.user.id,
          commentId,
        },
      });

      if (existingVote) {
        if (existingVote.voteType === voteType) {
          // toggle off the vote
          await prisma.vote.delete({
            where: {
              id: existingVote.id,
            },
          });

          // Decrement the vote count
          const updateField =
            voteType === VoteType.UPVOTE ? 'upvotes' : 'downvotes';
          await prisma.comment.update({
            where: { id: commentId },
            data: {
              [updateField]: { decrement: 1 },
            },
          });
        } else {
          // Update the existing vote
          await prisma.vote.update({
            where: {
              id: existingVote.id,
            },
            data: {
              voteType,
            },
          });

          // adjust the prev vote and the new vote
          await prisma.comment.update({
            where: { id: commentId },
            data: {
              upvotes:
                voteType === VoteType.UPVOTE
                  ? { increment: 1 }
                  : { decrement: 1 },
              downvotes:
                voteType === VoteType.DOWNVOTE
                  ? { increment: 1 }
                  : { decrement: 1 },
            },
          });
        }
      } else {
        // Create a new vote
        await prisma.vote.create({
          data: {
            voteType,
            userId: session.user.id!,
            commentId,
          },
        });

        // Increment the vote count
        const updateField =
          voteType === VoteType.UPVOTE ? 'upvotes' : 'downvotes';
        await prisma.comment.update({
          where: { id: commentId },
          data: {
            [updateField]: { increment: 1 },
          },
        });
      }
    });

    const updatedComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    revalidatePath(data.currentPath);
    return { data: updatedComment };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to process the vote.' };
  }
};

export const voteHandlerAction = createSafeAction(
  VoteHandleSchema,
  voteHandler,
);
