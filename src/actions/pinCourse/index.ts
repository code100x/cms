import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/db';

export async function togglePinCourse(courseId: number) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return { error: true, message: 'User not authenticated', isPinned: false };
    }

    try {
        const userId = session.user.id;

        const existingPin = await prisma.pinnedCourses.findUnique({
            where: {
                userId_courseId: { userId, courseId },
            },
        });

        if (existingPin) {
            await prisma.pinnedCourses.delete({
                where: {
                    userId_courseId: { userId, courseId },
                },
            });
            return { error: false, message: 'Course unpinned successfully', isPinned: false };
        }
        await prisma.pinnedCourses.create({
            data: { userId, courseId },
        });
        return { error: false, message: 'Course pinned successfully', isPinned: true };
    } catch (error) {
        console.error('Error toggling pin:', error);
        return { error: true, message: 'Failed to toggle pin course', isPinned: false };
    }
}
