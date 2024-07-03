'use client';
import { ExtendedComment } from '@/actions/comment/types';
import ReplyButton from './CommentReplyForm';
import CommentVoteForm from './CommentVoteForm';
import { useState } from 'react';
import CommentInputForm from './CommentInputForm';
import Link from 'next/link';
import { getUpdatedUrl } from '@/lib/utils';
import { CommentsProps } from './Comments';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface CommentEngagementBarProps {
  commentsProps: CommentsProps;
  comment: any;
}

const CommentEngagementBar = ({
  commentsProps,
  comment,
}: CommentEngagementBarProps) => {
  const [replyInputBox, setReplyInputBox] = useState(false);
  const { content, searchParams } = commentsProps;
  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-4">
        <CommentVoteForm
          upVotes={comment.upvotes}
          downVotes={comment.downvotes}
          commentId={comment.id}
          voteType={(comment as ExtendedComment)?.votes?.[0]?.voteType ?? null}
        />
        {!comment.parentId && (
          <ReplyButton
            repliesCount={comment.repliesCount}
            setReplyInputBox={setReplyInputBox}
            replyInputBox={replyInputBox}
          />
        )}
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
          href={
            !searchParams.parentId
              ? getUpdatedUrl(
                  `/courses/${content.courseId}/${content.possiblePath}`,
                  searchParams,
                  {
                    parentId: comment.id,
                  },
                )
              : getUpdatedUrl(
                  `/courses/${content.courseId}/${content.possiblePath}`,
                  modifiedSearchParams,
                  {},
                )
          }
          scroll={false}
          className="flex items-center gap-1 pb-1 text-blue-600/90"
        >
          {!searchParams.parentId ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronUpIcon className="h-4 w-4" />
          )}
          <span>{comment.repliesCount}</span>
          <span>replies</span>
        </Link>
      )}
    </div>
  );
};

export default CommentEngagementBar;
