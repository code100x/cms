'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import React, { useRef, useState } from 'react';
import VoteForm from './form/form-vote';
import TextSnippet from './textSnippet';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MessageSquareReply, MoreHorizontal } from 'lucide-react';
import { ROLES } from '@/actions/types';
import { FormPostErrors } from './form/form-errors';
import { Button } from '../ui/button';
import { Card, CardFooter } from '../ui/card';
import { CardBody } from '../3dcard';

interface IProps {
  post: ExtendedQuestion | ExtendedAnswer;
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
const PostCard: React.FC<IProps> = ({
  post,
  sessionUser,
  questionId,
  reply = false,
  enableLink = false,
  isAnswer = true,
}) => {
  const { theme } = useTheme();
  const [markDownValue, setMarkDownValue] = useState('');
  const [enableReply, setEnableReply] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const handleReplyBtn = () => {
    setEnableReply((prev) => !prev);
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
      });
    }, 200);
  };

  const internalDetails = () => {
    return (
      <div className="flex w-full flex-col items-start gap-2.5">
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {post.author.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {/*         <div className="my-2 flex border items-center justify-between gap-3"> */}
        <div className="leading-1.5 flex w-full flex-col rounded-e-xl rounded-es-xl border">
          <div className="flex w-full items-center justify-between gap-3 rounded-tr-lg border-b bg-gray-500/10 p-2 dark:bg-gray-800/20">
            <div className="flex items-center gap-2">
              <TextSnippet className="mb-1 font-medium">
                {post.author.name}
              </TextSnippet>
              <div className="flex items-center">
                <TextSnippet className="text-[10px] text-gray-500 sm:text-xs">
                  {dayjs(post.createdAt).fromNow()}
                </TextSnippet>
                <TextSnippet className="ml-2 text-[10px] text-gray-500 sm:text-xs">
                  • Updated {dayjs(post.updatedAt).fromNow()}
                </TextSnippet>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
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
          <div className="my-2 grid w-full grid-cols-2 gap-2 px-3 sm:grid-cols-5">
            {isExtendedQuestion(post) &&
              post.tags
                .filter((v) => v !== '')
                .map((v, index) => <Tag name={v} key={index + v} />)}
          </div>

          {!isAnswer && enableLink && isExtendedQuestion(post) && (
            <Link href={`/questions/${post?.slug}`}>
              <TextSnippet className="p-2 text-lg hover:underline">
                {post?.title}
              </TextSnippet>
            </Link>
          )}
          {!isAnswer && !enableLink && isExtendedQuestion(post) && (
            <TextSnippet className="px-2 py-2 text-lg font-bold hover:underline">
              {post?.title}
            </TextSnippet>
          )}
          {post.content && (
            <div data-color-mode={theme} className="my-2 w-full px-2">
              <div className="wmde-markdown-var"> </div>
              <MDEditor.Markdown
                className="text-black dark:text-white"
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

          <CardFooter className="flex flex-col items-center justify-between border-gray-200 p-2 dark:border-gray-700">
            <div className="flex w-full items-center justify-between">
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
                      className="mx-1 text-blue-600 dark:text-blue-400"
                      variant="ghost"
                      onClick={handleReplyBtn}
                    >
                      {reply && enableReply ? 'close' : 'reply'}
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
            {isAnswer &&
              !isExtendedQuestion(post) &&
              post.responses &&
              post?.responses.length > 0 &&
              post?.responses.map((post: ExtendedAnswer) => (
                <div key={post.id} className="w-full">
                  <hr className="m-auto mb-1 mt-1 w-3" />
                  <PostCard
                    questionId={post.questionId}
                    post={post}
                    sessionUser={sessionUser}
                    reply={true}
                  />
                </div>
              ))}
          </CardFooter>
        </div>

        {enableReply && (
          <div>
            <hr className="mb-3 mt-3" />
            <form onSubmit={handleSubmit}>
              <div data-color-mode={theme} ref={ref}>
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
      </div>
    );
  };
  return (
    <Card className="w-full">
      <CardBody className="flex h-auto w-full items-start justify-between gap-5 p-2 sm:p-4">
        <div className="flex w-full flex-1 flex-row items-start justify-between">
          {internalDetails()}
        </div>
      </CardBody>
    </Card>
  );
};

export default PostCard;
