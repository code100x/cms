'use client';

import { contentVoteHandlerAction } from '@/actions/contentVote';
import { useAction } from '@/hooks/useAction';
import { VoteType } from '@prisma/client';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {
  upvotes: number;
  downvotes: number;
  contentId: number;
  upVoted: boolean;
  downVoted: boolean;
};

export default function ContentVoteForm({
  upvotes,
  downvotes,
  contentId,
  downVoted,
  upVoted,
}: Props) {
  const currentPath = usePathname();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [alreadyDisliked, setAlreadyDisliked] = useState(false);

  const { execute } = useAction(contentVoteHandlerAction, {
    onSuccess: () => {},
    onError: () => {},
  });

  useEffect(() => {
    setLikes(upvotes);
    setDislikes(downvotes);
    setAlreadyLiked(upVoted);
    setAlreadyDisliked(downVoted);
  }, []);

  const handleUpvote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await execute({
      contentId,
      voteType: VoteType.UPVOTE,
      currentPath,
    });
    setLikes((prev) => (alreadyLiked ? prev - 1 : prev + 1));
    if (alreadyDisliked) {
      setDislikes((prev) => prev - 1);
    }
    setAlreadyLiked((prev) => !prev);
  };
  const handleDownVote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await execute({
      contentId,
      voteType: VoteType.DOWNVOTE,
      currentPath,
    });
    setDislikes((prev) => (alreadyDisliked ? prev - 1 : prev + 1));
    if (alreadyLiked) {
      setLikes((prev) => prev - 1);
    }
    setAlreadyDisliked((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={handleUpvote}>
        <button
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          type="submit"
        >
          <ThumbsUpIcon
            className="w-4 h-4"
            type="submit"
            fill={upVoted ? 'currentColor' : 'none'}
          />

          <span>{likes}</span>
        </button>
      </form>
      <form onSubmit={handleDownVote}>
        <button
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          type="submit"
        >
          <ThumbsDownIcon
            className="w-4 h-4"
            fill={downVoted ? 'currentColor' : 'none'}
          />

          <span>{dislikes}</span>
        </button>
      </form>
    </>
  );
}
