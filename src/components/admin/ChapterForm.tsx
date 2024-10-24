'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { Course } from '@/store/atoms';
import z, { isValid } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import ContentList from './ContentList';
import { useRouter } from 'next/navigation';
import AdminPasswordModal from '../modal/AdminPasswordModal';

interface ChapterFormProps {
  course: Course;
  courseContent: any;
  courseId: number;
}

const CourseTitleSchema = z.object({
  title: z.string().min(1).optional(),
  adminPassword: z.string().min(1)
});
type CourseTitleType = z.infer<typeof CourseTitleSchema>;

const ContentForm = ({ courseId, courseContent }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen((p) => !p);
  const handleEdit = () => setIsCreating((p) => !p);
  const router = useRouter();
  const onEdit = (contentId: string) => {
    router.push(`/admin/course/${courseId}/content/${contentId}`);
  };
  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      const res = await axios.put(`/api/admin/content/reorder`, {
        list: updatedData,
        courseId,
      });
      if (res.status === 201) {
        toast.success('Course updated succesfully');
      }
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const { register, handleSubmit, reset } = useForm<CourseTitleType>({
    defaultValues: {
      title: '',
      adminPassword: ''
    },
  });
  const onSubmit: SubmitHandler<CourseTitleType> = async (
    data: CourseTitleType,
  ) => {
    try {
      const res = await axios.post('/api/admin/content', {
        type: 'folder',
        description: '',
        thumbnail: '',
        title: data.title,
        courseId,
        adminPassword: data.adminPassword,
      });

      if (res.status === 200) {
        setIsCreating(false);
        toast.success('Created Successfully');
        setIsModalOpen(false);
        reset();
      }
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="mt-6 space-y-2 overflow-y-auto rounded-md border p-4">
      {isModalOpen && (
        <AdminPasswordModal
          key={courseId}
          isOpen={isModalOpen}
          onClose={toggleModal}
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          actionType={"Create"}
          formType={"content"}
        />
      )}
      <div id="chapter-header" className="flex justify-between p-2">
        <p className="text-md font-medium">Course Chapters</p>
        <Button variant={'ghost'} onClick={handleEdit}>
          {isCreating ? (
            <p className="text-red-500">Cancel</p>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4 text-blue-600" />
              <p className="text-sm bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">Add New Course</p>
            </>
          )}
        </Button>
      </div>
        <div
          className={cn(
            'mt-2 text-sm',
            !courseContent && 'italic text-slate-500',
          )}
        >
          {!courseContent && ' No Chapters '}
          <ContentList
            onEdit={onEdit}
            onReorder={onReorder}
            items={courseContent || []}
          />
        </div>
        {isCreating && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-x-2">
          <Input
            id="chapterTitle"
            className="w-full"
            disabled={false}
            {...register('title')}
          />
            <Button disabled={!isValid} type="button" onClick={toggleModal}>
              Create
            </Button>
          </div>
        </form>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ContentForm;
