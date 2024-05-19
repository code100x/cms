import { NewPostDialog } from '@/components/NewPostDialog';

import Link from 'next/link';
import dayjs from 'dayjs';

import { ExtendedQuestion, QuestionQuery } from '@/actions/question/types';
import Search from '@/components/search';
import { ArrowUpDownIcon } from 'lucide-react';

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
    mu: { upvotes: 'desc' },
    mr: { createdAt: 'desc' },
    md: { downvotes: 'asc' },
  };

  const queryModifiers: any = {
    default: { orderBy: orderByDefaults.mu },
    mr: { orderBy: orderByDefaults.mr },
    md: { orderBy: orderByDefaults.md },
    mq: { where: { authorId: sessionId } },
  };

  const tabType = searchParams.tabtype || 'mu';
  const additionalQuery = queryModifiers[tabType] || queryModifiers.default;

  return getQuestionsWithQuery(additionalQuery, searchParams, sessionId);
};

export default async function Home({
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
      <div className="h-max pb-4 md:p-8 transition-colors duration-500">
        <div className="flex justify-between items-center mb-6 px-8 pt-3">
          <div className="text-3xl dark:text-white  text-black transition-colors duration-500">
            <h1 className="text-black  dark:text-white">Questions</h1>
          </div>
          <Link
            className="bg-black text-white dark:bg-white dark:text-black light:text-black transition-colors duration-500 sticky p-3 rounded-md"
            href={getUpdatedUrl('/questions', searchParams, {
              newPost:
                searchParams.newPost === 'close' || !searchParams.newPost
                  ? 'open'
                  : 'close',
            })}
          >
            New Question
          </Link>
        </div>
        <NewPostDialog />
        <div className="md:mx-[15%] mx-auto md:p-10 ">
          <div className="flex flex-col  items-center p-4 dark:text-white">
            <div className="flex ">
              <Search />
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
                        className="py-2"
                        href={getUpdatedUrl('/questions', searchParams, {
                          tabtype: TabType.mq,
                        })}
                      >
                        <DropdownMenuRadioItem value={TabType.mq}>
                          Your questions
                        </DropdownMenuRadioItem>
                      </Link>

                      <Link
                        href={getUpdatedUrl('/questions', searchParams, {
                          tabtype: TabType.mu,
                        })}
                      >
                        <DropdownMenuRadioItem value={TabType.mu}>
                          Most Voted
                        </DropdownMenuRadioItem>
                      </Link>
                      <Link
                        href={getUpdatedUrl(`/questions`, searchParams, {
                          tabtype: TabType.md,
                        })}
                      >
                        <DropdownMenuRadioItem value={TabType.md}>
                          Most Down Voted
                        </DropdownMenuRadioItem>
                      </Link>
                      <Link
                        href={getUpdatedUrl('/questions', searchParams, {
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
            </div>
            <div className="w-full overflow-y-scroll h-[500px] m-auto">
              <div className="space-y-4 w-full">
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
            </div>
          </div>
          <Pagination dataLength={response?.data?.length || 0} />
        </div>
      </div>
    </>
  );
}
