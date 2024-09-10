'use client';
import { approveComment } from '@/actions/comment';
import { FormErrors } from '@/components/FormError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAction } from '@/hooks/useAction';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <div className='w-full h-full'>
      <Accordion defaultValue='approve-comment' className='border-2 p-4 rounded-2xl' type="single" collapsible>
        <AccordionItem className='border-none' value="approve-comment">
          <AccordionTrigger className='p-6 text-lg lg:text-2xl font-bold'>
            <div className='flex gap-4 flex-col' >
              <ShieldCheck size={40} /> Approve Comment
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <form className='w-full h-full' onSubmit={handleApprove} ref={formRef}>
              <div className="grid w-full grid-cols-1 lg:grid-cols-7 p-2 gap-2 rounded-lg border-gray-200 shadow-sm dark:border-gray-800">
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-2  p-4">
                  <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    Enter the information below to approve the comment
                  </div>
                </div>

                <aside className='col-span-1 flex flex-col gap-6 p-4 lg:col-span-5 '>

                  <div className="flex items-center">
                    <Label className="sr-only">Comment ID</Label>
                    <Input
                      className="w-full h-14 px-2"
                      id="commentId"
                      name="commentId"
                      placeholder="Content ID; Comment ID"
                      style={{
                        minWidth: '0',
                      }}
                    />
                    <FormErrors id="commentId" errors={fieldErrors} />
                  </div>
                  <div className="flex items-center">
                    <Label className="sr-only">Admin password</Label>
                    <Input
                      className="w-full h-14 px-2"
                      id="adminPassword"
                      name="adminPassword"
                      placeholder="Admin password"
                      style={{
                        minWidth: '0',
                      }}
                    />
                    <FormErrors id="adminPassword" errors={fieldErrors} />
                  </div>

                  <div className="">
                    <Button className="w-full lg:w-[20%]">Approve</Button>
                  </div>

                </aside>

              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

  );
};

export default ApproveComment;
