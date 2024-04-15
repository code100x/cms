import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import McqRendererClient from '../McqRendererClient';

export const getMetadata = async (contentId: number) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }

  const meta = await db.quiz.findFirst({
    where: {
      contentId,
    },
  });

  if (!meta) {
    return null;
  }

  const metadata = await db.question.findMany({
    where: {
      quizId: meta.id,
    },
  });

  return metadata;
};

export const McqRenderer = async ({ content }: { content: any }) => {
  const metadata = await getMetadata(content.id);

  return (
    <>
      {metadata ? (
        <McqRendererClient metadata={metadata} />
      ) : (
        <p>error while fetching quiz</p>
      )}
    </>
  );
};
