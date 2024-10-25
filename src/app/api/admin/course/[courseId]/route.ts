import db from '@/db';
import { getCourse } from '@/db/course';
import { courseEditSchema } from '@/lib/validation/course';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const data = await req.json();
    const validatedFields = courseEditSchema.safeParse(data);
    if (data.adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({}, { status: 403 });
    }

    if (!validatedFields.success) {
      return NextResponse.json({ error: 'Invalid Inputs' }, { status: 400 });
    }
  
    const courseId = parseInt(params.courseId, 10);
    const course = await getCourse(courseId);

    if (!course) {
      return NextResponse.json({ error: 'No Course Found' }, { status: 400 });
    }
    const { title, slug, appxCourseId, description, imageUrl, discordRoleId } = validatedFields.data;
    const updatedCourseData = {
      title,
      slug,
      appxCourseId,
      description,
      imageUrl,
      discordRoleId
    };
    const res = await db.course.update({
      where: { id: courseId },
      data: updatedCourseData,
    });
  
    return NextResponse.json(
      { message: 'Course Updated successfully.', data: res },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error processing PATCH request:', error);
  }
}
