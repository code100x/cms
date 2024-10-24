import { getCourse } from "@/db/course";
import db from '@/db';
import { NextResponse } from "next/server";

export async function PUT (
    req: Request
) {
    try {
        const { list, courseId } = await req.json();
        
        const course = await getCourse(courseId);

        if (!course) {
            return NextResponse.json({error: "No Course found"}, {status: 401});
        }

        for (const item of list) {
            await db.content.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            });
        }

        return NextResponse.json({message: "Content Updated Successfully"},{status: 201});
    } catch (error) {
        console.log(error);
    }
}