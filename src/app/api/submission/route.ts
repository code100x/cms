import { NextRequest, NextResponse } from "next/server";
import db from '@/db';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { assignmentId, userId, courseId, githubLink, twitterPost, deploymentLink } = body;

    try {
        const assignment = await db.assignment.findFirst({
            where: {
                id: assignmentId
            }
        });

        if (!assignment) {
            return NextResponse.json({status: 404, error: "No Assignment found"});
        }

        const course = await db.course.findFirst({
            where: {
                id: courseId
            }
        });

        if (!course) {
            return NextResponse.json({status: 404, error: "No course found"});
        }

        const res = await db.submission.create({
            data: {
                assignmentId,
                userId,
                courseId,
                githubLink,
                twitterPost,
                deploymentLink,
                submitted: true
            }
        });

        return NextResponse.json({status: 200, data: res});
    } catch (error) {
        console.log(" Error in submitting the assignment : ", error);
        return NextResponse.json({ status: 500, error: "Internal server error"});
    }
}