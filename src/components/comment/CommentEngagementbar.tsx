'use client';
import { ExtendedComment } from '@/actions/comment/types';
import ReplyButton from './CommentReplyButton';
import CommentVoteForm from './CommentVoteForm';
import { useState } from 'react';
import CommentInputForm from './CommentInputForm';
import Link from 'next/link';
import { getUpdatedUrl } from '@/lib/utils';
import { CommentsProps } from './Comments';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { lastCommentTypeAtom, lastTabTypeAtom } from '@/store/atoms';
import { CommentType } from '@prisma/client';

interface CommentEngagementBarProps {
  commentsProps: CommentsProps;
  comment: any;
}

const CommentEngagementBar = ({
  commentsProps,
  comment,
}: CommentEngagementBarProps) => {
  const [replyInputBox, setReplyInputBox] = useState(false);
  const lastTabType = useRecoilValue(lastTabTypeAtom);
  const [lastCommentType, setLastCommentType] =
    useRecoilState(lastCommentTypeAtom);
  const { content, searchParams } = commentsProps;
  const newSearchParams = { ...searchParams };
  delete newSearchParams.type;
  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;
  // console.log(newSearchParams, modifiedSearchParams);

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
            setReplyInputBox={setReplyInputBox}
            replyInputBox={replyInputBox}
          />
        )}
      </div>
      {replyInputBox && (
        <CommentInputForm
          contentId={content.id}
          parentId={comment.id}
          tabType={searchParams.tabtype}
          replyInputBox={replyInputBox}
          setReplyInputBox={setReplyInputBox}
        />
      )}
      {!comment.parentId && comment.repliesCount !== 0 && (
        <Link
          onClick={() =>
            setLastCommentType(searchParams.type || CommentType.DEFAULT)
          }
          href={
            !searchParams.parentId
              ? getUpdatedUrl(
                  `/courses/${content.courseId}/${content.possiblePath}`,
                  searchParams.type === CommentType.INTRO
                    ? newSearchParams
                    : searchParams,
                  {
                    parentId: comment.id,
                  },
                )
              : getUpdatedUrl(
                  `/courses/${content.courseId}/${content.possiblePath}`,
                  {
                    ...modifiedSearchParams,
                    type: lastCommentType || CommentType.DEFAULT,
                  },
                  lastTabType ? { tabtype: lastTabType } : {},
                )
          }
          scroll={false}
          className="flex items-center gap-1 pb-1 text-blue-600/90"
        >
          {!searchParams.parentId ? (
            <ChevronDownIcon className="mt-1 h-4 w-4" />
          ) : (
            <ChevronUpIcon className="mt-1 h-4 w-4" />
          )}
          <span>{comment.repliesCount}</span>
          <span>{comment.repliesCount === 1 ? `reply` : 'replies'}</span>
        </Link>
      )}
    </div>
  );
};

export default CommentEngagementBar;
