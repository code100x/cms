import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDownIcon } from 'lucide-react';

import { QueryParams, TabType } from '@/actions/types';
import PostCard from '@/components/posts/PostCard';
import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getUpdatedUrl, paginationData } from '@/lib/utils';
import { Answer } from '@prisma/client';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

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
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toString();
  };

  return (
    <div className="wrapper flex flex-col gap-8">
      <div className="flex w-full justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {formatNumber(answers.length)}{' '}
          {answers.length === 1 ? 'reply' : 'replies'}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'sm'} className="shrink-0" variant="outline">
              <ArrowUpDownIcon className="mr-2 h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={tabType}>
              <Link
                href={getUpdatedUrl(`/question/${params.slug}`, searchParams, {
                  tabtype: TabType.mu,
                })}
              >
                <DropdownMenuRadioItem value={TabType.mu}>
                  Most Voted
                </DropdownMenuRadioItem>
              </Link>
              <Link
                href={getUpdatedUrl(`/question/${params.slug}`, searchParams, {
                  tabtype: TabType.md,
                })}
              >
                <DropdownMenuRadioItem value={TabType.md}>
                  Most Down Voted
                </DropdownMenuRadioItem>
              </Link>
              <Link
                href={getUpdatedUrl(`/question/${params.slug}`, searchParams, {
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
      <div className="flex flex-col items-center justify-center gap-4 border-l-2 pl-2 lg:px-5">
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
    </div>
  );
};

export default SingleAnswerPage;
