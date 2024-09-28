import { NewPostDialog } from '@/components/NewPostDialog';

import Link from 'next/link';
import dayjs from 'dayjs';

import { ExtendedQuestion, QuestionQuery } from '@/actions/question/types';
import Search from '@/components/search';
import { ArrowUpDownIcon, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { QueryParams, TabType } from '@/actions/types';
import { getDisabledFeature, getUpdatedUrl, paginationData } from '@/lib/utils';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PostCard from '@/components/posts/PostCard';
import Pagination from '@/components/Pagination';
import { redirect } from 'next/navigation';

type QuestionsResponse = {
  data: ExtendedQuestion[] | null;
  error: string | null;
};

const getQuestionsWithQuery = async (
  additionalQuery: Partial<QuestionQuery>,
  searchParams: QueryParams,
  sessionId: string,
): Promise<QuestionsResponse> => {
  const paginationQuery = {
    take: paginationData(searchParams).pageSize,
    skip: paginationData(searchParams).skip,
  };

  const baseQuery = {
    ...paginationQuery,
    select: {
      id: true,
      title: true,
      upvotes: true,
      downvotes: true,
      totalanswers: true,
      tags: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      videoId: true,
      votes: {
        where: { userId: sessionId },
        select: { userId: true, voteType: true },
      },
      author: { select: { id: true, name: true } },
    },
  };

  const searchQuery = searchParams.search
    ? {
        where: {
          ...additionalQuery.where,
          title: {
            contains: searchParams.search,
            mode: 'insensitive',
          },
        },
      }
    : {};

  const dateFilter = searchParams.date;
  if (dateFilter) {
    const startDate = dayjs(dateFilter).startOf('day').toISOString();
    const endDate = dayjs(dateFilter).endOf('day').toISOString();

    additionalQuery.where = {
      ...additionalQuery.where,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    };
  }

  try {
    const data: any = await db.question.findMany({
      ...baseQuery,
      ...searchQuery,
      ...additionalQuery,
    });
    return { data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return { data: null, error: errorMessage };
  }
};
const fetchQuestionsByTabType = async (
  searchParams: QueryParams,
  sessionId: string,
) => {
  const orderByDefaults = {
    'Most upvotes': { upvotes: 'desc' },
    'Most Recent': { createdAt: 'desc' },
    'Most downvotes': { downvotes: 'desc' },
  };

  const queryModifiers: any = {
    default: { orderBy: orderByDefaults['Most upvotes'] },
    'Most Recent': { orderBy: orderByDefaults['Most Recent'] },
    'Most downvotes': { orderBy: orderByDefaults['Most downvotes'] },
    'My question': { where: { authorId: sessionId } },
  };

  const tabType = searchParams.tabtype || 'Most upvotes';
  const additionalQuery = queryModifiers[tabType] || queryModifiers.default;

  return getQuestionsWithQuery(additionalQuery, searchParams, sessionId);
};

export default async function QuestionsPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: QueryParams;
}) {
  const disabled = getDisabledFeature('qa');
  if (disabled) {
    redirect('/');
  }
  const session = await getServerSession(authOptions);
  const sessionId = session?.user?.id;

  const tabType = searchParams.tabtype || TabType.mu;
  const response = await fetchQuestionsByTabType(searchParams, sessionId!);
  return (
    <>
      <div className="mx-auto my-16 flex min-h-screen w-full flex-col gap-4">
        {/* Header */}
        <div className="flex w-full flex-col justify-between gap-2">
          <h1 className="text-4xl font-bold capitalize tracking-tighter md:text-5xl">
            Questions
          </h1>
          <p className="text-primary/80 md:text-lg">
            Please maintain a respectful and civil tone in all interactions.
          </p>
        </div>
        {/* Next question button */}
        <NewPostDialog />
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <Search />
            <div className="flex items-center justify-between gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={'lg'}>
                    <ArrowUpDownIcon className="mr-2 h-4 w-4" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px]">
                  <DropdownMenuRadioGroup value={tabType}>
                    <Link
                      className="py-2"
                      href={getUpdatedUrl('/question', searchParams, {
                        tabtype: TabType.mq,
                      })}
                    >
                      <DropdownMenuRadioItem value={TabType.mq}>
                        Your questions
                      </DropdownMenuRadioItem>
                    </Link>

                    <Link
                      href={getUpdatedUrl('/question', searchParams, {
                        tabtype: TabType.mu,
                      })}
                    >
                      <DropdownMenuRadioItem value={TabType.mu}>
                        Most Voted
                      </DropdownMenuRadioItem>
                    </Link>
                    <Link
                      href={getUpdatedUrl(`/question`, searchParams, {
                        tabtype: TabType.md,
                      })}
                    >
                      <DropdownMenuRadioItem value={TabType.md}>
                        Most Down Voted
                      </DropdownMenuRadioItem>
                    </Link>
                    <Link
                      href={getUpdatedUrl('/question', searchParams, {
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

              <Link
                href={getUpdatedUrl('/question', searchParams, {
                  newPost:
                    searchParams.newPost === 'close' || !searchParams.newPost
                      ? 'open'
                      : 'close',
                })}
              >
                <Button size={'lg'} className="gap-2" variant={'branding'}>
                  <Plus className="size-4" /> Ask a Question
                </Button>
              </Link>
            </div>
          </div>
          {/* Chat */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {response?.data?.map((post) => (
              <PostCard
                post={post}
                sessionUser={session?.user}
                key={post.id}
                isAnswer={false}
                questionId={post.id}
                enableLink={true}
                reply={false}
              />
            ))}
          </div>
          {
            //@ts-ignore
            response?.data?.length > 10 && (
              <Pagination dataLength={response?.data?.length || 0} />
            )
          }
        </div>
      </div>
    </>
  );
}
