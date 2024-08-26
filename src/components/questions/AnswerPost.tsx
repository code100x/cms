'use client';
import React from 'react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Author, ExtendedAnswer } from '@/actions/question/types';
import { useAction } from '@/hooks/useAction';
import { createAnswer } from '@/actions/answer';
import { toast } from 'sonner';
import TextSnippet from '../posts/textSnippet';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '../ui/button';
import VoteForm from '../posts/form/form-vote';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { FormPostErrors } from '../posts/form/form-errors';
import { ROLES } from '@/actions/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import DeleteForm from '../posts/form/form-delete';

interface IProps {
  post: ExtendedAnswer;
  sessionUser: Author | undefined | null;
  reply?: boolean;
  enableLink?: boolean;
  isAnswer?: boolean;
  questionId: number;
}

const AnswerPost: React.FC<IProps> = ({
  post,
  sessionUser,
  questionId,
  reply = false,
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
      <div className="my-4 flex h-max items-center gap-2 border-l-2">
        <div className="ml-[-20px] flex self-start">
          <Avatar className="cursor-pointer">
            <AvatarFallback>
              {post.author.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="left-8">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold">{post.author.name}</h3>
          </div>
          <p>{post.content}</p>
          <div className="mt-2 flex">
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
            </TextSnippet>
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
          {enableReply && (
            <div className="w-full">
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
          <div className="ml-2">
            {post.responses &&
              post.responses.length > 0 &&
              post.responses.map((answer: ExtendedAnswer) => (
                <div key={answer.id}>
                  <AnswerPost
                    questionId={answer.questionId}
                    post={answer}
                    sessionUser={sessionUser}
                    reply={true}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default AnswerPost;
