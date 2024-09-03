'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import React from 'react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Author, ExtendedQuestion } from '@/actions/question/types';
import { useAction } from '@/hooks/useAction';
import { createAnswer } from '@/actions/answer';
import { toast } from 'sonner';
import { Answer } from '@prisma/client';
import TextSnippet from '../posts/textSnippet';
import Link from 'next/link';
import MDEditor from '@uiw/react-md-editor';
import { MessageSquareReply, MoreHorizontal, User } from 'lucide-react';
import { Button } from '../ui/button';
import VoteForm from '../posts/form/form-vote';
import DeleteForm from '../posts/form/form-delete';
import { FormPostErrors } from '../posts/form/form-errors';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ROLES } from '@/actions/types';

interface IProps {
  post: ExtendedQuestion;
  sessionUser: Author | undefined | null;
  reply?: boolean;
  enableLink?: boolean;
  isAnswer?: boolean;
  questionId: number;
}

const isExtendedQuestion = (
  post: ExtendedQuestion | Answer,
): post is ExtendedQuestion => {
  return (post as ExtendedQuestion).slug !== undefined;
};

const QuestionPost: React.FC<IProps> = ({
  post,
  sessionUser,
  questionId,
  reply = true,
  isAnswer = true,
}) => {
  const { theme } = useTheme();
  const [markDownValue, setMarkDownValue] = useState('');
  const [enableReply, setEnableReply] = useState(false);

  const handleMarkdownChange = (newValue?: string) => {
    if (typeof newValue === 'string') {
      setMarkDownValue(newValue);
    }
  };

  const { execute, fieldErrors } = useAction(createAnswer, {
    onSuccess: () => {
      toast.success(`Answer created`);
      if (!fieldErrors?.content) {
        setEnableReply((prev) => !prev);
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

  return (
    <>
      <div className="rounded-xl border p-4">
        <div className="flex flex-col">
          <div className="flex justify-between gap-2">
            <Link href={`/questions/${post?.slug}`}>
              <TextSnippet className="text-xl font-semibold">
                {post?.title}
              </TextSnippet>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="self-start">
                <MoreHorizontal
                  size={35}
                  className="p-1.5 hover:outline-none active:outline-none"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-pointer rounded-xl bg-gray-200/30 px-2 py-2 backdrop-blur dark:bg-gray-700/30">
                {(sessionUser?.role === ROLES.ADMIN ||
                  post?.author?.id === sessionUser?.id) && (
                  <DeleteForm
                    key={post.id}
                    questionId={!isAnswer ? post.id : undefined}
                    answerId={isAnswer ? post.id : undefined}
                  />
                )}
                <hr />
                {/* <DropdownMenuItem className="text-sm px-1 py-2 hover:border-none hover:outline-none">
                            Report spam
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div data-color-mode={theme} className="mt-2">
            <MDEditor.Markdown
              className="text-sm text-black dark:text-white"
              source={post.content
                ?.substring(0, Math.min(post.content.length, 200))
                .concat(post.content.length > 200 ? '...' : '')}
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                backgroundColor: 'transparent',
              }}
            />
          </div>
          <div className="mt-2">
            {isExtendedQuestion(post) &&
              post.tags
                .filter((v) => v !== '')
                .map((v, index) => (
                  <span
                    className="m-[4px] rounded-lg bg-slate-100 px-[8px] py-1 text-xs font-bold text-gray-600 dark:bg-gray-700 dark:text-white"
                    key={index + v}
                  >
                    {/* <Dot className="mx-[-8px] inline" /> */}# {v}
                  </span>
                ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <User className="mr-[-8px] h-4 text-sm text-gray-500" />
            <TextSnippet className="text-sm text-gray-500">
              {post.author.name}
            </TextSnippet>
            <div className="flex items-center">
              <TextSnippet className="text-sm text-gray-500">
                • Created{' '}
                {dayjs(post.createdAt) && dayjs(post.createdAt)?.fromNow()}
              </TextSnippet>
              <TextSnippet className="ml-1 text-sm text-gray-500">
                • Updated{' '}
                {dayjs(post.updatedAt) && dayjs(post.updatedAt)?.fromNow()}
              </TextSnippet>
            </div>
          </div>
          <div className="mt-2 flex w-full items-center justify-between">
            <div className="flex">
              <VoteForm
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                questionId={isAnswer ? undefined : post.id}
                answerId={isAnswer ? post.id : undefined}
                key={post.id}
                votesArr={post.votes || []}
              />
              <TextSnippet className="flex cursor-pointer items-center gap-2">
                {reply && (
                  <Button
                    className="text-blue-600 dark:text-blue-400"
                    variant="ghost"
                    onClick={() => setEnableReply((prev) => !prev)}
                  >
                    {reply && enableReply ? 'Close' : 'Reply'}
                  </Button>
                )}
                <MessageSquareReply
                  size={18}
                  color="#3B81F6"
                  fill="#3B81F6"
                  className="ml-1 duration-300 ease-in-out hover:scale-125"
                />
                <p className="text-sm">{post.totalanswers}</p>
              </TextSnippet>
            </div>
          </div>
        </div>
      </div>
      {enableReply && (
        <div>
          <hr className="mb-3 mt-3" />
          <form onSubmit={handleSubmit}>
            <div data-color-mode={theme}>
              <div className="wmde-markdown-var"> </div>
              <MDEditor
                id={post.id.toString()}
                value={markDownValue}
                onChange={handleMarkdownChange}
              />
              <FormPostErrors id="content" errors={fieldErrors} />
              <Button type="submit" className="m-3">
                Reply
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default QuestionPost;
