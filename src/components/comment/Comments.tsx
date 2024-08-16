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
import CommentVoteForm from './CommentVoteForm';
import Pagination from '../Pagination';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronDownIcon, MoreVerticalIcon } from 'lucide-react';
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
dayjs.extend(relativeTime);
const Comments = async ({
  content,
  searchParams,
}: {
  content: {
    id: number;
    courseId: number;
    commentCount: number;
    possiblePath: string;
  };
  searchParams: QueryParams;
}) => {
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

  function getInitials(name: string): string {
    const names = name.split(' ').filter(Boolean);

    // Harkirat => Ha
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }

    // Harkira Singh => HS
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }

    return '';
  }

  if (!content.id) return null;
  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;
  return (
    <Card key="1" className="flex w-full flex-col justify-center border-none">
      <CardHeader className="p-2 md:p-6">
        {data.parentComment && (
          <h1 className="mb-2 text-xl font-bold">
            <TimeCodeComment
              possiblePath={content.possiblePath}
              searchParams={searchParams}
              comment={data.parentComment.content}
              contentId={content.courseId}
            />
          </h1>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col md:flex-row">
            {data.parentComment && (
              <Link
                className="p-1"
                href={getUpdatedUrl(
                  `/courses/${content.courseId}/${content.possiblePath}`,
                  modifiedSearchParams,
                  {},
                )}
                scroll={false}
              >
                <Button className="flex gap-2">
                  <ArrowLeftIcon /> Go back
                </Button>
              </Link>
            )}
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-0.5">
                  {/* <ChevronUpIcon className="w-4 h-4" />
                  <ChevronDownIcon className="w-4 h-4" /> */}
                </div>
                {data.parentComment && (
                  <>
                    <div className="text-gray-500 dark:text-gray-400">
                      {data.parentComment.upvotes}{' '}
                      {data.parentComment.upvotes === 1 ? 'Like' : 'Likes'}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">•</div>
                  </>
                )}

                <div
                  className={`text-blue-500 dark:text-blue-400 ${!data.parentComment ? 'text-lg' : ''}`}
                >
                  {!data.parentComment
                    ? `Comments (${content.commentCount})`
                    : `${data.parentComment.repliesCount} ${data.parentComment.repliesCount === 1 ? 'Reply' : 'Replies'}`}
                </div>
                {/*   <div className="text-gray-500 dark:text-gray-400">•</div>
                <div className="text-gray-500 dark:text-gray-400">Share</div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <DropdownMenu key="1" modal={false}>
              <DropdownMenuTrigger asChild className="border border-border">
                <Button
                  className="w-[200px] justify-between text-left font-normal text-slate-400 dark:text-slate-500"
                  variant="ghost"
                >
                  <span>{searchParams.tabtype || TabType.mu}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup className="text-slate-400 dark:text-slate-500">
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
                    <DropdownMenuItem>Most Downvoted</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild className="border border-border">
                <Button
                  className="w-[200px] justify-between text-left font-normal text-slate-400 dark:text-slate-500"
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
                <DropdownMenuGroup className="text-slate-400 dark:text-slate-500">
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
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-2 md:p-6">
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
        />
        <div className="grid max-h-[500px] gap-6 overflow-y-auto">
          {data.comments.map((c) => (
            <div
              className={`flex w-full items-start gap-4 rounded-2xl p-4 text-sm ${c.repliesCount && 'bg-slate-600 bg-opacity-10'}`}
              key={c.id}
            >
              <div className="flex w-full items-start gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>{`${getInitials((c as ExtendedComment).user?.name ?? '')}`}</AvatarFallback>
                </Avatar>
                <div className="grid w-full gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">
                      {(c as ExtendedComment).user?.name ?? ''}
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

                  <div className="flex items-center gap-4">
                    <CommentVoteForm
                      upVotes={c.upvotes}
                      downVotes={c.downvotes}
                      commentId={c.id}
                      voteType={
                        (c as ExtendedComment)?.votes?.[0]?.voteType ?? null
                      }
                    />
                    {!data.parentComment && (
                      <Link
                        href={getUpdatedUrl(
                          `/courses/${content.courseId}/${content.possiblePath}`,
                          searchParams,
                          {
                            parentId: c.id,
                          },
                        )}
                        scroll={false}
                        className={`flex items-center gap-1 ${c.repliesCount > 0 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} `}
                      >
                        {/* <ReplyIcon className="h-4 w-4" /> */}
                        <span>{c.repliesCount}</span>
                        <span>{c.repliesCount > 1 ? 'Replies' : 'Reply'}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex justify-center">
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

// function ReplyIcon(props: any) {
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
//       <polyline points="9 17 4 12 9 7" />
//       <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
//     </svg>
//   );
// }

export default Comments;
