'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { TabType, QueryParams, ROLES } from '@/actions/types';
import { getUpdatedUrl } from '@/lib/utils';
import CommentInputForm from './CommentInputForm';
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
import CommentPinForm from './CommentPinForm';
import CommentApproveForm from './CommentApproveForm';

dayjs.extend(relativeTime);

const CommentsClient = ({
  content,
  searchParams,
  session,
  data,
}: {
  content: {
    id: number;
    courseId: number;
    commentCount: number;
    possiblePath: string;
  };
  searchParams: QueryParams;
  session: any;
  data: any;
}) => {
  console.log(content);
  console.log(data);
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<
    number | null
  >(null);

  const handleReplyClick = (commentId: number) => {
    setActiveReplyCommentId(
      commentId === activeReplyCommentId ? null : commentId,
    );
  };

  const renderComments = (comments: any, level = 0) => {
    return comments.map((comment: any) => (
      <div
        key={comment.id}
        className={`text-sm flex items-start gap-4 w-full border p-4 rounded-md ${level > 0 ? 'ml-8' : ''}`}
      >
        <Avatar className="w-10 h-10 border">
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>{comment.user?.name?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1.5 w-full">
          <div className="flex items-center gap-2">
            <div className="font-semibold">@{comment.user?.name ?? ''}</div>
            <div className="text-gray-500 text-xs dark:text-gray-400">
              {dayjs(comment.createdAt).fromNow()}
            </div>
            {comment.isPinned && (
              <div className="text-gray-500 text-xs dark:text-gray-400">
                Pinned
              </div>
            )}
            <DropdownMenu key={`dropdown-comment-${comment.id}`}>
              <DropdownMenuTrigger asChild>
                <Button className="p-1" variant="ghost">
                  <MoreVerticalIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <CopyToClipboard textToCopy={comment.contentId} />
                  {comment.userId === session.user.id && (
                    <DropdownMenuItem key={`delete-comment-${comment.id}`}>
                      <CommentDeleteForm commentId={comment.id} />
                    </DropdownMenuItem>
                  )}
                  {session.user.role === ROLES.ADMIN && (
                    <>
                      <DropdownMenuItem key={`pin-comment-${comment.id}`}>
                        <CommentPinForm
                          commentId={comment.id}
                          contentId={comment.contentId}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem key={`approve-comment-${comment.id}`}>
                        <CommentApproveForm
                          commentId={comment.id}
                          contentId={comment.contentId}
                        />
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full">
            <TimeCodeComment
              possiblePath={content.possiblePath}
              searchParams={searchParams}
              comment={comment.content}
            />
          </div>
          <div className="flex items-center gap-4 w-full">
            <CommentVoteForm
              upVotes={comment.upvotes}
              downVotes={comment.downvotes}
              commentId={comment.id}
              voteType={comment.votes?.[0]?.voteType ?? null}
            />
            <Button
              className="p-1"
              variant="ghost"
              onClick={() => handleReplyClick(comment.id)}
            >
              <ReplyIcon className="w-4 h-4" />
              <span>Reply</span>
              <span className="sr-only">Reply</span>
            </Button>
            {activeReplyCommentId === comment.id && (
              <div className="w-full mt-4">
                <CommentInputForm
                  contentId={content.id}
                  parentId={comment.id}
                />
              </div>
            )}
          </div>
          {comment.children &&
            comment.children.length > 0 &&
            renderComments(comment.children, level + 1)}
        </div>
      </div>
    ));
  };

  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;

  return (
    <Card key="1" className="w-full border-none flex justify-center flex-col">
      <CardHeader className="p-6">
        {data.parentComment && (
          <Link
            className="p-1"
            href={getUpdatedUrl(
              `/courses/${content.possiblePath}`,
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
              />
            </h1>
          )}
          <div className="flex items-center gap-2 text-sm">
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
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 lg:p-8 border dark:border-primary-darker rounded-md">
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
        />
        <div className="mb-5 flex mt-5">
          <DropdownMenu key="dropdown1" modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-[200px] justify-between text-left font-normal"
                variant="ghost"
              >
                <span>{searchParams.tabtype || TabType.mu}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <Link
                  scroll={false}
                  href={getUpdatedUrl(
                    `/courses/${content.possiblePath}`,
                    searchParams,
                    { tabtype: TabType.mu },
                  )}
                >
                  <DropdownMenuItem key="mu">Most Upvoted</DropdownMenuItem>
                </Link>
                <Link
                  scroll={false}
                  href={getUpdatedUrl(
                    `/courses/${content.possiblePath}`,
                    searchParams,
                    { tabtype: TabType.mr },
                  )}
                >
                  <DropdownMenuItem key="mr">Most Recent</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu key="dropdown2" modal={false}>
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
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <Link
                  scroll={false}
                  href={getUpdatedUrl(
                    `/courses/${content.courseId}/${content.possiblePath}`,
                    searchParams,
                    { type: CommentType.DEFAULT },
                  )}
                >
                  <DropdownMenuItem key="default">
                    All comments
                  </DropdownMenuItem>
                </Link>
                <Link
                  scroll={false}
                  href={getUpdatedUrl(
                    `/courses/${content.courseId}/${content.possiblePath}`,
                    searchParams,
                    { type: CommentType.INTRO },
                  )}
                >
                  <DropdownMenuItem key="intro">
                    Intro comments
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid gap-6 max-h-[400px] overflow-y-auto">
          {renderComments(data || [])}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Pagination dataLength={data ? data.length : 0} />
      </CardFooter>
    </Card>
  );
};

export default CommentsClient;

const ReplyIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="9 17 4 12 9 7" />
    <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
  </svg>
);
