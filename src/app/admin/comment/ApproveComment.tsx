'use client';
import { approveComment } from '@/actions/comment';
import { FormErrors } from '@/components/FormError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAction } from '@/hooks/useAction';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { toast } from 'sonner';
import { ShieldCheck } from 'lucide-react';

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
    <div className="h-full w-full">
      <div className="rounded-2xl border-2 p-4">
        <div className="flex flex-col gap-4">
          <ShieldCheck className="size-12" />
          <h1 className="flex gap-2 text-2xl font-bold">Approve Comment</h1>
          <p className="font-medium text-primary/80">
            Enter the information below to approve the comment
          </p>
        </div>
        <form
          className="mt-4 h-full w-full"
          onSubmit={handleApprove}
          ref={formRef}
        >
          <div className="flex flex-col gap-4">
            <Label className="sr-only">Comment ID</Label>
            <Input
              className="h-14 w-full px-2"
              id="commentId"
              name="commentId"
              placeholder="Comment ID"
            />
            <FormErrors id="commentId" errors={fieldErrors} />
            <Label className="sr-only">Admin password</Label>
            <Input
              className="h-14 w-full px-2"
              id="adminPassword"
              name="adminPassword"
              placeholder="Admin Password"
            />
            <FormErrors id="adminPassword" errors={fieldErrors} />
            <Button className="md:w-fit">Approve</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveComment;
