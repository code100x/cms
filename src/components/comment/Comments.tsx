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
// import Pagination from '../Pagination';
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

  if (!content.id) return null;
  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;
  return (
    <Card key="1" className="flex w-full flex-col justify-center border-none">
      <CardHeader className="px-3 py-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            {data.parentComment && (
              <div className="flex items-center text-xl font-bold">
                <TimeCodeComment
                  possiblePath={content.possiblePath}
                  searchParams={searchParams}
                  comment={data.parentComment.content}
                  contentId={content.courseId}
                />
              </div>
            )}
          </div>

          {/* Container for flex items and dropdowns */}
          <div className="mb-3 mt-3 flex items-center justify-between">
            {/* Likes and Replies Section */}
            <div className="flex items-center gap-1 text-sm">
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
                  <Button className="flex items-center gap-2 dark:text-white">
                    <ArrowLeftIcon /> Go back
                  </Button>
                </Link>
              )}

              {data.parentComment && (
                <>
                  <div className="ml-2 text-gray-500 dark:text-gray-400">
                    {data.parentComment.upvotes} Likes
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">•</div>
                </>
              )}

              <div
                className={`text-gray-500 dark:text-gray-400 ${!data.parentComment ? 'text-xl' : 'text-md'}`}
              >
                {!data.parentComment
                  ? `Comments (${content.commentCount})`
                  : `Replies (${data.parentComment.repliesCount})`}
              </div>
            </div>

            {/* Dropdown Menus Section */}
            <div className="flex flex-col gap-4 md:flex-row">
              {' '}
              {/* Added gap for spacing between dropdowns */}
              <DropdownMenu key="1" modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="border-#020817 text-md w-[160px] justify-between border text-gray-400"
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
                      <DropdownMenuItem>Most Downvoted</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="border-#020817 text-md w-[160px] justify-between border text-gray-400"
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
                      <DropdownMenuItem>All Comments</DropdownMenuItem>
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
                      <DropdownMenuItem>Intro Comments</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="rounded-md px-3">
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
        />

        <div className="grid max-h-[400px] gap-6 overflow-y-auto">
          {data.comments.map((c) => (
            <div
              className={`flex w-full items-start gap-4 rounded-2xl p-4 text-sm ${
                c.repliesCount > 0
                  ? 'bg-slate-100 dark:bg-gray-900'
                  : 'bg-white dark:bg-transparent'
              }`}
              key={c.id}
            >
              <div className="flex w-full items-start gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>{`${(c as ExtendedComment).user?.name?.substring(0, 2)}`}</AvatarFallback>
                </Avatar>
                <div className="grid w-full gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="text-lg dark:text-gray-400">
                      {(c as ExtendedComment).user?.name ?? ''}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
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

                  <div className="flex items-center gap-3">
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
                        className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
                      >
                        {/* <ReplyIcon className="h-4 w-4" /> */}
                        <span
                          className={`${
                            c.repliesCount > 0 ? 'text-blue-500' : ''
                          }`}
                        >
                          {c.repliesCount}
                        </span>
                        <span
                          className={`${
                            c.repliesCount > 0 ? 'text-blue-500' : ''
                          }`}
                        >
                          Reply
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-2">
        {/* <Pagination dataLength={data.comments.length} /> */}
      </CardFooter>
    </Card>
  );
};

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
