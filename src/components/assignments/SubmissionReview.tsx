'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format, parse } from 'date-fns';
import { formatDate } from '@/utiles/date';
import Link from 'next/link';
import { EyeIcon, EyeOff, Github, Pencil, Radio, Twitter } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';

interface SubmissionReviewProps {
  submission: any;
}

const SubmissionReviewSchema = z.object({
  bounty: z.string().optional(),
  feedback: z.string().optional(),
  adminSecret: z.string(),
});

type SubmissionReviewType = z.infer<typeof SubmissionReviewSchema>;

const SubmissionReview: React.FC<SubmissionReviewProps> = ({ submission }) => {
  const [disableField, setDisableField] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubmissionReviewType>({
    resolver: zodResolver(SubmissionReviewSchema),
  });

  useEffect(() => {
    if (submission?.bounty || submission?.feedback) {
      setValue('bounty', submission?.bounty);
      setValue('feedback', submission?.feedback);
      setDisableField(true);
    }
  }, [submission]);

  const onSubmit = async (data: SubmissionReviewType) => {
    try {
      const { feedback, bounty, adminSecret } = data;
      const res = await axios.put(`/api/admin/submission/${submission.id}`, {
        courseId: submission.course.id,
        assignmentId: submission.assignment.id,
        feedback,
        bounty,
        adminSecret,
      });
      if (res.data.status === 200) {
        toast.success('Review submitted successfully');
        setDisableField(true);
        setValue('adminSecret', '');
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(' error : ', error);
    }
  };

  const parsedDueTime = parse(
    submission.assignment.dueTime,
    'HH:mm',
    new Date(),
  );
  const dueDate = formatDate(submission.assignment.dueDate).date;
  const dueTime = format(parsedDueTime, 'hh:mm a');
  const submittedDate = format(
    new Date(submission.submittedAt),
    'MMMM dd, yyyy',
  );
  const submittedTime = format(new Date(submission.submittedAt), 'hh:mm a');
  const isLateDate = dueDate < submittedDate;
  const isLateTime = dueTime < submittedTime;
  const isLateSubmission = isLateDate && isLateTime;
  return (
    <div className="m-2 flex max-w-xl flex-col gap-y-4 rounded-lg border shadow-md">
      <div className="flex max-w-xl flex-col">
        <div className="flex justify-between border-b p-6 pb-2">
          <div className="flex flex-col justify-between gap-y-2">
            <h2 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-bold text-transparent">
              {submission.assignment.title}
            </h2>
            <p className="text-sm text-gray-500">
              Due {formatDate(submission.assignment.dueDate).date} {dueTime}
            </p>
          </div>
          <div>
            <div className="flex flex-col justify-between gap-y-2">
              <h2 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-lg font-bold text-transparent">
                <p>Submitted at</p>
              </h2>
              <p
                className={`text-sm text-gray-500 ${isLateSubmission ? 'text-red-500' : 'text-green-300'}`}
              >
                {formatDate(submission.submittedAt).date} {submittedTime}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-center">
          <div className="px-6 py-2">
            <h4 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-lg text-transparent">
              Instructions
            </h4>
            <div className="flex flex-col gap-y-2 text-sm text-gray-500">
              <p>{submission.assignment.description}</p>
            </div>
          </div>

          <div className="mt-2 max-w-xl px-6 py-2">
            <div className="flex flex-col justify-between gap-y-4">
              <h4 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-base text-transparent">
                Works submitted
              </h4>
              <div className="flex gap-x-2">
                <span className="flex items-center">
                  <Github size={15} className="mr-2" />
                  <h2 className="text-sm">Github Link : </h2>
                </span>
                <Link
                  href={submission.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:bg-gray-800"
                >
                  <p className="text-sm">{submission.githubLink}</p>
                </Link>
              </div>
              <div className="flex gap-x-2">
                <span className="flex items-center">
                  <Radio size={15} className="mr-2" />
                  <h2 className="text-sm">Deployed Link : </h2>
                </span>

                <Link
                  href={submission?.deploymentLink ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:bg-gray-800"
                >
                  <p className="text-sm">
                    {submission?.deploymentLink ?? 'Not submitted'}
                  </p>
                </Link>
              </div>
              <div className="flex gap-x-2">
                <span className="flex items-center">
                  <Twitter size={15} className="mr-2" />
                  <h2 className="text-sm">Twitter Post : </h2>
                </span>

                <Link
                  href={submission?.twitterPostLink ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:bg-gray-800"
                >
                  <p className="text-sm">
                    {submission?.twitterPostLink ?? 'Not submitted'}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-y-2 rounded-lg border bg-custom-light p-4 dark:bg-gray-900">
            <div className="mb-2 flex justify-between">
              <h4 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-base font-semibold text-transparent">
                Feedback
              </h4>
              {(submission?.bounty || submission?.feedback) && (
                <Pencil
                  size={15}
                  onClick={() => setDisableField(false)}
                  className="cursor-pointer"
                />
              )}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <Input
                placeholder="Bounty"
                {...register('bounty')}
                disabled={disableField}
              />
              <Textarea
                placeholder="Feedback"
                className="text-base dark:bg-gray-900"
                {...register('feedback')}
                disabled={disableField}
              />
              <div className="flex flex-col w-full rounded-lg border">
                <div className="flex">
                  <Input
                    className="h-12 px-3"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Admin Secret"
                    {...register('adminSecret')}
                  />
                  <button
                    onClick={() => setIsPasswordVisible((p) => !p)}
                    type="button"
                    className="ml-2 mr-2 text-gray-600"
                  >
                    {isPasswordVisible ? <EyeIcon /> : <EyeOff />}
                  </button>
                </div>
                {errors?.adminSecret && (
                  <p className="text-sm text-red-500">
                    {errors?.adminSecret.message}
                  </p>
                )}
              </div>
              <Button className="" type="submit" variant={'default'}>
                {disableField ? 'Submitted' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionReview;
