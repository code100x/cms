'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Button } from '../ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '../ui/input';

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<any>;
  register: UseFormRegister<{
    adminPassword: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      adminPassword: string;
    },
    {
      adminPassword: string;
    }
  >;
  actionType?: "Publish" | "UnPublish" | "Delete" | 'Create';
  formType: 'content' | 'course';
}

const AdminPasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  handleSubmit,
  actionType,
  formType
}: AdminPasswordModalProps) => {
  if (!isOpen) return null;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((p) => !p);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center gap-y-2">
          <DialogTitle>{ `Are you sure want to ${actionType} the ${formType}`}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-y-2 w-full'>
          <label htmlFor="">Admin Password</label>
            <div className="flex rounded-lg border w-full">
              <Input
                id="password"
                className="border-0"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('adminPassword')}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    setIsPasswordVisible(false);
                    handleSubmit(onSubmit);
                  }
                }}
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
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPasswordModal;
