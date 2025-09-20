'use server';
import {
  DeleteTypeQuestion,
  InputTypeCreate,
  InputTypeUpadate,
  ReturnTypeCreate,
  ReturnTypeDelete,
  ReturnTypeUpdate,
} from './types';
import { revalidatePath } from 'next/cache';

import {
  QuestionDeleteSchema,
  QuestionInsertSchema,
  QuestionUpdateSchema,
} from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateHandle } from '@/lib/utils';
import db from '@/db';
import { ROLES } from '../types';

const createQuestionHandler = async (
  data: InputTypeCreate,
): Promise<ReturnTypeCreate> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, content, tags } = data;

  // Create initial slug
  let slug = generateHandle(title);

  try {
    const userExists = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!userExists) {
      return {
        error: 'User not found.',
      };
    }
    // Check if slug already exists
    const existingQuestion = await db.question.findFirst({
      where: { slug },
    });

    if (existingQuestion) {
      slug += `-${Math.random().toString(36).substring(2, 5)}`;
    }

    const question = await db.question.create({
      data: {
        title,
        content,
        tags,
        authorId: session.user.id,
        slug, // Include the slug
      },
    });
    revalidatePath(`/question/${question.id}`);
    revalidatePath(`/question`);

    return { data: question };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to create question.',
    };
  }
};

const updateQuestionHandler = async (
  data: InputTypeUpadate,
): Promise<ReturnTypeUpdate> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, content, tags, questionId } = data;
  const userExists = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!userExists) {
    return {
      error: 'User not found.',
    };
  }
  // Check if the user is the author of the question
  const existingQuestion = await db.question.findUnique({
    where: { id: questionId },
  });

  if (!existingQuestion || existingQuestion.authorId !== session.user.id) {
    return {
      error: 'Unauthorized: You can only update question you have authored',
    };
  }

  // Create initial slug
  let slug = generateHandle(title);

  try {
    // Check if slug already exists for another question
    const anotherExistingQuestion = await db.question.findFirst({
      where: {
        slug,
        AND: {
          id: {
            not: questionId, // Exclude the current question from the check
          },
        },
      },
    });

    if (anotherExistingQuestion) {
      // Modify the slug if it already exists (e.g., append a random string or number)
      slug += `-${Math.random().toString(36).substring(2, 5)}`;
    }

    // Update question with the new slug
    const updatedQuestion = await db.question.update({
      where: { id: questionId },
      data: {
        title,
        content,
        tags,
        slug, // Include the new slug
      },
    });
    revalidatePath(`/question/${questionId}`);
    revalidatePath(`/question`);

    return { data: updatedQuestion };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to update question.',
    };
  }
};
const deleteQuestionHandler = async (
  data: DeleteTypeQuestion,
): Promise<ReturnTypeDelete> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return { error: 'Unauthorized' };
  }
  const userExists = await db.user.findUnique({
    where: { id: session.user.id },
  });
  if (!userExists) {
    return {
      error: 'User not found.',
    };
  }
  const { questionId } = data;

  const question = await db.question.findUnique({
    where: { id: questionId },
  });

  if (
    !question ||
    (question.authorId !== session.user.id && session.user.role !== ROLES.ADMIN)
  ) {
    return {
      error: 'Unauthorized: You can only delete question you have authored',
    };
  }

  try {
    await db.$transaction(async (prisma) => {
      // Function to recursively delete answers and their responses
      const deleteAnswers = async (answerId: number) => {
        const responses = await prisma.answer.findMany({
          where: { parentId: answerId },
        });

        for (const response of responses) {
          await deleteAnswers(response.id); // Recursively delete child responses
        }

        await prisma.answer.delete({
          where: { id: answerId },
        });
      };

      // Delete all answers (and their responses) associated with the question
      const answers = await prisma.answer.findMany({
        where: { questionId },
      });
      for (const answer of answers) {
        await deleteAnswers(answer.id);
      }

      // Now delete the question itself
      await prisma.question.delete({
        where: { id: questionId },
      });
    });

    revalidatePath(`/question/${questionId}`);
    revalidatePath(`/question`);

    return {
      data: {
        message: 'Question and all associated answers deleted successfully',
      },
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete question and answers.' };
  }
};

export const createQuestion = createSafeAction(
  QuestionInsertSchema,
  createQuestionHandler,
);
export const updateQuestion = createSafeAction(
  QuestionUpdateSchema,
  updateQuestionHandler,
);
export const deleteQuestion = createSafeAction(
  QuestionDeleteSchema,
  deleteQuestionHandler,
);
