'use server';
import { getServerSession } from 'next-auth';
import { InputTypeCreateBlog, ReturnTypeCreateBlog } from './types';
import { authOptions } from '@/lib/auth';
import { createSafeAction } from '@/lib/create-safe-action';
import { blogInsertSchema } from './scema';
import prisma from '@/db';

const createBlogHandler = async (
  data: InputTypeCreateBlog,
): Promise<ReturnTypeCreateBlog> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: 'Unauthorized or insufficient permissions' };
    }
    const { title, subTitle, imageUrl, blocks } = data;
    const post = await prisma.blog.create({
      data: {
        title,
        subtitle: subTitle,
        imageUrl,
        content: blocks,
        authorId: session.user.id,
      },
    });
    return { data: post };
  } catch (error: any) {
    return { error };
  }
};

export const getAllBlogs = async () => {
  try {
    const posts = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return { data: posts };
  } catch (error: any) {
    return { error };
  }
};

export const getBlog = async (id: number) => {
  try {
    const post = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    return { data: post };
  } catch (error: any) {
    return { error };
  }
};

export const createBlog = createSafeAction(blogInsertSchema, createBlogHandler);
