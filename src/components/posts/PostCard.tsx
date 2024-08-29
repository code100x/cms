'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import React, { useState } from 'react';
import VoteForm from './form/form-vote';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import MDEditor from '@uiw/react-md-editor';
import { ROLES } from '@/actions/types';
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
import { FormPostErrors } from './form/form-errors';
import { useRouter } from 'next/navigation';
import DeleteForm from './form/form-delete';
import { Reply } from 'lucide-react';

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
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createAnswer, {
    onSuccess: () => {
      toast.success(`Repply added`);
      if (!fieldErrors?.content) {
        // setEnableReply((prev) => !prev);
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

    setEnableReply(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toString();
  };
  return (
    <div
      className={`flex w-full cursor-pointer flex-col gap-4 p-5 transition-all duration-300 ${!post.content && !isAnswer ? `rounded-xl bg-neutral-50 hover:-translate-y-2 dark:bg-neutral-900` : `rounded-r-xl border-l-2 border-blue-500 bg-primary/5`} `}
      onClick={() => {
        if (isExtendedQuestion(post)) {
          router.push(`/questions/${post?.slug}`);
        }
      }}
    >
      <div className="min-w-7xl flex w-full flex-row items-start justify-between">
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {post.author.name?.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold tracking-tight">
                    {post.author.name}
                  </span>
                  <div className="flex items-center text-sm tracking-tight text-primary/80">
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
              <div className="text-sm text-primary/70">
                Replied to <span className="font-bold">{parentAuthorName}</span>
              </div>
            )}
            {!isAnswer && !enableLink && isExtendedQuestion(post) && (
              <span className="text-xl font-bold tracking-tight md:text-2xl">
                {post?.title}
              </span>
            )}

            {!isAnswer && enableLink && isExtendedQuestion(post) && (
              <Link href={`/questions/${post?.slug}`}>
                <span className="text-xl font-bold tracking-tight md:text-2xl">
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
          </div>

          <div className="flex flex-col items-start justify-between gap-4">
            {post.content && (
              <div data-color-mode={theme} className="mb-12 w-full rounded-xl">
                <div className="wmde-markdown-var"> </div>
                <MDEditor.Markdown
                  className="markdown-editor-default-font"
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

            <div className="flex w-full items-center gap-2">
              <VoteForm
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                questionId={isAnswer ? undefined : post.id}
                answerId={isAnswer ? post.id : undefined}
                key={post.id}
                votesArr={post.votes || []}
              />
              {reply && !enableReply && (
                <div
                  className={`flex min-w-8 items-center gap-1 rounded-full bg-primary/10 px-4 py-1 text-primary transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500`}
                  onClick={() => setEnableReply((prev) => !prev)}
                >
                  <Reply className="size-5" />
                  {reply && enableReply ? 'Close' : 'Reply'}
                </div>
              )}
              {!isAnswer && (
                <p className="tracking-tight text-primary/70">
                  • {formatNumber(post.totalanswers)}{' '}
                  {post.totalanswers === 1 ? 'reply' : 'replies'}
                </p>
              )}
            </div>
            {isAnswer &&
              !isExtendedQuestion(post) &&
              post.responses &&
              post?.responses.length > 0 &&
              post?.responses.map((post: ExtendedAnswer) => (
                <div key={post.id} className="w-full">
                  <PostCard
                    questionId={post.questionId}
                    post={post}
                    sessionUser={sessionUser}
                    reply={true}
                    parentAuthorName={post.author.name}
                  />
                </div>
              ))}
          </div>
        </div>
        {/* {!isAnswer && enableLink && isExtendedQuestion(post) && (
          <Link href={`/questions/${post?.slug}`}>
            <span className="py-2 text-lg hover:underline">{post?.title}</span>
          </Link>
        )} */}
      </div>
      {enableReply && (
        <form onSubmit={handleSubmit}>
          <div data-color-mode={theme} className="flex w-full flex-col gap-4">
            <MDEditor
              className="markdown-editor-default-font"
              id={post.id.toString()}
              value={markDownValue}
              onChange={handleMarkdownChange}
            />
            <FormPostErrors id="content" errors={fieldErrors} />
            <button
              type="submit"
              className={`flex w-fit min-w-8 items-center gap-1 rounded-full bg-blue-500/80 px-4 py-1 text-neutral-50 transition-all duration-300 hover:bg-blue-600`}
            >
              Add a reply
            </button>
            <p className="text-sm text-primary/80">
              Be respectful towards others while answering
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostCard;
