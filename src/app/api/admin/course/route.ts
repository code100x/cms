
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export async function POST(req: NextRequest, { params }: { params: any }) {
  const { adminSecret, title, description, imageUrl, id, slug, appxCourseId, discordRoleId } = await req.json();

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  await db.course.create({
    data: {
      title, imageUrl, slug, description, id: parseInt(id), appxCourseId: parseInt(appxCourseId), discordRoleId
    }
  });

  return NextResponse.json({}, {
    status: 200,
  });

}

