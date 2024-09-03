import { QueryParams } from '@/actions/types';
import React from 'react';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import QuestionPost from '@/components/questions/QuestionPost';

const SingleQuestionPage = async ({
  params,
}: {
  params: { slug: string };
  searchParams: QueryParams;
}) => {
  const session = await getServerSession(authOptions);
  const sessionId = session?.user.id;
  const question: any = await db.question.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      id: true,
      title: true,
      upvotes: true,
      downvotes: true,
      totalanswers: true,
      tags: true,
      slug: true,
      authorId: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      votes: {
        where: {
          userId: sessionId,
        },
        select: {
          userId: true,
          voteType: true,
        },
      },
    },
  });

  return (
    <div className="mt-5 md:mx-[15%]">
      <Link href="/question" className="p-4">
        Go Back
      </Link>
      <div className="mt-3 items-center justify-center px-3">
        {question && (
          <QuestionPost
            post={question}
            sessionUser={session?.user}
            key={question.id}
            isAnswer={false}
            questionId={question.id}
            enableLink={true}
            reply={true}
          />
        )}
      </div>
    </div>
  );
};

export default SingleQuestionPage;
