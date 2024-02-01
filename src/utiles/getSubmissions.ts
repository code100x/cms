import db from "@/db";

export async function getSubmissions(id: string) {
  const submissions = await db.submission.findMany({
    where: {
      userId: id,
    },
  });
  return submissions;
}
