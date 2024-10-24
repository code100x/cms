import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import ErrorMessage from '@/components/error/ErrorMessage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const AddClassSchema = z.object({
  title: z.string().refine((val) => val.trim() !== '', {
    message: 'Class title is required',
  }),
  description: z.string().optional(),
  course: z.string().refine((val) => val.trim() !== '', {
    message: 'Course is required'
  }),
  date: z.string().refine((val) => val.trim() !== '', {
    message: 'Scheduled date is required',
  }),
  startTime: z.string().refine((val) => val.trim() !== '', {
    message: 'Start time is required',
  }),
  endTime: z.string().refine((val) => val.trim() !== '', {
    message: 'End time is required',
  }),
  meetingLink: z.string().refine((val) => val.trim() !== '', {
    message: 'Meeting link is required',
  }),
  adminSecret: z.string().refine((val) => val.trim() !== '', {
    message: 'Admin secret is required',
  }),
});

type AddClasstype = z.infer<typeof AddClassSchema>;

interface AddClassProps {
  date?: Date;
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classData?: any;
}

const AddClass = ({ isOpen, date, setIsModalOpen, classData }: AddClassProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [action, setAction] = useState('create');
  const handleClose = () => setIsModalOpen(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddClasstype>({
    resolver: zodResolver(AddClassSchema),
    defaultValues: {
      date: date ? format(date, 'yyyy-MM-dd') : ''
    }
  });
  const onSubmit: SubmitHandler<AddClasstype> = async (data: AddClasstype) => {
    try {
      let res;
      if (action === 'create') {
        res = await axios.post('/api/admin/class', data);
      } else if (action === 'edit') {
        res = await axios.put(`/api/admin/class/${classData.id}`, data);
      }
      if (res?.status === 200) {
        toast.success(`Class ${action === 'create' ? 'created' : 'updated'} successfully`);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      reset();
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);
  useEffect(() => {
    if (classData) {
      setValue('course', classData?.course?.title);
      setValue('title', classData?.title);
      setValue('description', classData?.description);
      setValue('endTime', classData?.endTime);
      setValue('startTime', classData?.startTime);
      setValue('meetingLink', classData?.meetingLink);
      setValue('date', classData?.date);
      setAction('edit');
    }
  }, [classData]);
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center gap-y-2">
          <DialogTitle className='border-b pb-2 w-full text-center'>SCHEDULE CLASS</DialogTitle>
          <DialogDescription>Fill the class details</DialogDescription>
        </DialogHeader>
        <div className="mt-2 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-y-4 text-black dark:text-white"
          >
            <div className="w-full">
              <Input
                id="classTitle"
                className="w-full"
                placeholder="Title"
                disabled={false}
                {...register('title')}
              />
              {errors?.title && (
                <ErrorMessage>{errors?.title?.message}</ErrorMessage>
              )}
            </div>
            <div className="w-full">
              <Input
                id="classDescription"
                className="w-full"
                placeholder="Description"
                disabled={false}
                {...register('description')}
              />
              {errors?.description && (
                <ErrorMessage>{errors?.description?.message}</ErrorMessage>
              )}
            </div>

            <div className="w-full">
              <Input
                id="course"
                className="w-full"
                placeholder="Course"
                disabled={false}
                {...register('course')}
              />
              {errors?.course && (
                <ErrorMessage>{errors?.course?.message}</ErrorMessage>
              )}
            </div>

            <div className="flex w-full gap-x-2">
              <div className='w-full'>
                <Input
                  className="schedule date font-medium"
                  type="date"
                  placeholder="Date"
                  {...register('date')}
                />
                {errors?.date && (
                  <ErrorMessage>{errors?.date?.message}</ErrorMessage>
                )}
              </div>
              <div className='w-full'>
                <Input
                  aria-label="Time"
                  type="time"
                  {...register('startTime')}
                />
                {errors?.startTime && (
                  <ErrorMessage>{errors?.startTime?.message}</ErrorMessage>
                )}
              </div>
              <div className='w-full'>
                <Input
                  aria-label="Time"
                  type="time"
                  {...register('endTime')}
                />
                {errors?.endTime && (
                  <ErrorMessage>{errors?.endTime?.message}</ErrorMessage>
                )}
              </div>
            </div>
            <div className="w-full">
              <Input
                aria-label="meetingLink"
                type="text"
                placeholder="Meeting Link"
                {...register('meetingLink')}
              />
              {errors?.meetingLink && (
                <ErrorMessage>{errors?.meetingLink?.message}</ErrorMessage>
              )}
            </div>
            <div className="flex w-full flex-col">
              <div className="flex w-full rounded-lg border">
                <Input
                  id="password"
                  className="border-0"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('adminSecret')}
                />
                <button
                  type="button"
                  className="ml-2 mr-2 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {errors?.adminSecret && (
                <ErrorMessage>{errors?.adminSecret?.message}</ErrorMessage>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-x-2">
              <Button variant="destructive" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">{action === 'create' ? 'Create' : 'Edit'}</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClass;
