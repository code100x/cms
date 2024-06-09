import { QueryParams } from '@repo/common/types';
import React from 'react';
import db from '@repo/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@repo/common/lib/auth';
import PostCard from '@/components/posts/PostCard';
import Link from 'next/link';

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
      <Link href="/questions" className="p-4">
        Go Back
      </Link>
      <div className="mt-3 flex items-center justify-center px-3">
        {question && (
          <PostCard
            post={question}
            sessionUser={session?.user}
            reply={true}
            questionId={question.id}
            isAnswer={false}
            enableLink={false}
          />
        )}
      </div>
    </div>
  );
};

export default SingleQuestionPage;
