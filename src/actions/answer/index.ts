'use server';

import {
  DeleteTypeAnswer,
  InputTypeCreateAnswer,
  InputTypeUpdateAnswer,
  ReturnTypeCreateAnswer,
  ReturnTypeDeleteAnswer,
  ReturnTypeUpdateAnswer,
} from './types';

import { createSafeAction } from '@/lib/create-safe-action';
import {
  AnswerDeleteSchema,
  AnswerInsertSchema,
  AnswerUpdateSchema,
} from './schema';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import db from '@/db';
import { ROLES } from '../types';

const createAnswerHandler = async (
  data: InputTypeCreateAnswer,
): Promise<ReturnTypeCreateAnswer> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return { error: 'Unauthorized' };
  }

  const { content, questionId, parentId } = data;

  try {
    const result = await db.$transaction(async (prisma) => {
      const answerData = {
        content,
        questionId,
        authorId: session.user.id!,
        parentId,
      };

      const answer = await prisma.answer.create({ data: answerData });

      if (!parentId) {
        await prisma.question.update({
          where: { id: questionId },
          data: { totalanswers: { increment: 1 } },
        });
      } else {
        await prisma.answer.update({
          where: { id: parentId },
          data: { totalanswers: { increment: 1 } },
        });
      }

      return answer;
    });

    revalidatePath(`/question/${result.id}`);
    revalidatePath(`/question`);

    return { data: result };
  } catch (error) {
    console.error('Error in createAnswerHandler:', error);
    return { error: 'Failed to create answer.' };
  }
};

const updateAnswerHandler = async (
  data: InputTypeUpdateAnswer,
): Promise<ReturnTypeUpdateAnswer> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { answerId, content } = data;

  // Check if the user is the author of the answer
  const existingAnswer = await db.answer.findUnique({
    where: { id: answerId },
  });

  if (!existingAnswer || existingAnswer.authorId !== session.user.id) {
    return {
      error: 'Unauthorized: You can only update answers you have authored',
    };
  }

  try {
    const updatedAnswer = await db.answer.update({
      where: { id: answerId },
      data: {
        content, // Update content
      },
    });
    revalidatePath(`/question/${answerId}`);
    revalidatePath(`/question`);
    return { data: updatedAnswer };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to update answer.',
    };
  }
};
const deleteAnswerHandler = async (
  data: DeleteTypeAnswer,
): Promise<ReturnTypeDeleteAnswer> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return { error: 'Unauthorized' };
  }

  const { answerId } = data;

  // Check if the user is the author of the answer
  const answer = await db.answer.findUnique({
    where: { id: answerId },
    include: { question: true },
  });

  if (
    !answer ||
    (answer.authorId !== session.user.id && session.user.role !== ROLES.ADMIN)
  ) {
    return {
      error: 'Unauthorized: You can only delete answers you have authored',
    };
  }

  try {
    await db.$transaction(async (prisma) => {
      // Function to recursively delete answers and decrement totalReplies
      const deleteNestedAnswers = async (parentId: number) => {
        const childAnswers = await prisma.answer.findMany({
          where: { parentId },
        });

        for (const childAnswer of childAnswers) {
          await deleteNestedAnswers(childAnswer.id); // Recursively delete children
          await prisma.answer.delete({ where: { id: childAnswer.id } });
          // Decrement totalReplies for each child answer
          await prisma.answer.update({
            where: { id: parentId },
            data: { totalanswers: { decrement: 1 } },
          });
        }
      };

      // Delete all nested answers recursively
      await deleteNestedAnswers(answerId);

      // Decrement totalReplies on the parent answer or question
      if (answer.parentId) {
        await prisma.answer.update({
          where: { id: answer.parentId },
          data: { totalanswers: { decrement: 1 } },
        });
      } else if (answer.questionId) {
        await prisma.question.update({
          where: { id: answer.questionId },
          data: { totalanswers: { decrement: 1 } },
        });
      }

      // Now delete the answer itself
      await prisma.answer.delete({ where: { id: answerId } });
    });

    revalidatePath(`/question/${answerId}`);
    revalidatePath(`/question`);

    return {
      data: { message: 'Answer and all nested answers deleted successfully' },
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete answer and nested answers.' };
  }
};

export const createAnswer = createSafeAction(
  AnswerInsertSchema,
  createAnswerHandler,
);
export const updateAnswer = createSafeAction(
  AnswerUpdateSchema,
  updateAnswerHandler,
);
export const deleteAnswer = createSafeAction(
  AnswerDeleteSchema,
  deleteAnswerHandler,
);
