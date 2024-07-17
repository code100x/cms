import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { TabType, QueryParams } from '@/actions/types';
import {
  constructCommentPrismaQuery,
  getUpdatedUrl,
  paginationData,
} from '@/lib/utils';
import CommentInputForm from './CommentInputForm';
import { getComments } from '../../actions/comment/index';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Pagination from '../Pagination';
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CommentType } from '@prisma/client';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Comment from './Comment';
dayjs.extend(relativeTime);

export interface CommentsProps {
  content: {
    id: number;
    courseId: number;
    commentCount: number;
    possiblePath: string;
  };
  searchParams: QueryParams;
}

const Comments = async ({ content, searchParams }: CommentsProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  const paginationInfo = paginationData(searchParams);
  const q = constructCommentPrismaQuery(
    searchParams,
    paginationInfo,
    content.id,
    session.user.id,
  );
  const data = await getComments(q, searchParams.parentId);
  //console.log(searchParams.type);

  if (!content.id) return null;

  return (
    <Card key="1" className="flex w-full flex-col justify-center border-none">
      <CardHeader className="p-6">
        <div className={`text-xl text-gray-500 dark:text-gray-400`}>
          {`${content.commentCount} comments`}
        </div>
      </CardHeader>

      <CardContent className="p-0 lg:p-8">
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
          className={data?.parentComment?.id ? 'hidden' : ''}
        />
        <div className="mb-5 mt-5 flex">
          <DropdownMenu key="1" modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-[200px] justify-between text-left font-normal"
                variant="ghost"
              >
                <span>{searchParams.tabtype || TabType.mu}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <Link
                  scroll={false}
                  href={getUpdatedUrl(
                    `/courses/${content.courseId}/${content.possiblePath}`,
                    searchParams,
                    {
                      tabtype: TabType.mu,
                    },
                  )}
                >
                  <DropdownMenuItem>Most Upvoted</DropdownMenuItem>
                </Link>
                <Link
                  scroll={false}
                  href={getUpdatedUrl(
                    `/courses/${content.courseId}/${content.possiblePath}`,
                    searchParams,
                    {
                      tabtype: TabType.mr,
                    },
                  )}
                >
                  <DropdownMenuItem>Most Recent</DropdownMenuItem>{' '}
                </Link>
                <Link
                  scroll={false}
                  href={getUpdatedUrl(
                    `/courses/${content.courseId}/${content.possiblePath}`,
                    searchParams,
                    {
                      tabtype: TabType.md,
                    },
                  )}
                >
                  <DropdownMenuItem>Most downvoted</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {!searchParams.parentId && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-[200px] justify-between text-left font-normal"
                  variant="ghost"
                >
                  <span>
                    {searchParams.type === CommentType.INTRO
                      ? 'Intro comments'
                      : 'All comments' || 'All comments'}
                  </span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <Link
                    scroll={false}
                    href={getUpdatedUrl(
                      `/courses/${content.courseId}/${content.possiblePath}`,
                      searchParams,
                      {
                        type: CommentType.DEFAULT,
                      },
                    )}
                  >
                    <DropdownMenuItem>All comments</DropdownMenuItem>
                  </Link>

                  <Link
                    scroll={false}
                    href={getUpdatedUrl(
                      `/courses/${content.courseId}/${content.possiblePath}`,
                      searchParams,
                      {
                        type: CommentType.INTRO,
                      },
                    )}
                  >
                    <DropdownMenuItem>Intro comments</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {data.parentComment && (
          <Comment
            comment={data.parentComment}
            commentsProps={{
              content,
              searchParams,
            }}
          />
        )}
        <div className="grid max-h-[400px] overflow-y-auto">
          {data.comments.map((c) => (
            <Comment
              comment={c}
              commentsProps={{ content, searchParams }}
              key={c.id}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-2">
        <Pagination dataLength={data.comments.length} />
      </CardFooter>
    </Card>
  );
};

// function ChevronDownIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m6 9 6 6 6-6" />
//     </svg>
//   );
// }

// function ChevronUpIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m18 15-6-6-6 6" />
//     </svg>
//   );
// }

/* function ReplyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
} */

export default Comments;
