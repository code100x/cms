'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { cn } from '@/lib/utils';
import ContentList from '@/components/admin/ContentList';
import EditContentModal from '@/components/modal/EditContentModal';
import { Button } from '@/components/ui/button';

interface UploadContentFormProps {
  content: any;
  courseId: number;
  contentId: string;
  contentType: 'video' | 'notion';
}

const ContentMetaDataSchema = z.object({
  title: z.string().min(1),
  adminPassword: z.string().min(1),
  thumbnail: z.string(),
  notionId: z.string().optional(),
  videoMetadata: z.object({})
});
export type ContentMetaDataType = z.infer<typeof ContentMetaDataSchema>;

const UploadContentForm = ({
  courseId,
  content,
  contentId,
  contentType,
}: UploadContentFormProps) => {
  const parentContentId = parseInt(contentId, 10);

  const router = useRouter();
  const { register, handleSubmit, reset, setValue } =
    useForm<ContentMetaDataType>();
  const [actionType, setActionType] = useState('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState('');

  const onClose = () => setIsModalOpen((prev) => !prev);
  const handleOpenModalClick = () => {
    setActionType('create');
    setIsModalOpen((p) => !p);
    setValue('title', '');
    setValue('thumbnail', '');
  };
  const toggleModal = (id?: string, isEditVideo?: boolean) => {
    setActionType('edit');
    
    if (isEditVideo) {
      router.push(`/admin/course/${courseId}/content/${contentId}/${id}`);
      return;
    }
    if (id) {
      setSelectedContentId(id);
      const selectedContent = content.find((item: any) => item.id === id);
      setValue('title', selectedContent.title);
      setValue('thumbnail', selectedContent.thumbnail);
      setValue('notionId', selectedContent?.NotionMetadata?.notionId);
    } else {
      reset();
    }
    setIsModalOpen((prev) => !prev);
  };
  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      const res = await axios.put(`/api/admin/content/reorder`, {
        list: updatedData,
        courseId,
      });
      if (res.status === 201) {
        toast.success('Content updated successfully');
      }
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const onSubmit: SubmitHandler<ContentMetaDataType> = async (
    data: ContentMetaDataType,
  ) => {
    let metaData = {};
    if (contentType === 'notion') {
      metaData = { notionId: data?.notionId };
    } else if (contentType === 'video') {
      metaData = data?.videoMetadata;
    }

    const httpMethod = actionType === 'create' ? 'post' : 'patch';
    const apiUrl =
      actionType === 'create'
        ? '/api/admin/content'
        : `/api/admin/content/${contentId}`;

    try {
      const res = await axios({
        method: httpMethod,
        url: apiUrl,
        data: {
          courseId,
          parentContentId,
          title: data.title,
          thumbnail: data.thumbnail,
          type: contentType,
          adminPassword: data.adminPassword,
          metadata: metaData,
          selectedContentId,
        },
      });

      if (res.status === 200) {
        setIsCreating(false);
        toast.success(`${contentType} Content Updated Successfully`);
        setIsModalOpen(false);
      }
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setValue('adminPassword', '');
    }
  };

  return (
    <div className="mt-6 space-y-2 overflow-y-auto rounded-md border border-gray-700 p-4">
      {isModalOpen && (
        <EditContentModal
          actionType={actionType}
          key={contentId}
          isOpen={isModalOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          register={register}
          contentType={contentType}
          handleSubmit={handleSubmit}
          setValue={setValue}
        />
      )}
      <div id="chapter-header" className="flex justify-between p-2">
        <p className="text-md font-medium">
          {contentType === 'video' ? 'Video content' : 'Notion content'}
        </p>
        <Button variant={'ghost'} onClick={handleOpenModalClick}>
          {isCreating ? (
            <p className="text-red-300">Cancel</p>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4 text-blue-300" />
              <p className="text-sm text-blue-300">
                Add New {contentType === 'video' ? 'Video' : 'Notion'}
              </p>
            </>
          )}
        </Button>
      </div>
      {!isCreating && (
        <div
          className={cn('mt-2 text-sm', !content && 'italic text-slate-500')}
        >
          {!content && `No ${contentType} Content`}
          <ContentList
            onEdit={toggleModal}
            onReorder={onReorder}
            items={content || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Drag and drop to reorder
        </p>
      )}
    </div>
  );
};

export default UploadContentForm;
