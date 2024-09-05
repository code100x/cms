import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Ensure this points to your NextAuth configuration

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions); // Fetch the session

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { contentId } = await request.json(); // You no longer need to pass `userId` in the body

  if (!contentId) {
    return NextResponse.json({ error: 'Missing contentId' }, { status: 400 });
  }

  try {
    // Check if the content is already in the user's Watch Later list
    const existingWatchLater = await prisma.watchLater.findUnique({
      where: {
        userId_contentId: {
          userId: session.user.id, // Use the `userId` from the session
          contentId,
        },
      },
    });

    if (existingWatchLater) {
      return NextResponse.json(
        { message: 'Content already in Watch Later list' },
        { status: 400 },
      );
    }
    // Find the current highest sortOrder for this user's Watch Later list
    const highestSortOrder = await prisma.watchLater.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        sortOrder: 'desc',
      },
      select: {
        sortOrder: true,
      },
    });

    const nextSortOrder = highestSortOrder ? highestSortOrder.sortOrder + 1 : 0;

    // Add content to Watch Later with the next sortOrder value
    const watchLater = await prisma.watchLater.create({
      data: {
        userId: session.user.id, // Use the `userId` from the session
        contentId,
        sortOrder: nextSortOrder, // Assign the next sortOrder
      },
    });

    return NextResponse.json({
      message: 'Content added to Watch Later',
      watchLater,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add content to Watch Later' },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all Watch Later videos for the current user, ordered by sortOrder
    const watchLaterVideos = await prisma.watchLater.findMany({
      where: {
        userId: session.user.id, // Use user ID from the session
      },
      include: {
        content: {
          select: {
            id: true,
            title: true,
            parentId: true,
            createdAt: true,
            parent: {
              select: {
                id: true,
                title: true,
                courses: {
                  select: {
                    courseId: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return NextResponse.json(watchLaterVideos);
  } catch (error) {
    console.error('Error fetching Watch Later videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Watch Later videos' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { reorderedContentIds } = await request.json();

    if (!reorderedContentIds || !Array.isArray(reorderedContentIds)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 },
      );
    }

    const updatePromises = reorderedContentIds.map(
      (contentId: number, index: number) => {
        return prisma.watchLater.updateMany({
          where: {
            userId: session.user.id,
            contentId,
          },
          data: {
            sortOrder: index,
          },
        });
      },
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      message: 'Watch Later list order updated successfully',
    });
  } catch (error) {
    console.error('Error updating Watch Later order:', error);
    return NextResponse.json(
      { error: 'Failed to update Watch Later order' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { contentId } = await req.json();

    if (!contentId) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 },
      );
    }

    const result = await prisma.watchLater.deleteMany({
      where: {
        userId: session.user.id,
        contentId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: 'No matching content found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'Content removed from Watch Later' });
  } catch (error) {
    console.error('Error deleting Watch Later entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete Watch Later entry' },
      { status: 500 },
    );
  }
}
