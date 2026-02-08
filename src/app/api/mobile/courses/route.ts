import db from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = JSON.parse(req.headers.get('g') || '');
    if (!user) {
      return NextResponse.json({ message: 'User Not Found' }, { status: 400 });
    }

    // Production mode: Check if user has valid course purchases in the database
    // Calculate the course validity period threshold
    // Users can only access courses purchased within the configured validity period
    // Default is 3 years, configurable via CourseValidityPeriodInYears env variable
    const validityYearsAgo = new Date();
    const validityYears = parseInt(process.env.CourseValidityPeriodInYears || "3");
    validityYearsAgo.setFullYear(validityYearsAgo.getFullYear() - validityYears);

    // Query database for courses purchased by this user
    // Filter: Only include courses where assignedAt (purchase date) is within validity period
    const userCourses = await db.course.findMany({
      where: {
        purchasedBy: {
          some: {
            user: {
              email: user.email,
            },
            assignedAt: {
              gte: validityYearsAgo,
            },
          },
        },
      },
    });

    return NextResponse.json({
      message: 'User courses fetched successfully',
      data: userCourses,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching user courses', error },
      { status: 500 },
    );
  }
}
