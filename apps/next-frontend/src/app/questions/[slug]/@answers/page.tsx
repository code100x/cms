import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { Answer } from '@prisma/client';
import { QueryParams, TabType } from '@repo/common/types';
import { getUpdatedUrl, paginationData } from '@repo/common/lib/utils';
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@repo/common/lib/auth';
import PostCard from '@/components/posts/PostCard';
import Pagination from '@/components/Pagination';

const organizeAnswers = (
  answers: Answer[],
  parentId: number | null = null,
): Answer[] => {
  return answers
    .filter((answer) => {
      return answer.parentId === parentId;
    })
    .map((answer) => {
      const organizedResponses = organizeAnswers(answers, answer.id);

      return {
        ...answer,
        responses: organizedResponses,
      };
    });
};

const fetchAnswersForQuestion = async (
  sessionId: string,
  slug: string,
  searchParams: QueryParams,
) => {
  let orderCriteria = {};
  if (searchParams.tabtype === TabType.mu) {
    orderCriteria = { upvotes: 'desc' };
  } else if (searchParams.tabtype === TabType.md) {
    orderCriteria = { downvotes: 'desc' };
  } else if (searchParams.tabtype === TabType.mr) {
    orderCriteria = { createdAt: 'desc' };
  }
  const paginationQ = paginationData(searchParams);
  const pagination = {
    skip: paginationQ.skip,
    take: paginationQ.pageSize,
  };

  const questionWithAnswers = await db.question.findUnique({
    where: {
      slug,
    },

    include: {
      answers: {
        orderBy: orderCriteria,
        skip: pagination.skip,
        take: pagination.take,
        include: {
          author: true,
          votes: true,
          responses: true,
        },
      },
    },
  });

  return questionWithAnswers
    ? organizeAnswers(questionWithAnswers.answers, null)
    : [];
};
const SingleAnswerPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: QueryParams;
}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  const tabType = searchParams.tabtype || TabType.mu;

  const answers = await fetchAnswersForQuestion(
    session?.user.id,
    params.slug,
    searchParams,
  );

  return (
    <div className="pt-14 pb-14 md:mx-[15%]">
      <div className="px-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="shrink-0" variant="outline">
              <ArrowUpDownIcon className="w-4 h-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={tabType}>
              <Link
                href={getUpdatedUrl(`/questions/${params.slug}`, searchParams, {
                  tabtype: TabType.mu,
                })}
              >
                <DropdownMenuRadioItem value={TabType.mu}>
                  Most Voted
                </DropdownMenuRadioItem>
              </Link>
              <Link
                href={getUpdatedUrl(`/questions/${params.slug}`, searchParams, {
                  tabtype: TabType.md,
                })}
              >
                <DropdownMenuRadioItem value={TabType.md}>
                  Most Down Voted
                </DropdownMenuRadioItem>
              </Link>
              <Link
                href={getUpdatedUrl(`/questions/${params.slug}`, searchParams, {
                  tabtype: TabType.mr,
                })}
              >
                <DropdownMenuRadioItem value={TabType.mr}>
                  Most Recent
                </DropdownMenuRadioItem>
              </Link>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" flex items-center justify-center  px-3 flex-col gap-2 my-3">
        {answers.map((post: any) => (
          <PostCard
            key={post.id}
            questionId={post.questionId}
            post={post}
            sessionUser={session?.user}
            reply={true}
          />
        ))}
      </div>
      <Pagination dataLength={answers.length} />
    </div>
  );
};

export default SingleAnswerPage;
