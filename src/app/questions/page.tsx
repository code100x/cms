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
import { getPurchases } from '@/utiles/appx';
import { Course } from '@/store/atoms';
import { getFullCourseContent } from '@/db/course';
import findContentById from '@/lib/find-content-by-id';

interface CoursesError {
  type: 'error';
  message: string;
}

interface CoursesSuccess {
  type: 'success';
  courses: Course[];
}

type CoursesResponse = CoursesError | CoursesSuccess;

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

const getCourses = async (): Promise<CoursesResponse> => {
  const session = await getServerSession(authOptions);
  const purchases = await getPurchases(session?.user.email || '');

  return purchases;
};

const getAllVideos = async (): Promise<any> => {
  const res = await getCourses();
  if (res.type === 'error') {
    throw new Error('Ratelimited by appx please try again later');
  }

  const allCoursesId = res.courses.map((course) => course.id);
  const allVideos: any[] = [];

  await Promise.all(
    allCoursesId.map(async (courseId: number) => {
      const fullCourseContent = await getFullCourseContent(courseId);
      const courseContent = findContentById(fullCourseContent, []);

      courseContent?.forEach(async (content: any) => {
        const courseContent = findContentById(fullCourseContent, [content.id]);

        courseContent?.forEach((content: any) => {
          if (content.type === 'video') {
            allVideos.push(content);
          }
        });
      });
    }),
  );

  return allVideos;
};

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams: QueryParams;
}) {
  const allVideos = await getAllVideos();
  const disabled = getDisabledFeature('qa');
  if (disabled) {
    redirect('/');
  }
  const session = await getServerSession(authOptions);
  const sessionId = session?.user?.id;

  const tabType = searchParams.tabtype || TabType.mu;
  const response = await fetchQuestionsByTabType(searchParams, sessionId!);
  console.log(response);

  return (
    <>
      <div className="h-max pb-4 transition-colors duration-500 md:p-8">
        <div className="mb-6 flex items-center justify-between px-8 pt-3">
          <div className="text-3xl text-black transition-colors duration-500 dark:text-white">
            <h1 className="text-black dark:text-white">Questions</h1>
          </div>
          <Link
            className="light:text-black sticky rounded-md bg-black p-3 text-white transition-colors duration-500 dark:bg-white dark:text-black"
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
        <NewPostDialog videos={allVideos} />
        <div className="mx-auto md:mx-[15%] md:p-10">
          <div className="flex flex-col items-center p-4 dark:text-white">
            <div className="flex">
              <Search />
              <div className="px-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="shrink-0" variant="outline">
                      <ArrowUpDownIcon className="mr-2 h-4 w-4" />
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
            <div className="m-auto h-[500px] w-full overflow-y-scroll">
              <div className="w-full space-y-4">
                {response?.data?.map((post) => (
                  <PostCard
                    post={post}
                    sessionUser={session?.user}
                    key={post.id}
                    isAnswer={false}
                    questionId={post.id}
                    enableLink={true}
                    reply={false}
                    videoId={post.videoId}
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
