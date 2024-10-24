import React, { useState } from 'react';
import {
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { AddVideosMetadata } from '@/components/admin/AddContent';
import { AddNotionMetadata } from '@/components/admin/AddNotionMetadata';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string;
  onSubmit: SubmitHandler<any>;
  contentType: 'video' | 'notion';
  handleSubmit: UseFormHandleSubmit<any>;
  register: any;
  setValue: any;
}
const EditContentModal = ({
  isOpen,
  onClose,
  onSubmit,
  actionType,
  register,
  contentType,
  handleSubmit,
  setValue
}: EditContentModalProps) => {
  if (!isOpen) return null;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center gap-y-2">
          <DialogTitle className='uppercase'>{` ${actionType === 'create' ? 'Add New' : 'Edit'} ${contentType === 'video' ? 'Video' : 'Notion'}`}</DialogTitle>
          <DialogDescription>
            Please enter the title and metadata for the new {contentType}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-y-2"
          >
            <Input
              id="chapterTitle"
              className="w-full text-white"
              placeholder="Title"
              disabled={false}
              {...register('title')}
            />
            {contentType === 'video' && (
              <Input
                id="videoThumbnail"
                className="mt-2 w-full text-white"
                placeholder="Video Thumbnail"
                disabled={false}
                {...register('thumbnail')}
              />
            )}
            <div className="w-full">
              {contentType === 'video' && (
                <AddVideosMetadata setValue={setValue}/>
              )}
              {contentType === 'notion' && (
                <AddNotionMetadata register={register} />
              )}
            </div>

            <div className="flex w-full rounded-lg border">
              <Input
                id="password"
                className="border-0"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('adminPassword')}
              />
              <button
                type="button"
                className="ml-2 mr-2 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-x-2">
              <Button variant="destructive" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentModal;
