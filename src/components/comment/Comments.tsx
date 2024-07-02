import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { TabType, QueryParams, ROLES } from '@/actions/types';
import {
  constructCommentPrismaQuery,
  getUpdatedUrl,
  paginationData,
} from '@/lib/utils';
import CommentInputForm from './CommentInputForm';
import { getComments } from '../../actions/comment/index';
import { ExtendedComment } from '@/actions/comment/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Pagination from '../Pagination';
import Link from 'next/link';
import { ChevronDownIcon, MoreVerticalIcon } from 'lucide-react';
import TimeCodeComment from './TimeCodeComment';
import CopyToClipboard from '../Copy-to-clipbord';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CommentType } from '@prisma/client';
import CommentDeleteForm from './CommentDeleteForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import CommentPinForm from './CommentPinForm';
import CommentApproveForm from './CommentApproveForm';
import CommentEngagementBar from './CommentEngagementbar';
import ParentComment from './parentComment';
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

  if (!content.id) return null;
  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;
  return (
    <Card key="1" className="flex w-full flex-col justify-center border-none">
      <CardHeader className="p-6">
        {/* {data.parentComment && (
          <Link
            className="p-1"
            href={getUpdatedUrl(
              `/courses/${content.courseId}/${content.possiblePath}`,
              modifiedSearchParams,
              {},
            )}
            scroll={false}
          >
            <div className="flex gap-2">
              <ArrowLeftIcon /> Go back
            </div>
          </Link>
        )}
        <div className="grid gap-2">
          {data.parentComment && (
            <h1 className="text-xl font-bold">
              <TimeCodeComment
                possiblePath={content.possiblePath}
                searchParams={searchParams}
                comment={data.parentComment.content}
                contentId={content.courseId}
              />
            </h1>
          )}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-0.5">
              {/* <ChevronUpIcon className="w-4 h-4" />
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            {data.parentComment && (
              <>
                <div className="text-gray-500 dark:text-gray-400">
                  {data.parentComment.upvotes} Likes
                </div>
                <div className="text-gray-500 dark:text-gray-400">•</div>
              </>
            )}

            <div
              className={`text-gray-500 dark:text-gray-400 ${!data.parentComment ? 'text-xl' : ''}`}
            >
              {!data.parentComment
                ? `${content.commentCount} comments`
                : `${data.parentComment.repliesCount} replies`}
            </div> */}
        {/*   <div className="text-gray-500 dark:text-gray-400">•</div>
            <div className="text-gray-500 dark:text-gray-400">Share</div> 
          </div>
        </div>*/}
      </CardHeader>
      <CardContent className="dark:border-primary-darker rounded-md border p-0 lg:p-8">
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
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
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-[200px] justify-between text-left font-normal"
                variant="ghost"
              >
                <span>
                  {searchParams.type === CommentType.INTRO
                    ? CommentType.INTRO
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
        </div>
        {data.parentComment && (
          <ParentComment
            comment={data.parentComment}
            commentsProps={{ content, searchParams }}
          />
        )}
        <div className="grid max-h-[400px] gap-6 overflow-y-auto">
          {data.comments.map((c) => (
            <div
              className={`flex w-full items-start gap-4 rounded-md px-4 py-2 text-sm`}
              key={c.id}
            >
              <div
                className={`flex w-full items-start gap-4 ${data.parentComment && 'pl-5'}`}
              >
                <Avatar className="h-8 w-8 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>{`${(c as ExtendedComment).user?.name?.substring(0, 2)}`}</AvatarFallback>
                </Avatar>
                <div className="grid w-full gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">
                      @{(c as ExtendedComment).user?.name ?? ''}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {dayjs(c.createdAt).fromNow()}
                    </div>
                    {c.isPinned && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Pinned
                      </div>
                    )}

                    <DropdownMenu key="2">
                      <DropdownMenuTrigger asChild>
                        <button>
                          <MoreVerticalIcon className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <CopyToClipboard
                            textToCopy={`${c.contentId};${c.id.toString()}`}
                          />
                        </DropdownMenuItem>
                        {(session.user.id.toString() ===
                          (c as ExtendedComment).userId.toString() ||
                          session.user.role === ROLES.ADMIN) && (
                          <DropdownMenuItem>
                            <CommentDeleteForm commentId={c.id} />
                          </DropdownMenuItem>
                        )}
                        {session.user.role === ROLES.ADMIN && (
                          <DropdownMenuItem>
                            <CommentPinForm
                              commentId={c.id}
                              contentId={c.contentId}
                            />
                          </DropdownMenuItem>
                        )}
                        {session.user.role === ROLES.ADMIN && (
                          <DropdownMenuItem>
                            <CommentApproveForm
                              commentId={c.id}
                              contentId={c.contentId}
                            />
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <TimeCodeComment
                      possiblePath={content.possiblePath}
                      searchParams={searchParams}
                      comment={c.content}
                      contentId={content.courseId}
                    />
                  </div>

                  <CommentEngagementBar
                    commentsProps={{ content, searchParams }}
                    comment={c}
                  />
                </div>
              </div>
            </div>
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
