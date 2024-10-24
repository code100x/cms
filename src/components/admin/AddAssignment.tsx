'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ErrorMessage from '@/components/error/ErrorMessage';

const AssignmentSchema = z.object({
  title: z.string().refine((val) => val.trim() !== '', {
    message: 'Title is required',
  }),
  description: z.string().refine((val) => val.trim() !== '', {
    message: 'Description is required',
  }),
  course: z.string().refine((val) => val.trim() !== '', {
    message: 'Course is required',
  }),
  dueDate: z.string().refine((val) => val.trim() !== '', {
    message: 'Due date is required',
  }),
  dueTime: z.string().refine((val) => val.trim() !== '', {
    message: 'Due time is required',
  }),
  adminSecret: z.string().refine((val) => val.trim() !== '', {
    message: 'Admin secret is required',
  }),
});

type AssignmentType = z.infer<typeof AssignmentSchema>;

interface AddAssignmentProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  assignment?: any;
}
const AddAssignment: React.FC<AddAssignmentProps> = ({
  isModalOpen,
  setIsModalOpen,
  assignment,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);
  const handleClose = () => setIsModalOpen(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AssignmentType>({
    resolver: zodResolver(AssignmentSchema),
  });
  console.log(' assignment : ', assignment);
  useEffect(() => {
    if (assignment) {
      setValue('title', assignment?.title);
      setValue('description', assignment?.description);
      setValue('course', assignment?.course?.title);
      setValue('dueDate', assignment?.dueDate);
      setValue('dueTime', assignment?.dueTime);
    }
  }, [assignment, setValue]);

  const onSubmit = async (data: AssignmentType) => {
    try {
      let res;
      if (!assignment) {
        res = await axios.post('/api/admin/assignment', data);
      } else {
        res = await axios.put(`/api/admin/assignment/${assignment?.id}`, data);
      }
      if (res.status === 200) {
        const action = assignment ? 'updated' : 'created';
        toast.success(`Assignment ${action} sucessfully`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 border-b p-2 text-center uppercase">
            {assignment ? 'Edit Assignment' : 'Create Assignment'}
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
              <div>
                <Input
                  className="title font-medium"
                  type="text"
                  placeholder="Title"
                  {...register('title')}
                />
                {errors?.title && (
                  <ErrorMessage>{errors?.title?.message}</ErrorMessage>
                )}
              </div>

              <div>
                <Input
                  className="course font-medium"
                  type="text"
                  placeholder="Course"
                  {...register('course')}
                />
                {errors?.course && (
                  <ErrorMessage>{errors?.course?.message}</ErrorMessage>
                )}
              </div>

              <div>
                <Textarea
                  className="description font-medium"
                  placeholder="Description"
                  {...register('description')}
                />
                {errors?.description && (
                  <ErrorMessage>{errors?.description?.message}</ErrorMessage>
                )}
              </div>

              <div className="flex gap-x-2">
                <div>
                  <Input
                    className="dueDate font-medium"
                    type="date"
                    placeholder="Due Date"
                    {...register('dueDate')}
                  />
                  {errors?.dueDate && (
                    <ErrorMessage>{errors?.dueDate?.message}</ErrorMessage>
                  )}
                </div>

                <div>
                  <Input
                    className="dueTime font-medium"
                    type="time"
                    placeholder="Due Time"
                    {...register('dueTime')}
                  />
                  {errors?.dueTime && (
                    <ErrorMessage>{errors?.dueTime?.message}</ErrorMessage>
                  )}
                </div>
              </div>
              <div className="w-full flex-col">
                <div className="flex w-full rounded-lg border">
                  <Input
                    className="adminSecret font-medium"
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
              <Button type="submit" variant={'default'}>
                {assignment ? 'Update' : 'Create'}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssignment;
