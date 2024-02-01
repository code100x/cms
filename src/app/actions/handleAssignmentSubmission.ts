"use server";

import prisma from "@/db";
import { getUserSession } from "@/lib/auth";

export const handleAssignmentSubmission = async (
  link: string,
  week: string
): Promise<{ message: string }> => {
  const session = await getUserSession();
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });
    if (user === null) {
      return {
        message: "user does not exist",
      };
    }
    await prisma.submission.create({
      data: {
        userId: session.user.id as string,
        submissionLink: link,
        week,
      },
    });
    return {
      message: "Submission added successfully",
    };
  } catch (error) {
    return {
      message: "An Error Occoured, Please try again",
    };
  }
};
