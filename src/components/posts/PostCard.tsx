'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import React, { useState, useTransition } from 'react';
import VoteForm from './form/form-vote';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import MDEditor from '@uiw/react-md-editor';
import DeleteForm from './form/form-delete';
import Link from 'next/link';
import Tag from './tag';

import {
  Author,
  ExtendedAnswer,
  ExtendedQuestion,
} from '@/actions/question/types';
import { useAction } from '@/hooks/useAction';
import { createAnswer } from '@/actions/answer';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { Answer } from '@prisma/client';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Reply } from 'lucide-react';
import { ROLES } from '@/actions/types';
import { FormPostErrors } from './form/form-errors';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface IProps {
  post: ExtendedQuestion | ExtendedAnswer;
  sessionUser: Author | undefined | null;
  reply?: boolean;
  enableLink?: boolean;
  isAnswer?: boolean;
  questionId: number;
  parentAuthorName?: string | null;
}
const isExtendedQuestion = (
  post: ExtendedQuestion | Answer,
): post is ExtendedQuestion => {
  return (post as ExtendedQuestion).slug !== undefined;
};
const PostCard: React.FC<IProps> = ({
  post,
  sessionUser,
  questionId,
  reply = false,
  enableLink = false,
  isAnswer = true,
  parentAuthorName,
}) => {
  const { theme } = useTheme();
  const [markDownValue, setMarkDownValue] = useState('');
  const [enableReply, setEnableReply] = useState(false);
  const handleMarkdownChange = (newValue?: string) => {
    if (typeof newValue === 'string') {
      setMarkDownValue(newValue);
    }
  };

  const handleEditorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { execute, fieldErrors } = useAction(createAnswer, {
    onSuccess: () => {
      toast.success(`Reply added`);
      if (!fieldErrors?.content) {
        setEnableReply(false);
        setMarkDownValue('');
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    execute({
      content: markDownValue,
      questionId,
      parentId: isAnswer ? post?.id : undefined,
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toString();
  };

  return (
    <div
      className={`flex w-full cursor-pointer flex-col gap-4 p-3 transition-all duration-300 sm:p-5 ${!post.content && !isAnswer
        ? `rounded-xl bg-neutral-50 shadow-lg hover:-translate-y-2 dark:bg-neutral-900`
        : `rounded-r-xl border-l-2 border-blue-500 bg-primary/5`
        } ${isPending && `animate-pulse duration-700`}`}
      onClick={() => {
        startTransition(() => {
          if (isExtendedQuestion(post)) {
            router.push(`/question/${post?.slug}`);
          }
        });
      }}
    >
      <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="mb-2 flex items-center gap-2 sm:mb-0">
          <Avatar>
            <AvatarFallback>
              {post.author.name?.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight">{post.author.name}</span>
            <div className="text-xs tracking-tight text-primary/80 sm:text-sm">
              {post.updatedAt ? (
                <span>Updated {dayjs(post.updatedAt).fromNow()}</span>
              ) : (
                <span>Created {dayjs(post.createdAt).fromNow()}</span>
              )}
            </div>
          </div>
        </div>
        {(sessionUser?.role === ROLES.ADMIN ||
          post?.author?.id === sessionUser?.id) && (
            <DeleteForm
              key={post.id}
              questionId={!isAnswer ? post.id : undefined}
              answerId={isAnswer ? post.id : undefined}
            />
          )}
      </div>

      {parentAuthorName && isAnswer && (
        <div className="text-xs text-primary/70 sm:text-sm">
          Replied to <span className="font-bold">{parentAuthorName}</span>
        </div>
      )}

      {!isAnswer && !enableLink && isExtendedQuestion(post) && (
        <span className="line-clamp-2 text-lg font-bold tracking-tight sm:text-xl">
          {post?.title}
        </span>
      )}

      {!isAnswer && enableLink && isExtendedQuestion(post) && (
        <Link href={`/question/${post?.slug}`}>
          <span className="line-clamp-2 text-lg font-bold tracking-tight sm:text-xl">
            {post?.title}
          </span>
        </Link>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {isExtendedQuestion(post) &&
          post.tags
            .filter((v) => v !== '')
            .map((v, index) => <Tag name={v} key={index + v} />)}
      </div>

      {post.content && (
        <div data-color-mode={theme} className="mb-4 w-full rounded-xl">
          <div className="wmde-markdown-var"> </div>
          <MDEditor.Markdown
            className="markdown-editor-default-font text-sm sm:text-base"
            source={post.content}
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              backgroundColor: 'transparent',
            }}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <VoteForm
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          questionId={isAnswer ? undefined : post.id}
          answerId={isAnswer ? post.id : undefined}
          key={post.id}
          votesArr={post.votes || []}
          slug={isExtendedQuestion(post) ? post.slug : ''}
        />
        {reply && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setEnableReply((prev) => !prev);
            }}
            className="text-xs sm:text-sm"
          >
            <Reply className="mr-1 size-4" />
            {enableReply ? 'Close' : 'Reply'}
          </Button>
        )}
        {!isAnswer && (
          <p className="text-xs tracking-tight text-primary/70 sm:text-sm">
            • {formatNumber(post.totalanswers)}{' '}
            {post.totalanswers === 1 ? 'reply' : 'replies'}
          </p>
        )}
      </div>

      {enableReply && (
        <form
          onSubmit={handleSubmit}
          className="mt-4"
          onClick={handleEditorClick}
        >
          <div data-color-mode={theme} className="flex w-full flex-col gap-4">
            <MDEditor
              className="markdown-editor-default-font text-sm sm:text-base"
              id={post.id.toString()}
              value={markDownValue}
              onChange={handleMarkdownChange}
              preview="edit"
              visibleDragbar={false}
              height={200}
            />
            <FormPostErrors id="content" errors={fieldErrors} />
            <Button type="submit" size="sm" className="w-full sm:w-auto">
              Add a reply
            </Button>
            <p className="text-xs text-primary/80 sm:text-sm">
              Be respectful towards others while answering
            </p>
          </div>
        </form>
      )}

      {isAnswer &&
        !isExtendedQuestion(post) &&
        post.responses &&
        post?.responses.length > 0 && (
          <div className="mt-4 space-y-4">
            {post?.responses.map((nestedPost: ExtendedAnswer) => (
              <div key={nestedPost.id}>
                <PostCard
                  questionId={nestedPost.questionId}
                  post={nestedPost}
                  sessionUser={sessionUser}
                  reply={false}
                  parentAuthorName={post.author.name}
                  isAnswer={true} />
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default PostCard;
