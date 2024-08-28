import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorised', success: 'false' }, { status: 401 });
    }

    const githubData = await prisma.gitHubLink.findMany({
        where: {
            userId: session?.user?.id
        },
        select: {
            avatarUrl: true,
            username: true,
            profileUrl: true,
        }
    });

    if (!githubData) {
        return NextResponse.json({ message: "Couldn't find any Linked github", success: 'false' });
    }

    return NextResponse.json({ message: "found data successsfully", data: githubData, success: 'true' });
}

export async function DELETE() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorised', success: 'false' }, { status: 401 });
    }

    try {
        await prisma.gitHubLink.delete({
            where: {
                userId: session?.user?.id
            },
        });
        return NextResponse.json({ message: "Github unlinked succeessfully", success: 'true' });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error: error, success: 'false' });
    }
}