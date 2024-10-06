import { QueryParams } from '@/actions/types';
import PostCard from '@/components/posts/PostCard';
import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

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
    <div className="wrapper">
      <div className="items-center justify-center">
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
