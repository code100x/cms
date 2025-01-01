import { NextRequest, NextResponse } from "next/server";
import db from '@/db';

export async function PUT(req: NextRequest, { params } : { params : { submissionId: string}}) {
    const body = await req.json();
    const { assignmentId, courseId, bounty, feedback, adminSecret } = body;
    const submissionId = parseInt(params.submissionId, 10);
    if (adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({status: 403, error: 'Forbidden: Invalid admin secret'});
    }
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

        const submission = await db.submission.findUnique({
            where: {
                id: submissionId
            }
        });

        if (!submission) {
            return NextResponse.json({status: 404, error: "No submission found"});
        }

        const res = await db.submission.update({
            where: {
                id: submissionId
            },
            data: {
                bounty,
                feedback,
            }
        });

        return NextResponse.json({status: 200, data: res});
    } catch (error) {
        console.log(" Error in editing the assignment : ", error);
        return NextResponse.json({ status: 500, error: "Internal server error"});
    }
}