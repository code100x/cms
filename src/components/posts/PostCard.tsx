'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import React, { useState } from 'react';
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
  MessageSquareMore,
  MessageSquarePlus,
  MessageSquareX,
} from 'lucide-react';
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
  const internalDetails = () => {
    return (
      <div className="relative h-full w-full">
        <div className="grid h-full w-full content-stretch gap-4">
          {/* title */}
          <div className="m-2 flex justify-between p-4">
            <TextSnippet className="text-xl font-bold">
              {!isAnswer && !enableLink && isExtendedQuestion(post) && (
                <>{post?.title}</>
              )}
              {!isAnswer && enableLink && isExtendedQuestion(post) && (
                <Link href={`/questions/${post?.slug}`}>{post?.title}</Link>
              )}
            </TextSnippet>
            <div className="">
              {/* Move this option to the top */}
              {(sessionUser?.role === ROLES.ADMIN ||
                post?.author?.id === sessionUser?.id) && (
                <DeleteForm
                  key={post.id}
                  questionId={!isAnswer ? post.id : undefined}
                  answerId={isAnswer ? post.id : undefined}
                />
              )}
            </div>
          </div>

          {/* About data  */}
          <div className="flex w-full items-center gap-2">
            <Avatar className="cursor-pointer">
              <AvatarFallback>
                {post.author.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full px-2 font-semibold">
              <div>
                <TextSnippet>{post.author.name}</TextSnippet>
              </div>
              <div className="flex w-full">
                <TextSnippet className="text-xs text-gray-500">
                  {dayjs(post.createdAt).fromNow()}
                </TextSnippet>
                <TextSnippet className="ml-1 text-xs text-gray-500">
                  • Updated {dayjs(post.updatedAt).fromNow()}
                </TextSnippet>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {isExtendedQuestion(post) &&
              post.tags
                .filter((v) => v !== '')
                .map((v, index) => <Tag name={v} key={index + v} />)}
          </div>

          {/* The Details Appere here on expand */}
          <CardFooter className="flex flex-col items-start justify-between border-gray-200 p-2 dark:border-gray-700">
            {post.content && (
              <div data-color-mode={theme} className="max-w-3xl">
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

          {/* Interaction Panel */}
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
              {reply && (
                <TextSnippet
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => setEnableReply((prev) => !prev)}
                >
                  {reply && enableReply ? (
                    <div className="group flex items-center gap-2 rounded-md border from-blue-500 via-blue-600 to-blue-700 px-4 py-2 duration-300 ease-in-out hover:bg-gradient-to-r">
                      <MessageSquareX
                        size={18}
                        className="ml-2 text-[#3B81F6] group-hover:text-[#fff]"
                      />
                      {'Cancel'}
                    </div>
                  ) : (
                    <div className="group flex items-center gap-2 rounded-md border from-blue-500 via-blue-600 to-blue-700 px-4 py-2 duration-300 ease-in-out hover:bg-gradient-to-r">
                      <MessageSquarePlus
                        size={18}
                        className="ml-2 text-[#3B81F6] group-hover:text-[#fff]"
                      />
                      {'Add Your Answer'}
                    </div>
                  )}
                </TextSnippet>
              )}
            </div>
            {!isAnswer && enableLink && isExtendedQuestion(post) && !reply && (
              <Link href={`/questions/${post?.slug}`}>
                <p className="text-sm group-hover:text-[#fff]">
                  {post.totalanswers === 0 ? (
                    <div className="group flex items-center gap-2 rounded-md border from-blue-500 via-blue-600 to-blue-700 px-4 py-2 duration-300 ease-in-out hover:bg-gradient-to-r">
                      <MessageSquarePlus
                        size={18}
                        className="ml-2 text-[#3B81F6] group-hover:text-[#fff]"
                      />
                      {'Answer'}
                    </div>
                  ) : (
                    <div className="group flex items-center gap-2 rounded-md border from-blue-500 via-blue-600 to-blue-700 px-4 py-2 duration-300 ease-in-out hover:bg-gradient-to-r">
                      <MessageSquareMore
                        size={18}
                        className="ml-2 text-[#3B81F6] group-hover:text-[#fff]"
                      />
                      {'View Answers'}
                    </div>
                  )}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Card className="h-full w-full hover:shadow-md dark:shadow-sm dark:hover:shadow-blue-400">
      <CardBody className="flex h-full w-full items-start justify-between gap-5 p-2 sm:p-4">
        {internalDetails()}
      </CardBody>
      {enableReply && (
        <div className="m-4">
          <form onSubmit={handleSubmit}>
            <div data-color-mode={theme}>
              <div className="wmde-markdown-var"> </div>
              <MDEditor
                id={post.id.toString()}
                value={markDownValue}
                onChange={handleMarkdownChange}
              />
              <FormPostErrors id="content" errors={fieldErrors} />
              <Button
                type="submit"
                className="m-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
              >
                {'Post'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
