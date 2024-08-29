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
import {
  ArrowLeft,
  ChevronDownIcon,
  MoreVerticalIcon,
  Reply,
} from 'lucide-react';
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
    <Card
      key="1"
      className="flex w-full flex-col justify-center gap-2 border-none bg-neutral-100 shadow-none outline-none dark:bg-neutral-950"
    >
      <CardHeader className="px-6 py-2">
        {data.parentComment && (
          <Link
            href={getUpdatedUrl(
              `/courses/${content.courseId}/${content.possiblePath}`,
              modifiedSearchParams,
              {},
            )}
            scroll={false}
          >
            <Button className="flex gap-2">
              <ArrowLeft className="size-4" /> Go back
            </Button>
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
          <div className="flex items-center gap-2">
            {data.parentComment && (
              <>
                <div className="text-primary/80">
                  {data.parentComment.upvotes}{' '}
                  {data.parentComment.upvotes === 1 ? 'Like' : 'Likes'}
                </div>
                <div className="text-primary/80">•</div>
              </>
            )}

            <h2
              className={`text-xl font-bold tracking-tighter text-primary md:text-2xl`}
            >
              {!data.parentComment
                ? `${content.commentCount} ${content.commentCount === 1 ? 'Comment' : 'Comments'}`
                : `${data.parentComment.repliesCount} ${data.parentComment.repliesCount === 1 ? 'Reply' : 'Replies'}`}
            </h2>
            {/*   <div className="text-gray-500 dark:text-gray-400">•</div>
            <div className="text-gray-500 dark:text-gray-400">Share</div> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="gap-2 rounded-lg">
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
        />
        <div className="mt-2 flex gap-2">
          <DropdownMenu key="1" modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'}>
                {searchParams.tabtype || TabType.mu}
                <ChevronDownIcon className="size-4" />
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
              <Button variant="outline">
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
        <div className="no-scrollbar grid max-h-[400px] cursor-pointer gap-6 overflow-y-auto">
          {data.comments.map((c) => (
            <div
              className="flex w-full items-start gap-4 rounded-lg p-4 text-sm dark:bg-blue-950/20"
              key={c.id}
            >
              <div className="flex w-full items-start gap-4">
                <Avatar className="size-8">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>{`${(c as ExtendedComment).user?.name?.substring(0, 1)}`}</AvatarFallback>
                </Avatar>
                <div className="grid w-full gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {(c as ExtendedComment).user?.name ?? ''}
                    </h3>
                    <span className="text-sm text-primary/80">
                      {dayjs(c.createdAt).fromNow()}
                    </span>
                    {c.isPinned && (
                      <span className="text-sm text-primary/80">Pinned</span>
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
                        className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
                      >
                        <Reply className="size-4" />
                        {c.repliesCount}
                        Reply
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Pagination dataLength={data.comments.length} />
      </CardFooter>
    </Card>
  );
};

export default Comments;
