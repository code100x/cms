'use client';
import { approveComment } from '@/actions/comment';
import { FormErrors } from '@/components/FormError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAction } from '@/hooks/useAction';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { toast } from 'sonner';

const ApproveComment = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { execute, fieldErrors } = useAction(approveComment, {
    onSuccess: () => {
      toast('Comment added');
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleApprove = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const commentId = formData.get('commentId') as string;
    const adminPassword = formData.get('adminPassword') as string;
    execute({
      content_comment_ids: commentId,
      adminPassword,
      approved: true,
    });
  };
  return (
    <form onSubmit={handleApprove} ref={formRef}>
      <div className="grid w-full max-w-sm grid-rows-5 rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <div className="row-span-3 grid items-center gap-2 p-6">
          <div className="text-3xl font-bold">Approve Intro comment</div>
          <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
            Enter the information below to approve the comment
          </div>
        </div>

        <div className="row-span-2 flex items-center p-6">
          <Label className="sr-only">Comment ID</Label>
          <Input
            className="w-full"
            id="commentId"
            name="commentId"
            placeholder="Content ID; Comment ID"
            style={{
              minWidth: '0',
            }}
          />
          <FormErrors id="commentId" errors={fieldErrors} />
        </div>
        <div className="row-span-2 flex items-center p-6">
          <Label className="sr-only">Admin password</Label>
          <Input
            className="w-full"
            id="adminPassword"
            name="adminPassword"
            placeholder="Admin password"
            style={{
              minWidth: '0',
            }}
          />
          <FormErrors id="adminPassword" errors={fieldErrors} />
        </div>
        <div className="row-span-2 flex items-center justify-center p-6">
          <Button className="w-full">Approve</Button>
        </div>
      </div>
    </form>
  );
};

export default ApproveComment;
