'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'sonner';
import { format, parse } from 'date-fns';
import { Pencil } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utiles/date';

const SubmissionSchema = z.object({
  githubLink: z.string().url('Invalid url'),
  twitterPostLink: z.string().optional(),
  deploymentLink: z.string().optional(),
});

type SubmissionType = z.infer<typeof SubmissionSchema>;

const Submission = ({ assignment, userId, submittedData }: any) => {
  const [disableField, setDisableField] = useState(false);
  const [action, setAction] = useState('create');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubmissionType>({
    resolver: zodResolver(SubmissionSchema),
  });

  useEffect(() => {
    if (submittedData) {
      setValue('githubLink', submittedData?.githubLink);
      setValue('twitterPostLink', submittedData?.twitterPost);
      setValue('deploymentLink', submittedData?.deploymentLink);
      setDisableField(true);
    }
  }, [submittedData]);

  const onSubmit = async (data: SubmissionType) => {
    const { githubLink, twitterPostLink: twitterPost, deploymentLink } = data;
    try {
      let res;
      if (action === 'create') {
        res = await axios.post('/api/submission', {
          assignmentId: assignment?.id,
          userId,
          courseId: assignment?.courseId,
          githubLink,
          twitterPost,
          deploymentLink,
        });
      } else if (action === 'edit') {
        res = await axios.put(`/api/submission/${submittedData.id}`, {
          submissionId: submittedData.id,
          assignmentId: assignment?.id,
          userId,
          courseId: assignment?.courseId,
          githubLink,
          twitterPost,
          deploymentLink,
        });
      }
      if (res?.status === 200) {
        toast.success(
          `Assignment ${action === 'create' ? 'submitted' : 'updated'} successfully!`,
        );
        setDisableField(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const parsedDueTime = parse(assignment.dueTime, 'HH:mm', new Date());

  const handlEdit = () => {
    setDisableField(false);
    setAction('edit');
  };

  return (
    <div className="flex w-[40%] flex-col gap-y-4 rounded-lg border shadow-md">
      <div className="flex flex-col justify-between p-6 pb-2">
        <div className="flex flex-col justify-between gap-y-2">
          <h2 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-bold text-transparent">
            {assignment.title}
          </h2>
          <p className="text-sm text-gray-500">
            Due {formatDate(assignment.dueDate).date}{' '}
            {format(parsedDueTime, 'hh:mm a')}
          </p>
          <h4 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-lg text-transparent">
            Instructions
          </h4>
          <div className="flex flex-col gap-y-2 text-base text-gray-500">
            <p>{assignment.description}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          {submittedData?.feedback && (
            <div className="flex flex-col justify-between gap-y-2">
              <h2 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-lg font-bold text-transparent">
                <p>Feedback</p>
              </h2>
              <p className={`text-base text-gray-400`}>
                {submittedData?.feedback}
              </p>
            </div>
          )}

          {submittedData?.bounty && (
            <div className="mt-4 flex flex-col justify-between gap-y-2">
              <h2 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-lg font-bold text-transparent">
                <p>Bounty</p>
              </h2>
              <p className={`text-base text-gray-400`}>
                {submittedData?.bounty}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col rounded-lg border bg-custom-light px-6 py-4 dark:bg-gray-900">
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="my-2 bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-base text-transparent">
              My works
            </h4>
            {submittedData && <Pencil size={15} onClick={handlEdit} />}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div>
              <Input
                id="githubLink"
                placeholder="Github Link"
                {...register('githubLink')}
                disabled={disableField}
                className={`${disableField ? 'dark:bg-gray-800' : ''}`}
              />
              {errors?.githubLink && (
                <p className="text-sm text-red-500">
                  {errors?.githubLink.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id="deploymentLink"
                placeholder="Deployment link (optional)"
                {...register('deploymentLink')}
                disabled={disableField}
                className={`${disableField ? 'dark:bg-gray-800' : ''}`}
              />
              {errors?.deploymentLink && (
                <p className="text-sm text-red-500">
                  {errors?.deploymentLink.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id="twitterPostLink"
                placeholder="Twitter post link (optional)"
                {...register('twitterPostLink')}
                disabled={disableField}
                className={`${disableField ? 'dark:bg-gray-800' : ''}`}
              />
              {errors?.twitterPostLink && (
                <p className="text-sm text-red-500">
                  {errors?.twitterPostLink.message}
                </p>
              )}
            </div>
            <Button
              className="bg-gradient-to-b from-blue-400 to-blue-700 dark:text-white"
              type="submit"
              variant={'default'}
            >
              {disableField ? 'Submitted' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Submission;
