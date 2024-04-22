'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import { ContentVoteHandleSchema } from './schema';
import {
  InputTypeHandleContentVote,
  ReturnTypeHandleContentVote,
} from './types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/db';
import { VoteType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const contentVoteHandler = async (
  data: InputTypeHandleContentVote,
): Promise<ReturnTypeHandleContentVote> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return { error: 'Unauthorized' };
  }

  const { contentId, voteType } = data;

  await prisma.$transaction(async (prisma) => {
    const existingVote = await prisma.contentVote.findFirst({
      where: {
        userId: session.user.id,
        contentId,
      },
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // toggle off the vote
        await prisma.contentVote.delete({
          where: {
            id: existingVote.id,
          },
        });

        // Decrement the vote count
        const updateField =
          voteType === VoteType.UPVOTE ? 'upvotes' : 'downvotes';
        await prisma.content.update({
          where: { id: contentId },
          data: {
            [updateField]: { decrement: 1 },
          },
        });
      } else {
        // Update the existing vote
        await prisma.contentVote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            voteType,
          },
        });

        // adjust the prev vote and the new vote
        await prisma.content.update({
          where: { id: contentId },
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
      await prisma.contentVote.create({
        data: {
          voteType,
          userId: session.user.id!,
          contentId,
        },
      });

      // Increment the vote count
      const updateField =
        voteType === VoteType.UPVOTE ? 'upvotes' : 'downvotes';
      await prisma.content.update({
        where: { id: contentId },
        data: {
          [updateField]: { increment: 1 },
        },
      });
    }
  });

  const updatedContent = await prisma.content.findUnique({
    where: { id: contentId },
  });
  revalidatePath(data.currentPath);
  return { data: updatedContent };
};

export const contentVoteHandlerAction = createSafeAction(
  ContentVoteHandleSchema,
  contentVoteHandler,
);
