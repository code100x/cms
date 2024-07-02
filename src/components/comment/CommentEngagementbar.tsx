'use client';
import { ExtendedComment } from '@/actions/comment/types';
import ReplyButton from './CommentReplyForm';
import CommentVoteForm from './CommentVoteForm';
import { Comment } from '@prisma/client';
import { useState } from 'react';
import CommentInputForm from './CommentInputForm';
import Link from 'next/link';
import { getUpdatedUrl } from '@/lib/utils';
import { CommentsProps } from './Comments';
import { ChevronDownIcon } from 'lucide-react';

interface CommentEngagementBarProps {
  commentsProps: CommentsProps;
  comment: Comment;
}

const CommentEngagementBar = ({
  commentsProps,
  comment,
}: CommentEngagementBarProps) => {
  const [replyInputBox, setReplyInputBox] = useState(false);
  const { content, searchParams } = commentsProps;
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <CommentVoteForm
          upVotes={comment.upvotes}
          downVotes={comment.downvotes}
          commentId={comment.id}
          voteType={(comment as ExtendedComment)?.votes?.[0]?.voteType ?? null}
        />
        <ReplyButton
          repliesCount={comment.repliesCount}
          setReplyInputBox={setReplyInputBox}
          replyInputBox={replyInputBox}
        />
      </div>
      {replyInputBox && (
        <CommentInputForm
          contentId={content.id}
          parentId={comment.id}
          replyInputBox={replyInputBox}
          setReplyInputBox={setReplyInputBox}
        />
      )}
      {!comment.parentId && comment.repliesCount !== 0 && (
        <Link
          href={getUpdatedUrl(
            `/courses/${content.courseId}/${content.possiblePath}`,
            searchParams,
            {
              parentId: comment.id,
            },
          )}
          scroll={false}
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
        >
          <ChevronDownIcon className="h-4 w-4" />
          <span>{comment.repliesCount}</span>
          <span>replies</span>
        </Link>
      )}
    </div>
  );
};

export default CommentEngagementBar;
