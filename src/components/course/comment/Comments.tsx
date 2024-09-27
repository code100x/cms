'use client';
import React from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { TabType, QueryParams, ROLES } from '@/actions/types';
import { getUpdatedUrl } from '@/lib/utils';
import CommentInputForm from './CommentInputForm';
import { ExtendedComment } from '@/actions/comment/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CommentVoteForm from './CommentVoteForm';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronDown,
  ChevronDownIcon,
  MoreVerticalIcon,
} from 'lucide-react';
import TimeCodeComment from './TimeCodeComment';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { Comment, CommentType } from '@prisma/client';
import CommentDeleteForm from './CommentDeleteForm';
import CommentPinForm from './CommentPinForm';
import CommentApproveForm from './CommentApproveForm';
import { useRecoilValue } from 'recoil';
import { auth } from '@/store/atoms/auth';
dayjs.extend(relativeTime);

const Comments = ({
  content,
  searchParams,
  data,
}: {
  content: {
    id: number;
    courseId: number;
    commentCount: number;
    possiblePath: string;
  };
  searchParams: QueryParams;
  data: { comments: Comment[]; parentComment: null | Comment };
}) => {
  // const session = await getServerSession(authOptions);

  const user = useRecoilValue(auth);

  if (!user) {
    return null;
  }

  if (!content.id) return null;
  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;
  return (
    <div className="mt-5 flex w-full flex-col gap-8">
      <div className="flex flex-col gap-4">
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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2
            className={`text-xl font-bold tracking-tighter text-primary md:text-2xl`}
          >
            {!data.parentComment
              ? `${content.commentCount} ${content.commentCount === 1 ? 'Comment' : 'Comments'}`
              : `${data.parentComment.repliesCount} ${data.parentComment.repliesCount === 1 ? 'Reply' : 'Replies'}`}
          </h2>
          <div className="flex gap-2">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button>
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
                <Button>
                  <span>
                    {searchParams.type === CommentType.INTRO
                      ? CommentType.INTRO
                      : 'All comments'}
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
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 ${data.parentComment ? 'rounded-r-lg border-l-2 border-blue-500 bg-primary/5 p-4' : ''}`}
      >
        {data.parentComment && (
          <div className="flex flex-col gap-2">
            <h3 className="text-wrap text-xl md:text-2xl">
              <TimeCodeComment
                possiblePath={content.possiblePath}
                searchParams={searchParams}
                comment={data.parentComment.content}
                contentId={content.courseId}
              />
            </h3>
            <div className="flex gap-2 text-sm">
              <span
                className={`${data.parentComment.upvotes > 0 ? 'text-green-500' : 'text-neutral-500'}`}
              >
                {data.parentComment.upvotes}{' '}
                {data.parentComment.upvotes === 1 ? 'Upvote' : 'Upvotes'}
              </span>
              <span
                className={`${data.parentComment.downvotes > 0 ? 'text-red-500' : 'text-neutral-500'}`}
              >
                {data.parentComment.downvotes}{' '}
                {data.parentComment.downvotes === 1 ? 'Downvote' : 'Downvotes'}
              </span>
            </div>
          </div>
        )}
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
        />
      </div>
      <div className="flex flex-col gap-4 break-all">
        <div className="grid grid-cols-1 gap-6">
          {data.comments.map((c) => (
            <div className="flex w-full items-start gap-4" key={c.id}>
              <div className="flex w-full items-start gap-4">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-gradient-to-b from-blue-400 to-blue-700">
                    {`${(c as ExtendedComment).user?.name?.substring(0, 1)}`}
                  </AvatarFallback>
                </Avatar>
                <div className="grid w-full gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {(c as ExtendedComment).user?.name ?? ''}
                      </h3>
                      <span className="font-medium tracking-tight text-neutral-500">
                        {dayjs(c.createdAt).fromNow()}
                      </span>
                      {c.isPinned && (
                        <span className="text-sm text-primary/80">Pinned</span>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreVerticalIcon className="size-6" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {(user.id.toString() ===
                          (c as ExtendedComment).userId.toString() ||
                          user.role === ROLES.ADMIN) && (
                          <DropdownMenuItem>
                            <CommentDeleteForm commentId={c.id} />
                          </DropdownMenuItem>
                        )}
                        {user.role === ROLES.ADMIN && (
                          <DropdownMenuItem>
                            <CommentPinForm
                              commentId={c.id}
                              contentId={c.contentId}
                            />
                          </DropdownMenuItem>
                        )}
                        {user.role === ROLES.ADMIN && (
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

                  <TimeCodeComment
                    possiblePath={content.possiblePath}
                    searchParams={searchParams}
                    comment={c.content}
                    contentId={content.courseId}
                  />

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
                        className="flex items-center gap-1 rounded-full px-2 py-1 text-blue-500 transition-all duration-300 hover:bg-[#3b82f650]"
                      >
                        <ChevronDown size={20} />
                        {`${c.repliesCount} ${c.repliesCount === 1 ? `reply` : 'replies'}`}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>{/* <Pagination dataLength={data.comments.length} /> */}</div>
    </div>
  );
};

export default Comments;
