import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ExtendedComment } from '@/actions/comment/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TimeCodeComment from './TimeCodeComment';
import CopyToClipboard from '../Copy-to-clipbord';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import CommentDeleteForm from './CommentDeleteForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import CommentPinForm from './CommentPinForm';
import CommentApproveForm from './CommentApproveForm';
import CommentEngagementBar from './CommentEngagementbar';
import { ROLES } from '@/actions/types';
import { CommentsProps } from './Comments';
import { MoreVerticalIcon } from 'lucide-react';
dayjs.extend(relativeTime);

interface CommentProps {
  comment: any;
  commentsProps: CommentsProps;
}

const Comment = async ({ comment, commentsProps }: CommentProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  const { content, searchParams } = commentsProps;
  // console.log(searchParams.tabtype);

  return (
    <div
      className={`flex w-full items-start gap-4 pr-4 text-sm ${comment.parentId ? 'py-2 pl-16' : 'px-4 py-2'}`}
      key={comment.id}
    >
      <div className="flex w-full items-start gap-4">
        <Avatar
          className={` ${comment.parentId ? 'h-8 w-8' : 'h-10 w-10'} border`}
        >
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>{`${(comment as ExtendedComment).user?.name?.substring(0, 2)}`}</AvatarFallback>
        </Avatar>
        <div className="grid w-full gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-semibold">
                @{(comment as ExtendedComment).user?.name ?? ''}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {dayjs(comment.createdAt).fromNow()}
              </div>
              {comment.isPinned && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Pinned
                </div>
              )}
            </div>

            <DropdownMenu key="2">
              <DropdownMenuTrigger asChild>
                <button type="button">
                  <MoreVerticalIcon className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <CopyToClipboard
                    textToCopy={`${comment.contentId};${comment.id.toString()}`}
                  />
                </DropdownMenuItem>
                {(session.user.id.toString() ===
                  (comment as ExtendedComment).userId.toString() ||
                  session.user.role === ROLES.ADMIN) && (
                  <DropdownMenuItem>
                    <CommentDeleteForm commentId={comment.id} />
                  </DropdownMenuItem>
                )}
                {session.user.role === ROLES.ADMIN && (
                  <DropdownMenuItem>
                    <CommentPinForm
                      commentId={comment.id}
                      contentId={comment.contentId}
                    />
                  </DropdownMenuItem>
                )}
                {session.user.role === ROLES.ADMIN && (
                  <DropdownMenuItem>
                    <CommentApproveForm
                      commentId={comment.id}
                      contentId={comment.contentId}
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
              comment={comment.content}
              contentId={content.courseId}
            />
          </div>

          <CommentEngagementBar
            commentsProps={{ content, searchParams }}
            comment={comment}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
