'use server';
import { getServerSession } from 'next-auth';
import {
  InputTypeCreateReview,
  InputTypeDeleteReview,
  InputTypeUpdateReview,
  ReturnTypeCreateReview,
  ReturnTypeDeleteReview,
  ReturnTypeUpdateReview,
} from './types';
import { authOptions } from '@/lib/auth';
import { rateLimit } from '@/lib/utils';
import prisma from '@/db';
import {
  ReviewDeleteSchema,
  ReviewInsertSchema,
  ReviewUpdateSchema,
} from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { revalidatePath } from 'next/cache';

export const getAllReviews = async () => {
  const reviews = await prisma.ratingAndReview.findMany({
    where: {
      rating: 5,
    },
    include: {
      user: true,
    },
  });
  return { reviews };
};

export const getReview = async (courseId: number) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return await prisma.ratingAndReview.findFirst({
    where: {
      courseId,
      userId,
    },
  });
};

const createReviewHandler = async (
  data: InputTypeCreateReview,
): Promise<ReturnTypeCreateReview> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { content, courseId, ratingNum } = data;
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }
  try {
    const contentStats = await prisma.$transaction([
      prisma.content.count({
        where: {
          courses: {
            some: {
              courseId,
            },
          },
        },
      }),
      prisma.videoProgress.count({
        where: {
          userId,
          content: {
            courses: {
              every: {
                courseId,
              },
            },
          },
          markAsCompleted: true,
        },
      }),
    ]);

    const totalConentCount = contentStats[0];
    const completedContentCount = contentStats[1];
    // for reducing spam and unfair reviews
    const percentOfProgress = (completedContentCount / totalConentCount) * 100;
    if (percentOfProgress < 30) {
      return { error: 'Complete at least 30% of the course to leave a review' };
    }

    const review = await prisma.ratingAndReview.create({
      data: {
        userId,
        content,
        rating: ratingNum,
        courseId,
      },
    });
    if (data.currentPath) {
      revalidatePath(data.currentPath);
    }
    return { data: review };
  } catch (error: any) {
    return { error: error.message || 'Failed to create review.' };
  }
};

const updateReviewHandler = async (
  data: InputTypeUpdateReview,
): Promise<ReturnTypeUpdateReview> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { content, reviewId, ratingNum } = data;
  const userId = session.user.id;

  try {
    const existingReview = await prisma.ratingAndReview.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return { error: 'Review not found.' };
    }

    const updatedReview = await prisma.ratingAndReview.update({
      where: { id: reviewId },
      data: {
        rating: ratingNum,
        content,
        userId,
      },
    });
    if (data.currentPath) {
      revalidatePath(data.currentPath);
    }
    return { data: updatedReview };
  } catch (error) {
    return { error: 'Failed to update review.' };
  }
};

const deleteReviewHandler = async (
  data: InputTypeDeleteReview,
): Promise<ReturnTypeDeleteReview> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { reviewId } = data;
  const userId = session.user.id;

  try {
    await prisma.ratingAndReview.delete({
      where: {
        id: reviewId,
        userId,
      },
    });
    if (data.currentPath) {
      revalidatePath(data.currentPath);
    }
    return {
      data: { message: 'Review deleted successfully' },
    };
  } catch (error) {
    return { error: 'Failed to delete review.' };
  }
};

export const createReview = createSafeAction(
  ReviewInsertSchema,
  createReviewHandler,
);
export const updateReview = createSafeAction(
  ReviewUpdateSchema,
  updateReviewHandler,
);
export const deleteReview = createSafeAction(
  ReviewDeleteSchema,
  deleteReviewHandler,
);
